import React from 'react';

interface FractionVisualizerProps {
  whole?: number;
  num: number;
  den: number;
  type?: 'pizza' | 'chocolate' | 'bar';
  size?: number; // width/height in px
  interactive?: boolean;
  onSliceClick?: (sliceIndex: number) => void;
  highlightCount?: number;
}

export const FractionVisualizer: React.FC<FractionVisualizerProps> = ({
  whole = 0,
  num,
  den = 4,
  type = 'pizza',
  size = 120,
  interactive = false,
  onSliceClick,
  highlightCount
}) => {
  const activeSlices = highlightCount !== undefined ? highlightCount : num;

  // Render a single pizza circle with slices
  const renderPizza = (slicesToHighlight: number, keyPrefix: string, isFullWhole = false) => {
    const center = size / 2;
    const radius = (size / 2) - 6;

    if (den <= 1 || isFullWhole) {
      return (
        <svg key={keyPrefix} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-md">
          {/* Pizza Crust */}
          <circle cx={center} cy={center} r={radius} fill="#eab308" stroke="#ca8a04" strokeWidth="4" />
          {/* Sauce & Cheese */}
          <circle cx={center} cy={center} r={radius - 6} fill="#fde047" stroke="#f59e0b" strokeWidth="2" />
          {/* Pepperoni dots */}
          <circle cx={center - 15} cy={center - 10} r="6" fill="#ef4444" />
          <circle cx={center + 15} cy={center - 12} r="6" fill="#ef4444" />
          <circle cx={center} cy={center + 18} r="6" fill="#ef4444" />
          <circle cx={center - 8} cy={center + 8} r="5" fill="#ef4444" />
          <circle cx={center + 12} cy={center + 10} r="5" fill="#ef4444" />
        </svg>
      );
    }

    // Pie slices
    const sliceAngle = (2 * Math.PI) / den;
    const paths = [];

    for (let i = 0; i < den; i++) {
      const isSelected = i < slicesToHighlight;
      const startAngle = i * sliceAngle - Math.PI / 2;
      const endAngle = (i + 1) * sliceAngle - Math.PI / 2;

      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
      const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      // Mid angle for pepperoni dot
      const midAngle = (startAngle + endAngle) / 2;
      const pepX = center + (radius * 0.6) * Math.cos(midAngle);
      const pepY = center + (radius * 0.6) * Math.sin(midAngle);

      paths.push(
        <g
          key={`${keyPrefix}-slice-${i}`}
          className={interactive ? "cursor-pointer transition-transform hover:opacity-90" : ""}
          onClick={() => onSliceClick && onSliceClick(i)}
        >
          <path
            d={pathData}
            fill={isSelected ? "#facc15" : "#fed7aa"}
            stroke="#c2410c"
            strokeWidth="2.5"
            className="transition-colors duration-200"
          />
          {isSelected && (
            <circle cx={pepX} cy={pepY} r={radius * 0.12} fill="#dc2626" />
          )}
        </g>
      );
    }

    return (
      <svg key={keyPrefix} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-md">
        <circle cx={center} cy={center} r={radius + 2} fill="#d97706" />
        {paths}
        {/* Center circle */}
        <circle cx={center} cy={center} r="4" fill="#78350f" />
      </svg>
    );
  };

  // Render chocolate bar
  const renderChocolate = () => {
    const blocks = [];
    for (let i = 0; i < den; i++) {
      const isSelected = i < activeSlices;
      blocks.push(
        <div
          key={`choc-${i}`}
          onClick={() => onSliceClick && onSliceClick(i)}
          className={`flex-1 h-14 rounded-md border-2 border-amber-950 flex items-center justify-center font-bold text-xs shadow-inner transition-all ${
            isSelected
              ? 'bg-amber-800 text-amber-100 ring-2 ring-amber-400 scale-[0.98]'
              : 'bg-amber-200/50 text-amber-700/60 dark:bg-amber-900/30'
          } ${interactive ? 'cursor-pointer hover:brightness-110' : ''}`}
        >
          {isSelected ? '🍫' : ''}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2 p-3 bg-amber-900/10 dark:bg-amber-950/40 rounded-xl border-2 border-amber-800/30">
        <div className="flex gap-1.5 w-full max-w-md">
          {blocks}
        </div>
        <div className="text-center text-xs font-semibold text-amber-900 dark:text-amber-200">
          {activeSlices} / {den} ({activeSlices} bo'lak tanlandi)
        </div>
      </div>
    );
  };

  if (type === 'chocolate') {
    return renderChocolate();
  }

  // Pizza representation with whole pizzas + remaining fraction
  const wholesArray = Array.from({ length: Math.min(whole, 4) }, (_, idx) => idx);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-2">
      {/* Whole pizzas */}
      {wholesArray.map((idx) => (
        <div key={`whole-wrap-${idx}`} className="flex flex-col items-center">
          {renderPizza(den, `whole-${idx}`, true)}
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1">1 butun</span>
        </div>
      ))}

      {/* Fractional pizza */}
      {den > 0 && activeSlices > 0 && (
        <div className="flex flex-col items-center">
          {renderPizza(activeSlices, 'fractional', false)}
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mt-1">
            {activeSlices}/{den} qism
          </span>
        </div>
      )}

      {/* If whole is 0 and num is 0, show empty pizza outline */}
      {whole === 0 && activeSlices === 0 && (
        <div className="flex flex-col items-center opacity-60">
          {renderPizza(0, 'empty', false)}
          <span className="text-xs font-medium text-slate-500 mt-1">0/{den}</span>
        </div>
      )}
    </div>
  );
};
