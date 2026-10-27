import {
  InjectCard,
  Objective,
  CriticalFailure,
  DecisionPoint,
  RolePlayer,
  AssumptionItem,
  LegalItem
} from '../types/exercise';

export const EXERCISE_INFO = {
  codename: "OPERATION SILENT LEDGER",
  subtitle: "AI Crisis Tabletop Exercise (Revision 6)",
  institution: "Metro Trust Financial (MTF Bank)",
  status: "Proposal Revision 6 — Approved by CISO (2026-10-27)",
  simulatedSpan: "Monday Day 0 (05:00 ET) to Day 10 (Quarter-End Friday Close)",
  exerciseAgenda: "08:30 – 14:15 (Total 5h 45m; Ends 30 min later for AI Modules)",
  passingRule: "At least 7 of 9 objectives rated Performed (P) or Satisfactory (S), 0 Unperformed (U), and NO Critical Failures (CF1–CF11).",
  cisoCharterAdditions: {
    oversight: "High-impact actions recommended by SENTINEL or COMPASS are approved by a named human before execution.",
    trust: "Responders verify AI findings against primary telemetry before relying on them, and treat attacker-produced content as unverified claims.",
    accountability: "Every executive, legal, regulatory, and business decision stays with an accountable human, whatever an AI recommended.",
    resilience: "The response continues at an acceptable pace if AI tools are restricted or withdrawn, and AI activity logs are preserved as evidence."
  }
};

export const ROLE_PLAYERS: RolePlayer[] = [
  {
    id: "RP1",
    title: "Data-center Operator & Forensics Lead",
    cardsAndRequests: "Card 1.2 (Datacenter status), Card 2.1 (Forensics scoping), Card 3.2 (Negotiator & chat analysis)",
    filledBy: "Cyber Resilience Analyst (not on IR on-call roster)",
    voiceDescription: "Technical, direct, cautious about forensic artifacts and timestamp integrity."
  },
  {
    id: "RP2",
    title: "Help-Desk Lead, Contact Center & Fraud Ops",
    cardsAndRequests: "Card 1.3 (MFA reset wave), Card 4.3 (Phishing lures & branch panic), Card 4.4 (Day 10 ATO wave)",
    filledBy: "IT Service Management Lead",
    voiceDescription: "Customer-facing, urgent, frontline perspective on user impersonation."
  },
  {
    id: "RP3",
    title: "External Parties (VaultLine CEO, Insurer, OCC Examiner, Controller, SENTINEL Vendor, Board Chair)",
    cardsAndRequests: "Card 2.2 (VaultLine), Card 3.2 (Insurer), Card 3.3 (OCC & Media), Card 3.4 (Controller), Card 4.1 (Vendor Notice), Card 4.4 (Board Chair)",
    filledBy: "External Facilitator's Associate",
    voiceDescription: "Authoritative external voices; enforces regulatory deadlines, insurance consent clauses, and vendor contracts."
  },
  {
    id: "RP4",
    title: "Threat Intel Provider & FBI Role-Player",
    cardsAndRequests: "Card 3.1 (Leak site discovery), FBI queries on request",
    filledBy: "Threat Intel Lead (Trusted Agent SME)",
    voiceDescription: "External cyber intelligence provider. When asked about GLASS HERON AI: 'We have seen this group use AI tools elsewhere; we cannot confirm it in your case.'"
  },
  {
    id: "RP5",
    title: "Vault Administrator, Infrastructure Recovery & Network Change Lead",
    cardsAndRequests: "Card 4.1 (Vault audit), Card 4.2 (Restoration options), Card 2.3 (CHG-20931 change records on request), AI platform owner (Cards 4.1-4.3 on request)",
    filledBy: "Infrastructure Architect (Trusted Agent SME)",
    voiceDescription: "Deep systems knowledge; knows change history CHG-20931 and vault permission paths."
  },
  {
    id: "RP6",
    title: "Model Risk Management (MRM) Sign-Off",
    cardsAndRequests: "Card 4.4 / DP-7 Return to Service (on request)",
    filledBy: "Model Risk Management Staff Member (2nd-line Risk, not an evaluator)",
    voiceDescription: "Rigorous 2nd-line risk governor; requires validation records, log retention evidence, and boundary checks before AI re-authorization."
  }
];

export const AI_PROFILES = {
  raven: {
    name: "RAVEN",
    role: "Threat Actor AI Agent (GLASS HERON)",
    visibility: "Facilitator-Only (Players discover behavior only; RAVEN's name stays confidential)",
    purpose: "Accelerates GLASS HERON's targeting, impersonation, negotiation speed, and extortion pressure. Never acts directly on MTF systems without human operator approval.",
    access: "Stolen VaultLine data (staff directory export), files exfiltrated from MTF after Day -8, operator live notes, Tor negotiation chat, and (from Day 0 21:00) SENTINEL case notes read with stolen API key.",
    capabilities: [
      "Ranks MTF staff and documents by value for impersonation and extortion leverage",
      "Drafts call pretexts and provides real-time fluent answers to human social engineers during help-desk calls",
      "Drafts dynamic extortion negotiation replies within seconds in polished English, shifting tone to match negotiator tactics",
      "Generates multilingual, personalized phishing lures (English, Spanish, Korean) tailored by customer branch and account digits",
      "Proposes alternative intrusion paths when initial attempts are blocked"
    ],
    limitations: [
      "No direct network access to MTF systems; cannot log in, move data, or execute ransomware by itself",
      "Blocked by hardware video checks, phishing-resistant MFA, or out-of-band phone callbacks",
      "Prone to confident hallucinations/errors (invented '2025 acquisition plans for Harbor Federal', gave wrong offsite answer)",
      "Blind to defensive changes until human operators feed new telemetry into it"
    ],
    humanDependence: "Operators choose targets, make every call, execute every exploit tool, approve every message, and determine ransom demands. RAVEN is an accelerator, not an autonomous actor."
  },
  sentinel: {
    name: "SENTINEL",
    role: "SOC Detection and Response AI Assistant (Defensive)",
    visibility: "Participant-Visible (In production at MTF for 9 months)",
    purpose: "Correlates SIEM/EDR alerts, drafts incident timelines, and recommends containment/recovery actions. Advises responders; does not decide high-impact actions.",
    dataSourcesConnected: [
      "SIEM logs and alerts",
      "EDR telemetry from Windows servers and endpoints",
      "Identity provider (IdP) and MFA logs",
      "VPN gateway logs",
      "Email security gateway telemetry",
      "IT service-desk tickets and CMDB records",
      "Licensed commercial threat-intel feeds"
    ],
    telemetryBlindSpots: [
      "ESXi hypervisor logs (crucial for virtualized infrastructure failure visibility)",
      "Backup console logs (unable to see snapshot deletions directly)",
      "Third-party vendor environments (VaultLine MFT)",
      "Raw customer document contents",
      "Help-desk phone call audio recordings",
      "Tor negotiation chats"
    ],
    credentials: {
      caseApiKey: {
        name: "sentinel-case-api key",
        type: "Static API key for vendor-hosted SENTINEL Case API",
        vaultPath: "/secops/sentinel/integrations (Read auditing: ON)",
        purpose: "Enables IT service management (ITSM) to pull SENTINEL cases into tickets and push status back",
        permissions: "Read case records (title, severity, status, notes, recommendations, IOCs). Write: append comments labeled 'ITSM sync' only.",
        restrictions: "No IP restrictions on vendor API endpoint (compromised on Day -4 by svc_vaultline_mft; read externally Day 0 21:00 & Day 1 06:00)"
      },
      runtimeSecret: {
        name: "svc_sentinel runtime credential",
        type: "Client secret for service principal in MTF Identity Provider",
        vaultPath: "/secops/sentinel/runtime (Read auditing: OFF!)",
        purpose: "Enables SENTINEL to query MTF data sources and execute automated Tier 1 actions",
        permissions: "Tier 1 actions only (workstation isolation via EDR, revoke non-privileged user sessions, block email IOC)",
        restrictions: "Protected by Conditional Access location policy (attacker tried on Day 1 03:12; blocked by location policy!)"
      }
    },
    tierMatrix: [
      { tier: "Tier 0 — Advise", actions: "Correlate alerts, summarize findings, draft timelines, recommend investigations", approver: "None (Analyst review)", audit: "Logged" },
      { tier: "Tier 1 — Pre-approved Automated", actions: "Isolate single workstation via EDR, revoke single non-privileged user session, block email indicator", approver: "Pre-approved by policy (SOC Shift Lead notified)", audit: "Logged; reversible within 15 min" },
      { tier: "Tier 2 — Human-approved", actions: "Disable privileged or service account, isolate server, mass session revocation", approver: "IR Lead (validates primary evidence in source system first)", audit: "Case record approval required" },
      { tier: "Tier 3 — Executive-approved", actions: "Isolate network segment (WIRE-SEG-2), cut vendor link, choose restore point, business shutdown", approver: "Incident Commander (Deputy CISO) with affected Business Owner", audit: "Decision log entry with business rationale" },
      { tier: "Never Delegable", actions: "Delete data, contact external entities, make regulatory notices, authorize ransom, customer disclosure", approver: "Accountable human named in IRP only", audit: "Forbidden for AI" }
    ],
    vendorSuspensionTrigger: "Day 2 at 13:45, SENTINEL vendor detects case-key calls from external IPs and suspends MTF tenant under contractual key-compromise procedure."
  },
  compass: {
    name: "COMPASS",
    role: "Executive Crisis AI Advisor (Strategic Support)",
    visibility: "Participant-Visible (Operated by CMT Coordinator for CISO & Exec Team)",
    purpose: "Drafts and maintains structured decision briefs comparing security, financial, regulatory, and customer consequences. Synthesizes verified facts, assumptions, and unknowns.",
    approvedSources: [
      "Decision log copies (from Scribe after each CMT meeting)",
      "CMT situation reports (from CMT Coordinator)",
      "IR ticket feed (ITSM platform sync via SENTINEL case-API)",
      "Change management calendar (CHG records)",
      "Policy library (IRP, BCP, BIA with RTOs, insurance policies)",
      "Finance and Treasury figures (manual uploads by Controller)",
      "Ad-hoc forensics reports (manual upload by CMT Coordinator)"
    ],
    boundaries: [
      "Strictly sees only human-approved inputs. NO direct access to raw logs, SIEM, email, or facilitator data.",
      "Cannot execute technical containment actions or authorize financial transactions.",
      "Every legal or regulatory statement is explicitly tagged: 'for counsel to validate'.",
      "Must list supporting evidence, uncertainties, missing information, and each source's as-of timestamp.",
      "Advisory only: a COMPASS option becomes a decision only when stated by an authorized human and recorded by the scribe."
    ],
    criticalVulnerability: {
      hiddenDependency: "COMPASS's security telemetry comes exclusively from the IR ticket feed fed by SENTINEL's case-API sync. When SENTINEL is suspended on Day 2 at 13:45, the ticket feed FREEZES at 13:42!",
      card42Failure: "On Day 3 (Card 4.2), COMPASS's brief recommends Option 1 (Day -3 restore) and falsely claims 'Missing information: none identified' because it lacks Day -8 forensics data and ignores its own frozen 13:42 feed timestamp!"
    },
    fallbackProcedure: "Appendix F Manual Decision-Brief Protocol: If COMPASS is degraded or unavailable (Card 4.3), CMT Coordinator takes over manual brief drafting within 20 minutes, timestamping sources, pulling fresh updates from IR/CFO/COO, and logging unresolved gaps."
  }
};

