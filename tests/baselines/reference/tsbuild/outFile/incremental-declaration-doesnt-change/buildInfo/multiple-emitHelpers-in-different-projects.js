//// [/src/first/bin/.tsbuildinfo]
{
  "js": [
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
      "end": 1017,
      "kind": "text"
    },
    {
      "pos": 1017,
      "end": 1057,
      "kind": "sourceMapUrl"
    }
  ],
  "dts": [
    {
      "pos": 0,
      "end": 221,
      "kind": "text"
    },
    {
      "pos": 221,
      "end": 263,
      "kind": "sourceMapUrl"
    }
  ]
}

//// [/src/first/bin/first-output.js]
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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
1 >Emitted(21, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(21, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(21, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(21, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(21, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(21, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^->
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
1 >Emitted(22, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(22, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(22, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(22, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(22, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(22, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(22, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(22, 16) Source(11, 16) + SourceIndex(0)
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
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(23, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(23, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(23, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(23, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(23, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(23, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(23, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(23, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(24, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(24, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(24, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(24, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(24, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(24, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(24, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(24, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(24, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(25, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(25, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(25, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(26, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(26, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(26, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(26, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(27, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(27, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(28, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(28, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(28, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(29, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(29, 16) Source(4, 47) + SourceIndex(2)
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
1->Emitted(30, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(30, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(30, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(30, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(30, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(30, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(31, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(31, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(33, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(33, 2) Source(4, 52) + SourceIndex(2)
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
1->Emitted(34, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(34, 23) Source(5, 23) + SourceIndex(2)
3 >Emitted(34, 47) Source(5, 27) + SourceIndex(2)
4 >Emitted(34, 48) Source(5, 28) + SourceIndex(2)
5 >Emitted(34, 50) Source(5, 30) + SourceIndex(2)
6 >Emitted(34, 52) Source(5, 32) + SourceIndex(2)
7 >Emitted(34, 54) Source(5, 34) + SourceIndex(2)
8 >Emitted(34, 56) Source(5, 36) + SourceIndex(2)
9 >Emitted(34, 58) Source(5, 38) + SourceIndex(2)
10>Emitted(34, 59) Source(5, 39) + SourceIndex(2)
11>Emitted(34, 62) Source(5, 41) + SourceIndex(2)
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
console.log(s);

//// [/src/third/thirdjs/output/.tsbuildinfo]
{
  "js": [
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
      "end": 1275,
      "kind": "emitHelpers",
      "data": "typescript:extends"
    },
    {
      "pos": 1277,
      "end": 1656,
      "kind": "prepend",
      "data": "/src/first/bin/first-output.js"
    },
    {
      "pos": 1658,
      "end": 2286,
      "kind": "prepend",
      "data": "/src/2/second-output.js"
    },
    {
      "pos": 2288,
      "end": 2536,
      "kind": "text"
    },
    {
      "pos": 2536,
      "end": 2576,
      "kind": "sourceMapUrl"
    }
  ],
  "dts": [
    {
      "pos": 0,
      "end": 263,
      "kind": "prepend",
      "data": "/src/first/bin/first-output.d.ts"
    },
    {
      "pos": 265,
      "end": 480,
      "kind": "prepend",
      "data": "/src/2/second-output.d.ts"
    },
    {
      "pos": 482,
      "end": 565,
      "kind": "text"
    },
    {
      "pos": 565,
      "end": 607,
      "kind": "sourceMapUrl"
    }
  ]
}

//// [/src/third/thirdjs/output/third-output.js]
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var s = "Hello, world";
console.log(s);
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
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var second1 = (function () {
    function second1() {
    }
    return second1;
}());
var second2 = (function (_super) {
    __extends(second2, _super);
    function second2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return second2;
}(second1));
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
function thirdthird_part1Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
thirdthird_part1Spread.apply(void 0, __spread([10, 20, 30]));
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;;ACAxC,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IAAA;IAAgB,CAAC;IAAD,cAAC;AAAD,CAAC,AAAjB,IAAiB;AACjB;IAAsB,2BAAO;IAA7B;;IAAgC,CAAC;IAAD,cAAC;AAAD,CAAC,AAAjC,CAAsB,OAAO,GAAI;ACbjC;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAEhB,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
>>>var __extends = (this && this.__extends) || (function () {
>>>    var extendStatics = function (d, b) {
>>>        extendStatics = Object.setPrototypeOf ||
>>>            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
>>>            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
>>>        return extendStatics(d, b);
>>>    };
>>>    return function (d, b) {
>>>        extendStatics(d, b);
>>>        function __() { this.constructor = d; }
>>>        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
>>>    };
>>>})();
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
1 >Emitted(34, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(34, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(34, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(34, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(34, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(34, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^->
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
1 >Emitted(35, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(35, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(35, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(35, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(35, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(35, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(35, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(35, 16) Source(11, 16) + SourceIndex(0)
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
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(36, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(36, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(36, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(36, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(36, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(36, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(36, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(36, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(37, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(37, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(37, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(37, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(37, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(37, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(37, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(37, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(37, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(38, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(38, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(38, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(39, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(39, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(39, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(39, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(40, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(40, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(41, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(41, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(41, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(42, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(42, 16) Source(4, 47) + SourceIndex(2)
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
1->Emitted(43, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(43, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(43, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(43, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(43, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(43, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(44, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(44, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(46, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(46, 2) Source(4, 52) + SourceIndex(2)
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
1->Emitted(47, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(47, 23) Source(5, 23) + SourceIndex(2)
3 >Emitted(47, 47) Source(5, 27) + SourceIndex(2)
4 >Emitted(47, 48) Source(5, 28) + SourceIndex(2)
5 >Emitted(47, 50) Source(5, 30) + SourceIndex(2)
6 >Emitted(47, 52) Source(5, 32) + SourceIndex(2)
7 >Emitted(47, 54) Source(5, 34) + SourceIndex(2)
8 >Emitted(47, 56) Source(5, 36) + SourceIndex(2)
9 >Emitted(47, 58) Source(5, 38) + SourceIndex(2)
10>Emitted(47, 59) Source(5, 39) + SourceIndex(2)
11>Emitted(47, 62) Source(5, 41) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>//# sourceMappingURL=first-output.js.map
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
8 >                  ^^^^^^^^^^^->
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
>>>var second1 = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(56, 1) Source(13, 1) + SourceIndex(3)
---
>>>    function second1() {
1->^^^^
2 >    ^^->
1->
1->Emitted(57, 5) Source(13, 1) + SourceIndex(3)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^->
1->class second1 { 
2 >    }
1->Emitted(58, 5) Source(13, 17) + SourceIndex(3)
2 >Emitted(58, 6) Source(13, 18) + SourceIndex(3)
---
>>>    return second1;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(59, 5) Source(13, 17) + SourceIndex(3)
2 >Emitted(59, 19) Source(13, 18) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class second1 { }
1 >Emitted(60, 1) Source(13, 17) + SourceIndex(3)
2 >Emitted(60, 2) Source(13, 18) + SourceIndex(3)
3 >Emitted(60, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(60, 6) Source(13, 18) + SourceIndex(3)
---
>>>var second2 = (function (_super) {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(61, 1) Source(14, 1) + SourceIndex(3)
---
>>>    __extends(second2, _super);
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
1->class second2 extends 
2 >    second1
1->Emitted(62, 5) Source(14, 23) + SourceIndex(3)
2 >Emitted(62, 32) Source(14, 30) + SourceIndex(3)
---
>>>    function second2() {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(63, 5) Source(14, 1) + SourceIndex(3)
---
>>>        return _super !== null && _super.apply(this, arguments) || this;
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^->
1->class second2 extends second1 { 
2 >    }
1->Emitted(65, 5) Source(14, 33) + SourceIndex(3)
2 >Emitted(65, 6) Source(14, 34) + SourceIndex(3)
---
>>>    return second2;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(66, 5) Source(14, 33) + SourceIndex(3)
2 >Emitted(66, 19) Source(14, 34) + SourceIndex(3)
---
>>>}(second1));
1 >
2 >^
3 > 
4 > ^
5 >  ^^^^^^^
6 >         ^^^
7 >            ^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class second2 extends 
5 >  second1
6 >          { }
1 >Emitted(67, 1) Source(14, 33) + SourceIndex(3)
2 >Emitted(67, 2) Source(14, 34) + SourceIndex(3)
3 >Emitted(67, 2) Source(14, 1) + SourceIndex(3)
4 >Emitted(67, 3) Source(14, 23) + SourceIndex(3)
5 >Emitted(67, 10) Source(14, 30) + SourceIndex(3)
6 >Emitted(67, 13) Source(14, 34) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(68, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(69, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(70, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(70, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(71, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(71, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(71, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(72, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(72, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(72, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(72, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(72, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(72, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(72, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(72, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(73, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(73, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(74, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(74, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(75, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(75, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(75, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(75, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(77, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(77, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(77, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(77, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(77, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(77, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(77, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(77, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1->
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1->Emitted(78, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(78, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(78, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(78, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(78, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(78, 17) Source(2, 17) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(79, 1) Source(4, 1) + SourceIndex(5)
2 >Emitted(79, 10) Source(4, 10) + SourceIndex(5)
3 >Emitted(79, 32) Source(4, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(80, 5) Source(4, 33) + SourceIndex(5)
2 >Emitted(80, 16) Source(4, 47) + SourceIndex(5)
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
1->Emitted(81, 10) Source(4, 33) + SourceIndex(5)
2 >Emitted(81, 20) Source(4, 47) + SourceIndex(5)
3 >Emitted(81, 22) Source(4, 33) + SourceIndex(5)
4 >Emitted(81, 43) Source(4, 47) + SourceIndex(5)
5 >Emitted(81, 45) Source(4, 33) + SourceIndex(5)
6 >Emitted(81, 49) Source(4, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(82, 9) Source(4, 33) + SourceIndex(5)
2 >Emitted(82, 31) Source(4, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(84, 1) Source(4, 51) + SourceIndex(5)
2 >Emitted(84, 2) Source(4, 52) + SourceIndex(5)
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
1->Emitted(85, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(85, 23) Source(5, 23) + SourceIndex(5)
3 >Emitted(85, 47) Source(5, 27) + SourceIndex(5)
4 >Emitted(85, 48) Source(5, 28) + SourceIndex(5)
5 >Emitted(85, 50) Source(5, 30) + SourceIndex(5)
6 >Emitted(85, 52) Source(5, 32) + SourceIndex(5)
7 >Emitted(85, 54) Source(5, 34) + SourceIndex(5)
8 >Emitted(85, 56) Source(5, 36) + SourceIndex(5)
9 >Emitted(85, 58) Source(5, 38) + SourceIndex(5)
10>Emitted(85, 59) Source(5, 39) + SourceIndex(5)
11>Emitted(85, 62) Source(5, 41) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

