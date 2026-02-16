
import React from 'react';
import { ActivityLogEntry } from '../types';
import { Activity } from 'lucide-react';

interface ActivityLogProps {
  entries: ActivityLogEntry[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ entries }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1 min-h-[400px]">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-8">
        <Activity size={24} className="text-slate-400" /> Log i Aktivitetit
      </h2>

      <div className="space-y-6">
        {entries.length === 0 ? (
          <div className="text-center py-20 text-slate-300">
            Nuk ka ende aktivitet të regjistruar.
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="flex gap-4 group animate-in slide-in-from-left duration-300">
              <div className="mt-1.5 relative">
                <div className={`w-3 h-3 rounded-full ${
                  entry.type === 'critical' ? 'bg-orange-500' : 
                  entry.type === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
                }`}></div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-50 group-last:hidden"></div>
              </div>
              <div className="flex-1 pb-4 border-b border-slate-50 group-last:border-0">
                <p className="text-slate-800 font-medium leading-relaxed mb-1">
                  {entry.message}
                </p>
                <p className="text-slate-400 text-xs font-medium">
                  {entry.timestamp}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
