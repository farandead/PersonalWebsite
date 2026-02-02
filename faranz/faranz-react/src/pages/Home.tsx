import { useEffect } from 'react';
import avatarImg from '../assets/images/faranz.jpeg';

const socialLinks = [
  { name: 'Github', icon: 'fa-brands fa-github', url: 'https://github.com/farandead/' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: 'https://www.linkedin.com/in/faranzafar/' },
  { name: 'Medium', icon: 'fa-brands fa-medium', url: 'https://medium.com/@faranzafar' },
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/humangasorus/' },
];

const expertise = [
  {
    icon: 'fa-solid fa-diagram-project',
    title: 'Multi-Agent Orchestration',
    description: 'Production multi-agent systems with agent orchestration, task decomposition, and supervisor agents. Implementing workflow management and shared memory for complex task coordination.',
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'RAG & LLM Systems',
    description: 'Production RAG architectures with hybrid retrieval and query routing. Building enterprise LLM applications with prompt injection prevention and prompt tanting.',
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'Automated Operations',
    description: 'Agentic systems for fleet management and automated remediation. Reduced MTTR from 1-2 hours to few minutes and significantly increased productivity of Ops teams through intelligent automation.',
  },
  {
    icon: 'fa-solid fa-robot',
    title: 'Reinforcement Learning',
    description: 'Multi-agent RL systems with PPO and CTDE architectures. Training intelligent agents for game AI, robotics, and autonomous systems with curriculum learning.',
  },
];

export default function Home() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const windowCenter = scrolled + windowHeight / 2;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const maxOffset = isMobile ? 12 : 24;

        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const htmlEl = el as HTMLElement;
          const speed = el.getAttribute('data-parallax');
          let speedValue = 0;

          if (speed === 'fast') speedValue = 0.2;
          else if (speed === 'medium') speedValue = 0.12;
          else if (speed === 'slow') speedValue = 0.08;

          const rect = htmlEl.getBoundingClientRect();
          const elementTop = rect.top + scrolled;
          const elementCenter = elementTop + rect.height / 2;

          // Subtle, clamped parallax for desktop and mobile.
          const distance = windowCenter - elementCenter;
          const rawOffset = distance * speedValue;
          const yPos = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));

          htmlEl.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="hero-section" data-parallax="slow">
      <div className="hero-content">
        <div className="hero-avatar" data-parallax="medium">
          <img src={avatarImg} alt="Faran Zafar" className="avatar-img" />
        </div>
        
        <div className="hero-text" data-parallax="fast">
          <h1 className="hero-title">
            <span className="greeting">Hello, I'm</span>
            <span className="name">Faran Zafar</span>
          </h1>
          
          <div className="hero-tagline">
            <span className="tagline-text">AI/ML Engineer</span>
            <span className="tagline-separator">•</span>
            <span className="tagline-text">LLM Systems</span>
            <span className="tagline-separator">•</span>
            <span className="tagline-text">Multi-Agent AI</span>
            <span className="tagline-separator">•</span>
            <span className="tagline-text">6x Hackathon Winner</span>
          </div>
          
          <p className="hero-description">
            Building production <span className="highlight">multi-agent systems</span> and <span className="highlight">RAG architectures</span> for enterprise applications. Specialized in agent orchestration and automated remediation.
          </p>
        </div>
      </div>
      
      <div className="expertise-section">
        <h2 className="section-title">What I Do</h2>
        
        <div className="expertise-grid">
          {expertise.map((item, index) => (
            <div key={index} className="expertise-card">
              <div className="card-icon">
                <i className={item.icon}></i>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="social-section" data-parallax="slow">
        <h2 className="section-title">Connect</h2>
        
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              <i className={link.icon}></i>
            </a>
          ))}
          <div className="cv-link-wrapper">
            <a
              href="/pdf/cv.pdf"
              className="social-link cv-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open('/pdf/cv.pdf', '_blank');
              }}
              aria-label="View CV"
            >
              <i className="fa-solid fa-file-pdf"></i>
            </a>
            <div className="cv-pointer">
              <span className="cv-pointer-text">my CV</span>
              <svg className="cv-pointer-arrow" width="20" height="16" viewBox="0 0 20 16">
                <path d="M 16 2 C 12 4, 8 6, 10 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
                <path d="M 7 10 L 10 13 L 13 10" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
