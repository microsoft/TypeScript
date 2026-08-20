//// [tests/cases/compiler/unusedInvalidTypeArguments.ts] ////

//// [typeReference.ts]
type N = number;
type U = number;
export type Z = U<N>;

//// [classReference.ts]
type N = number;
class C { }
// This uses getTypeFromClassOrInterfaceReference instead of getTypeFromTypeAliasReference.
export class D extends C<N> {}

//// [interface.ts]
import { Foo } from "unknown";
export interface I<T> { x: Foo<T>; }

//// [call.ts]
import { foo } from "unknown";
type T = number;
foo<T>();

//// [new.ts]
import { Foo } from "unkown";
type T = number;
new Foo<T>();

//// [callAny.ts]
declare var g: any;
type U = number;
g<U>();
g<InvalidReference>(); // Should get error for type argument

//// [super.ts]
import { A, B } from "unknown";

type T = number;

export class C extends A<B> {
    m() {
        super.m<T>(1);
        super.m<InvalidReference>(); // Should get error for type argument
    }
}


//// [typeReference.js]
export {};
//// [classReference.js]
class C {
}
// This uses getTypeFromClassOrInterfaceReference instead of getTypeFromTypeAliasReference.
export class D extends C {
}
//// [interface.js]
export {};
//// [call.js]
import { foo } from "unknown";
foo();
//// [new.js]
import { Foo } from "unkown";
new Foo();
//// [callAny.js]
"use strict";
g();
g(); // Should get error for type argument
//// [super.js]
import { A } from "unknown";
export class C extends A {
    m() {
        super.m(1);
        super.m(); // Should get error for type argument
    }
}
