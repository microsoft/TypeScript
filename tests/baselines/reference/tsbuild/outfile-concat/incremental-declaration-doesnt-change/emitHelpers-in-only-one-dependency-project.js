//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
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

var s = "Hello, world";

console.log(s);
function forfirstfirst_PART1Rest() { }console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>
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
1 >Emitted(2, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(2, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(2, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(2, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(2, 24) Source(5, 26) + SourceIndex(0)
---
>>>
>>>console.log(s);
1 >
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^
8 >              ^
9 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(4, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() { }console.log(s);
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^
5 >                                     ^
6 >                                      ^^^^^^^
7 >                                             ^
8 >                                              ^^^
9 >                                                 ^
10>                                                  ^
11>                                                   ^
12>                                                    ^
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
4 >                                () { 
5 >                                     }
6 >                                      console
7 >                                             .
8 >                                              log
9 >                                                 (
10>                                                  s
11>                                                   )
12>                                                    ;
1->Emitted(5, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(5, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(5, 33) Source(12, 33) + SourceIndex(0)
4 >Emitted(5, 38) Source(12, 38) + SourceIndex(0)
5 >Emitted(5, 39) Source(12, 39) + SourceIndex(0)
6 >Emitted(5, 46) Source(12, 46) + SourceIndex(0)
7 >Emitted(5, 47) Source(12, 47) + SourceIndex(0)
8 >Emitted(5, 50) Source(12, 50) + SourceIndex(0)
9 >Emitted(5, 51) Source(12, 51) + SourceIndex(0)
10>Emitted(5, 52) Source(12, 52) + SourceIndex(0)
11>Emitted(5, 53) Source(12, 53) + SourceIndex(0)
12>Emitted(5, 54) Source(12, 54) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_part2.ts
-------------------------------------------------------------------
>>>console.log(f());
1 >
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^^
8 >               ^
9 >                ^
1 >
2 >console
3 >       .
4 >        log
5 >           (
6 >            f
7 >             ()
8 >               )
9 >                ;
1 >Emitted(6, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(6, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(6, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(6, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(6, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(6, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(6, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(6, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(6, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(7, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(7, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(7, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(8, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(8, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(8, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(8, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(9, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(9, 2) Source(3, 2) + SourceIndex(2)
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
          "end": 169,
          "kind": "text"
        }
      ]
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
text: (0-169)

var s = "Hello, world";

console.log(s);
function forfirstfirst_PART1Rest() { }console.log(s);
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
function forfirstfirst_PART1Rest() { }console.log(s);
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
    }C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
var c = new C();
c.doSomething();
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB,KAAK,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXrD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC,AAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
>>>
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
1 >Emitted(13, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(13, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(13, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(13, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(13, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(13, 24) Source(5, 26) + SourceIndex(0)
---
>>>
>>>console.log(s);
1 >
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^
8 >              ^
9 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(15, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(15, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(15, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(15, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(15, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(15, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(15, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(15, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() { }console.log(s);
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^
5 >                                     ^
6 >                                      ^^^^^^^
7 >                                             ^
8 >                                              ^^^
9 >                                                 ^
10>                                                  ^
11>                                                   ^
12>                                                    ^
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
4 >                                () { 
5 >                                     }
6 >                                      console
7 >                                             .
8 >                                              log
9 >                                                 (
10>                                                  s
11>                                                   )
12>                                                    ;
1->Emitted(16, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(16, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(16, 33) Source(12, 33) + SourceIndex(0)
4 >Emitted(16, 38) Source(12, 38) + SourceIndex(0)
5 >Emitted(16, 39) Source(12, 39) + SourceIndex(0)
6 >Emitted(16, 46) Source(12, 46) + SourceIndex(0)
7 >Emitted(16, 47) Source(12, 47) + SourceIndex(0)
8 >Emitted(16, 50) Source(12, 50) + SourceIndex(0)
9 >Emitted(16, 51) Source(12, 51) + SourceIndex(0)
10>Emitted(16, 52) Source(12, 52) + SourceIndex(0)
11>Emitted(16, 53) Source(12, 53) + SourceIndex(0)
12>Emitted(16, 54) Source(12, 54) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_part2.ts
-------------------------------------------------------------------
>>>console.log(f());
1 >
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^^
8 >               ^
9 >                ^
1 >
2 >console
3 >       .
4 >        log
5 >           (
6 >            f
7 >             ()
8 >               )
9 >                ;
1 >Emitted(17, 1) Source(1, 1) + SourceIndex(1)
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
4 >          ^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^->
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
1 >
  >    
2 >    }
1 >Emitted(25, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(25, 6) Source(8, 6) + SourceIndex(3)
---
>>>
>>>    f();
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^
5 >        ^^^^^^^^^^^->
1 >
  >
  >    
2 >    f
3 >     ()
4 >       ;
1 >Emitted(27, 5) Source(10, 5) + SourceIndex(3)
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
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^^^^^^^^^->
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
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(32, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(33, 5) Source(1, 1) + SourceIndex(4)
---
>>>    }C.prototype.doSomething = function () {
1->^^^^
2 >    ^
3 >     
4 >     ^^^^^^^^^^^^^^^^^^^^^^^
5 >                            ^^^
6 >                               ^^^^^^^^^^^^->
1->class C {
  >    doSomething() {
  >        console.log("something got done");
  >    }
  >
2 >    }
3 >     
4 >     doSomething
5 >                            
1->Emitted(34, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(34, 6) Source(5, 2) + SourceIndex(4)
3 >Emitted(34, 6) Source(2, 5) + SourceIndex(4)
4 >Emitted(34, 29) Source(2, 16) + SourceIndex(4)
5 >Emitted(34, 32) Source(2, 5) + SourceIndex(4)
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
5 >     ^^^^^^^^^^^^->
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
9 >                ^->
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
1->
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1->Emitted(40, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(40, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(40, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(40, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(40, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(40, 17) Source(2, 17) + SourceIndex(5)
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
          "end": 671,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 502,
              "end": 671,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 671,
          "end": 1071,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 671,
              "end": 1071,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1071,
          "end": 1107,
          "kind": "text"
        }
      ]
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
          "end": 361,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 208,
              "end": 361,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 361,
          "end": 380,
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
prepend: (502-671):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (502-671)

var s = "Hello, world";

console.log(s);
function forfirstfirst_PART1Rest() { }console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (671-1071):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (671-1071)
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
    }C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (1071-1107)
var c = new C();
c.doSomething();

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
prepend: (208-361):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (208-361)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (361-380)
declare var c: C;

======================================================================

