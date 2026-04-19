// Lightweight port of SleepForest Character SVGs for use in the course site.
// Only renders a static "sleepy/awake" pose — we don't need the full breathing state machine.

const { useState, useEffect } = React;

function SFCharacter({ type = 'CAT', sleeping = false, size = 140, breathing = false }) {
  // Gentle breathing scale
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!breathing) return;
    let t = 0;
    const id = setInterval(() => {
      t += 1;
      setScale(1 + Math.sin(t / 8) * 0.04);
    }, 120);
    return () => clearInterval(id);
  }, [breathing]);

  const Eyes = () => sleeping ? (
    <g stroke="#2B241E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.75">
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
    if (type === 'PENGUIN') return <path d="M60 55 L70 65 L80 55 Z" fill="#F59E0B" />;
    return <path d={sleeping ? "M65 65 L 75 65" : "M65 60 Q 70 65 75 60"} stroke="#2B241E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />;
  };

  const Blush = () => (
    <g fill="#F4A58C" opacity="0.45">
      <ellipse cx="30" cy="55" rx="6" ry="3" />
      <ellipse cx="110" cy="55" rx="6" ry="3" />
    </g>
  );

  const Body = () => {
    if (type === 'CAT') return (
      <g>
        <path d="M20 85 L20 40 Q 20 10 40 10 L 50 20 L 90 20 L 100 10 Q 120 10 120 40 L 120 85 Q 120 100 105 100 L 35 100 Q 20 100 20 85 Z" fill="#E7E5E4" />
        <path d="M10 55 L 30 55 M 10 65 L 30 60" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
        <path d="M130 55 L 110 55 M 130 65 L 110 60" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 20 L 40 10 L 50 20 Z" fill="#FFAB91" opacity="0.6" />
        <path d="M90 20 L 100 10 L 110 20 Z" fill="#FFAB91" opacity="0.6" />
      </g>
    );
    if (type === 'FOX') return (
      <g>
        <path d="M20 100 L30 50 L 10 10 L 50 30 L 90 30 L 130 10 L 110 50 L 120 100 Z" fill="#F4B091" />
        <path d="M50 30 L 70 100 L 90 30" fill="#FFFBE6" />
        <circle cx="70" cy="58" r="4" fill="#3E2723" />
      </g>
    );
    if (type === 'SHEEP') return (
      <g>
        <path d="M20 100 Q 10 70 20 50 Q 15 30 35 20 Q 50 5 70 15 Q 90 5 105 20 Q 125 30 120 50 Q 130 70 120 100 Z" fill="#FDFBF7" stroke="#E8DFCF" strokeWidth="1.5"/>
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

  return (
    <div style={{ width: size, height: size, display: 'inline-block', position: 'relative' }}>
      <svg viewBox="0 0 140 120" style={{ width: '100%', height: '100%', overflow: 'visible', transform: `scale(${scale})`, transition: 'transform 800ms cubic-bezier(.4,0,.2,1)' }}>
        <Body />
        <Eyes />
        <Mouth />
        <Blush />
      </svg>
    </div>
  );
}

window.SFCharacter = SFCharacter;
