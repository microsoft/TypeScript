//// [/src/first/bin/.tsbuildinfo]
{
  "js": [
    {
      "pos": 0,
      "end": 415,
      "kind": "emitHelpers",
      "data": "typescript:rest"
    },
    {
      "pos": 417,
      "end": 661,
      "kind": "text"
    },
    {
      "pos": 661,
      "end": 701,
      "kind": "sourceMapUrl"
    }
  ],
  "dts": [
    {
      "pos": 0,
      "end": 208,
      "kind": "text"
    },
    {
      "pos": 208,
      "end": 250,
      "kind": "sourceMapUrl"
    }
  ],
  "commonSourceDirectory": "/src/first/",
  "sources": {
    "helpers": [
      "typescript:rest"
    ]
  },
  "program": {
    "fileInfos": {
      "/lib/lib.d.ts": {
        "version": "38840781448"
      },
      "/lib/lib.es5.d.ts": {
        "version": "-157947125741"
      },
      "/lib/lib.dom.d.ts": {
        "version": "-1086375748659"
      },
      "/lib/lib.webworker.importscripts.d.ts": {
        "version": "16827914512"
      },
      "/lib/lib.scripthost.d.ts": {
        "version": "-7856822451"
      },
      "/src/first/first_part1.ts": {
        "version": "-5382108219"
      },
      "/src/first/first_part2.ts": {
        "version": "4973778178"
      },
      "/src/first/first_part3.ts": {
        "version": "6202806249"
      }
    },
    "options": {
      "target": 1,
      "composite": true,
      "removeComments": true,
      "strict": false,
      "sourceMap": true,
      "declarationMap": true,
      "outFile": "/src/first/bin/first-output.js",
      "skipDefaultLibCheck": true,
      "configFilePath": "/src/first/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {}
  }
}

//// [/src/first/bin/.tsbuildinfo.baseline.txt]
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
text: (417-661)
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
sourceMapUrl: (661-701)
//# sourceMappingURL=first-output.js.map
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

----------------------------------------------------------------------
sourceMapUrl: (208-250)
//# sourceMappingURL=first-output.d.ts.map
======================================================================

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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,6BAAyC,EAAvC,QAAC,EAAE,wBAAoC,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
1 >Emitted(10, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(10, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(10, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(10, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(10, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(10, 24) Source(5, 26) + SourceIndex(0)
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
1 >Emitted(11, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(11, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(11, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(11, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(11, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(11, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(11, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(11, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(12, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(12, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(12, 33) Source(12, 33) + SourceIndex(0)
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
1->Emitted(13, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(13, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(13, 38) Source(13, 48) + SourceIndex(0)
4 >Emitted(13, 40) Source(13, 9) + SourceIndex(0)
5 >Emitted(13, 48) Source(13, 10) + SourceIndex(0)
6 >Emitted(13, 50) Source(13, 12) + SourceIndex(0)
7 >Emitted(13, 74) Source(13, 48) + SourceIndex(0)
8 >Emitted(13, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(14, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(14, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(15, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(15, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(15, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(15, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(15, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(15, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(15, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(15, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(16, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(16, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(16, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(16, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(16, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(16, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(16, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(16, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(16, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(17, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(17, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(17, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(18, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(18, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(18, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(18, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(19, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(19, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

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

//// [/src/third/thirdjs/output/.tsbuildinfo]
{
  "js": [
    {
      "pos": 0,
      "end": 415,
      "kind": "emitHelpers",
      "data": "typescript:rest"
    },
    {
      "pos": 417,
      "end": 701,
      "kind": "prepend",
      "data": "/src/first/bin/first-output.js"
    },
    {
      "pos": 703,
      "end": 1148,
      "kind": "prepend",
      "data": "/src/2/second-output.js"
    },
    {
      "pos": 1150,
      "end": 1303,
      "kind": "text"
    },
    {
      "pos": 1303,
      "end": 1343,
      "kind": "sourceMapUrl"
    }
  ],
  "dts": [
    {
      "pos": 0,
      "end": 250,
      "kind": "prepend",
      "data": "/src/first/bin/first-output.d.ts"
    },
    {
      "pos": 252,
      "end": 448,
      "kind": "prepend",
      "data": "/src/2/second-output.d.ts"
    },
    {
      "pos": 450,
      "end": 520,
      "kind": "text"
    },
    {
      "pos": 520,
      "end": 562,
      "kind": "sourceMapUrl"
    }
  ],
  "commonSourceDirectory": "/src/third/",
  "sources": {
    "helpers": [
      "typescript:rest"
    ]
  },
  "program": {
    "fileInfos": {
      "/lib/lib.d.ts": {
        "version": "38840781448"
      },
      "/lib/lib.es5.d.ts": {
        "version": "-157947125741"
      },
      "/lib/lib.dom.d.ts": {
        "version": "-1086375748659"
      },
      "/lib/lib.webworker.importscripts.d.ts": {
        "version": "16827914512"
      },
      "/lib/lib.scripthost.d.ts": {
        "version": "-7856822451"
      },
      "/src/first/bin/first-output.d.ts": {
        "version": "-27595933529"
      },
      "/src/2/second-output.d.ts": {
        "version": "-21852951798"
      },
      "/src/third/third_part1.ts": {
        "version": "-362916705"
      }
    },
    "options": {
      "target": 1,
      "composite": true,
      "removeComments": true,
      "strict": false,
      "sourceMap": true,
      "declarationMap": true,
      "declaration": true,
      "outFile": "/src/third/thirdjs/output/third-output.js",
      "skipDefaultLibCheck": true,
      "configFilePath": "/src/third/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {}
  }
}

//// [/src/third/thirdjs/output/.tsbuildinfo.baseline.txt]
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
prepend: (417-701):: /src/first/bin/first-output.js
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
----------------------------------------------------------------------
prepend: (703-1148):: /src/2/second-output.js
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
//# sourceMappingURL=second-output.js.map
----------------------------------------------------------------------
text: (1150-1303)
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}

----------------------------------------------------------------------
sourceMapUrl: (1303-1343)
//# sourceMappingURL=third-output.js.map
======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-250):: /src/first/bin/first-output.d.ts
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map
----------------------------------------------------------------------
prepend: (252-448):: /src/2/second-output.d.ts
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map
----------------------------------------------------------------------
text: (450-520)
declare var c: C;
declare function forthirdthird_part1Rest(): void;

----------------------------------------------------------------------
sourceMapUrl: (520-562)
//# sourceMappingURL=third-output.d.ts.map
======================================================================

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
//# sourceMappingURL=second-output.js.map
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,6BAAyC,EAAvC,QAAC,EAAE,wBAAoC,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,6BAAyC,EAAvC,QAAC,EAAE,wBAAoC,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,6BAAyC,EAAvC,QAAC,EAAE,wBAAoC,CAAC;AAChD,CAAC"}

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
1 >Emitted(10, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(10, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(10, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(10, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(10, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(10, 24) Source(5, 26) + SourceIndex(0)
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
1 >Emitted(11, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(11, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(11, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(11, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(11, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(11, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(11, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(11, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(12, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(12, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(12, 33) Source(12, 33) + SourceIndex(0)
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
1->Emitted(13, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(13, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(13, 38) Source(13, 48) + SourceIndex(0)
4 >Emitted(13, 40) Source(13, 9) + SourceIndex(0)
5 >Emitted(13, 48) Source(13, 10) + SourceIndex(0)
6 >Emitted(13, 50) Source(13, 12) + SourceIndex(0)
7 >Emitted(13, 74) Source(13, 48) + SourceIndex(0)
8 >Emitted(13, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(14, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(14, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(15, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(15, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(15, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(15, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(15, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(15, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(15, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(15, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(16, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(16, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(16, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(16, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(16, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(16, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(16, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(16, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(16, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(17, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(17, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(17, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(18, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(18, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(18, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(18, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(19, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(19, 2) Source(3, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>//# sourceMappingURL=first-output.js.map
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
1->Emitted(21, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(21, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(21, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(21, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(22, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(22, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(22, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(23, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(23, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(23, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(24, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(24, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(24, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(24, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(24, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(24, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(24, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(24, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(25, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(25, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(26, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(26, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(26, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(26, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(27, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(27, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(27, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(27, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(27, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(27, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(27, 19) Source(11, 2) + SourceIndex(3)
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
1->Emitted(28, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(28, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(28, 35) Source(12, 35) + SourceIndex(3)
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
1->Emitted(29, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(29, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(29, 38) Source(13, 48) + SourceIndex(3)
4 >Emitted(29, 40) Source(13, 9) + SourceIndex(3)
5 >Emitted(29, 48) Source(13, 10) + SourceIndex(3)
6 >Emitted(29, 50) Source(13, 12) + SourceIndex(3)
7 >Emitted(29, 74) Source(13, 48) + SourceIndex(3)
8 >Emitted(29, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(30, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(30, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(31, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(32, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(33, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(33, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(34, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(34, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(34, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(35, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(35, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(35, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(35, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(35, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(35, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(35, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(35, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(36, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(36, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(37, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(37, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(38, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(38, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(38, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(38, 6) Source(5, 2) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>//# sourceMappingURL=second-output.js.map
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
1->Emitted(40, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(40, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(40, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(40, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(40, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(40, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(40, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(40, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(41, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(41, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(41, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(41, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(41, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(41, 17) Source(2, 17) + SourceIndex(5)
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
1->Emitted(42, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(42, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(42, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(43, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(43, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(43, 38) Source(4, 48) + SourceIndex(5)
4 >Emitted(43, 40) Source(4, 9) + SourceIndex(5)
5 >Emitted(43, 48) Source(4, 10) + SourceIndex(5)
6 >Emitted(43, 50) Source(4, 12) + SourceIndex(5)
7 >Emitted(43, 74) Source(4, 48) + SourceIndex(5)
8 >Emitted(43, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(44, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(44, 2) Source(5, 2) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

