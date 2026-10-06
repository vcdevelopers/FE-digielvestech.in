import { useEffect, useState } from "react";
import { getProjects } from "../api.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(() => {});
  }, []);

  return (
    <>
      <section className="service-hero-section">
        <div className="container">
          <div className="service-banner-box">
            <img
              src="/media/work-banner.jpg"
              alt="Our Work Banner"
              className="service-banner-img"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title-wrap center">
            <h1 className="section-heading" style={{ marginTop: '8px' }}>Our Works</h1>
            <p style={{ marginTop: '10px' }}>Some highlights of labor we`ve achieved for ahead wondering clients.</p>
          </div>
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.slug} className="project-card">
                {p.thumbnail && <img src={p.thumbnail} alt={p.title} />}
                <div className="project-body">
                  <span className="tag">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  {p.project_url && (
                    <a href={p.project_url} target="_blank" rel="noreferrer" className="link-arrow">
                      Visit project →
                    </a>
                  )}
                </div>
              </div>
            ))}
            {projects.length === 0 && <p>Projects coming soon — add them via the Django admin.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
