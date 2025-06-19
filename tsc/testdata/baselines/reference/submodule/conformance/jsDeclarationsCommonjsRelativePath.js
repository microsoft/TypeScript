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
declare class Thing {
}
declare const _default: {
    Thing: typeof Thing;
};
export = _default;
//// [reexport.d.ts]
declare const _default: {
    Thing: {
        new (): {};
    };
};
export = _default;
