import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const handleContinue = () => {

        if (!name.trim()) return;

        localStorage.setItem(
            "eco_user",
            JSON.stringify({
                name: name.trim()
            })
        );

        navigate("/dashboard");
    };

    return (
        <div style={styles.page}>

            <div style={styles.card}>

                {/* PUPPY */}

                <div style={styles.puppy}>
                    🐶
                </div>

                {/* SPEECH BUBBLE */}

                <div style={styles.bubble}>

                    {!name ? (
                        <>
                            <h2 style={styles.title}>
                                Hey! I'm EcoPup 🌱
                            </h2>

                            <p style={styles.text}>
                                What's your name?
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 style={styles.title}>
                                Hey {name}! 👋
                            </h2>

                            <p style={styles.text}>
                                Ready to track your impact?
                            </p>
                        </>
                    )}

                </div>

                {/* INPUT */}

                <input
                    aria-label="Enter your name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="Type your name..."
                    style={styles.input}
                />

                {/* CTA */}

                {name.trim() && (
                    <button
                        style={styles.cta}
                        onClick={handleContinue}
                    >
                        🌍 Let's Save The Planet
                    </button>
                )}

            </div>

            <style>
                {`
                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }

                    50% {
                        transform: translateY(-10px);
                    }

                    100% {
                        transform: translateY(0px);
                    }
                }

                @keyframes fadeUp {

                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}
            </style>

        </div>
    );
}

const styles = {

    page: {
        minHeight: "100vh",
        background:
            "linear-gradient(180deg,#17361f,#285B2B,#3A6E32)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    },

    card: {
        width: "100%",
        maxWidth: "450px",
        textAlign: "center"
    },

    puppy: {
        fontSize: "110px",
        animation: "float 3s ease-in-out infinite"
    },

    bubble: {
        background: "white",
        borderRadius: "22px",
        padding: "24px",
        marginTop: "10px",
        boxShadow:
            "0 12px 30px rgba(0,0,0,.15)"
    },

    title: {
        margin: 0,
        color: "#183A1F"
    },

    text: {
        marginTop: "10px",
        color: "#555"
    },

    input: {
        width: "100%",
        marginTop: "25px",
        padding: "16px",
        borderRadius: "16px",
        border: "none",
        outline: "none",
        fontSize: "16px"
    },

    cta: {
        width: "100%",
        marginTop: "20px",
        padding: "16px",
        borderRadius: "16px",
        border: "none",
        background: "#FFD54F",
        color: "#17361f",
        fontWeight: "800",
        fontSize: "16px",
        cursor: "pointer",
        animation: "fadeUp .3s ease"
    }
};