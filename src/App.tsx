import "./App.css";
import { AccountListTable } from "./components/AccountListTable";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main"><AccountListTable /></div>
    </div>
  );
}

export default App;
