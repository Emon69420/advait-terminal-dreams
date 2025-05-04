
import React from 'react';
import { Terminal } from 'lucide-react';

interface TerminalHeaderProps {
  title?: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ title = "advait@terminal ~ AI Club VIPS" }) => {
  return (
    <div className="terminal-header">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="flex-1 text-center flex items-center justify-center gap-2 text-terminal-foreground/80">
        <Terminal size={14} />
        <span className="font-semibold">{title}</span>
      </div>
    </div>
  );
};

export default TerminalHeader;
