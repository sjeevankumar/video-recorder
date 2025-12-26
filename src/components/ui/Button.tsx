import React from "react"
import styles from "./Button.module.scss"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  const buttonClasses = `${styles.button} ${
    styles[variant] || styles.primary
  } ${className}`
  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  )
}
