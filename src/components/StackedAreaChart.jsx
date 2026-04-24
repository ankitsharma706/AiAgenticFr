import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const StackedAreaChart = ({ data }) => {
    const { theme } = useTheme();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const months = [...new Set(data.map(d => d.month))].sort((a,b) => a-b);
    const chartData = months.map(m => {
        const point = { name: monthNames[m-1] };
        data.filter(d => d.month === m).forEach(d => {
            point[d.risk] = d.value;
        });
        return point;
    });

    const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
    const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
    const tooltipBg = theme === 'dark' ? '#0f172b' : '#ffffff';

    return (
        <div className="glass-card p-6 h-[500px]">
            <h3 className="text-text-main font-semibold mb-6">Activity by Risk Segment</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: tooltipBg, 
                            border: `1px solid ${gridColor}`, 
                            borderRadius: '12px' 
                        }}
                        itemStyle={{ color: 'var(--text)' }}
                    />
                    <Area type="monotone" dataKey="High" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                    <Area type="monotone" dataKey="Medium" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
                    <Area type="monotone" dataKey="Low" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedAreaChart;
