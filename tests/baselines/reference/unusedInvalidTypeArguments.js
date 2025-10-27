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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [classReference.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
class C {
}
// This uses getTypeFromClassOrInterfaceReference instead of getTypeFromTypeAliasReference.
class D extends C {
}
exports.D = D;
//// [interface.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [call.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unknown_1 = require("unknown");
(0, unknown_1.foo)();
//// [new.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unkown_1 = require("unkown");
new unkown_1.Foo();
//// [callAny.js]
g();
g(); // Should get error for type argument
//// [super.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
const unknown_1 = require("unknown");
class C extends unknown_1.A {
    m() {
        super.m(1);
        super.m(); // Should get error for type argument
    }
}
exports.C = C;
