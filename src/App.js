import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Homepage from "./pages/homepage/homepage";
import Create from "./pages/create/create";
import Find from "./pages/find/find";
import Chat from "./pages/chat/chat";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/find" element={<Find />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
