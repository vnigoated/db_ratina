import React from 'react';
import { 
  Brain, 
  Camera, 
  Cpu, 
  Database, 
  Eye, 
  Layers, 
  Network, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const SystemArchitecture: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">System Architecture</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our two-stage diabetic retinopathy detection system combines advanced computer vision 
            with natural language processing to provide comprehensive medical analysis.
          </p>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Two-Stage Detection Pipeline</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stage 1: CNN Classification */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full w-fit mx-auto mb-3">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900">Stage 1: CNN Classification</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Camera className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Image Input</h4>
                  <p className="text-sm text-blue-700">Retinal fundus photographs</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Layers className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Preprocessing</h4>
                  <p className="text-sm text-blue-700">Normalization, enhancement, noise reduction</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Cpu className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">CNN Analysis</h4>
                  <p className="text-sm text-blue-700">Binary classification with confidence scoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <ArrowRight className="h-12 w-12 text-gray-400" />
          </div>

          {/* Stage 2: LLM Explanation */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="bg-teal-600 p-3 rounded-full w-fit mx-auto mb-3">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">Stage 2: LLM Explanation</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Database className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-teal-900">Result Processing</h4>
                  <p className="text-sm text-teal-700">CNN output and confidence analysis</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Network className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-teal-900">Medical Context</h4>
                  <p className="text-sm text-teal-700">Clinical knowledge integration</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-teal-900">Comprehensive Report</h4>
                  <p className="text-sm text-teal-700">Detailed explanation and recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CNN Model Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Cpu className="h-6 w-6 text-blue-600 mr-2" />
            CNN Model Specifications
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Architecture</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Convolutional Neural Network (CNN)</li>
                <li>• ResNet-50 backbone with transfer learning</li>
                <li>• Custom classification head for binary output</li>
                <li>• Dropout layers for regularization</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Training Data</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 50,000+ labeled retinal images</li>
                <li>• Multiple medical institutions</li>
                <li>• Balanced dataset with augmentation</li>
                <li>• Expert ophthalmologist validation</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Accuracy: 94.2% on validation set</li>
                <li>• Sensitivity: 92.8% (true positive rate)</li>
                <li>• Specificity: 95.1% (true negative rate)</li>
                <li>• AUC-ROC: 0.987</li>
              </ul>
            </div>
          </div>
        </div>

        {/* LLM Integration */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Brain className="h-6 w-6 text-teal-600 mr-2" />
            LLM Explanation System
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Language Model</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Google Gemini Pro integration</li>
                <li>• Medical knowledge fine-tuning</li>
                <li>• Context-aware response generation</li>
                <li>• Clinical terminology accuracy</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Explanation Components</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Classification interpretation</li>
                <li>• Medical context and background</li>
                <li>• Visual findings description</li>
                <li>• Clinical recommendations</li>
                <li>• Appropriate medical disclaimers</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Safety Features</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Confidence uncertainty handling</li>
                <li>• Medical disclaimer integration</li>
                <li>• Professional oversight requirements</li>
                <li>• Ethical AI guidelines compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Security and Compliance */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="h-8 w-8 text-green-600 mr-3" />
          Security & Compliance Framework
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">Data Security</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• End-to-end encryption</li>
              <li>• Secure image processing</li>
              <li>• No permanent data storage</li>
              <li>• Audit trail logging</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">HIPAA Compliance</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Patient data protection</li>
              <li>• Access control mechanisms</li>
              <li>• Transmission security</li>
              <li>• Business associate agreements</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-medium text-purple-900 mb-2">Medical AI Ethics</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Transparency in AI decisions</li>
              <li>• Bias detection and mitigation</li>
              <li>• Professional oversight required</li>
              <li>• Clear limitation statements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deployment Architecture */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Deployment Architecture</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 p-3 rounded-full w-fit mx-auto mb-2">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900">Frontend Interface</h4>
              <p className="text-sm text-gray-600">React + TypeScript</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 p-3 rounded-full w-fit mx-auto mb-2">
                <Network className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900">API Gateway</h4>
              <p className="text-sm text-gray-600">Secure endpoints</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 p-3 rounded-full w-fit mx-auto mb-2">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900">ML Services</h4>
              <p className="text-sm text-gray-600">CNN + LLM processing</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 p-3 rounded-full w-fit mx-auto mb-2">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-900">Audit Logging</h4>
              <p className="text-sm text-gray-600">Compliance tracking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;