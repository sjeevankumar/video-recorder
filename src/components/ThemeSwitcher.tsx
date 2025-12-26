import { useTheme } from "../contexts/ThemeContext"
import styles from "./ThemeSwitcher.module.scss"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles.switcher}>
      <button
        className={`${styles.button} ${theme === "blue" ? styles.active : ""}`}
        onClick={() => setTheme("blue")}
      >
        Blue
      </button>
      <button
        className={`${styles.button} ${
          theme === "purple" ? styles.active : ""
        }`}
        onClick={() => setTheme("purple")}
      >
        Purple
      </button>
    </div>
  )
}
