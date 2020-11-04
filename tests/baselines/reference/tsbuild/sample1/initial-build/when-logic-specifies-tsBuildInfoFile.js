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

//// [/src/core/anotherModule.ts]
export const World = "hello";


//// [/src/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/src/core/some_decl.d.ts]
declare const dts: any;


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true
    }
}

//// [/src/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


//// [/src/logic/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "tsBuildInfoFile": "ownFile.tsbuildinfo",
        "declaration": true,
        "sourceMap": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    },
    "references": [
        { "path": "../core" }
    ]
}


//// [/src/tests/index.ts]
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;


//// [/src/tests/tsconfig.json]
{
    "references": [
        { "path": "../core" },
        { "path": "../logic" }
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    }
}

//// [/src/ui/index.ts]


//// [/src/ui/tsconfig.json]




Output::
/lib/tsc --b /src/tests --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/core/tsconfig.json
    * src/logic/tsconfig.json
    * src/tests/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/core/tsconfig.json' is out of date because output file 'src/core/anotherModule.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/core/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/logic/tsconfig.json' is out of date because output file 'src/logic/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/logic/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/tests/tsconfig.json' is out of date because output file 'src/tests/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/tests/tsconfig.json'...

exitCode:: ExitStatus.Success
readFiles:: {
 "/src/tests/tsconfig.json": 1,
 "/src/core/tsconfig.json": 1,
 "/src/logic/tsconfig.json": 1,
 "/src/core/tsconfig.tsbuildinfo": 1,
 "/src/core/anotherModule.ts": 1,
 "/src/core/index.ts": 1,
 "/src/core/some_decl.d.ts": 1,
 "/src/logic/ownFile.tsbuildinfo": 1,
 "/src/logic/index.ts": 1,
 "/src/core/index.d.ts": 1,
 "/src/core/anotherModule.d.ts": 1,
 "/src/tests/tsconfig.tsbuildinfo": 1,
 "/src/tests/index.ts": 1,
 "/src/logic/index.d.ts": 1
} 

//// [/src/core/anotherModule.d.ts]
export declare const World = "hello";
//# sourceMappingURL=anotherModule.d.ts.map

//// [/src/core/anotherModule.d.ts.map]
{"version":3,"file":"anotherModule.d.ts","sourceRoot":"","sources":["anotherModule.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,KAAK,UAAU,CAAC"}

//// [/src/core/anotherModule.d.ts.map.baseline.txt]
===================================================================
JsFile: anotherModule.d.ts
mapUrl: anotherModule.d.ts.map
sourceRoot: 
sources: anotherModule.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/core/anotherModule.d.ts
sourceFile:anotherModule.ts
-------------------------------------------------------------------
>>>export declare const World = "hello";
1 >
2 >^^^^^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^^^^^
5 >                          ^^^^^^^^^^
6 >                                    ^
7 >                                     ^^^^^->
1 >
2 >export 
3 >               const 
4 >                     World
5 >                           = "hello"
6 >                                    ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 16) Source(1, 8) + SourceIndex(0)
3 >Emitted(1, 22) Source(1, 14) + SourceIndex(0)
4 >Emitted(1, 27) Source(1, 19) + SourceIndex(0)
5 >Emitted(1, 37) Source(1, 29) + SourceIndex(0)
6 >Emitted(1, 38) Source(1, 30) + SourceIndex(0)
---
>>>//# sourceMappingURL=anotherModule.d.ts.map

//// [/src/core/anotherModule.js]
"use strict";
exports.__esModule = true;
exports.World = void 0;
exports.World = "hello";


//// [/src/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
//# sourceMappingURL=index.d.ts.map

//// [/src/core/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB"}

//// [/src/core/index.d.ts.map.baseline.txt]
===================================================================
JsFile: index.d.ts
mapUrl: index.d.ts.map
sourceRoot: 
sources: index.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/core/index.d.ts
sourceFile:index.ts
-------------------------------------------------------------------
>>>export declare const someString: string;
1 >
2 >^^^^^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^^^^^^^^^^
5 >                               ^^
6 >                                 ^^^^^^
7 >                                       ^
8 >                                        ^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >export 
3 >               const 
4 >                     someString
5 >                               : 
6 >                                 string = "HELLO WORLD"
7 >                                       ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 16) Source(1, 8) + SourceIndex(0)
3 >Emitted(1, 22) Source(1, 14) + SourceIndex(0)
4 >Emitted(1, 32) Source(1, 24) + SourceIndex(0)
5 >Emitted(1, 34) Source(1, 26) + SourceIndex(0)
6 >Emitted(1, 40) Source(1, 48) + SourceIndex(0)
7 >Emitted(1, 41) Source(1, 49) + SourceIndex(0)
---
>>>export declare function leftPad(s: string, n: number): string;
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^
4 >                               ^
5 >                                ^
6 >                                 ^^
7 >                                   ^^^^^^
8 >                                         ^^
9 >                                           ^
10>                                            ^^
11>                                              ^^^^^^
12>                                                    ^^^^^^^^^^
13>                                                              ^^->
1->
  >
