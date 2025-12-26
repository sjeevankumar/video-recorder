import { Recorder } from "../components"
import styles from "./RecorderPage.module.scss"

export default function RecorderPage() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Recorder</h1>
      <Recorder />
    </section>
  )
}
