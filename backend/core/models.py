from django.db import models


class SiteSettings(models.Model):
    """Singleton-style model for global content (used to live in WP Customizer
    / footer widgets): logo, tagline, footer text, socials, contact block."""

    site_name = models.CharField(max_length=150, default="Digielves Tech Solutions")
    tagline = models.CharField(max_length=255, default="tech mantras")
    logo = models.ImageField(upload_to="branding/", blank=True, null=True)
    footer_logo = models.ImageField(upload_to="branding/", blank=True, null=True)
    footer_about = models.TextField(
        default=(
            "We at Digielvestech make sure to provide the best services to our "
            "clients, at affordable prices, while having a client base of 400+ "
            "in India. Our services include Web designing, website development, "
            "e-commerce solutions with Search Engine Optimization (SEO), & "
            "Digital Marketing."
        )
    )
    phone_primary = models.CharField(max_length=100, default="(022) - 26772036 / 66952036")
    phone_secondary = models.CharField(max_length=100, default="(022) - 66922036 / 42642036")
    email = models.EmailField(default="info@digielvestech.in")
    address = models.CharField(
        max_length=255,
        default="40, Level II, Dewan Centre, S V Rd, Jogeshwari West, Mumbai, Maharashtra 400102",
    )
    facebook_url = models.URLField(blank=True, default="https://www.facebook.com/DigiElves")
    instagram_url = models.URLField(blank=True, default="https://instagram.com/envisageinsightsllp")
    google_maps_embed = models.URLField(blank=True)
    copyright_text = models.CharField(
        max_length=255, default="© 2026 Digielvestech. | All Rights Reserved."
    )

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.site_name

    def save(self, *args, **kwargs):
        self.pk = 1  # enforce singleton, same idea as WP having one active theme/customizer
        super().save(*args, **kwargs)


class AboutSection(models.Model):
    """Content for the About Us page."""

    heading = models.CharField(max_length=255, default="We Provides Best Advice For Your Business")
    intro_paragraph = models.TextField()
    body_paragraph = models.TextField()
    why_choose_heading = models.CharField(max_length=255, default="Digielvestech is a lot more.")
    why_choose_body = models.TextField()
    difference_intro = models.TextField(blank=True)
    image = models.ImageField(upload_to="about/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.heading


class WhyChooseUsPoint(models.Model):
    about = models.ForeignKey(AboutSection, related_name="points", on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.text[:60]


class Service(models.Model):
    """Maps to each WP service page (Website Designing, Development,
    E-Commerce, SEO, Digital Marketing, Web Portal)."""

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    icon = models.ImageField(upload_to="services/icons/", blank=True, null=True)
    banner_image = models.ImageField(upload_to="services/banners/", blank=True, null=True)
    short_description = models.TextField(help_text="Shown on the Home page service card.")
    intro_heading = models.CharField(max_length=255, blank=True)
    intro_body = models.TextField(blank=True, help_text="Main body copy on the service detail page.")
    features = models.TextField(
        blank=True,
        help_text="One feature per line, shown as a bulleted list on the detail page.",
    )
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title

    def feature_list(self):
        return [f.strip() for f in self.features.splitlines() if f.strip()]


class TechPlatform(models.Model):
    """The little 'Platform We Use' icon row (WordPress, JS, PHP, HTML, CSS...)."""

    service = models.ForeignKey(Service, related_name="platforms", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to="services/platforms/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class ProcessStep(models.Model):
    """Steps like Discovery & Scope / Design / Coding / Testing & Launch."""

    service = models.ForeignKey(Service, related_name="process_steps", on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    icon = models.ImageField(upload_to="services/process/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class Stat(models.Model):
    """The animated counters: Satisfied Clients / Projects Done / etc."""

    label = models.CharField(max_length=100)
    value = models.PositiveIntegerField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.label}: {self.value}"


class Project(models.Model):
    """Portfolio / 'Our Works' items."""

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    client = models.CharField(max_length=150, blank=True)
    category = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to="projects/", blank=True, null=True)
    project_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Stores submissions from the Contact Us form (WP used a plugin;
    here it's a plain model so the client can view/export leads
    straight from /admin/, no plugin needed)."""

    name = models.CharField(max_length=150)
    email = models.EmailField()
    mobile = models.CharField(max_length=30, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}> — {self.created_at:%Y-%m-%d %H:%M}"
