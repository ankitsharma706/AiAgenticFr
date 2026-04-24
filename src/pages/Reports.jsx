import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Filter, Calendar, Table as TableIcon, 
  FileBarChart, Loader2, Brain, Activity, TrendingUp, Target,
  ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { getReports, generateReport, getReportById, downloadReport, downloadCsv } from '../services/api';
import { formatDate } from '../utils/format';
import { useTheme } from '../context/ThemeContext';

const Reports = () => {
  const { theme } = useTheme();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getReports();
      setReports(data);
      if (data.length > 0 && !selectedReport) {
        setSelectedReport(data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch reports", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerate = async (type) => {
    setIsGenerating(true);
    try {
      const { report_id } = await generateReport(type);
      let pollCount = 0;
      
      const pollInterval = setInterval(async () => {
        pollCount++;
        try {
          const report = await getReportById(report_id);
          if (report.status === 'GENERATED' || pollCount > 30) {
            clearInterval(pollInterval);
            setIsGenerating(false);
            fetchReports();
            setSelectedReport(report);
          }
        } catch (err) {
          clearInterval(pollInterval);
          setIsGenerating(false);
        }
      }, 2000);
    } catch (err) {
      alert("Failed to generate report: " + (err.response?.data?.error || err.message));
      setIsGenerating(false);
    }
  };

  const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const tooltipBg = theme === 'dark' ? '#0f172b' : '#ffffff';
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  const renderReportContent = () => {
    if (!selectedReport) return (
      <div className="h-96 flex flex-col items-center justify-center text-text-muted border-2 border-dashed border-border-main rounded-3xl bg-bg-primary/30">
        <div className="p-4 bg-accent/10 rounded-full mb-6">
          <FileBarChart size={48} className="text-accent opacity-50" />
        </div>
        <h4 className="text-xl font-bold text-text-main mb-2">No Report Selected</h4>
        <p className="text-sm max-w-xs text-center">Select an audit from the grid above or pick a historical record to analyze insights.</p>
      </div>
    );

    const { type, data, created_at, report_id } = selectedReport;

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between pb-6 border-b border-border-main">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-black rounded-full uppercase tracking-tighter">
                {type.replace('_', ' ')}
              </span>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">ID: {report_id}</span>
            </div>
            <h3 className="text-2xl font-bold text-text-main">
              {type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Report
            </h3>
            <p className="text-xs text-text-muted mt-1">Analysis performed on {formatDate(created_at)}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => downloadReport(report_id)} 
              className="flex items-center gap-2 px-4 py-2 bg-bg-primary hover:bg-bg-card text-text-main text-sm font-bold rounded-xl border border-border-main transition-all"
            >
              <Download size={16} /> PDF
            </button>
            <button 
              onClick={() => downloadCsv(report_id)} 
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/20"
            >
              <TableIcon size={16} /> CSV Export
            </button>
          </div>
        </div>

        {/* Content remains largely the same for charts as they were optimized recently */}
        {type === 'retention_audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-6 h-[400px]">
                <h4 className="text-xs font-black text-text-muted uppercase tracking-widest mb-6">Churn Rate Trend Analysis</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.trend} margin={{ bottom: 10 }}>
                    <defs>
                      <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="month" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${gridColor}`, borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: 'var(--text)' }}
                    />
                    <Area type="monotone" dataKey="churn_rate" stroke="var(--primary)" fillOpacity={1} fill="url(#colorChurn)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="glass-card p-6 border-l-4 border-l-emerald-500">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Retention Rate</p>
                  <p className="text-3xl font-black text-text-main">{(data?.summary?.retention_rate * 100 || 0).toFixed(0)}%</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-rose-500">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">High Risk Count</p>
                  <p className="text-3xl font-black text-text-main">{data?.summary?.high_risk_users || 0}</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-accent">
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Audit Sample</p>
                  <p className="text-3xl font-black text-text-main">{data?.summary?.total_users || 0}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 flex flex-col">
              <h4 className="text-xs font-black text-text-muted uppercase tracking-widest mb-8 text-center">User Risk Distribution</h4>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.risk_distribution || []}
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {COLORS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${gridColor}`, borderRadius: '12px' }} />
                    <Legend verticalAlign="bottom" height={40} iconType="circle" formatter={(value) => <span className="text-text-muted text-xs font-bold uppercase tracking-widest ml-2">{value}</span>}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Behavior Audit */}
        {type === 'behavior_audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="glass-card p-6 h-[400px]">
                <h4 className="text-xs font-black text-text-muted uppercase tracking-widest mb-6">Activity Frequency (Deciles)</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={(data?.activity_distribution || []).map((v, i) => ({ bucket: `T${i+1}`, value: v }))} margin={{ bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="bucket" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'var(--primary)', opacity: 0.05 }}
                      contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${gridColor}`, borderRadius: '12px' }}
                      itemStyle={{ color: 'var(--text)' }}
                    />
                    <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-8">
                <div className="glass-card p-8 bg-accent/5 border-l-4 border-accent relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                    <Zap size={80} />
                  </div>
                  <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Engagement Insight</h4>
                  <p className="text-text-main text-lg font-medium mb-6">Aggregate satisfaction score across all segments is <span className="text-3xl font-black text-accent">{data?.engagement_score_avg || 0}/10</span></p>
                  <div className="flex items-center gap-3 text-sm text-text-muted bg-bg-card/50 p-3 rounded-xl border border-border-main w-fit">
                    <Activity size={18} className="text-rose-500" />
                    <span className="font-bold">{data?.inactive_users || 0} users flagged for critical inactivity</span>
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-6">Key Churn Determinants</h4>
                  <ul className="space-y-4">
                    {(data?.top_behaviors || data?.patterns || []).map((b, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-text-main group">
                        <div className="mt-1 p-1 bg-rose-500/10 rounded text-rose-500 group-hover:scale-110 transition-transform">
                          <Target size={14} />
                        </div>
                        <span className="font-medium leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          </div>
        )}

        {/* Strategy Audit */}
        {type === 'strategy_v2' && (
          <div className="space-y-8">
             <div className="glass-card p-10 bg-accent/5 border border-accent/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                 <ShieldCheck size={120} />
               </div>
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                  <div>
                    <h4 className="text-2xl font-black text-text-main flex items-center gap-3">
                      <Target className="text-accent" size={32} />
                      Strategic Recommendations
                    </h4>
                    <p className="text-text-muted mt-2">AI-driven actionable steps to mitigate churn and optimize LTV.</p>
                  </div>
                  <div className="px-6 py-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Projected Annual Recovery</p>
                    <p className="text-2xl font-black tracking-tight">${(data?.revenue_impact || 0).toLocaleString()}</p>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {(data?.recommendations || []).map((rec, i) => (
                    <div key={i} className="p-6 bg-bg-card rounded-2xl border border-border-main hover:border-accent/30 transition-all group cursor-default">
                       <div className="flex justify-between items-start mb-4">
                        <span className="px-2 py-1 bg-bg-primary text-text-muted text-[10px] font-black rounded-lg uppercase tracking-widest">{rec.segment}</span>
                        <div className="p-2 bg-accent/10 rounded-lg text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          <Zap size={14} />
                        </div>
                       </div>
                       <h5 className="text-lg font-bold text-text-main mb-2 leading-tight">{rec.action}</h5>
                       <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest">
                         <TrendingUp size={14} />
                         {rec.impact}
                       </div>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-fade-in max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-text-main tracking-tight">Intelligence Center</h2>
          <p className="text-text-muted mt-2 text-lg">Orchestrate multi-agent AI audits to uncover hidden churn patterns and strategic opportunities.</p>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            id: 'retention_audit', 
            title: 'Retention Audit', 
            icon: Activity, 
            desc: 'Comprehensive analysis of churn velocity and retention health across your user base.',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
          },
          { 
            id: 'behavior_audit', 
            title: 'Behavioral Audit', 
            icon: Brain, 
            desc: 'Deep dive into user interaction patterns and satisfaction scoring via behavioral deciles.',
            color: 'text-accent',
            bg: 'bg-accent/10'
          },
          { 
            id: 'strategy_v2', 
            title: 'Strategy Engine v2', 
            icon: Target, 
            desc: 'Generate AI-driven strategic recommendations with projected revenue impact analysis.',
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10'
          }
        ].map((card) => (
          <div 
            key={card.id}
            className="group glass-card p-8 flex flex-col h-full border-t-4 border-t-border-main hover:border-t-accent transition-all"
          >
            <div className={`p-4 ${card.bg} ${card.color} rounded-2xl mb-6 w-fit group-hover:scale-110 transition-transform`}>
              <card.icon size={28} />
            </div>
            <h4 className="text-xl font-bold text-text-main mb-3">{card.title}</h4>
            <p className="text-sm text-text-muted leading-relaxed mb-8 flex-1">{card.desc}</p>
            <button 
              onClick={() => handleGenerate(card.id)}
              disabled={isGenerating}
              className="flex items-center justify-between w-full px-5 py-3 bg-bg-primary hover:bg-accent hover:text-white border border-border-main hover:border-accent rounded-xl text-sm font-black uppercase tracking-widest transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>Processing <Loader2 size={16} className="animate-spin" /></>
              ) : (
                <>Run Audit <ArrowRight size={16} /></>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Main Report View Area */}
      <div className="pt-12 border-t border-border-main">
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-text-main mb-2">Audit Analysis</h3>
          <p className="text-sm text-text-muted">Review the detailed insights generated by the ChurnAI intelligence agents.</p>
        </div>
        <div className="glass-card p-10 min-h-[500px]">
          {loading ? (
            <div className="h-full flex items-center justify-center py-32">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-accent" size={48} />
                <p className="text-xs font-black text-text-muted uppercase tracking-[0.2em]">Synchronizing Intelligence</p>
              </div>
            </div>
          ) : (
            renderReportContent()
          )}
        </div>
      </div>

      {/* Historical Audit Log */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-text-main flex items-center gap-3">
            <FileText className="text-text-muted" size={20} />
            Historical Audit Log
          </h3>
          <button className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-2 hover:underline">
            <Filter size={14} /> Filter History
          </button>
        </div>
        
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg-primary/50 text-text-muted text-[10px] uppercase tracking-[0.2em] font-black border-b border-border-main">
                  <th className="px-8 py-5">Audit Identity</th>
                  <th className="px-8 py-5">Type</th>
                  <th className="px-8 py-5">Timestamp</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-main/30">
                {reports.map((report) => (
                  <tr 
                    key={report._id} 
                    onClick={() => setSelectedReport(report)}
                    className={`group cursor-pointer transition-colors ${selectedReport?._id === report._id ? 'bg-accent/5' : 'hover:bg-bg-primary/30'}`}
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${selectedReport?._id === report._id ? 'bg-accent animate-pulse' : 'bg-border-main'}`} />
                        <span className="text-sm font-bold text-text-main tracking-tight">{report.report_id}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2 py-1 bg-bg-primary text-text-muted text-[10px] font-black rounded-lg uppercase tracking-widest border border-border-main">
                        {report.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs text-text-muted font-medium">{formatDate(report.created_at)}</td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-accent group-hover:underline text-xs font-black uppercase tracking-widest">
                        Analyze →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
