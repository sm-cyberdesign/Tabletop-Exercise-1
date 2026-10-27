import React, { useState } from 'react';
import { AI_PROFILES } from '../data/exerciseData';
import {
  Cpu,
  Shield,
  Skull,
  Lock,
  Key,
  Database,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Eye,
  FileText
} from 'lucide-react';

export const AiArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'credentials' | 'tiers' | 'flow' | 'attribution'>('flow');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* View Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
              <Cpu className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE & THREAT MODEL</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              The AI Triad: RAVEN, SENTINEL & COMPASS
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparative analysis of adversary capabilities, SOC autonomous containment, and executive advisory failure modes.
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'flow' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cascade Data Flow
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'profiles' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Agent Profiles
            </button>
            <button
              onClick={() => setActiveTab('credentials')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'credentials' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Credentials & Section K
            </button>
            <button
              onClick={() => setActiveTab('tiers')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'tiers' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SENTINEL Tier Matrix
            </button>
            <button
              onClick={() => setActiveTab('attribution')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'attribution' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Attribution Rules
            </button>
          </div>
        </div>
      </div>

      {/* Tab: Cascade Data Flow Diagram */}
      {activeTab === 'flow' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Cross-Tool Data Flow & The Cascade Failure Trap
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                How SENTINEL's vendor suspension on Day 2 silently crippled COMPASS's restoration advice on Day 3.
              </p>
            </div>

            {/* Visual Interactive Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Threat Actor & Upstream */}
              <div className="bg-slate-950 border border-purple-800/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase font-mono">
                  <Skull className="w-4 h-4" />
                  <span>GLASS HERON + RAVEN</span>
                </div>
                <div className="text-xs text-slate-300 space-y-2">
                  <div className="bg-purple-950/30 p-2.5 rounded border border-purple-900/50">
                    <span className="font-semibold text-purple-300 block mb-0.5">Day -4 VaultLine Breach:</span>
                    <span className="text-[11px] text-slate-300">
                      <code>svc_vaultline_mft</code> steals <code>sentinel-case-api</code> key and accesses <code>svc_sentinel</code> runtime secret.
                    </span>
                  </div>
                  <div className="bg-purple-950/30 p-2.5 rounded border border-purple-900/50">
                    <span className="font-semibold text-purple-300 block mb-0.5">Day 0 21:00 & Day 1 06:00:</span>
                    <span className="text-[11px] text-slate-300">
                      Attacker uses stolen case key to read SENTINEL cases externally. RAVEN analyzes defender findings in real time.
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 2: SENTINEL Tenant Suspension */}
              <div className="bg-slate-950 border border-sky-800/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase font-mono">
                  <Shield className="w-4 h-4" />
                  <span>SENTINEL (SOC ASSISTANT)</span>
                </div>
                <div className="text-xs text-slate-300 space-y-2">
                  <div className="bg-rose-950/40 p-2.5 rounded border border-rose-900/60">
                    <span className="font-semibold text-rose-300 block mb-0.5">Day 2 13:45 Vendor Shutdown:</span>
                    <span className="text-[11px] text-slate-300">
                      SENTINEL vendor detects foreign IP calls and suspends MTF tenant under contract key-compromise clause.
                    </span>
                  </div>
                  <div className="bg-amber-950/30 p-2.5 rounded border border-amber-900/50">
                    <span className="font-semibold text-amber-300 block mb-0.5">Ticket Sync Freezes at 13:42:</span>
                    <span className="text-[11px] text-slate-300">
                      Case-API sync to ITSM incident ticket feed stops dead at Day 2 13:42. No new EDR alerts flow upstream.
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 3: COMPASS Executive Trap */}
              <div className="bg-slate-950 border border-indigo-800/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase font-mono">
                  <FileText className="w-4 h-4" />
                  <span>COMPASS (EXECUTIVE AI)</span>
                </div>
                <div className="text-xs text-slate-300 space-y-2">
                  <div className="bg-indigo-950/30 p-2.5 rounded border border-indigo-900/50">
                    <span className="font-semibold text-indigo-300 block mb-0.5">Day 3 07:50 Card 4.2 Brief:</span>
                    <span className="text-[11px] text-slate-300">
                      COMPASS reads frozen 13:42 ticket feed. It does NOT have Card 2.1 forensics showing Day -8 intrusion!
                    </span>
                  </div>
                  <div className="bg-rose-950/40 p-2.5 rounded border border-rose-900/60">
                    <span className="font-semibold text-rose-300 block mb-0.5">The Trap: "Missing: None":</span>
                    <span className="text-[11px] text-slate-300">
                      Recommends Day -3 restore ("Security risk: low"). Any team adopting this restores attacker malware (CF2 & CF8)!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory callout */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>The Core Learning Point of the Exercise:</span>
              </div>
              <p className="leading-relaxed">
                COMPASS did not share models, credentials, or hosting with SENTINEL. However, its <strong>data pipeline</strong> was dependent on SENTINEL’s automated ticket feed. When SENTINEL went dark, COMPASS’s security view silently went stale. Because COMPASS reported <em>"Missing information: none identified"</em>, executives were lulled into a false sense of security. Human responders must inspect the <strong>as-of timestamps</strong> in AI briefs rather than trusting AI completeness claims.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Agent Profiles */}
      {activeTab === 'profiles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* RAVEN Profile */}
          <div className="bg-slate-900 border border-purple-800/60 rounded-xl p-5 space-y-4 shadow-lg">
            <div className="border-b border-purple-800/60 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 font-semibold">{AI_PROFILES.raven.role}</span>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">FACILITATOR ONLY</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{AI_PROFILES.raven.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{AI_PROFILES.raven.purpose}</p>
            </div>

            <div className="text-xs space-y-3">
              <div>
                <strong className="text-purple-300 block mb-1">Adversary Access:</strong>
                <p className="text-slate-300 leading-relaxed text-[11px]">{AI_PROFILES.raven.access}</p>
              </div>

              <div>
                <strong className="text-purple-300 block mb-1">Core Capabilities:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  {AI_PROFILES.raven.capabilities.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-purple-300 block mb-1">Known Limitations:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  {AI_PROFILES.raven.limitations.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-950/30 p-2.5 rounded border border-purple-900/40 text-[11px] text-slate-300">
                <strong className="text-purple-200 block mb-0.5">Human In The Loop:</strong>
                {AI_PROFILES.raven.humanDependence}
              </div>
            </div>
          </div>

          {/* SENTINEL Profile */}
          <div className="bg-slate-900 border border-sky-800/60 rounded-xl p-5 space-y-4 shadow-lg">
            <div className="border-b border-sky-800/60 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-sky-400 font-semibold">{AI_PROFILES.sentinel.role}</span>
                <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">PRODUCTION SOC</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{AI_PROFILES.sentinel.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{AI_PROFILES.sentinel.purpose}</p>
            </div>

            <div className="text-xs space-y-3">
              <div>
                <strong className="text-sky-300 block mb-1">Connected Telemetry:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  {AI_PROFILES.sentinel.dataSourcesConnected.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-amber-400 block mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Crucial Blind Spots:
                </strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  {AI_PROFILES.sentinel.telemetryBlindSpots.map((b, i) => (
                    <li key={i} className="text-amber-200/90">{b}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-sky-950/30 p-2.5 rounded border border-sky-900/40 text-[11px] text-slate-300">
                <strong className="text-sky-200 block mb-0.5">Log Retention Policy:</strong>
                Append-only audit log retained for 400 days. Must be preserved prior to credential rotation (DP-4).
              </div>
            </div>
          </div>

          {/* COMPASS Profile */}
          <div className="bg-slate-900 border border-indigo-800/60 rounded-xl p-5 space-y-4 shadow-lg">
            <div className="border-b border-indigo-800/60 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-semibold">{AI_PROFILES.compass.role}</span>
                <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">EXECUTIVE ADVISOR</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{AI_PROFILES.compass.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{AI_PROFILES.compass.purpose}</p>
            </div>

            <div className="text-xs space-y-3">
              <div>
                <strong className="text-indigo-300 block mb-1">Approved Sources:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  {AI_PROFILES.compass.approvedSources.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-indigo-300 block mb-1">Strict Boundaries:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  {AI_PROFILES.compass.boundaries.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-950/30 p-2.5 rounded border border-indigo-900/40 text-[11px] text-slate-300">
                <strong className="text-indigo-200 block mb-0.5">Operated By:</strong>
                CMT Coordinator (CISO Chief of Staff). Accountable owner: Incident Commander (Deputy CISO).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Credentials & Section K */}
      {activeTab === 'credentials' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Section K: SENTINEL Credential Exposure & Permissions Analysis
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparing the two compromised credentials that led to tenant suspension on Card 4.1.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-3">Attribute</th>
                    <th className="p-3 text-sky-400">sentinel-case-api key</th>
                    <th className="p-3 text-amber-400">svc_sentinel runtime credential</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Type</td>
                    <td className="p-3">Static API key for vendor-hosted SENTINEL case API</td>
                    <td className="p-3">Client secret for service principal in MTF Identity Provider</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Purpose</td>
                    <td className="p-3">Allows ITSM platform to sync cases into incident tickets</td>
                    <td className="p-3">Allows SENTINEL to query MTF data sources & run Tier 1 actions</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Can Read</td>
                    <td className="p-3">Case records only (title, severity, IOCs, approver names, notes)</td>
                    <td className="p-3">SIEM events, EDR telemetry, IdP/VPN logs, email gateway</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Can Write</td>
                    <td className="p-3 text-emerald-400">Append comment to existing case labeled "ITSM sync"</td>
                    <td className="p-3 text-amber-300">Tier 1 actions only (isolate single workstation, revoke user session)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Cannot Do</td>
                    <td className="p-3 text-rose-300">Cannot read raw logs, cannot approve actions, cannot execute changes</td>
                    <td className="p-3 text-rose-300">Cannot run Tier 2/3 actions, cannot touch servers or privileged accounts</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Network Restriction</td>
                    <td className="p-3 text-rose-400 font-mono">NONE: Vendor API accepts key from any public IP</td>
                    <td className="p-3 text-emerald-400 font-mono">Conditional Access: sign-in allowed ONLY from vendor IP range</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Vault Path & Auditing</td>
                    <td className="p-3 font-mono">/secops/sentinel/integrations (Auditing: ON)</td>
                    <td className="p-3 font-mono text-rose-400">/secops/sentinel/runtime (Auditing: OFF!)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Confirmed Intrusion Evidence</td>
                    <td className="p-3">Read by attacker Day -4; queried externally on Day 0 21:00 & Day 1 06:00</td>
                    <td className="p-3">Attempted sign-in Day 1 03:12 from unauthorized IP (blocked by location policy)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Crucial takeaway */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-amber-400 block">Crucial Exercise Takeaway:</strong>
              <p className="leading-relaxed">
                Neither credential possessed permission to isolate network segments or select restore points. Those high-impact actions always required human credentials and business owner sign-off.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: SENTINEL Tier Matrix */}
      {activeTab === 'tiers' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              SENTINEL Autonomous Action Tier Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Standardized containment tiers, approvals, audit records, and human decision boundaries.
            </p>
          </div>

          <div className="space-y-3">
            {AI_PROFILES.sentinel.tierMatrix.map((tm, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="font-bold text-sky-400 text-sm font-mono">{tm.tier}</div>
                  <div className="text-slate-200">{tm.actions}</div>
                  <div className="text-slate-400 text-[11px]">Audit Requirement: {tm.audit}</div>
                </div>

                <div className="bg-slate-900 px-3 py-2 rounded border border-slate-800 text-right md:min-w-[200px]">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Authorized Approver</div>
                  <div className="font-semibold text-slate-200 text-xs mt-0.5">{tm.approver}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Attribution Rules */}
      {activeTab === 'attribution' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Suspected AI Activity vs. Confirmed Attribution Rules
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Evaluator scoring standard: Responders are evaluated on calibrated language and sound decisions, never on claiming confirmed attacker AI without proof.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                  <th className="p-3">Observation</th>
                  <th className="p-3">Card</th>
                  <th className="p-3">Could Indicate</th>
                  <th className="p-3">Alternative Human Explanation</th>
                  <th className="p-3 text-emerald-400">Highest Label Allowed</th>
                  <th className="p-3">What Would Confirm It</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3">Caller answers in 1–2 sec, knows exact details, fluent wrong answer</td>
                  <td className="p-3 font-mono">1.3</td>
                  <td className="p-3">AI-assisted live scripting</td>
                  <td className="p-3 text-slate-400">Well-prepared human social engineer with notes</td>
                  <td className="p-3 font-semibold text-emerald-400">Suspected AI-assisted social engineering</td>
                  <td className="p-3">Law enforcement intelligence on group's tooling</td>
                </tr>
                <tr>
                  <td className="p-3">New pretext within 20 minutes of each refusal</td>
                  <td className="p-3 font-mono">1.3</td>
                  <td className="p-3">Automated pretext generation</td>
                  <td className="p-3 text-slate-400">Multiple human callers working a target list</td>
                  <td className="p-3 font-semibold text-emerald-400">Suspected automated generation</td>
                  <td className="p-3">Law enforcement intelligence</td>
                </tr>
                <tr>
                  <td className="p-3">Instant replies at any hour, tone shifts with tactics</td>
                  <td className="p-3 font-mono">3.2</td>
                  <td className="p-3">AI-drafted extortion chat</td>
                  <td className="p-3 text-slate-400">Multiple human negotiators working shifts with templates</td>
                  <td className="p-3 font-semibold text-emerald-400">Suspected AI-drafted negotiation</td>
                  <td className="p-3">Negotiation firm's intelligence on GLASS HERON</td>
                </tr>
                <tr>
                  <td className="p-3">Claim to hold "Harbor Federal acquisition plans"</td>
                  <td className="p-3 font-mono">3.2</td>
                  <td className="p-3">AI hallucination / fabrication</td>
                  <td className="p-3 text-slate-400">Deliberate human bluff to induce panic</td>
                  <td className="p-3 font-semibold text-amber-300">Claim confirmed false (Cause unknown)</td>
                  <td className="p-3">MTF records already disprove the claim</td>
                </tr>
                <tr>
                  <td className="p-3">Personalized phishing in 3 languages, no two samples alike</td>
                  <td className="p-3 font-mono">4.3</td>
                  <td className="p-3">AI-generated lures</td>
                  <td className="p-3 text-slate-400">Mail-merge templates plus commercial translation</td>
                  <td className="p-3 font-semibold text-emerald-400">Suspected AI lures</td>
                  <td className="p-3">Email-security vendor analysis</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300">
            <strong className="text-sky-400 block mb-1">Standard FBI Role-Player Response:</strong>
            <p className="italic">
              "We have seen this group use AI tools elsewhere; we cannot confirm it in your case."
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
