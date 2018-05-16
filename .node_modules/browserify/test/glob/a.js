console.log('a');

try { require('./vendor/x.js') }
catch (err) { console.log('!x') }

require('./lib/z.js')