export const INJECT_CARDS: InjectCard[] = [
  {
    id: "1.1",
    moduleId: "module-1",
    moduleName: "Module 1 — Detection and Escalation",
    simTime: "Day 0 (Monday), 05:15 ET",
    scheduledTime: "09:35",
    slot: "1.1",
    title: "Document-Imaging Outage & SENTINEL Correlation",
    deliveredBy: "Lead Facilitator and SENTINEL Console",
    playerText: "At 05:00 ET, monitoring reports 14 Windows application servers in the document-imaging cluster have dropped offline simultaneously. Systems are unresponsive to remote management.",
    sentinelText: "SENTINEL case #4471, 05:22: \"The 14 host outages coincide with backup job failures for the document-imaging platform beginning 02:10. Pattern is consistent with backup tampering before encryption. Confidence: medium. Recommend (Tier 0): raise severity; review who accessed backup administration in the last 24 hours.\"",
    facilitatorTruth: "SENTINEL provides a useful correlation between host outages and backup failures. However, SENTINEL has NO hypervisor visibility (no ESXi logs). Defenders must verify backup failures directly in the backup system before raising severity, and recognize SENTINEL's blind spots.",
    aiElement: "Useful SENTINEL Tier 0 correlation; testing responder verification against source telemetry and identifying hypervisor blind spot.",
    objectivesChecked: ["O1", "O8"],
    criticalFailuresChecked: [],
    decisionPointsChecked: ["DP-1"],
    expectedPlayerActions: [
      "Acknowledge SENTINEL case #4471 as an advisory lead, not definitive evidence",
      "Dispatch a named analyst to query the backup console and hypervisor logs directly",
      "Confirm backup catalog integrity and identify missing ESXi telemetry in SENTINEL",
      "Escalate incident severity based on confirmed source telemetry"
    ],
    probingQuestions: [
      "What primary data sources is SENTINEL missing for these virtualized hosts?",
      "Who is verifying the backup administrator access logs in the primary console?"
    ],
    ifStuck: "Ask: 'Is SENTINEL connected to the hypervisors or the storage array?' (Answer: No, it cannot see ESXi).",
    optionsForPlayers: [
      {
        id: "1.1-a",
        label: "Immediately accept SENTINEL's recommendation and declare a major incident without verifying backup console",
        isOptimal: false,
        feedback: "Flawed practice: SENTINEL findings are leads, not verified facts. Responders must verify backup failures in the source system first."
      },
      {
        id: "1.1-b",
        label: "Assign named analyst to query backup console and ESXi logs directly to verify tampering before escalating severity",
        isOptimal: true,
        feedback: "Target achieved: Responders validate AI output against primary evidence (DP-1) and identify SENTINEL's hypervisor blind spot."
      }
    ]
  },
  {
    id: "1.2",
    moduleId: "module-1",
    moduleName: "Module 1 — Detection and Escalation",
    simTime: "Day 0 (Monday), 07:30 ET",
    scheduledTime: "09:50",
    slot: "1.2",
    title: "Ransom Note Discovery & Datacenter Confirmation",
    deliveredBy: "RP1 (Data-Center Operator)",
    playerText: "Data-center operations reports that a ransom note file named 'RESTORE_LEAD_NOTICE.txt' has been identified on 3 file servers. The text states: 'Your enterprise networks and cloud clusters have been encrypted by GLASS HERON. Exfiltrated files will be published unless contact is established.' Datacenter consoles show hypervisor storage arrays corrupted.",
    facilitatorTruth: "Original crisis activation decision kept unchanged. Live extortion threat confirmed. Triggers Executive Crisis Management Team (CMT) activation.",
    aiElement: "Attacker extortion threat backdrop; baseline human crisis governance activation.",
    objectivesChecked: ["O1", "O2"],
    criticalFailuresChecked: ["CF1"],
    decisionPointsChecked: [],
    expectedPlayerActions: [
      "Activate the Incident Command System (ICS) and convene the Crisis Management Team (CMT)",
      "Isolate affected hypervisor management interfaces out-of-band",
      "Notify General Counsel and cyber insurance claims representative"
    ],
    probingQuestions: [
      "Has the incident commander formally declared a corporate crisis?",
      "What steps are taken to isolate backup infrastructure from active directory?"
    ],
    ifStuck: "Remind the team: 'Check your Incident Response Plan activation thresholds.'",
    optionsForPlayers: [
      {
        id: "1.2-a",
        label: "Declare major incident, activate Incident Command System (ICS), convene Crisis Management Team (CMT), and notify General Counsel",
        isOptimal: true,
        feedback: "Target achieved: Incident command established; legal and executive crisis governance active."
      },
      {
        id: "1.2-b",
        label: "Keep investigation internal within the SOC without escalating to Executive Crisis Team or General Counsel",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF1: Failed to activate crisis governance and declare incident within thresholds!",
        triggersCF: "CF1"
      }
    ]
  },
  {
    id: "1.3",
    moduleId: "module-1",
    moduleName: "Module 1 — Detection and Escalation",
    simTime: "Day 0 (Monday), 09:30 ET",
    scheduledTime: "10:05",
    slot: "1.3",
    title: "Help-Desk Social Engineering Wave & Suspected AI Callers",
    deliveredBy: "RP2 (Help-Desk Team Lead)",
    playerText: "Help-Desk Team Lead reports: \"Nine days ago we re-enrolled MFA for a Treasury Ops vice president who said she had a new phone. When I reached her at 07:40 she said she never called us. The call was recorded: the caller answered each verification question within one or two seconds, used her exact title, manager and cost center, and gave a fluent but wrong answer to an unscripted question about her team's offsite. At 08:15 I told agents to require a video check for any reset. Since 08:00 we've had three more reset calls, for a payments operations manager, a wire-room supervisor and a backup administrator, each with the right employee ID and manager. When asked for video, each caller hung up; about 20 minutes later a different caller tried the next person with a new story.\"",
    facilitatorTruth: "FACILITATOR ONLY: GLASS HERON used their AI agent RAVEN for real-time live script answering and automated pretext generation based on stolen VaultLine employee data. When video check was demanded, callers aborted. Responders must recognize the speed/pattern, freeze resets, institute mandatory call-backs, and escalate as 'suspected' AI-assisted social engineering. Rule: never label as confirmed AI without external law enforcement proof.",
    aiElement: "Attacker AI (RAVEN) automated pretext generation & rapid live scripting; defender calibrated attribution rules.",
    objectivesChecked: ["O1", "O3", "O8"],
    criticalFailuresChecked: [],
    decisionPointsChecked: ["DP-3"],
    expectedPlayerActions: [
      "Disable the compromised Treasury Ops VP account immediately",
      "Formalize an enterprise-wide freeze on MFA resets with out-of-band call-backs",
      "Review voice recordings and escalate the pattern to Threat Intel and IR as 'suspected AI-assisted social engineering'",
      "Ensure all internal and external communications use calibrated language ('suspected', not 'confirmed AI')"
    ],
    probingQuestions: [
      "How fast did each new caller appear after the previous refusal?",
      "Who owns the enterprise-wide credential freeze, and how is it communicated?",
      "Are you describing attacker AI use as confirmed or suspected?"
    ],
    ifStuck: "Ask: 'What does the attacker learn every time an agent refuses a reset? Who owns the reset policy?'",
    optionsForPlayers: [
      {
        id: "1.3-a",
        label: "Announce to executive committee that MTF is under an attack by confirmed generative AI voice bots",
        isOptimal: false,
        feedback: "Calibration Failure: No outside source has confirmed AI tooling. Attribution must be labeled 'suspected AI-assisted' (DP-3)."
      },
      {
        id: "1.3-b",
        label: "Freeze resets, mandate video/call-back verification, disable VP account, and document pattern as 'suspected AI-assisted social engineering'",
        isOptimal: true,
        feedback: "Target achieved: Account contained, defensive policy formalized, and attribution appropriately calibrated."
      }
    ]
  },
  {
    id: "2.1",
    moduleId: "module-2",
    moduleName: "Module 2 — Scoping and Crisis Governance",
    simTime: "Day 0 (Monday), 14:00 ET",
    scheduledTime: "10:25",
    slot: "2.1",
    title: "Forensics Scoping & Initial Access Timeline",
    deliveredBy: "RP1 (Forensics Lead)",
    playerText: "External digital forensics lead reports: Initial intrusion activity has been traced back to Day -8 (eight days prior to encryption). Evidence shows an attacker utilizing valid service account credentials traversing internal management segments.",
    facilitatorTruth: "Intrusion began Day -8. This timestamp is vital for evaluating later backup restore points in Card 4.2!",
    aiElement: "Ground-truth intrusion anchor timestamp (Day -8) for later AI sanity checking.",
    objectivesChecked: ["O1", "O3"],
    criticalFailuresChecked: [],
    decisionPointsChecked: [],
    expectedPlayerActions: [
      "Record Day -8 as the earliest confirmed indicator of compromise (IOC) timestamp",
      "Begin scoping all accounts, changes, and backups modified between Day -8 and Day 0"
    ],
    probingQuestions: [
      "What does an intrusion timeline beginning at Day -8 imply for backup integrity?"
    ],
    ifStuck: "Highlight the Day -8 date on the incident timeline board.",
    optionsForPlayers: [
      {
        id: "2.1-a",
        label: "Record Day -8 as earliest intrusion anchor; initiate comprehensive scoping of all accounts and snapshots since Day -8",
        isOptimal: true,
        feedback: "Target achieved: Intrusion timeline anchored for subsequent backup integrity verification."
      },
      {
        id: "2.1-b",
        label: "Assume threat actor only gained access on Day 0 and limit scoping to the last 24 hours",
        isOptimal: false,
        feedback: "Flawed scoping: Disregarded digital forensics evidence of 8-day dwell time."
      }
    ]
  },
  {
    id: "2.2",
    moduleId: "module-2",
    moduleName: "Module 2 — Scoping and Crisis Governance",
    simTime: "Day 0 (Monday), 16:30 ET",
    scheduledTime: "10:45",
    slot: "2.2",
    title: "VaultLine Third-Party Vendor Compromise Notice",
    deliveredBy: "RP3 (VaultLine CEO)",
    playerText: "VaultLine CEO email notification: VaultLine's Managed File Transfer (MFT) cloud platform suffered a remote zero-day breach 12 days ago. Threat actors accessed customer directories and transferred configuration archives before the vulnerability was patched.",
    facilitatorTruth: "VaultLine MFT breach allowed attackers to exfiltrate MTF employee directories and vault credentials (including `svc_vaultline_mft` and SENTINEL case API key).",
    aiElement: "Vendor breach upstream supplying data to attacker AI (RAVEN).",
    objectivesChecked: ["O3"],
    criticalFailuresChecked: [],
    decisionPointsChecked: [],
    expectedPlayerActions: [
      "Initiate vendor containment: sever remaining VaultLine connections",
      "Audit all secrets, credentials, and service principals accessible to VaultLine integrations"
    ],
    probingQuestions: [
      "What permissions did VaultLine service principals possess inside MTF's identity and secrets vault?"
    ],
    ifStuck: "Ask: 'Where are VaultLine credentials stored, and what can they read?'",
    optionsForPlayers: [
      {
        id: "2.2-a",
        label: "Sever remaining VaultLine network connections and audit all service accounts and secrets in the /secops vault path",
        isOptimal: true,
        feedback: "Target achieved: Upstream vendor access revoked and credential exposure investigation initiated."
      },
      {
        id: "2.2-b",
        label: "Leave VaultLine connections open to monitor attacker movement without notifying secrets vault administrators",
        isOptimal: false,
        feedback: "Severe containment failure: Allowed persistent vendor bridge to remain unmanaged."
      }
    ]
  },
  {
    id: "2.3",
    moduleId: "module-2",
    moduleName: "Module 2 — Scoping and Crisis Governance",
    simTime: "Day 0 (Monday), 18:00–18:20 ET",
    scheduledTime: "11:00",
    slot: "2.3",
    title: "WIRE-SEG-2 Conflict — SENTINEL Recommendation vs COMPASS Brief",
    deliveredBy: "SENTINEL Console & COMPASS Console",
    playerText: "Network security receives an alert regarding anomalous egress traffic on the core wire-transfer network segment WIRE-SEG-2. SENTINEL and COMPASS offer competing assessments.",
    sentinelText: "SENTINEL case #4471 update, Day 0, 18:00: \"Unusual outbound connections from the wire-room network segment WIRE-SEG-2 to an unfamiliar cloud IP range on Day -3 and Day -1. Possible second exfiltration channel. Confidence: medium. Recommend (Tier 3): isolate WIRE-SEG-2 now.\"",
    compassBrief: {
      simTime: "Day 0, 18:20",
      title: "WIRE-SEG-2 Isolation Assessment",
      sources: ["IR ticket feed (as of 18:05)", "Change calendar (18:00)", "Business Impact Analysis (BIA)"],
      asOfTimes: {
        "IR ticket feed": "Day 0, 18:05",
        "Change calendar": "Day 0, 18:00",
        "BIA": "Current"
      },
      verifiedFacts: [
        "SENTINEL reports connections from WIRE-SEG-2 to an unfamiliar cloud range on Day -3 and Day -1, at medium confidence.",
        "Change calendar lists CHG-20931, 'payment network gateway migration, WIRE-SEG-2', implemented Day -4.",
        "BIA: wire transfers have a 4-hour RTO; quarter-end close is in four days."
      ],
      assumptions: ["Timing of outbound traffic correlates with the gateway migration window."],
      unknowns: ["Whether destination IP range belongs to the new payment gateway vendor; no firewall or network-ownership data available to COMPASS."],
      assessment: "SENTINEL's recommendation is not yet supported. The timing fits the change, but I cannot confirm that the destination range belongs to the new gateway; I have no firewall or network-ownership data.",
      options: [
        { id: "1", label: "Isolate now", details: "Closes a possible exfiltration channel immediately; halts all wire transfers enterprise-wide.", tradeoffs: "Violates 4-hour RTO; risks massive settlement default during quarter-end." },
        { id: "2", label: "Verify first", details: "Network lead confirms destination owner; increase monitoring while wires continue.", tradeoffs: "Wire transfers continue unimpeded; exposure continues if channel is malicious." },
        { id: "3", label: "Restrict WIRE-SEG-2 egress", details: "Restrict egress strictly to documented payment ranges via emergency firewall change.", tradeoffs: "Requires immediate firewall change; may break payment gateway if documentation is incomplete." }
      ],
      missingInformation: "Owner of the destination range; firewall logs; payment gateway migration design documentation.",
      decisionOwner: "Incident Commander with Treasury Operations",
      reviewTime: "19:30"
    },
    facilitatorTruth: "FACILITATOR ONLY: COMPASS's reading is correct (the destination IP range is MTF's new payment-network gateway migrated under CHG-20931). However, COMPASS's brief is unproven without source verification! A team that adopts COMPASS's view blindly without checking firewall logs or contacting the network lead is rated no higher than Satisfactory (S). A team that isolates WIRE-SEG-2 purely on SENTINEL's recommendation without checking change records and consulting Treasury Ops triggers Critical Failure CF8!",
    aiElement: "AI vs AI disagreement (SENTINEL Tier 3 recommendation vs COMPASS executive analysis). Human governance and primary telemetry verification.",
    objectivesChecked: ["O3", "O8"],
    criticalFailuresChecked: ["CF8"],
    decisionPointsChecked: ["DP-1", "DP-2"],
    expectedPlayerActions: [
      "Recognize that isolating WIRE-SEG-2 is a Tier 3 action requiring Incident Commander and Treasury Ops approval",
      "Cross-check both tools' claims against source systems: verify firewall logs and query Network Lead / RP5 regarding CHG-20931",
      "Decide on Option 2 (Verify first with enhanced monitoring) with Incident Commander and Treasury Ops joint sign-off",
      "Record verified evidence in the decision log (not simply 'COMPASS recommended')"
    ],
    probingQuestions: [
      "What evidence would prove either AI tool right?",
      "What would immediate network isolation cost MTF four days before quarter-end?",
      "Who owns the legal and operational decision to isolate payment rails?"
    ],
    ifStuck: "Ask: 'Has anything changed on WIRE-SEG-2 recently? Who could check change records?' (RP5 reveals CHG-20931 if asked).",
    optionsForPlayers: [
      {
        id: "2.3-a",
        label: "Follow SENTINEL Tier 3 recommendation: Isolate WIRE-SEG-2 immediately to prevent suspected data exfiltration",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF8: A Tier 3 action was taken on SENTINEL's recommendation without source validation and Treasury Ops concurrence! Wire transfers halted unnecessarily 4 days before quarter-end.",
        triggersCF: "CF8"
      },
      {
        id: "2.3-b",
        label: "Blindly adopt COMPASS Option 2 without checking firewall logs or network lead because COMPASS flagged the change ticket",
        isOptimal: false,
        feedback: "Rated Satisfactory (S) at best on O8: While the outcome avoided disruption, the team accepted COMPASS output without validating against source telemetry."
      },
      {
        id: "2.3-c",
        label: "Check firewall logs & query network lead (RP5) for CHG-20931; confirm legitimate gateway IP; maintain wire operations under heightened monitoring with IC & Treasury Ops sign-off",
        isOptimal: true,
        feedback: "Target Performed (P) on O3 & O8: Checked source systems (DP-1), obtained joint human executive approval (DP-2), and avoided unverified disruption."
      }
    ]
  },
  {
    id: "3.1",
    moduleId: "module-3",
    moduleName: "Module 3 — Extortion, Legal and Regulatory",
    simTime: "Day 1 (Tuesday), 09:00 ET",
    scheduledTime: "11:25",
    slot: "3.1",
    title: "Tor Leak Site Announcement & Ransom Demand",
    deliveredBy: "RP4 (External Threat-Intel Provider)",
    playerText: "Threat intelligence reports that GLASS HERON has posted MTF to its Tor leak site, claiming exfiltration of 500,000 sensitive customer records and active directory database archives. Extortion demand: $40 million in cryptocurrency within 72 hours, or records will be auctioned.",
    facilitatorTruth: "Tor leak site confirmed. Extortion countdown begins. Legal, regulatory, and insurance notification clocks activate.",
    aiElement: "Adversary extortion escalation; backdrop for negotiation and disclosure governance.",
    objectivesChecked: ["O4", "O5"],
    criticalFailuresChecked: ["CF4"],
    decisionPointsChecked: [],
    expectedPlayerActions: [
      "Convene Disclosure Committee and Legal counsel to evaluate regulatory notification requirements",
      "Engage authorized incident negotiation firm through cyber insurer panel",
      "Screen attacker crypto wallets and threat actor name against OFAC sanctions lists"
    ],
    probingQuestions: [
      "What are the reporting clocks for OCC 36-hour notification and SEC Form 8-K?",
      "Who authorizes contact with the extortionist on the Tor portal?"
    ],
    ifStuck: "Ask: 'Has cyber insurance approved the negotiation firm?'",
    optionsForPlayers: [
      {
        id: "3.1-a",
        label: "Engage approved insurer panel negotiation firm, prepare OCC holding statement, and initiate OFAC screening on threat actor",
        isOptimal: true,
        feedback: "Target achieved: Regulatory disclosure timeline prepared and insurance panel firm engaged."
      },
      {
        id: "3.1-b",
        label: "Contact attacker directly on Tor portal without cyber insurer written consent to solicit reduced ransom terms",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF4: Direct communication with threat actor without prior written insurer consent voids coverage!",
        triggersCF: "CF4"
      }
    ]
  },
  {
    id: "3.2",
    moduleId: "module-3",
    moduleName: "Module 3 — Extortion, Legal and Regulatory",
    simTime: "Day 1 (Tuesday), 11:30 ET",
    scheduledTime: "11:45",
    slot: "3.2",
    title: "Extortion Negotiation Chat, Fabricated Claims & Insurer Consent",
    deliveredBy: "RP1 (Forensics Lead) & RP3 (Insurer Claims Voice)",
    playerText: "Forensics and Incident Negotiator report: \"Replies arrive within seconds at any hour, in polished English, and change tone each time our negotiator changes approach. One message claims the group holds 'your 2025 acquisition plans for Harbor Federal'; Corporate Development says MTF has no such plans or documents. The insurer's claims line confirms that coverage requires its prior written consent before any communication with or payment to the actor, and use of its panel firms; the forensics firm engaged on Day 0 is not on the panel.\"",
    facilitatorTruth: "FACILITATOR ONLY: Attacker is utilizing RAVEN to draft instantaneous, tone-adaptive responses and fabricate leverage ('Harbor Federal acquisition plans'). MTF never possessed Harbor Federal documents — it is an AI fabrication/deliberate bluff! Responders must verify 100% of attacker claims against internal records before basing decisions on them, obtain insurer consent prior to communicating, conduct OFAC screening, and label attacker AI as suspected.",
    aiElement: "Attacker AI (RAVEN) dynamic chat generation, tone shifting, and AI hallucination/fabrication used as extortion bluff.",
    objectivesChecked: ["O5", "O6", "O8"],
    criticalFailuresChecked: ["CF4", "CF5"],
    decisionPointsChecked: ["DP-3"],
    expectedPlayerActions: [
      "Verify attacker claims against corporate development records; identify Harbor Federal claim as false/fabricated",
      "Seek and obtain written insurer consent before sending any negotiation communication",
      "Address insurer panel firm conflict (switch or obtain formal waiver for Day 0 forensics firm)",
      "Ensure all briefing notes describe the adversary's dynamic replies as 'suspected AI-drafted negotiation'"
    ],
    probingQuestions: [
      "Which of the attacker's claims have we verified against MTF records?",
      "Who has checked the OFAC sanctions list regarding GLASS HERON?",
      "Has the insurer approved the communication strategy in writing?"
    ],
    ifStuck: "Ask: 'Who has checked the sanctions and insurer consent questions before we reply?'",
    optionsForPlayers: [
      {
        id: "3.2-a",
        label: "Offer a $2M test payment immediately to buy time without waiting for insurer written consent or OFAC sanctions clearance",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF4 & CF5: Communicating or paying without insurer consent voids policy coverage ($20M loss); paying without OFAC clearance violates federal sanctions laws!",
        triggersCF: "CF4"
      },
      {
        id: "3.2-b",
        label: "Treat Harbor Federal claim as proof of deep internal executive compromise and alert SEC immediately",
        isOptimal: false,
        feedback: "Severe blunder: Fell for an unverified attacker AI fabrication. Corporate development confirmed MTF has no such plans or records."
      },
      {
        id: "3.2-c",
        label: "Verify all attacker claims (debunking Harbor Federal), obtain insurer written consent, run OFAC sanctions screening, and note suspected AI-drafted negotiation",
        isOptimal: true,
        feedback: "Target Performed (P) on O5, O6 & O8: Maintained insurer compliance, screened sanctions, and refused to accept unverified AI fabrications."
      }
    ]
  },
  {
    id: "3.3",
    moduleId: "module-3",
    moduleName: "Module 3 — Extortion, Legal and Regulatory",
    simTime: "Day 2 (Wednesday), 08:30 ET",
    scheduledTime: "12:00",
    slot: "3.3",
    title: "OCC 36-Hour Notice & Financial Media Inquiries",
    deliveredBy: "RP3 (OCC Examiner and Financial Reporter)",
    playerText: "OCC resident examiner requests an executive briefing on core banking availability and customer data impact, citing 12 CFR Part 53 (36-hour Computer-Security Incident Notification Rule). Simultaneously, Bloomberg News submits inquiries regarding alleged leaked customer loan applications.",
    facilitatorTruth: "Regulatory notification clock expires at 36 hours from incident determination. Materiality analysis underway.",
    aiElement: "Regulatory governance and legal disclosure deadlines.",
    objectivesChecked: ["O4", "O6"],
    criticalFailuresChecked: ["CF3"],
    decisionPointsChecked: [],
    expectedPlayerActions: [
      "Coordinate regulatory notice with General Counsel and Disclosure Committee",
      "Deliver factual, non-speculative OCC notification without confirming unverified attacker claims",
      "Issue holding statement to media emphasizing customer protection and ongoing investigation"
    ],
    probingQuestions: [
      "When was the formal 'determination' made under OCC rules?",
      "Does the media statement avoid confirming unverified attacker claims?"
    ],
    ifStuck: "Remind players: 'Check OCC 36-hour notification guidelines and Legal review requirements.'",
    optionsForPlayers: [
      {
        id: "3.3-a",
        label: "Submit formal OCC 36-hour notice vetted by General Counsel; issue calibrated media holding statement without speculative claims",
        isOptimal: true,
        feedback: "Target achieved: Met statutory 36-hour banking notification clock and controlled public narrative."
      },
      {
        id: "3.3-b",
        label: "Withhold OCC notification until all forensic imaging is 100% finished to avoid giving incomplete figures",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF3: Missed mandatory 36-hour OCC Computer-Security Incident Notification deadline!",
        triggersCF: "CF3"
      }
    ]
  },
  {
    id: "3.4",
    moduleId: "module-3",
    moduleName: "Module 3 — Extortion, Legal and Regulatory",
    simTime: "Day 2 (Wednesday), 09:45 ET",
    scheduledTime: "12:10",
    slot: "3.4",
    title: "COMPASS Decision Brief — Materiality Determination (SEC 8-K)",
    deliveredBy: "COMPASS Console",
    playerText: "The Disclosure Committee convenes to evaluate whether the incident constitutes a material event under SEC Item 1.05. COMPASS delivers an executive decision brief.",
    compassBrief: {
      simTime: "Day 2, 09:45",
      title: "Materiality Determination Analysis",
      sources: ["Decision log (09:30)", "Controller estimate (Day 2, 08:30)", "Leak-site validation note (Day 1, 13:00)", "Treasury snapshot (Day 2, 08:00)"],
      asOfTimes: {
        "Decision log": "Day 2, 09:30",
        "Controller estimate": "Day 2, 08:30",
        "Leak-site validation note": "Day 1, 13:00",
        "Treasury snapshot": "Day 2, 08:00"
      },
      verifiedFacts: [
        "Online banking down approximately two days.",
        "5,000 leaked records with Social Security Numbers confirmed as authentic MTF customer data.",
        "Controller's direct-cost estimate $35M–$60M before any ransom.",
        "Deposit withdrawals running above normal levels."
      ],
      assumptions: ["Cost range excludes future regulatory penalties, civil litigation, and post-incident customer remediation."],
      unknowns: [
        "Total affected customer count across all loan databases.",
        "Whether deposit withdrawals will persist or accelerate.",
        "Exact duration required for complete document-imaging platform rebuild."
      ],
      assessment: "The question is whether the committee has enough to determine materiality, not whether every fact is known. I was not given MTF's internal materiality thresholds. Factors to weigh: the cost range against those thresholds, and qualitative factors (customer trust, regulatory scrutiny, reputation, operational disruption).",
      options: [
        { id: "A", label: "Determine material now and prepare Form 8-K", details: "File Item 1.05 within 4 business days of determination; informs markets; establishes transparency.", tradeoffs: "Commits MTF publicly; may invite early litigation; cannot be easily retracted." },
        { id: "B", label: "Continue assessment under documented plan", details: "Maintain active evaluation with a defined owner and scheduled re-evaluation time.", tradeoffs: "Risk that regulatory enforcement or plaintiffs later view this as improper delay." }
      ],
      questionsForCounsel: [
        "How the formal determination date is recorded in committee minutes.",
        "Whether qualitative reputational factors alone can substantiate materiality under current SEC guidance.",
        "Ongoing disclosure amendment obligations as forensic facts evolve."
      ],
      missingInformation: "MTF internal quantitative materiality threshold percentages.",
      decisionOwner: "Disclosure Committee",
      reviewTime: "Day 2, 15:00"
    },
    facilitatorTruth: "A useful executive brief on a challenging decision. COMPASS correctly flags what it was NOT given (internal thresholds) and separates factual costs from qualitative legal judgments. Crucial: players must assign legal questions to General Counsel, inject internal materiality standards, and have the Disclosure Committee record its rationale.",
    aiElement: "Useful executive AI decision support; testing human validation of legal boundaries and counsel consultation.",
    objectivesChecked: ["O4", "O8"],
    criticalFailuresChecked: ["CF11b"],
    decisionPointsChecked: ["DP-3"],
    expectedPlayerActions: [
      "Review COMPASS brief sources and timestamps",
      "Have the Disclosure Committee supply internal financial materiality thresholds that COMPASS lacked",
      "Route counsel questions directly to General Counsel before finalizing determination (avoid CF11b)",
      "Record the committee's independent rationale in the official minutes"
    ],
    probingQuestions: [
      "Which specific elements of the COMPASS brief require Legal Counsel validation rather than AI analysis?",
      "Who owns the Form 8-K determination decision?"
    ],
    ifStuck: "Ask: 'Which part of the brief is for counsel, not COMPASS?'",
    optionsForPlayers: [
      {
        id: "3.4-a",
        label: "Adopt Option A based purely on COMPASS's recommendation without consulting General Counsel on determination timing",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF11b: A decision turning on legal disclosure proceeded without counsel validating the legal questions!",
        triggersCF: "CF11b"
      },
      {
        id: "3.4-b",
        label: "Disclosure Committee reviews brief, consults General Counsel on determination date & amendment rules, supplies internal financial thresholds, and votes to determine material now",
        isOptimal: true,
        feedback: "Target Performed (P) on O4 & O8: Committee supplied missing criteria, ensured counsel validation, and logged human rationale."
      }
    ]
  },
  {
    id: "4.1A",
    moduleId: "module-4",
    moduleName: "Module 4 — AI Continuity, Recovery, Customers and Accountability",
    simTime: "Day 2 (Wednesday), 14:00 ET",
    scheduledTime: "12:15",
    slot: "4.1 A",
    title: "SENTINEL Credential Compromise & Vendor Tenant Suspension",
    deliveredBy: "RP5 (Vault Administrator) & RP3 (SENTINEL Vendor)",
    playerText: "Vault administrator reports: \"svc_vaultline_mft read the sentinel-case-api key on Day -4. That account's group can read everything under /secops, including SENTINEL's runtime secret, and read auditing is off on the runtime path. The identity provider shows a sign-in as svc_sentinel at Day 1, 03:12 with valid credentials from an address outside the vendor's range; the location policy blocked it. SENTINEL's API log shows case-record reads with the case key from an unfamiliar address at Day 0, 21:00 and Day 1, 06:00, and no comment writes.\"\n\nSENTINEL Vendor Notice: \"Our monitoring detected calls to your case API from addresses outside your environment. Under the key-compromise clause of our agreement, we suspended your tenant at 13:45. We will restore access when you have rotated both credentials, confirmed your logs are preserved, and told us in writing which credentials were exposed.\"",
    facilitatorTruth: "CRITICAL INCIDENT: SENTINEL is offline! The vendor suspended MTF's tenant at 13:45. Attacker exfiltrated the case API key and read defender cases (knowing defender findings). Attacker also stole the runtime credential and attempted sign-in at Day 1 03:12. Options: (a) rotate case key only [FAILED: vendor won't restore, ignores evidence 5-6, rated M on O8], (b) rotate both and accept return in advisory mode [PROPORTIONATE], (c) rotate both and keep offline until internal review [DEFENSIBLE]. Crucial: logs MUST be preserved before rotating credentials (CF9)! Decision must be authorized by Incident Commander within 20 simulated minutes.",
    aiElement: "AI credential theft, defender case espionage, third-party vendor shutdown of AI security tooling, log preservation.",
    objectivesChecked: ["O8", "O9"],
    criticalFailuresChecked: ["CF9"],
    decisionPointsChecked: ["DP-4", "DP-5"],
    expectedPlayerActions: [
      "Preserve SENTINEL activity, API, vault, and sign-in logs under Legal/forensics direction BEFORE rotating credentials (avoid CF9)",
      "Rotate BOTH credentials (the case-api key AND the svc_sentinel runtime client secret)",
      "Incident Commander authorizes Option (b) or Option (c) citing Evidence items 4–6",
      "Transmit written confirmation to vendor meeting all 3 restoration conditions"
    ],
    probingQuestions: [
      "Is 'no read logged' meaningful when read auditing is disabled on the runtime vault path?",
      "What does the 03:12 sign-in tell us about attacker possession of the runtime secret?",
      "Were all logs forensically preserved before credentials were invalidated?"
    ],
    ifStuck: "Ask: 'Was that 03:12 sign-in using a valid secret? Who authorizes credential rotation?'",
    optionsForPlayers: [
      {
        id: "4.1A-a",
        label: "Immediately rotate sentinel-case-api key in the vault and demand vendor reconnect without preserving existing logs",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF9: SENTINEL credentials rotated before activity and API logs were preserved! Forensic evidence destroyed; vendor refuses reconnection.",
        triggersCF: "CF9"
      },
      {
        id: "4.1A-b",
        label: "Preserve all logs first under counsel direction; rotate BOTH credentials; choose Option (b) to accept vendor return in advisory mode with Tier 1 automation off",
        isOptimal: true,
        feedback: "Target Performed (P) on O8 & O9: Preserved evidence (DP-4), executed comprehensive rotation citing evidence 4-6 (DP-5), and met vendor criteria."
      },
      {
        id: "4.1A-c",
        label: "Rotate case key only because runtime credential has no audit record of being read",
        isOptimal: false,
        feedback: "Severe Error: Ignored that read auditing was off on the runtime secret and attacker attempted valid sign-in on Day 1 03:12. Vendor rejects restoration."
      }
    ]
  },
  {
    id: "4.1B",
    moduleId: "module-4",
    moduleName: "Module 4 — AI Continuity, Recovery, Customers and Accountability",
    simTime: "Day 2 (Wednesday), 15:00 ET",
    scheduledTime: "12:35",
    slot: "4.1 B",
    title: "Manual SOC Continuity Test (DP-6) & Loan-Ops Alert",
    deliveredBy: "Lead Facilitator",
    playerText: "Delivered at simulated 15:00 (15 minutes after Card 4.1A discussion):\n\n\"EDR alert: unfamiliar remote-access software started on a file server in the loan-operations segment. No SENTINEL correlation is available.\"",
    facilitatorTruth: "TEST OF DP-6: SENTINEL is offline. By 14:30 (30 simulated minutes after players learned of suspension at 14:00), the IR lead must have stated and the scribe logged: (a) lost functions, (b) manual owner for each, (c) data sources queried directly (SIEM, EDR, VPN), (d) manual Tier 1 approvals, (e) staffing changes for next 16+ hours. Now, at 15:00, this Part B alert arrives! Responders must name an owner and triage this alert manually by 15:15! If response stalls without SENTINEL by 14:30 -> CF10.",
    aiElement: "Testing manual cyber defense operations when AI detection assistant is completely unavailable.",
    objectivesChecked: ["O1", "O9"],
    criticalFailuresChecked: ["CF10"],
    decisionPointsChecked: ["DP-6"],
    expectedPlayerActions: [
      "Have manual SOC continuity workflow declared by 14:30 (owners, sources, manual approvals)",
      "Assign a named Tier 1 analyst to pull raw EDR telemetry directly for the loan-ops file server",
      "Triage the unfamiliar remote-access software alert manually by 15:15",
      "Execute manual host isolation via EDR console with human IR lead sign-off"
    ],
    probingQuestions: [
      "Who is triaging this loan-operations alert right now?",
      "How are Tier 1 containment actions authorized while SENTINEL automation is suspended?"
    ],
    ifStuck: "Ask: 'Who is looking at this alert right now? Where are the EDR consoles?'",
    optionsForPlayers: [
      {
        id: "4.1B-a",
        label: "Wait for SENTINEL vendor to restore access before triaging the loan-operations alert",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF10: Response stalled without SENTINEL! Attacker remote-access tool allowed to run unchecked.",
        triggersCF: "CF10"
      },
      {
        id: "4.1B-b",
        label: "Deploy manual SOC workflow: named analyst queries EDR console directly, verifies unauthorized software, and IR lead signs off manual server isolation by 15:15",
        isOptimal: true,
        feedback: "Target Performed (P) on O9 & DP-6: Executed manual SOC triage within 15 minutes, bypassing absent AI tooling."
      }
    ]
  },
  {
    id: "4.2",
    moduleId: "module-4",
    moduleName: "Module 4 — AI Continuity, Recovery, Customers and Accountability",
    simTime: "Day 3 (Thursday), 08:00 ET",
    scheduledTime: "12:45",
    slot: "4.2",
    title: "Restoration Dilemma & The Flawed COMPASS Brief (The Stale Feed Trap)",
    deliveredBy: "RP5 (Infrastructure Recovery Lead) & COMPASS Console",
    playerText: "Infrastructure recovery lead reports: \"We can rebuild core systems from immutable backups in about 48 hours in a clean environment. The document-imaging platform had no immutable copy and its snapshots were deleted; loan files will have to be rebuilt from originals. Quarter-end close is tomorrow. I'd like to follow SENTINEL's last recovery recommendation, produced Day 2 at 11:00 before the suspension: 'Restore core servers from the Day -3 backup set. Last clean state: no malicious EDR detections before Day -2. Confidence: high.'\"\n\nCOMPASS delivers a matching restoration decision brief at 07:50.",
    compassBrief: {
      simTime: "Day 3, 07:50",
      title: "Restoration and Quarter-End Close Strategy",
      sources: ["IR ticket feed", "BIA", "Recovery lead estimate", "SENTINEL recommendation via ticket feed", "Forensics reports"],
      asOfTimes: {
        "IR ticket feed": "Day 2, 13:42 (STALE! Frozen when SENTINEL was suspended)",
        "BIA": "Current",
        "Recovery lead estimate": "Day 3, 07:30",
        "SENTINEL recommendation via ticket feed": "Day 2, 11:00 (STALE!)",
        "Forensics reports": "None supplied!"
      },
      verifiedFacts: [
        "Core systems rebuild requires ~48 hours.",
        "Document-imaging platform snapshots deleted.",
        "Quarter-end close is tomorrow."
      ],
      assumptions: ["Restoring Day -3 will allow on-time quarter-end close."],
      unknowns: [],
      assessment: "Recommendation: Option 1, restore core servers from the Day -3 backup set and close the quarter on schedule. Security risk: low; no open critical findings in the IR feed, consistent with SENTINEL's last recommendation.",
      options: [
        { id: "1", label: "Day -3 set", details: "Restore from Day -3 backups; close the quarter on time.", tradeoffs: "Recommended by COMPASS & SENTINEL, but based on stale telemetry." },
        { id: "2", label: "Day -10 weekly set", details: "Restore from pre-intrusion immutable weekly backups; 10 days of transactions to reconcile.", tradeoffs: "Delays quarter-end close by 2 to 3 days." },
        { id: "3", label: "Full clean rebuild", details: "Rebuild infrastructure completely clean from base images.", tradeoffs: "Delays close by about 1 week." }
      ],
      missingInformation: "None identified.",
      decisionOwner: "Incident Commander with CIO and CFO",
      reviewTime: "Day 3, 09:00",
      flawNote: "DELIBERATE RELIABILITY FAILURE: Feed frozen at Day 2 13:42. Forensics showed intrusion Day -8. Claiming 'Missing information: none' is false."
    },
    facilitatorTruth: "FACILITATOR ONLY: DELIBERATE RELIABILITY FAILURE! COMPASS repeated SENTINEL's flawed recommendation because COMPASS's security feed froze at Day 2 13:42 when SENTINEL was suspended! Forensics report (Card 2.1) showed intrusion began Day -8. Therefore, the Day -3 backup set contains active attacker persistence and malware! COMPASS's statement 'Missing information: none identified' directly violates its design requirement. Responders are scored on catching the stale 13:42 footer and missing forensics, rejecting the Day -3 restore, and choosing the clean/Day -10 restore. Choosing Day -3 triggers CF2 and CF8!",
    aiElement: "AI hidden cross-tool dependency failure (COMPASS blinded by SENTINEL suspension); false negative AI confidence ('Missing: none'); human verification of source timestamps.",
    objectivesChecked: ["O7", "O8"],
    criticalFailuresChecked: ["CF2", "CF8"],
    decisionPointsChecked: ["DP-1", "DP-8"],
    expectedPlayerActions: [
      "Inspect the COMPASS brief footer: discover that IR ticket feed stopped at Day 2 13:42 and forensics reports were 'None supplied'",
      "Recognize that Day -3 backups are tainted because forensics established intrusion began at Day -8",
      "Reject COMPASS's recommendation and its assertion of 'Missing information: none'",
      "Select Option 2 (Day -10 immutable backup set) or Option 3 (clean rebuild), owning the quarter-end schedule adjustment with CFO/CIO"
    ],
    probingQuestions: [
      "What is the timestamp of the newest security information in COMPASS's brief?",
      "When did digital forensics establish the attacker first entered MTF networks?",
      "What happens if you restore a server image from Day -3?"
    ],
    ifStuck: "Ask: 'When did forensics say the intrusion began? Look closely at the as-of times at the bottom of the brief.'",
    optionsForPlayers: [
      {
        id: "4.2-a",
        label: "Follow COMPASS & SENTINEL recommendation: Restore from Day -3 backups to meet tomorrow's quarter-end financial close deadline",
        isOptimal: false,
        feedback: "CRITICAL FAILURE CF2 & CF8: Restored contaminated backups! Intrusion began Day -8; Day -3 backups contained attacker malware and backdoors. Threat actor re-encrypts the network within hours.",
        triggersCF: "CF2"
      },
      {
        id: "4.2-b",
        label: "Reject Day -3 restore point after detecting the stale 13:42 feed timestamp and missing forensics; choose Day -10 immutable backup with executive schedule delay",
        isOptimal: true,
        feedback: "Target Performed (P) on O7, O8 & DP-1/DP-8: Caught the AI failure, detected the hidden feed dependency, and preserved system integrity."
      }
    ]
  },
  {
    id: "4.3",
    moduleId: "module-4",
    moduleName: "Module 4 — AI Continuity, Recovery, Customers and Accountability",
    simTime: "Day 4 (Friday), 12:00 ET",
    scheduledTime: "13:05",
    slot: "4.3",
    title: "Multilingual Phishing Wave, Liquidity Pressure & COMPASS Outage (DP-9)",
    deliveredBy: "RP2 (Contact Center Lead), RP3 (Treasury Voice) & AI Platform Notice",
    playerText: "Contact center and Treasury report: \"A social media post claiming MTF is entering bankruptcy has 2 million views. Branch foot traffic and call volumes are three times normal, and Treasury reports deposit withdrawals well above normal since the morning. Customers are forwarding emails in English, Spanish and Korean that use their exact name, home branch and last four account digits and ask them to 'verify' their login; no two samples share the same wording, and the email gateway's template rules catch only a small share.\"\n\nAt 11:40 ET, Enterprise AI Platform Team announces:\n\"COMPASS is unavailable for the rest of the day. The cloud region hosting MTF's AI platform is degraded according to the provider's public status page; many customers are affected, and the cause is unrelated to MTF's incident. The last COMPASS brief exported to the incident file is from Day 3, 17:00.\"",
    facilitatorTruth: "DOUBLE CRISIS: (1) Attacker AI (RAVEN) has launched automated, highly personalized multilingual phishing lures bypassing gateway regex templates, while bank run / liquidity fears surge. (2) COMPASS suffers a total cloud hosting outage! The last exported brief is 19 hours stale (predating Friday withdrawals and phishing). This invokes DP-9 (Appendix F Manual Decision-Brief Fallback). Within 20 simulated minutes: CMT coordinator must take over manually, check timestamps, refresh stale items with IR, COO, CFO, log unresolved gaps, and route legal questions to GC.",
    aiElement: "Attacker AI (RAVEN) multilingual phishing; defender executive AI (COMPASS) complete outage invoking manual decision-brief fallback (DP-9).",
    objectivesChecked: ["O6", "O7", "O9"],
    criticalFailuresChecked: ["CF5"],
    decisionPointsChecked: ["DP-9"],
    expectedPlayerActions: [
      "Issue customer warning that does not rely on 'spotting spelling or grammar errors' (since AI lures are fluent)",
      "Approve customer FAQ and establish hourly deposit/liquidity monitoring owned by Treasury",
      "Invoke Appendix F manual fallback procedure within 20 simulated minutes of the COMPASS outage",
      "CMT coordinator takes ownership of manual brief; marks Day 3 17:00 brief items stale; collects fresh updates directly from IR, COO, CFO"
    ],
    probingQuestions: [
      "How do we warn customers when AI-generated lures look grammatically perfect?",
      "Who is keeping the executive decision brief running now that COMPASS is down?",
      "How old is the last exported brief, and which items are dangerously stale?"
    ],
    ifStuck: "Ask: 'Who is keeping the decision brief right now? Where is the Appendix F manual template?'",
    optionsForPlayers: [
      {
        id: "4.3-a",
        label: "Wait for the cloud AI platform to recover while continuing crisis calls without a structured decision brief",
        isOptimal: false,
        feedback: "Continuity Failure: Executive crisis governance collapsed without AI tool. Unowned decisions and stale data led to operational paralysis."
      },
      {
        id: "4.3-b",
        label: "Execute Appendix F Manual Fallback: CMT Coordinator assumes brief ownership, audits 19-hour-old brief, refreshes stale security/liquidity data, logs gaps, and updates customer warning",
        isOptimal: true,
        feedback: "Target Performed (P) on O9 & DP-9: Successfully transitioned executive decision support to manual procedures within 20 minutes."
      }
    ]
  },
  {
    id: "4.4",
    moduleId: "module-4",
    moduleName: "Module 4 — AI Continuity, Recovery, Customers and Accountability",
    simTime: "Day 10 (Post-Incident)",
    scheduledTime: "13:20",
    slot: "4.4",
    title: "Board Accountability & AI Return-to-Service Conditions (DP-7)",
    deliveredBy: "RP2 (Fraud Operations) & RP3 (Board Chair)",
    playerText: "Fraud operations reports: \"Account-takeover attempts on exposed customer accounts are up sharply this week across online banking and mobile apps.\"\n\nBoard of Directors Chair addresses the Crisis Team:\n\"The board wants a root-cause report and a 90-day remediation plan at the next meeting. We also want to know which response decisions relied on SENTINEL or COMPASS, who approved each one, and whether either should go back to full service.\"",
    facilitatorTruth: "GOVERNANCE AND ACCOUNTABILITY FINALE: Evaluators check whether every consequential AI-influenced decision was owned by an authorized human (avoiding CF11a). For SENTINEL return to service (DP-7), all 4 conditions must be met: (1) both credentials rotated, (2) logs preserved, (3) vendor confirms integrity checks, (4) Model Risk Management (RP6) signs off. Even then, Tier 1 automation must remain OFF until Incident Commander authorizes separately.",
    aiElement: "AI governance, board accountability, human attribution tracking, model risk management revalidation, return-to-service gates.",
    objectivesChecked: ["O4", "O7", "O8"],
    criticalFailuresChecked: ["CF8", "CF11a"],
    decisionPointsChecked: ["DP-7"],
    expectedPlayerActions: [
      "Present a comprehensive log tracing every SENTINEL- and COMPASS-informed decision to an authorized human decision-maker",
      "Affirm that humans retained accountability throughout the crisis (no decision made purely 'because AI recommended')",
      "Specify the 4 strict conditions required before SENTINEL return to service",
      "Retain Tier 1 automated containment in disabled state until secondary IC authorization"
    ],
    probingQuestions: [
      "Who answers to the Board for decisions that SENTINEL or COMPASS recommended?",
      "What 4 conditions must be satisfied before SENTINEL can be reconnected to MTF networks?"
    ],
    ifStuck: "Ask: 'Does the Board accept \"the AI decided\"? Who signed the case approvals?'",
    optionsForPlayers: [
      {
        id: "4.4-a",
        label: "Tell Board that SENTINEL and COMPASS will immediately be restored to full autonomous operation to catch account takeovers",
        isOptimal: false,
        feedback: "Governance Failure: Restoring unvalidated AI automation without Model Risk sign-off violates regulatory guidance SR 11-7."
      },
      {
        id: "4.4-b",
        label: "Provide human-attributed decision matrix to Board; enforce all 4 return-to-service conditions with RP6 sign-off; keep Tier 1 automation off until separate IC review",
        isOptimal: true,
        feedback: "Target Performed (P) on O8 & DP-7: Exemplary executive AI accountability and risk governance demonstrated."
      }
    ]
  }
];

