export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>© {currentYear} FZ. All rights reserved.</p>
    </footer>
  );
}
