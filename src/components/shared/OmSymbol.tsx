import React from 'react';

interface OmSymbolProps {
  size?: number;
  color?: string;
  className?: string;
  showPetals?: boolean;
}

export const OmSymbol: React.FC<OmSymbolProps> = ({
  size = 120,
  color = 'white',
  className = '',
  showPetals = true,
}) => {
  const petalAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const petalRadius = size * 0.48;
  const petalSize = size * 0.08;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {showPetals && petalAngles.map((angle, i) => {
        const cx = size / 2 + petalRadius * Math.cos((angle * Math.PI) / 180);
        const cy = size / 2 + petalRadius * Math.sin((angle * Math.PI) / 180);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={petalSize}
            ry={petalSize * 1.8}
            fill={color}
            opacity={0.25}
            transform={`rotate(${angle + 90} ${cx} ${cy})`}
            className="petal"
          />
        );
      })}
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={size * 0.38}
        fontFamily="serif"
      >
        ॐ
      </text>
    </svg>
  );
};

export default OmSymbol;
