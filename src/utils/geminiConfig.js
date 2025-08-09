// Gemini AI integration for emotion analysis
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Main function to analyze user text
export const analyzeUserText = async (userText) => {
  if (!userText || userText.trim().length === 0) {
    return {
      emotion: "netral",
      insight:
        "Sepertinya kamu masih mencari kata-kata yang tepat. Take your time! 💙",
    };
  }

  const prompt = `
Kamu adalah seorang AI counselor yang sangat empatis dan supportif. Analisis teks berikut dan klasifikasikan emosinya ke dalam salah satu kategori: cemas, stres, sedih, marah, bingung, atau bahagia.

PENTING: Fokus pada KONTEKS dan MAKNA, bukan hanya kata kunci. Analisis:
- Nada dan mood dalam tulisan
- Situasi yang dideskripsikan
- Perasaan yang tersirat, meski tidak ditulis eksplisit
- Bahasa tubuh yang tercermin dalam kata-kata
- Intensitas emosi

Berikan insight yang:
- Empatis dan supportif (bukan menggurui)
- Menggunakan bahasa yang casual dan relatable
- Maksimal 2 kalimat
- Fokus pada validasi perasaan, bukan solusi
- Hindari memberikan saran medis atau diagnosis
- Responsif terhadap konteks spesifik yang ditulis user

Teks yang akan dianalisis: "${userText}"

Format response dalam JSON yang valid:
{
  "emotion": "nama_emosi",
  "insight": "insight dalam bahasa Indonesia yang empatis dan spesifik"
}

Contoh analisis kontekstual:
- "Gue besok presentasi, deg-degan banget" → cemas (meski tidak ada kata "cemas")
- "Udah 3 hari gak tidur mikirin deadline" → stres (konteks overwhelmed)
- "Kok hidup rasanya hampa gini ya" → sedih (perasaan kosong)
- "Temen gue ngomong gitu, kesel banget" → marah (reaksi terhadap orang)
- "Gatau mau ngapain hidup ini" → bingung (kebingungan eksistensial)
- "Hari ini dapat kabar baik!" → bahagia (konteks positif)

Jangan pernah memberikan diagnosis medis atau menyarankan terapi professional secara eksplisit.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean and parse JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
    const analysis = JSON.parse(cleanedText);

    // Validate the response
    if (!analysis.emotion || !analysis.insight) {
      throw new Error("Invalid response format");
    }

    // Ensure emotion is in valid categories
    const validEmotions = [
      "cemas",
      "stres",
      "sedih",
      "marah",
      "bingung",
      "bahagia",
    ];
    if (!validEmotions.includes(analysis.emotion)) {
      analysis.emotion = "netral";
    }

    return analysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback to keyword-based analysis
    return fallbackAnalysis(userText);
  }
};

// Fallback analysis when Gemini API fails
const fallbackAnalysis = (text) => {
  const lowerText = text.toLowerCase();

  // Keywords for different emotions
  const emotionKeywords = {
    cemas: [
      "cemas",
      "khawatir",
      "takut",
      "nervous",
      "anxiety",
      "was-was",
      "deg-degan",
      "panik",
      "grogi",
      "tegang",
      "worry",
      "afraid",
      "scared",
      "paranoid",
      "gelisah",
      "restless",
      "presentasi",
      "ujian",
      "interview",
      "meeting",
      "deadline",
      "besok",
      "nanti",
      "gimana ya",
      "bagaimana kalau",
      "takut kalau",
      "pusing mikirin",
    ],
    stres: [
      "stres",
      "stress",
      "overwhelmed",
      "capek",
      "lelah",
      "burnout",
      "pressure",
      "beban",
      "deadline",
      "tugas",
      "kerja",
      "kuliah",
      "tuntutan",
      "banyak banget",
      "gak kuat",
      "pusing",
      "overload",
      "exhausted",
      "tired",
      "muak",
      "jenuh",
      "bosan",
      "gak ada waktu",
      "sibuk banget",
      "multitasking",
      "buru-buru",
    ],
    sedih: [
      "sedih",
      "sad",
      "nangis",
      "menangis",
      "broken",
      "hurt",
      "sakit",
      "kecewa",
      "down",
      "galau",
      "lonely",
      "kesepian",
      "heartbreak",
      "putus",
      "ditinggal",
      "kehilangan",
      "hampa",
      "kosong",
      "depress",
      "terpuruk",
      "hancur",
      "patah hati",
      "duka",
      "mellow",
      "melankolis",
      "suram",
      "kelam",
      "nestapa",
    ],
    marah: [
      "marah",
      "angry",
      "kesel",
      "jengkel",
      "benci",
      "hate",
      "furious",
      "annoyed",
      "dongkol",
      "sebel",
      "geram",
      "murka",
      "rage",
      "pissed",
      "emosi",
      "triggered",
      "ilfeel",
      "toxic",
      "nyebelin",
      "menyebalkan",
      "ganggu",
      "irritated",
      "frustasi",
      "frustrated",
      "gemes",
      "pengen nonjok",
    ],
    bingung: [
      "bingung",
      "confused",
      "overthinking",
      "stuck",
      "gak tau",
      "tidak tahu",
      "pusing",
      "dilema",
      "galau",
      "ragu",
      "doubt",
      "uncertain",
      "unclear",
      "mentok",
      "blank",
      "lost",
      "gimana ya",
      "bagaimana",
      "entah",
      "gatau lagi",
      "campur aduk",
      "mixed up",
      "complicated",
      "ribet",
      "mumet",
    ],
    bahagia: [
      "bahagia",
      "happy",
      "senang",
      "excited",
      "grateful",
      "syukur",
      "amazing",
      "wonderful",
      "gembira",
      "riang",
      "ceria",
      "antusias",
      "semangat",
      "optimis",
      "positif",
      "blessed",
      "thankful",
      "appreciate",
      "love",
      "enjoy",
      "fun",
      "awesome",
      "great",
      "fantastic",
      "excellent",
      "perfect",
      "hebat",
      "keren",
    ],
  };

  // Contextual phrases that indicate emotions
  const contextualPhrases = {
    cemas: [
      "gimana nanti",
      "takut kalau",
      "bagaimana kalau",
      "deg-degan",
      "was-was",
    ],
    stres: ["banyak banget", "gak kuat", "overwhelmed", "deadline", "tuntutan"],
    sedih: [
      "rasanya hampa",
      "hati kosong",
      "sedih banget",
      "pengen nangis",
      "broken",
    ],
    marah: [
      "kesel banget",
      "pengen nonjok",
      "toxic banget",
      "menyebalkan",
      "annoying",
    ],
    bingung: ["gak tau lagi", "gimana ya", "dilema banget", "stuck", "mentok"],
    bahagia: ["senang banget", "syukur", "grateful", "amazing day", "perfect"],
  };

  let detectedEmotion = "netral";
  let maxScore = 0;

  // Check for keyword matches with scoring
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    let score = 0;

    // Check individual keywords
    keywords.forEach((keyword) => {
      if (lowerText.includes(keyword)) {
        score += 1;
      }
    });

    // Check contextual phrases (higher weight)
    if (contextualPhrases[emotion]) {
      contextualPhrases[emotion].forEach((phrase) => {
        if (lowerText.includes(phrase)) {
          score += 2; // Higher weight for contextual phrases
        }
      });
    }

    if (score > maxScore) {
      maxScore = score;
      detectedEmotion = emotion;
    }
  }

  // Fallback insights based on detected emotion
  const fallbackInsights = {
    cemas:
      "Sepertinya kamu sedang merasa cemas. That's totally normal, kamu gak sendirian kok! 💙",
    stres:
      "Keliatan kamu lagi overwhelmed ya. Remember, you're doing your best dan itu udah enough. 💪",
    sedih:
      "Hatimu lagi berat ya? It's okay to feel sad, kamu boleh merasakan ini. 🤗",
    marah:
      "Sepertinya ada yang bikin kamu kesal. Your feelings are valid, take a deep breath. 😮‍💨",
    bingung:
      "Pikiranmu lagi rame banget ya? Sometimes it's okay to not have all the answers. 🤔",
    bahagia:
      "I can feel your positive energy from here! Keep shining bright! ✨",
    netral:
      "Terima kasih sudah sharing. Menulis itu salah satu bentuk self-care terbaik lho! 📝",
  };

  return {
    emotion: detectedEmotion,
    insight: fallbackInsights[detectedEmotion],
  };
};

// Function to check if Gemini API is configured
export const isGeminiConfigured = () => {
  return (
    !!import.meta.env.VITE_GEMINI_API_KEY &&
    import.meta.env.VITE_GEMINI_API_KEY !== "your_gemini_api_key_here"
  );
};
