export async function getDiskUsage() {
  // Simula chamada à API
  return Promise.resolve({
    total: 1000,
    used: 650,
    free: 350,
  });
}

export async function getBiggestFiles() {
  // Simula chamada à API
  return Promise.resolve([
    { name: "video.mp4", size: 250 },
    { name: "backup.zip", size: 180 },
    { name: "game.iso", size: 120 },
  ]);
} 