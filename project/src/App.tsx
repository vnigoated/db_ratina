import React, { useState } from 'react';
import { Eye, Upload, Brain, AlertTriangle, FileText, Shield } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import ClassificationResults from './components/ClassificationResults';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import SystemArchitecture from './components/SystemArchitecture';
import { ClassificationResult } from './types/medical';

function App() {
  const [currentView, setCurrentView] = useState<'upload' | 'results' | 'architecture' | 'disclaimer'>('upload');
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);

  const handleClassificationComplete = (result: ClassificationResult) => {
    setClassificationResult(result);
    setCurrentView('results');
  };

  const resetToUpload = () => {
    setClassificationResult(null);
    setCurrentView('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RetinalAI Pro</h1>
                <p className="text-sm text-gray-600">Diabetic Retinopathy Detection System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('architecture')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'architecture' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Brain className="h-4 w-4" />
                <span>Architecture</span>
              </button>
              <button
                onClick={() => setCurrentView('disclaimer')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'disclaimer' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield className="h-4 w-4" />
                <span>Medical Ethics</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setCurrentView('upload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                currentView === 'upload'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Image Analysis</span>
              </div>
            </button>
            <button
              onClick={() => setCurrentView('results')}
              disabled={!classificationResult}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                currentView === 'results' && classificationResult
                  ? 'border-blue-600 text-blue-600'
                  : classificationResult
                  ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  : 'border-transparent text-gray-300 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Results</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Medical Warning Banner */}
        <div className="mb-8 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm text-orange-800">
                <strong>Medical Disclaimer:</strong> This system is for educational and demonstration purposes only. 
                All results are simulated and should not be used for actual medical diagnosis. 
                Always consult qualified healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Content based on current view */}
        {currentView === 'upload' && (
          <ImageUpload onClassificationComplete={handleClassificationComplete} />
        )}
        
        {currentView === 'results' && classificationResult && (
          <ClassificationResults 
            result={classificationResult} 
            onReset={resetToUpload}
          />
        )}
        
        {currentView === 'architecture' && <SystemArchitecture />}
        
       
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">RetinalAI Pro</h3>
              <p className="text-gray-300 text-sm">
                Advanced AI system for diabetic retinopathy detection and analysis.
                Built with medical-grade standards and ethical AI principles.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">System Features</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• CNN-based image classification</li>
                <li>• AI-powered medical explanations</li>
                <li>• Confidence scoring and uncertainty</li>
                <li>• Clinical recommendations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Compliance</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Medical AI safety standards</li>
                <li>• HIPAA compliance ready</li>
                <li>• Ethical AI guidelines</li>
                <li>• Professional medical disclaimers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
            © 2025 RetinalAI Pro. Educational demonstration system. Not for clinical use.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;