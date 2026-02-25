import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import avatarImg from '../assets/images/faranz.jpeg';

const expertise = [
  {
    num: '01',
    icon: 'fa-solid fa-diagram-project',
    title: 'Multi-Agent Orchestration',
    description: 'Production multi-agent systems with task decomposition, supervisor agents, workflow management, and shared memory for complex coordination.',
  },
  {
    num: '02',
    icon: 'fa-solid fa-brain',
    title: 'RAG & LLM Systems',
    description: 'Enterprise RAG architectures with hybrid retrieval, query routing, prompt injection prevention, and production-grade LLM applications.',
  },
  {
    num: '03',
    icon: 'fa-solid fa-bolt',
    title: 'Automated Operations',
    description: 'Agentic fleet management and automated remediation. Reduced MTTR from hours to minutes, driving significant productivity gains.',
  },
  {
    num: '04',
    icon: 'fa-solid fa-robot',
    title: 'Reinforcement Learning',
    description: 'Multi-agent RL with PPO and CTDE architectures. Training intelligent agents for game AI, robotics, and autonomous systems.',
  },
];

const socialLinks = [
  { name: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/farandead/' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: 'https://www.linkedin.com/in/faranzafar/' },
  { name: 'Medium', icon: 'fa-brands fa-medium', url: 'https://medium.com/@faranzafar' },
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/humangasorus/' },
];

/* Shared easing */
const ease = [0.16, 1, 0.3, 1] as const;

/* Entrance variant: fade up */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease },
  }),
};

/* Staggered card container */
const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

/* Social icon stagger */
const socialStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const socialItem = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

/* Divider line animation */
const dividerLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease },
  },
};

/* ── Floating ambient elements ── */
function FloatingElements() {
  return (
    <div className="hero-ambient">
      {/* Primary glow orb — large warm drift */}
      <motion.div
        className="ambient-glow ambient-glow--primary"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary glow orb — offset rhythm */}
      <motion.div
        className="ambient-glow ambient-glow--secondary"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Long diagonal line — top left */}
      <motion.div
        className="ambient-line"
        style={{ top: '10%', left: '2%', width: 160, rotate: -30 }}
        animate={{ y: [0, -35, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mid line — right side */}
      <motion.div
        className="ambient-line"
        style={{ top: '40%', right: '4%', width: 100, rotate: 55 }}
        animate={{ y: [0, 25, 0], opacity: [0.12, 0.3, 0.12] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Short accent line — center */}
      <motion.div
        className="ambient-line"
        style={{ top: '70%', left: '35%', width: 70, rotate: -10 }}
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
      />

      {/* Large ring — top right */}
      <motion.div
        className="ambient-ring ambient-ring--lg"
        style={{ top: '12%', right: '10%' }}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          opacity: [0.15, 0.35, 0.15],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Small ring — bottom left */}
      <motion.div
        className="ambient-ring ambient-ring--sm"
        style={{ bottom: '25%', left: '8%' }}
        animate={{
          y: [0, 18, 0],
          opacity: [0.12, 0.3, 0.12],
          rotate: [0, -120, 0],
        }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Dot cluster — upper mid */}
      <motion.div
        className="ambient-dot ambient-dot--lg"
        style={{ top: '6%', left: '42%' }}
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <motion.div
        className="ambient-dot"
        style={{ top: '9%', left: '44%' }}
        animate={{ y: [0, 14, 0], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Dot — bottom right */}
      <motion.div
        className="ambient-dot ambient-dot--lg"
        style={{ bottom: '18%', right: '15%' }}
        animate={{ y: [0, -16, 0], opacity: [0.18, 0.45, 0.18] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Cross — left side */}
      <motion.div
        className="ambient-cross"
        style={{ top: '50%', left: '1%' }}
        animate={{
          rotate: [0, 90, 0],
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Cross — bottom right */}
      <motion.div
        className="ambient-cross"
        style={{ bottom: '12%', right: '6%' }}
        animate={{
          rotate: [45, -45, 45],
          opacity: [0.1, 0.28, 0.1],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* Long line — bottom */}
      <motion.div
        className="ambient-line"
        style={{ bottom: '8%', right: '0%', width: 200, rotate: -8 }}
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();

  /* Hero parallax — different speeds per layer create depth */
  const labelY = useTransform(scrollY, [0, 800], [0, -15]);
  const titleY = useTransform(scrollY, [0, 800], [0, -40]);
  const avatarY = useTransform(scrollY, [0, 800], [0, -70]);
  const avatarRotate = useTransform(scrollY, [0, 800], [0, 3]);
  const descY = useTransform(scrollY, [0, 800], [0, -25]);
  const statusY = useTransform(scrollY, [0, 800], [0, -12]);
  const ctaY = useTransform(scrollY, [0, 800], [0, -8]);
  const heroFade = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <div>
      {/* ── Hero ── */}
      <motion.section className="hero" style={{ opacity: heroFade }}>
        <FloatingElements />

        {/* Label */}
        <motion.div
          className="hero-label"
          style={{ y: labelY }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="label-line" />
          <span>AI/ML Engineer</span>
        </motion.div>

        {/* Title + Avatar */}
        <div className="hero-heading-row">
          <motion.h1
            className="hero-title"
            style={{ y: titleY }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.12}
          >
            Building <em>intelligent</em><br />
            systems that solve<br />
            real problems.
          </motion.h1>

          <motion.div
            className="hero-avatar"
            style={{ y: avatarY, rotate: avatarRotate }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.18}
          >
            <img src={avatarImg} alt="Faran Zafar" />
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="hero-description"
          style={{ y: descY }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.26}
        >
          Specialized in multi-agent orchestration, RAG architectures, and production LLM systems for enterprise applications. <span className="highlight-badge">6x Hackathon Winner</span> with a First Class Honours in Computer Science.
        </motion.p>

        {/* Status */}
        <motion.div
          className="hero-status"
          style={{ y: statusY }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.34}
        >
          <div className="status-line">
            <span className="status-dash">&mdash;&mdash;</span>
            <span>Currently at <strong>RealityMine</strong></span>
          </div>
          <div className="status-line">
            <span className="status-dash">&mdash;&mdash;</span>
            <span>Previously <strong>Google DeepMind</strong></span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          style={{ y: ctaY }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.42}
        >
          <Link to="/projects" className="hero-cta">
            <span>View Work</span>
            <span className="cta-arrow">&rarr;</span>
          </Link>
        </motion.div>
      </motion.section>

      {/* ── Divider ── */}
      <div className="section">
        <motion.div
          className="section-divider"
          style={{ transformOrigin: 'left' }}
          variants={dividerLine}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        />
      </div>

      {/* ── Expertise ── */}
      <section className="section">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          custom={0}
        >
          <span className="section-number">01</span>
          <span className="section-label">What I Do</span>
        </motion.div>

        <motion.div
          className="expertise-grid"
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {expertise.map((item, i) => (
            <motion.div
              key={i}
              className="expertise-card"
              variants={cardItem}
            >
              <span className="expertise-bg-num">{item.num}</span>
              <div className="expertise-card-icon">
                <i className={item.icon} />
                <div className="icon-glow" />
              </div>
              <h3 className="expertise-card-title">{item.title}</h3>
              <p className="expertise-card-desc">{item.description}</p>
              <div className="expertise-card-accent" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div className="section">
        <motion.div
          className="section-divider"
          style={{ transformOrigin: 'right' }}
          variants={dividerLine}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        />
      </div>

      {/* ── Connect ── */}
      <section className="section">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          custom={0}
        >
          <span className="section-number">02</span>
          <span className="section-label">Connect</span>
        </motion.div>

        <motion.div
          className="social-row"
          variants={socialStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              variants={socialItem}
            >
              <i className={link.icon} />
            </motion.a>
          ))}
          {/* <motion.a
            href="/pdf/cv.pdf"
            className="social-icon cv-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
            variants={socialItem}
          >
            <i className="fa-solid fa-file-pdf" />
            <span>CV</span>
          </motion.a> */}
        </motion.div>
      </section>
    </div>
  );
}
