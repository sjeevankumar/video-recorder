import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h1>404 — Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  )
}
