import { Link } from "react-router-dom";
import "../styles/landingpage.css";
import heroImage from "../assets/hero-image.jpg";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Where Words Matter</h1>
          <p className="hero-subtitle">Share. Engage. Inspire.</p>
          <div className="cta-container">
            <Link to="/register" className="cta-btn">
              Get Started
            </Link>
            <a href="#features" className="secondary-btn">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-image-container">
          <img src={heroImage} alt="Writing community" className="hero-image" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="section-title">Why Join Wordly?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Write & Publish</h3>
            <p>Express your thoughts and share knowledge with the world.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Engage & Comment</h3>
            <p>Discuss ideas, connect with readers, and build your audience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <h3>Trending Topics</h3>
            <p>Discover the latest articles curated just for you.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonial-card">
          <div className="quote-icon">❝</div>
          <blockquote>
            "Wordly has transformed how I share my ideas with the world!"
          </blockquote>
          <div className="author">- Jane Doe, Writer</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Join Wordly Today!</h2>
          <p>Start your writing journey in just 2 minutes</p>
          <Link to="/register" className="cta-btn">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;