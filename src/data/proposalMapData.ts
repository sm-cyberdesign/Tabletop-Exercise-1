import { ProposalMapItem } from '../types/exercise';

export const PROPOSAL_MAP_METADATA = {
  title: "Operation Silent Ledger — AI update: approval, merge and verification",
  cisoApprovalNote: "CISO approved revision 6 on 2026-10-27; merged the same day. Verification = text check of each tab's PDF export on 2026-10-27 (required content present, stale text absent).",
  ownerValidationNote: "Owner validation stays separate: merged content can still rest on an assumption or legal question that is pending."
};

export const PROPOSAL_MAP_ITEMS: ProposalMapItem[] = [
  {
    id: 1,
    item: "RAVEN (attacker AI agent)",
    mergedInto: "Facilitator Guide §1.1, §2.1, §3",
    verificationEvidence: "Present in Facilitator Guide export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 2,
    item: "SENTINEL profile, credentials, tiers and authority",
    mergedInto: "Plan §4.1",
    verificationEvidence: "Present in Plan export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 3,
    item: "SENTINEL credential evidence and options",
    mergedInto: "Facilitator Guide §4.2; Player Packet Card 4.1",
    verificationEvidence: "Present in Facilitator Guide export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 4,
    item: "COMPASS profile, sources, boundaries, authority, fallback",
    mergedInto: "Plan §4.2; Appendix F",
    verificationEvidence: "Present in Plan export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 5,
    item: "COMPASS shared-infrastructure check",
    mergedInto: "Facilitator Guide §2.2",
    verificationEvidence: "Present in Facilitator Guide export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 6,
    item: "Suspected vs confirmed AI attribution",
    mergedInto: "Facilitator Guide §2.3",
    verificationEvidence: "Present in Facilitator Guide export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 7,
    item: "AI objectives O8 and O9; 7 of 9 rule",
    mergedInto: "Plan §2",
    verificationEvidence: "Present in Plan export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 8,
    item: "Continuity tests DP-6 (by 14:30; Part B by 15:15) and DP-9",
    mergedInto: "Facilitator Guide §4.1",
    verificationEvidence: "Present in Facilitator Guide export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 9,
    item: "AI evaluation measures and calibration",
    mergedInto: "Plan §8",
    verificationEvidence: "Present in Plan export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 10,
    item: "Critical failures CF1–CF11 incl. CF11a/b",
    mergedInto: "Plan §8",
    verificationEvidence: "Present in Plan export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 11,
    item: "14 inject cards with SENTINEL and COMPASS output",
    mergedInto: "Player Packet Part 3; Facilitator Guide §4 MSEL",
    verificationEvidence: "Present in Player Packet Part 3 export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 12,
    item: "Assumption register I-1 to I-22",
    mergedInto: "Facilitator Guide §7",
    verificationEvidence: "Present in Facilitator Guide export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Pending validation"
  },
  {
    id: 13,
    item: "Legal register J2-1 to J2-15",
    mergedInto: "Facilitator Guide §7",
    verificationEvidence: "Present in Facilitator Guide export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Pending validation"
  },
  {
    id: 14,
    item: "Revised agenda ending 14:15",
    mergedInto: "Plan §9 Appendix A",
    verificationEvidence: "Present in Plan export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 15,
    item: "Roster, exercise cell and role-players",
    mergedInto: "Plan §4",
    verificationEvidence: "Present in Plan export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 16,
    item: "Access control and release gates",
    mergedInto: "Plan §5, §7",
    verificationEvidence: "Present in Plan export; text check passed on 2026-10-27.",
    approval: "Approved",
    mergeStatus: "Merged and verified",
    ownerValidation: "Not applicable"
  },
  {
    id: 17,
    item: "Day length in §1 (summary sentence and Format row)",
    mergedInto: "Plan §1",
    verificationEvidence: "Found during rehearsal prep: §1 still said \"4-hour\" and \"45-minute hotwash\". Corrected on 2026-10-27 to 09:00–13:25 plus a 50-minute hotwash ending 14:15, matching Appendix A.",
    approval: "Approved",
    mergeStatus: "Merged",
    ownerValidation: "Not applicable"
  }
];
