import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
  {
    year: '2026',
    name: 'Donald',
    brief: 'Voice “roast” + CV coaching',
    subtitle:
      '~40k views in 72 hours, 300+ users, $4.1M+ in tuition left in shambles. Voice-first CV coach with Firecrawl research and ElevenLabs.',
    description:
      'PostgreSQL for accounts and CV artifacts; Redis for rate limits, session voice-activity, and dedupe; Celery workers drain Redis-backed queues for Firecrawl research and analysis off the hot path. FastAPI and Next.js with Claude and ElevenLabs.',
    tags: [
      'FastAPI',
      'Next.js',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Claude',
      'ElevenLabs',
      'Firecrawl',
    ],
  },
  {
    year: '2026',
    name: 'GetOut',
    brief: 'Voice + text “social wingman”',
    subtitle:
      'Events, commitments, and similar users via embeddings; LLM tool-calling on Cloudflare’s edge.',
    description:
      'Next.js 14 + Worker; D1, Vectorize, 3 Durable Objects, 2 Queues; 5 agent tools, 3 event sources. OAuth/JWT/Firebase, webhooks, Sentry; ElevenLabs; eval to D1.',
    tags: [
      'Next.js',
      'Cloudflare Workers',
      'D1',
      'Vectorize',
      'Durable Objects',
      'Workers AI',
      'Tool Calling',
      'ElevenLabs',
    ],
  },
  {
    year: '2026',
    name: 'Fixie',
    brief: 'Manuals → voice-enabled walkthroughs',
    subtitle:
      'Turns PDFs and URLs into guided, visual repair and assembly walkthroughs—durable storage, Redis-backed queues, and workers for long jobs.',
    description:
      'PostgreSQL for tutorials and metadata; Redis broker and Celery workers for PDF parsing, renders, and slow Replicate video jobs; object storage for media. FastAPI and Next.js with Claude, Firecrawl, and ElevenLabs.',
    tags: [
      'FastAPI',
      'Next.js',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Claude',
      'ElevenLabs',
      'Firecrawl',
    ],
  },
  {
    year: '2026',
    name: 'Urlybird',
    brief: 'Agentic Web Traffic to Structured Events',
    subtitle: 'Built for RealityMine. MCP server enabling AI agents to autonomously analyse web traffic, generate extraction code, and produce structured event datasets',
    description: 'MCP server with 7 tools for AI agents over stdio/SSE. Sandboxed execution of AI-generated Python capture code; BM25 retrieval and context-window optimisation.',
    tags: ['MCP Server', 'AI-Generated Code', 'Sandboxed Execution', 'Polars', 'SQLite/FTS5', 'Starlette', 'Python'],
  },
  {
    year: '2026',
    name: 'Nova',
    brief: 'AI Document Management for Accountants',
    subtitle: 'Won Saturn Hackathon. Scaling to startup (MVP phase). AI Operating System for Accountants',
    description: 'Multi-agent autonomous system for accounting firms with automated document processing and compliance validation. Features AI-powered data extraction, built-in VAT validation, duplicate detection, and AI chat assistant with tool calling. Implements automated chaser emails, secure upload portals, and full audit trail with entity tracking.',
    tags: ['Multi-Agent Systems', 'Claude AI', 'OCR', 'Compliance', 'Tool Calling'],
  },
  {
    name: 'Katsu',
    brief: 'Agentic Server Management',
    subtitle: 'Built at RealityMine. LLM-powered agentic fleet management.',
    description: 'Features complete CLI interface, Slack integration with webhook handlers, and automated alarm remediation workflows. Reduced MTTR from 1-2 hours to minutes. Implements tool use with function calling, multi-agent architecture with verifier agents, prompt injection prevention, HITL confirmation workflows, and persistent SSH session pooling.',
    tags: ['AWS Bedrock', 'LangChain', 'Multi-Agent', 'Prompt Tanting'],
    year: '2026',
  },
  {
    name: 'flashbits',
    brief: 'Coding Interview Prep',
    subtitle: 'Sold. AI-powered swipe-based mobile learning platform.',
    description: 'Swipe-based learning platform with AI-generated quizzes, AI assistant for personalized guidance, and spaced repetition algorithms. Features gamification with XP system and achievement ranks, comprehensive progress analytics, and 1,700+ curated DSA problems. Implemented intelligent question recommendation engine and performance tracking across 14 topic categories.',
    tags: ['AI Assistant', 'Spaced Repetition', 'React Native', 'Gamification'],
    year: '2026',
  },
  {
    name: 'Arc',
    brief: 'AI Productivity Assistant',
    subtitle: 'Multi-agent productivity system with intelligent task management.',
    description: 'AI-powered productivity platform with multi-agent assistant architecture for task organization and prioritization. Features intelligent task decomposition, automated day planning, calendar integration with conflict resolution, and adaptive scheduling algorithms.',
    tags: ['Multi-Agent', 'Agent Orchestration', 'LangChain', 'Calendar API'],
    year: '2025',
  },
  {
    name: 'Litigat8',
    brief: 'Legal AI Assistant',
    subtitle: 'Multi-agent RAG system with workflow orchestration and shared memory.',
    description: 'Production multi-agent system with agent orchestration, task decomposition, inter-agent communication, and supervisor coordination. Features complete workflow management with agent handoffs, shared memory with context persistence, hierarchical document chunking, hybrid retrieval, and query routing.',
    tags: ['Multi-Agent', 'RAG', 'Pinecone', 'GPT-4', 'Workflow Mgmt'],
    year: '2024',
  },
  {
    name: 'Hunter & Prey',
    brief: 'Multi-Agent RL',
    subtitle: 'Multi-agent reinforcement learning in POMDPs using actor-critic PPO.',
    description: 'Features curriculum learning, reward shaping, experience replay buffers, and prioritized sampling with CTDE architecture for training intelligent agents in competitive environments.',
    tags: ['Reinforcement Learning', 'PPO', 'Unity ML-Agents', 'PyTorch'],
    year: '2023',
  },
  {
    name: 'Stock Price Prediction',
    brief: 'LSTM Neural Networks',
    subtitle: 'Time-series forecasting with stacked LSTMs and attention mechanisms.',
    description: 'Features technical indicator pipelines, walk-forward validation, backtesting frameworks, and model serving with drift detection for financial time-series analysis.',
    tags: ['LSTM', 'Time-Series', 'TensorFlow', 'Attention', 'MLflow'],
    year: '2023',
  },
  {
    name: 'Facial Recognition',
    brief: 'Attendance System',
    subtitle: 'Production CV pipeline with MTCNN face detection and deep metric learning.',
    description: 'Implements cosine similarity matching, liveness detection, anti-spoofing, and GDPR-compliant biometric hashing for automated attendance tracking.',
    tags: ['Computer Vision', 'MTCNN', 'FaceNet', 'FastAPI'],
    year: '2022',
  },
];

export default function Projects() {
  const ref = useScrollReveal();

  return (
    <div className="page" ref={ref}>
      <div className="page-header" data-reveal>
        <h1 className="page-title">Selected Work</h1>
        <p className="page-subtitle">
          Production-grade AI and machine learning projects, from LLM applications to reinforcement learning systems.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-card"
            data-reveal
            style={{ transitionDelay: `${0.05 * i}s` }}
          >
            <div className="project-card-accent" />
            <div className="project-card-header">
              <span className="project-card-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="project-card-year">{project.year}</span>
            </div>
            <h3 className="project-card-name">{project.name}</h3>
            <p className="project-card-brief">{project.brief}</p>
            <p className="project-card-subtitle">{project.subtitle}</p>
            <p className="project-card-desc">{project.description}</p>
            <div className="project-card-tags">
              {project.tags.map((tag, j) => (
                <span key={j} className="project-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="page-footer" data-reveal>
        More projects in development &mdash; exploring LLM fine-tuning with LoRA/QLoRA, multi-agent orchestration frameworks, and production agentic AI systems.
      </p>
    </div>
  );
}
