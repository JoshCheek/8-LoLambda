#!/usr/bin/env bash
set -eu
set -o pipefail

# We'll assume you already have Ruby/Rubygems and Node/Npm

# Ruby dependencies
which bundler >/dev/null ||
  gem install bundler

# Compile Opal for in-browser Ruby
bundle install &&
  bundle exec rake compile

# Compile JavaScript stuff
npm install &&
  npm run bower
