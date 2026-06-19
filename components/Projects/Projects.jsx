import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiX, HiZoomIn, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import eattendanceImg from '../../assets/eattendance.png';
import eattendance2 from '../../assets/eattendance-2.png';
import ecommerce1 from '../../assets/ecommerce-1.png';
import ecommerce2 from '../../assets/ecommerce-2.png';
import ecommerce3 from '../../assets/ecommerce-3.png';
import ecommerce4 from '../../assets/ecommerce-4.png';
import pizza1 from '../../assets/pizza-1.png';
import pizza2 from '../../assets/pizza-2.png';
import pizza3 from '../../assets/pizza-3.png';
import coffee1 from '../../assets/coffee-1.png';
import coffee2 from '../../assets/coffee-2.png';
import coffee3 from '../../assets/coffee-3.png';
import portfolio1 from '../../assets/portfolio-1.png';
import portfolio2 from '../../assets/portfolio-2.png';
import portfolio3 from '../../assets/portfolio-3.png';
import portfolio4 from '../../assets/portfolio-4.png';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Starbucks Coffee — POS System',
    description:
      'A professional Point-of-Sale system built for Starbucks Coffee Company. Features a secure role-based login (Admin & Cashier accounts), a real-time admin dashboard showing today\'s revenue, monthly revenue, active products, and staff count. The POS terminal displays the full product menu (Espresso, Frappuccino, Cold Brew, Tea, Pastries, Smoothies) with category filters, live cart management, tax calculation, and Cash/Card payment support. Includes a 7-day revenue bar chart, top products ranking, and recent transaction history.',
    emoji: '☕',
    images: [
      { src: coffee1, label: 'Login Page' },
      { src: coffee2, label: 'Admin Dashboard' },
      { src: coffee3, label: 'POS Terminal' },
    ],
    tags: ['Java', 'JavaFX', 'MySQL', 'POS'],
    color: '#16a34a',
    github: 'https://github.com',
    live: null,
    featured: true,
    category: 'POS System',
  },
  {
    id: 2,
    title: 'POS Pizza Company System',
    description:
      'A Point-of-Sale application tailored for a pizza restaurant — Pizza Pasta Corner. Includes product catalog with category tabs, live cart management, Friday special discounts, receipt printing with PDF export, dashboard analytics, and full order management.',
    emoji: '🍕',
    images: [
      { src: pizza2, label: 'Dashboard' },
      { src: pizza3, label: 'POS & Cart' },
      { src: pizza1, label: 'Receipt & Print' },
    ],
    tags: ['Java', 'JavaFX', 'MySQL', 'POS'],
    color: '#dc2626',
    github: 'https://github.com',
    live: null,
    featured: true,
    category: 'POS System',
  },
  {
    id: 3,
    title: 'iPhone Store — E-Commerce',
    description:
      'A full-featured iPhone e-commerce platform with a public storefront, product catalog, shopping cart, and a complete admin panel for managing orders, products, categories, and revenue analytics.',
    emoji: '🛒',
    images: [
      { src: ecommerce4, label: 'Homepage' },
      { src: ecommerce3, label: 'Shop' },
      { src: ecommerce2, label: 'Products Admin' },
      { src: ecommerce1, label: 'Orders Admin' },
    ],
    tags: ['Python', 'HTML', 'CSS', 'MySQL'],
    color: '#06b6d4',
    github: 'https://github.com',
    live: null,
    featured: true,
    category: 'Web App',
  },
  {
    id: 4,
    title: 'E-Attendance School System',
    description:
      'A desktop application built with C# (.NET WinForms) for managing student attendance in a school environment. Features a secure login system with Register & Sign In, a full attendance dashboard for recording student check-in/check-out, class-wise attendance reports, status tracking (Present / Absent / Late), and monthly analytics for teachers and administrators. Built with SQL Server and follows clean OOP architecture.',
    emoji: '🏫',
    images: [
      { src: eattendance2, label: 'Login Screen' },
      { src: eattendanceImg, label: 'Attendance Dashboard' },
    ],
    tags: ['C#', '.NET', 'SQL Server', 'WinForms'],
    color: '#7c3aed',
    github: 'https://github.com',
    live: null,
    featured: true,
    category: 'Desktop App',
  },
  {
    id: 5,
    title: 'Personal Portfolio Website',
    description:
      'This very portfolio you are viewing right now! A modern animated personal portfolio built with React 19, Framer Motion & GSAP. Features a particle canvas hero, smooth scroll-spy navbar, animated skill progress bars, multi-image project gallery with lightbox viewer, custom cursor, and a fully responsive dark UI — deployed and live.',
    emoji: '💼',
    images: [
      { src: portfolio1, label: 'Hero Page' },
      { src: portfolio2, label: 'About Me' },
      { src: portfolio3, label: 'Skills' },
      { src: portfolio4, label: 'Projects' },
    ],
    tags: ['React', 'Framer Motion', 'GSAP', 'CSS'],
    color: '#22c55e',
    github: 'https://github.com',
    live: 'http://localhost:5173',
    featured: false,
    category: 'Web App',
  },
];

