import { useState } from 'react';
import { Star, CheckCircle2, X, Send } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(6); // Default 6 stars matching testimonial!
  const [evaluatorName, setEvaluatorName] = useState('');
  const [evaluatorRole, setEvaluatorRole] = useState('Dewan Juri');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="text-xs font-mono text-[#38BDF8] mb-1">Stand Up for Improvement Batch 5</div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Formulir Evaluasi &amp; Umpan Balik Inisiatif
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Berikan penilaian untuk Tim Business Analyst (Agung, Nina, Lisa)
              </p>
            </div>

            {/* Star rating selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Skor Penilaian (1 - 6 Bintang):
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-amber-300 ml-2">
                  {rating} Bintang {rating === 6 ? '(Exceptional!)' : ''}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nama Penilai / Rekan:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#289CD7]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Peran / Departemen:
                </label>
                <select
                  value={evaluatorRole}
                  onChange={(e) => setEvaluatorRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#289CD7]"
                >
                  <option value="Dewan Juri">Dewan Juri Stand Up</option>
                  <option value="Manajemen IT">Manajemen / VP IT</option>
                  <option value="Tim Operasional / Tax">Tim Operasional / Tax</option>
                  <option value="Human Capital">Human Capital</option>
                  <option value="Rekan Kerja">Rekan Kerja Ethos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Catatan Evaluasi / Masukan Konstruktif:
              </label>
              <textarea
                rows={3}
                placeholder="Inisiatif sangat baik memecah backlog IT, eksekusi tools cepat dan tepat sasaran..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#289CD7]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#289CD7] hover:bg-[#2083B6] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md border border-[#38BDF8]/30 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Kirimkan Penilaian &amp; Umpan Balik
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-white">Penilaian Berhasil Dikirimkan!</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Terima kasih atas apresiasi dan masukannya untuk Tim Business Analyst Ethos Group.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
