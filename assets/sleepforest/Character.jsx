// Faithful port of SleepForest Character.tsx for the course site.
// Tailwind classes have been translated to inline styles so it runs under @babel/standalone.

function SFCharacter({ type = 'CAT', breathingPhase = 'IDLE', narrativePhase = 'INTRO', isPlaying = false, size = 180 }) {
  const isSleeping = narrativePhase === 'SLEEP' || narrativePhase === 'STORY';
  const isEyesClosed = isSleeping || breathingPhase === 'EXHALE' || breathingPhase === 'HOLD';
  const isMouthOpen = !isSleeping && (breathingPhase === 'INHALE' || breathingPhase === 'EXHALE');

  const getTransform = () => {
    if (narrativePhase === 'SLEEP') return 'scale(1.0) translateY(5px)';
    switch (breathingPhase) {
      case 'INHALE': return 'scale(1.15) translateY(-15px)';
      case 'HOLD':   return 'scale(1.15) translateY(-15px)';
      case 'EXHALE': return 'scale(1.0) translateY(5px)';
      default:       return 'scale(1.0)';
    }
  };

  const getTransitionDuration = () => {
    switch (breathingPhase) {
      case 'INHALE': return '4000ms';
      case 'HOLD':   return '0ms';
      case 'EXHALE': return '8000ms';
      default:       return '2000ms';
    }
  };

  const Eyes = () => isEyesClosed ? (
    <g stroke="#2B241E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8">
      <path d="M35 45 Q 45 50 55 45" />
      <path d="M85 45 Q 95 50 105 45" />
    </g>
  ) : (
    <g fill="#2B241E" opacity="0.8">
      <circle cx="45" cy="45" r="5" />
      <circle cx="95" cy="45" r="5" />
    </g>
  );

  const Mouth = () => {
    if (type === 'PENGUIN') {
      return <path d="M60 55 L70 65 L80 55 Z" fill="#F59E0B" style={{ transition: 'all 1s' }} />;
    }
    if (isMouthOpen) {
      return <circle cx="70" cy="65" r="6" fill="#FCA5A5" opacity="0.6" style={{ transition: 'all 1s' }} />;
    }
    return <path
      d={isSleeping ? "M65 65 L 75 65" : "M65 60 Q 70 65 75 60"}
      stroke="#2B241E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"
      style={{ transition: 'all 1s' }}
    />;
  };

  const Body = () => {
    if (type === 'CAT') return (
      <g>
        <path d="M20 85 L20 40 Q 20 10 40 10 L 50 20 L 90 20 L 100 10 Q 120 10 120 40 L 120 85 Q 120 100 105 100 L 35 100 Q 20 100 20 85 Z" fill="#E7E5E4" />
        <path d="M10 55 L 30 55 M 10 65 L 30 60" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
        <path d="M130 55 L 110 55 M 130 65 L 110 60" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
    if (type === 'FOX') return (
      <g>
        <path d="M20 100 L30 50 L 10 10 L 50 30 L 90 30 L 130 10 L 110 50 L 120 100 Z" fill="#FFCCBC" />
        <path d="M50 30 L 70 100 L 90 30" fill="#FFFBE6" />
        <circle cx="70" cy="58" r="4" fill="#3E2723" />
      </g>
    );
    if (type === 'SHEEP') return (
      <g>
        <path d="M20 100 Q 10 70 20 50 Q 15 30 35 20 Q 50 5 70 15 Q 90 5 105 20 Q 125 30 120 50 Q 130 70 120 100 Z" fill="#FDFBF7" />
        <path d="M40 40 Q 70 90 100 40" fill="#EFEBE9" />
        <path d="M25 30 Q 15 40 25 50" stroke="#D7CCC8" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M115 30 Q 125 40 115 50" stroke="#D7CCC8" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    );
    // PENGUIN
    return (
      <g>
        <ellipse cx="70" cy="60" rx="50" ry="55" fill="#546E7A" />
        <ellipse cx="70" cy="65" rx="35" ry="45" fill="#ECEFF1" />
      </g>
    );
  };

  const Ears = () => {
    if (type !== 'CAT') return null;
    return (
      <g>
        <path d="M30 20 L 40 10 L 50 20 Z" fill="#FFAB91" opacity="0.6" />
        <path d="M90 20 L 100 10 L 110 20 Z" fill="#FFAB91" opacity="0.6" />
      </g>
    );
  };

  const Blush = () => (
    <g fill="#FCA5A5" opacity="0.4">
      <ellipse cx="30" cy="55" rx="6" ry="3" />
      <ellipse cx="110" cy="55" rx="6" ry="3" />
    </g>
  );

  const Zzz = () => {
    const shouldShow = !isPlaying && (narrativePhase === 'STORY' || narrativePhase === 'SLEEP');
    if (!shouldShow) return null;
    return (
      <g>
        <text x="110" y="20" fontSize="20" fill="#9CA3AF" style={{ animation: 'sf-char-float 3s infinite ease-in-out' }}>z</text>
        <text x="125" y="10" fontSize="14" fill="#9CA3AF" style={{ animation: 'sf-char-float 3s infinite ease-in-out', animationDelay: '1s' }}>z</text>
        <text x="135" y="0"  fontSize="10" fill="#9CA3AF" style={{ animation: 'sf-char-float 3s infinite ease-in-out', animationDelay: '2s' }}>z</text>
      </g>
    );
  };

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'inline-block' }}>
      <style>{`
        @keyframes sf-char-float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%      { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
      <div style={{
        width: '100%', height: '100%',
        willChange: 'transform',
        transform: getTransform(),
        transitionProperty: 'transform',
        transitionDuration: getTransitionDuration(),
        transitionTimingFunction: 'ease-in-out',
      }}>
        <svg viewBox="0 0 140 120" style={{
          width: '100%', height: '100%', overflow: 'visible',
          filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.35))',
        }}>
          <Body />
          <Ears />
          <Eyes />
          <Mouth />
          <Blush />
          <Zzz />
        </svg>
      </div>

      {/* Breathing glow behind */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'white', filter: 'blur(40px)', zIndex: -1,
        transform: 'scale(1.3)',
        transition: 'opacity 1s',
        opacity: breathingPhase === 'INHALE' ? 0.5 : 0.1,
      }} />
    </div>
  );
}

window.SFCharacter = SFCharacter;