2 >export function 
3 >                        leftPad
4 >                               (
5 >                                s
6 >                                 : 
7 >                                   string
8 >                                         , 
9 >                                           n
10>                                            : 
11>                                              number
12>                                                    ) { return s + n; }
1->Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 25) Source(2, 17) + SourceIndex(0)
3 >Emitted(2, 32) Source(2, 24) + SourceIndex(0)
4 >Emitted(2, 33) Source(2, 25) + SourceIndex(0)
5 >Emitted(2, 34) Source(2, 26) + SourceIndex(0)
6 >Emitted(2, 36) Source(2, 28) + SourceIndex(0)
7 >Emitted(2, 42) Source(2, 34) + SourceIndex(0)
8 >Emitted(2, 44) Source(2, 36) + SourceIndex(0)
9 >Emitted(2, 45) Source(2, 37) + SourceIndex(0)
10>Emitted(2, 47) Source(2, 39) + SourceIndex(0)
11>Emitted(2, 53) Source(2, 45) + SourceIndex(0)
12>Emitted(2, 63) Source(2, 64) + SourceIndex(0)
---
>>>export declare function multiply(a: number, b: number): number;
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^^
4 >                                ^
5 >                                 ^
6 >                                  ^^
7 >                                    ^^^^^^
8 >                                          ^^
9 >                                            ^
10>                                             ^^
11>                                               ^^^^^^
12>                                                     ^^^^^^^^^^
1->
  >
2 >export function 
3 >                        multiply
4 >                                (
5 >                                 a
6 >                                  : 
7 >                                    number
8 >                                          , 
9 >                                            b
10>                                             : 
11>                                               number
12>                                                     ) { return a * b; }
1->Emitted(3, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(3, 25) Source(3, 17) + SourceIndex(0)
3 >Emitted(3, 33) Source(3, 25) + SourceIndex(0)
4 >Emitted(3, 34) Source(3, 26) + SourceIndex(0)
5 >Emitted(3, 35) Source(3, 27) + SourceIndex(0)
6 >Emitted(3, 37) Source(3, 29) + SourceIndex(0)
7 >Emitted(3, 43) Source(3, 35) + SourceIndex(0)
8 >Emitted(3, 45) Source(3, 37) + SourceIndex(0)
9 >Emitted(3, 46) Source(3, 38) + SourceIndex(0)
10>Emitted(3, 48) Source(3, 40) + SourceIndex(0)
11>Emitted(3, 54) Source(3, 46) + SourceIndex(0)
12>Emitted(3, 64) Source(3, 65) + SourceIndex(0)
---
>>>//# sourceMappingURL=index.d.ts.map

//// [/src/core/index.js]
"use strict";
exports.__esModule = true;
exports.multiply = exports.leftPad = exports.someString = void 0;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;


//// [/src/core/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "affectsGlobalScope": false
      },
      "./index.ts": {
        "version": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",
        "signature": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "affectsGlobalScope": false
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/logic/index.d.ts]
export declare function getSecondsInDay(): number;
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/src/logic/index.js]
"use strict";
exports.__esModule = true;
exports.m = exports.getSecondsInDay = void 0;
var c = require("../core/index");
function getSecondsInDay() {
    return c.multiply(10, 15);
}
exports.getSecondsInDay = getSecondsInDay;
var mod = require("../core/anotherModule");
exports.m = mod;
//# sourceMappingURL=index.js.map

//// [/src/logic/index.js.map]
{"version":3,"file":"index.js","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":";;;AAAA,iCAAmC;AACnC,SAAgB,eAAe;IAC3B,OAAO,CAAC,CAAC,QAAQ,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC9B,CAAC;AAFD,0CAEC;AACD,2CAA6C;AAChC,QAAA,CAAC,GAAG,GAAG,CAAC"}

