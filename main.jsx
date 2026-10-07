import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          background: "#111",
          color: "#ff6b6b",
          padding: "30px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          minHeight: "100vh"
        }}>
          <h2>React Runtime Error</h2>
          {String(this.state.error)}\n\n{this.state.error.stack}
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
