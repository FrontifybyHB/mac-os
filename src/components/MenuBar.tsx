import React from 'react';

interface MenuBarProps {
  activeWindow: number | null;
  windows: Array<{
    id: number;
    title: string;
  }>;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeWindow, windows }) => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const [time, setTime] = React.useState(getCurrentTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black bg-opacity-20 backdrop-blur-md z-50 flex items-center justify-between px-4 text-white">
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer">
          <i className="ri-apple-line"></i>
        </div>
        <div className="font-medium">{activeWindow ? windows.find(w => w.id === activeWindow)?.title : 'Finder'}</div>
        <div className="hidden sm:block">File</div>
        <div className="hidden sm:block">Edit</div>
        <div className="hidden sm:block">View</div>
        <div className="hidden sm:block">Go</div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block"><i className="ri-wifi-line"></i></div>
        <div className="hidden sm:block"><i className="ri-battery-2-line"></i></div>
        <div>{time}</div>
      </div>
    </div>
  );
};

export default MenuBar;
