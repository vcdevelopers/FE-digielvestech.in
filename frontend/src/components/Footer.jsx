import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSiteSettings } from "../api.js";

export default function Footer() {
  const [s, setS] = useState(null);

  useEffect(() => {
    getSiteSettings().then(setS).catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="footer-inner-2col">
        <div className="footer-col-left">
          <img src="/media/logo.png" alt="Digielves Logo" className="footer-main-logo" onError={(e) => e.target.style.display = 'none'} />
          <p className="footer-about-text">{s?.footer_about}</p>
          <div className="footer-social-bar">
            <span className="social-text">FOLLOW US ON</span>
            {s?.facebook_url && <a href={s.facebook_url} target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>}
            {s?.instagram_url && <a href={s.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>}
          </div>
        </div>

        <div className="footer-col-right">
          <h4 className="footer-contact-title">Contact Us</h4>
          <ul className="footer-contact-list">
            <li><i className="fa-solid fa-phone-volume"></i> {s?.phone_primary}</li>
            <li><i className="fa-solid fa-phone-volume"></i> {s?.phone_secondary}</li>
            <li><i className="fa-solid fa-envelope"></i> {s?.email}</li>
            <li><i className="fa-solid fa-location-dot"></i> {s?.address}</li>
          </ul>
          <img src="/media/envisage-logo.png" alt="Envisage Logo" className="footer-envisage-logo" onError={(e) => e.target.style.display = 'none'} />
        </div>
      </div>
      <div className="footer-bottom">{s?.copyright_text || "© 2022 Digielvestech. | All Rights Reserved."}</div>
    </footer>
  );
}
