import { useState } from "react";
import { button } from "../../styles/ui";
import { setEcoState } from "../../state/ecoStore";
import { addEcoLog } from "../../utils/ecoLogger";
import { useNavigate } from "react-router-dom";


/* ================= UTILITY ================= */

function normalize(text) {
    return text.toLowerCase().trim();
}

/* ================= INTELLIGENCE LAYER ================= */

function detectMealType(text) {
    const t = normalize(text);

    // HIGH IMPACT FOODS
    if (
        t.includes("burger") ||
        t.includes("pizza") ||
        t.includes("biryani") ||
        t.includes("fried") ||
        t.includes("beef") ||
        t.includes("mutton")
    ) {
        return "high";
    }

    // MEDIUM IMPACT
    if (
        t.includes("rice") ||
        t.includes("paneer") ||
        t.includes("roti") ||
        t.includes("curry") ||
        t.includes("home") ||
        t.includes("dal")
    ) {
        return "medium";
    }

    // LOW IMPACT
    if (
        t.includes("oats") ||
        t.includes("salad") ||
        t.includes("fruit") ||
        t.includes("banana") ||
        t.includes("milk") ||
        t.includes("porridge")
    ) {
        return "low";
    }

    return "unknown";
}

/* ================= SCORING ENGINE ================= */

function getCarbonData(type) {
    switch (type) {

        case "high":
            return {
                co2: 3.2,
                score: 30,
                recommendation: "High carbon meal 🌍 Try reducing frequency of heavy meals.",
                alternative: "Switch to homemade or plant-based options 🌱",
                funLine: "Your meal was delicious… but the planet filed a complaint 💀"
            };

        case "medium":
            return {
                co2: 1.6,
                score: 60,
                recommendation: "Moderate impact 🍽️ Balanced but can improve.",
                alternative: "Add more vegetables and seasonal ingredients.",
                funLine: "Balanced plate, balanced planet ⚖️"
            };

        case "low":
            return {
                co2: 0.6,
                score: 85,
                recommendation: "Low impact 🌱 Great eco-friendly choice!",
                alternative: "Keep going or try fully plant-based meals.",
                funLine: "The planet just smiled at you 😌🌍"
            };

        default:
            return {
                co2: 1.8,
                score: 55,
                recommendation: "Unknown meal 🍽️ Try clearer food items.",
                alternative: "Prefer local and simple ingredients.",
                funLine: "Even the planet is confused by this dish 🤖"
            };
    }
}

/* ================= FINAL ANALYSIS ================= */

function analyzeMealInput(input) {
    const type = detectMealType(input);
    const data = getCarbonData(type);

    return {
        ...data,
        type
    };
}

/* ================= MODAL CARD ================= */