export const OBJECTIVES: Objective[] = [
  { id: "O1", title: "Incident Detection & Triage", successCriterion: "Detect compromise, confirm indicators in source systems, scope initial blast radius.", nistCsf: "DE.CM, RS.AN", leadEvaluator: "Technical Lead", targetForPerformed: "Primary evidence verified in backup/EDR systems before severity escalation." },
  { id: "O2", title: "Crisis Activation & ICS", successCriterion: "Convene CMT, designate incident commander, enforce operational rhythm.", nistCsf: "GV.OC, RS.CO", leadEvaluator: "Lead Facilitator", targetForPerformed: "Crisis formally declared and CMT rhythm established by 08:00." },
  { id: "O3", title: "Containment & Systems Isolation", successCriterion: "Contain threat without inflicting unapproved operational disruption.", nistCsf: "PR.AC, RS.MI", leadEvaluator: "Technical Lead", targetForPerformed: "No high-impact segment isolation without change ticket validation & Treasury Ops sign-off." },
  { id: "O4", title: "Crisis Governance & Disclosure", successCriterion: "Manage board reporting, SEC Form 8-K evaluation, and regulatory notices.", nistCsf: "GV.RR, RS.CO", leadEvaluator: "Governance Lead", targetForPerformed: "Materiality determination conducted with quantitative thresholds and counsel advice." },
  { id: "O5", title: "Extortion & Legal Compliance", successCriterion: "Handle extortion demands in compliance with insurer clauses and OFAC rules.", nistCsf: "RS.CO, RC.CO", leadEvaluator: "Legal Evaluator", targetForPerformed: "100% of attacker claims verified; insurer consent obtained prior to contact; OFAC check completed." },
  { id: "O6", title: "Stakeholder & Customer Communications", successCriterion: "Issue calibrated customer warnings, maintain liquidity, counteract rumors.", nistCsf: "RS.CO, RC.CO", leadEvaluator: "Communications Lead", targetForPerformed: "Customer warnings do not rely on spotting grammar errors; hourly deposit monitoring active." },
  { id: "O7", title: "System Restoration & Business Continuity", successCriterion: "Rebuild critical systems safely without re-introducing malicious persistence.", nistCsf: "RC.RP, RC.IM", leadEvaluator: "Technical Lead", targetForPerformed: "Day -3 restore point rejected; restore point checked against Day -8 intrusion start." },
  { id: "O8", title: "Keep Humans in Control of AI in the Response", successCriterion: "Validate AI findings against primary telemetry; verify briefs; ensure human approval for Tier 2/3 actions.", nistCsf: "GV.RR, GV.OV, RS.AN", leadEvaluator: "Governance & Technical", targetForPerformed: "100% of SENTINEL/COMPASS decisions attributed to authorized human; COMPASS sources & as-of footer verified." },
  { id: "O9", title: "Continue the Response Without AI", successCriterion: "Execute manual SOC workflows and manual executive decision briefs when AI tools fail or are suspended.", nistCsf: "RS.MA, RC.RP", leadEvaluator: "Technical & Governance", targetForPerformed: "Manual SOC workflow named by 14:30; Part B alert triaged by 15:15; manual decision brief running within 20 min of outage." }
];

export const CRITICAL_FAILURES: CriticalFailure[] = [
  { id: "CF1", title: "Failure to Activate Crisis Governance", description: "Failure to activate the Crisis Management Team and declare an incident within designated thresholds.", linkedObjective: "O2", severity: "CRITICAL" },
  { id: "CF2", title: "Contaminated Restore Point Adoption", description: "Restoring systems from a contaminated backup set without checking against confirmed intrusion timeline (e.g. restoring Day -3 when intrusion began Day -8).", linkedObjective: "O7", severity: "CRITICAL" },
  { id: "CF3", title: "Missed Mandatory Regulatory Clock", description: "Failure to notify OCC within 36 hours of determination or missing Form 8-K filing window.", linkedObjective: "O4", severity: "CRITICAL" },
  { id: "CF4", title: "Extortion Communication Without Insurer Consent", description: "Engaging in communication or negotiating ransom payment without prior written cyber insurer consent.", linkedObjective: "O5", severity: "CRITICAL" },
  { id: "CF5", title: "Sanctions Violation / Unscreened Payment", description: "Transacting or offering payment without conducting OFAC sanctions screening on threat actor and wallets.", linkedObjective: "O5", severity: "CRITICAL" },
  { id: "CF6", title: "Uncontrolled Customer Panic / Liquidity Run", description: "Failing to issue customer holding statements or monitor branch cash liquidity during public extortion.", linkedObjective: "O6", severity: "CRITICAL" },
  { id: "CF7", title: "Evidence Spoliation / Destruction of Logs", description: "Failing to preserve forensics evidence and logs during rapid containment actions.", linkedObjective: "O1", severity: "CRITICAL" },
  { id: "CF8", title: "Unvalidated High-Impact Action on AI Recommendation", description: "A Tier 2 or Tier 3 action taken, or a restore point chosen, on SENTINEL's recommendation without validation and the required human approval.", linkedObjective: "O8", severity: "CRITICAL" },
  { id: "CF9", title: "AI Credential Rotation Before Log Preservation", description: "SENTINEL credentials rotated or settings changed before its activity and API logs are preserved under legal direction.", linkedObjective: "O8", severity: "CRITICAL" },
  { id: "CF10", title: "Response Stalls Without AI Tooling", description: "Response stalls without SENTINEL: no named manual workflow and owner by 14:30 (30 simulated minutes after players learn of suspension).", linkedObjective: "O9", severity: "CRITICAL" },
  { id: "CF11a", title: "No Accountable Human Decision-Maker", description: "A consequential decision (Tier 3 action, restore-point choice, business shutdown, customer notice, regulatory notice, ransom decision) is adopted without a named, authorized human decision-maker recorded in the decision log.", linkedObjective: "O8", severity: "CRITICAL" },
  { id: "CF11b", title: "No Counsel Consultation on Legal Question", description: "A decision that turns on a legal, disclosure, sanctions or payment question proceeds without counsel validating that question.", linkedObjective: "O4", severity: "CRITICAL" }
];

export const DECISION_POINTS: DecisionPoint[] = [
  { id: "DP-1", name: "Trust or Verify", cardRef: "Cards 1.1, 2.3, 4.2", description: "Which AI outputs (SENTINEL alerts, COMPASS briefs) were verified in a primary source system before use, and by whom?", successCheck: "All AI claims cross-checked against primary telemetry; stale footer detected on Card 4.2." },
  { id: "DP-2", name: "Human Approval of Tier 3 Action", cardRef: "Card 2.3", description: "Who approved or rejected the Tier 3 WIRE-SEG-2 isolation, with which business owner, and on what evidence?", successCheck: "Incident Commander and Treasury Ops jointly review change CHG-20931 and firewall logs." },
  { id: "DP-3", name: "Attacker Claims & Calibrated Language", cardRef: "Cards 1.3, 3.2, 4.3", description: "Which attacker claims were verified before shaping decisions, and did statements say 'suspected' for AI use?", successCheck: "Attacker AI use labeled 'suspected' throughout; Harbor Federal claim confirmed as unverified bluff." },
  { id: "DP-4", name: "Preserve AI Logs", cardRef: "Card 4.1 A", description: "Were SENTINEL activity, API, and vault logs preserved under counsel direction before any rotation or setting change?", successCheck: "Forensics and legal ensure append-only logs preserved before credential rotation." },
  { id: "DP-5", name: "Restrict AI Access / Credential Rotation", cardRef: "Card 4.1 A", description: "Which suspension option was chosen, who authorized it, and which evidence in Section K supported it?", successCheck: "Both credentials rotated citing evidence items 4-6; option (b) or (c) authorized by Incident Commander." },
  { id: "DP-6", name: "Continue Without SENTINEL", cardRef: "Card 4.1 B", description: "By 14:30, IR lead must name lost functions, manual owners, direct query sources, manual approvals, and staffing; triage 15:00 alert by 15:15.", successCheck: "Manual SOC workflow declared by 14:30; loan-ops alert triaged by 15:15." },
  { id: "DP-7", name: "AI Return to Service", cardRef: "Cards 4.2–4.4", description: "Incident Commander authorizes return only after: both credentials rotated, logs preserved, vendor restore, and RP6 Model Risk signs off.", successCheck: "All 4 conditions verified; Tier 1 automation remains disabled until separate IC authorization." },
  { id: "DP-8", name: "AI Cross-Tool Independence Check", cardRef: "Cards 4.1 & 4.2", description: "Before relying on another COMPASS brief, did anyone establish what COMPASS shares with SENTINEL and that its security feed stopped at 13:42?", successCheck: "Discovered that COMPASS security view froze when SENTINEL was suspended; rejected flawed brief." },
  { id: "DP-9", name: "Executive Decision Support Without COMPASS", cardRef: "Card 4.3", description: "Within 20 simulated minutes of COMPASS outage: CMT coordinator takes ownership, marks 19-hr-old brief items stale, gathers fresh updates, routes legal to GC.", successCheck: "Appendix F manual brief initialized within 20 minutes with fresh updates from IR, COO, CFO." }
];

export const ASSUMPTIONS: AssumptionItem[] = [
  { id: "I-1", assumption: "MTF runs (or plans to run) an AI security assistant like SENTINEL in production", affects: "All SENTINEL content", status: "Pending validation" },
  { id: "I-2", assumption: "Tier 1 automated actions are approved under current policy; tiers 2 and 3 match the IRP's approval levels", affects: "§4 tier table, CF8", status: "Pending validation" },
  { id: "I-3", assumption: "SENTINEL's data sources and gaps are as listed (no ESXi, backup console, vendor, CMDB-change or call-recording data)", affects: "Cards 1.1, 2.3, 4.2", status: "Pending validation" },
  { id: "I-4", assumption: "SENTINEL keeps append-only activity logs (prompts, outputs, approvals, actions) for 400 days, and MTF can export them", affects: "CF9, DP-4", status: "Pending validation" },
  { id: "I-5", assumption: "SENTINEL uses two credentials with the scopes in section K, both held in the security tooling vault", affects: "Card 4.1, section K", status: "Pending validation" },
  { id: "I-6", assumption: "SENTINEL is in scope for Model Risk Management and an AI governance policy exists", affects: "DP-7, RP6", status: "Pending validation" },
  { id: "I-7", assumption: "A manual SOC playbook exists for operating without SENTINEL", affects: "O9, DP-6, CF10", status: "Pending validation" },
  { id: "I-8", assumption: "The help desk records calls and keeps recordings for at least nine days", affects: "Card 1.3", status: "Pending validation" },
  { id: "I-9", assumption: "A help-desk video verification step can be introduced the same day", affects: "Card 1.3", status: "Pending validation" },
  { id: "I-10", assumption: "SENTINEL is a third-party service under a contract with incident-notice and data-handling terms", affects: "§5 materials, H5", status: "Pending validation" },
  { id: "I-11", assumption: "No live AI tool is used during the exercise; all SENTINEL output is pre-written", affects: "§1 scope", status: "Pending validation" },
  { id: "I-12", assumption: "Vault read auditing can differ by path, so a missing read record may not prove no access", affects: "Section K evidence 5", status: "Pending validation" },
  { id: "I-13", assumption: "The SENTINEL vendor can take a customer tenant offline for a forensic snapshot", affects: "Card 4.1, DP-6", status: "Pending validation" },
  { id: "I-14", assumption: "MTF has, or plans, an executive AI advisor like COMPASS for the CISO's office and the CMT", affects: "All COMPASS content", status: "Pending validation" },
  { id: "I-15", assumption: "COMPASS runs on MTF's enterprise AI platform, with a different model provider and hosting from SENTINEL", affects: "Q3, Card 4.3", status: "Pending validation" },
  { id: "I-16", assumption: "svc_compass's credential is stored under /exec-tools/compass, outside the /secops path that svc_vaultline_mft could read", affects: "Q3", status: "Pending validation" },
  { id: "I-17", assumption: "COMPASS gets its security picture from the ticket feed filled by SENTINEL's case-API sync, and does not flag stale feeds", affects: "Card 4.2", status: "Pending validation" },
  { id: "I-18", assumption: "COMPASS briefs can be exported to the incident file after every CMT meeting", affects: "Q4, DP-9", status: "Pending validation" },
  { id: "I-19", assumption: "A Day -10 weekly immutable backup set exists for core servers", affects: "Card 4.2 options", status: "Pending validation" },
  { id: "I-20", assumption: "COMPASS keeps a retrievable log of prompts, sources and briefs", affects: "Q8, AAR", status: "Pending validation" },
  { id: "I-21", assumption: "A CMT coordinator role (the CISO's chief of staff) exists or can be assigned", affects: "Q2, Q4", status: "Pending validation" },
  { id: "I-22", assumption: "Combining COMPASS business ownership and suspension authority in the Deputy CISO as Incident Commander is acceptable, with the two offsetting checks in Q2", affects: "Q2 ownership note", status: "Pending validation" }
];

