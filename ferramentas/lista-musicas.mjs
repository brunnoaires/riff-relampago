// Gera musicas/lista.json com as músicas da pasta musicas/ (pacotes .sng ou pastas com notes.chart / notes.mid e o áudio).
// Roda sozinho no GitHub quando alguém sobe arquivos nessa pasta. Para rodar à mão: node ferramentas/lista-musicas.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'musicas');
const isChart = n => /\.(chart|mid|midi)$/i.test(n);
const isStem = n => /\.(ogg|opus|mp3|wav|m4a|flac|aac|webm)$/i.test(n) && !/^(preview|crowd|video|background)\b/i.test(n);

function parseIni(txt) {
  const o = {};
  for (const l of txt.split(/\r?\n/)) { const m = l.match(/^\s*(\w+)\s*=\s*(.*?)\s*$/); if (m) o[m[1].toLowerCase()] = m[2]; }
  return o;
}
// lê só os metadados do cabeçalho de um .sng (formato SNGPKG)
function sngMeta(file) {
  const fd = fs.openSync(file, 'r');
  try {
    const head = Buffer.alloc(34); fs.readSync(fd, head, 0, 34, 0);
    if (head.toString('latin1', 0, 6) !== 'SNGPKG') return null;
    const len = Number(head.readBigUInt64LE(26));
    if (len > 1 << 20) return null;
    const buf = Buffer.alloc(len); fs.readSync(fd, buf, 0, len, 34);
    const count = Number(buf.readBigUInt64LE(0)), o = {};
    let q = 8;
    for (let i = 0; i < count && q + 4 <= len; i++) {
      const kl = buf.readInt32LE(q); q += 4; const k = buf.toString('utf8', q, q + kl); q += kl;
      const vl = buf.readInt32LE(q); q += 4; const v = buf.toString('utf8', q, q + vl); q += vl;
      o[k.toLowerCase()] = v;
    }
    return o;
  } finally { fs.closeSync(fd); }
}
const entry = (caminho, info, extra) => Object.assign({
  caminho,
  nome: String(info.name || path.basename(caminho).replace(/\.sng$/i, '')).trim(),
  artista: String(info.artist || '').trim(),
  charter: String(info.charter || info.frets || '').replace(/<[^>]*>/g, '').trim(),
  duracao: Math.round((+info.song_length || 0) / 1000) || undefined,
}, extra);

const out = [];
function walk(dir, rel, depth) {
  const ents = fs.readdirSync(dir, { withFileTypes: true }).filter(e => !e.name.startsWith('.'));
  const files = ents.filter(e => e.isFile()).map(e => e.name);
  for (const f of files) if (/\.sng$/i.test(f)) {
    const info = sngMeta(path.join(dir, f));
    if (info) out.push(entry(rel.concat(f).join('/'), info));
    else console.warn('ignorado (não é um .sng válido):', rel.concat(f).join('/'));
  }
  if (rel.length && files.some(isChart) && files.some(isStem)) {
    const ini = files.find(n => /^song\.ini$/i.test(n));
    const info = ini ? parseIni(fs.readFileSync(path.join(dir, ini), 'utf8')) : {};
    out.push(entry(rel.join('/'), info, { arquivos: files.filter(n => isChart(n) || isStem(n) || /^song\.ini$/i.test(n)) }));
  }
  if (depth < 4) for (const e of ents) if (e.isDirectory()) walk(path.join(dir, e.name), rel.concat(e.name), depth + 1);
}
walk(ROOT, [], 0);
out.sort((a, b) => (a.artista + ' ' + a.nome).localeCompare(b.artista + ' ' + b.nome, 'pt-BR'));
fs.writeFileSync(path.join(ROOT, 'lista.json'), JSON.stringify({ musicas: out }, null, 2) + '\n');
console.log(out.length + ' música(s) na lista');
