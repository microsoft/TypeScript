Input::
//// [/src/lib/file1.ts]
export const x = 10;console.log(x);



Output::
/lib/tsc --b /src/app --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/lib/tsconfig.json' is out of date because oldest output 'src/lib/module.js' is older than newest input 'src/lib/file1.ts'

[[90m12:04:00 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:04:00 AM[0m] Project 'src/app/tsconfig.json' is out of date because output of its dependency 'src/lib' has changed

[[90m12:04:00 AM[0m] Updating output of project '/src/app/tsconfig.json'...

[[90m12:04:00 AM[0m] Updating unchanged output timestamps of project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/app/module.js]
"use strict";
"myPrologue";
"myPrologue3";
"myPrologue2";
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    "myPrologueFile";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    "myPrologue";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;
//# sourceMappingURL=module.js.map

//// [/src/app/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/global.ts","file4.ts","../lib/file1.ts","../lib/file2.ts","file3.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAA;ACAb,aAAa,CAAC;AFCd,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;IGDL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;ICAnC,gBAAgB,CAAA;;;IACH,QAAA,CAAC,GAAG,EAAE,CAAC;;AHApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;IIDvB,YAAY,CAAA;;;IACC,QAAA,CAAC,GAAG,EAAE,CAAC;;AHApB,IAAM,KAAK,GAAG,EAAE,CAAC"}

//// [/src/app/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: ../lib/file0.ts,../lib/global.ts,file4.ts,../lib/file1.ts,../lib/file2.ts,file3.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file0.ts
-------------------------------------------------------------------
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/global.ts
-------------------------------------------------------------------
>>>"myPrologue3";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^->
1->
2 >"myPrologue3"
3 >             
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
3 >Emitted(3, 15) Source(1, 14) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file4.ts
-------------------------------------------------------------------
>>>"myPrologue2";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^->
1->
2 >"myPrologue2"
3 >             ;
1->Emitted(4, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(4, 14) Source(1, 14) + SourceIndex(2)
3 >Emitted(4, 15) Source(1, 15) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file0.ts
-------------------------------------------------------------------
>>>var myGlob = 20;
1->
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->"myPrologue"
  >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1->Emitted(5, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(5, 5) Source(2, 7) + SourceIndex(0)
3 >Emitted(5, 11) Source(2, 13) + SourceIndex(0)
4 >Emitted(5, 14) Source(2, 16) + SourceIndex(0)
5 >Emitted(5, 16) Source(2, 18) + SourceIndex(0)
6 >Emitted(5, 17) Source(2, 19) + SourceIndex(0)
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
7 >                   ^^^^^^^^^->
1->export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(10, 5) Source(1, 14) + SourceIndex(3)
2 >Emitted(10, 13) Source(1, 14) + SourceIndex(3)
3 >Emitted(10, 14) Source(1, 15) + SourceIndex(3)
4 >Emitted(10, 17) Source(1, 18) + SourceIndex(3)
5 >Emitted(10, 19) Source(1, 20) + SourceIndex(3)
6 >Emitted(10, 20) Source(1, 21) + SourceIndex(3)
---
>>>    console.log(exports.x);
1->^^^^
2 >    ^^^^^^^
3 >           ^
4 >            ^^^
5 >               ^
6 >                ^^^^^^^^^
7 >                         ^
8 >                          ^
1->
2 >    console
3 >           .
4 >            log
5 >               (
6 >                x
7 >                         )
8 >                          ;
1->Emitted(11, 5) Source(1, 21) + SourceIndex(3)
2 >Emitted(11, 12) Source(1, 28) + SourceIndex(3)
3 >Emitted(11, 13) Source(1, 29) + SourceIndex(3)
4 >Emitted(11, 16) Source(1, 32) + SourceIndex(3)
5 >Emitted(11, 17) Source(1, 33) + SourceIndex(3)
6 >Emitted(11, 26) Source(1, 34) + SourceIndex(3)
7 >Emitted(11, 27) Source(1, 35) + SourceIndex(3)
8 >Emitted(11, 28) Source(1, 36) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    "myPrologueFile";
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
3 >                    ^
4 >                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    "myPrologueFile"
3 >                    
1 >Emitted(15, 5) Source(1, 1) + SourceIndex(4)
2 >Emitted(15, 21) Source(1, 17) + SourceIndex(4)
3 >Emitted(15, 22) Source(1, 17) + SourceIndex(4)
---
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.y = void 0;
>>>    exports.y = 20;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1->
  >export const 
2 >    
3 >            y
4 >              = 
5 >                20
6 >                  ;
1->Emitted(18, 5) Source(2, 14) + SourceIndex(4)
2 >Emitted(18, 13) Source(2, 14) + SourceIndex(4)
3 >Emitted(18, 14) Source(2, 15) + SourceIndex(4)
4 >Emitted(18, 17) Source(2, 18) + SourceIndex(4)
5 >Emitted(18, 19) Source(2, 20) + SourceIndex(4)
6 >Emitted(18, 20) Source(2, 21) + SourceIndex(4)
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
1 >"myPrologue3"
  >
2 >const 
3 >    globalConst
4 >                = 
5 >                  10
6 >                    ;
1 >Emitted(20, 1) Source(2, 1) + SourceIndex(1)
2 >Emitted(20, 5) Source(2, 7) + SourceIndex(1)
3 >Emitted(20, 16) Source(2, 18) + SourceIndex(1)
4 >Emitted(20, 19) Source(2, 21) + SourceIndex(1)
5 >Emitted(20, 21) Source(2, 23) + SourceIndex(1)
6 >Emitted(20, 22) Source(2, 24) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file3.ts
-------------------------------------------------------------------
>>>define("file3", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    "myPrologue";
1->^^^^
2 >    ^^^^^^^^^^^^
3 >                ^
4 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    "myPrologue"
3 >                
1->Emitted(23, 5) Source(1, 1) + SourceIndex(5)
2 >Emitted(23, 17) Source(1, 13) + SourceIndex(5)
3 >Emitted(23, 18) Source(1, 13) + SourceIndex(5)
---
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.z = void 0;
>>>    exports.z = 30;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1->
  >export const 
2 >    
3 >            z
4 >              = 
5 >                30
6 >                  ;
1->Emitted(26, 5) Source(2, 14) + SourceIndex(5)
2 >Emitted(26, 13) Source(2, 14) + SourceIndex(5)
3 >Emitted(26, 14) Source(2, 15) + SourceIndex(5)
4 >Emitted(26, 17) Source(2, 18) + SourceIndex(5)
5 >Emitted(26, 19) Source(2, 20) + SourceIndex(5)
6 >Emitted(26, 20) Source(2, 21) + SourceIndex(5)
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
1 >"myPrologue2";
  >
2 >const 
3 >    myVar
4 >          = 
5 >            30
6 >              ;
1 >Emitted(28, 1) Source(2, 1) + SourceIndex(2)
2 >Emitted(28, 5) Source(2, 7) + SourceIndex(2)
3 >Emitted(28, 10) Source(2, 12) + SourceIndex(2)
4 >Emitted(28, 13) Source(2, 15) + SourceIndex(2)
5 >Emitted(28, 15) Source(2, 17) + SourceIndex(2)
6 >Emitted(28, 16) Source(2, 18) + SourceIndex(2)
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
          "pos": 0,
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 44,
          "kind": "prologue",
          "data": "myPrologue3"
        },
        {
          "pos": 46,
          "end": 60,
          "kind": "prologue",
          "data": "myPrologue2"
        },
        {
          "pos": 62,
          "end": 573,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 62,
              "end": 573,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 573,
          "end": 818,
          "kind": "text"
        }
      ],
      "sources": {
        "prologues": [
          {
            "file": 1,
            "text": "\"myPrologue2\";",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 14,
                "expression": {
                  "pos": 0,
                  "end": 13,
                  "text": "myPrologue2"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 171,
          "kind": "prepend",
          "data": "../lib/module.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 171,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 171,
          "end": 253,
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
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
prologue: (30-44):: myPrologue3
"myPrologue3";
----------------------------------------------------------------------
prologue: (46-60):: myPrologue2
"myPrologue2";
----------------------------------------------------------------------
prepend: (62-573):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (62-573)
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    "myPrologueFile";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (573-818)
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    "myPrologue";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;

======================================================================
======================================================================
File:: /src/app/module.d.ts
----------------------------------------------------------------------
prepend: (0-171):: ../lib/module.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-171)
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

----------------------------------------------------------------------
text: (171-253)
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;

======================================================================

//// [/src/lib/module.d.ts] file written with same contents
//// [/src/lib/module.d.ts.map] file written with same contents
//// [/src/lib/module.d.ts.map.baseline.txt] file written with same contents
//// [/src/lib/module.js]
"use strict";
"myPrologue";
"myPrologue3";
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    "myPrologueFile";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
//# sourceMappingURL=module.js.map

//// [/src/lib/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","global.ts","file1.ts","file2.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAA;ADCb,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;IEDL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;ICAnC,gBAAgB,CAAA;;;IACH,QAAA,CAAC,GAAG,EAAE,CAAC;;AFApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

//// [/src/lib/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: file0.ts,global.ts,file1.ts,file2.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file0.ts
-------------------------------------------------------------------
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:global.ts
-------------------------------------------------------------------
>>>"myPrologue3";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^->
1->
2 >"myPrologue3"
3 >             
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
3 >Emitted(3, 15) Source(1, 14) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file0.ts
-------------------------------------------------------------------
>>>var myGlob = 20;
1->
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->"myPrologue"
  >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1->Emitted(4, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(4, 5) Source(2, 7) + SourceIndex(0)
3 >Emitted(4, 11) Source(2, 13) + SourceIndex(0)
4 >Emitted(4, 14) Source(2, 16) + SourceIndex(0)
5 >Emitted(4, 16) Source(2, 18) + SourceIndex(0)
6 >Emitted(4, 17) Source(2, 19) + SourceIndex(0)
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
7 >                   ^^^^^^^^^->
1->export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(9, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(9, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(9, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(9, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(9, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(9, 20) Source(1, 21) + SourceIndex(2)
---
>>>    console.log(exports.x);
1->^^^^
2 >    ^^^^^^^
3 >           ^
4 >            ^^^
5 >               ^
6 >                ^^^^^^^^^
7 >                         ^
8 >                          ^
1->
2 >    console
3 >           .
4 >            log
5 >               (
6 >                x
7 >                         )
8 >                          ;
1->Emitted(10, 5) Source(1, 21) + SourceIndex(2)
2 >Emitted(10, 12) Source(1, 28) + SourceIndex(2)
3 >Emitted(10, 13) Source(1, 29) + SourceIndex(2)
4 >Emitted(10, 16) Source(1, 32) + SourceIndex(2)
5 >Emitted(10, 17) Source(1, 33) + SourceIndex(2)
6 >Emitted(10, 26) Source(1, 34) + SourceIndex(2)
7 >Emitted(10, 27) Source(1, 35) + SourceIndex(2)
8 >Emitted(10, 28) Source(1, 36) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    "myPrologueFile";
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
3 >                    ^
4 >                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    "myPrologueFile"
3 >                    
1 >Emitted(14, 5) Source(1, 1) + SourceIndex(3)
2 >Emitted(14, 21) Source(1, 17) + SourceIndex(3)
3 >Emitted(14, 22) Source(1, 17) + SourceIndex(3)
---
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.y = void 0;
>>>    exports.y = 20;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1->
  >export const 
2 >    
3 >            y
4 >              = 
5 >                20
6 >                  ;
1->Emitted(17, 5) Source(2, 14) + SourceIndex(3)
2 >Emitted(17, 13) Source(2, 14) + SourceIndex(3)
3 >Emitted(17, 14) Source(2, 15) + SourceIndex(3)
4 >Emitted(17, 17) Source(2, 18) + SourceIndex(3)
5 >Emitted(17, 19) Source(2, 20) + SourceIndex(3)
6 >Emitted(17, 20) Source(2, 21) + SourceIndex(3)
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
1 >"myPrologue3"
  >
2 >const 
3 >    globalConst
4 >                = 
5 >                  10
6 >                    ;
1 >Emitted(19, 1) Source(2, 1) + SourceIndex(1)
2 >Emitted(19, 5) Source(2, 7) + SourceIndex(1)
3 >Emitted(19, 16) Source(2, 18) + SourceIndex(1)
4 >Emitted(19, 19) Source(2, 21) + SourceIndex(1)
5 >Emitted(19, 21) Source(2, 23) + SourceIndex(1)
6 >Emitted(19, 22) Source(2, 24) + SourceIndex(1)
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
          "pos": 0,
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 44,
          "kind": "prologue",
          "data": "myPrologue3"
        },
        {
          "pos": 46,
          "end": 557,
          "kind": "text"
        }
      ],
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue\"",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 12,
                "expression": {
                  "pos": 0,
                  "end": 12,
                  "text": "myPrologue"
                }
              }
            ]
          },
          {
            "file": 3,
            "text": "\"myPrologue3\"",
            "directives": [
              {
                "pos": 0,
                "end": 13,
                "expression": {
                  "pos": 0,
                  "end": 13,
                  "text": "myPrologue3"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 171,
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
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
prologue: (30-44):: myPrologue3
"myPrologue3";
----------------------------------------------------------------------
text: (46-557)
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    "myPrologueFile";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

======================================================================
======================================================================
File:: /src/lib/module.d.ts
----------------------------------------------------------------------
text: (0-171)
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

======================================================================

