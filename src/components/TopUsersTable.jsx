import React from 'react';
import { ExternalLink } from 'lucide-react';

const TopUsersTable = ({ data }) => {
    return (
        <div className="glass-card overflow-hidden transition-colors shadow-2xl">
            <div className="p-8 border-b border-border-main flex justify-between items-center">
                <h3 className="text-text-main font-semibold">Highest Churn Risk Users</h3>
                <button className="text-accent text-sm flex items-center gap-1 hover:underline">
                    View All <ExternalLink className="w-3 h-3" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-bg-primary/50">
                             <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Customer</th>
                             <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Churn Risk</th>
                             <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Monetary Value</th>
                             <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-border-main/50">
                          {(Array.isArray(data) ? data : []).map((user) => (
                              <tr key={user._id} className="hover:bg-bg-primary/50 transition-colors group">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex flex-col">
                                          <span className="text-text-main font-medium">{user.metadata?.name || 'Unknown'}</span>
                                          <span className="text-text-muted text-[10px] font-mono">{user.customer_id}</span>
                                      </div>
                                  </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                     <div className="flex items-center gap-3">
                                         <div className="w-24 bg-bg-primary rounded-full h-1.5 overflow-hidden">
                                             <div 
                                                 className="bg-red-500 h-full rounded-full" 
                                                 style={{ width: `${user.churn_score * 100}%` }}
                                             />
                                         </div>
                                         <span className="text-text-muted text-sm font-medium">
                                             {(user.churn_score * 100).toFixed(1)}%
                                         </span>
                                     </div>
                                 </td>
                                <td className="px-6 py-4 whitespace-nowrap text-text-main font-medium">
                                    ${user.metadata?.monetary?.toLocaleString() || '0'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        user.risk_level === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                        user.risk_level === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                        'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                    }`}>
                                        {user.risk_level}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopUsersTable;
