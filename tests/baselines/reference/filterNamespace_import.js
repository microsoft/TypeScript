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
var ns;
(function (ns) {
    class Class {
    }
    ns.Class = Class;
    ns.Value = "";
    let nested;
    (function (nested) {
        class NestedClass {
            a;
        }
        nested.NestedClass = NestedClass;
    })(nested = ns.nested || (ns.nested = {}));
})(ns || (ns = {}));
export default ns;
//// [a.js]
ns.Class; // Error
ns.Value; // Error
let c;
let t = "";
let n = { a: '' };
export {};
