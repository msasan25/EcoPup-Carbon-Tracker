import { useState } from "react";
import { button } from "../../styles/ui";
import { setEcoState } from "../../state/ecoStore";
import { addEcoLog } from "../../utils/ecoLogger";
import { useNavigate } from "react-router-dom";

/* ================= NORMALIZER ================= */

function normalize(text) {
    return text.toLowerCase().trim();
}

/* ================= DETECT MODE ================= */

function detectTransportType(text) {
    const t = normalize(text);

    if (
        t.includes("flight") ||
        t.includes("plane") ||
        t.includes("air")
    ) {
        return "flight";
    }

    if (
        t.includes("car") ||
        t.includes("sedan") ||
        t.includes("suv") ||
        t.includes("honda") ||
        t.includes("hyundai") ||
        t.includes("toyota") ||
        t.includes("kia")
    ) {
        return "car";
    }

    if (
        t.includes("bus")
    ) {
        return "bus";
    }

    if (
        t.includes("metro") ||
        t.includes("train") ||
        t.includes("subway")
    ) {
        return "metro";
    }

    if (
        t.includes("bike") ||
        t.includes("cycle") ||
        t.includes("scooter") ||
        t.includes("activa") ||
        t.includes("motorcycle")
    ) {
        return "bike";
    }

    if (
        t.includes("auto") ||
        t.includes("rickshaw")
    ) {
        return "bus";
    }

    if (
        t.includes("uber auto") ||
        t.includes("ola auto")
    ) {
        return "bus";
    }

    if (
        t.includes("uber moto") ||
        t.includes("rapido")
    ) {
        return "bike";
    }

    if (
        t.includes("uber") ||
        t.includes("ola") ||
        t.includes("cab") ||
        t.includes("taxi")
    ) {
        return "car";
    }

    if (
        t.includes("walk")
    ) {
        return "walk";
    }

    return "unknown";

}

/* ================= CARBON ENGINE ================= */

function getTransportData(type, km = 5) {
    switch (type) {

        case "flight":
            return {
                co2: 0.25 * km,
                score: 25,
                recommendation: "Flights emit high CO₂ ✈️",
                alternative: "Prefer train or bus 🚆",
                funLine: "Your carbon just went on vacation 💀"
            };

        case "car":
            return {
                co2: 0.21 * km,
                score: 40,
                recommendation: "Cars are moderate-high emission 🚗",
                alternative: "Try metro or carpool 🚇",
                funLine: "Solo ride, shared planet impact 😬"
            };

        case "bus":
            return {
                co2: 0.08 * km,
                score: 70,
                recommendation: "Bus is efficient 🚌",
                alternative: "Metro is even better",
                funLine: "Shared ride = shared impact 🌍"
            };

        case "metro":
            return {
                co2: 0.05 * km,
                score: 85,
                recommendation: "Metro is eco-friendly 🚇",
                alternative: "Keep using public transport",
                funLine: "Clean rails, clean planet 😌"
            };

        case "bike":
            return {
                co2: 0,
                score: 95,
                recommendation: "Zero emissions 🚴",
                alternative: "Perfect choice",
                funLine: "Planet approves 👑"
            };

        case "walk":
            return {
                co2: 0,
                score: 100,
                recommendation: "Walking is best 🚶",
                alternative: "You already won",
                funLine: "Carbon-negative legend 🐐"
            };

        default:
            return {
                co2: 0.1 * km,
                score: 55,
                recommendation: "Unknown mode 🤔",
                alternative: "Prefer public transport",
                funLine: "Even GPS is confused 🤖"
            };
    }
}

/* ================= MAIN ================= */

export default function TransportModule() {

    const navigate = useNavigate();


    const [vehicle, setVehicle] = useState("");
    const [km, setKm] = useState("");
    const [fuel, setFuel] = useState("petrol");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const analyze = () => {

        if (!vehicle.trim()) return;

        setLoading(true);

        setTimeout(() => {

            const type = detectTransportType(vehicle);
            const distance = parseFloat(km || 5);

            const data = getTransportData(type, distance);

            setEcoState({
                score: data.score,
                mood: data.score > 70 ? "good" : "bad",
                badge: "Mobility Explorer"
            });

            setResult({
                vehicle,
                fuel,
                type,
                km: distance,
                ...data
            });

           

            setLoading(false);

        }, 1800);

    };

    return (
        <div style={{ padding: 20 }}>

            <div style={styles.header}>
                <h3>🚗 How are you travelling today?</h3>
                <p>Tell us your ride — we'll calculate its impact 🌍</p>
            </div>

            <div style={styles.topBar}>
                <button
                    style={button}
                    onClick={() => navigate("/dashboard")}
                >
                    ← Back
                </button>

              
            </div>

            <div style={styles.field}>
                <label>🚗 Vehicle Type</label>

                <input
                    aria-label="Enter transport method"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    placeholder="e.g. Honda City, Activa, Bus..."
                    style={styles.input}
                />
            </div>

            <div style={styles.field}>
                <label>📍 Distance (km)</label>

                <input
                    aria-label="Enter kms"
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                    placeholder="e.g. 25"
                    style={styles.input}
                />
            </div>

            <div style={styles.field}>
                <label>⛽ Fuel Type</label>

                <div style={styles.fuelGrid}>

                    {["petrol", "diesel", "electric", "n/a"].map((f) => (

                        <button
                            key={f}
                            onClick={() => setFuel(f)}
                            style={{
                                ...styles.fuelBtn,
                                ...(fuel === f
                                    ? styles.activeFuel
                                    : {})
                            }}
                        >
                            {f}
                        </button>

                    ))}

                </div>
            </div>

            <button
                aria-label="Analyze transport"
                onClick={analyze}
                style={styles.calculateBtn}
            >
                Calculate Impact
            </button>

            {loading && <AnalysisLoader />}

            {result && (
                <AnalysisModal
                    data={result}
                    onClose={() => setResult(null)}
                />
            )}

        </div>
    );
}

