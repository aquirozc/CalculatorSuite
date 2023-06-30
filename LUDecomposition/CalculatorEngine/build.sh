#!/bin/zsh
tsc ApplicationController.ts
browserify ApplicationController.js -o prodReadyBundle.js
rm ApplicationController.js