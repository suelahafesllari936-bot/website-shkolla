
import React from 'react';
import { SensorData } from '../types';
import { RefreshCw, Wind, Thermometer, Zap } from 'lucide-react';

interface ControlPanelProps {
  data: SensorData;
  onChange: (newData: Partial<SensorData>) => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ data, onChange, onReset }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
          Panel i Kontrollit
        </h2>
        <button 
          onClick={onReset}
          className="text-slate-400 hover:text-blue-500 flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <RefreshCw size={16} /> Rivendos
        </button>
      </div>

      <div className="space-y-10">
        {/* Humidity */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-slate-600 font-medium">
              <Wind size={18} className="text-blue-400" /> Lagështia
            </span>
            <span className="text-slate-800 font-bold">{data.humidity}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={data.humidity}
            onChange={(e) => onChange({ humidity: parseInt(e.target.value) })}
            className="w-full h-2 bg-blue-50 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Temperature */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-slate-600 font-medium">
              <Thermometer size={18} className="text-emerald-400" /> Temp. e Filtrit
            </span>
            <span className="text-slate-800 font-bold">{data.filterTemp}°C</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="60" 
            value={data.filterTemp}
            onChange={(e) => onChange({ filterTemp: parseInt(e.target.value) })}
            className="w-full h-2 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Efficiency */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-slate-600 font-medium">
              <Zap size={18} className="text-amber-400" /> Efikasiteti i Filtrit
            </span>
            <span className="text-slate-800 font-bold">{data.efficiency}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={data.efficiency}
            onChange={(e) => onChange({ efficiency: parseInt(e.target.value) })}
            className="w-full h-2 bg-amber-50 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm">Rregulloni rrëshqitësit për të aktivizuar reagimet e Inteligjencës Artificiale</p>
      </div>
    </div>
  );
};

export default ControlPanel;
