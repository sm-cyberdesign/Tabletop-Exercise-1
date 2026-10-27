export type ModuleId = 'module-1' | 'module-2' | 'module-3' | 'module-4';

export type RolePlayerId = 'RP1' | 'RP2' | 'RP3' | 'RP4' | 'RP5' | 'RP6';

export interface RolePlayer {
  id: RolePlayerId;
  title: string;
  cardsAndRequests: string;
  filledBy: string;
  voiceDescription: string;
}

export interface CompassDecisionBrief {
  simTime: string;
  title: string;
  sources: string[];
  asOfTimes: Record<string, string>;
  verifiedFacts: string[];
  assumptions: string[];
  unknowns: string[];
  assessment?: string;
  options: {
    id: string;
    label: string;
    details: string;
    tradeoffs?: string;
  }[];
  questionsForCounsel?: string[];
  missingInformation: string;
  decisionOwner: string;
  reviewTime: string;
  flawNote?: string; // Facilitator only
}

export interface InjectCard {
  id: string; // e.g. "1.1", "1.3", "2.3"
  moduleId: ModuleId;
  moduleName: string;
  simTime: string;
  scheduledTime: string;
  slot: string;
  title: string;
  deliveredBy: string;
  playerText: string;
  sentinelText?: string;
  compassBrief?: CompassDecisionBrief;
  facilitatorTruth: string;
  expectedPlayerActions: string[];
  probingQuestions: string[];
  ifStuck: string;
  criticalFailuresChecked: string[];
  decisionPointsChecked: string[];
  objectivesChecked: string[];
  aiElement: string;
  ravenInfluence?: string;
  optionsForPlayers?: {
    id: string;
    label: string;
    isOptimal: boolean;
    feedback: string;
    triggersCF?: string;
    meetsDP?: string;
  }[];
}

export interface Objective {
  id: string;
  title: string;
  successCriterion: string;
  nistCsf: string;
  leadEvaluator: string;
  targetForPerformed: string;
}

export interface CriticalFailure {
  id: string;
  title: string;
  description: string;
  linkedObjective: string;
  severity: 'CRITICAL';
}

export interface DecisionPoint {
  id: string;
  name: string;
  cardRef: string;
  description: string;
  successCheck: string;
}

export interface AssumptionItem {
  id: string;
  assumption: string;
  affects: string;
  status: 'Pending validation' | 'Validated' | 'Rejected';
}

export interface LegalItem {
  id: string;
  statement: string;
  questionForCounsel: string;
  status: 'Pending validation' | 'Answered' | 'In Review';
}

export interface ProposalMapItem {
  id: number;
  item: string;
  mergedInto: string;
  verificationEvidence: string;
  approval: string;
  mergeStatus: string;
  ownerValidation: string;
}

export interface PlayerDecisionRecord {
  cardId: string;
  selectedOptionId?: string;
  decisionText: string;
  decisionMaker: string;
  evidenceCited: string;
  counselConsulted: boolean;
  timestamp: string;
  evaluatedStatus?: 'Performed' | 'Satisfactory' | 'Unperformed' | 'Critical Failure';
  evaluatorNotes?: string;
}
