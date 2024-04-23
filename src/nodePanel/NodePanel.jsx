import React from "react";
import "./sidePanel.css";
import MessagePanelNode from "../nodes/messageNode/MessagePanelNode";


const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="node-panel-root">
      <div onDragStart={(event) => onDragStart(event, "messageNode")} draggable>
        <MessagePanelNode />
      </div>
    </div>
  );
};

export default NodePanel;
