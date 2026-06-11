function App() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Arial",
                textAlign: "center",
            }}
        >
            <h1>🌍 Carbon Compass AI</h1>

            <p>
                Understand your food and transport impact.
            </p>

            <button
                style={{
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Get Started
            </button>
        </div>
    );
}

export default App;