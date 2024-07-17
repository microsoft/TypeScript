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

//// [/src/app/file3.ts]
export const z = 30;
import { x } from "lib/file1";


//// [/src/app/file4.ts]
const myVar = 30;

//// [/src/app/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "module": "amd",
    "composite": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "outFile": "module.js"
  },
  "exclude": [
    "module.d.ts"
  ],
  "references": [
    {
      "path": "../lib"
    }
  ]
}

//// [/src/lib/file0.ts]
const myGlob = 20;

//// [/src/lib/file1.ts]
export const x = 10;

//// [/src/lib/file2.ts]
export const y = 20;

//// [/src/lib/global.ts]
const globalConst = 10;

//// [/src/lib/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "module": "amd",
    "composite": true,
    "sourceMap": true,
    "declarationMap": true,
    "strict": false,
    "outFile": "../module.js", "rootDir": "../"
  },
  "exclude": [
    "module.d.ts"
  ]
}



Output::
/lib/tsc -b /src/app --verbose
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/lib/tsconfig.json' is out of date because output file 'src/module.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/lib/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/app/tsconfig.json' is out of date because output file 'src/app/module.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/app/module.d.ts]
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;
//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["file3.ts","file4.ts"],"names":[],"mappings":";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,KAAK,KAAK,CAAC"}

//// [/src/app/module.d.ts.map.baseline.txt]
===================================================================
JsFile: module.d.ts
mapUrl: module.d.ts.map
sourceRoot: 
sources: file3.ts,file4.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:file3.ts
-------------------------------------------------------------------
>>>declare module "file3" {
>>>    export const z = 30;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1 >
2 >    export
3 >           
4 >           const 
5 >                 z
6 >                   = 30
7 >                       ;
1 >Emitted(2, 5) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 11) Source(1, 7) + SourceIndex(0)
3 >Emitted(2, 12) Source(1, 8) + SourceIndex(0)
4 >Emitted(2, 18) Source(1, 14) + SourceIndex(0)
5 >Emitted(2, 19) Source(1, 15) + SourceIndex(0)
6 >Emitted(2, 24) Source(1, 20) + SourceIndex(0)
7 >Emitted(2, 25) Source(1, 21) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:file4.ts
-------------------------------------------------------------------
>>>}
>>>declare const myVar = 30;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^
5 >                   ^^^^^
6 >                        ^
7 >                         ^^^^^^^^^^->
1 >
2 >
3 >        const 
4 >              myVar
5 >                    = 30
6 >                        ;
1 >Emitted(4, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(4, 9) Source(1, 1) + SourceIndex(1)
3 >Emitted(4, 15) Source(1, 7) + SourceIndex(1)
4 >Emitted(4, 20) Source(1, 12) + SourceIndex(1)
5 >Emitted(4, 25) Source(1, 17) + SourceIndex(1)
6 >Emitted(4, 26) Source(1, 18) + SourceIndex(1)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.js]
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;
//# sourceMappingURL=module.js.map

//// [/src/app/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["file3.ts","file4.ts"],"names":[],"mappings":";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,KAAK,GAAG,EAAE,CAAC"}

//// [/src/app/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: file3.ts,file4.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file3.ts
-------------------------------------------------------------------
>>>define("file3", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.z = void 0;
>>>    exports.z = 30;
1 >^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1 >export const 
2 >    
3 >            z
4 >              = 
5 >                30
6 >                  ;
1 >Emitted(5, 5) Source(1, 14) + SourceIndex(0)
2 >Emitted(5, 13) Source(1, 14) + SourceIndex(0)
3 >Emitted(5, 14) Source(1, 15) + SourceIndex(0)
4 >Emitted(5, 17) Source(1, 18) + SourceIndex(0)
5 >Emitted(5, 19) Source(1, 20) + SourceIndex(0)
6 >Emitted(5, 20) Source(1, 21) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file4.ts
-------------------------------------------------------------------
>>>});
>>>var myVar = 30;
1 >
2 >^^^^
3 >    ^^^^^
4 >         ^^^
5 >            ^^
6 >              ^
7 >               ^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myVar
4 >          = 
5 >            30
6 >              ;
1 >Emitted(7, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(7, 5) Source(1, 7) + SourceIndex(1)
3 >Emitted(7, 10) Source(1, 12) + SourceIndex(1)
4 >Emitted(7, 13) Source(1, 15) + SourceIndex(1)
5 >Emitted(7, 15) Source(1, 17) + SourceIndex(1)
6 >Emitted(7, 16) Source(1, 18) + SourceIndex(1)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/app/module.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../module.d.ts","./file3.ts","./file4.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"-21806566655-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n","impliedFormat":1},{"version":"-16038404532-export const z = 30;\nimport { x } from \"lib/file1\";\n","impliedFormat":1},{"version":"1463681686-const myVar = 30;","impliedFormat":1}],"root":[3,4],"options":{"composite":true,"declarationMap":true,"module":2,"outFile":"./module.js","sourceMap":true,"strict":false,"target":1},"outSignature":"-23302177839-declare module \"file3\" {\n    export const z = 30;\n}\ndeclare const myVar = 30;\n","latestChangedDtsFile":"./module.d.ts"},"version":"FakeTSVersion"}

