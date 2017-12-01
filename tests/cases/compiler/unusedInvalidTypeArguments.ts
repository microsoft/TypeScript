// Tests that types are marked as used, even if used in places that don't accept type arguments.

// @noUnusedLocals: true

// @Filename: /typeReference.ts
type N = number;
type U = number;
export type Z = U<N>;

// @Filename: /classReference.ts
type N = number;
class C { }
// This uses getTypeFromClassOrInterfaceReference instead of getTypeFromTypeAliasReference.
export class D extends C<N> {}

// @Filename: /interface.ts
import { Foo } from "unknown";
export interface I<T> { x: Foo<T>; }

// @Filename: /call.ts
import { foo } from "unknown";
type T = number;
foo<T>();

// @Filename: /new.ts
import { Foo } from "unkown";
type T = number;
new Foo<T>();

// @Filename: /callAny.ts
declare var g: any;
type U = number;
g<U>();
g<InvalidReference>(); // Should get error for type argument

// @Filename: /super.ts
import { A, B } from "unknown";

type T = number;

export class C extends A<B> {
    m() {
        super.m<T>(1);
        super.m<InvalidReference>(); // Should get error for type argument
    }
}
