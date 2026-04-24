import React from 'react';
import { TrendingUp, AlertTriangle, ShieldCheck, DollarSign, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const ForecastTable = ({ data, pagination, filters, onFilterChange, onPageChange }) => {
    const list = data || [];

    return (
        <div className="glass-card overflow-hidden transition-colors shadow-2xl">
            <div className="p-6 border-b border-border-main flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bg-card">
                <div>
                    <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
                        <TrendingUp className="text-accent w-5 h-5" /> 
                        Quarterly Forecast Predictions
                    </h3>
                    <p className="text-text-muted text-sm mt-1">Strategic insights based on multi-agent analysis</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-bg-primary border border-border-main rounded-lg px-3 py-1.5">
                        <Filter className="w-3.5 h-3.5 text-text-muted" />
                        <select 
                            value={filters.quarter} 
                            onChange={(e) => onFilterChange('quarter', e.target.value)}
                            className="bg-transparent text-text-main text-xs focus:outline-none border-none cursor-pointer"
                        >
                            <option value="All">All Quarters</option>
                            <option value="Q1">Q1</option>
                            <option value="Q2">Q2</option>
                            <option value="Q3">Q3</option>
                            <option value="Q4">Q4</option>
                        </select>
                        <div className="w-px h-3 bg-border-main mx-1"></div>
                        <select 
                            value={filters.year} 
                            onChange={(e) => onFilterChange('year', e.target.value)}
                            className="bg-transparent text-text-main text-xs focus:outline-none border-none cursor-pointer"
                        >
                            <option value="All">All Years</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-bg-primary/50 text-text-muted uppercase text-xs font-bold tracking-widest">
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4 text-center">Plan / Segment</th>
                            <th className="px-6 py-4 text-center">Churn Prob.</th>
                            <th className="px-6 py-4 text-center">Risk Level</th>
                            <th className="px-6 py-4 text-center">Revenue Loss</th>
                            <th className="px-6 py-4">Recommended Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-main/50">
                        {list.length > 0 ? list.map((item, idx) => (
                            <tr key={idx} className="hover:bg-bg-primary/30 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-text-main font-bold group-hover:text-accent transition-colors">{item.name}</span>
                                        <span className="text-text-muted text-xs mt-0.5 tracking-tight">{item.customer_id}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-text-main text-sm font-medium">{item.subscription_plan}</span>
                                        <span className="text-text-muted text-[10px] uppercase font-bold mt-0.5">{item.segment}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <span className="text-text-main font-mono text-sm">{item.predicted_churn_probability}</span>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <div className="flex justify-center">
                                        {item.risk_level === 'Critical' ? (
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-black rounded-full border border-rose-500/20 uppercase">
                                                <AlertTriangle className="w-3 h-3" /> Critical
                                            </span>
                                        ) : item.risk_level === 'High' ? (
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] font-black rounded-full border border-orange-500/20 uppercase">
                                                <AlertTriangle className="w-3 h-3" /> High
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full border border-emerald-500/20 uppercase">
                                                <ShieldCheck className="w-3 h-3" /> {item.risk_level}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <span className="text-rose-500 font-bold flex items-center justify-center gap-0.5">
                                        <DollarSign className="w-3 h-3" /> {item.predicted_revenue_loss}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="max-w-xs text-xs text-text-muted leading-relaxed italic">
                                        "{item.recommended_action}"
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-text-muted">
                                    No forecast data found for the selected criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-bg-primary/50 px-6 py-4 border-t border-border-main flex justify-between items-center">
                <div className="text-text-muted text-xs">
                    Showing <span className="text-text-main font-bold">{(pagination.page - 1) * pagination.limit + 1}</span> to <span className="text-text-main font-bold">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="text-text-main font-bold">{pagination.total}</span> results
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="p-2 bg-bg-card border border-border-main rounded-lg text-text-muted hover:text-text-main disabled:opacity-30 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-text-main font-medium px-2">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button 
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        className="p-2 bg-bg-card border border-border-main rounded-lg text-text-muted hover:text-text-main disabled:opacity-30 transition-all"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForecastTable;
