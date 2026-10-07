import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMenu, FiX,
  FiDownload, FiCode, FiExternalLink, FiMapPin, FiAward
} from "react-icons/fi";
import { portfolioData as data } from "./data/portfolioData";
import "./App.css";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="section-title">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function App() {
  const [menu, setMenu] = useState(false);

  const nav = ["About", "Skills", "Projects", "Education", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const profileIcon = (type) => {
    if (type === "github") return <FiGithub />;
    if (type === "linkedin") return <FiLinkedin />;
    return <span className="code-icon">{"</>" }</span>;
  };

  return (
    <div className="site">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="navbar">
        <div className="nav-inner">
          <button className="brand" onClick={() => scrollTo("about")} aria-label="Go home">
            <span className="brand-mark">&lt;/&gt;</span>
            <span>{data.personal.firstName}</span>
          </button>

          <nav className="desktop-nav">
            {nav.map(item => (
              <button key={item} onClick={() => scrollTo(item)}>{item}</button>
            ))}
          </nav>

          <div className="nav-actions">
            {data.personal.resume && (
              <a className="nav-resume" href={data.personal.resume} target="_blank" rel="noreferrer">
                Resume <FiArrowUpRight />
              </a>
            )}
            <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
              {menu ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {nav.map(item => (
                <button key={item} onClick={() => scrollTo(item)}>{item}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="status-pill">
                <span className="status-dot" />
                Available for opportunities
              </div>
              <p className="hero-kicker">{data.personal.title}</p>
              <h1>{data.personal.name}</h1>
              <p className="hero-description">{data.personal.tagline}</p>

              <div className="hero-actions">
                <button className="primary-button" onClick={() => scrollTo("projects")}>
                  View projects <FiArrowUpRight />
                </button>
                <button className="secondary-button" onClick={() => scrollTo("contact")}>
                  Get in touch
                </button>
              </div>

              <div className="hero-meta">
                <span><FiMapPin /> {data.personal.location}</span>
                <span><FiCode /> Open to learning & building</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="code-window">
                <div className="window-bar">
                  <span /><span /><span />
                  <small>developer.js</small>
                </div>
                <pre><code>{`const developer = {
  name: "${data.personal.firstName}",
  role: "CSE Student",
  mindset: "always learning",
  builds: ["projects", "ideas"],
  goal: "create impact"
};`}</code></pre>
              </div>
            </motion.div>
          </div>
        </section>

        <Section id="about" eyebrow="01 — About" title="Curious by default.">
          <div className="about-grid">
            <p className="lead">{data.personal.bio}</p>
            <div className="about-note">
              <span className="quote-mark">“</span>
              <p>Learning the fundamentals deeply, building consistently, and improving one project at a time.</p>
            </div>
          </div>
        </Section>

        <Section id="skills" eyebrow="02 — Skills" title="Tools I work with.">
          <div className="skills-grid">
            {data.skills.map((group, i) => (
              <motion.div
                className="skill-group"
                key={group.category}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <h3>{group.category}</h3>
                <div className="skill-list">
                  {group.items.map(skill => <span key={skill}>{skill}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="03 — Projects" title="Things I've built.">
          <div className="projects-grid">
            {data.projects.map((project, i) => (
              <motion.article
                className="project-card"
                key={`${project.title}-${i}`}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="project-number">0{i + 1}</div>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-row">
                    {project.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="project-links">
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a>}
                  {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <FiExternalLink /></a>}
                </div>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="education" eyebrow="04 — Education" title="The foundation.">
          <div className="timeline">
            {data.education.map((edu, i) => (
              <motion.div
                className="timeline-item"
                key={i}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-period">{edu.period}</span>
                  <h3>{edu.degree}</h3>
                  <p className="institution">{edu.institution} · {edu.location}</p>
                  <p>{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {(data.achievements.length > 0 || data.certifications.length > 0 || data.profiles.some(p => p.url)) && (
          <Section id="profiles" eyebrow="05 — Beyond the classroom" title="Progress, proof & practice.">
            <div className="profiles-grid">
              {data.achievements.map((a, i) => (
                <div className="simple-card" key={`a-${i}`}><FiAward /><h3>{a.title}</h3><p>{a.description}</p></div>
              ))}
              {data.certifications.map((c, i) => (
                <div className="simple-card" key={`c-${i}`}><FiAward /><h3>{c.name}</h3><p>{c.issuer} · {c.date}</p></div>
              ))}
              {data.profiles.filter(p => p.url).map(p => (
                <a className="profile-card" key={p.name} href={p.url} target="_blank" rel="noreferrer">
                  <span className="profile-icon">{profileIcon(p.icon)}</span>
                  <span><strong>{p.name}</strong><small>{p.handle}</small></span>
                  <FiArrowUpRight />
                </a>
              ))}
            </div>
          </Section>
        )}

        <section className="contact-section" id="contact">
          <div className="container">
            <motion.div
              className="contact-box"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="eyebrow">06 — Contact</div>
                <h2>Let's build something useful.</h2>
                <p>Have an idea, opportunity, or simply want to connect? My inbox is open.</p>
              </div>
              <div className="contact-actions">
                {data.personal.email && !data.personal.email.startsWith("[") && (
                  <a className="primary-button" href={`mailto:${data.personal.email}`}>
                    <FiMail /> Email me
                  </a>
                )}
                {data.personal.resume && (
                  <a className="secondary-button" href={data.personal.resume} target="_blank" rel="noreferrer">
                    <FiDownload /> Resume
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {data.personal.name}</span>
          <div className="footer-links">
            {data.social.github && <a href={data.social.github} target="_blank" rel="noreferrer"><FiGithub /></a>}
            {data.social.linkedin && <a href={data.social.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /></a>}
            {data.personal.email && !data.personal.email.startsWith("[") && <a href={`mailto:${data.personal.email}`}><FiMail /></a>}
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
        </div>
      </footer>
    </div>
  );
}

export default App;