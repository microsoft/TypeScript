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
"myPrologue"
interface TheFirst {
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
    "strict": true,
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
"myPrologue"
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
"myPrologue2";
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
    "strict": true,
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
"myPrologue3";
"myPrologue";
var c = new C();
c.doSomething();


//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": true,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
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
[[90m12:00:14 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:15 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.tsbuildinfo' does not exist

[[90m12:00:16 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:00:26 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/2/second-output.tsbuildinfo' does not exist

[[90m12:00:27 AM[0m] Building project '/src/second/tsconfig.json'...

[[90m12:00:37 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/thirdjs/output/third-output.tsbuildinfo' does not exist

[[90m12:00:38 AM[0m] Building project '/src/third/tsconfig.json'...

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
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AACA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd"}

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
1 >"myPrologue"
  >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(1, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(1, 19) Source(2, 11) + SourceIndex(0)
3 >Emitted(1, 20) Source(2, 12) + SourceIndex(0)
4 >Emitted(1, 21) Source(2, 13) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(2, 2) Source(4, 2) + SourceIndex(0)
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
1->Emitted(3, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(3, 19) Source(6, 11) + SourceIndex(0)
3 >Emitted(3, 20) Source(6, 12) + SourceIndex(0)
4 >Emitted(3, 21) Source(6, 13) + SourceIndex(0)
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
1 >Emitted(4, 2) Source(12, 2) + SourceIndex(0)
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
1->"myPrologue2";
  >
2 >class 
3 >              C
1->Emitted(5, 1) Source(2, 1) + SourceIndex(1)
2 >Emitted(5, 15) Source(2, 7) + SourceIndex(1)
3 >Emitted(5, 16) Source(2, 8) + SourceIndex(1)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(6, 5) Source(3, 5) + SourceIndex(1)
2 >Emitted(6, 16) Source(3, 16) + SourceIndex(1)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(7, 2) Source(6, 2) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.js]
"use strict";
"myPrologue";
"myPrologue2";
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
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ADKd,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

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
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>"myPrologue2";
1->
2 >^^^^^^^^^^^^^
3 >             ^
1->
2 >"myPrologue2"
3 >             ;
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
3 >Emitted(3, 15) Source(1, 15) + SourceIndex(1)
---
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
1 >"myPrologue"
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
1 >Emitted(4, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(4, 5) Source(6, 11) + SourceIndex(0)
3 >Emitted(4, 6) Source(6, 12) + SourceIndex(0)
4 >Emitted(4, 7) Source(12, 2) + SourceIndex(0)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(5, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(5, 12) Source(6, 11) + SourceIndex(0)
3 >Emitted(5, 13) Source(6, 12) + SourceIndex(0)
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
1->Emitted(6, 5) Source(7, 5) + SourceIndex(0)
2 >Emitted(6, 14) Source(7, 14) + SourceIndex(0)
3 >Emitted(6, 15) Source(7, 15) + SourceIndex(0)
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
1->Emitted(7, 9) Source(8, 9) + SourceIndex(0)
2 >Emitted(7, 16) Source(8, 16) + SourceIndex(0)
3 >Emitted(7, 17) Source(8, 17) + SourceIndex(0)
4 >Emitted(7, 20) Source(8, 20) + SourceIndex(0)
5 >Emitted(7, 21) Source(8, 21) + SourceIndex(0)
6 >Emitted(7, 30) Source(8, 30) + SourceIndex(0)
7 >Emitted(7, 31) Source(8, 31) + SourceIndex(0)
8 >Emitted(7, 32) Source(8, 32) + SourceIndex(0)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(8, 5) Source(9, 5) + SourceIndex(0)
2 >Emitted(8, 6) Source(9, 6) + SourceIndex(0)
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
1->Emitted(9, 5) Source(11, 5) + SourceIndex(0)
2 >Emitted(9, 6) Source(11, 6) + SourceIndex(0)
3 >Emitted(9, 8) Source(11, 8) + SourceIndex(0)
4 >Emitted(9, 9) Source(11, 9) + SourceIndex(0)
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
1->Emitted(10, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(10, 2) Source(12, 2) + SourceIndex(0)
3 >Emitted(10, 4) Source(6, 11) + SourceIndex(0)
4 >Emitted(10, 5) Source(6, 12) + SourceIndex(0)
5 >Emitted(10, 10) Source(6, 11) + SourceIndex(0)
6 >Emitted(10, 11) Source(6, 12) + SourceIndex(0)
7 >Emitted(10, 19) Source(12, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->"myPrologue2";
  >
1->Emitted(11, 1) Source(2, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(12, 5) Source(2, 1) + SourceIndex(1)
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
1->Emitted(13, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(13, 6) Source(6, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(14, 5) Source(3, 5) + SourceIndex(1)
2 >Emitted(14, 28) Source(3, 16) + SourceIndex(1)
3 >Emitted(14, 31) Source(3, 5) + SourceIndex(1)
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
1->Emitted(15, 9) Source(4, 9) + SourceIndex(1)
2 >Emitted(15, 16) Source(4, 16) + SourceIndex(1)
3 >Emitted(15, 17) Source(4, 17) + SourceIndex(1)
4 >Emitted(15, 20) Source(4, 20) + SourceIndex(1)
5 >Emitted(15, 21) Source(4, 21) + SourceIndex(1)
6 >Emitted(15, 41) Source(4, 41) + SourceIndex(1)
7 >Emitted(15, 42) Source(4, 42) + SourceIndex(1)
8 >Emitted(15, 43) Source(4, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(16, 5) Source(5, 5) + SourceIndex(1)
2 >Emitted(16, 6) Source(5, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(17, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(17, 13) Source(6, 2) + SourceIndex(1)
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
1 >Emitted(18, 1) Source(6, 1) + SourceIndex(1)
2 >Emitted(18, 2) Source(6, 2) + SourceIndex(1)
3 >Emitted(18, 2) Source(2, 1) + SourceIndex(1)
4 >Emitted(18, 6) Source(6, 2) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../second","sourceFiles":["../second/second_part1.ts","../second/second_part2.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":28,"kind":"prologue","data":"myPrologue"},{"pos":30,"end":44,"kind":"prologue","data":"myPrologue2"},{"pos":46,"end":331,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"\"myPrologue\"","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":12,"expression":{"pos":0,"end":12,"text":"myPrologue"}}]},{"file":1,"text":"\"myPrologue2\";","directives":[{"pos":0,"end":14,"expression":{"pos":0,"end":13,"text":"myPrologue2"}}]}]},"mapHash":"-3048025768-{\"version\":3,\"file\":\"second-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ADKd,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC\"}","hash":"1999145944-\"use strict\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\n//# sourceMappingURL=second-output.js.map"},"dts":{"sections":[{"pos":0,"end":100,"kind":"text"}],"mapHash":"10908638301-{\"version\":3,\"file\":\"second-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\"AACA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd\"}","hash":"7752788385-declare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\n//# sourceMappingURL=second-output.d.ts.map"}},"program":{"fileNames":["../second/second_part1.ts","../second/second_part2.ts"],"fileInfos":["-5295626911-\"myPrologue\"\nnamespace N {\r\n    // Comment text\r\n}\r\n\r\nnamespace N {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n\r\n    f();\r\n}\r\n","18749993618-\"myPrologue2\";\nclass C {\r\n    doSomething() {\r\n        console.log(\"something got done\");\r\n    }\r\n}\r\n"],"options":{"composite":true,"outFile":"./second-output.js"},"outSignature":"7003440774-declare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\n","latestChangedDtsFile":"./second-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/2/second-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/2/second-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
prologue: (30-44):: myPrologue2
"myPrologue2";
----------------------------------------------------------------------
text: (46-331)
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 44,
          "kind": "prologue",
          "data": "myPrologue2"
        },
        {
          "pos": 46,
          "end": 331,
          "kind": "text"
        }
      ],
      "hash": "1999145944-\"use strict\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\n//# sourceMappingURL=second-output.js.map",
      "mapHash": "-3048025768-{\"version\":3,\"file\":\"second-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ADKd,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue\"",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 12,
                "expression": {
                  "pos": 0,
                  "end": 12,
                  "text": "myPrologue"
                }
              }
            ]
          },
          {
            "file": 1,
            "text": "\"myPrologue2\";",
            "directives": [
              {
                "pos": 0,
                "end": 14,
                "expression": {
                  "pos": 0,
                  "end": 13,
                  "text": "myPrologue2"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 100,
          "kind": "text"
        }
      ],
      "hash": "7752788385-declare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\n//# sourceMappingURL=second-output.d.ts.map",
      "mapHash": "10908638301-{\"version\":3,\"file\":\"second-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\"AACA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd\"}"
    }
  },
  "program": {
    "fileNames": [
      "../second/second_part1.ts",
      "../second/second_part2.ts"
    ],
    "fileInfos": {
      "../second/second_part1.ts": "-5295626911-\"myPrologue\"\nnamespace N {\r\n    // Comment text\r\n}\r\n\r\nnamespace N {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n\r\n    f();\r\n}\r\n",
      "../second/second_part2.ts": "18749993618-\"myPrologue2\";\nclass C {\r\n    doSomething() {\r\n        console.log(\"something got done\");\r\n    }\r\n}\r\n"
    },
    "options": {
      "composite": true,
      "outFile": "./second-output.js"
    },
    "outSignature": "7003440774-declare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\n",
    "latestChangedDtsFile": "./second-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2827
}

//// [/src/first/bin/first-output.d.ts]
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
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET"}

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
1 >"myPrologue"
  >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(2, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(2, 19) + SourceIndex(0)
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
1 >Emitted(2, 5) Source(3, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(3, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(3, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(3, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(3, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(4, 2) + SourceIndex(0)
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
1->Emitted(4, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(6, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(6, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(6, 8) + SourceIndex(0)
5 >Emitted(4, 33) Source(6, 25) + SourceIndex(0)
6 >Emitted(4, 34) Source(6, 26) + SourceIndex(0)
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
1 >Emitted(5, 1) Source(8, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(8, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(8, 28) + SourceIndex(0)
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
1 >Emitted(6, 5) Source(9, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(9, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(9, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(9, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(9, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(10, 2) + SourceIndex(0)
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
"use strict";
"myPrologue";
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^^^^^^^^^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
>>>var s = "Hello, world";
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1->
  >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1->Emitted(3, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(3, 5) Source(6, 7) + SourceIndex(0)
3 >Emitted(3, 6) Source(6, 8) + SourceIndex(0)
4 >Emitted(3, 9) Source(6, 11) + SourceIndex(0)
5 >Emitted(3, 23) Source(6, 25) + SourceIndex(0)
6 >Emitted(3, 24) Source(6, 26) + SourceIndex(0)
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
1 >Emitted(4, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(12, 16) + SourceIndex(0)
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":28,"kind":"prologue","data":"myPrologue"},{"pos":30,"end":140,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"\"myPrologue\"","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":12,"expression":{"pos":0,"end":12,"text":"myPrologue"}}]}]},"mapHash":"-16462635350-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"816706653-\"use strict\";\r\n\"myPrologue\";\r\nvar s = \"Hello, world\";\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":157,"kind":"text"}],"mapHash":"18068494155-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET\"}","hash":"-23350520794-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hello, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["31392936222-\"myPrologue\"\ninterface TheFirst {\r\n    none: any;\r\n}\r\n\r\nconst s = \"Hello, world\";\r\n\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\n\r\nconsole.log(s);\r\n","4973778178-console.log(f());\r\n","6202806249-function f() {\r\n    return \"JS does hoists\";\r\n}"],"options":{"composite":true,"outFile":"./first-output.js"},"outSignature":"-16746818465-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hello, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
text: (30-140)
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 140,
          "kind": "text"
        }
      ],
      "hash": "816706653-\"use strict\";\r\n\"myPrologue\";\r\nvar s = \"Hello, world\";\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-16462635350-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue\"",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 12,
                "expression": {
                  "pos": 0,
                  "end": 12,
                  "text": "myPrologue"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 157,
          "kind": "text"
        }
      ],
      "hash": "-23350520794-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hello, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "18068494155-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET\"}"
    }
  },
  "program": {
    "fileNames": [
      "../first_part1.ts",
      "../first_part2.ts",
      "../first_part3.ts"
    ],
    "fileInfos": {
      "../first_part1.ts": "31392936222-\"myPrologue\"\ninterface TheFirst {\r\n    none: any;\r\n}\r\n\r\nconst s = \"Hello, world\";\r\n\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\n\r\nconsole.log(s);\r\n",
      "../first_part2.ts": "4973778178-console.log(f());\r\n",
      "../first_part3.ts": "6202806249-function f() {\r\n    return \"JS does hoists\";\r\n}"
    },
    "options": {
      "composite": true,
      "outFile": "./first-output.js"
    },
    "outSignature": "-16746818465-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hello, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2489
}

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
declare class C {
    doSomething(): void;
}
declare var c: C;
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
1 >"myPrologue"
  >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(2, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(2, 19) + SourceIndex(0)
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
1 >Emitted(2, 5) Source(3, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(3, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(3, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(3, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(3, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(4, 2) + SourceIndex(0)
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
1->Emitted(4, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(6, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(6, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(6, 8) + SourceIndex(0)
5 >Emitted(4, 33) Source(6, 25) + SourceIndex(0)
6 >Emitted(4, 34) Source(6, 26) + SourceIndex(0)
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
1 >Emitted(5, 1) Source(8, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(8, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(8, 28) + SourceIndex(0)
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
1 >Emitted(6, 5) Source(9, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(9, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(9, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(9, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(9, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(10, 2) + SourceIndex(0)
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
1 >"myPrologue"
  >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(9, 1) Source(2, 1) + SourceIndex(2)
2 >Emitted(9, 19) Source(2, 11) + SourceIndex(2)
3 >Emitted(9, 20) Source(2, 12) + SourceIndex(2)
4 >Emitted(9, 21) Source(2, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(10, 2) Source(4, 2) + SourceIndex(2)
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
1->Emitted(11, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(11, 19) Source(6, 11) + SourceIndex(2)
3 >Emitted(11, 20) Source(6, 12) + SourceIndex(2)
4 >Emitted(11, 21) Source(6, 13) + SourceIndex(2)
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
1 >Emitted(12, 2) Source(12, 2) + SourceIndex(2)
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
1->"myPrologue2";
  >
2 >class 
3 >              C
1->Emitted(13, 1) Source(2, 1) + SourceIndex(3)
2 >Emitted(13, 15) Source(2, 7) + SourceIndex(3)
3 >Emitted(13, 16) Source(2, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(14, 5) Source(3, 5) + SourceIndex(3)
2 >Emitted(14, 16) Source(3, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(15, 2) Source(6, 2) + SourceIndex(3)
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
1->"myPrologue3";
  >"myPrologue";
  >
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1->Emitted(16, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(16, 9) Source(3, 1) + SourceIndex(4)
3 >Emitted(16, 13) Source(3, 5) + SourceIndex(4)
4 >Emitted(16, 14) Source(3, 6) + SourceIndex(4)
5 >Emitted(16, 17) Source(3, 16) + SourceIndex(4)
6 >Emitted(16, 18) Source(3, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.js]
"use strict";
"myPrologue";
"myPrologue2";
"myPrologue3";
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../second/second_part2.ts","../../third_part1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

//// [/src/third/thirdjs/output/third-output.js.map.baseline.txt]
===================================================================
JsFile: third-output.js
mapUrl: third-output.js.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../../second/second_part2.ts,../../third_part1.ts,../../../first/first_part2.ts,../../../first/first_part3.ts,../../../second/second_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>"myPrologue2";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^->
1->
2 >"myPrologue2"
3 >             ;
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
3 >Emitted(3, 15) Source(1, 15) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>"myPrologue3";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^->
1->
2 >"myPrologue3"
3 >             ;
1->Emitted(4, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(4, 14) Source(1, 14) + SourceIndex(2)
3 >Emitted(4, 15) Source(1, 15) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>var s = "Hello, world";
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1->"myPrologue"
  >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1->Emitted(5, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(5, 5) Source(6, 7) + SourceIndex(0)
3 >Emitted(5, 6) Source(6, 8) + SourceIndex(0)
4 >Emitted(5, 9) Source(6, 11) + SourceIndex(0)
5 >Emitted(5, 23) Source(6, 25) + SourceIndex(0)
6 >Emitted(5, 24) Source(6, 26) + SourceIndex(0)
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
1 >Emitted(6, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(7, 8) Source(1, 8) + SourceIndex(3)
3 >Emitted(7, 9) Source(1, 9) + SourceIndex(3)
4 >Emitted(7, 12) Source(1, 12) + SourceIndex(3)
5 >Emitted(7, 13) Source(1, 13) + SourceIndex(3)
6 >Emitted(7, 14) Source(1, 14) + SourceIndex(3)
7 >Emitted(7, 16) Source(1, 16) + SourceIndex(3)
8 >Emitted(7, 17) Source(1, 17) + SourceIndex(3)
9 >Emitted(7, 18) Source(1, 18) + SourceIndex(3)
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
1 >Emitted(8, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(8, 10) Source(1, 10) + SourceIndex(4)
3 >Emitted(8, 11) Source(1, 11) + SourceIndex(4)
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
1->Emitted(9, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(9, 12) Source(2, 12) + SourceIndex(4)
3 >Emitted(9, 28) Source(2, 28) + SourceIndex(4)
4 >Emitted(9, 29) Source(2, 29) + SourceIndex(4)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(10, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(10, 2) Source(3, 2) + SourceIndex(4)
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
1->"myPrologue"
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
1->Emitted(11, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(11, 5) Source(6, 11) + SourceIndex(5)
3 >Emitted(11, 6) Source(6, 12) + SourceIndex(5)
4 >Emitted(11, 7) Source(12, 2) + SourceIndex(5)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(12, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(12, 12) Source(6, 11) + SourceIndex(5)
3 >Emitted(12, 13) Source(6, 12) + SourceIndex(5)
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
1->Emitted(13, 5) Source(7, 5) + SourceIndex(5)
2 >Emitted(13, 14) Source(7, 14) + SourceIndex(5)
3 >Emitted(13, 15) Source(7, 15) + SourceIndex(5)
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
1->Emitted(14, 9) Source(8, 9) + SourceIndex(5)
2 >Emitted(14, 16) Source(8, 16) + SourceIndex(5)
3 >Emitted(14, 17) Source(8, 17) + SourceIndex(5)
4 >Emitted(14, 20) Source(8, 20) + SourceIndex(5)
5 >Emitted(14, 21) Source(8, 21) + SourceIndex(5)
6 >Emitted(14, 30) Source(8, 30) + SourceIndex(5)
7 >Emitted(14, 31) Source(8, 31) + SourceIndex(5)
8 >Emitted(14, 32) Source(8, 32) + SourceIndex(5)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(15, 5) Source(9, 5) + SourceIndex(5)
2 >Emitted(15, 6) Source(9, 6) + SourceIndex(5)
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
1->Emitted(16, 5) Source(11, 5) + SourceIndex(5)
2 >Emitted(16, 6) Source(11, 6) + SourceIndex(5)
3 >Emitted(16, 8) Source(11, 8) + SourceIndex(5)
4 >Emitted(16, 9) Source(11, 9) + SourceIndex(5)
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
1->Emitted(17, 1) Source(12, 1) + SourceIndex(5)
2 >Emitted(17, 2) Source(12, 2) + SourceIndex(5)
3 >Emitted(17, 4) Source(6, 11) + SourceIndex(5)
4 >Emitted(17, 5) Source(6, 12) + SourceIndex(5)
5 >Emitted(17, 10) Source(6, 11) + SourceIndex(5)
6 >Emitted(17, 11) Source(6, 12) + SourceIndex(5)
7 >Emitted(17, 19) Source(12, 2) + SourceIndex(5)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->"myPrologue2";
  >
1->Emitted(18, 1) Source(2, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(19, 5) Source(2, 1) + SourceIndex(1)
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
1->Emitted(20, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(20, 6) Source(6, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(21, 5) Source(3, 5) + SourceIndex(1)
2 >Emitted(21, 28) Source(3, 16) + SourceIndex(1)
3 >Emitted(21, 31) Source(3, 5) + SourceIndex(1)
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
1->Emitted(22, 9) Source(4, 9) + SourceIndex(1)
2 >Emitted(22, 16) Source(4, 16) + SourceIndex(1)
3 >Emitted(22, 17) Source(4, 17) + SourceIndex(1)
4 >Emitted(22, 20) Source(4, 20) + SourceIndex(1)
5 >Emitted(22, 21) Source(4, 21) + SourceIndex(1)
6 >Emitted(22, 41) Source(4, 41) + SourceIndex(1)
7 >Emitted(22, 42) Source(4, 42) + SourceIndex(1)
8 >Emitted(22, 43) Source(4, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(23, 5) Source(5, 5) + SourceIndex(1)
2 >Emitted(23, 6) Source(5, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(24, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(24, 13) Source(6, 2) + SourceIndex(1)
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
1 >Emitted(25, 1) Source(6, 1) + SourceIndex(1)
2 >Emitted(25, 2) Source(6, 2) + SourceIndex(1)
3 >Emitted(25, 2) Source(2, 1) + SourceIndex(1)
4 >Emitted(25, 6) Source(6, 2) + SourceIndex(1)
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
1->"myPrologue3";
  >"myPrologue";
  >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(26, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(26, 5) Source(3, 5) + SourceIndex(2)
3 >Emitted(26, 6) Source(3, 6) + SourceIndex(2)
4 >Emitted(26, 9) Source(3, 9) + SourceIndex(2)
5 >Emitted(26, 13) Source(3, 13) + SourceIndex(2)
6 >Emitted(26, 14) Source(3, 14) + SourceIndex(2)
7 >Emitted(26, 16) Source(3, 16) + SourceIndex(2)
8 >Emitted(26, 17) Source(3, 17) + SourceIndex(2)
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
1->Emitted(27, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(27, 2) Source(4, 2) + SourceIndex(2)
3 >Emitted(27, 3) Source(4, 3) + SourceIndex(2)
4 >Emitted(27, 14) Source(4, 14) + SourceIndex(2)
5 >Emitted(27, 16) Source(4, 16) + SourceIndex(2)
6 >Emitted(27, 17) Source(4, 17) + SourceIndex(2)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":28,"kind":"prologue","data":"myPrologue"},{"pos":30,"end":44,"kind":"prologue","data":"myPrologue2"},{"pos":46,"end":60,"kind":"prologue","data":"myPrologue3"},{"pos":62,"end":172,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":62,"end":172,"kind":"text"}]},{"pos":172,"end":457,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":172,"end":457,"kind":"text"}]},{"pos":457,"end":493,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"\"myPrologue3\";\n\"myPrologue\";","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":14,"expression":{"pos":0,"end":13,"text":"myPrologue3"}},{"pos":14,"end":28,"expression":{"pos":14,"end":27,"text":"myPrologue"}}]}]},"mapHash":"28083733311-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}","hash":"-57679879735-\"use strict\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\n\"myPrologue3\";\r\nvar s = \"Hello, world\";\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\nvar c = new C();\r\nc.doSomething();\r\n//# sourceMappingURL=third-output.js.map"},"dts":{"sections":[{"pos":0,"end":157,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":157,"kind":"text"}]},{"pos":157,"end":257,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":157,"end":257,"kind":"text"}]},{"pos":257,"end":276,"kind":"text"}],"mapHash":"37827717207-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC\"}","hash":"-16365524283-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hello, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../third_part1.ts"],"fileInfos":["419920190-\"myPrologue3\";\n\"myPrologue\";\nvar c = new C();\r\nc.doSomething();\r\n"],"options":{"composite":true,"outFile":"./third-output.js"},"outSignature":"-6891480629-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hello, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
prologue: (30-44):: myPrologue2
"myPrologue2";
----------------------------------------------------------------------
prologue: (46-60):: myPrologue3
"myPrologue3";
----------------------------------------------------------------------
prepend: (62-172):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (62-172)
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (172-457):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (172-457)
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
text: (457-493)
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
prepend: (157-257):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (157-257)
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (257-276)
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 44,
          "kind": "prologue",
          "data": "myPrologue2"
        },
        {
          "pos": 46,
          "end": 60,
          "kind": "prologue",
          "data": "myPrologue3"
        },
        {
          "pos": 62,
          "end": 172,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 62,
              "end": 172,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 172,
          "end": 457,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 172,
              "end": 457,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 457,
          "end": 493,
          "kind": "text"
        }
      ],
      "hash": "-57679879735-\"use strict\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\n\"myPrologue3\";\r\nvar s = \"Hello, world\";\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\nvar c = new C();\r\nc.doSomething();\r\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "28083733311-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue3\";\n\"myPrologue\";",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 14,
                "expression": {
                  "pos": 0,
                  "end": 13,
                  "text": "myPrologue3"
                }
              },
              {
                "pos": 14,
                "end": 28,
                "expression": {
                  "pos": 14,
                  "end": 27,
                  "text": "myPrologue"
                }
              }
            ]
          }
        ]
      }
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
          "end": 257,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 157,
              "end": 257,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 257,
          "end": 276,
          "kind": "text"
        }
      ],
      "hash": "-16365524283-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hello, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "37827717207-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../third_part1.ts"
    ],
    "fileInfos": {
      "../../third_part1.ts": "419920190-\"myPrologue3\";\n\"myPrologue\";\nvar c = new C();\r\nc.doSomething();\r\n"
    },
    "options": {
      "composite": true,
      "outFile": "./third-output.js"
    },
    "outSignature": "-6891480629-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hello, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4310
}



Change:: incremental-declaration-changes
Input::
//// [/src/first/first_PART1.ts]
"myPrologue"
interface TheFirst {
    none: any;
}

const s = "Hola, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);




Output::
/lib/tsc --b /src/third --verbose
[[90m12:00:56 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:57 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:00:58 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:07 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part2.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:08 AM[0m] Project 'src/third/tsconfig.json' is out of date because output 'src/third/thirdjs/output/third-output.tsbuildinfo' is older than input 'src/first'

[[90m12:01:09 AM[0m] Building project '/src/third/tsconfig.json'...

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
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET"}

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
1 >"myPrologue"
  >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(2, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(2, 19) + SourceIndex(0)
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
1 >Emitted(2, 5) Source(3, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(3, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(3, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(3, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(3, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(4, 2) + SourceIndex(0)
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
1->Emitted(4, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(6, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(6, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(6, 8) + SourceIndex(0)
5 >Emitted(4, 32) Source(6, 24) + SourceIndex(0)
6 >Emitted(4, 33) Source(6, 25) + SourceIndex(0)
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
1 >Emitted(5, 1) Source(8, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(8, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(8, 28) + SourceIndex(0)
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
1 >Emitted(6, 5) Source(9, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(9, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(9, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(9, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(9, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(10, 2) + SourceIndex(0)
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
"use strict";
"myPrologue";
var s = "Hola, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^^^^^^^^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
>>>var s = "Hola, world";
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1->
  >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1->Emitted(3, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(3, 5) Source(6, 7) + SourceIndex(0)
3 >Emitted(3, 6) Source(6, 8) + SourceIndex(0)
4 >Emitted(3, 9) Source(6, 11) + SourceIndex(0)
5 >Emitted(3, 22) Source(6, 24) + SourceIndex(0)
6 >Emitted(3, 23) Source(6, 25) + SourceIndex(0)
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
1 >Emitted(4, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(12, 16) + SourceIndex(0)
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":28,"kind":"prologue","data":"myPrologue"},{"pos":30,"end":139,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"\"myPrologue\"","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":12,"expression":{"pos":0,"end":12,"text":"myPrologue"}}]}]},"mapHash":"-4897215004-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"5422290221-\"use strict\";\r\n\"myPrologue\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":156,"kind":"text"}],"mapHash":"11879278213-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET\"}","hash":"-15939443882-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["36491275086-\"myPrologue\"\ninterface TheFirst {\r\n    none: any;\r\n}\r\n\r\nconst s = \"Hola, world\";\r\n\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\n\r\nconsole.log(s);\r\n","4973778178-console.log(f());\r\n","6202806249-function f() {\r\n    return \"JS does hoists\";\r\n}"],"options":{"composite":true,"outFile":"./first-output.js"},"outSignature":"-11343140977-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
text: (30-139)
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
text: (0-156)
interface TheFirst {
    none: any;
}
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 139,
          "kind": "text"
        }
      ],
      "hash": "5422290221-\"use strict\";\r\n\"myPrologue\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-4897215004-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue\"",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 12,
                "expression": {
                  "pos": 0,
                  "end": 12,
                  "text": "myPrologue"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 156,
          "kind": "text"
        }
      ],
      "hash": "-15939443882-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "11879278213-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET\"}"
    }
  },
  "program": {
    "fileNames": [
      "../first_part1.ts",
      "../first_part2.ts",
      "../first_part3.ts"
    ],
    "fileInfos": {
      "../first_part1.ts": "36491275086-\"myPrologue\"\ninterface TheFirst {\r\n    none: any;\r\n}\r\n\r\nconst s = \"Hola, world\";\r\n\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\n\r\nconsole.log(s);\r\n",
      "../first_part2.ts": "4973778178-console.log(f());\r\n",
      "../first_part3.ts": "6202806249-function f() {\r\n    return \"JS does hoists\";\r\n}"
    },
    "options": {
      "composite": true,
      "outFile": "./first-output.js"
    },
    "outSignature": "-11343140977-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2485
}

//// [/src/third/thirdjs/output/third-output.d.ts]
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
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
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
1 >"myPrologue"
  >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(2, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(2, 19) + SourceIndex(0)
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
1 >Emitted(2, 5) Source(3, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(3, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(3, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(3, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(3, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(4, 2) + SourceIndex(0)
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
1->Emitted(4, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(6, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(6, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(6, 8) + SourceIndex(0)
5 >Emitted(4, 32) Source(6, 24) + SourceIndex(0)
6 >Emitted(4, 33) Source(6, 25) + SourceIndex(0)
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
1 >Emitted(5, 1) Source(8, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(8, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(8, 28) + SourceIndex(0)
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
1 >Emitted(6, 5) Source(9, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(9, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(9, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(9, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(9, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(10, 2) + SourceIndex(0)
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
1 >"myPrologue"
  >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(9, 1) Source(2, 1) + SourceIndex(2)
2 >Emitted(9, 19) Source(2, 11) + SourceIndex(2)
3 >Emitted(9, 20) Source(2, 12) + SourceIndex(2)
4 >Emitted(9, 21) Source(2, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(10, 2) Source(4, 2) + SourceIndex(2)
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
1->Emitted(11, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(11, 19) Source(6, 11) + SourceIndex(2)
3 >Emitted(11, 20) Source(6, 12) + SourceIndex(2)
4 >Emitted(11, 21) Source(6, 13) + SourceIndex(2)
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
1 >Emitted(12, 2) Source(12, 2) + SourceIndex(2)
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
1->"myPrologue2";
  >
2 >class 
3 >              C
1->Emitted(13, 1) Source(2, 1) + SourceIndex(3)
2 >Emitted(13, 15) Source(2, 7) + SourceIndex(3)
3 >Emitted(13, 16) Source(2, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(14, 5) Source(3, 5) + SourceIndex(3)
2 >Emitted(14, 16) Source(3, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(15, 2) Source(6, 2) + SourceIndex(3)
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
1->"myPrologue3";
  >"myPrologue";
  >
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1->Emitted(16, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(16, 9) Source(3, 1) + SourceIndex(4)
3 >Emitted(16, 13) Source(3, 5) + SourceIndex(4)
4 >Emitted(16, 14) Source(3, 6) + SourceIndex(4)
5 >Emitted(16, 17) Source(3, 16) + SourceIndex(4)
6 >Emitted(16, 18) Source(3, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.js]
"use strict";
"myPrologue";
"myPrologue2";
"myPrologue3";
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../second/second_part2.ts","../../third_part1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

//// [/src/third/thirdjs/output/third-output.js.map.baseline.txt]
===================================================================
JsFile: third-output.js
mapUrl: third-output.js.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../../second/second_part2.ts,../../third_part1.ts,../../../first/first_part2.ts,../../../first/first_part3.ts,../../../second/second_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>"myPrologue2";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^->
1->
2 >"myPrologue2"
3 >             ;
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
3 >Emitted(3, 15) Source(1, 15) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>"myPrologue3";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^->
1->
2 >"myPrologue3"
3 >             ;
1->Emitted(4, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(4, 14) Source(1, 14) + SourceIndex(2)
3 >Emitted(4, 15) Source(1, 15) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>var s = "Hola, world";
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1->"myPrologue"
  >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1->Emitted(5, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(5, 5) Source(6, 7) + SourceIndex(0)
3 >Emitted(5, 6) Source(6, 8) + SourceIndex(0)
4 >Emitted(5, 9) Source(6, 11) + SourceIndex(0)
5 >Emitted(5, 22) Source(6, 24) + SourceIndex(0)
6 >Emitted(5, 23) Source(6, 25) + SourceIndex(0)
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
1 >Emitted(6, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(7, 8) Source(1, 8) + SourceIndex(3)
3 >Emitted(7, 9) Source(1, 9) + SourceIndex(3)
4 >Emitted(7, 12) Source(1, 12) + SourceIndex(3)
5 >Emitted(7, 13) Source(1, 13) + SourceIndex(3)
6 >Emitted(7, 14) Source(1, 14) + SourceIndex(3)
7 >Emitted(7, 16) Source(1, 16) + SourceIndex(3)
8 >Emitted(7, 17) Source(1, 17) + SourceIndex(3)
9 >Emitted(7, 18) Source(1, 18) + SourceIndex(3)
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
1 >Emitted(8, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(8, 10) Source(1, 10) + SourceIndex(4)
3 >Emitted(8, 11) Source(1, 11) + SourceIndex(4)
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
1->Emitted(9, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(9, 12) Source(2, 12) + SourceIndex(4)
3 >Emitted(9, 28) Source(2, 28) + SourceIndex(4)
4 >Emitted(9, 29) Source(2, 29) + SourceIndex(4)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(10, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(10, 2) Source(3, 2) + SourceIndex(4)
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
1->"myPrologue"
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
1->Emitted(11, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(11, 5) Source(6, 11) + SourceIndex(5)
3 >Emitted(11, 6) Source(6, 12) + SourceIndex(5)
4 >Emitted(11, 7) Source(12, 2) + SourceIndex(5)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(12, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(12, 12) Source(6, 11) + SourceIndex(5)
3 >Emitted(12, 13) Source(6, 12) + SourceIndex(5)
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
1->Emitted(13, 5) Source(7, 5) + SourceIndex(5)
2 >Emitted(13, 14) Source(7, 14) + SourceIndex(5)
3 >Emitted(13, 15) Source(7, 15) + SourceIndex(5)
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
1->Emitted(14, 9) Source(8, 9) + SourceIndex(5)
2 >Emitted(14, 16) Source(8, 16) + SourceIndex(5)
3 >Emitted(14, 17) Source(8, 17) + SourceIndex(5)
4 >Emitted(14, 20) Source(8, 20) + SourceIndex(5)
5 >Emitted(14, 21) Source(8, 21) + SourceIndex(5)
6 >Emitted(14, 30) Source(8, 30) + SourceIndex(5)
7 >Emitted(14, 31) Source(8, 31) + SourceIndex(5)
8 >Emitted(14, 32) Source(8, 32) + SourceIndex(5)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(15, 5) Source(9, 5) + SourceIndex(5)
2 >Emitted(15, 6) Source(9, 6) + SourceIndex(5)
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
1->Emitted(16, 5) Source(11, 5) + SourceIndex(5)
2 >Emitted(16, 6) Source(11, 6) + SourceIndex(5)
3 >Emitted(16, 8) Source(11, 8) + SourceIndex(5)
4 >Emitted(16, 9) Source(11, 9) + SourceIndex(5)
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
1->Emitted(17, 1) Source(12, 1) + SourceIndex(5)
2 >Emitted(17, 2) Source(12, 2) + SourceIndex(5)
3 >Emitted(17, 4) Source(6, 11) + SourceIndex(5)
4 >Emitted(17, 5) Source(6, 12) + SourceIndex(5)
5 >Emitted(17, 10) Source(6, 11) + SourceIndex(5)
6 >Emitted(17, 11) Source(6, 12) + SourceIndex(5)
7 >Emitted(17, 19) Source(12, 2) + SourceIndex(5)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->"myPrologue2";
  >
1->Emitted(18, 1) Source(2, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(19, 5) Source(2, 1) + SourceIndex(1)
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
1->Emitted(20, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(20, 6) Source(6, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(21, 5) Source(3, 5) + SourceIndex(1)
2 >Emitted(21, 28) Source(3, 16) + SourceIndex(1)
3 >Emitted(21, 31) Source(3, 5) + SourceIndex(1)
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
1->Emitted(22, 9) Source(4, 9) + SourceIndex(1)
2 >Emitted(22, 16) Source(4, 16) + SourceIndex(1)
3 >Emitted(22, 17) Source(4, 17) + SourceIndex(1)
4 >Emitted(22, 20) Source(4, 20) + SourceIndex(1)
5 >Emitted(22, 21) Source(4, 21) + SourceIndex(1)
6 >Emitted(22, 41) Source(4, 41) + SourceIndex(1)
7 >Emitted(22, 42) Source(4, 42) + SourceIndex(1)
8 >Emitted(22, 43) Source(4, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(23, 5) Source(5, 5) + SourceIndex(1)
2 >Emitted(23, 6) Source(5, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(24, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(24, 13) Source(6, 2) + SourceIndex(1)
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
1 >Emitted(25, 1) Source(6, 1) + SourceIndex(1)
2 >Emitted(25, 2) Source(6, 2) + SourceIndex(1)
3 >Emitted(25, 2) Source(2, 1) + SourceIndex(1)
4 >Emitted(25, 6) Source(6, 2) + SourceIndex(1)
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
1->"myPrologue3";
  >"myPrologue";
  >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(26, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(26, 5) Source(3, 5) + SourceIndex(2)
3 >Emitted(26, 6) Source(3, 6) + SourceIndex(2)
4 >Emitted(26, 9) Source(3, 9) + SourceIndex(2)
5 >Emitted(26, 13) Source(3, 13) + SourceIndex(2)
6 >Emitted(26, 14) Source(3, 14) + SourceIndex(2)
7 >Emitted(26, 16) Source(3, 16) + SourceIndex(2)
8 >Emitted(26, 17) Source(3, 17) + SourceIndex(2)
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
1->Emitted(27, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(27, 2) Source(4, 2) + SourceIndex(2)
3 >Emitted(27, 3) Source(4, 3) + SourceIndex(2)
4 >Emitted(27, 14) Source(4, 14) + SourceIndex(2)
5 >Emitted(27, 16) Source(4, 16) + SourceIndex(2)
6 >Emitted(27, 17) Source(4, 17) + SourceIndex(2)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":28,"kind":"prologue","data":"myPrologue"},{"pos":30,"end":44,"kind":"prologue","data":"myPrologue2"},{"pos":46,"end":60,"kind":"prologue","data":"myPrologue3"},{"pos":62,"end":171,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":62,"end":171,"kind":"text"}]},{"pos":171,"end":456,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":171,"end":456,"kind":"text"}]},{"pos":456,"end":492,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"\"myPrologue3\";\n\"myPrologue\";","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":14,"expression":{"pos":0,"end":13,"text":"myPrologue3"}},{"pos":14,"end":28,"expression":{"pos":14,"end":27,"text":"myPrologue"}}]}]},"mapHash":"-70914791687-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}","hash":"-48862390855-\"use strict\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\n\"myPrologue3\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\nvar c = new C();\r\nc.doSomething();\r\n//# sourceMappingURL=third-output.js.map"},"dts":{"sections":[{"pos":0,"end":156,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":156,"kind":"text"}]},{"pos":156,"end":256,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":156,"end":256,"kind":"text"}]},{"pos":256,"end":275,"kind":"text"}],"mapHash":"5755872145-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC\"}","hash":"-22149225483-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../third_part1.ts"],"fileInfos":["419920190-\"myPrologue3\";\n\"myPrologue\";\nvar c = new C();\r\nc.doSomething();\r\n"],"options":{"composite":true,"outFile":"./third-output.js"},"outSignature":"-29474089221-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
prologue: (30-44):: myPrologue2
"myPrologue2";
----------------------------------------------------------------------
prologue: (46-60):: myPrologue3
"myPrologue3";
----------------------------------------------------------------------
prepend: (62-171):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (62-171)
var s = "Hola, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (171-456):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (171-456)
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
text: (456-492)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-156):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-156)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (156-256):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (156-256)
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (256-275)
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 44,
          "kind": "prologue",
          "data": "myPrologue2"
        },
        {
          "pos": 46,
          "end": 60,
          "kind": "prologue",
          "data": "myPrologue3"
        },
        {
          "pos": 62,
          "end": 171,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 62,
              "end": 171,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 171,
          "end": 456,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 171,
              "end": 456,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 456,
          "end": 492,
          "kind": "text"
        }
      ],
      "hash": "-48862390855-\"use strict\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\n\"myPrologue3\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\nvar c = new C();\r\nc.doSomething();\r\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "-70914791687-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue3\";\n\"myPrologue\";",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 14,
                "expression": {
                  "pos": 0,
                  "end": 13,
                  "text": "myPrologue3"
                }
              },
              {
                "pos": 14,
                "end": 28,
                "expression": {
                  "pos": 14,
                  "end": 27,
                  "text": "myPrologue"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 156,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 156,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 156,
          "end": 256,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 156,
              "end": 256,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 256,
          "end": 275,
          "kind": "text"
        }
      ],
      "hash": "-22149225483-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "5755872145-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../third_part1.ts"
    ],
    "fileInfos": {
      "../../third_part1.ts": "419920190-\"myPrologue3\";\n\"myPrologue\";\nvar c = new C();\r\nc.doSomething();\r\n"
    },
    "options": {
      "composite": true,
      "outFile": "./third-output.js"
    },
    "outSignature": "-29474089221-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4308
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/first/first_PART1.ts]
"myPrologue"
interface TheFirst {
    none: any;
}

const s = "Hola, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:23 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:24 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:25 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:33 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part2.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:34 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:01:35 AM[0m] Updating output of project '/src/third/tsconfig.json'...

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
"use strict";
"myPrologue";
var s = "Hola, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^^^^^^^^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
>>>var s = "Hola, world";
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1->
  >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1->Emitted(3, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(3, 5) Source(6, 7) + SourceIndex(0)
3 >Emitted(3, 6) Source(6, 8) + SourceIndex(0)
4 >Emitted(3, 9) Source(6, 11) + SourceIndex(0)
5 >Emitted(3, 22) Source(6, 24) + SourceIndex(0)
6 >Emitted(3, 23) Source(6, 25) + SourceIndex(0)
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
1 >Emitted(4, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(5, 1) Source(13, 1) + SourceIndex(0)
2 >Emitted(5, 8) Source(13, 8) + SourceIndex(0)
3 >Emitted(5, 9) Source(13, 9) + SourceIndex(0)
4 >Emitted(5, 12) Source(13, 12) + SourceIndex(0)
5 >Emitted(5, 13) Source(13, 13) + SourceIndex(0)
6 >Emitted(5, 14) Source(13, 14) + SourceIndex(0)
7 >Emitted(5, 15) Source(13, 15) + SourceIndex(0)
8 >Emitted(5, 16) Source(13, 16) + SourceIndex(0)
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
1->Emitted(6, 1) Source(1, 1) + SourceIndex(1)
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":28,"kind":"prologue","data":"myPrologue"},{"pos":30,"end":156,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"\"myPrologue\"","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":12,"expression":{"pos":0,"end":12,"text":"myPrologue"}}]}]},"mapHash":"-14273144424-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"18535492742-\"use strict\";\r\n\"myPrologue\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":156,"kind":"text"}],"mapHash":"11879278213-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET\"}","hash":"-15939443882-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["38656732144-\"myPrologue\"\ninterface TheFirst {\r\n    none: any;\r\n}\r\n\r\nconst s = \"Hola, world\";\r\n\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\n\r\nconsole.log(s);\r\nconsole.log(s);","4973778178-console.log(f());\r\n","6202806249-function f() {\r\n    return \"JS does hoists\";\r\n}"],"options":{"composite":true,"outFile":"./first-output.js"},"outSignature":"-11343140977-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
text: (30-156)
var s = "Hola, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-156)
interface TheFirst {
    none: any;
}
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 156,
          "kind": "text"
        }
      ],
      "hash": "18535492742-\"use strict\";\r\n\"myPrologue\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-14273144424-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue\"",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 12,
                "expression": {
                  "pos": 0,
                  "end": 12,
                  "text": "myPrologue"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 156,
          "kind": "text"
        }
      ],
      "hash": "-15939443882-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "11879278213-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET\"}"
    }
  },
  "program": {
    "fileNames": [
      "../first_part1.ts",
      "../first_part2.ts",
      "../first_part3.ts"
    ],
    "fileInfos": {
      "../first_part1.ts": "38656732144-\"myPrologue\"\ninterface TheFirst {\r\n    none: any;\r\n}\r\n\r\nconst s = \"Hola, world\";\r\n\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\n\r\nconsole.log(s);\r\nconsole.log(s);",
      "../first_part2.ts": "4973778178-console.log(f());\r\n",
      "../first_part3.ts": "6202806249-function f() {\r\n    return \"JS does hoists\";\r\n}"
    },
    "options": {
      "composite": true,
      "outFile": "./first-output.js"
    },
    "outSignature": "-11343140977-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2561
}

//// [/src/third/thirdjs/output/third-output.js]
"use strict";
"myPrologue";
"myPrologue2";
"myPrologue3";
var s = "Hola, world";
console.log(s);
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../second/second_part2.ts","../../third_part1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts"],"names":[],"mappings":";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

//// [/src/third/thirdjs/output/third-output.js.map.baseline.txt]
===================================================================
JsFile: third-output.js
mapUrl: third-output.js.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../../second/second_part2.ts,../../third_part1.ts,../../../first/first_part2.ts,../../../first/first_part3.ts,../../../second/second_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>"use strict";
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(2, 14) Source(1, 13) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>"myPrologue2";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^->
1->
2 >"myPrologue2"
3 >             ;
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
3 >Emitted(3, 15) Source(1, 15) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>"myPrologue3";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^->
1->
2 >"myPrologue3"
3 >             ;
1->Emitted(4, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(4, 14) Source(1, 14) + SourceIndex(2)
3 >Emitted(4, 15) Source(1, 15) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>var s = "Hola, world";
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1->"myPrologue"
  >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1->Emitted(5, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(5, 5) Source(6, 7) + SourceIndex(0)
3 >Emitted(5, 6) Source(6, 8) + SourceIndex(0)
4 >Emitted(5, 9) Source(6, 11) + SourceIndex(0)
5 >Emitted(5, 22) Source(6, 24) + SourceIndex(0)
6 >Emitted(5, 23) Source(6, 25) + SourceIndex(0)
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
1 >Emitted(6, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(13, 1) + SourceIndex(0)
2 >Emitted(7, 8) Source(13, 8) + SourceIndex(0)
3 >Emitted(7, 9) Source(13, 9) + SourceIndex(0)
4 >Emitted(7, 12) Source(13, 12) + SourceIndex(0)
5 >Emitted(7, 13) Source(13, 13) + SourceIndex(0)
6 >Emitted(7, 14) Source(13, 14) + SourceIndex(0)
7 >Emitted(7, 15) Source(13, 15) + SourceIndex(0)
8 >Emitted(7, 16) Source(13, 16) + SourceIndex(0)
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
1->Emitted(8, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(8, 8) Source(1, 8) + SourceIndex(3)
3 >Emitted(8, 9) Source(1, 9) + SourceIndex(3)
4 >Emitted(8, 12) Source(1, 12) + SourceIndex(3)
5 >Emitted(8, 13) Source(1, 13) + SourceIndex(3)
6 >Emitted(8, 14) Source(1, 14) + SourceIndex(3)
7 >Emitted(8, 16) Source(1, 16) + SourceIndex(3)
8 >Emitted(8, 17) Source(1, 17) + SourceIndex(3)
9 >Emitted(8, 18) Source(1, 18) + SourceIndex(3)
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
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(9, 10) Source(1, 10) + SourceIndex(4)
3 >Emitted(9, 11) Source(1, 11) + SourceIndex(4)
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
1->Emitted(10, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(10, 12) Source(2, 12) + SourceIndex(4)
3 >Emitted(10, 28) Source(2, 28) + SourceIndex(4)
4 >Emitted(10, 29) Source(2, 29) + SourceIndex(4)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(11, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(11, 2) Source(3, 2) + SourceIndex(4)
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
1->"myPrologue"
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
1->Emitted(12, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(12, 5) Source(6, 11) + SourceIndex(5)
3 >Emitted(12, 6) Source(6, 12) + SourceIndex(5)
4 >Emitted(12, 7) Source(12, 2) + SourceIndex(5)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(13, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(13, 12) Source(6, 11) + SourceIndex(5)
3 >Emitted(13, 13) Source(6, 12) + SourceIndex(5)
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
1->Emitted(14, 5) Source(7, 5) + SourceIndex(5)
2 >Emitted(14, 14) Source(7, 14) + SourceIndex(5)
3 >Emitted(14, 15) Source(7, 15) + SourceIndex(5)
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
1->Emitted(15, 9) Source(8, 9) + SourceIndex(5)
2 >Emitted(15, 16) Source(8, 16) + SourceIndex(5)
3 >Emitted(15, 17) Source(8, 17) + SourceIndex(5)
4 >Emitted(15, 20) Source(8, 20) + SourceIndex(5)
5 >Emitted(15, 21) Source(8, 21) + SourceIndex(5)
6 >Emitted(15, 30) Source(8, 30) + SourceIndex(5)
7 >Emitted(15, 31) Source(8, 31) + SourceIndex(5)
8 >Emitted(15, 32) Source(8, 32) + SourceIndex(5)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(16, 5) Source(9, 5) + SourceIndex(5)
2 >Emitted(16, 6) Source(9, 6) + SourceIndex(5)
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
1->Emitted(17, 5) Source(11, 5) + SourceIndex(5)
2 >Emitted(17, 6) Source(11, 6) + SourceIndex(5)
3 >Emitted(17, 8) Source(11, 8) + SourceIndex(5)
4 >Emitted(17, 9) Source(11, 9) + SourceIndex(5)
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
1->Emitted(18, 1) Source(12, 1) + SourceIndex(5)
2 >Emitted(18, 2) Source(12, 2) + SourceIndex(5)
3 >Emitted(18, 4) Source(6, 11) + SourceIndex(5)
4 >Emitted(18, 5) Source(6, 12) + SourceIndex(5)
5 >Emitted(18, 10) Source(6, 11) + SourceIndex(5)
6 >Emitted(18, 11) Source(6, 12) + SourceIndex(5)
7 >Emitted(18, 19) Source(12, 2) + SourceIndex(5)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->"myPrologue2";
  >
1->Emitted(19, 1) Source(2, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(20, 5) Source(2, 1) + SourceIndex(1)
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
1->Emitted(21, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(21, 6) Source(6, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(22, 5) Source(3, 5) + SourceIndex(1)
2 >Emitted(22, 28) Source(3, 16) + SourceIndex(1)
3 >Emitted(22, 31) Source(3, 5) + SourceIndex(1)
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
1->Emitted(23, 9) Source(4, 9) + SourceIndex(1)
2 >Emitted(23, 16) Source(4, 16) + SourceIndex(1)
3 >Emitted(23, 17) Source(4, 17) + SourceIndex(1)
4 >Emitted(23, 20) Source(4, 20) + SourceIndex(1)
5 >Emitted(23, 21) Source(4, 21) + SourceIndex(1)
6 >Emitted(23, 41) Source(4, 41) + SourceIndex(1)
7 >Emitted(23, 42) Source(4, 42) + SourceIndex(1)
8 >Emitted(23, 43) Source(4, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(24, 5) Source(5, 5) + SourceIndex(1)
2 >Emitted(24, 6) Source(5, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(25, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(25, 13) Source(6, 2) + SourceIndex(1)
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
1 >Emitted(26, 1) Source(6, 1) + SourceIndex(1)
2 >Emitted(26, 2) Source(6, 2) + SourceIndex(1)
3 >Emitted(26, 2) Source(2, 1) + SourceIndex(1)
4 >Emitted(26, 6) Source(6, 2) + SourceIndex(1)
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
1->"myPrologue3";
  >"myPrologue";
  >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(27, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(27, 5) Source(3, 5) + SourceIndex(2)
3 >Emitted(27, 6) Source(3, 6) + SourceIndex(2)
4 >Emitted(27, 9) Source(3, 9) + SourceIndex(2)
5 >Emitted(27, 13) Source(3, 13) + SourceIndex(2)
6 >Emitted(27, 14) Source(3, 14) + SourceIndex(2)
7 >Emitted(27, 16) Source(3, 16) + SourceIndex(2)
8 >Emitted(27, 17) Source(3, 17) + SourceIndex(2)
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
1->Emitted(28, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(28, 2) Source(4, 2) + SourceIndex(2)
3 >Emitted(28, 3) Source(4, 3) + SourceIndex(2)
4 >Emitted(28, 14) Source(4, 14) + SourceIndex(2)
5 >Emitted(28, 16) Source(4, 16) + SourceIndex(2)
6 >Emitted(28, 17) Source(4, 17) + SourceIndex(2)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":28,"kind":"prologue","data":"myPrologue"},{"pos":30,"end":44,"kind":"prologue","data":"myPrologue2"},{"pos":46,"end":60,"kind":"prologue","data":"myPrologue3"},{"pos":62,"end":188,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":62,"end":188,"kind":"text"}]},{"pos":188,"end":473,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":188,"end":473,"kind":"text"}]},{"pos":473,"end":509,"kind":"text"}],"mapHash":"39252034733-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}","hash":"-40480844526-\"use strict\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\n\"myPrologue3\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\nvar c = new C();\r\nc.doSomething();\r\n//# sourceMappingURL=third-output.js.map","sources":{"prologues":[{"file":0,"text":"\"myPrologue3\";\n\"myPrologue\";","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":14,"expression":{"pos":0,"end":13,"text":"myPrologue3"}},{"pos":14,"end":28,"expression":{"pos":14,"end":27,"text":"myPrologue"}}]}]}},"dts":{"sections":[{"pos":0,"end":156,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":156,"kind":"text"}]},{"pos":156,"end":256,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":156,"end":256,"kind":"text"}]},{"pos":256,"end":275,"kind":"text"}],"mapHash":"5755872145-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC\"}","hash":"-22149225483-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../third_part1.ts"],"fileInfos":["419920190-\"myPrologue3\";\n\"myPrologue\";\nvar c = new C();\r\nc.doSomething();\r\n"],"options":{"composite":true,"outFile":"./third-output.js"},"outSignature":"-29474089221-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-28):: myPrologue
"myPrologue";
----------------------------------------------------------------------
prologue: (30-44):: myPrologue2
"myPrologue2";
----------------------------------------------------------------------
prologue: (46-60):: myPrologue3
"myPrologue3";
----------------------------------------------------------------------
prepend: (62-188):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (62-188)
var s = "Hola, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (188-473):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (188-473)
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
text: (473-509)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-156):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-156)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (156-256):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (156-256)
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (256-275)
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 28,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 30,
          "end": 44,
          "kind": "prologue",
          "data": "myPrologue2"
        },
        {
          "pos": 46,
          "end": 60,
          "kind": "prologue",
          "data": "myPrologue3"
        },
        {
          "pos": 62,
          "end": 188,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 62,
              "end": 188,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 188,
          "end": 473,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 188,
              "end": 473,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 473,
          "end": 509,
          "kind": "text"
        }
      ],
      "hash": "-40480844526-\"use strict\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\n\"myPrologue3\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\nvar c = new C();\r\nc.doSomething();\r\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "39252034733-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\"],\"names\":[],\"mappings\":\";AAAA,YAAY,CAAA;ACAZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFKd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue3\";\n\"myPrologue\";",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 14,
                "expression": {
                  "pos": 0,
                  "end": 13,
                  "text": "myPrologue3"
                }
              },
              {
                "pos": 14,
                "end": 28,
                "expression": {
                  "pos": 14,
                  "end": 27,
                  "text": "myPrologue"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 156,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 156,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 156,
          "end": 256,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 156,
              "end": 256,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 256,
          "end": 275,
          "kind": "text"
        }
      ],
      "hash": "-22149225483-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "5755872145-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../third_part1.ts"
    ],
    "fileInfos": {
      "../../third_part1.ts": "419920190-\"myPrologue3\";\n\"myPrologue\";\nvar c = new C();\r\nc.doSomething();\r\n"
    },
    "options": {
      "composite": true,
      "outFile": "./third-output.js"
    },
    "outSignature": "-29474089221-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4366
}



Change:: incremental-headers-change-without-dts-changes
Input::
//// [/src/first/first_PART1.ts]
"myPrologue5"
"myPrologue"
interface TheFirst {
    none: any;
}

const s = "Hola, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:46 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:47 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:48 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:56 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part2.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:57 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:01:58 AM[0m] Updating output of project '/src/third/tsconfig.json'...

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
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAEA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AEVD,iBAAS,CAAC,WAET"}

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
1 >"myPrologue5"
  >"myPrologue"
  >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(3, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(3, 19) + SourceIndex(0)
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
1 >Emitted(2, 5) Source(4, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(4, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(4, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(4, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(4, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(5, 2) + SourceIndex(0)
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
1->Emitted(4, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(7, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(7, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(7, 8) + SourceIndex(0)
5 >Emitted(4, 32) Source(7, 24) + SourceIndex(0)
6 >Emitted(4, 33) Source(7, 25) + SourceIndex(0)
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
1 >Emitted(5, 1) Source(9, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(9, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(9, 28) + SourceIndex(0)
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
1 >Emitted(6, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(10, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(10, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(10, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(10, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(11, 2) + SourceIndex(0)
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
"use strict";
"myPrologue5";
"myPrologue";
var s = "Hola, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAAA,aAAa,CAAA;AACb,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>"use strict";
>>>"myPrologue5";
1 >
2 >^^^^^^^^^^^^^
3 >             ^
1 >
2 >"myPrologue5"
3 >             
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 14) Source(1, 14) + SourceIndex(0)
3 >Emitted(2, 15) Source(1, 14) + SourceIndex(0)
---
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^^^^^^^^^->
1 >
  >
2 >"myPrologue"
3 >            
1 >Emitted(3, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(3, 13) Source(2, 13) + SourceIndex(0)
3 >Emitted(3, 14) Source(2, 13) + SourceIndex(0)
---
>>>var s = "Hola, world";
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1->
  >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1->Emitted(4, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(4, 5) Source(7, 7) + SourceIndex(0)
3 >Emitted(4, 6) Source(7, 8) + SourceIndex(0)
4 >Emitted(4, 9) Source(7, 11) + SourceIndex(0)
5 >Emitted(4, 22) Source(7, 24) + SourceIndex(0)
6 >Emitted(4, 23) Source(7, 25) + SourceIndex(0)
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
1 >Emitted(5, 1) Source(13, 1) + SourceIndex(0)
2 >Emitted(5, 8) Source(13, 8) + SourceIndex(0)
3 >Emitted(5, 9) Source(13, 9) + SourceIndex(0)
4 >Emitted(5, 12) Source(13, 12) + SourceIndex(0)
5 >Emitted(5, 13) Source(13, 13) + SourceIndex(0)
6 >Emitted(5, 14) Source(13, 14) + SourceIndex(0)
7 >Emitted(5, 15) Source(13, 15) + SourceIndex(0)
8 >Emitted(5, 16) Source(13, 16) + SourceIndex(0)
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
1->Emitted(6, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(14, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(14, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(14, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(14, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(14, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(14, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(14, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(7, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(7, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(7, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(7, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(7, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(7, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(7, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(7, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(8, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(8, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(8, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(9, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(9, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(9, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(9, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(10, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(10, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":29,"kind":"prologue","data":"myPrologue5"},{"pos":31,"end":44,"kind":"prologue","data":"myPrologue"},{"pos":46,"end":172,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"\"myPrologue5\"\n\"myPrologue\"","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":13,"expression":{"pos":0,"end":13,"text":"myPrologue5"}},{"pos":13,"end":26,"expression":{"pos":13,"end":26,"text":"myPrologue"}}]}]},"mapHash":"291662276-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";AAAA,aAAa,CAAA;AACb,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"10669903364-\"use strict\";\r\n\"myPrologue5\";\r\n\"myPrologue\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":156,"kind":"text"}],"mapHash":"22465488777-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAEA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AEVD,iBAAS,CAAC,WAET\"}","hash":"-15939443882-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["35213579206-\"myPrologue5\"\n\"myPrologue\"\ninterface TheFirst {\r\n    none: any;\r\n}\r\n\r\nconst s = \"Hola, world\";\r\n\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\n\r\nconsole.log(s);\r\nconsole.log(s);","4973778178-console.log(f());\r\n","6202806249-function f() {\r\n    return \"JS does hoists\";\r\n}"],"options":{"composite":true,"outFile":"./first-output.js"},"outSignature":"-11343140977-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-29):: myPrologue5
"myPrologue5";
----------------------------------------------------------------------
prologue: (31-44):: myPrologue
"myPrologue";
----------------------------------------------------------------------
text: (46-172)
var s = "Hola, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-156)
interface TheFirst {
    none: any;
}
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 29,
          "kind": "prologue",
          "data": "myPrologue5"
        },
        {
          "pos": 31,
          "end": 44,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 46,
          "end": 172,
          "kind": "text"
        }
      ],
      "hash": "10669903364-\"use strict\";\r\n\"myPrologue5\";\r\n\"myPrologue\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "291662276-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\";AAAA,aAAa,CAAA;AACb,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue5\"\n\"myPrologue\"",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 13,
                "expression": {
                  "pos": 0,
                  "end": 13,
                  "text": "myPrologue5"
                }
              },
              {
                "pos": 13,
                "end": 26,
                "expression": {
                  "pos": 13,
                  "end": 26,
                  "text": "myPrologue"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 156,
          "kind": "text"
        }
      ],
      "hash": "-15939443882-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "22465488777-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAEA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AEVD,iBAAS,CAAC,WAET\"}"
    }
  },
  "program": {
    "fileNames": [
      "../first_part1.ts",
      "../first_part2.ts",
      "../first_part3.ts"
    ],
    "fileInfos": {
      "../first_part1.ts": "35213579206-\"myPrologue5\"\n\"myPrologue\"\ninterface TheFirst {\r\n    none: any;\r\n}\r\n\r\nconst s = \"Hola, world\";\r\n\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\n\r\nconsole.log(s);\r\nconsole.log(s);",
      "../first_part2.ts": "4973778178-console.log(f());\r\n",
      "../first_part3.ts": "6202806249-function f() {\r\n    return \"JS does hoists\";\r\n}"
    },
    "options": {
      "composite": true,
      "outFile": "./first-output.js"
    },
    "outSignature": "-11343140977-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2760
}

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAEA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACVD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
1 >"myPrologue5"
  >"myPrologue"
  >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(3, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(3, 19) + SourceIndex(0)
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
1 >Emitted(2, 5) Source(4, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(4, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(4, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(4, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(4, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(5, 2) + SourceIndex(0)
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
1->Emitted(4, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(7, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(7, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(7, 8) + SourceIndex(0)
5 >Emitted(4, 32) Source(7, 24) + SourceIndex(0)
6 >Emitted(4, 33) Source(7, 25) + SourceIndex(0)
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
1 >Emitted(5, 1) Source(9, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(9, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(9, 28) + SourceIndex(0)
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
1 >Emitted(6, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(10, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(10, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(10, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(10, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(11, 2) + SourceIndex(0)
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
1 >"myPrologue"
  >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(9, 1) Source(2, 1) + SourceIndex(2)
2 >Emitted(9, 19) Source(2, 11) + SourceIndex(2)
3 >Emitted(9, 20) Source(2, 12) + SourceIndex(2)
4 >Emitted(9, 21) Source(2, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(10, 2) Source(4, 2) + SourceIndex(2)
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
1->Emitted(11, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(11, 19) Source(6, 11) + SourceIndex(2)
3 >Emitted(11, 20) Source(6, 12) + SourceIndex(2)
4 >Emitted(11, 21) Source(6, 13) + SourceIndex(2)
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
1 >Emitted(12, 2) Source(12, 2) + SourceIndex(2)
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
1->"myPrologue2";
  >
2 >class 
3 >              C
1->Emitted(13, 1) Source(2, 1) + SourceIndex(3)
2 >Emitted(13, 15) Source(2, 7) + SourceIndex(3)
3 >Emitted(13, 16) Source(2, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(14, 5) Source(3, 5) + SourceIndex(3)
2 >Emitted(14, 16) Source(3, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(15, 2) Source(6, 2) + SourceIndex(3)
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
1->"myPrologue3";
  >"myPrologue";
  >
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1->Emitted(16, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(16, 9) Source(3, 1) + SourceIndex(4)
3 >Emitted(16, 13) Source(3, 5) + SourceIndex(4)
4 >Emitted(16, 14) Source(3, 6) + SourceIndex(4)
5 >Emitted(16, 17) Source(3, 16) + SourceIndex(4)
6 >Emitted(16, 18) Source(3, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.js]
"use strict";
"myPrologue5";
"myPrologue";
"myPrologue2";
"myPrologue3";
var s = "Hola, world";
console.log(s);
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../second/second_part2.ts","../../third_part1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts"],"names":[],"mappings":";AAAA,aAAa,CAAA;AACb,YAAY,CAAA;ACDZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFMd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGbf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

//// [/src/third/thirdjs/output/third-output.js.map.baseline.txt]
===================================================================
JsFile: third-output.js
mapUrl: third-output.js.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../../second/second_part2.ts,../../third_part1.ts,../../../first/first_part2.ts,../../../first/first_part3.ts,../../../second/second_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>"use strict";
>>>"myPrologue5";
1 >
2 >^^^^^^^^^^^^^
3 >             ^
1 >
2 >"myPrologue5"
3 >             
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(2, 14) Source(1, 14) + SourceIndex(0)
3 >Emitted(2, 15) Source(1, 14) + SourceIndex(0)
---
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^->
1 >
  >
2 >"myPrologue"
3 >            
1 >Emitted(3, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(3, 13) Source(2, 13) + SourceIndex(0)
3 >Emitted(3, 14) Source(2, 13) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>"myPrologue2";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^->
1->
2 >"myPrologue2"
3 >             ;
1->Emitted(4, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(4, 14) Source(1, 14) + SourceIndex(1)
3 >Emitted(4, 15) Source(1, 15) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>"myPrologue3";
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^->
1->
2 >"myPrologue3"
3 >             ;
1->Emitted(5, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(5, 14) Source(1, 14) + SourceIndex(2)
3 >Emitted(5, 15) Source(1, 15) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>var s = "Hola, world";
1->
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^
6 >                     ^
1->"myPrologue5"
  >"myPrologue"
  >interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hola, world"
6 >                     ;
1->Emitted(6, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(6, 5) Source(7, 7) + SourceIndex(0)
3 >Emitted(6, 6) Source(7, 8) + SourceIndex(0)
4 >Emitted(6, 9) Source(7, 11) + SourceIndex(0)
5 >Emitted(6, 22) Source(7, 24) + SourceIndex(0)
6 >Emitted(6, 23) Source(7, 25) + SourceIndex(0)
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
1 >Emitted(7, 1) Source(13, 1) + SourceIndex(0)
2 >Emitted(7, 8) Source(13, 8) + SourceIndex(0)
3 >Emitted(7, 9) Source(13, 9) + SourceIndex(0)
4 >Emitted(7, 12) Source(13, 12) + SourceIndex(0)
5 >Emitted(7, 13) Source(13, 13) + SourceIndex(0)
6 >Emitted(7, 14) Source(13, 14) + SourceIndex(0)
7 >Emitted(7, 15) Source(13, 15) + SourceIndex(0)
8 >Emitted(7, 16) Source(13, 16) + SourceIndex(0)
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
1->Emitted(8, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(8, 8) Source(14, 8) + SourceIndex(0)
3 >Emitted(8, 9) Source(14, 9) + SourceIndex(0)
4 >Emitted(8, 12) Source(14, 12) + SourceIndex(0)
5 >Emitted(8, 13) Source(14, 13) + SourceIndex(0)
6 >Emitted(8, 14) Source(14, 14) + SourceIndex(0)
7 >Emitted(8, 15) Source(14, 15) + SourceIndex(0)
8 >Emitted(8, 16) Source(14, 16) + SourceIndex(0)
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
1->Emitted(9, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(9, 8) Source(1, 8) + SourceIndex(3)
3 >Emitted(9, 9) Source(1, 9) + SourceIndex(3)
4 >Emitted(9, 12) Source(1, 12) + SourceIndex(3)
5 >Emitted(9, 13) Source(1, 13) + SourceIndex(3)
6 >Emitted(9, 14) Source(1, 14) + SourceIndex(3)
7 >Emitted(9, 16) Source(1, 16) + SourceIndex(3)
8 >Emitted(9, 17) Source(1, 17) + SourceIndex(3)
9 >Emitted(9, 18) Source(1, 18) + SourceIndex(3)
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
1 >Emitted(10, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(10, 10) Source(1, 10) + SourceIndex(4)
3 >Emitted(10, 11) Source(1, 11) + SourceIndex(4)
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
1->Emitted(11, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(11, 12) Source(2, 12) + SourceIndex(4)
3 >Emitted(11, 28) Source(2, 28) + SourceIndex(4)
4 >Emitted(11, 29) Source(2, 29) + SourceIndex(4)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(12, 1) Source(3, 1) + SourceIndex(4)
2 >Emitted(12, 2) Source(3, 2) + SourceIndex(4)
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
1->"myPrologue"
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
1->Emitted(13, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(13, 5) Source(6, 11) + SourceIndex(5)
3 >Emitted(13, 6) Source(6, 12) + SourceIndex(5)
4 >Emitted(13, 7) Source(12, 2) + SourceIndex(5)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(14, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(14, 12) Source(6, 11) + SourceIndex(5)
3 >Emitted(14, 13) Source(6, 12) + SourceIndex(5)
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
1->Emitted(15, 5) Source(7, 5) + SourceIndex(5)
2 >Emitted(15, 14) Source(7, 14) + SourceIndex(5)
3 >Emitted(15, 15) Source(7, 15) + SourceIndex(5)
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
1->Emitted(16, 9) Source(8, 9) + SourceIndex(5)
2 >Emitted(16, 16) Source(8, 16) + SourceIndex(5)
3 >Emitted(16, 17) Source(8, 17) + SourceIndex(5)
4 >Emitted(16, 20) Source(8, 20) + SourceIndex(5)
5 >Emitted(16, 21) Source(8, 21) + SourceIndex(5)
6 >Emitted(16, 30) Source(8, 30) + SourceIndex(5)
7 >Emitted(16, 31) Source(8, 31) + SourceIndex(5)
8 >Emitted(16, 32) Source(8, 32) + SourceIndex(5)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(17, 5) Source(9, 5) + SourceIndex(5)
2 >Emitted(17, 6) Source(9, 6) + SourceIndex(5)
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
1->Emitted(18, 5) Source(11, 5) + SourceIndex(5)
2 >Emitted(18, 6) Source(11, 6) + SourceIndex(5)
3 >Emitted(18, 8) Source(11, 8) + SourceIndex(5)
4 >Emitted(18, 9) Source(11, 9) + SourceIndex(5)
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
1->Emitted(19, 1) Source(12, 1) + SourceIndex(5)
2 >Emitted(19, 2) Source(12, 2) + SourceIndex(5)
3 >Emitted(19, 4) Source(6, 11) + SourceIndex(5)
4 >Emitted(19, 5) Source(6, 12) + SourceIndex(5)
5 >Emitted(19, 10) Source(6, 11) + SourceIndex(5)
6 >Emitted(19, 11) Source(6, 12) + SourceIndex(5)
7 >Emitted(19, 19) Source(12, 2) + SourceIndex(5)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->"myPrologue2";
  >
1->Emitted(20, 1) Source(2, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(21, 5) Source(2, 1) + SourceIndex(1)
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
1->Emitted(22, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(22, 6) Source(6, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(23, 5) Source(3, 5) + SourceIndex(1)
2 >Emitted(23, 28) Source(3, 16) + SourceIndex(1)
3 >Emitted(23, 31) Source(3, 5) + SourceIndex(1)
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
1->Emitted(24, 9) Source(4, 9) + SourceIndex(1)
2 >Emitted(24, 16) Source(4, 16) + SourceIndex(1)
3 >Emitted(24, 17) Source(4, 17) + SourceIndex(1)
4 >Emitted(24, 20) Source(4, 20) + SourceIndex(1)
5 >Emitted(24, 21) Source(4, 21) + SourceIndex(1)
6 >Emitted(24, 41) Source(4, 41) + SourceIndex(1)
7 >Emitted(24, 42) Source(4, 42) + SourceIndex(1)
8 >Emitted(24, 43) Source(4, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(25, 5) Source(5, 5) + SourceIndex(1)
2 >Emitted(25, 6) Source(5, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(26, 5) Source(6, 1) + SourceIndex(1)
2 >Emitted(26, 13) Source(6, 2) + SourceIndex(1)
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
1 >Emitted(27, 1) Source(6, 1) + SourceIndex(1)
2 >Emitted(27, 2) Source(6, 2) + SourceIndex(1)
3 >Emitted(27, 2) Source(2, 1) + SourceIndex(1)
4 >Emitted(27, 6) Source(6, 2) + SourceIndex(1)
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
1->"myPrologue3";
  >"myPrologue";
  >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(28, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(28, 5) Source(3, 5) + SourceIndex(2)
3 >Emitted(28, 6) Source(3, 6) + SourceIndex(2)
4 >Emitted(28, 9) Source(3, 9) + SourceIndex(2)
5 >Emitted(28, 13) Source(3, 13) + SourceIndex(2)
6 >Emitted(28, 14) Source(3, 14) + SourceIndex(2)
7 >Emitted(28, 16) Source(3, 16) + SourceIndex(2)
8 >Emitted(28, 17) Source(3, 17) + SourceIndex(2)
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
1->Emitted(29, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(29, 2) Source(4, 2) + SourceIndex(2)
3 >Emitted(29, 3) Source(4, 3) + SourceIndex(2)
4 >Emitted(29, 14) Source(4, 14) + SourceIndex(2)
5 >Emitted(29, 16) Source(4, 16) + SourceIndex(2)
6 >Emitted(29, 17) Source(4, 17) + SourceIndex(2)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":15,"end":29,"kind":"prologue","data":"myPrologue5"},{"pos":31,"end":44,"kind":"prologue","data":"myPrologue"},{"pos":46,"end":60,"kind":"prologue","data":"myPrologue2"},{"pos":62,"end":76,"kind":"prologue","data":"myPrologue3"},{"pos":78,"end":204,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":78,"end":204,"kind":"text"}]},{"pos":204,"end":489,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":204,"end":489,"kind":"text"}]},{"pos":489,"end":525,"kind":"text"}],"mapHash":"-27088974530-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\"],\"names\":[],\"mappings\":\";AAAA,aAAa,CAAA;AACb,YAAY,CAAA;ACDZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFMd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGbf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}","hash":"-10456117680-\"use strict\";\r\n\"myPrologue5\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\n\"myPrologue3\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\nvar c = new C();\r\nc.doSomething();\r\n//# sourceMappingURL=third-output.js.map","sources":{"prologues":[{"file":0,"text":"\"myPrologue3\";\n\"myPrologue\";","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}},{"pos":0,"end":14,"expression":{"pos":0,"end":13,"text":"myPrologue3"}},{"pos":14,"end":28,"expression":{"pos":14,"end":27,"text":"myPrologue"}}]}]}},"dts":{"sections":[{"pos":0,"end":156,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":156,"kind":"text"}]},{"pos":156,"end":256,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":156,"end":256,"kind":"text"}]},{"pos":256,"end":275,"kind":"text"}],"mapHash":"-10856751979-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAEA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACVD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC\"}","hash":"-22149225483-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../third_part1.ts"],"fileInfos":["419920190-\"myPrologue3\";\n\"myPrologue\";\nvar c = new C();\r\nc.doSomething();\r\n"],"options":{"composite":true,"outFile":"./third-output.js"},"outSignature":"-29474089221-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prologue: (15-29):: myPrologue5
"myPrologue5";
----------------------------------------------------------------------
prologue: (31-44):: myPrologue
"myPrologue";
----------------------------------------------------------------------
prologue: (46-60):: myPrologue2
"myPrologue2";
----------------------------------------------------------------------
prologue: (62-76):: myPrologue3
"myPrologue3";
----------------------------------------------------------------------
prepend: (78-204):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (78-204)
var s = "Hola, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (204-489):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (204-489)
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
text: (489-525)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-156):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-156)
interface TheFirst {
    none: any;
}
declare const s = "Hola, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (156-256):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (156-256)
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (256-275)
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
          "end": 13,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 15,
          "end": 29,
          "kind": "prologue",
          "data": "myPrologue5"
        },
        {
          "pos": 31,
          "end": 44,
          "kind": "prologue",
          "data": "myPrologue"
        },
        {
          "pos": 46,
          "end": 60,
          "kind": "prologue",
          "data": "myPrologue2"
        },
        {
          "pos": 62,
          "end": 76,
          "kind": "prologue",
          "data": "myPrologue3"
        },
        {
          "pos": 78,
          "end": 204,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 78,
              "end": 204,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 204,
          "end": 489,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 204,
              "end": 489,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 489,
          "end": 525,
          "kind": "text"
        }
      ],
      "hash": "-10456117680-\"use strict\";\r\n\"myPrologue5\";\r\n\"myPrologue\";\r\n\"myPrologue2\";\r\n\"myPrologue3\";\r\nvar s = \"Hola, world\";\r\nconsole.log(s);\r\nconsole.log(s);\r\nconsole.log(f());\r\nfunction f() {\r\n    return \"JS does hoists\";\r\n}\r\nvar N;\r\n(function (N) {\r\n    function f() {\r\n        console.log('testing');\r\n    }\r\n    f();\r\n})(N || (N = {}));\r\nvar C = (function () {\r\n    function C() {\r\n    }\r\n    C.prototype.doSomething = function () {\r\n        console.log(\"something got done\");\r\n    };\r\n    return C;\r\n}());\r\nvar c = new C();\r\nc.doSomething();\r\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "-27088974530-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\"],\"names\":[],\"mappings\":\";AAAA,aAAa,CAAA;AACb,YAAY,CAAA;ACDZ,aAAa,CAAC;ACAd,aAAa,CAAC;AFMd,IAAM,CAAC,GAAG,aAAa,CAAC;AAMxB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AGbf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AJVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue3\";\n\"myPrologue\";",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
                }
              },
              {
                "pos": 0,
                "end": 14,
                "expression": {
                  "pos": 0,
                  "end": 13,
                  "text": "myPrologue3"
                }
              },
              {
                "pos": 14,
                "end": 28,
                "expression": {
                  "pos": 14,
                  "end": 27,
                  "text": "myPrologue"
                }
              }
            ]
          }
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 156,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 156,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 156,
          "end": 256,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 156,
              "end": 256,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 256,
          "end": 275,
          "kind": "text"
        }
      ],
      "hash": "-22149225483-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "-10856751979-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAEA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,gBAAgB,CAAC;AAExB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACVD,iBAAS,CAAC,WAET;ACDD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACHD,QAAA,IAAI,CAAC,GAAU,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../third_part1.ts"
    ],
    "fileInfos": {
      "../../third_part1.ts": "419920190-\"myPrologue3\";\n\"myPrologue\";\nvar c = new C();\r\nc.doSomething();\r\n"
    },
    "options": {
      "composite": true,
      "outFile": "./third-output.js"
    },
    "outSignature": "-29474089221-interface TheFirst {\r\n    none: any;\r\n}\r\ndeclare const s = \"Hola, world\";\r\ninterface NoJsForHereEither {\r\n    none: any;\r\n}\r\ndeclare function f(): string;\r\ndeclare namespace N {\r\n}\r\ndeclare namespace N {\r\n}\r\ndeclare class C {\r\n    doSomething(): void;\r\n}\r\ndeclare var c: C;\r\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4463
}

