Input::
//// [/src/first/first_PART1.ts]
/*@internal*/ interface TheFirst {
    none: any;
}

const s = "Hola, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);




Output::
/lib/tsc --b /src/third --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because oldest output 'src/first/bin/first-output.js' is older than newest input 'src/first/first_PART1.ts'

[[90m12:04:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:04:00 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part1.ts' is older than oldest output 'src/2/second-output.js'

[[90m12:04:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because oldest output 'src/third/thirdjs/output/third-output.js' is older than newest input 'src/first'

[[90m12:04:00 AM[0m] Building project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success
readFiles:: {
 "/src/third/tsconfig.json": 1,
 "/src/first/tsconfig.json": 1,
 "/src/second/tsconfig.json": 1,
 "/src/first/first_PART1.ts": 1,
 "/src/first/first_part2.ts": 1,
 "/src/first/first_part3.ts": 1,
 "/src/first/bin/first-output.d.ts": 2,
 "/src/2/second-output.tsbuildinfo": 1,
 "/src/2/second-output.d.ts": 1,
 "/src/third/third_part1.ts": 1,
 "/src/first/bin/first-output.tsbuildinfo": 1,
 "/src/first/bin/first-output.js": 1,
 "/src/2/second-output.js": 1,
 "/src/first/bin/first-output.js.map": 1,
 "/src/2/second-output.js.map": 1,
 "/src/first/bin/first-output.d.ts.map": 1,
 "/src/2/second-output.d.ts.map": 1,
 "/src/third/thirdjs/output/third-output.d.ts": 1
} 

//// [/src/first/bin/first-output.d.ts]
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAc,UAAU,QAAQ;IAC5B,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET"}

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
1 >/*@internal*/ 
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 15) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 25) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 33) + SourceIndex(0)
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
var s = "Hola, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
1 >/*@internal*/ interface TheFirst {
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
1 >Emitted(2, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(3, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(3, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(3, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(3, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(3, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(3, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(4, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(4, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(4, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(5, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(5, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(5, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(5, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(6, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(6, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":109,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":39,"kind":"internal"},{"pos":41,"end":156,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-109)
var s = "Hola, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
internal: (0-39)
interface TheFirst {
    none: any;
}
----------------------------------------------------------------------
text: (41-156)
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
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
          "end": 109,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 39,
          "kind": "internal"
        },
        {
          "pos": 41,
          "end": 156,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 290
}

//// [/src/third/thirdjs/output/third-output.d.ts]
declare const s = "Hola, world";
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
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAIA,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AAED,cAAM,OAAO;CAMZ;AACD,kBAAU,OAAO,CAAC;CASjB;AC5BD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
>>>declare const s = "Hola, world";
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^
6 >                               ^
1 >/*@internal*/ interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hola, world"
6 >                               ;
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(1, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(1, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(1, 32) Source(5, 24) + SourceIndex(0)
6 >Emitted(1, 33) Source(5, 25) + SourceIndex(0)
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
1 >Emitted(2, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(2, 11) Source(7, 11) + SourceIndex(0)
3 >Emitted(2, 28) Source(7, 28) + SourceIndex(0)
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
1 >Emitted(3, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(3, 9) Source(8, 9) + SourceIndex(0)
3 >Emitted(3, 11) Source(8, 11) + SourceIndex(0)
4 >Emitted(3, 14) Source(8, 14) + SourceIndex(0)
5 >Emitted(3, 15) Source(8, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(4, 2) Source(9, 2) + SourceIndex(0)
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
1->Emitted(5, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(5, 18) Source(1, 10) + SourceIndex(1)
3 >Emitted(5, 19) Source(1, 11) + SourceIndex(1)
4 >Emitted(5, 30) Source(3, 2) + SourceIndex(1)
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
1 >Emitted(6, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(6, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(6, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(6, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(7, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(8, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(8, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(8, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(8, 21) Source(5, 13) + SourceIndex(2)
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
1 >Emitted(9, 2) Source(11, 2) + SourceIndex(2)
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
1->Emitted(10, 1) Source(13, 1) + SourceIndex(2)
2 >Emitted(10, 15) Source(13, 7) + SourceIndex(2)
3 >Emitted(10, 22) Source(13, 14) + SourceIndex(2)
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
1 >Emitted(11, 2) Source(19, 2) + SourceIndex(2)
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
1->Emitted(12, 1) Source(20, 1) + SourceIndex(2)
2 >Emitted(12, 19) Source(20, 11) + SourceIndex(2)
3 >Emitted(12, 26) Source(20, 18) + SourceIndex(2)
4 >Emitted(12, 27) Source(20, 19) + SourceIndex(2)
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
1 >Emitted(13, 2) Source(29, 2) + SourceIndex(2)
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
1->Emitted(14, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(14, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(14, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(15, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(15, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(16, 2) Source(5, 2) + SourceIndex(3)
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
1->Emitted(17, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(17, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(17, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(17, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(17, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(17, 18) Source(1, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.js]
var s = "Hola, world";
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
var normalC = (function () {
    function normalC() {
    }
    normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        get: function () { return 10; },
        set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    normalN.C = C;
    function foo() { }
    normalN.foo = foo;
    var someNamespace;
    (function (someNamespace) {
        var C = (function () {
            function C() {
            }
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    var someOther;
    (function (someOther) {
        var something;
        (function (something) {
            var someClass = (function () {
                function someClass() {
                }
                return someClass;
            }());
            something.someClass = someClass;
        })(something = someOther.something || (someOther.something = {}));
    })(someOther = normalN.someOther || (normalN.someOther = {}));
    normalN.someImport = someNamespace.C;
    normalN.internalConst = 10;
    var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
var internalC = (function () {
    function internalC() {
    }
    return internalC;
}());
function internalfoo() { }
var internalNamespace;
(function (internalNamespace) {
    var someClass = (function () {
        function someClass() {
        }
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
var internalOther;
(function (internalOther) {
    var something;
    (function (something) {
        var someClass = (function () {
            function someClass() {
            }
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
var internalImport = internalNamespace.someClass;
var internalConst = 10;
var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
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
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACkB;IAAgB,CAAC;IAEjB,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;aAAL,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;aACtB,UAAM,GAAW,IAAI,CAAC;;;OADA;IAExC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACC;QAAA;QAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAClB,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACxB,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa;QAAG;YAAA;YAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IACpD,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS;YAAG;gBAAA;gBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IACpD,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;IAE9B,qBAAa,GAAG,EAAE,CAAC;IAChC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACtD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACa;IAAA;IAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAClB,SAAS,WAAW,KAAI,CAAC;AACzB,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB;IAAG;QAAA;QAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACzD,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS;QAAG;YAAA;YAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC/D,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;AAEpD,IAAM,aAAa,GAAG,EAAE,CAAC;AACzB,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAA;IAAE,yCAAC,CAAA;IAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC3C;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
>>>var s = "Hola, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1 >/*@internal*/ interface TheFirst {
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
1 >Emitted(2, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(3, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(3, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(3, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(3, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(3, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(3, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(4, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(4, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(4, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(5, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(5, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(5, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(5, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(6, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(6, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(7, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(7, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(7, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(7, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(8, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(8, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(8, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(9, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(9, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(9, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(10, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(10, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(10, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(10, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(10, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(10, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(10, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(10, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(11, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(11, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(12, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(12, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(12, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(12, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(13, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(13, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(13, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(13, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(13, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(13, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(13, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(14, 1) Source(13, 1) + SourceIndex(3)
---
>>>    function normalC() {
1->^^^^
2 >    ^^->
1->class normalC {
  >    /*@internal*/ 
1->Emitted(15, 5) Source(14, 19) + SourceIndex(3)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->constructor() { 
2 >    }
1->Emitted(16, 5) Source(14, 35) + SourceIndex(3)
2 >Emitted(16, 6) Source(14, 36) + SourceIndex(3)
---
>>>    normalC.prototype.method = function () { };
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^
3 >                            ^^^
4 >                               ^^^^^^^^^^^^^^
5 >                                             ^
6 >                                              ^^^^^^->
1->
  >    /*@internal*/ prop: string;
  >    /*@internal*/ 
2 >    method
3 >                            
4 >                               method() { 
5 >                                             }
1->Emitted(17, 5) Source(16, 19) + SourceIndex(3)
2 >Emitted(17, 29) Source(16, 25) + SourceIndex(3)
3 >Emitted(17, 32) Source(16, 19) + SourceIndex(3)
4 >Emitted(17, 46) Source(16, 30) + SourceIndex(3)
5 >Emitted(17, 47) Source(16, 31) + SourceIndex(3)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
1->
  >    /*@internal*/ 
2 >    get 
3 >                          c
1->Emitted(18, 5) Source(17, 19) + SourceIndex(3)
2 >Emitted(18, 27) Source(17, 23) + SourceIndex(3)
3 >Emitted(18, 49) Source(17, 24) + SourceIndex(3)
---
>>>        get: function () { return 10; },
1 >^^^^^^^^^^^^^
2 >             ^^^^^^^^^^^^^^
3 >                           ^^^^^^^
4 >                                  ^^
5 >                                    ^
6 >                                     ^
7 >                                      ^
1 >
2 >             get c() { 
3 >                           return 
4 >                                  10
5 >                                    ;
6 >                                      
7 >                                      }
1 >Emitted(19, 14) Source(17, 19) + SourceIndex(3)
2 >Emitted(19, 28) Source(17, 29) + SourceIndex(3)
3 >Emitted(19, 35) Source(17, 36) + SourceIndex(3)
4 >Emitted(19, 37) Source(17, 38) + SourceIndex(3)
5 >Emitted(19, 38) Source(17, 39) + SourceIndex(3)
6 >Emitted(19, 39) Source(17, 40) + SourceIndex(3)
7 >Emitted(19, 40) Source(17, 41) + SourceIndex(3)
---
>>>        set: function (val) { },
1 >^^^^^^^^^^^^^
2 >             ^^^^^^^^^^
3 >                       ^^^
4 >                          ^^^^
5 >                              ^
1 >
  >    /*@internal*/ 
2 >             set c(
3 >                       val: number
4 >                          ) { 
5 >                              }
1 >Emitted(20, 14) Source(18, 19) + SourceIndex(3)
2 >Emitted(20, 24) Source(18, 25) + SourceIndex(3)
3 >Emitted(20, 27) Source(18, 36) + SourceIndex(3)
4 >Emitted(20, 31) Source(18, 40) + SourceIndex(3)
5 >Emitted(20, 32) Source(18, 41) + SourceIndex(3)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(23, 8) Source(17, 41) + SourceIndex(3)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(24, 5) Source(19, 1) + SourceIndex(3)
2 >Emitted(24, 19) Source(19, 2) + SourceIndex(3)
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
1 >Emitted(25, 1) Source(19, 1) + SourceIndex(3)
2 >Emitted(25, 2) Source(19, 2) + SourceIndex(3)
3 >Emitted(25, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(25, 6) Source(19, 2) + SourceIndex(3)
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
1->Emitted(26, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(26, 5) Source(20, 11) + SourceIndex(3)
3 >Emitted(26, 12) Source(20, 18) + SourceIndex(3)
4 >Emitted(26, 13) Source(29, 2) + SourceIndex(3)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(27, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(27, 12) Source(20, 11) + SourceIndex(3)
3 >Emitted(27, 19) Source(20, 18) + SourceIndex(3)
---
>>>    var C = (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^->
1-> {
  >    /*@internal*/ 
1->Emitted(28, 5) Source(21, 19) + SourceIndex(3)
---
>>>        function C() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(29, 9) Source(21, 19) + SourceIndex(3)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^->
1->export class C { 
2 >        }
1->Emitted(30, 9) Source(21, 36) + SourceIndex(3)
2 >Emitted(30, 10) Source(21, 37) + SourceIndex(3)
---
>>>        return C;
1->^^^^^^^^
2 >        ^^^^^^^^
1->
2 >        }
1->Emitted(31, 9) Source(21, 36) + SourceIndex(3)
2 >Emitted(31, 17) Source(21, 37) + SourceIndex(3)
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
1 >Emitted(32, 5) Source(21, 36) + SourceIndex(3)
2 >Emitted(32, 6) Source(21, 37) + SourceIndex(3)
3 >Emitted(32, 6) Source(21, 19) + SourceIndex(3)
4 >Emitted(32, 10) Source(21, 37) + SourceIndex(3)
---
>>>    normalN.C = C;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^
4 >                 ^
5 >                  ^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(33, 5) Source(21, 32) + SourceIndex(3)
2 >Emitted(33, 14) Source(21, 33) + SourceIndex(3)
3 >Emitted(33, 18) Source(21, 37) + SourceIndex(3)
4 >Emitted(33, 19) Source(21, 37) + SourceIndex(3)
---
>>>    function foo() { }
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^
4 >                ^^^^^
5 >                     ^
6 >                      ^->
1->
  >    /*@internal*/ 
2 >    export function 
3 >             foo
4 >                () {
5 >                     }
1->Emitted(34, 5) Source(22, 19) + SourceIndex(3)
2 >Emitted(34, 14) Source(22, 35) + SourceIndex(3)
3 >Emitted(34, 17) Source(22, 38) + SourceIndex(3)
4 >Emitted(34, 22) Source(22, 42) + SourceIndex(3)
5 >Emitted(34, 23) Source(22, 43) + SourceIndex(3)
---
>>>    normalN.foo = foo;
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^
5 >                      ^->
1->
2 >    foo
3 >               () {}
4 >                     
1->Emitted(35, 5) Source(22, 35) + SourceIndex(3)
2 >Emitted(35, 16) Source(22, 38) + SourceIndex(3)
3 >Emitted(35, 22) Source(22, 43) + SourceIndex(3)
4 >Emitted(35, 23) Source(22, 43) + SourceIndex(3)
---
>>>    var someNamespace;
1->^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^->
1->
  >    /*@internal*/ 
2 >    export namespace 
3 >        someNamespace
4 >                      { export class C {} }
1->Emitted(36, 5) Source(23, 19) + SourceIndex(3)
2 >Emitted(36, 9) Source(23, 36) + SourceIndex(3)
3 >Emitted(36, 22) Source(23, 49) + SourceIndex(3)
4 >Emitted(36, 23) Source(23, 71) + SourceIndex(3)
---
>>>    (function (someNamespace) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
4 >                            ^^^->
1->
2 >    export namespace 
3 >               someNamespace
1->Emitted(37, 5) Source(23, 19) + SourceIndex(3)
2 >Emitted(37, 16) Source(23, 36) + SourceIndex(3)
3 >Emitted(37, 29) Source(23, 49) + SourceIndex(3)
---
>>>        var C = (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(38, 9) Source(23, 52) + SourceIndex(3)
---
>>>            function C() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(39, 13) Source(23, 52) + SourceIndex(3)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^->
1->export class C {
2 >            }
1->Emitted(40, 13) Source(23, 68) + SourceIndex(3)
2 >Emitted(40, 14) Source(23, 69) + SourceIndex(3)
---
>>>            return C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^
1->
2 >            }
1->Emitted(41, 13) Source(23, 68) + SourceIndex(3)
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
>>>    var someOther;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^->
1 >
  >    /*@internal*/ 
2 >    export namespace 
3 >        someOther
4 >                 .something { export class someClass {} }
1 >Emitted(45, 5) Source(24, 19) + SourceIndex(3)
2 >Emitted(45, 9) Source(24, 36) + SourceIndex(3)
3 >Emitted(45, 18) Source(24, 45) + SourceIndex(3)
4 >Emitted(45, 19) Source(24, 85) + SourceIndex(3)
---
>>>    (function (someOther) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1->
2 >    export namespace 
3 >               someOther
1->Emitted(46, 5) Source(24, 19) + SourceIndex(3)
2 >Emitted(46, 16) Source(24, 36) + SourceIndex(3)
3 >Emitted(46, 25) Source(24, 45) + SourceIndex(3)
---
>>>        var something;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^->
1 >.
2 >        
3 >            something
4 >                      { export class someClass {} }
1 >Emitted(47, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(47, 13) Source(24, 46) + SourceIndex(3)
3 >Emitted(47, 22) Source(24, 55) + SourceIndex(3)
4 >Emitted(47, 23) Source(24, 85) + SourceIndex(3)
---
>>>        (function (something) {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^->
1->
2 >        
3 >                   something
1->Emitted(48, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(48, 20) Source(24, 46) + SourceIndex(3)
3 >Emitted(48, 29) Source(24, 55) + SourceIndex(3)
---
>>>            var someClass = (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(49, 13) Source(24, 58) + SourceIndex(3)
---
>>>                function someClass() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(50, 17) Source(24, 58) + SourceIndex(3)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                }
1->Emitted(51, 17) Source(24, 82) + SourceIndex(3)
2 >Emitted(51, 18) Source(24, 83) + SourceIndex(3)
---
>>>                return someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1->
2 >                }
1->Emitted(52, 17) Source(24, 82) + SourceIndex(3)
2 >Emitted(52, 33) Source(24, 83) + SourceIndex(3)
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
1 >Emitted(53, 13) Source(24, 82) + SourceIndex(3)
2 >Emitted(53, 14) Source(24, 83) + SourceIndex(3)
3 >Emitted(53, 14) Source(24, 58) + SourceIndex(3)
4 >Emitted(53, 18) Source(24, 83) + SourceIndex(3)
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
1->Emitted(54, 13) Source(24, 71) + SourceIndex(3)
2 >Emitted(54, 32) Source(24, 80) + SourceIndex(3)
3 >Emitted(54, 44) Source(24, 83) + SourceIndex(3)
4 >Emitted(54, 45) Source(24, 83) + SourceIndex(3)
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
1->Emitted(55, 9) Source(24, 84) + SourceIndex(3)
2 >Emitted(55, 10) Source(24, 85) + SourceIndex(3)
3 >Emitted(55, 12) Source(24, 46) + SourceIndex(3)
4 >Emitted(55, 21) Source(24, 55) + SourceIndex(3)
5 >Emitted(55, 24) Source(24, 46) + SourceIndex(3)
6 >Emitted(55, 43) Source(24, 55) + SourceIndex(3)
7 >Emitted(55, 48) Source(24, 46) + SourceIndex(3)
8 >Emitted(55, 67) Source(24, 55) + SourceIndex(3)
9 >Emitted(55, 75) Source(24, 85) + SourceIndex(3)
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
1 >Emitted(56, 5) Source(24, 84) + SourceIndex(3)
2 >Emitted(56, 6) Source(24, 85) + SourceIndex(3)
3 >Emitted(56, 8) Source(24, 36) + SourceIndex(3)
4 >Emitted(56, 17) Source(24, 45) + SourceIndex(3)
5 >Emitted(56, 20) Source(24, 36) + SourceIndex(3)
6 >Emitted(56, 37) Source(24, 45) + SourceIndex(3)
7 >Emitted(56, 42) Source(24, 36) + SourceIndex(3)
8 >Emitted(56, 59) Source(24, 45) + SourceIndex(3)
9 >Emitted(56, 67) Source(24, 85) + SourceIndex(3)
---
>>>    normalN.someImport = someNamespace.C;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^
3 >                      ^^^
4 >                         ^^^^^^^^^^^^^
5 >                                      ^
6 >                                       ^
7 >                                        ^
1 >
  >    /*@internal*/ export import 
2 >    someImport
3 >                       = 
4 >                         someNamespace
5 >                                      .
6 >                                       C
7 >                                        ;
1 >Emitted(57, 5) Source(25, 33) + SourceIndex(3)
2 >Emitted(57, 23) Source(25, 43) + SourceIndex(3)
3 >Emitted(57, 26) Source(25, 46) + SourceIndex(3)
4 >Emitted(57, 39) Source(25, 59) + SourceIndex(3)
5 >Emitted(57, 40) Source(25, 60) + SourceIndex(3)
6 >Emitted(57, 41) Source(25, 61) + SourceIndex(3)
7 >Emitted(57, 42) Source(25, 62) + SourceIndex(3)
---
>>>    normalN.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^
3 >                         ^^^
4 >                            ^^
5 >                              ^
1 >
  >    /*@internal*/ export type internalType = internalC;
  >    /*@internal*/ export const 
2 >    internalConst
3 >                          = 
4 >                            10
5 >                              ;
1 >Emitted(58, 5) Source(27, 32) + SourceIndex(3)
2 >Emitted(58, 26) Source(27, 45) + SourceIndex(3)
3 >Emitted(58, 29) Source(27, 48) + SourceIndex(3)
4 >Emitted(58, 31) Source(27, 50) + SourceIndex(3)
5 >Emitted(58, 32) Source(27, 51) + SourceIndex(3)
---
>>>    var internalEnum;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^
4 >                    ^^^^^^^^^^^->
1 >
  >    /*@internal*/ 
2 >    export enum 
3 >        internalEnum { a, b, c }
1 >Emitted(59, 5) Source(28, 19) + SourceIndex(3)
2 >Emitted(59, 9) Source(28, 31) + SourceIndex(3)
3 >Emitted(59, 21) Source(28, 55) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export enum 
3 >               internalEnum
1->Emitted(60, 5) Source(28, 19) + SourceIndex(3)
2 >Emitted(60, 16) Source(28, 31) + SourceIndex(3)
3 >Emitted(60, 28) Source(28, 43) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(61, 9) Source(28, 46) + SourceIndex(3)
2 >Emitted(61, 50) Source(28, 47) + SourceIndex(3)
3 >Emitted(61, 51) Source(28, 47) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(62, 9) Source(28, 49) + SourceIndex(3)
2 >Emitted(62, 50) Source(28, 50) + SourceIndex(3)
3 >Emitted(62, 51) Source(28, 50) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(63, 9) Source(28, 52) + SourceIndex(3)
2 >Emitted(63, 50) Source(28, 53) + SourceIndex(3)
3 >Emitted(63, 51) Source(28, 53) + SourceIndex(3)
---
>>>    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^
5 >                   ^^^
6 >                      ^^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^^
9 >                                                                   ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       internalEnum
5 >                   
6 >                      internalEnum
7 >                                          
8 >                                               internalEnum
9 >                                                                    { a, b, c }
1->Emitted(64, 5) Source(28, 54) + SourceIndex(3)
2 >Emitted(64, 6) Source(28, 55) + SourceIndex(3)
3 >Emitted(64, 8) Source(28, 31) + SourceIndex(3)
4 >Emitted(64, 20) Source(28, 43) + SourceIndex(3)
5 >Emitted(64, 23) Source(28, 31) + SourceIndex(3)
6 >Emitted(64, 43) Source(28, 43) + SourceIndex(3)
7 >Emitted(64, 48) Source(28, 31) + SourceIndex(3)
8 >Emitted(64, 68) Source(28, 43) + SourceIndex(3)
9 >Emitted(64, 76) Source(28, 55) + SourceIndex(3)
---
>>>})(normalN || (normalN = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^
5 >          ^^^^^
6 >               ^^^^^^^
7 >                      ^^^^^^^^
8 >                              ^->
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
1 >Emitted(65, 1) Source(29, 1) + SourceIndex(3)
2 >Emitted(65, 2) Source(29, 2) + SourceIndex(3)
3 >Emitted(65, 4) Source(20, 11) + SourceIndex(3)
4 >Emitted(65, 11) Source(20, 18) + SourceIndex(3)
5 >Emitted(65, 16) Source(20, 11) + SourceIndex(3)
6 >Emitted(65, 23) Source(20, 18) + SourceIndex(3)
7 >Emitted(65, 31) Source(29, 2) + SourceIndex(3)
---
>>>var internalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >/*@internal*/ 
1->Emitted(66, 1) Source(30, 15) + SourceIndex(3)
---
>>>    function internalC() {
1->^^^^
2 >    ^^->
1->
1->Emitted(67, 5) Source(30, 15) + SourceIndex(3)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^->
1->class internalC {
2 >    }
1->Emitted(68, 5) Source(30, 32) + SourceIndex(3)
2 >Emitted(68, 6) Source(30, 33) + SourceIndex(3)
---
>>>    return internalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(69, 5) Source(30, 32) + SourceIndex(3)
2 >Emitted(69, 21) Source(30, 33) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class internalC {}
1 >Emitted(70, 1) Source(30, 32) + SourceIndex(3)
2 >Emitted(70, 2) Source(30, 33) + SourceIndex(3)
3 >Emitted(70, 2) Source(30, 15) + SourceIndex(3)
4 >Emitted(70, 6) Source(30, 33) + SourceIndex(3)
---
>>>function internalfoo() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^
4 >                    ^^^^^
5 >                         ^
1->
  >/*@internal*/ 
2 >function 
3 >         internalfoo
4 >                    () {
5 >                         }
1->Emitted(71, 1) Source(31, 15) + SourceIndex(3)
2 >Emitted(71, 10) Source(31, 24) + SourceIndex(3)
3 >Emitted(71, 21) Source(31, 35) + SourceIndex(3)
4 >Emitted(71, 26) Source(31, 39) + SourceIndex(3)
5 >Emitted(71, 27) Source(31, 40) + SourceIndex(3)
---
>>>var internalNamespace;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^->
1 >
  >/*@internal*/ 
2 >namespace 
3 >    internalNamespace
4 >                      { export class someClass {} }
1 >Emitted(72, 1) Source(32, 15) + SourceIndex(3)
2 >Emitted(72, 5) Source(32, 25) + SourceIndex(3)
3 >Emitted(72, 22) Source(32, 42) + SourceIndex(3)
4 >Emitted(72, 23) Source(32, 72) + SourceIndex(3)
---
>>>(function (internalNamespace) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^^^^^
4 >                            ^^^^^^^->
1->
2 >namespace 
3 >           internalNamespace
1->Emitted(73, 1) Source(32, 15) + SourceIndex(3)
2 >Emitted(73, 12) Source(32, 25) + SourceIndex(3)
3 >Emitted(73, 29) Source(32, 42) + SourceIndex(3)
---
>>>    var someClass = (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(74, 5) Source(32, 45) + SourceIndex(3)
---
>>>        function someClass() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(75, 9) Source(32, 45) + SourceIndex(3)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >        }
1->Emitted(76, 9) Source(32, 69) + SourceIndex(3)
2 >Emitted(76, 10) Source(32, 70) + SourceIndex(3)
---
>>>        return someClass;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1->
2 >        }
1->Emitted(77, 9) Source(32, 69) + SourceIndex(3)
2 >Emitted(77, 25) Source(32, 70) + SourceIndex(3)
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
1 >Emitted(78, 5) Source(32, 69) + SourceIndex(3)
2 >Emitted(78, 6) Source(32, 70) + SourceIndex(3)
3 >Emitted(78, 6) Source(32, 45) + SourceIndex(3)
4 >Emitted(78, 10) Source(32, 70) + SourceIndex(3)
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
1->Emitted(79, 5) Source(32, 58) + SourceIndex(3)
2 >Emitted(79, 32) Source(32, 67) + SourceIndex(3)
3 >Emitted(79, 44) Source(32, 70) + SourceIndex(3)
4 >Emitted(79, 45) Source(32, 70) + SourceIndex(3)
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
1->Emitted(80, 1) Source(32, 71) + SourceIndex(3)
2 >Emitted(80, 2) Source(32, 72) + SourceIndex(3)
3 >Emitted(80, 4) Source(32, 25) + SourceIndex(3)
4 >Emitted(80, 21) Source(32, 42) + SourceIndex(3)
5 >Emitted(80, 26) Source(32, 25) + SourceIndex(3)
6 >Emitted(80, 43) Source(32, 42) + SourceIndex(3)
7 >Emitted(80, 51) Source(32, 72) + SourceIndex(3)
---
>>>var internalOther;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^->
1 >
  >/*@internal*/ 
2 >namespace 
3 >    internalOther
4 >                 .something { export class someClass {} }
1 >Emitted(81, 1) Source(33, 15) + SourceIndex(3)
2 >Emitted(81, 5) Source(33, 25) + SourceIndex(3)
3 >Emitted(81, 18) Source(33, 38) + SourceIndex(3)
4 >Emitted(81, 19) Source(33, 78) + SourceIndex(3)
---
>>>(function (internalOther) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1->
2 >namespace 
3 >           internalOther
1->Emitted(82, 1) Source(33, 15) + SourceIndex(3)
2 >Emitted(82, 12) Source(33, 25) + SourceIndex(3)
3 >Emitted(82, 25) Source(33, 38) + SourceIndex(3)
---
>>>    var something;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^->
1 >.
2 >    
3 >        something
4 >                  { export class someClass {} }
1 >Emitted(83, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(83, 9) Source(33, 39) + SourceIndex(3)
3 >Emitted(83, 18) Source(33, 48) + SourceIndex(3)
4 >Emitted(83, 19) Source(33, 78) + SourceIndex(3)
---
>>>    (function (something) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^^^^^^^^^^^^^->
1->
2 >    
3 >               something
1->Emitted(84, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(84, 16) Source(33, 39) + SourceIndex(3)
3 >Emitted(84, 25) Source(33, 48) + SourceIndex(3)
---
>>>        var someClass = (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(85, 9) Source(33, 51) + SourceIndex(3)
---
>>>            function someClass() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(86, 13) Source(33, 51) + SourceIndex(3)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >            }
1->Emitted(87, 13) Source(33, 75) + SourceIndex(3)
2 >Emitted(87, 14) Source(33, 76) + SourceIndex(3)
---
>>>            return someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1->
2 >            }
1->Emitted(88, 13) Source(33, 75) + SourceIndex(3)
2 >Emitted(88, 29) Source(33, 76) + SourceIndex(3)
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
1 >Emitted(89, 9) Source(33, 75) + SourceIndex(3)
2 >Emitted(89, 10) Source(33, 76) + SourceIndex(3)
3 >Emitted(89, 10) Source(33, 51) + SourceIndex(3)
4 >Emitted(89, 14) Source(33, 76) + SourceIndex(3)
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
1->Emitted(90, 9) Source(33, 64) + SourceIndex(3)
2 >Emitted(90, 28) Source(33, 73) + SourceIndex(3)
3 >Emitted(90, 40) Source(33, 76) + SourceIndex(3)
4 >Emitted(90, 41) Source(33, 76) + SourceIndex(3)
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
1->Emitted(91, 5) Source(33, 77) + SourceIndex(3)
2 >Emitted(91, 6) Source(33, 78) + SourceIndex(3)
3 >Emitted(91, 8) Source(33, 39) + SourceIndex(3)
4 >Emitted(91, 17) Source(33, 48) + SourceIndex(3)
5 >Emitted(91, 20) Source(33, 39) + SourceIndex(3)
6 >Emitted(91, 43) Source(33, 48) + SourceIndex(3)
7 >Emitted(91, 48) Source(33, 39) + SourceIndex(3)
8 >Emitted(91, 71) Source(33, 48) + SourceIndex(3)
9 >Emitted(91, 79) Source(33, 78) + SourceIndex(3)
---
>>>})(internalOther || (internalOther = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^
5 >                ^^^^^
6 >                     ^^^^^^^^^^^^^
7 >                                  ^^^^^^^^
8 >                                          ^^^^^^^^->
1 >
2 >}
3 > 
4 >   internalOther
5 >                
6 >                     internalOther
7 >                                  .something { export class someClass {} }
1 >Emitted(92, 1) Source(33, 77) + SourceIndex(3)
2 >Emitted(92, 2) Source(33, 78) + SourceIndex(3)
3 >Emitted(92, 4) Source(33, 25) + SourceIndex(3)
4 >Emitted(92, 17) Source(33, 38) + SourceIndex(3)
5 >Emitted(92, 22) Source(33, 25) + SourceIndex(3)
6 >Emitted(92, 35) Source(33, 38) + SourceIndex(3)
7 >Emitted(92, 43) Source(33, 78) + SourceIndex(3)
---
>>>var internalImport = internalNamespace.someClass;
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^
4 >                  ^^^
5 >                     ^^^^^^^^^^^^^^^^^
6 >                                      ^
7 >                                       ^^^^^^^^^
8 >                                                ^
1->
  >/*@internal*/ 
2 >import 
3 >    internalImport
4 >                   = 
5 >                     internalNamespace
6 >                                      .
7 >                                       someClass
8 >                                                ;
1->Emitted(93, 1) Source(34, 15) + SourceIndex(3)
2 >Emitted(93, 5) Source(34, 22) + SourceIndex(3)
3 >Emitted(93, 19) Source(34, 36) + SourceIndex(3)
4 >Emitted(93, 22) Source(34, 39) + SourceIndex(3)
5 >Emitted(93, 39) Source(34, 56) + SourceIndex(3)
6 >Emitted(93, 40) Source(34, 57) + SourceIndex(3)
7 >Emitted(93, 49) Source(34, 66) + SourceIndex(3)
8 >Emitted(93, 50) Source(34, 67) + SourceIndex(3)
---
>>>var internalConst = 10;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^
4 >                 ^^^
5 >                    ^^
6 >                      ^
1 >
  >/*@internal*/ type internalType = internalC;
  >/*@internal*/ 
2 >const 
3 >    internalConst
4 >                  = 
5 >                    10
6 >                      ;
1 >Emitted(94, 1) Source(36, 15) + SourceIndex(3)
2 >Emitted(94, 5) Source(36, 21) + SourceIndex(3)
3 >Emitted(94, 18) Source(36, 34) + SourceIndex(3)
4 >Emitted(94, 21) Source(36, 37) + SourceIndex(3)
5 >Emitted(94, 23) Source(36, 39) + SourceIndex(3)
6 >Emitted(94, 24) Source(36, 40) + SourceIndex(3)
---
>>>var internalEnum;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^
4 >                ^^^^^^^^^^^->
1 >
  >/*@internal*/ 
2 >enum 
3 >    internalEnum { a, b, c }
1 >Emitted(95, 1) Source(37, 15) + SourceIndex(3)
2 >Emitted(95, 5) Source(37, 20) + SourceIndex(3)
3 >Emitted(95, 17) Source(37, 44) + SourceIndex(3)
---
>>>(function (internalEnum) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >enum 
3 >           internalEnum
1->Emitted(96, 1) Source(37, 15) + SourceIndex(3)
2 >Emitted(96, 12) Source(37, 20) + SourceIndex(3)
3 >Emitted(96, 24) Source(37, 32) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1-> { 
2 >    a
3 >                                             
1->Emitted(97, 5) Source(37, 35) + SourceIndex(3)
2 >Emitted(97, 46) Source(37, 36) + SourceIndex(3)
3 >Emitted(97, 47) Source(37, 36) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1->, 
2 >    b
3 >                                             
1->Emitted(98, 5) Source(37, 38) + SourceIndex(3)
2 >Emitted(98, 46) Source(37, 39) + SourceIndex(3)
3 >Emitted(98, 47) Source(37, 39) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
1->, 
2 >    c
3 >                                             
1->Emitted(99, 5) Source(37, 41) + SourceIndex(3)
2 >Emitted(99, 46) Source(37, 42) + SourceIndex(3)
3 >Emitted(99, 47) Source(37, 42) + SourceIndex(3)
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
1 >Emitted(100, 1) Source(37, 43) + SourceIndex(3)
2 >Emitted(100, 2) Source(37, 44) + SourceIndex(3)
3 >Emitted(100, 4) Source(37, 20) + SourceIndex(3)
4 >Emitted(100, 16) Source(37, 32) + SourceIndex(3)
5 >Emitted(100, 21) Source(37, 20) + SourceIndex(3)
6 >Emitted(100, 33) Source(37, 32) + SourceIndex(3)
7 >Emitted(100, 41) Source(37, 44) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(101, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(102, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(103, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(103, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(104, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(104, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(104, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(105, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(105, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(105, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(105, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(105, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(105, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(105, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(105, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(106, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(106, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(107, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(107, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(108, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(108, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(108, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(108, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(109, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(109, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(109, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(109, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(109, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(109, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(109, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(109, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(110, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(110, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(110, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(110, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(110, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(110, 17) Source(2, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":109,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":0,"end":109,"kind":"text"}]},{"pos":109,"end":3162,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":109,"end":3162,"kind":"text"}]},{"pos":3162,"end":3198,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":115,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":115,"kind":"text"}]},{"pos":115,"end":275,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":115,"end":275,"kind":"text"}]},{"pos":275,"end":294,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prepend: (0-109):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-109)
var s = "Hola, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (109-3162):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (109-3162)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var normalC = (function () {
    function normalC() {
    }
    normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        get: function () { return 10; },
        set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    normalN.C = C;
    function foo() { }
    normalN.foo = foo;
    var someNamespace;
    (function (someNamespace) {
        var C = (function () {
            function C() {
            }
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    var someOther;
    (function (someOther) {
        var something;
        (function (something) {
            var someClass = (function () {
                function someClass() {
                }
                return someClass;
            }());
            something.someClass = someClass;
        })(something = someOther.something || (someOther.something = {}));
    })(someOther = normalN.someOther || (normalN.someOther = {}));
    normalN.someImport = someNamespace.C;
    normalN.internalConst = 10;
    var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
var internalC = (function () {
    function internalC() {
    }
    return internalC;
}());
function internalfoo() { }
var internalNamespace;
(function (internalNamespace) {
    var someClass = (function () {
        function someClass() {
        }
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
var internalOther;
(function (internalOther) {
    var something;
    (function (something) {
        var someClass = (function () {
            function someClass() {
            }
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
var internalImport = internalNamespace.someClass;
var internalConst = 10;
var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (3162-3198)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-115):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-115)
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (115-275):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (115-275)
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
text: (275-294)
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
          "end": 109,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 109,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 109,
          "end": 3162,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 109,
              "end": 3162,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 3162,
          "end": 3198,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 115,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 115,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 115,
          "end": 275,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 115,
              "end": 275,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 275,
          "end": 294,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 724
}

