import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components"
import Modal from "../components/ui/Modal"
import VideoPlayer from "../components/VideoPlayer/VideoPlayer"
import styles from "./Home.module.scss"

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqItems = [
    {
      q: "Is my recording private?",
      a: "Yes — recordings are handled in-browser and downloaded locally by default. Pro/Enterprise offers optional cloud uploads with access controls.",
    },
    {
      q: "Which platforms are supported?",
      a: "Recordly works in modern desktop browsers (Chrome, Edge, Firefox, Safari). Mobile support varies by browser capabilities.",
    },
    {
      q: "Do I need to install anything?",
      a: "No installs or signups required for local recordings — just open the recorder and grant permissions when prompted.",
    },
    {
      q: "How do I share recordings?",
      a: "On the free plan you download videos locally. Pro adds cloud uploads and shareable links. Enterprise supports team workflows.",
    },
  ]

  function toggleFAQ(i: number) {
    setOpenFAQ(openFAQ === i ? null : i)
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerBrand}>
          <Link to="/" className={styles.brandLink} aria-label="Recordly home">
            <svg
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.brandIcon}
            >
              <rect
                x="6"
                y="6"
                width="28"
                height="28"
                rx="8"
                fill="var(--primary)"
                opacity="0.12"
              />
              <rect
                x="12"
                y="12"
                width="16"
                height="16"
                rx="4"
                fill="var(--primary)"
              />
              <circle cx="20" cy="20" r="5" fill="var(--surface)" />
              <rect
                x="18"
                y="18"
                width="4"
                height="4"
                rx="1"
                fill="var(--primary)"
              />
            </svg>
            <span className={styles.brandText}>Recordly</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link to="/recorder">Recorder</Link>
        </nav>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <div className={styles.bgBlob1} />
          <div className={styles.bgBlob2} />

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>
                Record Anything.{" "}
                <span className={styles.highlight}>Share Instantly.</span>
              </h1>
              <div className={styles.tagline}>
                <span>
                  One-click screen & video recording, right in your browser.
                </span>
              </div>
              <p>
                Recordly lets you capture your screen, webcam, and audio in
                seconds. No installs, no signups—just fast, private recording
                and instant sharing.
              </p>

              <div className={styles.heroActions}>
                <Link to="/recorder">
                  <Button>Start Recording</Button>
                </Link>
                <a href="#how" className={styles.secondaryButton}>
                  How it works
                </a>
              </div>

              <div className={styles.heroBadges}>
                <span className={`${styles.badge} ${styles.primary}`}>
                  ✓ No account required
                </span>
                <span className={`${styles.badge} ${styles.accent}`}>
                  ✓ Privacy-first
                </span>
                <span className={`${styles.badge} ${styles.danger}`}>
                  ✓ 100% Free
                </span>
                <span className={`${styles.badge} ${styles.primary}`}>
                  ✓ Works in your browser
                </span>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.illustration}>
                <svg
                  width="320"
                  height="200"
                  viewBox="0 0 320 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="20"
                    y="40"
                    width="280"
                    height="120"
                    rx="16"
                    fill="#fff"
                    stroke="var(--primary)"
                    strokeWidth="3"
                  />
                  <rect
                    x="40"
                    y="60"
                    width="80"
                    height="80"
                    rx="8"
                    fill="var(--primary)"
                    opacity="0.08"
                  />
                  <rect
                    x="140"
                    y="60"
                    width="140"
                    height="40"
                    rx="8"
                    fill="var(--primary)"
                    opacity="0.08"
                  />
                  <rect
                    x="140"
                    y="110"
                    width="60"
                    height="20"
                    rx="6"
                    fill="var(--primary)"
                    opacity="0.08"
                  />
                  <rect
                    x="210"
                    y="110"
                    width="70"
                    height="20"
                    rx="6"
                    fill="var(--primary)"
                    opacity="0.08"
                  />
                  <circle cx="60" cy="100" r="18" fill="var(--primary)" />
                  <rect
                    x="52"
                    y="92"
                    width="16"
                    height="16"
                    rx="4"
                    fill="#fff"
                  />
                  <rect
                    x="56"
                    y="96"
                    width="8"
                    height="8"
                    rx="2"
                    fill="var(--primary)"
                  />
                  <rect
                    x="260"
                    y="70"
                    width="24"
                    height="8"
                    rx="4"
                    fill="var(--primary)"
                    opacity="0.15"
                  />
                  <rect
                    x="260"
                    y="90"
                    width="24"
                    height="8"
                    rx="4"
                    fill="var(--primary)"
                    opacity="0.15"
                  />
                </svg>
              </div>
              <div className={styles.screenshotFrame}>
                {/* Optionally, place a real screenshot here for extra realism */}
              </div>

              {/* Play overlay for interactive demo */}
              <div
                className={styles.playButton}
                role="button"
                aria-label="Open demo"
                onClick={() => setDemoOpen(true)}
              >
                <div className={styles.buttonBg}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ moved below Pricing */}

      <section id="how" className={styles.howSection}>
        <h2 className={styles.howTitle}>How it works</h2>
        <div className={styles.howGrid}>
          <div className={`${styles.howCard} ${styles.primary}`}>
            <div className={styles.howStep}>1</div>
            <div className={`${styles.howCardIcon} ${styles.primary}`}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect
                  x="6"
                  y="10"
                  width="24"
                  height="16"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <rect
                  x="13"
                  y="16"
                  width="6"
                  height="6"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className={styles.howCardTitle}>Pick what to record</h3>
            <p className={styles.howCardText}>
              Choose your screen, window, or browser tab. No install or signup
              needed.
            </p>
          </div>

          <div className={`${styles.howCard} ${styles.accent}`}>
            <div className={styles.howStep}>2</div>
            <div className={`${styles.howCardIcon} ${styles.accent}`}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle
                  cx="18"
                  cy="14"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <rect
                  x="15"
                  y="24"
                  width="8"
                  height="6"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <h3 className={styles.howCardTitle}>Add mic & webcam</h3>
            <p className={styles.howCardText}>
              Enable your microphone and camera for narration and
              picture-in-picture video.
            </p>
          </div>

          <div className={`${styles.howCard} ${styles.danger}`}>
            <div className={styles.howStep}>3</div>
            <div className={`${styles.howCardIcon} ${styles.danger}`}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect
                  x="8"
                  y="28"
                  width="20"
                  height="6"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M14 18l6 3 6-3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles.howCardTitle}>Stop & download</h3>
            <p className={styles.howCardText}>
              Stop recording, then instantly download your video or start over
              if you wish.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section className={styles.testimonialsSection} aria-label="Testimonials">
        <div className={styles.testimonialsInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.howTitle}>Trusted by teams and creators</h2>
            <p className={styles.testLead}>
              Recordly helps people capture clear walkthroughs, demos, and quick
              updates — used by individuals and teams worldwide.
            </p>
          </div>

          <div className={styles.logosRow}>
            <a
              href="https://github.com"
              className={styles.logoItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.simpleicons.org/github/000000"
                alt="GitHub logo"
                width="84"
                height="28"
              />
            </a>

            <a
              href="https://www.figma.com"
              className={styles.logoItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.simpleicons.org/figma/000000"
                alt="Figma logo"
                width="84"
                height="28"
              />
            </a>

            <a
              href="https://stripe.com"
              className={styles.logoItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.simpleicons.org/stripe/000000"
                alt="Stripe logo"
                width="84"
                height="28"
              />
            </a>

            <a
              href="https://vercel.com"
              className={styles.logoItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.simpleicons.org/vercel/000000"
                alt="Vercel logo"
                width="84"
                height="28"
              />
            </a>
          </div>

          <div className={styles.testimonialsGrid}>
            <article className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.avatar}>
                  <img
                    src="https://i.pravatar.cc/100?img=1"
                    alt="Alex avatar"
                  />
                </div>
                <div className={styles.authorMeta}>
                  <div className={styles.authorName}>Alex</div>
                  <div className={styles.authorRole}>Support Lead</div>
                </div>
              </div>
              <div className={styles.stars} aria-hidden>
                ★★★★☆
              </div>
              <blockquote className={styles.testimonialQuote}>
                Recordly saved our support team hours every week — quick clips
                explain complex issues far better than text.
              </blockquote>
            </article>

            <article className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.avatar}>
                  <img
                    src="https://i.pravatar.cc/100?img=2"
                    alt="Priya avatar"
                  />
                </div>
                <div className={styles.authorMeta}>
                  <div className={styles.authorName}>Priya</div>
                  <div className={styles.authorRole}>Product Manager</div>
                </div>
              </div>
              <div className={styles.stars} aria-hidden>
                ★★★★★
              </div>
              <blockquote className={styles.testimonialQuote}>
                Fast, private, and reliable — I use it for product demos and
                sharing feedback with my team.
              </blockquote>
            </article>

            <article className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.avatar}>
                  <img
                    src="https://i.pravatar.cc/100?img=3"
                    alt="Marco avatar"
                  />
                </div>
                <div className={styles.authorMeta}>
                  <div className={styles.authorName}>Marco</div>
                  <div className={styles.authorRole}>UX Designer</div>
                </div>
              </div>
              <div className={styles.stars} aria-hidden>
                ★★★★☆
              </div>
              <blockquote className={styles.testimonialQuote}>
                No installs, works in the browser — perfect for quick
                walkthroughs.
              </blockquote>
            </article>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricingSection} aria-label="Pricing">
        <div className={styles.pricingInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.howTitle}>Simple, transparent pricing</h2>
            <p className={styles.testLead}>
              Start free and upgrade only when you need advanced features.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            <div className={`${styles.priceCard} ${styles.recommended}`}>
              <div className={styles.priceBadge}>Free forever</div>
              <div className={styles.priceTag}>
                <span className={styles.priceAmount}>$0</span>
                <span className={styles.pricePeriod}> / forever</span>
              </div>
              <ul className={styles.featureList}>
                <li>Unlimited screen recordings</li>
                <li>Local downloads</li>
                <li>Privacy-first — no account required</li>
              </ul>
              <a href="/recorder" className={styles.priceCTA}>
                Start free
              </a>
            </div>

            <div className={styles.priceCard}>
              <div className={styles.priceBadge}>Pro</div>
              <div className={styles.priceTag}>
                <span className={styles.priceAmount}>$8</span>
                <span className={styles.pricePeriod}> / mo</span>
              </div>
              <ul className={styles.featureList}>
                <li>Cloud uploads & share links</li>
                <li>Longer recordings</li>
                <li>Priority support</li>
              </ul>
              <a href="/recorder" className={styles.priceCTA}>
                Get Pro
              </a>
            </div>

            <div className={styles.priceCard}>
              <div className={styles.priceBadge}>Enterprise</div>
              <div className={styles.priceTag}>
                <span className={styles.priceAmount}>Contact</span>
              </div>
              <ul className={styles.featureList}>
                <li>Team management</li>
                <li>SAML / SSO</li>
                <li>Dedicated support</li>
              </ul>
              <a href="/contact" className={styles.priceCTA}>
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.faqSection} aria-label="FAQ">
        <div className={styles.faqInner}>
          <h2 className={styles.howTitle}>Frequently asked questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, idx) => (
              <div className={styles.faqItem} key={idx}>
                <button
                  className={styles.faqQuestion}
                  aria-expanded={openFAQ === idx}
                  onClick={() => toggleFAQ(idx)}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqChevron}>
                    {openFAQ === idx ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`${styles.faqAnswer} ${
                    openFAQ === idx ? styles.open : ""
                  }`}
                  role="region"
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Trust & Security */}
      <section
        id="about"
        className={styles.aboutSection}
        aria-label="About Trust and Security"
      >
        <div className={styles.aboutInner}>
          <h2 className={styles.howTitle}>About — Trust & Security</h2>
          <p className={styles.aboutText}>
            Recordly is built by a small team focused on privacy-first recording
            and sharing tools. We process recordings in the browser by default
            so your media stays on your device unless you explicitly upload it.
          </p>

          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <h3>Privacy</h3>
              <p>
                We don't collect recordings or personal data without consent.
                Review our <a href="/privacy">Privacy Policy</a> for details.
              </p>
            </div>

            <div className={styles.trustItem}>
              <h3>Security</h3>
              <p>
                Data in transit is encrypted (TLS). For cloud features we offer
                access controls and secure storage. See our{" "}
                <a href="/security">Security</a> page.
              </p>
            </div>

            <div className={styles.trustItem}>
              <h3>Compliance</h3>
              <p>
                We aim to meet industry best practices (SOC 2, GDPR where
                applicable) and provide enterprise controls for teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.brandText}>Recordly</span>
            <div className={styles.copy}>
              © {new Date().getFullYear()} Recordly
            </div>
          </div>

          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Docs</div>
              <a href="/docs" className={styles.footerLink}>
                Documentation
              </a>
              <a href="/api" className={styles.footerLink}>
                API
              </a>
            </div>

            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Support</div>
              <a href="/help" className={styles.footerLink}>
                Help Center
              </a>
              <a href="/contact" className={styles.footerLink}>
                Contact
              </a>
            </div>

            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Social</div>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                GitHub
              </a>
            </div>

            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Legal</div>
              <a href="/terms" className={styles.footerLink}>
                Terms
              </a>
              <a href="/privacy" className={styles.footerLink}>
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Modal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Live Demo"
      >
        <VideoPlayer src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
      </Modal>
    </main>
  )
}
