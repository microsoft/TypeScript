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
console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:08:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:08:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because oldest output 'src/first/bin/first-output.js' is older than newest input 'src/first/first_PART1.ts'

[[90m12:08:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:08:00 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part1.ts' is older than oldest output 'src/2/second-output.js'

[[90m12:08:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:08:00 AM[0m] Updating output of project '/src/third/tsconfig.json'...

[[90m12:08:00 AM[0m] Updating unchanged output timestamps of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success
readFiles:: {
 "/src/third/tsconfig.json": 1,
 "/src/first/tsconfig.json": 1,
 "/src/second/tsconfig.json": 1,
 "/src/first/first_PART1.ts": 1,
 "/src/first/first_part2.ts": 1,
 "/src/first/tripleRef.d.ts": 1,
 "/src/first/first_part3.ts": 1,
 "/src/first/bin/first-output.d.ts": 1,
 "/src/2/second-output.tsbuildinfo": 1,
 "/src/third/thirdjs/output/third-output.tsbuildinfo": 1,
 "/src/third/thirdjs/output/third-output.js": 1,
 "/src/third/thirdjs/output/third-output.js.map": 1,
 "/src/third/thirdjs/output/third-output.d.ts": 1,
 "/src/third/thirdjs/output/third-output.d.ts.map": 1,
 "/src/first/bin/first-output.tsbuildinfo": 1,
 "/src/first/bin/first-output.js": 1,
 "/src/2/second-output.js": 1,
 "/src/first/bin/first-output.js.map": 1,
 "/src/2/second-output.js.map": 1,
 "/src/2/second-output.d.ts": 1,
 "/src/first/bin/first-output.d.ts.map": 1,
 "/src/2/second-output.d.ts.map": 1
} 

//// [/src/first/bin/first-output.d.ts] file written with same contents
//// [/src/first/bin/first-output.d.ts.map] file written with same contents
//// [/src/first/bin/first-output.d.ts.map.baseline.txt] file written with same contents
//// [/src/first/bin/first-output.js]
var s = "Hello, world";
console.log(s);
console.log(s);
var first_part2Const = new firstfirst_part2();
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,IAAM,gBAAgB,GAAG,IAAI,gBAAgB,EAAE,CAAC;AAChD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACFjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(1, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(1, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(1, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(1, 24) Source(5, 26) + SourceIndex(0)
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
1 >Emitted(2, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(11, 16) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(3, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(3, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(3, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(3, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(3, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(3, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(3, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(3, 16) Source(12, 16) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_part2.ts
-------------------------------------------------------------------
>>>var first_part2Const = new firstfirst_part2();
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^
4 >                    ^^^
5 >                       ^^^^
6 >                           ^^^^^^^^^^^^^^^^
7 >                                           ^^
8 >                                             ^
1->///<reference path="./tripleRef.d.ts"/>
  >
2 >const 
3 >    first_part2Const
4 >                     = 
5 >                       new 
6 >                           firstfirst_part2
7 >                                           ()
8 >                                             ;
1->Emitted(4, 1) Source(2, 1) + SourceIndex(1)
2 >Emitted(4, 5) Source(2, 7) + SourceIndex(1)
3 >Emitted(4, 21) Source(2, 23) + SourceIndex(1)
4 >Emitted(4, 24) Source(2, 26) + SourceIndex(1)
5 >Emitted(4, 28) Source(2, 30) + SourceIndex(1)
6 >Emitted(4, 44) Source(2, 46) + SourceIndex(1)
7 >Emitted(4, 46) Source(2, 48) + SourceIndex(1)
8 >Emitted(4, 47) Source(2, 49) + SourceIndex(1)
---
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
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            f
7 >             ()
8 >               )
9 >                ;
1 >Emitted(5, 1) Source(3, 1) + SourceIndex(1)
2 >Emitted(5, 8) Source(3, 8) + SourceIndex(1)
3 >Emitted(5, 9) Source(3, 9) + SourceIndex(1)
4 >Emitted(5, 12) Source(3, 12) + SourceIndex(1)
5 >Emitted(5, 13) Source(3, 13) + SourceIndex(1)
6 >Emitted(5, 14) Source(3, 14) + SourceIndex(1)
7 >Emitted(5, 16) Source(3, 16) + SourceIndex(1)
8 >Emitted(5, 17) Source(3, 17) + SourceIndex(1)
9 >Emitted(5, 18) Source(3, 18) + SourceIndex(1)
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":175,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":42,"kind":"reference","data":"../tripleRef.d.ts"},{"pos":44,"end":252,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-175)
var s = "Hello, world";
console.log(s);
console.log(s);
var first_part2Const = new firstfirst_part2();
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
reference: (0-42):: ../tripleRef.d.ts
/// <reference path="../tripleRef.d.ts" />
----------------------------------------------------------------------
text: (44-252)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare const first_part2Const: firstfirst_part2;
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
          "end": 175,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 42,
          "kind": "reference",
          "data": "../tripleRef.d.ts"
        },
        {
          "pos": 44,
          "end": 252,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 318
}

//// [/src/third/thirdjs/output/third-output.js]
var s = "Hello, world";
console.log(s);
console.log(s);
var first_part2Const = new firstfirst_part2();
console.log(f());
function f() {
    return "JS does hoists";
}
var second_part1Const = new secondsecond_part1();
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
var third_part1Const = new thirdthird_part1();
var c = new C();
c.doSomething();
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,IAAM,gBAAgB,GAAG,IAAI,gBAAgB,EAAE,CAAC;AAChD,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACFjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACDD,IAAM,iBAAiB,GAAG,IAAI,kBAAkB,EAAE,CAAC;AAKnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACZD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAM,gBAAgB,GAAG,IAAI,gBAAgB,EAAE,CAAC;AAChD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(1, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(1, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(1, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(1, 24) Source(5, 26) + SourceIndex(0)
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
1 >Emitted(2, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(11, 16) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(3, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(3, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(3, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(3, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(3, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(3, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(3, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(3, 16) Source(12, 16) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_part2.ts
-------------------------------------------------------------------
>>>var first_part2Const = new firstfirst_part2();
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^
4 >                    ^^^
5 >                       ^^^^
6 >                           ^^^^^^^^^^^^^^^^
7 >                                           ^^
8 >                                             ^
1->///<reference path="./tripleRef.d.ts"/>
  >
2 >const 
3 >    first_part2Const
4 >                     = 
5 >                       new 
6 >                           firstfirst_part2
7 >                                           ()
8 >                                             ;
1->Emitted(4, 1) Source(2, 1) + SourceIndex(1)
2 >Emitted(4, 5) Source(2, 7) + SourceIndex(1)
3 >Emitted(4, 21) Source(2, 23) + SourceIndex(1)
4 >Emitted(4, 24) Source(2, 26) + SourceIndex(1)
5 >Emitted(4, 28) Source(2, 30) + SourceIndex(1)
6 >Emitted(4, 44) Source(2, 46) + SourceIndex(1)
7 >Emitted(4, 46) Source(2, 48) + SourceIndex(1)
8 >Emitted(4, 47) Source(2, 49) + SourceIndex(1)
---
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
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            f
7 >             ()
8 >               )
9 >                ;
1 >Emitted(5, 1) Source(3, 1) + SourceIndex(1)
2 >Emitted(5, 8) Source(3, 8) + SourceIndex(1)
3 >Emitted(5, 9) Source(3, 9) + SourceIndex(1)
4 >Emitted(5, 12) Source(3, 12) + SourceIndex(1)
5 >Emitted(5, 13) Source(3, 13) + SourceIndex(1)
6 >Emitted(5, 14) Source(3, 14) + SourceIndex(1)
7 >Emitted(5, 16) Source(3, 16) + SourceIndex(1)
8 >Emitted(5, 17) Source(3, 17) + SourceIndex(1)
9 >Emitted(5, 18) Source(3, 18) + SourceIndex(1)
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
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(8, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(8, 2) Source(3, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>var second_part1Const = new secondsecond_part1();
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^
4 >                     ^^^
5 >                        ^^^^
6 >                            ^^^^^^^^^^^^^^^^^^
7 >                                              ^^
8 >                                                ^
1->///<reference path="./tripleRef.d.ts"/>
  >
2 >const 
3 >    second_part1Const
4 >                      = 
5 >                        new 
6 >                            secondsecond_part1
7 >                                              ()
8 >                                                ;
1->Emitted(9, 1) Source(2, 1) + SourceIndex(3)
2 >Emitted(9, 5) Source(2, 7) + SourceIndex(3)
3 >Emitted(9, 22) Source(2, 24) + SourceIndex(3)
4 >Emitted(9, 25) Source(2, 27) + SourceIndex(3)
5 >Emitted(9, 29) Source(2, 31) + SourceIndex(3)
6 >Emitted(9, 47) Source(2, 49) + SourceIndex(3)
7 >Emitted(9, 49) Source(2, 51) + SourceIndex(3)
8 >Emitted(9, 50) Source(2, 52) + SourceIndex(3)
---
>>>var N;
1 >
2 >^^^^
3 >    ^
4 >     ^
5 >      ^^^^^^^^^^->
1 >
  >namespace N {
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
1 >Emitted(10, 1) Source(7, 1) + SourceIndex(3)
2 >Emitted(10, 5) Source(7, 11) + SourceIndex(3)
3 >Emitted(10, 6) Source(7, 12) + SourceIndex(3)
4 >Emitted(10, 7) Source(13, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(11, 1) Source(7, 1) + SourceIndex(3)
2 >Emitted(11, 12) Source(7, 11) + SourceIndex(3)
3 >Emitted(11, 13) Source(7, 12) + SourceIndex(3)
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
1->Emitted(12, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(12, 14) Source(8, 14) + SourceIndex(3)
3 >Emitted(12, 15) Source(8, 15) + SourceIndex(3)
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
1->Emitted(13, 9) Source(9, 9) + SourceIndex(3)
2 >Emitted(13, 16) Source(9, 16) + SourceIndex(3)
3 >Emitted(13, 17) Source(9, 17) + SourceIndex(3)
4 >Emitted(13, 20) Source(9, 20) + SourceIndex(3)
5 >Emitted(13, 21) Source(9, 21) + SourceIndex(3)
6 >Emitted(13, 30) Source(9, 30) + SourceIndex(3)
7 >Emitted(13, 31) Source(9, 31) + SourceIndex(3)
8 >Emitted(13, 32) Source(9, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(14, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(14, 6) Source(10, 6) + SourceIndex(3)
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
1->Emitted(15, 5) Source(12, 5) + SourceIndex(3)
2 >Emitted(15, 6) Source(12, 6) + SourceIndex(3)
3 >Emitted(15, 8) Source(12, 8) + SourceIndex(3)
4 >Emitted(15, 9) Source(12, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^->
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
1->Emitted(16, 1) Source(13, 1) + SourceIndex(3)
2 >Emitted(16, 2) Source(13, 2) + SourceIndex(3)
3 >Emitted(16, 4) Source(7, 11) + SourceIndex(3)
4 >Emitted(16, 5) Source(7, 12) + SourceIndex(3)
5 >Emitted(16, 10) Source(7, 11) + SourceIndex(3)
6 >Emitted(16, 11) Source(7, 12) + SourceIndex(3)
7 >Emitted(16, 19) Source(13, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(17, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(18, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(19, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(19, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(20, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(20, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(20, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(21, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(21, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(21, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(21, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(21, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(21, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(21, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(21, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(22, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(22, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(23, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(23, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(24, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(24, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(24, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(24, 6) Source(5, 2) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>var third_part1Const = new thirdthird_part1();
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^
4 >                    ^^^
5 >                       ^^^^
6 >                           ^^^^^^^^^^^^^^^^
7 >                                           ^^
8 >                                             ^
1->///<reference path="./tripleRef.d.ts"/>
  >
2 >const 
3 >    third_part1Const
4 >                     = 
5 >                       new 
6 >                           thirdthird_part1
7 >                                           ()
8 >                                             ;
1->Emitted(25, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(25, 5) Source(2, 7) + SourceIndex(5)
3 >Emitted(25, 21) Source(2, 23) + SourceIndex(5)
4 >Emitted(25, 24) Source(2, 26) + SourceIndex(5)
5 >Emitted(25, 28) Source(2, 30) + SourceIndex(5)
6 >Emitted(25, 44) Source(2, 46) + SourceIndex(5)
7 >Emitted(25, 46) Source(2, 48) + SourceIndex(5)
8 >Emitted(25, 47) Source(2, 49) + SourceIndex(5)
---
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
  >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1 >Emitted(26, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(26, 5) Source(3, 5) + SourceIndex(5)
3 >Emitted(26, 6) Source(3, 6) + SourceIndex(5)
4 >Emitted(26, 9) Source(3, 9) + SourceIndex(5)
5 >Emitted(26, 13) Source(3, 13) + SourceIndex(5)
6 >Emitted(26, 14) Source(3, 14) + SourceIndex(5)
7 >Emitted(26, 16) Source(3, 16) + SourceIndex(5)
8 >Emitted(26, 17) Source(3, 17) + SourceIndex(5)
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
1->Emitted(27, 1) Source(4, 1) + SourceIndex(5)
2 >Emitted(27, 2) Source(4, 2) + SourceIndex(5)
3 >Emitted(27, 3) Source(4, 3) + SourceIndex(5)
4 >Emitted(27, 14) Source(4, 14) + SourceIndex(5)
5 >Emitted(27, 16) Source(4, 16) + SourceIndex(5)
6 >Emitted(27, 17) Source(4, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":175,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":0,"end":175,"kind":"text"}]},{"pos":175,"end":511,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":175,"end":511,"kind":"text"}]},{"pos":511,"end":595,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":45,"kind":"reference","data":"../../tripleRef.d.ts"},{"pos":47,"end":101,"kind":"reference","data":"../../../first/tripleRef.d.ts"},{"pos":103,"end":158,"kind":"reference","data":"../../../second/tripleRef.d.ts"},{"pos":160,"end":368,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":160,"end":368,"kind":"text"}]},{"pos":368,"end":522,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":368,"end":522,"kind":"text"}]},{"pos":522,"end":592,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prepend: (0-175):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-175)
var s = "Hello, world";
console.log(s);
console.log(s);
var first_part2Const = new firstfirst_part2();
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (175-511):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (175-511)
var second_part1Const = new secondsecond_part1();
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (511-595)
var third_part1Const = new thirdthird_part1();
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
reference: (0-45):: ../../tripleRef.d.ts
/// <reference path="../../tripleRef.d.ts" />
----------------------------------------------------------------------
reference: (47-101):: ../../../first/tripleRef.d.ts
/// <reference path="../../../first/tripleRef.d.ts" />
----------------------------------------------------------------------
reference: (103-158):: ../../../second/tripleRef.d.ts
/// <reference path="../../../second/tripleRef.d.ts" />
----------------------------------------------------------------------
prepend: (160-368):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (160-368)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare const first_part2Const: firstfirst_part2;
declare function f(): string;

----------------------------------------------------------------------
prepend: (368-522):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (368-522)
declare const second_part1Const: secondsecond_part1;
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (522-592)
declare const third_part1Const: thirdthird_part1;
declare var c: C;

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
          "end": 175,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 175,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 175,
          "end": 511,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 175,
              "end": 511,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 511,
          "end": 595,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 45,
          "kind": "reference",
          "data": "../../tripleRef.d.ts"
        },
        {
          "pos": 47,
          "end": 101,
          "kind": "reference",
          "data": "../../../first/tripleRef.d.ts"
        },
        {
          "pos": 103,
          "end": 158,
          "kind": "reference",
          "data": "../../../second/tripleRef.d.ts"
        },
        {
          "pos": 160,
          "end": 368,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 160,
              "end": 368,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 368,
          "end": 522,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 368,
              "end": 522,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 522,
          "end": 592,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 952
}

