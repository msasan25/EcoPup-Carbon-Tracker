require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
    const { type, itemName } = req.body || {};
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

            const text = response.text;

            const parsed = JSON.parse(text);

            return res.json({
                ...parsed,
                ecoRating:
                    parsed.scoreImpact > 80 ? "A" :
                        parsed.scoreImpact > 60 ? "B" :
                            parsed.scoreImpact > 40 ? "C" :
                                "D"
            });

        } catch (err) {

            console.log("Gemini failed, using fallback");

        }
    }
    
      
});
app.get("/", (req, res) => {
    res.send("EcoPup Backend Running 🚀");
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});