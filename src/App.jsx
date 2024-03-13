// import "./App.css";
// import "./styles/style.css";
import "./index.css";
import Login from "./components/Login";
import Counter from "./components/counter";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div>
      <div
        style={{ position: "absolute", right: "5%", top: "10%" }}
        className={`App ${theme}`}
      >
        <button style={{ color: " white" }} onClick={toggleTheme}>
          {theme === "light" ? "🔆" : "🌙"}
        </button>
      </div>

      <Login />
      <div style={{ marginTop: "100px", marginLeft: "20px" }}>
        <Counter />
      </div>
    </div>
  );
}

export default App;
