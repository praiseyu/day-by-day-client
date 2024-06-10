import { Link } from "react-router-dom";
import "./LandingPage.scss";

export default function LandingPage() {
  return (
    <main className="landing-pg">
      <div className="landing-pg__title-container">
        <h1 className="landing-pg__title">DAY BY DAY</h1>
        <h2 className ="landing-pg__tagline">a travel journal</h2>
      </div>
      <Link to="/signup" className="landing-pg__cta"><h3>GET STARTED</h3></Link>
    </main>
  )
}
