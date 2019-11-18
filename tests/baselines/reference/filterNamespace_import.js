//// [tests/cases/conformance/externalModules/typeOnly/filterNamespace_import.ts] ////

//// [ns.ts]
namespace ns {
  export type Type = string;
  export class Class {}
  export const Value = "";
}

export default ns;

//// [a.ts]
import type ns from './ns';
ns.Class; // Error
ns.Value; // Error
let c: ns.Class;
let t: ns.Type = "";


//// [ns.js]
"use strict";
exports.__esModule = true;
var ns;
(function (ns) {
    var Class = /** @class */ (function () {
        function Class() {
        }
        return Class;
    }());
    ns.Class = Class;
    ns.Value = "";
})(ns || (ns = {}));
exports["default"] = ns;
//// [a.js]
"use strict";
exports.__esModule = true;
ns.Class; // Error
ns.Value; // Error
var c;
var t = "";
