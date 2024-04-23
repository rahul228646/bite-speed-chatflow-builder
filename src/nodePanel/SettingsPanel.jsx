import React, { useState } from "react";
import EditMessageNode from "../nodes/messageNode/EditMessageNode";
import { useNodesState } from "reactflow";
import { Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./sidePanel.css";
import { initialNodes } from "../constants";

const SettingsPanel = ({ selectedNode, handClosePanel, onEdit }) => {
  const type = selectedNode?.type;
  const data = selectedNode?.data;
  const id = selectedNode?.id;
  // if we want to add more dragable nodes of different type instaed of just text type, we can do that here
  // we can more componets similar to Edit message componet like audio edit componet
  const nodeTypeDict = {
    messageNode: {
      label: "Message",
      content: <EditMessageNode onEdit={onEdit} id={id} data={data} />,
    },
  };

  return (
    <div>
      {type in nodeTypeDict && (
        <div>
          <div className="setting-panel-header">
            <KeyboardBackspaceIcon
              onClick={handClosePanel}
              style={{ cursor: "pointer" }}
            />
            <Typography style={{ fontWeight: "Bold", margin: "auto" }}>
              {nodeTypeDict[type]?.label}
            </Typography>
          </div>
          <div className="setting-panel-content">
            {nodeTypeDict[type]?.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
