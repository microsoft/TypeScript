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
import { x } from "file1";
function forappfile3Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}

//// [/src/app/file4.ts]
const myVar = 30;
function appfile4Spread(...b: number[]) { }
const appfile4_ar = [20, 30];
appfile4Spread(10, ...appfile4_ar);

//// [/src/app/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "target": "es5",
    "module": "amd",
    "composite": true,
    "strict": false,
    "downlevelIteration": true,
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
function libfile0Spread(...b: number[]) { }
const libfile0_ar = [20, 30];
libfile0Spread(10, ...libfile0_ar);

//// [/src/lib/file1.ts]
export const x = 10;function forlibfile1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}

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
    "downlevelIteration": true,
    "outFile": "module.js"
  },
  "exclude": [
    "module.d.ts"
  ]
}



Output::
/lib/tsc --b /src/app --verbose
[[90m12:00:22 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:00:23 AM[0m] Project 'src/lib/tsconfig.json' is out of date because output file 'src/lib/module.tsbuildinfo' does not exist

[[90m12:00:24 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:00:33 AM[0m] Project 'src/app/tsconfig.json' is out of date because output file 'src/app/module.tsbuildinfo' does not exist

[[90m12:00:34 AM[0m] Building project '/src/app/tsconfig.json'...

[96msrc/app/tsconfig.json[0m:[93m17[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m17[0m     {
[7m  [0m [91m    ~[0m
[7m18[0m       "path": "../lib",
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m19[0m       "prepend": true
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[7m20[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/lib/module.d.ts]
declare const myGlob = 20;
declare function libfile0Spread(...b: number[]): void;
declare const libfile0_ar: number[];
declare module "file1" {
    export const x = 10;
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;
//# sourceMappingURL=module.d.ts.map

//// [/src/lib/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;AAClB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC;;ICF7B,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC"}

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
>>>declare const myGlob = 20;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^
5 >                    ^^^^^
6 >                         ^
7 >                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
>>>declare function libfile0Spread(...b: number[]): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^^^^
4 >                               ^
5 >                                ^^^
6 >                                   ^^^
7 >                                      ^^^^^^
8 >                                            ^^
9 >                                              ^^^^^^^^
1->
  >
2 >function 
3 >                 libfile0Spread
4 >                               (
5 >                                ...
6 >                                   b: 
7 >                                      number
8 >                                            []
9 >                                              ) { }
1->Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 18) Source(2, 10) + SourceIndex(0)
3 >Emitted(2, 32) Source(2, 24) + SourceIndex(0)
4 >Emitted(2, 33) Source(2, 25) + SourceIndex(0)
5 >Emitted(2, 36) Source(2, 28) + SourceIndex(0)
6 >Emitted(2, 39) Source(2, 31) + SourceIndex(0)
7 >Emitted(2, 45) Source(2, 37) + SourceIndex(0)
8 >Emitted(2, 47) Source(2, 39) + SourceIndex(0)
9 >Emitted(2, 55) Source(2, 44) + SourceIndex(0)
---
>>>declare const libfile0_ar: number[];
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^
5 >                         ^^^^^^^^^^
6 >                                   ^
1 >
  >
2 >
3 >        const 
4 >              libfile0_ar
5 >                          = [20, 30]
6 >                                   ;
1 >Emitted(3, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(3, 9) Source(3, 1) + SourceIndex(0)
3 >Emitted(3, 15) Source(3, 7) + SourceIndex(0)
4 >Emitted(3, 26) Source(3, 18) + SourceIndex(0)
5 >Emitted(3, 36) Source(3, 29) + SourceIndex(0)
6 >Emitted(3, 37) Source(3, 30) + SourceIndex(0)
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
1 >
2 >    export
3 >           
4 >           const 
5 >                 x
6 >                   = 10
7 >                       ;
1 >Emitted(5, 5) Source(1, 1) + SourceIndex(1)
2 >Emitted(5, 11) Source(1, 7) + SourceIndex(1)
3 >Emitted(5, 12) Source(1, 8) + SourceIndex(1)
4 >Emitted(5, 18) Source(1, 14) + SourceIndex(1)
5 >Emitted(5, 19) Source(1, 15) + SourceIndex(1)
6 >Emitted(5, 24) Source(1, 20) + SourceIndex(1)
7 >Emitted(5, 25) Source(1, 21) + SourceIndex(1)
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
1 >Emitted(8, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(8, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(8, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(8, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(8, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(8, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(8, 25) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(10, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(10, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(10, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(10, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(10, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(10, 32) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/lib/module.js]
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var myGlob = 20;
function libfile0Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var libfile0_ar = [20, 30];
libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() {
        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
    }
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe;QAC5C,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;;;;;;ICFY,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

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
>>>var __read = (this && this.__read) || function (o, n) {
>>>    var m = typeof Symbol === "function" && o[Symbol.iterator];
>>>    if (!m) return o;
>>>    var i = m.call(o), r, ar = [], e;
>>>    try {
>>>        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
>>>    }
>>>    catch (error) { e = { error: error }; }
>>>    finally {
>>>        try {
>>>            if (r && !r.done && (m = i["return"])) m.call(i);
>>>        }
>>>        finally { if (e) throw e.error; }
>>>    }
>>>    return ar;
>>>};
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
>>>};
>>>var __rest = (this && this.__rest) || function (s, e) {
>>>    var t = {};
>>>    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
>>>        t[p] = s[p];
>>>    if (s != null && typeof Object.getOwnPropertySymbols === "function")
>>>        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
>>>            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
>>>                t[p[i]] = s[p[i]];
>>>        }
>>>    return t;
>>>};
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^->
1 >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(37, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(1, 7) + SourceIndex(0)
3 >Emitted(37, 11) Source(1, 13) + SourceIndex(0)
4 >Emitted(37, 14) Source(1, 16) + SourceIndex(0)
5 >Emitted(37, 16) Source(1, 18) + SourceIndex(0)
6 >Emitted(37, 17) Source(1, 19) + SourceIndex(0)
---
>>>function libfile0Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         libfile0Spread
1->Emitted(38, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(38, 10) Source(2, 10) + SourceIndex(0)
3 >Emitted(38, 24) Source(2, 24) + SourceIndex(0)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(39, 5) Source(2, 25) + SourceIndex(0)
2 >Emitted(39, 16) Source(2, 39) + SourceIndex(0)
---
>>>    for (var _i = 0; _i < arguments.length; _i++) {
1->^^^^^^^^^
2 >         ^^^^^^^^^^
3 >                   ^^
4 >                     ^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^
6 >                                            ^^^^
1->
2 >         ...b: number[]
3 >                   
4 >                     ...b: number[]
5 >                                          
6 >                                            ...b: number[]
1->Emitted(40, 10) Source(2, 25) + SourceIndex(0)
2 >Emitted(40, 20) Source(2, 39) + SourceIndex(0)
3 >Emitted(40, 22) Source(2, 25) + SourceIndex(0)
4 >Emitted(40, 43) Source(2, 39) + SourceIndex(0)
5 >Emitted(40, 45) Source(2, 25) + SourceIndex(0)
6 >Emitted(40, 49) Source(2, 39) + SourceIndex(0)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(41, 9) Source(2, 25) + SourceIndex(0)
2 >Emitted(41, 31) Source(2, 39) + SourceIndex(0)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(43, 1) Source(2, 43) + SourceIndex(0)
2 >Emitted(43, 2) Source(2, 44) + SourceIndex(0)
---
>>>var libfile0_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^
4 >               ^^^
5 >                  ^
6 >                   ^^
7 >                     ^^
8 >                       ^^
9 >                         ^
10>                          ^
11>                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    libfile0_ar
4 >                = 
5 >                  [
6 >                   20
7 >                     , 
8 >                       30
9 >                         ]
10>                          ;
1->Emitted(44, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(44, 5) Source(3, 7) + SourceIndex(0)
3 >Emitted(44, 16) Source(3, 18) + SourceIndex(0)
4 >Emitted(44, 19) Source(3, 21) + SourceIndex(0)
5 >Emitted(44, 20) Source(3, 22) + SourceIndex(0)
6 >Emitted(44, 22) Source(3, 24) + SourceIndex(0)
7 >Emitted(44, 24) Source(3, 26) + SourceIndex(0)
8 >Emitted(44, 26) Source(3, 28) + SourceIndex(0)
9 >Emitted(44, 27) Source(3, 29) + SourceIndex(0)
10>Emitted(44, 28) Source(3, 30) + SourceIndex(0)
---
>>>libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                            ^^
5 >                                              ^^^^^^^^^^
6 >                                                        ^^^^^^^^^^^
7 >                                                                   ^^^^^^^^^^^
1->
  >
2 >libfile0Spread
3 >              (
4 >                                            10
5 >                                              , ...
6 >                                                        libfile0_ar
7 >                                                                   );
1->Emitted(45, 1) Source(4, 1) + SourceIndex(0)
2 >Emitted(45, 15) Source(4, 15) + SourceIndex(0)
3 >Emitted(45, 45) Source(4, 16) + SourceIndex(0)
4 >Emitted(45, 47) Source(4, 18) + SourceIndex(0)
5 >Emitted(45, 57) Source(4, 23) + SourceIndex(0)
6 >Emitted(45, 68) Source(4, 34) + SourceIndex(0)
7 >Emitted(45, 79) Source(4, 36) + SourceIndex(0)
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
1 >^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
7 >                   ^^^^^^^^^^^^^->
1 >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1 >Emitted(50, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(50, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(50, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(50, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(50, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(50, 20) Source(1, 21) + SourceIndex(1)
---
>>>    function forlibfile1Rest() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^^^^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    function 
3 >             forlibfile1Rest
1->Emitted(51, 5) Source(1, 21) + SourceIndex(1)
2 >Emitted(51, 14) Source(1, 30) + SourceIndex(1)
3 >Emitted(51, 29) Source(1, 45) + SourceIndex(1)
---
>>>        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^^^^^
2 >        ^^^^
3 >            ^^^^^
4 >                 ^^
5 >                   ^
6 >                    ^^
7 >                      ^^
8 >                        ^^
9 >                          ^
10>                           ^^
11>                             ^^
12>                               ^^
13>                                 ^^
14>                                   ^^
15>                                     ^^
16>                                       ^^
17>                                         ^^
18>                                           ^
19>                                            ^^^^^^^
20>                                                   ^^
21>                                                     ^^^^
22>                                                         ^^^^^^^^^^^^^^
23>                                                                       ^^^^^
24>                                                                            ^
25>                                                                             ^
1->() {
  >
2 >        const 
3 >            { b, ...rest } = 
4 >                 { 
5 >                   a
6 >                    : 
7 >                      10
8 >                        , 
9 >                          b
10>                           : 
11>                             30
12>                               , 
13>                                 yy
14>                                   : 
15>                                     30
16>                                        }
17>                                         
18>                                           b
19>                                            
20>                                                   , ...
21>                                                     rest
22>                                                         
23>                                                                       { b, ...rest }
24>                                                                             = { a: 10, b: 30, yy: 30 }
25>                                                                             ;
1->Emitted(52, 9) Source(2, 1) + SourceIndex(1)
2 >Emitted(52, 13) Source(2, 7) + SourceIndex(1)
3 >Emitted(52, 18) Source(2, 24) + SourceIndex(1)
4 >Emitted(52, 20) Source(2, 26) + SourceIndex(1)
5 >Emitted(52, 21) Source(2, 27) + SourceIndex(1)
6 >Emitted(52, 23) Source(2, 29) + SourceIndex(1)
7 >Emitted(52, 25) Source(2, 31) + SourceIndex(1)
8 >Emitted(52, 27) Source(2, 33) + SourceIndex(1)
9 >Emitted(52, 28) Source(2, 34) + SourceIndex(1)
10>Emitted(52, 30) Source(2, 36) + SourceIndex(1)
11>Emitted(52, 32) Source(2, 38) + SourceIndex(1)
12>Emitted(52, 34) Source(2, 40) + SourceIndex(1)
13>Emitted(52, 36) Source(2, 42) + SourceIndex(1)
14>Emitted(52, 38) Source(2, 44) + SourceIndex(1)
15>Emitted(52, 40) Source(2, 46) + SourceIndex(1)
16>Emitted(52, 42) Source(2, 48) + SourceIndex(1)
17>Emitted(52, 44) Source(2, 9) + SourceIndex(1)
18>Emitted(52, 45) Source(2, 10) + SourceIndex(1)
19>Emitted(52, 52) Source(2, 10) + SourceIndex(1)
20>Emitted(52, 54) Source(2, 15) + SourceIndex(1)
21>Emitted(52, 58) Source(2, 19) + SourceIndex(1)
22>Emitted(52, 72) Source(2, 7) + SourceIndex(1)
23>Emitted(52, 77) Source(2, 21) + SourceIndex(1)
24>Emitted(52, 78) Source(2, 48) + SourceIndex(1)
25>Emitted(52, 79) Source(2, 49) + SourceIndex(1)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >
2 >    }
1 >Emitted(53, 5) Source(3, 1) + SourceIndex(1)
2 >Emitted(53, 6) Source(3, 2) + SourceIndex(1)
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
1 >Emitted(59, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(59, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(59, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(59, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(59, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(59, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(61, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(61, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(61, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(61, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(61, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(61, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"js":{"sections":[{"pos":0,"end":489,"kind":"emitHelpers","data":"typescript:read"},{"pos":490,"end":870,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":871,"end":1361,"kind":"emitHelpers","data":"typescript:rest"},{"pos":1362,"end":2167,"kind":"text"}],"sources":{"helpers":["typescript:read","typescript:spreadArray","typescript:rest"]},"mapHash":"8627584870-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe;QAC5C,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;;;;;;ICFY,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}","hash":"57418107229-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar myGlob = 20;\nfunction libfile0Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar libfile0_ar = [20, 30];\nlibfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n    function forlibfile1Rest() {\n        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n    }\n});\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\nvar globalConst = 10;\n//# sourceMappingURL=module.js.map"},"dts":{"sections":[{"pos":0,"end":255,"kind":"text"}],"mapHash":"-34036075879-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;AAClB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC;;ICF7B,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}","hash":"17976393265-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n//# sourceMappingURL=module.d.ts.map"}},"program":{"fileNames":["../../lib/lib.d.ts","./file0.ts","./file1.ts","./file2.ts","./global.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","4690807917-const myGlob = 20;\nfunction libfile0Spread(...b: number[]) { }\nconst libfile0_ar = [20, 30];\nlibfile0Spread(10, ...libfile0_ar);","186113334-export const x = 10;function forlibfile1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}","-13729954175-export const y = 20;","1028229885-const globalConst = 10;"],"root":[[2,5]],"options":{"composite":true,"declarationMap":true,"downlevelIteration":true,"module":2,"outFile":"./module.js","sourceMap":true,"strict":false,"target":1},"outSignature":"19175502154-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n","latestChangedDtsFile":"./module.d.ts"},"version":"FakeTSVersion"}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
emitHelpers: (0-489):: typescript:read
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
----------------------------------------------------------------------
emitHelpers: (490-870):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
emitHelpers: (871-1361):: typescript:rest
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
----------------------------------------------------------------------
text: (1362-2167)
var myGlob = 20;
function libfile0Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var libfile0_ar = [20, 30];
libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() {
        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
    }
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
text: (0-255)
declare const myGlob = 20;
declare function libfile0Spread(...b: number[]): void;
declare const libfile0_ar: number[];
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
          "pos": 0,
          "end": 489,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 490,
          "end": 870,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 871,
          "end": 1361,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 1362,
          "end": 2167,
          "kind": "text"
        }
      ],
      "hash": "57418107229-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar myGlob = 20;\nfunction libfile0Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar libfile0_ar = [20, 30];\nlibfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n    function forlibfile1Rest() {\n        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n    }\n});\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\nvar globalConst = 10;\n//# sourceMappingURL=module.js.map",
      "mapHash": "8627584870-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe;QAC5C,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;;;;;;ICFY,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}",
      "sources": {
        "helpers": [
          "typescript:read",
          "typescript:spreadArray",
          "typescript:rest"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 255,
          "kind": "text"
        }
      ],
      "hash": "17976393265-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n//# sourceMappingURL=module.d.ts.map",
      "mapHash": "-34036075879-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;AAClB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC;;ICF7B,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./file0.ts",
      "./file1.ts",
      "./file2.ts",
      "./global.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./file0.ts": "4690807917-const myGlob = 20;\nfunction libfile0Spread(...b: number[]) { }\nconst libfile0_ar = [20, 30];\nlibfile0Spread(10, ...libfile0_ar);",
      "./file1.ts": "186113334-export const x = 10;function forlibfile1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}",
      "./file2.ts": "-13729954175-export const y = 20;",
      "./global.ts": "1028229885-const globalConst = 10;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./file0.ts",
          "./file1.ts",
          "./file2.ts",
          "./global.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "module": 2,
      "outFile": "./module.js",
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "19175502154-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n",
    "latestChangedDtsFile": "./module.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 5645
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/lib/file1.ts]
export const x = 10;function forlibfile1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}console.log(x);



Output::
/lib/tsc --b /src/app --verbose
[[90m12:00:38 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:00:39 AM[0m] Project 'src/lib/tsconfig.json' is out of date because output 'src/lib/module.tsbuildinfo' is older than input 'src/lib/file1.ts'

[[90m12:00:40 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:00:48 AM[0m] Project 'src/app/tsconfig.json' is out of date because output file 'src/app/module.tsbuildinfo' does not exist

[[90m12:00:49 AM[0m] Building project '/src/app/tsconfig.json'...

[96msrc/app/tsconfig.json[0m:[93m17[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m17[0m     {
[7m  [0m [91m    ~[0m
[7m18[0m       "path": "../lib",
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m19[0m       "prepend": true
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[7m20[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/lib/module.d.ts.map] file written with same contents
//// [/src/lib/module.d.ts.map.baseline.txt] file written with same contents
//// [/src/lib/module.js]
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var myGlob = 20;
function libfile0Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var libfile0_ar = [20, 30];
libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() {
        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
    }
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe;QAC5C,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICFH,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

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
>>>var __read = (this && this.__read) || function (o, n) {
>>>    var m = typeof Symbol === "function" && o[Symbol.iterator];
>>>    if (!m) return o;
>>>    var i = m.call(o), r, ar = [], e;
>>>    try {
>>>        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
>>>    }
>>>    catch (error) { e = { error: error }; }
>>>    finally {
>>>        try {
>>>            if (r && !r.done && (m = i["return"])) m.call(i);
>>>        }
>>>        finally { if (e) throw e.error; }
>>>    }
>>>    return ar;
>>>};
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
>>>};
>>>var __rest = (this && this.__rest) || function (s, e) {
>>>    var t = {};
>>>    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
>>>        t[p] = s[p];
>>>    if (s != null && typeof Object.getOwnPropertySymbols === "function")
>>>        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
>>>            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
>>>                t[p[i]] = s[p[i]];
>>>        }
>>>    return t;
>>>};
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^->
1 >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(37, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(1, 7) + SourceIndex(0)
3 >Emitted(37, 11) Source(1, 13) + SourceIndex(0)
4 >Emitted(37, 14) Source(1, 16) + SourceIndex(0)
5 >Emitted(37, 16) Source(1, 18) + SourceIndex(0)
6 >Emitted(37, 17) Source(1, 19) + SourceIndex(0)
---
>>>function libfile0Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         libfile0Spread
1->Emitted(38, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(38, 10) Source(2, 10) + SourceIndex(0)
3 >Emitted(38, 24) Source(2, 24) + SourceIndex(0)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(39, 5) Source(2, 25) + SourceIndex(0)
2 >Emitted(39, 16) Source(2, 39) + SourceIndex(0)
---
>>>    for (var _i = 0; _i < arguments.length; _i++) {
1->^^^^^^^^^
2 >         ^^^^^^^^^^
3 >                   ^^
4 >                     ^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^
6 >                                            ^^^^
1->
2 >         ...b: number[]
3 >                   
4 >                     ...b: number[]
5 >                                          
6 >                                            ...b: number[]
1->Emitted(40, 10) Source(2, 25) + SourceIndex(0)
2 >Emitted(40, 20) Source(2, 39) + SourceIndex(0)
3 >Emitted(40, 22) Source(2, 25) + SourceIndex(0)
4 >Emitted(40, 43) Source(2, 39) + SourceIndex(0)
5 >Emitted(40, 45) Source(2, 25) + SourceIndex(0)
6 >Emitted(40, 49) Source(2, 39) + SourceIndex(0)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(41, 9) Source(2, 25) + SourceIndex(0)
2 >Emitted(41, 31) Source(2, 39) + SourceIndex(0)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(43, 1) Source(2, 43) + SourceIndex(0)
2 >Emitted(43, 2) Source(2, 44) + SourceIndex(0)
---
>>>var libfile0_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^
4 >               ^^^
5 >                  ^
6 >                   ^^
7 >                     ^^
8 >                       ^^
9 >                         ^
10>                          ^
11>                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    libfile0_ar
4 >                = 
5 >                  [
6 >                   20
7 >                     , 
8 >                       30
9 >                         ]
10>                          ;
1->Emitted(44, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(44, 5) Source(3, 7) + SourceIndex(0)
3 >Emitted(44, 16) Source(3, 18) + SourceIndex(0)
4 >Emitted(44, 19) Source(3, 21) + SourceIndex(0)
5 >Emitted(44, 20) Source(3, 22) + SourceIndex(0)
6 >Emitted(44, 22) Source(3, 24) + SourceIndex(0)
7 >Emitted(44, 24) Source(3, 26) + SourceIndex(0)
8 >Emitted(44, 26) Source(3, 28) + SourceIndex(0)
9 >Emitted(44, 27) Source(3, 29) + SourceIndex(0)
10>Emitted(44, 28) Source(3, 30) + SourceIndex(0)
---
>>>libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                            ^^
5 >                                              ^^^^^^^^^^
6 >                                                        ^^^^^^^^^^^
7 >                                                                   ^^^^^^^^^^^
1->
  >
2 >libfile0Spread
3 >              (
4 >                                            10
5 >                                              , ...
6 >                                                        libfile0_ar
7 >                                                                   );
1->Emitted(45, 1) Source(4, 1) + SourceIndex(0)
2 >Emitted(45, 15) Source(4, 15) + SourceIndex(0)
3 >Emitted(45, 45) Source(4, 16) + SourceIndex(0)
4 >Emitted(45, 47) Source(4, 18) + SourceIndex(0)
5 >Emitted(45, 57) Source(4, 23) + SourceIndex(0)
6 >Emitted(45, 68) Source(4, 34) + SourceIndex(0)
7 >Emitted(45, 79) Source(4, 36) + SourceIndex(0)
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
1 >^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
7 >                   ^^^^^^^^^^^^^->
1 >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1 >Emitted(50, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(50, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(50, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(50, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(50, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(50, 20) Source(1, 21) + SourceIndex(1)
---
>>>    function forlibfile1Rest() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^^^^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    function 
3 >             forlibfile1Rest
1->Emitted(51, 5) Source(1, 21) + SourceIndex(1)
2 >Emitted(51, 14) Source(1, 30) + SourceIndex(1)
3 >Emitted(51, 29) Source(1, 45) + SourceIndex(1)
---
>>>        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^^^^^
2 >        ^^^^
3 >            ^^^^^
4 >                 ^^
5 >                   ^
6 >                    ^^
7 >                      ^^
8 >                        ^^
9 >                          ^
10>                           ^^
11>                             ^^
12>                               ^^
13>                                 ^^
14>                                   ^^
15>                                     ^^
16>                                       ^^
17>                                         ^^
18>                                           ^
19>                                            ^^^^^^^
20>                                                   ^^
21>                                                     ^^^^
22>                                                         ^^^^^^^^^^^^^^
23>                                                                       ^^^^^
24>                                                                            ^
25>                                                                             ^
1->() {
  >
2 >        const 
3 >            { b, ...rest } = 
4 >                 { 
5 >                   a
6 >                    : 
7 >                      10
8 >                        , 
9 >                          b
10>                           : 
11>                             30
12>                               , 
13>                                 yy
14>                                   : 
15>                                     30
16>                                        }
17>                                         
18>                                           b
19>                                            
20>                                                   , ...
21>                                                     rest
22>                                                         
23>                                                                       { b, ...rest }
24>                                                                             = { a: 10, b: 30, yy: 30 }
25>                                                                             ;
1->Emitted(52, 9) Source(2, 1) + SourceIndex(1)
2 >Emitted(52, 13) Source(2, 7) + SourceIndex(1)
3 >Emitted(52, 18) Source(2, 24) + SourceIndex(1)
4 >Emitted(52, 20) Source(2, 26) + SourceIndex(1)
5 >Emitted(52, 21) Source(2, 27) + SourceIndex(1)
6 >Emitted(52, 23) Source(2, 29) + SourceIndex(1)
7 >Emitted(52, 25) Source(2, 31) + SourceIndex(1)
8 >Emitted(52, 27) Source(2, 33) + SourceIndex(1)
9 >Emitted(52, 28) Source(2, 34) + SourceIndex(1)
10>Emitted(52, 30) Source(2, 36) + SourceIndex(1)
11>Emitted(52, 32) Source(2, 38) + SourceIndex(1)
12>Emitted(52, 34) Source(2, 40) + SourceIndex(1)
13>Emitted(52, 36) Source(2, 42) + SourceIndex(1)
14>Emitted(52, 38) Source(2, 44) + SourceIndex(1)
15>Emitted(52, 40) Source(2, 46) + SourceIndex(1)
16>Emitted(52, 42) Source(2, 48) + SourceIndex(1)
17>Emitted(52, 44) Source(2, 9) + SourceIndex(1)
18>Emitted(52, 45) Source(2, 10) + SourceIndex(1)
19>Emitted(52, 52) Source(2, 10) + SourceIndex(1)
20>Emitted(52, 54) Source(2, 15) + SourceIndex(1)
21>Emitted(52, 58) Source(2, 19) + SourceIndex(1)
22>Emitted(52, 72) Source(2, 7) + SourceIndex(1)
23>Emitted(52, 77) Source(2, 21) + SourceIndex(1)
24>Emitted(52, 78) Source(2, 48) + SourceIndex(1)
25>Emitted(52, 79) Source(2, 49) + SourceIndex(1)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >    }
1 >Emitted(53, 5) Source(3, 1) + SourceIndex(1)
2 >Emitted(53, 6) Source(3, 2) + SourceIndex(1)
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
1->Emitted(54, 5) Source(3, 2) + SourceIndex(1)
2 >Emitted(54, 12) Source(3, 9) + SourceIndex(1)
3 >Emitted(54, 13) Source(3, 10) + SourceIndex(1)
4 >Emitted(54, 16) Source(3, 13) + SourceIndex(1)
5 >Emitted(54, 17) Source(3, 14) + SourceIndex(1)
6 >Emitted(54, 26) Source(3, 15) + SourceIndex(1)
7 >Emitted(54, 27) Source(3, 16) + SourceIndex(1)
8 >Emitted(54, 28) Source(3, 17) + SourceIndex(1)
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
1 >Emitted(60, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(60, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(60, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(60, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(60, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(60, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(62, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(62, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(62, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(62, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(62, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(62, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"js":{"sections":[{"pos":0,"end":489,"kind":"emitHelpers","data":"typescript:read"},{"pos":490,"end":870,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":871,"end":1361,"kind":"emitHelpers","data":"typescript:rest"},{"pos":1362,"end":2195,"kind":"text"}],"sources":{"helpers":["typescript:read","typescript:spreadArray","typescript:rest"]},"mapHash":"13391497112-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe;QAC5C,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICFH,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}","hash":"56659072305-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar myGlob = 20;\nfunction libfile0Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar libfile0_ar = [20, 30];\nlibfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n    function forlibfile1Rest() {\n        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n    }\n    console.log(exports.x);\n});\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\nvar globalConst = 10;\n//# sourceMappingURL=module.js.map"},"dts":{"sections":[{"pos":0,"end":255,"kind":"text"}],"mapHash":"-34036075879-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;AAClB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC;;ICF7B,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}","hash":"17976393265-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n//# sourceMappingURL=module.d.ts.map"}},"program":{"fileNames":["../../lib/lib.d.ts","./file0.ts","./file1.ts","./file2.ts","./global.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","4690807917-const myGlob = 20;\nfunction libfile0Spread(...b: number[]) { }\nconst libfile0_ar = [20, 30];\nlibfile0Spread(10, ...libfile0_ar);","12502459933-export const x = 10;function forlibfile1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}console.log(x);","-13729954175-export const y = 20;","1028229885-const globalConst = 10;"],"root":[[2,5]],"options":{"composite":true,"declarationMap":true,"downlevelIteration":true,"module":2,"outFile":"./module.js","sourceMap":true,"strict":false,"target":1},"outSignature":"19175502154-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n","latestChangedDtsFile":"./module.d.ts"},"version":"FakeTSVersion"}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
emitHelpers: (0-489):: typescript:read
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
----------------------------------------------------------------------
emitHelpers: (490-870):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
emitHelpers: (871-1361):: typescript:rest
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
----------------------------------------------------------------------
text: (1362-2195)
var myGlob = 20;
function libfile0Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var libfile0_ar = [20, 30];
libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() {
        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
    }
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
text: (0-255)
declare const myGlob = 20;
declare function libfile0Spread(...b: number[]): void;
declare const libfile0_ar: number[];
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
          "pos": 0,
          "end": 489,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 490,
          "end": 870,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 871,
          "end": 1361,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 1362,
          "end": 2195,
          "kind": "text"
        }
      ],
      "hash": "56659072305-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\nvar myGlob = 20;\nfunction libfile0Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar libfile0_ar = [20, 30];\nlibfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n    function forlibfile1Rest() {\n        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, [\"b\"]);\n    }\n    console.log(exports.x);\n});\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\nvar globalConst = 10;\n//# sourceMappingURL=module.js.map",
      "mapHash": "13391497112-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe;QAC5C,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICFH,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}",
      "sources": {
        "helpers": [
          "typescript:read",
          "typescript:spreadArray",
          "typescript:rest"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 255,
          "kind": "text"
        }
      ],
      "hash": "17976393265-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n//# sourceMappingURL=module.d.ts.map",
      "mapHash": "-34036075879-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;AAClB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC;;ICF7B,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./file0.ts",
      "./file1.ts",
      "./file2.ts",
      "./global.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./file0.ts": "4690807917-const myGlob = 20;\nfunction libfile0Spread(...b: number[]) { }\nconst libfile0_ar = [20, 30];\nlibfile0Spread(10, ...libfile0_ar);",
      "./file1.ts": "12502459933-export const x = 10;function forlibfile1Rest() {\nconst { b, ...rest } = { a: 10, b: 30, yy: 30 };\n}console.log(x);",
      "./file2.ts": "-13729954175-export const y = 20;",
      "./global.ts": "1028229885-const globalConst = 10;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./file0.ts",
          "./file1.ts",
          "./file2.ts",
          "./global.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "module": 2,
      "outFile": "./module.js",
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "19175502154-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n",
    "latestChangedDtsFile": "./module.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 5732
}



Change:: incremental-headers-change-without-dts-changes
Input::
//// [/src/lib/file1.ts]
export const x = 10;function forlibfile1Rest() { }console.log(x);



Output::
/lib/tsc --b /src/app --verbose
[[90m12:00:53 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:00:54 AM[0m] Project 'src/lib/tsconfig.json' is out of date because output 'src/lib/module.tsbuildinfo' is older than input 'src/lib/file1.ts'

[[90m12:00:55 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:01:03 AM[0m] Project 'src/app/tsconfig.json' is out of date because output file 'src/app/module.tsbuildinfo' does not exist

[[90m12:01:04 AM[0m] Building project '/src/app/tsconfig.json'...

[96msrc/app/tsconfig.json[0m:[93m17[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'prepend' has been removed. Please remove it from your configuration.

[7m17[0m     {
[7m  [0m [91m    ~[0m
[7m18[0m       "path": "../lib",
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m19[0m       "prepend": true
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~[0m
[7m20[0m     }
[7m  [0m [91m~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/lib/module.d.ts.map] file written with same contents
//// [/src/lib/module.d.ts.map.baseline.txt] file written with same contents
//// [/src/lib/module.js]
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var myGlob = 20;
function libfile0Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var libfile0_ar = [20, 30];
libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() { }
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe,KAAK,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICApD,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

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
>>>var __read = (this && this.__read) || function (o, n) {
>>>    var m = typeof Symbol === "function" && o[Symbol.iterator];
>>>    if (!m) return o;
>>>    var i = m.call(o), r, ar = [], e;
>>>    try {
>>>        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
>>>    }
>>>    catch (error) { e = { error: error }; }
>>>    finally {
>>>        try {
>>>            if (r && !r.done && (m = i["return"])) m.call(i);
>>>        }
>>>        finally { if (e) throw e.error; }
>>>    }
>>>    return ar;
>>>};
>>>var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
>>>    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
>>>        if (ar || !(i in from)) {
>>>            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
>>>            ar[i] = from[i];
>>>        }
>>>    }
>>>    return to.concat(ar || Array.prototype.slice.call(from));
>>>};
>>>var myGlob = 20;
1 >
2 >^^^^
3 >    ^^^^^^
4 >          ^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^->
1 >
2 >const 
3 >    myGlob
4 >           = 
5 >             20
6 >               ;
1 >Emitted(26, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(26, 5) Source(1, 7) + SourceIndex(0)
3 >Emitted(26, 11) Source(1, 13) + SourceIndex(0)
4 >Emitted(26, 14) Source(1, 16) + SourceIndex(0)
5 >Emitted(26, 16) Source(1, 18) + SourceIndex(0)
6 >Emitted(26, 17) Source(1, 19) + SourceIndex(0)
---
>>>function libfile0Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         libfile0Spread
1->Emitted(27, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(27, 10) Source(2, 10) + SourceIndex(0)
3 >Emitted(27, 24) Source(2, 24) + SourceIndex(0)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(28, 5) Source(2, 25) + SourceIndex(0)
2 >Emitted(28, 16) Source(2, 39) + SourceIndex(0)
---
>>>    for (var _i = 0; _i < arguments.length; _i++) {
1->^^^^^^^^^
2 >         ^^^^^^^^^^
3 >                   ^^
4 >                     ^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^
6 >                                            ^^^^
1->
2 >         ...b: number[]
3 >                   
4 >                     ...b: number[]
5 >                                          
6 >                                            ...b: number[]
1->Emitted(29, 10) Source(2, 25) + SourceIndex(0)
2 >Emitted(29, 20) Source(2, 39) + SourceIndex(0)
3 >Emitted(29, 22) Source(2, 25) + SourceIndex(0)
4 >Emitted(29, 43) Source(2, 39) + SourceIndex(0)
5 >Emitted(29, 45) Source(2, 25) + SourceIndex(0)
6 >Emitted(29, 49) Source(2, 39) + SourceIndex(0)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(30, 9) Source(2, 25) + SourceIndex(0)
2 >Emitted(30, 31) Source(2, 39) + SourceIndex(0)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(32, 1) Source(2, 43) + SourceIndex(0)
2 >Emitted(32, 2) Source(2, 44) + SourceIndex(0)
---
>>>var libfile0_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^
4 >               ^^^
5 >                  ^
6 >                   ^^
7 >                     ^^
8 >                       ^^
9 >                         ^
10>                          ^
11>                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    libfile0_ar
4 >                = 
5 >                  [
6 >                   20
7 >                     , 
8 >                       30
9 >                         ]
10>                          ;
1->Emitted(33, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(33, 5) Source(3, 7) + SourceIndex(0)
3 >Emitted(33, 16) Source(3, 18) + SourceIndex(0)
4 >Emitted(33, 19) Source(3, 21) + SourceIndex(0)
5 >Emitted(33, 20) Source(3, 22) + SourceIndex(0)
6 >Emitted(33, 22) Source(3, 24) + SourceIndex(0)
7 >Emitted(33, 24) Source(3, 26) + SourceIndex(0)
8 >Emitted(33, 26) Source(3, 28) + SourceIndex(0)
9 >Emitted(33, 27) Source(3, 29) + SourceIndex(0)
10>Emitted(33, 28) Source(3, 30) + SourceIndex(0)
---
>>>libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                            ^^
5 >                                              ^^^^^^^^^^
6 >                                                        ^^^^^^^^^^^
7 >                                                                   ^^^^^^^^^^^
1->
  >
2 >libfile0Spread
3 >              (
4 >                                            10
5 >                                              , ...
6 >                                                        libfile0_ar
7 >                                                                   );
1->Emitted(34, 1) Source(4, 1) + SourceIndex(0)
2 >Emitted(34, 15) Source(4, 15) + SourceIndex(0)
3 >Emitted(34, 45) Source(4, 16) + SourceIndex(0)
4 >Emitted(34, 47) Source(4, 18) + SourceIndex(0)
5 >Emitted(34, 57) Source(4, 23) + SourceIndex(0)
6 >Emitted(34, 68) Source(4, 34) + SourceIndex(0)
7 >Emitted(34, 79) Source(4, 36) + SourceIndex(0)
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
1 >^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
7 >                   ^^^^^^^^^^^^^^^->
1 >export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1 >Emitted(39, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(39, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(39, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(39, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(39, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(39, 20) Source(1, 21) + SourceIndex(1)
---
>>>    function forlibfile1Rest() { }
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^^^^^^^^^^^^
4 >                            ^^^^^
5 >                                 ^
1->
2 >    function 
3 >             forlibfile1Rest
4 >                            () { 
5 >                                 }
1->Emitted(40, 5) Source(1, 21) + SourceIndex(1)
2 >Emitted(40, 14) Source(1, 30) + SourceIndex(1)
3 >Emitted(40, 29) Source(1, 45) + SourceIndex(1)
4 >Emitted(40, 34) Source(1, 50) + SourceIndex(1)
5 >Emitted(40, 35) Source(1, 51) + SourceIndex(1)
---
>>>    console.log(exports.x);
1 >^^^^
2 >    ^^^^^^^
3 >           ^
4 >            ^^^
5 >               ^
6 >                ^^^^^^^^^
7 >                         ^
8 >                          ^
1 >
2 >    console
3 >           .
4 >            log
5 >               (
6 >                x
7 >                         )
8 >                          ;
1 >Emitted(41, 5) Source(1, 51) + SourceIndex(1)
2 >Emitted(41, 12) Source(1, 58) + SourceIndex(1)
3 >Emitted(41, 13) Source(1, 59) + SourceIndex(1)
4 >Emitted(41, 16) Source(1, 62) + SourceIndex(1)
5 >Emitted(41, 17) Source(1, 63) + SourceIndex(1)
6 >Emitted(41, 26) Source(1, 64) + SourceIndex(1)
7 >Emitted(41, 27) Source(1, 65) + SourceIndex(1)
8 >Emitted(41, 28) Source(1, 66) + SourceIndex(1)
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
1 >Emitted(47, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(47, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(47, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(47, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(47, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(47, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(49, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(49, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(49, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(49, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(49, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(49, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"js":{"sections":[{"pos":0,"end":489,"kind":"emitHelpers","data":"typescript:read"},{"pos":490,"end":870,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":871,"end":1621,"kind":"text"}],"sources":{"helpers":["typescript:read","typescript:spreadArray"]},"mapHash":"34350533098-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe,KAAK,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICApD,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}","hash":"112987183825-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar myGlob = 20;\nfunction libfile0Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar libfile0_ar = [20, 30];\nlibfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n    function forlibfile1Rest() { }\n    console.log(exports.x);\n});\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\nvar globalConst = 10;\n//# sourceMappingURL=module.js.map"},"dts":{"sections":[{"pos":0,"end":255,"kind":"text"}],"mapHash":"-34036075879-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;AAClB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC;;ICF7B,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}","hash":"17976393265-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n//# sourceMappingURL=module.d.ts.map"}},"program":{"fileNames":["../../lib/lib.d.ts","./file0.ts","./file1.ts","./file2.ts","./global.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","4690807917-const myGlob = 20;\nfunction libfile0Spread(...b: number[]) { }\nconst libfile0_ar = [20, 30];\nlibfile0Spread(10, ...libfile0_ar);","-2014796510-export const x = 10;function forlibfile1Rest() { }console.log(x);","-13729954175-export const y = 20;","1028229885-const globalConst = 10;"],"root":[[2,5]],"options":{"composite":true,"declarationMap":true,"downlevelIteration":true,"module":2,"outFile":"./module.js","sourceMap":true,"strict":false,"target":1},"outSignature":"19175502154-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n","latestChangedDtsFile":"./module.d.ts"},"version":"FakeTSVersion"}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
emitHelpers: (0-489):: typescript:read
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
----------------------------------------------------------------------
emitHelpers: (490-870):: typescript:spreadArray
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
----------------------------------------------------------------------
text: (871-1621)
var myGlob = 20;
function libfile0Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var libfile0_ar = [20, 30];
libfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
    function forlibfile1Rest() { }
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
text: (0-255)
declare const myGlob = 20;
declare function libfile0Spread(...b: number[]): void;
declare const libfile0_ar: number[];
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
          "pos": 0,
          "end": 489,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 490,
          "end": 870,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 871,
          "end": 1621,
          "kind": "text"
        }
      ],
      "hash": "112987183825-var __read = (this && this.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar myGlob = 20;\nfunction libfile0Spread() {\n    var b = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        b[_i] = arguments[_i];\n    }\n}\nvar libfile0_ar = [20, 30];\nlibfile0Spread.apply(void 0, __spreadArray([10], __read(libfile0_ar), false));\ndefine(\"file1\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.x = void 0;\n    exports.x = 10;\n    function forlibfile1Rest() { }\n    console.log(exports.x);\n});\ndefine(\"file2\", [\"require\", \"exports\"], function (require, exports) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", { value: true });\n    exports.y = void 0;\n    exports.y = 20;\n});\nvar globalConst = 10;\n//# sourceMappingURL=module.js.map",
      "mapHash": "34350533098-{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe,KAAK,CAAC;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;;ICApD,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC\"}",
      "sources": {
        "helpers": [
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 255,
          "kind": "text"
        }
      ],
      "hash": "17976393265-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n//# sourceMappingURL=module.d.ts.map",
      "mapHash": "-34036075879-{\"version\":3,\"file\":\"module.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"file0.ts\",\"file1.ts\",\"file2.ts\",\"global.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;AAClB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC;;ICF7B,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./file0.ts",
      "./file1.ts",
      "./file2.ts",
      "./global.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./file0.ts": "4690807917-const myGlob = 20;\nfunction libfile0Spread(...b: number[]) { }\nconst libfile0_ar = [20, 30];\nlibfile0Spread(10, ...libfile0_ar);",
      "./file1.ts": "-2014796510-export const x = 10;function forlibfile1Rest() { }console.log(x);",
      "./file2.ts": "-13729954175-export const y = 20;",
      "./global.ts": "1028229885-const globalConst = 10;"
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "./file0.ts",
          "./file1.ts",
          "./file2.ts",
          "./global.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "downlevelIteration": true,
      "module": 2,
      "outFile": "./module.js",
      "sourceMap": true,
      "strict": false,
      "target": 1
    },
    "outSignature": "19175502154-declare const myGlob = 20;\ndeclare function libfile0Spread(...b: number[]): void;\ndeclare const libfile0_ar: number[];\ndeclare module \"file1\" {\n    export const x = 10;\n}\ndeclare module \"file2\" {\n    export const y = 20;\n}\ndeclare const globalConst = 10;\n",
    "latestChangedDtsFile": "./module.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 4863
}

