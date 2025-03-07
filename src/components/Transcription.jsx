import { Constants, useMeeting, useTranscription, useParticipant } from "@videosdk.live/react-sdk";
import {Filter} from "bad-words";
import { useState , useEffect} from "react";

const Transcription = () => {
  const filter = new Filter();
  const [participantToRemove, setParticipantToRemove] = useState(null);
  const { participants } = useMeeting();

  // Configuration for realtime transcription
  const config = {
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

    if (filter.isProfane(text)) {
      console.warn(`Profanity detected! ${participantName} is marked for removal.`);
      setParticipantToRemove(participantId);
    }
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

    <ParticipantView2 participantId={participantToRemove} onRemoved={() => setParticipantToRemove(null)} />
  </>  
};

const ParticipantView2 = ({ participantId, onRemoved }) => {
  const { remove } = useParticipant(participantId);

  useEffect(() => {
    if (participantId) {
      console.log(`Removing participant: ${participantId}`);
      remove(); // Auto-remove the participant
      onRemoved(); // Reset state after removal
    }
  }, [participantId, remove, onRemoved]);

  return null; // No UI needed since removal is automatic
};

export default Transcription;