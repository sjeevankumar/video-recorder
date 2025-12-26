import React from "react"
import styles from "./Card.module.scss"

export default function Card({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`${styles.card} ${className}`}>{children}</div>
}