/* ================= MODAL ================= */

function AnalysisModal({ data, onClose }) {

    const getRating = (score) => {
        if (score >= 80) return "A";
        if (score >= 60) return "B";
        if (score >= 40) return "C";
        if (score >= 20) return "D";
        return "E";
    };

    return (
        <div className="overlay">
            <div className="modal">

                <h2>🚗 Impact Card</h2>

                <div className="bigEmoji">🌍</div>

                <div className="ratingBox">
                    <div className="rating">{getRating(data.score)}</div>
                </div>

                <div className="box">
                    <p><b>Mode:</b> {data.type}</p>
                    <p><b>Distance:</b> {data.km} km</p>
                    <p><b>CO₂:</b> {data.co2.toFixed(2)}</p>
                    <p><b>Score:</b> {data.score}</p>
                </div>

                <div className="aiBox">💡 {data.recommendation}</div>
                <div className="aiBox">🔁 {data.alternative}</div>
                <div className="aiBox">😄 {data.funLine}</div>
                <div style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px"
                }}>

                    <button
                        className="closeBtn"
                        onClick={() => {

                            addEcoLog({
                                type: "transport",
                                name: data.vehicle || data.type,
                                score: data.score,
                                co2: data.co2,
                                timestamp: new Date().toISOString()
                            });

                            onClose();

                        }}
                    >
                        + Log This
                    </button>

                    <button
                        className="closeBtn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>
            </div>

            <style>{`
                .overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 999;
                }

                .modal {
                    background: white;
                    width: 360px;
                    border-radius: 18px;
                    padding: 20px;
                    text-align: center;
                    animation: pop 0.2s ease;
                }

                @keyframes pop {
                    from { transform: scale(0.92); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                .ratingBox {
                    margin: 10px auto;
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    background: #f0f7ff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .rating {
                    font-size: 22px;
                    font-weight: 800;
                    color: #4d96ff;
                }

                .ratingLabel {
                    font-size: 10px;
                    opacity: 0.6;
                }

                .box {
                    background: #f5f7fb;
                    padding: 12px;
                    border-radius: 10px;
                    text-align: left;
                    margin-top: 10px;
                }

                .aiBox {
                    margin-top: 10px;
                    padding: 10px;
                    border-radius: 10px;
                    background: #fff7e6;
                    font-size: 13px;
                    text-align: left;
                }

                .closeBtn {
                    margin-top: 15px;
                    padding: 10px 14px;
                    border: none;
                    border-radius: 10px;
                    background: #4d96ff;
                    color: white;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

     

function AnalysisLoader() {
    return (
        <div className="overlay">
            <div className="loaderCard">

                <div className="puppy">
                    🐶
                </div>

                <h2>EcoPup is analyzing...</h2>

                <p>
                    🐾 Calculating carbon impact...
                </p>

            </div>

            <style>{`
                .overlay{
                    position:fixed;
                    inset:0;
                    background:rgba(0,0,0,.55);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:999;
                }

                .loaderCard{
                    background:white;
                    width:320px;
                    border-radius:18px;
                    padding:24px;
                    text-align:center;
                }

                .puppy{
                    font-size:60px;
                    animation:spin 1s linear infinite;
                }

                @keyframes spin{
                    from{transform:rotate(0deg);}
                    to{transform:rotate(360deg);}
                }
            `}</style>
        </div>
    );
}

/* ================= STYLES ================= */

const styles = {
    header: { textAlign: "center" },
    box: { textAlign: "center", marginTop: 20 },

    topBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 20
    },

    field: {
        marginBottom: 20
    },

    fuelGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(90px, 1fr))",
        gap: 12,
        marginTop: 10
    },

    fuelBtn: {
        height: 44,
        borderRadius: 12,
        border: "1px solid #d7e6d7",
        background: "white",
        cursor: "pointer"
    },

    activeFuel: {
        background:
            "linear-gradient(90deg,#183A1F,#2E5F2F)",
        color: "white",
        border: "none"
    },

    calculateBtn: {
        width: "100%",
        height: 58,
        borderRadius: 14,
        border: "none",
        background: "#70C79C",
        color: "white",
        fontWeight: "700",
        fontSize: 18,
        cursor: "pointer"
    },
    input: {
        padding: 12,
        width: "100%",
        maxWidth: "450px",
        margin: 8,
        borderRadius: 10,
        border: "1px solid #ddd",
        boxSizing: "border-box"
    },
    analyseBtn: {
        width: "100%",
        maxWidth: "450px",
        padding: "12px",
        background: "#6BCB77",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
    },


};
