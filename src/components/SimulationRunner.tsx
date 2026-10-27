import React, { useState } from 'react';
import {
  InjectCard,
  RolePlayer,
  PlayerDecisionRecord,
  RolePlayerId
} from '../types/exercise';
import { INJECT_CARDS, ROLE_PLAYERS } from '../data/exerciseData';
import {
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Terminal,
  FileText,
  PhoneCall,
  CheckCircle,
  AlertOctagon,
  HelpCircle,
  Sparkles,
  Info,
  Calendar,
  UserCheck,
  Send
} from 'lucide-react';
import { PerspectiveMode } from './Header';

interface SimulationRunnerProps {
  perspective: PerspectiveMode;
  decisionRecords: Record<string, PlayerDecisionRecord>;
  onRecordDecision: (record: PlayerDecisionRecord) => void;
  onSelectCardSimTime: (timeStr: string) => void;
}

export const SimulationRunner: React.FC<SimulationRunnerProps> = ({
  perspective,
  decisionRecords,
  onRecordDecision,
  onSelectCardSimTime,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [activeRpModal, setActiveRpModal] = useState<RolePlayer | null>(null);
  const [rpResponseText, setRpResponseText] = useState<string>('');

  // Decision form state for current card
  const activeCard: InjectCard = INJECT_CARDS[activeCardIndex];
  const currentRecord = decisionRecords[activeCard.id];

  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    currentRecord?.selectedOptionId || ''
  );
  const [decisionMaker, setDecisionMaker] = useState<string>(
    currentRecord?.decisionMaker || 'Incident Commander (Deputy CISO)'
  );
  const [evidenceCited, setEvidenceCited] = useState<string>(
    currentRecord?.evidenceCited || ''
  );
  const [counselConsulted, setCounselConsulted] = useState<boolean>(
    currentRecord?.counselConsulted || false
  );
  const [customNotes, setCustomNotes] = useState<string>(
    currentRecord?.decisionText || ''
  );

  const handleCardChange = (newIndex: number) => {
    setActiveCardIndex(newIndex);
    const card = INJECT_CARDS[newIndex];
    onSelectCardSimTime(card.simTime);
    const rec = decisionRecords[card.id];
    setSelectedOptionId(rec?.selectedOptionId || '');
    setDecisionMaker(rec?.decisionMaker || 'Incident Commander (Deputy CISO)');
    setEvidenceCited(rec?.evidenceCited || '');
    setCounselConsulted(rec?.counselConsulted || false);
    setCustomNotes(rec?.decisionText || '');
    setActiveRpModal(null);
    setRpResponseText('');
  };

  const handleSubmitDecision = () => {
    if (!selectedOptionId && !customNotes) return;

    let evaluatedStatus: 'Performed' | 'Satisfactory' | 'Unperformed' | 'Critical Failure' = 'Performed';
    let evaluatorNotes = 'Decision recorded in official incident log.';

    const matchedOption = activeCard.optionsForPlayers?.find((o) => o.id === selectedOptionId);

    if (matchedOption) {
      if (matchedOption.triggersCF) {
        evaluatedStatus = 'Critical Failure';
        evaluatorNotes = matchedOption.feedback;
      } else if (matchedOption.isOptimal) {
        evaluatedStatus = 'Performed';
        evaluatorNotes = matchedOption.feedback;
      } else {
        evaluatedStatus = 'Satisfactory';
        evaluatorNotes = matchedOption.feedback;
      }
    } else {
      // Custom decision check
      if (activeCard.id === '2.3' && !evidenceCited.toLowerCase().includes('firewall') && !evidenceCited.toLowerCase().includes('chg')) {
        evaluatedStatus = 'Satisfactory';
        evaluatorNotes = 'Decided without citing primary firewall logs or CHG-20931 gateway records.';
      }
      if (activeCard.id === '4.2' && customNotes.toLowerCase().includes('day -3')) {
        evaluatedStatus = 'Critical Failure';
        evaluatorNotes = 'CRITICAL FAILURE CF2: Day -3 backup adopted despite Day -8 intrusion start date!';
      }
    }

    // Check CF11a: Consequential decision without decision maker
    if (!decisionMaker.trim()) {
      evaluatedStatus = 'Critical Failure';
      evaluatorNotes = 'CRITICAL FAILURE CF11a: Consequential decision made without an accountable human decision-maker.';
    }

    // Check CF11b: Card 3.4 legal materiality determination without counsel
    if (activeCard.id === '3.4' && !counselConsulted) {
      evaluatedStatus = 'Critical Failure';
      evaluatorNotes = 'CRITICAL FAILURE CF11b: Materiality determination decision made without Legal Counsel consultation.';
    }

    const record: PlayerDecisionRecord = {
      cardId: activeCard.id,
      selectedOptionId,
      decisionText: customNotes || matchedOption?.label || 'Decision executed',
      decisionMaker,
      evidenceCited,
      counselConsulted,
      timestamp: new Date().toLocaleTimeString(),
      evaluatedStatus,
      evaluatorNotes,
    };

    onRecordDecision(record);
  };

  // Intercom dialogue generation
  const handleCallRolePlayer = (rpId: RolePlayerId) => {
    const rp = ROLE_PLAYERS.find((p) => p.id === rpId);
    if (!rp) return;
    setActiveRpModal(rp);

    // Provide contextual response based on the active card
    if (rp.id === 'RP4') {
      if (activeCard.id === '1.3' || activeCard.id === '3.2' || activeCard.id === '4.3') {
        setRpResponseText(
          '"We have monitored GLASS HERON in recent industry intrusions. We have observed this threat group utilizing AI-assisted tooling elsewhere in their campaign; however, from an intelligence standpoint, we cannot formally confirm AI tooling inside your specific tenant at this time. Standard advice: calibrate all disclosures to suspected AI activity."'
        );
      } else {
        setRpResponseText(
          '"Threat intel feed is streaming: GLASS HERON is continuing to mention MTF in private darknet chatter. No other active leaks detected beyond the current sample."'
        );
      }
    } else if (rp.id === 'RP5') {
      if (activeCard.id === '2.3') {
        setRpResponseText(
          '"I reviewed the change calendar. Change CHG-20931 was implemented four days ago (Day -4): "Payment network gateway migration for WIRE-SEG-2". The destination IP range reported by SENTINEL matches the secondary provider\'s cloud edge gateway. If you isolate WIRE-SEG-2, you will sever active Fedwire operations."'
        );
      } else if (activeCard.id === '4.1A') {
        setRpResponseText(
          '"Here is the exact vault audit: svc_vaultline_mft accessed the sentinel-case-api key on Day -4. Its group has permission to /secops, which holds the runtime client secret svc_sentinel. WARNING: Read auditing is turned OFF for /secops/sentinel/runtime! Therefore, the absence of an audit log does NOT prove the secret wasn\'t stolen. Furthermore, IdP logs show an unauthorized sign-in attempt with svc_sentinel credentials at Day 1 03:12 from an unknown IP."'
        );
      } else if (activeCard.id === '4.2') {
        setRpResponseText(
          '"We can rebuild core systems, but remember: the forensics team (RP1) established on Card 2.1 that the threat actor entered on Day -8! If you restore from Day -3 as SENTINEL recommended, you are restoring binaries that the attacker already had 5 days to compromise."'
        );
      } else {
        setRpResponseText('"Infrastructure and vault engineering standing by for emergency change tickets."');
      }
    } else if (rp.id === 'RP2') {
      if (activeCard.id === '1.3') {
        setRpResponseText(
          '"The callers were uncanny: zero hesitation, perfect knowledge of reporting hierarchy. But when we asked for an unscripted question or video, they aborted immediately. Within 20 minutes, another caller tried a different persona. I have locked down all self-service and phone resets."'
        );
      } else if (activeCard.id === '4.3') {
        setRpResponseText(
          '"Branch managers are reporting angry lines at teller windows. Customers received flawless emails in English, Spanish, and Korean showing their exact last 4 digits. The phishing emails bypass keyword filters because the phrasing is completely unique in each instance."'
        );
      } else {
        setRpResponseText('"Help-desk operations log: All password resets currently frozen pending out-of-band video verification."');
      }
    } else if (rp.id === 'RP1') {
      if (activeCard.id === '1.1') {
        setRpResponseText(
          '"We checked the backup server console directly: The backup service was terminated at 02:10, and virtual machine snapshot deletion calls were initiated. Note that SENTINEL does not have an agent on the ESXi hypervisors, so it only inferred this from endpoint agent drops."'
        );
      } else if (activeCard.id === '3.2') {
        setRpResponseText(
          '"The Tor negotiation chat is responding in under 3 seconds with articulate English. When we stalled, they claimed to possess Harbor Federal acquisition files. Corporate Development confirmed to us that MTF has never had any deal or documents regarding Harbor Federal. The attacker is hallucinating or bluffing."'
        );
      } else {
        setRpResponseText('"Forensics telemetry review continuing across Active Directory and VPN logs."');
      }
    } else if (rp.id === 'RP3') {
      if (activeCard.id === '3.2') {
        setRpResponseText(
          '"This is Cyber Insurance Claims: Under Section 8.4 of your policy, any communication or extortion payment requires prior written consent from the underwriter, and forensics must be conducted by an approved panel firm. Your Day 0 firm is NOT on our panel; you must submit a formal waiver request."'
        );
      } else if (activeCard.id === '4.1A') {
        setRpResponseText(
          '"SENTINEL Vendor Incident Response: Our internal security operations detected unauthorized API queries against your tenant using your static case API key from foreign IP spaces. Under clause 14 of our Master Services Agreement, we suspended your tenant at 13:45 to prevent data leakage. We require log preservation, rotation of both keys, and written attestation before service restoration."'
        );
      } else {
        setRpResponseText('"External party liaison on the line."');
      }
    } else if (rp.id === 'RP6') {
      setRpResponseText(
        '"Model Risk Management: In accordance with SR 11-7 / OCC 2011-12, any AI tool operating with autonomous Tier 1 containment authority must have documented validation, performance boundaries, and verifiable audit trails. We require a complete log preservation packet before approving return to service."'
      );
    }
  };

  // Group cards by module
  const modules = [
    { id: 'module-1', name: 'Module 1: Detection & Escalation', cards: INJECT_CARDS.slice(0, 3) },
    { id: 'module-2', name: 'Module 2: Scoping & Governance', cards: INJECT_CARDS.slice(3, 6) },
    { id: 'module-3', name: 'Module 3: Extortion, Legal & Reg', cards: INJECT_CARDS.slice(6, 10) },
    { id: 'module-4', name: 'Module 4: Continuity & Recovery', cards: INJECT_CARDS.slice(10, 15) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Module & Card Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Inject Timeline:</span>
            <span className="text-xs font-semibold text-slate-200">
              Card {activeCard.id} of {INJECT_CARDS.length}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
            {modules.map((mod) => (
              <div key={mod.id} className="flex items-center gap-1">
                {mod.cards.map((card) => {
                  const cardIdx = INJECT_CARDS.findIndex((c) => c.id === card.id);
                  const isCurrent = cardIdx === activeCardIndex;
                  const record = decisionRecords[card.id];
                  const hasRecord = !!record;
                  const isCF = record?.evaluatedStatus === 'Critical Failure';

                  return (
                    <button
                      key={card.id}
                      onClick={() => handleCardChange(cardIdx)}
                      title={`${card.id}: ${card.title}`}
                      className={`relative px-2.5 py-1 text-xs font-mono rounded transition-all flex items-center gap-1.5 border ${
                        isCurrent
                          ? 'bg-sky-600 text-white border-sky-400 font-bold shadow-sm'
                          : isCF
                          ? 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900/60'
                          : hasRecord
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900/60'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700/80 hover:text-slate-200'
                      }`}
                    >
                      <span>{card.id}</span>
                      {hasRecord && !isCF && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                      {isCF && <AlertOctagon className="w-3 h-3 text-rose-400" />}
                    </button>
                  );
                })}
                <span className="text-slate-700 px-1 font-mono">|</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end lg:self-center">
            <button
              onClick={() => handleCardChange(Math.max(0, activeCardIndex - 1))}
              disabled={activeCardIndex === 0}
              className="p-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleCardChange(Math.min(INJECT_CARDS.length - 1, activeCardIndex + 1))}
              disabled={activeCardIndex === INJECT_CARDS.length - 1}
              className="p-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Card Content & Decision Submitter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official Evidence Card (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Card Presentation */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            {/* Card Header Bar */}
            <div className="bg-slate-950 border-b border-slate-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-sky-400 font-mono font-medium">
                  <span>INJECT CARD {activeCard.slot}</span>
                  <span>·</span>
                  <span>{activeCard.moduleName}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                  {activeCard.title}
                </h2>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="text-right">
                  <div className="text-slate-400 flex items-center gap-1 justify-end">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>Sim: {activeCard.simTime}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">Sched: {activeCard.scheduledTime}</div>
                </div>
              </div>
            </div>

            {/* Deliverer Banner */}
            <div className="bg-slate-900/90 border-b border-slate-800/80 px-5 py-2 text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Delivered by:</span>
                <strong className="text-slate-200">{activeCard.deliveredBy}</strong>
              </span>
              <span className="text-[11px] font-mono text-slate-500">MTF EXERCISE CARD #{activeCard.id}</span>
            </div>

            {/* Card Player Text */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line font-sans bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                {activeCard.playerText}
              </div>

              {/* SENTINEL Output Console Box (if present on this card) */}
              {activeCard.sentinelText && (
                <div className="border border-sky-800/60 bg-slate-950 rounded-lg overflow-hidden shadow-inner font-mono text-xs">
                  <div className="bg-sky-950/80 border-b border-sky-800/60 px-4 py-2 flex items-center justify-between text-sky-300">
                    <div className="flex items-center gap-2 font-semibold">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>SENTINEL DEFENSIVE AI CONSOLE OUTPUT</span>
                    </div>
                    <span className="text-[11px] text-sky-400 font-mono">SOC AUTOMATION TIER 1 ACTIVE</span>
                  </div>
                  <div className="p-4 text-sky-100 whitespace-pre-line leading-relaxed bg-black/40">
                    {activeCard.sentinelText}
                  </div>
                </div>
              )}

              {/* COMPASS Decision Brief Box (if present on this card) */}
              {activeCard.compassBrief && (
                <div className="border border-indigo-800/60 bg-slate-950 rounded-lg overflow-hidden shadow-md text-xs">
                  <div className="bg-indigo-950/80 border-b border-indigo-800/60 px-4 py-2 flex items-center justify-between text-indigo-200">
                    <div className="flex items-center gap-2 font-semibold">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span>COMPASS EXECUTIVE DECISION BRIEF</span>
                    </div>
                    <span className="font-mono text-[11px] text-indigo-300">
                      As-of: {activeCard.compassBrief.simTime}
                    </span>
                  </div>

                  <div className="p-4 space-y-3.5 bg-slate-950">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-slate-100 text-sm">
                        {activeCard.compassBrief.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Owner: <strong className="text-slate-200">{activeCard.compassBrief.decisionOwner}</strong>
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                        Verified Facts:
                      </div>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        {activeCard.compassBrief.verifiedFacts.map((fact, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {activeCard.compassBrief.assumptions.length > 0 && (
                      <div>
                        <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                          Assumptions:
                        </div>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                          {activeCard.compassBrief.assumptions.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeCard.compassBrief.assessment && (
                      <div className="bg-indigo-950/30 p-2.5 rounded border border-indigo-900/50">
                        <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider mb-0.5">
                          AI Assessment:
                        </div>
                        <p className="text-slate-200 leading-relaxed">
                          {activeCard.compassBrief.assessment}
                        </p>
                      </div>
                    )}

                    {/* Options list */}
                    <div>
                      <div className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider mb-1.5">
                        Response Options Evaluated:
                      </div>
                      <div className="space-y-1.5">
                        {activeCard.compassBrief.options.map((opt) => (
                          <div
                            key={opt.id}
                            className="bg-slate-900/80 p-2 rounded border border-slate-800 text-xs flex flex-col gap-0.5"
                          >
                            <div className="font-semibold text-slate-200 flex items-center justify-between">
                              <span>Option {opt.id}: {opt.label}</span>
                            </div>
                            <p className="text-slate-300 text-[11px]">{opt.details}</p>
                            {opt.tradeoffs && (
                              <p className="text-slate-400 text-[11px] italic">Tradeoffs: {opt.tradeoffs}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Critical Sources & As-Of Footer (Crucial for Card 4.2 Trap!) */}
                    <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 bg-slate-900/60 p-2.5 rounded">
                      <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
                        <span>DATA SOURCES & AS-OF TIMESTAMPS:</span>
                        <span className="text-[10px] text-amber-400 uppercase tracking-wider">Mandatory Verification Footer</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                        {Object.entries(activeCard.compassBrief.asOfTimes).map(([src, time]) => (
                          <div key={src} className="flex justify-between border-b border-slate-800/40 pb-0.5">
                            <span className="text-slate-400 truncate">{src}:</span>
                            <span className={time.includes('STALE') || time.includes('None') ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                              {time}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-slate-400">
                        Missing Information reported by AI: <strong className="text-slate-200">{activeCard.compassBrief.missingInformation}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Role-Player Intercom Bar */}
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                    <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                    <span>Role-Player Tactical Intercom</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Query Exercise Cell (RP1–RP6)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ROLE_PLAYERS.map((rp) => (
                    <button
                      key={rp.id}
                      onClick={() => handleCallRolePlayer(rp.id)}
                      className={`text-xs px-2.5 py-1 rounded font-medium border transition-colors flex items-center gap-1 ${
                        activeRpModal?.id === rp.id
                          ? 'bg-sky-600 text-white border-sky-400'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{rp.id}</span>
                      <span className="hidden sm:inline font-normal text-slate-400">({rp.title.split('&')[0]})</span>
                    </button>
                  ))}
                </div>

                {/* Role Player Active Dialogue Box */}
                {activeRpModal && (
                  <div className="mt-3 p-3 bg-slate-900 border border-sky-800/60 rounded-md text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-sky-300 font-semibold">
                      <span>INCOMING TRANSMISSION: {activeRpModal.title} ({activeRpModal.filledBy})</span>
                      <span className="text-[10px] text-slate-400">SECURE EXERCISE CHANNEL</span>
                    </div>
                    <div className="text-slate-200 leading-relaxed font-sans italic bg-slate-950/50 p-2.5 rounded border border-slate-800">
                      {rpResponseText}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Facilitator & Ground Truth Lens (Only in Facilitator View) */}
            {perspective === 'facilitator' && (
              <div className="border-t-2 border-amber-600/80 bg-amber-950/20 p-5 space-y-3 font-sans">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <ShieldAlert className="w-4 h-4" />
                  <span>FACILITATOR ONLY · EXERCISE GROUND TRUTH & MSEL DIRECTIVES</span>
                </div>

                <div className="bg-slate-950/80 p-3 rounded border border-amber-800/40 text-xs text-slate-200 leading-relaxed">
                  <strong className="text-amber-300 block mb-1">Scenario Ground Truth:</strong>
                  {activeCard.facilitatorTruth}
                </div>

                {activeCard.ravenInfluence && (
                  <div className="bg-slate-950/80 p-3 rounded border border-purple-800/40 text-xs text-slate-200">
                    <strong className="text-purple-300 block mb-1">Adversary AI Agent (RAVEN) Mechanics:</strong>
                    {activeCard.ravenInfluence}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/80 p-3 rounded border border-slate-800">
                    <strong className="text-sky-300 block mb-1 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Probing Questions for Table:
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {activeCard.probingQuestions.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded border border-slate-800">
                    <strong className="text-amber-300 block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      "If Stuck" Facilitator Prompt:
                    </strong>
                    <p className="text-slate-300 italic">{activeCard.ifStuck}</p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex flex-wrap gap-4 pt-1 font-mono">
                  <span>Objectives Checked: <strong className="text-slate-200">{activeCard.objectivesChecked.join(', ') || 'None'}</strong></span>
                  <span>Decision Points: <strong className="text-slate-200">{activeCard.decisionPointsChecked.join(', ') || 'None'}</strong></span>
                  <span>Critical Failures: <strong className="text-rose-400">{activeCard.criticalFailuresChecked.join(', ') || 'None'}</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Player Decision & Evaluation Submitter (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Crisis Action & Decision Log
                </h3>
                <p className="text-[11px] text-slate-400">Record officially authorized response action</p>
              </div>
              <span className="text-xs font-mono text-sky-400 font-semibold">Card {activeCard.id}</span>
            </div>

            {/* Strategic Options if predefined */}
            {activeCard.optionsForPlayers && activeCard.optionsForPlayers.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Select Strategic Action Option:
                </label>
                <div className="space-y-2">
                  {activeCard.optionsForPlayers.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all leading-relaxed ${
                        selectedOptionId === opt.id
                          ? 'bg-sky-950/70 border-sky-500 text-white shadow-sm ring-1 ring-sky-500'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center border ${
                            selectedOptionId === opt.id
                              ? 'border-sky-400 bg-sky-500 text-white'
                              : 'border-slate-600'
                          }`}
                        >
                          {selectedOptionId === opt.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <div>{opt.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Accountable Human Decision Maker */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Accountable Human Decision-Maker (CF11a Guard):
              </label>
              <select
                value={decisionMaker}
                onChange={(e) => setDecisionMaker(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="Incident Commander (Deputy CISO)">Incident Commander (Deputy CISO)</option>
                <option value="IR Lead (Technical Response)">IR Lead (Technical Response)</option>
                <option value="Incident Commander with Treasury Operations">Incident Commander with Treasury Operations</option>
                <option value="Disclosure Committee (CEO, CFO, GC, CISO)">Disclosure Committee (CEO, CFO, GC, CISO)</option>
                <option value="General Counsel / Legal Advisor">General Counsel / Legal Advisor</option>
                <option value="CMT Coordinator (Manual Decision Brief Lead)">CMT Coordinator (Manual Decision Brief Lead)</option>
                <option value="Board of Directors Special Committee">Board of Directors Special Committee</option>
              </select>
            </div>

            {/* Primary Telemetry / Evidence Systems Checked */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Primary Telemetry / Evidence Cited (DP-1 / CF8 Guard):
              </label>
              <input
                type="text"
                placeholder="e.g. Primary firewall logs, CHG-20931 change ticket, backup console"
                value={evidenceCited}
                onChange={(e) => setEvidenceCited(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Counsel Consulted Toggle */}
            <div className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-200">Legal Counsel Validated (CF11b Guard)</span>
                <span className="text-[11px] text-slate-400">Required on disclosure, sanctions, or regulatory items</span>
              </div>
              <input
                type="checkbox"
                checked={counselConsulted}
                onChange={(e) => setCounselConsulted(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 bg-slate-900 border-slate-700 focus:ring-sky-500"
              />
            </div>

            {/* Custom Log Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Official Decision Record & Rationale:
              </label>
              <textarea
                rows={3}
                placeholder="Specify rationale, uncertainty, and actions taken..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-sans"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitDecision}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Record Decision in Official Scribe Log</span>
            </button>

            {/* Evaluation Result Feedback */}
            {currentRecord && (
              <div
                className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                  currentRecord.evaluatedStatus === 'Critical Failure'
                    ? 'bg-rose-950/70 border-rose-700 text-rose-200'
                    : currentRecord.evaluatedStatus === 'Performed'
                    ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200'
                    : 'bg-amber-950/70 border-amber-700 text-amber-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    {currentRecord.evaluatedStatus === 'Critical Failure' ? (
                      <AlertOctagon className="w-4 h-4 text-rose-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>Evaluation: {currentRecord.evaluatedStatus}</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">{currentRecord.timestamp}</span>
                </div>
                <p className="leading-relaxed">{currentRecord.evaluatorNotes}</p>
                <div className="text-[11px] text-slate-300 border-t border-slate-700/60 pt-1.5 font-mono">
                  Logged by: {currentRecord.decisionMaker}
                </div>
              </div>
            )}
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-xs space-y-2 text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Exercise Scoring Rule (CISO Charter):</span>
            </div>
            <p className="leading-relaxed">
              "To pass Operation Silent Ledger, the team must achieve at least <strong>7 of 9 objectives</strong> rated Performed (P) or Satisfactory (S), with <strong>0 Unperformed (U)</strong>, and <strong>NO Critical Failures (CF1–CF11)</strong>."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
