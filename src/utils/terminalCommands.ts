import { useState } from 'react';

export interface CommandOutput {
  id: string;
  type: 'text' | 'code' | 'error' | 'ascii' | 'link';
  content: string;
  label?: string;
  url?: string;
}

export type CommandHistory = {
  command: string;
  output: CommandOutput[];
};

export interface TerminalState {
  commandHistory: CommandHistory[];
  currentPath: string;
}

const ASCII_ART = `                                                                               
                                                                  #@@@@@@@,     
                                                        *   (@(@,  .@@@@        
                                               @@@@@@@@@@   #@(     @@@@        
                                       @@@@(   @@      @@   #@(     @@@@        
                          %@&   @&     @&&&(   &@      @&   #&(     &&&&        
                & *&&&&@/   (&& &&     @&&&(   &@    @&&&  (&&(     &&&&        
       @&&&&@@/@&@@&&&@      @& &&     @&&&(  @&&&@*   @& @&&&(     &&&&        
       &&      *&@@&&&@      @& &&     &&&&(@&&&@      @& @&&&%     &&&&        
       &@      *&@@&&&@      @& &&     &&&&(@&&&@      @& @&&&/                 
       %&   *@&%%@@%%%@      @% /%&    &%%/ @%%%@      &@                       
      ,%%&&,   (%@@%%%@      @%   @%& @%,   @%@(                                
    #%%%&      *%@@%%%@     %%      %&                                          
    #%%%@      *%@@%%%%%%%&*                                                    
    ####@       &.                                                              
    .#&&                                                                        `;

const COMMANDS: Record<string, (args: string[]) => CommandOutput[]> = {
  menu: () => [
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Available commands:',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'help - Display this help message',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'about - About advait AI Club',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'clear - Clear the terminal',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'events - Show upcoming events',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'team - Display team members',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'contact - Contact information',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'projects - Our projects',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'ascii - Display ASCII art',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'socials - Our social media links',
    },
  ],
  
  about: () => [
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'advait - AI Club of VIPS',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '-------------------------',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'We are a community of AI enthusiasts from Vivekananda Institute of Professional Studies.',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Our mission is to foster innovation, research, and learning in the field of Artificial Intelligence.',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Founded in 2025, we organize workshops, hackathons, and educational events.',
    },
  ],
  
  events: () => [
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Upcoming Events:',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• May 15, 2025 - AI Workshop: Introduction to Machine Learning',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• June 10, 2025 - Hackathon: Solving Real-world Problems with AI',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• July 5, 2025 - Guest Lecture: Future of AI and Ethics',
    },
  ],
  
  team: () => [
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Our Team:',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Chhavi Bhardwaj - President',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Emon Ganguly - Vice President',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Aaditya Pratap Singh - Deputy Vice President',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Shiven Kashyap - Tech Lead',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Yuvraj Choudhary - Tech Lead',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Ronak Gupta - Tech Lead',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Mitish Raina - Event Coordinator',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Ridhi Sureka - Event Coordinator',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Kunal Bansal - Treasurer',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Aayush Garg - Treasurer',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Ansh - Secretary',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Tiya Mathur - Joint Secretary',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Sashwat Gupta - Joint Secretary',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Ravisha Arora - Public Relations',
    },
  ],
  
  contact: () => [
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Contact Information:',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Email: advait.aiclub@vips.edu',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Phone: +91 98765 43210',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Address: Vivekananda Institute of Professional Studies, AU Block, Outer Ring Rd, Pitampura, Delhi',
    },
  ],
  
  
  ascii: () => [
    {
      id: crypto.randomUUID(),
      type: 'ascii',
      content: ASCII_ART,
    },
  ],
  
  socials: () => [
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Follow us on:',
    },
    {
      id: crypto.randomUUID(),
      type: 'link',
      content: 'Instagram',
      url: 'https://www.instagram.com/aiclub.vips/',
    },
    {
      id: crypto.randomUUID(),
      type: 'link',
      content: 'LinkedIn',
      url: 'https://www.linkedin.com/company/aiclubvset/posts/?feedView=all',
    },
    {
      id: crypto.randomUUID(),
      type: 'link',
      content: 'Twitter',
      url: 'https://x.com/aiclub_vset',
    },
  ],

  clear: () => [],
};

export function useTerminal() {
  const [state, setState] = useState<TerminalState>({
    commandHistory: [
      {
        command: 'ascii',
        output: COMMANDS.ascii([]),
      },
      {
        command: 'sudo login',
        output: [{ 
          id: crypto.randomUUID(), 
          type: 'text', 
          content: 'Welcome to ADVAIT- Association Of Developers And Visionaries In AI Tech, It is the official AI Club OF VSET' 
        }],
      },
      {
        command: 'Menu',
        output: [{ 
          id: crypto.randomUUID(), 
          type: 'text', 
          content: "Type 'menu' to see available commands" 
        }],
      }
    ],
    currentPath: '~',
  });

  const executeCommand = (commandInput: string) => {
    const trimmedInput = commandInput.trim();
    
    if (!trimmedInput) {
      return;
    }

    const [command, ...args] = trimmedInput.split(' ');

    let output: CommandOutput[] = [];

    if (command === 'clear') {
      setState(prev => ({ ...prev, commandHistory: [] }));
      return;
    } else if (command === 'echo') {
      const content = args.join(' ').replace(/"/g, '');
      output = [{ id: crypto.randomUUID(), type: 'text', content }];
    } else if (COMMANDS[command]) {
      output = COMMANDS[command](args);
    } else {
      output = [{ 
        id: crypto.randomUUID(), 
        type: 'error', 
        content: `Command not found: ${command}. Type 'menu' for available commands.` 
      }];
    }

    setState(prev => ({
      ...prev,
      commandHistory: [
        ...prev.commandHistory,
        { command: trimmedInput, output },
      ],
    }));
  };

  return { state, executeCommand };
}
