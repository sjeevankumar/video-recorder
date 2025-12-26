import { Link } from "react-router-dom"
import { Button } from "../components"
import styles from "./Home.module.scss"

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>MicroSass</div>
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
                Record your screen, webcam & audio —{" "}
                <span className={styles.highlight}>in one click</span>
              </h1>
              <p>
                Capture tutorials, meetings, and demos with a lightweight,
                privacy-first recorder — no account needed. Start recording in
                seconds.
              </p>

              <div className={styles.heroActions}>
                <Link to="/recorder">
                  <Button>Start recording</Button>
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
              </div>
            </div>

            <div className={styles.demoBox}>
              <div className={styles.demoContainer}>
                <div className={styles.demoText}>
                  <div className={styles.title}>Live demo</div>
                  <div className={styles.subtitle}>
                    Try the recorder in the Recorder page
                  </div>
                </div>
                <div className={styles.playButton}>
                  <div className={styles.buttonBg}>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 5v14l11-7L8 5z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.demoDescription}>
                Try it: click{" "}
                <span className={styles.highlight}>Start recording</span> to
                open the recorder and allow your camera/mic.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className={styles.howSection}>
        <h2 className={styles.howTitle}>How it works</h2>
        <div className={styles.howGrid}>
          <div className={`${styles.howCard} ${styles.primary}`}>
            <div className={`${styles.howCardIcon} ${styles.primary}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 3v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles.howCardTitle}>Select screen</h3>
            <p className={styles.howCardText}>
              Choose the window or tab you want to record and allow audio
              capture for tabs that support it.
            </p>
          </div>

          <div className={`${styles.howCard} ${styles.accent}`}>
            <div className={`${styles.howCardIcon} ${styles.accent}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 10v4a7 7 0 0 1-14 0v-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles.howCardTitle}>Enable mic & webcam</h3>
            <p className={styles.howCardText}>
              Toggle the webcam to overlay your video and use your microphone to
              record narration.
            </p>
          </div>

          <div className={`${styles.howCard} ${styles.danger}`}>
            <div className={`${styles.howCardIcon} ${styles.danger}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10l5 3 5-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className={styles.howCardTitle}>Stop & download</h3>
            <p className={styles.howCardText}>
              After stopping the recording, download a webm file or re-record if
              needed.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} MicroSass — Built with ❤️
      </footer>
    </main>
  )
}
