//import PopUp from './Components/PopUp/PopUp';
import "./css/App.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/Home.css";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { MemoryRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <MemoryRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>
    </>
  );
}

export default App;
