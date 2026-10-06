import shutil
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from core.models import SiteSettings, AboutSection, WhyChooseUsPoint, Service, TechPlatform, ProcessStep, Stat, Project


class Command(BaseCommand):
    help = "Seed the database with the content and media from the home_page folder."

    def handle(self, *args, **options):
        base_workspace = Path(settings.BASE_DIR).parent
        home_page_dir = base_workspace / "home_page"
        backend_media_dir = Path(settings.MEDIA_ROOT)
        frontend_public = base_workspace / "frontend" / "public"
        frontend_public_media = frontend_public / "media"

        # Ensure media directories exist
        for d in [
            backend_media_dir,
            backend_media_dir / "branding",
            backend_media_dir / "hero",
            backend_media_dir / "about",
            backend_media_dir / "services",
            backend_media_dir / "projects",
            frontend_public,
            frontend_public_media,
        ]:
            d.mkdir(parents=True, exist_ok=True)

        # Copy media assets from home_page folder if available
        if home_page_dir.exists():
            media_mappings = {
                "Envisage_AV.mp4": [
                    backend_media_dir / "Envisage_AV.mp4",
                    backend_media_dir / "hero" / "Envisage_AV.mp4",
                    frontend_public_media / "Envisage_AV.mp4",
                    frontend_public / "Envisage_AV.mp4",
                ],
                "profile.png": [
                    backend_media_dir / "profile.png",
                    backend_media_dir / "about" / "profile.png",
                    frontend_public_media / "profile.png",
                    frontend_public / "profile.png",
                ],
                "design-2048x1492.png": [
                    backend_media_dir / "design-2048x1492.png",
                    backend_media_dir / "services" / "design-2048x1492.png",
                    frontend_public_media / "design-2048x1492.png",
                    frontend_public / "design-2048x1492.png",
                ],
                "development.png": [
                    backend_media_dir / "development.png",
                    backend_media_dir / "services" / "development.png",
                    frontend_public_media / "development.png",
                    frontend_public / "development.png",
                ],
                "e-commerce-01-1.png": [
                    backend_media_dir / "e-commerce-01-1.png",
                    backend_media_dir / "services" / "e-commerce-01-1.png",
                    frontend_public_media / "e-commerce-01-1.png",
                    frontend_public / "e-commerce-01-1.png",
                ],
                "technical-01-01-1.png": [
                    backend_media_dir / "technical-01-01-1.png",
                    backend_media_dir / "services" / "technical-01-01-1.png",
                    frontend_public_media / "technical-01-01-1.png",
                    frontend_public / "technical-01-01-1.png",
                ],
                "digital-marketing.png": [
                    backend_media_dir / "digital-marketing.png",
                    backend_media_dir / "services" / "digital-marketing.png",
                    frontend_public_media / "digital-marketing.png",
                    frontend_public / "digital-marketing.png",
                ],
                "portal.png": [
                    backend_media_dir / "portal.png",
                    backend_media_dir / "services" / "portal.png",
                    frontend_public_media / "portal.png",
                    frontend_public / "portal.png",
                ],
            }
            for filename, target_paths in media_mappings.items():
                src_file = home_page_dir / filename
                if not src_file.exists() and filename == "design-2048x1492.png":
                    fallback_src = home_page_dir / "design-2048x1492 (1).png"
                    if fallback_src.exists():
                        src_file = fallback_src
                if src_file.exists():
                    for target in target_paths:
                        shutil.copy2(src_file, target)
            self.stdout.write(self.style.SUCCESS("Media assets copied from home_page to backend/media/ and frontend/public/media/."))

        # Copy media assets from about_us folder if available
        about_us_dir = base_workspace / "about_us"
        if about_us_dir.exists():
            about_mappings = {
                "aboutus-copy.jpg": [
                    backend_media_dir / "aboutus-copy.jpg",
                    backend_media_dir / "hero" / "aboutus-copy.jpg",
                    frontend_public_media / "aboutus-copy.jpg",
                    frontend_public / "aboutus-copy.jpg",
                ],
                "advice-about-us-2048x1224.jpg": [
                    backend_media_dir / "advice-about-us-2048x1224.jpg",
                    backend_media_dir / "about" / "advice-about-us-2048x1224.jpg",
                    frontend_public_media / "advice-about-us-2048x1224.jpg",
                    frontend_public / "advice-about-us-2048x1224.jpg",
                ],
                "customize-1.jpg": [
                    backend_media_dir / "customize-1.jpg",
                    backend_media_dir / "about" / "customize-1.jpg",
                    frontend_public_media / "customize-1.jpg",
                    frontend_public / "customize-1.jpg",
                ],
            }
            for filename, target_paths in about_mappings.items():
                src_file = about_us_dir / filename
                if src_file.exists():
                    for target in target_paths:
                        shutil.copy2(src_file, target)
            self.stdout.write(self.style.SUCCESS("Media assets copied from about_us to backend/media/ and frontend/public/media/."))

        # Copy user uploaded prompt images from brain artifacts directory if present
        brain_dir = Path(r"C:\Users\Prashant\.gemini\antigravity-ide\brain\a8948e61-3499-468c-880b-70687674e77a")
        if brain_dir.exists():
            brain_mappings = {
                "media__1786195586988.png": [
                    backend_media_dir / "logo.png",
                    frontend_public_media / "logo.png",
                    frontend_public / "logo.png",
                ],
                "media__1786190237012.png": [
                    backend_media_dir / "envisage-logo.png",
                    frontend_public_media / "envisage-logo.png",
                    frontend_public / "envisage-logo.png",
                ],
                "media__1786190618670.png": [
                    backend_media_dir / "work-banner.jpg",
                    backend_media_dir / "work-banner.png",
                    frontend_public_media / "work-banner.jpg",
                    frontend_public / "work-banner.jpg",
                ],
                "media__1786190634449.png": [
                    backend_media_dir / "contact-banner.jpg",
                    backend_media_dir / "contact-banner.png",
                    frontend_public_media / "contact-banner.jpg",
                    frontend_public / "contact-banner.jpg",
                ],
                "media__1786191467784.png": [
                    backend_media_dir / "design-2048x1492.png",
                    backend_media_dir / "services" / "design-2048x1492.png",
                    backend_media_dir / "website-design-pen-tool.png",
                    frontend_public_media / "design-2048x1492.png",
                    frontend_public_media / "website-design-pen-tool.png",
                    frontend_public / "design-2048x1492.png",
                    frontend_public / "website-design-pen-tool.png",
                ],
                "media__1786191314350.png": [
                    backend_media_dir / "website-design-hero-teal.png",
                    backend_media_dir / "website-design-banner.png",
                    frontend_public_media / "website-design-hero-teal.png",
                    frontend_public_media / "website-design-banner.png",
                    frontend_public / "website-design-hero-teal.png",
                    frontend_public / "website-design-banner.png",
                ],
                "media__1786192003410.png": [
                    backend_media_dir / "development-hero-banner.png",
                    frontend_public_media / "development-hero-banner.png",
                    frontend_public / "development-hero-banner.png",
                ],
                "media__1786191950129.png": [
                    backend_media_dir / "developer-sticky-notes.png",
                    frontend_public_media / "developer-sticky-notes.png",
                    frontend_public / "developer-sticky-notes.png",
                ],
                "media__1786192015297.png": [
                    backend_media_dir / "website-dev-client-satisfaction.png",
                    frontend_public_media / "website-dev-client-satisfaction.png",
                    frontend_public / "website-dev-client-satisfaction.png",
                ],
                "media__1786194505143.png": [
                    backend_media_dir / "website-dev-client-satisfaction.png",
                    frontend_public_media / "website-dev-client-satisfaction.png",
                    frontend_public / "website-dev-client-satisfaction.png",
                ],
                "media__1786194680430.png": [
                    backend_media_dir / "ecommerce-hero-banner.png",
                    frontend_public_media / "ecommerce-hero-banner.png",
                    frontend_public / "ecommerce-hero-banner.png",
                ],
                "media__1786194694627.png": [
                    backend_media_dir / "ecommerce-mobile-cart-woman.png",
                    frontend_public_media / "ecommerce-mobile-cart-woman.png",
                    frontend_public / "ecommerce-mobile-cart-woman.png",
                ],
                "media__1786197288194.jpg": [
                    backend_media_dir / "seo-hero-banner.png",
                    frontend_public_media / "seo-hero-banner.png",
                    frontend_public / "seo-hero-banner.png",
                ],
                "media__1786195015219.png": [
                    backend_media_dir / "seo-on-page-illustration.png",
                    frontend_public_media / "seo-on-page-illustration.png",
                    frontend_public / "seo-on-page-illustration.png",
                ],
                "media__1786195036331.png": [
                    backend_media_dir / "seo-off-page-illustration.png",
                    frontend_public_media / "seo-off-page-illustration.png",
                    frontend_public / "seo-off-page-illustration.png",
                ],
                "media__1786195043813.png": [
                    backend_media_dir / "seo-technical-illustration.png",
                    frontend_public_media / "seo-technical-illustration.png",
                    frontend_public / "seo-technical-illustration.png",
                ],
                "media__1786195094623.png": [
                    backend_media_dir / "seo-psychology-illustration.png",
                    frontend_public_media / "seo-psychology-illustration.png",
                    frontend_public / "seo-psychology-illustration.png",
                ],
                "media__1786195311721.png": [
                    backend_media_dir / "digital-marketing-hero-banner.png",
                    frontend_public_media / "digital-marketing-hero-banner.png",
                    frontend_public / "digital-marketing-hero-banner.png",
                ],
                "media__1786195320282.png": [
                    backend_media_dir / "digital-marketing-social-megaphone.png",
                    frontend_public_media / "digital-marketing-social-megaphone.png",
                    frontend_public / "digital-marketing-social-megaphone.png",
                ],
            }
            for src_name, target_paths in brain_mappings.items():
                src_file = brain_dir / src_name
                if src_file.exists():
                    for target in target_paths:
                        shutil.copy2(src_file, target)
            self.stdout.write(self.style.SUCCESS("Logo and banner assets copied successfully."))

        # --- Site settings ---
        SiteSettings.objects.update_or_create(
            pk=1,
            defaults=dict(
                site_name="Digielves Tech Solutions",
                tagline="tech mantras",
                footer_about=(
                    "We at Digielvestech make sure to provide the best services to our clients, "
                    "at affordable prices, while having a client base of 400+ in India. Our services "
                    "include Web designing, website development, e-commerce solutions with Search "
                    "Engine Optimization (SEO), & Digital Marketing."
                ),
                phone_primary="(022) - 26772036 / 66952036",
                phone_secondary="(022) - 66922036 / 42642036",
                email="info@digielvestech.in",
                address="40, Level II, Dewan Centre, S V Rd, Jogeshwari West, Mumbai, Maharashtra 400102",
                facebook_url="https://www.facebook.com/DigiElves",
                instagram_url="https://instagram.com/envisageinsightsllp",
                copyright_text="© 2022 Digielvestech. | All Rights Reserved.",
            ),
        )
        self.stdout.write(self.style.SUCCESS("Site settings ready."))

        # --- About page ---
        about, _ = AboutSection.objects.update_or_create(
            pk=1,
            defaults=dict(
                heading="We Provides Best Advice For Your Business",
                intro_paragraph=(
                    "Digielves Tech is the IT subsidiary of Envisage Insights LLP. Envisage "
                    "is a brand communication and management agency working in the "
                    "Healthcare sector for over 15 years."
                ),
                body_paragraph=(
                    "The company specializes in providing communication, media and "
                    "marketing solutions to almost all the top healthcare companies in "
                    "India.\n\n"
                    "It has built on its knowledge of the healthcare industry to create "
                    "unique solutions for its companies.\n\n"
                    "Healthcare companies need communication and platforms to reach "
                    "out to their doctors / HCP’s to detail their products and services.\n\n"
                    "In addition, most healthcare companies do have large patient "
                    "awareness and education initiatives which require lots of content "
                    "generation and dissemination."
                ),
                why_choose_heading="Digielvestech is a lot more.",
                why_choose_body=(
                    "We offer website design and development services at affordable prices. "
                    "We are a one-stop shop for all your website needs. We can help you with "
                    "everything from designing and developing your website.\n\n"
                    "In addition to website design and development, we also offer E-commerce "
                    "Solutions, Digital Marketing and SEO. We also work on outsourcing "
                    "projects. We have a wide range of skills and experienced professionals, "
                    "who are always ready to help you with your web projects."
                ),
                difference_intro=(
                    "There are many reasons why you should choose us as your website "
                    "development partner."
                ),
                image="about/profile.png",
                order=0,
            ),
        )
        about.points.all().delete()
        for i, text in enumerate([
            "Firstly, we offer our services at very affordable prices.",
            "Secondly, we have a proven track record of successfully developing websites that meet the specific needs and requirements of our clients.",
            "Thirdly, we use the latest tools and technologies to ensure that your website is at par with the best in the industry.",
            "And last but not the least, we provide personalized attention to each and every client so that you can be assured of the best possible service.",
            "So, if you are looking for a reliable and professional website development company, then look no further than Digielvestech Company."
        ]):
            WhyChooseUsPoint.objects.create(about=about, text=text, order=i)
        self.stdout.write(self.style.SUCCESS("About page seeded."))

        # --- Services ---
        services_data = [
            dict(
                title="Website Design",
                slug="website-design",
                order=0,
                icon="services/design-2048x1492.png",
                banner_image="services/design-2048x1492.png",
                short_description="Digielvestech Love Designing Websites With The Touch Of Creativity. We Understand …",
                intro_heading="Why choose Digielvestech?",
                intro_body=(
                    "Digielvestech is one of the leading web designing companies in Mumbai that "
                    "not only creates a visually appealing website for your business but also "
                    "focuses on adding valuable insights to your business with the core motive "
                    "of generating opportunities and profitability to your business. Digielves Tech "
                    "web design and development team has an in-depth knowledge and skill that "
                    "concentrates on designing constructive customized designs, leading to business "
                    "profitability, increase in website traffic and conversion rates. We also "
                    "provide a variety of web design services like web development, web re-designing, "
                    "web hosting, etc. Digielves Tech excels at creating eye-catching impressive, "
                    "responsive and user-friendly websites with latest advanced technologies. If "
                    "you are looking to convert the idea of your website into reality, contact "
                    "Digielvestech now!"
                ),
                features=(
                    "Visually enticing and appealing website\n"
                    "An optimized website design with easy navigation features\n"
                    "Website can adapt to any screen (Mobile, Laptop, Desktop, etc.)\n"
                    "Image and other media files optimization on the website\n"
                    "Layout consistency throughout the website\n"
                    "Design or colour combination preferences, if any\n"
                    "An SEO friendly website\n"
                    "Additional details, if any"
                ),
                platforms=["WordPress", "JavaScript", "PHP", "HTML", "CSS", "Bootstrap"],
                process=[
                    ("Discovery And Scope", "Efforts are made by the expert team at Digielvestech to create website designs that create interest among viewers and aid in your business’ success."),
                    ("Designs And Development", "After getting an insight on your business, our team will offer you variety of customized design options. We make sure that the designs that we offer defines your business."),
                    ("Coding", "After the approval of the website design, our expert developers create high-quality codes as per the various modules on the website. We help you to integrate your website with your social media pages by including the links in the website"),
                    ("Content Writing And Assembling", "Digielvestech has an expert team that creates SEO-friendly content boosting the rank of the website on the various search engines. The content we create focuses on connecting with the audience by communicating."),
                    ("Testing And Launch", "Following the introduction of the design, we do several tests to ensure that everything is working smoothly, while also monitoring the app from the perspective of the viewer to enhance consumer engagement."),
                    ("Post-Release Support And Maintenance", "Digielvestech innovation ensures that your website runs smoothly and is bug-free. We focus on preserving consistency and, if necessary, assisting in the development of additional features or services."),
                ],
            ),
            dict(
                title="Website Development",
                slug="website-development",
                order=1,
                icon="services/development.png",
                banner_image="services/development.png",
                short_description="We Tag The Name Of Being A Highly Specialized Web Development Company That Has Great ….",
                intro_heading="Digielvestech is a lot more.",
                intro_body=(
                    "Digielvestech is an modern internet improvement business enterprise located at "
                    "Mumbai who believes supply great merchandise at the bottom charges for "
                    "companies all around the world. We provide our consumer a entire layout that "
                    "creates eternal impressions for your clients.\n\n"
                    "Digielvestech may be a leading web site style and web site development company "
                    "that strives to serve all of your web site development wants by exactly and "
                    "strategically analyzing the wants of your business. Your web site is your "
                    "indirect sales representative, it’s accountable to make an impression and "
                    "feeling within the minds of the viewers. website invention has AN full-fledged "
                    "team of net designers that pastor fascinating custom websites, by developing "
                    "your concepts into AN actual premium and well-designed web site.\n\n"
                    "Digielvestech offers varied internet style and development services that "
                    "embody however aren’t restricted to making responsive websites, mobile internet "
                    "development solutions, computer network experiences and custom- e-commerce "
                    "websites. Our knowledgeable team has AN expansive expertise of operating with "
                    "varied industries and merchandise, and that we stand out surpassing shopper "
                    "expectations.\n\n"
                    "We contemplate client satisfaction as our forte as our web-development team "
                    "caters to each side of the client’s web site development method with huge "
                    "depth and exactness, reassuring fast loading time, in depth search choices, "
                    "increased preview choices, a custom layout that helps increase the leads and "
                    "conversion rates."
                ),
                features=(
                    "Excellent pre & post web development services\n"
                    "An optimized website design with easy navigation features\n"
                    "Website can adapt to any screen (Mobile, Laptop, Desktop, etc.)\n"
                    "SEO-friendly and user-friendly website\n"
                    "Layout consistency throughout the website\n"
                    "Seam-less and enhanced user experience\n"
                    "Adaptable websites – accessible on any electronic device\n"
                    "24X7 support and maintenance"
                ),
                platforms=["WordPress", "JavaScript", "PHP", "HTML", "CSS", "Bootstrap"],
                process=[
                    ("Designing", "Web coming up with and development square measure 2 such services that square measure inter-related"),
                    ("Coding", ""),
                    ("Content creation", ""),
                    ("Network configuration", ""),
                    ("Digital Strategy", ""),
                    ("Development", ""),
                    ("Integration", ""),
                    ("Platform Engineering", ""),
                    ("Technical Assistance", ""),
                    ("Maintenance", ""),
                ],
            ),
            dict(
                title="E-Commerce Website",
                slug="e-commerce-website-development",
                order=2,
                icon="services/e-commerce-01-1.png",
                banner_image="services/e-commerce-01-1.png",
                short_description="Our E-Commerce Website Development Services Help Businesses…",
                intro_heading="Digielvestech is a lot more.",
                intro_body=(
                    "Looking for a good resolution to show your web site guests into clients? "
                    "Our e-commerce web site development services facilitate businesses to make "
                    "knowledgeable ecommerce web site to spice up their sales by attracting the customer.\n\n"
                    "We integrate your web site with social media victimisation strategic processes "
                    "therefore creating your web site easy and an efficient tool for your business. "
                    "No wonder, developing an efficient and a flourishing ecommerce web site in not "
                    "a straightforward task. However, we tend to assure you that your web site is "
                    "in safe hands. we’ve got consultants and professionals World Health Organization "
                    "develop and customise your web site with the essential options needed to extend "
                    "the conversion rates and your profit among your given budget.\n\n"
                    "It is necessary that your web site has the mandatory options which is able to "
                    "facilitate it to be a lot of interactive and productive. Our professionals guide "
                    "you thru this vital step i.e. implementing a number of the ‘mandatory’ options "
                    "on your web site such as:"
                ),
                features=(
                    "Accessible Across All Types Of Devices\n"
                    "User Friendly\n"
                    "Efficient Performance\n"
                    "Unique Selling Proposition (USP)\n"
                    "Security\n"
                    "Unique customized ecommerce website design\n"
                    "Installed ‘must-have’ features\n"
                    "Complete development of your e-commerce website\n"
                    "Content that is search-engine friendly\n"
                    "Layout consistency throughout the website\n"
                    "Attractive user-friendly product catalogue\n"
                    "Integration of your website with social media"
                ),
                platforms=["WordPress", "Shopify", "OpenCart", "Magento"],
                process=[
                    ("No matter what reasonably a business you run", "we’ve professionals agency will work wonders on any reasonably web site with productive assurances. Our ball-hawking management understands the necessity of your web site and offers you management concerning the web site show with outstanding made-to-order style that guarantees effective performance i.e. conversion rates therefore high revenue."),
                    ("Right from initial consultation to understanding of the business", "and merchandise, designing, customizing and building your brand- everything is completed with exactitude."),
                    ("By exploitation SEO and SEM", "blogging and linking the web site to numerous social media pages, we have a tendency to additionally concentrate on pull the traffic and changing the guests to customers."),
                    ("So, whether or not you would like to develop a new-ecommerce web site", "for your business, wish to revamp and revamp your already existing ecommerce web site or whether or not you’re searching for ecommerce web site maintenance and management services, we tend to area unit a one-stop answer to any or all your wants.")
                ],
            ),
            dict(
                title="Search Engine Optimization",
                slug="search-engine-optimization",
                order=3,
                icon="services/technical-01-01-1.png",
                banner_image="services/technical-01-01-1.png",
                short_description="Give Your Website Or Web Page Visibility To Have Them Ranked On The First Page …",
                intro_heading="Why choose Digielvestech?",
                intro_body=(
                    "Digielvestech provides result-oriented SEO services that offers your business "
                    "web site visibility and recognition on search engines. Our knowledgeable team "
                    "rigorously analyses the SEO techniques needed for your business, ranking your "
                    "web site high on search engines and giving a user-enhanced expertise. we tend "
                    "to believe that business must always stay prime with google and our SEO services "
                    "attempt to fulfil a similar for you. we tend to not solely specialise in the "
                    "ranking however conjointly certify that you simply gain an outsized client base, "
                    "not solely quantitatively however conjointly qualitatively. web digielvestech "
                    "assures improvement of your entire web site content by managing your SEO "
                    "campaigns with efficiency and effectively.\n\n"
                    "After systematic analyzation, Our team comes up with the foremost viable "
                    "resolution for your web site.\n\n"
                    "The user’s psychology is that they value the relevance of the websites appearing "
                    "on top of the search engines.Our experts do an in-depth research on customer "
                    "psychology by evaluating questions like:\n\n"
                    "- What products are customers interested in?\n"
                    "- What problems customers face while searching for a product/service on search engines?\n"
                    "- What language do customers use to describe things?\n"
                    "- From who are the potential customers buying things from?"
                ),
                features=(
                    "On-Page SEO\n"
                    "Off-Page SEO\n"
                    "Technical SEO"
                ),
                platforms=["Google Search Console", "Google Analytics", "SEMrush", "Ahrefs"],
                process=[
                    ("On-Page SEO", "Digielvestech provides on-point SEO services for any style of web site, boosting their on-line selling wants. Our team contains a made expertise in handling SEO management and offers in depth client engagement by being customer-oriented, performance-based and agile."),
                    ("Off-Page SEO", "Off-page SEO principally includes ‘link-building’ i.e. obtaining links from authoritative sites to your web site. It depends on sources like social networking platforms or blogs of supposed brands, etc. obtaining links from authoritative web sites will create an enormous distinction to your website because it shows Google that folks worth your content and your services will be sure. sensible content can get you natural links that successively can provide you with high rankings and traffic. If you get links from well-known sites, your ranking on the computer programme are pragmatically affected. However, if the links ar paid links, links in article directories or link farms, your ranking are negatively affected. website Digielvestech assures positive off-page SEO to amplify your website ranking. The factors that website Digielvestech consultants contemplate before curating off-page SEO are: web site loading speed, content ability, Redirects, XML website map, URL structure, extra URLs, Duplicate content, Schema and mark-up, info design, internal linking, etc."),
                    ("Technical SEO", "Our consultants professionally handle the technical SEO settings by configuring the websites, making certain that computer programme crawlers will crawl and index your web site with none interruption.")
                ],
            ),
            dict(
                title="Digital Marketing",
                slug="digital-marketing",
                order=4,
                icon="services/digital-marketing.png",
                banner_image="services/digital-marketing.png",
                short_description="Put Your Business Online And Get Help With Maximizing Your Social Media …",
                intro_heading="SMM, SMO, PPC",
                intro_body=(
                    "Social media is phrase of mouth on steroids. Your “followers” can pass from "
                    "clients to ambassadors of your emblem in an instant. Effective control of "
                    "social profiles will permit you to engage together along with your clients, "
                    "customers and each person else who you need to attain in a flash.\n\n"
                    "With social media services, you could beautify your brand`s potential, "
                    "expand unswerving clients in addition to pressure extra visitors on your "
                    "site. Sounds easy sufficient doesn`t it? Yet, in practice, powerful social "
                    "media control is an awful lot greater difficult; and that`s wherein we are "
                    "able to help.\n\n"
                    "Social Media Fom Digielvestech\n"
                    "It`s clean to installation social media profiles isn`t it? Anyone can do it. "
                    "But now no longer all entrepreneurs really apprehend a way to paintings with "
                    "social media. Those which can be a hit at it are few and a ways between. If "
                    "you get it incorrect it is able to harm your brand, however getting it proper "
                    "can propel you in advance of your competitors.\n\n"
                    "Thankfully we’ve the capabilities and know-the way to make any brand`s social "
                    "media marketing campaign successful, all way to our innovative and savvy "
                    "approach. Our group of devoted Social Media professionals can take manufacturers "
                    "of any length and breathe lifestyles into their social media campaigns."
                ),
                features=(
                    "Google Adwords (ppc)\n"
                    "Social Media Optimization\n"
                    "Social Media Marketing"
                ),
                platforms=["Meta Ads", "Google Ads", "Mailchimp", "Canva"],
                process=[
                    ("PPC", "PPC acronym for Pay Per Click is an powerful manner to growth your seek consequences online. It is a paid shape of seek that gives instantaneously consequences withinside the shape of improved traffic on your website. In this method, you need to pay for a hard and fast of key phrases that fees you on a according to click on basis. The most important gain of Pay Per Click is that it offers short consequences. Within 24-forty eight hours the consequences are evident. It isn’t simplest focused however measurable. The on the spotly nature of PPC makes it pretty favored and is really well worth the investment. In PPC you get to select your target market and the quantity of insurance desired."),
                    ("Social Media Optimization", "Social media optimization (SMO) is the use of social media networks to manage and grow an organization’s message and online presence. Social media optimization can be used to increase awareness of new products and services, connect with customers, and mitigate potential damaging news."),
                    ("SMM", "Social media advertising is a paid marketing campaign that is completed on social media systems to connect to your target target market to construct your brand, growth sales, and power internet site traffic. This entails publishing wonderful content material in your social media profiles, being attentive to and tasty your followers, studying your results, and walking social media advertisements."),
                ],
            ),
        ]

        Service.objects.filter(slug__in=["web-portal", "portal", "web-portal-development"]).delete()

        for data in services_data:
            platforms = data.pop("platforms")
            process = data.pop("process")
            service, _ = Service.objects.update_or_create(slug=data["slug"], defaults=data)
            service.platforms.all().delete()
            for i, name in enumerate(platforms):
                TechPlatform.objects.create(service=service, name=name, order=i)
            service.process_steps.all().delete()
            for i, (title, desc) in enumerate(process):
                ProcessStep.objects.create(service=service, title=title, description=desc, order=i)

        self.stdout.write(self.style.SUCCESS(f"{len(services_data)} services seeded with icons and banners."))

        # --- Stats matching original homepage ---
        Stat.objects.all().delete()
        for i, (label, value) in enumerate([
            ("Satisfied Clients", 150),
            ("Projects Done", 280),
            ("E-Commerce Website Done", 20),
            ("Brands Helped", 100),
        ]):
            Stat.objects.create(label=label, value=value, order=i)
        self.stdout.write(self.style.SUCCESS("Stats seeded (150, 280, 20, 100)."))

        # --- Sample projects ---
        Project.objects.all().delete()
        for i, title in enumerate([
            "Healthcare Brand Website", "E-Commerce Storefront", "HCP Engagement Portal",
        ]):
            Project.objects.create(
                title=title,
                slug=title.lower().replace(" ", "-"),
                category="Web Development",
                description="Healthcare and enterprise digital solutions crafted by Digielves Tech.",
                order=i,
            )
        self.stdout.write(self.style.SUCCESS("Projects seeded."))
        self.stdout.write(self.style.SUCCESS("All content and media setup completed."))
