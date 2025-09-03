//// [tests/cases/conformance/externalModules/typeOnly/grammarErrors.ts] ////

//// [a.ts]
export default class A {}
export class B {}
export class C {}

//// [b.ts]
import type A, { B, C } from './a';

//// [a.js]
import type A from './a';
export type { A };

//// [c.ts]
namespace ns {
  export class Foo {}
}
import type Foo = ns.Foo;


//// [b.js]
export {};
//// [c.js]
var ns;
(function (ns) {
    class Foo {
    }
    ns.Foo = Foo;
})(ns || (ns = {}));
