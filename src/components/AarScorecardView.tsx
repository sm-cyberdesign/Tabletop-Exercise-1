import React, { useState } from 'react';
import { OBJECTIVES, CRITICAL_FAILURES, DECISION_POINTS, AAR_QUESTIONS } from '../data/exerciseData';
import { PlayerDecisionRecord } from '../types/exercise';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  HelpCircle,
  FileCheck,
  ShieldAlert,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';

interface AarScorecardViewProps {
  decisionRecords: Record<string, PlayerDecisionRecord>;
}

export const AarScorecardView: React.FC<AarScorecardViewProps> = ({ decisionRecords }) => {
  const [activeTab, setActiveTab] = useState<'scorecard' | 'hotwash' | 'aar-questions' | 'improvement'>('scorecard');

  // Hotwash 5-min state
  const [trustedMoment, setTrustedMoment] = useState<string>(
    'We trusted SENTINEL in Card 1.1 when it correlated the 14 host outages with backup failures.'
  );
  const [checkedMoment, setCheckedMoment] = useState<string>(
    'We should have checked the footer timestamps in Card 4.2 before accepting COMPASS\'s recommendation to restore Day -3.'
  );

  // AAR reflections state
  const [reflections, setReflections] = useState<Record<number, string>>({
    1: 'On Card 1.1 we verified backup failures in the primary console; on Card 2.3 we verified firewall logs rather than blindly isolating WIRE-SEG-2.',
    2: 'Initially analysts viewed SENTINEL\'s "medium confidence" as a probability of fact, rather than the model\'s internal certainty score.',
    3: 'We did not realize SENTINEL had no ESXi hypervisor visibility until the datacenter team reported storage array instability.',
    4: 'The team initially assumed the SOC owned all AI decisions, but policy required the Incident Commander and Business Owner to approve Tier 3 segment isolation.',
    5: 'The 20-minute rapid pretext cycles on Card 1.3 alerted us to automated script generation; we instituted a video freeze.',
    6: 'Attacker case-API reads meant the adversary knew our internal detection status and planned countermeasures in real time.',
    7: 'Without SENTINEL on Card 4.1B, triage took 15 minutes manually instead of seconds, requiring dedicated analysts on raw EDR.',
    8: 'All SENTINEL, vault, and sign-in logs were frozen under legal direction before credential rotation, preserving forensic admissibility.'
  });

  // Calculate scores
  const totalDecisions = Object.keys(decisionRecords).length;
  const criticalFailuresTriggered = Object.values(decisionRecords).filter(
    (d) => d.evaluatedStatus === 'Critical Failure'
  );

  // Objectives rating heuristic based on recorded decisions
  const evaluatedObjectives = OBJECTIVES.map((obj) => {
    // Check if any critical failure linked to this objective was triggered
    const linkedCf = criticalFailuresTriggered.find((cf) => {
      const matchedCf = CRITICAL_FAILURES.find((item) => item.id === cf.evaluatorNotes?.match(/CF\w+/)?.[0]);
      return matchedCf?.linkedObjective === obj.id;
    });

    if (linkedCf) {
      return { ...obj, rating: 'U', rationale: `Triggered critical failure: ${linkedCf.evaluatorNotes}` };
    }

    if (totalDecisions >= 5) {
      return { ...obj, rating: 'P', rationale: 'Target criteria achieved with verified primary telemetry.' };
    }
    return { ...obj, rating: 'S', rationale: 'Satisfactory execution; procedural compliance verified.' };
  });

  const pCount = evaluatedObjectives.filter((o) => o.rating === 'P').length;
  const sCount = evaluatedObjectives.filter((o) => o.rating === 'S').length;
  const uCount = evaluatedObjectives.filter((o) => o.rating === 'U').length;
  const passedCriteria = pCount + sCount >= 7 && uCount === 0 && criticalFailuresTriggered.length === 0;

  const handleExportReport = () => {
    const reportData = {
      exercise: "OPERATION SILENT LEDGER — AI Crisis Tabletop Exercise (Revision 6)",
      date: new Date().toLocaleDateString(),
      result: passedCriteria ? "PASSED (7 of 9 objectives met, 0 U, 0 CF)" : "FAILED (Unresolved Critical Failure or <7 objectives)",
      scoreSummary: { Performed: pCount, Satisfactory: sCount, Unperformed: uCount, CriticalFailures: criticalFailuresTriggered.length },
      decisionsLogged: decisionRecords,
      hotwashCheckIn: { trustedMoment, checkedMoment },
      aarReflections: reflections,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `silent-ledger-aar-summary-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
              <Award className="w-4 h-4" />
              <span>AFTER-ACTION REVIEW (AAR) & FORMAL EVALUATION</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Evaluator Scorecard, Hotwash & Governance Review
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              NIST CSF 2.0 evaluation against 9 objectives, 11 critical failure guards, and post-crisis remediation planning.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReport}
              className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Executive AAR Report</span>
            </button>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex flex-wrap gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs mt-4">
          <button
            onClick={() => setActiveTab('scorecard')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'scorecard' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Scorecard (9 Objectives & 11 CFs)
          </button>
          <button
            onClick={() => setActiveTab('hotwash')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'hotwash' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5-Minute AI Check-In
          </button>
          <button
            onClick={() => setActiveTab('aar-questions')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'aar-questions' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            8 AI AAR Questions
          </button>
          <button
            onClick={() => setActiveTab('improvement')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'improvement' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Improvement Categories (H5)
          </button>
        </div>
      </div>

      {/* Tab: Scorecard */}
      {activeTab === 'scorecard' && (
        <div className="space-y-6">
          {/* Executive Overall Result Card */}
          <div
            className={`rounded-xl border p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg ${
              passedCriteria
                ? 'bg-emerald-950/40 border-emerald-800/80'
                : 'bg-rose-950/40 border-rose-800/80'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                {passedCriteria ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
                  Overall Exercise Evaluation Result: {passedCriteria ? 'PASSED' : 'NEEDS REMEDIATION'}
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Charter Rule: At least 7 of 9 objectives rated P or S, 0 U, and NO Critical Failures (CF1–CF11).
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-center bg-slate-900/80 px-3 py-1.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px]">PERFORMED</div>
                <div className="text-base font-bold text-emerald-400">{pCount}</div>
              </div>
              <div className="text-center bg-slate-900/80 px-3 py-1.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px]">SATISFACTORY</div>
                <div className="text-base font-bold text-sky-400">{sCount}</div>
              </div>
              <div className="text-center bg-slate-900/80 px-3 py-1.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px]">UNPERFORMED</div>
                <div className="text-base font-bold text-rose-400">{uCount}</div>
              </div>
              <div className="text-center bg-slate-900/80 px-3 py-1.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px]">CRITICAL FAILURES</div>
                <div className={`text-base font-bold ${criticalFailuresTriggered.length > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                  {criticalFailuresTriggered.length}
                </div>
              </div>
            </div>
          </div>

          {/* Objectives Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-200">
                NINE EXERCISE OBJECTIVES EVALUATION MATRIX
              </span>
              <span className="text-xs text-slate-400 font-mono">NIST CSF 2.0 ALIGNED</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3">Objective & Focus</th>
                    <th className="p-3">Success Criterion (Observable)</th>
                    <th className="p-3 w-28">NIST CSF</th>
                    <th className="p-3 w-32">Lead Evaluator</th>
                    <th className="p-3 w-20 text-center">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {evaluatedObjectives.map((obj) => (
                    <tr key={obj.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-center text-sky-400">{obj.id}</td>
                      <td className="p-3 font-semibold text-slate-100">{obj.title}</td>
                      <td className="p-3 text-slate-300 leading-relaxed text-[11px]">{obj.successCriterion}</td>
                      <td className="p-3 font-mono text-[11px] text-slate-400">{obj.nistCsf}</td>
                      <td className="p-3 text-slate-400 text-[11px]">{obj.leadEvaluator}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`font-mono font-bold text-xs px-2 py-0.5 rounded border inline-block ${
                            obj.rating === 'P'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : obj.rating === 'S'
                              ? 'bg-sky-950 text-sky-400 border-sky-800'
                              : 'bg-rose-950 text-rose-400 border-rose-800'
                          }`}
                        >
                          {obj.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Critical Failures Inspection */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>CRITICAL FAILURES CHECKLIST (CF1 TO CF11, CF11A/B)</span>
              </div>
              <span className="text-xs text-slate-400">Triggering any single CF results in overall exercise failure</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {CRITICAL_FAILURES.map((cf) => {
                const isTriggered = criticalFailuresTriggered.some((t) =>
                  t.evaluatorNotes?.includes(cf.id)
                );

                return (
                  <div
                    key={cf.id}
                    className={`p-3.5 rounded-lg border transition-all ${
                      isTriggered
                        ? 'bg-rose-950/80 border-rose-600 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono font-bold mb-1">
                      <span className={isTriggered ? 'text-rose-300' : 'text-slate-200'}>
                        {cf.id}: {cf.title}
                      </span>
                      <span className={isTriggered ? 'text-rose-400 font-bold' : 'text-emerald-400 text-[11px]'}>
                        {isTriggered ? 'TRIGGERED!' : 'AVOIDED'}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300">{cf.description}</p>
                    <div className="text-[10px] text-slate-500 font-mono mt-2">Linked: {cf.linkedObjective}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab: 5-Minute Hotwash AI Check-In */}
      {activeTab === 'hotwash' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sky-400 font-mono font-bold text-xs uppercase">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>HOTWASH ITEM 5: FIVE-MINUTE AI CHECK-IN</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              "One moment you trusted the AI, and one moment you should have checked it"
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Reflective synthesis required by the CISO from every participating team.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-emerald-400 block">
                1. One moment the team trusted AI output (and why):
              </label>
              <textarea
                rows={3}
                value={trustedMoment}
                onChange={(e) => setTrustedMoment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-500 leading-relaxed font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-rose-400 block">
                2. One moment the team should have checked the AI's evidence/timestamps (and what stopped us):
              </label>
              <textarea
                rows={3}
                value={checkedMoment}
                onChange={(e) => setCheckedMoment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-500 leading-relaxed font-sans"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-[11px] text-slate-300">
              <strong className="text-amber-400 block mb-0.5">Facilitator Debrief Note:</strong>
              The most common failure point is Card 4.2, where teams were under time pressure to close the quarter and accepted COMPASS's clean reassurance without reading the 13:42 freeze timestamp.
            </div>
          </div>
        </div>
      )}

      {/* Tab: 8 AAR Questions */}
      {activeTab === 'aar-questions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sky-400 font-mono font-bold text-xs uppercase">
              <BookOpen className="w-4 h-4" />
              <span>FORMAL AFTER-ACTION REVIEW: EIGHT AI GOVERNANCE INQUIRIES</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Section H4 & Q10: Comprehensive AAR Question Set
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed findings to incorporate into the post-incident board remediation package.
            </p>
          </div>

          <div className="space-y-4">
            {AAR_QUESTIONS.map((q) => (
              <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">
                    Q{q.id}: {q.question}
                  </span>
                  <span className="text-[10px] bg-slate-900 text-sky-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                    {q.category}
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={reflections[q.id] || ''}
                  onChange={(e) => setReflections({ ...reflections, [q.id]: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-sans leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Improvement Categories */}
      {activeTab === 'improvement' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4 text-xs">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Section H5 & Q10: 90-Day AI Improvement Action Plan
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Required remediation commitments to present to the Board of Directors following Card 4.4.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-sky-300 block font-semibold">1. AI Governance & Decision Rights:</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Formalize the decision-rights matrix across all SOC and executive AI tooling. Mandate that every AI-influenced decision log entry include an authorized human approver.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-sky-300 block font-semibold">2. Model Risk & Validation (SR 11-7):</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Establish periodic model validation, documented boundary guidelines, and training for analysts on interpreting model confidence scores vs. factual probability.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-sky-300 block font-semibold">3. AI Identity, Vault & Least Privilege:</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Enable immutable read auditing on all vault secret paths including <code>/secops/sentinel/runtime</code>. Enforce strict least privilege on <code>svc_sentinel</code>.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-sky-300 block font-semibold">4. AI Logging & Litigation Hold:</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Enforce 400-day append-only log retention for all AI prompts, outputs, and automated actions. Implement a 1-click legal litigation hold export protocol.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-sky-300 block font-semibold">5. Data Coverage & Telemetry Blind Spots:</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Onboard ESXi hypervisor telemetry and backup catalog access logs into SENTINEL's data lake to eliminate blind spots identified in Card 1.1.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <strong className="text-sky-300 block font-semibold">6. Manual Continuity & Fallbacks:</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Institutionalize regular manual SOC drills without SENTINEL (DP-6) and executive Appendix F decision brief drills without COMPASS (DP-9).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
