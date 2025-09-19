import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  Users, 
  Lock, 
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <Shield className="h-16 w-16 text-orange-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Medical Ethics & Compliance</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our diabetic retinopathy detection system is built with the highest standards of medical AI ethics, 
            patient safety, and regulatory compliance in mind.
          </p>
        </div>
      </div>

      {/* Critical Disclaimers */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="h-8 w-8 text-red-600 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-red-900 mb-4">Critical Medical Disclaimers</h2>
            
            <div className="space-y-4 text-red-800">
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">🚨 NOT FOR DIAGNOSTIC USE</h3>
                <p>
                  This system is a demonstration tool for educational purposes only. It is NOT approved 
                  for clinical diagnosis, treatment decisions, or patient care. All results are simulated 
                  and should never be used to make medical decisions.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">⚕️ PROFESSIONAL MEDICAL EVALUATION REQUIRED</h3>
                <p>
                  Only qualified healthcare professionals can diagnose diabetic retinopathy. AI screening 
                  tools cannot replace comprehensive ophthalmologic examination, clinical judgment, or 
                  professional medical care.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">📊 ACCURACY LIMITATIONS</h3>
                <p>
                  AI systems can produce false positives and false negatives. No AI system is 100% accurate. 
                  Clinical correlation and professional interpretation are essential for any medical screening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ethical AI Principles */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Users className="h-8 w-8 text-blue-600 mr-3" />
          Ethical AI Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Transparency</h3>
                <p className="text-sm text-gray-700">
                  All AI decisions are explainable with confidence scores and uncertainty indicators.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Fairness</h3>
                <p className="text-sm text-gray-700">
                  Models are tested for bias across diverse populations and demographics.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Accountability</h3>
                <p className="text-sm text-gray-700">
                  Clear governance structures and human oversight requirements are established.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Privacy</h3>
                <p className="text-sm text-gray-700">
                  Patient data protection with end-to-end encryption and minimal data retention.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Beneficence</h3>
                <p className="text-sm text-gray-700">
                  System designed to benefit patients while minimizing potential harms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Human Oversight</h3>
                <p className="text-sm text-gray-700">
                  Healthcare professionals maintain ultimate decision-making authority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HIPAA Compliance */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Lock className="h-8 w-8 text-green-600 mr-3" />
          HIPAA Compliance Framework
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">Administrative Safeguards</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Security officer designation</li>
              <li>• Workforce training programs</li>
              <li>• Access management procedures</li>
              <li>• Incident response protocols</li>
              <li>• Business associate agreements</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Physical Safeguards</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Facility access controls</li>
              <li>• Workstation security</li>
              <li>• Device and media controls</li>
              <li>• Environmental protections</li>
              <li>• Equipment disposal procedures</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3">Technical Safeguards</h3>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>• Access control systems</li>
              <li>• Audit controls and logging</li>
              <li>• Data integrity protections</li>
              <li>• Transmission security</li>
              <li>• Encryption standards</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Appropriate Use Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appropriate Uses */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
            Appropriate Uses
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Educational demonstration of AI capabilities in medical imaging</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Research and development of medical AI systems</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Training healthcare professionals on AI-assisted diagnosis</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Understanding the potential and limitations of medical AI</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Academic study of diabetic retinopathy detection methods</p>
            </div>
          </div>
        </div>

        {/* Inappropriate Uses */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <XCircle className="h-6 w-6 text-red-600 mr-2" />
            Inappropriate Uses
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Clinical diagnosis or treatment decisions</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Replacement for professional medical examination</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Patient care decisions without physician oversight</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Insurance or employment screening purposes</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Any application involving real patient outcomes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Support */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
          <div className="max-w-3xl mx-auto text-sm text-gray-700 space-y-2">
            <p>
              This demonstration system showcases the potential of AI in medical imaging while emphasizing 
              the critical importance of medical ethics, patient safety, and professional oversight.
            </p>
            <p>
              For questions about medical AI implementation, regulatory compliance, or ethical considerations 
              in healthcare AI systems, please consult with qualified medical AI specialists and regulatory experts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;