export async function getBalanceSheet() {
  const res = await fetch('https://my-json-server.typicode.com/Delegasi-Tech/data-dummy/laporan_neraca')
  return res.json()
}