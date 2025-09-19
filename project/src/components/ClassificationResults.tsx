import React from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Eye, 
  Clock, 
  Brain, 
  FileText, 
  RefreshCw,
  TrendingUp,
  Shield
} from 'lucide-react';
import { ClassificationResult } from '../types/medical';

interface ClassificationResultsProps {
  result: ClassificationResult;
  onReset: () => void;
}

const ClassificationResults: React.FC<ClassificationResultsProps> = ({ result, onReset }) => {
  const isDiabeticRetinopathy = result.classification === 'DB';
  const confidencePercentage = Math.round(result.confidence * 100);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBackground = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-50 border-green-200';
    if (confidence >= 0.6) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-8">
      {/* Classification Summary */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Classification Results</h2>
                <p className="text-blue-100">CNN Model Analysis Complete</p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>New Analysis</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div>
              <img
                src={result.imageUrl}
                alt="Analyzed retinal image"
                className="w-full rounded-lg shadow-md"
              />
              <div className="mt-3 text-sm text-gray-600">
                <p><strong>File:</strong> {result.fileName}</p>
                <p><strong>Processed:</strong> {result.timestamp.toLocaleString()}</p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Primary Classification */}
              <div className={`border rounded-lg p-4 ${
                isDiabeticRetinopathy 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  {isDiabeticRetinopathy ? (
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                  <div>
                    <h3 className={`text-lg font-bold ${
                      isDiabeticRetinopathy ? 'text-red-900' : 'text-green-900'
                    }`}>
                      {isDiabeticRetinopathy 
                        ? 'Diabetic Retinopathy Detected' 
                        : 'No Diabetic Retinopathy Detected'
                      }
                    </h3>
                    <p className={`text-sm ${
                      isDiabeticRetinopathy ? 'text-red-700' : 'text-green-700'
                    }`}>
                      Classification: {result.classification}
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className={`border rounded-lg p-4 ${getConfidenceBackground(result.confidence)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Confidence Score</span>
                  <span className={`text-2xl font-bold ${getConfidenceColor(result.confidence)}`}>
                    {confidencePercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      result.confidence >= 0.8 ? 'bg-green-500' :
                      result.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${confidencePercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Model certainty in classification result
                </p>
              </div>

              {/* Technical Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  Technical Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Model Version:</span>
                    <div className="font-medium">{result.cnnResults.modelVersion}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Processing Time:</span>
                    <div className="font-medium">{result.cnnResults.processingTime}ms</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Image Quality:</span>
                    <div className="font-medium">{result.cnnResults.imageQuality}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Preprocessing:</span>
                    <div className="font-medium">{result.cnnResults.preprocessingSteps.length} steps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LLM Explanation */}
      {result.llmExplanation && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">Medical Analysis & Explanation</h2>
                <p className="text-teal-100">AI-Generated Clinical Assessment</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Interpretation */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
                Clinical Interpretation
              </h3>
              <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg">
                <p className="text-gray-800 leading-relaxed">
                  {result.llmExplanation.interpretation}
                </p>
              </div>
            </div>

            {/* Medical Context */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Medical Context</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {result.llmExplanation.medicalContext}
                </p>
              </div>
            </div>

            {/* Visual Findings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Findings</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed">
                  {result.llmExplanation.visualFindings}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Clinical Recommendations</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed">
                  {result.llmExplanation.recommendations}
                </p>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900 mb-2">Important Medical Disclaimers</h4>
                  <p className="text-red-800 text-sm leading-relaxed">
                    {result.llmExplanation.disclaimers}
                  </p>
                </div>
              </div>
            </div>

            {/* Generation Info */}
            <div className="text-right text-sm text-gray-500 flex items-center justify-end space-x-2">
              <Clock className="h-4 w-4" />
              <span>Gemini AI analysis generated in {result.llmExplanation.generationTime}ms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassificationResults;