/* ============================================================
   WORKS DATA  — shared by index.html grid + case-study.html
   Realistic sample projects across AI · Web · App.
============================================================ */
window.WORKS = [
  {
    id: "atlas-support-copilot",
    cat: "ai",
    catLabel: "AI Engineering",
    accent: "#5b6ef5",
    title: "Atlas — Agentic Support Copilot",
    short: "An LLM agent that resolves tier-1 support tickets end-to-end with tools, guardrails, and human handoff.",
    lede: "A production agentic assistant that reads a customer ticket, pulls context from internal systems, drafts or executes a resolution, and knows when to escalate to a human.",
    mockup: "chat",
    meta: [
      { k: "Type", v: "AI Product" },
      { k: "Role", v: "Lead AI Engineer" },
      { k: "Timeline", v: "10 weeks" },
      { k: "Team", v: "3 people" }
    ],
    stack: ["Python", "LangGraph", "OpenAI", "Anthropic", "Postgres", "Redis", "FastAPI", "Evals"],
    outcomes: [
      { num: "52%", lbl: "Faster ticket handling", color: "#5b6ef5" },
      { num: "68%", lbl: "Tier-1 auto-resolved", color: "#06b6a4" },
      { num: "4.6/5", lbl: "CSAT after rollout", color: "#8b5cf6" }
    ],
    challenge: "The support team was drowning in repetitive tier-1 tickets. Previous chatbot attempts hallucinated answers and had no path to safely act on a customer's account, so trust was low and everything still funneled to humans.",
    approach: [
      "Designed a LangGraph agent with explicit tool boundaries — read-only lookups vs. write actions gated behind confirmation.",
      "Grounded every answer in retrieved policy + account context, with citations surfaced back to the agent.",
      "Built an eval harness of 400+ real (anonymised) tickets to catch regressions before every deploy.",
      "Added a confidence threshold that routes ambiguous cases to a human with a pre-drafted reply."
    ],
    result: "Within two months, the agent was resolving over two-thirds of tier-1 volume unattended while raising CSAT. Because every action is logged and evaluated, the team could expand its permissions with confidence rather than fear."
  },
  {
    id: "insight-rag-assistant",
    cat: "ai",
    catLabel: "AI Engineering",
    accent: "#8b5cf6",
    title: "InsightRAG — Enterprise Knowledge Assistant",
    short: "A retrieval-augmented assistant that answers questions across 40k+ internal documents with citations.",
    lede: "A trustworthy RAG assistant that lets employees ask natural-language questions and get sourced answers from a sprawling, messy internal knowledge base.",
    mockup: "search",
    meta: [
      { k: "Type", v: "AI Platform" },
      { k: "Role", v: "AI Architect" },
      { k: "Timeline", v: "8 weeks" },
      { k: "Team", v: "2 people" }
    ],
    stack: ["Python", "LangChain", "Neo4j", "pgvector", "OpenAI", "Rerankers", "FastAPI", "React"],
    outcomes: [
      { num: "90%", lbl: "Answer accuracy", color: "#8b5cf6" },
      { num: "3.2×", lbl: "Faster info retrieval", color: "#5b6ef5" },
      { num: "0", lbl: "Uncited claims shipped", color: "#06b6a4" }
    ],
    challenge: "Knowledge was scattered across wikis, PDFs, and tickets. Employees wasted hours hunting for answers, and a naive vector search prototype returned confident but wrong results with no way to verify them.",
    approach: [
      "Built a hybrid retrieval pipeline: semantic search + keyword + a cross-encoder reranker for precision.",
      "Layered a Neo4j knowledge graph over documents to capture relationships search alone missed.",
      "Enforced citation-or-refuse: the model must ground every claim in a source or say it doesn't know.",
      "Shipped a clean React UI with inline source previews so users could verify in one click."
    ],
    result: "Retrieval time dropped sharply and, crucially, trust went up — every answer is traceable to a source, so the assistant became the default first stop instead of a novelty."
  },
  {
    id: "northwind-analytics",
    cat: "web",
    catLabel: "Web Design & Build",
    accent: "#06b6a4",
    title: "Northwind — SaaS Analytics Dashboard",
    short: "A data-dense analytics dashboard redesigned for clarity, speed, and a premium feel.",
    lede: "A ground-up redesign and build of a B2B analytics dashboard — turning an overwhelming wall of charts into a focused, fast, genuinely usable product.",
    mockup: "dashboard",
    meta: [
      { k: "Type", v: "Web App" },
      { k: "Role", v: "Design + Frontend" },
      { k: "Timeline", v: "6 weeks" },
      { k: "Team", v: "Solo" }
    ],
    stack: ["React", "TypeScript", "Design System", "Recharts", "Tailwind", "Vite", "Web Vitals"],
    outcomes: [
      { num: "41%", lbl: "Lower bounce rate", color: "#06b6a4" },
      { num: "1.1s", lbl: "Time to interactive", color: "#5b6ef5" },
      { num: "+22", lbl: "SUS usability score", color: "#8b5cf6" }
    ],
    challenge: "The existing dashboard showed everything at once — dozens of KPIs with no hierarchy. Users couldn't find what mattered, load times were slow, and the UI felt dated next to competitors.",
    approach: [
      "Ran a content audit and rebuilt the information hierarchy around the 5 metrics users actually acted on.",
      "Designed a reusable component & token system for consistent spacing, color, and charts.",
      "Rebuilt the frontend for performance — code-splitting, memoised charts, and skeleton loading.",
      "Introduced progressive disclosure so power features stayed available without cluttering the default view."
    ],
    result: "The focused layout and faster loads meaningfully cut bounce and lifted the measured usability score — the product finally felt as capable as the data behind it."
  },
  {
    id: "lumen-marketing-site",
    cat: "web",
    catLabel: "Web Design & Build",
    accent: "#5b6ef5",
    title: "Lumen — SaaS Marketing Site",
    short: "A high-converting marketing site with a bold visual identity and buttery-smooth motion.",
    lede: "A brand and marketing site for an early-stage SaaS startup — built to make a strong first impression and turn visitors into demo signups.",
    mockup: "landing",
    meta: [
      { k: "Type", v: "Marketing Site" },
      { k: "Role", v: "Design + Build" },
      { k: "Timeline", v: "4 weeks" },
      { k: "Team", v: "Solo" }
    ],
    stack: ["Next.js", "Framer Motion", "Tailwind", "CMS", "SEO", "Vercel"],
    outcomes: [
      { num: "2.1×", lbl: "Demo signups", color: "#5b6ef5" },
      { num: "98", lbl: "Lighthouse perf", color: "#06b6a4" },
      { num: "+3:10", lbl: "Avg. time on page", color: "#8b5cf6" }
    ],
    challenge: "The founders had a great product but a generic template site that didn't communicate value or build trust. Conversion from visit to demo request was painfully low.",
    approach: [
      "Crafted a distinctive visual identity — type, color, and motion that felt premium but on-brand.",
      "Rewrote messaging around outcomes and objections, with social proof placed at decision points.",
      "Built tasteful scroll and hover motion that guides attention without hurting performance.",
      "Wired an editable CMS so the team could ship copy changes without a developer."
    ],
    result: "Demo signups more than doubled in the first month, with visitors spending noticeably longer on the page — the site now sells while the founders sleep."
  },
  {
    id: "pulsefit-app",
    cat: "app",
    catLabel: "App Design & UX",
    accent: "#f0913e",
    title: "PulseFit — Fitness Mobile App",
    short: "A fitness app redesign focused on effortless logging, motivating streaks, and delightful micro-interactions.",
    lede: "A UX redesign of a fitness tracking app — removing friction from daily logging and building habits through thoughtful motivation, not nagging.",
    mockup: "phone",
    meta: [
      { k: "Type", v: "Mobile App" },
      { k: "Role", v: "Product + UX Design" },
      { k: "Timeline", v: "7 weeks" },
      { k: "Team", v: "2 people" }
    ],
    stack: ["Figma", "iOS", "Android", "Prototyping", "Design System", "Motion"],
    outcomes: [
      { num: "+34%", lbl: "Week-1 retention", color: "#f0913e" },
      { num: "-45%", lbl: "Steps to log a workout", color: "#5b6ef5" },
      { num: "4.8★", lbl: "App store rating", color: "#06b6a4" }
    ],
    challenge: "Logging a workout took too many taps, so users dropped off within days. The visual language felt clinical, and there was nothing to celebrate progress or pull people back.",
    approach: [
      "Redesigned the logging flow down to a single primary action with smart defaults.",
      "Introduced streaks, gentle nudges, and celebratory motion tied to real milestones.",
      "Built a warm, tactile design system with clear hierarchy and generous touch targets.",
      "Prototyped and tested key flows with users before a single screen was built."
    ],
    result: "Cutting logging friction and adding genuine motivation lifted week-1 retention by a third and pushed the store rating to 4.8 — proof that delight and utility aren't at odds."
  },
  {
    id: "vault-fintech-app",
    cat: "app",
    catLabel: "App Design & UX",
    accent: "#8b5cf6",
    title: "Vault — Fintech Banking App",
    short: "A neobank app designed to make money management feel calm, clear, and trustworthy.",
    lede: "A mobile banking experience for a neobank — designed to make everyday finances feel effortless while earning the trust a money app demands.",
    mockup: "phone2",
    meta: [
      { k: "Type", v: "Mobile App" },
      { k: "Role", v: "Lead Product Designer" },
      { k: "Timeline", v: "9 weeks" },
      { k: "Team", v: "3 people" }
    ],
    stack: ["Figma", "iOS", "Android", "Accessibility", "Design System", "Prototyping"],
    outcomes: [
      { num: "+29%", lbl: "Onboarding completion", color: "#8b5cf6" },
      { num: "AA", lbl: "WCAG contrast", color: "#06b6a4" },
      { num: "-38%", lbl: "Support tickets", color: "#5b6ef5" }
    ],
    challenge: "Onboarding was long and full of jargon, so many users abandoned before funding an account. The interface buried key actions and left people unsure their money was safe.",
    approach: [
      "Reworked onboarding into short, reassuring steps with clear progress and plain language.",
      "Designed a calm, high-contrast interface that surfaces balance and key actions instantly.",
      "Built an accessible design system meeting WCAG AA — critical for a product everyone uses.",
      "Added moments of clarity — clear transaction states, confirmations, and helpful empty states."
    ],
    result: "A shorter, friendlier onboarding lifted completion by nearly a third and cut support tickets sharply, while accessibility work widened the audience the app could serve."
  }
];

