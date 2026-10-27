import React, { useState } from 'react';
import { PROPOSAL_MAP_ITEMS, PROPOSAL_MAP_METADATA } from '../data/proposalMapData';
import { ASSUMPTIONS, LEGAL_ITEMS, RELEASE_GATES } from '../data/exerciseData';
import {
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Shield,
  HelpCircle,
  Scale,
  Users,
  Search,
  ExternalLink
} from 'lucide-react';

export const GovernanceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'proposal-map' | 'assumptions' | 'legal' | 'gates' | 'roles'>('proposal-map');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
              <Scale className="w-4 h-4" />
              <span>EXERCISE GOVERNANCE & FORMAL MERGE REGISTERS</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Revision 6 Proposal Map, Assumptions & Legal Validation
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracking approved plan merges, CISO operational assumptions (I-1 to I-22), and legal registers (J2-1 to J2-15).
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('proposal-map')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'proposal-map' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Proposal Map (17 Items)
            </button>
            <button
              onClick={() => setActiveTab('assumptions')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'assumptions' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Assumptions (I-1 to I-22)
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'legal' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Legal Items (J2-1 to J2-15)
            </button>
            <button
              onClick={() => setActiveTab('gates')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'gates' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Release Gates (7)
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'roles' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Role Conflict Fixes
            </button>
          </div>
        </div>
      </div>

      {/* Tab: Proposal Map */}
      {activeTab === 'proposal-map' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{PROPOSAL_MAP_METADATA.title}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">{PROPOSAL_MAP_METADATA.cisoApprovalNote}</p>
            <p className="text-amber-400/90 italic">{PROPOSAL_MAP_METADATA.ownerValidationNote}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3">Proposal Item</th>
                    <th className="p-3">Merged Into</th>
                    <th className="p-3">Verification Evidence</th>
                    <th className="p-3 text-center">Approval</th>
                    <th className="p-3 text-center">Merge Status</th>
                    <th className="p-3 text-center">Owner Validation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {PROPOSAL_MAP_ITEMS.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-center text-slate-400">{item.id}</td>
                      <td className="p-3 font-semibold text-slate-100">{item.item}</td>
                      <td className="p-3 font-mono text-[11px] text-sky-400">{item.mergedInto}</td>
                      <td className="p-3 text-slate-400 text-[11px] leading-relaxed">{item.verificationEvidence}</td>
                      <td className="p-3 text-center">
                        <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                          {item.approval}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-[11px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/80 font-mono">
                          {item.mergeStatus}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                            item.ownerValidation === 'Pending validation'
                              ? 'bg-amber-950 text-amber-300 border-amber-800'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {item.ownerValidation}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Assumptions */}
      {activeTab === 'assumptions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Foundational MTF operational and technological assumptions for CISO sign-off before T-30 dry run.
            </p>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Filter assumptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-56"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ASSUMPTIONS.filter((a) =>
              a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
              a.assumption.toLowerCase().includes(searchTerm.toLowerCase()) ||
              a.affects.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((a) => (
              <div
                key={a.id}
                className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 space-y-2 text-xs shadow-sm hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sky-400 text-xs">{a.id}</span>
                  <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800 font-mono">
                    {a.status}
                  </span>
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">{a.assumption}</p>
                <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800/60">
                  Affects: <span className="text-slate-300">{a.affects}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Legal Items */}
      {activeTab === 'legal' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Legal questions submitted to Outside Counsel via MTF General Counsel (Section J2).
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-3 w-16">Item</th>
                    <th className="p-3 w-48">Legal Statement</th>
                    <th className="p-3">Specific Question for Legal Counsel</th>
                    <th className="p-3 w-28 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {LEGAL_ITEMS.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-sky-400">{item.id}</td>
                      <td className="p-3 font-semibold text-slate-200">{item.statement}</td>
                      <td className="p-3 text-slate-300 leading-relaxed">{item.questionForCounsel}</td>
                      <td className="p-3 text-center">
                        <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800 font-mono">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Release Gates */}
      {activeTab === 'gates' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Section P: Participant Release Gates</span>
            </div>
            <p className="text-slate-400">
              The exercise design is finalized; participant release is blocked until every gate below is formally closed by its designated owner.
            </p>
          </div>

          <div className="space-y-3">
            {RELEASE_GATES.map((gate) => (
              <div
                key={gate.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{gate.title}</span>
                    <span className="text-[11px] text-slate-400 font-mono">Owner: {gate.owner}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{gate.description}</p>
                </div>

                <div className="sm:text-right flex-shrink-0">
                  <span
                    className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border inline-block ${
                      gate.status.includes('Verified') || gate.status.includes('Completed')
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}
                  >
                    {gate.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Role Conflict Fixes */}
      {activeTab === 'roles' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4 text-xs">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Section N: Role Conflicts Resolved (Trusted Agents vs. Players)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Preventing contamination between exercise controllers, role-players, and playing participants.
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-sky-300 block font-semibold">1. CEO (Executive Sponsor vs. Active Player):</strong>
              <p className="text-slate-300 leading-relaxed">
                Removed from the Trusted Agent planning team. CEO signs charter and receives a scenario-free briefing and final AAR. CEO plays on the Executive Crisis Team with <strong>zero access</strong> to scenario, injects, or answer keys. Ratings are set by the lead evaluator and approved by the CISO.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-sky-300 block font-semibold">2. Threat Intelligence Lead (Scenario SME vs. IR Player):</strong>
              <p className="text-slate-300 leading-relaxed">
                Threat Intel Lead becomes a dedicated Trusted Agent (role-playing external threat-intel provider RP4 and the FBI). A separate Threat Intelligence Analyst from the team fills the active IR player seat.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-sky-300 block font-semibold">3. IAM Lead Credential Delivery Conflict:</strong>
              <p className="text-slate-300 leading-relaxed">
                Card 4.1 is delivered by the Vault Administrator (RP5) and SENTINEL vendor (RP3) role-players. The actual IAM Lead remains a player and responds to the incident without prior knowledge.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1">
              <strong className="text-sky-300 block font-semibold">4. SENTINEL & COMPASS Console Role Drift Guard:</strong>
              <p className="text-slate-300 leading-relaxed">
                Dedicated Trusted Agents operate as the SENTINEL and COMPASS consoles. They read strictly pre-written AI outputs and answer only "what data do you have in your sources" without offering hints or facilitation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
