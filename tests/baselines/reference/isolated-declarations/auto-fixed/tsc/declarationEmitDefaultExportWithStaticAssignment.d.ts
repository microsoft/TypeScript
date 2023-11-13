//// [tests/cases/compiler/declarationEmitDefaultExportWithStaticAssignment.ts] ////

//// [foo.ts]
export class Foo {}

//// [index1.ts]
import {Foo} from './foo';
export default function Example(): void {}
Example.Foo = Foo

//// [index2.ts]
import {Foo} from './foo';
export {Foo};
export default function Example(): void {}
Example.Foo = Foo

//// [index3.ts]
export class Bar {}
export default function Example(): void {}

Example.Bar = Bar

//// [index4.ts]
function A() {  }

function B() { }

export function C(): any {
  return null;
}

C.A = A;
C.B = B;

/// [Declarations] ////



//// [foo.d.ts]
export declare class Foo {
}

//// [index1.d.ts]
declare function Example(): void;
declare namespace Example {
    var Foo: typeof import("./foo").Foo;
}
export default Example;

//// [index2.d.ts]
import { Foo } from './foo';
export { Foo };
declare function Example(): void;
declare namespace Example {
    var Foo: typeof import("./foo").Foo;
}
export default Example;

//// [index3.d.ts]
export declare class Bar {
}
declare function Example(): void;
declare namespace Example {
    var Bar: typeof import("./index3").Bar;
}
export default Example;

//// [index4.d.ts]
export declare function C(): any;
export declare namespace C {
    var A: () => void;
    var B: () => void;
}
