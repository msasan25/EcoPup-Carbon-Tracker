import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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

                <div style={styles.puppy}>
                    🐶
                </div>

                <h1 style={styles.title}>
                    {!name
                        ? "Hey! I'm EcoPup 🌱"
                        : `Hey ${name}! 👋`}
                </h1>

                <p style={styles.subtitle}>
                    {!name
                        ? "Track your environmental impact with AI-powered insights."
                        : "Ready to track your impact?"}
                </p>

                <div style={styles.googleWrapper}>
                    <GoogleLogin 
                        size="large"
                        width="350"
                        theme="outline"
                        shape="pill"
                       

                        onSuccess={(credentialResponse) => {

                            const user = jwtDecode(
                                credentialResponse.credential
                            );

                            localStorage.setItem(
                                "eco_user",
                                JSON.stringify({
                                    name: user.name,
                                    email: user.email,
                                    picture: user.picture
                                })
                            );

                            navigate("/dashboard");
                        }}
                        onError={() => {
                            alert(
                                "Google Sign In failed"
                            );
                        }}
                    />
                </div>

                <div style={styles.divider}>
                    <div style={styles.line}></div>
                    <span>OR</span>
                    <div style={styles.line}></div>
                </div>

                <input
                    aria-label="Enter your name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    style={styles.input}
                />

                {name.trim() && (
                    <button
                        style={styles.cta}
                        onClick={handleContinue}
                    >
                        🐾 Continue as Guest
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

    card: {
        width: "100%",
        maxWidth: "650px",
        background: "white",
        borderRadius: "28px",
        padding: "40px",
        textAlign: "center",
        boxShadow:
            "0 20px 40px rgba(0,0,0,.15)"
    },


    puppy: {
        fontSize: "clamp(60px, 15vw, 90px)",
        marginBottom: "10px",
        animation: "float 3s ease-in-out infinite"
    },

    title: {
        margin: 0,
        color: "#183A1F",
        fontSize: "clamp(28px,5vw,48px)"
    },

    subtitle: {
        color: "#666",
        marginTop: "12px",
        marginBottom: "25px",
        lineHeight: 1.5
    },

    googleWrapper: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px"
    },

    divider: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "#777",
        marginBottom: "20px"
    },

    line: {
        flex: 1,
        height: "1px",
        background: "#ddd"
    },

    input: {
        width: "100%",
        padding: "16px",
        borderRadius: "14px",
        border: "1px solid #ddd",
        outline: "none",
        fontSize: "16px",
        boxSizing: "border-box"
    },

    cta: {
        width: "100%",
        marginTop: "16px",
        padding: "16px",
        borderRadius: "14px",
        border: "none",
        background: "#FFD54F",
        color: "#183A1F",
        fontWeight: "700",
        fontSize: "16px",
        cursor: "pointer"
    },

    page: {
        minHeight: "100vh",
        background:
            "linear-gradient(180deg,#17361f,#285B2B,#3A6E32)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    },
    trustText: {
        marginTop: "16px",
        color: "#777",
        fontSize: "clamp(12px, 3vw, 14px)"
    }
}