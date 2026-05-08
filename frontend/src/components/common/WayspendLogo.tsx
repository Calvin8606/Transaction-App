type WayspendLogoProps = {
  className?: string
  markOnly?: boolean
  size?: number
  tone?: 'light' | 'dark' | 'current'
}

const ACCENT = '#f26a4b'

export default function WayspendLogo({
  className = '',
  markOnly = false,
  size = 22,
  tone = 'current',
}: WayspendLogoProps) {
  const color = tone === 'light' ? '#ffffff' : tone === 'dark' ? '#10213c' : 'currentColor'

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: markOnly ? 0 : 8,
        color,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <svg viewBox="0 0 40 40" width={size * 1.1} height={size * 1.1} aria-hidden="true">
        <path
          d="M20 5 L23.8 16.2 L35.5 16.2 L26 23 L29.8 34.2 L20 27.4 L10.2 34.2 L14 23 L4.5 16.2 L16.2 16.2 Z"
          fill="currentColor"
        />
        <circle cx="20" cy="20" r="3.2" fill={ACCENT} />
      </svg>

      {!markOnly ? (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: size,
            letterSpacing: '-0.02em',
          }}
        >
          way<span style={{ color: ACCENT }}>spend</span>
        </span>
      ) : null}
    </span>
  )
}
