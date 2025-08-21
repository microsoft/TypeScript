currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
export const a = class { private p = 10; };
//// [/home/src/workspaces/project/b.ts] *new* 
export const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "declaration": true,
        "incremental": false
    }
}

tsgo --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/a.d.ts] *new* 
export declare const a: {
    new (): {
        p: number;
    };
};

//// [/home/src/workspaces/project/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/home/src/workspaces/project/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/workspaces/project/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;




Edit [0]:: no change

tsgo --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [1]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo --noCheck
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = "hello";

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [2]:: no change

tsgo --noCheck
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [3]:: No Change run with checking

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [4]:: No Change run with checking

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [5]:: no change

tsgo --noCheck
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [6]:: Introduce error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = class { private p = 10; };

tsgo --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a: {
    new (): {
        p: number;
    };
};

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [7]:: no change

tsgo --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [8]:: No Change run with checking

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [9]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo --noCheck
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = "hello";

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [10]:: No Change run with checking

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*



Edit [11]:: Add file with error
//// [/home/src/workspaces/project/c.ts] *new* 
export const c: number = "hello";

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *new* 
export declare const c: number;

//// [/home/src/workspaces/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = "hello";




Edit [12]:: Introduce error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = class { private p = 10; };

tsgo --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a: {
    new (): {
        p: number;
    };
};

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*



Edit [13]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo --noCheck
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = "hello";

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*



Edit [14]:: No Change run with checking

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*



Edit [15]:: no change

tsgo --noCheck
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*



Edit [16]:: No Change run with checking

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*

