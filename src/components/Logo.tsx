export default function Logo({ size = 26 }: { size?: number }) {
  return (
    <div className="relative">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="url(#logoG)" />
        <path d="M9.5 8.5h4.5v15H9.5z" fill="#fff" fillOpacity="0.95" />
        <path d="M18 8.5h4.5v15H18z" fill="#fff" fillOpacity="0.7" />
        <defs>
          <linearGradient id="logoG" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute -inset-1.5 rounded-xl bg-indigo-500/15 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
