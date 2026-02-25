import { useScrollReveal } from '../hooks/useScrollReveal';

const publications = [
  {
    year: '2024',
    title: 'Comparative Analysis of Neuroevolution Algorithms',
    subtitle: 'Evolving Connection Weights versus Topology in Robotics Applications',
    description: 'A systematic comparison of weight-based and topology-based neuroevolution approaches for robotic control tasks. Evaluates sample efficiency, generalization capability, computational requirements, and emergent behavioral strategies across multiple benchmark environments.',
    tags: ['Neuroevolution', 'NEAT', 'Robotics', 'Neural Networks'],
    link: '/pdf/neuroevolution.pdf',
  },
  {
    year: '2023',
    title: 'Cutting Stock Problem Optimization',
    subtitle: 'The Effect of Immigration Method and Adaptive Mutation Rate',
    description: 'An empirical study on genetic algorithm optimization for the one-dimensional cutting stock problem. Investigates the impact of immigration operators and adaptive mutation scheduling on population diversity, convergence speed, and solution quality.',
    tags: ['Genetic Algorithms', 'Optimization', 'Computational Intelligence'],
    link: '/pdf/cuttingproblem.pdf',
  },
];

export default function Research() {
  const ref = useScrollReveal();

  return (
    <div className="page" ref={ref}>
      <div className="page-header" data-reveal>
        <h1 className="page-title">Research</h1>
        <p className="page-subtitle">
          Peer-reviewed publications in artificial intelligence, evolutionary computation, and machine learning.
        </p>
      </div>

      <div className="pub-list">
        {publications.map((pub, i) => (
          <div key={i} className="pub-row" data-reveal style={{ transitionDelay: `${0.1 * i}s` }}>
            <span className="pub-year">{pub.year}</span>
            <div className="pub-body">
              <h3 className="pub-title">{pub.title}</h3>
              <p className="pub-subtitle">{pub.subtitle}</p>
              <p className="pub-abstract">{pub.description}</p>
              <div className="pub-tags">
                {pub.tags.map((tag, j) => (
                  <span key={j} className="pub-tag">{tag}</span>
                ))}
              </div>
              <a href={pub.link} className="pub-link" target="_blank" rel="noopener noreferrer">
                Read Paper &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="page-footer" data-reveal>
        Currently researching: LLM alignment, multi-agent coordination, and emergent AI behaviors.
      </p>
    </div>
  );
}
