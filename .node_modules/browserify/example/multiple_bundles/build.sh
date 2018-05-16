#!/bin/bash
browserify -r ./robot.js > static/common.js
browserify -x ./robot.js beep.js > static/beep.js
browserify -x ./robot.js boop.js > static/boop.js
