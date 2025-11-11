import type { IconProps } from './types';

export const ArrowDownIcon = ({ size, color = 'currentColor', ...props }: IconProps) => (
  <svg
    width={size || 17}
    height={size || 11}
    viewBox="0 0 17 11"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}>
    <path
      d="M8.48535 6.60002L1.88535 2.09808e-05L1.81198e-05 1.88535L8.48535 10.3707L16.9707 1.88535L15.084 2.09808e-05L8.48535 6.60002Z"
      fill={color}
    />
  </svg>
);
