import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
type HealthScoreProps = {
  score: number; // 0-100
  className?: string;
};
export const PortfolioHealthScore = ({
  score,
  className = ''
}: HealthScoreProps) => {
  // SVG canvas
  const W = 280;
  const H = 150;
  const cx = W / 2;
  const cy = H - 10; // arc center sits near the bottom of the canvas
  const R = 110;
  const SW = 18; // stroke width

  // Arc spans from 180° (left) to 0° (right) — a perfect half circle
  // We work in standard math angles: 0° = right, 90° = up
  // Score 0% → angle 180° (leftmost), Score 100% → angle 0° (rightmost)
  const polarToCartesian = (angleDeg: number) => {
    const rad = angleDeg * Math.PI / 180;
    return {
      x: cx + R * Math.cos(rad),
      y: cy - R * Math.sin(rad)
    };
  };
  const describeArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 0 : 0; // our arc is always ≤180°
    // Going from startAngle to endAngle counter-clockwise in SVG sweep terms:
    // sweep-flag=0 goes counter-clockwise, sweep-flag=1 goes clockwise
    // We want the arc to go from left (180°) sweeping upward to right (0°) → sweep=1
    return `M ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  // Track: full half circle 180° → 0°
  const trackPath = describeArc(180, 0);

  // Half-circle arc length
  const arcLength = Math.PI * R;

  // Framer Motion animated progress (0 → score/100)
  const progress = useMotionValue(0);
  useEffect(() => {
    const controls = animate(progress, score / 100, {
      duration: 1.5,
      ease: 'easeOut'
    });
    return controls.stop;
  }, [score]);

  // strokeDashoffset for the full progress path (180°→0°)
  // offset = arcLength * (1 - p) means it fills from left to right
  const strokeDashoffset = useTransform(progress, p => arcLength * (1 - p));

  // Dot position: computed from current progress value
  const dotAngle = useTransform(progress, p => 180 - p * 180);
  const dotX = useTransform(dotAngle, a => polarToCartesian(a).x);
  const dotY = useTransform(dotAngle, a => polarToCartesian(a).y);
  const getScoreLabel = (s: number) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Needs Work';
    return 'Needs Attention';
  };
  const getLabelColors = (s: number) => {
    if (s >= 80) return {
      bg: 'rgba(0,184,217,0.12)',
      text: '#00b8d9',
      border: 'rgba(0,184,217,0.25)'
    };
    if (s >= 60) return {
      bg: 'rgba(0,184,217,0.10)',
      text: '#00b8d9',
      border: 'rgba(0,184,217,0.20)'
    };
    return {
      bg: 'rgba(239,68,68,0.10)',
      text: '#ef4444',
      border: 'rgba(239,68,68,0.20)'
    };
  };
  const scoreLabel = getScoreLabel(score);
  const labelColors = getLabelColors(score);
  return <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{
      width: W,
      height: H
    }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible">
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4f5" />
              <stop offset="100%" stopColor="#00b8d9" />
            </linearGradient>
            <filter id="dotShadow" x="-80%" y="-80%" width="260%" height="260%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00b8d9" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Background track */}
          <path d={trackPath} fill="none" stroke="#e5e7eb" strokeWidth={SW} strokeLinecap="round" />

          {/* Animated progress arc */}
          <motion.path d={trackPath} fill="none" stroke="url(#scoreGrad)" strokeWidth={SW} strokeLinecap="round" strokeDasharray={arcLength} style={{
          strokeDashoffset
        }} />

          {/* Dot at the tip — position driven by motion value */}
          <motion.circle cx={dotX} cy={dotY} r={11} fill="white" filter="url(#dotShadow)" />
          <motion.circle cx={dotX} cy={dotY} r={5.5} fill="#00b8d9" />
        </svg>

        {/* Score + status — connected on one baseline to reduce vertical space */}
        <div className="absolute inset-0 flex items-end justify-center">
          <motion.div className="flex flex-col items-center justify-end gap-1" initial={{
          opacity: 0,
          scale: 0.7
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.4,
          duration: 0.5
        }}>
            <span className="type-score" style={{
            color: '#111827',
            lineHeight: 1
          }}>
              {score}%
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em]" style={{
            background: labelColors.bg,
            color: labelColors.text,
            border: `1px solid ${labelColors.border}`
          }}>
              {scoreLabel}
            </span>
          </motion.div>
        </div>
      </div>
    </div>;
};