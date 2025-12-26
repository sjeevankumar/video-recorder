import Button from "./Button"
import styles from "./ControlBar.module.scss"
import Toggle from "./Toggle"

type Props = {
  recording: boolean
  onStart: () => void
  onStop: () => void
  onDownload: () => void
  includeWebcam: boolean
  setIncludeWebcam: (v: boolean) => void
  timer?: string
}

export default function ControlBar({
  recording,
  onStart,
  onStop,
  onDownload,
  includeWebcam,
  setIncludeWebcam,
  timer,
}: Props) {
  return (
    <div className={styles.controlBar}>
      <div className={styles.controls}>
        <div className={styles.buttons}>
          <Button onClick={onStart} disabled={recording}>
            Start
          </Button>
          <Button variant="secondary" onClick={onStop} disabled={!recording}>
            Stop
          </Button>
          <Button variant="secondary" onClick={onDownload} disabled={!timer}>
            Download
          </Button>
        </div>

        <div className={styles.webcamToggle}>
          <Toggle
            checked={includeWebcam}
            onChange={setIncludeWebcam}
            label="Webcam"
          />
        </div>
      </div>

      <div className={styles.status}>
        {recording ? (
          <div className={styles.recordingIndicator}>
            <div
              style={{
                position: "relative",
                width: "0.75rem",
                height: "0.75rem",
              }}
            >
              <span className={styles.pulseRing} />
              <span className={styles.recordingDot} />
            </div>
            <div className={styles.recordingText}>
              Recording {timer ? `— ${timer}` : ""}
            </div>
          </div>
        ) : (
          <div className={styles.notRecording}>Not recording</div>
        )}
      </div>
    </div>
  )
}
