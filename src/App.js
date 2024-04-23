import "./App.css";
import FlowBuilder from "./flowBuilder/FlowBuilder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*
              App
              |
          FlowBuilder    (conatins nodes of type messageNodes) 
              |
            SidePanel
              /  \
      NodePanel   SettingsPanel
        |             |
MessagePanelNode   EditMessageNode

FlowBuilder : contains all the React flow wrappers and componets , this is the brain of the app
SidePanel : it is a wrapper that can have two coponents NodePanel and SettingsPanel
NodePanel : it will render all the draggable node (messagePanelNode), which when dropped on the react flow canvas will turn into a node (MessageNode)
SettingsPanel : it will render all the Editable options (EditMessageNode) for a partical node that is selected

*/

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        theme="colored"
      />
      <FlowBuilder />
    </>
  );
}

export default App;
