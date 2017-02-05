#!/usr/bin/env bash
set -eu
set -o pipefail

# We'll assume you already have Ruby and Rubygems

which bundler >/dev/null ||
  gem install bundler

bundle install &&
  bundle exec rake compile
