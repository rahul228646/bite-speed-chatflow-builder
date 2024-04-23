import { Typography } from "@mui/material";
import React from "react";
import MessageIcon from '@mui/icons-material/Message';

const MessagePanelNode = () => {
  return (
    <div className="message-panel-node-root">
      <MessageIcon fontSize="large" style={{ color: "#3857be" }} />
      <Typography style={{ color: "#3857be", fontWeight: "bold" }}>
        Messsage
      </Typography>
    </div>
  );
};

export default MessagePanelNode;
