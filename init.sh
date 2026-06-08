#!/usr/bin/env bash
# ─────────────────────────────────────────────
#  Gift Genie — Start Server & Frontend
# ─────────────────────────────────────────────

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

cleanup() {
  echo ""
  echo "🧞 Shutting down..."
  kill "$SERVER_PID" "$FRONTEND_PID" 2>/dev/null
  wait "$SERVER_PID" "$FRONTEND_PID" 2>/dev/null
  echo "✅ All processes stopped."
  exit 0
}

trap cleanup SIGINT SIGTERM

# ── Install dependencies if needed ──
if [ ! -d "$ROOT_DIR/Server/node_modules" ]; then
  echo "📦 Installing Server dependencies..."
  npm install --prefix "$ROOT_DIR/Server"
fi

if [ ! -d "$ROOT_DIR/front-end/node_modules" ]; then
  echo "📦 Installing Frontend dependencies..."
  npm install --prefix "$ROOT_DIR/front-end"
fi

# ── Start Backend ──
echo "🚀 Starting Server on port 3000..."
npm start --prefix "$ROOT_DIR/Server" &
SERVER_PID=$!

# ── Start Frontend ──
echo "🚀 Starting Frontend on port 5173..."
npm run dev --prefix "$ROOT_DIR/front-end" &
FRONTEND_PID=$!

echo ""
echo "─────────────────────────────────────"
echo "  🧞 Gift Genie is running!"
echo "  Frontend → http://localhost:5173"
echo "  Backend  → http://localhost:3000"
echo "  Press Ctrl+C to stop both."
echo "─────────────────────────────────────"
echo ""

wait
