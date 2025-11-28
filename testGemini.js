const { generateFlashcards } = require('./src/services/geminiService');

async function test() {
    const text = "Photosynthesis is the process used by plants, algae and certain bacteria to harness energy from sunlight and turn it into chemical energy.";

    console.log("Testing generateFlashcards with text:", text);

    try {
        if (!process.env.GOOGLE_API_KEY) {
            console.warn("WARNING: GOOGLE_API_KEY is not set. The request will likely fail.");
        }

        const flashcards = await generateFlashcards(text);
        console.log("Result:", JSON.stringify(flashcards, null, 2));
    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

test();