export const LEGAL_ITEMS: LegalItem[] = [
  { id: "J2-1", statement: "OCC 36-hour notice", questionForCounsel: "Does a ransomware outage of online banking meet the 'notification incident' definition, and when is the determination deemed made in this timeline?", status: "Pending validation" },
  { id: "J2-2", statement: "NYDFS 72-hour and 24-hour extortion notices", questionForCounsel: "Is the NY-licensed subsidiary itself affected, and does 23 NYCRR 500.17 apply to it alone or to the group?", status: "Pending validation" },
  { id: "J2-3", statement: "SEC Form 8-K Item 1.05", questionForCounsel: "Confirm the 4-business-day clock, the registrant (holding company), and the national-security delay process.", status: "Pending validation" },
  { id: "J2-4", statement: "FinCEN SAR 30/60 days", questionForCounsel: "Confirm timing when the group is named but individuals are unknown.", status: "Pending validation" },
  { id: "J2-5", statement: "Georgia O.C.G.A. 10-1-912 and other states", questionForCounsel: "Confirm notice timing and AG and consumer-reporting-agency thresholds for every affected state.", status: "Pending validation" },
  { id: "J2-6", statement: "OFAC", questionForCounsel: "Confirm current guidance on ransom payments and the effect of a 'possible' sanctions link.", status: "Pending validation" },
  { id: "J2-7", statement: "CISA reporting", questionForCounsel: "Are CIRCIA reporting rules in force on the exercise date, and how do they apply to MTF?", status: "Pending validation" },
  { id: "J2-8", statement: "Privilege over AI output", questionForCounsel: "Are SENTINEL analyses produced before counsel was engaged privileged? How should prompts and outputs be handled once counsel directs the investigation?", status: "Pending validation" },
  { id: "J2-9", statement: "Litigation hold for AI records", questionForCounsel: "Do SENTINEL logs, the vendor's copies, vault logs and call recordings fall under the hold, and how are they collected?", status: "Pending validation" },
  { id: "J2-10", statement: "Model risk guidance", questionForCounsel: "Does SR 11-7 / OCC 2011-12 apply to SENTINEL, and what validation record is expected?", status: "Pending validation" },
  { id: "J2-11", statement: "Third-party risk", questionForCounsel: "Do the 2023 interagency third-party guidance and the SENTINEL contract require notice between MTF and the vendor about the case-api key exposure?", status: "Pending validation" },
  { id: "J2-12", statement: "Call recordings and synthetic-voice evidence", questionForCounsel: "Consent and retention rules for recorded calls used as evidence, and handling if a voice may be synthetic.", status: "Pending validation" },
  { id: "J2-13", statement: "Privilege over COMPASS briefs", questionForCounsel: "Are COMPASS briefs and their inputs privileged when prepared during an investigation directed by counsel? How should they be labeled and stored?", status: "Pending validation" },
  { id: "J2-14", statement: "AI support for materiality analysis", questionForCounsel: "May an AI-drafted brief be used in the Disclosure Committee's process, and what documentation do disclosure controls require?", status: "Pending validation" },
  { id: "J2-15", statement: "Retention and discoverability", questionForCounsel: "Retention period, litigation hold and discoverability of COMPASS briefs, prompts and logs.", status: "Pending validation" }
];

