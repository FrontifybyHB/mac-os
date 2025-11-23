// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import MenuBar from './components/MenuBar';
import DesktopIcons from './components/DesktopIcons';
import Window from './components/Window';
import Dock from './components/Dock';

const App: React.FC = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [draggedWindow, setDraggedWindow] = useState<number | null>(null);
    const [activeWindow, setActiveWindow] = useState<number | null>(null);
    const [windows, setWindows] = useState<Array<{
        id: number;
        title: string;
        content: string;
        minimized: boolean;
        position: { x: number; y: number };
        prevPosition?: { x: number; y: number };
        size: { width: number; height: number };
        prevSize?: { width: number; height: number };
        zIndex: number;
    }>>([
        {
            id: 1,
            title: 'Finder',
            content: 'This is the Finder window content.',
            minimized: false,
            position: { x: 100, y: 100 },
            size: { width: 600, height: 400 },
            zIndex: 1
        }
    ]);
    const [desktopIcons, _setDesktopIcons] = useState([
        { id: 1, name: 'Finder', icon: 'folder-line', color: 'from-blue-400 to-blue-600' },
        { id: 2, name: 'Safari', icon: 'global-line', color: 'from-blue-500 to-blue-700' },
        { id: 3, name: 'Messages', icon: 'message-3-line', color: 'from-green-400 to-green-600' },
        { id: 4, name: 'Mail', icon: 'mail-line', color: 'from-blue-400 to-indigo-600' },
        { id: 5, name: 'Photos', icon: 'camera-line', color: 'from-purple-400 to-purple-600' },
        { id: 6, name: 'Music', icon: 'headphone-line', color: 'from-pink-400 to-pink-600' },
        { id: 7, name: 'App Store', icon: 'store-line', color: 'from-blue-400 to-blue-600' },
        { id: 8, name: 'Notes', icon: 'sticky-note-line', color: 'from-yellow-400 to-yellow-600' },
        { id: 9, name: 'Calculator', icon: 'calculator-line', color: 'from-gray-400 to-gray-600' },
        { id: 11, name: 'Calendar', icon: 'calendar-line', color: 'from-red-400 to-red-600' },
        { id: 13, name: 'TextEdit', icon: 'file-text-line', color: 'from-blue-300 to-blue-500' },
        { id: 14, name: 'Preview', icon: 'image-line', color: 'from-orange-400 to-orange-600' },
        { id: 9, name: 'Calendar', icon: 'calendar-line', color: 'from-red-400 to-red-600' },
        { id: 10, name: 'Settings', icon: 'settings-line', color: 'from-gray-400 to-gray-600' },
        { id: 11, name: 'Calculator', icon: 'calculator-line', color: 'from-orange-400 to-orange-600' },
        { id: 12, name: 'Terminal', icon: 'terminal-line', color: 'from-gray-700 to-gray-900' },
        { id: 13, name: 'TextEdit', icon: 'file-text-line', color: 'from-blue-300 to-blue-500' },
        { id: 14, name: 'Preview', icon: 'image-line', color: 'from-indigo-400 to-indigo-600' },
        { id: 15, name: 'Maps', icon: 'map-pin-line', color: 'from-green-500 to-green-700' },
        { id: 16, name: 'FaceTime', icon: 'video-line', color: 'from-green-400 to-green-600' },
        { id: 17, name: 'Contacts', icon: 'contacts-line', color: 'from-gray-500 to-gray-700' },
        { id: 18, name: 'Reminders', icon: 'checkbox-circle-line', color: 'from-orange-400 to-orange-600' },
        { id: 19, name: 'Clock', icon: 'time-line', color: 'from-gray-600 to-gray-800' },
        { id: 20, name: 'Weather', icon: 'sun-cloudy-line', color: 'from-blue-300 to-blue-500' },
    ]);
    const [dockApps, setDockApps] = useState([
        { id: 1, name: 'Finder', icon: 'folder-line', isRunning: true, color: 'from-blue-400 to-blue-600' },
        { id: 2, name: 'Safari', icon: 'global-line', isRunning: false, color: 'from-blue-500 to-blue-700' },
        { id: 3, name: 'Messages', icon: 'message-3-line', isRunning: false, color: 'from-green-400 to-green-600' },
        { id: 4, name: 'Mail', icon: 'mail-line', isRunning: false, color: 'from-blue-400 to-indigo-600' },
        { id: 5, name: 'Photos', icon: 'camera-line', isRunning: false, color: 'from-purple-400 to-purple-600' },
        { id: 12, name: 'Terminal', icon: 'terminal-line', isRunning: false, color: 'from-gray-700 to-gray-900' },
        { id: 7, name: 'App Store', icon: 'store-line', isRunning: false, color: 'from-blue-400 to-blue-600' },
        { id: 10, name: 'Settings', icon: 'settings-line', isRunning: false, color: 'from-gray-400 to-gray-600' },
    ]);
    const dragOffset = useRef({ x: 0, y: 0 });
    const maxZIndex = useRef(1);
    const handleMouseDown = (e: React.MouseEvent, windowId: number) => {
        const window = windows.find(w => w.id === windowId);
        if (!window) return;
        // Bring window to front
        bringToFront(windowId);
        // Start dragging
        setIsDragging(true);
        setDraggedWindow(windowId);
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || draggedWindow === null) return;
        setWindows(prevWindows =>
            prevWindows.map(window => {
                if (window.id === draggedWindow) {
                    return {
                        ...window,
                        position: {
                            x: e.clientX - dragOffset.current.x,
                            y: e.clientY - dragOffset.current.y
                        }
                    };
                }
                return window;
            })
        );
    };
    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggedWindow(null);
    };
    const bringToFront = (windowId: number) => {
        maxZIndex.current += 1;
        setActiveWindow(windowId);
        setWindows(prevWindows =>
            prevWindows.map(window => {
                if (window.id === windowId) {
                    return {
                        ...window,
                        zIndex: maxZIndex.current
                    };
                }
                return window;
            })
        );
    };
    const minimizeWindow = (windowId: number) => {
        setWindows(prevWindows =>
            prevWindows.map(window => {
                if (window.id === windowId) {
                    return {
                        ...window,
                        minimized: true
                    };
                }
                return window;
            })
        );
    };
    const closeWindow = (windowId: number) => {
        setWindows(prevWindows => prevWindows.filter(window => window.id !== windowId));
        // Update dock to show app is no longer running
        setDockApps(prevDockApps =>
            prevDockApps.map(app => {
                if (app.id === windowId) {
                    return { ...app, isRunning: false };
                }
                return app;
            })
        );
    };
    const openApp = (appId: number) => {
        // Check if window already exists but is minimized
        const existingWindow = windows.find(w => w.id === appId);
        if (existingWindow) {
            if (existingWindow.minimized) {
                setWindows(prevWindows =>
                    prevWindows.map(window => {
                        if (window.id === appId) {
                            return {
                                ...window,
                                minimized: false
                            };
                        }
                        return window;
                    })
                );
            }
            bringToFront(appId);
            return;
        }
        // Get app details
        const app = dockApps.find(a => a.id === appId) || desktopIcons.find(a => a.id === appId);
        if (!app) return;
        // Create new window
        const newWindow = {
            id: appId,
            title: app.name,
            content: `This is the ${app.name} window content.`,
            minimized: false,
            position: { x: 150 + (windows.length * 30), y: 150 + (windows.length * 20) },
            size: { width: 600, height: 400 },
            zIndex: maxZIndex.current + 1
        };
        maxZIndex.current += 1;
        setWindows(prevWindows => [...prevWindows, newWindow]);
        setActiveWindow(appId);
        // Update dock to show app is running
        setDockApps(prevDockApps =>
            prevDockApps.map(dockApp => {
                if (dockApp.id === appId) {
                    return { ...dockApp, isRunning: true };
                }
                return dockApp;
            })
        );
    };
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    return (
        <div className="w-screen h-screen bg-cover bg-center overflow-hidden fixed inset-0"
            style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Stunning%20macOS%20desktop%20wallpaper%20with%20soft%20gradient%20colors%2C%20mountains%20in%20the%20distance%2C%20beautiful%20sunset%20sky%20with%20pink%20and%20purple%20hues%2C%20ultra%20high%20definition%2C%20professional%20photography%2C%20serene%20landscape&width=1920&height=1080&seq=1&orientation=landscape')`,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }}>
            <MenuBar activeWindow={activeWindow} windows={windows} />

            <DesktopIcons icons={desktopIcons} onOpenApp={openApp} />

            {windows.filter(window => !window.minimized).map(window => (
                <Window
                    key={window.id}
                    window={window}
                    isActive={activeWindow === window.id}
                    onMouseDown={handleMouseDown}
                    onBringToFront={bringToFront}
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    onMaximize={(windowId) => {
                        const currentWindow = windows.find(w => w.id === windowId);
                        if (currentWindow?.size.width === globalThis.innerWidth) {
                            setWindows(prevWindows =>
                                prevWindows.map(w => {
                                    if (w.id === windowId) {
                                        return {
                                            ...w,
                                            position: w.prevPosition || { x: 150, y: 150 },
                                            size: w.prevSize || { width: 600, height: 400 }
                                        };
                                    }
                                    return w;
                                })
                            );
                        } else {
                            setWindows(prevWindows =>
                                prevWindows.map(w => {
                                    if (w.id === windowId) {
                                        return {
                                            ...w,
                                            prevPosition: w.position,
                                            prevSize: w.size,
                                            position: { x: 0, y: 32 },
                                            size: { width: globalThis.innerWidth, height: globalThis.innerHeight - 32 - 80 }
                                        };
                                    }
                                    return w;
                                })
                            );
                        }
                    }} />
            ))}

            <Dock apps={dockApps} onOpenApp={openApp} />
        </div>
    );
};
export default App