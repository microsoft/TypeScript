// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @module: commonjs
// @Filename: thing.js
'use strict';
class Thing {}
module.exports = { Thing }

// @Filename: reexport.js
'use strict';
const Thing = require('./thing').Thing
module.exports = { Thing }
