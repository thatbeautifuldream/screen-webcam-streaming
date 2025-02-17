import { useRef, useEffect } from "react";

interface ScreenRecorderProps {
  stream: MediaStream | null;
}

export default function ScreenRecorder({ stream }: ScreenRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      id="screenVideo"
      ref={videoRef}
      autoPlay
      muted
      className="w-full max-w-lg"
    ></video>
  );
}
