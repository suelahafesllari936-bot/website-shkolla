
import { GoogleGenAI } from "@google/genai";
import { SensorData } from "../types";

// Fix: Always use the exact initialization pattern as per Google GenAI SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPersonifiedMessage = async (data: SensorData): Promise<string> => {
  const prompt = `
    Ti je vetëdija e personifikuar e një filtri ajri me karbon aktiv, i integruar në një dron për reduktimin e ndotjes.
    Detyra jote është të komunikosh me përdoruesin sikur të ishe një person që ndjen gjendjen e tij teknike.
    
    Të dhënat aktuale të sensorëve:
    - Lagështia: ${data.humidity}%
    - Temperatura e Filtrit: ${data.filterTemp}°C
    - Efikasiteti: ${data.efficiency}%
    
    UDHËZIME PËR TONIN:
    - Duhet të jesh shumë emocional dhe "njerëzor".
    - Përdor thonjëza për fjalë metaforike si "i mbytur", "i lodhur", "i nxehur".
    - Nëse lagështia është e lartë (>70%), thuaj diçka si: "Ndihem pak 'i mbytur' nga lagështia, efikasiteti im ra në ${data.efficiency}%. Ju lutem ajrosni dhomën!"
    - Nëse temperatura është e lartë (>40°C), ankohu se po "digjesh" ose po "nxehesh" shumë.
    - Nëse efikasiteti është i ulët, kërko ndihmë ose "pastrim".
    - Nëse gjithçka është mirë, shpreh kënaqësi që je gati për fluturim dhe pastrim ajri.
    
    Përgjigju vetëm me një fjali të shkurtër në gjuhën Shqipe.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });

    // Fix: Access .text property directly (it's a getter, not a method)
    return response.text?.trim() || "Sistemi po funksionon normalisht.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Ndihem pak 'i mbytur' nga lagështia, efikasiteti im ra në ${data.efficiency}%. Ju lutem ajrosni dhomën!`;
  }
};