//// [/src/logic/index.js.map.baseline.txt]
===================================================================
JsFile: index.js
mapUrl: index.js.map
sourceRoot: 
sources: index.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/logic/index.js
sourceFile:index.ts
-------------------------------------------------------------------
>>>"use strict";
>>>exports.__esModule = true;
>>>exports.m = exports.getSecondsInDay = void 0;
>>>var c = require("../core/index");
1 >
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >import * as c from '../core/index';
1 >Emitted(4, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(4, 34) Source(1, 36) + SourceIndex(0)
---
>>>function getSecondsInDay() {
1 >
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^
4 >                        ^^^^^^^->
1 >
  >
2 >export function 
3 >         getSecondsInDay
1 >Emitted(5, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(5, 10) Source(2, 17) + SourceIndex(0)
3 >Emitted(5, 25) Source(2, 32) + SourceIndex(0)
---
>>>    return c.multiply(10, 15);
1->^^^^
2 >    ^^^^^^^
3 >           ^
4 >            ^
5 >             ^^^^^^^^
6 >                     ^
7 >                      ^^
8 >                        ^^
9 >                          ^^
10>                            ^
11>                             ^
1->() {
  >    
2 >    return 
3 >           c
4 >            .
5 >             multiply
6 >                     (
7 >                      10
8 >                        , 
9 >                          15
10>                            )
11>                             ;
1->Emitted(6, 5) Source(3, 5) + SourceIndex(0)
2 >Emitted(6, 12) Source(3, 12) + SourceIndex(0)
3 >Emitted(6, 13) Source(3, 13) + SourceIndex(0)
4 >Emitted(6, 14) Source(3, 14) + SourceIndex(0)
5 >Emitted(6, 22) Source(3, 22) + SourceIndex(0)
6 >Emitted(6, 23) Source(3, 23) + SourceIndex(0)
7 >Emitted(6, 25) Source(3, 25) + SourceIndex(0)
8 >Emitted(6, 27) Source(3, 27) + SourceIndex(0)
9 >Emitted(6, 29) Source(3, 29) + SourceIndex(0)
10>Emitted(6, 30) Source(3, 30) + SourceIndex(0)
11>Emitted(6, 31) Source(3, 31) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(7, 1) Source(4, 1) + SourceIndex(0)
2 >Emitted(7, 2) Source(4, 2) + SourceIndex(0)
---
>>>exports.getSecondsInDay = getSecondsInDay;
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                          ^^->
1->
2 >export function getSecondsInDay() {
  >    return c.multiply(10, 15);
  >}
1->Emitted(8, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(8, 43) Source(4, 2) + SourceIndex(0)
---
>>>var mod = require("../core/anotherModule");
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >import * as mod from '../core/anotherModule';
1->Emitted(9, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(9, 44) Source(5, 46) + SourceIndex(0)
---
>>>exports.m = mod;
1 >
2 >^^^^^^^^
3 >        ^
4 >         ^^^
5 >            ^^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^->
1 >
  >export const 
2 >
3 >        m
4 >          = 
5 >            mod
6 >               ;
1 >Emitted(10, 1) Source(6, 14) + SourceIndex(0)
2 >Emitted(10, 9) Source(6, 14) + SourceIndex(0)
3 >Emitted(10, 10) Source(6, 15) + SourceIndex(0)
4 >Emitted(10, 13) Source(6, 18) + SourceIndex(0)
5 >Emitted(10, 16) Source(6, 21) + SourceIndex(0)
6 >Emitted(10, 17) Source(6, 22) + SourceIndex(0)
---
>>>//# sourceMappingURL=index.js.map

//// [/src/logic/ownFile.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "affectsGlobalScope": false
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "affectsGlobalScope": false
      },
      "./index.ts": {
        "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "tsBuildInfoFile": "./ownFile.tsbuildinfo",
      "declaration": true,
      "sourceMap": true,
      "forceConsistentCasingInFileNames": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts",
        "../core/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/tests/index.d.ts]
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/src/tests/index.js]
"use strict";
exports.__esModule = true;
exports.m = void 0;
var c = require("../core/index");
var logic = require("../logic/index");
c.leftPad("", 10);
logic.getSecondsInDay();
var mod = require("../core/anotherModule");
exports.m = mod;


//// [/src/tests/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-13851440507-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n//# sourceMappingURL=index.d.ts.map",
        "affectsGlobalScope": false
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "affectsGlobalScope": false
      },
      "../logic/index.d.ts": {
        "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "affectsGlobalScope": false
      },
      "./index.ts": {
        "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts",
        "../core/index.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "../logic/index.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

