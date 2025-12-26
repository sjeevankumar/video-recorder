import { Link } from "react-router-dom"
import { Button } from "../components"
import styles from "./Home.module.scss"

export default function Home() {
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
            </div>
          </div>
        </div>
      </section>

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

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Recordly — Built with ❤️
      </footer>
    </main>
  )
}
