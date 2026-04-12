import { useMemo, useState } from 'react';
import { Panel } from '@/components/ui/Panel/Panel';
import type { ServiceKey, ShellLine, ViewerAccount } from '@/types/cws';
import styles from './ClawedShell.module.scss';

type ClawedShellProps = {
  account: ViewerAccount | null;
  selectedServiceKey: ServiceKey;
  recentKeys: ServiceKey[];
};

const seedLines = (account: ViewerAccount | null): ShellLine[] => [
  { id: 'line-1', type: 'output', value: 'Welcome to ClawedShell v0.418' },
  {
    id: 'line-2',
    type: 'output',
    value: account ? `Authenticated as ${account.displayName} (${account.breedName})` : 'Guest mode active. Register a cat account for profile persistence.'
  },
  { id: 'line-3', type: 'output', value: 'Try: help, status, recent, whoami, purrr, clear' }
];

export const ClawedShell = ({ account, selectedServiceKey, recentKeys }: ClawedShellProps) => {
  const [command, setCommand] = useState('');
  const [lines, setLines] = useState<ShellLine[]>(() => seedLines(account));

  const promptLabel = useMemo(() => `${account?.displayName ?? 'guest'}@cws:~$`, [account?.displayName]);

  const runCommand = (rawCommand: string) => {
    const value = rawCommand.trim().toLowerCase();

    if (!value) {
      return;
    }

    if (value === 'clear') {
      setLines(seedLines(account));
      setCommand('');
      return;
    }

    const nextLines: ShellLine[] = [{ id: `input-${Date.now()}`, type: 'input', value: `${promptLabel} ${rawCommand}` }];

    switch (value) {
      case 'help':
        nextLines.push({ id: `out-${Date.now()}-1`, type: 'output', value: 'Commands: help, status, recent, whoami, purrr, clear' });
        break;
      case 'status':
        nextLines.push({ id: `out-${Date.now()}-2`, type: 'output', value: `Focused workload: ${selectedServiceKey}. Household health: mildly dramatic.` });
        break;
      case 'recent':
        nextLines.push({ id: `out-${Date.now()}-3`, type: 'output', value: `Recently viewed: ${recentKeys.join(', ')}` });
        break;
      case 'whoami':
        nextLines.push({
          id: `out-${Date.now()}-4`,
          type: 'output',
          value: account ? `${account.displayName} (${account.breedName}) with account ${account.id}` : 'guest-human without a cat account'
        });
        break;
      case 'purrr':
        nextLines.push({ id: `out-${Date.now()}-5`, type: 'output', value: 'prrrrrrrrrrrrrrrr' });
        break;
      default:
        nextLines.push({ id: `err-${Date.now()}`, type: 'error', value: `Unknown command: ${rawCommand}` });
        break;
    }

    setLines((currentLines) => [...currentLines, ...nextLines].slice(-12));
    setCommand('');
  };

  return (
    <Panel eyebrow="Developer toys" title="ClawedShell terminal emulator">
      <div className={styles.shell}>
        <div className={styles.header}>
          <span />
          <span />
          <span />
          <strong>clawedshell</strong>
        </div>

        <div className={styles.terminalOutput}>
          {lines.map((line) => (
            <p key={line.id} className={[styles.line, line.type === 'output' ? styles.lineOutput : styles[line.type]].join(' ')}>
              {line.value}
            </p>
          ))}
        </div>

        <form
          className={styles.inputRow}
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(command);
          }}
        >
          <span className={styles.prompt}>{promptLabel}</span>
          <input value={command} onChange={(event) => setCommand(event.target.value)} placeholder="type a command" />
        </form>
      </div>
    </Panel>
  );
};
