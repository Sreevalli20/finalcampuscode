import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';

export const WorkspaceNotifications: React.FC = () => {
  const { notifications, markNotificationAsRead, clearNotifications } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const markAllRead = () => {
    notifications.forEach((n) => markNotificationAsRead(n.id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Notification Center</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time milestone alerts, team invitations, submission audits, and system updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={clearNotifications}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
            filter === 'all' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
            filter === 'unread' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bell className="w-6 h-6" />}
          title="All Caught Up"
          description="You have no notifications in this view."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-4 rounded-xl border transition-colors flex items-start justify-between gap-4 cursor-pointer ${
                item.read
                  ? 'bg-neutral-900/30 border-neutral-800/80 text-neutral-400'
                  : 'bg-neutral-900/70 border-amber-500/30 text-neutral-100 shadow-sm'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                      item.type === 'deadline'
                        ? 'bg-rose-500/10 text-rose-400'
                        : item.type === 'team'
                        ? 'bg-sky-500/10 text-sky-400'
                        : item.type === 'result'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-neutral-500 text-[11px] font-mono">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </div>

                <h3 className="text-xs font-semibold text-neutral-100">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.message}</p>
              </div>

              {item.actionUrl && (
                <Link
                  to={item.actionUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 shrink-0"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
