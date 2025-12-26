import styles from "./Toggle.module.scss"

type Props = {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}

export default function Toggle({ checked, onChange, label }: Props) {
  return (
    <label className={styles.toggleLabel}>
      <div className={styles.toggleContainer}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={styles.track} />
        <div className={styles.thumb} />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
