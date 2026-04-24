import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const TrendChart = ({ data }) => {
    const { theme } = useTheme();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedData = data.map(d => ({
        ...d,
        name: monthNames[d.month - 1]
    }));

    const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
    const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
    const tooltipBg = theme === 'dark' ? '#0f172b' : '#ffffff';

    return (
        <div className="glass-card p-6 h-[500px]">
            <h3 className="text-text-main font-semibold mb-6">User Activity Trends</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData} margin={{ bottom: 20 }}>
                    <defs>
                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis 
                        dataKey="name" 
                        stroke={textColor} 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                    />
                    <YAxis 
                        stroke={textColor} 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: tooltipBg, 
                            border: `1px solid ${gridColor}`, 
                            borderRadius: '12px',
                        }}
                        itemStyle={{ color: 'var(--text)' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="activity" 
                        stroke="var(--primary)" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorActivity)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;
