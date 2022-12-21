// @Filename: /ns.ts
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

// @Filename: /a.ts
import type ns from './ns';
ns.Class; // Error
ns.Value; // Error
let c: ns.Class;
let t: ns.Type = "";
let n: ns.nested.NestedClass = { a: '' };
