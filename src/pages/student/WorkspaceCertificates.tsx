import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Award, Download, Printer, ExternalLink, ShieldCheck, CheckCircle2, Eye, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Certificate } from '../../types';
import { Modal } from '../../components/common/Modal';

export const WorkspaceCertificates: React.FC = () => {
  const { certificates, currentUser, addToast } = useApp();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const generatePDF = (cert: Certificate) => {
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Background
      doc.setFillColor(15, 15, 15);
      doc.rect(0, 0, 297, 210, 'F');

      // Outer Gold / Amber Border
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(1.5);
      doc.rect(12, 12, 273, 186);

      // Inner Fine Border
      doc.setDrawColor(60, 60, 60);
      doc.setLineWidth(0.4);
      doc.rect(15, 15, 267, 180);

      // Header Brand
      doc.setTextColor(245, 158, 11);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('CAMPUSCODE INNOVATION ECOSYSTEM', 148.5, 30, { align: 'center' });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(26);
      doc.text('CERTIFICATE OF ACHIEVEMENT', 148.5, 45, { align: 'center' });

      doc.setTextColor(160, 160, 160);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text('This is to certify that collegiate innovator', 148.5, 58, { align: 'center' });

      // Student Name
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.text(cert.studentName.toUpperCase(), 148.5, 75, { align: 'center' });

      // College
      doc.setTextColor(200, 200, 200);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(cert.collegeName, 148.5, 85, { align: 'center' });

      // Recognition Statement
      doc.setTextColor(160, 160, 160);
      doc.setFontSize(11);
      doc.text('has successfully demonstrated distinguished technical ingenuity and achieved', 148.5, 98, { align: 'center' });

      // Achievement Title
      doc.setTextColor(245, 158, 11);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(cert.achievement.toUpperCase(), 148.5, 112, { align: 'center' });

      // Event Name
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.text(`at ${cert.eventName}`, 148.5, 124, { align: 'center' });

      // Metadata / Signature area
      doc.setDrawColor(50, 50, 50);
      doc.setLineWidth(0.5);
      doc.line(40, 165, 105, 165);
      doc.line(192, 165, 257, 165);

      // Signatures
      doc.setTextColor(220, 220, 220);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(cert.signatureName, 72.5, 172, { align: 'center' });
      doc.text('REBUILD JURY COUNCIL', 224.5, 172, { align: 'center' });

      doc.setTextColor(140, 140, 140);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(cert.signatureRole, 72.5, 177, { align: 'center' });
      doc.text(`Issued: ${cert.issueDate}`, 224.5, 177, { align: 'center' });

      // Verification Hash & Demonstration Notice
      doc.setFont('courier', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.text(`Verification ID: ${cert.certificateNumber}  |  SHA256: ${cert.verificationHash.substring(0, 32)}...`, 148.5, 188, { align: 'center' });
      doc.text('Authentic Client-Side Demonstration Credential · ReBuild 26 Hackathon Edition', 148.5, 193, { align: 'center' });

      doc.save(`${cert.certificateNumber}.pdf`);
      addToast('Certificate Exported', `Saved ${cert.certificateNumber}.pdf successfully!`, 'success');
    } catch (e) {
      console.error(e);
      addToast('Download Error', 'Could not generate certificate PDF.', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Verified Certificates</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Peer-reviewed and competition credentials earned across CampusCode hackathons. Export as signed client-side PDFs.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Client Verifiable Cryptographic Hashes</span>
        </div>
      </div>

      {/* Gallery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/60 to-neutral-950 hover:border-amber-500/30 transition-all space-y-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  {cert.certificateNumber}
                </span>
                <h3 className="text-base font-bold text-white">{cert.eventName}</h3>
                <p className="text-xs font-semibold text-amber-300">{cert.achievement}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Recipient:</span>
                <span className="font-semibold text-neutral-200">{cert.studentName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Institution:</span>
                <span className="text-neutral-300 truncate max-w-[200px]">{cert.collegeName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Issue Date:</span>
                <span className="text-neutral-300 font-mono">{cert.issueDate}</span>
              </div>
              <div className="pt-1 border-t border-neutral-900 flex items-center justify-between font-mono text-[10px] text-neutral-500 truncate">
                <span>Hash:</span>
                <span className="truncate max-w-[240px] text-neutral-400">{cert.verificationHash}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Certificate</span>
              </button>
              <button
                onClick={() => generatePDF(cert)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title="Certificate of Achievement Preview"
          subtitle={selectedCert.certificateNumber}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Visual Certificate Frame */}
            <div className="p-8 rounded-xl bg-neutral-950 border-2 border-amber-500/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-2 left-2 text-[9px] font-mono text-neutral-600">CAMPUSCODE CERT-ID: {selectedCert.certificateNumber}</div>
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-widest block font-bold">
                CampusCode Student Innovation Ecosystem
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                CERTIFICATE OF ACHIEVEMENT
              </h2>
              <p className="text-xs text-neutral-400">This certifies that collegiate innovator</p>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight border-b border-neutral-800 pb-2 max-w-sm mx-auto">
                {selectedCert.studentName}
              </h3>
              <p className="text-xs text-neutral-300">{selectedCert.collegeName}</p>
              <p className="text-xs text-neutral-400">has been recognized as</p>
              <p className="text-base font-extrabold text-amber-400 font-mono tracking-wide">
                {selectedCert.achievement}
              </p>
              <p className="text-xs text-neutral-200">at {selectedCert.eventName}</p>

              <div className="pt-6 grid grid-cols-2 gap-4 border-t border-neutral-800/80 text-xs">
                <div>
                  <p className="font-semibold text-white">{selectedCert.signatureName}</p>
                  <p className="text-[10px] text-neutral-400">{selectedCert.signatureRole}</p>
                </div>
                <div>
                  <p className="font-semibold text-white font-mono">{selectedCert.issueDate}</p>
                  <p className="text-[10px] text-neutral-400">Date of Official Record</p>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-neutral-600 font-mono truncate">
                SHA256: {selectedCert.verificationHash}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
              <strong className="text-neutral-300">Demonstration Notice:</strong> Locally generated certificate records are intended for project portfolio presentation during Round 2 of ReBuild '26.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-200 hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => {
                  generatePDF(selectedCert);
                }}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
