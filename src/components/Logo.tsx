export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="relative">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
        <path
          d="M9 9h5c3.314 0 6 2.239 6 5s-2.686 5-6 5H9V9z"
          stroke="#fff"
          strokeWidth="1.8"
          fill="none"
          strokeOpacity="0.9"
        />
        <path
          d="M17 13h5c1.657 0 3 1.343 3 3s-1.343 3-3 3h-5"
          stroke="#fff"
          strokeWidth="1.8"
          fill="none"
          strokeOpacity="0.5"
        />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#1a1a1a" />
            <stop offset="1" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute -inset-2 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
