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
#!someshebang app file3
export const z = 30;
import { x } from "file1";

//// [/src/app/file4.ts]
const myVar = 30;

//// [/src/app/tsconfig.json]
{
    "compilerOptions": {
        "target": "es5",
        "module": "amd",
        "composite": true,
        "strict": false,
        "sourceMap": true,
        "declarationMap": true,
        "outFile": "module.js"
    },
    "exclude": ["module.d.ts"],
    "references": [
        { "path": "../lib", "prepend": true }
    ]
}

//// [/src/lib/file0.ts]
#!someshebang lib file0
const myGlob = 20;

//// [/src/lib/file1.ts]
#!someshebang lib file1
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
        "outFile": "module.js"
    },
    "exclude": ["module.d.ts"]

}



Output::
/lib/tsc --b /src/app --verbose
[[90m12:00:09 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:00:10 AM[0m] Project 'src/lib/tsconfig.json' is out of date because output file 'src/lib/module.tsbuildinfo' does not exist

[[90m12:00:11 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:00:21 AM[0m] Project 'src/app/tsconfig.json' is out of date because output file 'src/app/module.tsbuildinfo' does not exist

[[90m12:00:22 AM[0m] Building project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/app/module.d.ts]
#!someshebang lib file0
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;
//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC;;ICCvB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACDpB,QAAA,MAAM,KAAK,KAAK,CAAC"}

//// [/src/app/module.d.ts.map.baseline.txt]
===================================================================
JsFile: module.d.ts
mapUrl: module.d.ts.map
sourceRoot: 
sources: ../lib/file0.ts,../lib/file1.ts,../lib/file2.ts,../lib/global.ts,file3.ts,file4.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>declare const myGlob = 20;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^
5 >                    ^^^^^
6 >                         ^
1 >#!someshebang lib file0
  >
2 >
3 >        const 
4 >              myGlob
5 >                     = 20
6 >                         ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 1) + SourceIndex(0)
3 >Emitted(2, 15) Source(2, 7) + SourceIndex(0)
4 >Emitted(2, 21) Source(2, 13) + SourceIndex(0)
5 >Emitted(2, 26) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 27) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/file1.ts
-------------------------------------------------------------------
>>>declare module "file1" {
>>>    export const x = 10;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1 >#!someshebang lib file1
  >
2 >    export
3 >           
4 >           const 
5 >                 x
6 >                   = 10
7 >                       ;
1 >Emitted(4, 5) Source(2, 1) + SourceIndex(1)
2 >Emitted(4, 11) Source(2, 7) + SourceIndex(1)
3 >Emitted(4, 12) Source(2, 8) + SourceIndex(1)
4 >Emitted(4, 18) Source(2, 14) + SourceIndex(1)
5 >Emitted(4, 19) Source(2, 15) + SourceIndex(1)
6 >Emitted(4, 24) Source(2, 20) + SourceIndex(1)
7 >Emitted(4, 25) Source(2, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/file2.ts
-------------------------------------------------------------------
>>>}
>>>declare module "file2" {
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
1 >Emitted(7, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(7, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(7, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(7, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(7, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(7, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(7, 25) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/global.ts
-------------------------------------------------------------------
>>>}
>>>declare const globalConst = 10;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^
5 >                         ^^^^^
6 >                              ^
1 >
2 >
3 >        const 
4 >              globalConst
5 >                          = 10
6 >                              ;
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(9, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(9, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(9, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(9, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(9, 32) Source(1, 24) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:file3.ts
-------------------------------------------------------------------
>>>declare module "file3" {
>>>    export const z = 30;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1 >#!someshebang app file3
  >
2 >    export
3 >           
4 >           const 
5 >                 z
6 >                   = 30
7 >                       ;
1 >Emitted(11, 5) Source(2, 1) + SourceIndex(4)
2 >Emitted(11, 11) Source(2, 7) + SourceIndex(4)
3 >Emitted(11, 12) Source(2, 8) + SourceIndex(4)
4 >Emitted(11, 18) Source(2, 14) + SourceIndex(4)
5 >Emitted(11, 19) Source(2, 15) + SourceIndex(4)
6 >Emitted(11, 24) Source(2, 20) + SourceIndex(4)
7 >Emitted(11, 25) Source(2, 21) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:file4.ts
-------------------------------------------------------------------
>>>}
>>>declare const myVar = 30;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^
5 >                   ^^^^^
6 >                        ^
7 >                         ^^^^^^^^^^->
1 >
2 >
3 >        const 
4 >              myVar
5 >                    = 30
6 >                        ;
1 >Emitted(13, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(13, 9) Source(1, 1) + SourceIndex(5)
3 >Emitted(13, 15) Source(1, 7) + SourceIndex(5)
4 >Emitted(13, 20) Source(1, 12) + SourceIndex(5)
5 >Emitted(13, 25) Source(1, 17) + SourceIndex(5)
6 >Emitted(13, 26) Source(1, 18) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.js]
#!someshebang lib file0
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;
//# sourceMappingURL=module.js.map

//// [/src/app/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICDP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICCV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACDpB,IAAM,KAAK,GAAG,EAAE,CAAC"}

//// [/src/app/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: ../lib/file0.ts,../lib/file1.ts,../lib/file2.ts,../lib/global.ts,file3.ts,file4.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >#!someshebang lib file0
  >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(2, 7) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 13) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 16) + SourceIndex(0)
5 >Emitted(2, 16) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 17) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file1.ts
-------------------------------------------------------------------
>>>define("file1", ["require", "exports"], function (require, exports) {
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
1->#!someshebang lib file1
  >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(7, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(7, 13) Source(2, 14) + SourceIndex(1)
3 >Emitted(7, 14) Source(2, 15) + SourceIndex(1)
4 >Emitted(7, 17) Source(2, 18) + SourceIndex(1)
5 >Emitted(7, 19) Source(2, 20) + SourceIndex(1)
6 >Emitted(7, 20) Source(2, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
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
1 >Emitted(13, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(13, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(13, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(13, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(13, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(13, 20) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/global.ts
-------------------------------------------------------------------
>>>});
>>>var globalConst = 10;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^
4 >               ^^^
5 >                  ^^
6 >                    ^
7 >                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    globalConst
4 >                = 
5 >                  10
6 >                    ;
1 >Emitted(15, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(15, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(15, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(15, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(15, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(15, 22) Source(1, 24) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file3.ts
-------------------------------------------------------------------
>>>define("file3", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.z = void 0;
>>>    exports.z = 30;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1->#!someshebang app file3
  >export const 
2 >    
3 >            z
4 >              = 
5 >                30
6 >                  ;
1->Emitted(20, 5) Source(2, 14) + SourceIndex(4)
2 >Emitted(20, 13) Source(2, 14) + SourceIndex(4)
3 >Emitted(20, 14) Source(2, 15) + SourceIndex(4)
4 >Emitted(20, 17) Source(2, 18) + SourceIndex(4)
5 >Emitted(20, 19) Source(2, 20) + SourceIndex(4)
6 >Emitted(20, 20) Source(2, 21) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file4.ts
-------------------------------------------------------------------
>>>});
>>>var myVar = 30;
1 >
2 >^^^^
3 >    ^^^^^
4 >         ^^^
5 >            ^^
6 >              ^
7 >               ^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myVar
4 >          = 
5 >            30
6 >              ;
1 >Emitted(22, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(22, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(22, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(22, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(22, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(22, 16) Source(1, 18) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/app/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file3.ts","./file4.ts"],"js":{"sections":[{"pos":25,"end":484,"kind":"prepend","data":"../lib/module.js","texts":[{"pos":25,"end":484,"kind":"text"}]},{"pos":484,"end":710,"kind":"text"}],"mapHash":"-9078462836-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"../lib/file0.ts\",\"../lib/file1.ts\",\"../lib/file2.ts\",\"../lib/global.ts\",\"file3.ts\",\"file4.ts\"],\"names\":[],\"mappings\":\";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICDP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICCV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACDpB,IAAM,KAAK,GAAG,EAAE,CAAC\"}","hash":"18621375477-#!someshebang lib file0\r\nvar myGlob = 20;\r\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.y = void 0;\r\n    exports.y = 20;\r\n});\r\nvar globalConst = 10;\r\ndefine(\"file3\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.z = void 0;\r\n    exports.z = 30;\r\n});\r\nvar myVar = 30;\r\n//# sourceMappingURL=module.js.map"},"dts":{"sections":[{"pos":25,"end":196,"kind":"prepend","data":"../lib/module.d.ts","texts":[{"pos":25,"end":196,"kind":"text"}]},{"pos":196,"end":278,"kind":"text"}],"mapHash":"-32924248397-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../lib/file0.ts\",\"../lib/file1.ts\",\"../lib/file2.ts\",\"../lib/global.ts\",\"file3.ts\",\"file4.ts\"],\"names\":[],\"mappings\":\";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC;;ICCvB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACDpB,QAAA,MAAM,KAAK,KAAK,CAAC\"}","hash":"-6019253934-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\ndeclare module \"file3\" {\r\n    export const z = 30;\r\n}\r\ndeclare const myVar = 30;\r\n//# sourceMappingURL=module.d.ts.map"}},"program":{"fileNames":["./file3.ts","./file4.ts"],"fileInfos":["7745078967-#!someshebang app file3\nexport const z = 30;\r\nimport { x } from \"file1\";","1463681686-const myVar = 30;"],"options":{"composite":true,"outFile":"./module.js"},"outSignature":"1766703083-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\ndeclare module \"file3\" {\r\n    export const z = 30;\r\n}\r\ndeclare const myVar = 30;\r\n","dtsChangeTime":23000},"version":"FakeTSVersion"}

//// [/src/app/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/app/module.js
----------------------------------------------------------------------
prepend: (25-484):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (25-484)
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (484-710)
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;

======================================================================
======================================================================
File:: /src/app/module.d.ts
----------------------------------------------------------------------
prepend: (25-196):: ../lib/module.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (25-196)
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

----------------------------------------------------------------------
text: (196-278)
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;

======================================================================

//// [/src/app/module.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./file3.ts",
      "./file4.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 25,
          "end": 484,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 25,
              "end": 484,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 484,
          "end": 710,
          "kind": "text"
        }
      ],
      "hash": "18621375477-#!someshebang lib file0\r\nvar myGlob = 20;\r\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.y = void 0;\r\n    exports.y = 20;\r\n});\r\nvar globalConst = 10;\r\ndefine(\"file3\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.z = void 0;\r\n    exports.z = 30;\r\n});\r\nvar myVar = 30;\r\n//# sourceMappingURL=module.js.map",
      "mapHash": "-9078462836-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"../lib/file0.ts\",\"../lib/file1.ts\",\"../lib/file2.ts\",\"../lib/global.ts\",\"file3.ts\",\"file4.ts\"],\"names\":[],\"mappings\":\";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICDP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICCV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACDpB,IAAM,KAAK,GAAG,EAAE,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 25,
          "end": 196,
          "kind": "prepend",
          "data": "../lib/module.d.ts",
          "texts": [
            {
              "pos": 25,
              "end": 196,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 196,
          "end": 278,
          "kind": "text"
        }
      ],
      "hash": "-6019253934-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\ndeclare module \"file3\" {\r\n    export const z = 30;\r\n}\r\ndeclare const myVar = 30;\r\n//# sourceMappingURL=module.d.ts.map",
      "mapHash": "-32924248397-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../lib/file0.ts\",\"../lib/file1.ts\",\"../lib/file2.ts\",\"../lib/global.ts\",\"file3.ts\",\"file4.ts\"],\"names\":[],\"mappings\":\";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC;;ICCvB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACDpB,QAAA,MAAM,KAAK,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "./file3.ts",
      "./file4.ts"
    ],
    "fileInfos": {
      "./file3.ts": "7745078967-#!someshebang app file3\nexport const z = 30;\r\nimport { x } from \"file1\";",
      "./file4.ts": "1463681686-const myVar = 30;"
    },
    "options": {
      "composite": true,
      "outFile": "./module.js"
    },
    "outSignature": "1766703083-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\ndeclare module \"file3\" {\r\n    export const z = 30;\r\n}\r\ndeclare const myVar = 30;\r\n",
    "dtsChangeTime": 23000
  },
  "version": "FakeTSVersion",
  "size": 3128
}

//// [/src/lib/module.d.ts]
#!someshebang lib file0
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;
//# sourceMappingURL=module.d.ts.map

//// [/src/lib/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC"}

//// [/src/lib/module.d.ts.map.baseline.txt]
===================================================================
JsFile: module.d.ts
mapUrl: module.d.ts.map
sourceRoot: 
sources: file0.ts,file1.ts,file2.ts,global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/lib/module.d.ts
sourceFile:file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>declare const myGlob = 20;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^
5 >                    ^^^^^
6 >                         ^
1 >#!someshebang lib file0
  >
2 >
3 >        const 
4 >              myGlob
5 >                     = 20
6 >                         ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 1) + SourceIndex(0)
3 >Emitted(2, 15) Source(2, 7) + SourceIndex(0)
4 >Emitted(2, 21) Source(2, 13) + SourceIndex(0)
5 >Emitted(2, 26) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 27) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.d.ts
sourceFile:file1.ts
-------------------------------------------------------------------
>>>declare module "file1" {
>>>    export const x = 10;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^
6 >                  ^^^^^
7 >                       ^
1 >#!someshebang lib file1
  >
2 >    export
3 >           
4 >           const 
5 >                 x
6 >                   = 10
7 >                       ;
1 >Emitted(4, 5) Source(2, 1) + SourceIndex(1)
2 >Emitted(4, 11) Source(2, 7) + SourceIndex(1)
3 >Emitted(4, 12) Source(2, 8) + SourceIndex(1)
4 >Emitted(4, 18) Source(2, 14) + SourceIndex(1)
5 >Emitted(4, 19) Source(2, 15) + SourceIndex(1)
6 >Emitted(4, 24) Source(2, 20) + SourceIndex(1)
7 >Emitted(4, 25) Source(2, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.d.ts
sourceFile:file2.ts
-------------------------------------------------------------------
>>>}
>>>declare module "file2" {
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
1 >Emitted(7, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(7, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(7, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(7, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(7, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(7, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(7, 25) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.d.ts
sourceFile:global.ts
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
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(9, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(9, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(9, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(9, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(9, 32) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/lib/module.js]
#!someshebang lib file0
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
//# sourceMappingURL=module.js.map

//// [/src/lib/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICDP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

//// [/src/lib/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: file0.ts,file1.ts,file2.ts,global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >#!someshebang lib file0
  >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(2, 7) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 13) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 16) + SourceIndex(0)
5 >Emitted(2, 16) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 17) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file1.ts
-------------------------------------------------------------------
>>>define("file1", ["require", "exports"], function (require, exports) {
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
1->#!someshebang lib file1
  >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(7, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(7, 13) Source(2, 14) + SourceIndex(1)
3 >Emitted(7, 14) Source(2, 15) + SourceIndex(1)
4 >Emitted(7, 17) Source(2, 18) + SourceIndex(1)
5 >Emitted(7, 19) Source(2, 20) + SourceIndex(1)
6 >Emitted(7, 20) Source(2, 21) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
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
1 >Emitted(13, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(13, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(13, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(13, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(13, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(13, 20) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:global.ts
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
1 >Emitted(15, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(15, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(15, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(15, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(15, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(15, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"js":{"sections":[{"pos":25,"end":484,"kind":"text"}],"mapHash":"36962111119-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICDP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}","hash":"29113258623-#!someshebang lib file0\r\nvar myGlob = 20;\r\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.y = void 0;\r\n    exports.y = 20;\r\n});\r\nvar globalConst = 10;\r\n//# sourceMappingURL=module.js.map"},"dts":{"sections":[{"pos":25,"end":196,"kind":"text"}],"mapHash":"-5431151811-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}","hash":"-11899867630-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\n//# sourceMappingURL=module.d.ts.map"}},"program":{"fileNames":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"fileInfos":["7942086417-#!someshebang lib file0\nconst myGlob = 20;","378638433-#!someshebang lib file1\nexport const x = 10;","-13729954175-export const y = 20;","1028229885-const globalConst = 10;"],"options":{"composite":true,"outFile":"./module.js"},"outSignature":"-3021253461-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\n","dtsChangeTime":12000},"version":"FakeTSVersion"}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
text: (25-484)
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

======================================================================
======================================================================
File:: /src/lib/module.d.ts
----------------------------------------------------------------------
text: (25-196)
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

======================================================================

//// [/src/lib/module.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./file0.ts",
      "./file1.ts",
      "./file2.ts",
      "./global.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 25,
          "end": 484,
          "kind": "text"
        }
      ],
      "hash": "29113258623-#!someshebang lib file0\r\nvar myGlob = 20;\r\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n});\r\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.y = void 0;\r\n    exports.y = 20;\r\n});\r\nvar globalConst = 10;\r\n//# sourceMappingURL=module.js.map",
      "mapHash": "36962111119-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;;;;;;ICDP,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 25,
          "end": 196,
          "kind": "text"
        }
      ],
      "hash": "-11899867630-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\n//# sourceMappingURL=module.d.ts.map",
      "mapHash": "-5431151811-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "./file0.ts",
      "./file1.ts",
      "./file2.ts",
      "./global.ts"
    ],
    "fileInfos": {
      "./file0.ts": "7942086417-#!someshebang lib file0\nconst myGlob = 20;",
      "./file1.ts": "378638433-#!someshebang lib file1\nexport const x = 10;",
      "./file2.ts": "-13729954175-export const y = 20;",
      "./global.ts": "1028229885-const globalConst = 10;"
    },
    "options": {
      "composite": true,
      "outFile": "./module.js"
    },
    "outSignature": "-3021253461-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\n",
    "dtsChangeTime": 12000
  },
  "version": "FakeTSVersion",
  "size": 2350
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/lib/file1.ts]
#!someshebang lib file1
export const x = 10;console.log(x);



Output::
/lib/tsc --b /src/app --verbose
[[90m12:00:37 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:00:38 AM[0m] Project 'src/lib/tsconfig.json' is out of date because output 'src/lib/module.tsbuildinfo' is older than input 'src/lib/file1.ts'

[[90m12:00:39 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:00:48 AM[0m] Project 'src/app/tsconfig.json' is out of date because output of its dependency 'src/lib' has changed

[[90m12:00:49 AM[0m] Updating output of project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/app/module.js]
#!someshebang lib file0
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;
//# sourceMappingURL=module.js.map

//// [/src/app/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICDtB,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICCV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACDpB,IAAM,KAAK,GAAG,EAAE,CAAC"}

//// [/src/app/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: ../lib/file0.ts,../lib/file1.ts,../lib/file2.ts,../lib/global.ts,file3.ts,file4.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >#!someshebang lib file0
  >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(2, 7) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 13) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 16) + SourceIndex(0)
5 >Emitted(2, 16) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 17) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file1.ts
-------------------------------------------------------------------
>>>define("file1", ["require", "exports"], function (require, exports) {
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
7 >                   ^^^^^^^^^->
1->#!someshebang lib file1
  >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(7, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(7, 13) Source(2, 14) + SourceIndex(1)
3 >Emitted(7, 14) Source(2, 15) + SourceIndex(1)
4 >Emitted(7, 17) Source(2, 18) + SourceIndex(1)
5 >Emitted(7, 19) Source(2, 20) + SourceIndex(1)
6 >Emitted(7, 20) Source(2, 21) + SourceIndex(1)
---
>>>    console.log(exports.x);
1->^^^^
2 >    ^^^^^^^
3 >           ^
4 >            ^^^
5 >               ^
6 >                ^^^^^^^^^
7 >                         ^
8 >                          ^
1->
2 >    console
3 >           .
4 >            log
5 >               (
6 >                x
7 >                         )
8 >                          ;
1->Emitted(8, 5) Source(2, 21) + SourceIndex(1)
2 >Emitted(8, 12) Source(2, 28) + SourceIndex(1)
3 >Emitted(8, 13) Source(2, 29) + SourceIndex(1)
4 >Emitted(8, 16) Source(2, 32) + SourceIndex(1)
5 >Emitted(8, 17) Source(2, 33) + SourceIndex(1)
6 >Emitted(8, 26) Source(2, 34) + SourceIndex(1)
7 >Emitted(8, 27) Source(2, 35) + SourceIndex(1)
8 >Emitted(8, 28) Source(2, 36) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
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
1 >Emitted(14, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(14, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(14, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(14, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(14, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(14, 20) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/global.ts
-------------------------------------------------------------------
>>>});
>>>var globalConst = 10;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^
4 >               ^^^
5 >                  ^^
6 >                    ^
7 >                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    globalConst
4 >                = 
5 >                  10
6 >                    ;
1 >Emitted(16, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(16, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(16, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(16, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(16, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(16, 22) Source(1, 24) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file3.ts
-------------------------------------------------------------------
>>>define("file3", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.z = void 0;
>>>    exports.z = 30;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
1->#!someshebang app file3
  >export const 
2 >    
3 >            z
4 >              = 
5 >                30
6 >                  ;
1->Emitted(21, 5) Source(2, 14) + SourceIndex(4)
2 >Emitted(21, 13) Source(2, 14) + SourceIndex(4)
3 >Emitted(21, 14) Source(2, 15) + SourceIndex(4)
4 >Emitted(21, 17) Source(2, 18) + SourceIndex(4)
5 >Emitted(21, 19) Source(2, 20) + SourceIndex(4)
6 >Emitted(21, 20) Source(2, 21) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file4.ts
-------------------------------------------------------------------
>>>});
>>>var myVar = 30;
1 >
2 >^^^^
3 >    ^^^^^
4 >         ^^^
5 >            ^^
6 >              ^
7 >               ^^^^^^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myVar
4 >          = 
5 >            30
6 >              ;
1 >Emitted(23, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(23, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(23, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(23, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(23, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(23, 16) Source(1, 18) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/app/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file3.ts","./file4.ts"],"js":{"sections":[{"pos":25,"end":513,"kind":"prepend","data":"../lib/module.js","texts":[{"pos":25,"end":513,"kind":"text"}]},{"pos":513,"end":739,"kind":"text"}],"mapHash":"-22024543371-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"../lib/file0.ts\",\"../lib/file1.ts\",\"../lib/file2.ts\",\"../lib/global.ts\",\"file3.ts\",\"file4.ts\"],\"names\":[],\"mappings\":\";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICDtB,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICCV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACDpB,IAAM,KAAK,GAAG,EAAE,CAAC\"}","hash":"-25412899146-#!someshebang lib file0\r\nvar myGlob = 20;\r\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n    console.log(exports.x);\r\n});\r\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.y = void 0;\r\n    exports.y = 20;\r\n});\r\nvar globalConst = 10;\r\ndefine(\"file3\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.z = void 0;\r\n    exports.z = 30;\r\n});\r\nvar myVar = 30;\r\n//# sourceMappingURL=module.js.map"},"dts":{"sections":[{"pos":25,"end":196,"kind":"prepend","data":"../lib/module.d.ts","texts":[{"pos":25,"end":196,"kind":"text"}]},{"pos":196,"end":278,"kind":"text"}],"mapHash":"-32924248397-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../lib/file0.ts\",\"../lib/file1.ts\",\"../lib/file2.ts\",\"../lib/global.ts\",\"file3.ts\",\"file4.ts\"],\"names\":[],\"mappings\":\";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC;;ICCvB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACDpB,QAAA,MAAM,KAAK,KAAK,CAAC\"}","hash":"-6019253934-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\ndeclare module \"file3\" {\r\n    export const z = 30;\r\n}\r\ndeclare const myVar = 30;\r\n//# sourceMappingURL=module.d.ts.map"}},"program":{"fileNames":["./file3.ts","./file4.ts"],"fileInfos":["7745078967-#!someshebang app file3\nexport const z = 30;\r\nimport { x } from \"file1\";","1463681686-const myVar = 30;"],"options":{"composite":true,"outFile":"./module.js"},"outSignature":"1766703083-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\ndeclare module \"file3\" {\r\n    export const z = 30;\r\n}\r\ndeclare const myVar = 30;\r\n","dtsChangeTime":23000},"version":"FakeTSVersion"}

//// [/src/app/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/app/module.js
----------------------------------------------------------------------
prepend: (25-513):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (25-513)
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (513-739)
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
});
var myVar = 30;

======================================================================
======================================================================
File:: /src/app/module.d.ts
----------------------------------------------------------------------
prepend: (25-196):: ../lib/module.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (25-196)
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

----------------------------------------------------------------------
text: (196-278)
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;

======================================================================

//// [/src/app/module.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./file3.ts",
      "./file4.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 25,
          "end": 513,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 25,
              "end": 513,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 513,
          "end": 739,
          "kind": "text"
        }
      ],
      "hash": "-25412899146-#!someshebang lib file0\r\nvar myGlob = 20;\r\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n    console.log(exports.x);\r\n});\r\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.y = void 0;\r\n    exports.y = 20;\r\n});\r\nvar globalConst = 10;\r\ndefine(\"file3\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.z = void 0;\r\n    exports.z = 30;\r\n});\r\nvar myVar = 30;\r\n//# sourceMappingURL=module.js.map",
      "mapHash": "-22024543371-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"../lib/file0.ts\",\"../lib/file1.ts\",\"../lib/file2.ts\",\"../lib/global.ts\",\"file3.ts\",\"file4.ts\"],\"names\":[],\"mappings\":\";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICDtB,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICCV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACDpB,IAAM,KAAK,GAAG,EAAE,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 25,
          "end": 196,
          "kind": "prepend",
          "data": "../lib/module.d.ts",
          "texts": [
            {
              "pos": 25,
              "end": 196,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 196,
          "end": 278,
          "kind": "text"
        }
      ],
      "hash": "-6019253934-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\ndeclare module \"file3\" {\r\n    export const z = 30;\r\n}\r\ndeclare const myVar = 30;\r\n//# sourceMappingURL=module.d.ts.map",
      "mapHash": "-32924248397-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../lib/file0.ts\",\"../lib/file1.ts\",\"../lib/file2.ts\",\"../lib/global.ts\",\"file3.ts\",\"file4.ts\"],\"names\":[],\"mappings\":\";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC;;ICCvB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACDpB,QAAA,MAAM,KAAK,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "./file3.ts",
      "./file4.ts"
    ],
    "fileInfos": {
      "./file3.ts": "7745078967-#!someshebang app file3\nexport const z = 30;\r\nimport { x } from \"file1\";",
      "./file4.ts": "1463681686-const myVar = 30;"
    },
    "options": {
      "composite": true,
      "outFile": "./module.js"
    },
    "outSignature": "1766703083-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\ndeclare module \"file3\" {\r\n    export const z = 30;\r\n}\r\ndeclare const myVar = 30;\r\n",
    "dtsChangeTime": 23000
  },
  "version": "FakeTSVersion",
  "size": 3202
}

//// [/src/lib/module.d.ts] file written with same contents
//// [/src/lib/module.d.ts.map] file written with same contents
//// [/src/lib/module.d.ts.map.baseline.txt] file written with same contents
//// [/src/lib/module.js]
#!someshebang lib file0
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;
//# sourceMappingURL=module.js.map

//// [/src/lib/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICDtB,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

//// [/src/lib/module.js.map.baseline.txt]
===================================================================
JsFile: module.js
mapUrl: module.js.map
sourceRoot: 
sources: file0.ts,file1.ts,file2.ts,global.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file0.ts
-------------------------------------------------------------------
>>>#!someshebang lib file0
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >#!someshebang lib file0
  >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(2, 7) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 13) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 16) + SourceIndex(0)
5 >Emitted(2, 16) Source(2, 18) + SourceIndex(0)
6 >Emitted(2, 17) Source(2, 19) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file1.ts
-------------------------------------------------------------------
>>>define("file1", ["require", "exports"], function (require, exports) {
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
7 >                   ^^^^^^^^^->
1->#!someshebang lib file1
  >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(7, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(7, 13) Source(2, 14) + SourceIndex(1)
3 >Emitted(7, 14) Source(2, 15) + SourceIndex(1)
4 >Emitted(7, 17) Source(2, 18) + SourceIndex(1)
5 >Emitted(7, 19) Source(2, 20) + SourceIndex(1)
6 >Emitted(7, 20) Source(2, 21) + SourceIndex(1)
---
>>>    console.log(exports.x);
1->^^^^
2 >    ^^^^^^^
3 >           ^
4 >            ^^^
5 >               ^
6 >                ^^^^^^^^^
7 >                         ^
8 >                          ^
1->
2 >    console
3 >           .
4 >            log
5 >               (
6 >                x
7 >                         )
8 >                          ;
1->Emitted(8, 5) Source(2, 21) + SourceIndex(1)
2 >Emitted(8, 12) Source(2, 28) + SourceIndex(1)
3 >Emitted(8, 13) Source(2, 29) + SourceIndex(1)
4 >Emitted(8, 16) Source(2, 32) + SourceIndex(1)
5 >Emitted(8, 17) Source(2, 33) + SourceIndex(1)
6 >Emitted(8, 26) Source(2, 34) + SourceIndex(1)
7 >Emitted(8, 27) Source(2, 35) + SourceIndex(1)
8 >Emitted(8, 28) Source(2, 36) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
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
1 >Emitted(14, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(14, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(14, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(14, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(14, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(14, 20) Source(1, 21) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:global.ts
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
1 >Emitted(16, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(16, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(16, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(16, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(16, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(16, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"js":{"sections":[{"pos":25,"end":513,"kind":"text"}],"mapHash":"15343768984-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICDtB,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}","hash":"-14818255616-#!someshebang lib file0\r\nvar myGlob = 20;\r\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n    console.log(exports.x);\r\n});\r\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.y = void 0;\r\n    exports.y = 20;\r\n});\r\nvar globalConst = 10;\r\n//# sourceMappingURL=module.js.map"},"dts":{"sections":[{"pos":25,"end":196,"kind":"text"}],"mapHash":"-5431151811-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}","hash":"-11899867630-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\n//# sourceMappingURL=module.d.ts.map"}},"program":{"fileNames":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"fileInfos":["7942086417-#!someshebang lib file0\nconst myGlob = 20;","7280727528-#!someshebang lib file1\nexport const x = 10;console.log(x);","-13729954175-export const y = 20;","1028229885-const globalConst = 10;"],"options":{"composite":true,"outFile":"./module.js"},"outSignature":"-3021253461-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\n","dtsChangeTime":12000},"version":"FakeTSVersion"}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
text: (25-513)
var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

======================================================================
======================================================================
File:: /src/lib/module.d.ts
----------------------------------------------------------------------
text: (25-196)
declare const myGlob = 20;
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

======================================================================

//// [/src/lib/module.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./file0.ts",
      "./file1.ts",
      "./file2.ts",
      "./global.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 25,
          "end": 513,
          "kind": "text"
        }
      ],
      "hash": "-14818255616-#!someshebang lib file0\r\nvar myGlob = 20;\r\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.x = void 0;\r\n    exports.x = 10;\r\n    console.log(exports.x);\r\n});\r\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.y = void 0;\r\n    exports.y = 20;\r\n});\r\nvar globalConst = 10;\r\n//# sourceMappingURL=module.js.map",
      "mapHash": "15343768984-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";AACA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAL,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICDtB,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 25,
          "end": 196,
          "kind": "text"
        }
      ],
      "hash": "-11899867630-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\n//# sourceMappingURL=module.d.ts.map",
      "mapHash": "-5431151811-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";AACA,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICDpB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "./file0.ts",
      "./file1.ts",
      "./file2.ts",
      "./global.ts"
    ],
    "fileInfos": {
      "./file0.ts": "7942086417-#!someshebang lib file0\nconst myGlob = 20;",
      "./file1.ts": "7280727528-#!someshebang lib file1\nexport const x = 10;console.log(x);",
      "./file2.ts": "-13729954175-export const y = 20;",
      "./global.ts": "1028229885-const globalConst = 10;"
    },
    "options": {
      "composite": true,
      "outFile": "./module.js"
    },
    "outSignature": "-3021253461-#!someshebang lib file0\r\ndeclare const myGlob = 20;\r\ndeclare module \"file1\" {\r\n    export const x = 10;\r\n}\r\ndeclare module \"file2\" {\r\n    export const y = 20;\r\n}\r\ndeclare const globalConst = 10;\r\n",
    "dtsChangeTime": 12000
  },
  "version": "FakeTSVersion",
  "size": 2439
}

