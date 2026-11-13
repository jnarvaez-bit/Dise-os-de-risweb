#!/bin/bash
# Uso: scripts/capturar.sh <demo> <puerto>
# Requiere Google Chrome y, una sola vez: (cd scripts && npm i --no-save puppeteer-core@24)
# Hace "npm run build" antes. Guarda los PNG en docs/capturas/.
set -e
R=$(cd "$(dirname "$0")/.." && pwd)
D=$1; P=${2:-4301}
cd "$R/$D"
./node_modules/.bin/vite preview --port "$P" --strictPort >/tmp/prev_$D.log 2>&1 &
sleep 3
node "$R/scripts/capturas.mjs" "$D" "$P" || true
pkill -f "vite preview --port $P" || true
