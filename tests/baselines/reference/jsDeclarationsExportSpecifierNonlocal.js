//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportSpecifierNonlocal.ts] ////

//// [source.js]
export class Thing {}
export class OtherThing {}
//// [index.js]
export { Thing, OtherThing as default } from "./source";


//// [source.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherThing = exports.Thing = void 0;
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
exports.default = exports.Thing = void 0;
var source_1 = require("./source");
Object.defineProperty(exports, "Thing", { enumerable: true, get: function () { return source_1.Thing; } });
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return source_1.OtherThing; } });


//// [source.d.ts]
export class Thing {
}
export class OtherThing {
}
//// [index.d.ts]
export { Thing, OtherThing as default } from "./source";
