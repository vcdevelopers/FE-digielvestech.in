import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices, getStats, getAbout } from "../api.js";

// Fallback images matching the home_page assets
const serviceMediaMap = {
  "website-design": "/media/website-design-vector-v2.png",
  "website-development": "/media/development.png",
  "e-commerce-website-development": "/media/e-commerce-01-1.png",
  "search-engine-optimization": "/media/technical-01-01-1.png",
  "digital-marketing": "/media/digital-marketing.png",
};

// Fallback static services data in case API is loading or initial setup
const defaultServices = [
  {
    title: "Website Design",
    slug: "website-design",
    short_description: "Digielvestech Love Designing Websites With The Touch Of Creativity. We Understand …",
    icon: "/media/website-design-vector-v2.png",
  },
  {
    title: "Website Development",
    slug: "website-development",
    short_description: "We Tag The Name Of Being A Highly Specialized Web Development Company That Has Great …",
    icon: "/media/development.png",
  },
  {
    title: "E-Commerce Website",
    slug: "e-commerce-website-development",
    short_description: "Our E-Commerce Website Development Services Help Businesses…",
    icon: "/media/e-commerce-01-1.png",
  },
  {
    title: "Search Engine Optimization",
    slug: "search-engine-optimization",
    short_description: "Give Your Website Or Web Page Visibility To Have Them Ranked On The First Page …",
    icon: "/media/technical-01-01-1.png",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    short_description: "Put Your Business Online And Get Help With Maximizing Your Social Media …",
    icon: "/media/digital-marketing.png",
  },
];

const defaultStats = [
  { id: 1, label: "SATISFIED CLIENTS", value: 150 },
  { id: 2, label: "PROJECTS DONE", value: 280 },
  { id: 3, label: "E-COMMERCE WEBSITE DONE", value: 20 },
  { id: 4, label: "BRANDS HELPED", value: 100 },
];

function Counter({ value }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1500;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(p * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}</>;
}

export default function Home() {
  const [services, setServices] = useState(defaultServices);
  const [stats, setStats] = useState(defaultStats);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    getServices()
      .then((data) => {
        if (data && data.length > 0) setServices(data);
      })
      .catch(() => {});

    getStats()
      .then((data) => {
        if (data && data.length > 0) setStats(data);
      })
      .catch(() => {});

    getAbout()
      .then(setAbout)
      .catch(() => {});
  }, []);

  return (
    <div className="home-page-container">
      {/* 1. Hero Section */}
      <section className="service-hero-section">
        <div className="container">
          <div className="home-hero-banner-box">
            <div className="home-hero-text-col">
              <h1 className="home-hero-heading">
                Business is<br />
                <span className="text-yellow">Now Digital</span>
              </h1>
              <div className="hero-sub-line"></div>
              <p className="home-hero-description">
                We blend insights and strategy to create digital products for
                forward-thinking organisations.
              </p>
            </div>
            <div className="home-hero-video-col">
              <video
                className="home-hero-banner-video"
                src="/media/Envisage_AV.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Us Section */}
      <section className="section home-about-section">
        <div className="container">
          <div className="section-title-wrap left">
            <h2 className="section-heading">
              About <span className="underline-red">Us</span>
            </h2>
          </div>
          <div className="home-about-grid">
            <div className="home-about-copy">
              <p>
                Digielves Tech is the IT subsidiary of Envisage Insights LLP. Envisage is a brand
                communication and management agency working in the Healthcare sector for over 15 years.
              </p>
              <p>
                The company specializes in providing communication, media and marketing solutions to
                almost all the top healthcare companies in India.
              </p>
              <p>
                It has built on its knowledge of the healthcare industry to create unique solutions for
                its companies.
              </p>
              <p>
                Healthcare companies need communication and platforms to reach out to their doctors /
                HCP’s to detail their products and services.
              </p>
              <p>
                In addition, most healthcare companies do have large patient awareness and education
                initiatives which require lots of content generation and dissemination.
              </p>
            </div>
            <div className="home-about-image-col">
              <div className="about-blob-wrapper">
                <img
                  src="/media/profile.png"
                  alt="Digielves Tech Healthcare Specialists"
                  className="about-profile-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services Section */}
      <section className="section home-services-section">
        <div className="container">
          <div className="section-title-wrap center">
            <h2 className="section-heading">
              Our <span className="underline-red">Services</span>
            </h2>
          </div>
          <div className="home-services-grid">
            {services.map((svc) => {
              const imgSrc = svc.icon || serviceMediaMap[svc.slug] || "/media/design-2048x1492.png";
              return (
                <div key={svc.slug} className="home-service-card">
                  <div className="home-service-card-img-box">
                    <img src={imgSrc} alt={svc.title} className="home-service-img" />
                  </div>
                  <h3 className="home-service-title">{svc.title}</h3>
                  <p className="home-service-desc">{svc.short_description}</p>
                  <Link to={`/services/${svc.slug}`} className="btn-read-more">
                    Read More
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Stats Band */}
      <section className="home-stats-band">
        <div className="container">
          <div className="home-stats-grid">
            {stats.map((s) => (
              <div key={s.id || s.label} className="home-stat-item">
                <span className="home-stat-number">
                  <Counter value={s.value} />
                </span>
                <span className="home-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Projects CTA Banner */}
      <section className="home-projects-banner">
        <div className="container home-projects-banner-inner">
          <div className="home-projects-banner-left">
            <div className="projects-eyebrow">
              <span>OUR PROJECTS</span>
              <span className="eyebrow-line" />
            </div>
            <h2 className="projects-banner-title">Want to see our more creative work?</h2>
          </div>
          <div className="home-projects-banner-right">
            <Link to="/projects" className="btn-view-projects">
              View all Projects
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Creative Design Services Section */}
      <section className="section home-creative-section">
        <div className="container home-creative-inner">
          <div className="home-creative-visual">
            <img
              src="/media/design-2048x1492.png"
              alt="Creative Design Services"
              className="home-creative-img"
            />
          </div>
          <div className="home-creative-text">
            <h2 className="home-creative-heading">
              <span className="heading-dark">Creative</span><br />
              <span className="heading-red">Design Services</span>
            </h2>
            <p className="home-creative-desc">
              Looking for a fine looking, new website? Our brand style services square measure of the
              best quality &amp; come back at a reasonable value. you’ll be able to trust our brand
              style specialists to return up with a brand that completely expresses your company’s
              identity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
