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
    "strict": true,
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
[[90m12:00:19 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:20 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.tsbuildinfo' does not exist

[[90m12:00:21 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:00:31 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/2/second-output.tsbuildinfo' does not exist

[[90m12:00:32 AM[0m] Building project '/src/second/tsconfig.json'...

[[90m12:00:42 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/thirdjs/output/third-output.tsbuildinfo' does not exist

[[90m12:00:43 AM[0m] Building project '/src/third/tsconfig.json'...

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
2 > ^^^^^^^^^^^^^^^^->
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
4 >               ^^^^^^^^^->
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
"use strict";
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
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":";AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

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
1 >Emitted(2, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(5, 11) + SourceIndex(0)
3 >Emitted(2, 6) Source(5, 12) + SourceIndex(0)
4 >Emitted(2, 7) Source(11, 2) + SourceIndex(0)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(3, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(3, 12) Source(5, 11) + SourceIndex(0)
3 >Emitted(3, 13) Source(5, 12) + SourceIndex(0)
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
1->Emitted(4, 5) Source(6, 5) + SourceIndex(0)
2 >Emitted(4, 14) Source(6, 14) + SourceIndex(0)
3 >Emitted(4, 15) Source(6, 15) + SourceIndex(0)
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
1->Emitted(5, 9) Source(7, 9) + SourceIndex(0)
2 >Emitted(5, 16) Source(7, 16) + SourceIndex(0)
3 >Emitted(5, 17) Source(7, 17) + SourceIndex(0)
4 >Emitted(5, 20) Source(7, 20) + SourceIndex(0)
5 >Emitted(5, 21) Source(7, 21) + SourceIndex(0)
6 >Emitted(5, 30) Source(7, 30) + SourceIndex(0)
7 >Emitted(5, 31) Source(7, 31) + SourceIndex(0)
8 >Emitted(5, 32) Source(7, 32) + SourceIndex(0)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(6, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(6, 6) Source(8, 6) + SourceIndex(0)
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
1->Emitted(7, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(7, 6) Source(10, 6) + SourceIndex(0)
3 >Emitted(7, 8) Source(10, 8) + SourceIndex(0)
4 >Emitted(7, 9) Source(10, 9) + SourceIndex(0)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^->
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
1->Emitted(8, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(8, 2) Source(11, 2) + SourceIndex(0)
3 >Emitted(8, 4) Source(5, 11) + SourceIndex(0)
4 >Emitted(8, 5) Source(5, 12) + SourceIndex(0)
5 >Emitted(8, 10) Source(5, 11) + SourceIndex(0)
6 >Emitted(8, 11) Source(5, 12) + SourceIndex(0)
7 >Emitted(8, 19) Source(11, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(9, 1) Source(1, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(10, 5) Source(1, 1) + SourceIndex(1)
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
1->Emitted(11, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(11, 6) Source(5, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(12, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(12, 28) Source(2, 16) + SourceIndex(1)
3 >Emitted(12, 31) Source(2, 5) + SourceIndex(1)
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
1->Emitted(13, 9) Source(3, 9) + SourceIndex(1)
2 >Emitted(13, 16) Source(3, 16) + SourceIndex(1)
3 >Emitted(13, 17) Source(3, 17) + SourceIndex(1)
4 >Emitted(13, 20) Source(3, 20) + SourceIndex(1)
5 >Emitted(13, 21) Source(3, 21) + SourceIndex(1)
6 >Emitted(13, 41) Source(3, 41) + SourceIndex(1)
7 >Emitted(13, 42) Source(3, 42) + SourceIndex(1)
8 >Emitted(13, 43) Source(3, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(14, 5) Source(4, 5) + SourceIndex(1)
2 >Emitted(14, 6) Source(4, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(15, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(15, 13) Source(5, 2) + SourceIndex(1)
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
1 >Emitted(16, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(16, 2) Source(5, 2) + SourceIndex(1)
3 >Emitted(16, 2) Source(1, 1) + SourceIndex(1)
4 >Emitted(16, 6) Source(5, 2) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../second","sourceFiles":["../second/second_part1.ts","../second/second_part2.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":14,"end":284,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"","directives":[{"pos":-1,"end":-1,"expression":{"pos":-1,"end":-1,"text":"use strict"}}]}]},"mapHash":"-5973886303-{\"version\":3,\"file\":\"second-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\";AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC\"}","hash":"-20649828028-\"use strict\";\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\n//# sourceMappingURL=second-output.js.map"},"dts":{"sections":[{"pos":0,"end":93,"kind":"text"}],"mapHash":"7640041563-{\"version\":3,\"file\":\"second-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd\"}","hash":"-16005591226-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n//# sourceMappingURL=second-output.d.ts.map"}},"program":{"fileNames":["../../lib/lib.d.ts","../second/second_part1.ts","../second/second_part2.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-12195290447-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\n","3642692259-class C {\n    doSomething() {\n        console.log(\"something got done\");\n    }\n}\n"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./second-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":true,"target":1},"outSignature":"-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n","latestChangedDtsFile":"./second-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/2/second-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/2/second-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
text: (14-284)
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
text: (0-93)
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
          "pos": 14,
          "end": 284,
          "kind": "text"
        }
      ],
      "hash": "-20649828028-\"use strict\";\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\n//# sourceMappingURL=second-output.js.map",
      "mapHash": "-5973886303-{\"version\":3,\"file\":\"second-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\";AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "",
            "directives": [
              {
                "pos": -1,
                "end": -1,
                "expression": {
                  "pos": -1,
                  "end": -1,
                  "text": "use strict"
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
          "end": 93,
          "kind": "text"
        }
      ],
      "hash": "-16005591226-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n//# sourceMappingURL=second-output.d.ts.map",
      "mapHash": "7640041563-{\"version\":3,\"file\":\"second-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../second/second_part1.ts\",\"../second/second_part2.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd\"}"
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
      "../second/second_part1.ts": "-12195290447-namespace N {\n    // Comment text\n}\n\nnamespace N {\n    function f() {\n        console.log('testing');\n    }\n\n    f();\n}\n",
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
      "strict": true,
      "target": 1
    },
    "outSignature": "-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n",
    "latestChangedDtsFile": "./second-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2916
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
9 >               ^^->
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
4 >          ^^^^^^^^^^^^^^^^^^->
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":104,"kind":"text"}],"mapHash":"-22423542495-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"4999315210-var s = \"Hello, world\";\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":149,"kind":"text"}],"mapHash":"28957120071-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET\"}","hash":"-14898761250-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-22071182994-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\n","6007494133-console.log(f());\n","4357625305-function f() {\n    return \"JS does hoists\";\n}\n"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-104)
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
text: (0-149)
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
          "end": 104,
          "kind": "text"
        }
      ],
      "hash": "4999315210-var s = \"Hello, world\";\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-22423542495-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 149,
          "kind": "text"
        }
      ],
      "hash": "-14898761250-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "28957120071-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET\"}"
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
      "../first_part1.ts": "-22071182994-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\n",
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
    "outSignature": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2609
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
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(12, 2) Source(11, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^->
1->
2 >class 
3 >              C
1->Emitted(13, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(13, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(13, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(14, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(14, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(15, 2) Source(5, 2) + SourceIndex(3)
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
1->Emitted(16, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(16, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(16, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(16, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(16, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(16, 18) Source(1, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.js]
"use strict";
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
>>>"use strict";
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
1 >Emitted(3, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(3, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(3, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(3, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(3, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(3, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(3, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(3, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(4, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(4, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(4, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(4, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(4, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(4, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(4, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(4, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(4, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(5, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(5, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(5, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(6, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(6, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(6, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(6, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^->
1 >
  >
2 >}
1 >Emitted(7, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(7, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(8, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(8, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(8, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(8, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(9, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(9, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(9, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(10, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(10, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(10, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(11, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(11, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(11, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(11, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(11, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(11, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(11, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(11, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(12, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(12, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(13, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(13, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(13, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(13, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^->
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
1->Emitted(14, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(14, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(14, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(14, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(14, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(14, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(14, 19) Source(11, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(15, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(16, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(17, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(17, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(18, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(18, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(18, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(19, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(19, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(19, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(19, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(19, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(19, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(19, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(19, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(20, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(20, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(21, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(21, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(22, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(22, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(22, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(22, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(23, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(23, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(23, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(23, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(23, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(23, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(23, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(23, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1 >
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1 >Emitted(24, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(24, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(24, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(24, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(24, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(24, 17) Source(2, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":14,"end":118,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":14,"end":118,"kind":"text"}]},{"pos":118,"end":388,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":118,"end":388,"kind":"text"}]},{"pos":388,"end":422,"kind":"text"}],"mapHash":"2198167249-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}","hash":"-33862833231-\"use strict\";\nvar s = \"Hello, world\";\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\n//# sourceMappingURL=third-output.js.map"},"dts":{"sections":[{"pos":0,"end":149,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":149,"kind":"text"}]},{"pos":149,"end":242,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":149,"end":242,"kind":"text"}]},{"pos":242,"end":260,"kind":"text"}],"mapHash":"-10250552873-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC\"}","hash":"406139541-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n","-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n","7305100057-var c = new C();\nc.doSomething();\n"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-2893455973-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prepend: (14-118):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (14-118)
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (118-388):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (118-388)
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
text: (388-422)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-149):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-149)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (149-242):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (149-242)
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (242-260)
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
          "pos": 14,
          "end": 118,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 14,
              "end": 118,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 118,
          "end": 388,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 118,
              "end": 388,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 388,
          "end": 422,
          "kind": "text"
        }
      ],
      "hash": "-33862833231-\"use strict\";\nvar s = \"Hello, world\";\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "2198167249-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 149,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 149,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 149,
          "end": 242,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 149,
              "end": 242,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 242,
          "end": 260,
          "kind": "text"
        }
      ],
      "hash": "406139541-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "-10250552873-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC\"}"
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
      "../../../first/bin/first-output.d.ts": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
      "../../../2/second-output.d.ts": "-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n",
      "../../third_part1.ts": "7305100057-var c = new C();\nc.doSomething();\n"
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
    "outSignature": "-2893455973-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4537
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
console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:01 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:02 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:03 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:11 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part2.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:12 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:01:13 AM[0m] Updating output of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/first/bin/first-output.d.ts.map] file written with same contents
//// [/src/first/bin/first-output.d.ts.map.baseline.txt] file written with same contents
//// [/src/first/bin/first-output.js]
var s = "Hello, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1 >Emitted(3, 1) Source(12, 1) + SourceIndex(0)
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
1->Emitted(4, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(4, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(4, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(4, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(4, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(4, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(4, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(4, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(4, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(5, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(5, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(5, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(6, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(6, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(6, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(6, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(7, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(7, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":120,"kind":"text"}],"mapHash":"-2702861355-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"-20052626506-var s = \"Hello, world\";\nconsole.log(s);\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":149,"kind":"text"}],"mapHash":"28957120071-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET\"}","hash":"-14898761250-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-20304251376-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nconsole.log(s);","6007494133-console.log(f());\n","4357625305-function f() {\n    return \"JS does hoists\";\n}\n"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-120)
var s = "Hello, world";
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
text: (0-149)
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
          "end": 120,
          "kind": "text"
        }
      ],
      "hash": "-20052626506-var s = \"Hello, world\";\nconsole.log(s);\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-2702861355-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 149,
          "kind": "text"
        }
      ],
      "hash": "-14898761250-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "28957120071-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET\"}"
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
      "../first_part1.ts": "-20304251376-interface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nconsole.log(s);",
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
    "outSignature": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2682
}

//// [/src/third/thirdjs/output/third-output.js]
"use strict";
var s = "Hello, world";
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
>>>"use strict";
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
>>>console.log(s);
1 >
2 >^^^^^^^
3 >       ^
4 >        ^^^
5 >           ^
6 >            ^
7 >             ^
8 >              ^
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
1 >Emitted(3, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(3, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(3, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(3, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(3, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(3, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(3, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(3, 16) Source(11, 16) + SourceIndex(0)
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
3 > ^^^^^->
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
1->Emitted(9, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(9, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(9, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(9, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
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
4 >              ^^^^^^^^^^^^^^^^^->
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
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(13, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(13, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(14, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(14, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(14, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(14, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^->
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
1->Emitted(15, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(15, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(15, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(15, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(15, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(15, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(15, 19) Source(11, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(16, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(17, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(18, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(18, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(19, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(19, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(19, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(20, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(20, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(20, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(20, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(20, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(20, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(20, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(20, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(21, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(21, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(22, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(22, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(23, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(23, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(23, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(23, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(24, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(24, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(24, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(24, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(24, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(24, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(24, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(24, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1 >
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1 >Emitted(25, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(25, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(25, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(25, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(25, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(25, 17) Source(2, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"use strict"},{"pos":14,"end":134,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":14,"end":134,"kind":"text"}]},{"pos":134,"end":404,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":134,"end":404,"kind":"text"}]},{"pos":404,"end":438,"kind":"text"}],"mapHash":"40579483013-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}","hash":"9182045789-\"use strict\";\nvar s = \"Hello, world\";\nconsole.log(s);\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\n//# sourceMappingURL=third-output.js.map"},"dts":{"sections":[{"pos":0,"end":149,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":149,"kind":"text"}]},{"pos":149,"end":242,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":149,"end":242,"kind":"text"}]},{"pos":242,"end":260,"kind":"text"}],"mapHash":"-10250552873-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC\"}","hash":"406139541-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n","-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n","7305100057-var c = new C();\nc.doSomething();\n"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-2893455973-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prologue: (0-13):: use strict
"use strict";
----------------------------------------------------------------------
prepend: (14-134):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (14-134)
var s = "Hello, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (134-404):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (134-404)
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
text: (404-438)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-149):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-149)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (149-242):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (149-242)
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (242-260)
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
          "pos": 14,
          "end": 134,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 14,
              "end": 134,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 134,
          "end": 404,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 134,
              "end": 404,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 404,
          "end": 438,
          "kind": "text"
        }
      ],
      "hash": "9182045789-\"use strict\";\nvar s = \"Hello, world\";\nconsole.log(s);\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "40579483013-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 149,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 149,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 149,
          "end": 242,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 149,
              "end": 242,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 242,
          "end": 260,
          "kind": "text"
        }
      ],
      "hash": "406139541-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "-10250552873-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC\"}"
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
      "../../../first/bin/first-output.d.ts": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
      "../../../2/second-output.d.ts": "-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n",
      "../../third_part1.ts": "7305100057-var c = new C();\nc.doSomething();\n"
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
    "outSignature": "-2893455973-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4593
}



Change:: incremental-headers-change-without-dts-changes
Input::
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
console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:24 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:25 AM[0m] Project 'src/first/tsconfig.json' is out of date because output 'src/first/bin/first-output.tsbuildinfo' is older than input 'src/first/first_PART1.ts'

[[90m12:01:26 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:34 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part2.ts' is older than output 'src/2/second-output.tsbuildinfo'

[[90m12:01:35 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:01:36 AM[0m] Updating output of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
"myPrologue";
var s = "Hello, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
4 >             ^^^^^^^^^^->
1 >
2 >"myPrologue"
3 >            
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(1, 14) Source(1, 13) + SourceIndex(0)
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
1->Emitted(2, 1) Source(6, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(6, 7) + SourceIndex(0)
3 >Emitted(2, 6) Source(6, 8) + SourceIndex(0)
4 >Emitted(2, 9) Source(6, 11) + SourceIndex(0)
5 >Emitted(2, 23) Source(6, 25) + SourceIndex(0)
6 >Emitted(2, 24) Source(6, 26) + SourceIndex(0)
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
1 >Emitted(3, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(3, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(3, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(3, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(3, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(3, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(3, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(3, 16) Source(12, 16) + SourceIndex(0)
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
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1 >Emitted(4, 1) Source(13, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(13, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(13, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(13, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(13, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(13, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(13, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(13, 16) + SourceIndex(0)
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
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"myPrologue"},{"pos":14,"end":134,"kind":"text"}],"sources":{"prologues":[{"file":0,"text":"\"myPrologue\"","directives":[{"pos":0,"end":12,"expression":{"pos":0,"end":12,"text":"myPrologue"}}]}]},"mapHash":"-32438518845-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}","hash":"15974240242-\"myPrologue\";\nvar s = \"Hello, world\";\nconsole.log(s);\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map"},"dts":{"sections":[{"pos":0,"end":149,"kind":"text"}],"mapHash":"18068494155-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET\"}","hash":"-14898761250-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map"}},"program":{"fileNames":["../../../lib/lib.d.ts","../first_part1.ts","../first_part2.ts","../first_part3.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","26693021009-\"myPrologue\"\ninterface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nconsole.log(s);","6007494133-console.log(f());\n","4357625305-function f() {\n    return \"JS does hoists\";\n}\n"],"root":[[2,4]],"options":{"composite":true,"declarationMap":true,"outFile":"./first-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n","latestChangedDtsFile":"./first-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
prologue: (0-13):: myPrologue
"myPrologue";
----------------------------------------------------------------------
text: (14-134)
var s = "Hello, world";
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
text: (0-149)
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
          "data": "myPrologue"
        },
        {
          "pos": 14,
          "end": 134,
          "kind": "text"
        }
      ],
      "hash": "15974240242-\"myPrologue\";\nvar s = \"Hello, world\";\nconsole.log(s);\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\n//# sourceMappingURL=first-output.js.map",
      "mapHash": "-32438518845-{\"version\":3,\"file\":\"first-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AAAA,YAAY,CAAA;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC\"}",
      "sources": {
        "prologues": [
          {
            "file": 0,
            "text": "\"myPrologue\"",
            "directives": [
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
          "end": 149,
          "kind": "text"
        }
      ],
      "hash": "-14898761250-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n//# sourceMappingURL=first-output.d.ts.map",
      "mapHash": "18068494155-{\"version\":3,\"file\":\"first-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../first_PART1.ts\",\"../first_part2.ts\",\"../first_part3.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AETD,iBAAS,CAAC,WAET\"}"
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
      "../first_part1.ts": "26693021009-\"myPrologue\"\ninterface TheFirst {\n    none: any;\n}\n\nconst s = \"Hello, world\";\n\ninterface NoJsForHereEither {\n    none: any;\n}\n\nconsole.log(s);\nconsole.log(s);",
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
    "outSignature": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
    "latestChangedDtsFile": "./first-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2934
}

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^^^^^->
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
2 > ^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(12, 2) Source(11, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^->
1->
2 >class 
3 >              C
1->Emitted(13, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(13, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(13, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(14, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(14, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(15, 2) Source(5, 2) + SourceIndex(3)
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
1->Emitted(16, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(16, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(16, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(16, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(16, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(16, 18) Source(1, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.js]
"myPrologue";
"use strict";
var s = "Hello, world";
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,YAAY,CAAA;;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
>>>"myPrologue";
1 >
2 >^^^^^^^^^^^^
3 >            ^
1 >
2 >"myPrologue"
3 >            
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 13) Source(1, 13) + SourceIndex(0)
3 >Emitted(1, 14) Source(1, 13) + SourceIndex(0)
---
>>>"use strict";
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 >
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
1 >Emitted(3, 1) Source(6, 1) + SourceIndex(0)
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
3 > ^^^^^->
1 >
  >
2 >}
1 >Emitted(9, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(9, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(10, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(10, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(10, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(10, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(11, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(11, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(11, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(12, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(12, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(12, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(13, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(13, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(13, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(13, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(13, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(13, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(13, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(13, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^->
1 >
  >    
2 >    }
1 >Emitted(14, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(14, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(15, 5) Source(10, 5) + SourceIndex(3)
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
8 >                  ^^^^->
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
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(17, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^->
1->
1->Emitted(18, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(19, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(19, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^->
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
3 >     ^^^^^^^^->
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
5 >     ^^^^^^^^^^^->
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
1->Emitted(25, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(25, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(25, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(25, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(25, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(25, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(25, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(25, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1 >
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1 >Emitted(26, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(26, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(26, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(26, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(26, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(26, 17) Source(2, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":13,"kind":"prologue","data":"myPrologue"},{"pos":14,"end":27,"kind":"prologue","data":"use strict"},{"pos":28,"end":148,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":28,"end":148,"kind":"text"}]},{"pos":148,"end":418,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":148,"end":418,"kind":"text"}]},{"pos":418,"end":452,"kind":"text"}],"mapHash":"26598307091-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,YAAY,CAAA;;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}","hash":"489186201-\"myPrologue\";\n\"use strict\";\nvar s = \"Hello, world\";\nconsole.log(s);\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\n//# sourceMappingURL=third-output.js.map"},"dts":{"sections":[{"pos":0,"end":149,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":149,"kind":"text"}]},{"pos":149,"end":242,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":149,"end":242,"kind":"text"}]},{"pos":242,"end":260,"kind":"text"}],"mapHash":"28971397851-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC\"}","hash":"406139541-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n//# sourceMappingURL=third-output.d.ts.map"}},"program":{"fileNames":["../../../../lib/lib.d.ts","../../../first/bin/first-output.d.ts","../../../2/second-output.d.ts","../../third_part1.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n","-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n","7305100057-var c = new C();\nc.doSomething();\n"],"root":[4],"options":{"composite":true,"declaration":true,"declarationMap":true,"outFile":"./third-output.js","removeComments":true,"skipDefaultLibCheck":true,"sourceMap":true,"strict":false,"target":1},"outSignature":"-2893455973-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n","latestChangedDtsFile":"./third-output.d.ts"},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prologue: (0-13):: myPrologue
"myPrologue";
----------------------------------------------------------------------
prologue: (14-27):: use strict
"use strict";
----------------------------------------------------------------------
prepend: (28-148):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (28-148)
var s = "Hello, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (148-418):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (148-418)
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
text: (418-452)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-149):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-149)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (149-242):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (149-242)
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (242-260)
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
          "data": "myPrologue"
        },
        {
          "pos": 14,
          "end": 27,
          "kind": "prologue",
          "data": "use strict"
        },
        {
          "pos": 28,
          "end": 148,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 28,
              "end": 148,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 148,
          "end": 418,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 148,
              "end": 418,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 418,
          "end": 452,
          "kind": "text"
        }
      ],
      "hash": "489186201-\"myPrologue\";\n\"use strict\";\nvar s = \"Hello, world\";\nconsole.log(s);\nconsole.log(s);\nconsole.log(f());\nfunction f() {\n    return \"JS does hoists\";\n}\nvar N;\n(function (N) {\n    function f() {\n        console.log('testing');\n    }\n    f();\n})(N || (N = {}));\nvar C = (function () {\n    function C() {\n    }\n    C.prototype.doSomething = function () {\n        console.log(\"something got done\");\n    };\n    return C;\n}());\nvar c = new C();\nc.doSomething();\n//# sourceMappingURL=third-output.js.map",
      "mapHash": "26598307091-{\"version\":3,\"file\":\"third-output.js\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part2.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AAAA,YAAY,CAAA;;AAKZ,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACZf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACVD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 149,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 149,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 149,
          "end": 242,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 149,
              "end": 242,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 242,
          "end": 260,
          "kind": "text"
        }
      ],
      "hash": "406139541-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n//# sourceMappingURL=third-output.d.ts.map",
      "mapHash": "28971397851-{\"version\":3,\"file\":\"third-output.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../../first/first_PART1.ts\",\"../../../first/first_part3.ts\",\"../../../second/second_part1.ts\",\"../../../second/second_part2.ts\",\"../../third_part1.ts\"],\"names\":[],\"mappings\":\"AACA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACTD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;ACVD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC\"}"
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
      "../../../first/bin/first-output.d.ts": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
      "../../../2/second-output.d.ts": "-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n",
      "../../third_part1.ts": "7305100057-var c = new C();\nc.doSomething();\n"
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
    "outSignature": "-2893455973-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\ndeclare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\ndeclare var c: C;\n",
    "latestChangedDtsFile": "./third-output.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4681
}

