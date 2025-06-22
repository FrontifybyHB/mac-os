import React from 'react';

interface WindowProps {
  window: {
    id: number;
    title: string;
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
  };
  isActive: boolean;
  onMouseDown: (e: React.MouseEvent, windowId: number) => void;
  onBringToFront: (windowId: number) => void;
  onClose: (windowId: number) => void;
  onMinimize: (windowId: number) => void;
  onMaximize: (windowId: number) => void;
}

const Window: React.FC<WindowProps> = ({
  window,
  isActive,
  onMouseDown,
  onBringToFront,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  return (
    <div
      className={`absolute rounded-lg shadow-2xl overflow-hidden ${isActive ? 'ring-2 ring-blue-500' : 'opacity-95'}`}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex
      }}
      onClick={() => onBringToFront(window.id)}
    >
      <div
        className="h-8 bg-gray-200 dark:bg-gray-800 flex items-center px-3 cursor-move"
        onMouseDown={(e) => onMouseDown(e, window.id)}
      >
        <div className="flex space-x-4 mr-4 ">
          <button
            className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 flex-shrink-0 block"
            style={{ backgroundColor: '#ef4444' }}
            onClick={(e) => {
              e.stopPropagation();
              onClose(window.id);
            }}
          ></button>
          <button
            className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 flex-shrink-0 block"
            style={{ backgroundColor: '#eab308' }}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(window.id);
            }}
          ></button>
          <button
            className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200 flex-shrink-0 block"
            style={{ backgroundColor: '#22c55e' }}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(window.id);
            }}
          ></button>
        </div>
        <div className="text-center flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {window.title}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 h-[calc(100%-2rem)] p-4 overflow-auto">
        {window.title === 'Finder' ? (
          <FinderContent />
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Welcome to {window.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {window.content}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const FinderContent: React.FC = () => {
  return (
    <>
      <div className="flex items-center mb-4 space-x-2">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
              placeholder="Search in window..."
            />
            <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
          <i className="ri-list-check-2"></i>
        </button>
        <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
          <i className="ri-layout-grid-line"></i>
        </button>
      </div>
      <div className="mt-4 border rounded-lg overflow-hidden">
        {/* Finder content implementation */}
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex justify-between items-center border-b">
          <div className="flex space-x-4">
            <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-md py-1 px-3 pr-8 text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
              />
              <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm"></i>
            </div>
          </div>
          <div>
            <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200">
              <i className="ri-layout-grid-line"></i>
            </button>
          </div>
        </div>
        <div className="flex h-64">
          <div className="w-48 bg-gray-50 dark:bg-gray-800 border-r">
            <div className="p-2 text-sm">
              <div className="font-medium mb-2 text-gray-700 dark:text-gray-300">Favorites</div>
              <div className="pl-2 space-y-1">
                <div className="flex items-center space-x-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                  <i className="ri-computer-line text-blue-500"></i>
                  <span className="text-gray-600 dark:text-gray-400">Desktop</span>
                </div>
                <div className="flex items-center space-x-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                  <i className="ri-download-line text-blue-500"></i>
                  <span className="text-gray-600 dark:text-gray-400">Downloads</span>
                </div>
                <div className="flex items-center space-x-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                  <i className="ri-file-3-line text-blue-500"></i>
                  <span className="text-gray-600 dark:text-gray-400">Documents</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-3 grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div key={item} className="flex flex-col items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mb-1">
                  <i className="ri-file-text-line text-blue-500"></i>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center">File {item}.txt</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Window;
