require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: {
        error: "Too many requests. Please try again later."
    }
});
app.use(compression());

app.use(limiter);

app.post("/analyze", async (req, res) => {
    const { type, itemName } = req.body || {};
    if (
        !itemName ||
        typeof itemName !== "string" ||
        itemName.trim().length === 0 ||
        itemName.length > 500
    ) {
        return res.status(400).json({
            error: "Invalid input"
        });
    }
    if (type === "meal") {

        try {

            const prompt = `
Analyze this meal: ${itemName}

Return ONLY valid JSON:

{
  "scoreImpact": number,
  "carbonFootprint": number,
  "recommendation": "string",
  "alternative": "string",
  "message": "string"
}

Rules:
- scoreImpact must be 0-100
- carbonFootprint in kg CO2
- recommendation max 1 sentence
- alternative max 1 sentence
- no markdown
`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

          

            let text = response.text;

            text = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const parsed = JSON.parse(text);

            return res.json(parsed);

            return res.json({
                ...parsed,
                ecoRating:
                    parsed.scoreImpact > 80 ? "A" :
                        parsed.scoreImpact > 60 ? "B" :
                            parsed.scoreImpact > 40 ? "C" :
                                "D"
            });

        } catch (err) {

          

                console.error("GEMINI ERROR:", err.message);

            }

        
    }
    
      
});
app.get("/", (req, res) => {
    res.send("EcoPup Backend Running 🚀");
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});