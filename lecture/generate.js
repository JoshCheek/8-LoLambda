#!/usr/bin/env babel-node

'use strict'
const fs = require('fs')
// const Build = require('../src/build_state')
// Build.stateFromMarkdownBodies

fs.readdir(__dirname, (err, files) =>
  files
    .filter(f => f.match(/\.md$/))
    .map(f => `${__dirname}/${f}`)
    .forEach(path =>
      console.log(`=====  ${path}  =====\n\n${fs.readFileSync(path)}`)))

