import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error(
            "Application Error:",
            error,
            errorInfo
        );
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "20px",
                        textAlign: "center"
                    }}
                >
                    <h1>
                        Oops! Something went wrong.
                    </h1>

                    <p>
                        EcoPup encountered an unexpected error.
                    </p>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                    >
                        Reload App
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;