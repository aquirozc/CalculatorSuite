#!/bin/zsh
tsc ApplicationController.ts CoreEngine.ts
browserify ApplicationController.js CoreEngine.ts -o prodReadyBundle.js
rm ApplicationController.js CoreEngine.ts