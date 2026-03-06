export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-left">&copy; {new Date().getFullYear()} Faran Zafar</span>
      <span className="footer-right">
        <a href="https://github.com/farandead" target="_blank" rel="noopener noreferrer">GitHub</a>
        &nbsp;&nbsp;&middot;&nbsp;&nbsp;
        <a href="https://www.linkedin.com/in/faranzafar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        &nbsp;&nbsp;&middot;&nbsp;&nbsp;
        <a href="https://medium.com/@faranzafar" target="_blank" rel="noopener noreferrer">Medium</a>
      </span>
    </footer>
  );
}
