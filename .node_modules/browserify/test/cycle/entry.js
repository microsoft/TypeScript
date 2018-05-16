// RE: substack/node-browserify#713

// https://github.com/substack/node-browserify/pull/713 breaks resolving 
// an identical module multiple time from different locations when the 
// module has a circular require.

// other than path, mod1 and mod2 are identical

require('./mod1/a')
require('./mod2/a')

// browserify entry.js

// works in 3.37.2
// >= 3.38 throws RangeError: Maximum call stack size exceeded