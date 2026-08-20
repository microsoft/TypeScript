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
declare const _exports: {
    Thing: typeof Thing;
};
export = _exports;
declare class Thing {
}
//// [reexport.d.ts]
declare const _exports: {
    Thing: {
        new (): {};
    };
};
export = _exports;
