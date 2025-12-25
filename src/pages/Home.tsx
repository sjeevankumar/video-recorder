import { Recorder, VideoPlayer } from "../components"

export default function Home(): JSX.Element {
  return (
    <main style={{ padding: 20 }}>
      <h1>Video Recorder — Home (placeholder)</h1>
      <Recorder />
      <hr />
      <VideoPlayer />
    </main>
  )
}
