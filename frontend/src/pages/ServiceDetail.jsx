import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getService } from "../api.js";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setService(null);
    setNotFound(false);
    getService(slug).then(setService).catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="container section center">
        <h2>Service not found</h2>
        <Link to="/" className="link-arrow">← Back home</Link>
      </div>
    );
  }
  if (!service) return <div className="container section">Loading…</div>;

  const isDigitalMarketing = slug === "digital-marketing" || service.title?.toLowerCase().includes("digital marketing") || service.title?.toLowerCase().includes("marketing");
  const isSEO = (slug === "search-engine-optimization" || slug === "seo" || service.title?.toLowerCase().includes("seo") || service.title?.toLowerCase().includes("search engine")) && !isDigitalMarketing;
  const isEcommerce = (slug === "e-commerce-website-development" || slug === "ecommerce-website-development" || service.title?.toLowerCase().includes("e-commerce")) && !isSEO && !isDigitalMarketing;
  const isDevelopment = (slug === "website-development" || service.title?.toLowerCase().includes("development")) && !isEcommerce && !isSEO && !isDigitalMarketing;

  if (isDigitalMarketing) {
    return (
      <div className="service-detail-wrapper">
        {/* 1. Hero Banner */}
        <section className="service-hero-section">
          <div className="container">
            <div className="service-banner-box">
              <img
                src="/media/digital-marketing-hero-banner.png"
                alt="Digital Marketing"
                className="service-banner-img"
              />
            </div>
          </div>
        </section>

        {/* 2. Digital Marketing (SMM, SMO, PPC) */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-image">
                  <img
                    src="/media/developer-sticky-notes.png"
                    alt="Digital Marketing"
                    className="img-fluid"
                  />
                </div>
                <div className="advice-text">
                  <span className="eyebrow-red" style={{ marginBottom: '4px' }}>SMM, SMO, PPC ——</span>
                  <h3 className="red-underlined-heading">Digital Marketing</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151', marginBottom: '14px' }}>
                    Social media is phrase of mouth on steroids. Your “followers” can pass from clients to ambassadors of your emblem in an instant. Effective control of social profiles will permit you to engage together along with your clients, customers and each person else who you need to attain in a flash.
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                    With social media services, you could beautify your brand’s potential, expand unswerving clients in addition to pressure extra visitors on your site. Sounds easy sufficient doesn’t it? Yet, in practice, powerful social media control is an awful lot greater difficult; and that’s wherein we are able to help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Social Media From Digielvestech */}
        <section className="section">
          <div className="container">
            <div className="about-advice-grid" style={{ alignItems: 'center' }}>
              <div className="advice-text">
                <h3 className="red-underlined-heading">Social Media From Digielvestech</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151', marginBottom: '14px' }}>
                  It’s clean to installation social media profiles isn’t it? Anyone can do it. But now no longer all entrepreneurs really apprehend a way to paintings with social media. Those which can be a hit at it are few and a ways between. If you get it incorrect it is able to harm your brand, however getting it proper can propel you in advance of your competitors.
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                  Thankfully we’ve the capabilities and know-the way to make any brand’s social media marketing campaign successful, all way to our innovative and savvy approach. Our group of devoted Social Media professionals can take manufacturers of any length and breathe lifestyles into their social media campaigns. This is how we’ll do it:
                </p>
              </div>
              <div className="advice-image">
                <img
                  src="/media/digital-marketing-social-megaphone.png"
                  alt="Social Media From Digielvestech"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Google Adwords (ppc) */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-text">
                  <span className="eyebrow-red" style={{ marginBottom: '4px' }}>PPC ——</span>
                  <h3 className="red-underlined-heading">Google Adwords (ppc)</h3>
                  <p style={{ fontSize: '0.94rem', lineHeight: '1.7', color: '#374151' }}>
                    PPC acronym for Pay Per Click is an powerful manner to growth your seek consequences online. It is a paid shape of seek that gives instantaneously consequences within-side the shape of improved traffic on your website. In this method, you need to pay for a hard and fast of key phrases that fees you on a according to click on basis. The most important gain of Pay Per Click is that it offers short consequences. Within 24-forty eight hours the consequences are evident. It isn’t simplest focused however measureable. The on the spotly nature of PPC makes it pretty favored and is really well worth the investment. In PPC you get to select your target market and the quantity of insurance desired.
                  </p>
                </div>
                <div className="advice-image">
                  <img
                    src="/media/developer-sticky-notes.png"
                    alt="Google Adwords (ppc)"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Social Media Optimization */}
        <section className="section">
          <div className="container">
            <div className="about-advice-grid" style={{ alignItems: 'center' }}>
              <div className="advice-image">
                <img
                  src="/media/seo-off-page-illustration.png"
                  alt="Social Media Optimization"
                  className="img-fluid"
                />
              </div>
              <div className="advice-text">
                <h3 className="red-underlined-heading">Social Media Optimization</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                  Social media optimization (SMO) is the use of social media networks to manage and grow an organization’s message and online presence. Social media optimization can be used to increase awareness of new products and services, connect with customers, and mitigate potential damaging news.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Social Media Marketing */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-image">
                  <img
                    src="/media/website-design-features.png"
                    alt="Social Media Marketing"
                    className="img-fluid"
                  />
                </div>
                <div className="advice-text">
                  <span className="eyebrow-red" style={{ marginBottom: '4px' }}>SMM ——</span>
                  <h3 className="red-underlined-heading">Social Media Marketing</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                    Social media advertising is a paid marketing campaign that is completed on social media systems to connect to your target target market to construct your brand, growth sales, and power internet site traffic. This entails publishing wonderful content on your social media profiles, listening to and fascinating your fans, analyzing your results, and running social media advertisements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (isSEO) {
    return (
      <div className="service-detail-wrapper">
        {/* 1. Hero Banner */}
        <section className="service-hero-section">
          <div className="container">
            <div className="service-banner-box">
              <img
                src="/media/seo-hero-banner.png"
                alt="Search Engine Optimization"
                className="service-banner-img"
              />
            </div>
          </div>
        </section>

        {/* 2. Why choose Digielvestech? */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-image">
                  <img
                    src="/media/advice-about-us-2048x1224.jpg"
                    alt="Why choose Digielvestech"
                    className="img-fluid bordered-img"
                  />
                </div>
                <div className="advice-text">
                  <h3 className="red-underlined-heading">Why choose Digielvestech?</h3>
                  <p style={{ fontSize: '0.96rem', lineHeight: '1.7', color: '#374151' }}>
                    Digielvestech provides result-oriented SEO services that offers your business web site visibility and recognition on search engines. Our knowledgeable team rigorously analyses the SEO techniques needed for your business, ranking your web site high on search engines and giving a user-enhanced expertise. We tend to believe that business must always stay prime with google and our SEO services attempt to fulfill a similar for you. We tend to not solely specialise in the ranking however conjointly certify that you simply gain an outsized client base, not solely quantitatively however conjointly qualitatively. Digielvestech assures improvement of your entire web site content by managing your SEO campaigns with efficiency and effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Centered Heading */}
        <section className="section" style={{ padding: '24px 0' }}>
          <div className="container center">
            <div className="section-title-wrap center" style={{ maxWidth: '850px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', lineHeight: '1.5' }}>
                After systematic analyzation, Our team comes up with the foremost viable resolution for <span className="underline-red">your web site.</span>
              </h3>
            </div>
          </div>
        </section>

        {/* 4. On-Page SEO */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-text">
                  <h3 className="red-underlined-heading">On-Page SEO</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                    Digielvestech provides on-point SEO services for any style of web site, boosting their on-line selling wants. Our team contains a made expertise in handling SEO management and offers in depth client engagement by being customer-oriented, performance-based and agile.
                  </p>
                </div>
                <div className="advice-image">
                  <img
                    src="/media/seo-on-page-illustration.png"
                    alt="On-Page SEO"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Off-Page SEO */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-image">
                  <img
                    src="/media/seo-off-page-illustration.png"
                    alt="Off-Page SEO"
                    className="img-fluid"
                  />
                </div>
                <div className="advice-text">
                  <h3 className="red-underlined-heading">Off-Page SEO</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: '1.65', color: '#374151' }}>
                    Off-page SEO principally includes ‘link-building’ i.e. obtaining links from authoritative sites to your web site. It depends on sources like social networking platforms or blogs of supposed brands, etc. obtaining links from authoritative web sites will create an enormous distinction to your website because it shows Google that folks worth your content and your services will be sure. Sensible content can get you natural links that successively can provide you with high rankings and traffic. If you get links from well-known sites, your ranking on the computer programme are pragmatically affected. However, if the links are paid links, links in article directories or link farms, your ranking are negatively affected. Digielvestech assures positive off-page SEO to amplify your website ranking. The factors that website Digielvestech consultants contemplate before curating off-page SEO are: web site loading speed, content ability, Redirects, XML website map, URL structure, extra URLs, Duplicate content, Schema and mark-up, Info design, Internal linking, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Technical SEO */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-text">
                  <h3 className="red-underlined-heading">Technical SEO</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                    Our consultants professionally handle the technical SEO settings by configuring the websites, making certain that computer programme crawlers will crawl and index your website with none interruption.
                  </p>
                </div>
                <div className="advice-image">
                  <img
                    src="/media/seo-technical-illustration.png"
                    alt="Technical SEO"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Customer Psychology Section */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-image">
                  <img
                    src="/media/seo-psychology-illustration.png"
                    alt="Customer Psychology"
                    className="img-fluid"
                  />
                </div>
                <div className="advice-text">
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151', marginBottom: '16px' }}>
                    The user’s psychology is that they value the relevance of the websites appearing on top of the search engines. Our experts do an in-depth research on customer psychology by evaluating <span className="underline-red">questions like:</span>
                  </p>
                  <ul className="red-checklist">
                    <li>What products are customers interested in?</li>
                    <li>What problems customers face while searching for a product/service on search engines?</li>
                    <li>What language do customers use to describe things?</li>
                    <li>From who are the potential customers buying things from?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (isEcommerce) {
    return (
      <div className="service-detail-wrapper">
        {/* 1. Hero Banner */}
        <section className="service-hero-section">
          <div className="container">
            <div className="service-banner-box">
              <img
                src="/media/ecommerce-hero-banner.png"
                alt="E-Commerce Website Development"
                className="service-banner-img"
              />
            </div>
          </div>
        </section>

        {/* 2. Digielvestech is a lot more. */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-image">
                  <img
                    src="/media/advice-about-us-2048x1224.jpg"
                    alt="Digielvestech is a lot more"
                    className="img-fluid bordered-img"
                  />
                </div>
                <div className="advice-text">
                  <h3 className="red-underlined-heading">Digielvestech is a lot more.</h3>
                  <p style={{ fontSize: '0.96rem', lineHeight: '1.7', color: '#374151' }}>
                    Looking for a good resolution to show your web site guests into clients? Our e-commerce web site development services facilitate businesses to make knowledgeable ecommerce web site to spice up their sales by attracting the customer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Mandatory Options Section */}
        <section className="section">
          <div className="container">
            <div className="about-advice-grid" style={{ alignItems: 'center' }}>
              <div className="advice-image">
                <img
                  src="/media/ecommerce-mobile-cart-woman.png"
                  alt="Mandatory Options"
                  className="img-fluid"
                />
              </div>
              <div className="advice-text">
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151', marginBottom: '16px' }}>
                  We integrate your web site with social media victimisation strategic processes therefore creating your web site easy and an efficient tool for your business. No wonder, developing an efficient and a flourishing ecommerce web site in not a straightforward task. However, we tend to assure you that your web site is in safe hands; we’ve got consultants and professionals World Health Organization develop and customise your web site with the essential options needed to extend the conversion rates and your profit among your given budget.
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                  It is necessary that your web site has the mandatory options which is able to facilitate it to be a lot of interactive and productive. Our professionals guide you thru this vital step i.e. implementing a number of the ‘mandatory’ options on your web site such as:
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Features We Provide */}
        <section className="section" style={{ background: '#ffffff' }}>
          <div className="container">
            <div className="section-title-wrap center">
              <h2 className="section-heading">
                Features <span className="underline-red">We Provide</span>
              </h2>
            </div>

            <div className="ecom-features-grid">
              <div className="ecom-feature-card">
                <div className="ecom-icon-wrap"><i className="fa-solid fa-desktop"></i></div>
                <h3>Accessible Across All Types Of Devices</h3>
                <p>Be it portable computer, mobile or any device we have a tendency to alter the web site in such the way that it seems engaging once viewed across any device.</p>
              </div>

              <div className="ecom-feature-card">
                <div className="ecom-icon-wrap"><i className="fa-solid fa-user-plus"></i></div>
                <h3>User Friendly</h3>
                <p>The web style is meant in such away that it involves minimum complications so creating it simple for users to use. we have a tendency to check that that there's quick access to cart, Wishlist, catalogue, refund, checkout, etc. reckoning on what's user is trying to find.</p>
              </div>

              <div className="ecom-feature-card">
                <div className="ecom-icon-wrap"><i className="fa-solid fa-paper-plane"></i></div>
                <h3>Efficient Performance</h3>
                <p>The ecommerce websites we create have lighting fast performance backed up by brilliant sales features with low development cost.</p>
              </div>

              <div className="ecom-feature-card">
                <div className="ecom-icon-wrap"><i className="fa-solid fa-certificate"></i></div>
                <h3>Unique Selling Proposition (USP)</h3>
                <p>While planning the e-commerce web site we tend to concentrate on the USP of the merchandise so motivating the guests to form a sale.</p>
              </div>

              <div className="ecom-feature-card">
                <div className="ecom-icon-wrap"><i className="fa-solid fa-shield-halved"></i></div>
                <h3>Security</h3>
                <p>We certify that every one the client knowledge remains secure and additionally offer technical support once the web site is live.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Why Choose Us? */}
        <section className="section" style={{ background: '#ffffff' }}>
          <div className="container">
            <div className="section-title-wrap left" style={{ marginBottom: '24px' }}>
              <h2 className="section-heading">
                Why <span className="underline-red">Choose Us?</span>
              </h2>
            </div>
            <div className="about-advice-grid" style={{ alignItems: 'center' }}>
              <div className="advice-text">
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                  No matter what reasonably a business you run, we’ve professionals agency will work wonders on any reasonably web site with productive assurances. Our ball-hawking management understands the necessity of your web site and offers you management concerning the web site show with outstanding made-to-order style that guarantees effective performance i.e. conversion rates therefore high revenue. Right from initial consultation to understanding of the business and merchandise, designing, customizing and building your brand- everything is completed with exactitude. By exploitation SEO and SEM, blogging and linking the web site to numerous social media pages, we have a tendency to additionally concentrate on pull the traffic and changing the guests to customers.
                </p>
              </div>
              <div className="advice-image">
                <img
                  src="/media/ecommerce-mobile-cart-woman.png"
                  alt="Why Choose Us"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Platform We Use */}
        <section className="section" style={{ background: '#f8f9fa' }}>
          <div className="container center">
            <div className="section-title-wrap center">
              <h2 className="section-heading">
                Platform <span className="underline-red">We Use</span>
              </h2>
            </div>
            <div className="platforms-badge-row">
              <div className="platform-box"><i className="fab fa-wordpress"></i><span>WordPress</span></div>
              <div className="platform-box"><i className="fab fa-shopify"></i><span>Shopify</span></div>
              <div className="platform-box"><i className="fa-solid fa-cart-shopping"></i><span>OpenCart</span></div>
              <div className="platform-box"><i className="fab fa-magento"></i><span>Magento</span></div>
            </div>
          </div>
        </section>

        {/* 7. What We Provide? */}
        <section className="section">
          <div className="container">
            <div className="grey-box">
              <div className="section-title-wrap left" style={{ marginBottom: '24px' }}>
                <h2 className="section-heading">
                  What <span className="underline-red">We Provide?</span>
                </h2>
              </div>
              <div className="about-advice-grid" style={{ alignItems: 'center' }}>
                <div className="advice-image">
                  <img
                    src="/media/website-design-features.png"
                    alt="What We Provide"
                    className="img-fluid"
                  />
                </div>
                <div className="advice-text">
                  <ul className="red-checklist">
                    <li>Unique customized ecommerce website design</li>
                    <li>Installed 'must-have' features</li>
                    <li>Complete development of your e-commerce website</li>
                    <li>Content that is search-engine friendly</li>
                    <li>Layout consistency throughout the website</li>
                    <li>Attractive user-friendly product catalogue</li>
                    <li>Integration of your website with social media</li>
                  </ul>
                  <p style={{ fontSize: '0.92rem', color: '#4b5563', marginTop: '16px', lineHeight: '1.6' }}>
                    So, whether or not you would like to develop a new-ecommerce web site for your business, wish to revamp and revamp your already existing ecommerce web site or whether or not you're searching for ecommerce...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (isDevelopment) {
    return (
      <div className="service-detail-wrapper">
        {/* 1. Hero Banner */}
        <section className="service-hero-section">
          <div className="container">
            <div className="service-banner-box">
              <img
                src="/media/development-hero-banner.png"
                alt="Website Development"
                className="service-banner-img"
              />
            </div>
          </div>
        </section>

        {/* 2. Digielvestech is a lot more. */}
        <section className="section">
          <div className="container">
            <div className="about-advice-grid" style={{ alignItems: 'center' }}>
              <div className="advice-image">
                <img
                  src="/media/advice-about-us-2048x1224.jpg"
                  alt="Digielvestech is a lot more"
                  className="img-fluid bordered-img"
                />
              </div>
              <div className="advice-text">
                <h3 className="red-underlined-heading">Digielvestech is a lot more.</h3>
                <p style={{ fontSize: '0.96rem', lineHeight: '1.7', color: '#374151' }}>
                  Digielvestech is an modern Internet Improvement business enterprise located at Mumbai(India) deliver supply best merchandise at the bottom charges for companies all around the world. We provide our consumer a entire build that create eternal impressions for your clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Developer at Desk & Detailed Text */}
        <section className="section" style={{ background: '#f8f9fa' }}>
          <div className="container">
            <div className="about-advice-grid" style={{ alignItems: 'center' }}>
              <div className="advice-text">
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151', marginBottom: '16px' }}>
                  Digielvestech may be a leading web design and web development company that strive to serve all of your web development needs by exacty and strategically matching the needs of your business. Your web site is your business sales representative. It’s accountable to make an impression and fueling up interest within the minds of the viewers. Website inventor has full-fledged team of web designers that excel creating custom websites, by developing your brand an influential premium and well designed website.
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                  Digielvestech offers varied intense style and development services that embody, however aren't restricted to making responsive websites, mobile internet development solutions, computer network experiences, and custom e-commerce websites. Our knowledgeable team has got extensive expertise of operating with varied industries and merchandise, and thus we stand out surpassing major expectations.
                </p>
              </div>
              <div className="advice-image">
                <img
                  src="/media/developer-sticky-notes.png"
                  alt="Developer at desk"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Platform We Use */}
        <section className="section">
          <div className="container center">
            <div className="section-title-wrap center">
              <h2 className="section-heading">
                Platform <span className="underline-red">We Use</span>
              </h2>
            </div>
            <div className="platforms-badge-row">
              <div className="platform-box"><i className="fab fa-wordpress"></i><span>WordPress</span></div>
              <div className="platform-box"><i className="fab fa-js-square"></i><span>JavaScript</span></div>
              <div className="platform-box"><i className="fab fa-php"></i><span>PHP</span></div>
              <div className="platform-box"><i className="fab fa-html5"></i><span>HTML5</span></div>
              <div className="platform-box"><i className="fab fa-css3-alt"></i><span>CSS3</span></div>
              <div className="platform-box"><i className="fab fa-bootstrap"></i><span>Bootstrap</span></div>
            </div>
          </div>
        </section>

        {/* 5. Client Satisfaction Section */}
        <section className="section" style={{ background: '#f8f9fa' }}>
          <div className="container">
            <div className="about-advice-grid" style={{ alignItems: 'center' }}>
              <div className="advice-image">
                <img
                  src="/media/website-dev-client-satisfaction.png"
                  alt="Web Development Client Satisfaction"
                  className="img-fluid"
                />
              </div>
              <div className="advice-text">
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151', marginBottom: '16px' }}>
                  We prioritize client satisfaction as our primary goal. Our web development team caters to each side of the client's needs with the development method with huge depth and exactness, reducing fast loading time, in-depth search choices, increased preview choices, a custom layout that helps increase the leads and conversion rates.
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>
                  Digielvestech exemplary services have helped several big and big-start enterprises to extend and multiply their business, creating United States one among the leading web site style and development services in Asian nation. With the development we specialized in programming languages, like programming, Hypertext Markup Language (HTML), writing, C++, and alternative technical positivity aspect however it’s balanced the merger of technicalities and creative thinking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Processes Section (10-box grid) */}
        <section className="section">
          <div className="container">
            <div className="section-title-wrap center" style={{ maxWidth: '850px', margin: '0 auto 36px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', lineHeight: '1.5' }}>
                Web coming up with and development square measure 2 such services that square measure inter-related and follows <span className="underline-red">numerous processes including:</span>
              </h3>
            </div>

            <div className="dev-process-10grid">
              <div className="dev-proc-card"><i className="fa-solid fa-compass-drafting"></i><span>Designing</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-code"></i><span>Coding</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-file-signature"></i><span>Content Creation</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-network-wired"></i><span>Network Configuration</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-chart-line"></i><span>Digital Strategy</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-layer-group"></i><span>Development</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-diagram-project"></i><span>Integration</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-server"></i><span>Platform Engineering</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-headset"></i><span>Technical Assistance</span></div>
              <div className="dev-proc-card"><i className="fa-solid fa-screwdriver-wrench"></i><span>Maintenance</span></div>
            </div>
          </div>
        </section>

        {/* 7. What We Offer? */}
        <section className="section" style={{ background: '#f8f9fa' }}>
          <div className="container">
            <div className="section-title-wrap center" style={{ marginBottom: '36px' }}>
              <h2 className="section-heading">
                What <span className="underline-red">We Offer?</span>
              </h2>
            </div>

            <div className="about-advice-grid" style={{ alignItems: 'center' }}>
              <div className="advice-image">
                <img
                  src="/media/website-design-features.png"
                  alt="What We Offer"
                  className="img-fluid"
                />
              </div>
              <div className="advice-text">
                <ul className="red-checklist">
                  <li>Excellent pre & post web development services</li>
                  <li>An optimized website design with easy navigation features</li>
                  <li>Website can adapt to any screen (Mobile, Laptop, Desktop, etc.)</li>
                  <li>SEO-Friendly and User-Friendly website</li>
                  <li>Layout consistency throughout the website</li>
                  <li>Seamless and enhanced user experience</li>
                  <li>Responsive website – accessible on any electronic device</li>
                  <li>24/7 Support and maintenance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Fallback: Website Design View
  return (
    <div className="service-detail-wrapper">
      {/* 1. Hero Banner */}
      <section className="service-hero-section">
        <div className="container">
          <div className="service-banner-box">
            <img
              src="/media/website-design-hero-teal.png"
              alt={service.title}
              className="service-banner-img"
            />
          </div>
        </div>
      </section>

      {/* 2. Why Choose Digielvestech? */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap center">
            <h2 className="section-heading">
              Why choose <span className="underline-red">Digielvestech?</span>
            </h2>
          </div>
          <div className="about-advice-grid">
            <div className="advice-image">
              <img
                src="/media/advice-about-us-2048x1224.jpg"
                alt="Why choose Digielvestech"
                className="img-fluid bordered-img"
              />
            </div>
            <div className="advice-text">
              <p style={{ fontSize: '0.96rem', lineHeight: '1.7', color: '#374151' }}>
                Digielvestech is one of the leading web designing companies in Mumbai that not only creates a visually appealing website for your business but also focuses on building a website that helps your business achieve more leads, generating opportunities and profitability for your business. Digielvestech has a web design and development team that has in-depth knowledge and skill that specializes in designing web solutions customized and tailored according to business profitability, increase in website traffic and conversion rates. We also provide a variety of web design services like web development, web designing, web hosting, etc. Digielvestech is constantly updating taking interactive, responsive and user-friendly websites with latest advanced technologies. If you are looking to convert the idea of your website into reality, contact Digielvestech today!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Platform We Use */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container center">
          <div className="section-title-wrap center">
            <h2 className="section-heading">
              Platform <span className="underline-red">We Use</span>
            </h2>
          </div>
          <div className="platforms-badge-row">
            <div className="platform-box"><i className="fab fa-wordpress"></i><span>WordPress</span></div>
            <div className="platform-box"><i className="fab fa-js-square"></i><span>JavaScript</span></div>
            <div className="platform-box"><i className="fab fa-php"></i><span>PHP</span></div>
            <div className="platform-box"><i className="fab fa-html5"></i><span>HTML5</span></div>
            <div className="platform-box"><i className="fab fa-css3-alt"></i><span>CSS3</span></div>
            <div className="platform-box"><i className="fab fa-bootstrap"></i><span>Bootstrap</span></div>
          </div>
        </div>
      </section>

      {/* 4. Process of Web-Designing */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap center">
            <h2 className="section-heading">
              Process of <span className="underline-red">Web-Designing</span>
            </h2>
          </div>
          <div className="process-cards-grid">
            <div className="process-box">
              <div className="process-icon-wrap"><i className="fa-regular fa-circle-check"></i></div>
              <h3>Discovery And Scope</h3>
              <p>Efforts are made by the expert team at Digielvestech to create website designs that create interest among viewers and aid in your business’ success.</p>
            </div>

            <div className="process-box">
              <div className="process-icon-wrap"><i className="fa-solid fa-desktop"></i></div>
              <h3>Designs And Development</h3>
              <p>After getting an insight on your business, our team will offer you a variety of customized design options. We make sure that the designs that we offer defines your business.</p>
            </div>

            <div className="process-box">
              <div className="process-icon-wrap"><i className="fa-solid fa-code"></i></div>
              <h3>Coding</h3>
              <p>After the approval of the website design, our expert developers create high-quality codes as per the various modules on the website. We help you to integrate your website with your social media pages by including the links in the website</p>
            </div>

            <div className="process-box">
              <div className="process-icon-wrap"><i className="fa-solid fa-pen"></i></div>
              <h3>Content Writing And Assembling</h3>
              <p>Digielvestech has an expert team that creates SEO-friendly content boosting the rank of the website on the various search engines. The content we create focuses on connecting with the audience by communicating.</p>
            </div>

            <div className="process-box">
              <div className="process-icon-wrap"><i className="fa-solid fa-sliders"></i></div>
              <h3>Testing And Launch</h3>
              <p>Following the introduction of the design, we do several tests to ensure that everything is working smoothly, while also monitoring the app from the perspective of the viewer to enhance consumer engagement.</p>
            </div>

            <div className="process-box">
              <div className="process-icon-wrap"><i className="fa-solid fa-gear"></i></div>
              <h3>Post-Release Support And Maintenance</h3>
              <p>Digielvestech Innovation ensures that your website runs smoothly and is bug-free. We focus on preserving consistency and, if necessary, assisting in the development of additional features or services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features we focus on while designing your website */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="section-title-wrap center" style={{ marginBottom: '36px' }}>
            <h2 className="section-heading">
              Features we focus on while designing your website:
            </h2>
          </div>

          <div className="about-advice-grid" style={{ alignItems: 'center' }}>
            <div className="advice-image">
              <img
                src="/media/website-design-features.png"
                alt="Features we focus on"
                className="img-fluid"
              />
            </div>
            <div className="advice-text">
              <ul className="red-checklist">
                <li>Visually pleasing and eye-pleasing website</li>
                <li>Art and modern website design with easy navigation features</li>
                <li>Websites compatible on screens (Mobile, Laptops, Desktops, etc.)</li>
                <li>Images & text that makes content easy to consume</li>
                <li>Layout consistency throughout the website</li>
                <li>Design as per color combination preferences, if any</li>
                <li>An user-friendly website</li>
                <li>Additional details, if any</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
