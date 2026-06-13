let listeners = [];

export const ecoState = {
    score: 50,
    streak: 0,
    mood: "neutral",
    badge: "Starter Saver",
};

export const setEcoState = (update) => {
    Object.assign(ecoState, update);
    listeners.forEach((l) => l(ecoState));
};

export const subscribeEco = (cb) => {
    listeners.push(cb);
    return () => (listeners = listeners.filter((l) => l !== cb));
};