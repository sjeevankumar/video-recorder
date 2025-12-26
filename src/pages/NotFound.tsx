import { Link } from "react-router-dom"
import styles from "./NotFound.module.scss"

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 — Page Not Found</h1>
      <p className={styles.text}>The page you're looking for doesn't exist.</p>
      <p>
        <Link to="/" className={styles.link}>
          Go back home
        </Link>
      </p>
    </div>
  )
}
