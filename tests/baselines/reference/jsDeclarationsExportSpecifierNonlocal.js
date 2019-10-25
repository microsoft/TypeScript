//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportSpecifierNonlocal.ts] ////

//// [source.js]
export class Thing {}
export class OtherThing {}
//// [index.js]
export { Thing, OtherThing as default } from "./source";


//// [source.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Thing = /** @class */ (function () {
    function Thing() {
    }
    return Thing;
}());
exports.Thing = Thing;
var OtherThing = /** @class */ (function () {
    function OtherThing() {
    }
    return OtherThing;
}());
exports.OtherThing = OtherThing;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var source_1 = require("./source");
exports.Thing = source_1.Thing;
exports.default = source_1.OtherThing;


//// [source.d.ts]
export class Thing {
}
export class OtherThing {
}
//// [index.d.ts]
export { Thing, OtherThing as default } from "./source";
