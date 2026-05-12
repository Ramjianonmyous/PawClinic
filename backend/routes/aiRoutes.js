const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Gemini
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are an AI assistant for the PawClinic. You help users book appointments and take feedback. If the user wants to book an appointment, ask for their name, service, and date. If they provide it, confirm you can book it. If they have an issue, tell them you will raise a ticket."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ response: text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Failed to generate response from AI' });
  }
});

module.exports = router;
