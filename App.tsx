
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SensorData, ActivityLogEntry, DeviceStatus } from './types';
import { getAIPersonifiedMessage } from './services/geminiService';
import AIAvatar from './components/AIAvatar';
import ControlPanel from './components/ControlPanel';
import MetricsCards from './components/MetricsCards';
import ActivityLog from './components/ActivityLog';
import { Cloud, Radio, ShieldCheck } from 'lucide-react';

const INITIAL_DATA: SensorData = {
  humidity: 45,
  filterTemp: 22,
  efficiency: 100
};

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>(INITIAL_DATA);
  const [currentMessage, setCurrentMessage] = useState<string>("Përshëndetje! Unë jam SmartFilter AI. Çdo gjë duket e pastër tani.");
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  // Fix: Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout to resolve namespace error in browser environment
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpdateLogs = useCallback((msg: string, efficiency: number) => {
    const newEntry: ActivityLogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      message: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: efficiency < 50 ? 'critical' : efficiency < 80 ? 'warning' : 'success'
    };
    setLogs(prev => [newEntry, ...prev].slice(0, 10));
  }, []);

  const triggerAIResponse = useCallback(async (data: SensorData) => {
    setIsThinking(true);
    const aiMsg = await getAIPersonifiedMessage(data);
    setCurrentMessage(aiMsg);
    handleUpdateLogs(aiMsg, data.efficiency);
    setIsThinking(false);
  }, [handleUpdateLogs]);

  const handleSensorChange = (newData: Partial<SensorData>) => {
    const updatedData = { ...sensorData, ...newData };
    setSensorData(updatedData);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      triggerAIResponse(updatedData);
    }, 1000);
  };

  const resetAll = () => {
    setSensorData(INITIAL_DATA);
    triggerAIResponse(INITIAL_DATA);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 pb-20 px-4 max-w-7xl mx-auto">
      {/* Header Navigation */}
      <nav className="flex items-center justify-between py-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <Cloud size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">SmartFilter</h1>
            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck size={12} className="text-blue-500" />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Filtër Karboni Aktiv</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-bold text-slate-700 tracking-tight">Statusi: {DeviceStatus.ONLINE}</span>
        </div>
      </nav>

      {/* Main Experience Section */}
      <div className="mt-4">
        <AIAvatar 
          efficiency={sensorData.efficiency} 
          isThinking={isThinking} 
          message={currentMessage} 
        />
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Control Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl shadow-slate-200">
            <h3 className="text-lg font-bold mb-1">Simulimi i Mjedisit</h3>
            <p className="text-slate-400 text-xs mb-6">Testoni reagimet e filtrit duke lëvizur sensorët</p>
            <ControlPanel 
              data={sensorData} 
              onChange={handleSensorChange} 
              onReset={resetAll} 
            />
          </div>
        </div>

        {/* Right Data Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2rem] p-1 border border-slate-50">
            <MetricsCards data={sensorData} />
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
             <ActivityLog entries={logs} />
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
             <Radio size={14} />
          </div>
          <p className="font-medium tracking-tight">Sistemi i Monitorimit Inteligjent v2.4</p>
        </div>
        <p className="font-medium">© 2024 Zhvilluar për pastrimin aktiv të ajrit.</p>
      </footer>
    </div>
  );
};

export default App;
