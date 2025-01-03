import { Constants, useMeeting, useTranscription } from "@videosdk.live/react-sdk";

const Transcription = () => {

  // Configuration for realtime transcription
  const config = {
//webhookUrl : "https://www.example.com",
  summary: {
    enabled: true,
    prompt: "Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary"
  }
  };

  // Callback function for transcription state change event
  function onTranscriptionStateChanged(data) {
    const { status, id } = data;

    if (status === Constants.transcriptionEvents.TRANSCRIPTION_STARTING) {
      console.log("Realtime Transcription is starting", id);
    } else if (status === Constants.transcriptionEvents.TRANSCRIPTION_STARTED) {
      console.log("Realtime Transcription is started", id);
    } else if (
      status === Constants.transcriptionEvents.TRANSCRIPTION_STOPPING
    ) {
      console.log("Realtime Transcription is stopping", id);
    } else if (status === Constants.transcriptionEvents.TRANSCRIPTION_STOPPED) {
      console.log("Realtime Transcription is stopped", id);
    }
  }

  // Callback function for transcription text event
  function onTranscriptionText(data) {
    let { participantId, participantName, text, timestamp, type } = data;
    console.log(`${participantName}: ${text} ${timestamp}`);
  }

  // Passing callback functions to useTranscription hook
  const { startTranscription, stopTranscription } = useTranscription({
    onTranscriptionStateChanged,
    onTranscriptionText,
  });

  // Start realtime transcription
  const handleStart = () =>{
    startTranscription(config);
  }
  
  const handleStop = () =>{
    stopTranscription(config);
  }
  // Stop realtime transcription

  return<>
    <button onClick={handleStart}>Start Transcription</button>
    <button onClick={handleStop}>Stop Transcription</button>
  </>  
};

export default Transcription;