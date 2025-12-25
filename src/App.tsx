import { Link, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import RecorderPage from "./pages/RecorderPage"

const App = () => {
  return (
    <div>
      <header style={{ padding: 12 }}>
        <nav>
          <Link to="/">Home</Link> | <Link to="/recorder">Recorder</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recorder" element={<RecorderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
