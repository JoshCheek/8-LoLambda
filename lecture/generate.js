#!/usr/bin/env babel-node
'use strict'

const fs = require('fs')
const Build = require('../src/build_state')
const path = (filename) => `${__dirname}/${filename}`

fs.readdir(__dirname, (err, files) =>
  fs.writeFileSync(
    path("lecture.json"),
    JSON.stringify(
      Build.stateFromMarkdownBodies(
        files.filter(f => f.match(/\.md$/))
             .map(path)
             .map(f => fs.readFileSync(f))
             .map(md => md.toString())))))
