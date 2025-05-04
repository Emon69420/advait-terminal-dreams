
import React, { useEffect, useState } from 'react';
import Terminal from '@/components/Terminal';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 bg-terminal-background">
      {!isLoaded ? (
        <div className="text-terminal-foreground animate-pulse">
          <p className="mb-2 text-xl">Initializing advait terminal...</p>
          <div className="h-1 w-64 bg-terminal-accent/30">
            <div className="h-1 bg-terminal-accent" style={{ width: '60%' }}></div>
          </div>
        </div>
      ) : (
        <Terminal />
      )}
      
      <footer className="mt-6 text-terminal-accent/50 text-xs">
        <p>© 2025 advait - AI Club of VIPS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
