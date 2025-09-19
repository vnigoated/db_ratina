import { GoogleGenerativeAI } from '@google/generative-ai';
import { ClassificationResult } from '../types/medical';

interface LLMExplanation {
  interpretation: string;
  medicalContext: string;
  visualFindings: string;
  recommendations: string;
  disclaimers: string;
  generationTime: number;
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateMedicalExplanation = async (
  cnnResult: Omit<ClassificationResult, 'llmExplanation'>
): Promise<LLMExplanation> => {
  const startTime = Date.now();
  
  try {
    const isDiabeticRetinopathy = cnnResult.classification === 'DB';
    const confidence = cnnResult.confidence;
    const confidenceLevel = confidence >= 0.8 ? 'high' : confidence >= 0.6 ? 'moderate' : 'low';
    const imageQuality = cnnResult.cnnResults.imageQuality;
    
    const prompt = `
You are a medical AI assistant specializing in ophthalmology and diabetic retinopathy. A CNN model has analyzed a retinal fundus image with the following results:

Classification: ${cnnResult.classification} (${isDiabeticRetinopathy ? 'Diabetic Retinopathy Detected' : 'No Diabetic Retinopathy Detected'})
Confidence Score: ${Math.round(confidence * 100)}% (${confidenceLevel} confidence)
Image Quality: ${imageQuality}
Processing Time: ${cnnResult.cnnResults.processingTime}ms
Model Version: ${cnnResult.cnnResults.modelVersion}

Please provide a comprehensive medical explanation structured in exactly 5 sections:

1. INTERPRETATION: Explain what this classification result means in clinical terms, including the confidence level and its significance.

2. MEDICAL_CONTEXT: Provide background information about diabetic retinopathy, its stages, causes, and importance in diabetes management.

3. VISUAL_FINDINGS: Describe what visual features would typically be present or absent in this type of classification, considering the confidence level.

4. RECOMMENDATIONS: Provide appropriate clinical recommendations for next steps, monitoring, and when to seek professional care.

5. DISCLAIMERS: Include important medical disclaimers about AI limitations, the need for professional evaluation, and that this is not a substitute for medical diagnosis.

Keep each section focused, medically accurate, and appropriate for both healthcare professionals and educated patients. Use clear, professional medical language while remaining accessible.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the structured response
    const sections = parseGeminiResponse(text);
    
    return {
      interpretation: sections.interpretation || generateFallbackInterpretation(cnnResult),
      medicalContext: sections.medicalContext || generateFallbackMedicalContext(),
      visualFindings: sections.visualFindings || generateFallbackVisualFindings(cnnResult),
      recommendations: sections.recommendations || generateFallbackRecommendations(cnnResult),
      disclaimers: sections.disclaimers || generateFallbackDisclaimers(),
      generationTime: Date.now() - startTime
    };
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Fallback to mock responses if API fails
    return generateFallbackExplanation(cnnResult, Date.now() - startTime);
  }
};

function parseGeminiResponse(text: string): Partial<LLMExplanation> {
  const sections: Partial<LLMExplanation> = {};
  
  try {
    // Extract sections using regex patterns
    const interpretationMatch = text.match(/(?:1\.|INTERPRETATION:?)(.*?)(?=(?:2\.|MEDICAL_CONTEXT:|$))/s);
    const medicalContextMatch = text.match(/(?:2\.|MEDICAL_CONTEXT:?)(.*?)(?=(?:3\.|VISUAL_FINDINGS:|$))/s);
    const visualFindingsMatch = text.match(/(?:3\.|VISUAL_FINDINGS:?)(.*?)(?=(?:4\.|RECOMMENDATIONS:|$))/s);
    const recommendationsMatch = text.match(/(?:4\.|RECOMMENDATIONS:?)(.*?)(?=(?:5\.|DISCLAIMERS:|$))/s);
    const disclaimersMatch = text.match(/(?:5\.|DISCLAIMERS:?)(.*?)$/s);
    
    if (interpretationMatch) sections.interpretation = interpretationMatch[1].trim();
    if (medicalContextMatch) sections.medicalContext = medicalContextMatch[1].trim();
    if (visualFindingsMatch) sections.visualFindings = visualFindingsMatch[1].trim();
    if (recommendationsMatch) sections.recommendations = recommendationsMatch[1].trim();
    if (disclaimersMatch) sections.disclaimers = disclaimersMatch[1].trim();
    
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
  }
  
  return sections;
}

function generateFallbackExplanation(
  cnnResult: Omit<ClassificationResult, 'llmExplanation'>,
  generationTime: number
): LLMExplanation {
  const isDiabeticRetinopathy = cnnResult.classification === 'DB';
  const confidence = cnnResult.confidence;
  const confidenceLevel = confidence >= 0.8 ? 'high' : confidence >= 0.6 ? 'moderate' : 'low';

  if (isDiabeticRetinopathy) {
    return {
      interpretation: `The AI analysis indicates the presence of diabetic retinopathy with ${confidenceLevel} confidence (${Math.round(confidence * 100)}%). This suggests that changes consistent with diabetic eye disease have been detected in the retinal image.`,
      
      medicalContext: `Diabetic retinopathy is a serious complication of diabetes that affects the blood vessels in the retina. It occurs when high blood sugar levels damage the tiny blood vessels in the retina, leading to bleeding, swelling, and the formation of new, abnormal blood vessels. Early stages may show microaneurysms and small hemorrhages, while advanced stages can include proliferative changes with neovascularization.`,
      
      visualFindings: confidence >= 0.8 
        ? `The analysis detected clear signs of diabetic retinopathy including microaneurysms, hemorrhages, and/or hard exudates. These findings are characteristic of diabetic vascular changes in the retina and indicate active disease progression.`
        : `The analysis detected possible signs suggestive of diabetic retinopathy, though some findings may be subtle or require confirmation. Features that may indicate early diabetic changes include potential microaneurysms or other vascular abnormalities.`,
      
      recommendations: `Immediate ophthalmologic evaluation is recommended. The patient should be referred to a retinal specialist for comprehensive examination, including dilated fundoscopy and possibly fluorescein angiography. Treatment options may include laser photocoagulation or anti-VEGF injections depending on severity.`,
      
      disclaimers: `This AI analysis is for screening purposes only and cannot replace professional medical diagnosis. False positives and negatives are possible. The presence or absence of diabetic retinopathy must be confirmed by a qualified ophthalmologist through comprehensive clinical examination.`,
      
      generationTime
    };
  } else {
    return {
      interpretation: `The AI analysis suggests no signs of diabetic retinopathy with ${confidenceLevel} confidence (${Math.round(confidence * 100)}%). The retinal image appears to show normal findings without obvious diabetic changes.`,
      
      medicalContext: `A normal retinal examination in diabetic patients is encouraging but does not eliminate the need for continued surveillance. Diabetic retinopathy can develop gradually and may not be visible in early stages. Regular screening remains crucial for early detection and prevention of vision-threatening complications.`,
      
      visualFindings: confidence >= 0.8
        ? `The retinal image shows normal appearance of blood vessels, optic disc, and macula without obvious signs of diabetic retinopathy such as microaneurysms, hemorrhages, exudates, or neovascularization.`
        : `While no clear signs of diabetic retinopathy were detected, image quality or subtle changes may limit the analysis. Some normal variations may be present, but no definitive diabetic changes are apparent.`,
      
      recommendations: `Continue regular diabetic eye screening as recommended by your healthcare provider, typically annually for diabetic patients. Maintain optimal blood sugar control, blood pressure management, and cholesterol levels. Even with normal findings, ongoing monitoring is essential.`,
      
      disclaimers: `A normal AI screening result does not guarantee the absence of diabetic retinopathy or other eye conditions. Regular professional eye examinations remain necessary for comprehensive evaluation. This screening tool cannot detect all forms of diabetic eye disease.`,
      
      generationTime
    };
  }
}

function generateFallbackInterpretation(cnnResult: Omit<ClassificationResult, 'llmExplanation'>): string {
  const isDiabeticRetinopathy = cnnResult.classification === 'DB';
  const confidence = cnnResult.confidence;
  const confidenceLevel = confidence >= 0.8 ? 'high' : confidence >= 0.6 ? 'moderate' : 'low';
  
  return isDiabeticRetinopathy 
    ? `The AI analysis indicates the presence of diabetic retinopathy with ${confidenceLevel} confidence (${Math.round(confidence * 100)}%).`
    : `The AI analysis suggests no signs of diabetic retinopathy with ${confidenceLevel} confidence (${Math.round(confidence * 100)}%).`;
}

function generateFallbackMedicalContext(): string {
  return `Diabetic retinopathy is a serious complication of diabetes that affects the blood vessels in the retina. It is one of the leading causes of blindness in working-age adults and requires regular monitoring and treatment.`;
}

function generateFallbackVisualFindings(cnnResult: Omit<ClassificationResult, 'llmExplanation'>): string {
  const isDiabeticRetinopathy = cnnResult.classification === 'DB';
  return isDiabeticRetinopathy 
    ? `The analysis detected signs consistent with diabetic retinopathy that require medical evaluation.`
    : `The retinal image appears to show normal findings without obvious diabetic changes.`;
}

function generateFallbackRecommendations(cnnResult: Omit<ClassificationResult, 'llmExplanation'>): string {
  const isDiabeticRetinopathy = cnnResult.classification === 'DB';
  return isDiabeticRetinopathy 
    ? `Immediate ophthalmologic evaluation is recommended for comprehensive examination and potential treatment.`
    : `Continue regular diabetic eye screening and maintain optimal blood sugar control.`;
}

function generateFallbackDisclaimers(): string {
  return `This AI analysis is for screening purposes only and cannot replace professional medical diagnosis. Always consult qualified healthcare professionals for medical advice.`;
}