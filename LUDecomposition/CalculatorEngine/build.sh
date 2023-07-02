#!/bin/zsh
tsc ApplicationController.ts CoreEngine.ts
browserify ApplicationController.js CoreEngine.js -o prodReadyBundle.js
rm ApplicationController.js CoreEngine.js