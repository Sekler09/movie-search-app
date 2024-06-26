import { FC } from 'react';

interface StarIconProps {
  color: string;
}

const StarIcon: FC<StarIconProps> = ({ color }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill={color}
    stroke={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="star">
      <path
        id="Vector"
        d="M14 20.7084L6.79929 24.4942L8.17479 16.4757L2.34146 10.7975L10.3915 9.63086L13.9918 2.33569L17.5921 9.63086L25.6421 10.7975L19.8088 16.4757L21.1843 24.4942L14 20.7084Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default StarIcon;
