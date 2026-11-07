import React, { useState } from 'react';
import { Plus, CheckCircle2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlannerTask } from '../../types';

export const ProjectPlannerPage: React.FC = () => {
  const { planner, updatePlannerTasks, addToast } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<PlannerTask['category']>('Frontend');
  const [newTaskDueDate, setNewTaskDueDate] = useState('Nov 22');
  const [isAdding, setIsAdding] = useState(false);

  const completedCount = planner.tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = Math.round((completedCount / (planner.tasks.length || 1)) * 100);

  const handleToggleTaskStatus = (taskId: string) => {
    const updated = planner.tasks.map((t) => {
      if (t.id !== taskId) return t;
      const nextStatus: PlannerTask['status'] =
        t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'completed' : 'todo';
      return { ...t, status: nextStatus };
    });
    updatePlannerTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: PlannerTask = {
      id: `task_${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      status: 'todo',
      dueDate: newTaskDueDate,
    };

    updatePlannerTasks([...planner.tasks, task]);
    setNewTaskTitle('');
    setIsAdding(false);
    addToast('Task Created', `Added: "${task.title}"`, 'success');
  };

  const handleDeleteTask = (taskId: string) => {
    updatePlannerTasks(planner.tasks.filter((t) => t.id !== taskId));
    addToast('Task Removed', 'Task cleared from board.', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Sprint Project Planner</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Active milestone tasks for {planner.name}. Updates persist immediately to client state.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Sprint Task</span>
        </button>
      </div>

      {/* Progress Metric Card */}
      <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-white">Sprint Completion Velocity</span>
          <span className="font-mono text-amber-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-neutral-950 overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <span>{completedCount} of {planner.tasks.length} tasks completed</span>
          <span>Target: ReBuild '26 Round 2 Deadline</span>
        </div>
      </div>

      {/* Add Task Form */}
      {isAdding && (
        <form onSubmit={handleAddTask} className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">New Sprint Task</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">Task Title</label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. Test local export and import JSON features"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">Category</label>
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
              >
                <option value="Research">Research</option>
                <option value="Design">Design</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Pitch">Pitch</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">Due Date</label>
            <input
              type="text"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              placeholder="e.g. Nov 22"
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400"
            >
              Save Task
            </button>
          </div>
        </form>
      )}

      {/* Tasks List */}
      <div className="space-y-2.5">
        {planner.tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border transition-colors flex items-center justify-between gap-4 ${
              task.status === 'completed'
                ? 'bg-neutral-900/20 border-neutral-800/60 opacity-60'
                : 'bg-neutral-900/40 border-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => handleToggleTaskStatus(task.id)}
                className={`w-5 h-5 rounded flex items-center justify-center border transition-colors cursor-pointer shrink-0 ${
                  task.status === 'completed'
                    ? 'bg-amber-500 border-amber-500 text-neutral-950'
                    : task.status === 'in_progress'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                    : 'border-neutral-700 bg-neutral-950'
                }`}
                title="Click to toggle status (Todo -> In Progress -> Completed)"
              >
                {task.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {task.status === 'in_progress' && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />}
              </button>

              <div className="min-w-0">
                <p className={`text-xs font-medium truncate ${task.status === 'completed' ? 'line-through text-neutral-400' : 'text-neutral-100'}`}>
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-[11px] text-neutral-500 truncate">{task.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
              <span className="text-neutral-400 text-[11px] px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800/80">
                {task.category}
              </span>
              <span className="text-neutral-500 text-[11px]">Due {task.dueDate}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-neutral-600 hover:text-rose-400 p-1"
                title="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
