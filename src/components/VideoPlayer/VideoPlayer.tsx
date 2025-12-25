type Props = {
  src?: string | null
}

export default function VideoPlayer({ src }: Props): JSX.Element {
  return (
    <div className="video-player" data-testid="video-player">
      <h2>Video Player (placeholder)</h2>
      <video src={src ?? undefined} controls style={{ maxWidth: "100%" }} />
    </div>
  )
}
