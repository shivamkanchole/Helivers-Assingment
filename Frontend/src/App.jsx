import { Outlet } from "react-router";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Outlet>

        </Outlet>
      </main>
    </>
  );
}

export default App;
