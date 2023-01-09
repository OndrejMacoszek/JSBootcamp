#!/usr/bin/env node

const chokidar = require("chokidar");
const debounce = require("lodash.debounce");
const program = require("caporal");

const start = debounce(() => {
  console.log("starting users program");
},100);

chokidar
  .watch(".")
  .on("add", start)
  .on("change", () => {
    console.log("file changed");
  })
  .on("unlink", () => {
    console.log("file unlinked");
  });