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
/* @internal */ const A = 1;

//// [/src/first/first_part2.ts]


//// [/src/first/first_part3.ts]


//// [/src/first/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"sourceMap":true,"outFile":"./bin/first-output.js"},"files":["/src/first/first_PART1.ts"]}

//// [/src/second/second_part1.ts]


//// [/src/second/second_part2.ts]


//// [/src/second/tsconfig.json]


//// [/src/third/third_part1.ts]
const B = 2;

//// [/src/third/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true,"declarationMap":false,"stripInternal":true,"sourceMap":true,"outFile":"./thirdjs/output/third-output.js"},"references":[{"path":"../first","prepend":true}],"files":["/src/third/third_part1.ts"]}



Output::
/lib/tsc --b /src/third --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/thirdjs/output/third-output.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/first/bin/first-output.d.ts]
declare const A = 1;
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts"],"names":[],"mappings":"AAAgB,QAAA,MAAM,CAAC,IAAI,CAAC"}

//// [/src/first/bin/first-output.d.ts.map.baseline.txt]
===================================================================
JsFile: first-output.d.ts
mapUrl: first-output.d.ts.map
sourceRoot: 
sources: ../first_PART1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.d.ts
sourceFile:../first_PART1.ts
-------------------------------------------------------------------
>>>declare const A = 1;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^
6 >                   ^
7 >                    ^^^^^^^^^^^^^^^^^^^^^->
1 >/* @internal */ 
2 >
3 >        const 
4 >              A
5 >                = 1
6 >                   ;
1 >Emitted(1, 1) Source(1, 17) + SourceIndex(0)
2 >Emitted(1, 9) Source(1, 17) + SourceIndex(0)
3 >Emitted(1, 15) Source(1, 23) + SourceIndex(0)
4 >Emitted(1, 16) Source(1, 24) + SourceIndex(0)
5 >Emitted(1, 20) Source(1, 28) + SourceIndex(0)
6 >Emitted(1, 21) Source(1, 29) + SourceIndex(0)
---
>>>//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.js]
/* @internal */ var A = 1;
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts"],"names":[],"mappings":"AAAA,eAAe,CAAC,IAAM,CAAC,GAAG,CAAC,CAAC"}

//// [/src/first/bin/first-output.js.map.baseline.txt]
===================================================================
JsFile: first-output.js
mapUrl: first-output.js.map
sourceRoot: 
sources: ../first_PART1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.js
sourceFile:../first_PART1.ts
-------------------------------------------------------------------
>>>/* @internal */ var A = 1;
1 >
2 >^^^^^^^^^^^^^^^
3 >               ^
4 >                ^^^^
5 >                    ^
6 >                     ^^^
7 >                        ^
8 >                         ^
9 >                          ^^^^^^^^^^^^^->
1 >
2 >/* @internal */
3 >                
4 >                const 
5 >                    A
6 >                      = 
7 >                        1
8 >                         ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 16) Source(1, 16) + SourceIndex(0)
3 >Emitted(1, 17) Source(1, 17) + SourceIndex(0)
4 >Emitted(1, 21) Source(1, 23) + SourceIndex(0)
5 >Emitted(1, 22) Source(1, 24) + SourceIndex(0)
6 >Emitted(1, 25) Source(1, 27) + SourceIndex(0)
7 >Emitted(1, 26) Source(1, 28) + SourceIndex(0)
8 >Emitted(1, 27) Source(1, 29) + SourceIndex(0)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts"],"js":{"sections":[{"pos":0,"end":28,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":20,"kind":"internal"}]}},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-28)
/* @internal */ var A = 1;

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
internal: (0-20)
declare const A = 1;
======================================================================

//// [/src/first/bin/first-output.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "..",
    "sourceFiles": [
      "../first_PART1.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 28,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 20,
          "kind": "internal"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 214
}

//// [/src/third/thirdjs/output/third-output.d.ts]
declare const B = 2;


//// [/src/third/thirdjs/output/third-output.js]
/* @internal */ var A = 1;
var B = 2;
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,eAAe,CAAC,IAAM,CAAC,GAAG,CAAC,CAAC;ACA5B,IAAM,CAAC,GAAG,CAAC,CAAC"}

//// [/src/third/thirdjs/output/third-output.js.map.baseline.txt]
===================================================================
JsFile: third-output.js
mapUrl: third-output.js.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../third_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>/* @internal */ var A = 1;
1 >
2 >^^^^^^^^^^^^^^^
3 >               ^
4 >                ^^^^
5 >                    ^
6 >                     ^^^
7 >                        ^
8 >                         ^
1 >
2 >/* @internal */
3 >                
4 >                const 
5 >                    A
6 >                      = 
7 >                        1
8 >                         ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 16) Source(1, 16) + SourceIndex(0)
3 >Emitted(1, 17) Source(1, 17) + SourceIndex(0)
4 >Emitted(1, 21) Source(1, 23) + SourceIndex(0)
5 >Emitted(1, 22) Source(1, 24) + SourceIndex(0)
6 >Emitted(1, 25) Source(1, 27) + SourceIndex(0)
7 >Emitted(1, 26) Source(1, 28) + SourceIndex(0)
8 >Emitted(1, 27) Source(1, 29) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>var B = 2;
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^
6 >         ^
7 >          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    B
4 >      = 
5 >        2
6 >         ;
1 >Emitted(2, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(2, 5) Source(1, 7) + SourceIndex(1)
3 >Emitted(2, 6) Source(1, 8) + SourceIndex(1)
4 >Emitted(2, 9) Source(1, 11) + SourceIndex(1)
5 >Emitted(2, 10) Source(1, 12) + SourceIndex(1)
6 >Emitted(2, 11) Source(1, 13) + SourceIndex(1)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":28,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":0,"end":28,"kind":"text"}]},{"pos":28,"end":40,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":0,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[]},{"pos":0,"end":22,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prepend: (0-28):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-28)
/* @internal */ var A = 1;

----------------------------------------------------------------------
text: (28-40)
var B = 2;

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-0):: ../../../first/bin/first-output.d.ts texts:: 0
----------------------------------------------------------------------
text: (0-22)
declare const B = 2;

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
          "end": 28,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 28,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 28,
          "end": 40,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 0,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": []
        },
        {
          "pos": 0,
          "end": 22,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 432
}