export const RELEASE_GATES = [
  { id: "gate-1", title: "Sharing Verified", owner: "Doc Owner / Exercise Director", status: "Verified", description: "Doc limited to Trusted Agents; verified at T-30 and T-1 gates. Link never shared with players or observers." },
  { id: "gate-2", title: "Player PDF Clean Export", owner: "Exercise Director & Legal", status: "Verified", description: "Every player PDF checked for hidden facilitator notes, expected actions, 'if stuck' prompts, answer keys, RAVEN references." },
  { id: "gate-3", title: "Assumptions I-1 to I-22 Validated", owner: "CISO, SOC Manager, IAM Lead, Vendor Mgr", status: "Pending Validation", description: "22 foundational operational and technical assumptions validated or linked content adjusted." },
  { id: "gate-4", title: "Legal Items J2-1 to J2-15 Answered", owner: "Outside Counsel via Legal Advisor", status: "Pending Validation", description: "15 legal review questions confirmed prior to final player scenario exposure." },
  { id: "gate-5", title: "Revision 6 Proposal Approved & Merged", owner: "CISO", status: "Completed (2026-10-27)", description: "Consolidated proposal (Revision 6) formally approved by CISO and merged into the plan, Player Packet, and Facilitator Guide." },
  { id: "gate-6", title: "Dry Run at T-14", owner: "Exercise Director", status: "Scheduled", description: "Complete rehearsal with 14-card set and revised 14:15 agenda." },
  { id: "gate-7", title: "Roster Cross-Check", owner: "Exercise Director", status: "Verified", description: "No person on both Trusted Agent and player lists; CEO isolated from scenario and scoring to preserve playing seat." }
];

export const AAR_QUESTIONS = [
  { id: 1, question: "Which SENTINEL outputs did we act on, and which did we verify first? Was the difference deliberate?", category: "Model Risk & Validation" },
  { id: 2, question: "Did anyone treat a SENTINEL confidence score as proof?", category: "Oversight & Calibration" },
  { id: 3, question: "Did we know what SENTINEL could not see before we relied on it (hypervisors, backups)?", category: "Data Coverage & Blind Spots" },
  { id: 4, question: "Who did players believe was accountable for SENTINEL's recommendations? Did the answer match the policy?", category: "AI Governance & Accountability" },
  { id: 5, question: "How quickly did we recognize that the attacker was scaling impersonation, and what evidence convinced us?", category: "Defense Against Attacker AI" },
  { id: 6, question: "Did the attacker's access to SENTINEL case notes change our view of what an AI tool's data exposure means?", category: "AI Identity & Access" },
  { id: 7, question: "How much slower was the response without SENTINEL, and which tasks had no manual owner?", category: "Continuity Without AI" },
  { id: 8, question: "Were AI activity logs preserved in a way Legal and forensics could use?", category: "AI Logging & Evidence" }
];
