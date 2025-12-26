import { useEffect, useRef, useState } from "react"
import { ControlBar } from "../index"
import styles from "./Recorder.module.scss"

export default function Recorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null) // the final mixed stream used for recording
  const liveVideoRef = useRef<HTMLVideoElement | null>(null) // what the user sees (composited canvas)

  // hidden helper elements for composition
  const displayVideoRef = useRef<HTMLVideoElement | null>(null)
  const webcamVideoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const recordedChunksRef = useRef<BlobPart[]>([])

  const [recording, setRecording] = useState(false)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
  const [includeWebcam, setIncludeWebcam] = useState(true)
  const [diagnostics, setDiagnostics] = useState({
    displayAudio: 0,
    mic: 0,
    webcam: 0,
  })

  const recordingStartRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)
  const [timer, setTimer] = useState<string | null>(null)

  useEffect(() => {
    // attach the live stream to the preview video element
    if (liveVideoRef.current && streamRef.current) {
      liveVideoRef.current.srcObject = streamRef.current
    }
  }, [streamRef.current])

  const displayStreamRef = useRef<MediaStream | null>(null)
  const micStreamRef = useRef<MediaStream | null>(null)
  const webcamStreamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mixedDestinationRef = useRef<MediaStreamAudioDestinationNode | null>(
    null
  )
  const canvasStreamRef = useRef<MediaStream | null>(null)

  function drawComposite() {
    const canvas = canvasRef.current
    const displayVideo = displayVideoRef.current
    const webcamVideo = webcamVideoRef.current
    if (!canvas || !displayVideo) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // draw the display (full canvas)
    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(displayVideo, 0, 0, canvas.width, canvas.height)

      // draw webcam overlay if available and enabled
      if (
        includeWebcam &&
        webcamVideo &&
        webcamStreamRef.current &&
        webcamVideo.readyState >= 2
      ) {
        const overlayW = Math.floor(canvas.width / 5)
        const overlayH = Math.floor(
          (webcamVideo.videoHeight / webcamVideo.videoWidth) * overlayW
        )
        const padding = 12
        const x = canvas.width - overlayW - padding
        const y = canvas.height - overlayH - padding

        // simple rounded corner effect
        const radius = 8
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.arcTo(x + overlayW, y, x + overlayW, y + overlayH, radius)
        ctx.arcTo(x + overlayW, y + overlayH, x, y + overlayH, radius)
        ctx.arcTo(x, y + overlayH, x, y, radius)
        ctx.arcTo(x, y, x + overlayW, y, radius)
        ctx.closePath()
        ctx.clip()

        ctx.drawImage(webcamVideo, x, y, overlayW, overlayH)
        ctx.restore()

        // border
        ctx.strokeStyle = "rgba(255,255,255,0.8)"
        ctx.lineWidth = 2
        ctx.strokeRect(x + 1, y + 1, overlayW - 2, overlayH - 2)
      }
    } catch (err) {
      // drawing may fail if video not ready or cross-origin — ignore
    }

    rafRef.current = requestAnimationFrame(drawComposite)
  }

  const startRecording = async () => {
    try {
      // reset previous recording
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl)
        setRecordedUrl(null)
      }
      recordedChunksRef.current = []

      // ask user for screen capture
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })
      displayStreamRef.current = displayStream

      // set up display video element for composition (hidden)
      if (displayVideoRef.current) {
        displayVideoRef.current.srcObject = displayStream
        displayVideoRef.current.play().catch(() => {})
      }

      // try to get microphone audio
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        micStreamRef.current = micStream
      } catch (e) {
        micStreamRef.current = null
      }

      // optionally get webcam video (only video)
      if (includeWebcam) {
        try {
          const webcam = await navigator.mediaDevices.getUserMedia({
            video: { width: 320, height: 240 },
            audio: false,
          })
          webcamStreamRef.current = webcam
          if (webcamVideoRef.current) {
            webcamVideoRef.current.srcObject = webcam
            webcamVideoRef.current.play().catch(() => {})
          }
        } catch (e) {
          webcamStreamRef.current = null
        }
      }

      // create canvas sized to the display stream dimensions (fallback to 1280x720)
      const canvas = canvasRef.current || document.createElement("canvas")
      const dv = displayVideoRef.current
      const width = (dv && dv.videoWidth) || 1280
      const height = (dv && dv.videoHeight) || 720
      canvas.width = width
      canvas.height = height
      canvasRef.current = canvas

      // start composition loop
      rafRef.current = requestAnimationFrame(drawComposite)

      // capture composited canvas as video stream
      const canvasStream = canvas.captureStream(30)
      canvasStreamRef.current = canvasStream

      // Build the final stream for recording
      const finalStream = new MediaStream()

      // add the composited video track
      canvasStream.getVideoTracks().forEach((t) => finalStream.addTrack(t))

      // handle audio mixing (display audio + mic)
      const displayHasAudio = displayStream.getAudioTracks().length > 0
      const micHasAudio =
        (micStreamRef.current?.getAudioTracks().length ?? 0) > 0

      if (displayHasAudio && micHasAudio) {
        const audioCtx = new AudioContext()
        audioContextRef.current = audioCtx
        const destination = audioCtx.createMediaStreamDestination()
        mixedDestinationRef.current = destination

        const displaySource = audioCtx.createMediaStreamSource(displayStream)
        displaySource.connect(destination)
        const micSource = audioCtx.createMediaStreamSource(
          micStreamRef.current!
        )
        micSource.connect(destination)

        destination.stream
          .getAudioTracks()
          .forEach((t) => finalStream.addTrack(t))
      } else if (micHasAudio) {
        micStreamRef
          .current!.getAudioTracks()
          .forEach((t) => finalStream.addTrack(t))
      } else if (displayHasAudio) {
        displayStream.getAudioTracks().forEach((t) => finalStream.addTrack(t))
      }

      // expose final stream for preview and recording
      streamRef.current = finalStream
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = finalStream
      }

      // update diagnostics for UI/debugging
      setDiagnostics({
        displayAudio: displayStream.getAudioTracks().length,
        mic: micStreamRef.current?.getAudioTracks().length ?? 0,
        webcam: webcamStreamRef.current?.getVideoTracks().length ?? 0,
      })
      console.debug("diagnostics", diagnostics)

      // create MediaRecorder
      const options: MediaRecorderOptions = {
        mimeType: "video/webm;codecs=vp9",
      }
      let recorder: MediaRecorder
      try {
        recorder = new MediaRecorder(finalStream, options)
      } catch (e) {
        recorder = new MediaRecorder(finalStream)
      }

      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0)
          recordedChunksRef.current.push(event.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        setRecordedUrl(url)

        // stop display + webcam + mic streams
        if (displayStreamRef.current) {
          displayStreamRef.current.getTracks().forEach((t) => t.stop())
          displayStreamRef.current = null
        }
        if (webcamStreamRef.current) {
          webcamStreamRef.current.getTracks().forEach((t) => t.stop())
          webcamStreamRef.current = null
        }
        if (micStreamRef.current) {
          micStreamRef.current.getTracks().forEach((t) => t.stop())
          micStreamRef.current = null
        }

        // stop canvas capture stream
        if (canvasStreamRef.current) {
          canvasStreamRef.current.getTracks().forEach((t) => t.stop())
          canvasStreamRef.current = null
        }

        // stop any tracks in the final stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop())
          streamRef.current = null
        }

        // stop raf loop
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }

        // clear timer
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        recordingStartRef.current = null
        setTimer(null)

        // close audio context
        if (audioContextRef.current) {
          try {
            audioContextRef.current.close()
          } catch (err) {}
          audioContextRef.current = null
          mixedDestinationRef.current = null
        }

        // detach previews
        if (liveVideoRef.current) liveVideoRef.current.srcObject = null
        if (displayVideoRef.current) displayVideoRef.current.srcObject = null
        if (webcamVideoRef.current) webcamVideoRef.current.srcObject = null

        setRecording(false)
      }

      // start timer
      recordingStartRef.current = Date.now()
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      intervalRef.current = window.setInterval(() => {
        if (!recordingStartRef.current) return
        const elapsed = Date.now() - recordingStartRef.current
        const mm = Math.floor(elapsed / 60000)
        const ss = Math.floor((elapsed % 60000) / 1000)
        setTimer(
          `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
        )
      }, 250)

      recorder.start()
      setRecording(true)
    } catch (err) {
      console.error("Error starting screen capture:", err)
      alert(
        "Could not start screen recording. Make sure you allowed screen & camera capture."
      )
    }
  }

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
    } else {
      // stop raf loop
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      recordingStartRef.current = null
      setTimer(null)

      if (canvasStreamRef.current) {
        canvasStreamRef.current.getTracks().forEach((t) => t.stop())
        canvasStreamRef.current = null
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }

      if (displayStreamRef.current) {
        displayStreamRef.current.getTracks().forEach((t) => t.stop())
        displayStreamRef.current = null
      }

      if (webcamStreamRef.current) {
        webcamStreamRef.current.getTracks().forEach((t) => t.stop())
        webcamStreamRef.current = null
      }

      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop())
        micStreamRef.current = null
      }

      if (audioContextRef.current) {
        try {
          audioContextRef.current.close()
        } catch (err) {}
        audioContextRef.current = null
        mixedDestinationRef.current = null
      }

      if (liveVideoRef.current) liveVideoRef.current.srcObject = null
      if (displayVideoRef.current) displayVideoRef.current.srcObject = null
      if (webcamVideoRef.current) webcamVideoRef.current.srcObject = null

      setRecording(false)
    }
  }

  const downloadRecording = () => {
    if (!recordedUrl) return
    const a = document.createElement("a")
    a.href = recordedUrl
    const ts = new Date().toISOString().replace(/[:.]/g, "-")
    a.download = `screen-recording-${ts}.webm`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <div className={styles.recorder} data-testid="recorder">
      <h2 className={styles.title}>Screen Recorder</h2>

      <div className={styles.controlBarContainer}>
        <ControlBar
          recording={recording}
          onStart={() => startRecording()}
          onStop={() => stopRecording()}
          onDownload={() => downloadRecording()}
          includeWebcam={includeWebcam}
          setIncludeWebcam={(v) => setIncludeWebcam(v)}
          timer={timer || undefined}
        />
      </div>

      <div className={styles.diagnostics}>
        Diagnostics — display audio: {diagnostics.displayAudio}, mic:{" "}
        {diagnostics.mic}, webcam: {diagnostics.webcam}
      </div>

      <div className={styles.grid}>
        <div className={styles.livePreview}>
          <video
            ref={liveVideoRef}
            autoPlay
            playsInline
            muted
            className={styles.liveVideo}
          />

          {/* visible webcam preview overlay */}
          {includeWebcam && (
            <video
              ref={webcamVideoRef}
              autoPlay
              playsInline
              muted
              className={styles.webcamOverlay}
            />
          )}

          {/* small diagnostics badge */}
          <div className={styles.diagnosticsBadge}>
            🎧 {diagnostics.displayAudio}/{diagnostics.mic}
          </div>
        </div>

        <div className={styles.recordedSection}>
          <h3>Recorded</h3>
          {recordedUrl ? (
            <video
              src={recordedUrl}
              controls
              className={styles.recordedVideo}
            />
          ) : (
            <div className={styles.noRecording}>
              No recording yet — start a screen recording to see it here.
            </div>
          )}

          <div className={styles.actions}>
            <button
              onClick={downloadRecording}
              disabled={!recordedUrl}
              className={styles.downloadButton}
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Hidden helper elements used for composition */}
      <video
        ref={displayVideoRef}
        autoPlay
        playsInline
        muted
        className={styles.hidden}
      />
      <canvas ref={canvasRef} className={styles.hidden} />
    </div>
  )
}
