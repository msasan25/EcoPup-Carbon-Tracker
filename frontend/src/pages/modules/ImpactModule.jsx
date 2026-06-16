
import { button } from "../../styles/ui";
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

/* ================= DATA ================= */

function getLogs() {
    return safeParse("eco_logs", []);
}

/* ================= COMPONENT ================= */
export default function ImpactModule() {

    const navigate = useNavigate();

    const logs = getLogs();

    const totalCO2 = logs.reduce(
        (sum, log) => sum + Number(log.co2 || 0),
        0
    );

    const avgScore =
        logs.length > 0
            ? Math.round(
                logs.reduce(
                    (sum, log) =>
                        sum + (log.score || 0),
                    0
                ) / logs.length
            )
            : 0;

    const mealsLogged = logs.filter(
        log => log.type === "meal"
    ).length;

    const tripsLogged = logs.filter(
        log => log.type === "transport"
    ).length;

    const budgetPercent = Math.min(
        Math.round((totalCO2 / 15) * 100),
        100
    );

    const recentLogs = [...logs]
        .reverse()
        .slice(0, 5);

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
                    Your Impact
                </h2>

                <div />
            </div>

            {/* STATS */}

            <div style={styles.grid}>

                <div style={styles.card}>
                    <div style={styles.value}>
                        {totalCO2.toFixed(2)}
                    </div>

                    <div style={styles.label}>
                        TOTAL CO₂ KG
                    </div>
                </div>

                <div style={styles.card}>
                    <div style={styles.value}>
                        {avgScore}
                    </div>

                    <div style={styles.label}>
                        AVG ECO SCORE
                    </div>
                </div>

                <div style={styles.card}>
                    <div style={styles.value}>
                        {mealsLogged}
                    </div>

                    <div style={styles.label}>
                        MEALS LOGGED
                    </div>
                </div>

                <div style={styles.card}>
                    <div style={styles.value}>
                        {tripsLogged}
                    </div>

                    <div style={styles.label}>
                        TRIPS LOGGED
                    </div>
                </div>

            </div>

            {/* BUDGET */}

            <div style={styles.budgetSection}>

                <div style={styles.budgetHeader}>
                    <span>
                        Weekly CO₂ Budget Used
                    </span>

                    <span>
                        {budgetPercent}%
                    </span>
                </div>

                <div style={styles.progressBg}>
                    <div
                        style={{
                            ...styles.progressFill,
                            width: `${budgetPercent}%`
                        }}
                    />
                </div>

            </div>

            {/* ACTIVITY */}

            <h4 style={styles.activityTitle}>
                RECENT ACTIVITY
            </h4>

            {recentLogs.length === 0 ? (

                <div style={styles.emptyCard}>
                    No activity yet 🌱
                </div>

            ) : (

                recentLogs.map((log, index) => (

                    <div
                        key={index}
                        style={styles.activityCard}
                    >

                        <div>

                            <div style={styles.activityName}>
                                {log.type === "meal"
                                    ? "🍽️"
                                    : "🚗"}{" "}
                                {log.name}
                            </div>

                            <div style={styles.activitySub}>
                                {log.type === "meal"
                                    ? "🍽 Meal"
                                    : "🚙 Trip"}{" "}
                                •{" "}
                                {new Date(
                                    log.timestamp
                                ).toLocaleDateString()}
                            </div>

                        </div>

                        <div
                            style={{
                                color:
                                    Number(log.co2) > 1
                                        ? "#f5a623"
                                        : "#59b95f",
                                fontWeight: 700
                            }}
                        >
                            {Number(
                                log.co2 || 0
                            ).toFixed(2)}
                            kg
                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

/* ================= STYLES ================= */

const styles = {

    page: {
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: 20
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20
    },

    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 12
    },

    card: {
        background: "white",
        borderRadius: 18,
        padding: 20,
        textAlign: "center",
        boxShadow:
            "0 5px 15px rgba(0,0,0,.08)"
    },

    value: {
        fontSize: "clamp(28px, 6vw, 40px)",
        fontWeight: 800,
        color: "#27352b"
    },

    label: {
        fontSize: 11,
        marginTop: 8,
        opacity: 0.6,
        fontWeight: 700
    },

    budgetSection: {
        marginTop: 25
    },

    budgetHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
        fontSize: 14
    },

    progressBg: {
        height: 10,
        borderRadius: 999,
        background: "#ddd"
    },

    progressFill: {
        height: "100%",
        borderRadius: 999,
        background:
            "linear-gradient(90deg,#1b3c20,#4f9c54)"
    },

    activityTitle: {
        marginTop: 25,
        marginBottom: 15
    },

    activityCard: {
        background: "white",
        borderRadius: 14,
        padding: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 10,
        boxShadow:
            "0 5px 15px rgba(0,0,0,.05)"
    },

    activityName: {
        fontWeight: 700
    },

    activitySub: {
        fontSize: 12,
        opacity: 0.6,
        marginTop: 4
    },

    emptyCard: {
        background: "white",
        padding: 20,
        borderRadius: 14,
        textAlign: "center"
    }
};