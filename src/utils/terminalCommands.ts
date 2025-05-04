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
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@%,,,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@,,,,,,,,,,,,,,,,,,****@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@,,,,,,,,,,,,,,,,,,,,,,,,,,*******%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@#,,,,,,,,,,,****************************@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@*********************************************/@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@**************@@%***************************((/#@@@@@@@@@@@@@@@@@@
@@@@@@@@@*@@@@@**************@@@@@******************((((((((((@@@@@@@@@@@@@@@@@@
@@@@@@@@@//@@@@@**************@@@@@@@*****************/(((((/(@@@@@@@@@@@@@@@@@@
@@@@@@@@@///@@@@@**************@@@@@@@@@*****************/((/(@@@@@@@@@@@@@@@@@@
@@@@@@@@@////@@@@@***********////@@@@@@@@@@//////////////////(@@@@@@@@@@@@@@@@@@
@@@@@@@@@/////@@@@@////////////////(@@@/////////////////////////@@@@@@@@@@@@@@@@
@@@@@@@@@//////@@@@@///////////////////////////////////////////////(@@@@@@@@@@@@
@@@@@@@@@(((((/&@@@@///////////////////////////////////////////////////@@@@@@@@@
@@@@@@@@@(((((((@@@@@//////////////////////////////%@@@///////////////////@@@@@@
@@@@@@@@@((((((((@@@@@//////////////////@@@@@@@@@@@@@@@@@@(//////////////////@@@
@@@@@@@@@(((((((((@@@@@//////////////%@@@@@@@@@@@@@@@@@@@@@@@%//////(@@@@@@@@@@@
@@@@@@@@@((((((((((@@@@@//////////////@@(((((((((((((((@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@(((((((((((@@@@@//////////////((((((((((((((((((/@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@((((((///@@@@@//////////((((((((((((((((((((((%@@,,@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@(////@@@@@@@@@@@@@@(((((((((((((((@@@@#@@*@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@((((((((((((@@@*@(@@@(@@*@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@///////(((((((@@@**@*@**@*@@@*@@@@@,(@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//((@@@/@%@/@@//@/@/%@@@@(*#(@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//@/@@@@@@@@*/*@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/@@%@@@@@//(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/&/@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/&//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`;

const COMMANDS: Record<string, (args: string[]) => CommandOutput[]> = {
  help: () => [
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
      content: 'Founded in 2023, we organize workshops, hackathons, and mentorship programs.',
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
      content: '• Arjun Sharma - President',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Priya Patel - Vice President',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Raj Kumar - Technical Lead',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Neha Singh - Event Coordinator',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '• Vikram Malhotra - Research Head',
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
  
  projects: () => [
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Our Projects:',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '1. Campus AI Assistant - A chatbot for student queries',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '2. Sentiment Analysis for Student Feedback',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '3. Smart Attendance System using Facial Recognition',
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      content: '4. Research Paper on Ethical AI Implementation',
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
      url: 'https://instagram.com/advait.aiclub',
    },
    {
      id: crypto.randomUUID(),
      type: 'link',
      content: 'LinkedIn',
      url: 'https://linkedin.com/company/advait-ai-club',
    },
    {
      id: crypto.randomUUID(),
      type: 'link',
      content: 'Twitter',
      url: 'https://twitter.com/advait_aiclub',
    },
    {
      id: crypto.randomUUID(),
      type: 'link',
      content: 'GitHub',
      url: 'https://github.com/advait-aiclub',
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
        command: 'echo "Welcome to advait - AI Club of VIPS"',
        output: [{ 
          id: crypto.randomUUID(), 
          type: 'text', 
          content: 'Welcome to advait - AI Club of VIPS' 
        }],
      },
      {
        command: 'echo "Type \'help\' to see available commands"',
        output: [{ 
          id: crypto.randomUUID(), 
          type: 'text', 
          content: "Type 'help' to see available commands" 
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
        content: `Command not found: ${command}. Type 'help' for available commands.` 
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
