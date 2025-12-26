import { Link, Route, Routes } from "react-router-dom"
import styles from "./App.module.scss"
import { useTheme } from "./contexts/ThemeContext"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import RecorderPage from "./pages/RecorderPage"

function AppContent() {
  const { theme } = useTheme()

  return (
    <div className={styles.app} data-theme={theme}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/">Home</Link> | <Link to="/recorder">Recorder</Link>
        </nav>
        {/* <ThemeSwitcher /> */}
      </header>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recorder" element={<RecorderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default AppContent
