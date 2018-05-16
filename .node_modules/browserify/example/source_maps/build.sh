#!/bin/bash
../../bin/cmd.js --debug -e ./js/main.js > js/build/bundle.js

echo bundle was generated with source maps, you can now open index.html
