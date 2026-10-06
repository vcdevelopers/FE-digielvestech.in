import { useEffect, useState } from "react";
import { getAbout } from "../api.js";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    getAbout().then(setAbout).catch(() => {});
  }, []);

  return (
    <div className="about-page-wrapper">
      {/* 1. Hero Banner */}
      <section className="about-hero-banner">
        <img
          src="/media/aboutus-copy.jpg"
          alt="About Digielvestech"
          className="about-hero-img"
        />
      </section>


      {/* 2. Best Advice Section */}
      <section className="section about-advice-section">
        <div className="container">
          <div className="about-advice-grid">
            <div className="advice-image">
              <img
                src="/media/advice-about-us-2048x1224.jpg"
                alt="Business Advice"
                className="img-fluid"
              />
            </div>
            <div className="advice-text">
              <span className="eyebrow-red">----ABOUT US</span>
              <h2 className="advice-heading">We Provides Best Advice For Your Business</h2>
              <p className="advice-subtext">
                We are a web design and development company based in Mumbai, Maharashtra.
                However, we have quickly made a name for ourselves in the website development industry.
              </p>
            </div>
          </div>
          <div className="advice-full-text">
            <p>
              We have developed more than 500 Websites, including more than 55 E-commerce Websites.
              We have also worked with international clients. We believe that our success lies in our
              ability to understand our clients’ needs and to tailor our services to meet those needs.
            </p>
            <p>
              We are also a team of highly skilled and experienced professionals who are passionate
              about our work. We are committed to providing our clients with the best possible service
              and to helping them grow their businesses online.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us? (Part 1) */}
      <section className="section about-why-1">
        <div className="container">
          <div className="section-title-wrap center">
            <h2 className="section-heading">
              Why <span className="underline-red">Choose Us?</span>
            </h2>
          </div>
          <div className="grey-box">
            <h3 className="red-underlined-heading">Digielvestech is a lot more.</h3>
            <p>
              We offer website design and development services at affordable prices. We are a one-stop
              shop for all your website needs. We can help you with everything from designing and
              developing your website.
            </p>
            <p>
              In addition to website design and development, we also offer E-commerce Solutions,
              Digital Marketing and SEO. We also work on outsourcing projects. We have a wide range of
              skills and experienced professionals, who are always ready to help you with your web
              projects.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us? (Part 2) */}
      <section className="section about-why-2" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="section-title-wrap center">
            <h2 className="section-heading">
              Why <span className="underline-red">Choose Us?</span>
            </h2>
          </div>
          <div className="grey-box">
            <h3 className="red-underlined-heading">A choice that makes the difference</h3>
            <p>There are many reasons why you should choose us as your website development partner.</p>
            <ul className="red-checklist">
              <li>Firstly, we offer our services at very affordable prices.</li>
              <li>
                Secondly, we have a proven track record of successfully developing websites that meet
                the specific needs and requirements of our clients.
              </li>
              <li>
                Thirdly, we use the latest tools and technologies to ensure that your website is at par
                with the best in the industry.
              </li>
              <li>
                And last but not the least, we provide personalized attention to each and every client
                so that you can be assured of the best possible service.
              </li>
            </ul>
            <p className="mt-3">
              So, if you are looking for a reliable and professional website development company, then
              look no further than Digielvestech Company.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Our Aim Section */}
      <section className="section about-aim-section">
        <div className="container">
          <div className="about-aim-grid">
            <div className="aim-text">
              <span className="eyebrow-red">----WHY CHOOSE US</span>
              <h2 className="advice-heading">
                Our aim is to provide best service to our clients. And take there business to next level.
              </h2>
              <p>
                We love to make a difference by creating digital experiences that simplify and enhance value.
              </p>
            </div>
            <div className="aim-image">
              <img src="/media/customize-1.jpg" alt="Our Aim" className="img-fluid bordered-img" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
