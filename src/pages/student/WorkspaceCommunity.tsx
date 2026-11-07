import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Send,
  Plus,
  Trash2,
  Tag,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkspaceCommunity: React.FC = () => {
  const { discussions, addDiscussionPost, upvoteDiscussionPost, addDiscussionComment, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Ideas' | 'Teammates' | 'Technical'>('All');
  const [search, setSearch] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Ideas' | 'Teammates' | 'Technical'>('Technical');
  const [tagsInput, setTagsInput] = useState('');

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addDiscussionPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorCollege: currentUser.college,
      authorRole: currentUser.headline || 'Student Builder',
      title,
      content,
      category,
      tags: tags.length > 0 ? tags : ['Innovation'],
    });

    setTitle('');
    setContent('');
    setTagsInput('');
    setIsPosting(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    addDiscussionComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const filteredPosts = discussions.filter((p) => {
    const matchCategory = activeTab === 'All' || p.category === activeTab;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Student Community Feed</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Share technical findings, announce squad openings, and review architecture questions with peers.
          </p>
        </div>

        <button
          onClick={() => setIsPosting(!isPosting)}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Discussion Post</span>
        </button>
      </div>

      {/* New Post Editor Card */}
      {isPosting && (
        <form onSubmit={handleCreatePost} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Create Community Post</h3>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Best practices for client-side state in hackathons"
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
              >
                <option value="Technical">Technical & Architecture</option>
                <option value="Ideas">Pitching & Ideas</option>
                <option value="Teammates">Teammate Search</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="React, State, Offline"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Content</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Elaborate on your question or discovery..."
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
            >
              Publish Post
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800 overflow-x-auto">
          {(['All', 'Technical', 'Ideas', 'Teammates'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                activeTab === tab ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-white">{post.authorName}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-400">{post.authorCollege}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-amber-400 font-mono text-[11px] font-semibold">{post.category}</span>
                </div>
                <h3 className="text-base font-bold text-white pt-0.5">{post.title}</h3>
              </div>
              <span className="text-neutral-500 text-[11px] font-mono shrink-0">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">{post.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-400"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Post actions: Upvote & Comments */}
            <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs">
              <button
                onClick={() => upvoteDiscussionPost(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  post.hasUpvoted
                    ? 'bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.upvotes} Upvotes</span>
              </button>

              <span className="text-neutral-500 font-mono text-[11px]">
                {post.comments.length} Reply{post.comments.length === 1 ? '' : 'ies'}
              </span>
            </div>

            {/* Existing Comments */}
            {post.comments.length > 0 && (
              <div className="pt-2 space-y-2 border-t border-neutral-800/40">
                {post.comments.map((comm) => (
                  <div key={comm.id} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/60 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-neutral-300">{comm.authorName}</span>
                      <span className="text-neutral-500 font-mono">
                        {new Date(comm.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{comm.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Write a reply..."
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddComment(post.id);
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              />
              <button
                type="button"
                onClick={() => handleAddComment(post.id)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
