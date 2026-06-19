import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiJavascript, SiReact, SiPython, SiHtml5,
  SiMysql, SiGit, SiGithub, SiFigma, SiSpring,
} from 'react-icons/si';
import { DiCss3, DiDotnet } from 'react-icons/di';
import { FaJava } from 'react-icons/fa';
import './Skills.css';

// C++ icon
const CppIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.109c-3.92 0-7.109-3.189-7.109-7.109S8.08 4.891 12 4.891a7.133 7.133 0 0 1 6.156 3.552l-3.076 1.781A3.567 3.567 0 0 0 12 8.445c-1.96 0-3.554 1.595-3.554 3.555S10.04 15.555 12 15.555a3.57 3.57 0 0 0 3.08-1.778l3.077 1.78A7.135 7.135 0 0 1 12 19.109zm7.109-6.714h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/>
  </svg>
);

// Oracle icon
const OracleIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M7.627 4.8C3.415 4.8 0 8.215 0 12.427s3.415 7.627 7.627 7.627h8.746C20.585 20.054 24 16.64 24 12.427S20.585 4.8 16.373 4.8zm8.746 12.59H7.627a4.963 4.963 0 1 1 0-9.926h8.746a4.963 4.963 0 1 1 0 9.926z"/>
  </svg>
);

const skillCategories = [
  {
    title: 'Programming Languages',
    color: '#7c3aed',
    skills: [
      { name: 'Java',       icon: <FaJava />,       level: 85, color: '#f89820' },
      { name: 'Python',     icon: <SiPython />,     level: 80, color: '#3776ab' },
      { name: 'C#',         icon: <DiDotnet />,     level: 75, color: '#9b4f97' },
      { name: 'C++',        icon: <CppIcon />,      level: 70, color: '#00599c' },
      { name: 'JavaScript', icon: <SiJavascript />, level: 70, color: '#f7df1e' },
    ],
  },
  {
    title: 'Web & Frameworks',
    color: '#06b6d4',
    skills: [
      { name: 'HTML5',  icon: <SiHtml5 />,  level: 90, color: '#e34f26' },
      { name: 'CSS3',   icon: <DiCss3 />,   level: 85, color: '#1572b6' },
      { name: 'React',  icon: <SiReact />,  level: 65, color: '#61dafb' },
      { name: 'Spring', icon: <SiSpring />, level: 60, color: '#6db33f' },
    ],
  },
  {
    title: 'Tools & Others',
    color: '#f59e0b',
    skills: [
      { name: 'Git',    icon: <SiGit />,      level: 80, color: '#f05032' },
      { name: 'GitHub', icon: <SiGithub />,   level: 80, color: '#ffffff' },
      { name: 'MySQL',  icon: <SiMysql />,    level: 70, color: '#4479a1' },
      { name: 'Oracle', icon: <OracleIcon />, level: 65, color: '#f80000' },
      { name: 'Figma',  icon: <SiFigma />,    level: 60, color: '#f24e1e' },
    ],
  },
];

const SkillBar = ({ skill, delay, inView }) => (
  <div className="skill-item">
    <div className="skill-header">
      <div className="skill-name-wrapper">
        <span className="skill-icon" style={{ color: skill.color }}>{skill.icon}</span>
        <span className="skill-name">{skill.name}</span>
      </div>
      <span className="skill-percent">{skill.level}%</span>
    </div>
    <div className="skill-bar-track">
      <motion.div
        className="skill-bar-fill"
        style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  </div>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">What I Know</span>
          <h2 className="section-title">My <span>Skills</span></h2>
          <p className="section-subtitle">// Technologies I work with</p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              className="skill-card"
              variants={cardVariants}
              whileHover={{ y: -6 }}
            >
              <div className="skill-card-header">
                <div className="skill-cat-indicator" style={{ background: cat.color }} />
                <h3 className="skill-cat-title">{cat.title}</h3>
              </div>
              <div className="skill-list">
                {cat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={0.2 + i * 0.15}
                    inView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech badges */}
        <motion.div
          className="tech-badges"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="badges-label">Also familiar with:</p>
          <div className="badges-row">
            {['Node.js', 'REST API', 'OOP', 'Oracle DB', 'C++ STL', 'Data Structures', 'Algorithms', 'UI/UX Design', 'Agile'].map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
