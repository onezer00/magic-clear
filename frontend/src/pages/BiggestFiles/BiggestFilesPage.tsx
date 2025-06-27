import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function randomDateTime() {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date(2024, 6, 1).getTime();
  const date = new Date(start + Math.random() * (end - start));
  return {
    date: date.toLocaleDateString('pt-BR'),
    time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  };
}

const mockFiles = Array.from({ length: 20 }, (_, i) => {
  const dt = randomDateTime();
  return {
    name: `file${i + 1}.mp4`,
    size: Math.floor(Math.random() * 500) + 50, // 50 a 550 GB
    date: dt.date,
    time: dt.time,
    path: `C:/Users/Usuario/Videos/file${i + 1}.mp4`,
  };
});

type OrderBy = "name" | "size" | "date";

export default function BiggestFilesPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>("size");
  const [orderAsc, setOrderAsc] = useState(false);

  const sortedFiles = [...mockFiles].sort((a, b) => {
    if (orderBy === "name") return orderAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    if (orderBy === "date") return orderAsc ? (a.date + a.time).localeCompare(b.date + b.time) : (b.date + b.time).localeCompare(a.date + a.time);
    if (orderBy === "size") return orderAsc ? a.size - b.size : b.size - a.size;
    return 0;
  });

  const toggleSelect = (idx: number) => {
    setSelected((prev) => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };
  const toggleSelectAll = () => {
    setSelected(selected.length === sortedFiles.length ? [] : sortedFiles.map((_, idx) => idx));
  };
  const handleDeleteSelected = () => {
    alert(`Arquivos selecionados para exclusão: ${selected.length}`);
  };
  const handleOrder = (col: OrderBy) => {
    if (orderBy === col) setOrderAsc(!orderAsc);
    else { setOrderBy(col); setOrderAsc(false); }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#18181b] to-[#23272f] p-8 gap-8">
      {/* Coluna da tabela */}
      <div className="flex-1 bg-[#23272f] rounded-xl shadow-2xl border-2 border-[#a259f7] p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] via-[#a259f7] to-[#00ff85] drop-shadow-lg">
            Maiores Arquivos
          </h1>
          <button
            className={`px-4 py-2 rounded bg-[#ff3b3b] text-white font-bold hover:bg-[#ff5e5e] transition disabled:opacity-50`}
            disabled={selected.length === 0}
            onClick={handleDeleteSelected}
          >
            Excluir Selecionados
          </button>
        </div>
        <table className="w-full text-left text-gray-200">
          <thead>
            <tr className="border-b border-[#a259f7]">
              <th className="py-2 px-2">
                <input type="checkbox" checked={selected.length === sortedFiles.length} onChange={toggleSelectAll} />
              </th>
              <th className="py-2 px-4 cursor-pointer" onClick={() => handleOrder("name")}>Nome {orderBy === "name" && (orderAsc ? "▲" : "▼")}</th>
              <th className="py-2 px-4 cursor-pointer" onClick={() => handleOrder("date")}>Data/Hora {orderBy === "date" && (orderAsc ? "▲" : "▼")}</th>
              <th className="py-2 px-4 cursor-pointer" onClick={() => handleOrder("size")}>Tamanho {orderBy === "size" && (orderAsc ? "▲" : "▼")}</th>
              <th className="py-2 px-4">Path</th>
              <th className="py-2 px-4">Ação</th>
            </tr>
          </thead>
          <tbody>
            {sortedFiles.map((file, idx) => (
              <tr key={idx} className="hover:bg-[#2a2e39] transition">
                <td className="py-2 px-2">
                  <input type="checkbox" checked={selected.includes(idx)} onChange={() => toggleSelect(idx)} />
                </td>
                <td className="py-2 px-4 font-semibold">{file.name}</td>
                <td className="py-2 px-4">{file.date} {file.time}</td>
                <td className="py-2 px-4">{file.size} GB</td>
                <td className="py-2 px-4 text-xs break-all">{file.path}</td>
                <td className="py-2 px-4">
                  <button className="px-4 py-1 rounded bg-[#ff3b3b] text-white font-bold hover:bg-[#ff5e5e] transition">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Coluna do menu lateral */}
      <div className="w-80 flex flex-col gap-6">
        <div className="mb-2">
          <Link to="/" className="w-full flex items-center gap-2 justify-center px-4 py-2 rounded bg-[#00eaff] text-black font-bold shadow hover:bg-[#a259f7] transition">
            <FaArrowLeft /> Voltar
          </Link>
        </div>
        <div className="bg-[#23272f] rounded-xl p-6 border-2 border-[#00eaff] shadow-lg">
          <h2 className="text-lg font-bold text-[#00eaff] mb-2">Organizar por Tipo</h2>
          <input className="w-full mb-2 p-2 rounded bg-[#18181b] text-white" placeholder="Path destino" />
          <select className="w-full mb-2 p-2 rounded bg-[#18181b] text-white">
            <option>.jpg</option>
            <option>.mp4</option>
            <option>.pdf</option>
            <option>.zip</option>
          </select>
          <button className="w-full px-4 py-2 rounded bg-[#00eaff] text-black font-bold hover:bg-[#00ff85] transition">Organizar</button>
        </div>
        <div className="bg-[#23272f] rounded-xl p-6 border-2 border-[#a259f7] shadow-lg">
          <h2 className="text-lg font-bold text-[#a259f7] mb-2">Limpar Temporários</h2>
          <button className="w-full px-4 py-2 rounded bg-[#a259f7] text-white font-bold hover:bg-[#00eaff] transition">Limpar</button>
        </div>
        <div className="bg-[#23272f] rounded-xl p-6 border-2 border-[#00ff85] shadow-lg">
          <h2 className="text-lg font-bold text-[#00ff85] mb-2">Encontrar Duplicados</h2>
          <button className="w-full px-4 py-2 rounded bg-[#00ff85] text-black font-bold hover:bg-[#a259f7] transition">Buscar</button>
        </div>
      </div>
    </div>
  );
} 