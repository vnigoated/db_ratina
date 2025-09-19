export interface ClassificationResult {
  imageUrl: string;
  fileName: string;
  classification: 'DB' | 'Not DB';
  confidence: number;
  timestamp: Date;
  cnnResults: {
    modelVersion: string;
    processingTime: number;
    imageQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    preprocessingSteps: string[];
  };
  llmExplanation?: {
    interpretation: string;
    medicalContext: string;
    visualFindings: string;
    recommendations: string;
    disclaimers: string;
    generationTime: number;
  };
}

export interface UploadedImage {
  file: File;
  url: string;
  name: string;
}