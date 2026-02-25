import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <div className="page" ref={ref}>
      <div className="page-header" data-reveal>
        <h1 className="page-title">Get in Touch</h1>
        <p className="page-subtitle">
          Open to discussing AI, multi-agent systems, research opportunities, and collaboration ideas.
        </p>
      </div>

      <div className="contact-list">
        <div className="contact-row" data-reveal>
          <div className="contact-icon">
            <i className="fa-solid fa-envelope" />
          </div>
          <div className="contact-body">
            <h3>Email</h3>
            <p>Primary contact method. Response time is typically within 24-48 hours.</p>
            <a href="mailto:faranzafarcs@gmail.com">faranzafarcs@gmail.com</a>
          </div>
        </div>

        <div className="contact-row" data-reveal style={{ transitionDelay: '0.1s' }}>
          <div className="contact-icon">
            <i className="fa-solid fa-link" />
          </div>
          <div className="contact-body">
            <h3>Elsewhere</h3>
            <div className="contact-social-list">
              <a href="https://github.com/farandead" target="_blank" rel="noopener noreferrer" className="contact-social-item">
                <i className="fa-brands fa-github" />
                <span>github.com/farandead</span>
              </a>
              <a href="https://www.linkedin.com/in/faranzafar/" target="_blank" rel="noopener noreferrer" className="contact-social-item">
                <i className="fa-brands fa-linkedin" />
                <span>linkedin.com/in/faranzafar</span>
              </a>
              <a href="https://medium.com/@faranzafar" target="_blank" rel="noopener noreferrer" className="contact-social-item">
                <i className="fa-brands fa-medium" />
                <span>medium.com/@faranzafar</span>
              </a>
              <a href="https://www.instagram.com/humangasorus/" target="_blank" rel="noopener noreferrer" className="contact-social-item">
                <i className="fa-brands fa-instagram" />
                <span>instagram.com/humangasorus</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
