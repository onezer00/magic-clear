import Home from "./pages/Home";
import BiggestFilesPage from "./pages/BiggestFiles/BiggestFilesPage";
import TerminalGeekPage from "./pages/TerminalGeek/TerminalGeekPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maiores-arquivos" element={<BiggestFilesPage />} />
        <Route path="/terminal-geek" element={<TerminalGeekPage />} />
      </Routes>
    </Router>
  );
}

export default App;
