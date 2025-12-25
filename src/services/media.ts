export async function requestMediaStream() {
  return navigator.mediaDevices.getUserMedia({ audio: true, video: true });
}

export function downloadBlob(blob: Blob, filename = 'recording.webm') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
