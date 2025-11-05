
import { GoogleGenAI, Modality } from '@google/genai';
import { fileToBase64 } from '../utils/fileUtils';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn("API_KEY environment variable not set. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateHairstyle = async (
  userImageFile: File,
  hairstylePrompt: string,
  userPrompt: string
): Promise<string> => {
  try {
    const userBase64 = await fileToBase64(userImageFile);
    
    const userMimeType = userImageFile.type;

    if (!userMimeType.startsWith('image/')) {
        throw new Error('Tipo de arquivo inválido. Por favor, envie uma imagem.');
    }

    const userImagePart = {
      inlineData: { data: userBase64, mimeType: userMimeType },
    };

    const textPart = {
      text: `You are an expert virtual hair stylist. Your task is to apply a new hairstyle to the person in the user's photo.
- The user's face, identity, clothes, and the background must remain completely unchanged. Only the hair should be modified.
- The desired hairstyle is: "${hairstylePrompt}".
- The result must be a photorealistic image that seamlessly blends the new hairstyle.
- The output must be ONLY the edited image, with no text or other artifacts.
${userPrompt ? `Additional user instructions to consider: "${userPrompt}"` : ''}`
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [userImagePart, textPart],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const firstPart = response.candidates?.[0]?.content?.parts?.[0];
    if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
        const generatedBase64 = firstPart.inlineData.data;
        const generatedMimeType = firstPart.inlineData.mimeType;
        return `data:${generatedMimeType};base64,${generatedBase64}`;
    }

    throw new Error('Nenhuma imagem foi gerada pela IA. Tente novamente.');

  } catch (error) {
    console.error('Error generating hairstyle:', error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error('A chave de API configurada não é válida. Verifique sua configuração.');
    }
    throw new Error('Falha ao gerar o novo penteado. A IA pode estar ocupada ou o comando não pôde ser processado.');
  }
};
