export type ServiceKey = 'catops' | 'iam' | 'clawedwatch' | 'sns' | 's3' | 'route9';
export type Severity = 'info' | 'warning' | 'critical';
export type ActionKey = 'deployMeow' | 'wakeHuman' | 'requestTreat' | 'guiltStare' | 'zoomies';

export type ServiceDefinition = {
  key: ServiceKey;
  shortName: string;
  name: string;
  tagline: string;
  description: string;
  status: 'healthy' | 'degraded' | 'chaotic';
  usageLabel: string;
  usageValue: string;
  icon: string;
  category: string;
  sparkline: number[];
};

export type Incident = {
  id: string;
  message: string;
  severity: Severity;
  timestamp: string;
};

export type HumanStatus = {
  name: string;
  state: 'available' | 'distracted' | 'sleeping' | 'compliant' | 'unreliable';
  lapReadiness: number;
  treatLatency: number;
  meowAcknowledgement: number;
  blanketWarmth: number;
  vacuumThreat: 'low' | 'elevated' | 'critical';
};

export type UsageSummary = {
  activeHumans: number;
  snackRequests: number;
  successfulPets: number;
  openIncidents: number;
};

export type ConsoleState = {
  humanStatus: HumanStatus;
  incidents: Incident[];
  usageSummary: UsageSummary;
};

export type ActionDefinition = {
  key: ActionKey;
  label: string;
  description: string;
};

export type BreedOption = {
  id: string;
  name: string;
};

export type ViewerAccount = {
  id: string;
  displayName: string;
  breedId: string;
  breedName: string;
  avatarUrl: string;
  createdAt: string;
};

export type ShellLine = {
  id: string;
  type: 'input' | 'output' | 'error';
  value: string;
};