//// [/src/app/module.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../module.d.ts",
      "./file3.ts",
      "./file4.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "../module.d.ts": {
        "original": {
          "version": "-21806566655-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n",
          "impliedFormat": 1
        },
        "version": "-21806566655-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./file3.ts": {
        "original": {
          "version": "-16038404532-export const z = 30;\nimport { x } from \"lib/file1\";\n",
          "impliedFormat": 1
        },
        "version": "-16038404532-export const z = 30;\nimport { x } from \"lib/file1\";\n",
        "impliedFormat": "commonjs"
      },
      "./file4.ts": {
        "original": {
          "version": "1463681686-const myVar = 30;",
          "impliedFormat": 1
        },
        "version": "1463681686-const myVar = 30;",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        3,
        "./file3.ts"
      ],
      [
        4,
        "./file4.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "module": 2,
      "outFile": "./module.js",
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-23302177839-declare module \"file3\" {\n    export const z = 30;\n}\ndeclare const myVar = 30;\n",
    "latestChangedDtsFile": "./module.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1290
}

//// [/src/module.d.ts]
declare const myGlob = 20;
declare module "lib/file1" {
    export const x = 10;
}
declare module "lib/file2" {
    export const y = 20;
}
declare const globalConst = 10;
//# sourceMappingURL=module.d.ts.map

//// [/src/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["lib/file0.ts","lib/file1.ts","lib/file2.ts","lib/global.ts"],"names":[],"mappings":"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC"}

