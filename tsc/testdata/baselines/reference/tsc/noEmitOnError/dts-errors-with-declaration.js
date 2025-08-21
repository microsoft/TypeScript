currentDirectory::/user/username/projects/noEmitOnError
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/noEmitOnError/shared/types/db.ts] *new* 
export interface A {
    name: string;
}
//// [/user/username/projects/noEmitOnError/src/main.ts] *new* 
import { A } from "../shared/types/db";
export const a = class { private p = 10; };
//// [/user/username/projects/noEmitOnError/src/other.ts] *new* 
console.log("hi");
export { }
//// [/user/username/projects/noEmitOnError/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "./dev-build",
        "declaration": true,
        "incremental": false,
        "noEmitOnError": true,
    },
}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96msrc/main.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m2[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/main.ts[0m:[93m2[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m2[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in src/main.ts[90m:2[0m

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



Edit [0]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96msrc/main.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m2[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/main.ts[0m:[93m2[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m2[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in src/main.ts[90m:2[0m




Edit [1]:: Fix error
//// [/user/username/projects/noEmitOnError/src/main.ts] *modified* 
import { A } from "../shared/types/db";
export const a = class { p = 10; };

tsgo 
ExitStatus:: Success
Output::
//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.d.ts] *new* 
export interface A {
    name: string;
}

//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/noEmitOnError/dev-build/src/main.d.ts] *new* 
export declare const a: {
    new (): {
        p: number;
    };
};

//// [/user/username/projects/noEmitOnError/dev-build/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/user/username/projects/noEmitOnError/dev-build/src/other.d.ts] *new* 
export {};

//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hi");




Edit [2]:: no change

tsgo 
ExitStatus:: Success
Output::
//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.d.ts] *rewrite with same content*
//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js] *rewrite with same content*
//// [/user/username/projects/noEmitOnError/dev-build/src/main.d.ts] *rewrite with same content*
//// [/user/username/projects/noEmitOnError/dev-build/src/main.js] *rewrite with same content*
//// [/user/username/projects/noEmitOnError/dev-build/src/other.d.ts] *rewrite with same content*
//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] *rewrite with same content*

