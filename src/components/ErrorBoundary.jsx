import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can log to an external service here
    // eslint-disable-next-line no-console
    console.error("Uncaught error in component tree:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message || "An unexpected error occurred."}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
