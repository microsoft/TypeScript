Input::
//// [/src/lib/file1.ts]
#!someshebang lib file1
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
#!someshebang lib file0
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICDtB,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICCV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACDpB,IAAM,KAAK,GAAG,EAAE,CAAC"}

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
7 >                   ^^^^^^^^^->
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
1->Emitted(8, 5) Source(2, 21) + SourceIndex(1)
2 >Emitted(8, 12) Source(2, 28) + SourceIndex(1)
3 >Emitted(8, 13) Source(2, 29) + SourceIndex(1)
4 >Emitted(8, 16) Source(2, 32) + SourceIndex(1)
5 >Emitted(8, 17) Source(2, 33) + SourceIndex(1)
6 >Emitted(8, 26) Source(2, 34) + SourceIndex(1)
7 >Emitted(8, 27) Source(2, 35) + SourceIndex(1)
8 >Emitted(8, 28) Source(2, 36) + SourceIndex(1)
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
1 >Emitted(14, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(14, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(14, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(14, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(14, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(14, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(16, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(16, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(16, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(16, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(16, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(16, 22) Source(1, 24) + SourceIndex(3)
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
1->Emitted(21, 5) Source(2, 14) + SourceIndex(4)
2 >Emitted(21, 13) Source(2, 14) + SourceIndex(4)
3 >Emitted(21, 14) Source(2, 15) + SourceIndex(4)
4 >Emitted(21, 17) Source(2, 18) + SourceIndex(4)
5 >Emitted(21, 19) Source(2, 20) + SourceIndex(4)
6 >Emitted(21, 20) Source(2, 21) + SourceIndex(4)
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
1 >Emitted(23, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(23, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(23, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(23, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(23, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(23, 16) Source(1, 18) + SourceIndex(5)
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
          "end": 513,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 25,
              "end": 513,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 513,
          "end": 739,
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
prepend: (25-513):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (25-513)
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (513-739)
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

//// [/src/lib/module.d.ts] file written with same contents
//// [/src/lib/module.d.ts.map] file written with same contents
//// [/src/lib/module.d.ts.map.baseline.txt] file written with same contents
//// [/src/lib/module.js]
#!someshebang lib file0
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
//# sourceMappingURL=module.js.map

//// [/src/lib/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICDtB,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

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
7 >                   ^^^^^^^^^->
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
1->Emitted(8, 5) Source(2, 21) + SourceIndex(1)
2 >Emitted(8, 12) Source(2, 28) + SourceIndex(1)
3 >Emitted(8, 13) Source(2, 29) + SourceIndex(1)
4 >Emitted(8, 16) Source(2, 32) + SourceIndex(1)
5 >Emitted(8, 17) Source(2, 33) + SourceIndex(1)
6 >Emitted(8, 26) Source(2, 34) + SourceIndex(1)
7 >Emitted(8, 27) Source(2, 35) + SourceIndex(1)
8 >Emitted(8, 28) Source(2, 36) + SourceIndex(1)
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
1 >Emitted(14, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(14, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(14, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(14, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(14, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(14, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(16, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(16, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(16, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(16, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(16, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(16, 22) Source(1, 24) + SourceIndex(3)
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
          "end": 513,
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
text: (25-513)
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

