export function Monogram() {
  return (
    <svg viewBox="0 0 260 74" width="240" height="68" fill="none" aria-hidden="true">
      <line x1="0" y1="37" x2="90" y2="37" stroke="currentColor" strokeWidth="1" />
      <line x1="170" y1="37" x2="260" y2="37" stroke="currentColor" strokeWidth="1" />
      <circle cx="130" cy="37" r="28" stroke="currentColor" strokeWidth="1" />
      <circle cx="130" cy="37" r="23" stroke="currentColor" strokeWidth="0.6" />
      <rect x="127.5" y="6.5" width="5" height="5" transform="rotate(45 130 9)" fill="currentColor" />
      <rect x="127.5" y="62.5" width="5" height="5" transform="rotate(45 130 65)" fill="currentColor" />
      <rect x="98.5" y="34.5" width="5" height="5" transform="rotate(45 101 37)" fill="currentColor" />
      <rect x="156.5" y="34.5" width="5" height="5" transform="rotate(45 159 37)" fill="currentColor" />
      <text x="117" y="47" textAnchor="end" fontFamily="'Cormorant Garamond', serif" fontWeight="600" fontSize="27" fill="currentColor">J</text>
      <text x="127" y="41" textAnchor="middle" fontFamily="'Alex Brush', cursive" fontSize="21" fill="currentColor">&amp;</text>
      <text x="134" y="47" textAnchor="start" fontFamily="'Cormorant Garamond', serif" fontWeight="600" fontSize="27" fill="currentColor">M</text>
    </svg>
  );
}

export function LeafDivider({ light = false }: { light?: boolean }) {
  return (
    <div className={`leaf-divider${light ? " light" : ""}`} aria-hidden="true">
      <Monogram />
    </div>
  );
}