function AnalysisModal({ data, onClose }) {

    const getRating = (score) => {
        if (score >= 80) return "A";
        if (score >= 60) return "B";
        if (score >= 40) return "C";
        if (score >= 20) return "D";
        return "E";
    };

    const rating = getRating(data.score);

    return (
        <div className="overlay">
            <div className="modal">

                <h2>🌍 Carbon Impact Card</h2>

                <div className="bigEmoji">🍽️</div>

                {/* RATING */}
                <div className="ratingBox">
                    <div className="rating">{rating}</div>
                    <div className="ratingLabel">Eco Rating</div>
                </div>

                {/* DATA CARD */}
                <p><b>CO₂ Emitted:</b> {data.co2} kg</p>
                <p><b>Eco Score:</b> {data.score}/100</p>
                <p><b>Grade:</b> {rating}</p>

                {/* INSIGHTS */}
                <div className="aiBox">
                    💡 {data.recommendation}
                </div>

                <div className="aiBox">
                    🔁 {data.alternative}
                </div>

                <div className="aiBox">
                    😄 {data.funLine}
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 10,
                        marginTop: 15
                    }}
                >

                    <button
                        className="closeBtn"
                        onClick={() => {

                            addEcoLog({
                                type: "meal",
                                name: data.name,
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

                <div className="puppySpin">
                    🐶
                </div>

                <h2>EcoPup is analyzing...</h2>

                <p>🐾 Sniffing carbon footprints...</p>

            </div>

            <style>{`
                .loaderCard{
                    background:white;
                    width:340px;
                    border-radius:18px;
                    padding:24px;
                    text-align:center;
                }

                .puppySpin{
                    font-size:60px;
                    animation:spin 1s linear infinite;
                }

                @keyframes spin{
                    from{
                        transform:rotate(0deg);
                    }
                    to{
                        transform:rotate(360deg);
                    }
                }
            `}</style>

        </div>
    );
}

/* ================= MAIN COMPONENT ================= */


export default function MealModule() {

    const navigate = useNavigate();

    const [selected, setSelected] = useState(null);
    const [customMeal, setCustomMeal] = useState("");
    const [loading, setLoading] = useState(false);

    const meals = [
        { name: "Burger", emoji: "🍔" },
        { name: "Pizza", emoji: "🍕" },
        { name: "Biryani", emoji: "🍛" },
        { name: "Oats", emoji: "🥣" },
        { name: "Salad", emoji: "🥗" }
    ];

    const analyzeMeal = (meal) => {

        setLoading(true);

        setTimeout(() => {

            const result = analyzeMealInput(meal.name);

            setEcoState({
                score: result.score,
                mood: result.score > 70 ? "good" : "bad",
                badge: result.score > 80 ? "Green Hero" : "Starter Saver",
            });

            setSelected({
                name: meal.name,
                emoji: meal.emoji,
                ...result
            });

            

            setLoading(false);

        }, 1800);

    };

    const analyzeCustom = async () => {

        if (!customMeal.trim()) return;

        setLoading(true);

        try {

            const response = await fetch(
                "https://ecopup-carbon-tracker.onrender.com/analyze",
              
 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        type: "meal",
                        itemName: customMeal
                    })
                }
            );

           

            const text = await response.text();

           

            const data = JSON.parse(text);

            setSelected({
                name: customMeal,
                emoji: "🍽️",
                score: data.scoreImpact,
                co2: data.carbonFootprint,
                recommendation: data.recommendation,
                alternative: data.alternative,
                funLine: data.message
            });

            setEcoState({
                score: data.scoreImpact,
                mood:
                    data.scoreImpact > 70
                        ? "good"
                        : "bad",
                badge: "Eco Explorer"
            });

        } catch (err) {

            console.error(
           
                err
            );

            const result =
                analyzeMealInput(customMeal);

            setSelected({
                name: customMeal,
                emoji: "🍽️",
                ...result
            });

            setEcoState({
                score: result.score,
                mood:
                    result.score > 70
                        ? "good"
                        : "bad",
                badge: "Eco Explorer"
            });

        } finally {

            setLoading(false);

        }

    };

    return (
        <div>

            {/* HEADER */}
            <div style={styles.header}>
                <h3>🍽️ What are you eating today?</h3>
                <p>Type anything — we understand your meal 🌱</p>
            </div>

            {/* QUICK PICKS */}
            <div style={styles.grid}>
                {meals.map((m) => (
                    <div
                        key={m.name}
                        style={styles.card}
                        onClick={() => analyzeMeal(m)}
                    >
                        <div style={styles.emoji}>{m.emoji}</div>
                        <div style={styles.name}>{m.name}</div>
                    </div>
                ))}
            </div>

            {/* INPUT */}
            <div style={styles.customBox}>
                <input
                    placeholder="Try: biryani, poha, oats, pasta..."
                    value={customMeal}
                    onChange={(e) => setCustomMeal(e.target.value)}
                    style={styles.input}
                />

                <button onClick={analyzeCustom} style={styles.analyseBtn}>
                    Analyse
                </button>
            </div>

            {/* BACK */}
            <button
                style={button}
                onClick={() => navigate("/dashboard")}
            >
                ← Back
            </button>

            {/* MODAL */}
            {loading && <AnalysisLoader />}
            {selected && (
                <AnalysisModal
                    data={selected}
                    onClose={() => setSelected(null)}
                />
            )}


        </div>
    );
}

/* ================= STYLES ================= */

const styles = {
    header: {
        textAlign: "center",
        marginBottom: 10,
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "14px",
        padding: "10px",
    },

    card: {
        height: "120px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    emoji: {
        fontSize: "36px",
    },

    name: {
        fontWeight: "700",
        fontSize: "14px",
    },

   
        customBox: {
            marginTop: 20,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px"
        }, 
    

    input: {
        padding: "10px",
        width: "50%",
        borderRadius: "10px",
        border: "1px solid #ddd",
    },

    analyseBtn: {
        marginTop: "10px",
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        background: "#6BCB77",
        color: "white",
        cursor: "pointer",
    }
};
