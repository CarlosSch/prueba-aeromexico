import type { IconProps } from './types';

export const DeleteIcon = ({ size, color = 'currentColor', ...props }: IconProps) => {
  return (
    <svg
      width={size || 15}
      height={size || 15}
      viewBox="0 0 15 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M13.25 4.875V16.625C13.25 18.558 11.683 20.125 9.75 20.125H5.25C3.317 20.125 1.75 18.558 1.75 16.625V4.875H13.25Z"
        stroke={color}
      />
      <path
        d="M2.5 3.625H12.5C13.4317 3.625 14.2123 4.26268 14.4346 5.125H0.56543C0.787655 4.26268 1.56829 3.625 2.5 3.625Z"
        fill={color}
        stroke={color}
      />
      <rect
        x="10.3125"
        y="7.1875"
        width="0.625"
        height="10.625"
        rx="0.3125"
        fill={color}
        stroke={color}
        strokeWidth="0.625"
      />
      <rect
        x="7.1875"
        y="7.1875"
        width="0.625"
        height="10.625"
        rx="0.3125"
        fill={color}
        stroke={color}
        strokeWidth="0.625"
      />
      <rect
        x="4.0625"
        y="7.1875"
        width="0.625"
        height="10.625"
        rx="0.3125"
        fill={color}
        stroke={color}
        strokeWidth="0.625"
      />
      <rect x="4.875" y="0.5" width="5.25" height="2.75" fill="" stroke={color} />
    </svg>
  );
};
