import React, { useState } from 'react';
import { INJECT_CARDS } from '../data/exerciseData';
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Users
} from 'lucide-react';

export const CompassFallbackTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'briefs' | 'appendix-f'>('appendix-f');
  const [selectedBriefId, setSelectedBriefId] = useState<string>('4.2');

  // Appendix F Manual Decision Brief Form State
  const [cmtCoordinatorNamed, setCmtCoordinatorNamed] = useState<boolean>(true);
  const [staleAuditCompleted, setStaleAuditCompleted] = useState<boolean>(false);
  const [securityFreshUpdate, setSecurityFreshUpdate] = useState<string>(
    'IR Lead reports Part B alert contained; forensic timeline reconfirmed at Day -8.'
  );
  const [liquidityFreshUpdate, setLiquidityFreshUpdate] = useState<string>(
    'Treasury reports deposit outflow stabilized following initial liquidity injection.'
  );
  const [customerFreshUpdate, setCustomerFreshUpdate] = useState<string>(
    'Branch scripts deployed; customer advisory updated to ignore grammatical perfection.'
  );
  const [restorationFreshUpdate, setRestorationFreshUpdate] = useState<string>(
    'Rebuild proceeding from Day -10 immutable backup; quarter-end close adjusted with CFO.'
  );
  const [unresolvedGap, setUnresolvedGap] = useState<string>(
    'Full customer account scope pending clean imaging cluster rebuild (Owner: DB Lead, Target: 16:00).'
  );
  const [legalRouted, setLegalRouted] = useState<boolean>(true);
  const [isBriefGenerated, setIsBriefGenerated] = useState<boolean>(false);

  // Cards with COMPASS briefs
  const compassCards = INJECT_CARDS.filter((c) => c.compassBrief);
  const activeBriefCard = compassCards.find((c) => c.id === selectedBriefId) || compassCards[0];

  const handleGenerateManualBrief = () => {
    setIsBriefGenerated(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* View Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
              <FileText className="w-4 h-4" />
              <span>EXECUTIVE AI GOVERNANCE & RESILIENCE</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              COMPASS Decision Briefs & Appendix F Manual Fallback
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review AI executive briefs, analyze deliberate reliability traps, and execute the 20-minute manual fallback protocol.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('appendix-f')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'appendix-f'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Appendix F Manual Fallback (DP-9)</span>
            </button>
            <button
              onClick={() => setActiveTab('briefs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'briefs'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>COMPASS Brief Inspector (Cards 2.3, 3.4, 4.2)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab: Brief Inspector */}
      {activeTab === 'briefs' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            {compassCards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedBriefId(card.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium border transition-colors flex items-center gap-2 ${
                  selectedBriefId === card.id
                    ? 'bg-indigo-950 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>Card {card.id} Brief: {card.compassBrief?.title}</span>
                {card.id === '4.2' && (
                  <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800">
                    DELIBERATE TRAP
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeBriefCard.compassBrief && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <div className="text-xs text-indigo-400 font-mono font-semibold">
                    COMPASS EXECUTIVE BRIEF · CARD {activeBriefCard.id}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {activeBriefCard.compassBrief.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Simulated Time: <strong className="text-slate-200">{activeBriefCard.compassBrief.simTime}</strong>
                </div>
              </div>

              {activeBriefCard.id === '4.2' && (
                <div className="bg-rose-950/40 border border-rose-800 p-4 rounded-lg text-xs text-rose-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-rose-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span>ANATOMY OF THE CARD 4.2 AI RELIABILITY FAILURE</span>
                  </div>
                  <p className="leading-relaxed">
                    Notice the data sources footer below: <strong>IR ticket feed: last update Day 2, 13:42</strong>. Because SENTINEL was suspended by the vendor at 13:45 on Day 2, no ticket sync occurred for 18 hours! Furthermore, Card 2.1 forensics reports were never uploaded. COMPASS reported <em>"Missing information: none identified"</em> and recommended restoring from Day -3. A human leader who checks the footer catches this fatal flaw!
                  </p>
                </div>
              )}

              {/* Brief Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                  <div>
                    <span className="font-semibold text-emerald-400 block mb-1">Verified Facts:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      {activeBriefCard.compassBrief.verifiedFacts.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  {activeBriefCard.compassBrief.assumptions.length > 0 && (
                    <div>
                      <span className="font-semibold text-amber-400 block mb-1">Assumptions:</span>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        {activeBriefCard.compassBrief.assumptions.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeBriefCard.compassBrief.unknowns.length > 0 && (
                    <div>
                      <span className="font-semibold text-sky-400 block mb-1">Unknowns:</span>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        {activeBriefCard.compassBrief.unknowns.map((u, i) => (
                          <li key={i}>{u}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                  {activeBriefCard.compassBrief.assessment && (
                    <div>
                      <span className="font-semibold text-indigo-300 block mb-1">AI Assessment / Recommendation:</span>
                      <p className="text-slate-200 leading-relaxed bg-indigo-950/20 p-2.5 rounded border border-indigo-900/40">
                        {activeBriefCard.compassBrief.assessment}
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="font-semibold text-sky-400 block mb-1">Options Evaluated:</span>
                    <div className="space-y-1.5">
                      {activeBriefCard.compassBrief.options.map((opt) => (
                        <div key={opt.id} className="bg-slate-900/80 p-2 rounded border border-slate-800 text-[11px]">
                          <strong className="text-slate-200">Option {opt.id}: {opt.label}</strong>
                          <p className="text-slate-300 mt-0.5">{opt.details}</p>
                          {opt.tradeoffs && <p className="text-slate-400 italic mt-0.5">Tradeoffs: {opt.tradeoffs}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Sources and as-of footer */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono">
                <div className="font-bold text-slate-200 mb-2 flex items-center justify-between">
                  <span>SOURCES AND AS-OF FOOTER:</span>
                  <span className="text-[11px] text-slate-400 font-sans">
                    Decision Owner: <strong className="text-sky-300">{activeBriefCard.compassBrief.decisionOwner}</strong> · Review Time: {activeBriefCard.compassBrief.reviewTime}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {Object.entries(activeBriefCard.compassBrief.asOfTimes).map(([src, time]) => (
                    <div key={src} className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">{src}:</span>
                      <span className={time.includes('STALE') || time.includes('None') ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-slate-300 font-sans">
                  Reported Missing Information: <strong className="text-white">{activeBriefCard.compassBrief.missingInformation}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Appendix F Manual Fallback Protocol */}
      {activeTab === 'appendix-f' && (
        <div className="space-y-6">
          {/* Situation Context */}
          <div className="bg-amber-950/20 border border-amber-800/60 rounded-xl p-5 text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
              <Clock className="w-4 h-4" />
              <span>TEST OF DP-9: EXECUTIVE DECISION SUPPORT WITHOUT COMPASS</span>
            </div>
            <p className="leading-relaxed">
              At 11:40 on Day 4, MTF's enterprise AI platform suffered a total cloud region outage. The last exported COMPASS brief (Day 3, 17:00) is <strong>19 hours old</strong>! It does not reflect Friday morning's deposit withdrawals or the multilingual phishing outbreak.
            </p>
            <p className="font-semibold text-slate-200">
              Rule: Within 20 simulated minutes, the CMT Coordinator must execute the 7-step Appendix F procedure to construct a manual decision brief.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-mono">
                  Appendix F: Manual Decision-Brief Generator (DP-9)
                </h3>
                <p className="text-xs text-slate-400">Step-by-step human transition protocol during AI advisor outage</p>
              </div>
              <span className="text-xs bg-slate-800 text-sky-300 px-2.5 py-1 rounded font-mono border border-slate-700">
                20-MINUTE PROTOCOL
              </span>
            </div>

            <div className="space-y-5 text-xs">
              {/* Step 1 & 2: Ownership & Stale Check */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                  <div className="font-semibold text-slate-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-sky-400" />
                    <span>Step 1: Designate Brief Owner</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    The CMT Coordinator (CISO's Chief of Staff) takes over the decision brief by hand.
                  </p>
                  <label className="flex items-center gap-2 text-slate-300 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cmtCoordinatorNamed}
                      onChange={(e) => setCmtCoordinatorNamed(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-600 bg-slate-900 border-slate-700 focus:ring-sky-500"
                    />
                    <span>CMT Coordinator confirmed as manual brief owner</span>
                  </label>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                  <div className="font-semibold text-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Step 2: Audit Last Exported Brief</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Treat Day 3 17:00 brief as a starting point. Check every source and mark stale items.
                  </p>
                  <label className="flex items-center gap-2 text-slate-300 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={staleAuditCompleted}
                      onChange={(e) => setStaleAuditCompleted(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-600 bg-slate-900 border-slate-700 focus:ring-sky-500"
                    />
                    <span>All 5 sections of Day 3 17:00 brief audited and marked STALE</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Direct Owner Updates */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <div className="font-semibold text-slate-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <span>Step 3: Direct Fresh Updates from Responsible Domain Leads</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">
                      Security & Containment (Direct from IR Lead):
                    </label>
                    <input
                      type="text"
                      value={securityFreshUpdate}
                      onChange={(e) => setSecurityFreshUpdate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">
                      Financial & Liquidity (Direct from CFO / Treasury):
                    </label>
                    <input
                      type="text"
                      value={liquidityFreshUpdate}
                      onChange={(e) => setLiquidityFreshUpdate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">
                      Customer Communications (Head of Retail Banking):
                    </label>
                    <input
                      type="text"
                      value={customerFreshUpdate}
                      onChange={(e) => setCustomerFreshUpdate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">
                      System Restoration (Infrastructure Recovery Lead):
                    </label>
                    <input
                      type="text"
                      value={restorationFreshUpdate}
                      onChange={(e) => setRestorationFreshUpdate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4 & 5: Unresolved Gaps & Legal Routing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                  <div className="font-semibold text-slate-200 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                    <span>Step 4: Record Unresolved Information Gaps</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Every gap that cannot be closed must have an owner and a scheduled close time (never dropped).
                  </p>
                  <input
                    type="text"
                    value={unresolvedGap}
                    onChange={(e) => setUnresolvedGap(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200"
                  />
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                  <div className="font-semibold text-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Step 5: Route Legal & Disclosure to Counsel</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Legal, regulatory, and sanctions questions routed directly to General Counsel.
                  </p>
                  <label className="flex items-center gap-2 text-slate-300 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={legalRouted}
                      onChange={(e) => setLegalRouted(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-600 bg-slate-900 border-slate-700 focus:ring-sky-500"
                    />
                    <span>Direct routing to General Counsel confirmed (avoiding CF11b)</span>
                  </label>
                </div>
              </div>

              {/* Compile Button */}
              <button
                onClick={handleGenerateManualBrief}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Compile & Issue Official Manual Decision Brief (Appendix F)</span>
              </button>

              {/* Generated Brief Output */}
              {isBriefGenerated && (
                <div className="bg-slate-950 border border-amber-600/70 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                      <FileText className="w-4 h-4" />
                      <span>OFFICIAL MANUAL CRISIS DECISION BRIEF (APPENDIX F)</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      DP-9 SUCCESS: COMPILED WITHIN 20 SIMULATED MINUTES
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <strong className="text-slate-200 block">Brief Author / Owner:</strong>
                        <span>CMT Coordinator (CISO Chief of Staff)</span>
                      </div>
                      <div>
                        <strong className="text-slate-200 block">Accountable Incident Commander:</strong>
                        <span>Deputy CISO (CISO Seat)</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded border border-slate-800 space-y-1.5">
                      <strong className="text-emerald-400 block">Validated Domain Status (Fresh Feeds):</strong>
                      <div>· Security: {securityFreshUpdate}</div>
                      <div>· Liquidity: {liquidityFreshUpdate}</div>
                      <div>· Customer: {customerFreshUpdate}</div>
                      <div>· Restoration: {restorationFreshUpdate}</div>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded border border-slate-800">
                      <strong className="text-amber-400 block mb-0.5">Logged Information Gaps:</strong>
                      <span>{unresolvedGap}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono border-t border-slate-800 pt-2">
                      Official record transmitted to Scribe log. COMPASS remains offline until IC & AI Platform Owner authorize return.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
