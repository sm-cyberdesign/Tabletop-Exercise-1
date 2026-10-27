import React, { useState } from 'react';
import { INJECT_CARDS } from '../data/exerciseData';
import {
  Network,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Clock,
  User
} from 'lucide-react';
import { ModuleId } from '../types/exercise';

export const MselTimelineView: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>('2.3');

  const filteredCards = INJECT_CARDS.filter((card) => {
    const matchesModule = selectedModule === 'all' || card.moduleId === selectedModule;
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.playerText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.aiElement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.id.includes(searchTerm);
    return matchesModule && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
              <Network className="w-4 h-4" />
              <span>MASTER SCENARIO EVENTS LIST (MSEL)</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Exercise Roadmap: 14 Inject Cards Across 4 Modules
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Revised MSEL with opposing AI agents, probing questions, facilitator ground truth, and critical failure linkages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search injects, AI, IOCs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-48 sm:w-60"
              />
            </div>

            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Modules (14 Cards)</option>
              <option value="module-1">Module 1: Detection & Escalation</option>
              <option value="module-2">Module 2: Scoping & Governance</option>
              <option value="module-3">Module 3: Extortion, Legal & Reg</option>
              <option value="module-4">Module 4: AI Continuity & Recovery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Table / List */}
      <div className="space-y-3">
        {filteredCards.map((card) => {
          const isExpanded = expandedCardId === card.id;

          return (
            <div
              key={card.id}
              className={`bg-slate-900 border rounded-xl transition-all shadow-md overflow-hidden ${
                isExpanded ? 'border-sky-500/80 shadow-sky-950/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Row Header */}
              <div
                onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                className="p-4 sm:px-5 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-8 rounded bg-slate-950 border border-slate-800 font-mono text-xs font-bold text-sky-400 flex items-center justify-center">
                    {card.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white tracking-tight">{card.title}</span>
                      {card.compassBrief && (
                        <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-800">
                          COMPASS
                        </span>
                      )}
                      {card.sentinelText && (
                        <span className="text-[10px] bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800">
                          SENTINEL
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 mt-0.5">
                      <span>{card.moduleName.split('—')[0]}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono text-[11px] text-slate-300">
                        <Clock className="w-3 h-3 text-slate-500" />
                        Sim: {card.simTime}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-300">
                        <User className="w-3 h-3 text-slate-500" />
                        {card.deliveredBy}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block text-xs font-mono">
                    <div className="text-slate-400">Sched: {card.scheduledTime}</div>
                    <div className="text-slate-500 text-[10px]">
                      {card.criticalFailuresChecked.length > 0 ? (
                        <span className="text-rose-400 font-semibold">{card.criticalFailuresChecked.join(', ')}</span>
                      ) : (
                        'No Critical Failure'
                      )}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="border-t border-slate-800 bg-slate-950/60 p-5 space-y-4 text-xs font-sans">
                  {/* Delivered Inject Summary */}
                  <div className="space-y-1">
                    <strong className="text-slate-200 font-mono text-[11px] uppercase tracking-wider block">
                      Delivered Inject Text (Player Packet):
                    </strong>
                    <p className="text-slate-300 bg-slate-950 p-3 rounded border border-slate-800 whitespace-pre-line leading-relaxed">
                      {card.playerText}
                    </p>
                  </div>

                  {/* AI Element Note */}
                  <div className="bg-sky-950/30 border border-sky-900/50 p-3 rounded text-slate-200 flex items-start gap-2">
                    <Cpu className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sky-300 block mb-0.5 font-mono text-[11px] uppercase">
                        AI Interaction & Test Objective:
                      </strong>
                      <span>{card.aiElement}</span>
                    </div>
                  </div>

                  {/* Ground Truth & Probing Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3.5 rounded border border-slate-800 space-y-2">
                      <strong className="text-amber-400 font-mono text-[11px] uppercase block">
                        Facilitator Ground Truth:
                      </strong>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        {card.facilitatorTruth}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded border border-slate-800 space-y-2">
                      <strong className="text-sky-400 font-mono text-[11px] uppercase block">
                        Expected Player Actions:
                      </strong>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                        {card.expectedPlayerActions.map((action, i) => (
                          <li key={i}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Probing questions and If stuck */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3.5 rounded border border-slate-800">
                      <strong className="text-slate-200 font-mono text-[11px] uppercase block mb-1">
                        Probing Questions:
                      </strong>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                        {card.probingQuestions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded border border-slate-800">
                      <strong className="text-amber-300 font-mono text-[11px] uppercase block mb-1">
                        "If Stuck" Facilitator Prompt:
                      </strong>
                      <p className="text-slate-300 italic text-[11px]">{card.ifStuck}</p>
                    </div>
                  </div>

                  {/* Mapping Footer */}
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-4 text-[11px] font-mono text-slate-400">
                    <span>Objectives: <strong className="text-slate-200">{card.objectivesChecked.join(', ') || 'N/A'}</strong></span>
                    <span>Decision Points: <strong className="text-slate-200">{card.decisionPointsChecked.join(', ') || 'N/A'}</strong></span>
                    <span>Critical Failures: <strong className="text-rose-400">{card.criticalFailuresChecked.join(', ') || 'None'}</strong></span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