//// [/src/module.d.ts.map.baseline.txt]
===================================================================
JsFile: module.d.ts
mapUrl: module.d.ts.map
sourceRoot: 
sources: lib/file0.ts,lib/file1.ts,lib/file2.ts,lib/global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/module.d.ts
sourceFile:lib/file0.ts
-------------------------------------------------------------------
>>>declare const myGlob = 20;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^
5 >                    ^^^^^
6 >                         ^
7 >                          ^^->
1 >
2 >
3 >        const 
4 >              myGlob
5 >                     = 20
6 >                         ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 9) Source(1, 1) + SourceIndex(0)
3 >Emitted(1, 15) Source(1, 7) + SourceIndex(0)
4 >Emitted(1, 21) Source(1, 13) + SourceIndex(0)
5 >Emitted(1, 26) Source(1, 18) + SourceIndex(0)
6 >Emitted(1, 27) Source(1, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/module.d.ts
sourceFile:lib/file1.ts
-------------------------------------------------------------------
>>>declare module "lib/file1" {
>>>    export const x = 10;
1->^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1->
2 >    export
3 >           
4 >           const 
5 >                 x
6 >                   = 10
7 >                       ;
1->Emitted(3, 5) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 11) Source(1, 7) + SourceIndex(1)
3 >Emitted(3, 12) Source(1, 8) + SourceIndex(1)
4 >Emitted(3, 18) Source(1, 14) + SourceIndex(1)
5 >Emitted(3, 19) Source(1, 15) + SourceIndex(1)
6 >Emitted(3, 24) Source(1, 20) + SourceIndex(1)
7 >Emitted(3, 25) Source(1, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/module.d.ts
sourceFile:lib/file2.ts
-------------------------------------------------------------------
>>>}
>>>declare module "lib/file2" {
>>>    export const y = 20;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1 >
2 >    export
3 >           
4 >           const 
5 >                 y
6 >                   = 20
7 >                       ;
1 >Emitted(6, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(6, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(6, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(6, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(6, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(6, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(6, 25) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/module.d.ts
sourceFile:lib/global.ts
-------------------------------------------------------------------
>>>}
>>>declare const globalConst = 10;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^
5 >                         ^^^^^
6 >                              ^
7 >                               ^^^^->
1 >
2 >
3 >        const 
4 >              globalConst
5 >                          = 10
6 >                              ;
1 >Emitted(8, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(8, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(8, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(8, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(8, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(8, 32) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/module.js]
var myGlob = 20;
define("lib/file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("lib/file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
//# sourceMappingURL=module.js.map

//// [/src/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["lib/file0.ts","lib/file1.ts","lib/file2.ts","lib/global.ts"],"names":[],"mappings":"AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICAP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

//// [/src/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: lib/file0.ts,lib/file1.ts,lib/file2.ts,lib/global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/module.js
sourceFile:lib/file0.ts
-------------------------------------------------------------------
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(1, 7) + SourceIndex(0)
3 >Emitted(1, 11) Source(1, 13) + SourceIndex(0)
4 >Emitted(1, 14) Source(1, 16) + SourceIndex(0)
5 >Emitted(1, 16) Source(1, 18) + SourceIndex(0)
6 >Emitted(1, 17) Source(1, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/module.js
sourceFile:lib/file1.ts
-------------------------------------------------------------------
>>>define("lib/file1", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.x = void 0;
>>>    exports.x = 10;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1->export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(6, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(6, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(6, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(6, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(6, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(6, 20) Source(1, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/module.js
sourceFile:lib/file2.ts
-------------------------------------------------------------------
>>>});
>>>define("lib/file2", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.y = void 0;
>>>    exports.y = 20;
1 >^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1 >export const 
2 >    
3 >            y
4 >              = 
5 >                20
6 >                  ;
1 >Emitted(12, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(12, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(12, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(12, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(12, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(12, 20) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/module.js
sourceFile:lib/global.ts
-------------------------------------------------------------------
>>>});
>>>var globalConst = 10;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^
4 >               ^^^
5 >                  ^^
6 >                    ^
7 >                     ^^^^^^^^^^^^->
1 >
2 >const 
3 >    globalConst
4 >                = 
5 >                  10
6 >                    ;
1 >Emitted(14, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(14, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(14, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(14, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(14, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(14, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/module.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./lib/file0.ts","./lib/file1.ts","./lib/file2.ts","./lib/global.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"3587416848-const myGlob = 20;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-13729954175-export const y = 20;","impliedFormat":1},{"version":"1028229885-const globalConst = 10;","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"declarationMap":true,"module":2,"outFile":"./module.js","rootDir":"./","sourceMap":true,"strict":false,"target":1},"outSignature":"-21806566655-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n","latestChangedDtsFile":"./module.d.ts"},"version":"FakeTSVersion"}

//// [/src/module.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./lib/file0.ts",
      "./lib/file1.ts",
      "./lib/file2.ts",
      "./lib/global.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./lib/file0.ts": {
        "original": {
          "version": "3587416848-const myGlob = 20;",
          "impliedFormat": 1
        },
        "version": "3587416848-const myGlob = 20;",
        "impliedFormat": "commonjs"
      },
      "./lib/file1.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./lib/file2.ts": {
        "original": {
          "version": "-13729954175-export const y = 20;",
          "impliedFormat": 1
        },
        "version": "-13729954175-export const y = 20;",
        "impliedFormat": "commonjs"
      },
      "./lib/global.ts": {
        "original": {
          "version": "1028229885-const globalConst = 10;",
          "impliedFormat": 1
        },
        "version": "1028229885-const globalConst = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./lib/file0.ts",
          "./lib/file1.ts",
          "./lib/file2.ts",
          "./lib/global.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "module": 2,
      "outFile": "./module.js",
      "rootDir": "./",
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-21806566655-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n",
    "latestChangedDtsFile": "./module.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1298
}

