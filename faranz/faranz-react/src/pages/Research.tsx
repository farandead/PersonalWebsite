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
  return (
    <div className="page-content">
      <h1>Research & Publications</h1>
      
      <div className="research-intro">
        Peer-reviewed research and technical publications in artificial intelligence, evolutionary computation, and machine learning.
      </div>
      
      {publications.map((pub, index) => (
        <div key={index} className="publication-card" style={{ animationDelay: `${0.1 * index}s` }}>
          <div className="pub-year">{pub.year}</div>
          <div className="pub-content">
            <h3>{pub.title}</h3>
            <p className="pub-subtitle">{pub.subtitle}</p>
            <p className="pub-abstract">{pub.description}</p>
            <div className="pub-tags">
              {pub.tags.map((tag, tagIndex) => (
                <span key={tagIndex}>{tag}</span>
              ))}
            </div>
            <a href={pub.link} className="pub-link" target="_blank" rel="noopener noreferrer">
              Read Paper →
            </a>
          </div>
        </div>
      ))}
      
      <div className="research-footer">
        Currently researching: LLM alignment, multi-agent coordination, and emergent AI behaviors.
      </div>
    </div>
  );
}
