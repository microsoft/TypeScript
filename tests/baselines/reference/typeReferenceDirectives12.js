//// [tests/cases/compiler/typeReferenceDirectives12.ts] ////

//// [index.d.ts]
interface Lib { x }

//// [main.ts]
export class Cls {
    x
}

//// [mod1.ts]
/// <reference types="lib" />

import {Cls} from "./main";
Cls.prototype.foo = function() { return undefined; }

declare module "./main" {
    interface Cls {
        foo(): Lib;
    }
    namespace Cls {
        function bar(): Lib;
    }
}

//// [mod2.ts]
import { Cls } from "./main";
import "./mod1";

export const cls = Cls;
export const foo = new Cls().foo();
export const bar = Cls.bar();




!!!! File /output.d.ts missing from original emit, but present in noCheck emit
//// [output.d.ts]
declare module "main" {
    export class Cls {
        x: any;
    }
}
declare module "mod1" {
    module "main" {
        interface Cls {
            foo(): Lib;
        }
        namespace Cls {
            function bar(): Lib;
        }
    }
}
declare module "mod2" {
    import { Cls } from "main";
    import "mod1";
    export const cls: typeof Cls;
    export const foo: Lib;
    export const bar: Lib;
}
