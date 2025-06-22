import React from 'react';

interface DesktopIcon {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface DesktopIconsProps {
  icons: DesktopIcon[];
  onOpenApp: (appId: number) => void;
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({ icons, onOpenApp }) => {
  return (
    <div className="pt-12 px-6 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-6">
      {icons.map(icon => (
        <div
          key={icon.id}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => onOpenApp(icon.id)}
        >
          <div className={`w-16 h-16 flex items-center justify-center text-white bg-gradient-to-b ${icon.color} rounded-2xl mb-2 shadow-lg transform group-hover:scale-105 transition-all duration-200`}>
            <i className={`ri-${icon.icon} text-2xl drop-shadow-md`}></i>
          </div>
          <span className="text-white text-sm text-center px-2 py-1 rounded bg-opacity-40 backdrop-blur-sm max-w-full truncate">
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;
