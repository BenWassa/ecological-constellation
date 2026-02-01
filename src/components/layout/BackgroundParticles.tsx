import Particles from '../Particles';

export const BackgroundParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0">
      <div className="relative w-full h-full">
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleColors={['#ffd700', '#ffd700', '#ffd700']}
          moveParticlesOnHover={false}
          particleHoverFactor={1}
          alphaParticles={false}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>
    </div>
    <div
      className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl animate-pulse"
      style={{ animationDuration: '8s' }}
    />
    <div
      className="absolute bottom-0 right-1/4 w-[520px] h-[520px] bg-slate-800/30 rounded-full blur-3xl animate-pulse"
      style={{ animationDuration: '10s', animationDelay: '1s' }}
    />
  </div>
);
