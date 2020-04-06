//// [/lib/incremental-headers-change-without-dts-changesOutput.txt]
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

exitCode:: ExitStatus.Success


//// [/src/first/bin/first-output.d.ts] file written with same contents
//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(9, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.d.ts
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>declare function f(): string;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^
5 >                             ^^^^^^^^^^^^->
1->
2 >function 
3 >                 f
4 >                  () {
  >                      return "JS does hoists";
  >                  }
1->Emitted(8, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(8, 18) Source(1, 10) + SourceIndex(2)
3 >Emitted(8, 19) Source(1, 11) + SourceIndex(2)
4 >Emitted(8, 30) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.js]

var s = "Hello, world";

console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
9 >               ^^^->
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
          "end": 114,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 157,
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
text: (0-114)

var s = "Hello, world";

console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-157)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
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


//// [/src/third/thirdjs/output/third-output.d.ts]
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;
declare namespace N {
}
declare namespace N {
}
declare class normalC {
}
declare namespace normalN {
}
declare class C {
    doSomething(): void;
}
declare var c: C;
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AAED,cAAM,OAAO;CAMZ;AACD,kBAAU,OAAO,CAAC;CASjB;AC5BD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(9, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>declare function f(): string;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^
1->
2 >function 
3 >                 f
4 >                  () {
  >                      return "JS does hoists";
  >                  }
1->Emitted(8, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(8, 18) Source(1, 10) + SourceIndex(1)
3 >Emitted(8, 19) Source(1, 11) + SourceIndex(1)
4 >Emitted(8, 30) Source(3, 2) + SourceIndex(1)
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
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(9, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(9, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(9, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(10, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(11, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(11, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(11, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(11, 21) Source(5, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(12, 2) Source(11, 2) + SourceIndex(2)
---
>>>declare class normalC {
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^
1->
  >
  >
2 >class 
3 >              normalC
1->Emitted(13, 1) Source(13, 1) + SourceIndex(2)
2 >Emitted(13, 15) Source(13, 7) + SourceIndex(2)
3 >Emitted(13, 22) Source(13, 14) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > {
  >    /*@internal*/ constructor() { }
  >    /*@internal*/ prop: string;
  >    /*@internal*/ method() { }
  >    /*@internal*/ get c() { return 10; }
  >    /*@internal*/ set c(val: number) { }
  >}
1 >Emitted(14, 2) Source(19, 2) + SourceIndex(2)
---
>>>declare namespace normalN {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^^^^^^
4 >                         ^
1->
  >
2 >namespace 
3 >                  normalN
4 >                          
1->Emitted(15, 1) Source(20, 1) + SourceIndex(2)
2 >Emitted(15, 19) Source(20, 11) + SourceIndex(2)
3 >Emitted(15, 26) Source(20, 18) + SourceIndex(2)
4 >Emitted(15, 27) Source(20, 19) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >{
  >    /*@internal*/ export class C { }
  >    /*@internal*/ export function foo() {}
  >    /*@internal*/ export namespace someNamespace { export class C {} }
  >    /*@internal*/ export namespace someOther.something { export class someClass {} }
  >    /*@internal*/ export import someImport = someNamespace.C;
  >    /*@internal*/ export type internalType = internalC;
  >    /*@internal*/ export const internalConst = 10;
  >    /*@internal*/ export enum internalEnum { a, b, c }
  >}
1 >Emitted(16, 2) Source(29, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^->
1->
2 >class 
3 >              C
1->Emitted(17, 1) Source(1, 1) + SourceIndex(3)
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
2 > ^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(19, 2) Source(5, 2) + SourceIndex(3)
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
7 >                 ^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1->Emitted(20, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(20, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(20, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(20, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(20, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(20, 18) Source(1, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.js]

var s = "Hello, world";

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
var normalC = /** @class */ (function () {
    /*@internal*/ function normalC() {}

    /*@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /*@internal*/ get: function () { return 10; },
        /*@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /*@internal*/ var C = /** @class */ (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    /*@internal*/ function foo() { }
    normalN.foo = foo;
    /*@internal*/ var someNamespace;
    (function (someNamespace) {var C = /** @class */ (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /*@internal*/ var someOther;
    (function (someOther) {
        var something;
        (function (something) {var someClass = /** @class */ (function () {
                function someClass() {}
                return someClass;
            }());
            something.someClass = someClass;
        })(something = someOther.something || (someOther.something = {}));
    })(someOther = normalN.someOther || (normalN.someOther = {}));
    /*@internal*/ normalN.someImport = someNamespace.C;

    /*@internal*/ normalN.internalConst = 10;
    /*@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
/*@internal*/ var internalC = /** @class */ (function () {
    function internalC() {}
    return internalC;
}());
/*@internal*/ function internalfoo() { }
/*@internal*/ var internalNamespace;
(function (internalNamespace) {var someClass = /** @class */ (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/*@internal*/ var internalOther;
(function (internalOther) {
    var something;
    (function (something) {var someClass = /** @class */ (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
/*@internal*/ var internalImport = internalNamespace.someClass;

/*@internal*/ var internalConst = 10;
/*@internal*/ var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = /** @class */ (function () {
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACI,aAAa,CAAC,oBAAgB,CAAC;;IAE/B,aAAa,CAAC,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;QAAnB,aAAa,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;QACpC,aAAa,MAAC,UAAM,GAAW,IAAI,CAAC;;;OADA;IAExC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACb,aAAa,CAAC;QAAA,cAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAChC,aAAa,CAAC,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACtC,aAAa,CAAC,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa,GAAG;YAAA,cAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IAClE,aAAa,CAAC,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS,GAAG;gBAAA,sBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IAChF,aAAa,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;;IAEzD,aAAa,CAAc,qBAAa,GAAG,EAAE,CAAC;IAC9C,aAAa,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAE,yCAAC,CAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACtD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACD,aAAa,CAAC;IAAA,sBAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAChC,aAAa,CAAC,SAAS,WAAW,KAAI,CAAC;AACvC,aAAa,CAAC,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB,GAAG;QAAA,sBAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACvE,aAAa,CAAC,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS,GAAG;YAAA,sBAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC7E,aAAa,CAAC,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;;AAElE,aAAa,CAAC,IAAM,aAAa,GAAG,EAAE,CAAC;AACvC,aAAa,CAAC,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAE,yCAAC,CAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC3C;IAAA;IAIA,CAAC,AAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
9 >               ^^^->
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
3 > ^^^^^^->
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
1->Emitted(9, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(9, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(9, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(9, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(10, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(10, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(10, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(11, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(11, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(11, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(12, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(12, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(12, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(12, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(12, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(12, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(12, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(12, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >    
2 >    }
1 >Emitted(13, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(13, 6) Source(8, 6) + SourceIndex(3)
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
1 >Emitted(15, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(15, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(15, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(15, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(16, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(16, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(16, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(16, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(16, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(16, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(16, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(17, 1) Source(13, 1) + SourceIndex(3)
---
>>>    /*@internal*/ function normalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^
5 >                                      ^
1->class normalC {
  >    
2 >    /*@internal*/
3 >                  
4 >                  constructor() { 
5 >                                      }
1->Emitted(18, 5) Source(14, 5) + SourceIndex(3)
2 >Emitted(18, 18) Source(14, 18) + SourceIndex(3)
3 >Emitted(18, 19) Source(14, 19) + SourceIndex(3)
4 >Emitted(18, 39) Source(14, 35) + SourceIndex(3)
5 >Emitted(18, 40) Source(14, 36) + SourceIndex(3)
---
>>>
>>>    /*@internal*/ normalC.prototype.method = function () { };
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^^
6 >                                             ^^^^^^^^^^^^^^
7 >                                                           ^
1 >
  >    /*@internal*/ prop: string;
  >    
2 >    /*@internal*/
3 >                  
4 >                  method
5 >                                          
6 >                                             method() { 
7 >                                                           }
1 >Emitted(20, 5) Source(16, 5) + SourceIndex(3)
2 >Emitted(20, 18) Source(16, 18) + SourceIndex(3)
3 >Emitted(20, 19) Source(16, 19) + SourceIndex(3)
4 >Emitted(20, 43) Source(16, 25) + SourceIndex(3)
5 >Emitted(20, 46) Source(16, 19) + SourceIndex(3)
6 >Emitted(20, 60) Source(16, 30) + SourceIndex(3)
7 >Emitted(20, 61) Source(16, 31) + SourceIndex(3)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
4 >                                                ^^^^^^^->
1 >
  >    /*@internal*/ 
2 >    get 
3 >                          c
1 >Emitted(21, 5) Source(17, 19) + SourceIndex(3)
2 >Emitted(21, 27) Source(17, 23) + SourceIndex(3)
3 >Emitted(21, 49) Source(17, 24) + SourceIndex(3)
---
>>>        /*@internal*/ get: function () { return 10; },
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^^^^^^
4 >                           ^^^^^^^^^^^^^^
5 >                                         ^^^^^^^
6 >                                                ^^
7 >                                                  ^
8 >                                                   ^
9 >                                                    ^
1->
2 >        /*@internal*/
3 >                      
4 >                           get c() { 
5 >                                         return 
6 >                                                10
7 >                                                  ;
8 >                                                    
9 >                                                    }
1->Emitted(22, 9) Source(17, 5) + SourceIndex(3)
2 >Emitted(22, 22) Source(17, 18) + SourceIndex(3)
3 >Emitted(22, 28) Source(17, 19) + SourceIndex(3)
4 >Emitted(22, 42) Source(17, 29) + SourceIndex(3)
5 >Emitted(22, 49) Source(17, 36) + SourceIndex(3)
6 >Emitted(22, 51) Source(17, 38) + SourceIndex(3)
7 >Emitted(22, 52) Source(17, 39) + SourceIndex(3)
8 >Emitted(22, 53) Source(17, 40) + SourceIndex(3)
9 >Emitted(22, 54) Source(17, 41) + SourceIndex(3)
---
>>>        /*@internal*/ set: function (val) { },
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^^^^^^
4 >                           ^^^^^^^^^^
5 >                                     ^^^
6 >                                        ^^^^
7 >                                            ^
1 >
  >    
2 >        /*@internal*/
3 >                      
4 >                           set c(
5 >                                     val: number
6 >                                        ) { 
7 >                                            }
1 >Emitted(23, 9) Source(18, 5) + SourceIndex(3)
2 >Emitted(23, 22) Source(18, 18) + SourceIndex(3)
3 >Emitted(23, 28) Source(18, 19) + SourceIndex(3)
4 >Emitted(23, 38) Source(18, 25) + SourceIndex(3)
5 >Emitted(23, 41) Source(18, 36) + SourceIndex(3)
6 >Emitted(23, 45) Source(18, 40) + SourceIndex(3)
7 >Emitted(23, 46) Source(18, 41) + SourceIndex(3)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(26, 8) Source(17, 41) + SourceIndex(3)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(27, 5) Source(19, 1) + SourceIndex(3)
2 >Emitted(27, 19) Source(19, 2) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^->
1 >
2 >}
3 > 
4 > class normalC {
  >     /*@internal*/ constructor() { }
  >     /*@internal*/ prop: string;
  >     /*@internal*/ method() { }
  >     /*@internal*/ get c() { return 10; }
  >     /*@internal*/ set c(val: number) { }
  > }
1 >Emitted(28, 1) Source(19, 1) + SourceIndex(3)
2 >Emitted(28, 2) Source(19, 2) + SourceIndex(3)
3 >Emitted(28, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(28, 6) Source(19, 2) + SourceIndex(3)
---
>>>var normalN;
1->
2 >^^^^
3 >    ^^^^^^^
4 >           ^
5 >            ^^^^^^^^^^->
1->
  >
2 >namespace 
3 >    normalN
4 >            {
  >               /*@internal*/ export class C { }
  >               /*@internal*/ export function foo() {}
  >               /*@internal*/ export namespace someNamespace { export class C {} }
  >               /*@internal*/ export namespace someOther.something { export class someClass {} }
  >               /*@internal*/ export import someImport = someNamespace.C;
  >               /*@internal*/ export type internalType = internalC;
  >               /*@internal*/ export const internalConst = 10;
  >               /*@internal*/ export enum internalEnum { a, b, c }
  >           }
1->Emitted(29, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(29, 5) Source(20, 11) + SourceIndex(3)
3 >Emitted(29, 12) Source(20, 18) + SourceIndex(3)
4 >Emitted(29, 13) Source(29, 2) + SourceIndex(3)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(30, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(30, 12) Source(20, 11) + SourceIndex(3)
3 >Emitted(30, 19) Source(20, 18) + SourceIndex(3)
---
>>>    /*@internal*/ var C = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^->
1-> {
  >    
2 >    /*@internal*/
3 >                  
1->Emitted(31, 5) Source(21, 5) + SourceIndex(3)
2 >Emitted(31, 18) Source(21, 18) + SourceIndex(3)
3 >Emitted(31, 19) Source(21, 19) + SourceIndex(3)
---
>>>        function C() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^
1->
2 >        export class C { 
3 >                      }
1->Emitted(32, 9) Source(21, 19) + SourceIndex(3)
2 >Emitted(32, 23) Source(21, 36) + SourceIndex(3)
3 >Emitted(32, 24) Source(21, 37) + SourceIndex(3)
---
>>>        return C;
1 >^^^^^^^^
2 >        ^^^^^^^^
1 >
2 >        }
1 >Emitted(33, 9) Source(21, 36) + SourceIndex(3)
2 >Emitted(33, 17) Source(21, 37) + SourceIndex(3)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class C { }
1 >Emitted(34, 5) Source(21, 36) + SourceIndex(3)
2 >Emitted(34, 6) Source(21, 37) + SourceIndex(3)
3 >Emitted(34, 6) Source(21, 19) + SourceIndex(3)
4 >Emitted(34, 10) Source(21, 37) + SourceIndex(3)
---
>>>    normalN.C = C;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(35, 5) Source(21, 32) + SourceIndex(3)
2 >Emitted(35, 14) Source(21, 33) + SourceIndex(3)
3 >Emitted(35, 18) Source(21, 37) + SourceIndex(3)
4 >Emitted(35, 19) Source(21, 37) + SourceIndex(3)
---
>>>    /*@internal*/ function foo() { }
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^
5 >                           ^^^
6 >                              ^^^^^
7 >                                   ^
1->
  >    
2 >    /*@internal*/
3 >                  
4 >                  export function 
5 >                           foo
6 >                              () {
7 >                                   }
1->Emitted(36, 5) Source(22, 5) + SourceIndex(3)
2 >Emitted(36, 18) Source(22, 18) + SourceIndex(3)
3 >Emitted(36, 19) Source(22, 19) + SourceIndex(3)
4 >Emitted(36, 28) Source(22, 35) + SourceIndex(3)
5 >Emitted(36, 31) Source(22, 38) + SourceIndex(3)
6 >Emitted(36, 36) Source(22, 42) + SourceIndex(3)
7 >Emitted(36, 37) Source(22, 43) + SourceIndex(3)
---
>>>    normalN.foo = foo;
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^->
1 >
2 >    foo
3 >               () {}
4 >                     
1 >Emitted(37, 5) Source(22, 35) + SourceIndex(3)
2 >Emitted(37, 16) Source(22, 38) + SourceIndex(3)
3 >Emitted(37, 22) Source(22, 43) + SourceIndex(3)
4 >Emitted(37, 23) Source(22, 43) + SourceIndex(3)
---
>>>    /*@internal*/ var someNamespace;
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^^
6 >                                   ^
7 >                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >    
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      someNamespace
6 >                                    { export class C {} }
1->Emitted(38, 5) Source(23, 5) + SourceIndex(3)
2 >Emitted(38, 18) Source(23, 18) + SourceIndex(3)
3 >Emitted(38, 19) Source(23, 19) + SourceIndex(3)
4 >Emitted(38, 23) Source(23, 36) + SourceIndex(3)
5 >Emitted(38, 36) Source(23, 49) + SourceIndex(3)
6 >Emitted(38, 37) Source(23, 71) + SourceIndex(3)
---
>>>    (function (someNamespace) {var C = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
4 >                            ^^^
1->
2 >    export namespace 
3 >               someNamespace
4 >                             { 
1->Emitted(39, 5) Source(23, 19) + SourceIndex(3)
2 >Emitted(39, 16) Source(23, 36) + SourceIndex(3)
3 >Emitted(39, 29) Source(23, 49) + SourceIndex(3)
4 >Emitted(39, 32) Source(23, 52) + SourceIndex(3)
---
>>>            function C() {}
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^
3 >                          ^
1 >
2 >            export class C {
3 >                          }
1 >Emitted(40, 13) Source(23, 52) + SourceIndex(3)
2 >Emitted(40, 27) Source(23, 68) + SourceIndex(3)
3 >Emitted(40, 28) Source(23, 69) + SourceIndex(3)
---
>>>            return C;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^
1 >
2 >            }
1 >Emitted(41, 13) Source(23, 68) + SourceIndex(3)
2 >Emitted(41, 21) Source(23, 69) + SourceIndex(3)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class C {}
1 >Emitted(42, 9) Source(23, 68) + SourceIndex(3)
2 >Emitted(42, 10) Source(23, 69) + SourceIndex(3)
3 >Emitted(42, 10) Source(23, 52) + SourceIndex(3)
4 >Emitted(42, 14) Source(23, 69) + SourceIndex(3)
---
>>>        someNamespace.C = C;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^
3 >                       ^^^^
4 >                           ^
5 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        C
3 >                        {}
4 >                           
1->Emitted(43, 9) Source(23, 65) + SourceIndex(3)
2 >Emitted(43, 24) Source(23, 66) + SourceIndex(3)
3 >Emitted(43, 28) Source(23, 69) + SourceIndex(3)
4 >Emitted(43, 29) Source(23, 69) + SourceIndex(3)
---
>>>    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^^^
7 >                                            ^^^^^
8 >                                                 ^^^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       someNamespace
5 >                    
6 >                       someNamespace
7 >                                            
8 >                                                 someNamespace
9 >                                                                       { export class C {} }
1->Emitted(44, 5) Source(23, 70) + SourceIndex(3)
2 >Emitted(44, 6) Source(23, 71) + SourceIndex(3)
3 >Emitted(44, 8) Source(23, 36) + SourceIndex(3)
4 >Emitted(44, 21) Source(23, 49) + SourceIndex(3)
5 >Emitted(44, 24) Source(23, 36) + SourceIndex(3)
6 >Emitted(44, 45) Source(23, 49) + SourceIndex(3)
7 >Emitted(44, 50) Source(23, 36) + SourceIndex(3)
8 >Emitted(44, 71) Source(23, 49) + SourceIndex(3)
9 >Emitted(44, 79) Source(23, 71) + SourceIndex(3)
---
>>>    /*@internal*/ var someOther;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^
6 >                               ^
1 >
  >    
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      someOther
6 >                               .something { export class someClass {} }
1 >Emitted(45, 5) Source(24, 5) + SourceIndex(3)
2 >Emitted(45, 18) Source(24, 18) + SourceIndex(3)
3 >Emitted(45, 19) Source(24, 19) + SourceIndex(3)
4 >Emitted(45, 23) Source(24, 36) + SourceIndex(3)
5 >Emitted(45, 32) Source(24, 45) + SourceIndex(3)
6 >Emitted(45, 33) Source(24, 85) + SourceIndex(3)
---
>>>    (function (someOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1 >
2 >    export namespace 
3 >               someOther
1 >Emitted(46, 5) Source(24, 19) + SourceIndex(3)
2 >Emitted(46, 16) Source(24, 36) + SourceIndex(3)
3 >Emitted(46, 25) Source(24, 45) + SourceIndex(3)
---
>>>        var something;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >        
3 >            something
4 >                      { export class someClass {} }
1 >Emitted(47, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(47, 13) Source(24, 46) + SourceIndex(3)
3 >Emitted(47, 22) Source(24, 55) + SourceIndex(3)
4 >Emitted(47, 23) Source(24, 85) + SourceIndex(3)
---
>>>        (function (something) {var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^
5 >                               ^^^^^^^^^->
1->
2 >        
3 >                   something
4 >                             { 
1->Emitted(48, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(48, 20) Source(24, 46) + SourceIndex(3)
3 >Emitted(48, 29) Source(24, 55) + SourceIndex(3)
4 >Emitted(48, 32) Source(24, 58) + SourceIndex(3)
---
>>>                function someClass() {}
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^
1->
2 >                export class someClass {
3 >                                      }
1->Emitted(49, 17) Source(24, 58) + SourceIndex(3)
2 >Emitted(49, 39) Source(24, 82) + SourceIndex(3)
3 >Emitted(49, 40) Source(24, 83) + SourceIndex(3)
---
>>>                return someClass;
1 >^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1 >
2 >                }
1 >Emitted(50, 17) Source(24, 82) + SourceIndex(3)
2 >Emitted(50, 33) Source(24, 83) + SourceIndex(3)
---
>>>            }());
1 >^^^^^^^^^^^^
2 >            ^
3 >             
4 >             ^^^^
5 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >            }
3 >             
4 >             export class someClass {}
1 >Emitted(51, 13) Source(24, 82) + SourceIndex(3)
2 >Emitted(51, 14) Source(24, 83) + SourceIndex(3)
3 >Emitted(51, 14) Source(24, 58) + SourceIndex(3)
4 >Emitted(51, 18) Source(24, 83) + SourceIndex(3)
---
>>>            something.someClass = someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^
3 >                               ^^^^^^^^^^^^
4 >                                           ^
5 >                                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            someClass
3 >                                {}
4 >                                           
1->Emitted(52, 13) Source(24, 71) + SourceIndex(3)
2 >Emitted(52, 32) Source(24, 80) + SourceIndex(3)
3 >Emitted(52, 44) Source(24, 83) + SourceIndex(3)
4 >Emitted(52, 45) Source(24, 83) + SourceIndex(3)
---
>>>        })(something = someOther.something || (someOther.something = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^
9 >                                                                  ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           something
5 >                    
6 >                       something
7 >                                          
8 >                                               something
9 >                                                                   { export class someClass {} }
1->Emitted(53, 9) Source(24, 84) + SourceIndex(3)
2 >Emitted(53, 10) Source(24, 85) + SourceIndex(3)
3 >Emitted(53, 12) Source(24, 46) + SourceIndex(3)
4 >Emitted(53, 21) Source(24, 55) + SourceIndex(3)
5 >Emitted(53, 24) Source(24, 46) + SourceIndex(3)
6 >Emitted(53, 43) Source(24, 55) + SourceIndex(3)
7 >Emitted(53, 48) Source(24, 46) + SourceIndex(3)
8 >Emitted(53, 67) Source(24, 55) + SourceIndex(3)
9 >Emitted(53, 75) Source(24, 85) + SourceIndex(3)
---
>>>    })(someOther = normalN.someOther || (normalN.someOther = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^
5 >                ^^^
6 >                   ^^^^^^^^^^^^^^^^^
7 >                                    ^^^^^
8 >                                         ^^^^^^^^^^^^^^^^^
9 >                                                          ^^^^^^^^
1 >
2 >    }
3 >     
4 >       someOther
5 >                
6 >                   someOther
7 >                                    
8 >                                         someOther
9 >                                                          .something { export class someClass {} }
1 >Emitted(54, 5) Source(24, 84) + SourceIndex(3)
2 >Emitted(54, 6) Source(24, 85) + SourceIndex(3)
3 >Emitted(54, 8) Source(24, 36) + SourceIndex(3)
4 >Emitted(54, 17) Source(24, 45) + SourceIndex(3)
5 >Emitted(54, 20) Source(24, 36) + SourceIndex(3)
6 >Emitted(54, 37) Source(24, 45) + SourceIndex(3)
7 >Emitted(54, 42) Source(24, 36) + SourceIndex(3)
8 >Emitted(54, 59) Source(24, 45) + SourceIndex(3)
9 >Emitted(54, 67) Source(24, 85) + SourceIndex(3)
---
>>>    /*@internal*/ normalN.someImport = someNamespace.C;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^
5 >                                    ^^^
6 >                                       ^^^^^^^^^^^^^
7 >                                                    ^
8 >                                                     ^
9 >                                                      ^
1 >
  >    
2 >    /*@internal*/
3 >                  export import 
4 >                  someImport
5 >                                     = 
6 >                                       someNamespace
7 >                                                    .
8 >                                                     C
9 >                                                      ;
1 >Emitted(55, 5) Source(25, 5) + SourceIndex(3)
2 >Emitted(55, 18) Source(25, 18) + SourceIndex(3)
3 >Emitted(55, 19) Source(25, 33) + SourceIndex(3)
4 >Emitted(55, 37) Source(25, 43) + SourceIndex(3)
5 >Emitted(55, 40) Source(25, 46) + SourceIndex(3)
6 >Emitted(55, 53) Source(25, 59) + SourceIndex(3)
7 >Emitted(55, 54) Source(25, 60) + SourceIndex(3)
8 >Emitted(55, 55) Source(25, 61) + SourceIndex(3)
9 >Emitted(55, 56) Source(25, 62) + SourceIndex(3)
---
>>>
>>>    /*@internal*/ normalN.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^^
5 >                                       ^^^
6 >                                          ^^
7 >                                            ^
1 >
  >    /*@internal*/ export type internalType = internalC;
  >    
2 >    /*@internal*/
3 >                  export const 
4 >                  internalConst
5 >                                        = 
6 >                                          10
7 >                                            ;
1 >Emitted(57, 5) Source(27, 5) + SourceIndex(3)
2 >Emitted(57, 18) Source(27, 18) + SourceIndex(3)
3 >Emitted(57, 19) Source(27, 32) + SourceIndex(3)
4 >Emitted(57, 40) Source(27, 45) + SourceIndex(3)
5 >Emitted(57, 43) Source(27, 48) + SourceIndex(3)
6 >Emitted(57, 45) Source(27, 50) + SourceIndex(3)
7 >Emitted(57, 46) Source(27, 51) + SourceIndex(3)
---
>>>    /*@internal*/ var internalEnum;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^
1 >
  >    
2 >    /*@internal*/
3 >                  
4 >                  export enum 
5 >                      internalEnum { a, b, c }
1 >Emitted(58, 5) Source(28, 5) + SourceIndex(3)
2 >Emitted(58, 18) Source(28, 18) + SourceIndex(3)
3 >Emitted(58, 19) Source(28, 19) + SourceIndex(3)
4 >Emitted(58, 23) Source(28, 31) + SourceIndex(3)
5 >Emitted(58, 35) Source(28, 55) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(59, 5) Source(28, 19) + SourceIndex(3)
2 >Emitted(59, 16) Source(28, 31) + SourceIndex(3)
3 >Emitted(59, 28) Source(28, 43) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                                                                           ^
6 >                                                                                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                                                                     ^
1-> { 
2 >        a
3 >                                                 , 
4 >                                                  b
5 >                                                                                           , 
6 >                                                                                            c
7 >                                                                                                                                     
1->Emitted(60, 9) Source(28, 46) + SourceIndex(3)
2 >Emitted(60, 50) Source(28, 47) + SourceIndex(3)
3 >Emitted(60, 51) Source(28, 49) + SourceIndex(3)
4 >Emitted(60, 92) Source(28, 50) + SourceIndex(3)
5 >Emitted(60, 93) Source(28, 52) + SourceIndex(3)
6 >Emitted(60, 134) Source(28, 53) + SourceIndex(3)
7 >Emitted(60, 135) Source(28, 53) + SourceIndex(3)
---
>>>    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^
5 >                   ^^^
6 >                      ^^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^^
9 >                                                                   ^^^^^^^^
1 > 
2 >    }
3 >     
4 >       internalEnum
5 >                   
6 >                      internalEnum
7 >                                          
8 >                                               internalEnum
9 >                                                                    { a, b, c }
1 >Emitted(61, 5) Source(28, 54) + SourceIndex(3)
2 >Emitted(61, 6) Source(28, 55) + SourceIndex(3)
3 >Emitted(61, 8) Source(28, 31) + SourceIndex(3)
4 >Emitted(61, 20) Source(28, 43) + SourceIndex(3)
5 >Emitted(61, 23) Source(28, 31) + SourceIndex(3)
6 >Emitted(61, 43) Source(28, 43) + SourceIndex(3)
7 >Emitted(61, 48) Source(28, 31) + SourceIndex(3)
8 >Emitted(61, 68) Source(28, 43) + SourceIndex(3)
9 >Emitted(61, 76) Source(28, 55) + SourceIndex(3)
---
>>>})(normalN || (normalN = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^
5 >          ^^^^^
6 >               ^^^^^^^
7 >                      ^^^^^^^^
8 >                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
3 > 
4 >   normalN
5 >          
6 >               normalN
7 >                       {
  >                          /*@internal*/ export class C { }
  >                          /*@internal*/ export function foo() {}
  >                          /*@internal*/ export namespace someNamespace { export class C {} }
  >                          /*@internal*/ export namespace someOther.something { export class someClass {} }
  >                          /*@internal*/ export import someImport = someNamespace.C;
  >                          /*@internal*/ export type internalType = internalC;
  >                          /*@internal*/ export const internalConst = 10;
  >                          /*@internal*/ export enum internalEnum { a, b, c }
  >                      }
1 >Emitted(62, 1) Source(29, 1) + SourceIndex(3)
2 >Emitted(62, 2) Source(29, 2) + SourceIndex(3)
3 >Emitted(62, 4) Source(20, 11) + SourceIndex(3)
4 >Emitted(62, 11) Source(20, 18) + SourceIndex(3)
5 >Emitted(62, 16) Source(20, 11) + SourceIndex(3)
6 >Emitted(62, 23) Source(20, 18) + SourceIndex(3)
7 >Emitted(62, 31) Source(29, 2) + SourceIndex(3)
---
>>>/*@internal*/ var internalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^^^^^->
1->
  >
2 >/*@internal*/
3 >              
1->Emitted(63, 1) Source(30, 1) + SourceIndex(3)
2 >Emitted(63, 14) Source(30, 14) + SourceIndex(3)
3 >Emitted(63, 15) Source(30, 15) + SourceIndex(3)
---
>>>    function internalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^
1->
2 >    class internalC {
3 >                          }
1->Emitted(64, 5) Source(30, 15) + SourceIndex(3)
2 >Emitted(64, 27) Source(30, 32) + SourceIndex(3)
3 >Emitted(64, 28) Source(30, 33) + SourceIndex(3)
---
>>>    return internalC;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
1 >
2 >    }
1 >Emitted(65, 5) Source(30, 32) + SourceIndex(3)
2 >Emitted(65, 21) Source(30, 33) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class internalC {}
1 >Emitted(66, 1) Source(30, 32) + SourceIndex(3)
2 >Emitted(66, 2) Source(30, 33) + SourceIndex(3)
3 >Emitted(66, 2) Source(30, 15) + SourceIndex(3)
4 >Emitted(66, 6) Source(30, 33) + SourceIndex(3)
---
>>>/*@internal*/ function internalfoo() { }
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^
5 >                       ^^^^^^^^^^^
6 >                                  ^^^^^
7 >                                       ^
1->
  >
2 >/*@internal*/
3 >              
4 >              function 
5 >                       internalfoo
6 >                                  () {
7 >                                       }
1->Emitted(67, 1) Source(31, 1) + SourceIndex(3)
2 >Emitted(67, 14) Source(31, 14) + SourceIndex(3)
3 >Emitted(67, 15) Source(31, 15) + SourceIndex(3)
4 >Emitted(67, 24) Source(31, 24) + SourceIndex(3)
5 >Emitted(67, 35) Source(31, 35) + SourceIndex(3)
6 >Emitted(67, 40) Source(31, 39) + SourceIndex(3)
7 >Emitted(67, 41) Source(31, 40) + SourceIndex(3)
---
>>>/*@internal*/ var internalNamespace;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^^^^^
6 >                                   ^
7 >                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >/*@internal*/
3 >              
4 >              namespace 
5 >                  internalNamespace
6 >                                    { export class someClass {} }
1 >Emitted(68, 1) Source(32, 1) + SourceIndex(3)
2 >Emitted(68, 14) Source(32, 14) + SourceIndex(3)
3 >Emitted(68, 15) Source(32, 15) + SourceIndex(3)
4 >Emitted(68, 19) Source(32, 25) + SourceIndex(3)
5 >Emitted(68, 36) Source(32, 42) + SourceIndex(3)
6 >Emitted(68, 37) Source(32, 72) + SourceIndex(3)
---
>>>(function (internalNamespace) {var someClass = /** @class */ (function () {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^^^^^
4 >                            ^^^
5 >                               ^->
1->
2 >namespace 
3 >           internalNamespace
4 >                             { 
1->Emitted(69, 1) Source(32, 15) + SourceIndex(3)
2 >Emitted(69, 12) Source(32, 25) + SourceIndex(3)
3 >Emitted(69, 29) Source(32, 42) + SourceIndex(3)
4 >Emitted(69, 32) Source(32, 45) + SourceIndex(3)
---
>>>        function someClass() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^
1->
2 >        export class someClass {
3 >                              }
1->Emitted(70, 9) Source(32, 45) + SourceIndex(3)
2 >Emitted(70, 31) Source(32, 69) + SourceIndex(3)
3 >Emitted(70, 32) Source(32, 70) + SourceIndex(3)
---
>>>        return someClass;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1 >
2 >        }
1 >Emitted(71, 9) Source(32, 69) + SourceIndex(3)
2 >Emitted(71, 25) Source(32, 70) + SourceIndex(3)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class someClass {}
1 >Emitted(72, 5) Source(32, 69) + SourceIndex(3)
2 >Emitted(72, 6) Source(32, 70) + SourceIndex(3)
3 >Emitted(72, 6) Source(32, 45) + SourceIndex(3)
4 >Emitted(72, 10) Source(32, 70) + SourceIndex(3)
---
>>>    internalNamespace.someClass = someClass;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                               ^^^^^^^^^^^^
4 >                                           ^
5 >                                            ^^^^^^^->
1->
2 >    someClass
3 >                                {}
4 >                                           
1->Emitted(73, 5) Source(32, 58) + SourceIndex(3)
2 >Emitted(73, 32) Source(32, 67) + SourceIndex(3)
3 >Emitted(73, 44) Source(32, 70) + SourceIndex(3)
4 >Emitted(73, 45) Source(32, 70) + SourceIndex(3)
---
>>>})(internalNamespace || (internalNamespace = {}));
1->
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^^^^^
5 >                    ^^^^^
6 >                         ^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^^^^
1-> 
2 >}
3 > 
4 >   internalNamespace
5 >                    
6 >                         internalNamespace
7 >                                           { export class someClass {} }
1->Emitted(74, 1) Source(32, 71) + SourceIndex(3)
2 >Emitted(74, 2) Source(32, 72) + SourceIndex(3)
3 >Emitted(74, 4) Source(32, 25) + SourceIndex(3)
4 >Emitted(74, 21) Source(32, 42) + SourceIndex(3)
5 >Emitted(74, 26) Source(32, 25) + SourceIndex(3)
6 >Emitted(74, 43) Source(32, 42) + SourceIndex(3)
7 >Emitted(74, 51) Source(32, 72) + SourceIndex(3)
---
>>>/*@internal*/ var internalOther;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^
6 >                               ^
1 >
  >
2 >/*@internal*/
3 >              
4 >              namespace 
5 >                  internalOther
6 >                               .something { export class someClass {} }
1 >Emitted(75, 1) Source(33, 1) + SourceIndex(3)
2 >Emitted(75, 14) Source(33, 14) + SourceIndex(3)
3 >Emitted(75, 15) Source(33, 15) + SourceIndex(3)
4 >Emitted(75, 19) Source(33, 25) + SourceIndex(3)
5 >Emitted(75, 32) Source(33, 38) + SourceIndex(3)
6 >Emitted(75, 33) Source(33, 78) + SourceIndex(3)
---
>>>(function (internalOther) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1 >
2 >namespace 
3 >           internalOther
1 >Emitted(76, 1) Source(33, 15) + SourceIndex(3)
2 >Emitted(76, 12) Source(33, 25) + SourceIndex(3)
3 >Emitted(76, 25) Source(33, 38) + SourceIndex(3)
---
>>>    var something;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >    
3 >        something
4 >                  { export class someClass {} }
1 >Emitted(77, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(77, 9) Source(33, 39) + SourceIndex(3)
3 >Emitted(77, 18) Source(33, 48) + SourceIndex(3)
4 >Emitted(77, 19) Source(33, 78) + SourceIndex(3)
---
>>>    (function (something) {var someClass = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^^^^^^->
1->
2 >    
3 >               something
4 >                         { 
1->Emitted(78, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(78, 16) Source(33, 39) + SourceIndex(3)
3 >Emitted(78, 25) Source(33, 48) + SourceIndex(3)
4 >Emitted(78, 28) Source(33, 51) + SourceIndex(3)
---
>>>            function someClass() {}
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^
1->
2 >            export class someClass {
3 >                                  }
1->Emitted(79, 13) Source(33, 51) + SourceIndex(3)
2 >Emitted(79, 35) Source(33, 75) + SourceIndex(3)
3 >Emitted(79, 36) Source(33, 76) + SourceIndex(3)
---
>>>            return someClass;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1 >
2 >            }
1 >Emitted(80, 13) Source(33, 75) + SourceIndex(3)
2 >Emitted(80, 29) Source(33, 76) + SourceIndex(3)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class someClass {}
1 >Emitted(81, 9) Source(33, 75) + SourceIndex(3)
2 >Emitted(81, 10) Source(33, 76) + SourceIndex(3)
3 >Emitted(81, 10) Source(33, 51) + SourceIndex(3)
4 >Emitted(81, 14) Source(33, 76) + SourceIndex(3)
---
>>>        something.someClass = someClass;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^
3 >                           ^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        someClass
3 >                            {}
4 >                                       
1->Emitted(82, 9) Source(33, 64) + SourceIndex(3)
2 >Emitted(82, 28) Source(33, 73) + SourceIndex(3)
3 >Emitted(82, 40) Source(33, 76) + SourceIndex(3)
4 >Emitted(82, 41) Source(33, 76) + SourceIndex(3)
---
>>>    })(something = internalOther.something || (internalOther.something = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^
5 >                ^^^
6 >                   ^^^^^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       something
5 >                
6 >                   something
7 >                                          
8 >                                               something
9 >                                                                       { export class someClass {} }
1->Emitted(83, 5) Source(33, 77) + SourceIndex(3)
2 >Emitted(83, 6) Source(33, 78) + SourceIndex(3)
3 >Emitted(83, 8) Source(33, 39) + SourceIndex(3)
4 >Emitted(83, 17) Source(33, 48) + SourceIndex(3)
5 >Emitted(83, 20) Source(33, 39) + SourceIndex(3)
6 >Emitted(83, 43) Source(33, 48) + SourceIndex(3)
7 >Emitted(83, 48) Source(33, 39) + SourceIndex(3)
8 >Emitted(83, 71) Source(33, 48) + SourceIndex(3)
9 >Emitted(83, 79) Source(33, 78) + SourceIndex(3)
---
>>>})(internalOther || (internalOther = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^
5 >                ^^^^^
6 >                     ^^^^^^^^^^^^^
7 >                                  ^^^^^^^^
8 >                                          ^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 >   internalOther
5 >                
6 >                     internalOther
7 >                                  .something { export class someClass {} }
1 >Emitted(84, 1) Source(33, 77) + SourceIndex(3)
2 >Emitted(84, 2) Source(33, 78) + SourceIndex(3)
3 >Emitted(84, 4) Source(33, 25) + SourceIndex(3)
4 >Emitted(84, 17) Source(33, 38) + SourceIndex(3)
5 >Emitted(84, 22) Source(33, 25) + SourceIndex(3)
6 >Emitted(84, 35) Source(33, 38) + SourceIndex(3)
7 >Emitted(84, 43) Source(33, 78) + SourceIndex(3)
---
>>>/*@internal*/ var internalImport = internalNamespace.someClass;
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^^
6 >                                ^^^
7 >                                   ^^^^^^^^^^^^^^^^^
8 >                                                    ^
9 >                                                     ^^^^^^^^^
10>                                                              ^
1->
  >
2 >/*@internal*/
3 >              
4 >              import 
5 >                  internalImport
6 >                                 = 
7 >                                   internalNamespace
8 >                                                    .
9 >                                                     someClass
10>                                                              ;
1->Emitted(85, 1) Source(34, 1) + SourceIndex(3)
2 >Emitted(85, 14) Source(34, 14) + SourceIndex(3)
3 >Emitted(85, 15) Source(34, 15) + SourceIndex(3)
4 >Emitted(85, 19) Source(34, 22) + SourceIndex(3)
5 >Emitted(85, 33) Source(34, 36) + SourceIndex(3)
6 >Emitted(85, 36) Source(34, 39) + SourceIndex(3)
7 >Emitted(85, 53) Source(34, 56) + SourceIndex(3)
8 >Emitted(85, 54) Source(34, 57) + SourceIndex(3)
9 >Emitted(85, 63) Source(34, 66) + SourceIndex(3)
10>Emitted(85, 64) Source(34, 67) + SourceIndex(3)
---
>>>
>>>/*@internal*/ var internalConst = 10;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^
6 >                               ^^^
7 >                                  ^^
8 >                                    ^
1 >
  >/*@internal*/ type internalType = internalC;
  >
2 >/*@internal*/
3 >              
4 >              const 
5 >                  internalConst
6 >                                = 
7 >                                  10
8 >                                    ;
1 >Emitted(87, 1) Source(36, 1) + SourceIndex(3)
2 >Emitted(87, 14) Source(36, 14) + SourceIndex(3)
3 >Emitted(87, 15) Source(36, 15) + SourceIndex(3)
4 >Emitted(87, 19) Source(36, 21) + SourceIndex(3)
5 >Emitted(87, 32) Source(36, 34) + SourceIndex(3)
6 >Emitted(87, 35) Source(36, 37) + SourceIndex(3)
7 >Emitted(87, 37) Source(36, 39) + SourceIndex(3)
8 >Emitted(87, 38) Source(36, 40) + SourceIndex(3)
---
>>>/*@internal*/ var internalEnum;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^
1 >
  >
2 >/*@internal*/
3 >              
4 >              enum 
5 >                  internalEnum { a, b, c }
1 >Emitted(88, 1) Source(37, 1) + SourceIndex(3)
2 >Emitted(88, 14) Source(37, 14) + SourceIndex(3)
3 >Emitted(88, 15) Source(37, 15) + SourceIndex(3)
4 >Emitted(88, 19) Source(37, 20) + SourceIndex(3)
5 >Emitted(88, 31) Source(37, 44) + SourceIndex(3)
---
>>>(function (internalEnum) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >enum 
3 >           internalEnum
1 >Emitted(89, 1) Source(37, 15) + SourceIndex(3)
2 >Emitted(89, 12) Source(37, 20) + SourceIndex(3)
3 >Emitted(89, 24) Source(37, 32) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                                                                       ^
6 >                                                                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                                                                 ^
1-> { 
2 >    a
3 >                                             , 
4 >                                              b
5 >                                                                                       , 
6 >                                                                                        c
7 >                                                                                                                                 
1->Emitted(90, 5) Source(37, 35) + SourceIndex(3)
2 >Emitted(90, 46) Source(37, 36) + SourceIndex(3)
3 >Emitted(90, 47) Source(37, 38) + SourceIndex(3)
4 >Emitted(90, 88) Source(37, 39) + SourceIndex(3)
5 >Emitted(90, 89) Source(37, 41) + SourceIndex(3)
6 >Emitted(90, 130) Source(37, 42) + SourceIndex(3)
7 >Emitted(90, 131) Source(37, 42) + SourceIndex(3)
---
>>>})(internalEnum || (internalEnum = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^
5 >               ^^^^^
6 >                    ^^^^^^^^^^^^
7 >                                ^^^^^^^^
1 > 
2 >}
3 > 
4 >   internalEnum
5 >               
6 >                    internalEnum
7 >                                 { a, b, c }
1 >Emitted(91, 1) Source(37, 43) + SourceIndex(3)
2 >Emitted(91, 2) Source(37, 44) + SourceIndex(3)
3 >Emitted(91, 4) Source(37, 20) + SourceIndex(3)
4 >Emitted(91, 16) Source(37, 32) + SourceIndex(3)
5 >Emitted(91, 21) Source(37, 20) + SourceIndex(3)
6 >Emitted(91, 33) Source(37, 32) + SourceIndex(3)
7 >Emitted(91, 41) Source(37, 44) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = /** @class */ (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(92, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(93, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(94, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(94, 6) Source(5, 2) + SourceIndex(4)
3 >Emitted(94, 6) Source(2, 5) + SourceIndex(4)
4 >Emitted(94, 29) Source(2, 16) + SourceIndex(4)
5 >Emitted(94, 32) Source(2, 5) + SourceIndex(4)
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
1->Emitted(95, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(95, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(95, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(95, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(95, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(95, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(95, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(95, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(96, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(96, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(97, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(97, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(98, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(98, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(98, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(98, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(99, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(99, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(99, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(99, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(99, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(99, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(99, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(99, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(100, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(100, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(100, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(100, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(100, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(100, 17) Source(2, 17) + SourceIndex(5)
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
          "end": 114,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 114,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 114,
          "end": 3383,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 114,
              "end": 3383,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 3383,
          "end": 3419,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 157,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 157,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 157,
          "end": 317,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 157,
              "end": 317,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 317,
          "end": 336,
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
prepend: (0-114):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-114)

var s = "Hello, world";

console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (114-3383):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (114-3383)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }

    f();
})(N || (N = {}));
var normalC = /** @class */ (function () {
    /*@internal*/ function normalC() {}

    /*@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /*@internal*/ get: function () { return 10; },
        /*@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /*@internal*/ var C = /** @class */ (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    /*@internal*/ function foo() { }
    normalN.foo = foo;
    /*@internal*/ var someNamespace;
    (function (someNamespace) {var C = /** @class */ (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /*@internal*/ var someOther;
    (function (someOther) {
        var something;
        (function (something) {var someClass = /** @class */ (function () {
                function someClass() {}
                return someClass;
            }());
            something.someClass = someClass;
        })(something = someOther.something || (someOther.something = {}));
    })(someOther = normalN.someOther || (normalN.someOther = {}));
    /*@internal*/ normalN.someImport = someNamespace.C;

    /*@internal*/ normalN.internalConst = 10;
    /*@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
/*@internal*/ var internalC = /** @class */ (function () {
    function internalC() {}
    return internalC;
}());
/*@internal*/ function internalfoo() { }
/*@internal*/ var internalNamespace;
(function (internalNamespace) {var someClass = /** @class */ (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/*@internal*/ var internalOther;
(function (internalOther) {
    var something;
    (function (something) {var someClass = /** @class */ (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
/*@internal*/ var internalImport = internalNamespace.someClass;

/*@internal*/ var internalConst = 10;
/*@internal*/ var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = /** @class */ (function () {
    function C() {
    }C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (3383-3419)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-157):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-157)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (157-317):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (157-317)
declare namespace N {
}
declare namespace N {
}
declare class normalC {
}
declare namespace normalN {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (317-336)
declare var c: C;

======================================================================

