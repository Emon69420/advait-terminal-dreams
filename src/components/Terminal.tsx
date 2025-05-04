
import React, { useEffect, useRef } from 'react';
import TerminalHeader from './TerminalHeader';
import CommandLine from './CommandLine';
import TerminalOutput from './TerminalOutput';
import { CommandHistory, useTerminal } from '@/utils/terminalCommands';

const Terminal: React.FC = () => {
  const { state, executeCommand } = useTerminal();
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [state.commandHistory]);

  return (
    <div className="terminal-container">
      <TerminalHeader />
      <div className="terminal-body" ref={terminalBodyRef}>
        {state.commandHistory.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <span className="text-terminal-accent">advait@vips:~$</span>
              <span className="ml-2">{item.command}</span>
            </div>
            
            {item.output.map((output) => (
              <TerminalOutput key={output.id} output={output} />
            ))}
          </div>
        ))}
        
        <CommandLine 
          onSubmit={executeCommand} 
          disabled={false}
        />
      </div>
    </div>
  );
};

export default Terminal;
