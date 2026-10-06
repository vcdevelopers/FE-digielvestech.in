from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit

from .models import SiteSettings, AboutSection, Service, Stat, Project, ContactMessage
from .serializers import (
    SiteSettingsSerializer,
    AboutSectionSerializer,
    ServiceListSerializer,
    ServiceDetailSerializer,
    StatSerializer,
    ProjectSerializer,
    ContactMessageSerializer,
)


class SiteSettingsView(APIView):
    """Equivalent of WP's customizer/global-options output."""

    def get(self, request):
        obj, _ = SiteSettings.objects.get_or_create(pk=1)
        return Response(SiteSettingsSerializer(obj).data)


class AboutView(APIView):
    def get(self, request):
        obj = AboutSection.objects.first()
        if not obj:
            return Response({}, status=status.HTTP_200_OK)
        return Response(AboutSectionSerializer(obj).data)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ServiceDetailSerializer
        return ServiceListSerializer


class StatListView(generics.ListAPIView):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "slug"


@method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=False), name="post")
class ContactMessageCreateView(generics.CreateAPIView):
    """Handles the Contact Us form submission with rate-limiting and email notification."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def post(self, request, *args, **kwargs):
        if getattr(request, "limited", False):
            return Response(
                {"detail": "Too many requests. Please wait a minute before trying again."},
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )
        return super().post(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        try:
            send_mail(
                subject=f"New enquiry from {instance.name} — Digielvestech website",
                message=(
                    f"Name: {instance.name}\n"
                    f"Email: {instance.email}\n"
                    f"Mobile: {instance.mobile}\n\n"
                    f"Message:\n{instance.message}"
                ),
                from_email=settings.EMAIL_HOST_USER or "no-reply@digielvestech.in",
                recipient_list=[settings.CONTACT_RECEIVER_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass

        return Response(serializer.data, status=status.HTTP_201_CREATED)
