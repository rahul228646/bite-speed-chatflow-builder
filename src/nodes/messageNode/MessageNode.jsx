import React from "react";
import { Handle, Position } from "reactflow";
import "./messageNode.css";
import MessageIcon from "@mui/icons-material/Message";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const MessageNode = ({ data }) => {
  return (
    <div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
      <div
        className={`message-node-root ${data?.isSelected && "selcted-node"}`}
      >
        <div className="message-node-header">
          <MessageIcon
            sx={{ height: "10px", width: "10px", paddingTop: "2px" }}
          />
          <div>Send Message</div>
          <WhatsAppIcon
            sx={{ height: "10px", width: "10px", marginLeft: "auto" }}
          />
        </div>

        <div className="message-content">{data?.text}</div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default MessageNode;
