Input::
//// [/src/first/first_PART1.ts]
interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
function forfirstfirst_PART1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because oldest output 'src/first/bin/first-output.js' is older than newest input 'src/first/first_PART1.ts'

[[90m12:04:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:04:00 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part1.ts' is older than oldest output 'src/2/second-output.js'

[[90m12:04:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:04:00 AM[0m] Updating output of project '/src/third/tsconfig.json'...

[[90m12:04:00 AM[0m] Updating unchanged output timestamps of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/first/bin/first-output.d.ts] file written with same contents
//// [/src/first/bin/first-output.d.ts.map] file written with same contents
//// [/src/first/bin/first-output.d.ts.map.baseline.txt] file written with same contents
//// [/src/first/bin/first-output.js]
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
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
function firstfirst_part3Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
firstfirst_part3Spread.apply(void 0, __spread([10, 20, 30]));
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

//// [/src/first/bin/first-output.js.map.baseline.txt]
===================================================================
JsFile: first-output.js
mapUrl: first-output.js.map
sourceRoot: 
sources: ../first_PART1.ts,../first_part2.ts,../first_part3.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_PART1.ts
-------------------------------------------------------------------
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
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(32, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(32, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(32, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(32, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(32, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(32, 24) Source(5, 26) + SourceIndex(0)
---
>>>console.log(s);
1 >
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^
8 >              ^
9 >               ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
  >interface NoJsForHereEither {
  >    none: any;
  >}
  >
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1 >Emitted(33, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(33, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(33, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(33, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(33, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(33, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(33, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(33, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
1->Emitted(34, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(34, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(34, 33) Source(12, 33) + SourceIndex(0)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^
4 >             ^^
5 >               ^
6 >                ^^
7 >                  ^^
8 >                    ^^
9 >                      ^
10>                       ^^
11>                         ^^
12>                           ^^
13>                             ^^
14>                               ^^
15>                                 ^^
16>                                   ^^
17>                                     ^^
18>                                       ^
19>                                        ^^^^^^^
20>                                               ^^
21>                                                 ^^^^
22>                                                     ^^^^^^^^^^^^^^
23>                                                                   ^^^^^
24>                                                                        ^
25>                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = 
4 >             { 
5 >               a
6 >                : 
7 >                  10
8 >                    , 
9 >                      b
10>                       : 
11>                         30
12>                           , 
13>                             yy
14>                               : 
15>                                 30
16>                                    }
17>                                     
18>                                       b
19>                                        
20>                                               , ...
21>                                                 rest
22>                                                     
23>                                                                   { b, ...rest }
24>                                                                         = { a: 10, b: 30, yy: 30 }
25>                                                                         ;
1->Emitted(35, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(35, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(35, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(35, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(35, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(35, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(35, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(35, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(35, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(35, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(35, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(35, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(35, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(35, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(35, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(35, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(35, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(35, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(35, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(35, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(35, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(35, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(35, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(35, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(35, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(36, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(36, 2) Source(14, 2) + SourceIndex(0)
---
>>>console.log(s);
1->
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^
8 >              ^
9 >               ^^^->
1->
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(37, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(37, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(37, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(37, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(37, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(37, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(37, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(37, 16) Source(14, 17) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_part2.ts
-------------------------------------------------------------------
>>>console.log(f());
1->
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^^
8 >               ^
9 >                ^
1->
2 >console
3 >       .
4 >        log
5 >           (
6 >            f
7 >             ()
8 >               )
9 >                ;
1->Emitted(38, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(38, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(38, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(38, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(38, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(38, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(38, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(38, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(38, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(39, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(39, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(39, 11) Source(1, 11) + SourceIndex(2)
---
>>>    return "JS does hoists";
1->^^^^
2 >    ^^^^^^^
3 >           ^^^^^^^^^^^^^^^^
4 >                           ^
1->() {
  >    
2 >    return 
3 >           "JS does hoists"
4 >                           ;
1->Emitted(40, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(40, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(40, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(40, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(41, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(42, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(42, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(42, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(43, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(43, 16) Source(4, 47) + SourceIndex(2)
---
>>>    for (var _i = 0; _i < arguments.length; _i++) {
1->^^^^^^^^^
2 >         ^^^^^^^^^^
3 >                   ^^
4 >                     ^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^
6 >                                            ^^^^
1->
2 >         ...b: number[]
3 >                   
4 >                     ...b: number[]
5 >                                          
6 >                                            ...b: number[]
1->Emitted(44, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(44, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(44, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(44, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(44, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(44, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(45, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(45, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(47, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(47, 2) Source(4, 52) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spread([10, 20, 30]));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                              ^
5 >                                               ^^
6 >                                                 ^^
7 >                                                   ^^
8 >                                                     ^^
9 >                                                       ^^
10>                                                         ^
11>                                                          ^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (...
4 >                                              [
5 >                                               10
6 >                                                 , 
7 >                                                   20
8 >                                                     , 
9 >                                                       30
10>                                                         ]
11>                                                          );
1->Emitted(48, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(48, 23) Source(5, 23) + SourceIndex(2)
3 >Emitted(48, 47) Source(5, 27) + SourceIndex(2)
4 >Emitted(48, 48) Source(5, 28) + SourceIndex(2)
5 >Emitted(48, 50) Source(5, 30) + SourceIndex(2)
6 >Emitted(48, 52) Source(5, 32) + SourceIndex(2)
7 >Emitted(48, 54) Source(5, 34) + SourceIndex(2)
8 >Emitted(48, 56) Source(5, 36) + SourceIndex(2)
9 >Emitted(48, 58) Source(5, 38) + SourceIndex(2)
10>Emitted(48, 59) Source(5, 39) + SourceIndex(2)
11>Emitted(48, 62) Source(5, 41) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "..",
    "sourceFiles": [
      "../first_PART1.ts",
      "../first_part2.ts",
      "../first_part3.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 500,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 502,
          "end": 1006,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 1008,
          "end": 1178,
          "kind": "emitHelpers",
          "data": "typescript:spread"
        },
        {
          "pos": 1180,
          "end": 1636,
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
          "end": 272,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
emitHelpers: (0-500):: typescript:rest
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
emitHelpers: (502-1006):: typescript:read
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
emitHelpers: (1008-1178):: typescript:spread
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
----------------------------------------------------------------------
text: (1180-1636)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
function firstfirst_part3Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
firstfirst_part3Spread.apply(void 0, __spread([10, 20, 30]));

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-272)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;
declare function firstfirst_part3Spread(...b: number[]): void;

======================================================================

//// [/src/third/thirdjs/output/third-output.js]
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
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
function firstfirst_part3Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
firstfirst_part3Spread.apply(void 0, __spread([10, 20, 30]));
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
function forsecondsecond_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
function secondsecond_part2Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
secondsecond_part2Spread.apply(void 0, __spread([10, 20, 30]));
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
function thirdthird_part1Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
thirdthird_part1Spread.apply(void 0, __spread([10, 20, 30]));
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;ACAxC,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,wBAAwB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;ACP1C,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

//// [/src/third/thirdjs/output/third-output.js.map.baseline.txt]
===================================================================
JsFile: third-output.js
mapUrl: third-output.js.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../../first/first_part2.ts,../../../first/first_part3.ts,../../../second/second_part1.ts,../../../second/second_part2.ts,../../third_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
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
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(32, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(32, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(32, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(32, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(32, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(32, 24) Source(5, 26) + SourceIndex(0)
---
>>>console.log(s);
1 >
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^
8 >              ^
9 >               ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
  >interface NoJsForHereEither {
  >    none: any;
  >}
  >
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1 >Emitted(33, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(33, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(33, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(33, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(33, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(33, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(33, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(33, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
1->Emitted(34, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(34, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(34, 33) Source(12, 33) + SourceIndex(0)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^
4 >             ^^
5 >               ^
6 >                ^^
7 >                  ^^
8 >                    ^^
9 >                      ^
10>                       ^^
11>                         ^^
12>                           ^^
13>                             ^^
14>                               ^^
15>                                 ^^
16>                                   ^^
17>                                     ^^
18>                                       ^
19>                                        ^^^^^^^
20>                                               ^^
21>                                                 ^^^^
22>                                                     ^^^^^^^^^^^^^^
23>                                                                   ^^^^^
24>                                                                        ^
25>                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = 
4 >             { 
5 >               a
6 >                : 
7 >                  10
8 >                    , 
9 >                      b
10>                       : 
11>                         30
12>                           , 
13>                             yy
14>                               : 
15>                                 30
16>                                    }
17>                                     
18>                                       b
19>                                        
20>                                               , ...
21>                                                 rest
22>                                                     
23>                                                                   { b, ...rest }
24>                                                                         = { a: 10, b: 30, yy: 30 }
25>                                                                         ;
1->Emitted(35, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(35, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(35, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(35, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(35, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(35, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(35, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(35, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(35, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(35, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(35, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(35, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(35, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(35, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(35, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(35, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(35, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(35, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(35, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(35, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(35, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(35, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(35, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(35, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(35, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(36, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(36, 2) Source(14, 2) + SourceIndex(0)
---
>>>console.log(s);
1->
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^
8 >              ^
9 >               ^^^->
1->
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(37, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(37, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(37, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(37, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(37, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(37, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(37, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(37, 16) Source(14, 17) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_part2.ts
-------------------------------------------------------------------
>>>console.log(f());
1->
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^^
8 >               ^
9 >                ^
1->
2 >console
3 >       .
4 >        log
5 >           (
6 >            f
7 >             ()
8 >               )
9 >                ;
1->Emitted(38, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(38, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(38, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(38, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(38, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(38, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(38, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(38, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(38, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(39, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(39, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(39, 11) Source(1, 11) + SourceIndex(2)
---
>>>    return "JS does hoists";
1->^^^^
2 >    ^^^^^^^
3 >           ^^^^^^^^^^^^^^^^
4 >                           ^
1->() {
  >    
2 >    return 
3 >           "JS does hoists"
4 >                           ;
1->Emitted(40, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(40, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(40, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(40, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(41, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(42, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(42, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(42, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(43, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(43, 16) Source(4, 47) + SourceIndex(2)
---
>>>    for (var _i = 0; _i < arguments.length; _i++) {
1->^^^^^^^^^
2 >         ^^^^^^^^^^
3 >                   ^^
4 >                     ^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^
6 >                                            ^^^^
1->
2 >         ...b: number[]
3 >                   
4 >                     ...b: number[]
5 >                                          
6 >                                            ...b: number[]
1->Emitted(44, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(44, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(44, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(44, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(44, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(44, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(45, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(45, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(47, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(47, 2) Source(4, 52) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spread([10, 20, 30]));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                              ^
5 >                                               ^^
6 >                                                 ^^
7 >                                                   ^^
8 >                                                     ^^
9 >                                                       ^^
10>                                                         ^
11>                                                          ^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (...
4 >                                              [
5 >                                               10
6 >                                                 , 
7 >                                                   20
8 >                                                     , 
9 >                                                       30
10>                                                         ]
11>                                                          );
1->Emitted(48, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(48, 23) Source(5, 23) + SourceIndex(2)
3 >Emitted(48, 47) Source(5, 27) + SourceIndex(2)
4 >Emitted(48, 48) Source(5, 28) + SourceIndex(2)
5 >Emitted(48, 50) Source(5, 30) + SourceIndex(2)
6 >Emitted(48, 52) Source(5, 32) + SourceIndex(2)
7 >Emitted(48, 54) Source(5, 34) + SourceIndex(2)
8 >Emitted(48, 56) Source(5, 36) + SourceIndex(2)
9 >Emitted(48, 58) Source(5, 38) + SourceIndex(2)
10>Emitted(48, 59) Source(5, 39) + SourceIndex(2)
11>Emitted(48, 62) Source(5, 41) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>var N;
1 >
2 >^^^^
3 >    ^
4 >     ^
5 >      ^^^^^^^^^^->
1 >namespace N {
  >    // Comment text
  >}
  >
  >
2 >namespace 
3 >    N
4 >      {
  >         function f() {
  >             console.log('testing');
  >         }
  >     
  >         f();
  >     }
1 >Emitted(49, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(49, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(49, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(49, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(50, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(50, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(50, 13) Source(5, 12) + SourceIndex(3)
---
>>>    function f() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^^^^^^^^^->
1-> {
  >    
2 >    function 
3 >             f
1->Emitted(51, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(51, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(51, 15) Source(6, 15) + SourceIndex(3)
---
>>>        console.log('testing');
1->^^^^^^^^
2 >        ^^^^^^^
3 >               ^
4 >                ^^^
5 >                   ^
6 >                    ^^^^^^^^^
7 >                             ^
8 >                              ^
1->() {
  >        
2 >        console
3 >               .
4 >                log
5 >                   (
6 >                    'testing'
7 >                             )
8 >                              ;
1->Emitted(52, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(52, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(52, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(52, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(52, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(52, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(52, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(52, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(53, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(53, 6) Source(8, 6) + SourceIndex(3)
---
>>>    f();
1->^^^^
2 >    ^
3 >     ^^
4 >       ^
5 >        ^^^^^^^^^^^->
1->
  >
  >    
2 >    f
3 >     ()
4 >       ;
1->Emitted(54, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(54, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(54, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(54, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >}
3 > 
4 >   N
5 >    
6 >         N
7 >           {
  >              function f() {
  >                  console.log('testing');
  >              }
  >          
  >              f();
  >          }
1->Emitted(55, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(55, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(55, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(55, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(55, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(55, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(55, 19) Source(11, 2) + SourceIndex(3)
---
>>>function forsecondsecond_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forsecondsecond_part1Rest
1->Emitted(56, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(56, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(56, 35) Source(12, 35) + SourceIndex(3)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^
4 >             ^^
5 >               ^
6 >                ^^
7 >                  ^^
8 >                    ^^
9 >                      ^
10>                       ^^
11>                         ^^
12>                           ^^
13>                             ^^
14>                               ^^
15>                                 ^^
16>                                   ^^
17>                                     ^^
18>                                       ^
19>                                        ^^^^^^^
20>                                               ^^
21>                                                 ^^^^
22>                                                     ^^^^^^^^^^^^^^
23>                                                                   ^^^^^
24>                                                                        ^
25>                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = 
4 >             { 
5 >               a
6 >                : 
7 >                  10
8 >                    , 
9 >                      b
10>                       : 
11>                         30
12>                           , 
13>                             yy
14>                               : 
15>                                 30
16>                                    }
17>                                     
18>                                       b
19>                                        
20>                                               , ...
21>                                                 rest
22>                                                     
23>                                                                   { b, ...rest }
24>                                                                         = { a: 10, b: 30, yy: 30 }
25>                                                                         ;
1->Emitted(57, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(57, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(57, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(57, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(57, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(57, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(57, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(57, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(57, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(57, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(57, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(57, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(57, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(57, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(57, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(57, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(57, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(57, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(57, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(57, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(57, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(57, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(57, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(57, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(57, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(58, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(58, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(59, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(60, 5) Source(1, 1) + SourceIndex(4)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->class C {
  >    doSomething() {
  >        console.log("something got done");
  >    }
  >
2 >    }
1->Emitted(61, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(61, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(62, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(62, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(62, 31) Source(2, 5) + SourceIndex(4)
---
>>>        console.log("something got done");
1->^^^^^^^^
2 >        ^^^^^^^
3 >               ^
4 >                ^^^
5 >                   ^
6 >                    ^^^^^^^^^^^^^^^^^^^^
7 >                                        ^
8 >                                         ^
1->doSomething() {
  >        
2 >        console
3 >               .
4 >                log
5 >                   (
6 >                    "something got done"
7 >                                        )
8 >                                         ;
1->Emitted(63, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(63, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(63, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(63, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(63, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(63, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(63, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(63, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(64, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(64, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(65, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(65, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(66, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(66, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(66, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(66, 6) Source(5, 2) + SourceIndex(4)
---
>>>function secondsecond_part2Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         secondsecond_part2Spread
1->Emitted(67, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(67, 10) Source(7, 10) + SourceIndex(4)
3 >Emitted(67, 34) Source(7, 34) + SourceIndex(4)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(68, 5) Source(7, 35) + SourceIndex(4)
2 >Emitted(68, 16) Source(7, 49) + SourceIndex(4)
---
>>>    for (var _i = 0; _i < arguments.length; _i++) {
1->^^^^^^^^^
2 >         ^^^^^^^^^^
3 >                   ^^
4 >                     ^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^
6 >                                            ^^^^
1->
2 >         ...b: number[]
3 >                   
4 >                     ...b: number[]
5 >                                          
6 >                                            ...b: number[]
1->Emitted(69, 10) Source(7, 35) + SourceIndex(4)
2 >Emitted(69, 20) Source(7, 49) + SourceIndex(4)
3 >Emitted(69, 22) Source(7, 35) + SourceIndex(4)
4 >Emitted(69, 43) Source(7, 49) + SourceIndex(4)
5 >Emitted(69, 45) Source(7, 35) + SourceIndex(4)
6 >Emitted(69, 49) Source(7, 49) + SourceIndex(4)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(70, 9) Source(7, 35) + SourceIndex(4)
2 >Emitted(70, 31) Source(7, 49) + SourceIndex(4)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(72, 1) Source(7, 53) + SourceIndex(4)
2 >Emitted(72, 2) Source(7, 54) + SourceIndex(4)
---
>>>secondsecond_part2Spread.apply(void 0, __spread([10, 20, 30]));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                ^
5 >                                                 ^^
6 >                                                   ^^
7 >                                                     ^^
8 >                                                       ^^
9 >                                                         ^^
10>                                                           ^
11>                                                            ^^^
1->
  >
2 >secondsecond_part2Spread
3 >                        (...
4 >                                                [
5 >                                                 10
6 >                                                   , 
7 >                                                     20
8 >                                                       , 
9 >                                                         30
10>                                                           ]
11>                                                            );
1->Emitted(73, 1) Source(8, 1) + SourceIndex(4)
2 >Emitted(73, 25) Source(8, 25) + SourceIndex(4)
3 >Emitted(73, 49) Source(8, 29) + SourceIndex(4)
4 >Emitted(73, 50) Source(8, 30) + SourceIndex(4)
5 >Emitted(73, 52) Source(8, 32) + SourceIndex(4)
6 >Emitted(73, 54) Source(8, 34) + SourceIndex(4)
7 >Emitted(73, 56) Source(8, 36) + SourceIndex(4)
8 >Emitted(73, 58) Source(8, 38) + SourceIndex(4)
9 >Emitted(73, 60) Source(8, 40) + SourceIndex(4)
10>Emitted(73, 61) Source(8, 41) + SourceIndex(4)
11>Emitted(73, 64) Source(8, 43) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>var c = new C();
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^
6 >            ^
7 >             ^^
8 >               ^
9 >                ^->
1 >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1 >Emitted(74, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(74, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(74, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(74, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(74, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(74, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(74, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(74, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1->
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1->Emitted(75, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(75, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(75, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(75, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(75, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(75, 17) Source(2, 17) + SourceIndex(5)
---
>>>function forthirdthird_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forthirdthird_part1Rest
1->Emitted(76, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(76, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(76, 33) Source(3, 33) + SourceIndex(5)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^
4 >             ^^
5 >               ^
6 >                ^^
7 >                  ^^
8 >                    ^^
9 >                      ^
10>                       ^^
11>                         ^^
12>                           ^^
13>                             ^^
14>                               ^^
15>                                 ^^
16>                                   ^^
17>                                     ^^
18>                                       ^
19>                                        ^^^^^^^
20>                                               ^^
21>                                                 ^^^^
22>                                                     ^^^^^^^^^^^^^^
23>                                                                   ^^^^^
24>                                                                        ^
25>                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = 
4 >             { 
5 >               a
6 >                : 
7 >                  10
8 >                    , 
9 >                      b
10>                       : 
11>                         30
12>                           , 
13>                             yy
14>                               : 
15>                                 30
16>                                    }
17>                                     
18>                                       b
19>                                        
20>                                               , ...
21>                                                 rest
22>                                                     
23>                                                                   { b, ...rest }
24>                                                                         = { a: 10, b: 30, yy: 30 }
25>                                                                         ;
1->Emitted(77, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(77, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(77, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(77, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(77, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(77, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(77, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(77, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(77, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(77, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(77, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(77, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(77, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(77, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(77, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(77, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(77, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(77, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(77, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(77, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(77, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(77, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(77, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(77, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(77, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(78, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(78, 2) Source(5, 2) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(79, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(79, 10) Source(6, 10) + SourceIndex(5)
3 >Emitted(79, 32) Source(6, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(80, 5) Source(6, 33) + SourceIndex(5)
2 >Emitted(80, 16) Source(6, 47) + SourceIndex(5)
---
>>>    for (var _i = 0; _i < arguments.length; _i++) {
1->^^^^^^^^^
2 >         ^^^^^^^^^^
3 >                   ^^
4 >                     ^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^
6 >                                            ^^^^
1->
2 >         ...b: number[]
3 >                   
4 >                     ...b: number[]
5 >                                          
6 >                                            ...b: number[]
1->Emitted(81, 10) Source(6, 33) + SourceIndex(5)
2 >Emitted(81, 20) Source(6, 47) + SourceIndex(5)
3 >Emitted(81, 22) Source(6, 33) + SourceIndex(5)
4 >Emitted(81, 43) Source(6, 47) + SourceIndex(5)
5 >Emitted(81, 45) Source(6, 33) + SourceIndex(5)
6 >Emitted(81, 49) Source(6, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(82, 9) Source(6, 33) + SourceIndex(5)
2 >Emitted(82, 31) Source(6, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(84, 1) Source(6, 51) + SourceIndex(5)
2 >Emitted(84, 2) Source(6, 52) + SourceIndex(5)
---
>>>thirdthird_part1Spread.apply(void 0, __spread([10, 20, 30]));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                              ^
5 >                                               ^^
6 >                                                 ^^
7 >                                                   ^^
8 >                                                     ^^
9 >                                                       ^^
10>                                                         ^
11>                                                          ^^^
1->
  >
2 >thirdthird_part1Spread
3 >                      (...
4 >                                              [
5 >                                               10
6 >                                                 , 
7 >                                                   20
8 >                                                     , 
9 >                                                       30
10>                                                         ]
11>                                                          );
1->Emitted(85, 1) Source(7, 1) + SourceIndex(5)
2 >Emitted(85, 23) Source(7, 23) + SourceIndex(5)
3 >Emitted(85, 47) Source(7, 27) + SourceIndex(5)
4 >Emitted(85, 48) Source(7, 28) + SourceIndex(5)
5 >Emitted(85, 50) Source(7, 30) + SourceIndex(5)
6 >Emitted(85, 52) Source(7, 32) + SourceIndex(5)
7 >Emitted(85, 54) Source(7, 34) + SourceIndex(5)
8 >Emitted(85, 56) Source(7, 36) + SourceIndex(5)
9 >Emitted(85, 58) Source(7, 38) + SourceIndex(5)
10>Emitted(85, 59) Source(7, 39) + SourceIndex(5)
11>Emitted(85, 62) Source(7, 41) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "../..",
    "sourceFiles": [
      "../../third_part1.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 500,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 502,
          "end": 1006,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 1008,
          "end": 1178,
          "kind": "emitHelpers",
          "data": "typescript:spread"
        },
        {
          "pos": 1180,
          "end": 1636,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 1180,
              "end": 1636,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1636,
          "end": 2256,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 1636,
              "end": 2256,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2256,
          "end": 2621,
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
          "end": 272,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 272,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 272,
          "end": 491,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 272,
              "end": 491,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 491,
          "end": 625,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
emitHelpers: (0-500):: typescript:rest
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
emitHelpers: (502-1006):: typescript:read
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
emitHelpers: (1008-1178):: typescript:spread
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
----------------------------------------------------------------------
prepend: (1180-1636):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1180-1636)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
function firstfirst_part3Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
firstfirst_part3Spread.apply(void 0, __spread([10, 20, 30]));

----------------------------------------------------------------------
prepend: (1636-2256):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1636-2256)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
function forsecondsecond_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
function secondsecond_part2Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
secondsecond_part2Spread.apply(void 0, __spread([10, 20, 30]));

----------------------------------------------------------------------
text: (2256-2621)
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
function thirdthird_part1Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
thirdthird_part1Spread.apply(void 0, __spread([10, 20, 30]));

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-272):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-272)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;
declare function firstfirst_part3Spread(...b: number[]): void;

----------------------------------------------------------------------
prepend: (272-491):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (272-491)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;

----------------------------------------------------------------------
text: (491-625)
declare var c: C;
declare function forthirdthird_part1Rest(): void;
declare function thirdthird_part1Spread(...b: number[]): void;

======================================================================

