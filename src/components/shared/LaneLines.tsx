/**
 * Recurring brand motif: an abstract pool lane-rope line, used as a
 * section divider instead of a generic wave blob. Reads as literally
 * on-brand for a swim school rather than decorative.
 */
export function LaneLines({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <line x1="0" y1="30" x2="1200" y2="30" stroke="#CFE7E9" strokeWidth="2" strokeDasharray="1 22" strokeLinecap="round" />
      {Array.from({ length: 26 }).map((_, i) => (
        <circle key={i} cx={20 + i * 46} cy={30} r={5} fill={i % 2 === 0 ? '#21B8C7' : '#F4B942'} opacity={0.85} />
      ))}
    </svg>
  )
}
