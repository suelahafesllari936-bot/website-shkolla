
import React from 'react';
import { SensorData } from '../types';
import { Droplets, Thermometer, Gauge } from 'lucide-react';

interface MetricsCardsProps {
  data: SensorData;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ data }) => {
  const getStatus = (val: number, type: 'h' | 't' | 'e') => {
    if (type === 'h') return val < 60 ? 'Nivele optimale' : 'Lagështi e lartë';
    if (type === 't') return val < 35 ? 'Po punon cool' : 'Nxehje e tepërt';
    if (type === 'e') return val > 80 ? 'Performancë kulmore' : 'Kërkohet pastrim';
    return '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Humidity Card */}
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-emerald-600 font-bold uppercase text-xs tracking-wider mb-1">Lagështia</p>
            <h3 className="text-4xl font-extrabold text-emerald-900">{data.humidity}<span className="text-lg ml-1 opacity-60">%</span></h3>
          </div>
          <div className="p-2 bg-white rounded-xl text-emerald-500 shadow-sm">
            <Droplets size={24} />
          </div>
        </div>
        <div className="mt-8">
          <p className="text-emerald-700 font-medium text-sm mb-3">{getStatus(data.humidity, 'h')}</p>
          <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${data.humidity}%` }}></div>
          </div>
        </div>
      </div>

      {/* Temp Card */}
      <div className="bg-cyan-50/50 border border-cyan-100 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-cyan-600 font-bold uppercase text-xs tracking-wider mb-1">Temp Filtri</p>
            <h3 className="text-4xl font-extrabold text-cyan-900">{data.filterTemp}<span className="text-lg ml-1 opacity-60">°C</span></h3>
          </div>
          <div className="p-2 bg-white rounded-xl text-cyan-500 shadow-sm">
            <Thermometer size={24} />
          </div>
        </div>
        <div className="mt-8">
          <p className="text-cyan-700 font-medium text-sm mb-3">{getStatus(data.filterTemp, 't')}</p>
          <div className="h-2 w-full bg-cyan-100 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${(data.filterTemp / 60) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Efficiency Card */}
      <div className="bg-teal-50/50 border border-teal-100 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-teal-600 font-bold uppercase text-xs tracking-wider mb-1">Efikasiteti</p>
            <h3 className="text-4xl font-extrabold text-teal-900">{data.efficiency}<span className="text-lg ml-1 opacity-60">%</span></h3>
          </div>
          <div className="p-2 bg-white rounded-xl text-teal-500 shadow-sm">
            <Gauge size={24} />
          </div>
        </div>
        <div className="mt-8">
          <p className="text-teal-700 font-medium text-sm mb-3">{getStatus(data.efficiency, 'e')}</p>
          <div className="h-2 w-full bg-teal-100 rounded-full overflow-hidden">
            <div className="h-full bg-teal-400 transition-all duration-500" style={{ width: `${data.efficiency}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCards;
