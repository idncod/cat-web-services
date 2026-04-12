import type { ActionDefinition, ConsoleState, ServiceDefinition } from '@/types/cws';

export const fallbackBreeds = [
  { id: 'sphynx', name: 'Sphynx' },
  { id: 'beng', name: 'Bengal' },
  { id: 'abys', name: 'Abyssinian' },
  { id: 'bsho', name: 'British Shorthair' },
  { id: 'ragd', name: 'Ragdoll' },
  { id: 'mcoo', name: 'Maine Coon' },
  { id: 'siam', name: 'Siamese' },
  { id: 'sibe', name: 'Siberian' },
  { id: 'norw', name: 'Norwegian Forest Cat' },
  { id: 'pers', name: 'Persian' }
];

export const services: ServiceDefinition[] = [
  {
    key: 'catops',
    shortName: 'CatOps',
    name: 'CatOps Workforce Console',
    tagline: 'Monitor underperforming humans at scale.',
    description:
        'Track petting uptime, lap readiness, and overall usefulness across your household estate.',
    status: 'degraded',
    usageLabel: 'Human uptime',
    usageValue: '61%',
    icon: '🐾',
    category: 'Operations',
    sparkline: [48, 52, 44, 59, 57, 61]
  },
  {
    key: 'iam',
    shortName: 'IAM',
    name: 'Identity and Meowment',
    tagline: 'Permission control for petting, feeding, and sofa access.',
    description: 'Grant or deny privileges with strict least-privilege feline governance.',
    status: 'healthy',
    usageLabel: 'Denied requests',
    usageValue: '94%',
    icon: '🛡️',
    category: 'Security',
    sparkline: [82, 84, 86, 89, 91, 94]
  },
  {
    key: 'clawedwatch',
    shortName: 'ClawedWatch',
    name: 'ClawedWatch Observability',
    tagline: 'Real-time alarms for suspicious human behavior.',
    description: 'Detect vacuum exposure, snack withholding, and closed-door incidents instantly.',
    status: 'chaotic',
    usageLabel: 'Open alarms',
    usageValue: '17',
    icon: '📡',
    category: 'Observability',
    sparkline: [6, 9, 8, 12, 15, 17]
  },
  {
    key: 'sns',
    shortName: 'SNS',
    name: 'Snack Notification Service',
    tagline: 'Mission-critical treat escalation.',
    description: 'Deliver urgent snack signals to every reachable human endpoint.',
    status: 'healthy',
    usageLabel: 'Treat pings',
    usageValue: '428',
    icon: '🍤',
    category: 'Messaging',
    sparkline: [300, 318, 336, 372, 401, 428]
  },
  {
    key: 's3',
    shortName: 'S3',
    name: 'Scratch, Sleep, Store',
    tagline: 'Durable storage for naps, grudges, and boxes.',
    description: 'Persist your most precious assets with eleven nines of cardboard durability.',
    status: 'healthy',
    usageLabel: 'Boxes retained',
    usageValue: '32',
    icon: '📦',
    category: 'Storage',
    sparkline: [12, 15, 18, 22, 27, 32]
  },
  {
    key: 'route9',
    shortName: 'Route 9',
    name: 'Route 9 Lives',
    tagline: 'Low-latency room traversal for distributed zoomies.',
    description: 'Optimise hallway bursts and midnight sprints with globally distributed tail routing.',
    status: 'degraded',
    usageLabel: 'Room hops',
    usageValue: '2.4M',
    icon: '⚡',
    category: 'Networking',
    sparkline: [1.2, 1.5, 1.8, 2.0, 2.2, 2.4]
  }
];

export const initialConsoleState: ConsoleState = {
  humanStatus: {
    name: 'Primary Human',
    state: 'unreliable',
    lapReadiness: 44,
    treatLatency: 8.4,
    meowAcknowledgement: 52,
    blanketWarmth: 63,
    vacuumThreat: 'elevated'
  },
  incidents: [
    {
      id: 'incident-1',
      message: 'Human entered kitchen and returned without treats.',
      severity: 'critical',
      timestamp: '14:02'
    },
    {
      id: 'incident-2',
      message: 'Bathroom door closed without stakeholder approval.',
      severity: 'warning',
      timestamp: '13:51'
    },
    {
      id: 'incident-3',
      message: 'Laptop deployed into preferred sitting zone.',
      severity: 'info',
      timestamp: '13:28'
    }
  ],
  usageSummary: {
    activeHumans: 1,
    snackRequests: 27,
    successfulPets: 19,
    openIncidents: 3
  }
};

export const actions: ActionDefinition[] = [
  {
    key: 'deployMeow',
    label: 'Deploy Meow',
    description: 'Broadcast an immediate, high-priority vocal complaint.'
  },
  {
    key: 'wakeHuman',
    label: 'Wake Human',
    description: 'Interrupt sleep using precision whisker deployment.'
  },
  {
    key: 'requestTreat',
    label: 'Request Treat',
    description: 'Escalate snack requirements to the nearest kitchen region.'
  },
  {
    key: 'guiltStare',
    label: 'Trigger Guilt Stare',
    description: 'Reduce human resistance through deeply unsettling eye contact.'
  },
  {
    key: 'zoomies',
    label: 'Emergency Zoomies',
    description: 'Redistribute energy across all rooms with no change window.'
  }
];
