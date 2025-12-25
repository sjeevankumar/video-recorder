import { useRef, useState } from 'react';

export function useMediaRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);

  const start = async () => {
    // stub: will request media and start MediaRecorder
    setIsRecording(true);
  };

  const stop = () => {
    // stub: will stop recorder and return blob
    setIsRecording(false);
  };

  return { isRecording, start, stop, mediaRef } as const;
}
