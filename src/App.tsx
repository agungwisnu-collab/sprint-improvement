import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ExecutiveView } from './components/ExecutiveView';
import { SlidePresentation } from './components/SlidePresentation';
import { DesignSystemModal } from './components/DesignSystemModal';

export default function App() {
  const [isSlideMode, setIsSlideMode] = useState<boolean>(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState<boolean>(false);
  const [initialSlide, setInitialSlide] = useState<number>(1);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sprint_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('sprint_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleStartSlideMode = (slideNumber: number = 1) => {
    setInitialSlide(slideNumber);
    setIsSlideMode(true);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F8FAFC] text-slate-800' : 'bg-[#0B0F17] text-slate-100'} font-sans selection:bg-[#289CD7] selection:text-white transition-colors duration-200`}>
      {/* If in Slide Presentation mode, render the full-screen slide deck */}
      {isSlideMode ? (
        <SlidePresentation
          initialSlide={initialSlide}
          onExit={() => setIsSlideMode(false)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      ) : (
        <>
          {/* Executive & Interactive Showcase Mode */}
          <Header
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onStartSlideMode={() => handleStartSlideMode(1)}
          />

          <main>
            <ExecutiveView
              onStartSlideMode={() => handleStartSlideMode(1)}
              onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
            />
          </main>

          {/* Ethos Rapid Prototyping Design System Showcase Modal */}
          <DesignSystemModal
            isOpen={isDesignSystemOpen}
            onClose={() => setIsDesignSystemOpen(false)}
          />
        </>
      )}
    </div>
  );
}
