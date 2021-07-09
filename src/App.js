import "./App.css";
import { Button, Input } from "react-bootstrap";
import BazzarConn from "./components/BazzarConn";

function App() {
  return (
    <div className="App" style={{ backgroundImage: "" }}>
      <input type="number" value="5" />
      <button>Pages</button>
      <BazzarConn />
    </div>
  );
}

export default App;
