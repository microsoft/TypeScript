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
namespace ts {
    /* @internal */
    /**
     * Subset of properties from SourceFile that are used in multiple utility functions
     */
    export interface SourceFileLike {
        readonly text: string;
        lineMap?: ReadonlyArray<number>;
        /* @internal */
        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
    }

    /* @internal */
    export interface RedirectInfo {
        /** Source file this redirects to. */
        readonly redirectTarget: SourceFile;
        /**
         * Source file for the duplicate package. This will not be used by the Program,
         * but we need to keep this around so we can watch for changes in underlying.
         */
        readonly unredirected: SourceFile;
    }

    // Source files are declarations when they are external modules.
    export interface SourceFile {
        someProp: string;
    }
}interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);


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
    "skipDefaultLibCheck": true,
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


//// [/src/second/second_part2.ts]
class C {
    doSomething() {
        console.log("something got done");
    }
}


//// [/src/second/tsconfig.json]
{
  "compilerOptions": {
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
  "references": [
  ]
}


//// [/src/third/third_part1.ts]
var c = new C();
c.doSomething();


//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "stripInternal": true,
    "outFile": "./thirdjs/output/third-output.js",
    "skipDefaultLibCheck": true,
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
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/2/second-output.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/second/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/thirdjs/output/third-output.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/2/second-output.d.ts]
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd"}

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
2 > ^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(4, 2) Source(11, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.d.ts
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^->
1->
2 >class 
3 >              C
1->Emitted(5, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(5, 15) Source(1, 7) + SourceIndex(1)
3 >Emitted(5, 16) Source(1, 8) + SourceIndex(1)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(6, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(6, 16) Source(2, 16) + SourceIndex(1)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(7, 2) Source(5, 2) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.js]
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
//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

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
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(5, 11) + SourceIndex(0)
3 >Emitted(1, 6) Source(5, 12) + SourceIndex(0)
4 >Emitted(1, 7) Source(11, 2) + SourceIndex(0)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(2, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(2, 12) Source(5, 11) + SourceIndex(0)
3 >Emitted(2, 13) Source(5, 12) + SourceIndex(0)
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
1->Emitted(3, 5) Source(6, 5) + SourceIndex(0)
2 >Emitted(3, 14) Source(6, 14) + SourceIndex(0)
3 >Emitted(3, 15) Source(6, 15) + SourceIndex(0)
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
1->Emitted(4, 9) Source(7, 9) + SourceIndex(0)
2 >Emitted(4, 16) Source(7, 16) + SourceIndex(0)
3 >Emitted(4, 17) Source(7, 17) + SourceIndex(0)
4 >Emitted(4, 20) Source(7, 20) + SourceIndex(0)
5 >Emitted(4, 21) Source(7, 21) + SourceIndex(0)
6 >Emitted(4, 30) Source(7, 30) + SourceIndex(0)
7 >Emitted(4, 31) Source(7, 31) + SourceIndex(0)
8 >Emitted(4, 32) Source(7, 32) + SourceIndex(0)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(5, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(5, 6) Source(8, 6) + SourceIndex(0)
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
1->Emitted(6, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(6, 6) Source(10, 6) + SourceIndex(0)
3 >Emitted(6, 8) Source(10, 8) + SourceIndex(0)
4 >Emitted(6, 9) Source(10, 9) + SourceIndex(0)
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
1->Emitted(7, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(7, 2) Source(11, 2) + SourceIndex(0)
3 >Emitted(7, 4) Source(5, 11) + SourceIndex(0)
4 >Emitted(7, 5) Source(5, 12) + SourceIndex(0)
5 >Emitted(7, 10) Source(5, 11) + SourceIndex(0)
6 >Emitted(7, 11) Source(5, 12) + SourceIndex(0)
7 >Emitted(7, 19) Source(11, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(8, 1) Source(1, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(9, 5) Source(1, 1) + SourceIndex(1)
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
1->Emitted(10, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(10, 6) Source(5, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(11, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(11, 28) Source(2, 16) + SourceIndex(1)
3 >Emitted(11, 31) Source(2, 5) + SourceIndex(1)
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
1->Emitted(12, 9) Source(3, 9) + SourceIndex(1)
2 >Emitted(12, 16) Source(3, 16) + SourceIndex(1)
3 >Emitted(12, 17) Source(3, 17) + SourceIndex(1)
4 >Emitted(12, 20) Source(3, 20) + SourceIndex(1)
5 >Emitted(12, 21) Source(3, 21) + SourceIndex(1)
6 >Emitted(12, 41) Source(3, 41) + SourceIndex(1)
7 >Emitted(12, 42) Source(3, 42) + SourceIndex(1)
8 >Emitted(12, 43) Source(3, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(13, 5) Source(4, 5) + SourceIndex(1)
2 >Emitted(13, 6) Source(4, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(14, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(14, 13) Source(5, 2) + SourceIndex(1)
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
1 >Emitted(15, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(15, 2) Source(5, 2) + SourceIndex(1)
3 >Emitted(15, 2) Source(1, 1) + SourceIndex(1)
4 >Emitted(15, 6) Source(5, 2) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../second","sourceFiles":["../second/second_part1.ts","../second/second_part2.ts"],"js":{"sections":[{"pos":0,"end":285,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":100,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/2/second-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/2/second-output.js
----------------------------------------------------------------------
text: (0-285)
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

======================================================================
======================================================================
File:: /src/2/second-output.d.ts
----------------------------------------------------------------------
text: (0-100)
declare namespace N {
}
declare namespace N {
}
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
          "end": 285,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 100,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 255
}

//// [/src/first/bin/first-output.d.ts]
declare namespace ts {
    interface SourceFileLike {
        readonly text: string;
        lineMap?: ReadonlyArray<number>;
        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
    }
    interface RedirectInfo {
        readonly redirectTarget: SourceFile;
        readonly unredirected: SourceFile;
    }
    interface SourceFile {
        someProp: string;
    }
}
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,kBAAU,EAAE,CAAC;IAKT,UAAiB,cAAc;QAC3B,QAAQ,CAAC,IAAI,EAAE,MAAM,CAAC;QACtB,OAAO,CAAC,EAAE,aAAa,CAAC,MAAM,CAAC,CAAC;QAEhC,6BAA6B,CAAC,CAAC,IAAI,EAAE,MAAM,EAAE,SAAS,EAAE,MAAM,EAAE,UAAU,CAAC,EAAE,IAAI,GAAG,MAAM,CAAC;KAC9F;IAGD,UAAiB,YAAY;QAEzB,QAAQ,CAAC,cAAc,EAAE,UAAU,CAAC;QAKpC,QAAQ,CAAC,YAAY,EAAE,UAAU,CAAC;KACrC;IAGD,UAAiB,UAAU;QACvB,QAAQ,EAAE,MAAM,CAAC;KACpB;CACJ;AAAA,UAAU,QAAQ;IACf,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AEnCD,iBAAS,CAAC,WAET"}

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
>>>declare namespace ts {
1 >
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^
4 >                    ^
5 >                     ^^^^^^^^^^->
1 >
2 >namespace 
3 >                  ts
4 >                     
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 19) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 21) Source(1, 13) + SourceIndex(0)
4 >Emitted(1, 22) Source(1, 14) + SourceIndex(0)
---
>>>    interface SourceFileLike {
1->^^^^
2 >    ^^^^^^^^^^
3 >              ^^^^^^^^^^^^^^
4 >                            ^^^->
1->{
  >    /* @internal */
  >    /**
  >     * Subset of properties from SourceFile that are used in multiple utility functions
  >     */
  >    
2 >    export interface 
3 >              SourceFileLike
1->Emitted(2, 5) Source(6, 5) + SourceIndex(0)
2 >Emitted(2, 15) Source(6, 22) + SourceIndex(0)
3 >Emitted(2, 29) Source(6, 36) + SourceIndex(0)
---
>>>        readonly text: string;
1->^^^^^^^^
2 >        ^^^^^^^^
3 >                ^
4 >                 ^^^^
5 >                     ^^
6 >                       ^^^^^^
7 >                             ^
8 >                              ^^^^^^^^^^^->
1-> {
  >        
2 >        readonly
3 >                 
4 >                 text
5 >                     : 
6 >                       string
7 >                             ;
1->Emitted(3, 9) Source(7, 9) + SourceIndex(0)
2 >Emitted(3, 17) Source(7, 17) + SourceIndex(0)
3 >Emitted(3, 18) Source(7, 18) + SourceIndex(0)
4 >Emitted(3, 22) Source(7, 22) + SourceIndex(0)
5 >Emitted(3, 24) Source(7, 24) + SourceIndex(0)
6 >Emitted(3, 30) Source(7, 30) + SourceIndex(0)
7 >Emitted(3, 31) Source(7, 31) + SourceIndex(0)
---
>>>        lineMap?: ReadonlyArray<number>;
1->^^^^^^^^
2 >        ^^^^^^^
3 >               ^
4 >                ^^
5 >                  ^^^^^^^^^^^^^
6 >                               ^
7 >                                ^^^^^^
8 >                                      ^
9 >                                       ^
10>                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >        
2 >        lineMap
3 >               ?
4 >                : 
5 >                  ReadonlyArray
6 >                               <
7 >                                number
8 >                                      >
9 >                                       ;
1->Emitted(4, 9) Source(8, 9) + SourceIndex(0)
2 >Emitted(4, 16) Source(8, 16) + SourceIndex(0)
3 >Emitted(4, 17) Source(8, 17) + SourceIndex(0)
4 >Emitted(4, 19) Source(8, 19) + SourceIndex(0)
5 >Emitted(4, 32) Source(8, 32) + SourceIndex(0)
6 >Emitted(4, 33) Source(8, 33) + SourceIndex(0)
7 >Emitted(4, 39) Source(8, 39) + SourceIndex(0)
8 >Emitted(4, 40) Source(8, 40) + SourceIndex(0)
9 >Emitted(4, 41) Source(8, 41) + SourceIndex(0)
---
>>>        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                     ^
4 >                                      ^
5 >                                       ^^^^
6 >                                           ^^
7 >                                             ^^^^^^
8 >                                                   ^^
9 >                                                     ^^^^^^^^^
10>                                                              ^^
11>                                                                ^^^^^^
12>                                                                      ^^
13>                                                                        ^^^^^^^^^^
14>                                                                                  ^
15>                                                                                   ^^
16>                                                                                     ^^^^
17>                                                                                         ^^^
18>                                                                                            ^^^^^^
19>                                                                                                  ^
1->
  >        /* @internal */
  >        
2 >        getPositionOfLineAndCharacter
3 >                                     ?
4 >                                      (
5 >                                       line
6 >                                           : 
7 >                                             number
8 >                                                   , 
9 >                                                     character
10>                                                              : 
11>                                                                number
12>                                                                      , 
13>                                                                        allowEdits
14>                                                                                  ?
15>                                                                                   : 
16>                                                                                     true
17>                                                                                         ): 
18>                                                                                            number
19>                                                                                                  ;
1->Emitted(5, 9) Source(10, 9) + SourceIndex(0)
2 >Emitted(5, 38) Source(10, 38) + SourceIndex(0)
3 >Emitted(5, 39) Source(10, 39) + SourceIndex(0)
4 >Emitted(5, 40) Source(10, 40) + SourceIndex(0)
5 >Emitted(5, 44) Source(10, 44) + SourceIndex(0)
6 >Emitted(5, 46) Source(10, 46) + SourceIndex(0)
7 >Emitted(5, 52) Source(10, 52) + SourceIndex(0)
8 >Emitted(5, 54) Source(10, 54) + SourceIndex(0)
9 >Emitted(5, 63) Source(10, 63) + SourceIndex(0)
10>Emitted(5, 65) Source(10, 65) + SourceIndex(0)
11>Emitted(5, 71) Source(10, 71) + SourceIndex(0)
12>Emitted(5, 73) Source(10, 73) + SourceIndex(0)
13>Emitted(5, 83) Source(10, 83) + SourceIndex(0)
14>Emitted(5, 84) Source(10, 84) + SourceIndex(0)
15>Emitted(5, 86) Source(10, 86) + SourceIndex(0)
16>Emitted(5, 90) Source(10, 90) + SourceIndex(0)
17>Emitted(5, 93) Source(10, 93) + SourceIndex(0)
18>Emitted(5, 99) Source(10, 99) + SourceIndex(0)
19>Emitted(5, 100) Source(10, 100) + SourceIndex(0)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >    }
1 >Emitted(6, 6) Source(11, 6) + SourceIndex(0)
---
>>>    interface RedirectInfo {
1->^^^^
2 >    ^^^^^^^^^^
3 >              ^^^^^^^^^^^^
4 >                          ^^^^^^^^^^^^^^^^^^^->
1->
  >
  >    /* @internal */
  >    
2 >    export interface 
3 >              RedirectInfo
1->Emitted(7, 5) Source(14, 5) + SourceIndex(0)
2 >Emitted(7, 15) Source(14, 22) + SourceIndex(0)
3 >Emitted(7, 27) Source(14, 34) + SourceIndex(0)
---
>>>        readonly redirectTarget: SourceFile;
1->^^^^^^^^
2 >        ^^^^^^^^
3 >                ^
4 >                 ^^^^^^^^^^^^^^
5 >                               ^^
6 >                                 ^^^^^^^^^^
7 >                                           ^
1-> {
  >        /** Source file this redirects to. */
  >        
2 >        readonly
3 >                 
4 >                 redirectTarget
5 >                               : 
6 >                                 SourceFile
7 >                                           ;
1->Emitted(8, 9) Source(16, 9) + SourceIndex(0)
2 >Emitted(8, 17) Source(16, 17) + SourceIndex(0)
3 >Emitted(8, 18) Source(16, 18) + SourceIndex(0)
4 >Emitted(8, 32) Source(16, 32) + SourceIndex(0)
5 >Emitted(8, 34) Source(16, 34) + SourceIndex(0)
6 >Emitted(8, 44) Source(16, 44) + SourceIndex(0)
7 >Emitted(8, 45) Source(16, 45) + SourceIndex(0)
---
>>>        readonly unredirected: SourceFile;
1 >^^^^^^^^
2 >        ^^^^^^^^
3 >                ^
4 >                 ^^^^^^^^^^^^
5 >                             ^^
6 >                               ^^^^^^^^^^
7 >                                         ^
1 >
  >        /**
  >         * Source file for the duplicate package. This will not be used by the Program,
  >         * but we need to keep this around so we can watch for changes in underlying.
  >         */
  >        
2 >        readonly
3 >                 
4 >                 unredirected
5 >                             : 
6 >                               SourceFile
7 >                                         ;
1 >Emitted(9, 9) Source(21, 9) + SourceIndex(0)
2 >Emitted(9, 17) Source(21, 17) + SourceIndex(0)
3 >Emitted(9, 18) Source(21, 18) + SourceIndex(0)
4 >Emitted(9, 30) Source(21, 30) + SourceIndex(0)
5 >Emitted(9, 32) Source(21, 32) + SourceIndex(0)
6 >Emitted(9, 42) Source(21, 42) + SourceIndex(0)
7 >Emitted(9, 43) Source(21, 43) + SourceIndex(0)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >    }
1 >Emitted(10, 6) Source(22, 6) + SourceIndex(0)
---
>>>    interface SourceFile {
1->^^^^
2 >    ^^^^^^^^^^
3 >              ^^^^^^^^^^
4 >                        ^^->
1->
  >
  >    // Source files are declarations when they are external modules.
  >    
2 >    export interface 
3 >              SourceFile
1->Emitted(11, 5) Source(25, 5) + SourceIndex(0)
2 >Emitted(11, 15) Source(25, 22) + SourceIndex(0)
3 >Emitted(11, 25) Source(25, 32) + SourceIndex(0)
---
>>>        someProp: string;
1->^^^^^^^^
2 >        ^^^^^^^^
3 >                ^^
4 >                  ^^^^^^
5 >                        ^
1-> {
  >        
2 >        someProp
3 >                : 
4 >                  string
5 >                        ;
1->Emitted(12, 9) Source(26, 9) + SourceIndex(0)
2 >Emitted(12, 17) Source(26, 17) + SourceIndex(0)
3 >Emitted(12, 19) Source(26, 19) + SourceIndex(0)
4 >Emitted(12, 25) Source(26, 25) + SourceIndex(0)
5 >Emitted(12, 26) Source(26, 26) + SourceIndex(0)
---
>>>    }
1 >^^^^^
1 >
  >    }
1 >Emitted(13, 6) Source(27, 6) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(14, 2) Source(28, 2) + SourceIndex(0)
---
>>>interface TheFirst {
1->
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1->
2 >interface 
3 >          TheFirst
1->Emitted(15, 1) Source(28, 2) + SourceIndex(0)
2 >Emitted(15, 11) Source(28, 12) + SourceIndex(0)
3 >Emitted(15, 19) Source(28, 20) + SourceIndex(0)
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
1 >Emitted(16, 5) Source(29, 5) + SourceIndex(0)
2 >Emitted(16, 9) Source(29, 9) + SourceIndex(0)
3 >Emitted(16, 11) Source(29, 11) + SourceIndex(0)
4 >Emitted(16, 14) Source(29, 14) + SourceIndex(0)
5 >Emitted(16, 15) Source(29, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(17, 2) Source(30, 2) + SourceIndex(0)
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
1->Emitted(18, 1) Source(32, 1) + SourceIndex(0)
2 >Emitted(18, 9) Source(32, 1) + SourceIndex(0)
3 >Emitted(18, 15) Source(32, 7) + SourceIndex(0)
4 >Emitted(18, 16) Source(32, 8) + SourceIndex(0)
5 >Emitted(18, 33) Source(32, 25) + SourceIndex(0)
6 >Emitted(18, 34) Source(32, 26) + SourceIndex(0)
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
1 >Emitted(19, 1) Source(34, 1) + SourceIndex(0)
2 >Emitted(19, 11) Source(34, 11) + SourceIndex(0)
3 >Emitted(19, 28) Source(34, 28) + SourceIndex(0)
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
1 >Emitted(20, 5) Source(35, 5) + SourceIndex(0)
2 >Emitted(20, 9) Source(35, 9) + SourceIndex(0)
3 >Emitted(20, 11) Source(35, 11) + SourceIndex(0)
4 >Emitted(20, 14) Source(35, 14) + SourceIndex(0)
5 >Emitted(20, 15) Source(35, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(21, 2) Source(36, 2) + SourceIndex(0)
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
1->Emitted(22, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(22, 18) Source(1, 10) + SourceIndex(2)
3 >Emitted(22, 19) Source(1, 11) + SourceIndex(2)
4 >Emitted(22, 30) Source(3, 2) + SourceIndex(2)
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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AA+BA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACrCf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
1 >namespace ts {
  >    /* @internal */
  >    /**
  >     * Subset of properties from SourceFile that are used in multiple utility functions
  >     */
  >    export interface SourceFileLike {
  >        readonly text: string;
  >        lineMap?: ReadonlyArray<number>;
  >        /* @internal */
  >        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
  >    }
  >
  >    /* @internal */
  >    export interface RedirectInfo {
  >        /** Source file this redirects to. */
  >        readonly redirectTarget: SourceFile;
  >        /**
  >         * Source file for the duplicate package. This will not be used by the Program,
  >         * but we need to keep this around so we can watch for changes in underlying.
  >         */
  >        readonly unredirected: SourceFile;
  >    }
  >
  >    // Source files are declarations when they are external modules.
  >    export interface SourceFile {
  >        someProp: string;
  >    }
  >}interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(1, 1) Source(32, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(32, 7) + SourceIndex(0)
3 >Emitted(1, 6) Source(32, 8) + SourceIndex(0)
4 >Emitted(1, 9) Source(32, 11) + SourceIndex(0)
5 >Emitted(1, 23) Source(32, 25) + SourceIndex(0)
6 >Emitted(1, 24) Source(32, 26) + SourceIndex(0)
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
1 >Emitted(2, 1) Source(38, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(38, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(38, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(38, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(38, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(38, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(38, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(38, 16) + SourceIndex(0)
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":110,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":24,"kind":"text"},{"pos":24,"end":363,"kind":"internal"},{"pos":365,"end":587,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-110)
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
text: (0-24)
declare namespace ts {

----------------------------------------------------------------------
internal: (24-363)
    interface SourceFileLike {
        readonly text: string;
        lineMap?: ReadonlyArray<number>;
        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
    }
    interface RedirectInfo {
        readonly redirectTarget: SourceFile;
        readonly unredirected: SourceFile;
    }
----------------------------------------------------------------------
text: (365-587)
    interface SourceFile {
        someProp: string;
    }
}
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
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
          "end": 110,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 24,
          "kind": "text"
        },
        {
          "pos": 24,
          "end": 363,
          "kind": "internal"
        },
        {
          "pos": 365,
          "end": 587,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 326
}

//// [/src/third/thirdjs/output/third-output.d.ts]
declare namespace ts {
    interface SourceFile {
        someProp: string;
    }
}
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
declare class C {
    doSomething(): void;
}
declare var c: C;
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,kBAAU,EAAE,CAAC;IAwBT,UAAiB,UAAU;QACvB,QAAQ,EAAE,MAAM,CAAC;KACpB;CACJ;AAAA,UAAU,QAAQ;IACf,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACnCD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
>>>declare namespace ts {
1 >
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^
4 >                    ^
5 >                     ^^^^^^->
1 >
2 >namespace 
3 >                  ts
4 >                     
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 19) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 21) Source(1, 13) + SourceIndex(0)
4 >Emitted(1, 22) Source(1, 14) + SourceIndex(0)
---
>>>    interface SourceFile {
1->^^^^
2 >    ^^^^^^^^^^
3 >              ^^^^^^^^^^
4 >                        ^^->
1->{
  >    /* @internal */
  >    /**
  >     * Subset of properties from SourceFile that are used in multiple utility functions
  >     */
  >    export interface SourceFileLike {
  >        readonly text: string;
  >        lineMap?: ReadonlyArray<number>;
  >        /* @internal */
  >        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
  >    }
  >
  >    /* @internal */
  >    export interface RedirectInfo {
  >        /** Source file this redirects to. */
  >        readonly redirectTarget: SourceFile;
  >        /**
  >         * Source file for the duplicate package. This will not be used by the Program,
  >         * but we need to keep this around so we can watch for changes in underlying.
  >         */
  >        readonly unredirected: SourceFile;
  >    }
  >
  >    // Source files are declarations when they are external modules.
  >    
2 >    export interface 
3 >              SourceFile
1->Emitted(2, 5) Source(25, 5) + SourceIndex(0)
2 >Emitted(2, 15) Source(25, 22) + SourceIndex(0)
3 >Emitted(2, 25) Source(25, 32) + SourceIndex(0)
---
>>>        someProp: string;
1->^^^^^^^^
2 >        ^^^^^^^^
3 >                ^^
4 >                  ^^^^^^
5 >                        ^
1-> {
  >        
2 >        someProp
3 >                : 
4 >                  string
5 >                        ;
1->Emitted(3, 9) Source(26, 9) + SourceIndex(0)
2 >Emitted(3, 17) Source(26, 17) + SourceIndex(0)
3 >Emitted(3, 19) Source(26, 19) + SourceIndex(0)
4 >Emitted(3, 25) Source(26, 25) + SourceIndex(0)
5 >Emitted(3, 26) Source(26, 26) + SourceIndex(0)
---
>>>    }
1 >^^^^^
1 >
  >    }
1 >Emitted(4, 6) Source(27, 6) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(5, 2) Source(28, 2) + SourceIndex(0)
---
>>>interface TheFirst {
1->
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1->
2 >interface 
3 >          TheFirst
1->Emitted(6, 1) Source(28, 2) + SourceIndex(0)
2 >Emitted(6, 11) Source(28, 12) + SourceIndex(0)
3 >Emitted(6, 19) Source(28, 20) + SourceIndex(0)
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
1 >Emitted(7, 5) Source(29, 5) + SourceIndex(0)
2 >Emitted(7, 9) Source(29, 9) + SourceIndex(0)
3 >Emitted(7, 11) Source(29, 11) + SourceIndex(0)
4 >Emitted(7, 14) Source(29, 14) + SourceIndex(0)
5 >Emitted(7, 15) Source(29, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(8, 2) Source(30, 2) + SourceIndex(0)
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
1->Emitted(9, 1) Source(32, 1) + SourceIndex(0)
2 >Emitted(9, 9) Source(32, 1) + SourceIndex(0)
3 >Emitted(9, 15) Source(32, 7) + SourceIndex(0)
4 >Emitted(9, 16) Source(32, 8) + SourceIndex(0)
5 >Emitted(9, 33) Source(32, 25) + SourceIndex(0)
6 >Emitted(9, 34) Source(32, 26) + SourceIndex(0)
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
1 >Emitted(10, 1) Source(34, 1) + SourceIndex(0)
2 >Emitted(10, 11) Source(34, 11) + SourceIndex(0)
3 >Emitted(10, 28) Source(34, 28) + SourceIndex(0)
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
1 >Emitted(11, 5) Source(35, 5) + SourceIndex(0)
2 >Emitted(11, 9) Source(35, 9) + SourceIndex(0)
3 >Emitted(11, 11) Source(35, 11) + SourceIndex(0)
4 >Emitted(11, 14) Source(35, 14) + SourceIndex(0)
5 >Emitted(11, 15) Source(35, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(12, 2) Source(36, 2) + SourceIndex(0)
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
1->Emitted(13, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(13, 18) Source(1, 10) + SourceIndex(1)
3 >Emitted(13, 19) Source(1, 11) + SourceIndex(1)
4 >Emitted(13, 30) Source(3, 2) + SourceIndex(1)
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
1 >Emitted(14, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(14, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(14, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(14, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(15, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(16, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(16, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(16, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(16, 21) Source(5, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(17, 2) Source(11, 2) + SourceIndex(2)
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
1->Emitted(18, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(18, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(18, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(19, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(19, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(20, 2) Source(5, 2) + SourceIndex(3)
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
1->Emitted(21, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(21, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(21, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(21, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(21, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(21, 18) Source(1, 17) + SourceIndex(4)
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AA+BA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACrCf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
1 >namespace ts {
  >    /* @internal */
  >    /**
  >     * Subset of properties from SourceFile that are used in multiple utility functions
  >     */
  >    export interface SourceFileLike {
  >        readonly text: string;
  >        lineMap?: ReadonlyArray<number>;
  >        /* @internal */
  >        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
  >    }
  >
  >    /* @internal */
  >    export interface RedirectInfo {
  >        /** Source file this redirects to. */
  >        readonly redirectTarget: SourceFile;
  >        /**
  >         * Source file for the duplicate package. This will not be used by the Program,
  >         * but we need to keep this around so we can watch for changes in underlying.
  >         */
  >        readonly unredirected: SourceFile;
  >    }
  >
  >    // Source files are declarations when they are external modules.
  >    export interface SourceFile {
  >        someProp: string;
  >    }
  >}interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(1, 1) Source(32, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(32, 7) + SourceIndex(0)
3 >Emitted(1, 6) Source(32, 8) + SourceIndex(0)
4 >Emitted(1, 9) Source(32, 11) + SourceIndex(0)
5 >Emitted(1, 23) Source(32, 25) + SourceIndex(0)
6 >Emitted(1, 24) Source(32, 26) + SourceIndex(0)
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
1 >Emitted(2, 1) Source(38, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(38, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(38, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(38, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(38, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(38, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(38, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(38, 16) + SourceIndex(0)
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
1->Emitted(13, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(13, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(13, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(13, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(13, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(13, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(13, 19) Source(11, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(14, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(15, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(16, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(16, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(17, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(17, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(17, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(18, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(18, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(18, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(18, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(18, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(18, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(18, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(18, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(19, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(19, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(20, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(20, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(21, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(21, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(21, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(21, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(22, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(22, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(22, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(22, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(22, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(22, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(22, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(22, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(23, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(23, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(23, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(23, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(23, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(23, 17) Source(2, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":110,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":0,"end":110,"kind":"text"}]},{"pos":110,"end":395,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":110,"end":395,"kind":"text"}]},{"pos":395,"end":431,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":246,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":246,"kind":"text"}]},{"pos":246,"end":346,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":246,"end":346,"kind":"text"}]},{"pos":346,"end":365,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prepend: (0-110):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-110)
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (110-395):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (110-395)
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
text: (395-431)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-246):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-246)
declare namespace ts {
    interface SourceFile {
        someProp: string;
    }
}
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (246-346):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (246-346)
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (346-365)
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
          "end": 110,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 110,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 110,
          "end": 395,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 110,
              "end": 395,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 395,
          "end": 431,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 246,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 246,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 246,
          "end": 346,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 246,
              "end": 346,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 346,
          "end": 365,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 720
}

