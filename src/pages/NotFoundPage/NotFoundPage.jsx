import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <h1 className="not-found__heading">Page Not Found</h1>
      <p className="not-found__text">Return home and try again!</p>
      <Link to="/" className="not-found__link">
        Home
      </Link>
    </main>
  )
}
