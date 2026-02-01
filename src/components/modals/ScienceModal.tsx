import { Icon } from '../Icon';

type ScienceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ScienceModal = ({ isOpen, onClose }: ScienceModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button
          className="absolute top-4 right-4 text-slate-200 hover:text-white"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <div className="p-8">
          <h2 className="serif text-3xl text-white mb-2">
            The Science Behind the Map
          </h2>
          <p className="text-indigo-200 text-sm mb-6 uppercase tracking-wider">
            Ecological Strategy vs. Personality
          </p>
          <div className="space-y-6 text-slate-200 leading-relaxed">
            <p>
              This system uses the{' '}
              <strong className="text-white">Big Five</strong> personality
              model—the gold standard in modern psychology—and maps it to
              biological "ecological strategies."
            </p>
            <p>
              Big Five results are measurements. This app is an{' '}
              <span className="text-indigo-100">interpretive framework</span>{' '}
              that translates those measurements into contextual strategies.
            </p>
            <p>
              The map is{' '}
              <span className="text-indigo-100">non-diagnostic</span> and
              designed to support exploration, not clinical assessment.
            </p>
            <p>
              Prefer a standardized assessment? Take the full Big Five test at{' '}
              <a
                href="https://bigfive-test.com"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-100 underline underline-offset-4 hover:text-white"
              >
                bigfive-test.com
              </a>
              .
            </p>
            <p>
              In nature, traits are not "good" or "bad"; they are trade-offs. A{' '}
              <em className="italic">Wolf&apos;s</em> high agreeableness is a
              survival mechanism for pack cohesion. An{' '}
              <em className="italic">Octopus&apos;s</em> low extraversion is a
              necessity for a solitary ambush predator.
            </p>
            <p>
              We focus on{' '}
              <span className="text-indigo-100">contextual strategies</span>{' '}
              rather than fixed labels, emphasizing how environments shape
              expression.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {[
                ['Neuroticism', 'Threat Sensitivity & Vigilance'],
                ['Extraversion', 'Social Signaling Density & Reward Seeking'],
                ['Openness', 'Exploratory Adaptation & Plasticity'],
                ['Agreeableness', 'Conflict Resolution & Cooperation'],
                ['Conscientiousness', 'Future Investment & Delay Tolerance'],
              ].map(([title, desc]) => (
                <div key={title} className="bg-slate-800/50 p-4 rounded-lg">
                  <strong className="text-indigo-200 block mb-1">
                    {title}
                  </strong>
                  <span className="text-sm">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
