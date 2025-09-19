import React, { useState, useCallback } from 'react';
import { Upload, Eye, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { ClassificationResult, UploadedImage } from '../types/medical';
import { simulateClassification } from '../services/cnnClassification';
import { generateMedicalExplanation } from '../services/geminiExplanation';

interface ImageUploadProps {
  onClassificationComplete: (result: ClassificationResult) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onClassificationComplete }) => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const validateImage = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPEG or PNG image file.');
      return false;
    }
    
    if (file.size > maxSize) {
      alert('Image file must be less than 10MB.');
      return false;
    }
    
    return true;
  };

  const handleImageUpload = useCallback((file: File) => {
    if (!validateImage(file)) return;

    const url = URL.createObjectURL(file);
    setUploadedImage({
      file,
      url,
      name: file.name
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const processImage = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    
    try {
      // Stage 1: CNN Classification
      setProcessingStage('Preprocessing retinal image...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProcessingStage('Running CNN classification...');
      const cnnResult = await simulateClassification(uploadedImage);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stage 2: LLM Explanation
      setProcessingStage('Generating medical explanation with Gemini AI...');
      const explanation = await generateMedicalExplanation(cnnResult);
      
      const finalResult: ClassificationResult = {
        ...cnnResult,
        llmExplanation: explanation
      };
      
      onClassificationComplete(finalResult);
      
    } catch (error) {
      console.error('Processing error:', error);
      alert('An error occurred during image processing. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStage('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Retinal Image Analysis</h2>
          <p className="text-gray-600">
            Upload a retinal fundus image for diabetic retinopathy detection
          </p>
        </div>

        {!uploadedImage ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                Drag and drop your retinal image here
              </p>
              <p className="text-gray-500">or</p>
              <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                <span>Browse Files</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: JPEG, PNG • Maximum size: 10MB
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative">
              <img
                src={uploadedImage.url}
                alt="Uploaded retinal image"
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
              <div className="absolute top-2 right-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Image Loaded
                </div>
              </div>
            </div>

            {/* Image Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Image Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Filename:</span>
                  <span className="ml-2 font-medium">{uploadedImage.name}</span>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>
                  <span className="ml-2 font-medium">
                    {(uploadedImage.file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setUploadedImage(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Change Image
              </button>
              <button
                onClick={processImage}
                disabled={isProcessing}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span>Analyze Image</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Processing Status */}
      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
            <div>
              <h3 className="font-medium text-blue-900">Processing Image</h3>
              <p className="text-blue-700 text-sm">{processingStage}</p>
            </div>
          </div>
          <div className="mt-4 bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-900 mb-2">Image Quality Guidelines</h3>
            <ul className="text-amber-800 text-sm space-y-1">
              <li>• Use high-resolution retinal fundus photographs</li>
              <li>• Ensure the optic disc and macula are clearly visible</li>
              <li>• Avoid images with excessive blur or poor lighting</li>
              <li>• Remove any patient identifying information before upload</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;