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
firstfirst_part3Spread(...[10, 20, 30]);

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
  "references": [
  ]
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
secondsecond_part2Spread(...[10, 20, 30]);

//// [/src/second/tsconfig.json]
{
  "compilerOptions": {
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
  "references": [
  ]
}


//// [/src/third/third_part1.ts]
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}
function thirdthird_part1Spread(...b: number[]) { }
thirdthird_part1Spread(...[10, 20, 30]);

//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
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
    { "path": "../first", "prepend": true },
    { "path": "../second", "prepend": true },
  ]
}




Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:00 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/2/second-output.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/second/tsconfig.json'...

[[90m12:01:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/thirdjs/output/third-output.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/third/tsconfig.json'...

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
//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
4 >               ^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
secondsecond_part2Spread.apply(void 0, __spread([10, 20, 30]));
//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,wBAAwB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
>>>var __spread = (this && this.__spread) || function () {
>>>    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
>>>    return ar;
>>>};
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
1 >Emitted(32, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(32, 5) Source(5, 11) + SourceIndex(0)
3 >Emitted(32, 6) Source(5, 12) + SourceIndex(0)
4 >Emitted(32, 7) Source(11, 2) + SourceIndex(0)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(33, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(33, 12) Source(5, 11) + SourceIndex(0)
3 >Emitted(33, 13) Source(5, 12) + SourceIndex(0)
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
1->Emitted(34, 5) Source(6, 5) + SourceIndex(0)
2 >Emitted(34, 14) Source(6, 14) + SourceIndex(0)
3 >Emitted(34, 15) Source(6, 15) + SourceIndex(0)
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
1->Emitted(35, 9) Source(7, 9) + SourceIndex(0)
2 >Emitted(35, 16) Source(7, 16) + SourceIndex(0)
3 >Emitted(35, 17) Source(7, 17) + SourceIndex(0)
4 >Emitted(35, 20) Source(7, 20) + SourceIndex(0)
5 >Emitted(35, 21) Source(7, 21) + SourceIndex(0)
6 >Emitted(35, 30) Source(7, 30) + SourceIndex(0)
7 >Emitted(35, 31) Source(7, 31) + SourceIndex(0)
8 >Emitted(35, 32) Source(7, 32) + SourceIndex(0)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(36, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(36, 6) Source(8, 6) + SourceIndex(0)
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
1->Emitted(37, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(37, 6) Source(10, 6) + SourceIndex(0)
3 >Emitted(37, 8) Source(10, 8) + SourceIndex(0)
4 >Emitted(37, 9) Source(10, 9) + SourceIndex(0)
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
1->Emitted(38, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(38, 2) Source(11, 2) + SourceIndex(0)
3 >Emitted(38, 4) Source(5, 11) + SourceIndex(0)
4 >Emitted(38, 5) Source(5, 12) + SourceIndex(0)
5 >Emitted(38, 10) Source(5, 11) + SourceIndex(0)
6 >Emitted(38, 11) Source(5, 12) + SourceIndex(0)
7 >Emitted(38, 19) Source(11, 2) + SourceIndex(0)
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
1->Emitted(39, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(39, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(39, 35) Source(12, 35) + SourceIndex(0)
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
3 > ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(41, 2) Source(14, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(42, 1) Source(1, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(43, 5) Source(1, 1) + SourceIndex(1)
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
1->Emitted(44, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(44, 6) Source(5, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(45, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(45, 28) Source(2, 16) + SourceIndex(1)
3 >Emitted(45, 31) Source(2, 5) + SourceIndex(1)
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
1->Emitted(46, 9) Source(3, 9) + SourceIndex(1)
2 >Emitted(46, 16) Source(3, 16) + SourceIndex(1)
3 >Emitted(46, 17) Source(3, 17) + SourceIndex(1)
4 >Emitted(46, 20) Source(3, 20) + SourceIndex(1)
5 >Emitted(46, 21) Source(3, 21) + SourceIndex(1)
6 >Emitted(46, 41) Source(3, 41) + SourceIndex(1)
7 >Emitted(46, 42) Source(3, 42) + SourceIndex(1)
8 >Emitted(46, 43) Source(3, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(47, 5) Source(4, 5) + SourceIndex(1)
2 >Emitted(47, 6) Source(4, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(48, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(48, 13) Source(5, 2) + SourceIndex(1)
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
1 >Emitted(49, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(49, 2) Source(5, 2) + SourceIndex(1)
3 >Emitted(49, 2) Source(1, 1) + SourceIndex(1)
4 >Emitted(49, 6) Source(5, 2) + SourceIndex(1)
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
1->Emitted(50, 1) Source(7, 1) + SourceIndex(1)
2 >Emitted(50, 10) Source(7, 10) + SourceIndex(1)
3 >Emitted(50, 34) Source(7, 34) + SourceIndex(1)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(51, 5) Source(7, 35) + SourceIndex(1)
2 >Emitted(51, 16) Source(7, 49) + SourceIndex(1)
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
1->Emitted(52, 10) Source(7, 35) + SourceIndex(1)
2 >Emitted(52, 20) Source(7, 49) + SourceIndex(1)
3 >Emitted(52, 22) Source(7, 35) + SourceIndex(1)
4 >Emitted(52, 43) Source(7, 49) + SourceIndex(1)
5 >Emitted(52, 45) Source(7, 35) + SourceIndex(1)
6 >Emitted(52, 49) Source(7, 49) + SourceIndex(1)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(53, 9) Source(7, 35) + SourceIndex(1)
2 >Emitted(53, 31) Source(7, 49) + SourceIndex(1)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(55, 1) Source(7, 53) + SourceIndex(1)
2 >Emitted(55, 2) Source(7, 54) + SourceIndex(1)
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
1->Emitted(56, 1) Source(8, 1) + SourceIndex(1)
2 >Emitted(56, 25) Source(8, 25) + SourceIndex(1)
3 >Emitted(56, 49) Source(8, 29) + SourceIndex(1)
4 >Emitted(56, 50) Source(8, 30) + SourceIndex(1)
5 >Emitted(56, 52) Source(8, 32) + SourceIndex(1)
6 >Emitted(56, 54) Source(8, 34) + SourceIndex(1)
7 >Emitted(56, 56) Source(8, 36) + SourceIndex(1)
8 >Emitted(56, 58) Source(8, 38) + SourceIndex(1)
9 >Emitted(56, 60) Source(8, 40) + SourceIndex(1)
10>Emitted(56, 61) Source(8, 41) + SourceIndex(1)
11>Emitted(56, 64) Source(8, 43) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.tsbuildinfo]
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
          "end": 1800,
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
          "end": 219,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/2/second-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/2/second-output.js
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
text: (1180-1800)
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

======================================================================
======================================================================
File:: /src/2/second-output.d.ts
----------------------------------------------------------------------
text: (0-219)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;

======================================================================

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
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
5 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
2 >function 
3 >                 firstfirst_part3Spread
4 >                                       (
5 >                                        ...
6 >                                           b: 
7 >                                              number
8 >                                                    []
9 >                                                      ) { }
1->Emitted(10, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(10, 18) Source(4, 10) + SourceIndex(2)
3 >Emitted(10, 40) Source(4, 32) + SourceIndex(2)
4 >Emitted(10, 41) Source(4, 33) + SourceIndex(2)
5 >Emitted(10, 44) Source(4, 36) + SourceIndex(2)
6 >Emitted(10, 47) Source(4, 39) + SourceIndex(2)
7 >Emitted(10, 53) Source(4, 45) + SourceIndex(2)
8 >Emitted(10, 55) Source(4, 47) + SourceIndex(2)
9 >Emitted(10, 63) Source(4, 52) + SourceIndex(2)
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
firstfirst_part3Spread.apply(void 0, __spread([10, 20, 30]));
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
3 > ^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(36, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(36, 2) Source(14, 2) + SourceIndex(0)
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
          "end": 1619,
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
text: (1180-1619)
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
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;
declare var c: C;
declare function forthirdthird_part1Rest(): void;
declare function thirdthird_part1Spread(...b: number[]): void;
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;ACHnD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;AAED,iBAAS,wBAAwB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;ACNrD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B;AACD,iBAAS,sBAAsB,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
5 >                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
2 >function 
3 >                 firstfirst_part3Spread
4 >                                       (
5 >                                        ...
6 >                                           b: 
7 >                                              number
8 >                                                    []
9 >                                                      ) { }
1->Emitted(10, 1) Source(4, 1) + SourceIndex(1)
2 >Emitted(10, 18) Source(4, 10) + SourceIndex(1)
3 >Emitted(10, 40) Source(4, 32) + SourceIndex(1)
4 >Emitted(10, 41) Source(4, 33) + SourceIndex(1)
5 >Emitted(10, 44) Source(4, 36) + SourceIndex(1)
6 >Emitted(10, 47) Source(4, 39) + SourceIndex(1)
7 >Emitted(10, 53) Source(4, 45) + SourceIndex(1)
8 >Emitted(10, 55) Source(4, 47) + SourceIndex(1)
9 >Emitted(10, 63) Source(4, 52) + SourceIndex(1)
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
1 >Emitted(11, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(11, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(11, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(11, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(12, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(13, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(13, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(13, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(13, 21) Source(5, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(14, 2) Source(11, 2) + SourceIndex(2)
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
1->Emitted(15, 1) Source(12, 1) + SourceIndex(2)
2 >Emitted(15, 18) Source(12, 10) + SourceIndex(2)
3 >Emitted(15, 43) Source(12, 35) + SourceIndex(2)
4 >Emitted(15, 52) Source(14, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^->
1 >
2 >class 
3 >              C
1 >Emitted(16, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(16, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(16, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(17, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(17, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(18, 2) Source(5, 2) + SourceIndex(3)
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
1->Emitted(19, 1) Source(7, 1) + SourceIndex(3)
2 >Emitted(19, 18) Source(7, 10) + SourceIndex(3)
3 >Emitted(19, 42) Source(7, 34) + SourceIndex(3)
4 >Emitted(19, 43) Source(7, 35) + SourceIndex(3)
5 >Emitted(19, 46) Source(7, 38) + SourceIndex(3)
6 >Emitted(19, 49) Source(7, 41) + SourceIndex(3)
7 >Emitted(19, 55) Source(7, 47) + SourceIndex(3)
8 >Emitted(19, 57) Source(7, 49) + SourceIndex(3)
9 >Emitted(19, 65) Source(7, 54) + SourceIndex(3)
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
7 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1 >Emitted(20, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(20, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(20, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(20, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(20, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(20, 18) Source(1, 17) + SourceIndex(4)
---
>>>declare function forthirdthird_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
5 >                                                 ^^^^^^^^^^^^^^->
1->
  >c.doSomething();
  >
2 >function 
3 >                 forthirdthird_part1Rest
4 >                                        () {
  >                                        const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                        }
1->Emitted(21, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(21, 18) Source(3, 10) + SourceIndex(4)
3 >Emitted(21, 41) Source(3, 33) + SourceIndex(4)
4 >Emitted(21, 50) Source(5, 2) + SourceIndex(4)
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
1->Emitted(22, 1) Source(6, 1) + SourceIndex(4)
2 >Emitted(22, 18) Source(6, 10) + SourceIndex(4)
3 >Emitted(22, 40) Source(6, 32) + SourceIndex(4)
4 >Emitted(22, 41) Source(6, 33) + SourceIndex(4)
5 >Emitted(22, 44) Source(6, 36) + SourceIndex(4)
6 >Emitted(22, 47) Source(6, 39) + SourceIndex(4)
7 >Emitted(22, 53) Source(6, 45) + SourceIndex(4)
8 >Emitted(22, 55) Source(6, 47) + SourceIndex(4)
9 >Emitted(22, 63) Source(6, 52) + SourceIndex(4)
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;ACAxC,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,wBAAwB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE;ACP1C,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,sBAAsB,wBAAI,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,CAAC,GAAE"}

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
3 > ^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(36, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(36, 2) Source(14, 2) + SourceIndex(0)
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
1 >Emitted(48, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(48, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(48, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(48, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(49, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(49, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(49, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(50, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(50, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(50, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(51, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(51, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(51, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(51, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(51, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(51, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(51, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(51, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(52, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(52, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(53, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(53, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(53, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(53, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(54, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(54, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(54, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(54, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(54, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(54, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(54, 19) Source(11, 2) + SourceIndex(3)
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
1->Emitted(55, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(55, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(55, 35) Source(12, 35) + SourceIndex(3)
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
1->Emitted(56, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(56, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(56, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(56, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(56, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(56, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(56, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(56, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(56, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(56, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(56, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(56, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(56, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(56, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(56, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(56, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(56, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(56, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(56, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(56, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(56, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(56, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(56, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(56, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(56, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(57, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(57, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(58, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(59, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(60, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(60, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(61, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(61, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(61, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(62, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(62, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(62, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(62, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(62, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(62, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(62, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(62, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(63, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(63, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(64, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(64, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(65, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(65, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(65, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(65, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(66, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(66, 10) Source(7, 10) + SourceIndex(4)
3 >Emitted(66, 34) Source(7, 34) + SourceIndex(4)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(67, 5) Source(7, 35) + SourceIndex(4)
2 >Emitted(67, 16) Source(7, 49) + SourceIndex(4)
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
1->Emitted(68, 10) Source(7, 35) + SourceIndex(4)
2 >Emitted(68, 20) Source(7, 49) + SourceIndex(4)
3 >Emitted(68, 22) Source(7, 35) + SourceIndex(4)
4 >Emitted(68, 43) Source(7, 49) + SourceIndex(4)
5 >Emitted(68, 45) Source(7, 35) + SourceIndex(4)
6 >Emitted(68, 49) Source(7, 49) + SourceIndex(4)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(69, 9) Source(7, 35) + SourceIndex(4)
2 >Emitted(69, 31) Source(7, 49) + SourceIndex(4)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(71, 1) Source(7, 53) + SourceIndex(4)
2 >Emitted(71, 2) Source(7, 54) + SourceIndex(4)
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
1->Emitted(72, 1) Source(8, 1) + SourceIndex(4)
2 >Emitted(72, 25) Source(8, 25) + SourceIndex(4)
3 >Emitted(72, 49) Source(8, 29) + SourceIndex(4)
4 >Emitted(72, 50) Source(8, 30) + SourceIndex(4)
5 >Emitted(72, 52) Source(8, 32) + SourceIndex(4)
6 >Emitted(72, 54) Source(8, 34) + SourceIndex(4)
7 >Emitted(72, 56) Source(8, 36) + SourceIndex(4)
8 >Emitted(72, 58) Source(8, 38) + SourceIndex(4)
9 >Emitted(72, 60) Source(8, 40) + SourceIndex(4)
10>Emitted(72, 61) Source(8, 41) + SourceIndex(4)
11>Emitted(72, 64) Source(8, 43) + SourceIndex(4)
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
1 >Emitted(73, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(73, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(73, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(73, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(73, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(73, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(73, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(73, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(74, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(74, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(74, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(74, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(74, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(74, 17) Source(2, 17) + SourceIndex(5)
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
1->Emitted(75, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(75, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(75, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(76, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(76, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(76, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(76, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(76, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(76, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(76, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(76, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(76, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(76, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(76, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(76, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(76, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(76, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(76, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(76, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(76, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(76, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(76, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(76, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(76, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(76, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(76, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(76, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(76, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(77, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(77, 2) Source(5, 2) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(78, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(78, 10) Source(6, 10) + SourceIndex(5)
3 >Emitted(78, 32) Source(6, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(79, 5) Source(6, 33) + SourceIndex(5)
2 >Emitted(79, 16) Source(6, 47) + SourceIndex(5)
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
1->Emitted(80, 10) Source(6, 33) + SourceIndex(5)
2 >Emitted(80, 20) Source(6, 47) + SourceIndex(5)
3 >Emitted(80, 22) Source(6, 33) + SourceIndex(5)
4 >Emitted(80, 43) Source(6, 47) + SourceIndex(5)
5 >Emitted(80, 45) Source(6, 33) + SourceIndex(5)
6 >Emitted(80, 49) Source(6, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(81, 9) Source(6, 33) + SourceIndex(5)
2 >Emitted(81, 31) Source(6, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(83, 1) Source(6, 51) + SourceIndex(5)
2 >Emitted(83, 2) Source(6, 52) + SourceIndex(5)
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
1->Emitted(84, 1) Source(7, 1) + SourceIndex(5)
2 >Emitted(84, 23) Source(7, 23) + SourceIndex(5)
3 >Emitted(84, 47) Source(7, 27) + SourceIndex(5)
4 >Emitted(84, 48) Source(7, 28) + SourceIndex(5)
5 >Emitted(84, 50) Source(7, 30) + SourceIndex(5)
6 >Emitted(84, 52) Source(7, 32) + SourceIndex(5)
7 >Emitted(84, 54) Source(7, 34) + SourceIndex(5)
8 >Emitted(84, 56) Source(7, 36) + SourceIndex(5)
9 >Emitted(84, 58) Source(7, 38) + SourceIndex(5)
10>Emitted(84, 59) Source(7, 39) + SourceIndex(5)
11>Emitted(84, 62) Source(7, 41) + SourceIndex(5)
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
          "end": 1619,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 1180,
              "end": 1619,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1619,
          "end": 2239,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 1619,
              "end": 2239,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2239,
          "end": 2604,
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
prepend: (1180-1619):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1180-1619)
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
firstfirst_part3Spread.apply(void 0, __spread([10, 20, 30]));

----------------------------------------------------------------------
prepend: (1619-2239):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1619-2239)
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
text: (2239-2604)
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

