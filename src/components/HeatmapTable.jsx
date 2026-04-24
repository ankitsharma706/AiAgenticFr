import React from 'react';

const HeatmapTable = ({ data }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const segments = ["High", "Medium", "Low"];
    const months = Array.from({length: 12}, (_, i) => i + 1);

    const getIntensity = (val, risk) => {
        if (!val) return 'bg-bg-primary text-text-muted opacity-30';
        
        if (risk === 'High') {
            if (val > 100) return 'bg-rose-500 text-white shadow-lg shadow-rose-500/20';
            if (val > 50) return 'bg-rose-400/60 text-rose-900 dark:text-rose-100';
            return 'bg-rose-500/20 text-rose-800 dark:text-rose-200';
        }
        if (risk === 'Medium') {
            if (val > 100) return 'bg-amber-500 text-white shadow-lg shadow-amber-500/20';
            if (val > 50) return 'bg-amber-400/60 text-amber-900 dark:text-amber-100';
            return 'bg-amber-500/20 text-amber-800 dark:text-amber-200';
        }
        // Low Risk
        if (val > 100) return 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20';
        if (val > 50) return 'bg-emerald-400/60 text-emerald-900 dark:text-emerald-100';
        return 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-200';
    };

    const getValue = (risk, month) => {
        const item = (Array.isArray(data) ? data : []).find(d => d.risk === risk && d.month === month);
        return item ? item.value : 0;
    };

    return (
        <div className="glass-card p-8 overflow-hidden transition-colors">
            <h3 className="text-text-main font-semibold mb-6">Engagement Heatmap (Txns by Segment)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="p-2 text-left text-text-muted font-medium">Segment</th>
                            {monthNames.map(m => (
                                <th key={m} className="p-2 text-center text-text-muted font-medium">{m}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {segments.map(seg => (
                            <tr key={seg} className="border-t border-border-main/50">
                                <td className="p-3 font-semibold text-text-main">{seg}</td>
                                {months.map(m => {
                                    const val = getValue(seg, m);
                                    return (
                                        <td key={`${seg}-${m}`} className="p-1">
                                            <div className={`h-10 w-full flex items-center justify-center rounded-lg font-bold transition-all hover:scale-105 cursor-default ${getIntensity(val, seg)}`}>
                                                {val > 0 ? val : '-'}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HeatmapTable;
