//// [tests/cases/conformance/externalModules/typeOnly/filterNamespace_import.ts] ////

//// [ns.ts]
namespace ns {
  export type Type = string;
  export class Class {}
  export const Value = "";
  export namespace nested {
    export class NestedClass {
      a!: string;
    }
  }
}

export default ns;

//// [a.ts]
import type ns from './ns';
ns.Class; // Error
ns.Value; // Error
let c: ns.Class;
let t: ns.Type = "";
let n: ns.nested.NestedClass = { a: '' };


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
    var nested;
    (function (nested) {
        var NestedClass = /** @class */ (function () {
            function NestedClass() {
            }
            return NestedClass;
        }());
        nested.NestedClass = NestedClass;
    })(nested = ns.nested || (ns.nested = {}));
})(ns || (ns = {}));
exports["default"] = ns;
//// [a.js]
"use strict";
exports.__esModule = true;
ns.Class; // Error
ns.Value; // Error
var c;
var t = "";
var n = { a: '' };
