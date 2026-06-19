import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaTelegram, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top" />
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-bracket">&lt;</span>
              <span>KimHong</span>
              <span className="logo-bracket"> /&gt;</span>
            </div>
            <p className="footer-tagline">
              Software Engineering student passionate about crafting elegant solutions
              and building the future with code.
            </p>
            <div className="footer-socials">
              {[
                { icon: <FaGithub />, href: 'https://github.com', label: 'GitHub' },
                { icon: <FaLinkedin />, href: 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_top_card%3B1ffed2SFTeWO3laCjt%2FARg%3D%3D', label: 'LinkedIn' },
                { icon: <FaTelegram />, href: 'https://t.me', label: 'Telegram' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="footer-social"
                  whileHover={{ scale: 1.2, y: -3 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              {[
                { label: 'Home', to: 'hero' },
                { label: 'About', to: 'about' },
                { label: 'Skills', to: 'skills' },
                { label: 'Projects', to: 'projects' },
                { label: 'Contact', to: 'contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} smooth duration={600} offset={-80} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="footer-col">
            <h4 className="footer-col-title">Technologies</h4>
            <ul className="footer-links">
              {['Java', 'Python', 'C#', 'CSS', 'React', 'MySQL', 'Git'].map((t) => (
                <li key={t}>
                  <span className="footer-tech">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:kimhong@email.com" className="footer-link">
                  kimhong@email.com
                </a>
              </li>
              <li>
                <span className="footer-tech">Phnom Penh, Cambodia 🇰🇭</span>
              </li>
              <li>
                <span className="footer-tech">Year 3 · Semester 1</span>
              </li>
              <li>
                <a href="/cv.pdf" download className="footer-link">
                  📄 Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} <span>Ngoun KimHong</span>. Built with{' '}
            <FaHeart className="heart-icon" /> using React, Framer Motion & GSAP.
          </p>
          <p className="footer-status">
            <span className="status-dot" /> Available for opportunities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
