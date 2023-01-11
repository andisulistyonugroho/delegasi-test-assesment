export async function getProfitLoss() {
  const res = await fetch('https://my-json-server.typicode.com/Delegasi-Tech/data-dummy/laporan_laba_rugi')
  return res
}