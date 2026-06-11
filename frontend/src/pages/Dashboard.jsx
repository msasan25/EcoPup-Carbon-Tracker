function Dashboard() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>

            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

                <div style={cardStyle}>
                    <h3>Food Impact</h3>
                    <p>Track your meal emissions</p>
                </div>

                <div style={cardStyle}>
                    <h3>Transport Impact</h3>
                    <p>Monitor travel footprint</p>
                </div>

                <div style={cardStyle}>
                    <h3>Weekly Challenge</h3>
                    <p>Improve your carbon score</p>
                </div>

            </div>
        </div>
    );
}

const cardStyle = {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    width: "200px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

export default Dashboard;