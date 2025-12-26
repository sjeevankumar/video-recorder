import { Link } from "react-router-dom"
import styles from "./NotFound.module.scss"

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.icon} aria-hidden="true">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="40"
            cy="40"
            r="38"
            stroke="var(--primary)"
            strokeWidth="4"
            fill="var(--surface)"
          />
          <path
            d="M28 32 L52 32 M40 32 L40 52"
            stroke="var(--primary)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Page Not Found</p>
      <p className={styles.text}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className={styles.link}>
        ← Go back home
      </Link>
    </div>
  )
}
