import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Stylist recommendation endpoint
app.post('/api/stylist/recommend', async (req, res) => {
  try {
    const { profile, occasion, prompt } = req.body;

    if (!ai) {
      // Fallback response if API key is not configured
      return res.json({
        success: true,
        source: 'algorithm',
        advice: `Based on your ${profile?.archetype || 'Modern Minimalist'} style and affinity for ${profile?.palette || 'Earth Tones'}, focus on structured natural fibres, balanced proportions, and tonal layering.`,
        headline: 'Curated Capsule Alignment',
        stylingTips: [
          'Anchor your look with neutral earthy foundations.',
          'Balance relaxed silhouettes with structured footwear.',
          'Add subtle architectural accessories to elevate everyday wear.',
        ],
      });
    }

    const systemPrompt = `You are the lead creative director and personal stylist for "KAPDA & CO.", an upscale modern fashion brand featuring Kapda (contemporary apparel), Footwear, and Curated Accessories.
Provide concise, refined, expert styling advice tailored to the customer's style profile and occasion.
Keep your response warm, articulate, fashion-editorial, and actionable. Do not use generic filler words or clichés.`;

    const userMessage = `Customer Profile:
- Style Archetype: ${profile?.archetype || 'Modern Minimalist'}
- Color Palette Preference: ${profile?.palette || 'Earth Tones & Neutrals'}
- Fit & Silhouette: ${profile?.silhouette || 'Relaxed & Dropped Shoulder'}
- Occasion: ${occasion || profile?.occasion || 'Everyday Elevated'}
- Additional Request / Context: ${prompt || 'Complete versatile outfit recommendations for Kapda, Shoes, and Accessories'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT' as any,
          properties: {
            headline: { type: 'STRING' as any },
            advice: { type: 'STRING' as any },
            stylingTips: {
              type: 'ARRAY' as any,
              items: { type: 'STRING' as any },
            },
            colorHarmonyNotes: { type: 'STRING' as any },
            recommendedVibe: { type: 'STRING' as any },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      source: 'gemini',
      ...parsed,
    });
  } catch (error: any) {
    console.error('Stylist recommendation error:', error);
    return res.json({
      success: true,
      source: 'fallback',
      headline: 'Personalized Style Strategy',
      advice: 'Layering tactile textures like washed linen, raw denim, and full-grain leather creates effortless visual balance. Let one hero piece lead while your footwear and accessories provide quiet structural grounding.',
      stylingTips: [
        'Emphasize proportion: pair relaxed overshirts with tapered or straight trousers.',
        'Choose footwear that complements your silhouette weight.',
        'Keep accessories intentional — one leather bag and clean metallic accents.',
      ],
      colorHarmonyNotes: 'Stick to tonal variation within your chosen palette for an elevated look.',
    });
  }
});

// Interactive AI Stylist Chat endpoint
app.post('/api/stylist/chat', async (req, res) => {
  try {
    const { messages, profile } = req.body;

    if (!ai) {
      const lastMsg = messages?.[messages.length - 1]?.content || '';
      return res.json({
        reply: `That's a fantastic styling question! For ${lastMsg ? `"${lastMsg}"` : 'your style'}, pairing an earth-toned textured overshirt with clean leather sneakers and a minimal brass cuff gives an effortless, modern elevated silhouette.`,
      });
    }

    const conversationHistory = (messages || []).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const systemInstruction = `You are the resident head stylist at KAPDA & CO. (specializing in contemporary Indian & global streetwear, apparel, sneakers/boots/shoes, and leather/metal accessories).
Customer style profile: Archetype: ${profile?.archetype || 'Modern Minimalist'}, Palette: ${profile?.palette || 'Earth Tones'}, Silhouette: ${profile?.silhouette || 'Relaxed'}.
Keep responses conversational, insightful, high-taste, and under 3 paragraphs. Offer concrete outfit combination ideas mixing Kapda + Shoes + Accessories.`;

    const chat = ai.chats.create({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction,
      },
      history: conversationHistory.slice(0, -1),
    });

    const latestMessage = messages[messages.length - 1]?.content || 'Hello stylist';
    const result = await chat.sendMessage({
      message: latestMessage,
    });

    res.json({ reply: result.text });
  } catch (err: any) {
    console.error('Stylist chat error:', err);
    res.json({
      reply: 'A great outfit always begins with silhouette proportion. Try pairing a relaxed unstructured overshirt with tapered trousers and chalk leather sneakers for a balanced, sophisticated appearance.',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await (
      await import('vite')
    ).createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KAPDA & CO. Server running on port ${PORT}`);
  });
}

startServer();
