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
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
1 >Emitted(12, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(12, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(12, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(12, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(12, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(12, 24) Source(5, 26) + SourceIndex(0)
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
1 >Emitted(13, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(13, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(13, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(13, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(13, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(13, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(13, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(13, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(14, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(14, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(14, 33) Source(12, 33) + SourceIndex(0)
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
1->Emitted(15, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(15, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(15, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(15, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(15, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(15, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(15, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(15, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(15, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(15, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(15, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(15, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(15, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(15, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(15, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(15, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(15, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(15, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(15, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(15, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(15, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(15, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(15, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(15, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(15, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(16, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(16, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(17, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(17, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(17, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(17, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(17, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(17, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(17, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(17, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(18, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(18, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(18, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(18, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(18, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(18, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(18, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(18, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(18, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(19, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(19, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(19, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(20, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(20, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(20, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(20, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(21, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(21, 2) Source(3, 2) + SourceIndex(2)
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
          "end": 746,
          "kind": "text"
        }
      ],
      "sources": {
        "helpers": [
          "typescript:rest"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 208,
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
text: (502-746)
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

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-208)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;

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
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
function secondsecond_part1Spread() { }
secondsecond_part1Spread.apply(void 0, __spread([10, 20, 30]));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED,SAAS,wBAAwB,KAAmB,CAAC;AACrD,wBAAwB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;ACb1C;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC"}

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
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(41, 2) Source(3, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>var N;
1->
2 >^^^^
3 >    ^
4 >     ^
5 >      ^^^^^^^^^^->
1->namespace N {
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
1->Emitted(42, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(42, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(42, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(42, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(43, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(43, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(43, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(44, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(44, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(44, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(45, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(45, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(45, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(45, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(45, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(45, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(45, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(45, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(46, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(46, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(47, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(47, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(47, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(47, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(48, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(48, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(48, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(48, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(48, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(48, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(48, 19) Source(11, 2) + SourceIndex(3)
---
>>>function secondsecond_part1Spread() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                 ^^^^^
5 >                                      ^
6 >                                       ^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
2 >function 
3 >         secondsecond_part1Spread
4 >                                 (...b: number[]) { 
5 >                                      }
1->Emitted(49, 1) Source(13, 1) + SourceIndex(3)
2 >Emitted(49, 10) Source(13, 10) + SourceIndex(3)
3 >Emitted(49, 34) Source(13, 34) + SourceIndex(3)
4 >Emitted(49, 39) Source(13, 53) + SourceIndex(3)
5 >Emitted(49, 40) Source(13, 54) + SourceIndex(3)
---
>>>secondsecond_part1Spread.apply(void 0, __spread([10, 20, 30]));
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
2 >secondsecond_part1Spread
3 >                        (...
4 >                                                [
5 >                                                 10
6 >                                                   , 
7 >                                                     20
8 >                                                       , 
9 >                                                         30
10>                                                           ]
11>                                                            );
1->Emitted(50, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(50, 25) Source(14, 25) + SourceIndex(3)
3 >Emitted(50, 49) Source(14, 29) + SourceIndex(3)
4 >Emitted(50, 50) Source(14, 30) + SourceIndex(3)
5 >Emitted(50, 52) Source(14, 32) + SourceIndex(3)
6 >Emitted(50, 54) Source(14, 34) + SourceIndex(3)
7 >Emitted(50, 56) Source(14, 36) + SourceIndex(3)
8 >Emitted(50, 58) Source(14, 38) + SourceIndex(3)
9 >Emitted(50, 60) Source(14, 40) + SourceIndex(3)
10>Emitted(50, 61) Source(14, 41) + SourceIndex(3)
11>Emitted(50, 64) Source(14, 43) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(51, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(52, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(53, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(53, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(54, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(54, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(54, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(55, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(55, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(55, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(55, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(55, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(55, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(55, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(55, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(56, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(56, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(57, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(57, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(58, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(58, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(58, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(58, 6) Source(5, 2) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>var c = new C();
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^
6 >            ^
7 >             ^^
8 >               ^
9 >                ^->
1->
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(59, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(59, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(59, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(59, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(59, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(59, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(59, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(59, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(60, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(60, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(60, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(60, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(60, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(60, 17) Source(2, 17) + SourceIndex(5)
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
1->Emitted(61, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(61, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(61, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(62, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(62, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(62, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(62, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(62, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(62, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(62, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(62, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(62, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(62, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(62, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(62, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(62, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(62, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(62, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(62, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(62, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(62, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(62, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(62, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(62, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(62, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(62, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(62, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(62, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(63, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(63, 2) Source(5, 2) + SourceIndex(5)
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
          "end": 1424,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 1180,
              "end": 1424,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1424,
          "end": 1815,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 1424,
              "end": 1815,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1815,
          "end": 1968,
          "kind": "text"
        }
      ],
      "sources": {
        "helpers": [
          "typescript:rest"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 208,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 208,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 208,
          "end": 374,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 208,
              "end": 374,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 374,
          "end": 444,
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
prepend: (1180-1424):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1180-1424)
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

----------------------------------------------------------------------
prepend: (1424-1815):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1424-1815)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
function secondsecond_part1Spread() { }
secondsecond_part1Spread.apply(void 0, __spread([10, 20, 30]));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (1815-1968)
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-208):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-208)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;

----------------------------------------------------------------------
prepend: (208-374):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (208-374)
declare namespace N {
}
declare namespace N {
}
declare function secondsecond_part1Spread(...b: number[]): void;
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (374-444)
declare var c: C;
declare function forthirdthird_part1Rest(): void;

======================================================================

