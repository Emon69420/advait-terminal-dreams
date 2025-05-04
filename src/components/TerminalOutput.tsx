
import React from 'react';
import { useTypewriter } from '@/lib/typewriter';
import { CommandOutput } from '@/utils/terminalCommands';
import { useIsMobile } from '@/hooks/use-mobile';

interface TerminalOutputProps {
  output: CommandOutput;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  const { displayedText } = useTypewriter({ 
    text: output.content,
    delay: output.type === 'ascii' ? 1 : 10,
  });
  
  const isMobile = useIsMobile();

  switch (output.type) {
    case 'text':
      return <div className="mb-1 text-terminal-foreground">{displayedText}</div>;
    
    case 'error':
      return <div className="mb-1 text-red-400">{displayedText}</div>;
    
    case 'code':
      return (
        <pre className="mb-2 p-2 bg-terminal-header rounded text-sm overflow-x-auto">
          <code>{displayedText}</code>
        </pre>
      );
    
    case 'ascii':
      return (
        <pre className={`mb-2 font-mono text-terminal-accent whitespace-pre ${isMobile ? 'text-[0.5rem] sm:text-xs' : 'text-xs sm:text-sm'} ${isMobile ? 'overflow-x-scroll' : 'overflow-x-auto'}`}>
          {displayedText}
        </pre>
      );
    
    case 'link':
      return (
        <div className="mb-1">
          <a 
            href={output.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-terminal-accent underline hover:text-terminal-accent/80"
          >
            → {displayedText}
          </a>
        </div>
      );
    
    default:
      return <div className="mb-1">{displayedText}</div>;
  }
};

export default TerminalOutput;
