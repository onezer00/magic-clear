import React, { useState, useRef, useEffect } from "react";
import { FaTerminal, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const mockHistory = [
  { cmd: "ls", output: "Documents  Downloads  Music  Pictures  Videos" },
  { cmd: "df -h", output: "/dev/sda1  100G  65G  35G  66% /" },
  { cmd: "whoami", output: "usuario" },
];

export default function TerminalGeekPage() {
  const [history, setHistory] = useState(mockHistory);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHistory((prev) => [
      ...prev,
      { cmd: input, output: `Comando '${input}' executado (mock)` },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#18181b] to-[#23272f] p-8 gap-8">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-end mb-4">
          <Link to="/" className="w-48 flex items-center gap-2 justify-center px-4 py-2 rounded bg-[#00eaff] text-black font-bold shadow hover:bg-[#a259f7] transition">
            <FaArrowLeft /> Voltar
          </Link>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <FaTerminal className="text-4xl text-[#00ff85]" />
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] via-[#a259f7] to-[#00ff85] drop-shadow-lg">
            Terminal Geek
          </h1>
        </div>
        <div ref={terminalRef} className="w-full bg-[#18181b] rounded-lg border-2 border-[#00ff85] shadow-lg p-4 h-96 overflow-y-auto font-mono text-[#00ff85] mb-4">
          {history.map((item, idx) => (
            <div key={idx}>
              <span className="text-[#00eaff]">$ {item.cmd}</span>
              <div className="ml-4 text-[#a259f7] whitespace-pre-line">{item.output}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleCommand} className="w-full flex gap-2">
          <input
            className="flex-1 px-4 py-2 rounded bg-[#23272f] text-[#00ff85] border border-[#00eaff] focus:outline-none focus:ring-2 focus:ring-[#00eaff] font-mono"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite um comando..."
            autoFocus
          />
          <button type="submit" className="px-6 py-2 rounded bg-[#00ff85] text-black font-bold hover:bg-[#00eaff] transition">
            Executar
          </button>
        </form>
      </div>
    </div>
  );
} 