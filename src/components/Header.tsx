import React from 'react';
import { Shield, Eye, Lock, FileText, Cpu, Network, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export type NavTab = 'simulation' | 'ai-architecture' | 'compass-console' | 'msel' | 'governance' | 'scorecard';
export type PerspectiveMode = 'player' | 'facilitator';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  perspective: PerspectiveMode;
  onTogglePerspective: (mode: PerspectiveMode) => void;
  simulatedTime: string;
  criticalFailuresCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  perspective,
  onTogglePerspective,
  simulatedTime,
  criticalFailuresCount,
}) => {
  return (
    <header className="bg-slate-950 text-slate-100 border-b border-slate-800 sticky top-0 z-40">
      {/* Top Bar with Classification & Environment Metadata */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-1.5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            RESTRICTED SIMULATION — EXERCISE USE ONLY
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">METRO TRUST FINANCIAL</span>
          <span className="text-slate-600">·</span>
          <span>REVISION 6 MERGED & VERIFIED (2026-10-27)</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Sim Time:</span>
            <span className="font-semibold text-sky-300">{simulatedTime}</span>
          </div>
          {criticalFailuresCount > 0 && (
            <div className="flex items-center gap-1 text-rose-400 font-semibold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/80">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{criticalFailuresCount} CRITICAL FAILURE{criticalFailuresCount > 1 ? 'S' : ''} TRIGGERED</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-600/40 flex items-center justify-center text-sky-400 shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans">
                OPERATION SILENT LEDGER
              </h1>
              <span className="text-xs bg-slate-800 text-sky-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                AI UPDATE REV 6
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Executive Crisis Simulation · RAVEN vs. SENTINEL & COMPASS AI Governance
            </p>
          </div>
        </div>

        {/* Perspective Lens Switcher */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-right hidden sm:block">
            <div className="font-semibold text-slate-200">Security Clearance Lens</div>
            <div className="text-slate-400 text-[11px]">
              {perspective === 'facilitator' ? 'Full Ground Truth & Probing Prompts' : 'Participant Safe (No Spoilers)'}
            </div>
          </div>
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => onTogglePerspective('player')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                perspective === 'player'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Player Lens</span>
            </button>
            <button
              onClick={() => onTogglePerspective('facilitator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                perspective === 'facilitator'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Facilitator / Ground Truth</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-1 border-t border-slate-800/60 pt-1 text-xs font-medium">
        <button
          onClick={() => onSelectTab('simulation')}
          className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
            currentTab === 'simulation'
              ? 'border-sky-500 text-sky-400 bg-sky-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Interactive War Room</span>
        </button>

        <button
          onClick={() => onSelectTab('ai-architecture')}
          className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
            currentTab === 'ai-architecture'
              ? 'border-sky-500 text-sky-400 bg-sky-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>AI Triad Architecture</span>
        </button>

        <button
          onClick={() => onSelectTab('compass-console')}
          className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
            currentTab === 'compass-console'
              ? 'border-sky-500 text-sky-400 bg-sky-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>COMPASS Briefs & Fallback</span>
        </button>

        <button
          onClick={() => onSelectTab('msel')}
          className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
            currentTab === 'msel'
              ? 'border-sky-500 text-sky-400 bg-sky-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>MSEL & Timeline (14 Cards)</span>
        </button>

        <button
          onClick={() => onSelectTab('governance')}
          className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
            currentTab === 'governance'
              ? 'border-sky-500 text-sky-400 bg-sky-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Governance & Registers</span>
        </button>

        <button
          onClick={() => onSelectTab('scorecard')}
          className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
            currentTab === 'scorecard'
              ? 'border-sky-500 text-sky-400 bg-sky-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>AAR & Evaluation Scorecard</span>
        </button>
      </div>
    </header>
  );
};
