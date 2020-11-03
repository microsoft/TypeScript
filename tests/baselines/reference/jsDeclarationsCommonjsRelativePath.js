//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsCommonjsRelativePath.ts] ////

//// [thing.js]
'use strict';
class Thing {}
module.exports = { Thing }

//// [reexport.js]
'use strict';
const Thing = require('./thing').Thing
module.exports = { Thing }




//// [thing.d.ts]
export class Thing {
}
//// [reexport.d.ts]
export { Thing };
import Thing_1 = require("./thing");
import Thing = Thing_1.Thing;
