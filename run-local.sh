#!/usr/bin/env bash

set -euo pipefail

# Set defaults using parameter assignment without self-referencing
: "${PORT:=3000}"
: "${HOST:=127.0.0.1}"
: "${LOG_LEVEL:=debug}"
: "${NODE_ENV:=development}"
: "${ALLOWED_API_KEYS:=secret-dev-key-123,symfony-proxy-key}"

export PORT HOST LOG_LEVEL NODE_ENV ALLOWED_API_KEYS

echo "Starting Shipping Rate Microservice (Development)..."
echo "URL: http://${HOST}:${PORT}"
echo "Log Level: ${LOG_LEVEL}"
echo "Allowed Keys: ${ALLOWED_API_KEYS}"
echo "---------------------------------------------------"

npx tsx watch server.ts