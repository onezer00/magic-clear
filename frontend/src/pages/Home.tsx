import { FaHdd, FaFolderOpen, FaTerminal } from "react-icons/fa";
import { useDiskStore } from "../store/diskStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import './Home.css'

export default function Home() {
  const { usage, bigFiles, fetchDiskData } = useDiskStore();

  useEffect(() => {
    fetchDiskData();
  }, [fetchDiskData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#23272f] flex flex-col justify-center items-center w-full">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] via-[#a259f7] to-[#00ff85] drop-shadow-lg mb-8">
        Magic Clear
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl text-center">
        O organizador de disco definitivo para entusiastas de TI. Visualize, organize e limpe seu HD com poder e estilo!
      </p>
      <div className="w-full flex gap-8 mb-12 px-4">
        <div className="flex-1 bg-[#23272f] rounded-xl p-8 shadow-2xl border-2 border-[#00eaff] glow flex flex-col items-center h-80">
          <FaHdd className="text-5xl mb-4 text-[#00eaff]" />
          <h2 className="text-2xl font-bold text-white mb-2">Uso do Disco</h2>
          {usage && (
            <div className="mt-4 text-gray-300">
              <div>Total: {usage.total} GB</div>
              <div>Usado: {usage.used} GB</div>
              <div>Livre: {usage.free} GB</div>
            </div>
          )}
        </div>
        <Link to="/maiores-arquivos" className="flex-1">
          <div className="bg-[#23272f] rounded-xl p-8 shadow-2xl border-2 border-[#a259f7] glow flex flex-col items-center cursor-pointer transition hover:scale-105 hover:shadow-[0_0_32px_8px_#a259f7] h-80">
            <FaFolderOpen className="text-5xl mb-4 text-[#a259f7]" />
            <h2 className="text-2xl font-bold text-white mb-2">Maiores Arquivos</h2>
            <ul className="text-gray-300">
              {bigFiles.map((file, idx) => (
                <li key={idx} className="flex justify-between w-48">
                  <span>{file.name}</span>
                  <span>{file.size} GB</span>
                </li>
              ))}
            </ul>
          </div>
        </Link>
        <Link to="/terminal-geek" className="flex-1">
          <div className="bg-[#23272f] rounded-xl p-8 shadow-2xl border-2 border-[#00ff85] glow flex flex-col items-center cursor-pointer transition hover:scale-105 hover:shadow-[0_0_32px_8px_#00ff85] h-80">
            <FaTerminal className="text-5xl mb-4 text-[#00ff85]" />
            <h2 className="text-2xl font-bold text-white mb-2">Terminal Geek</h2>
            <ul className="text-gray-300">
              <li className="flex justify-between w-48">
                <span>ls -la</span>
                <span className="text-[#00ff85]">✓</span>
              </li>
              <li className="flex justify-between w-48">
                <span>df -h</span>
                <span className="text-[#00ff85]">✓</span>
              </li>
              <li className="flex justify-between w-48">
                <span>du -sh *</span>
                <span className="text-[#00ff85]">✓</span>
              </li>
              <li className="flex justify-between w-48">
                <span>find . -size +100M</span>
                <span className="text-[#00ff85]">✓</span>
              </li>
            </ul>
          </div>
        </Link>
      </div>
      <style>{`
        .glow {
          box-shadow: 0 0 16px 2px #00eaff, 0 0 32px 4px #a259f7;
        }
      `}</style>
    </div>
  );
} 