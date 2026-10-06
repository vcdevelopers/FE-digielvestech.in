import { useEffect, useState } from "react";
import { getSiteSettings, submitContact } from "../api.js";

export default function Contact() {
  const [s, setS] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "", website: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getSiteSettings().then(setS).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    try {
      await submitContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", mobile: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      if (err?.response?.data) setErrors(err.response.data);
    }
  };

  return (
    <>
      <section className="service-hero-section">
        <div className="container">
          <div className="service-banner-box">
            <img
              src="/media/contact-banner.jpg"
              alt="Contact Us Banner"
              className="service-banner-img"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title-wrap center">
            <span className="eyebrow-red" style={{ textAlign: 'center' }}>----GET IN TOUCH</span>
            <h1 className="section-heading" style={{ marginTop: '8px' }}>Contact Us</h1>
          </div>
          <div className="two-col" style={{ marginTop: '32px' }}>
          <div className="contact-info-block">
            <h3><i className="fa-solid fa-envelope"></i> Email Id</h3>
            <p>{s?.email}</p>
            <h3><i className="fa-solid fa-phone-volume"></i> Phone No</h3>
            <p>{s?.phone_primary} / {s?.phone_secondary}</p>
            <h3><i className="fa-solid fa-location-dot"></i> Address</h3>
            <p>{s?.address}</p>

            {s?.google_maps_embed && (
              <iframe
                title="Location"
                src={s.google_maps_embed}
                width="100%"
                height="300"
                style={{ border: 0, marginTop: "1.5rem" }}
                loading="lazy"
              />
            )}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot: real visitors never see or fill this in; bots that
                auto-fill every field will, and the backend rejects it. */}
            <label className="hp-field" aria-hidden="true">
              Website
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
            <label>
              Your Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Your Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Mobile No
              <input name="mobile" value={form.mobile} onChange={handleChange} />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
            </label>

            <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "sent" && <p className="form-success">Thanks — we'll get back to you shortly.</p>}
            {status === "error" && (
              <p className="form-error">
                {errors?.detail || "Something went wrong. Please check the fields and try again."}
              </p>
            )}
          </form>
          </div>
        </div>
      </section>
    </>
  );
}
