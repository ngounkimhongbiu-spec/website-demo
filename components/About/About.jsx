import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiAcademicCap, HiCode, HiLightBulb, HiStar } from 'react-icons/hi';
import profileImg from '../../assets/profile.jpg';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: <HiAcademicCap />, value: 'Year 3', label: 'Semester 1', color: '#7c3aed' },
  { icon: <HiCode />, value: '5+', label: 'Languages', color: '#06b6d4' },
  { icon: <HiLightBulb />, value: '10+', label: 'Projects', color: '#f59e0b' },
  { icon: <HiStar />, value: '100%', label: 'Dedication', color: '#22c55e' },
];

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    gsap.fromTo(
      '.about-image-wrapper',
      { opacity: 0, x: -60, rotation: -5 },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-image-wrapper',
          start: 'top 80%',
        },
      }
    );
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">Who I Am</span>
          <h2 className="section-title">About <span>Me</span></h2>
          <p className="section-subtitle">// A little bit about my story</p>
        </motion.div>

        <div className="about-grid">
          {/* Image Side */}
          <div className="about-image-wrapper" ref={imageRef}>
            <div className="about-image-container">
              <div className="about-image">
                <img src={profileImg} alt="Ngoun KimHong" className="about-photo" />
                <div className="about-image-overlay" />
              </div>
              <div className="image-border-decoration" />
              <div className="image-dot-grid" />
            </div>
            {/* Experience Badge */}
            <motion.div
              className="exp-badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            >
              <div className="exp-badge-inner">
                <span className="exp-number">3rd</span>
                <span className="exp-label">Year</span>
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <motion.div
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h3 variants={fadeUp} className="about-heading">
              Building the future, one line of code at a time
            </motion.h3>

            <motion.p variants={fadeUp} className="about-text">
              Hi! I'm <strong>Ngoun KimHong</strong>, a passionate Software Engineering student
              in my 3rd year, 1st semester. I'm deeply enthusiastic about solving real-world
              problems through clean, efficient code and innovative software design.
            </motion.p>

            <motion.p variants={fadeUp} className="about-text">
              My journey in software engineering has been driven by curiosity and a love for
              learning. From building desktop applications to web platforms, I enjoy every
              aspect of the development lifecycle — from design to deployment.
            </motion.p>

            <motion.div variants={fadeUp} className="about-details">
              {[
                { label: 'Name', value: 'Ngoun KimHong' },
                { label: 'Status', value: 'Software Engineering Student' },
                { label: 'Year', value: 'Year 3, Semester 1' },
                { label: 'Focus', value: 'Full-Stack Development' },
                { label: 'Location', value: 'Cambodia 🇰🇭' },
                { label: 'Available', value: 'For Internship & Projects ✅' },
              ].map((item) => (
                <div key={item.label} className="detail-row">
                  <span className="detail-label">{item.label}</span>
                  <span className="detail-sep">:</span>
                  <span className="detail-value">{item.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="about-actions">
              <a href="/cv.pdf" download className="btn-primary">
                <span>Download CV</span>
              </a>
              <a href="mailto:kimhong@email.com" className="btn-outline">
                Contact Me
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}18` }}>
                {stat.icon}
              </div>
              <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
