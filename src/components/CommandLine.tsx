
import React, { useState, useEffect, useRef } from 'react';

interface CommandLineProps {
  prompt?: string;
  onSubmit: (command: string) => void;
  disabled?: boolean;
}

const CommandLine: React.FC<CommandLineProps> = ({
  prompt = "advait@vips:~$",
  onSubmit,
  disabled = false,
}) => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || disabled) return;
    
    onSubmit(command);
    setCommandHistory(prev => [command, ...prev]);
    setCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle arrow up/down for command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  // Handle clicks outside to focus back on input
  useEffect(() => {
    const handleOutsideClick = () => {
      if (inputRef.current && !disabled) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [disabled]);

  return (
    <form onSubmit={handleSubmit} className="command-line">
      <span className="prompt">{prompt}</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={e => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full bg-transparent outline-none caret-transparent text-terminal-foreground"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <div 
          className="absolute top-0 left-0 right-0 pointer-events-none"
          aria-hidden="true"
        >
          <span>{command}</span>
          {!disabled && <span className="cursor" aria-hidden="true"></span>}
        </div>
      </div>
    </form>
  );
};

export default CommandLine;
