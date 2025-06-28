import React, { useState } from 'react';
import LocalCharacter3D from './components/LocalCharacter3D';

function App() {
  const [expression, setExpression] = useState<'normal' | 'excited'>('normal');
  const [isSleeping, setIsSleeping] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Pikachu 3D Model Test
        </h1>
        
        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setExpression('normal')}
            className={`px-4 py-2 rounded-lg ${
              expression === 'normal' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setExpression('excited')}
            className={`px-4 py-2 rounded-lg ${
              expression === 'excited' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Excited
          </button>
          <button
            onClick={() => setIsSleeping(!isSleeping)}
            className={`px-4 py-2 rounded-lg ${
              isSleeping 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isSleeping ? 'Wake Up' : 'Sleep'}
          </button>
        </div>

        {/* Model Display */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Small</h3>
            <LocalCharacter3D 
              size="small" 
              expression={expression} 
              isSleeping={isSleeping} 
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Medium</h3>
            <LocalCharacter3D 
              size="medium" 
              expression={expression} 
              isSleeping={isSleeping} 
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Large</h3>
            <LocalCharacter3D 
              size="large" 
              expression={expression} 
              isSleeping={isSleeping} 
            />
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
          <p><strong>Expression:</strong> {expression}</p>
          <p><strong>Sleeping:</strong> {isSleeping ? 'Yes' : 'No'}</p>
          <p><strong>Model Path:</strong> /modles/pikachu/pikachu.gltf</p>
          <p className="text-sm text-gray-600 mt-2">
            The Pikachu model should be loading and animating automatically. Check the browser console for any loading errors.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;