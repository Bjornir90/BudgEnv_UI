#!/usr/bin/env bash
cp .env ./tmp/.env
cp .env.prod .env
npm run build
deta deploy
rm .env
cp ./tmp/.env .env