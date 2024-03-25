currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };

//// [/src/project/index.ts]

                    import { E } from "../utils";
                    import { E2 } from "../utilsNonPreserved";
        
                    E; declare const x: E; E[x];
                    
                    E2; declare const y: E2; E2[y];
                

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "isolatedModules": true
  },
  "references": [
    {
      "path": "../utils"
    }
  ]
}

//// [/src/utils/index.d.ts]
export declare const enum E { A = 1 }

//// [/src/utils/index.ts]
export const enum E { A = 1 }

//// [/src/utils/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "preserveConstEnums": true
  }
}

//// [/src/utilsNonPreserved/index.d.ts]
export declare const enum E2 { A = 1 }

//// [/src/utilsNonPreserved/index.ts]
export const enum E2 { A = 1 }

//// [/src/utilsNonPreserved/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "preserveConstEnums": false
  }
}



Output::
/lib/tsc --p src/project
[96msrc/project/index.ts[0m:[93m5[0m:[93m21[0m - [91merror[0m[90m TS2475: [0m'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.

[7m5[0m                     E; declare const x: E; E[x];
[7m [0m [91m                    ~[0m

[96msrc/project/index.ts[0m:[93m5[0m:[93m46[0m - [91merror[0m[90m TS2476: [0mA const enum member can only be accessed using a string literal.

[7m5[0m                     E; declare const x: E; E[x];
[7m [0m [91m                                             ~[0m

[96msrc/project/index.ts[0m:[93m7[0m:[93m21[0m - [91merror[0m[90m TS2475: [0m'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.

[7m7[0m                     E2; declare const y: E2; E2[y];
[7m [0m [91m                    ~~[0m

[96msrc/project/index.ts[0m:[93m7[0m:[93m49[0m - [91merror[0m[90m TS2476: [0mA const enum member can only be accessed using a string literal.

[7m7[0m                     E2; declare const y: E2; E2[y];
[7m [0m [91m                                                ~[0m


Found 4 errors in the same file, starting at: src/project/index.ts[90m:5[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var utilsNonPreserved_1 = require("../utilsNonPreserved");
utils_1.E;
utils_1.E[x];
utilsNonPreserved_1.E2;
utilsNonPreserved_1.E2[y];


//// [/src/utilsNonPreserved/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E2 = void 0;
var E2;
(function (E2) {
    E2[E2["A"] = 1] = "A";
})(E2 || (exports.E2 = E2 = {}));


