import type { IconProps } from './types';

export const ArrowUpIcon = ({ size, color = 'currentColor', ...props }: IconProps) => (
  <svg
    width={size || 17}
    height={size || 11}
    viewBox="0 0 17 11"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}>
    <path
      d="M8.48535 3.77067L1.88535 10.3707L1.81198e-05 8.48534L8.48535 2.86102e-06L16.9707 8.48534L15.084 10.3707L8.48535 3.77067Z"
      fill={color}
    />
  </svg>
);
