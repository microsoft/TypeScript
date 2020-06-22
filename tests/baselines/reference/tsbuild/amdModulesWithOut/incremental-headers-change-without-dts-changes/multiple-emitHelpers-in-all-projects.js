Input::
//// [/src/lib/file1.ts]
export const x = 10;function forlibfile1Rest() { }



Output::
/lib/tsc --b /src/app --verbose
[[90m12:08:00 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:08:00 AM[0m] Project 'src/lib/tsconfig.json' is out of date because oldest output 'src/lib/module.js' is older than newest input 'src/lib/file1.ts'

[[90m12:08:00 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:08:00 AM[0m] Project 'src/app/tsconfig.json' is out of date because output of its dependency 'src/lib' has changed

[[90m12:08:00 AM[0m] Updating output of project '/src/app/tsconfig.json'...

[[90m12:08:00 AM[0m] Updating unchanged output timestamps of project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/app/module.js]
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var myGlob = 20;
function libfile0Spread() { }
libfile0Spread.apply(void 0, __spread([10, 20, 30]));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() { }
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
    function forappfile3Rest() {
        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
    }
});
var myVar = 30;
function appfile4Spread() { }
appfile4Spread.apply(void 0, __spread([10, 20, 30]));
//# sourceMappingURL=module.js.map

//// [/src/app/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc,KAAmB,CAAC;AAC3C,cAAc,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;;;;;ICFnB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe,KAAK,CAAC;;;;;;ICArC,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICAV,QAAA,CAAC,GAAG,EAAE,CAAC;IACM,SAAS,eAAe;QAClD,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;;ACHD,IAAM,KAAK,GAAG,EAAE,CAAC;AACjB,SAAS,cAAc,KAAmB,CAAC;AAC3C,cAAc,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
>>>var __read = (this && this.__read) || function (o, n) {
>>>    var m = typeof Symbol === "function" && o[Symbol.iterator];
>>>    if (!m) return o;
>>>    var i = m.call(o), r, ar = [], e;
>>>    try {
>>>        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
>>>    }
>>>    catch (error) { e = { error: error }; }
>>>    finally {
>>>        try {
>>>            if (r && !r.done && (m = i["return"])) m.call(i);
>>>        }
>>>        finally { if (e) throw e.error; }
>>>    }
>>>    return ar;
>>>};
>>>var __spread = (this && this.__spread) || function () {
>>>    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
>>>    return ar;
>>>};
>>>var __rest = (this && this.__rest) || function (s, e) {
>>>    var t = {};
>>>    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
>>>        t[p] = s[p];
>>>    if (s != null && typeof Object.getOwnPropertySymbols === "function")
>>>        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
>>>            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
>>>                t[p[i]] = s[p[i]];
>>>        }
>>>    return t;
>>>};
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(32, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(32, 5) Source(1, 7) + SourceIndex(0)
3 >Emitted(32, 11) Source(1, 13) + SourceIndex(0)
4 >Emitted(32, 14) Source(1, 16) + SourceIndex(0)
5 >Emitted(32, 16) Source(1, 18) + SourceIndex(0)
6 >Emitted(32, 17) Source(1, 19) + SourceIndex(0)
---
>>>function libfile0Spread() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^
4 >                       ^^^^^
5 >                            ^
6 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         libfile0Spread
4 >                       (...b: number[]) { 
5 >                            }
1->Emitted(33, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(33, 10) Source(2, 10) + SourceIndex(0)
3 >Emitted(33, 24) Source(2, 24) + SourceIndex(0)
4 >Emitted(33, 29) Source(2, 43) + SourceIndex(0)
5 >Emitted(33, 30) Source(2, 44) + SourceIndex(0)
---
>>>libfile0Spread.apply(void 0, __spread([10, 20, 30]));
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                      ^
5 >                                       ^^
6 >                                         ^^
7 >                                           ^^
8 >                                             ^^
9 >                                               ^^
10>                                                 ^
11>                                                  ^^^
12>                                                     ^^^^^^^^^^^^^^^^^->
1->
  >
2 >libfile0Spread
3 >              (...
4 >                                      [
5 >                                       10
6 >                                         , 
7 >                                           20
8 >                                             , 
9 >                                               30
10>                                                 ]
11>                                                  );
1->Emitted(34, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(34, 15) Source(3, 15) + SourceIndex(0)
3 >Emitted(34, 39) Source(3, 19) + SourceIndex(0)
4 >Emitted(34, 40) Source(3, 20) + SourceIndex(0)
5 >Emitted(34, 42) Source(3, 22) + SourceIndex(0)
6 >Emitted(34, 44) Source(3, 24) + SourceIndex(0)
7 >Emitted(34, 46) Source(3, 26) + SourceIndex(0)
8 >Emitted(34, 48) Source(3, 28) + SourceIndex(0)
9 >Emitted(34, 50) Source(3, 30) + SourceIndex(0)
10>Emitted(34, 51) Source(3, 31) + SourceIndex(0)
11>Emitted(34, 54) Source(3, 33) + SourceIndex(0)
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
7 >                   ^^^^^^^^^^^^^^^^->
1->export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(39, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(39, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(39, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(39, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(39, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(39, 20) Source(1, 21) + SourceIndex(1)
---
>>>    function forlibfile1Rest() { }
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^^^^^^^^^^^^
4 >                            ^^^^^
5 >                                 ^
1->
2 >    function 
3 >             forlibfile1Rest
4 >                            () { 
5 >                                 }
1->Emitted(40, 5) Source(1, 21) + SourceIndex(1)
2 >Emitted(40, 14) Source(1, 30) + SourceIndex(1)
3 >Emitted(40, 29) Source(1, 45) + SourceIndex(1)
4 >Emitted(40, 34) Source(1, 50) + SourceIndex(1)
5 >Emitted(40, 35) Source(1, 51) + SourceIndex(1)
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
1 >Emitted(46, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(46, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(46, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(46, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(46, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(46, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(48, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(48, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(48, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(48, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(48, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(48, 22) Source(1, 24) + SourceIndex(3)
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
7 >                   ^^^^^^^^^^^^^^->
1->export const 
2 >    
3 >            z
4 >              = 
5 >                30
6 >                  ;
1->Emitted(53, 5) Source(1, 14) + SourceIndex(4)
2 >Emitted(53, 13) Source(1, 14) + SourceIndex(4)
3 >Emitted(53, 14) Source(1, 15) + SourceIndex(4)
4 >Emitted(53, 17) Source(1, 18) + SourceIndex(4)
5 >Emitted(53, 19) Source(1, 20) + SourceIndex(4)
6 >Emitted(53, 20) Source(1, 21) + SourceIndex(4)
---
>>>    function forappfile3Rest() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^^^^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >import { x } from "file1";
2 >    function 
3 >             forappfile3Rest
1->Emitted(54, 5) Source(2, 27) + SourceIndex(4)
2 >Emitted(54, 14) Source(2, 36) + SourceIndex(4)
3 >Emitted(54, 29) Source(2, 51) + SourceIndex(4)
---
>>>        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^^^^^
2 >        ^^^^
3 >            ^^^^^
4 >                 ^^
5 >                   ^
6 >                    ^^
7 >                      ^^
8 >                        ^^
9 >                          ^
10>                           ^^
11>                             ^^
12>                               ^^
13>                                 ^^
14>                                   ^^
15>                                     ^^
16>                                       ^^
17>                                         ^^
18>                                           ^
19>                                            ^^^^^^^
20>                                                   ^^
21>                                                     ^^^^
22>                                                         ^^^^^^^^^^^^^^
23>                                                                       ^^^^^
24>                                                                            ^
25>                                                                             ^
1->() {
  >
2 >        const 
3 >            { b, ...rest } = 
4 >                 { 
5 >                   a
6 >                    : 
7 >                      10
8 >                        , 
9 >                          b
10>                           : 
11>                             30
12>                               , 
13>                                 yy
14>                                   : 
15>                                     30
16>                                        }
17>                                         
18>                                           b
19>                                            
20>                                                   , ...
21>                                                     rest
22>                                                         
23>                                                                       { b, ...rest }
24>                                                                             = { a: 10, b: 30, yy: 30 }
25>                                                                             ;
1->Emitted(55, 9) Source(3, 1) + SourceIndex(4)
2 >Emitted(55, 13) Source(3, 7) + SourceIndex(4)
3 >Emitted(55, 18) Source(3, 24) + SourceIndex(4)
4 >Emitted(55, 20) Source(3, 26) + SourceIndex(4)
5 >Emitted(55, 21) Source(3, 27) + SourceIndex(4)
6 >Emitted(55, 23) Source(3, 29) + SourceIndex(4)
7 >Emitted(55, 25) Source(3, 31) + SourceIndex(4)
8 >Emitted(55, 27) Source(3, 33) + SourceIndex(4)
9 >Emitted(55, 28) Source(3, 34) + SourceIndex(4)
10>Emitted(55, 30) Source(3, 36) + SourceIndex(4)
11>Emitted(55, 32) Source(3, 38) + SourceIndex(4)
12>Emitted(55, 34) Source(3, 40) + SourceIndex(4)
13>Emitted(55, 36) Source(3, 42) + SourceIndex(4)
14>Emitted(55, 38) Source(3, 44) + SourceIndex(4)
15>Emitted(55, 40) Source(3, 46) + SourceIndex(4)
16>Emitted(55, 42) Source(3, 48) + SourceIndex(4)
17>Emitted(55, 44) Source(3, 9) + SourceIndex(4)
18>Emitted(55, 45) Source(3, 10) + SourceIndex(4)
19>Emitted(55, 52) Source(3, 10) + SourceIndex(4)
20>Emitted(55, 54) Source(3, 15) + SourceIndex(4)
21>Emitted(55, 58) Source(3, 19) + SourceIndex(4)
22>Emitted(55, 72) Source(3, 7) + SourceIndex(4)
23>Emitted(55, 77) Source(3, 21) + SourceIndex(4)
24>Emitted(55, 78) Source(3, 48) + SourceIndex(4)
25>Emitted(55, 79) Source(3, 49) + SourceIndex(4)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >
2 >    }
1 >Emitted(56, 5) Source(4, 1) + SourceIndex(4)
2 >Emitted(56, 6) Source(4, 2) + SourceIndex(4)
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
7 >               ^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myVar
4 >          = 
5 >            30
6 >              ;
1 >Emitted(58, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(58, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(58, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(58, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(58, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(58, 16) Source(1, 18) + SourceIndex(5)
---
>>>function appfile4Spread() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^
4 >                       ^^^^^
5 >                            ^
6 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         appfile4Spread
4 >                       (...b: number[]) { 
5 >                            }
1->Emitted(59, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(59, 10) Source(2, 10) + SourceIndex(5)
3 >Emitted(59, 24) Source(2, 24) + SourceIndex(5)
4 >Emitted(59, 29) Source(2, 43) + SourceIndex(5)
5 >Emitted(59, 30) Source(2, 44) + SourceIndex(5)
---
>>>appfile4Spread.apply(void 0, __spread([10, 20, 30]));
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                      ^
5 >                                       ^^
6 >                                         ^^
7 >                                           ^^
8 >                                             ^^
9 >                                               ^^
10>                                                 ^
11>                                                  ^^^
1->
  >
2 >appfile4Spread
3 >              (...
4 >                                      [
5 >                                       10
6 >                                         , 
7 >                                           20
8 >                                             , 
9 >                                               30
10>                                                 ]
11>                                                  );
1->Emitted(60, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(60, 15) Source(3, 15) + SourceIndex(5)
3 >Emitted(60, 39) Source(3, 19) + SourceIndex(5)
4 >Emitted(60, 40) Source(3, 20) + SourceIndex(5)
5 >Emitted(60, 42) Source(3, 22) + SourceIndex(5)
6 >Emitted(60, 44) Source(3, 24) + SourceIndex(5)
7 >Emitted(60, 46) Source(3, 26) + SourceIndex(5)
8 >Emitted(60, 48) Source(3, 28) + SourceIndex(5)
9 >Emitted(60, 50) Source(3, 30) + SourceIndex(5)
10>Emitted(60, 51) Source(3, 31) + SourceIndex(5)
11>Emitted(60, 54) Source(3, 33) + SourceIndex(5)
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
          "end": 504,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 506,
          "end": 676,
          "kind": "emitHelpers",
          "data": "typescript:spread"
        },
        {
          "pos": 678,
          "end": 1178,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 1180,
          "end": 1761,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 1180,
              "end": 1761,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1761,
          "end": 2194,
          "kind": "text"
        }
      ],
      "sources": {
        "helpers": [
          "typescript:rest",
          "typescript:read",
          "typescript:spread"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 227,
          "kind": "prepend",
          "data": "../lib/module.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 227,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 227,
          "end": 365,
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
emitHelpers: (0-504):: typescript:read
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
----------------------------------------------------------------------
emitHelpers: (506-676):: typescript:spread
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
----------------------------------------------------------------------
emitHelpers: (678-1178):: typescript:rest
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
----------------------------------------------------------------------
prepend: (1180-1761):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (1180-1761)
var myGlob = 20;
function libfile0Spread() { }
libfile0Spread.apply(void 0, __spread([10, 20, 30]));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() { }
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (1761-2194)
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
    function forappfile3Rest() {
        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
    }
});
var myVar = 30;
function appfile4Spread() { }
appfile4Spread.apply(void 0, __spread([10, 20, 30]));

======================================================================
======================================================================
File:: /src/app/module.d.ts
----------------------------------------------------------------------
prepend: (0-227):: ../lib/module.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-227)
declare const myGlob = 20;
declare function libfile0Spread(...b: number[]): void;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

----------------------------------------------------------------------
text: (227-365)
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;
declare function appfile4Spread(...b: number[]): void;

======================================================================

//// [/src/lib/module.d.ts] file written with same contents
//// [/src/lib/module.d.ts.map] file written with same contents
//// [/src/lib/module.d.ts.map.baseline.txt] file written with same contents
//// [/src/lib/module.js]
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var myGlob = 20;
function libfile0Spread() { }
libfile0Spread.apply(void 0, __spread([10, 20, 30]));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() { }
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc,KAAmB,CAAC;AAC3C,cAAc,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;;;;;ICFnB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe,KAAK,CAAC;;;;;;ICArC,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

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
>>>var __read = (this && this.__read) || function (o, n) {
>>>    var m = typeof Symbol === "function" && o[Symbol.iterator];
>>>    if (!m) return o;
>>>    var i = m.call(o), r, ar = [], e;
>>>    try {
>>>        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
>>>    }
>>>    catch (error) { e = { error: error }; }
>>>    finally {
>>>        try {
>>>            if (r && !r.done && (m = i["return"])) m.call(i);
>>>        }
>>>        finally { if (e) throw e.error; }
>>>    }
>>>    return ar;
>>>};
>>>var __spread = (this && this.__spread) || function () {
>>>    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
>>>    return ar;
>>>};
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(21, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(21, 5) Source(1, 7) + SourceIndex(0)
3 >Emitted(21, 11) Source(1, 13) + SourceIndex(0)
4 >Emitted(21, 14) Source(1, 16) + SourceIndex(0)
5 >Emitted(21, 16) Source(1, 18) + SourceIndex(0)
6 >Emitted(21, 17) Source(1, 19) + SourceIndex(0)
---
>>>function libfile0Spread() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^
4 >                       ^^^^^
5 >                            ^
6 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         libfile0Spread
4 >                       (...b: number[]) { 
5 >                            }
1->Emitted(22, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(22, 10) Source(2, 10) + SourceIndex(0)
3 >Emitted(22, 24) Source(2, 24) + SourceIndex(0)
4 >Emitted(22, 29) Source(2, 43) + SourceIndex(0)
5 >Emitted(22, 30) Source(2, 44) + SourceIndex(0)
---
>>>libfile0Spread.apply(void 0, __spread([10, 20, 30]));
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                      ^
5 >                                       ^^
6 >                                         ^^
7 >                                           ^^
8 >                                             ^^
9 >                                               ^^
10>                                                 ^
11>                                                  ^^^
12>                                                     ^^^^^^^^^^^^^^^^^->
1->
  >
2 >libfile0Spread
3 >              (...
4 >                                      [
5 >                                       10
6 >                                         , 
7 >                                           20
8 >                                             , 
9 >                                               30
10>                                                 ]
11>                                                  );
1->Emitted(23, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(23, 15) Source(3, 15) + SourceIndex(0)
3 >Emitted(23, 39) Source(3, 19) + SourceIndex(0)
4 >Emitted(23, 40) Source(3, 20) + SourceIndex(0)
5 >Emitted(23, 42) Source(3, 22) + SourceIndex(0)
6 >Emitted(23, 44) Source(3, 24) + SourceIndex(0)
7 >Emitted(23, 46) Source(3, 26) + SourceIndex(0)
8 >Emitted(23, 48) Source(3, 28) + SourceIndex(0)
9 >Emitted(23, 50) Source(3, 30) + SourceIndex(0)
10>Emitted(23, 51) Source(3, 31) + SourceIndex(0)
11>Emitted(23, 54) Source(3, 33) + SourceIndex(0)
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
7 >                   ^^^^^^^^^^^^^^^^->
1->export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(28, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(28, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(28, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(28, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(28, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(28, 20) Source(1, 21) + SourceIndex(1)
---
>>>    function forlibfile1Rest() { }
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^^^^^^^^^^^^
4 >                            ^^^^^
5 >                                 ^
1->
2 >    function 
3 >             forlibfile1Rest
4 >                            () { 
5 >                                 }
1->Emitted(29, 5) Source(1, 21) + SourceIndex(1)
2 >Emitted(29, 14) Source(1, 30) + SourceIndex(1)
3 >Emitted(29, 29) Source(1, 45) + SourceIndex(1)
4 >Emitted(29, 34) Source(1, 50) + SourceIndex(1)
5 >Emitted(29, 35) Source(1, 51) + SourceIndex(1)
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
1 >Emitted(35, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(35, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(35, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(35, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(35, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(35, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(37, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(37, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(37, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(37, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(37, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(37, 22) Source(1, 24) + SourceIndex(3)
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
          "end": 504,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 506,
          "end": 676,
          "kind": "emitHelpers",
          "data": "typescript:spread"
        },
        {
          "pos": 678,
          "end": 1259,
          "kind": "text"
        }
      ],
      "sources": {
        "helpers": [
          "typescript:read",
          "typescript:spread"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 227,
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
emitHelpers: (0-504):: typescript:read
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
----------------------------------------------------------------------
emitHelpers: (506-676):: typescript:spread
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
----------------------------------------------------------------------
text: (678-1259)
var myGlob = 20;
function libfile0Spread() { }
libfile0Spread.apply(void 0, __spread([10, 20, 30]));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() { }
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
text: (0-227)
declare const myGlob = 20;
declare function libfile0Spread(...b: number[]): void;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

======================================================================

