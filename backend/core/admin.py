from django.contrib import admin
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


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Singleton: only one row, editable like the WP Customizer.
        return not SiteSettings.objects.exists()


class WhyChooseUsPointInline(admin.TabularInline):
    model = WhyChooseUsPoint
    extra = 1


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    inlines = [WhyChooseUsPointInline]
    list_display = ("heading", "order")


class TechPlatformInline(admin.TabularInline):
    model = TechPlatform
    extra = 1


class ProcessStepInline(admin.TabularInline):
    model = ProcessStep
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_active", "order")
    list_editable = ("is_active", "order")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [TechPlatformInline, ProcessStepInline]


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "order")
    list_editable = ("value", "order")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "client", "category", "is_featured", "order")
    list_editable = ("is_featured", "order")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "mobile", "created_at", "is_read")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "mobile", "message", "created_at")
