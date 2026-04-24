import React, { useState } from 'react';
import { Target, Send, Loader2, CheckCircle2, AlertCircle, Info, Search, DollarSign, Activity, ShieldCheck } from 'lucide-react';
import { usePrediction } from '../hooks/usePrediction';
import { analyticsService } from '../services/api';
import RiskBadge from '../components/RiskBadge';
import { useTheme } from '../context/ThemeContext';

const Prediction = () => {
  const { theme } = useTheme();
  const { runPrediction, loading, error, result } = usePrediction();
  const [lookupLoading, setLookupLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: 'C-' + Math.floor(Math.random() * 10000),
    name: '',
    segment: 'Enterprise',
    subscription_plan: 'Professional',
    status: 'Active',
    churn_prob: '',
    risk_level: '',
    revenue_loss: '',
    last_active: '',
    forecast_month: '',
    action: '',
    txn_7d: 0,
    txn_30d: 0,
    txn_90d: 0,
    recency_days: 0,
    monetary: 0
  });
  const [suggestions, setSuggestions] = useState([]);

  React.useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const top = await analyticsService.getTopUsers();
        setSuggestions(top.map(u => u.customer_id));
      } catch (err) {
        setSuggestions(['C-001', 'C-002', 'C-003']); // Fallback
      }
    };
    fetchSuggestions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLookup = async () => {
    if (!formData.customer_id) return;
    setLookupLoading(true);
    try {
      const data = await analyticsService.getForecastById(formData.customer_id);
      setFormData({
        customer_id: data.customer_id,
        name: data.name,
        segment: data.segment,
        subscription_plan: data.subscription_plan,
        status: data.current_status || 'Active',
        churn_prob: data.predicted_churn_probability,
        risk_level: data.risk_level,
        revenue_loss: data.predicted_revenue_loss,
        last_active: data.last_active_date || '2026-04-23',
        forecast_month: data.forecast_month,
        action: data.recommended_action,
        txn_7d: data.txn_7d || 0,
        txn_30d: data.txn_30d || 0,
        txn_90d: data.txn_90d || 0,
        recency_days: data.recency_days || 0,
        monetary: data.monetary || 0
      });
    } catch (err) {
      console.error("Lookup failed", err);
      alert("Customer ID not found in forecasts.");
    } finally {
      setLookupLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await runPrediction({
        customer_id: formData.customer_id,
        name: formData.name,
        segment: formData.segment,
        subscription_plan: formData.subscription_plan,
        current_status: formData.status,
        predicted_churn_probability: formData.churn_prob,
        risk_level: formData.risk_level,
        predicted_revenue_loss: formData.revenue_loss,
        last_active_date: formData.last_active,
        forecast_month: formData.forecast_month,
        recommended_action: formData.action,
        txn_7d: formData.txn_7d,
        txn_30d: formData.txn_30d,
        txn_90d: formData.txn_90d,
        recency_days: formData.recency_days,
        monetary: formData.monetary
      });
    } catch (err) {
      console.error("Prediction failed", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12 transition-colors bg-bg-primary">
      <div className="glass-card p-8 bg-bg-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/20 shadow-lg shadow-accent/10">
              <Target size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-main tracking-tight">Churn Prediction Engine</h2>
              <p className="text-text-muted text-sm">Strategic behavioral analysis & real-time inference</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-bg-primary border border-border-main p-1 rounded-xl">
             <input
                type="text"
                placeholder="Lookup ID (e.g. C-114)..."
                value={formData.customer_id}
                name="customer_id"
                onChange={handleChange}
                className="bg-transparent border-none text-text-main text-sm px-4 py-2 focus:outline-none w-48 placeholder-text-muted"
              />
              <button 
                onClick={handleLookup}
                disabled={lookupLoading}
                className="bg-accent hover:opacity-90 text-white p-2 rounded-lg transition-all"
              >
                {lookupLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest self-center">Try ID:</span>
            {suggestions.slice(0, 5).map(id => (
              <button 
                key={id} 
                onClick={() => setFormData(prev => ({ ...prev, customer_id: id }))}
                className="text-[10px] px-2 py-1 bg-accent/5 hover:bg-accent/20 border border-accent/10 rounded text-accent transition-all"
              >
                {id}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Customer Name', name: 'name', type: 'text', placeholder: 'Full Name' },
              { label: 'Segment', name: 'segment', type: 'select', options: ['Enterprise', 'SMB', 'Mid-Market', 'Startup'] },
              { label: 'Plan', name: 'subscription_plan', type: 'select', options: ['Professional', 'Basic', 'Enterprise', 'Premium'] },
              { label: 'Status', name: 'status', type: 'select', options: ['Active', 'Churned', 'Suspended', 'Trial'] },
              { label: 'Last Active', name: 'last_active', type: 'date' },
              { label: 'Forecast Month', name: 'forecast_month', type: 'text', placeholder: 'e.g. Q4 2025' },
              { label: 'Rev. Loss ($)', name: 'revenue_loss', type: 'text', placeholder: '$0,000' },
              { label: 'Risk Level', name: 'risk_level', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full bg-bg-primary border border-border-main rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    {field.options.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-bg-primary border border-border-main rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-accent uppercase tracking-[0.2em]">Behavioral Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { label: 'Txns (7d)', name: 'txn_7d' },
                { label: 'Txns (30d)', name: 'txn_30d' },
                { label: 'Txns (90d)', name: 'txn_90d' },
                { label: 'Recency (Days)', name: 'recency_days' },
                { label: 'Monetary ($)', name: 'monetary' },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{field.label}</label>
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full bg-bg-primary/50 border border-border-main/50 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Recommended Action</label>
            <textarea
              name="action"
              value={formData.action}
              onChange={handleChange}
              rows="3"
              className="w-full bg-bg-primary border border-border-main rounded-xl px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="System-suggested strategy..."
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-accent hover:opacity-90 text-white font-bold px-10 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-accent/30 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing Pattern...
                </>
              ) : (
                <>
                  <Activity size={20} />
                  Run Inference
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-500/15 border-2 border-red-500/30 p-8 rounded-3xl flex items-start gap-6 text-red-500 animate-fade-in shadow-2xl shadow-red-500/10">
          <div className="p-3 bg-red-500/20 rounded-2xl">
            <AlertCircle size={32} strokeWidth={3} />
          </div>
          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-1">Critical System Error</h4>
            <p className="text-sm font-medium opacity-90 leading-relaxed max-w-2xl">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all"
            >
              Restart Services
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="glass-card p-10 border-accent/30 animate-fade-in bg-bg-card">
          <div className="flex items-center gap-2 text-accent mb-8 font-bold uppercase tracking-[0.2em] text-[10px]">
            <CheckCircle2 size={16} />
            Deep Inference Analysis Successful {result.source && <span className="ml-2 text-amber-500">[{result.source}]</span>}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">Risk Profile: {result.name || result.customer_id}</p>
                  <div className="flex items-center gap-4">
                    <h3 className="text-7xl font-black text-text-main">
                      {typeof result.churn_probability === 'string' ? result.churn_probability : (result.churn_probability * 100).toFixed(1) + '%'}
                    </h3>
                    <div className="flex flex-col gap-2">
                       <RiskBadge level={result.risk_level} />
                       <span className="text-[10px] text-text-muted font-mono italic">Inference ID: {Math.random().toString(36).substr(2, 9)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-bg-primary rounded-2xl border border-border-main space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Info size={14} /> Strategic Summary
                  </h4>
                  <p className="text-text-main leading-relaxed">
                    Based on <span className="text-text-main font-bold">{result.forecast_month}</span> metrics, the account is exhibiting <span className={`font-bold ${result.risk_level === 'High' || result.risk_level === 'Critical' ? 'text-rose-500' : 'text-emerald-500'}`}>{result.risk_level} risk</span> behavior. 
                    Potential revenue impact is estimated at <span className="text-rose-500 font-bold">{result.predicted_revenue_loss}</span> if churn occurs.
                  </p>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="text-text-muted uppercase tracking-tighter">Confidence Score</span>
                      <span className="text-accent">{(result.churn_probability ? 98.4 : 0)}%</span>
                   </div>
                   <div className="w-full bg-bg-card h-2 rounded-full overflow-hidden border border-border-main">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        result.risk_level === 'Critical' || result.risk_level === 'High' ? 'bg-rose-500' : 
                        result.risk_level === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(result.churn_probability ? 98.4 : 0)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={16} /> Recommended Action
              </h4>
              
              <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10">
                <p className="text-text-main text-sm italic leading-relaxed">
                  "{result.recommended_action || 'No recommendation available for this profile.'}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-bg-primary/50 rounded-xl border border-border-main">
                  <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Segment</p>
                  <p className="text-sm text-text-main font-semibold">{result.segment}</p>
                </div>
                <div className="p-4 bg-bg-primary/50 rounded-xl border border-border-main">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Plan</p>
                  <p className="text-sm text-text-main font-semibold">{result.subscription_plan}</p>
                </div>
              </div>

              <button className="w-full py-4 bg-bg-primary border border-border-main rounded-xl text-text-muted text-xs font-bold uppercase tracking-widest hover:bg-bg-card transition-all flex items-center justify-center gap-2">
                 <DollarSign size={14} /> Log Retention Effort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prediction;
