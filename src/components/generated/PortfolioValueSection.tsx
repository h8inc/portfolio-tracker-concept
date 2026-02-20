import React, { useState, useMemo, useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
type Period = '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
const periodDisplayMap: Record<Period, string> = {
  '1W': 'week',
  '1M': 'month',
  '3M': '3 months',
  '6M': '6 months',
  '1Y': 'year',
  'ALL': 'all time'
};
const formatNumber = (num: number) => new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(num);
const formatChange = (num: number) => {
  const absNum = Math.abs(num);
  if (absNum >= 1000) return `${num > 0 ? '+' : '-'}${(absNum / 1000).toFixed(1)}k`;
  return num > 0 ? `+${num.toFixed(1)}` : num.toFixed(1);
};
const formatValue = (value: number) => `${(value / 1000).toFixed(2)}K`;
const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});
const generateSmoothPath = (points: Array<{
  x: number;
  y: number;
}>, tension = 0.3): string => {
  if (points.length < 2) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || points[i + 1];
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return path;
};
const generateDailyData = (days: number) => {
  const data: Array<{
    value: number;
  }> = [];
  let value = 180000;
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 15000;
    value = Math.max(140000, Math.min(220000, value + change));
    data.push({
      value
    });
  }
  return data;
};
const DAILY_DATA = generateDailyData(90);
const getDataForPeriod = (period: Period) => {
  const daysMap: Record<Period, number> = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 90,
    '1Y': 90,
    'ALL': 90
  };
  const days = daysMap[period];
  const today = new Date();
  return DAILY_DATA.slice(0, days).map((item, index) => ({
    index,
    value: item.value,
    date: new Date(today.getTime() - (days - index - 1) * 24 * 60 * 60 * 1000)
  }));
};
export const PortfolioValueSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('3M');
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const revealedClipRef = useRef<SVGRectElement | null>(null);
  const unrevealedClipRef = useRef<SVGRectElement | null>(null);
  const data = useMemo(() => getDataForPeriod(selectedPeriod), [selectedPeriod]);
  const periods: Period[] = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];
  const latestValue = useMemo(() => DAILY_DATA[DAILY_DATA.length - 1].value, []);
  const {
    change,
    changePercentage
  } = useMemo(() => {
    const daysMap: Record<Period, number> = {
      '1W': 7,
      '1M': 30,
      '3M': 90,
      '6M': 90,
      '1Y': 90,
      'ALL': 90
    };
    const days = daysMap[selectedPeriod];
    const start = DAILY_DATA[Math.max(0, DAILY_DATA.length - days)].value;
    const diff = latestValue - start;
    return {
      change: diff,
      changePercentage: diff / start * 100
    };
  }, [selectedPeriod, latestValue]);
  const displayValue = hoveredValue !== null ? hoveredValue : latestValue;
  const displayChange = hoveredValue !== null ? hoveredValue - latestValue : change;
  const displayChangePercentage = hoveredValue !== null ? (hoveredValue - latestValue) / latestValue * 100 : changePercentage;
  const isPositive = displayChange >= 0;
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const margin = {
      top: 40,
      right: 58,
      bottom: 12,
      left: 0
    };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    const chartBottomY = containerHeight - margin.bottom;
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const padding = (maxValue - minValue) * 0.1;
    const xScale = (index: number) => index / (data.length - 1) * (containerWidth - margin.right);
    const yScale = (value: number) => margin.top + height - (value - (minValue - padding)) / (maxValue + padding - (minValue - padding)) * height;
    const points = data.map(d => ({
      x: xScale(d.index),
      y: yScale(d.value),
      value: d.value,
      index: d.index,
      date: d.date
    }));
    const svg = svgRef.current;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('width', containerWidth.toString());
    svg.setAttribute('height', containerHeight.toString());
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Cyan gradient
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'area-gradient-pv');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#00b8d9');
    stop1.setAttribute('stop-opacity', '0.25');
    gradient.appendChild(stop1);
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '60%');
    stop2.setAttribute('stop-color', '#00b8d9');
    stop2.setAttribute('stop-opacity', '0.08');
    gradient.appendChild(stop2);
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', '#00b8d9');
    stop3.setAttribute('stop-opacity', '0');
    gradient.appendChild(stop3);
    defs.appendChild(gradient);

    // Revealed clip
    const revealedClip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    revealedClip.setAttribute('id', 'revealed-clip-pv');
    const revealedRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    revealedRect.setAttribute('x', '0');
    revealedRect.setAttribute('y', '0');
    revealedRect.setAttribute('width', containerWidth.toString());
    revealedRect.setAttribute('height', containerHeight.toString());
    revealedClipRef.current = revealedRect;
    revealedClip.appendChild(revealedRect);
    defs.appendChild(revealedClip);

    // Unrevealed clip
    const unrevealedClip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    unrevealedClip.setAttribute('id', 'unrevealed-clip-pv');
    const unrevealedRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    unrevealedRect.setAttribute('x', '0');
    unrevealedRect.setAttribute('y', '0');
    unrevealedRect.setAttribute('width', '0');
    unrevealedRect.setAttribute('height', containerHeight.toString());
    unrevealedClipRef.current = unrevealedRect;
    unrevealedClip.appendChild(unrevealedRect);
    defs.appendChild(unrevealedClip);
    svg.appendChild(defs);
    const linePathData = generateSmoothPath(points);
    const areaPathData = linePathData + ` L ${points[points.length - 1].x} ${chartBottomY}` + ` L ${points[0].x} ${chartBottomY} Z`;
    const revealedArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    revealedArea.setAttribute('d', areaPathData);
    revealedArea.setAttribute('fill', 'url(#area-gradient-pv)');
    revealedArea.setAttribute('clip-path', 'url(#revealed-clip-pv)');
    svg.appendChild(revealedArea);
    const revealedLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    revealedLine.setAttribute('d', linePathData);
    revealedLine.setAttribute('fill', 'none');
    revealedLine.setAttribute('stroke', '#00b8d9');
    revealedLine.setAttribute('stroke-width', '2');
    revealedLine.setAttribute('stroke-linecap', 'round');
    revealedLine.setAttribute('stroke-linejoin', 'round');
    revealedLine.setAttribute('clip-path', 'url(#revealed-clip-pv)');
    svg.appendChild(revealedLine);
    const unrevealedLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    unrevealedLine.setAttribute('d', linePathData);
    unrevealedLine.setAttribute('fill', 'none');
    unrevealedLine.setAttribute('stroke', '#d1d5db');
    unrevealedLine.setAttribute('stroke-width', '2');
    unrevealedLine.setAttribute('stroke-linecap', 'round');
    unrevealedLine.setAttribute('stroke-linejoin', 'round');
    unrevealedLine.setAttribute('clip-path', 'url(#unrevealed-clip-pv)');
    unrevealedLine.setAttribute('opacity', '0.5');
    svg.appendChild(unrevealedLine);

    // Animate
    const totalLength = revealedLine.getTotalLength?.() || 0;
    revealedLine.setAttribute('stroke-dasharray', totalLength.toString());
    revealedLine.setAttribute('stroke-dashoffset', totalLength.toString());
    if (revealedLine.animate) {
      revealedLine.animate([{
        strokeDashoffset: totalLength
      }, {
        strokeDashoffset: 0
      }], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });
    }

    // Vertical line
    const verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    verticalLine.setAttribute('stroke', 'rgba(0, 184, 217, 0.35)');
    verticalLine.setAttribute('stroke-width', '1');
    verticalLine.setAttribute('stroke-dasharray', '4 4');
    verticalLine.setAttribute('opacity', '0');
    svg.appendChild(verticalLine);

    // Hover dot
    const dotsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(dotsGroup);
    const hoverDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hoverDot.setAttribute('r', '0');
    hoverDot.setAttribute('fill', '#00b8d9');
    hoverDot.setAttribute('stroke', '#ffffff');
    hoverDot.setAttribute('stroke-width', '2');
    hoverDot.setAttribute('opacity', '0');
    dotsGroup.appendChild(hoverDot);

    // Value labels
    const maxLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    maxLabel.setAttribute('x', (containerWidth - margin.right + 8).toString());
    maxLabel.setAttribute('y', (margin.top + 5).toString());
    maxLabel.setAttribute('fill', '#9ca3af');
    maxLabel.setAttribute('font-size', '10');
    maxLabel.setAttribute('font-weight', '500');
    maxLabel.setAttribute('text-anchor', 'start');
    maxLabel.textContent = formatValue(maxValue);
    svg.appendChild(maxLabel);
    const minLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    minLabel.setAttribute('x', (containerWidth - margin.right + 8).toString());
    minLabel.setAttribute('y', (containerHeight - margin.bottom + 5).toString());
    minLabel.setAttribute('fill', '#9ca3af');
    minLabel.setAttribute('font-size', '10');
    minLabel.setAttribute('font-weight', '500');
    minLabel.setAttribute('text-anchor', 'start');
    minLabel.textContent = formatValue(minValue);
    svg.appendChild(minLabel);

    // Overlay
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    overlay.setAttribute('x', margin.left.toString());
    overlay.setAttribute('y', margin.top.toString());
    overlay.setAttribute('width', width.toString());
    overlay.setAttribute('height', height.toString());
    overlay.setAttribute('fill', 'transparent');
    overlay.setAttribute('pointer-events', 'all');
    const handleInteraction = (clientX: number) => {
      const rect = svg.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const relativeX = mouseX - margin.left;
      const normalizedX = Math.max(0, Math.min(1, relativeX / width));
      const closestIndex = Math.round(normalizedX * (data.length - 1));
      if (closestIndex >= 0 && closestIndex < data.length) {
        const point = points[closestIndex];
        if (revealedClipRef.current && unrevealedClipRef.current) {
          revealedClipRef.current.setAttribute('x', '0');
          revealedClipRef.current.setAttribute('width', point.x.toString());
          unrevealedClipRef.current.setAttribute('x', point.x.toString());
          unrevealedClipRef.current.setAttribute('width', (containerWidth - point.x).toString());
        }
        const tooltipWidth = 110;
        let finalX = point.x;
        if (point.x - tooltipWidth / 2 < 0) finalX = tooltipWidth / 2;else if (point.x + tooltipWidth / 2 > containerWidth) finalX = containerWidth - tooltipWidth / 2;
        setHoveredIndex(closestIndex);
        setTooltipPos({
          x: finalX,
          y: margin.top - 28
        });
        setHoveredValue(point.value);
        hoverDot.setAttribute('cx', point.x.toString());
        hoverDot.setAttribute('cy', point.y.toString());
        hoverDot.setAttribute('r', '5');
        hoverDot.setAttribute('opacity', '1');
        verticalLine.setAttribute('x1', point.x.toString());
        verticalLine.setAttribute('x2', point.x.toString());
        verticalLine.setAttribute('y1', margin.top.toString());
        verticalLine.setAttribute('y2', chartBottomY.toString());
        verticalLine.setAttribute('opacity', '1');
      }
    };
    const handleInteractionEnd = () => {
      setHoveredIndex(null);
      setTooltipPos(null);
      setHoveredValue(null);
      hoverDot.setAttribute('r', '0');
      hoverDot.setAttribute('opacity', '0');
      verticalLine.setAttribute('opacity', '0');
      if (revealedClipRef.current && unrevealedClipRef.current) {
        revealedClipRef.current.setAttribute('width', containerWidth.toString());
        unrevealedClipRef.current.setAttribute('width', '0');
      }
    };
    overlay.addEventListener('mousemove', e => handleInteraction(e.clientX));
    overlay.addEventListener('mouseout', handleInteractionEnd);
    overlay.addEventListener('touchmove', e => {
      e.preventDefault();
      handleInteraction(e.touches[0].clientX);
    });
    overlay.addEventListener('touchend', handleInteractionEnd);
    svg.appendChild(overlay);
  }, [data]);
  return <div className="w-full bg-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="type-eyebrow">Portfolio Value</p>
            <div className="flex items-baseline gap-1.5">
              <span className="type-metric">
                {formatNumber(displayValue)}
              </span>
              <span className="type-unit">EUR</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`type-delta ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {formatChange(displayChange)} EUR ({displayChangePercentage.toFixed(2)}%)
              </span>
              <span className="type-context border-b border-dashed border-gray-300 pb-px">
                last {periodDisplayMap[selectedPeriod]}
              </span>
            </div>
          </div>
          <button className="bg-gray-100 hover:bg-gray-200 transition-all duration-200 rounded-xl p-2 shrink-0" aria-label="Refresh portfolio">
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full" style={{
      height: '160px'
    }}>
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
          <svg ref={svgRef} className="w-full h-full" />
          {hoveredIndex !== null && tooltipPos && data[hoveredIndex] && <div ref={tooltipRef} className="absolute bg-gray-900 text-white px-2 py-0.5 rounded-full text-[9px] font-semibold pointer-events-none z-50 shadow whitespace-nowrap" style={{
          left: `${tooltipPos.x}px`,
          top: `${tooltipPos.y}px`,
          transform: 'translateX(-50%)'
        }}>
              {formatDate(data[hoveredIndex].date)}
            </div>}
        </div>
      </div>

      {/* Period selector */}
      <div className="flex items-center justify-center gap-0.5 pb-3">
        {periods.map(period => <button key={period} onClick={() => setSelectedPeriod(period)} className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${selectedPeriod === period ? 'bg-[#00b8d9] text-white shadow-sm' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}>
            {period}
          </button>)}
      </div>
    </div>;
};