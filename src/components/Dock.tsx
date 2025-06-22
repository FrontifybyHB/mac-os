import React from 'react';

interface DockApp {
  id: number;
  name: string;
  icon: string;
  isRunning: boolean;
  color: string;
}

interface DockProps {
  apps: DockApp[];
  onOpenApp: (appId: number) => void;
}

const Dock: React.FC<DockProps> = ({ apps, onOpenApp }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-2xl bg-white bg-opacity-20 backdrop-blur-md flex items-end space-x-2 shadow-lg">
      {apps.map(app => (
        <div
          key={app.id}
          className="relative group cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110 hover:-translate-y-2"
          onClick={() => onOpenApp(app.id)}
        >
          <div className={`w-12 h-12 bg-gradient-to-b ${app.color} rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm bg-opacity-90`}>
            <i className={`ri-${app.icon} text-white text-xl drop-shadow-md`}></i>
          </div>
          {app.isRunning && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
          )}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap bg-black bg-opacity-75 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {app.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dock;
