import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { HiDownload, HiArrowRight } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-scroll';
import profileImg from '../../assets/profile.jpg';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // GSAP floating shapes
  useEffect(() => {
    gsap.to('.shape-1', {
      y: -30,
      rotation: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to('.shape-2', {
      y: 25,
      rotation: -10,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });
    gsap.to('.shape-3', {
      y: -20,
      x: 15,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5,
    });
    gsap.to('.hero-avatar', {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Floating Shapes */}
      <div className="shape shape-1" />
      <div className="shape shape-2" />
      <div className="shape shape-3" />

      <div className="container hero-container">
        {/* Left Content */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-dot" />
            <span>Available for Internship & Projects</span>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-greeting">
            Hello, I&apos;m
          </motion.p>

          <motion.h1 variants={itemVariants} className="hero-name">
            Ngoun <span className="gradient-text">KimHong</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="hero-role">
            <span className="role-prefix">{'</>'} </span>
            <span className="role-text">Software Engineering Student</span>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-description">
            Year 3 · Semester 1 · Passionate about building elegant software solutions.
            I craft clean, efficient code and love turning complex problems into
            simple, beautiful applications.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-socials">
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
                className="social-icon"
                aria-label={s.label}
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="hero-actions">
            <Link to="projects" smooth duration={600} offset={-80}>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <HiArrowRight />
              </motion.button>
            </Link>
            <motion.a
              href="/cv.pdf"
              download
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiDownload />
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right — Avatar */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="avatar-wrapper">
            <div className="avatar-ring ring-1" />
            <div className="avatar-ring ring-2" />
            <div className="avatar-ring ring-3" />
            <div className="hero-avatar">
              <div className="avatar-image">
                <img src={profileImg} alt="Ngoun KimHong" className="avatar-photo" />
                <div className="avatar-glow" />
              </div>
            </div>
          </div>

          {/* Floating Info Cards */}
          <motion.div
            className="info-card card-year"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="card-icon">🎓</span>
            <div>
              <div className="card-label">Year</div>
              <div className="card-value">3rd · Sem 1</div>
            </div>
          </motion.div>

          <motion.div
            className="info-card card-exp"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className="card-icon">💻</span>
            <div>
              <div className="card-label">Focus</div>
              <div className="card-value">Full Stack</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
