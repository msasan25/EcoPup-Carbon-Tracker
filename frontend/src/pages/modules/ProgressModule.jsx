import { useState } from "react";
import { button } from "../../styles/ui";
import { getLogs } from "../../utils/ecoLogger";
import { useNavigate } from "react-router-dom";

/* ================= STORAGE ================= */

function safeParse(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

function getUserData() {
    return {
        user: safeParse("eco_user", { name: "Eco Explorer" }),
        logs: safeParse("eco_logs", [])
    };
}

/* ================= HELPERS ================= */

function calculateStreak(logs) {
    if (!logs.length) return 0;

    const uniqueDays = [
        ...new Set(
            logs.map(log =>
                new Date(log.timestamp)
                    .toDateString()
            )
        )
    ].sort(
        (a, b) => new Date(b) - new Date(a)
    );

    let streak = 1;

    for (let i = 0; i < uniqueDays.length - 1; i++) {

        const current = new Date(uniqueDays[i]);
        const next = new Date(uniqueDays[i + 1]);

        const diffDays =
            (current - next) /
            (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

function getRank(score) {
    if (score >= 90) return "🌍 Climate Champion";
    if (score >= 75) return "🏆 Eco Warrior";
    if (score >= 60) return "🧭 Eco Explorer";
    if (score >= 40) return "🌱 Habit Builder";
    return "🌿 Eco Starter";
}

/* ================= PAGE ================= */

export default function ProgressModule() {

    const navigate = useNavigate();
    const logs = getLogs();


    const [user] = useState(() => {
        const data = getUserData();
        return data.user;
    });
   

    const avgScore =
        logs.length > 0
            ? Math.round(
                logs.reduce(
                    (acc, log) => acc + (log.score || 0),
                    0
                ) / logs.length
            )
            : 0;

    const streak = calculateStreak(logs);

    const rank = getRank(avgScore);

    const totalEntries = logs.length;

    const hasMeal = logs.some(
        log => log.type === "meal"
    );

    const hasTransport = logs.some(
        log => log.type === "transport"
    );

    const [flipped, setFlipped] = useState({});

    const badges = [
        {
            icon: "🌱",
            title: "First Step",
            unlocked: totalEntries >= 1,
            message:
                "Baby steps🌱 "
        },
        {
            icon: "🔥",
            title: "On Fire",
            unlocked: streak >= 3,
             message:
                "You've maintained a 3-day streak. Consistency creates impact! 🔥"
        },
        {
            icon: "🚴",
            title: "Road Tracker",
            unlocked: hasTransport,
            message:
                "You started tracking how you travel. Awareness is the first step to cleaner journeys 🚴"
        },
        {
            icon: "🥗",
            title: "Food Tracker",
            unlocked: hasMeal,
            message:
                "You logged your meals and started understanding food emissions 🍽️"
        },
        {
            icon: "🏆",
            title: "Eco Warrior",
            unlocked: avgScore >= 80,
            message:
                "Your eco score is exceptional. The planet appreciates your efforts 🏆"
        },
        {
            icon: "🌳",
            title: "Green Thumb",
            unlocked: totalEntries >= 10,
            message:
                "Ten eco actions logged! Small habits are becoming a lifestyle 🌳"
        },

        {
            icon: "🌍",
            title: "Climate Champion",
            unlocked: avgScore >= 70,
            message:
                "You're making climate-conscious decisions consistently 🌍"
        },
        {
            icon: "🥗",
            title: "Plant Lover",
            unlocked: logs.some(
                log =>
                    log.name?.toLowerCase().includes("salad") ||
                    log.name?.toLowerCase().includes("oats")
            ),
            message:
                "Plant-based choices can dramatically reduce food emissions 🥗"
        },
        {
            icon: "🚴",
            title: "Pedal Power",
            unlocked: logs.some(
                log =>
                    log.type === "transport" &&
                    (log.name?.toLowerCase().includes("walk") ||
                        log.name?.toLowerCase().includes("cycle"))

            ),
            message:
                "Walking and cycling are among the cleanest forms of transport 🚴"
        }
    ];

    const unlockedCount =
        badges.filter(
            badge => badge.unlocked
        ).length;

    

    return (
        <div style={styles.page}>

            {/* HEADER */}

            <div style={styles.header}>

                <button
                    style={button}
                    onClick={() => navigate("/dashboard")}
                >
                    ← Back
                </button>

                <h2>
                    Your Badges
                </h2>

                <div />
            </div>

            {/* RANK CARD */}

            <div style={styles.rankCard}>

                <div style={styles.paw}>
                    🐾
                </div>

                <div style={styles.rankName}>
                    {user?.name}'s Rank
                </div>

                <div style={styles.score}>
                    {avgScore}
                    <span style={styles.scoreSmall}>
                        /100
                    </span>
                </div>

                <div style={styles.rank}>
                    {rank}
                </div>

                <div style={styles.rankSub}>
                    On the right path!
                </div>

                <div style={styles.metrics}>
                    🔥 {streak} day streak •
                    📊 {totalEntries} entries •
                    🏅 {unlockedCount}/9 badges
                </div>

            </div>

            {/* BADGES */}

            <h4 style={styles.badgeTitle}>
                BADGES
            </h4>

            <div style={styles.badgeGrid}>

                {badges.map((badge) => (

                    <div
                        key={badge.title}
                        style={{
                            ...styles.badgeCard,
                            transition: "all .3s ease",
                            opacity: badge.unlocked ? 1 : 0.55,
                            background:
                                badge.unlocked
                                    ? (
                                        flipped[badge.title]
                                            ? "#f5fff5"
                                            : "white"
                                    )
                                    : "#f2f2f2"
                        }}
                        onClick={() => {

                            if (!badge.unlocked) return;

                            setFlipped(prev => ({
                                ...prev,
                                [badge.title]:
                                    !prev[badge.title]
                            }));
                        }}
                    >
                        {!flipped[badge.title] ? (

                            <>
                                <div style={styles.badgeIcon}>
                                    {badge.unlocked ? badge.icon : "🔒"}
                                </div>

                                <div style={styles.badgeTitle}>
                                    {badge.unlocked
                                        ? badge.title
                                        : "Locked Badge"}
                                </div>
                            </>

                        ) : (

                            <div style={styles.badgeMessage}>
                                🐶 {badge.message}
                            </div>

                        )}
                    </div>

                ))}

            </div>

            {/* SHARE */}

            {/* SHARE */}

            <div style={styles.shareSection}>

                <button
                    aria-label="Share your eco impact on social media"
                    style={styles.shareBtn}
                    onClick={() => {

                        const shareText = `
🌍 EcoPup Impact Report

🏅 ${rank}
🔥 ${streak} Day Streak
📈 Eco Score: ${avgScore}/100

I've been tracking my carbon footprint with EcoPup 🐶🌱

#EcoPup #Sustainability #ClimateAction
`;

                        if (navigator.share) {

                            navigator.share({
                                title: "My EcoPup Impact",
                                text: shareText
                            });

                        } else {

                            navigator.clipboard.writeText(
                                shareText
                            );

                            alert(
                                "Impact copied to clipboard! 📋"
                            );
                        }
                    }}
                >
                    📤 Share Impact
                </button>

                <div style={styles.branding}>
                    🐶 Powered by EcoPup
                </div>

            </div>

        </div>
    );
}

/* ================= STYLES ================= */

const styles = {

    page: {
        padding: 20,
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20
    },

    rankCard: {
        background:
            "linear-gradient(135deg,#17361f,#3f6f32)",
        color: "white",
        borderRadius: 22,
        padding: "clamp(20px, 4vw, 30px)",
        textAlign: "center"
    },

    paw: {
        fontSize: 42
    },

    rankName: {
        marginTop: 10,
        opacity: 0.8
    },

    score: {
        fontSize: "clamp(40px, 8vw, 56px)",
        fontWeight: 800,
        color: "#f7b548"
    },

    scoreSmall: {
        fontSize: 24
    },

    rank: {
        fontSize: 24,
        fontWeight: 700,
        color: "#f7b548"
    },

    rankSub: {
        marginTop: 5,
        opacity: 0.8
    },

    metrics: {
        marginTop: 20,
        fontSize: 13,
        opacity: 0.8
    },
    badgeCard: {
        background: "white",
        borderRadius: "18px",
        padding: "16px",
        minHeight: "120px",
        cursor: "pointer",
        transition: "all .4s ease",
        boxShadow:
            "0 6px 15px rgba(0,0,0,.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },

    badgeIcon: {
        fontSize: "34px"
    },

    badgeTitle: {
        marginTop: 10,
        fontWeight: "700"
    },

    badgeMessage: {
        fontSize: "13px",
        lineHeight: 1.4
    },


    badgeGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 14
    },


    badgeText: {
        marginTop: 10,
        fontWeight: 600,
        fontSize: 14
    },

   
    shareSection: {
        marginTop: 25,
        textAlign: "center"
    },

    shareBtn: {
        width: "100%",
        padding: "14px",
        borderRadius: "14px",
        border: "1px solid #ccc",
        background: "white",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "15px"
    },

    branding: {
        marginTop: 12,
        fontSize: "13px",
        opacity: 0.7,
        fontWeight: "600"
    },
};
