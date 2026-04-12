import type { ActionKey, ConsoleState, HumanStatus, Incident, Severity } from '@/types/cws';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const randomBetween = (min: number, max: number) => Number((Math.random() * (max - min) + min).toFixed(1));

const incidentTemplates: Record<ActionKey, { message: string; severity: Severity }> = {
  deployMeow: {
    message: 'Acoustic escalation deployed across the living-room region.',
    severity: 'info'
  },
  wakeHuman: {
    message: 'Human sleep cycle interrupted for priority reassessment.',
    severity: 'warning'
  },
  requestTreat: {
    message: 'Snack request promoted to executive urgency.',
    severity: 'critical'
  },
  guiltStare: {
    message: 'Human morale reduced after sustained eye-contact pressure.',
    severity: 'warning'
  },
  zoomies: {
    message: 'Unscheduled zoomies caused hallway traffic instability.',
    severity: 'critical'
  }
};

const stateLabelByScore = (score: number): HumanStatus['state'] => {
  if (score >= 75) return 'compliant';
  if (score >= 55) return 'available';
  if (score >= 35) return 'distracted';
  if (score >= 20) return 'sleeping';
  return 'unreliable';
};

const threatFromLatency = (latency: number): HumanStatus['vacuumThreat'] => {
  if (latency > 9) return 'critical';
  if (latency > 5) return 'elevated';
  return 'low';
};

const timestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

const createIncident = (actionKey: ActionKey): Incident => {
  const template = incidentTemplates[actionKey];

  return {
    id: `${actionKey}-${Date.now()}`,
    message: template.message,
    severity: template.severity,
    timestamp: timestamp()
  };
};

export const runAction = (state: ConsoleState, actionKey: ActionKey): ConsoleState => {
  const next = structuredClone(state);

  switch (actionKey) {
    case 'deployMeow':
      next.humanStatus.meowAcknowledgement = clamp(next.humanStatus.meowAcknowledgement + randomBetween(8, 18), 0, 100);
      next.humanStatus.treatLatency = clamp(next.humanStatus.treatLatency - randomBetween(0.6, 2.1), 0.5, 20);
      break;
    case 'wakeHuman':
      next.humanStatus.lapReadiness = clamp(next.humanStatus.lapReadiness + randomBetween(5, 14), 0, 100);
      next.humanStatus.blanketWarmth = clamp(next.humanStatus.blanketWarmth + randomBetween(2, 8), 0, 100);
      break;
    case 'requestTreat':
      next.usageSummary.snackRequests += 1;
      next.humanStatus.treatLatency = clamp(next.humanStatus.treatLatency - randomBetween(0.8, 1.8), 0.5, 20);
      next.humanStatus.meowAcknowledgement = clamp(next.humanStatus.meowAcknowledgement + randomBetween(4, 10), 0, 100);
      break;
    case 'guiltStare':
      next.humanStatus.lapReadiness = clamp(next.humanStatus.lapReadiness + randomBetween(6, 16), 0, 100);
      next.humanStatus.meowAcknowledgement = clamp(next.humanStatus.meowAcknowledgement + randomBetween(6, 14), 0, 100);
      break;
    case 'zoomies':
      next.humanStatus.blanketWarmth = clamp(next.humanStatus.blanketWarmth - randomBetween(3, 12), 0, 100);
      next.humanStatus.treatLatency = clamp(next.humanStatus.treatLatency + randomBetween(1.1, 2.9), 0.5, 20);
      next.usageSummary.successfulPets = clamp(next.usageSummary.successfulPets - Math.round(randomBetween(0, 2)), 0, 500);
      break;
  }

  const complianceScore = Math.round(
    (next.humanStatus.lapReadiness + next.humanStatus.meowAcknowledgement + next.humanStatus.blanketWarmth) / 3
  );

  next.humanStatus.state = stateLabelByScore(complianceScore);
  next.humanStatus.vacuumThreat = threatFromLatency(next.humanStatus.treatLatency);
  next.usageSummary.openIncidents += 1;
  next.incidents = [createIncident(actionKey), ...next.incidents].slice(0, 7);

  return next;
};

export const generateExecutiveReview = (state: ConsoleState) => {
  const { humanStatus, usageSummary } = state;
  const reliability = Math.round(
    (humanStatus.lapReadiness + humanStatus.meowAcknowledgement + humanStatus.blanketWarmth) / 3
  );

  if (reliability >= 75) {
    return `Human performance is unexpectedly acceptable. Lap readiness is stable, snack response is within tolerated feline thresholds, and blanket warmth remains serviceable. Continued employment is approved, although attitude concerns persist.`;
  }

  if (reliability >= 55) {
    return `Human remains operational but requires close supervision. Meow acknowledgement is uneven, treat latency still drifts under stress, and proactive service delivery is mostly accidental. A short-term improvement plan is recommended.`;
  }

  return `Human is underperforming across key service indicators. Treat latency is unacceptable, petting operations remain fragile, and incident volume suggests weak ownership of core household responsibilities. Promotion is denied. Sofa access remains provisional. Open incidents: ${usageSummary.openIncidents}.`;
};
