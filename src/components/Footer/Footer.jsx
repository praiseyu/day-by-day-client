import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__tagline">Made by Praise Yu.</p>
      <div className="footer__socials-container">
        <a href="https://github.com/praiseyu"className="footer__social-link">Github</a>
        <a href="https://www.linkedin.com/in/praise-yu/" className="footer__social-link">LinkedIn</a>
        <a href="mailto:praiseyu@gmail.com" className="footer__social-link">Email</a>
      </div>
    </footer>
  );
}
