import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("eco_user")) || {
            name: "Eco Explorer",
        };

   

    const streakData =
        JSON.parse(
            localStorage.getItem("eco_streak")
        ) || {
            count: 1,
            lastVisit: null
        };

    const today =
        new Date().toDateString();

    if (!streakData.lastVisit) {

        streakData.count = 1;
        streakData.lastVisit = today;

    } else {

        const lastDate =
            new Date(streakData.lastVisit);

        const currentDate =
            new Date(today);

        const diffDays =
            Math.floor(
                (currentDate - lastDate) /
                (1000 * 60 * 60 * 24)
            );

        if (diffDays === 1) {

            streakData.count += 1;
            streakData.lastVisit = today;

        } else if (diffDays > 1) {

            streakData.count = 1;
            streakData.lastVisit = today;

        }
    }

    localStorage.setItem(
        "eco_streak",
        JSON.stringify(streakData)
    );

    const streak = streakData.count;

    const tips = [
        "Swapping one beef meal a week can save over 1 tonne CO₂ per year 🌱",
        "Walking produces zero direct emissions 🚶",
        "Local food usually has a lower carbon footprint 🍅",
        "Cycling is one of the greenest travel options 🚴",
        "Reducing food waste helps the planet and your wallet ♻️",
    ];

    const dailyTip =
        tips[new Date().getDate() % tips.length];

    return (
        <div style={styles.page}>

            {/* HEADER */}

            <div style={styles.header}>

                <div>

                    <button
                        aria-label="Home"
                        style={styles.homeBtn}
                        onClick={() => navigate("/")}
                    >
                        🏠 Home
                    </button>

                    <h2 style={styles.heading}>
                        Hey {user.name}! 👋
                    </h2>

                    <p style={styles.subHeading}>
                        Let's check your impact today
                    </p>

                </div>

                <div style={styles.streak}>
                    <div style={styles.fire}>🔥</div>
                    <div style={styles.streakNumber}>
                        {streak}
                    </div>
                    <div style={styles.streakText}>
                        {streak === 1
                            ? "day streak"
                            : "days streak"}
                    </div>
                </div>

            </div>

            {/* CARDS */}

            <div style={styles.grid}>

                <Card
                    emoji="🌍"
                    title="Impact Summary"
                    subtitle="Your impact history"
                    color="#8BD0A6"
                    onClick={() => navigate("/impact")}
                    
 
                />

                <Card
                    emoji="🍽️"
                    title="Meal Impact"
                    subtitle="Track food footprint"
                    color="#E7A15A"
                    onClick={() => navigate("/meal")}
                />

                <Card
                    emoji="🚗"
                    title="Vehicle Impact"
                    subtitle="Log your travel"
                    color="#7FB2FF"
                    onClick={() => navigate("/transport")}
                />

                <Card
                    emoji="🏅"
                    title="Badges"
                    subtitle="Your achievements"
                    color="#F1D23D"
                    onClick={() => navigate("/progress")}
                />

            </div>

            {/* TIP */}

            <div style={styles.tipCard}>

                <h3 style={styles.tipTitle}>
                    💡 EcoPup's Tip of the Day
                </h3>

                <p style={styles.tipText}>
                    {dailyTip}
                </p>

            </div>

        </div>
    );
}

function Card({
    emoji,
    title,
    subtitle,
    color,
    onClick,
}) {
    return (
        <div
            style={{
                ...styles.card,
                borderColor: color,
            }}
            onClick={onClick}
        >
            <div style={styles.cardEmoji}>
                {emoji}
            </div>

            <h3>{title}</h3>

            <p>{subtitle}</p>

            <span style={styles.arrow}>
                →
            </span>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f7f9f7",
    },

    header: {
        background:
            "linear-gradient(90deg,#183A1F,#285B2B,#3A6E32)",
        color: "white",
        padding: "30px",
        borderBottomLeftRadius: "28px",
        borderBottomRightRadius: "28px",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    paw: {
        fontSize: "28px",
        marginBottom: "10px",
    },

    heading: {
        margin: 0,
        fontSize: "28px",
    },

    subHeading: {
        marginTop: "6px",
        opacity: 0.85,
    },

    streak: {
        background: "rgba(255,255,255,0.12)",
        borderRadius: "18px",
        padding: "15px",
        width: "90px",
        textAlign: "center",
    },

    fire: {
        fontSize: "22px",
    },

    streakNumber: {
        fontSize: "30px",
        fontWeight: "800",
        color: "#FFD54F",
    },

    streakText: {
        fontSize: "12px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "18px",
        padding: "20px",
    },

    card: {
        background: "white",
        minHeight: "180px",
        borderRadius: "22px",
        padding: "20px",
        border: "3px solid",
        cursor: "pointer",
        position: "relative",
        boxShadow:
            "0 10px 24px rgba(0,0,0,0.05)",
    },

    cardEmoji: {
        fontSize: "34px",
        marginBottom: "20px",
    },

    arrow: {
        position: "absolute",
        right: "18px",
        bottom: "14px",
        fontSize: "24px",
        opacity: 0.5,
    },

    tipCard: {
        margin: "20px",
        background:
            "linear-gradient(90deg,#183A1F,#285B2B,#3A6E32)",
        color: "white",
        padding: "22px",
        borderRadius: "22px",
    },

    tipTitle: {
        marginTop: 0,
    },

    tipText: {
        marginBottom: 0,
        lineHeight: 1.5,
    },
};