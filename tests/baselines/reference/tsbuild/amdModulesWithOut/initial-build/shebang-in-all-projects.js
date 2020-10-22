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
#!someshebang app file3
export const z = 30;
import { x } from "file1";

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
    "exclude": ["module.d.ts"],
    "references": [
        { "path": "../lib", "prepend": true }
    ]
}

//// [/src/lib/file0.ts]
#!someshebang lib file0
const myGlob = 20;

//// [/src/lib/file1.ts]
#!someshebang lib file1
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
        "outFile": "module.js"
    },
    "exclude": ["module.d.ts"]

}



Output::
/lib/tsc --b /src/app --verbose
[[90m12:01:00 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/lib/tsconfig.json' is out of date because output file 'src/lib/module.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:01:00 AM[0m] Project 'src/app/tsconfig.json' is out of date because output file 'src/app/module.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/app/module.d.ts]
#!someshebang lib file0
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;
//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC;;ICCvB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACDpB,QAAA,MAAM,KAAK,KAAK,CAAC"}

//// [/src/app/module.d.ts.map.baseline.txt]
===================================================================
JsFile: module.d.ts
mapUrl: module.d.ts.map
sourceRoot: 
sources: ../lib/file0.ts,../lib/file1.ts,../lib/file2.ts,../lib/global.ts,file3.ts,file4.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>declare const myGlob = 20;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^
5 >                    ^^^^^
6 >                         ^
1 >#!someshebang lib file0
  >
2 >
3 >        const 
4 >              myGlob
5 >                     = 20
6 >                         ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 1) + SourceIndex(0)
3 >Emitted(2, 15) Source(2, 7) + SourceIndex(0)
4 >Emitted(2, 21) Source(2, 13) + SourceIndex(0)
5 >Emitted(2, 26) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 27) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/file1.ts
-------------------------------------------------------------------
>>>declare module "file1" {
>>>    export const x = 10;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1 >#!someshebang lib file1
  >
2 >    export
3 >           
4 >           const 
5 >                 x
6 >                   = 10
7 >                       ;
1 >Emitted(4, 5) Source(2, 1) + SourceIndex(1)
2 >Emitted(4, 11) Source(2, 7) + SourceIndex(1)
3 >Emitted(4, 12) Source(2, 8) + SourceIndex(1)
4 >Emitted(4, 18) Source(2, 14) + SourceIndex(1)
5 >Emitted(4, 19) Source(2, 15) + SourceIndex(1)
6 >Emitted(4, 24) Source(2, 20) + SourceIndex(1)
7 >Emitted(4, 25) Source(2, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/file2.ts
-------------------------------------------------------------------
>>>}
>>>declare module "file2" {
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
1 >Emitted(7, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(7, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(7, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(7, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(7, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(7, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(7, 25) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/global.ts
-------------------------------------------------------------------
>>>}
>>>declare const globalConst = 10;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^
5 >                         ^^^^^
6 >                              ^
1 >
2 >
3 >        const 
4 >              globalConst
5 >                          = 10
6 >                              ;
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(9, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(9, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(9, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(9, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(9, 32) Source(1, 24) + SourceIndex(3)
---
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
1 >#!someshebang app file3
  >
2 >    export
3 >           
4 >           const 
5 >                 z
6 >                   = 30
7 >                       ;
1 >Emitted(11, 5) Source(2, 1) + SourceIndex(4)
2 >Emitted(11, 11) Source(2, 7) + SourceIndex(4)
3 >Emitted(11, 12) Source(2, 8) + SourceIndex(4)
4 >Emitted(11, 18) Source(2, 14) + SourceIndex(4)
5 >Emitted(11, 19) Source(2, 15) + SourceIndex(4)
6 >Emitted(11, 24) Source(2, 20) + SourceIndex(4)
7 >Emitted(11, 25) Source(2, 21) + SourceIndex(4)
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
1 >Emitted(13, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(13, 9) Source(1, 1) + SourceIndex(5)
3 >Emitted(13, 15) Source(1, 7) + SourceIndex(5)
4 >Emitted(13, 20) Source(1, 12) + SourceIndex(5)
5 >Emitted(13, 25) Source(1, 17) + SourceIndex(5)
6 >Emitted(13, 26) Source(1, 18) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.js]
#!someshebang lib file0
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;
//# sourceMappingURL=module.js.map

//// [/src/app/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICDP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICCV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACDpB,IAAM,KAAK,GAAG,EAAE,CAAC"}

//// [/src/app/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: ../lib/file0.ts,../lib/file1.ts,../lib/file2.ts,../lib/global.ts,file3.ts,file4.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >#!someshebang lib file0
  >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(2, 7) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 13) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 16) + SourceIndex(0)
5 >Emitted(2, 16) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 17) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file1.ts
-------------------------------------------------------------------
>>>define("file1", ["require", "exports"], function (require, exports) {
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
1->#!someshebang lib file1
  >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(7, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(7, 13) Source(2, 14) + SourceIndex(1)
3 >Emitted(7, 14) Source(2, 15) + SourceIndex(1)
4 >Emitted(7, 17) Source(2, 18) + SourceIndex(1)
5 >Emitted(7, 19) Source(2, 20) + SourceIndex(1)
6 >Emitted(7, 20) Source(2, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
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
1 >Emitted(13, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(13, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(13, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(13, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(13, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(13, 20) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/global.ts
-------------------------------------------------------------------
>>>});
>>>var globalConst = 10;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^
4 >               ^^^
5 >                  ^^
6 >                    ^
7 >                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    globalConst
4 >                = 
5 >                  10
6 >                    ;
1 >Emitted(15, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(15, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(15, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(15, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(15, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(15, 22) Source(1, 24) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file3.ts
-------------------------------------------------------------------
>>>define("file3", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.z = void 0;
>>>    exports.z = 30;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1->#!someshebang app file3
  >export const 
2 >    
3 >            z
4 >              = 
5 >                30
6 >                  ;
1->Emitted(20, 5) Source(2, 14) + SourceIndex(4)
2 >Emitted(20, 13) Source(2, 14) + SourceIndex(4)
3 >Emitted(20, 14) Source(2, 15) + SourceIndex(4)
4 >Emitted(20, 17) Source(2, 18) + SourceIndex(4)
5 >Emitted(20, 19) Source(2, 20) + SourceIndex(4)
6 >Emitted(20, 20) Source(2, 21) + SourceIndex(4)
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
1 >Emitted(22, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(22, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(22, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(22, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(22, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(22, 16) Source(1, 18) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/app/module.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./file3.ts",
      "./file4.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 25,
          "end": 484,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 25,
              "end": 484,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 484,
          "end": 710,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 25,
          "end": 196,
          "kind": "prepend",
          "data": "../lib/module.d.ts",
          "texts": [
            {
              "pos": 25,
              "end": 196,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 196,
          "end": 278,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/app/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/app/module.js
----------------------------------------------------------------------
prepend: (25-484):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (25-484)
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (484-710)
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;

======================================================================
======================================================================
File:: /src/app/module.d.ts
----------------------------------------------------------------------
prepend: (25-196):: ../lib/module.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (25-196)
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

----------------------------------------------------------------------
text: (196-278)
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;

======================================================================

//// [/src/lib/module.d.ts]
#!someshebang lib file0
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;
//# sourceMappingURL=module.d.ts.map

//// [/src/lib/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC"}

//// [/src/lib/module.d.ts.map.baseline.txt]
===================================================================
JsFile: module.d.ts
mapUrl: module.d.ts.map
sourceRoot: 
sources: file0.ts,file1.ts,file2.ts,global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/lib/module.d.ts
sourceFile:file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>declare const myGlob = 20;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^
5 >                    ^^^^^
6 >                         ^
1 >#!someshebang lib file0
  >
2 >
3 >        const 
4 >              myGlob
5 >                     = 20
6 >                         ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 1) + SourceIndex(0)
3 >Emitted(2, 15) Source(2, 7) + SourceIndex(0)
4 >Emitted(2, 21) Source(2, 13) + SourceIndex(0)
5 >Emitted(2, 26) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 27) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.d.ts
sourceFile:file1.ts
-------------------------------------------------------------------
>>>declare module "file1" {
>>>    export const x = 10;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1 >#!someshebang lib file1
  >
2 >    export
3 >           
4 >           const 
5 >                 x
6 >                   = 10
7 >                       ;
1 >Emitted(4, 5) Source(2, 1) + SourceIndex(1)
2 >Emitted(4, 11) Source(2, 7) + SourceIndex(1)
3 >Emitted(4, 12) Source(2, 8) + SourceIndex(1)
4 >Emitted(4, 18) Source(2, 14) + SourceIndex(1)
5 >Emitted(4, 19) Source(2, 15) + SourceIndex(1)
6 >Emitted(4, 24) Source(2, 20) + SourceIndex(1)
7 >Emitted(4, 25) Source(2, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.d.ts
sourceFile:file2.ts
-------------------------------------------------------------------
>>>}
>>>declare module "file2" {
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
1 >Emitted(7, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(7, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(7, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(7, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(7, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(7, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(7, 25) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.d.ts
sourceFile:global.ts
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
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(9, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(9, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(9, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(9, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(9, 32) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/lib/module.js]
#!someshebang lib file0
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
//# sourceMappingURL=module.js.map

//// [/src/lib/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICDP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

//// [/src/lib/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: file0.ts,file1.ts,file2.ts,global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >#!someshebang lib file0
  >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(2, 7) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 13) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 16) + SourceIndex(0)
5 >Emitted(2, 16) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 17) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file1.ts
-------------------------------------------------------------------
>>>define("file1", ["require", "exports"], function (require, exports) {
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
1->#!someshebang lib file1
  >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(7, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(7, 13) Source(2, 14) + SourceIndex(1)
3 >Emitted(7, 14) Source(2, 15) + SourceIndex(1)
4 >Emitted(7, 17) Source(2, 18) + SourceIndex(1)
5 >Emitted(7, 19) Source(2, 20) + SourceIndex(1)
6 >Emitted(7, 20) Source(2, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
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
1 >Emitted(13, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(13, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(13, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(13, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(13, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(13, 20) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:global.ts
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
1 >Emitted(15, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(15, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(15, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(15, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(15, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(15, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./file0.ts",
      "./file1.ts",
      "./file2.ts",
      "./global.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 25,
          "end": 484,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 25,
          "end": 196,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
text: (25-484)
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

======================================================================
======================================================================
File:: /src/lib/module.d.ts
----------------------------------------------------------------------
text: (25-196)
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

======================================================================

