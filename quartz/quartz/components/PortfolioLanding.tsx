import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const PortfolioLanding: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="portfolio-landing">
      {/* Navigation */}
      <nav class="portfolio-nav">
        <div class="nav-container">
          <div class="nav-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <div class="nav-links">
            <a href="/" class="nav-link">Home</a>
            <a href="/projects" class="nav-link">Projects</a>
            <a href="/Welcome" class="nav-link">Blog</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">Collin Martin</h1>
              <p class="hero-subtitle">ABOUT ME</p>
              <button class="contact-button">CONTACT</button>
            </div>
            <div class="hero-image">
              <div class="profile-photo">
                {/* Replace with your actual profile photo */}
                <div class="profile-placeholder">CM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Section */}
      <section class="university-section">
        <div class="university-container">
          <div class="university-logo">
            {/* Replace with actual UC3M logo */}
            <div class="university-logo-placeholder">UC3M</div>
          </div>
          <div class="university-content">
            <h2 class="university-title">Madrid UC3M 2027</h2>
            <p class="university-subtitle">ABOUT MY UNIVERSITY</p>
            <button class="university-button">Another button</button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section class="projects-section">
        <div class="projects-container">
          <div class="project-card project-1">
            <div class="project-texture"></div>
            <div class="project-content">
              <h3>Project 1</h3>
              <p>Call out a feature, benefit, or value of your site that can stand on its own.</p>
            </div>
          </div>
          
          <div class="project-card project-2">
            <div class="project-texture"></div>
            <div class="project-content">
              <h3>Project 2</h3>
              <p>Call out a feature, benefit, or value of your site that can stand on its own.</p>
            </div>
          </div>
          
          <div class="project-card project-3">
            <div class="project-texture"></div>
            <div class="project-content">
              <h3>Project 3</h3>
              <p>Call out a feature, benefit, or value of your site that can stand on its own.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

PortfolioLanding.displayName = "PortfolioLanding"

export default (() => PortfolioLanding) satisfies QuartzComponentConstructor
