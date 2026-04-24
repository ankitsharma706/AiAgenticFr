import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const ScatterPlot = ({ data }) => {
    const { theme } = useTheme();

    const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
    const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
    const tooltipBg = theme === 'dark' ? '#0f172b' : '#ffffff';

    return (
        <div className="glass-card p-6 h-[500px]">
            <h3 className="text-text-main font-semibold mb-6">Monetary Value vs. Churn Risk</h3>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Monetary" 
                        unit="$" 
                        stroke={textColor} 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Score" 
                        unit="%" 
                        stroke={textColor} 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="Frequency" />
                    <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{ 
                            backgroundColor: tooltipBg, 
                            border: `1px solid ${gridColor}`, 
                            borderRadius: '12px' 
                        }}
                        itemStyle={{ color: 'var(--text)' }}
                    />
                    <Scatter name="Users" data={Array.isArray(data) ? data : []}>
                        {(Array.isArray(data) ? data : []).map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={entry.risk === 'High' ? '#ef4444' : entry.risk === 'Medium' ? '#f59e0b' : '#10b981'} 
                                fillOpacity={0.7}
                            />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ScatterPlot;
