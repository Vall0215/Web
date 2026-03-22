import React, { useState } from 'react';
import GraficoBarras from './GraficoBarras'; 

const VigaCalculator = () => {
  const [inputs, setInputs] = useState({
    longitud: '',
    carga: '',
    modulo: '',
    esfuerzo: ''
  });
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const calcular = (e) => {
    e.preventDefault();
    const { longitud, carga, modulo, esfuerzo } = inputs;
    
    const L = parseFloat(longitud);
    const P = parseFloat(carga);
    const S = parseFloat(modulo);
    const σ = parseFloat(esfuerzo);

    if (isNaN(L) || isNaN(P) || isNaN(S) || isNaN(σ)) {
      alert('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    const Mmax = (P * L) / 4;
    const Mres = S * σ;

    setResultado({
      momentoMax: Mmax.toFixed(2),
      momentoRes: Mres.toFixed(2),
      segura: Mmax <= Mres
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Vigas</h1>
      <form onSubmit={calcular} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Longitud de la viga (m)</label>
          <input
            type="number"
            name="longitud"
            value={inputs.longitud}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            step="0.01"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Carga puntual (kN)</label>
          <input
            type="number"
            name="carga"
            value={inputs.carga}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Módulo de resistencia (cm³)</label>
          <input
            type="number"
            name="modulo"
            value={inputs.modulo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Esfuerzo admisible (MPa)</label>
          <input
            type="number"
            name="esfuerzo"
            value={inputs.esfuerzo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            step="0.01"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Calcular Resistencia
        </button>
      </form>

      {resultado && (
        <>
          {/* Gráfico */}
          <GraficoBarras
            momentoMax={parseFloat(resultado.momentoMax)}
            momentoRes={parseFloat(resultado.momentoRes)}
          />
          
          {/* Resultado */}
          <div className={`mt-6 p-4 rounded-lg ${resultado.segura ? 'bg-green-100' : 'bg-red-100'}`}>
            <h2 className="text-xl font-semibold mb-2">Resultado:</h2>
            <p>Momento máximo: {resultado.momentoMax} kN·m</p>
            <p>Momento resistente: {resultado.momentoRes} kN·m</p>
            <p className="font-bold mt-2">
              La viga es {resultado.segura ? 
                <span className="text-green-600">SEGURA ✅</span> : 
                <span className="text-red-600">INSEGURA ❌</span>}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VigaCalculator;
