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


//// [/src/first/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
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


//// [/src/second/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
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

//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
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
[[90m12:00:21 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:22 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.tsbuildinfo' does not exist

[[90m12:00:23 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:00:33 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/2/second-output.tsbuildinfo' does not exist

[[90m12:00:34 AM[0m] Building project '/src/second/tsconfig.json'...

[[90m12:00:44 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/thirdjs/output/third-output.tsbuildinfo' does not exist

[[90m12:00:45 AM[0m] Building project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success
readFiles:: {
  "/src/third/tsconfig.json": 1,
  "/src/first/tsconfig.json": 1,
  "/src/second/tsconfig.json": 1,
  "/src/first/first_PART1.ts": 1,
  "/src/first/first_part2.ts": 1,
  "/src/first/first_part3.ts": 1,
  "/src/second/second_part1.ts": 1,
  "/src/second/second_part2.ts": 1,
  "/src/first/bin/first-output.d.ts": 1,
  "/src/2/second-output.d.ts": 1,
  "/src/third/third_part1.ts": 1,
  "/src/first/bin/first-output.js": 1,
  "/src/2/second-output.js": 1,
  "/src/first/bin/first-output.js.map": 1,
  "/src/2/second-output.js.map": 1,
  "/src/first/bin/first-output.d.ts.map": 1,
  "/src/2/second-output.d.ts.map": 1
} 

//// [/src/2/second-output.d.ts]
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(8, 2) Source(5, 2) + SourceIndex(1)
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

//// [/src/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

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
1 >Emitted(12, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(12, 5) Source(5, 11) + SourceIndex(0)
3 >Emitted(12, 6) Source(5, 12) + SourceIndex(0)
4 >Emitted(12, 7) Source(11, 2) + SourceIndex(0)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(13, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(13, 12) Source(5, 11) + SourceIndex(0)
3 >Emitted(13, 13) Source(5, 12) + SourceIndex(0)
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
1->Emitted(14, 5) Source(6, 5) + SourceIndex(0)
2 >Emitted(14, 14) Source(6, 14) + SourceIndex(0)
3 >Emitted(14, 15) Source(6, 15) + SourceIndex(0)
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
1->Emitted(15, 9) Source(7, 9) + SourceIndex(0)
2 >Emitted(15, 16) Source(7, 16) + SourceIndex(0)
3 >Emitted(15, 17) Source(7, 17) + SourceIndex(0)
4 >Emitted(15, 20) Source(7, 20) + SourceIndex(0)
5 >Emitted(15, 21) Source(7, 21) + SourceIndex(0)
6 >Emitted(15, 30) Source(7, 30) + SourceIndex(0)
7 >Emitted(15, 31) Source(7, 31) + SourceIndex(0)
8 >Emitted(15, 32) Source(7, 32) + SourceIndex(0)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(16, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(16, 6) Source(8, 6) + SourceIndex(0)
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
1->Emitted(17, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(17, 6) Source(10, 6) + SourceIndex(0)
3 >Emitted(17, 8) Source(10, 8) + SourceIndex(0)
4 >Emitted(17, 9) Source(10, 9) + SourceIndex(0)
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
1->Emitted(18, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(18, 2) Source(11, 2) + SourceIndex(0)
3 >Emitted(18, 4) Source(5, 11) + SourceIndex(0)
4 >Emitted(18, 5) Source(5, 12) + SourceIndex(0)
5 >Emitted(18, 10) Source(5, 11) + SourceIndex(0)
6 >Emitted(18, 11) Source(5, 12) + SourceIndex(0)
7 >Emitted(18, 19) Source(11, 2) + SourceIndex(0)
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
1->Emitted(19, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(19, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(19, 35) Source(12, 35) + SourceIndex(0)
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
1->Emitted(20, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(20, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(20, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(20, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(20, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(20, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(20, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(20, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(20, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(20, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(20, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(20, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(20, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(20, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(20, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(20, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(20, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(20, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(20, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(20, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(20, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(20, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(20, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(20, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(20, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(21, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(21, 2) Source(14, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(22, 1) Source(1, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(23, 5) Source(1, 1) + SourceIndex(1)
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
1->Emitted(24, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(24, 6) Source(5, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(25, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(25, 28) Source(2, 16) + SourceIndex(1)
3 >Emitted(25, 31) Source(2, 5) + SourceIndex(1)
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
1->Emitted(26, 9) Source(3, 9) + SourceIndex(1)
2 >Emitted(26, 16) Source(3, 16) + SourceIndex(1)
3 >Emitted(26, 17) Source(3, 17) + SourceIndex(1)
4 >Emitted(26, 20) Source(3, 20) + SourceIndex(1)
5 >Emitted(26, 21) Source(3, 21) + SourceIndex(1)
6 >Emitted(26, 41) Source(3, 41) + SourceIndex(1)
7 >Emitted(26, 42) Source(3, 42) + SourceIndex(1)
8 >Emitted(26, 43) Source(3, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(27, 5) Source(4, 5) + SourceIndex(1)
2 >Emitted(27, 6) Source(4, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(28, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(28, 13) Source(5, 2) + SourceIndex(1)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(29, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(29, 2) Source(5, 2) + SourceIndex(1)
3 >Emitted(29, 2) Source(1, 1) + SourceIndex(1)
4 >Emitted(29, 6) Source(5, 2) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../second","sourceFiles":["../second/second_part1.ts","../second/second_part2.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":877,"kind":"text"}],"sources":{"helpers":["typescript:rest"]},"mapHash":"-21017865726-{\"version\":3,\"file\":\"second-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC\"}","hash":"4271271922-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\n//# sourceMappingURL=second-output.js.map"},"dts":{"sections":[{"pos":0,"end":145,"kind":"text"}],"mapHash":"-13719015667-{\"version\":3,\"file\":\"second-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd\"}","hash":"2818433922-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n//# sourceMappingURL=second-output.d.ts.map"}},"program":{"fileNames":["../../lib/lib.d.ts","../second/second_part1.ts","../second/second_part2.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-13362958657-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\nfunction forsecondsecond_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}","3642692259-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./second-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n","latestChangedDtsFile":"./second-output.d.ts"},"version":"FakeTSVersion"}

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
text: (491-877)
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

======================================================================
======================================================================
File:: /src/2/second-output.d.ts
----------------------------------------------------------------------
text: (0-145)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}

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
          "end": 877,
          "kind": "text"
        }
      ],
      "hash": "4271271922-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\n//# sourceMappingURL=second-output.js.map",
      "mapHash": "-21017865726-{\"version\":3,\"file\":\"second-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC\"}",
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
          "end": 145,
          "kind": "text"
        }
      ],
      "hash": "2818433922-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n//# sourceMappingURL=second-output.d.ts.map",
      "mapHash": "-13719015667-{\"version\":3,\"file\":\"second-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd\"}"
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
      "../second/second_part2.ts": "3642692259-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n"
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
      "outFile": "./second-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n",
    "latestChangedDtsFile": "./second-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 3830
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
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET"}

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
5 >                             ^^^^^^^^^^^^->
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
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(16, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(16, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(17, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(17, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(17, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(17, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(17, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(17, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(17, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(17, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(17, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(18, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(18, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(18, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(19, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(19, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(19, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(19, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(20, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(20, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":709,"kind":"text"}],"sources":{"helpers":["typescript:rest"]},"mapHash":"-19791845071-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"-20088349121-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":199,"kind":"text"}],"mapHash":"22543277725-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET\"}","hash":"-9615756366-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-25468252236-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}","6007494133-console.log(f());\n","4357625305-function f() {\n    return \"JS does hoists\";\n}\n"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-14427003669-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

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
text: (491-709)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-199)
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
          "end": 709,
          "kind": "text"
        }
      ],
      "hash": "-20088349121-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-19791845071-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}",
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
          "end": 199,
          "kind": "text"
        }
      ],
      "hash": "-9615756366-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "22543277725-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET\"}"
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
      "../first_part3.ts": "4357625305-function f() {\n    return \"JS does hoists\";\n}\n"
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
      "outFile": "./first-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-14427003669-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 3726
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
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare var c: C;
declare function forthirdthird_part1Rest(): void;
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B"}

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
1 >Emitted(10, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(10, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(10, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(10, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(11, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(12, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(12, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(12, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(12, 21) Source(5, 13) + SourceIndex(2)
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
1 >Emitted(13, 2) Source(11, 2) + SourceIndex(2)
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
1->Emitted(14, 1) Source(12, 1) + SourceIndex(2)
2 >Emitted(14, 18) Source(12, 10) + SourceIndex(2)
3 >Emitted(14, 43) Source(12, 35) + SourceIndex(2)
4 >Emitted(14, 52) Source(14, 2) + SourceIndex(2)
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
1 >Emitted(15, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(15, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(15, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(16, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(16, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(17, 2) Source(5, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>declare var c: C;
1->
2 >^^^^^^^^
3 >        ^^^^
4 >            ^
5 >             ^^^
6 >                ^
7 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1->Emitted(18, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(18, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(18, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(18, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(18, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(18, 18) Source(1, 17) + SourceIndex(4)
---
>>>declare function forthirdthird_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
1->
  >c.doSomething();
  >
2 >function 
3 >                 forthirdthird_part1Rest
4 >                                        () {
  >                                        const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                        }
1->Emitted(19, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(19, 18) Source(3, 10) + SourceIndex(4)
3 >Emitted(19, 41) Source(3, 33) + SourceIndex(4)
4 >Emitted(19, 50) Source(5, 2) + SourceIndex(4)
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
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
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
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC"}

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
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(16, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(16, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(17, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(17, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(17, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(17, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(17, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(17, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(17, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(17, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(17, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(18, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(18, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(18, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(19, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(19, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(19, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(19, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^->
1 >
  >
2 >}
1 >Emitted(20, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(20, 2) Source(3, 2) + SourceIndex(2)
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
5 >      ^^^^^^^^^->
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
4 >            ^^^^^^->
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
4 >              ^^^^^^^^^^^^^^^^^->
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
3 >     ^^^->
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
5 >        ^^^^^^^^^^->
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
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(29, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(29, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(29, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(29, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(29, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(29, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(29, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(29, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(29, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(29, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(29, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(29, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(29, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(29, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(29, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(29, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(29, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(29, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(29, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(29, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(29, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(29, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(29, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(29, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(29, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
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
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(31, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(32, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(33, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(33, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
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
3 >     ^^^^^^^^->
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
5 >     ^^^^^^^^^^^->
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
>>>var c = new C();
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^
6 >            ^
7 >             ^^
8 >               ^
1->
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(39, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(39, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(39, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(39, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(39, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(39, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(39, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(39, 17) Source(1, 17) + SourceIndex(5)
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
1 >Emitted(40, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(40, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(40, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(40, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(40, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(40, 17) Source(2, 17) + SourceIndex(5)
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
1->Emitted(41, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(41, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(41, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(42, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(42, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(42, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(42, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(42, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(42, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(42, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(42, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(42, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(42, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(42, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(42, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(42, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(42, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(42, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(42, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(42, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(42, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(42, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(42, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(42, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(42, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(42, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(42, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(42, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(43, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(43, 2) Source(5, 2) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":709,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":491,"end":709,"kind":"text"}]},{"pos":709,"end":1095,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":709,"end":1095,"kind":"text"}]},{"pos":1095,"end":1243,"kind":"text"}],"sources":{"helpers":["typescript:rest"]},"mapHash":"13581617434-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC\"}","hash":"3074920351-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\n//# sourceMappingURL=third-output.js.map"},"dts":{"sections":[{"pos":0,"end":199,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":199,"kind":"text"}]},{"pos":199,"end":344,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":199,"end":344,"kind":"text"}]},{"pos":344,"end":412,"kind":"text"}],"mapHash":"54171448521-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B\"}","hash":"-25063643521-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-14427003669-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n","-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n","-7656447355-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-23528448763-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

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
prepend: (491-709):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (491-709)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (709-1095):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (709-1095)
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

----------------------------------------------------------------------
text: (1095-1243)
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-199):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-199)
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
prepend: (199-344):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (199-344)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (344-412)
declare var c: C;
declare function forthirdthird_part1Rest(): void;

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
          "end": 709,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 491,
              "end": 709,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 709,
          "end": 1095,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 709,
              "end": 1095,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1095,
          "end": 1243,
          "kind": "text"
        }
      ],
      "hash": "3074920351-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hello, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "13581617434-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC\"}",
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
          "end": 199,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 199,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 199,
          "end": 344,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 199,
              "end": 344,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 344,
          "end": 412,
          "kind": "text"
        }
      ],
      "hash": "-25063643521-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "54171448521-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B\"}"
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
      "../../../first/bin/first-output.d.ts": "-14427003669-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n",
      "../../../2/second-output.d.ts": "-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n",
      "../../third_part1.ts": "-7656447355-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}"
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
      "outFile": "./third-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-23528448763-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 6501
}



Change:: incremental-declaration-changes
Input::
//// [/src/first/first_PART1.ts]
interface TheFirst {
    none: any;
}

const s = "Hola, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
function forfirstfirst_PART1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}



Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:03 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:04 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:05 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:14 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part1.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:15 AM[0m] Project 'src/third/tsconfig.json' is out of date because output 'src/third/thirdjs/output/third-output.tsbuildinfo' is older than input 'src/first'

[[90m12:01:16 AM[0m] Building project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success
readFiles:: {
  "/src/third/tsconfig.json": 1,
  "/src/first/tsconfig.json": 1,
  "/src/second/tsconfig.json": 1,
  "/src/first/bin/first-output.tsbuildinfo": 1,
  "/src/first/first_PART1.ts": 1,
  "/src/first/first_part2.ts": 1,
  "/src/first/first_part3.ts": 1,
  "/src/2/second-output.tsbuildinfo": 1,
  "/src/third/thirdjs/output/third-output.tsbuildinfo": 1,
  "/src/first/bin/first-output.d.ts": 1,
  "/src/2/second-output.d.ts": 1,
  "/src/third/third_part1.ts": 1,
  "/src/first/bin/first-output.js": 1,
  "/src/2/second-output.js": 1,
  "/src/first/bin/first-output.js.map": 1,
  "/src/2/second-output.js.map": 1,
  "/src/first/bin/first-output.d.ts.map": 1,
  "/src/2/second-output.d.ts.map": 1
} 

//// [/src/first/bin/first-output.d.ts]
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hola, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^
6 >                               ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hola, world"
6 >                               ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 32) Source(5, 24) + SourceIndex(0)
6 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
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
5 >                             ^^^^^^^^^^^^->
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
var s = "Hola, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>var s = "Hola, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1 >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1 >Emitted(12, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(12, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(12, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(12, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(12, 22) Source(5, 24) + SourceIndex(0)
6 >Emitted(12, 23) Source(5, 25) + SourceIndex(0)
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
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(16, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(16, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(17, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(17, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(17, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(17, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(17, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(17, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(17, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(17, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(17, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(18, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(18, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(18, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(19, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(19, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(19, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(19, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(20, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(20, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":708,"kind":"text"}],"sources":{"helpers":["typescript:rest"]},"mapHash":"-13521552725-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"-16804917073-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":198,"kind":"text"}],"mapHash":"34379070423-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET\"}","hash":"-11409691198-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-20332566396-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hola, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}","6007494133-console.log(f());\n","4357625305-function f() {\n    return \"JS does hoists\";\n}\n"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

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
text: (491-708)
var s = "Hola, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-198)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;

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
          "end": 708,
          "kind": "text"
        }
      ],
      "hash": "-16804917073-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-13521552725-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}",
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
          "end": 198,
          "kind": "text"
        }
      ],
      "hash": "-11409691198-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "34379070423-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET\"}"
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
      "../first_part1.ts": "-20332566396-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hola, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}",
      "../first_part2.ts": "6007494133-console.log(f());\n",
      "../first_part3.ts": "4357625305-function f() {\n    return \"JS does hoists\";\n}\n"
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
      "outFile": "./first-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 3723
}

//// [/src/third/thirdjs/output/third-output.d.ts]
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare var c: C;
declare function forthirdthird_part1Rest(): void;
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hola, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^
6 >                               ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hola, world"
6 >                               ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 32) Source(5, 24) + SourceIndex(0)
6 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
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
1 >Emitted(10, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(10, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(10, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(10, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(11, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(12, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(12, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(12, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(12, 21) Source(5, 13) + SourceIndex(2)
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
1 >Emitted(13, 2) Source(11, 2) + SourceIndex(2)
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
1->Emitted(14, 1) Source(12, 1) + SourceIndex(2)
2 >Emitted(14, 18) Source(12, 10) + SourceIndex(2)
3 >Emitted(14, 43) Source(12, 35) + SourceIndex(2)
4 >Emitted(14, 52) Source(14, 2) + SourceIndex(2)
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
1 >Emitted(15, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(15, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(15, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(16, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(16, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(17, 2) Source(5, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>declare var c: C;
1->
2 >^^^^^^^^
3 >        ^^^^
4 >            ^
5 >             ^^^
6 >                ^
7 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1->Emitted(18, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(18, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(18, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(18, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(18, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(18, 18) Source(1, 17) + SourceIndex(4)
---
>>>declare function forthirdthird_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
1->
  >c.doSomething();
  >
2 >function 
3 >                 forthirdthird_part1Rest
4 >                                        () {
  >                                        const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                        }
1->Emitted(19, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(19, 18) Source(3, 10) + SourceIndex(4)
3 >Emitted(19, 41) Source(3, 33) + SourceIndex(4)
4 >Emitted(19, 50) Source(5, 2) + SourceIndex(4)
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
var s = "Hola, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
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
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC"}

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
>>>var s = "Hola, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1 >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1 >Emitted(12, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(12, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(12, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(12, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(12, 22) Source(5, 24) + SourceIndex(0)
6 >Emitted(12, 23) Source(5, 25) + SourceIndex(0)
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
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(16, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(16, 2) Source(14, 2) + SourceIndex(0)
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
1->Emitted(17, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(17, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(17, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(17, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(17, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(17, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(17, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(17, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(17, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(18, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(18, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(18, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(19, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(19, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(19, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(19, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^->
1 >
  >
2 >}
1 >Emitted(20, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(20, 2) Source(3, 2) + SourceIndex(2)
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
5 >      ^^^^^^^^^->
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
4 >            ^^^^^^->
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
4 >              ^^^^^^^^^^^^^^^^^->
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
3 >     ^^^->
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
5 >        ^^^^^^^^^^->
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
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(29, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(29, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(29, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(29, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(29, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(29, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(29, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(29, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(29, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(29, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(29, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(29, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(29, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(29, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(29, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(29, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(29, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(29, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(29, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(29, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(29, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(29, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(29, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(29, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(29, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
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
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(31, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(32, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(33, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(33, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
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
3 >     ^^^^^^^^->
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
5 >     ^^^^^^^^^^^->
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
>>>var c = new C();
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^
6 >            ^
7 >             ^^
8 >               ^
1->
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(39, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(39, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(39, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(39, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(39, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(39, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(39, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(39, 17) Source(1, 17) + SourceIndex(5)
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
1 >Emitted(40, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(40, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(40, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(40, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(40, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(40, 17) Source(2, 17) + SourceIndex(5)
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
1->Emitted(41, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(41, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(41, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(42, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(42, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(42, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(42, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(42, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(42, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(42, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(42, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(42, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(42, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(42, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(42, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(42, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(42, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(42, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(42, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(42, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(42, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(42, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(42, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(42, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(42, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(42, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(42, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(42, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(43, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(43, 2) Source(5, 2) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":708,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":491,"end":708,"kind":"text"}]},{"pos":708,"end":1094,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":708,"end":1094,"kind":"text"}]},{"pos":1094,"end":1242,"kind":"text"}],"sources":{"helpers":["typescript:rest"]},"mapHash":"40950852308-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC\"}","hash":"-11659135473-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\n//# sourceMappingURL=third-output.js.map"},"dts":{"sections":[{"pos":0,"end":198,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":198,"kind":"text"}]},{"pos":198,"end":343,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":198,"end":343,"kind":"text"}]},{"pos":343,"end":411,"kind":"text"}],"mapHash":"13317128515-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B\"}","hash":"-20993521009-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n","-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n","-7656447355-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-16204305131-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

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
prepend: (491-708):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (491-708)
var s = "Hola, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (708-1094):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (708-1094)
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

----------------------------------------------------------------------
text: (1094-1242)
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-198):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-198)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;

----------------------------------------------------------------------
prepend: (198-343):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (198-343)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (343-411)
declare var c: C;
declare function forthirdthird_part1Rest(): void;

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
          "end": 708,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 491,
              "end": 708,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 708,
          "end": 1094,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 708,
              "end": 1094,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1094,
          "end": 1242,
          "kind": "text"
        }
      ],
      "hash": "-11659135473-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "40950852308-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC\"}",
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
          "end": 198,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 198,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 198,
          "end": 343,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 198,
              "end": 343,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 343,
          "end": 411,
          "kind": "text"
        }
      ],
      "hash": "-20993521009-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "13317128515-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B\"}"
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
      "../../../first/bin/first-output.d.ts": "-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n",
      "../../../2/second-output.d.ts": "-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n",
      "../../third_part1.ts": "-7656447355-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}"
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
      "outFile": "./third-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-16204305131-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 6499
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/first/first_PART1.ts]
interface TheFirst {
    none: any;
}

const s = "Hola, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
function forfirstfirst_PART1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:30 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:31 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:32 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:40 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part1.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:41 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:01:42 AM[0m] Updating output of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success
readFiles:: {
  "/src/third/tsconfig.json": 1,
  "/src/first/tsconfig.json": 1,
  "/src/second/tsconfig.json": 1,
  "/src/first/bin/first-output.tsbuildinfo": 1,
  "/src/first/first_PART1.ts": 1,
  "/src/first/first_part2.ts": 1,
  "/src/first/first_part3.ts": 1,
  "/src/2/second-output.tsbuildinfo": 1,
  "/src/third/thirdjs/output/third-output.tsbuildinfo": 1,
  "/src/third/thirdjs/output/third-output.js": 1,
  "/src/third/thirdjs/output/third-output.js.map": 1,
  "/src/third/thirdjs/output/third-output.d.ts": 1,
  "/src/third/thirdjs/output/third-output.d.ts.map": 1,
  "/src/first/bin/first-output.js": 1,
  "/src/2/second-output.js": 1,
  "/src/first/bin/first-output.js.map": 1,
  "/src/2/second-output.js.map": 1,
  "/src/first/bin/first-output.d.ts": 1,
  "/src/2/second-output.d.ts": 1,
  "/src/first/bin/first-output.d.ts.map": 1,
  "/src/2/second-output.d.ts.map": 1
} 

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
var s = "Hola, world";
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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>var s = "Hola, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1 >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1 >Emitted(12, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(12, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(12, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(12, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(12, 22) Source(5, 24) + SourceIndex(0)
6 >Emitted(12, 23) Source(5, 25) + SourceIndex(0)
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
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^->
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
9 >               ^^->
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
4 >          ^^^^^^^^^^^^^^^^^^->
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":724,"kind":"text"}],"sources":{"helpers":["typescript:rest"]},"mapHash":"-28759009220-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"-9075183781-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":198,"kind":"text"}],"mapHash":"34379070423-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET\"}","hash":"-11409691198-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-23927699866-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hola, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}console.log(s);","6007494133-console.log(f());\n","4357625305-function f() {\n    return \"JS does hoists\";\n}\n"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

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
text: (491-724)
var s = "Hola, world";
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
text: (0-198)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;

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
          "end": 724,
          "kind": "text"
        }
      ],
      "hash": "-9075183781-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-28759009220-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}",
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
          "end": 198,
          "kind": "text"
        }
      ],
      "hash": "-11409691198-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "34379070423-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;AEbD,iBAAS,CAAC,WAET\"}"
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
      "../first_part1.ts": "-23927699866-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hola, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}console.log(s);",
      "../first_part2.ts": "6007494133-console.log(f());\n",
      "../first_part3.ts": "4357625305-function f() {\n    return \"JS does hoists\";\n}\n"
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
      "outFile": "./first-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 3795
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
var s = "Hola, world";
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
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC"}

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
>>>var s = "Hola, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1 >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1 >Emitted(12, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(12, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(12, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(12, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(12, 22) Source(5, 24) + SourceIndex(0)
6 >Emitted(12, 23) Source(5, 25) + SourceIndex(0)
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
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^->
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
9 >               ^^->
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
3 > ^^^^^->
1 >
  >
2 >}
1 >Emitted(21, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(21, 2) Source(3, 2) + SourceIndex(2)
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
5 >      ^^^^^^^^^->
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
1->Emitted(22, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(22, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(22, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(22, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(23, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(23, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(23, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(24, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(24, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(24, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(25, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(25, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(25, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(25, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(25, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(25, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(25, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(25, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(26, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(26, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(27, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(27, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(27, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(27, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(28, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(28, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(28, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(28, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(28, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(28, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(28, 19) Source(11, 2) + SourceIndex(3)
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
1->Emitted(29, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(29, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(29, 35) Source(12, 35) + SourceIndex(3)
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
1->Emitted(30, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(30, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(30, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(30, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(30, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(30, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(30, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(30, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(30, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(30, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(30, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(30, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(30, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(30, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(30, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(30, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(30, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(30, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(30, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(30, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(30, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(30, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(30, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(30, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(30, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(31, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(31, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(32, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(33, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(34, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(34, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(35, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(35, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(35, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(36, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(36, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(36, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(36, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(36, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(36, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(36, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(36, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(37, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(37, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(38, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(38, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(39, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(39, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(39, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(39, 6) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(41, 1) Source(2, 1) + SourceIndex(5)
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
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(43, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(43, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(43, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(43, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(43, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(43, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(43, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(43, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(43, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(43, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(43, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(43, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(43, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(43, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(43, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(43, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(43, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(43, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(43, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(43, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(43, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(43, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(43, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(43, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(43, 75) Source(4, 49) + SourceIndex(5)
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

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":724,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":491,"end":724,"kind":"text"}]},{"pos":724,"end":1110,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":724,"end":1110,"kind":"text"}]},{"pos":1110,"end":1258,"kind":"text"}],"mapHash":"-62137762555-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC\"}","hash":"-33137738309-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\n//# sourceMappingURL=third-output.js.map","sources":{"helpers":["typescript:rest"]}},"dts":{"sections":[{"pos":0,"end":198,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":198,"kind":"text"}]},{"pos":198,"end":343,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":198,"end":343,"kind":"text"}]},{"pos":343,"end":411,"kind":"text"}],"mapHash":"13317128515-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B\"}","hash":"-20993521009-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n","-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n","-7656447355-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-16204305131-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

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
prepend: (491-724):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (491-724)
var s = "Hola, world";
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
prepend: (724-1110):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (724-1110)
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

----------------------------------------------------------------------
text: (1110-1258)
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-198):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-198)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;

----------------------------------------------------------------------
prepend: (198-343):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (198-343)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (343-411)
declare var c: C;
declare function forthirdthird_part1Rest(): void;

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
          "end": 724,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 491,
              "end": 724,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 724,
          "end": 1110,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 724,
              "end": 1110,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1110,
          "end": 1258,
          "kind": "text"
        }
      ],
      "hash": "-33137738309-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "-62137762555-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC\"}",
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
          "end": 198,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 198,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 198,
          "end": 343,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 198,
              "end": 343,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 343,
          "end": 411,
          "kind": "text"
        }
      ],
      "hash": "-20993521009-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "13317128515-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAE/B;ACbD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B\"}"
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
      "../../../first/bin/first-output.d.ts": "-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n",
      "../../../2/second-output.d.ts": "-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n",
      "../../third_part1.ts": "-7656447355-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}"
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
      "outFile": "./third-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-16204305131-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 6558
}



Change:: incremental-headers-change-without-dts-changes
Input::
//// [/src/first/first_PART1.ts]
interface TheFirst {
    none: any;
}

const s = "Hola, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
function forfirstfirst_PART1Rest() { }console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:53 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:54 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:55 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:02:03 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part1.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:02:04 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:02:05 AM[0m] Updating output of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success
readFiles:: {
  "/src/third/tsconfig.json": 1,
  "/src/first/tsconfig.json": 1,
  "/src/second/tsconfig.json": 1,
  "/src/first/bin/first-output.tsbuildinfo": 1,
  "/src/first/first_PART1.ts": 1,
  "/src/first/first_part2.ts": 1,
  "/src/first/first_part3.ts": 1,
  "/src/2/second-output.tsbuildinfo": 1,
  "/src/third/thirdjs/output/third-output.tsbuildinfo": 1,
  "/src/third/thirdjs/output/third-output.js": 1,
  "/src/third/thirdjs/output/third-output.js.map": 1,
  "/src/third/thirdjs/output/third-output.d.ts": 1,
  "/src/third/thirdjs/output/third-output.d.ts.map": 1,
  "/src/first/bin/first-output.js": 1,
  "/src/2/second-output.js": 1,
  "/src/first/bin/first-output.js.map": 1,
  "/src/2/second-output.js.map": 1,
  "/src/first/bin/first-output.d.ts": 1,
  "/src/2/second-output.d.ts": 1,
  "/src/first/bin/first-output.d.ts.map": 1,
  "/src/2/second-output.d.ts.map": 1
} 

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;AEXtC,iBAAS,CAAC,WAET"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hola, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^
6 >                               ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hola, world"
6 >                               ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 32) Source(5, 24) + SourceIndex(0)
6 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
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
5 >                             ^^^^^^^^^^^^->
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
>>>//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.js]
var s = "Hola, world";
console.log(s);
function forfirstfirst_PART1Rest() { }
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>var s = "Hola, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1 >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(1, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(1, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(1, 22) Source(5, 24) + SourceIndex(0)
6 >Emitted(1, 23) Source(5, 25) + SourceIndex(0)
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
1 >Emitted(2, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(3, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(3, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(3, 33) Source(12, 33) + SourceIndex(0)
4 >Emitted(3, 38) Source(12, 38) + SourceIndex(0)
5 >Emitted(3, 39) Source(12, 39) + SourceIndex(0)
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
1 >Emitted(4, 1) Source(12, 39) + SourceIndex(0)
2 >Emitted(4, 8) Source(12, 46) + SourceIndex(0)
3 >Emitted(4, 9) Source(12, 47) + SourceIndex(0)
4 >Emitted(4, 12) Source(12, 50) + SourceIndex(0)
5 >Emitted(4, 13) Source(12, 51) + SourceIndex(0)
6 >Emitted(4, 14) Source(12, 52) + SourceIndex(0)
7 >Emitted(4, 15) Source(12, 53) + SourceIndex(0)
8 >Emitted(4, 16) Source(12, 54) + SourceIndex(0)
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
1->Emitted(5, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(5, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(5, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(5, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(5, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(5, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(5, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(5, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(5, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(6, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(6, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(6, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(7, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(7, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(7, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(7, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(8, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(8, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":158,"kind":"text"}],"mapHash":"-18585329978-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"32129124571-var s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":198,"kind":"text"}],"mapHash":"34106245240-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;AEXtC,iBAAS,CAAC,WAET\"}","hash":"-11409691198-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-21004847189-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hola, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }console.log(s);","6007494133-console.log(f());\n","4357625305-function f() {\n    return \"JS does hoists\";\n}\n"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-158)
var s = "Hola, world";
console.log(s);
function forfirstfirst_PART1Rest() { }
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-198)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;

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
          "end": 158,
          "kind": "text"
        }
      ],
      "hash": "32129124571-var s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-18585329978-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 198,
          "kind": "text"
        }
      ],
      "hash": "-11409691198-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "34106245240-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;AEXtC,iBAAS,CAAC,WAET\"}"
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
      "../first_part1.ts": "-21004847189-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hola, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }console.log(s);",
      "../first_part2.ts": "6007494133-console.log(f());\n",
      "../first_part3.ts": "4357625305-function f() {\n    return \"JS does hoists\";\n}\n"
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
      "outFile": "./first-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2910
}

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;ACXtC,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hola, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^
6 >                               ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hola, world"
6 >                               ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 32) Source(5, 24) + SourceIndex(0)
6 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
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
1 >Emitted(10, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(10, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(10, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(10, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(11, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(12, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(12, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(12, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(12, 21) Source(5, 13) + SourceIndex(2)
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
1 >Emitted(13, 2) Source(11, 2) + SourceIndex(2)
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
1->Emitted(14, 1) Source(12, 1) + SourceIndex(2)
2 >Emitted(14, 18) Source(12, 10) + SourceIndex(2)
3 >Emitted(14, 43) Source(12, 35) + SourceIndex(2)
4 >Emitted(14, 52) Source(14, 2) + SourceIndex(2)
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
1 >Emitted(15, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(15, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(15, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(16, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(16, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(17, 2) Source(5, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>declare var c: C;
1->
2 >^^^^^^^^
3 >        ^^^^
4 >            ^
5 >             ^^^
6 >                ^
7 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1->Emitted(18, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(18, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(18, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(18, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(18, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(18, 18) Source(1, 17) + SourceIndex(4)
---
>>>declare function forthirdthird_part1Rest(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                        ^^^^^^^^^
1->
  >c.doSomething();
  >
2 >function 
3 >                 forthirdthird_part1Rest
4 >                                        () {
  >                                        const { b, ...rest } = { a: 10, b: 30, yy: 30 };
  >                                        }
1->Emitted(19, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(19, 18) Source(3, 10) + SourceIndex(4)
3 >Emitted(19, 41) Source(3, 33) + SourceIndex(4)
4 >Emitted(19, 50) Source(5, 2) + SourceIndex(4)
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
var s = "Hola, world";
console.log(s);
function forfirstfirst_PART1Rest() { }
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
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC"}

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
>>>var s = "Hola, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1 >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1 >Emitted(12, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(12, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(12, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(12, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(12, 22) Source(5, 24) + SourceIndex(0)
6 >Emitted(12, 23) Source(5, 25) + SourceIndex(0)
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
1 >Emitted(13, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(13, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(13, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(13, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(13, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(13, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(13, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(13, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(14, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(14, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(14, 33) Source(12, 33) + SourceIndex(0)
4 >Emitted(14, 38) Source(12, 38) + SourceIndex(0)
5 >Emitted(14, 39) Source(12, 39) + SourceIndex(0)
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
1 >Emitted(15, 1) Source(12, 39) + SourceIndex(0)
2 >Emitted(15, 8) Source(12, 46) + SourceIndex(0)
3 >Emitted(15, 9) Source(12, 47) + SourceIndex(0)
4 >Emitted(15, 12) Source(12, 50) + SourceIndex(0)
5 >Emitted(15, 13) Source(12, 51) + SourceIndex(0)
6 >Emitted(15, 14) Source(12, 52) + SourceIndex(0)
7 >Emitted(15, 15) Source(12, 53) + SourceIndex(0)
8 >Emitted(15, 16) Source(12, 54) + SourceIndex(0)
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
4 >          ^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^->
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
>>>var N;
1->
2 >^^^^
3 >    ^
4 >     ^
5 >      ^^^^^^^^^->
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
1->Emitted(20, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(20, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(20, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(20, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(21, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(21, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(21, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(22, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(22, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(22, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(23, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(23, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(23, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(23, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(23, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(23, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(23, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(23, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(24, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(24, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(25, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(25, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(25, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(25, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(26, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(26, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(26, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(26, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(26, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(26, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(26, 19) Source(11, 2) + SourceIndex(3)
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
1->Emitted(27, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(27, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(27, 35) Source(12, 35) + SourceIndex(3)
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
1->Emitted(28, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(28, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(28, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(28, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(28, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(28, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(28, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(28, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(28, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(28, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(28, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(28, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(28, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(28, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(28, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(28, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(28, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(28, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(28, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(28, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(28, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(28, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(28, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(28, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(28, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(29, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(29, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(30, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(31, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(32, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(32, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(33, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(33, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(33, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(34, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(34, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(34, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(34, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(34, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(34, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(34, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(34, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(35, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(35, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(36, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(36, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(37, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(37, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(37, 6) Source(5, 2) + SourceIndex(4)
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
1->
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(38, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(38, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(38, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(38, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(38, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(38, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(38, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(38, 17) Source(1, 17) + SourceIndex(5)
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
1 >Emitted(39, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(39, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(39, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(39, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(39, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(39, 17) Source(2, 17) + SourceIndex(5)
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
1->Emitted(40, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(40, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(40, 33) Source(3, 33) + SourceIndex(5)
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
1->Emitted(41, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(41, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(41, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(41, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(41, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(41, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(41, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(41, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(41, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(41, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(41, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(41, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(41, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(41, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(41, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(41, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(41, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(41, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(41, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(41, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(41, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(41, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(41, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(41, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(41, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(42, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(42, 2) Source(5, 2) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":490,"kind":"emitHelpers","data":"typescript:rest"},{"pos":491,"end":649,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":491,"end":649,"kind":"text"}]},{"pos":649,"end":1035,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":649,"end":1035,"kind":"text"}]},{"pos":1035,"end":1183,"kind":"text"}],"mapHash":"-23181551528-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC\"}","hash":"-21852742349-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\n//# sourceMappingURL=third-output.js.map","sources":{"helpers":["typescript:rest"]}},"dts":{"sections":[{"pos":0,"end":198,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":198,"kind":"text"}]},{"pos":198,"end":343,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":198,"end":343,"kind":"text"}]},{"pos":343,"end":411,"kind":"text"}],"mapHash":"-7466973756-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;ACXtC,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B\"}","hash":"-20993521009-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n","-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n","-7656447355-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-16204305131-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

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
prepend: (491-649):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (491-649)
var s = "Hola, world";
console.log(s);
function forfirstfirst_PART1Rest() { }
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (649-1035):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (649-1035)
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

----------------------------------------------------------------------
text: (1035-1183)
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-198):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-198)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;

----------------------------------------------------------------------
prepend: (198-343):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (198-343)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (343-411)
declare var c: C;
declare function forthirdthird_part1Rest(): void;

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
          "end": 649,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 491,
              "end": 649,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 649,
          "end": 1035,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 649,
              "end": 1035,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1035,
          "end": 1183,
          "kind": "text"
        }
      ],
      "hash": "-21852742349-var __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar s = \"Hola, world\";\nconsole.log(s);\nfunction forfirstfirst_PART1Rest() { }\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nfunction forsecondsecond_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\n    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n}\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "-23181551528-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC\"}",
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
          "end": 198,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 198,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 198,
          "end": 343,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 198,
              "end": 343,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 343,
          "end": 411,
          "kind": "text"
        }
      ],
      "hash": "-20993521009-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "-7466973756-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AAGD,iBAAS,uBAAuB,SAAM;ACXtC,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AACD,iBAAS,yBAAyB,SAEjC;ACbD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC;AAEhB,iBAAS,uBAAuB,SAE/B\"}"
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
      "../../../first/bin/first-output.d.ts": "-10583209221-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\n",
      "../../../2/second-output.d.ts": "-7599329529-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\n",
      "../../third_part1.ts": "-7656447355-var c = new C();\nc.doSomething();\nfunction forthirdthird_part1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}"
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
      "outFile": "./third-output.js",
      "removeComments": true,
      "skipDefaultLibCheck": true,
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-16204305131-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hola, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function forfirstfirst_PART1Rest(): void;\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare function forsecondsecond_part1Rest(): void;\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\ndeclare function forthirdthird_part1Rest(): void;\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 6349
}

