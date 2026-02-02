const projects = [
  {
    year: '2025',
    title: 'Nova – AI Document Management for Accountants',
    subtitle: 'Won Saturn Hackathon. Scaling to startup (MVP phase). AI Operating System for Accountants',
    description: 'Multi-agent autonomous system for accounting firms with automated document processing and compliance validation. Features AI-powered data extraction, built-in VAT validation, duplicate detection, and AI chat assistant with tool calling. Implements automated chaser emails, secure upload portals, and full audit trail with entity tracking.',
    tags: ['Multi-Agent Systems', 'AI Document Processing', 'Claude AI', 'OCR', 'Compliance Validation', 'Tool Calling'],
  },
  {
    year: '2025',
    title: 'Katsu – Agentic Server Management Assistant',
    subtitle: 'Built for company. LLM-powered agentic system for fleet management with natural language server operations',
    description: 'Features complete CLI interface, Slack integration with webhook handlers, and automated alarm remediation workflows. Reduced mean time to resolution (MTTR) from 1-2 hours to few minutes and significantly increased productivity of Ops teams. Implements tool use with function calling, multi-agent architecture with verifier agents, prompt injection prevention via input sanitization and prompt tanting, HITL confirmation workflows, and persistent SSH session pooling.',
    tags: ['AWS Bedrock', 'LangChain', 'Multi-Agent Systems', 'SSH Session Pooling', 'Prompt Tanting'],
  },
  {
    year: '2025',
    title: 'flashbits – Swipe-Based Coding Interview Prep',
    subtitle: 'Sold. AI-powered mobile learning platform for technical interview preparation',
    description: 'Built swipe-based learning platform with AI-generated quizzes, AI assistant for personalized guidance, and spaced repetition algorithms. Features gamification with XP system and achievement ranks, comprehensive progress analytics, company-specific question filtering, and 1,700+ curated DSA problems in multiple-choice format. Implemented intelligent question recommendation engine and performance tracking across 14 topic categories.',
    tags: ['AI-Generated Quizzes', 'AI Assistant', 'Spaced Repetition', 'Gamification', 'Mobile App', 'React Native'],
  },
  {
    year: '2025',
    title: 'Arc – AI-Powered Productivity Assistant',
    subtitle: 'Multi-agent productivity system with intelligent task management and calendar orchestration',
    description: 'AI-powered productivity platform with multi-agent assistant architecture for task organization and prioritization. Features intelligent task decomposition, automated day planning, calendar integration with conflict resolution, and adaptive scheduling algorithms. Implements agent orchestration for workload balancing and comprehensive user analytics.',
    tags: ['Multi-Agent Systems', 'Agent Orchestration', 'AI Assistant', 'LangChain', 'Adaptive Scheduling', 'Calendar API'],
  },
  {
    year: '2024',
    title: 'Litigat8 – Legal AI Assistant',
    subtitle: 'Multi-agent RAG system with workflow orchestration and shared memory',
    description: 'Production multi-agent system with agent orchestration, task decomposition, inter-agent communication protocols, and supervisor agent coordination. Features complete workflow management with agent handoffs, shared memory system with context persistence, and state management. Implements hierarchical document chunking, hybrid retrieval (dense + sparse), and query routing.',
    tags: ['Multi-Agent Systems', 'Agent Orchestration', 'Workflow Management', 'Shared Memory', 'RAG', 'LangChain', 'Pinecone', 'Vector Embeddings', 'GPT-4'],
  },
  {
    year: '2023',
    title: 'Hunter & Prey – Multi-Agent RL',
    subtitle: 'Multi-agent RL system in POMDPs using actor-critic PPO',
    description: 'Features curriculum learning, reward shaping, experience replay buffers, and prioritized sampling with CTDE architecture.',
    tags: ['Reinforcement Learning', 'PPO', 'Unity ML-Agents', 'PyTorch', 'Multi-Agent Systems'],
  },
  {
    year: '2023',
    title: 'Stock Price Prediction – LSTM Neural Networks',
    subtitle: 'Time-series forecasting with stacked LSTMs and attention mechanisms',
    description: 'Features technical indicator pipelines, walk-forward validation, backtesting frameworks, and model serving with drift detection.',
    tags: ['LSTM', 'Time-Series', 'TensorFlow', 'Attention Mechanisms', 'MLflow'],
  },
  {
    year: '2022',
    title: 'Facial Recognition Attendance System',
    subtitle: 'Production CV pipeline with MTCNN face detection and deep metric learning',
    description: 'Implements cosine similarity matching, liveness detection, anti-spoofing, and GDPR-compliant biometric hashing.',
    tags: ['Computer Vision', 'MTCNN', 'FaceNet', 'Deep Metric Learning', 'FastAPI'],
  },
];

export default function Projects() {
  return (
    <div className="page-content">
      <h1>Projects</h1>
      
      <div className="research-intro">
        Production-grade AI and machine learning projects, from LLM applications to reinforcement learning systems.
      </div>
      
      {projects.map((project, index) => (
        <div key={index} className="publication-card" style={{ animationDelay: `${0.1 * index}s` }}>
          <div className="pub-year">{project.year}</div>
          <div className="pub-content">
            <h3>{project.title}</h3>
            <p className="pub-subtitle">{project.subtitle}</p>
            <p className="pub-abstract">{project.description}</p>
            <div className="pub-tags">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      <div className="research-footer">
        More projects in development – exploring LLM fine-tuning with LoRA/QLoRA, multi-agent orchestration frameworks, and production agentic AI systems with tool use and function calling.
      </div>
    </div>
  );
}
