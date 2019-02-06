//// [/src/first/bin/.tsbuildinfo]
{
  "js": [
    {
      "pos": 33,
      "end": 160,
      "kind": "text"
    },
    {
      "pos": 160,
      "end": 200,
      "kind": "sourceMapUrl"
    }
  ],
  "dts": [
    {
      "pos": 33,
      "end": 190,
      "kind": "text"
    },
    {
      "pos": 190,
      "end": 232,
      "kind": "sourceMapUrl"
    }
  ],
  "commonSourceDirectory": "/src/first/",
  "sources": {},
  "program": {
    "fileInfos": {
      "/lib/lib.d.ts": {
        "version": "38840781448"
      },
      "/lib/lib.es5.d.ts": {
        "version": "-157947125741"
      },
      "/lib/lib.dom.d.ts": {
        "version": "-1086375748659"
      },
      "/lib/lib.webworker.importscripts.d.ts": {
        "version": "16827914512"
      },
      "/lib/lib.scripthost.d.ts": {
        "version": "-7856822451"
      },
      "/src/first/first_part1.ts": {
        "version": "-9328424368"
      },
      "/src/first/first_part2.ts": {
        "version": "-270744556"
      },
      "/src/first/first_part3.ts": {
        "version": "6202806249"
      }
    },
    "options": {
      "target": 1,
      "composite": true,
      "removeComments": true,
      "strict": false,
      "sourceMap": true,
      "declarationMap": true,
      "outFile": "/src/first/bin/first-output.js",
      "skipDefaultLibCheck": true,
      "configFilePath": "/src/first/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {}
  }
}

//// [/src/first/bin/.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (33-160)
var s = "Hello, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
sourceMapUrl: (160-200)
//# sourceMappingURL=first-output.js.map
======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (33-190)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
sourceMapUrl: (190-232)
//# sourceMappingURL=first-output.d.ts.map
======================================================================

//// [/src/first/bin/first-output.js]
#!someshebang first first_PART1
var s = "Hello, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAKA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACDjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>#!someshebang first first_PART1
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 >#!someshebang first first_PART1
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
1 >Emitted(2, 1) Source(6, 1) + SourceIndex(0)
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
1->Emitted(4, 1) Source(13, 1) + SourceIndex(0)
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
1->#!someshebang first first_part2
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            f
7 >             ()
8 >               )
9 >                ;
1->Emitted(5, 1) Source(2, 1) + SourceIndex(1)
2 >Emitted(5, 8) Source(2, 8) + SourceIndex(1)
3 >Emitted(5, 9) Source(2, 9) + SourceIndex(1)
4 >Emitted(5, 12) Source(2, 12) + SourceIndex(1)
5 >Emitted(5, 13) Source(2, 13) + SourceIndex(1)
6 >Emitted(5, 14) Source(2, 14) + SourceIndex(1)
7 >Emitted(5, 16) Source(2, 16) + SourceIndex(1)
8 >Emitted(5, 17) Source(2, 17) + SourceIndex(1)
9 >Emitted(5, 18) Source(2, 18) + SourceIndex(1)
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

//// [/src/first/first_PART1.ts]
#!someshebang first first_PART1
interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
console.log(s);

