from rest_framework import serializers
from .models import (
    SiteSettings,
    AboutSection,
    WhyChooseUsPoint,
    Service,
    TechPlatform,
    ProcessStep,
    Stat,
    Project,
    ContactMessage,
)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class WhyChooseUsPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUsPoint
        fields = ["id", "text", "order"]


class AboutSectionSerializer(serializers.ModelSerializer):
    points = WhyChooseUsPointSerializer(many=True, read_only=True)

    class Meta:
        model = AboutSection
        fields = "__all__"


class TechPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechPlatform
        fields = ["id", "name", "icon", "order"]


class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = ["id", "title", "description", "icon", "order"]


class ServiceListSerializer(serializers.ModelSerializer):
    """Lightweight version for the Home page service cards."""

    class Meta:
        model = Service
        fields = ["id", "title", "slug", "icon", "short_description"]


class ServiceDetailSerializer(serializers.ModelSerializer):
    platforms = TechPlatformSerializer(many=True, read_only=True)
    process_steps = ProcessStepSerializer(many=True, read_only=True)
    features = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            "id", "title", "slug", "icon", "banner_image", "short_description",
            "intro_heading", "intro_body", "features", "platforms", "process_steps",
        ]

    def get_features(self, obj):
        return obj.feature_list()


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ["id", "label", "value", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    website = serializers.CharField(required=False, write_only=True, allow_blank=True)

    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "mobile", "message", "website", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        # Honeypot check: If bots fill out the hidden 'website' field, reject submission.
        if attrs.pop("website", None):
            raise serializers.ValidationError({"detail": "Spam submission detected."})
        return attrs

    def validate_message(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Message is too short.")
        return value

