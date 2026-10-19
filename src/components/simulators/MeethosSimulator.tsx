import { useState } from 'react';
import { Calendar, Users, Clock, AlertCircle, CheckCircle2, ChevronRight, Building2 } from 'lucide-react';

interface RoomSlot {
  name: string;
  floor: string;
  capacity: string;
  hoursUsed: number;
  occupancyPercent: number;
  currentStatus: 'Tersedia' | 'Sedang Digunakan' | 'Reservasi 14:00';
}

const ROOMS: RoomSlot[] = [
  { name: "Ballroom", floor: "Lantai 3", capacity: "50-100 Orang", hoursUsed: 225, occupancyPercent: 100, currentStatus: "Sedang Digunakan" },
  { name: "Meeting Room A", floor: "Lantai 3", capacity: "12-16 Orang", hoursUsed: 123, occupancyPercent: 62.1, currentStatus: "Reservasi 14:00" },
  { name: "Meeting Room C", floor: "Lantai 2", capacity: "8-10 Orang", hoursUsed: 110, occupancyPercent: 55.6, currentStatus: "Tersedia" },
  { name: "Focus Room 1", floor: "Lantai 2", capacity: "4-6 Orang", hoursUsed: 84, occupancyPercent: 42.0, currentStatus: "Tersedia" }
];

const DIVISION_DISTRIBUTION = [
  { rank: "#1", name: "HUMAN CAPITAL OPERATION AND GENERAL AFFAIRS", sessions: 33, hours: 115, share: "16.3%" },
  { rank: "#2", name: "INFORMATION TECHNOLOGY", sessions: 31, hours: 64, share: "15.3%" },
  { rank: "#3", name: "HUMAN CAPITAL STRATEGY", sessions: 29, hours: 141, share: "14.3%" },
  { rank: "#4", name: "CORPORATE SECRETARY", sessions: 13, hours: 49, share: "6.4%" },
  { rank: "#5", name: "ONLINE SALES", sessions: 12, hours: 26, share: "5.9%" }
];

export function MeethosSimulator() {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[2].name);
  const [bookedNotice, setBookedNotice] = useState<string | null>(null);

  const handleQuickBook = (roomName: string) => {
    setSelectedRoom(roomName);
    setBookedNotice(`Slot ${roomName} berhasil dijadwalkan secara real-time di sistem Meethos.`);
    setTimeout(() => setBookedNotice(null), 3500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-white">
            Meethos Admin Panel · booking.ethos.co.id
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Pemantauan performa ruangan, jam sibuk, dan analitik divisi
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Periode:</span>
          <span className="px-2 py-0.5 bg-slate-800 text-white rounded font-mono">Tahun Ini (2026)</span>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-800 bg-slate-950/70 border-b border-slate-800">
        <div className="p-4">
          <div className="text-xs text-slate-400">Total Reservasi</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">203</div>
          <div className="text-xs text-slate-500 mt-0.5">161 aktif · 7 ruangan terpakai</div>
        </div>

        <div className="p-4">
          <div className="text-xs text-slate-400">Total Jam Rapat</div>
          <div className="text-2xl font-bold text-blue-400 font-mono mt-1">672 <span className="text-xs font-normal text-slate-400">jam</span></div>
          <div className="text-xs text-slate-500 mt-0.5">Rata-rata durasi: 4.2 jam/rapat</div>
        </div>

        <div className="p-4">
          <div className="text-xs text-slate-400">Total Partisipasi</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">1.493 <span className="text-xs font-normal text-slate-400">orang</span></div>
          <div className="text-xs text-slate-500 mt-0.5">Rata-rata 7 orang per sesi</div>
        </div>

        <div className="p-4">
          <div className="text-xs text-slate-400">Tingkat Pembatalan</div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">20.2%</div>
          <div className="text-xs text-slate-500 mt-0.5">41 batal · Pengingat otomatis aktif</div>
        </div>
      </div>

      {/* Two columns: Division distribution & Room Occupancy */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Division Distribution */}
        <div className="lg:col-span-6 bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Distribusi Pemakaian per Divisi
            </h4>
            <span className="text-xs text-slate-500">15 Divisi Terlayani</span>
          </div>

          <div className="space-y-3">
            {DIVISION_DISTRIBUTION.map((div, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="font-mono text-slate-400 font-bold text-[11px]">{div.rank}</span>
                    <span className="truncate max-w-[220px] sm:max-w-xs">{div.name}</span>
                  </div>
                  <div className="font-mono text-right text-slate-400">
                    <span className="text-white font-medium">{div.sessions} sesi</span> ({div.hours} jam) · <span className="text-blue-400 font-semibold">{div.share}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${parseFloat(div.share) * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Room Occupancy & Quick Booking */}
        <div className="lg:col-span-6 bg-slate-950/50 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Tingkat Okupansi Ruangan
              </h4>
              <span className="text-xs text-slate-500">Fokus Utilisasi &amp; Kapasitas</span>
            </div>

            <div className="space-y-3 mb-4">
              {ROOMS.map((room, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRoom(room.name)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    selectedRoom === room.name
                      ? 'bg-slate-800/80 border-blue-500/50 ring-1 ring-blue-500/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{room.name}</span>
                      <span className="text-slate-400">({room.floor})</span>
                    </div>
                    <div className="font-mono text-slate-300">
                      <span>{room.hoursUsed} jam</span> ·{' '}
                      <span className="text-emerald-400 font-bold">{room.occupancyPercent}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full ${
                        room.occupancyPercent >= 90
                          ? 'bg-amber-500'
                          : room.occupancyPercent >= 60
                          ? 'bg-emerald-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${room.occupancyPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Kapasitas: {room.capacity}</span>
                    <span
                      className={
                        room.currentStatus === 'Tersedia'
                          ? 'text-emerald-400'
                          : room.currentStatus === 'Sedang Digunakan'
                          ? 'text-amber-400'
                          : 'text-blue-400'
                      }
                    >
                      {room.currentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {bookedNotice ? (
              <div className="p-2.5 bg-emerald-950/70 border border-emerald-800/60 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{bookedNotice}</span>
              </div>
            ) : (
              <button
                onClick={() => handleQuickBook(selectedRoom)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                Simulasikan Reservasi Cepat: {selectedRoom}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div>
          Sebelumnya: Jadwal ruang rapat sering bentrok &amp; koordinasi manual melalui chat menyita waktu.
        </div>
        <div className="text-indigo-400 font-medium">
          Solusi: Sistem mandiri booking.ethos.co.id selesai dalam 3 hari kerja oleh BA.
        </div>
      </div>
    </div>
  );
}
