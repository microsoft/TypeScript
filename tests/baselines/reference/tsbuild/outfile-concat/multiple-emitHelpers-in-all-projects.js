currentDirectory:: / useCaseSensitiveFileNames: false
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
}

//// [/src/first/first_part2.ts]
console.log(f());


//// [/src/first/first_part3.ts]
function f() {
    return "JS does hoists";
}

function firstfirst_part3Spread(...b: number[]) { }
const firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread(10, ...firstfirst_part3_ar);

//// [/src/first/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "downlevelIteration": true,
    "sourceMap": true,
    "declarationMap": true,
    "outFile": "./bin/first-output.js",
    "skipDefaultLibCheck": true
  },
  "files": [
    "first_PART1.ts",
    "first_part2.ts",
    "first_part3.ts"
  ],
  "references": []
}

//// [/src/second/second_part1.ts]
namespace N {
    // Comment text
}

namespace N {
    function f() {
        console.log('testing');
    }

    f();
}
function forsecondsecond_part1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}

//// [/src/second/second_part2.ts]
class C {
    doSomething() {
        console.log("something got done");
    }
}

function secondsecond_part2Spread(...b: number[]) { }
const secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread(10, ...secondsecond_part2_ar);

//// [/src/second/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "downlevelIteration": true,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "outFile": "../2/second-output.js",
    "skipDefaultLibCheck": true
  },
  "references": []
}

//// [/src/third/third_part1.ts]
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}
function thirdthird_part1Spread(...b: number[]) { }
const thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread(10, ...thirdthird_part1_ar);

//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "downlevelIteration": true,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "outFile": "./thirdjs/output/third-output.js",
    "skipDefaultLibCheck": true
  },
  "files": [
    "third_part1.ts"
  ],
  "references": [
    {
      "path": "../first",
      "prepend": true
    },
    {
      "path": "../second",
      "prepend": true
    }
  ]
}