/* ---------- CSS mockup renderer ---------- */
function workThumb(w) {
  var a = w.accent;
  var soft = a + "22";
  var inner = "";
  switch (w.mockup) {
    case "chat":
      inner =
        '<div style="width:78%;background:#fff;border-radius:12px;border:1px solid #e5e8ef;box-shadow:0 6px 18px rgba(16,22,41,.10);padding:14px;display:flex;flex-direction:column;gap:8px">' +
          '<div style="align-self:flex-start;background:'+soft+';color:'+a+';font-size:9px;padding:7px 10px;border-radius:10px 10px 10px 2px;max-width:75%">How do I reset my billing?</div>' +
          '<div style="align-self:flex-end;background:'+a+';color:#fff;font-size:9px;padding:7px 10px;border-radius:10px 10px 2px 10px;max-width:80%">I can help with that — updating your plan now ✓</div>' +
          '<div style="align-self:flex-start;display:flex;gap:3px;padding:4px 2px"><span style="width:5px;height:5px;border-radius:50%;background:'+a+';opacity:.5"></span><span style="width:5px;height:5px;border-radius:50%;background:'+a+';opacity:.7"></span><span style="width:5px;height:5px;border-radius:50%;background:'+a+'"></span></div>' +
        '</div>';
      break;
    case "search":
      inner =
        '<div style="width:80%;background:#fff;border-radius:12px;border:1px solid #e5e8ef;box-shadow:0 6px 18px rgba(16,22,41,.10);padding:14px;display:flex;flex-direction:column;gap:9px">' +
          '<div style="display:flex;align-items:center;gap:7px;border:1px solid '+soft+';border-radius:9px;padding:7px 10px"><span style="color:'+a+';font-size:11px">🔍</span><span style="font-size:9px;color:#8a93a8">Ask anything…</span></div>' +
          '<div style="height:7px;width:90%;background:'+soft+';border-radius:4px"></div>' +
          '<div style="height:7px;width:70%;background:#eef0f6;border-radius:4px"></div>' +
          '<div style="display:flex;gap:5px;margin-top:2px"><span style="font-size:8px;color:'+a+';background:'+soft+';padding:3px 7px;border-radius:20px">source ·1</span><span style="font-size:8px;color:'+a+';background:'+soft+';padding:3px 7px;border-radius:20px">source ·2</span></div>' +
        '</div>';
      break;
    case "dashboard":
      inner =
        '<div style="width:84%;background:#fff;border-radius:12px;border:1px solid #e5e8ef;box-shadow:0 6px 18px rgba(16,22,41,.10);padding:12px;display:flex;flex-direction:column;gap:8px">' +
          '<div style="display:flex;gap:6px">'+
            '<div style="flex:1;background:'+soft+';border-radius:8px;height:26px"></div>'+
            '<div style="flex:1;background:#eef0f6;border-radius:8px;height:26px"></div>'+
            '<div style="flex:1;background:#eef0f6;border-radius:8px;height:26px"></div>'+
          '</div>'+
          '<div style="display:flex;align-items:flex-end;gap:5px;height:44px;padding-top:4px">'+
            [40,70,50,90,60,80,55].map(function(h){return '<div style="flex:1;background:'+a+';opacity:.8;border-radius:3px 3px 0 0;height:'+h+'%"></div>';}).join('')+
          '</div>'+
        '</div>';
      break;
    case "landing":
      inner =
        '<div style="width:82%;background:#fff;border-radius:12px;border:1px solid #e5e8ef;box-shadow:0 6px 18px rgba(16,22,41,.10);padding:14px;display:flex;flex-direction:column;gap:8px;align-items:center;text-align:center">' +
          '<div style="height:9px;width:60%;background:'+a+';border-radius:5px"></div>' +
          '<div style="height:6px;width:80%;background:#eef0f6;border-radius:4px"></div>' +
          '<div style="height:6px;width:72%;background:#eef0f6;border-radius:4px"></div>' +
          '<div style="margin-top:4px;height:18px;width:44%;background:'+a+';border-radius:20px"></div>' +
        '</div>';
      break;
    case "phone":
    case "phone2":
      var bars = w.mockup === "phone2"
        ? '<div style="font-size:8px;color:#8a93a8">Balance</div><div style="font-size:15px;font-weight:700;color:#1c2233">$4,820.50</div><div style="display:flex;gap:5px;margin-top:4px"><span style="flex:1;height:16px;background:'+a+';border-radius:8px"></span><span style="flex:1;height:16px;background:'+soft+';border-radius:8px"></span></div>'
        : '<div style="font-size:8px;color:#8a93a8">Today</div><div style="display:flex;align-items:center;gap:6px"><div style="width:30px;height:30px;border-radius:50%;background:'+soft+';display:flex;align-items:center;justify-content:center;color:'+a+';font-size:12px">🔥</div><div style="font-size:14px;font-weight:700;color:#1c2233">12 day streak</div></div><div style="height:16px;width:100%;background:'+a+';border-radius:8px;margin-top:4px"></div>';
      inner =
        '<div style="width:112px;height:170px;background:#fff;border-radius:22px;box-shadow:0 12px 28px rgba(16,22,41,.16);padding:12px 10px;display:flex;flex-direction:column;gap:7px;border:1px solid #e5e8ef">' +
          '<div style="width:34px;height:4px;background:#dfe3ee;border-radius:4px;align-self:center"></div>' +
          bars +
          '<div style="height:8px;width:80%;background:#eef0f6;border-radius:4px;margin-top:auto"></div>' +
          '<div style="height:8px;width:60%;background:#eef0f6;border-radius:4px"></div>' +
        '</div>';
      break;
  }
  return '<div class="work-thumb" style="background:linear-gradient(135deg,'+soft+',#eef1f8)">' +
           '<span class="wt-badge" style="background:'+a+'">'+w.catLabel.split(' ')[0]+'</span>' +
           inner +
         '</div>';
}

/* ---------- Render grid on index page ---------- */
(function () {
  var grid = document.getElementById("works-grid");
  if (!grid) return;
  grid.innerHTML = window.WORKS.map(function (w, i) {
    return (
      '<article class="work-card reveal" data-cat="' + w.cat + '" style="transition-delay:' + (i % 3) * 0.08 + 's">' +
        workThumb(w) +
        '<div class="work-body">' +
          '<div class="work-cat">' + w.catLabel + '</div>' +
          '<h3>' + w.title + '</h3>' +
          '<p>' + w.short + '</p>' +
          '<div class="work-tags">' + w.stack.slice(0, 4).map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
          '<a class="work-link" href="case-study.html?id=' + w.id + '">Read case study <i class="fas fa-arrow-right"></i></a>' +
        '</div>' +
      '</article>'
    );
  }).join('');
})();
