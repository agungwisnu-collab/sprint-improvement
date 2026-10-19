/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { ExecutiveView } from './components/ExecutiveView';
import { SlidePresentation } from './components/SlidePresentation';
import { FeedbackModal } from './components/FeedbackModal';
import { DesignSystemModal } from './components/DesignSystemModal';

export default function App() {
  const [isSlideMode, setIsSlideMode] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState<boolean>(false);
  const [initialSlide, setInitialSlide] = useState<number>(1);

  const handleStartSlideMode = (slideNumber: number = 1) => {
    setInitialSlide(slideNumber);
    setIsSlideMode(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-[#289CD7] selection:text-white">
      {/* If in Slide Presentation mode, render the full-screen slide deck */}
      {isSlideMode ? (
        <SlidePresentation
          initialSlide={initialSlide}
          onExit={() => setIsSlideMode(false)}
        />
      ) : (
        <>
          {/* Executive & Interactive Showcase Mode */}
          <Header
            onStartSlideMode={() => handleStartSlideMode(1)}
            onOpenFeedback={() => setIsFeedbackOpen(true)}
            onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
          />

          <main>
            <ExecutiveView
              onStartSlideMode={() => handleStartSlideMode(1)}
              onOpenFeedback={() => setIsFeedbackOpen(true)}
              onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
            />
          </main>

          {/* Feedback & Scoring Modal for Judges & Audience */}
          <FeedbackModal
            isOpen={isFeedbackOpen}
            onClose={() => setIsFeedbackOpen(false)}
          />

          {/* Link Ethos Official Design System Showcase Modal */}
          <DesignSystemModal
            isOpen={isDesignSystemOpen}
            onClose={() => setIsDesignSystemOpen(false)}
          />
        </>
      )}
    </div>
  );
}
