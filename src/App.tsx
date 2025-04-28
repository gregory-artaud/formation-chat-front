import "./App.css";
import { Chat } from "./components/Chat";
import { SlackNavbar } from "./components/SlackNavbar";
import { SlackSidebar } from "./components/SlackSidebar";

function App() {
  return (
    <div className="flex flex-col size-full overflow-y-hidden">
      <SlackNavbar />
      <div className="flex size-full">
        <SlackSidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
