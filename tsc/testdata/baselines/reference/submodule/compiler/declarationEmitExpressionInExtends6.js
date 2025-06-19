//// [tests/cases/compiler/declarationEmitExpressionInExtends6.ts] ////

//// [index.d.ts]
declare const require: any;

//// [a.ts]
export class Foo {}

//// [b.ts]
import * as A from "./a";
const { Foo } = A;
export default class extends Foo {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
}
exports.Foo = Foo;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const A = require("./a");
const { Foo } = A;
class default_1 extends Foo {
}
exports.default = default_1;


//// [a.d.ts]
export declare class Foo {
}
//// [b.d.ts]
export default class extends Foo {
}


//// [DtsFileErrors]


/b.d.ts(1,30): error TS2304: Cannot find name 'Foo'.


==== /node_modules/@types/node/index.d.ts (0 errors) ====
    declare const require: any;
    
==== /a.d.ts (0 errors) ====
    export declare class Foo {
    }
    
==== /b.d.ts (1 errors) ====
    export default class extends Foo {
                                 ~~~
!!! error TS2304: Cannot find name 'Foo'.
    }
    