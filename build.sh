#!/usr/bin/env bash
set -eu
set -o pipefail

# Assumes Node/Npm are already installed
npm install && npm start
