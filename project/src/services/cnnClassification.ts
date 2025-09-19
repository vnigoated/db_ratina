import { ClassificationResult, UploadedImage } from '../types/medical';

// Simulates CNN classification process
export const simulateClassification = async (image: UploadedImage): Promise<Omit<ClassificationResult, 'llmExplanation'>> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock classification logic - in reality this would be a trained CNN model
  const mockClassifications = [
    {
      classification: 'DB' as const,
      confidence: 0.87,
      reasoning: 'Detected microaneurysms and hard exudates'
    },
    {
      classification: 'DB' as const,
      confidence: 0.92,
      reasoning: 'Multiple hemorrhages and cotton wool spots visible'
    },
    {
      classification: 'Not DB' as const,
      confidence: 0.94,
      reasoning: 'Normal retinal appearance, no pathological features'
    },
    {
      classification: 'Not DB' as const,
      confidence: 0.76,
      reasoning: 'Some artifacts present but no diabetic changes'
    },
    {
      classification: 'DB' as const,
      confidence: 0.68,
      reasoning: 'Possible early signs, requires further evaluation'
    }
  ];

  // Randomly select a classification for demo purposes
  const selectedResult = mockClassifications[Math.floor(Math.random() * mockClassifications.length)];

  return {
    imageUrl: image.url,
    fileName: image.name,
    classification: selectedResult.classification,
    confidence: selectedResult.confidence,
    timestamp: new Date(),
    cnnResults: {
      modelVersion: 'RetinalNet-v2.1.3',
      processingTime: Math.floor(Math.random() * 2000) + 500,
      imageQuality: determineImageQuality(),
      preprocessingSteps: [
        'Image normalization',
        'Contrast enhancement',
        'Noise reduction',
        'Region of interest detection',
        'Feature extraction'
      ]
    }
  };
};

const determineImageQuality = (): 'Excellent' | 'Good' | 'Fair' | 'Poor' => {
  const qualities: ('Excellent' | 'Good' | 'Fair' | 'Poor')[] = ['Excellent', 'Good', 'Fair', 'Poor'];
  const weights = [0.4, 0.35, 0.2, 0.05]; // Weighted towards better quality
  
  const random = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < qualities.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return qualities[i];
    }
  }
  
  return 'Good';
};