//// [/src/third/thirdjs/output/.tsbuildinfo]
{
  "js": [
    {
      "pos": 33,
      "end": 200,
      "kind": "prepend",
      "data": "/src/first/bin/first-output.js"
    },
    {
      "pos": 202,
      "end": 528,
      "kind": "prepend",
      "data": "/src/2/second-output.js"
    },
    {
      "pos": 530,
      "end": 566,
      "kind": "text"
    },
    {
      "pos": 566,
      "end": 606,
      "kind": "sourceMapUrl"
    }
  ],
  "dts": [
    {
      "pos": 33,
      "end": 232,
      "kind": "prepend",
      "data": "/src/first/bin/first-output.d.ts"
    },
    {
      "pos": 234,
      "end": 377,
      "kind": "prepend",
      "data": "/src/2/second-output.d.ts"
    },
    {
      "pos": 379,
      "end": 398,
      "kind": "text"
    },
    {
      "pos": 398,
      "end": 440,
      "kind": "sourceMapUrl"
    }
  ],
  "commonSourceDirectory": "/src/third/",
  "sources": {},
  "program": {
    "fileInfos": {
      "/lib/lib.d.ts": {
        "version": "38840781448"
      },
      "/lib/lib.es5.d.ts": {
        "version": "-157947125741"
      },
      "/lib/lib.dom.d.ts": {
        "version": "-1086375748659"
      },
      "/lib/lib.webworker.importscripts.d.ts": {
        "version": "16827914512"
      },
      "/lib/lib.scripthost.d.ts": {
        "version": "-7856822451"
      },
      "/src/first/bin/first-output.d.ts": {
        "version": "15850402116"
      },
      "/src/2/second-output.d.ts": {
        "version": "-16482341849"
      },
      "/src/third/third_part1.ts": {
        "version": "4470817290"
      }
    },
    "options": {
      "target": 1,
      "composite": true,
      "removeComments": true,
      "strict": false,
      "sourceMap": true,
      "declarationMap": true,
      "declaration": true,
      "outFile": "/src/third/thirdjs/output/third-output.js",
      "skipDefaultLibCheck": true,
      "configFilePath": "/src/third/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {}
  }
}

//// [/src/third/thirdjs/output/.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prepend: (33-200):: /src/first/bin/first-output.js
var s = "Hello, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map
----------------------------------------------------------------------
prepend: (202-528):: /src/2/second-output.js
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
----------------------------------------------------------------------
text: (530-566)
var c = new C();
c.doSomething();

----------------------------------------------------------------------
sourceMapUrl: (566-606)
//# sourceMappingURL=third-output.js.map
======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (33-232):: /src/first/bin/first-output.d.ts
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map
----------------------------------------------------------------------
prepend: (234-377):: /src/2/second-output.d.ts
declare namespace N {
}
declare namespace N {
}
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map
----------------------------------------------------------------------
text: (379-398)
declare var c: C;

----------------------------------------------------------------------
sourceMapUrl: (398-440)
//# sourceMappingURL=third-output.d.ts.map
======================================================================

//// [/src/third/thirdjs/output/third-output.js]
#!someshebang first first_PART1
var s = "Hello, world";
console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map
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
var c = new C();
c.doSomething();
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";AAKA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACDjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;;ACGD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;ACXD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;;ACHD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
>>>#!someshebang first first_PART1
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 >#!someshebang first first_PART1
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
1 >Emitted(2, 1) Source(6, 1) + SourceIndex(0)
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
1->Emitted(4, 1) Source(13, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(13, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(13, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(13, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(13, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(13, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(13, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(13, 16) + SourceIndex(0)
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
1->#!someshebang first first_part2
  >
2 >console
3 >       .
4 >        log
5 >           (
6 >            f
7 >             ()
8 >               )
9 >                ;
1->Emitted(5, 1) Source(2, 1) + SourceIndex(1)
2 >Emitted(5, 8) Source(2, 8) + SourceIndex(1)
3 >Emitted(5, 9) Source(2, 9) + SourceIndex(1)
4 >Emitted(5, 12) Source(2, 12) + SourceIndex(1)
5 >Emitted(5, 13) Source(2, 13) + SourceIndex(1)
6 >Emitted(5, 14) Source(2, 14) + SourceIndex(1)
7 >Emitted(5, 16) Source(2, 16) + SourceIndex(1)
8 >Emitted(5, 17) Source(2, 17) + SourceIndex(1)
9 >Emitted(5, 18) Source(2, 18) + SourceIndex(1)
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
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
>>>//# sourceMappingURL=first-output.js.map
>>>var N;
1->
2 >^^^^
3 >    ^
4 >     ^
5 >      ^^^^^^^^^^->
1->#!someshebang second second_part1
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
1->Emitted(10, 1) Source(6, 1) + SourceIndex(3)
2 >Emitted(10, 5) Source(6, 11) + SourceIndex(3)
3 >Emitted(10, 6) Source(6, 12) + SourceIndex(3)
4 >Emitted(10, 7) Source(12, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(11, 1) Source(6, 1) + SourceIndex(3)
2 >Emitted(11, 12) Source(6, 11) + SourceIndex(3)
3 >Emitted(11, 13) Source(6, 12) + SourceIndex(3)
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
1->Emitted(12, 5) Source(7, 5) + SourceIndex(3)
2 >Emitted(12, 14) Source(7, 14) + SourceIndex(3)
3 >Emitted(12, 15) Source(7, 15) + SourceIndex(3)
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
1->Emitted(13, 9) Source(8, 9) + SourceIndex(3)
2 >Emitted(13, 16) Source(8, 16) + SourceIndex(3)
3 >Emitted(13, 17) Source(8, 17) + SourceIndex(3)
4 >Emitted(13, 20) Source(8, 20) + SourceIndex(3)
5 >Emitted(13, 21) Source(8, 21) + SourceIndex(3)
6 >Emitted(13, 30) Source(8, 30) + SourceIndex(3)
7 >Emitted(13, 31) Source(8, 31) + SourceIndex(3)
8 >Emitted(13, 32) Source(8, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(14, 5) Source(9, 5) + SourceIndex(3)
2 >Emitted(14, 6) Source(9, 6) + SourceIndex(3)
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
1->Emitted(15, 5) Source(11, 5) + SourceIndex(3)
2 >Emitted(15, 6) Source(11, 6) + SourceIndex(3)
3 >Emitted(15, 8) Source(11, 8) + SourceIndex(3)
4 >Emitted(15, 9) Source(11, 9) + SourceIndex(3)
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
1->Emitted(16, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(16, 2) Source(12, 2) + SourceIndex(3)
3 >Emitted(16, 4) Source(6, 11) + SourceIndex(3)
4 >Emitted(16, 5) Source(6, 12) + SourceIndex(3)
5 >Emitted(16, 10) Source(6, 11) + SourceIndex(3)
6 >Emitted(16, 11) Source(6, 12) + SourceIndex(3)
7 >Emitted(16, 19) Source(12, 2) + SourceIndex(3)
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
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
>>>//# sourceMappingURL=second-output.js.map
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
1->#!someshebang third third_part1
  >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(26, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(26, 5) Source(2, 5) + SourceIndex(5)
3 >Emitted(26, 6) Source(2, 6) + SourceIndex(5)
4 >Emitted(26, 9) Source(2, 9) + SourceIndex(5)
5 >Emitted(26, 13) Source(2, 13) + SourceIndex(5)
6 >Emitted(26, 14) Source(2, 14) + SourceIndex(5)
7 >Emitted(26, 16) Source(2, 16) + SourceIndex(5)
8 >Emitted(26, 17) Source(2, 17) + SourceIndex(5)
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
1->Emitted(27, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(27, 2) Source(3, 2) + SourceIndex(5)
3 >Emitted(27, 3) Source(3, 3) + SourceIndex(5)
4 >Emitted(27, 14) Source(3, 14) + SourceIndex(5)
5 >Emitted(27, 16) Source(3, 16) + SourceIndex(5)
6 >Emitted(27, 17) Source(3, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

