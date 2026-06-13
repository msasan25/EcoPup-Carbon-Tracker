export function addEcoLog(log) {

    try {

        const existing =
            JSON.parse(
                localStorage.getItem("eco_logs")
            ) || [];

        const newLog = {
            id: Date.now().toString(),
            ...log,
            timestamp: Date.now()
        };

        existing.push(newLog);

        localStorage.setItem(
            "eco_logs",
            JSON.stringify(existing)
        );

    } catch (err) {

        console.error(
            "Failed to save log",
            err
        );

    }
}

export function getLogs() {

    try {

        return JSON.parse(
            localStorage.getItem("eco_logs")
        ) || [];

    } catch {

        return [];

    }
}

export function clearLogs() {
    localStorage.removeItem("eco_logs");
}