//// [/src/first/bin/first-output.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,6BAAyC,EAAvC,QAAC,EAAE,wBAAoC,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
>>>        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
>>>            t[p[i]] = s[p[i]];
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
1 >Emitted(30, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(30, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(30, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(30, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(30, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(30, 24) Source(5, 26) + SourceIndex(0)
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
1 >Emitted(31, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(31, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(31, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(31, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(31, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(31, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(31, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(31, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(32, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(32, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(32, 33) Source(12, 33) + SourceIndex(0)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                     ^^
5 >                                       ^^^^^^^^
6 >                                               ^^
7 >                                                 ^^^^^^^^^^^^^^^^^^^^^^^^
8 >                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = { a: 10, b: 30, yy: 30 }
4 >                                     
5 >                                       b
6 >                                               , 
7 >                                                 ...rest } = { a: 10, b: 30, yy: 30 }
8 >                                                                         ;
1->Emitted(33, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(33, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(33, 38) Source(13, 48) + SourceIndex(0)
4 >Emitted(33, 40) Source(13, 9) + SourceIndex(0)
5 >Emitted(33, 48) Source(13, 10) + SourceIndex(0)
6 >Emitted(33, 50) Source(13, 12) + SourceIndex(0)
7 >Emitted(33, 74) Source(13, 48) + SourceIndex(0)
8 >Emitted(33, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(34, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(34, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(35, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(35, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(35, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(35, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(35, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(35, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(35, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(35, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(36, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(36, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(36, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(36, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(36, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(36, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(36, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(36, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(36, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(37, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(37, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(37, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(38, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(38, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(38, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(38, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(39, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(39, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(40, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(40, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(40, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(41, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(41, 16) Source(4, 47) + SourceIndex(2)
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
1->Emitted(42, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(42, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(42, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(42, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(42, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(42, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(43, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(43, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(45, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(45, 2) Source(4, 52) + SourceIndex(2)
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
1->Emitted(46, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(46, 23) Source(5, 23) + SourceIndex(2)
3 >Emitted(46, 47) Source(5, 27) + SourceIndex(2)
4 >Emitted(46, 48) Source(5, 28) + SourceIndex(2)
5 >Emitted(46, 50) Source(5, 30) + SourceIndex(2)
6 >Emitted(46, 52) Source(5, 32) + SourceIndex(2)
7 >Emitted(46, 54) Source(5, 34) + SourceIndex(2)
8 >Emitted(46, 56) Source(5, 36) + SourceIndex(2)
9 >Emitted(46, 58) Source(5, 38) + SourceIndex(2)
10>Emitted(46, 59) Source(5, 39) + SourceIndex(2)
11>Emitted(46, 62) Source(5, 41) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "/src/first/",
    "sourceFiles": [
      "/src/first/first_PART1.ts",
      "/src/first/first_part2.ts",
      "/src/first/first_part3.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 415,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 417,
          "end": 921,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 923,
          "end": 1093,
          "kind": "emitHelpers",
          "data": "typescript:spread"
        },
        {
          "pos": 1095,
          "end": 1551,
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
emitHelpers: (0-415):: typescript:rest
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
----------------------------------------------------------------------
emitHelpers: (417-921):: typescript:read
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
emitHelpers: (923-1093):: typescript:spread
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
----------------------------------------------------------------------
text: (1095-1551)
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

//// [/src/third/thirdjs/output/third-output.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,6BAAyC,EAAvC,QAAC,EAAE,wBAAoC,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;ACAxC,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,6BAAyC,EAAvC,QAAC,EAAE,wBAAoC,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,wBAAwB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;ACP1C,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,6BAAyC,EAAvC,QAAC,EAAE,wBAAoC,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
>>>        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
>>>            t[p[i]] = s[p[i]];
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
1 >Emitted(30, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(30, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(30, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(30, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(30, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(30, 24) Source(5, 26) + SourceIndex(0)
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
1 >Emitted(31, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(31, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(31, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(31, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(31, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(31, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(31, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(31, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(32, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(32, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(32, 33) Source(12, 33) + SourceIndex(0)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                     ^^
5 >                                       ^^^^^^^^
6 >                                               ^^
7 >                                                 ^^^^^^^^^^^^^^^^^^^^^^^^
8 >                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = { a: 10, b: 30, yy: 30 }
4 >                                     
5 >                                       b
6 >                                               , 
7 >                                                 ...rest } = { a: 10, b: 30, yy: 30 }
8 >                                                                         ;
1->Emitted(33, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(33, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(33, 38) Source(13, 48) + SourceIndex(0)
4 >Emitted(33, 40) Source(13, 9) + SourceIndex(0)
5 >Emitted(33, 48) Source(13, 10) + SourceIndex(0)
6 >Emitted(33, 50) Source(13, 12) + SourceIndex(0)
7 >Emitted(33, 74) Source(13, 48) + SourceIndex(0)
8 >Emitted(33, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(34, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(34, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(35, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(35, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(35, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(35, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(35, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(35, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(35, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(35, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(36, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(36, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(36, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(36, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(36, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(36, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(36, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(36, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(36, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(37, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(37, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(37, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(38, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(38, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(38, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(38, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(39, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(39, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(40, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(40, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(40, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(41, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(41, 16) Source(4, 47) + SourceIndex(2)
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
1->Emitted(42, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(42, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(42, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(42, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(42, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(42, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(43, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(43, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(45, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(45, 2) Source(4, 52) + SourceIndex(2)
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
1->Emitted(46, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(46, 23) Source(5, 23) + SourceIndex(2)
3 >Emitted(46, 47) Source(5, 27) + SourceIndex(2)
4 >Emitted(46, 48) Source(5, 28) + SourceIndex(2)
5 >Emitted(46, 50) Source(5, 30) + SourceIndex(2)
6 >Emitted(46, 52) Source(5, 32) + SourceIndex(2)
7 >Emitted(46, 54) Source(5, 34) + SourceIndex(2)
8 >Emitted(46, 56) Source(5, 36) + SourceIndex(2)
9 >Emitted(46, 58) Source(5, 38) + SourceIndex(2)
10>Emitted(46, 59) Source(5, 39) + SourceIndex(2)
11>Emitted(46, 62) Source(5, 41) + SourceIndex(2)
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
1 >Emitted(47, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(47, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(47, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(47, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(48, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(48, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(48, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(49, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(49, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(49, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(50, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(50, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(50, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(50, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(50, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(50, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(50, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(50, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(51, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(51, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(52, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(52, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(52, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(52, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(53, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(53, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(53, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(53, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(53, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(53, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(53, 19) Source(11, 2) + SourceIndex(3)
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
1->Emitted(54, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(54, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(54, 35) Source(12, 35) + SourceIndex(3)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                     ^^
5 >                                       ^^^^^^^^
6 >                                               ^^
7 >                                                 ^^^^^^^^^^^^^^^^^^^^^^^^
8 >                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = { a: 10, b: 30, yy: 30 }
4 >                                     
5 >                                       b
6 >                                               , 
7 >                                                 ...rest } = { a: 10, b: 30, yy: 30 }
8 >                                                                         ;
1->Emitted(55, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(55, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(55, 38) Source(13, 48) + SourceIndex(3)
4 >Emitted(55, 40) Source(13, 9) + SourceIndex(3)
5 >Emitted(55, 48) Source(13, 10) + SourceIndex(3)
6 >Emitted(55, 50) Source(13, 12) + SourceIndex(3)
7 >Emitted(55, 74) Source(13, 48) + SourceIndex(3)
8 >Emitted(55, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(56, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(56, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(57, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(58, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(59, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(59, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(60, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(60, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(60, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(61, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(61, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(61, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(61, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(61, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(61, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(61, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(61, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(62, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(62, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(63, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(63, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(64, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(64, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(64, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(64, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(65, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(65, 10) Source(7, 10) + SourceIndex(4)
3 >Emitted(65, 34) Source(7, 34) + SourceIndex(4)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(66, 5) Source(7, 35) + SourceIndex(4)
2 >Emitted(66, 16) Source(7, 49) + SourceIndex(4)
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
1->Emitted(67, 10) Source(7, 35) + SourceIndex(4)
2 >Emitted(67, 20) Source(7, 49) + SourceIndex(4)
3 >Emitted(67, 22) Source(7, 35) + SourceIndex(4)
4 >Emitted(67, 43) Source(7, 49) + SourceIndex(4)
5 >Emitted(67, 45) Source(7, 35) + SourceIndex(4)
6 >Emitted(67, 49) Source(7, 49) + SourceIndex(4)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(68, 9) Source(7, 35) + SourceIndex(4)
2 >Emitted(68, 31) Source(7, 49) + SourceIndex(4)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(70, 1) Source(7, 53) + SourceIndex(4)
2 >Emitted(70, 2) Source(7, 54) + SourceIndex(4)
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
1->Emitted(71, 1) Source(8, 1) + SourceIndex(4)
2 >Emitted(71, 25) Source(8, 25) + SourceIndex(4)
3 >Emitted(71, 49) Source(8, 29) + SourceIndex(4)
4 >Emitted(71, 50) Source(8, 30) + SourceIndex(4)
5 >Emitted(71, 52) Source(8, 32) + SourceIndex(4)
6 >Emitted(71, 54) Source(8, 34) + SourceIndex(4)
7 >Emitted(71, 56) Source(8, 36) + SourceIndex(4)
8 >Emitted(71, 58) Source(8, 38) + SourceIndex(4)
9 >Emitted(71, 60) Source(8, 40) + SourceIndex(4)
10>Emitted(71, 61) Source(8, 41) + SourceIndex(4)
11>Emitted(71, 64) Source(8, 43) + SourceIndex(4)
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
1 >Emitted(72, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(72, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(72, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(72, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(72, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(72, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(72, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(72, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(73, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(73, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(73, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(73, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(73, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(73, 17) Source(2, 17) + SourceIndex(5)
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
1->Emitted(74, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(74, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(74, 33) Source(3, 33) + SourceIndex(5)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                     ^^
5 >                                       ^^^^^^^^
6 >                                               ^^
7 >                                                 ^^^^^^^^^^^^^^^^^^^^^^^^
8 >                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = { a: 10, b: 30, yy: 30 }
4 >                                     
5 >                                       b
6 >                                               , 
7 >                                                 ...rest } = { a: 10, b: 30, yy: 30 }
8 >                                                                         ;
1->Emitted(75, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(75, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(75, 38) Source(4, 48) + SourceIndex(5)
4 >Emitted(75, 40) Source(4, 9) + SourceIndex(5)
5 >Emitted(75, 48) Source(4, 10) + SourceIndex(5)
6 >Emitted(75, 50) Source(4, 12) + SourceIndex(5)
7 >Emitted(75, 74) Source(4, 48) + SourceIndex(5)
8 >Emitted(75, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(76, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(76, 2) Source(5, 2) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(77, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(77, 10) Source(6, 10) + SourceIndex(5)
3 >Emitted(77, 32) Source(6, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(78, 5) Source(6, 33) + SourceIndex(5)
2 >Emitted(78, 16) Source(6, 47) + SourceIndex(5)
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
1->Emitted(79, 10) Source(6, 33) + SourceIndex(5)
2 >Emitted(79, 20) Source(6, 47) + SourceIndex(5)
3 >Emitted(79, 22) Source(6, 33) + SourceIndex(5)
4 >Emitted(79, 43) Source(6, 47) + SourceIndex(5)
5 >Emitted(79, 45) Source(6, 33) + SourceIndex(5)
6 >Emitted(79, 49) Source(6, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(80, 9) Source(6, 33) + SourceIndex(5)
2 >Emitted(80, 31) Source(6, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(82, 1) Source(6, 51) + SourceIndex(5)
2 >Emitted(82, 2) Source(6, 52) + SourceIndex(5)
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
1->Emitted(83, 1) Source(7, 1) + SourceIndex(5)
2 >Emitted(83, 23) Source(7, 23) + SourceIndex(5)
3 >Emitted(83, 47) Source(7, 27) + SourceIndex(5)
4 >Emitted(83, 48) Source(7, 28) + SourceIndex(5)
5 >Emitted(83, 50) Source(7, 30) + SourceIndex(5)
6 >Emitted(83, 52) Source(7, 32) + SourceIndex(5)
7 >Emitted(83, 54) Source(7, 34) + SourceIndex(5)
8 >Emitted(83, 56) Source(7, 36) + SourceIndex(5)
9 >Emitted(83, 58) Source(7, 38) + SourceIndex(5)
10>Emitted(83, 59) Source(7, 39) + SourceIndex(5)
11>Emitted(83, 62) Source(7, 41) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "/src/third/",
    "sourceFiles": [
      "/src/third/third_part1.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 415,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 417,
          "end": 921,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 923,
          "end": 1093,
          "kind": "emitHelpers",
          "data": "typescript:spread"
        },
        {
          "pos": 1095,
          "end": 1551,
          "kind": "prepend",
          "data": "/src/first/bin/first-output.js",
          "texts": [
            {
              "pos": 1095,
              "end": 1551,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1551,
          "end": 2171,
          "kind": "prepend",
          "data": "/src/2/second-output.js",
          "texts": [
            {
              "pos": 1551,
              "end": 2171,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2171,
          "end": 2536,
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
          "data": "/src/first/bin/first-output.d.ts",
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
          "data": "/src/2/second-output.d.ts",
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
emitHelpers: (0-415):: typescript:rest
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
----------------------------------------------------------------------
emitHelpers: (417-921):: typescript:read
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
emitHelpers: (923-1093):: typescript:spread
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
----------------------------------------------------------------------
prepend: (1095-1551):: /src/first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1095-1551)
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
prepend: (1551-2171):: /src/2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1551-2171)
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
text: (2171-2536)
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
prepend: (0-272):: /src/first/bin/first-output.d.ts texts:: 1
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
prepend: (272-491):: /src/2/second-output.d.ts texts:: 1
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