/* ─────────────────────────────────────────
   LIGHTBOX  (supports multi-image nav)
───────────────────────────────────────── */
const Lightbox = ({ project, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex ?? 0);
  const images = project.images;
  const total = images.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      {/* Close */}
      <motion.button
        className="lightbox-close"
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12 }}
        aria-label="Close"
      >
        <HiX />
      </motion.button>

      {/* Counter */}
      {total > 1 && (
        <div className="lightbox-counter">
          {current + 1} / {total}
        </div>
      )}

      {/* Main content */}
      <motion.div
        className="lightbox-content"
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 28 }}
        transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button className="lightbox-arrow arrow-left" onClick={prev} aria-label="Previous">
              <HiChevronLeft />
            </button>
            <button className="lightbox-arrow arrow-right" onClick={next} aria-label="Next">
              <HiChevronRight />
            </button>
          </>
        )}

        {/* Image with slide animation */}
        <div className="lightbox-img-wrap">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current].src}
              alt={`${project.title} — ${images[current].label}`}
              className="lightbox-img"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.22 }}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="lightbox-footer">
          <div className="lightbox-info">
            <span className="lightbox-emoji">{project.emoji}</span>
            <div>
              <h3 className="lightbox-title">{project.title}</h3>
              <span
                className="lightbox-badge"
                style={{ color: project.color, borderColor: `${project.color}60`, background: `${project.color}15` }}
              >
                {project.category}
              </span>
            </div>
          </div>

          <div className="lightbox-right">
            {/* Screen label */}
            <span className="lightbox-screen-label" style={{ color: project.color }}>
              📸 {images[current].label}
            </span>

            {/* Dot indicators */}
            {total > 1 && (
              <div className="lightbox-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`lightbox-dot ${i === current ? 'active' : ''}`}
                    style={{ background: i === current ? project.color : undefined }}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        {total > 1 && (
          <div className="lightbox-thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                className={`lightbox-thumb ${i === current ? 'active' : ''}`}
                style={{ borderColor: i === current ? project.color : 'transparent' }}
                onClick={() => setCurrent(i)}
                aria-label={img.label}
              >
                <img src={img.src} alt={img.label} />
                <span>{img.label}</span>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <p className="lightbox-hint">← → Arrow keys to navigate · ESC to close</p>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────── */
const ProjectCard = ({ project, index, isInView, onImageClick }) => {
  const [previewIdx, setPreviewIdx] = useState(0);
  const hasImages = project.images && project.images.length > 0;

  return (
    <motion.div
      className={`project-card ${project.featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* ── Image Area ── */}
      <div
        className={`project-image ${hasImages ? 'has-screenshot' : ''}`}
        style={{ background: `${project.color}12` }}
      >
        {hasImages ? (
          <>
            {/* Slide preview */}
            <AnimatePresence mode="wait">
              <motion.img
                key={previewIdx}
                src={project.images[previewIdx].src}
                alt={project.images[previewIdx].label}
                className="project-screenshot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Hover overlay — click to open lightbox */}
            <button
              className="screenshot-expand-btn"
              onClick={() => onImageClick(project, previewIdx)}
              aria-label="View full image"
            >
              <HiZoomIn />
              <span>View Full</span>
            </button>

            {/* Mini thumb dots on card (multi-image only) */}
            {project.images.length > 1 && (
              <div className="card-mini-dots" onClick={(e) => e.stopPropagation()}>
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    className={`card-mini-dot ${i === previewIdx ? 'active' : ''}`}
                    style={{ background: i === previewIdx ? project.color : undefined }}
                    onMouseEnter={() => setPreviewIdx(i)}
                    onClick={() => setPreviewIdx(i)}
                    aria-label={`Preview ${project.images[i].label}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="project-emoji">{project.emoji}</div>
        )}

        <div className="project-glow" style={{ background: `radial-gradient(circle, ${project.color}25, transparent 70%)` }} />
        <span
          className="project-category-badge"
          style={{ background: `${project.color}22`, color: project.color, borderColor: `${project.color}50` }}
        >
          {project.category}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="project-body">
        {project.featured && <span className="featured-badge">⭐ Featured</span>}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="project-tag"
              style={{ background: `${project.color}15`, borderColor: `${project.color}40`, color: project.color }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
            <FaGithub /> Code
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="project-link live">
              <HiExternalLink /> Live Demo
            </a>
          )}
          {hasImages && project.images.length > 1 && (
            <button
              className="project-link gallery-btn"
              onClick={() => onImageClick(project, 0)}
            >
              🖼 {project.images.length} Screenshots
            </button>
          )}
        </div>
      </div>

      <div className="card-border" style={{ borderColor: `${project.color}50` }} />
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [lightbox, setLightbox] = useState(null); // { project, startIndex }

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">What I&apos;ve Built</span>
          <h2 className="section-title">My <span>Projects</span></h2>
          <p className="section-subtitle">// A selection of my recent work</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isInView={isInView}
              onImageClick={(p, idx) => setLightbox({ project: p, startIndex: idx })}
            />
          ))}
        </div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-outline">
            <FaGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            project={lightbox.project}
            startIndex={lightbox.startIndex}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
