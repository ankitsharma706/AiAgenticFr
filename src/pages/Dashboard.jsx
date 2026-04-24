import React, { useState, useEffect } from 'react';
import { analyticsService } from '../services/api';
import KPIGrid from '../components/KPIGrid';
import TrendChart from '../components/TrendChart';
import RiskDonut from '../components/RiskDonut';
import StackedAreaChart from '../components/StackedAreaChart';
import ScatterPlot from '../components/ScatterPlot';
import HeatmapTable from '../components/HeatmapTable';
import TopUsersTable from '../components/TopUsersTable';
import ForecastTable from '../components/ForecastTable';
import { RefreshCw, Download, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const [summary, setSummary] = useState({});
    const [trends, setTrends] = useState([]);
    const [segments, setSegments] = useState([]);
    const [heatmap, setHeatmap] = useState([]);
    const [scatter, setScatter] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
    const [forecasts, setForecasts] = useState({ data: [], total: 0, page: 1, totalPages: 0, limit: 20 });
    const [forecastFilters, setForecastFilters] = useState({ quarter: 'All', year: 'All' });
    const [forecastPage, setForecastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [s, t, seg, h, sc, top, f] = await Promise.all([
                analyticsService.getSummary(),
                analyticsService.getTrends(),
                analyticsService.getSegments(),
                analyticsService.getHeatmap(),
                analyticsService.getScatter(),
                analyticsService.getTopUsers(),
                analyticsService.getForecasts({ page: forecastPage, ...forecastFilters })
            ]);
            setSummary(s);
            setTrends(t);
            setSegments(seg);
            setHeatmap(h);
            setScatter(sc);
            setTopUsers(top);
            setForecasts(f);
        } catch (err) {
            console.error('Failed to load dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchForecasts = async () => {
        try {
            const f = await analyticsService.getForecasts({ 
                page: forecastPage, 
                quarter: forecastFilters.quarter, 
                year: forecastFilters.year 
            });
            setForecasts(f);
        } catch (err) {
            console.error('Failed to load forecasts:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) fetchForecasts();
    }, [forecastPage, forecastFilters]);

    const handleFilterChange = (key, value) => {
        setForecastFilters(prev => ({ ...prev, [key]: value }));
        setForecastPage(1); // Reset to first page on filter
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-accent animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-primary text-text-main p-8 font-sans transition-colors">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-text-main tracking-tight">Intelligence Dashboard</h1>
                    <p className="text-text-muted mt-2 text-lg">Real-time churn analysis & predictive behavioral insights</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={fetchData}
                        className="flex items-center gap-2 px-6 py-3 bg-bg-card border border-border-main rounded-xl hover:bg-bg-primary transition-all font-semibold text-text-main"
                    >
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 transition-all font-semibold shadow-lg shadow-accent/20">
                        <Download className="w-4 h-4" /> Export PDF
                    </button>
                </div>
            </div>

            {/* Row 1: KPI Cards */}
            <div className="mb-8">
                <KPIGrid data={summary} />
            </div>

            {/* Row 2: Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
                <div className="lg:col-span-2">
                    <TrendChart data={trends} />
                </div>
                <div>
                    <RiskDonut data={segments} />
                </div>
            </div>

            {/* Row 3: Advanced Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <StackedAreaChart data={heatmap} />
                <ScatterPlot data={scatter} />
            </div>

            {/* Row 4: Heatmap Table */}
            <div className="mb-8">
                <HeatmapTable data={heatmap} />
            </div>

            {/* Row 5: Data Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <TopUsersTable data={topUsers} />
                <div className="bg-bg-card border border-border-main rounded-2xl p-6 transition-colors">
                    <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
                        <TrendingUp className="text-accent w-5 h-5" /> Analytics Insights
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-accent/5 rounded-xl border border-accent/10">
                            <p className="text-accent text-xs font-bold uppercase mb-1">Churn Risk Trend</p>
                            <p className="text-text-muted text-sm">Overall churn probability has increased by 4.2% this month. High-value accounts in the Enterprise segment show stable health.</p>
                        </div>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
                            <p className="text-orange-400 text-xs font-bold uppercase mb-1">Critical Segment</p>
                            <p className="text-text-muted text-sm">SMB segment remains the most volatile with a 68% concentration in Medium to High risk buckets.</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                            <p className="text-emerald-400 text-xs font-bold uppercase mb-1">Growth Opportunity</p>
                            <p className="text-text-muted text-sm">Upselling Professional plans to "Low Risk" Growth plan users could recover approximately $42k in monthly recurring revenue.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 6: Forecast Table */}
            <div className="mb-8">
                <ForecastTable 
                    data={forecasts.data} 
                    pagination={forecasts}
                    filters={forecastFilters}
                    onFilterChange={handleFilterChange}
                    onPageChange={setForecastPage}
                />
            </div>

            {/* Footer */}
            <footer className="mt-16 text-center text-text-muted text-sm border-t border-border-main pt-8">
                <p>&copy; 2026 ChurnAI Intelligence Systems. All data is processed using localized ML agents.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
