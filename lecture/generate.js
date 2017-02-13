#!/usr/bin/env babel-node

'use strict'
const fs = require('fs')
const Build = require('../src/build_state')

fs.readdir(__dirname, (err, files) =>
  console.dir(
    Build.stateFromMarkdownBodies(
      files
        .filter(f => f.match(/\.md$/))
        .map(f => `${__dirname}/${f}`)
        .map(f => fs.readFileSync(f).toString())),
    {colors: true, depth: 20}))
