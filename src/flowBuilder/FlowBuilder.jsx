import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "./flowBuilder.css";
import "reactflow/dist/style.css";
import MessageNode from "../nodes/messageNode/MessageNode";
import { initialEdges, initialNodes } from "../constants";
import SidePanel from "../nodePanel/SidePanel";
import NavBar from "../navBar/NavBar";
import { toast } from "react-toastify";

const nodeTypes = {
  messageNode: MessageNode,
};

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState();
  const [showSettingPanel, setShowSettingsPanel] = useState(false);

  // this UseEffect is used to highlight the selected node when a user clicks on it to edit the message

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

  // this function is called whenever any edge is updated

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        id: `${edges.length} + 1`,
      };
      // this function unselects a node when user is chnaging the edges
      handleCloseSettingsPanel();
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === edge?.target || edge?.source) {
            node.isConnected = true;
          } else {
            node.isConnected = false;
          }
          return node;
        })
      );
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

// for drag and drop of a node
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

// this function converts a message panel node to a canvas node and place it on the react flow map
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
          isConnected: false,
          type,
          position,
        },
      ]);
    },
    [reactFlowInstance]
  );
// used to edit data inside a node
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
// call back function to update the selected node state, it is set from the setting panel, 
// we can use context api or redux instead of props passing 

  const updateSelectedNode = (e, data) => {
    setSelectedNode(data);
    setShowSettingsPanel(true);
  };
// closes the settings panel and unselects the node
  const handleCloseSettingsPanel = () => {
    setSelectedNode(null);
    setShowSettingsPanel(false);
  };
// for alert 
  const notify = (type, message) => {
    type === "success" ? toast.success(message) : toast.error(message);
  };
// handleSave saves the nodes and edges in the local storage
  const handleSave = () => {
    const isError = nodes?.find((node) => node?.isConnected === false);
    // if there is only one node or if all the nodes have at least one edge, we can save the data
    if (nodes?.length <= 1 || !isError) {
      notify("success", "Saved Successfully");
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
    }
    if (nodes?.length > 1 && isError) {
      notify("error", "One of more nodes does not contain an edge");
    }
  };

  return (
    <div className="root">
      <ReactFlowProvider>
        <NavBar handleSave={handleSave} />
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
              onNodesDelete={handleCloseSettingsPanel}
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

export default FlowBuilder;
