import React from 'react';
import { Users, AlertTriangle, Activity, Database } from 'lucide-react';

const KPIGrid = ({ data }) => {
    const stats = data || {};
    const kpis = [
        {
            title: 'Total Users',
            value: stats.total_users || 0,
            icon: Users,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            title: 'High Risk',
            value: stats.high_risk_count || 0,
            icon: AlertTriangle,
            color: 'text-red-500',
            bg: 'bg-red-500/10'
        },
        {
            title: 'Avg Churn Score',
            value: `${((stats.avg_churn_score || 0) * 100).toFixed(1)}%`,
            icon: Activity,
            color: 'text-accent',
            bg: 'bg-accent/10'
        },
        {
            title: 'System Health',
            value: 'Optimal',
            icon: Database,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, idx) => (
                <div key={idx} className="glass-card p-8 transition-all hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-text-muted text-sm font-medium">{kpi.title}</p>
                            <h3 className="text-3xl font-bold mt-1 text-text-main">{kpi.value}</h3>
                        </div>
                        <div className={`${kpi.bg} p-4 rounded-xl`}>
                            <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KPIGrid;
