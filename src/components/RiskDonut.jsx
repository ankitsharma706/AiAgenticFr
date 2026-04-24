import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const RiskDonut = ({ data }) => {
    const { theme } = useTheme();
    const COLORS = {
        'High': '#f87171',
        'Medium': '#fbbf24',
        'Low': '#10b981'
    };

    const formattedData = data.map(d => ({
        name: d._id,
        value: d.count
    }));

    const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
    const tooltipBg = theme === 'dark' ? '#0f172b' : '#ffffff';

    return (
        <div className="glass-card p-8 h-[500px]">
            <h3 className="text-text-main font-semibold mb-6">Risk Segmentation</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ bottom: 20 }}>
                    <Pie
                        data={formattedData}
                        cx="50%"
                        cy="40%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {formattedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || 'var(--primary)'} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: tooltipBg, 
                            border: `1px solid ${gridColor}`, 
                            borderRadius: '12px' 
                        }}
                        itemStyle={{ color: 'var(--text)' }}
                    />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        formatter={(value) => <span className="text-text-muted text-sm">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RiskDonut;
