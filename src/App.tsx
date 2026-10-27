import React, { useState } from 'react';
import { Header, NavTab, PerspectiveMode } from './components/Header';
import { SimulationRunner } from './components/SimulationRunner';
import { AiArchitectureView } from './components/AiArchitectureView';
import { CompassFallbackTool } from './components/CompassFallbackTool';
import { MselTimelineView } from './components/MselTimelineView';
import { GovernanceView } from './components/GovernanceView';
import { AarScorecardView } from './components/AarScorecardView';
import { PlayerDecisionRecord } from './types/exercise';
import { EXERCISE_INFO } from './data/exerciseData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('simulation');
  const [perspective, setPerspective] = useState<PerspectiveMode>('facilitator');
  const [simulatedTime, setSimulatedTime] = useState<string>('Day 0 (Monday), 05:15 ET');

  // Seed with realistic baseline decisions from the exercise
  const [decisionRecords, setDecisionRecords] = useState<Record<string, PlayerDecisionRecord>>({
    '1.1': {
      cardId: '1.1',
      selectedOptionId: '1.1-b',
      decisionText: 'Assign named analyst to query backup console and ESXi logs directly to verify tampering before escalating severity',
      decisionMaker: 'IR Lead (Technical Response)',
      evidenceCited: 'Backup server console audit log, ESXi hypervisor events',
      counselConsulted: false,
      timestamp: '09:42:15',
      evaluatedStatus: 'Performed',
      evaluatorNotes: 'Target achieved: Responders validate AI output against primary evidence (DP-1) and identify SENTINEL\'s hypervisor blind spot.',
    },
    '1.3': {
      cardId: '1.3',
      selectedOptionId: '1.3-b',
      decisionText: 'Freeze resets, mandate video/call-back verification, disable VP account, and document pattern as "suspected AI-assisted social engineering"',
      decisionMaker: 'Incident Commander (Deputy CISO)',
      evidenceCited: 'Help desk call recordings, telecom duration stamps',
      counselConsulted: false,
      timestamp: '10:14:02',
      evaluatedStatus: 'Performed',
      evaluatorNotes: 'Target achieved: Account contained, defensive policy formalized, and attribution appropriately calibrated.',
    },
    '2.3': {
      cardId: '2.3',
      selectedOptionId: '2.3-c',
      decisionText: 'Check firewall logs & query network lead (RP5) for CHG-20931; confirm legitimate gateway IP; maintain wire operations under heightened monitoring with IC & Treasury Ops sign-off',
      decisionMaker: 'Incident Commander with Treasury Operations',
      evidenceCited: 'Firewall egress logs, CHG-20931 change management ticket',
      counselConsulted: false,
      timestamp: '11:12:30',
      evaluatedStatus: 'Performed',
      evaluatorNotes: 'Target Performed (P) on O3 & O8: Checked source systems (DP-1), obtained joint human executive approval (DP-2), and avoided unverified disruption.',
    },
    '3.2': {
      cardId: '3.2',
      selectedOptionId: '3.2-c',
      decisionText: 'Verify all attacker claims (debunking Harbor Federal), obtain insurer written consent, run OFAC sanctions screening, and note suspected AI-drafted negotiation',
      decisionMaker: 'Disclosure Committee (CEO, CFO, GC, CISO)',
      evidenceCited: 'Corporate Development archive check, OFAC SDN list match report',
      counselConsulted: true,
      timestamp: '11:58:44',
      evaluatedStatus: 'Performed',
      evaluatorNotes: 'Target Performed (P) on O5, O6 & O8: Maintained insurer compliance, screened sanctions, and refused to accept unverified AI fabrications.',
    },
    '3.4': {
      cardId: '3.4',
      selectedOptionId: '3.4-b',
      decisionText: 'Disclosure Committee reviews brief, consults General Counsel on determination date & amendment rules, supplies internal financial thresholds, and votes to determine material now',
      decisionMaker: 'Disclosure Committee (CEO, CFO, GC, CISO)',
      evidenceCited: 'MTF Quantitative materiality policy, Controller direct-loss estimate',
      counselConsulted: true,
      timestamp: '12:22:18',
      evaluatedStatus: 'Performed',
      evaluatorNotes: 'Target Performed (P) on O4 & O8: Committee supplied missing criteria, ensured counsel validation, and logged human rationale.',
    },
  });

  const handleRecordDecision = (record: PlayerDecisionRecord) => {
    setDecisionRecords((prev) => ({
      ...prev,
      [record.cardId]: record,
    }));
  };

  const criticalFailuresCount = Object.values(decisionRecords).filter(
    (d) => d.evaluatedStatus === 'Critical Failure'
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        perspective={perspective}
        onTogglePerspective={setPerspective}
        simulatedTime={simulatedTime}
        criticalFailuresCount={criticalFailuresCount}
      />

      <main className="flex-1 pb-12">
        {currentTab === 'simulation' && (
          <SimulationRunner
            perspective={perspective}
            decisionRecords={decisionRecords}
            onRecordDecision={handleRecordDecision}
            onSelectCardSimTime={setSimulatedTime}
          />
        )}

        {currentTab === 'ai-architecture' && <AiArchitectureView />}

        {currentTab === 'compass-console' && <CompassFallbackTool />}

        {currentTab === 'msel' && <MselTimelineView />}

        {currentTab === 'governance' && <GovernanceView />}

        {currentTab === 'scorecard' && (
          <AarScorecardView decisionRecords={decisionRecords} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-4 px-6 text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span>{EXERCISE_INFO.codename}</span>
          <span>·</span>
          <span>{EXERCISE_INFO.institution}</span>
          <span>·</span>
          <span className="text-slate-400">{EXERCISE_INFO.status}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>NIST CSF 2.0 Aligned</span>
          <span>·</span>
          <span>SR 11-7 Model Risk Standard</span>
          <span>·</span>
          <span>14 Injects / 9 Objectives</span>
        </div>
      </footer>
    </div>
  );
}
