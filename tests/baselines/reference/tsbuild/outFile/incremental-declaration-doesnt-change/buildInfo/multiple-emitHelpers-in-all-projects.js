//// [/src/first/bin/.tsbuildinfo]
{
  "js": [
    {
      "pos": 0,
      "end": 597,
      "kind": "emitHelpers",
      "data": "typescript:extends"
    },
    {
      "pos": 599,
      "end": 1103,
      "kind": "emitHelpers",
      "data": "typescript:read"
    },
    {
      "pos": 1105,
      "end": 1275,
      "kind": "emitHelpers",
      "data": "typescript:spread"
    },
    {
      "pos": 1277,
      "end": 1910,
      "kind": "text"
    },
    {
      "pos": 1910,
      "end": 1950,
      "kind": "sourceMapUrl"
    }
  ],
  "dts": [
    {
      "pos": 0,
      "end": 290,
      "kind": "text"
    },
    {
      "pos": 290,
      "end": 332,
      "kind": "sourceMapUrl"
    }
  ]
}

//// [/src/first/bin/first-output.js]
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
var first1 = (function () {
    function first1() {
    }
    return first1;
}());
var first2 = (function (_super) {
    __extends(first2, _super);
    function first2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return first2;
}(first1));
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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;AAEjB;IAAA;IAAe,CAAC;IAAD,aAAC;AAAD,CAAC,AAAhB,IAAgB;AAChB;IAAqB,0BAAM;IAA3B;;IAA8B,CAAC;IAAD,aAAC;AAAD,CAAC,AAA/B,CAAqB,MAAM,GAAI;ACH/B,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
10>                 ^^^^^^^^^^^->
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
>>>var first1 = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(38, 1) Source(3, 1) + SourceIndex(1)
---
>>>    function first1() {
1->^^^^
2 >    ^^->
1->
1->Emitted(39, 5) Source(3, 1) + SourceIndex(1)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^->
1->class first1 { 
2 >    }
1->Emitted(40, 5) Source(3, 16) + SourceIndex(1)
2 >Emitted(40, 6) Source(3, 17) + SourceIndex(1)
---
>>>    return first1;
1->^^^^
2 >    ^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(41, 5) Source(3, 16) + SourceIndex(1)
2 >Emitted(41, 18) Source(3, 17) + SourceIndex(1)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class first1 { }
1 >Emitted(42, 1) Source(3, 16) + SourceIndex(1)
2 >Emitted(42, 2) Source(3, 17) + SourceIndex(1)
3 >Emitted(42, 2) Source(3, 1) + SourceIndex(1)
4 >Emitted(42, 6) Source(3, 17) + SourceIndex(1)
---
>>>var first2 = (function (_super) {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(43, 1) Source(4, 1) + SourceIndex(1)
---
>>>    __extends(first2, _super);
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^
1->class first2 extends 
2 >    first1
1->Emitted(44, 5) Source(4, 22) + SourceIndex(1)
2 >Emitted(44, 31) Source(4, 28) + SourceIndex(1)
---
>>>    function first2() {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(45, 5) Source(4, 1) + SourceIndex(1)
---
>>>        return _super !== null && _super.apply(this, arguments) || this;
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^->
1->class first2 extends first1 { 
2 >    }
1->Emitted(47, 5) Source(4, 31) + SourceIndex(1)
2 >Emitted(47, 6) Source(4, 32) + SourceIndex(1)
---
>>>    return first2;
1->^^^^
2 >    ^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(48, 5) Source(4, 31) + SourceIndex(1)
2 >Emitted(48, 18) Source(4, 32) + SourceIndex(1)
---
>>>}(first1));
1 >
2 >^
3 > 
4 > ^
5 >  ^^^^^^
6 >        ^^^
7 >           ^^^^->
1 >
2 >}
3 > 
4 > class first2 extends 
5 >  first1
6 >         { }
1 >Emitted(49, 1) Source(4, 31) + SourceIndex(1)
2 >Emitted(49, 2) Source(4, 32) + SourceIndex(1)
3 >Emitted(49, 2) Source(4, 1) + SourceIndex(1)
4 >Emitted(49, 3) Source(4, 22) + SourceIndex(1)
5 >Emitted(49, 9) Source(4, 28) + SourceIndex(1)
6 >Emitted(49, 12) Source(4, 32) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1->
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^^->
1->
2 >function 
3 >         f
1->Emitted(50, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(50, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(50, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(51, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(51, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(51, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(51, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(52, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(52, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(53, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(53, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(53, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(54, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(54, 16) Source(4, 47) + SourceIndex(2)
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
1->Emitted(55, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(55, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(55, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(55, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(55, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(55, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(56, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(56, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(58, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(58, 2) Source(4, 52) + SourceIndex(2)
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
1->Emitted(59, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(59, 23) Source(5, 23) + SourceIndex(2)
3 >Emitted(59, 47) Source(5, 27) + SourceIndex(2)
4 >Emitted(59, 48) Source(5, 28) + SourceIndex(2)
5 >Emitted(59, 50) Source(5, 30) + SourceIndex(2)
6 >Emitted(59, 52) Source(5, 32) + SourceIndex(2)
7 >Emitted(59, 54) Source(5, 34) + SourceIndex(2)
8 >Emitted(59, 56) Source(5, 36) + SourceIndex(2)
9 >Emitted(59, 58) Source(5, 38) + SourceIndex(2)
10>Emitted(59, 59) Source(5, 39) + SourceIndex(2)
11>Emitted(59, 62) Source(5, 41) + SourceIndex(2)
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
      "end": 597,
      "kind": "emitHelpers",
      "data": "typescript:extends"
    },
    {
      "pos": 599,
      "end": 1103,
      "kind": "emitHelpers",
      "data": "typescript:read"
    },
    {
      "pos": 1105,
      "end": 1275,
      "kind": "emitHelpers",
      "data": "typescript:spread"
    },
    {
      "pos": 1277,
      "end": 1950,
      "kind": "prepend",
      "data": "/src/first/bin/first-output.js"
    },
    {
      "pos": 1952,
      "end": 2796,
      "kind": "prepend",
      "data": "/src/2/second-output.js"
    },
    {
      "pos": 2798,
      "end": 3340,
      "kind": "text"
    },
    {
      "pos": 3340,
      "end": 3380,
      "kind": "sourceMapUrl"
    }
  ],
  "dts": [
    {
      "pos": 0,
      "end": 332,
      "kind": "prepend",
      "data": "/src/first/bin/first-output.d.ts"
    },
    {
      "pos": 334,
      "end": 615,
      "kind": "prepend",
      "data": "/src/2/second-output.d.ts"
    },
    {
      "pos": 617,
      "end": 769,
      "kind": "text"
    },
    {
      "pos": 769,
      "end": 811,
      "kind": "sourceMapUrl"
    }
  ]
}

//// [/src/third/thirdjs/output/third-output.js]
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
var first1 = (function () {
    function first1() {
    }
    return first1;
}());
var first2 = (function (_super) {
    __extends(first2, _super);
    function first2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return first2;
}(first1));
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
function secondsecond_part2Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
secondsecond_part2Spread.apply(void 0, __spread([10, 20, 30]));
//# sourceMappingURL=second-output.js.map
var c = new C();
c.doSomething();
var third1 = (function () {
    function third1() {
    }
    return third1;
}());
var third2 = (function (_super) {
    __extends(third2, _super);
    function third2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return third2;
}(third1));
function thirdthird_part1Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
thirdthird_part1Spread.apply(void 0, __spread([10, 20, 30]));
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;AAEjB;IAAA;IAAe,CAAC;IAAD,aAAC;AAAD,CAAC,AAAhB,IAAgB;AAChB;IAAqB,0BAAM;IAA3B;;IAA8B,CAAC;IAAD,aAAC;AAAD,CAAC,AAA/B,CAAqB,MAAM,GAAI;ACH/B,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;;ACAxC,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IAAA;IAAgB,CAAC;IAAD,cAAC;AAAD,CAAC,AAAjB,IAAiB;AACjB;IAAsB,2BAAO;IAA7B;;IAAgC,CAAC;IAAD,cAAC;AAAD,CAAC,AAAjC,CAAsB,OAAO,GAAI;ACbjC;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,wBAAwB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;;ACP1C,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAEhB;IAAA;IAAe,CAAC;IAAD,aAAC;AAAD,CAAC,AAAhB,IAAgB;AAChB;IAAqB,0BAAM;IAA3B;;IAA8B,CAAC;IAAD,aAAC;AAAD,CAAC,AAA/B,CAAqB,MAAM,GAAI;AAC/B,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
10>                 ^^^^^^^^^^^->
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
>>>var first1 = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(38, 1) Source(3, 1) + SourceIndex(1)
---
>>>    function first1() {
1->^^^^
2 >    ^^->
1->
1->Emitted(39, 5) Source(3, 1) + SourceIndex(1)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^->
1->class first1 { 
2 >    }
1->Emitted(40, 5) Source(3, 16) + SourceIndex(1)
2 >Emitted(40, 6) Source(3, 17) + SourceIndex(1)
---
>>>    return first1;
1->^^^^
2 >    ^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(41, 5) Source(3, 16) + SourceIndex(1)
2 >Emitted(41, 18) Source(3, 17) + SourceIndex(1)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class first1 { }
1 >Emitted(42, 1) Source(3, 16) + SourceIndex(1)
2 >Emitted(42, 2) Source(3, 17) + SourceIndex(1)
3 >Emitted(42, 2) Source(3, 1) + SourceIndex(1)
4 >Emitted(42, 6) Source(3, 17) + SourceIndex(1)
---
>>>var first2 = (function (_super) {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(43, 1) Source(4, 1) + SourceIndex(1)
---
>>>    __extends(first2, _super);
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^
1->class first2 extends 
2 >    first1
1->Emitted(44, 5) Source(4, 22) + SourceIndex(1)
2 >Emitted(44, 31) Source(4, 28) + SourceIndex(1)
---
>>>    function first2() {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(45, 5) Source(4, 1) + SourceIndex(1)
---
>>>        return _super !== null && _super.apply(this, arguments) || this;
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^->
1->class first2 extends first1 { 
2 >    }
1->Emitted(47, 5) Source(4, 31) + SourceIndex(1)
2 >Emitted(47, 6) Source(4, 32) + SourceIndex(1)
---
>>>    return first2;
1->^^^^
2 >    ^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(48, 5) Source(4, 31) + SourceIndex(1)
2 >Emitted(48, 18) Source(4, 32) + SourceIndex(1)
---
>>>}(first1));
1 >
2 >^
3 > 
4 > ^
5 >  ^^^^^^
6 >        ^^^
7 >           ^^^^->
1 >
2 >}
3 > 
4 > class first2 extends 
5 >  first1
6 >         { }
1 >Emitted(49, 1) Source(4, 31) + SourceIndex(1)
2 >Emitted(49, 2) Source(4, 32) + SourceIndex(1)
3 >Emitted(49, 2) Source(4, 1) + SourceIndex(1)
4 >Emitted(49, 3) Source(4, 22) + SourceIndex(1)
5 >Emitted(49, 9) Source(4, 28) + SourceIndex(1)
6 >Emitted(49, 12) Source(4, 32) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1->
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^^->
1->
2 >function 
3 >         f
1->Emitted(50, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(50, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(50, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(51, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(51, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(51, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(51, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(52, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(52, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(53, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(53, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(53, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(54, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(54, 16) Source(4, 47) + SourceIndex(2)
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
1->Emitted(55, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(55, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(55, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(55, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(55, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(55, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(56, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(56, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(58, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(58, 2) Source(4, 52) + SourceIndex(2)
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
1->Emitted(59, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(59, 23) Source(5, 23) + SourceIndex(2)
3 >Emitted(59, 47) Source(5, 27) + SourceIndex(2)
4 >Emitted(59, 48) Source(5, 28) + SourceIndex(2)
5 >Emitted(59, 50) Source(5, 30) + SourceIndex(2)
6 >Emitted(59, 52) Source(5, 32) + SourceIndex(2)
7 >Emitted(59, 54) Source(5, 34) + SourceIndex(2)
8 >Emitted(59, 56) Source(5, 36) + SourceIndex(2)
9 >Emitted(59, 58) Source(5, 38) + SourceIndex(2)
10>Emitted(59, 59) Source(5, 39) + SourceIndex(2)
11>Emitted(59, 62) Source(5, 41) + SourceIndex(2)
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
1 >Emitted(61, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(61, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(61, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(61, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(62, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(62, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(62, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(63, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(63, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(63, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(64, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(64, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(64, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(64, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(64, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(64, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(64, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(64, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(65, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(65, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(66, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(66, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(66, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(66, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(67, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(67, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(67, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(67, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(67, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(67, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(67, 19) Source(11, 2) + SourceIndex(3)
---
>>>var second1 = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(68, 1) Source(13, 1) + SourceIndex(3)
---
>>>    function second1() {
1->^^^^
2 >    ^^->
1->
1->Emitted(69, 5) Source(13, 1) + SourceIndex(3)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^->
1->class second1 { 
2 >    }
1->Emitted(70, 5) Source(13, 17) + SourceIndex(3)
2 >Emitted(70, 6) Source(13, 18) + SourceIndex(3)
---
>>>    return second1;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(71, 5) Source(13, 17) + SourceIndex(3)
2 >Emitted(71, 19) Source(13, 18) + SourceIndex(3)
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
1 >Emitted(72, 1) Source(13, 17) + SourceIndex(3)
2 >Emitted(72, 2) Source(13, 18) + SourceIndex(3)
3 >Emitted(72, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(72, 6) Source(13, 18) + SourceIndex(3)
---
>>>var second2 = (function (_super) {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(73, 1) Source(14, 1) + SourceIndex(3)
---
>>>    __extends(second2, _super);
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
1->class second2 extends 
2 >    second1
1->Emitted(74, 5) Source(14, 23) + SourceIndex(3)
2 >Emitted(74, 32) Source(14, 30) + SourceIndex(3)
---
>>>    function second2() {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(75, 5) Source(14, 1) + SourceIndex(3)
---
>>>        return _super !== null && _super.apply(this, arguments) || this;
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^->
1->class second2 extends second1 { 
2 >    }
1->Emitted(77, 5) Source(14, 33) + SourceIndex(3)
2 >Emitted(77, 6) Source(14, 34) + SourceIndex(3)
---
>>>    return second2;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(78, 5) Source(14, 33) + SourceIndex(3)
2 >Emitted(78, 19) Source(14, 34) + SourceIndex(3)
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
1 >Emitted(79, 1) Source(14, 33) + SourceIndex(3)
2 >Emitted(79, 2) Source(14, 34) + SourceIndex(3)
3 >Emitted(79, 2) Source(14, 1) + SourceIndex(3)
4 >Emitted(79, 3) Source(14, 23) + SourceIndex(3)
5 >Emitted(79, 10) Source(14, 30) + SourceIndex(3)
6 >Emitted(79, 13) Source(14, 34) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(80, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(81, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(82, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(82, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(83, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(83, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(83, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(84, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(84, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(84, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(84, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(84, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(84, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(84, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(84, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(85, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(85, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(86, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(86, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(87, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(87, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(87, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(87, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(88, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(88, 10) Source(7, 10) + SourceIndex(4)
3 >Emitted(88, 34) Source(7, 34) + SourceIndex(4)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(89, 5) Source(7, 35) + SourceIndex(4)
2 >Emitted(89, 16) Source(7, 49) + SourceIndex(4)
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
1->Emitted(90, 10) Source(7, 35) + SourceIndex(4)
2 >Emitted(90, 20) Source(7, 49) + SourceIndex(4)
3 >Emitted(90, 22) Source(7, 35) + SourceIndex(4)
4 >Emitted(90, 43) Source(7, 49) + SourceIndex(4)
5 >Emitted(90, 45) Source(7, 35) + SourceIndex(4)
6 >Emitted(90, 49) Source(7, 49) + SourceIndex(4)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(91, 9) Source(7, 35) + SourceIndex(4)
2 >Emitted(91, 31) Source(7, 49) + SourceIndex(4)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(93, 1) Source(7, 53) + SourceIndex(4)
2 >Emitted(93, 2) Source(7, 54) + SourceIndex(4)
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
1->Emitted(94, 1) Source(8, 1) + SourceIndex(4)
2 >Emitted(94, 25) Source(8, 25) + SourceIndex(4)
3 >Emitted(94, 49) Source(8, 29) + SourceIndex(4)
4 >Emitted(94, 50) Source(8, 30) + SourceIndex(4)
5 >Emitted(94, 52) Source(8, 32) + SourceIndex(4)
6 >Emitted(94, 54) Source(8, 34) + SourceIndex(4)
7 >Emitted(94, 56) Source(8, 36) + SourceIndex(4)
8 >Emitted(94, 58) Source(8, 38) + SourceIndex(4)
9 >Emitted(94, 60) Source(8, 40) + SourceIndex(4)
10>Emitted(94, 61) Source(8, 41) + SourceIndex(4)
11>Emitted(94, 64) Source(8, 43) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>//# sourceMappingURL=second-output.js.map
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
1 >Emitted(96, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(96, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(96, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(96, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(96, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(96, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(96, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(96, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1->
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^->
1->
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1->Emitted(97, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(97, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(97, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(97, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(97, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(97, 17) Source(2, 17) + SourceIndex(5)
---
>>>var third1 = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(98, 1) Source(4, 1) + SourceIndex(5)
---
>>>    function third1() {
1->^^^^
2 >    ^^->
1->
1->Emitted(99, 5) Source(4, 1) + SourceIndex(5)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^->
1->class third1 { 
2 >    }
1->Emitted(100, 5) Source(4, 16) + SourceIndex(5)
2 >Emitted(100, 6) Source(4, 17) + SourceIndex(5)
---
>>>    return third1;
1->^^^^
2 >    ^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(101, 5) Source(4, 16) + SourceIndex(5)
2 >Emitted(101, 18) Source(4, 17) + SourceIndex(5)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class third1 { }
1 >Emitted(102, 1) Source(4, 16) + SourceIndex(5)
2 >Emitted(102, 2) Source(4, 17) + SourceIndex(5)
3 >Emitted(102, 2) Source(4, 1) + SourceIndex(5)
4 >Emitted(102, 6) Source(4, 17) + SourceIndex(5)
---
>>>var third2 = (function (_super) {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(103, 1) Source(5, 1) + SourceIndex(5)
---
>>>    __extends(third2, _super);
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^
1->class third2 extends 
2 >    third1
1->Emitted(104, 5) Source(5, 22) + SourceIndex(5)
2 >Emitted(104, 31) Source(5, 28) + SourceIndex(5)
---
>>>    function third2() {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(105, 5) Source(5, 1) + SourceIndex(5)
---
>>>        return _super !== null && _super.apply(this, arguments) || this;
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^->
1->class third2 extends third1 { 
2 >    }
1->Emitted(107, 5) Source(5, 31) + SourceIndex(5)
2 >Emitted(107, 6) Source(5, 32) + SourceIndex(5)
---
>>>    return third2;
1->^^^^
2 >    ^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(108, 5) Source(5, 31) + SourceIndex(5)
2 >Emitted(108, 18) Source(5, 32) + SourceIndex(5)
---
>>>}(third1));
1 >
2 >^
3 > 
4 > ^
5 >  ^^^^^^
6 >        ^^^
7 >           ^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class third2 extends 
5 >  third1
6 >         { }
1 >Emitted(109, 1) Source(5, 31) + SourceIndex(5)
2 >Emitted(109, 2) Source(5, 32) + SourceIndex(5)
3 >Emitted(109, 2) Source(5, 1) + SourceIndex(5)
4 >Emitted(109, 3) Source(5, 22) + SourceIndex(5)
5 >Emitted(109, 9) Source(5, 28) + SourceIndex(5)
6 >Emitted(109, 12) Source(5, 32) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(110, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(110, 10) Source(6, 10) + SourceIndex(5)
3 >Emitted(110, 32) Source(6, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(111, 5) Source(6, 33) + SourceIndex(5)
2 >Emitted(111, 16) Source(6, 47) + SourceIndex(5)
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
1->Emitted(112, 10) Source(6, 33) + SourceIndex(5)
2 >Emitted(112, 20) Source(6, 47) + SourceIndex(5)
3 >Emitted(112, 22) Source(6, 33) + SourceIndex(5)
4 >Emitted(112, 43) Source(6, 47) + SourceIndex(5)
5 >Emitted(112, 45) Source(6, 33) + SourceIndex(5)
6 >Emitted(112, 49) Source(6, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(113, 9) Source(6, 33) + SourceIndex(5)
2 >Emitted(113, 31) Source(6, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(115, 1) Source(6, 51) + SourceIndex(5)
2 >Emitted(115, 2) Source(6, 52) + SourceIndex(5)
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
1->Emitted(116, 1) Source(7, 1) + SourceIndex(5)
2 >Emitted(116, 23) Source(7, 23) + SourceIndex(5)
3 >Emitted(116, 47) Source(7, 27) + SourceIndex(5)
4 >Emitted(116, 48) Source(7, 28) + SourceIndex(5)
5 >Emitted(116, 50) Source(7, 30) + SourceIndex(5)
6 >Emitted(116, 52) Source(7, 32) + SourceIndex(5)
7 >Emitted(116, 54) Source(7, 34) + SourceIndex(5)
8 >Emitted(116, 56) Source(7, 36) + SourceIndex(5)
9 >Emitted(116, 58) Source(7, 38) + SourceIndex(5)
10>Emitted(116, 59) Source(7, 39) + SourceIndex(5)
11>Emitted(116, 62) Source(7, 41) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

