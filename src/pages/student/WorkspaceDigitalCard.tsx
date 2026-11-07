import React, { useState } from 'react';
import { QrCode, ShieldCheck, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartImage } from '../../components/common/SmartImage';

export const WorkspaceDigitalCard: React.FC = () => {
  const { currentUser, addToast } = useApp();
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(`https://campuscode.dev/verify/${currentUser.studentIdNumber}`);
    setCopied(true);
    addToast('Verification URL Copied', 'ID verification link copied to clipboard.', 'info');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight">Digital Student Card</h1>
        <p className="text-xs text-neutral-400">
          Your official digital identity passport across CampusCode events and collegiate hackathon check-ins.
        </p>
      </div>

      {/* Card Presentation Container */}
      <div className="flex flex-col items-center justify-center py-6">
        <div
          onClick={() => setFlipped(!flipped)}
          className="w-full max-w-md h-64 sm:h-72 rounded-2xl p-6 sm:p-7 relative cursor-pointer select-none transition-all duration-500 transform hover:scale-[1.02] shadow-2xl overflow-hidden border border-amber-500/40 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900"
          style={{
            boxShadow: '0 20px 50px rgba(245, 158, 11, 0.08)',
          }}
        >
          {/* Subtle gold metallic shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {!flipped ? (
            /* Front of Card */
            <div className="h-full flex flex-col justify-between relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs tracking-wider">
                    <span className="w-2 h-2 bg-amber-400 rounded-sm" />
                    <span>CAMPUSCODE PASSPORT</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                    STUDENT INNOVATOR IDENTITY
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-neutral-200">
                    {currentUser.studentIdNumber}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 justify-end mt-0.5 font-mono">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 my-auto">
                <SmartImage
                  src={currentUser.avatarUrl || '/images/student_innovator_portrait_1794026124336.jpg'}
                  alt={currentUser.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-amber-500/60 shadow-md shrink-0"
                />
                <div className="space-y-0.5 min-w-0">
                  <h2 className="text-base sm:text-lg font-extrabold text-white truncate">
                    {currentUser.name}
                  </h2>
                  <p className="text-xs text-amber-300 font-medium truncate">
                    {currentUser.course}
                  </p>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {currentUser.college}
                  </p>
                  <p className="text-[10px] text-neutral-500 font-mono">
                    {currentUser.yearOfStudy}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between pt-2 border-t border-neutral-800/80 text-[10px] text-neutral-500 font-mono">
                <div>
                  <span className="block text-neutral-400">ISSUED BY</span>
                  <span>CAMPUSCODE CONSORTIUM</span>
                </div>
                <div className="text-right text-amber-400">
                  <span>CLICK TO REVEAL QR PASS</span>
                </div>
              </div>
            </div>
          ) : (
            /* Back of Card */
            <div className="h-full flex flex-col justify-between items-center text-center relative z-10 py-1">
              <div className="w-full flex items-center justify-between text-[11px] text-neutral-400 font-mono border-b border-neutral-800 pb-2">
                <span>ON-SITE BADGE CHECK-IN</span>
                <span className="text-amber-400">REBUILD '26</span>
              </div>

              {/* QR Code Graphic */}
              <div className="p-3 rounded-xl bg-white text-neutral-950 flex flex-col items-center justify-center shadow-lg my-auto">
                <QrCode className="w-20 h-20 text-neutral-950" />
                <span className="text-[9px] font-mono font-bold tracking-tight mt-1 text-neutral-800">
                  {currentUser.studentIdNumber}
                </span>
              </div>

              <div className="text-[10px] text-neutral-500 font-mono">
                <span>Cryptographically signed client demonstration token · Click to flip</span>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-neutral-500 mt-3">
          Click the card above to toggle between credential details and QR scan code.
        </p>
      </div>

      {/* Verification Details */}
      <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
          Passport Cryptographic Properties
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
            <span className="text-neutral-500 block text-[10px] uppercase">Card Identifier</span>
            <span className="text-amber-400 font-bold">{currentUser.studentIdNumber}</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
            <span className="text-neutral-500 block text-[10px] uppercase">Issuer Entity</span>
            <span className="text-neutral-200">ReBuild Consortium 2026</span>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={handleShare}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Verification Link Copied!' : 'Copy Verification Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
