import { useMeeting } from "@videosdk.live/react-sdk";

const Recording = () => {
  const { startRecording, stopRecording } = useMeeting();

  const handleStartRecording = () => {
    // Configuration for recording
    const config = {
      layout: {
        type: "SIDEBAR",
        priority: "SPEAKER",
        gridSize: 4,
      },
      theme: "DARK",
      mode: "video-and-audio",
      quality: "high",
      orientation: "landscape",
    };

    // Configuration for post transcription
    let transcription = {
      enabled: true,
      summary: {
        enabled: true,
        prompt:
          "Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary",
      },
    };

    // Start Recording
    // If you don't have a `webhookUrl` or `awsDirPath`, you should pass null.
    startRecording(
      null,
      null,
      config,
      transcription
    );
  };

  const handleStopRecording = () => {
    // Stop Recording
    stopRecording();
  };

  return (
    <>
      <button onClick={handleStartRecording}>Start Recording</button>
      <button onClick={handleStopRecording}>Stop Recording</button>
    </>
  );
};

export default Recording;