import "./AboutPage.scss";

export default function AboutPage() {
  return (
    <main className="about">
      <h1 className="about__title">About Us</h1>
      <article className="about__content">
        <section className="about__who-section">
          <h2 className="about__section-heading">Our Mission</h2>
          <div className="about__who-text-wrapper">
            <p className="about__who-text">
              At Day by Day, we believe that every moment of your journey
              deserves to be remembered.
            </p>
            <p className="about__who-text">
              Our mission is to provide a platform that combines the power of
              visual storytelling with the intimacy of personal reflections,
              creating a rich, immersive memory-keeping experience.
            </p>
          </div>
        </section>
        <section className="about__what-section">
          <h2 className="about__section-heading">What We Offer</h2>
          <div className="about__features">
            <div className="about__feature-card">
              <h3 className="about__feature-card-heading">
                Immersive Experience
              </h3>
              <p>
                Combining photos and text allows you to relive your memories in
                a richer, more immersive way. Each entry becomes a story,
                capturing the essence of your experiences.
              </p>
            </div>
            <div className="about__feature-card">
              <h3 className="about__feature-card-heading">Personal Touch </h3>
              <p>
                Customize your entries to reflect your personality and style.
                Choose from various layouts and themes to make your journal
                uniquely yours.
              </p>
            </div>
            <div className="about__feature-card">
              <h3 className="about__feature-card-heading">
                Organized Memories
              </h3>
              <p>
                Keep your memories organized by date and trip. Easily browse
                through past entries and revisit your favorite moments anytime.
              </p>
            </div>
          </div>
        </section>
        <section className="about__cta-section">
            <h2 className="about__section-heading">Start Your Journey</h2>
            <div className="about__cta-content">
              <p>
                Join us on Day by Day and start creating your digital photo
                journal today.
              </p>
              <p>
                Capture the moments that matter, and let your story unfold one day
                at a time.
              </p>
              <p className="about__closing-sentence">Happy journaling!</p>
            </div>
          </section>
      </article>
    </main>
  );
}
