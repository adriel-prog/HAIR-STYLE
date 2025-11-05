import { GoogleGenAI, Modality } from '@google/genai';
import { fileToBase64 } from '../utils/fileUtils';

// Per coding guidelines, initialize the client directly with the API key from environment variables.
// Assuming the API_KEY is always available in the environment as per requirements.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Define a union type for the content parts to resolve the TypeScript error.
// This allows the `parts` array to contain both image data and text prompts.
type ContentPart = { inlineData: { data: string; mimeType: string; } } | { text: string; };


export const generateHairstyle = async (
  userImageFile: File,
  userPrompt: string,
  referenceImageFile: File
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

    const parts: ContentPart[] = [userImagePart];

    const referenceBase64 = await fileToBase64(referenceImageFile);
    const referenceMimeType = referenceImageFile.type;
      if (!referenceMimeType.startsWith('image/')) {
      throw new Error('Tipo de arquivo de referência inválido. Por favor, envie uma imagem.');
    }
    const referenceImagePart = {
      inlineData: { data: referenceBase64, mimeType: referenceMimeType },
    };
    parts.push(referenceImagePart);
    
    const textPrompt = `Act as a professional photo editor specializing in hairstyles. Your job is to perform a 'virtual hair transplant'.

You are given two images:
- Image 1: The original photo of a person (this is the first image I provided).
- Image 2: A reference photo showing a hairstyle (this is the second image I provided).

Your task is to meticulously edit Image 1. You must replace the hair of the person in Image 1 with the hairstyle from Image 2.

**Crucial Rules:**
- **Change ONLY the hair.**
- The person's face, identity, expression, and skin tone in Image 1 must be perfectly preserved.
- The background, lighting, and clothing in Image 1 must remain untouched.
- The final image must be photorealistic and seamless.
${userPrompt ? `- The user has provided these specific adjustments: "${userPrompt}"` : ''}

Produce ONLY the final edited image as your output.`;

    parts.push({ text: textPrompt });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: parts,
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    // Loop through the response parts to find the generated image data, which is more robust.
    const responseParts = response.candidates?.[0]?.content?.parts;
    if (responseParts) {
      for (const part of responseParts) {
        if (part.inlineData) {
            const generatedBase64 = part.inlineData.data;
            const generatedMimeType = part.inlineData.mimeType;
            return `data:${generatedMimeType};base64,${generatedBase64}`;
        }
      }
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