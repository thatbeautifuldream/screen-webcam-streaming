"use client";

import { useState } from "react";
import UploadManager from "@/components/upload-manager";
import WebcamRecorder from "@/components/webcam-recorder";
import ScreenRecorder from "@/components/screen-recorder";

export default function LiveScreenStreaming() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);

  const startStreaming = async () => {
    const screen = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const audio = await navigator.mediaDevices.getUserMedia({ audio: true });
    const webcam = await navigator.mediaDevices.getUserMedia({ video: true });

    const combinedScreen = new MediaStream([
      ...screen.getTracks(),
      ...audio.getTracks(),
    ]);

    setScreenStream(combinedScreen);
    setWebcamStream(webcam);
    setIsStreaming(true);
  };

  const stopStreaming = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setWebcamStream(null);
    }
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Live Screen and Webcam Streaming</h1>
      <ScreenRecorder stream={screenStream} />
      <WebcamRecorder stream={webcamStream} />
      <UploadManager
        screenStream={screenStream}
        webcamStream={webcamStream}
        isStreaming={isStreaming}
      />
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          className={`rounded-md bg-green-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-300 ${
            isStreaming ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={startStreaming}
          disabled={isStreaming}
        >
          Start Streaming
        </button>
        <button
          type="button"
          className={`rounded-md bg-red-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-300 ${
            !isStreaming ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={stopStreaming}
          disabled={!isStreaming}
        >
          Stop Streaming
        </button>
      </div>
    </div>
  );
}
