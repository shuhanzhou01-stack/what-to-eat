function DoodleIcon({ type, className = '' }) {
  const commonProps = {
    className,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  switch (type) {
    case 'sushi':
      return (
        <svg {...commonProps}>
          <path d="M18 30c4-8 14-8 22-2" />
          <path d="M24 20c4 2 12 2 16 0" />
          <path d="M20 34h24" />
          <path d="M20 26c0-4 8-8 12-8s12 4 12 8" />
        </svg>
      )
    case 'hotpot':
      return (
        <svg {...commonProps}>
          <path d="M14 26h36v10a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8V26Z" />
          <path d="M18 26c2-6 6-8 13-8s11 2 13 8" />
          <path d="M24 20c1.5 3 5 5 10 5s8.5-2 10-5" />
          <path d="M24 40v6" />
          <path d="M40 40v6" />
        </svg>
      )
    case 'coffee':
      return (
        <svg {...commonProps}>
          <path d="M18 22h26a8 8 0 0 1 0 16H18V22Z" />
          <path d="M44 26a6 6 0 0 1 0 12" />
          <path d="M26 18v-4" />
          <path d="M34 18v-4" />
        </svg>
      )
    case 'bowl':
      return (
        <svg {...commonProps}>
          <path d="M14 30h36a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10Z" />
          <path d="M18 30c4 4 10 6 14 6s10-2 14-6" />
          <path d="M26 20c2 4 6 6 10 6s8-2 10-6" />
        </svg>
      )
    case 'fork':
      return (
        <svg {...commonProps}>
          <path d="M24 10v34" />
          <path d="M32 10v34" />
          <path d="M20 14h16" />
          <path d="M18 44h20" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...commonProps}>
          <path d="M20 20c10 6 16 18 12 30" />
          <path d="M24 14c12 10 12 24 4 36" />
          <path d="M18 26c12-10 20-6 28 4" />
        </svg>
      )
    case 'cat':
      return (
        <svg {...commonProps}>
          <path d="M20 44c4-10 16-14 24-12 8 2 12 10 12 12" />
          <path d="M20 44c0-12 5-24 16-24s16 12 16 24" />
          <path d="M22 32c2 0 4-2 6-2s4 2 6 2" />
          <path d="M34 32c2 0 4-2 6-2s4 2 6 2" />
        </svg>
      )
    case 'cloud':
      return (
        <svg {...commonProps}>
          <path d="M18 38a10 10 0 0 1 20 0" />
          <path d="M14 38a8 8 0 0 1 10-10 10 10 0 0 1 18 4 8 8 0 0 1 8 10" />
        </svg>
      )
    case 'shopping':
      return (
        <svg {...commonProps}>
          <path d="M16 18h32l-4 28H20L16 18Z" />
          <path d="M24 18V10a6 6 0 0 1 12 0v8" />
          <path d="M20 28h24" />
        </svg>
      )
    case 'book':
      return (
        <svg {...commonProps}>
          <path d="M16 16h32v32H16z" />
          <path d="M16 16l16 8 16-8" />
          <path d="M32 24v24" />
        </svg>
      )
    case 'cake':
      return (
        <svg {...commonProps}>
          <path d="M16 34h32v10H16z" />
          <path d="M18 34c4-10 10-12 14-12s10 2 14 12" />
          <path d="M24 22c0-3 4-6 4-6s4 3 4 6" />
        </svg>
      )
    case 'burger':
      return (
        <svg {...commonProps}>
          <path d="M16 30h32" />
          <path d="M16 34h32" />
          <path d="M18 26h28c0-4-2-8-14-8S18 22 18 26Z" />
        </svg>
      )
    case 'wave':
      return (
        <svg {...commonProps}>
          <path d="M14 34c4-6 8-6 12 0s8 6 12 0 8-6 12 0" />
          <path d="M14 42c4-6 8-6 12 0s8 6 12 0 8-6 12 0" />
        </svg>
      )
    case 'cup':
      return (
        <svg {...commonProps}>
          <path d="M18 22h28v12a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V22Z" />
          <path d="M44 26a6 6 0 0 1 0 12" />
          <path d="M26 18v-4" />
        </svg>
      )
    case 'chopsticks':
      return (
        <svg {...commonProps}>
          <path d="M18 14v32" />
          <path d="M26 14v32" />
          <path d="M16 14h12" />
          <path d="M22 46h8" />
        </svg>
      )
    default:
      return (
        <svg {...commonProps}>
          <circle cx="32" cy="32" r="20" />
        </svg>
      )
  }
}

export default DoodleIcon
