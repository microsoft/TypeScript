#!/usr/bin/env node
var FS = require('fs');
var jake = require('../lib/jake.js');

jake.program.internalOpts([
  { full: 'autocomplete'
  , preempts: false
  , expectValue: false
  }
, { full: 'autocomplete-cur'
  , preempts: false
  , expectValue: true
  }
, { full: 'autocomplete-prev'
  , preempts: false
  , expectValue: true
  }
]);

var autoArgs = ['--autocomplete', '--autocomplete-cur', process.argv[2], '--autocomplete-prev', process.argv[3]];
var compArgs = process.env.COMP_LINE.split(' ');

jake.run.apply(jake, autoArgs.concat(compArgs));
