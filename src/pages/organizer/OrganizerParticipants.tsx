import React, { useState } from 'react';
import { Search, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_HACKMATE_PROFILES } from '../../services/seedData';

export const OrganizerParticipants: React.FC = () => {
  const { currentUser, addToast } = useApp();
  const [query, setQuery] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('All');

  // Combined participant list (current student + demonstration profiles)
  const allParticipants = [currentUser, ...SEED_HACKMATE_PROFILES];

  const colleges = ['All', 'National Institute of Technology, Trichy', 'IIT Bombay', 'BITS Pilani, Goa Campus', 'IIIT Hyderabad', 'Delhi Technological University'];

  const filtered = allParticipants.filter((p) => {
    const matchCollege = collegeFilter === 'All' || p.college === collegeFilter;
    const matchQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.email.toLowerCase().includes(query.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    return matchCollege && matchQuery;
  });

  const exportCSV = () => {
    const headers = 'ID,Name,Email,College,Course,Year,Skills\n';
    const rows = filtered
      .map(
        (p) =>
          `"${p.studentIdNumber}","${p.name}","${p.email}","${p.college}","${p.course}","${p.yearOfStudy}","${p.skills.join('; ')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campuscode-participants-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('CSV Exported', 'Participant roster saved to CSV.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Participant Roster Management</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Active collegiate participants registered across ReBuild '26 and sister sprints.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Export Roster CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by student name, email, or skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Institution:</span>
          <select
            value={collegeFilter}
            onChange={(e) => setCollegeFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700 max-w-[200px]"
          >
            {colleges.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/80 border-b border-neutral-800 font-mono text-neutral-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Student Name & ID</th>
                <th className="py-3 px-4">Institution & Major</th>
                <th className="py-3 px-4">Verified Skills</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatarUrl || '/src/assets/images/student_innovator_portrait_1794026124336.jpg'}
                        alt={student.name}
                        className="w-8 h-8 rounded-lg object-cover border border-amber-500/30"
                      />
                      <div>
                        <span className="font-semibold text-white block">{student.name}</span>
                        <span className="text-[10px] font-mono text-amber-400">{student.studentIdNumber}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-neutral-200 block truncate max-w-[240px]">{student.college}</span>
                    <span className="text-[11px] text-neutral-400 block">{student.course} · {student.yearOfStudy}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {student.skills.slice(0, 4).map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
