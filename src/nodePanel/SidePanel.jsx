import React, { useState } from "react";
import SettingsPanel from "./SettingsPanel";
import NodePanel from "./NodePanel";

const SidePanel = ({
  selectedNode,
  showSettingPanel,
  handleCloseSettingsPanel,
  onEdit,
}) => {

// side panel has two states/componets settings panel and node panel 
  return (
    <div className="side-panel-root">
      {showSettingPanel ? (
        <SettingsPanel
          handClosePanel={handleCloseSettingsPanel}
          selectedNode={selectedNode}
          onEdit={onEdit}
        />
      ) : (
        <NodePanel />
      )}
    </div>
  );
};

export default SidePanel;
