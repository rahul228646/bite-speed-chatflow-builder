import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "./canvas.css";
import "reactflow/dist/style.css";
import MessageNode from "../nodes/messageNode/MessageNode";
import { initialEdges, initialNodes } from "../constants";
import SidePanel from "../nodePanel/sidePanel";
import NavBar from "../navBar/NavBar";

const nodeTypes = {
  messageNode: MessageNode,
};

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState();
  const [showSettingPanel, setShowSettingsPanel] = useState(false);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data.isSelected = true;
        } else {
          node.data.isSelected = false;
        }
        return node;
      })
    );
  }, [selectedNode]);

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        id: `${edges.length} + 1`,
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setNodes((prevNodes) => [
        ...prevNodes,
        {
          id: `${prevNodes.length + 1}`,
          data: {
            text: `Text message ${prevNodes.length + 1}`,
            selected: false,
          },
          type,
          position,
        },
      ]);
    },
    [reactFlowInstance]
  );

  const onEdit = (data, id) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = data;
        }
        return node;
      })
    );
  };

  const updateSelectedNode = (e, data) => {
    setSelectedNode(data);
    setShowSettingsPanel(true);
  };

  const handleCloseSettingsPanel = () => {
    setSelectedNode(false);
    setShowSettingsPanel(false);
  };

  return (
    <div className="root">
      <ReactFlowProvider>
        <NavBar />
        <div className="canvas-layout">
          <div
            className="reactflow-wrapper"
            style={{ height: "90vh", width: "70vw" }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              onNodeClick={updateSelectedNode}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
          <SidePanel
            selectedNode={selectedNode}
            showSettingPanel={showSettingPanel}
            handleCloseSettingsPanel={handleCloseSettingsPanel}
            onEdit={onEdit}
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Canvas;
