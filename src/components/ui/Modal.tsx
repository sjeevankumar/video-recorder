import React from "react"
import styles from "./Modal.module.scss"

type Props = {
  open: boolean
  onClose: () => void
  title?: string
}

export default function Modal({
  open,
  onClose,
  title,
  children,
}: React.PropsWithChildren<Props>) {
  if (!open) return null
  return (
    <div className={styles.modal}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
