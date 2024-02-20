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

//// [/src/app/file3.ts]
export const z = 30;
import { x } from "lib/file1";


//// [/src/app/file4.ts]
const myVar = 30;

//// [/src/app/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "target": "es5",
    "module": "amd",
    "composite": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "outFile": "module.js"
  },
  "exclude": [
    "module.d.ts"
  ],
  "references": [
    {
      "path": "../lib",
      "prepend": true
    }
  ]
}

//// [/src/lib/file0.ts]
const myGlob = 20;

//// [/src/lib/file1.ts]
export const x = 10;

//// [/src/lib/file2.ts]
export const y = 20;

//// [/src/lib/global.ts]
const globalConst = 10;

//// [/src/lib/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "module": "amd",
    "composite": true,
    "sourceMap": true,
    "declarationMap": true,
    "strict": false,
    "outFile": "../module.js", "rootDir": "../"
  },
  "exclude": [
    "module.d.ts"
  ]
}



Output::
/lib/tsc -b /src/app --verbose
[[90m12:00:18 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:00:19 AM[0m] Project 'src/lib/tsconfig.json' is out of date because output file 'src/module.tsbuildinfo' does not exist

[[90m12:00:20 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:00:29 AM[0m] Project 'src/app/tsconfig.json' is out of date because output file 'src/app/module.tsbuildinfo' does not exist

[[90m12:00:30 AM[0m] Building project '/src/app/tsconfig.json'...

[96msrc/app/tsconfig.json[0m:[93m16[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m16[0m     {
[7m  [0m [91m    ~[0m
[7m17[0m       "path": "../lib",
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m18[0m       "prepend": true
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[7m19[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/module.d.ts]
declare const myGlob = 20;
declare module "lib/file1" {
    export const x = 10;
}
declare module "lib/file2" {
    export const y = 20;
}
declare const globalConst = 10;
//# sourceMappingURL=module.d.ts.map

//// [/src/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["lib/file0.ts","lib/file1.ts","lib/file2.ts","lib/global.ts"],"names":[],"mappings":"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC"}

//// [/src/module.d.ts.map.baseline.txt]
===================================================================
JsFile: module.d.ts
mapUrl: module.d.ts.map
sourceRoot: 
sources: lib/file0.ts,lib/file1.ts,lib/file2.ts,lib/global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/module.d.ts
sourceFile:lib/file0.ts
-------------------------------------------------------------------
>>>declare const myGlob = 20;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^
5 >                    ^^^^^
6 >                         ^
7 >                          ^^->
1 >
2 >
3 >        const 
4 >              myGlob
5 >                     = 20
6 >                         ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 9) Source(1, 1) + SourceIndex(0)
3 >Emitted(1, 15) Source(1, 7) + SourceIndex(0)
4 >Emitted(1, 21) Source(1, 13) + SourceIndex(0)
5 >Emitted(1, 26) Source(1, 18) + SourceIndex(0)
6 >Emitted(1, 27) Source(1, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/module.d.ts
sourceFile:lib/file1.ts
-------------------------------------------------------------------
>>>declare module "lib/file1" {
>>>    export const x = 10;
1->^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1->
2 >    export
3 >           
4 >           const 
5 >                 x
6 >                   = 10
7 >                       ;
1->Emitted(3, 5) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 11) Source(1, 7) + SourceIndex(1)
3 >Emitted(3, 12) Source(1, 8) + SourceIndex(1)
4 >Emitted(3, 18) Source(1, 14) + SourceIndex(1)
5 >Emitted(3, 19) Source(1, 15) + SourceIndex(1)
6 >Emitted(3, 24) Source(1, 20) + SourceIndex(1)
7 >Emitted(3, 25) Source(1, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/module.d.ts
sourceFile:lib/file2.ts
-------------------------------------------------------------------
>>>}
>>>declare module "lib/file2" {
>>>    export const y = 20;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1 >
2 >    export
3 >           
4 >           const 
5 >                 y
6 >                   = 20
7 >                       ;
1 >Emitted(6, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(6, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(6, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(6, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(6, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(6, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(6, 25) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/module.d.ts
sourceFile:lib/global.ts
-------------------------------------------------------------------
>>>}
>>>declare const globalConst = 10;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^
5 >                         ^^^^^
6 >                              ^
7 >                               ^^^^->
1 >
2 >
3 >        const 
4 >              globalConst
5 >                          = 10
6 >                              ;
1 >Emitted(8, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(8, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(8, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(8, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(8, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(8, 32) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/module.js]
var myGlob = 20;
define("lib/file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("lib/file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
//# sourceMappingURL=module.js.map

//// [/src/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["lib/file0.ts","lib/file1.ts","lib/file2.ts","lib/global.ts"],"names":[],"mappings":"AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICAP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

//// [/src/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: lib/file0.ts,lib/file1.ts,lib/file2.ts,lib/global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/module.js
sourceFile:lib/file0.ts
-------------------------------------------------------------------
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(1, 7) + SourceIndex(0)
3 >Emitted(1, 11) Source(1, 13) + SourceIndex(0)
4 >Emitted(1, 14) Source(1, 16) + SourceIndex(0)
5 >Emitted(1, 16) Source(1, 18) + SourceIndex(0)
6 >Emitted(1, 17) Source(1, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/module.js
sourceFile:lib/file1.ts
-------------------------------------------------------------------
>>>define("lib/file1", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.x = void 0;
>>>    exports.x = 10;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1->export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(6, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(6, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(6, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(6, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(6, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(6, 20) Source(1, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/module.js
sourceFile:lib/file2.ts
-------------------------------------------------------------------
>>>});
>>>define("lib/file2", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.y = void 0;
>>>    exports.y = 20;
1 >^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1 >export const 
2 >    
3 >            y
4 >              = 
5 >                20
6 >                  ;
1 >Emitted(12, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(12, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(12, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(12, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(12, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(12, 20) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/module.js
sourceFile:lib/global.ts
-------------------------------------------------------------------
>>>});
>>>var globalConst = 10;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^
4 >               ^^^
5 >                  ^^
6 >                    ^
7 >                     ^^^^^^^^^^^^->
1 >
2 >const 
3 >    globalConst
4 >                = 
5 >                  10
6 >                    ;
1 >Emitted(14, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(14, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(14, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(14, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(14, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(14, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./lib/file0.ts","./lib/file1.ts","./lib/file2.ts","./lib/global.ts"],"js":{"sections":[{"pos":0,"end":453,"kind":"text"}],"mapHash":"-9312331865-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"lib/file0.ts\",\"lib/file1.ts\",\"lib/file2.ts\",\"lib/global.ts\"],\"names\":[],\"mappings\":\"AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICAP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}","hash":"20009471207-var myGlob = 20;\ndefine(\"lib/file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"lib/file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\nvar globalConst = 10;\n//# sourceMappingURL=module.js.map"},"dts":{"sections":[{"pos":0,"end":171,"kind":"text"}],"mapHash":"34877575893-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"lib/file0.ts\",\"lib/file1.ts\",\"lib/file2.ts\",\"lib/global.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}","hash":"-11606139032-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n//# sourceMappingURL=module.d.ts.map"}},"program":{"fileNames":["../lib/lib.d.ts","./lib/file0.ts","./lib/file1.ts","./lib/file2.ts","./lib/global.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","3587416848-const myGlob = 20;","-10726455937-export const x = 10;","-13729954175-export const y = 20;","1028229885-const globalConst = 10;"],"root":[[2,5]],"options":{"composite":true,"declarationMap":true,"module":2,"outFile":"./module.js","rootDir":"./","sourceMap":true,"strict":false,"target":1},"outSignature":"-21806566655-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n","latestChangedDtsFile":"./module.d.ts"},"version":"FakeTSVersion"}

//// [/src/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/module.js
----------------------------------------------------------------------
text: (0-453)
var myGlob = 20;
define("lib/file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("lib/file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

======================================================================
======================================================================
File:: /src/module.d.ts
----------------------------------------------------------------------
text: (0-171)
declare const myGlob = 20;
declare module "lib/file1" {
    export const x = 10;
}
declare module "lib/file2" {
    export const y = 20;
}
declare const globalConst = 10;

======================================================================

//// [/src/module.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./lib/file0.ts",
      "./lib/file1.ts",
      "./lib/file2.ts",
      "./lib/global.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 453,
          "kind": "text"
        }
      ],
      "hash": "20009471207-var myGlob = 20;\ndefine(\"lib/file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n});\ndefine(\"lib/file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\nvar globalConst = 10;\n//# sourceMappingURL=module.js.map",
      "mapHash": "-9312331865-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"lib/file0.ts\",\"lib/file1.ts\",\"lib/file2.ts\",\"lib/global.ts\"],\"names\":[],\"mappings\":\"AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICAP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 171,
          "kind": "text"
        }
      ],
      "hash": "-11606139032-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n//# sourceMappingURL=module.d.ts.map",
      "mapHash": "34877575893-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"lib/file0.ts\",\"lib/file1.ts\",\"lib/file2.ts\",\"lib/global.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./lib/file0.ts",
      "./lib/file1.ts",
      "./lib/file2.ts",
      "./lib/global.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./lib/file0.ts": "3587416848-const myGlob = 20;",
      "./lib/file1.ts": "-10726455937-export const x = 10;",
      "./lib/file2.ts": "-13729954175-export const y = 20;",
      "./lib/global.ts": "1028229885-const globalConst = 10;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./lib/file0.ts",
          "./lib/file1.ts",
          "./lib/file2.ts",
          "./lib/global.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "module": 2,
      "outFile": "./module.js",
      "rootDir": "./",
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "-21806566655-declare const myGlob = 20;\ndeclare module \"lib/file1\" {\n    export const x = 10;\n}\ndeclare module \"lib/file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n",
    "latestChangedDtsFile": "./module.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2829
}

