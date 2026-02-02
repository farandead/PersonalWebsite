export default function Contact() {
  return (
    <div className="page-content">
      <h1>Contact</h1>
      
      <div className="research-intro">
        I'm always excited to discuss AI, LLMs, multi-agent systems, and emerging technologies. Whether you have a collaboration idea, research opportunity, or just want to chat about the future of AI – I'd love to hear from you.
      </div>
      
      <div className="contact-card">
        <div className="contact-icon">
          <i className="fa-solid fa-envelope"></i>
        </div>
        <div className="contact-content">
          <h3>Email</h3>
          <p className="pub-subtitle">Primary contact method</p>
          <p>
            <a href="mailto:faranzafarcs@gmail.com">faranzafarcs@gmail.com</a>
          </p>
          <p>
            Feel free to reach out for research collaborations, AI/ML consulting opportunities, speaking engagements, or technical discussions.
          </p>
        </div>
      </div>
      
      <div className="contact-card">
        <div className="contact-icon">
          <i className="fa-solid fa-phone"></i>
        </div>
        <div className="contact-content">
          <h3>Phone</h3>
          <p className="pub-subtitle">Direct contact</p>
          <p>
            <a href="tel:+447355889332">(+44) 7355-889332</a>
          </p>
        </div>
      </div>
      
      <div className="contact-card">
        <div className="contact-icon">
          <i className="fa-solid fa-location-dot"></i>
        </div>
        <div className="contact-content">
          <h3>Location</h3>
          <p className="pub-subtitle">Based in</p>
          <p>Birmingham, UK</p>
        </div>
      </div>
      
      <div className="contact-card">
        <div className="contact-icon">
          <i className="fa-solid fa-globe"></i>
        </div>
        <div className="contact-content">
          <h3>Website</h3>
          <p className="pub-subtitle">Personal website</p>
          <p>
            <a href="https://faranz.com" target="_blank" rel="noopener noreferrer">faranz.com</a>
          </p>
        </div>
      </div>
      
      <div className="contact-card">
        <div className="contact-icon">
          <i className="fa-solid fa-link"></i>
        </div>
        <div className="contact-content">
          <h3>Social Platforms</h3>
          <p className="pub-subtitle">Connect on professional networks</p>
          <div className="social-links-list">
            <a href="https://github.com/farandead" target="_blank" rel="noopener noreferrer" className="social-link-item">
              <i className="fa-brands fa-github"></i>
              <span>github.com/farandead</span>
            </a>
            <a href="https://www.linkedin.com/in/faranzafar/" target="_blank" rel="noopener noreferrer" className="social-link-item">
              <i className="fa-brands fa-linkedin"></i>
              <span>linkedin.com/in/faranzafar</span>
            </a>
            <a href="https://medium.com/@faranzafar" target="_blank" rel="noopener noreferrer" className="social-link-item">
              <i className="fa-brands fa-medium"></i>
              <span>medium.com/@faranzafar</span>
            </a>
            <a href="https://www.instagram.com/humangasorus/" target="_blank" rel="noopener noreferrer" className="social-link-item">
              <i className="fa-brands fa-instagram"></i>
              <span>instagram.com/humangasorus</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="research-footer">
        Response time is typically within 24-48 hours.
      </div>
    </div>
  );
}
