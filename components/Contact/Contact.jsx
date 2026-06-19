import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';
import './Contact.css';

const contactInfo = [
  {
    icon: <HiMail />,
    label: 'Primary Email',
    value: 'ngounkimhong.biu@gmail.com',
    href: 'mailto:ngounkimhong.biu@gmail.com',
    color: '#7c3aed',
  },
  {
    icon: <HiMail />,
    label: 'Secondary Email',
    value: 'smilemrrhong@gmail.com',
    href: 'mailto:smilemrrhong@gmail.com',
    color: '#a855f7',
  },
  {
    icon: <HiPhone />,
    label: 'Phone / Telegram',
    value: '+855 77 934 356',
    href: 'https://t.me/+85577934356',
    color: '#06b6d4',
  },
  {
    icon: <HiLocationMarker />,
    label: 'Location',
    value: 'Phnom Penh, Cambodia 🇰🇭',
    href: 'https://maps.app.goo.gl/MveiBhbbZtsQB8gS9',
    color: '#f59e0b',
    external: true,
  },
];

const socials = [
  { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com', color: '#ffffff' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_top_card%3B1ffed2SFTeWO3laCjt%2FARg%3D%3D', color: '#0a66c2' },
  { icon: <FaTelegram />, label: 'Telegram', href: 'https://t.me/+85577934356', color: '#2ca5e0' },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">Get In Touch</span>
          <h2 className="section-title">Contact <span>Me</span></h2>
          <p className="section-subtitle">// I'd love to hear from you</p>
        </motion.div>

        <div className="contact-grid">
          {/* Left Info */}
          <motion.div
            className="contact-info"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h3 variants={fadeUp} className="contact-heading">
              Let's build something amazing together
            </motion.h3>
            <motion.p variants={fadeUp} className="contact-text">
              I'm currently open to internships, freelance projects, and collaboration
              opportunities. Whether you have a project in mind or just want to say hello,
              feel free to reach out!
            </motion.p>

            <motion.div variants={fadeUp} className="contact-cards">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href || undefined}
                  className={`contact-card ${!item.href ? 'no-link' : ''} ${item.external ? 'location-card' : ''}`}
                  target={item.href ? '_blank' : undefined}
                  rel="noreferrer"
                  whileHover={item.href ? { x: 6 } : {}}
                >
                  <div className="contact-card-icon" style={{ color: item.color, background: `${item.color}18` }}>
                    {item.icon}
                  </div>
                  <div className="contact-card-text">
                    <div className="contact-card-label">{item.label}</div>
                    <div className="contact-card-value">
                      {item.value}
                      {item.external && (
                        <span className="map-link-hint"> · View on Maps →</span>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="contact-socials">
              <p className="socials-label">Find me on:</p>
              <div className="socials-row">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-btn"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ '--c': s.color }}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ngoun KimHong"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Collaboration"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary submit-btn"
                disabled={sending || sent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>
                  {sent ? '✅ Message Sent!' : sending ? 'Sending...' : 'Send Message'}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
