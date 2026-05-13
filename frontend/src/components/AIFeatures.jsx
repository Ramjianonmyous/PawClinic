import React, { useState } from 'react';
import axios from 'axios';

export default function AIFeatures({ token, addToast, onFeatureClick }) {
  const [activeFeature, setActiveFeature] = useState(null); // 'prescription', 'symptom', 'summary'
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      addToast('Image selected successfully!', 'success');
    }
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleProcess = async () => {
    if (!inputData.trim() && !selectedImage) {
      addToast('Please enter data or upload an image to analyze.', 'warning');
      return;
    }
    setLoading(true);
    try {
      // In a real app, this would call an AI API
      // For now, we simulate the AI response and save it to DB
      let simulatedResult = '';
      if (activeFeature === 'prescription') {
        if (selectedImage) {
          simulatedResult = `Prescription Analysis from Image (${selectedImage.name}):
- Drug: Amoxicillin
- Used for: Bacterial infections, ear infections, and skin infections in pets.
- Dosage: Follow vet instructions carefully.`;
        } else {
          simulatedResult = `Prescription Analysis:
- Drug: Amoxicillin
- Used for: Bacterial infections, ear infections, and skin infections in pets.
- Dosage: Follow vet instructions carefully.`;
        }
      } else if (activeFeature === 'symptom') {
        simulatedResult = `Symptom Analysis for "${inputData}":
- Potential Cause: Mild allergy or environmental irritation.
- Points/Recommendations:
  1. Keep the area clean and dry.
  2. Avoid changing diet suddenly.
- Natural Remedies:
  * Oatmeal bath for skin soothing.
  * Chamomile tea rinse (cooled) for itchy paws.
- Note: If symptoms persist for more than 48 hours, consult a vet.`;
      } else if (activeFeature === 'summary') {
        simulatedResult = `Medical Report Summary:
The patient shows normal vital signs. Blood work indicates a slight elevation in white blood cells, suggesting a mild infection or stress response. Recommended follow-up in 2 weeks.`;
      }

      setResult(simulatedResult);

      // Save to DB
      if (token) {
        await axios.post(`${API_URL}/api/ai/save`, {
          feature: activeFeature,
          input: inputData,
          result: simulatedResult
        }, {
          headers: { 'x-auth-token': token }
        });
        addToast('Analysis saved to your profile!', 'success');
      }
    } catch (error) {
      console.error('Error processing AI feature:', error);
      addToast('Failed to process or save analysis.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-3">Premium Tools</p>
          <h2 className="font-display text-4xl md:text-5xl text-pri-900">AI Health Assistant</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Explore our advanced AI tools to help understand your pet's health better. These queries are private and saved to your profile.</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1: Prescription Analyzer */}
          <div 
            className={`cursor-pointer p-8 rounded-3xl border transition-all duration-300 ${activeFeature === 'prescription' ? 'border-teal-500 bg-teal-50/50 shadow-md' : 'border-slate-100 hover:border-teal-200 hover:shadow-sm'}`}
            onClick={() => {
              if (onFeatureClick) {
                onFeatureClick('prescription');
              } else {
                setActiveFeature('prescription');
                setResult(null);
                setInputData('');
              }
            }}
          >
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6 text-xl">
              <i className="fas fa-file-prescription"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Prescription Analyzer</h3>
            <p className="text-slate-600 text-sm">Simplifies paper prescriptions to show drug names and what they are used for.</p>
          </div>

          {/* Card 2: Symptom Analyzer */}
          <div 
            className={`cursor-pointer p-8 rounded-3xl border transition-all duration-300 ${activeFeature === 'symptom' ? 'border-teal-500 bg-teal-50/50 shadow-md' : 'border-slate-100 hover:border-teal-200 hover:shadow-sm'}`}
            onClick={() => {
              if (onFeatureClick) {
                onFeatureClick('symptom');
              } else {
                setActiveFeature('symptom');
                setResult(null);
                setInputData('');
              }
            }}
          >
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6 text-xl">
              <i className="fas fa-stethoscope"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Symptom Analyzer</h3>
            <p className="text-slate-600 text-sm">Analyzes symptoms, suggests natural remedies, and provides detailed points.</p>
          </div>

          {/* Card 3: Report Summarizer */}
          <div 
            className={`cursor-pointer p-8 rounded-3xl border transition-all duration-300 ${activeFeature === 'summary' ? 'border-teal-500 bg-teal-50/50 shadow-md' : 'border-slate-100 hover:border-teal-200 hover:shadow-sm'}`}
            onClick={() => {
              if (onFeatureClick) {
                onFeatureClick('summary');
              } else {
                setActiveFeature('summary');
                setResult(null);
                setInputData('');
              }
            }}
          >
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6 text-xl">
              <i className="fas fa-file-medical-alt"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Report Summarizer</h3>
            <p className="text-slate-600 text-sm">Condenses long medical reports into easy-to-understand summaries.</p>
          </div>
        </div>

        {/* Action Area */}
        {activeFeature && (
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h4 className="text-lg font-bold text-slate-800 mb-4">
              {activeFeature === 'prescription' && 'Enter Prescription Text or Upload Image'}
              {activeFeature === 'symptom' && 'Describe the Symptoms'}
              {activeFeature === 'summary' && 'Paste the Medical Report'}
            </h4>
            
            {activeFeature === 'prescription' && (
              <div className="mb-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-colors"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
                    <i className="fas fa-check-circle"></i> Selected: {selectedImage.name}
                  </p>
                )}
              </div>
            )}
            
            <textarea 
              className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors text-slate-700"
              placeholder="Type or paste here..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            ></textarea>

            <button 
              className={`mt-4 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={handleProcess}
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-magic"></i> Analyze with AI
                </>
              )}
            </button>

            {/* Result Display */}
            {result && (
              <div className="mt-8 p-6 bg-white rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-600 font-bold mb-3">
                  <i className="fas fa-check-circle"></i> AI Analysis Result
                </div>
                <pre className="text-slate-700 whitespace-pre-wrap font-sans text-sm">{result}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