Output::
/lib/tsc --b /src/third --verbose
[[90m12:00:27 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:28 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.tsbuildinfo' does not exist

[[90m12:00:29 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:00:39 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/2/second-output.tsbuildinfo' does not exist

[[90m12:00:40 AM[0m] Building project '/src/second/tsconfig.json'...

[[90m12:00:50 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/thirdjs/output/third-output.tsbuildinfo' does not exist

[[90m12:00:51 AM[0m] Building project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/2/second-output.d.ts]
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;
declare const secondsecond_part2_ar: number[];
//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC"}

//// [/src/2/second-output.d.ts.map.baseline.txt]
===================================================================
JsFile: second-output.d.ts
mapUrl: second-output.d.ts.map
sourceRoot: 
sources: ../second/second_part1.ts,../second/second_part2.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/2/second-output.d.ts
sourceFile:../second/second_part1.ts
-------------------------------------------------------------------
>>>declare namespace N {
1 >
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1 >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 19) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 20) Source(1, 12) + SourceIndex(0)
4 >Emitted(1, 21) Source(1, 13) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(2, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare namespace N {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1->
  >
  >
2 >namespace 
3 >                  N
4 >                    
1->Emitted(3, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(3, 19) Source(5, 11) + SourceIndex(0)
3 >Emitted(3, 20) Source(5, 12) + SourceIndex(0)
4 >Emitted(3, 21) Source(5, 13) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(4, 2) Source(11, 2) + SourceIndex(0)
---
>>>declare function forsecondsecond_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                          ^^^^^^^^^
1->
  >
2 >function 
3 >                 forsecondsecond_part1Rest
4 >                                          () {
  >                                          const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                          }
1->Emitted(5, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(5, 18) Source(12, 10) + SourceIndex(0)
3 >Emitted(5, 43) Source(12, 35) + SourceIndex(0)
4 >Emitted(5, 52) Source(14, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.d.ts
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^->
1 >
2 >class 
3 >              C
1 >Emitted(6, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(6, 15) Source(1, 7) + SourceIndex(1)
3 >Emitted(6, 16) Source(1, 8) + SourceIndex(1)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(7, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(7, 16) Source(2, 16) + SourceIndex(1)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(8, 2) Source(5, 2) + SourceIndex(1)
---
>>>declare function secondsecond_part2Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                         ^
5 >                                          ^^^
6 >                                             ^^^
7 >                                                ^^^^^^
8 >                                                      ^^
9 >                                                        ^^^^^^^^
1->
  >
  >
2 >function 
3 >                 secondsecond_part2Spread
4 >                                         (
5 >                                          ...
6 >                                             b: 
7 >                                                number
8 >                                                      []
9 >                                                        ) { }
1->Emitted(9, 1) Source(7, 1) + SourceIndex(1)
2 >Emitted(9, 18) Source(7, 10) + SourceIndex(1)
3 >Emitted(9, 42) Source(7, 34) + SourceIndex(1)
4 >Emitted(9, 43) Source(7, 35) + SourceIndex(1)
5 >Emitted(9, 46) Source(7, 38) + SourceIndex(1)
6 >Emitted(9, 49) Source(7, 41) + SourceIndex(1)
7 >Emitted(9, 55) Source(7, 47) + SourceIndex(1)
8 >Emitted(9, 57) Source(7, 49) + SourceIndex(1)
9 >Emitted(9, 65) Source(7, 54) + SourceIndex(1)
---
>>>declare const secondsecond_part2_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^^^
5 >                                   ^^^^^^^^^^
6 >                                             ^
1 >
  >
2 >
3 >        const 
4 >              secondsecond_part2_ar
5 >                                    = [20, 30]
6 >                                             ;
1 >Emitted(10, 1) Source(8, 1) + SourceIndex(1)
2 >Emitted(10, 9) Source(8, 1) + SourceIndex(1)
3 >Emitted(10, 15) Source(8, 7) + SourceIndex(1)
4 >Emitted(10, 36) Source(8, 28) + SourceIndex(1)
5 >Emitted(10, 46) Source(8, 39) + SourceIndex(1)
6 >Emitted(10, 47) Source(8, 40) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.js]
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE"}

//// [/src/2/second-output.js.map.baseline.txt]
===================================================================
JsFile: second-output.js
mapUrl: second-output.js.map
sourceRoot: 
sources: ../second/second_part1.ts,../second/second_part2.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part1.ts
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
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
>>>};
>>>var N;
1 >
2 >^^^^
3 >    ^
4 >     ^
5 >      ^^^^^^^^^->
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
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(5, 11) + SourceIndex(0)
3 >Emitted(37, 6) Source(5, 12) + SourceIndex(0)
4 >Emitted(37, 7) Source(11, 2) + SourceIndex(0)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(38, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(38, 12) Source(5, 11) + SourceIndex(0)
3 >Emitted(38, 13) Source(5, 12) + SourceIndex(0)
---
>>>    function f() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^^^^^^^^->
1-> {
  >    
2 >    function 
3 >             f
1->Emitted(39, 5) Source(6, 5) + SourceIndex(0)
2 >Emitted(39, 14) Source(6, 14) + SourceIndex(0)
3 >Emitted(39, 15) Source(6, 15) + SourceIndex(0)
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
1->Emitted(40, 9) Source(7, 9) + SourceIndex(0)
2 >Emitted(40, 16) Source(7, 16) + SourceIndex(0)
3 >Emitted(40, 17) Source(7, 17) + SourceIndex(0)
4 >Emitted(40, 20) Source(7, 20) + SourceIndex(0)
5 >Emitted(40, 21) Source(7, 21) + SourceIndex(0)
6 >Emitted(40, 30) Source(7, 30) + SourceIndex(0)
7 >Emitted(40, 31) Source(7, 31) + SourceIndex(0)
8 >Emitted(40, 32) Source(7, 32) + SourceIndex(0)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(41, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(41, 6) Source(8, 6) + SourceIndex(0)
---
>>>    f();
1->^^^^
2 >    ^
3 >     ^^
4 >       ^
5 >        ^^^^^^^^^^->
1->
  >
  >    
2 >    f
3 >     ()
4 >       ;
1->Emitted(42, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(42, 6) Source(10, 6) + SourceIndex(0)
3 >Emitted(42, 8) Source(10, 8) + SourceIndex(0)
4 >Emitted(42, 9) Source(10, 9) + SourceIndex(0)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(43, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(43, 2) Source(11, 2) + SourceIndex(0)
3 >Emitted(43, 4) Source(5, 11) + SourceIndex(0)
4 >Emitted(43, 5) Source(5, 12) + SourceIndex(0)
5 >Emitted(43, 10) Source(5, 11) + SourceIndex(0)
6 >Emitted(43, 11) Source(5, 12) + SourceIndex(0)
7 >Emitted(43, 19) Source(11, 2) + SourceIndex(0)
---
>>>function forsecondsecond_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forsecondsecond_part1Rest
1->Emitted(44, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(44, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(44, 35) Source(12, 35) + SourceIndex(0)
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
1->Emitted(45, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(45, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(45, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(45, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(45, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(45, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(45, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(45, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(45, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(45, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(45, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(45, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(45, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(45, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(45, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(45, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(45, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(45, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(45, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(45, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(45, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(45, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(45, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(45, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(45, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(46, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(46, 2) Source(14, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(47, 1) Source(1, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(48, 5) Source(1, 1) + SourceIndex(1)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->class C {
  >    doSomething() {
  >        console.log("something got done");
  >    }
  >
2 >    }
1->Emitted(49, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(49, 6) Source(5, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(50, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(50, 28) Source(2, 16) + SourceIndex(1)
3 >Emitted(50, 31) Source(2, 5) + SourceIndex(1)
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
1->Emitted(51, 9) Source(3, 9) + SourceIndex(1)
2 >Emitted(51, 16) Source(3, 16) + SourceIndex(1)
3 >Emitted(51, 17) Source(3, 17) + SourceIndex(1)
4 >Emitted(51, 20) Source(3, 20) + SourceIndex(1)
5 >Emitted(51, 21) Source(3, 21) + SourceIndex(1)
6 >Emitted(51, 41) Source(3, 41) + SourceIndex(1)
7 >Emitted(51, 42) Source(3, 42) + SourceIndex(1)
8 >Emitted(51, 43) Source(3, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(52, 5) Source(4, 5) + SourceIndex(1)
2 >Emitted(52, 6) Source(4, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(53, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(53, 13) Source(5, 2) + SourceIndex(1)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(54, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(54, 2) Source(5, 2) + SourceIndex(1)
3 >Emitted(54, 2) Source(1, 1) + SourceIndex(1)
4 >Emitted(54, 6) Source(5, 2) + SourceIndex(1)
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
1->Emitted(55, 1) Source(7, 1) + SourceIndex(1)
2 >Emitted(55, 10) Source(7, 10) + SourceIndex(1)
3 >Emitted(55, 34) Source(7, 34) + SourceIndex(1)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(56, 5) Source(7, 35) + SourceIndex(1)
2 >Emitted(56, 16) Source(7, 49) + SourceIndex(1)
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
1->Emitted(57, 10) Source(7, 35) + SourceIndex(1)
2 >Emitted(57, 20) Source(7, 49) + SourceIndex(1)
3 >Emitted(57, 22) Source(7, 35) + SourceIndex(1)
4 >Emitted(57, 43) Source(7, 49) + SourceIndex(1)
5 >Emitted(57, 45) Source(7, 35) + SourceIndex(1)
6 >Emitted(57, 49) Source(7, 49) + SourceIndex(1)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(58, 9) Source(7, 35) + SourceIndex(1)
2 >Emitted(58, 31) Source(7, 49) + SourceIndex(1)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(60, 1) Source(7, 53) + SourceIndex(1)
2 >Emitted(60, 2) Source(7, 54) + SourceIndex(1)
---
>>>var secondsecond_part2_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^^^
4 >                         ^^^
5 >                            ^
6 >                             ^^
7 >                               ^^
8 >                                 ^^
9 >                                   ^
10>                                    ^
11>                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    secondsecond_part2_ar
4 >                          = 
5 >                            [
6 >                             20
7 >                               , 
8 >                                 30
9 >                                   ]
10>                                    ;
1->Emitted(61, 1) Source(8, 1) + SourceIndex(1)
2 >Emitted(61, 5) Source(8, 7) + SourceIndex(1)
3 >Emitted(61, 26) Source(8, 28) + SourceIndex(1)
4 >Emitted(61, 29) Source(8, 31) + SourceIndex(1)
5 >Emitted(61, 30) Source(8, 32) + SourceIndex(1)
6 >Emitted(61, 32) Source(8, 34) + SourceIndex(1)
7 >Emitted(61, 34) Source(8, 36) + SourceIndex(1)
8 >Emitted(61, 36) Source(8, 38) + SourceIndex(1)
9 >Emitted(61, 37) Source(8, 39) + SourceIndex(1)
10>Emitted(61, 38) Source(8, 40) + SourceIndex(1)
---
>>>secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                      ^^
5 >                                                        ^^^^^^^^^^
6 >                                                                  ^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                       ^^^^^^^^^^^
1->
  >
2 >secondsecond_part2Spread
3 >                        (
4 >                                                      10
5 >                                                        , ...
6 >                                                                  secondsecond_part2_ar
7 >                                                                                       );
1->Emitted(62, 1) Source(9, 1) + SourceIndex(1)
2 >Emitted(62, 25) Source(9, 25) + SourceIndex(1)
3 >Emitted(62, 55) Source(9, 26) + SourceIndex(1)
4 >Emitted(62, 57) Source(9, 28) + SourceIndex(1)
5 >Emitted(62, 67) Source(9, 33) + SourceIndex(1)
6 >Emitted(62, 88) Source(9, 54) + SourceIndex(1)
7 >Emitted(62, 99) Source(9, 56) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../second","sourceFiles":["../second/second_part1.ts","../second/second_part2.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":980,"kind":"emitHelpers","data":"typescript:read"},{"pos":981,"end":1361,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":1362,"end":2030,"kind":"text"}],"sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]},"mapHash":"-30083835302-{\"version\":3,\"file\":\"second-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE\"}","hash":"15985439346-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nfunction secondsecond_part2Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));\n//# sourceMappingURL=second-output.js.map"},"dts":{"sections":[{"pos":0,"end":257,"kind":"text"}],"mapHash":"-6793954603-{\"version\":3,\"file\":\"second-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC\"}","hash":"-12368550231-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n//# sourceMappingURL=second-output.d.ts.map"}},"program":{"fileNames":["../../lib/lib.d.ts","../second/second_part1.ts","../second/second_part2.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-13362958657-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\nfunction forsecondsecond_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}","-27196066044-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n\nfunction secondsecond_part2Spread(...b: number[]) { }\nconst secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread(10, ...secondsecond_part2_ar);"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"downlevelIteration":true,"outFile":"./second-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-21549614962-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n","latestChangedDtsFile":"./second-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/2/second-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/2/second-output.js
----------------------------------------------------------------------
emitHelpers: (0-490):: typescript:rest
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
emitHelpers: (491-980):: typescript:read
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
emitHelpers: (981-1361):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
text: (1362-2030)
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
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));

======================================================================
======================================================================
File:: /src/2/second-output.d.ts
----------------------------------------------------------------------
text: (0-257)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;
declare const secondsecond_part2_ar: number[];

======================================================================

//// [/src/2/second-output.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "../second",
    "sourceFiles": [
      "../second/second_part1.ts",
      "../second/second_part2.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 490,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 491,
          "end": 980,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 981,
          "end": 1361,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 1362,
          "end": 2030,
          "kind": "text"
        }
      ],
      "hash": "15985439346-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nfunction secondsecond_part2Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));\n//# sourceMappingURL=second-output.js.map",
      "mapHash": "-30083835302-{\"version\":3,\"file\":\"second-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE\"}",
      "sources": {
        "helpers": [
          "typescript:rest",
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 257,
          "kind": "text"
        }
      ],
      "hash": "-12368550231-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n//# sourceMappingURL=second-output.d.ts.map",
      "mapHash": "-6793954603-{\"version\":3,\"file\":\"second-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../second/second_part1.ts",
      "../second/second_part2.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../second/second_part1.ts": "-13362958657-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\nfunction forsecondsecond_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}",
      "../second/second_part2.ts": "-27196066044-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n\nfunction secondsecond_part2Spread(...b: number[]) { }\nconst secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread(10, ...secondsecond_part2_ar);"
    },
    "root": [
      [
        2,
        "../second/second_part1.ts"
      ],
      [
        3,
        "../second/second_part2.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "outFile": "./second-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-21549614962-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n",
    "latestChangedDtsFile": "./second-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 5901
}

//// [/src/first/bin/first-output.d.ts]
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
declare const firstfirst_part3_ar: number[];
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC"}

//// [/src/first/bin/first-output.d.ts.map.baseline.txt]
===================================================================
JsFile: first-output.d.ts
mapUrl: first-output.d.ts.map
sourceRoot: 
sources: ../first_PART1.ts,../first_part2.ts,../first_part3.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.d.ts
sourceFile:../first_PART1.ts
-------------------------------------------------------------------
>>>interface TheFirst {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1 >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 19) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(2, 5) Source(2, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(2, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hello, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^^
6 >                                ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hello, world"
6 >                                ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
6 >Emitted(4, 34) Source(5, 26) + SourceIndex(0)
---
>>>interface NoJsForHereEither {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^^^^^^^^^^
1 >
  >
  >
2 >interface 
3 >          NoJsForHereEither
1 >Emitted(5, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(7, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(7, 28) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(6, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(8, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(8, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(8, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(8, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(9, 2) + SourceIndex(0)
---
>>>declare function forfirstfirst_PART1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
1->
  >
  >console.log(s);
  >
2 >function 
3 >                 forfirstfirst_PART1Rest
4 >                                        () {
  >                                        const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                        }
1->Emitted(8, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(8, 18) Source(12, 10) + SourceIndex(0)
3 >Emitted(8, 41) Source(12, 33) + SourceIndex(0)
4 >Emitted(8, 50) Source(14, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.d.ts
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>declare function f(): string;
1 >
2 >^^^^^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^
5 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >                 f
4 >                  () {
  >                      return "JS does hoists";
  >                  }
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(9, 18) Source(1, 10) + SourceIndex(2)
3 >Emitted(9, 19) Source(1, 11) + SourceIndex(2)
4 >Emitted(9, 30) Source(3, 2) + SourceIndex(2)
---
>>>declare function firstfirst_part3Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^
6 >                                           ^^^
7 >                                              ^^^^^^
8 >                                                    ^^
9 >                                                      ^^^^^^^^
1->
  >
  >
2 >function 
3 >                 firstfirst_part3Spread
4 >                                       (
5 >                                        ...
6 >                                           b: 
7 >                                              number
8 >                                                    []
9 >                                                      ) { }
1->Emitted(10, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(10, 18) Source(5, 10) + SourceIndex(2)
3 >Emitted(10, 40) Source(5, 32) + SourceIndex(2)
4 >Emitted(10, 41) Source(5, 33) + SourceIndex(2)
5 >Emitted(10, 44) Source(5, 36) + SourceIndex(2)
6 >Emitted(10, 47) Source(5, 39) + SourceIndex(2)
7 >Emitted(10, 53) Source(5, 45) + SourceIndex(2)
8 >Emitted(10, 55) Source(5, 47) + SourceIndex(2)
9 >Emitted(10, 63) Source(5, 52) + SourceIndex(2)
---
>>>declare const firstfirst_part3_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^
5 >                                 ^^^^^^^^^^
6 >                                           ^
1 >
  >
2 >
3 >        const 
4 >              firstfirst_part3_ar
5 >                                  = [20, 30]
6 >                                           ;
1 >Emitted(11, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(11, 9) Source(6, 1) + SourceIndex(2)
3 >Emitted(11, 15) Source(6, 7) + SourceIndex(2)
4 >Emitted(11, 34) Source(6, 26) + SourceIndex(2)
5 >Emitted(11, 44) Source(6, 37) + SourceIndex(2)
6 >Emitted(11, 45) Source(6, 38) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.d.ts.map

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE"}

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
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
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
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(37, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(37, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(37, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(37, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(38, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(38, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(38, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(38, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(38, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(38, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(38, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(38, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
1->Emitted(39, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(39, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(39, 33) Source(12, 33) + SourceIndex(0)
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
1->Emitted(40, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(40, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(40, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(40, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(40, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(40, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(40, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(40, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(40, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(40, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(40, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(40, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(40, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(40, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(40, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(40, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(40, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(40, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(40, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(40, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(40, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(40, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(40, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(40, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(40, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(41, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(42, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(42, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(42, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(42, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(42, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(42, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(42, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(42, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(42, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(43, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(43, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(43, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(44, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(44, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(44, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(44, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(45, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(45, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(46, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(46, 10) Source(5, 10) + SourceIndex(2)
3 >Emitted(46, 32) Source(5, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(47, 5) Source(5, 33) + SourceIndex(2)
2 >Emitted(47, 16) Source(5, 47) + SourceIndex(2)
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
1->Emitted(48, 10) Source(5, 33) + SourceIndex(2)
2 >Emitted(48, 20) Source(5, 47) + SourceIndex(2)
3 >Emitted(48, 22) Source(5, 33) + SourceIndex(2)
4 >Emitted(48, 43) Source(5, 47) + SourceIndex(2)
5 >Emitted(48, 45) Source(5, 33) + SourceIndex(2)
6 >Emitted(48, 49) Source(5, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(49, 9) Source(5, 33) + SourceIndex(2)
2 >Emitted(49, 31) Source(5, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(51, 1) Source(5, 51) + SourceIndex(2)
2 >Emitted(51, 2) Source(5, 52) + SourceIndex(2)
---
>>>var firstfirst_part3_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    firstfirst_part3_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(52, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(52, 5) Source(6, 7) + SourceIndex(2)
3 >Emitted(52, 24) Source(6, 26) + SourceIndex(2)
4 >Emitted(52, 27) Source(6, 29) + SourceIndex(2)
5 >Emitted(52, 28) Source(6, 30) + SourceIndex(2)
6 >Emitted(52, 30) Source(6, 32) + SourceIndex(2)
7 >Emitted(52, 32) Source(6, 34) + SourceIndex(2)
8 >Emitted(52, 34) Source(6, 36) + SourceIndex(2)
9 >Emitted(52, 35) Source(6, 37) + SourceIndex(2)
10>Emitted(52, 36) Source(6, 38) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                firstfirst_part3_ar
7 >                                                                                   );
1->Emitted(53, 1) Source(7, 1) + SourceIndex(2)
2 >Emitted(53, 23) Source(7, 23) + SourceIndex(2)
3 >Emitted(53, 53) Source(7, 24) + SourceIndex(2)
4 >Emitted(53, 55) Source(7, 26) + SourceIndex(2)
5 >Emitted(53, 65) Source(7, 31) + SourceIndex(2)
6 >Emitted(53, 84) Source(7, 50) + SourceIndex(2)
7 >Emitted(53, 95) Source(7, 52) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":980,"kind":"emitHelpers","data":"typescript:read"},{"pos":981,"end":1361,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":1362,"end":1854,"kind":"text"}],"sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]},"mapHash":"-16946718015-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}","hash":"-7416090205-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":307,"kind":"text"}],"mapHash":"11304487505-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}","hash":"-10647290581-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-25468252236-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}","6007494133-console.log(f());\n","-1751035906-function f() {\n    return \"JS does hoists\";\n}\n\nfunction firstfirst_part3Spread(...b: number[]) { }\nconst firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread(10, ...firstfirst_part3_ar);"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"downlevelIteration":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
emitHelpers: (0-490):: typescript:rest
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
emitHelpers: (491-980):: typescript:read
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
emitHelpers: (981-1361):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
text: (1362-1854)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-307)
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
declare const firstfirst_part3_ar: number[];

======================================================================

//// [/src/first/bin/first-output.tsbuildinfo.readable.baseline.txt]
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
          "end": 490,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 491,
          "end": 980,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 981,
          "end": 1361,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 1362,
          "end": 1854,
          "kind": "text"
        }
      ],
      "hash": "-7416090205-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-16946718015-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}",
      "sources": {
        "helpers": [
          "typescript:rest",
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 307,
          "kind": "text"
        }
      ],
      "hash": "-10647290581-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "11304487505-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../first_part1.ts",
      "../first_part2.ts",
      "../first_part3.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../first_part1.ts": "-25468252236-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}",
      "../first_part2.ts": "6007494133-console.log(f());\n",
      "../first_part3.ts": "-1751035906-function f() {\n    return \"JS does hoists\";\n}\n\nfunction firstfirst_part3Spread(...b: number[]) { }\nconst firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread(10, ...firstfirst_part3_ar);"
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "../first_part1.ts",
          "../first_part2.ts",
          "../first_part3.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "outFile": "./first-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 5768
}

//// [/src/third/thirdjs/output/third-output.d.ts]
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
declare const firstfirst_part3_ar: number[];
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;
declare const secondsecond_part2_ar: number[];
declare var c: C;
declare function forthirdthird_part1Rest(): void;
declare function thirdthird_part1Spread(...b: number[]): void;
declare const thirdthird_part1_ar: number[];
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC;ACLrC,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC;ACPvC,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC"}

//// [/src/third/thirdjs/output/third-output.d.ts.map.baseline.txt]
===================================================================
JsFile: third-output.d.ts
mapUrl: third-output.d.ts.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../../first/first_part3.ts,../../../second/second_part1.ts,../../../second/second_part2.ts,../../third_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>interface TheFirst {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1 >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 19) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(2, 5) Source(2, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(2, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hello, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^^
6 >                                ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hello, world"
6 >                                ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
6 >Emitted(4, 34) Source(5, 26) + SourceIndex(0)
---
>>>interface NoJsForHereEither {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^^^^^^^^^^
1 >
  >
  >
2 >interface 
3 >          NoJsForHereEither
1 >Emitted(5, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(7, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(7, 28) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(6, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(8, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(8, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(8, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(8, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(9, 2) + SourceIndex(0)
---
>>>declare function forfirstfirst_PART1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
1->
  >
  >console.log(s);
  >
2 >function 
3 >                 forfirstfirst_PART1Rest
4 >                                        () {
  >                                        const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                        }
1->Emitted(8, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(8, 18) Source(12, 10) + SourceIndex(0)
3 >Emitted(8, 41) Source(12, 33) + SourceIndex(0)
4 >Emitted(8, 50) Source(14, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>declare function f(): string;
1 >
2 >^^^^^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^
5 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >                 f
4 >                  () {
  >                      return "JS does hoists";
  >                  }
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(9, 18) Source(1, 10) + SourceIndex(1)
3 >Emitted(9, 19) Source(1, 11) + SourceIndex(1)
4 >Emitted(9, 30) Source(3, 2) + SourceIndex(1)
---
>>>declare function firstfirst_part3Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^
6 >                                           ^^^
7 >                                              ^^^^^^
8 >                                                    ^^
9 >                                                      ^^^^^^^^
1->
  >
  >
2 >function 
3 >                 firstfirst_part3Spread
4 >                                       (
5 >                                        ...
6 >                                           b: 
7 >                                              number
8 >                                                    []
9 >                                                      ) { }
1->Emitted(10, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(10, 18) Source(5, 10) + SourceIndex(1)
3 >Emitted(10, 40) Source(5, 32) + SourceIndex(1)
4 >Emitted(10, 41) Source(5, 33) + SourceIndex(1)
5 >Emitted(10, 44) Source(5, 36) + SourceIndex(1)
6 >Emitted(10, 47) Source(5, 39) + SourceIndex(1)
7 >Emitted(10, 53) Source(5, 45) + SourceIndex(1)
8 >Emitted(10, 55) Source(5, 47) + SourceIndex(1)
9 >Emitted(10, 63) Source(5, 52) + SourceIndex(1)
---
>>>declare const firstfirst_part3_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^
5 >                                 ^^^^^^^^^^
6 >                                           ^
1 >
  >
2 >
3 >        const 
4 >              firstfirst_part3_ar
5 >                                  = [20, 30]
6 >                                           ;
1 >Emitted(11, 1) Source(6, 1) + SourceIndex(1)
2 >Emitted(11, 9) Source(6, 1) + SourceIndex(1)
3 >Emitted(11, 15) Source(6, 7) + SourceIndex(1)
4 >Emitted(11, 34) Source(6, 26) + SourceIndex(1)
5 >Emitted(11, 44) Source(6, 37) + SourceIndex(1)
6 >Emitted(11, 45) Source(6, 38) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>declare namespace N {
1 >
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1 >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(12, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(12, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(12, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(12, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(13, 2) Source(3, 2) + SourceIndex(2)
---
>>>declare namespace N {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1->
  >
  >
2 >namespace 
3 >                  N
4 >                    
1->Emitted(14, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(14, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(14, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(14, 21) Source(5, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(15, 2) Source(11, 2) + SourceIndex(2)
---
>>>declare function forsecondsecond_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                          ^^^^^^^^^
1->
  >
2 >function 
3 >                 forsecondsecond_part1Rest
4 >                                          () {
  >                                          const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                          }
1->Emitted(16, 1) Source(12, 1) + SourceIndex(2)
2 >Emitted(16, 18) Source(12, 10) + SourceIndex(2)
3 >Emitted(16, 43) Source(12, 35) + SourceIndex(2)
4 >Emitted(16, 52) Source(14, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^->
1 >
2 >class 
3 >              C
1 >Emitted(17, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(17, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(17, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(18, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(18, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(19, 2) Source(5, 2) + SourceIndex(3)
---
>>>declare function secondsecond_part2Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                         ^
5 >                                          ^^^
6 >                                             ^^^
7 >                                                ^^^^^^
8 >                                                      ^^
9 >                                                        ^^^^^^^^
1->
  >
  >
2 >function 
3 >                 secondsecond_part2Spread
4 >                                         (
5 >                                          ...
6 >                                             b: 
7 >                                                number
8 >                                                      []
9 >                                                        ) { }
1->Emitted(20, 1) Source(7, 1) + SourceIndex(3)
2 >Emitted(20, 18) Source(7, 10) + SourceIndex(3)
3 >Emitted(20, 42) Source(7, 34) + SourceIndex(3)
4 >Emitted(20, 43) Source(7, 35) + SourceIndex(3)
5 >Emitted(20, 46) Source(7, 38) + SourceIndex(3)
6 >Emitted(20, 49) Source(7, 41) + SourceIndex(3)
7 >Emitted(20, 55) Source(7, 47) + SourceIndex(3)
8 >Emitted(20, 57) Source(7, 49) + SourceIndex(3)
9 >Emitted(20, 65) Source(7, 54) + SourceIndex(3)
---
>>>declare const secondsecond_part2_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^^^
5 >                                   ^^^^^^^^^^
6 >                                             ^
1 >
  >
2 >
3 >        const 
4 >              secondsecond_part2_ar
5 >                                    = [20, 30]
6 >                                             ;
1 >Emitted(21, 1) Source(8, 1) + SourceIndex(3)
2 >Emitted(21, 9) Source(8, 1) + SourceIndex(3)
3 >Emitted(21, 15) Source(8, 7) + SourceIndex(3)
4 >Emitted(21, 36) Source(8, 28) + SourceIndex(3)
5 >Emitted(21, 46) Source(8, 39) + SourceIndex(3)
6 >Emitted(21, 47) Source(8, 40) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>declare var c: C;
1 >
2 >^^^^^^^^
3 >        ^^^^
4 >            ^
5 >             ^^^
6 >                ^
7 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1 >Emitted(22, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(22, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(22, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(22, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(22, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(22, 18) Source(1, 17) + SourceIndex(4)
---
>>>declare function forthirdthird_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
5 >                                                 ^^^^^^^^^^^^^->
1->
  >c.doSomething();
  >
2 >function 
3 >                 forthirdthird_part1Rest
4 >                                        () {
  >                                        const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                        }
1->Emitted(23, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(23, 18) Source(3, 10) + SourceIndex(4)
3 >Emitted(23, 41) Source(3, 33) + SourceIndex(4)
4 >Emitted(23, 50) Source(5, 2) + SourceIndex(4)
---
>>>declare function thirdthird_part1Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^
6 >                                           ^^^
7 >                                              ^^^^^^
8 >                                                    ^^
9 >                                                      ^^^^^^^^
1->
  >
2 >function 
3 >                 thirdthird_part1Spread
4 >                                       (
5 >                                        ...
6 >                                           b: 
7 >                                              number
8 >                                                    []
9 >                                                      ) { }
1->Emitted(24, 1) Source(6, 1) + SourceIndex(4)
2 >Emitted(24, 18) Source(6, 10) + SourceIndex(4)
3 >Emitted(24, 40) Source(6, 32) + SourceIndex(4)
4 >Emitted(24, 41) Source(6, 33) + SourceIndex(4)
5 >Emitted(24, 44) Source(6, 36) + SourceIndex(4)
6 >Emitted(24, 47) Source(6, 39) + SourceIndex(4)
7 >Emitted(24, 53) Source(6, 45) + SourceIndex(4)
8 >Emitted(24, 55) Source(6, 47) + SourceIndex(4)
9 >Emitted(24, 63) Source(6, 52) + SourceIndex(4)
---
>>>declare const thirdthird_part1_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^
5 >                                 ^^^^^^^^^^
6 >                                           ^
1 >
  >
2 >
3 >        const 
4 >              thirdthird_part1_ar
5 >                                  = [20, 30]
6 >                                           ;
1 >Emitted(25, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(25, 9) Source(7, 1) + SourceIndex(4)
3 >Emitted(25, 15) Source(7, 7) + SourceIndex(4)
4 >Emitted(25, 34) Source(7, 26) + SourceIndex(4)
5 >Emitted(25, 44) Source(7, 37) + SourceIndex(4)
6 >Emitted(25, 45) Source(7, 38) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
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
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
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
var thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE"}

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
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
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
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(37, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(37, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(37, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(37, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(38, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(38, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(38, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(38, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(38, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(38, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(38, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(38, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
1->Emitted(39, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(39, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(39, 33) Source(12, 33) + SourceIndex(0)
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
1->Emitted(40, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(40, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(40, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(40, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(40, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(40, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(40, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(40, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(40, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(40, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(40, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(40, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(40, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(40, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(40, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(40, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(40, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(40, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(40, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(40, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(40, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(40, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(40, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(40, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(40, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(41, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(42, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(42, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(42, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(42, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(42, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(42, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(42, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(42, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(42, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(43, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(43, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(43, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(44, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(44, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(44, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(44, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(45, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(45, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(46, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(46, 10) Source(5, 10) + SourceIndex(2)
3 >Emitted(46, 32) Source(5, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(47, 5) Source(5, 33) + SourceIndex(2)
2 >Emitted(47, 16) Source(5, 47) + SourceIndex(2)
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
1->Emitted(48, 10) Source(5, 33) + SourceIndex(2)
2 >Emitted(48, 20) Source(5, 47) + SourceIndex(2)
3 >Emitted(48, 22) Source(5, 33) + SourceIndex(2)
4 >Emitted(48, 43) Source(5, 47) + SourceIndex(2)
5 >Emitted(48, 45) Source(5, 33) + SourceIndex(2)
6 >Emitted(48, 49) Source(5, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(49, 9) Source(5, 33) + SourceIndex(2)
2 >Emitted(49, 31) Source(5, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(51, 1) Source(5, 51) + SourceIndex(2)
2 >Emitted(51, 2) Source(5, 52) + SourceIndex(2)
---
>>>var firstfirst_part3_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    firstfirst_part3_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(52, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(52, 5) Source(6, 7) + SourceIndex(2)
3 >Emitted(52, 24) Source(6, 26) + SourceIndex(2)
4 >Emitted(52, 27) Source(6, 29) + SourceIndex(2)
5 >Emitted(52, 28) Source(6, 30) + SourceIndex(2)
6 >Emitted(52, 30) Source(6, 32) + SourceIndex(2)
7 >Emitted(52, 32) Source(6, 34) + SourceIndex(2)
8 >Emitted(52, 34) Source(6, 36) + SourceIndex(2)
9 >Emitted(52, 35) Source(6, 37) + SourceIndex(2)
10>Emitted(52, 36) Source(6, 38) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                firstfirst_part3_ar
7 >                                                                                   );
1->Emitted(53, 1) Source(7, 1) + SourceIndex(2)
2 >Emitted(53, 23) Source(7, 23) + SourceIndex(2)
3 >Emitted(53, 53) Source(7, 24) + SourceIndex(2)
4 >Emitted(53, 55) Source(7, 26) + SourceIndex(2)
5 >Emitted(53, 65) Source(7, 31) + SourceIndex(2)
6 >Emitted(53, 84) Source(7, 50) + SourceIndex(2)
7 >Emitted(53, 95) Source(7, 52) + SourceIndex(2)
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
5 >      ^^^^^^^^^->
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
1 >Emitted(54, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(54, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(54, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(54, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(55, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(55, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(55, 13) Source(5, 12) + SourceIndex(3)
---
>>>    function f() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^^^^^^^^->
1-> {
  >    
2 >    function 
3 >             f
1->Emitted(56, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(56, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(56, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(57, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(57, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(57, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(57, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(57, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(57, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(57, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(57, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(58, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(58, 6) Source(8, 6) + SourceIndex(3)
---
>>>    f();
1->^^^^
2 >    ^
3 >     ^^
4 >       ^
5 >        ^^^^^^^^^^->
1->
  >
  >    
2 >    f
3 >     ()
4 >       ;
1->Emitted(59, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(59, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(59, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(59, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(60, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(60, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(60, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(60, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(60, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(60, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(60, 19) Source(11, 2) + SourceIndex(3)
---
>>>function forsecondsecond_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forsecondsecond_part1Rest
1->Emitted(61, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(61, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(61, 35) Source(12, 35) + SourceIndex(3)
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
1->Emitted(62, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(62, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(62, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(62, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(62, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(62, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(62, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(62, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(62, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(62, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(62, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(62, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(62, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(62, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(62, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(62, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(62, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(62, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(62, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(62, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(62, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(62, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(62, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(62, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(62, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(63, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(63, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(64, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(65, 5) Source(1, 1) + SourceIndex(4)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->class C {
  >    doSomething() {
  >        console.log("something got done");
  >    }
  >
2 >    }
1->Emitted(66, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(66, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(67, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(67, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(67, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(68, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(68, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(68, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(68, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(68, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(68, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(68, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(68, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(69, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(69, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(70, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(70, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(71, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(71, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(71, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(71, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(72, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(72, 10) Source(7, 10) + SourceIndex(4)
3 >Emitted(72, 34) Source(7, 34) + SourceIndex(4)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(73, 5) Source(7, 35) + SourceIndex(4)
2 >Emitted(73, 16) Source(7, 49) + SourceIndex(4)
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
1->Emitted(74, 10) Source(7, 35) + SourceIndex(4)
2 >Emitted(74, 20) Source(7, 49) + SourceIndex(4)
3 >Emitted(74, 22) Source(7, 35) + SourceIndex(4)
4 >Emitted(74, 43) Source(7, 49) + SourceIndex(4)
5 >Emitted(74, 45) Source(7, 35) + SourceIndex(4)
6 >Emitted(74, 49) Source(7, 49) + SourceIndex(4)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(75, 9) Source(7, 35) + SourceIndex(4)
2 >Emitted(75, 31) Source(7, 49) + SourceIndex(4)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(77, 1) Source(7, 53) + SourceIndex(4)
2 >Emitted(77, 2) Source(7, 54) + SourceIndex(4)
---
>>>var secondsecond_part2_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^^^
4 >                         ^^^
5 >                            ^
6 >                             ^^
7 >                               ^^
8 >                                 ^^
9 >                                   ^
10>                                    ^
11>                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    secondsecond_part2_ar
4 >                          = 
5 >                            [
6 >                             20
7 >                               , 
8 >                                 30
9 >                                   ]
10>                                    ;
1->Emitted(78, 1) Source(8, 1) + SourceIndex(4)
2 >Emitted(78, 5) Source(8, 7) + SourceIndex(4)
3 >Emitted(78, 26) Source(8, 28) + SourceIndex(4)
4 >Emitted(78, 29) Source(8, 31) + SourceIndex(4)
5 >Emitted(78, 30) Source(8, 32) + SourceIndex(4)
6 >Emitted(78, 32) Source(8, 34) + SourceIndex(4)
7 >Emitted(78, 34) Source(8, 36) + SourceIndex(4)
8 >Emitted(78, 36) Source(8, 38) + SourceIndex(4)
9 >Emitted(78, 37) Source(8, 39) + SourceIndex(4)
10>Emitted(78, 38) Source(8, 40) + SourceIndex(4)
---
>>>secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                      ^^
5 >                                                        ^^^^^^^^^^
6 >                                                                  ^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                       ^^^^^^^^^^^
1->
  >
2 >secondsecond_part2Spread
3 >                        (
4 >                                                      10
5 >                                                        , ...
6 >                                                                  secondsecond_part2_ar
7 >                                                                                       );
1->Emitted(79, 1) Source(9, 1) + SourceIndex(4)
2 >Emitted(79, 25) Source(9, 25) + SourceIndex(4)
3 >Emitted(79, 55) Source(9, 26) + SourceIndex(4)
4 >Emitted(79, 57) Source(9, 28) + SourceIndex(4)
5 >Emitted(79, 67) Source(9, 33) + SourceIndex(4)
6 >Emitted(79, 88) Source(9, 54) + SourceIndex(4)
7 >Emitted(79, 99) Source(9, 56) + SourceIndex(4)
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
1 >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1 >Emitted(80, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(80, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(80, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(80, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(80, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(80, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(80, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(80, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1 >
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1 >Emitted(81, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(81, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(81, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(81, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(81, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(81, 17) Source(2, 17) + SourceIndex(5)
---
>>>function forthirdthird_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forthirdthird_part1Rest
1->Emitted(82, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(82, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(82, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(83, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(83, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(83, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(83, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(83, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(83, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(83, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(83, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(83, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(83, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(83, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(83, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(83, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(83, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(83, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(83, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(83, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(83, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(83, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(83, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(83, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(83, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(83, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(83, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(83, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(84, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(84, 2) Source(5, 2) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(85, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(85, 10) Source(6, 10) + SourceIndex(5)
3 >Emitted(85, 32) Source(6, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(86, 5) Source(6, 33) + SourceIndex(5)
2 >Emitted(86, 16) Source(6, 47) + SourceIndex(5)
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
1->Emitted(87, 10) Source(6, 33) + SourceIndex(5)
2 >Emitted(87, 20) Source(6, 47) + SourceIndex(5)
3 >Emitted(87, 22) Source(6, 33) + SourceIndex(5)
4 >Emitted(87, 43) Source(6, 47) + SourceIndex(5)
5 >Emitted(87, 45) Source(6, 33) + SourceIndex(5)
6 >Emitted(87, 49) Source(6, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(88, 9) Source(6, 33) + SourceIndex(5)
2 >Emitted(88, 31) Source(6, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(90, 1) Source(6, 51) + SourceIndex(5)
2 >Emitted(90, 2) Source(6, 52) + SourceIndex(5)
---
>>>var thirdthird_part1_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    thirdthird_part1_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(91, 1) Source(7, 1) + SourceIndex(5)
2 >Emitted(91, 5) Source(7, 7) + SourceIndex(5)
3 >Emitted(91, 24) Source(7, 26) + SourceIndex(5)
4 >Emitted(91, 27) Source(7, 29) + SourceIndex(5)
5 >Emitted(91, 28) Source(7, 30) + SourceIndex(5)
6 >Emitted(91, 30) Source(7, 32) + SourceIndex(5)
7 >Emitted(91, 32) Source(7, 34) + SourceIndex(5)
8 >Emitted(91, 34) Source(7, 36) + SourceIndex(5)
9 >Emitted(91, 35) Source(7, 37) + SourceIndex(5)
10>Emitted(91, 36) Source(7, 38) + SourceIndex(5)
---
>>>thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >thirdthird_part1Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                thirdthird_part1_ar
7 >                                                                                   );
1->Emitted(92, 1) Source(8, 1) + SourceIndex(5)
2 >Emitted(92, 23) Source(8, 23) + SourceIndex(5)
3 >Emitted(92, 53) Source(8, 24) + SourceIndex(5)
4 >Emitted(92, 55) Source(8, 26) + SourceIndex(5)
5 >Emitted(92, 65) Source(8, 31) + SourceIndex(5)
6 >Emitted(92, 84) Source(8, 50) + SourceIndex(5)
7 >Emitted(92, 95) Source(8, 52) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":980,"kind":"emitHelpers","data":"typescript:read"},{"pos":981,"end":1361,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":1362,"end":1854,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":1362,"end":1854,"kind":"text"}]},{"pos":1854,"end":2522,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":1854,"end":2522,"kind":"text"}]},{"pos":2522,"end":2944,"kind":"text"}],"sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]},"mapHash":"-72824444169-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}","hash":"-32745783681-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nfunction secondsecond_part2Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nfunction thirdthird_part1Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));\n//# sourceMappingURL=third-output.js.map"},"dts":{"sections":[{"pos":0,"end":307,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":307,"kind":"text"}]},{"pos":307,"end":564,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":307,"end":564,"kind":"text"}]},{"pos":564,"end":740,"kind":"text"}],"mapHash":"34622384169-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC;ACLrC,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC;ACPvC,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}","hash":"-25062717856-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n","-21549614962-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n","-9658874822-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}\nfunction thirdthird_part1Spread(...b: number[]) { }\nconst thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread(10, ...thirdthird_part1_ar);"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"downlevelIteration":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-21519156314-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
emitHelpers: (0-490):: typescript:rest
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
emitHelpers: (491-980):: typescript:read
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
emitHelpers: (981-1361):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
prepend: (1362-1854):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1362-1854)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));

----------------------------------------------------------------------
prepend: (1854-2522):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1854-2522)
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
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));

----------------------------------------------------------------------
text: (2522-2944)
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
var thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-307):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-307)
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
declare const firstfirst_part3_ar: number[];

----------------------------------------------------------------------
prepend: (307-564):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (307-564)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;
declare const secondsecond_part2_ar: number[];

----------------------------------------------------------------------
text: (564-740)
declare var c: C;
declare function forthirdthird_part1Rest(): void;
declare function thirdthird_part1Spread(...b: number[]): void;
declare const thirdthird_part1_ar: number[];

======================================================================

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.readable.baseline.txt]
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
          "end": 490,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 491,
          "end": 980,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 981,
          "end": 1361,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 1362,
          "end": 1854,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 1362,
              "end": 1854,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1854,
          "end": 2522,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 1854,
              "end": 2522,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2522,
          "end": 2944,
          "kind": "text"
        }
      ],
      "hash": "-32745783681-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nfunction secondsecond_part2Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nfunction thirdthird_part1Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "-72824444169-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}",
      "sources": {
        "helpers": [
          "typescript:rest",
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 307,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 307,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 307,
          "end": 564,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 307,
              "end": 564,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 564,
          "end": 740,
          "kind": "text"
        }
      ],
      "hash": "-25062717856-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "34622384169-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC;ACLrC,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC;ACPvC,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../../lib/lib.d.ts",
      "../../../first/bin/first-output.d.ts",
      "../../../2/second-output.d.ts",
      "../../third_part1.ts"
    ],
    "fileInfos": {
      "../../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../../../first/bin/first-output.d.ts": "-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n",
      "../../../2/second-output.d.ts": "-21549614962-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n",
      "../../third_part1.ts": "-9658874822-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}\nfunction thirdthird_part1Spread(...b: number[]) { }\nconst thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread(10, ...thirdthird_part1_ar);"
    },
    "root": [
      [
        4,
        "../../third_part1.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "outFile": "./third-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-21519156314-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 10308
}



Change:: incremental-declaration-doesnt-change
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
[[90m12:01:09 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:10 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:11 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:19 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part2.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:20 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:01:21 AM[0m] Updating output of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE"}

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
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
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
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(37, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(37, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(37, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(37, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(38, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(38, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(38, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(38, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(38, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(38, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(38, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(38, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
1->Emitted(39, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(39, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(39, 33) Source(12, 33) + SourceIndex(0)
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
1->Emitted(40, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(40, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(40, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(40, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(40, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(40, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(40, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(40, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(40, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(40, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(40, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(40, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(40, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(40, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(40, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(40, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(40, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(40, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(40, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(40, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(40, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(40, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(40, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(40, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(40, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(41, 2) Source(14, 2) + SourceIndex(0)
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
9 >               ^^->
1->
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(42, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(42, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(42, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(42, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(42, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(42, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(42, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(42, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(43, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(43, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(43, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(43, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(43, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(43, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(43, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(43, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(43, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(44, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(44, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(44, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(45, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(45, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(45, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(45, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(46, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(46, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(47, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(47, 10) Source(5, 10) + SourceIndex(2)
3 >Emitted(47, 32) Source(5, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(48, 5) Source(5, 33) + SourceIndex(2)
2 >Emitted(48, 16) Source(5, 47) + SourceIndex(2)
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
1->Emitted(49, 10) Source(5, 33) + SourceIndex(2)
2 >Emitted(49, 20) Source(5, 47) + SourceIndex(2)
3 >Emitted(49, 22) Source(5, 33) + SourceIndex(2)
4 >Emitted(49, 43) Source(5, 47) + SourceIndex(2)
5 >Emitted(49, 45) Source(5, 33) + SourceIndex(2)
6 >Emitted(49, 49) Source(5, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(50, 9) Source(5, 33) + SourceIndex(2)
2 >Emitted(50, 31) Source(5, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(52, 1) Source(5, 51) + SourceIndex(2)
2 >Emitted(52, 2) Source(5, 52) + SourceIndex(2)
---
>>>var firstfirst_part3_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    firstfirst_part3_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(53, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(53, 5) Source(6, 7) + SourceIndex(2)
3 >Emitted(53, 24) Source(6, 26) + SourceIndex(2)
4 >Emitted(53, 27) Source(6, 29) + SourceIndex(2)
5 >Emitted(53, 28) Source(6, 30) + SourceIndex(2)
6 >Emitted(53, 30) Source(6, 32) + SourceIndex(2)
7 >Emitted(53, 32) Source(6, 34) + SourceIndex(2)
8 >Emitted(53, 34) Source(6, 36) + SourceIndex(2)
9 >Emitted(53, 35) Source(6, 37) + SourceIndex(2)
10>Emitted(53, 36) Source(6, 38) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                firstfirst_part3_ar
7 >                                                                                   );
1->Emitted(54, 1) Source(7, 1) + SourceIndex(2)
2 >Emitted(54, 23) Source(7, 23) + SourceIndex(2)
3 >Emitted(54, 53) Source(7, 24) + SourceIndex(2)
4 >Emitted(54, 55) Source(7, 26) + SourceIndex(2)
5 >Emitted(54, 65) Source(7, 31) + SourceIndex(2)
6 >Emitted(54, 84) Source(7, 50) + SourceIndex(2)
7 >Emitted(54, 95) Source(7, 52) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":980,"kind":"emitHelpers","data":"typescript:read"},{"pos":981,"end":1361,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":1362,"end":1870,"kind":"text"}],"sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]},"mapHash":"-20285768654-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}","hash":"-26516546737-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":307,"kind":"text"}],"mapHash":"11304487505-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}","hash":"-10647290581-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-25115744362-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}console.log(s);","6007494133-console.log(f());\n","-1751035906-function f() {\n    return \"JS does hoists\";\n}\n\nfunction firstfirst_part3Spread(...b: number[]) { }\nconst firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread(10, ...firstfirst_part3_ar);"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"downlevelIteration":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
emitHelpers: (0-490):: typescript:rest
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
emitHelpers: (491-980):: typescript:read
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
emitHelpers: (981-1361):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
text: (1362-1870)
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-307)
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
declare const firstfirst_part3_ar: number[];

======================================================================

//// [/src/first/bin/first-output.tsbuildinfo.readable.baseline.txt]
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
          "end": 490,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 491,
          "end": 980,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 981,
          "end": 1361,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 1362,
          "end": 1870,
          "kind": "text"
        }
      ],
      "hash": "-26516546737-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-20285768654-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}",
      "sources": {
        "helpers": [
          "typescript:rest",
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 307,
          "kind": "text"
        }
      ],
      "hash": "-10647290581-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "11304487505-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../first_part1.ts",
      "../first_part2.ts",
      "../first_part3.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../first_part1.ts": "-25115744362-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}console.log(s);",
      "../first_part2.ts": "6007494133-console.log(f());\n",
      "../first_part3.ts": "-1751035906-function f() {\n    return \"JS does hoists\";\n}\n\nfunction firstfirst_part3Spread(...b: number[]) { }\nconst firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread(10, ...firstfirst_part3_ar);"
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "../first_part1.ts",
          "../first_part2.ts",
          "../first_part3.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "outFile": "./first-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 5842
}

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
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
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
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
var thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE"}

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
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
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
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(37, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(37, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(37, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(37, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(38, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(38, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(38, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(38, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(38, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(38, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(38, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(38, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
1->Emitted(39, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(39, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(39, 33) Source(12, 33) + SourceIndex(0)
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
1->Emitted(40, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(40, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(40, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(40, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(40, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(40, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(40, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(40, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(40, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(40, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(40, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(40, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(40, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(40, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(40, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(40, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(40, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(40, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(40, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(40, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(40, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(40, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(40, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(40, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(40, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(41, 2) Source(14, 2) + SourceIndex(0)
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
9 >               ^^->
1->
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(42, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(42, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(42, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(42, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(42, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(42, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(42, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(42, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(43, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(43, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(43, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(43, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(43, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(43, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(43, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(43, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(43, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(44, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(44, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(44, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(45, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(45, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(45, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(45, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(46, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(46, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(47, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(47, 10) Source(5, 10) + SourceIndex(2)
3 >Emitted(47, 32) Source(5, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(48, 5) Source(5, 33) + SourceIndex(2)
2 >Emitted(48, 16) Source(5, 47) + SourceIndex(2)
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
1->Emitted(49, 10) Source(5, 33) + SourceIndex(2)
2 >Emitted(49, 20) Source(5, 47) + SourceIndex(2)
3 >Emitted(49, 22) Source(5, 33) + SourceIndex(2)
4 >Emitted(49, 43) Source(5, 47) + SourceIndex(2)
5 >Emitted(49, 45) Source(5, 33) + SourceIndex(2)
6 >Emitted(49, 49) Source(5, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(50, 9) Source(5, 33) + SourceIndex(2)
2 >Emitted(50, 31) Source(5, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(52, 1) Source(5, 51) + SourceIndex(2)
2 >Emitted(52, 2) Source(5, 52) + SourceIndex(2)
---
>>>var firstfirst_part3_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    firstfirst_part3_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(53, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(53, 5) Source(6, 7) + SourceIndex(2)
3 >Emitted(53, 24) Source(6, 26) + SourceIndex(2)
4 >Emitted(53, 27) Source(6, 29) + SourceIndex(2)
5 >Emitted(53, 28) Source(6, 30) + SourceIndex(2)
6 >Emitted(53, 30) Source(6, 32) + SourceIndex(2)
7 >Emitted(53, 32) Source(6, 34) + SourceIndex(2)
8 >Emitted(53, 34) Source(6, 36) + SourceIndex(2)
9 >Emitted(53, 35) Source(6, 37) + SourceIndex(2)
10>Emitted(53, 36) Source(6, 38) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                firstfirst_part3_ar
7 >                                                                                   );
1->Emitted(54, 1) Source(7, 1) + SourceIndex(2)
2 >Emitted(54, 23) Source(7, 23) + SourceIndex(2)
3 >Emitted(54, 53) Source(7, 24) + SourceIndex(2)
4 >Emitted(54, 55) Source(7, 26) + SourceIndex(2)
5 >Emitted(54, 65) Source(7, 31) + SourceIndex(2)
6 >Emitted(54, 84) Source(7, 50) + SourceIndex(2)
7 >Emitted(54, 95) Source(7, 52) + SourceIndex(2)
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
5 >      ^^^^^^^^^->
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
1 >Emitted(55, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(55, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(55, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(55, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(56, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(56, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(56, 13) Source(5, 12) + SourceIndex(3)
---
>>>    function f() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^^^^^^^^->
1-> {
  >    
2 >    function 
3 >             f
1->Emitted(57, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(57, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(57, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(58, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(58, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(58, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(58, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(58, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(58, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(58, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(58, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(59, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(59, 6) Source(8, 6) + SourceIndex(3)
---
>>>    f();
1->^^^^
2 >    ^
3 >     ^^
4 >       ^
5 >        ^^^^^^^^^^->
1->
  >
  >    
2 >    f
3 >     ()
4 >       ;
1->Emitted(60, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(60, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(60, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(60, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(61, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(61, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(61, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(61, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(61, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(61, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(61, 19) Source(11, 2) + SourceIndex(3)
---
>>>function forsecondsecond_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forsecondsecond_part1Rest
1->Emitted(62, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(62, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(62, 35) Source(12, 35) + SourceIndex(3)
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
1->Emitted(63, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(63, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(63, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(63, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(63, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(63, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(63, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(63, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(63, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(63, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(63, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(63, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(63, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(63, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(63, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(63, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(63, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(63, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(63, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(63, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(63, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(63, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(63, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(63, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(63, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(64, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(64, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(65, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(66, 5) Source(1, 1) + SourceIndex(4)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->class C {
  >    doSomething() {
  >        console.log("something got done");
  >    }
  >
2 >    }
1->Emitted(67, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(67, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(68, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(68, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(68, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(69, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(69, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(69, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(69, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(69, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(69, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(69, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(69, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(70, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(70, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(71, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(71, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(72, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(72, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(72, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(72, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(73, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(73, 10) Source(7, 10) + SourceIndex(4)
3 >Emitted(73, 34) Source(7, 34) + SourceIndex(4)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(74, 5) Source(7, 35) + SourceIndex(4)
2 >Emitted(74, 16) Source(7, 49) + SourceIndex(4)
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
1->Emitted(75, 10) Source(7, 35) + SourceIndex(4)
2 >Emitted(75, 20) Source(7, 49) + SourceIndex(4)
3 >Emitted(75, 22) Source(7, 35) + SourceIndex(4)
4 >Emitted(75, 43) Source(7, 49) + SourceIndex(4)
5 >Emitted(75, 45) Source(7, 35) + SourceIndex(4)
6 >Emitted(75, 49) Source(7, 49) + SourceIndex(4)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(76, 9) Source(7, 35) + SourceIndex(4)
2 >Emitted(76, 31) Source(7, 49) + SourceIndex(4)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(78, 1) Source(7, 53) + SourceIndex(4)
2 >Emitted(78, 2) Source(7, 54) + SourceIndex(4)
---
>>>var secondsecond_part2_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^^^
4 >                         ^^^
5 >                            ^
6 >                             ^^
7 >                               ^^
8 >                                 ^^
9 >                                   ^
10>                                    ^
11>                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    secondsecond_part2_ar
4 >                          = 
5 >                            [
6 >                             20
7 >                               , 
8 >                                 30
9 >                                   ]
10>                                    ;
1->Emitted(79, 1) Source(8, 1) + SourceIndex(4)
2 >Emitted(79, 5) Source(8, 7) + SourceIndex(4)
3 >Emitted(79, 26) Source(8, 28) + SourceIndex(4)
4 >Emitted(79, 29) Source(8, 31) + SourceIndex(4)
5 >Emitted(79, 30) Source(8, 32) + SourceIndex(4)
6 >Emitted(79, 32) Source(8, 34) + SourceIndex(4)
7 >Emitted(79, 34) Source(8, 36) + SourceIndex(4)
8 >Emitted(79, 36) Source(8, 38) + SourceIndex(4)
9 >Emitted(79, 37) Source(8, 39) + SourceIndex(4)
10>Emitted(79, 38) Source(8, 40) + SourceIndex(4)
---
>>>secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                      ^^
5 >                                                        ^^^^^^^^^^
6 >                                                                  ^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                       ^^^^^^^^^^^
1->
  >
2 >secondsecond_part2Spread
3 >                        (
4 >                                                      10
5 >                                                        , ...
6 >                                                                  secondsecond_part2_ar
7 >                                                                                       );
1->Emitted(80, 1) Source(9, 1) + SourceIndex(4)
2 >Emitted(80, 25) Source(9, 25) + SourceIndex(4)
3 >Emitted(80, 55) Source(9, 26) + SourceIndex(4)
4 >Emitted(80, 57) Source(9, 28) + SourceIndex(4)
5 >Emitted(80, 67) Source(9, 33) + SourceIndex(4)
6 >Emitted(80, 88) Source(9, 54) + SourceIndex(4)
7 >Emitted(80, 99) Source(9, 56) + SourceIndex(4)
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
1 >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1 >Emitted(81, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(81, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(81, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(81, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(81, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(81, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(81, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(81, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1 >
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1 >Emitted(82, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(82, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(82, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(82, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(82, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(82, 17) Source(2, 17) + SourceIndex(5)
---
>>>function forthirdthird_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forthirdthird_part1Rest
1->Emitted(83, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(83, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(83, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(84, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(84, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(84, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(84, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(84, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(84, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(84, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(84, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(84, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(84, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(84, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(84, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(84, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(84, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(84, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(84, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(84, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(84, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(84, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(84, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(84, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(84, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(84, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(84, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(84, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(85, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(85, 2) Source(5, 2) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(86, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(86, 10) Source(6, 10) + SourceIndex(5)
3 >Emitted(86, 32) Source(6, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(87, 5) Source(6, 33) + SourceIndex(5)
2 >Emitted(87, 16) Source(6, 47) + SourceIndex(5)
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
1->Emitted(88, 10) Source(6, 33) + SourceIndex(5)
2 >Emitted(88, 20) Source(6, 47) + SourceIndex(5)
3 >Emitted(88, 22) Source(6, 33) + SourceIndex(5)
4 >Emitted(88, 43) Source(6, 47) + SourceIndex(5)
5 >Emitted(88, 45) Source(6, 33) + SourceIndex(5)
6 >Emitted(88, 49) Source(6, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(89, 9) Source(6, 33) + SourceIndex(5)
2 >Emitted(89, 31) Source(6, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(91, 1) Source(6, 51) + SourceIndex(5)
2 >Emitted(91, 2) Source(6, 52) + SourceIndex(5)
---
>>>var thirdthird_part1_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    thirdthird_part1_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(92, 1) Source(7, 1) + SourceIndex(5)
2 >Emitted(92, 5) Source(7, 7) + SourceIndex(5)
3 >Emitted(92, 24) Source(7, 26) + SourceIndex(5)
4 >Emitted(92, 27) Source(7, 29) + SourceIndex(5)
5 >Emitted(92, 28) Source(7, 30) + SourceIndex(5)
6 >Emitted(92, 30) Source(7, 32) + SourceIndex(5)
7 >Emitted(92, 32) Source(7, 34) + SourceIndex(5)
8 >Emitted(92, 34) Source(7, 36) + SourceIndex(5)
9 >Emitted(92, 35) Source(7, 37) + SourceIndex(5)
10>Emitted(92, 36) Source(7, 38) + SourceIndex(5)
---
>>>thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >thirdthird_part1Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                thirdthird_part1_ar
7 >                                                                                   );
1->Emitted(93, 1) Source(8, 1) + SourceIndex(5)
2 >Emitted(93, 23) Source(8, 23) + SourceIndex(5)
3 >Emitted(93, 53) Source(8, 24) + SourceIndex(5)
4 >Emitted(93, 55) Source(8, 26) + SourceIndex(5)
5 >Emitted(93, 65) Source(8, 31) + SourceIndex(5)
6 >Emitted(93, 84) Source(8, 50) + SourceIndex(5)
7 >Emitted(93, 95) Source(8, 52) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":980,"kind":"emitHelpers","data":"typescript:read"},{"pos":981,"end":1361,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":1362,"end":1870,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":1362,"end":1870,"kind":"text"}]},{"pos":1870,"end":2538,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":1870,"end":2538,"kind":"text"}]},{"pos":2538,"end":2960,"kind":"text"}],"mapHash":"17509490888-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}","hash":"-65318968533-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nfunction secondsecond_part2Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nfunction thirdthird_part1Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));\n//# sourceMappingURL=third-output.js.map","sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]}},"dts":{"sections":[{"pos":0,"end":307,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":307,"kind":"text"}]},{"pos":307,"end":564,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":307,"end":564,"kind":"text"}]},{"pos":564,"end":740,"kind":"text"}],"mapHash":"34622384169-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC;ACLrC,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC;ACPvC,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}","hash":"-25062717856-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n","-21549614962-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n","-9658874822-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}\nfunction thirdthird_part1Spread(...b: number[]) { }\nconst thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread(10, ...thirdthird_part1_ar);"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"downlevelIteration":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-21519156314-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
emitHelpers: (0-490):: typescript:rest
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
emitHelpers: (491-980):: typescript:read
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
emitHelpers: (981-1361):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
prepend: (1362-1870):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1362-1870)
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));

----------------------------------------------------------------------
prepend: (1870-2538):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1870-2538)
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
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));

----------------------------------------------------------------------
text: (2538-2960)
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
var thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-307):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-307)
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
declare const firstfirst_part3_ar: number[];

----------------------------------------------------------------------
prepend: (307-564):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (307-564)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;
declare const secondsecond_part2_ar: number[];

----------------------------------------------------------------------
text: (564-740)
declare var c: C;
declare function forthirdthird_part1Rest(): void;
declare function thirdthird_part1Spread(...b: number[]): void;
declare const thirdthird_part1_ar: number[];

======================================================================

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.readable.baseline.txt]
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
          "end": 490,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 491,
          "end": 980,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 981,
          "end": 1361,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 1362,
          "end": 1870,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 1362,
              "end": 1870,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1870,
          "end": 2538,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 1870,
              "end": 2538,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2538,
          "end": 2960,
          "kind": "text"
        }
      ],
      "hash": "-65318968533-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nfunction secondsecond_part2Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nfunction thirdthird_part1Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "17509490888-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}",
      "sources": {
        "helpers": [
          "typescript:rest",
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 307,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 307,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 307,
          "end": 564,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 307,
              "end": 564,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 564,
          "end": 740,
          "kind": "text"
        }
      ],
      "hash": "-25062717856-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "34622384169-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC;ACLrC,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC;ACPvC,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../../lib/lib.d.ts",
      "../../../first/bin/first-output.d.ts",
      "../../../2/second-output.d.ts",
      "../../third_part1.ts"
    ],
    "fileInfos": {
      "../../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../../../first/bin/first-output.d.ts": "-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n",
      "../../../2/second-output.d.ts": "-21549614962-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n",
      "../../third_part1.ts": "-9658874822-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}\nfunction thirdthird_part1Spread(...b: number[]) { }\nconst thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread(10, ...thirdthird_part1_ar);"
    },
    "root": [
      [
        4,
        "../../third_part1.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "outFile": "./third-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-21519156314-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 10365
}



Change:: incremental-headers-change-without-dts-changes
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
function forfirstfirst_PART1Rest() { }console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:32 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:33 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:34 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:42 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part2.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:43 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:01:44 AM[0m] Updating output of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;AEXtC,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC"}

//// [/src/first/bin/first-output.d.ts.map.baseline.txt]
===================================================================
JsFile: first-output.d.ts
mapUrl: first-output.d.ts.map
sourceRoot: 
sources: ../first_PART1.ts,../first_part2.ts,../first_part3.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.d.ts
sourceFile:../first_PART1.ts
-------------------------------------------------------------------
>>>interface TheFirst {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1 >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 19) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(2, 5) Source(2, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(2, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hello, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^^
6 >                                ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hello, world"
6 >                                ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
6 >Emitted(4, 34) Source(5, 26) + SourceIndex(0)
---
>>>interface NoJsForHereEither {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^^^^^^^^^^
1 >
  >
  >
2 >interface 
3 >          NoJsForHereEither
1 >Emitted(5, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(7, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(7, 28) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(6, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(8, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(8, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(8, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(8, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(9, 2) + SourceIndex(0)
---
>>>declare function forfirstfirst_PART1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
1->
  >
  >console.log(s);
  >
2 >function 
3 >                 forfirstfirst_PART1Rest
4 >                                        () { }
1->Emitted(8, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(8, 18) Source(12, 10) + SourceIndex(0)
3 >Emitted(8, 41) Source(12, 33) + SourceIndex(0)
4 >Emitted(8, 50) Source(12, 39) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.d.ts
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>declare function f(): string;
1 >
2 >^^^^^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^
5 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >                 f
4 >                  () {
  >                      return "JS does hoists";
  >                  }
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(9, 18) Source(1, 10) + SourceIndex(2)
3 >Emitted(9, 19) Source(1, 11) + SourceIndex(2)
4 >Emitted(9, 30) Source(3, 2) + SourceIndex(2)
---
>>>declare function firstfirst_part3Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^
6 >                                           ^^^
7 >                                              ^^^^^^
8 >                                                    ^^
9 >                                                      ^^^^^^^^
1->
  >
  >
2 >function 
3 >                 firstfirst_part3Spread
4 >                                       (
5 >                                        ...
6 >                                           b: 
7 >                                              number
8 >                                                    []
9 >                                                      ) { }
1->Emitted(10, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(10, 18) Source(5, 10) + SourceIndex(2)
3 >Emitted(10, 40) Source(5, 32) + SourceIndex(2)
4 >Emitted(10, 41) Source(5, 33) + SourceIndex(2)
5 >Emitted(10, 44) Source(5, 36) + SourceIndex(2)
6 >Emitted(10, 47) Source(5, 39) + SourceIndex(2)
7 >Emitted(10, 53) Source(5, 45) + SourceIndex(2)
8 >Emitted(10, 55) Source(5, 47) + SourceIndex(2)
9 >Emitted(10, 63) Source(5, 52) + SourceIndex(2)
---
>>>declare const firstfirst_part3_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^
5 >                                 ^^^^^^^^^^
6 >                                           ^
1 >
  >
2 >
3 >        const 
4 >              firstfirst_part3_ar
5 >                                  = [20, 30]
6 >                                           ;
1 >Emitted(11, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(11, 9) Source(6, 1) + SourceIndex(2)
3 >Emitted(11, 15) Source(6, 7) + SourceIndex(2)
4 >Emitted(11, 34) Source(6, 26) + SourceIndex(2)
5 >Emitted(11, 44) Source(6, 37) + SourceIndex(2)
6 >Emitted(11, 45) Source(6, 38) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.d.ts.map

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() { }
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE"}

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
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
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
1 >Emitted(26, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(26, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(26, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(26, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(26, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(26, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(27, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(27, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(27, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(27, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(27, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(27, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(27, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(27, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^
5 >                                     ^
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
4 >                                () { 
5 >                                     }
1->Emitted(28, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(28, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(28, 33) Source(12, 33) + SourceIndex(0)
4 >Emitted(28, 38) Source(12, 38) + SourceIndex(0)
5 >Emitted(28, 39) Source(12, 39) + SourceIndex(0)
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
9 >               ^^->
1 >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1 >Emitted(29, 1) Source(12, 39) + SourceIndex(0)
2 >Emitted(29, 8) Source(12, 46) + SourceIndex(0)
3 >Emitted(29, 9) Source(12, 47) + SourceIndex(0)
4 >Emitted(29, 12) Source(12, 50) + SourceIndex(0)
5 >Emitted(29, 13) Source(12, 51) + SourceIndex(0)
6 >Emitted(29, 14) Source(12, 52) + SourceIndex(0)
7 >Emitted(29, 15) Source(12, 53) + SourceIndex(0)
8 >Emitted(29, 16) Source(12, 54) + SourceIndex(0)
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
1->Emitted(30, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(30, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(30, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(30, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(30, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(30, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(30, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(30, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(30, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(31, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(31, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(31, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(32, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(32, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(32, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(32, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(33, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(33, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(34, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(34, 10) Source(5, 10) + SourceIndex(2)
3 >Emitted(34, 32) Source(5, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(35, 5) Source(5, 33) + SourceIndex(2)
2 >Emitted(35, 16) Source(5, 47) + SourceIndex(2)
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
1->Emitted(36, 10) Source(5, 33) + SourceIndex(2)
2 >Emitted(36, 20) Source(5, 47) + SourceIndex(2)
3 >Emitted(36, 22) Source(5, 33) + SourceIndex(2)
4 >Emitted(36, 43) Source(5, 47) + SourceIndex(2)
5 >Emitted(36, 45) Source(5, 33) + SourceIndex(2)
6 >Emitted(36, 49) Source(5, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(37, 9) Source(5, 33) + SourceIndex(2)
2 >Emitted(37, 31) Source(5, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(39, 1) Source(5, 51) + SourceIndex(2)
2 >Emitted(39, 2) Source(5, 52) + SourceIndex(2)
---
>>>var firstfirst_part3_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    firstfirst_part3_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(40, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(40, 5) Source(6, 7) + SourceIndex(2)
3 >Emitted(40, 24) Source(6, 26) + SourceIndex(2)
4 >Emitted(40, 27) Source(6, 29) + SourceIndex(2)
5 >Emitted(40, 28) Source(6, 30) + SourceIndex(2)
6 >Emitted(40, 30) Source(6, 32) + SourceIndex(2)
7 >Emitted(40, 32) Source(6, 34) + SourceIndex(2)
8 >Emitted(40, 34) Source(6, 36) + SourceIndex(2)
9 >Emitted(40, 35) Source(6, 37) + SourceIndex(2)
10>Emitted(40, 36) Source(6, 38) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                firstfirst_part3_ar
7 >                                                                                   );
1->Emitted(41, 1) Source(7, 1) + SourceIndex(2)
2 >Emitted(41, 23) Source(7, 23) + SourceIndex(2)
3 >Emitted(41, 53) Source(7, 24) + SourceIndex(2)
4 >Emitted(41, 55) Source(7, 26) + SourceIndex(2)
5 >Emitted(41, 65) Source(7, 31) + SourceIndex(2)
6 >Emitted(41, 84) Source(7, 50) + SourceIndex(2)
7 >Emitted(41, 95) Source(7, 52) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":489,"kind":"emitHelpers","data":"typescript:read"},{"pos":490,"end":870,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":871,"end":1304,"kind":"text"}],"sources":{"helpers":["typescript:read","typescript:spreadArray"]},"mapHash":"-7716375076-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}","hash":"71257392207-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":307,"kind":"text"}],"mapHash":"21786479890-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;AEXtC,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}","hash":"-10647290581-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-20328557861-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }console.log(s);","6007494133-console.log(f());\n","-1751035906-function f() {\n    return \"JS does hoists\";\n}\n\nfunction firstfirst_part3Spread(...b: number[]) { }\nconst firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread(10, ...firstfirst_part3_ar);"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"downlevelIteration":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
emitHelpers: (0-489):: typescript:read
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
emitHelpers: (490-870):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
text: (871-1304)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() { }
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-307)
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
declare const firstfirst_part3_ar: number[];

======================================================================

//// [/src/first/bin/first-output.tsbuildinfo.readable.baseline.txt]
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
          "end": 489,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 490,
          "end": 870,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 871,
          "end": 1304,
          "kind": "text"
        }
      ],
      "hash": "71257392207-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-7716375076-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}",
      "sources": {
        "helpers": [
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 307,
          "kind": "text"
        }
      ],
      "hash": "-10647290581-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "21786479890-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;AEXtC,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../first_part1.ts",
      "../first_part2.ts",
      "../first_part3.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../first_part1.ts": "-20328557861-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }console.log(s);",
      "../first_part2.ts": "6007494133-console.log(f());\n",
      "../first_part3.ts": "-1751035906-function f() {\n    return \"JS does hoists\";\n}\n\nfunction firstfirst_part3Spread(...b: number[]) { }\nconst firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread(10, ...firstfirst_part3_ar);"
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "../first_part1.ts",
          "../first_part2.ts",
          "../first_part3.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "outFile": "./first-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4977
}

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;ACXtC,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC;ACLrC,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC;ACPvC,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC"}

//// [/src/third/thirdjs/output/third-output.d.ts.map.baseline.txt]
===================================================================
JsFile: third-output.d.ts
mapUrl: third-output.d.ts.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../../first/first_part3.ts,../../../second/second_part1.ts,../../../second/second_part2.ts,../../third_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>interface TheFirst {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1 >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 19) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(2, 5) Source(2, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(2, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hello, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^^
6 >                                ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hello, world"
6 >                                ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
6 >Emitted(4, 34) Source(5, 26) + SourceIndex(0)
---
>>>interface NoJsForHereEither {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^^^^^^^^^^
1 >
  >
  >
2 >interface 
3 >          NoJsForHereEither
1 >Emitted(5, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(7, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(7, 28) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(6, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(8, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(8, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(8, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(8, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(9, 2) + SourceIndex(0)
---
>>>declare function forfirstfirst_PART1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
1->
  >
  >console.log(s);
  >
2 >function 
3 >                 forfirstfirst_PART1Rest
4 >                                        () { }
1->Emitted(8, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(8, 18) Source(12, 10) + SourceIndex(0)
3 >Emitted(8, 41) Source(12, 33) + SourceIndex(0)
4 >Emitted(8, 50) Source(12, 39) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>declare function f(): string;
1 >
2 >^^^^^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^
5 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >                 f
4 >                  () {
  >                      return "JS does hoists";
  >                  }
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(9, 18) Source(1, 10) + SourceIndex(1)
3 >Emitted(9, 19) Source(1, 11) + SourceIndex(1)
4 >Emitted(9, 30) Source(3, 2) + SourceIndex(1)
---
>>>declare function firstfirst_part3Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^
6 >                                           ^^^
7 >                                              ^^^^^^
8 >                                                    ^^
9 >                                                      ^^^^^^^^
1->
  >
  >
2 >function 
3 >                 firstfirst_part3Spread
4 >                                       (
5 >                                        ...
6 >                                           b: 
7 >                                              number
8 >                                                    []
9 >                                                      ) { }
1->Emitted(10, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(10, 18) Source(5, 10) + SourceIndex(1)
3 >Emitted(10, 40) Source(5, 32) + SourceIndex(1)
4 >Emitted(10, 41) Source(5, 33) + SourceIndex(1)
5 >Emitted(10, 44) Source(5, 36) + SourceIndex(1)
6 >Emitted(10, 47) Source(5, 39) + SourceIndex(1)
7 >Emitted(10, 53) Source(5, 45) + SourceIndex(1)
8 >Emitted(10, 55) Source(5, 47) + SourceIndex(1)
9 >Emitted(10, 63) Source(5, 52) + SourceIndex(1)
---
>>>declare const firstfirst_part3_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^
5 >                                 ^^^^^^^^^^
6 >                                           ^
1 >
  >
2 >
3 >        const 
4 >              firstfirst_part3_ar
5 >                                  = [20, 30]
6 >                                           ;
1 >Emitted(11, 1) Source(6, 1) + SourceIndex(1)
2 >Emitted(11, 9) Source(6, 1) + SourceIndex(1)
3 >Emitted(11, 15) Source(6, 7) + SourceIndex(1)
4 >Emitted(11, 34) Source(6, 26) + SourceIndex(1)
5 >Emitted(11, 44) Source(6, 37) + SourceIndex(1)
6 >Emitted(11, 45) Source(6, 38) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>declare namespace N {
1 >
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1 >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(12, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(12, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(12, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(12, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(13, 2) Source(3, 2) + SourceIndex(2)
---
>>>declare namespace N {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1->
  >
  >
2 >namespace 
3 >                  N
4 >                    
1->Emitted(14, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(14, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(14, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(14, 21) Source(5, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(15, 2) Source(11, 2) + SourceIndex(2)
---
>>>declare function forsecondsecond_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                          ^^^^^^^^^
1->
  >
2 >function 
3 >                 forsecondsecond_part1Rest
4 >                                          () {
  >                                          const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                          }
1->Emitted(16, 1) Source(12, 1) + SourceIndex(2)
2 >Emitted(16, 18) Source(12, 10) + SourceIndex(2)
3 >Emitted(16, 43) Source(12, 35) + SourceIndex(2)
4 >Emitted(16, 52) Source(14, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^->
1 >
2 >class 
3 >              C
1 >Emitted(17, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(17, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(17, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(18, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(18, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(19, 2) Source(5, 2) + SourceIndex(3)
---
>>>declare function secondsecond_part2Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                         ^
5 >                                          ^^^
6 >                                             ^^^
7 >                                                ^^^^^^
8 >                                                      ^^
9 >                                                        ^^^^^^^^
1->
  >
  >
2 >function 
3 >                 secondsecond_part2Spread
4 >                                         (
5 >                                          ...
6 >                                             b: 
7 >                                                number
8 >                                                      []
9 >                                                        ) { }
1->Emitted(20, 1) Source(7, 1) + SourceIndex(3)
2 >Emitted(20, 18) Source(7, 10) + SourceIndex(3)
3 >Emitted(20, 42) Source(7, 34) + SourceIndex(3)
4 >Emitted(20, 43) Source(7, 35) + SourceIndex(3)
5 >Emitted(20, 46) Source(7, 38) + SourceIndex(3)
6 >Emitted(20, 49) Source(7, 41) + SourceIndex(3)
7 >Emitted(20, 55) Source(7, 47) + SourceIndex(3)
8 >Emitted(20, 57) Source(7, 49) + SourceIndex(3)
9 >Emitted(20, 65) Source(7, 54) + SourceIndex(3)
---
>>>declare const secondsecond_part2_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^^^
5 >                                   ^^^^^^^^^^
6 >                                             ^
1 >
  >
2 >
3 >        const 
4 >              secondsecond_part2_ar
5 >                                    = [20, 30]
6 >                                             ;
1 >Emitted(21, 1) Source(8, 1) + SourceIndex(3)
2 >Emitted(21, 9) Source(8, 1) + SourceIndex(3)
3 >Emitted(21, 15) Source(8, 7) + SourceIndex(3)
4 >Emitted(21, 36) Source(8, 28) + SourceIndex(3)
5 >Emitted(21, 46) Source(8, 39) + SourceIndex(3)
6 >Emitted(21, 47) Source(8, 40) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>declare var c: C;
1 >
2 >^^^^^^^^
3 >        ^^^^
4 >            ^
5 >             ^^^
6 >                ^
7 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1 >Emitted(22, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(22, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(22, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(22, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(22, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(22, 18) Source(1, 17) + SourceIndex(4)
---
>>>declare function forthirdthird_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
5 >                                                 ^^^^^^^^^^^^^->
1->
  >c.doSomething();
  >
2 >function 
3 >                 forthirdthird_part1Rest
4 >                                        () {
  >                                        const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                        }
1->Emitted(23, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(23, 18) Source(3, 10) + SourceIndex(4)
3 >Emitted(23, 41) Source(3, 33) + SourceIndex(4)
4 >Emitted(23, 50) Source(5, 2) + SourceIndex(4)
---
>>>declare function thirdthird_part1Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^
6 >                                           ^^^
7 >                                              ^^^^^^
8 >                                                    ^^
9 >                                                      ^^^^^^^^
1->
  >
2 >function 
3 >                 thirdthird_part1Spread
4 >                                       (
5 >                                        ...
6 >                                           b: 
7 >                                              number
8 >                                                    []
9 >                                                      ) { }
1->Emitted(24, 1) Source(6, 1) + SourceIndex(4)
2 >Emitted(24, 18) Source(6, 10) + SourceIndex(4)
3 >Emitted(24, 40) Source(6, 32) + SourceIndex(4)
4 >Emitted(24, 41) Source(6, 33) + SourceIndex(4)
5 >Emitted(24, 44) Source(6, 36) + SourceIndex(4)
6 >Emitted(24, 47) Source(6, 39) + SourceIndex(4)
7 >Emitted(24, 53) Source(6, 45) + SourceIndex(4)
8 >Emitted(24, 55) Source(6, 47) + SourceIndex(4)
9 >Emitted(24, 63) Source(6, 52) + SourceIndex(4)
---
>>>declare const thirdthird_part1_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^^^^^^^
5 >                                 ^^^^^^^^^^
6 >                                           ^
1 >
  >
2 >
3 >        const 
4 >              thirdthird_part1_ar
5 >                                  = [20, 30]
6 >                                           ;
1 >Emitted(25, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(25, 9) Source(7, 1) + SourceIndex(4)
3 >Emitted(25, 15) Source(7, 7) + SourceIndex(4)
4 >Emitted(25, 34) Source(7, 26) + SourceIndex(4)
5 >Emitted(25, 44) Source(7, 37) + SourceIndex(4)
6 >Emitted(25, 45) Source(7, 38) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() { }
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
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
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
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
var thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE"}

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
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
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
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(37, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(37, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(37, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(37, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(38, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(38, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(38, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(38, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(38, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(38, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(38, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(38, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^
5 >                                     ^
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
4 >                                () { 
5 >                                     }
1->Emitted(39, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(39, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(39, 33) Source(12, 33) + SourceIndex(0)
4 >Emitted(39, 38) Source(12, 38) + SourceIndex(0)
5 >Emitted(39, 39) Source(12, 39) + SourceIndex(0)
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
9 >               ^^->
1 >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1 >Emitted(40, 1) Source(12, 39) + SourceIndex(0)
2 >Emitted(40, 8) Source(12, 46) + SourceIndex(0)
3 >Emitted(40, 9) Source(12, 47) + SourceIndex(0)
4 >Emitted(40, 12) Source(12, 50) + SourceIndex(0)
5 >Emitted(40, 13) Source(12, 51) + SourceIndex(0)
6 >Emitted(40, 14) Source(12, 52) + SourceIndex(0)
7 >Emitted(40, 15) Source(12, 53) + SourceIndex(0)
8 >Emitted(40, 16) Source(12, 54) + SourceIndex(0)
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
1->Emitted(41, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(41, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(41, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(41, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(41, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(41, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(41, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(41, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(41, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(42, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(42, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(42, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(43, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(43, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(43, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(43, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(44, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(44, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(45, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(45, 10) Source(5, 10) + SourceIndex(2)
3 >Emitted(45, 32) Source(5, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(46, 5) Source(5, 33) + SourceIndex(2)
2 >Emitted(46, 16) Source(5, 47) + SourceIndex(2)
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
1->Emitted(47, 10) Source(5, 33) + SourceIndex(2)
2 >Emitted(47, 20) Source(5, 47) + SourceIndex(2)
3 >Emitted(47, 22) Source(5, 33) + SourceIndex(2)
4 >Emitted(47, 43) Source(5, 47) + SourceIndex(2)
5 >Emitted(47, 45) Source(5, 33) + SourceIndex(2)
6 >Emitted(47, 49) Source(5, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(48, 9) Source(5, 33) + SourceIndex(2)
2 >Emitted(48, 31) Source(5, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(50, 1) Source(5, 51) + SourceIndex(2)
2 >Emitted(50, 2) Source(5, 52) + SourceIndex(2)
---
>>>var firstfirst_part3_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    firstfirst_part3_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(51, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(51, 5) Source(6, 7) + SourceIndex(2)
3 >Emitted(51, 24) Source(6, 26) + SourceIndex(2)
4 >Emitted(51, 27) Source(6, 29) + SourceIndex(2)
5 >Emitted(51, 28) Source(6, 30) + SourceIndex(2)
6 >Emitted(51, 30) Source(6, 32) + SourceIndex(2)
7 >Emitted(51, 32) Source(6, 34) + SourceIndex(2)
8 >Emitted(51, 34) Source(6, 36) + SourceIndex(2)
9 >Emitted(51, 35) Source(6, 37) + SourceIndex(2)
10>Emitted(51, 36) Source(6, 38) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                firstfirst_part3_ar
7 >                                                                                   );
1->Emitted(52, 1) Source(7, 1) + SourceIndex(2)
2 >Emitted(52, 23) Source(7, 23) + SourceIndex(2)
3 >Emitted(52, 53) Source(7, 24) + SourceIndex(2)
4 >Emitted(52, 55) Source(7, 26) + SourceIndex(2)
5 >Emitted(52, 65) Source(7, 31) + SourceIndex(2)
6 >Emitted(52, 84) Source(7, 50) + SourceIndex(2)
7 >Emitted(52, 95) Source(7, 52) + SourceIndex(2)
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
5 >      ^^^^^^^^^->
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
1 >Emitted(53, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(53, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(53, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(53, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(54, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(54, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(54, 13) Source(5, 12) + SourceIndex(3)
---
>>>    function f() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^^^^^^^^->
1-> {
  >    
2 >    function 
3 >             f
1->Emitted(55, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(55, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(55, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(56, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(56, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(56, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(56, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(56, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(56, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(56, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(56, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(57, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(57, 6) Source(8, 6) + SourceIndex(3)
---
>>>    f();
1->^^^^
2 >    ^
3 >     ^^
4 >       ^
5 >        ^^^^^^^^^^->
1->
  >
  >    
2 >    f
3 >     ()
4 >       ;
1->Emitted(58, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(58, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(58, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(58, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(59, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(59, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(59, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(59, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(59, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(59, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(59, 19) Source(11, 2) + SourceIndex(3)
---
>>>function forsecondsecond_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forsecondsecond_part1Rest
1->Emitted(60, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(60, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(60, 35) Source(12, 35) + SourceIndex(3)
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
1->Emitted(61, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(61, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(61, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(61, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(61, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(61, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(61, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(61, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(61, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(61, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(61, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(61, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(61, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(61, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(61, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(61, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(61, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(61, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(61, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(61, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(61, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(61, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(61, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(61, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(61, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(62, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(62, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(63, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(64, 5) Source(1, 1) + SourceIndex(4)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->class C {
  >    doSomething() {
  >        console.log("something got done");
  >    }
  >
2 >    }
1->Emitted(65, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(65, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(66, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(66, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(66, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(67, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(67, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(67, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(67, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(67, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(67, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(67, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(67, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(68, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(68, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(69, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(69, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(70, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(70, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(70, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(70, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(71, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(71, 10) Source(7, 10) + SourceIndex(4)
3 >Emitted(71, 34) Source(7, 34) + SourceIndex(4)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(72, 5) Source(7, 35) + SourceIndex(4)
2 >Emitted(72, 16) Source(7, 49) + SourceIndex(4)
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
1->Emitted(73, 10) Source(7, 35) + SourceIndex(4)
2 >Emitted(73, 20) Source(7, 49) + SourceIndex(4)
3 >Emitted(73, 22) Source(7, 35) + SourceIndex(4)
4 >Emitted(73, 43) Source(7, 49) + SourceIndex(4)
5 >Emitted(73, 45) Source(7, 35) + SourceIndex(4)
6 >Emitted(73, 49) Source(7, 49) + SourceIndex(4)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(74, 9) Source(7, 35) + SourceIndex(4)
2 >Emitted(74, 31) Source(7, 49) + SourceIndex(4)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(76, 1) Source(7, 53) + SourceIndex(4)
2 >Emitted(76, 2) Source(7, 54) + SourceIndex(4)
---
>>>var secondsecond_part2_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^^^
4 >                         ^^^
5 >                            ^
6 >                             ^^
7 >                               ^^
8 >                                 ^^
9 >                                   ^
10>                                    ^
11>                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    secondsecond_part2_ar
4 >                          = 
5 >                            [
6 >                             20
7 >                               , 
8 >                                 30
9 >                                   ]
10>                                    ;
1->Emitted(77, 1) Source(8, 1) + SourceIndex(4)
2 >Emitted(77, 5) Source(8, 7) + SourceIndex(4)
3 >Emitted(77, 26) Source(8, 28) + SourceIndex(4)
4 >Emitted(77, 29) Source(8, 31) + SourceIndex(4)
5 >Emitted(77, 30) Source(8, 32) + SourceIndex(4)
6 >Emitted(77, 32) Source(8, 34) + SourceIndex(4)
7 >Emitted(77, 34) Source(8, 36) + SourceIndex(4)
8 >Emitted(77, 36) Source(8, 38) + SourceIndex(4)
9 >Emitted(77, 37) Source(8, 39) + SourceIndex(4)
10>Emitted(77, 38) Source(8, 40) + SourceIndex(4)
---
>>>secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                      ^^
5 >                                                        ^^^^^^^^^^
6 >                                                                  ^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                       ^^^^^^^^^^^
1->
  >
2 >secondsecond_part2Spread
3 >                        (
4 >                                                      10
5 >                                                        , ...
6 >                                                                  secondsecond_part2_ar
7 >                                                                                       );
1->Emitted(78, 1) Source(9, 1) + SourceIndex(4)
2 >Emitted(78, 25) Source(9, 25) + SourceIndex(4)
3 >Emitted(78, 55) Source(9, 26) + SourceIndex(4)
4 >Emitted(78, 57) Source(9, 28) + SourceIndex(4)
5 >Emitted(78, 67) Source(9, 33) + SourceIndex(4)
6 >Emitted(78, 88) Source(9, 54) + SourceIndex(4)
7 >Emitted(78, 99) Source(9, 56) + SourceIndex(4)
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
1 >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1 >Emitted(79, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(79, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(79, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(79, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(79, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(79, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(79, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(79, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1 >
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1 >Emitted(80, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(80, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(80, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(80, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(80, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(80, 17) Source(2, 17) + SourceIndex(5)
---
>>>function forthirdthird_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forthirdthird_part1Rest
1->Emitted(81, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(81, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(81, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(82, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(82, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(82, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(82, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(82, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(82, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(82, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(82, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(82, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(82, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(82, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(82, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(82, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(82, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(82, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(82, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(82, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(82, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(82, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(82, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(82, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(82, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(82, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(82, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(82, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(83, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(83, 2) Source(5, 2) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(84, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(84, 10) Source(6, 10) + SourceIndex(5)
3 >Emitted(84, 32) Source(6, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(85, 5) Source(6, 33) + SourceIndex(5)
2 >Emitted(85, 16) Source(6, 47) + SourceIndex(5)
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
1->Emitted(86, 10) Source(6, 33) + SourceIndex(5)
2 >Emitted(86, 20) Source(6, 47) + SourceIndex(5)
3 >Emitted(86, 22) Source(6, 33) + SourceIndex(5)
4 >Emitted(86, 43) Source(6, 47) + SourceIndex(5)
5 >Emitted(86, 45) Source(6, 33) + SourceIndex(5)
6 >Emitted(86, 49) Source(6, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(87, 9) Source(6, 33) + SourceIndex(5)
2 >Emitted(87, 31) Source(6, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(89, 1) Source(6, 51) + SourceIndex(5)
2 >Emitted(89, 2) Source(6, 52) + SourceIndex(5)
---
>>>var thirdthird_part1_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    thirdthird_part1_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(90, 1) Source(7, 1) + SourceIndex(5)
2 >Emitted(90, 5) Source(7, 7) + SourceIndex(5)
3 >Emitted(90, 24) Source(7, 26) + SourceIndex(5)
4 >Emitted(90, 27) Source(7, 29) + SourceIndex(5)
5 >Emitted(90, 28) Source(7, 30) + SourceIndex(5)
6 >Emitted(90, 30) Source(7, 32) + SourceIndex(5)
7 >Emitted(90, 32) Source(7, 34) + SourceIndex(5)
8 >Emitted(90, 34) Source(7, 36) + SourceIndex(5)
9 >Emitted(90, 35) Source(7, 37) + SourceIndex(5)
10>Emitted(90, 36) Source(7, 38) + SourceIndex(5)
---
>>>thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >thirdthird_part1Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                thirdthird_part1_ar
7 >                                                                                   );
1->Emitted(91, 1) Source(8, 1) + SourceIndex(5)
2 >Emitted(91, 23) Source(8, 23) + SourceIndex(5)
3 >Emitted(91, 53) Source(8, 24) + SourceIndex(5)
4 >Emitted(91, 55) Source(8, 26) + SourceIndex(5)
5 >Emitted(91, 65) Source(8, 31) + SourceIndex(5)
6 >Emitted(91, 84) Source(8, 50) + SourceIndex(5)
7 >Emitted(91, 95) Source(8, 52) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":489,"kind":"emitHelpers","data":"typescript:read"},{"pos":490,"end":870,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":871,"end":1361,"kind":"emitHelpers","data":"typescript:rest"},{"pos":1362,"end":1795,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":1362,"end":1795,"kind":"text"}]},{"pos":1795,"end":2463,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":1795,"end":2463,"kind":"text"}]},{"pos":2463,"end":2885,"kind":"text"}],"mapHash":"-5234328997-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}","hash":"-2171038301-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nfunction secondsecond_part2Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nfunction thirdthird_part1Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));\n//# sourceMappingURL=third-output.js.map","sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]}},"dts":{"sections":[{"pos":0,"end":307,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":307,"kind":"text"}]},{"pos":307,"end":564,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":307,"end":564,"kind":"text"}]},{"pos":564,"end":740,"kind":"text"}],"mapHash":"-23413824694-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;ACXtC,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC;ACLrC,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC;ACPvC,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}","hash":"-25062717856-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n","-21549614962-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n","-9658874822-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}\nfunction thirdthird_part1Spread(...b: number[]) { }\nconst thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread(10, ...thirdthird_part1_ar);"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"downlevelIteration":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-21519156314-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
emitHelpers: (0-489):: typescript:read
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
emitHelpers: (490-870):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
emitHelpers: (871-1361):: typescript:rest
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
prepend: (1362-1795):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1362-1795)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() { }
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
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));

----------------------------------------------------------------------
prepend: (1795-2463):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1795-2463)
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
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));

----------------------------------------------------------------------
text: (2463-2885)
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
var thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-307):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-307)
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
declare const firstfirst_part3_ar: number[];

----------------------------------------------------------------------
prepend: (307-564):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (307-564)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;
declare const secondsecond_part2_ar: number[];

----------------------------------------------------------------------
text: (564-740)
declare var c: C;
declare function forthirdthird_part1Rest(): void;
declare function thirdthird_part1Spread(...b: number[]): void;
declare const thirdthird_part1_ar: number[];

======================================================================

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.readable.baseline.txt]
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
          "end": 489,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 490,
          "end": 870,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 871,
          "end": 1361,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 1362,
          "end": 1795,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 1362,
              "end": 1795,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1795,
          "end": 2463,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 1795,
              "end": 2463,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2463,
          "end": 2885,
          "kind": "text"
        }
      ],
      "hash": "-2171038301-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nfunction firstfirst_part3Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar firstfirst_part3_ar = [20, 30];\nfirstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nfunction secondsecond_part2Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar secondsecond_part2_ar = [20, 30];\nsecondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nfunction thirdthird_part1Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "-5234328997-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AAED,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACFnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE\"}",
      "sources": {
        "helpers": [
          "typescript:rest",
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 307,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 307,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 307,
          "end": 564,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 307,
              "end": 564,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 564,
          "end": 740,
          "kind": "text"
        }
      ],
      "hash": "-25062717856-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "-23413824694-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;ACXtC,iBAAS,CAAC,WAET;AAED,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC;ACLrC,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACrD,QAAA,MAAM,qBAAqB,UAAW,CAAC;ACPvC,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AACnD,QAAA,MAAM,mBAAmB,UAAW,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../../lib/lib.d.ts",
      "../../../first/bin/first-output.d.ts",
      "../../../2/second-output.d.ts",
      "../../third_part1.ts"
    ],
    "fileInfos": {
      "../../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../../../first/bin/first-output.d.ts": "-5875110108-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\n",
      "../../../2/second-output.d.ts": "-21549614962-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\n",
      "../../third_part1.ts": "-9658874822-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}\nfunction thirdthird_part1Spread(...b: number[]) { }\nconst thirdthird_part1_ar = [20, 30];\nthirdthird_part1Spread(10, ...thirdthird_part1_ar);"
    },
    "root": [
      [
        4,
        "../../third_part1.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "outFile": "./third-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-21519156314-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare function firstfirst_part3Spread(...b: number[]): void;\ndeclare const firstfirst_part3_ar: number[];\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare function secondsecond_part2Spread(...b: number[]): void;\ndeclare const secondsecond_part2_ar: number[];\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\ndeclare function thirdthird_part1Spread(...b: number[]): void;\ndeclare const thirdthird_part1_ar: number[];\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 10156
}

