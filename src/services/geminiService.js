const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
// Ensure you have GOOGLE_API_KEY set in your environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/**
 * Generates flashcards from the provided text using Google Gemini.
 * @param {string} text - The source text to generate flashcards from.
 * @returns {Promise<Array<{front: string, back: string, difficulty: string}>>} - A promise that resolves to an array of flashcard objects.
 */
async function generateFlashcards(text) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Extract 5 facts and return strictly as a JSON array: [{front: 'Question', back: 'Answer', difficulty: ''}].
    
    Text to process:
    ${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean up the response to ensure it's valid JSON
        // Sometimes models wrap JSON in markdown code blocks
        const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const flashcards = JSON.parse(jsonString);

            if (!Array.isArray(flashcards)) {
                throw new Error("Response is not an array");
            }

            return flashcards;
        } catch (parseError) {
            console.error("Failed to parse JSON response:", textResponse);
            throw new Error("Failed to parse AI response as JSON");
        }
    } catch (error) {
        console.error("Error generating flashcards:", error);
        throw error;
    }
}

module.exports = { generateFlashcards };
