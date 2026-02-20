import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
type MetricStatus = 'good' | 'warning' | 'danger';
type HealthMetricCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  status: MetricStatus;
  onClick?: () => void;
};
export const HealthMetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  status,
  onClick
}: HealthMetricCardProps) => {
  const getStatusColor = (status: MetricStatus) => {
    switch (status) {
      case 'good':
        return 'text-[#00b8d9]';
      case 'warning':
        return 'text-amber-500';
      case 'danger':
        return 'text-rose-500';
    }
  };
  const getStatusBg = (status: MetricStatus) => {
    switch (status) {
      case 'good':
        return 'bg-[#00b8d9]/10';
      case 'warning':
        return 'bg-amber-50';
      case 'danger':
        return 'bg-rose-50';
    }
  };
  const statusColor = getStatusColor(status);
  const statusBg = getStatusBg(status);
  return <motion.div whileTap={{
    scale: 0.98
  }} onClick={onClick} className="bg-white rounded-2xl p-3.5 hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100 shadow-sm flex flex-col gap-2">
    <div className={`${statusBg} rounded-xl p-2 w-fit`}>
      <Icon className={`w-5 h-5 ${statusColor}`} strokeWidth={2} />
    </div>
    <div className="flex flex-col">
      <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-0.5">{title}</p>
      <p className={`text-xl font-semibold mb-0.5 font-mono tabular-nums ${statusColor}`}>{value}</p>
      <p className="text-gray-400 text-[11px] leading-tight">{subtitle}</p>
    </div>
  </motion.div>;
};