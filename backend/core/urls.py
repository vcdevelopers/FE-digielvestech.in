from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsView,
    AboutView,
    ServiceViewSet,
    StatListView,
    ProjectViewSet,
    ContactMessageCreateView,
)

router = DefaultRouter()
router.register(r"services", ServiceViewSet, basename="service")
router.register(r"projects", ProjectViewSet, basename="project")

urlpatterns = [
    path("site-settings/", SiteSettingsView.as_view(), name="site-settings"),
    path("about/", AboutView.as_view(), name="about"),
    path("stats/", StatListView.as_view(), name="stats"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact-create"),
    path("", include(router.urls)),
]
