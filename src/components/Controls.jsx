import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import "../App.css";

function Controls({ onStartScreenShare, onStopScreenShare }) {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div className="controls">
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      <button onClick={onStartScreenShare}>Start Screen Share</button>
      <button onClick={onStopScreenShare}>Stop Screen Share</button>
    </div>
  );
}

export default Controls;
