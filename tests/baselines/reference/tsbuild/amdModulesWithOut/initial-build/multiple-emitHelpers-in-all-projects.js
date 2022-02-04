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
import { x } from "file1";function forappfile3Rest() {
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
        "target": "es5",
        "module": "amd",
        "composite": true,
        "strict": false,
    "downlevelIteration": true,
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
    "exclude": ["module.d.ts"]

}



Output::
/lib/tsc --b /src/app --verbose
[[90m12:01:00 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/lib/tsconfig.json' is out of date because output file 'src/lib/module.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:01:00 AM[0m] Project 'src/app/tsconfig.json' is out of date because output file 'src/app/module.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/app/module.d.ts]
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
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;
declare function appfile4Spread(...b: number[]): void;
declare const appfile4_ar: number[];
//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":"AAAA,QAAA,MAAM,MAAM,KAAK,CAAC;AAClB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC;;ICF7B,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC;;ICAvB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,KAAK,KAAK,CAAC;AACjB,iBAAS,cAAc,CAAC,GAAG,GAAG,MAAM,EAAE,QAAK;AAC3C,QAAA,MAAM,WAAW,UAAW,CAAC"}

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
>>>declare const myGlob = 20;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^
5 >                    ^^^^^
6 >                         ^
7 >                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(8, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(8, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(8, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(8, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(8, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(8, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(8, 25) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(10, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(10, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(10, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(10, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(10, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(10, 32) Source(1, 24) + SourceIndex(3)
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
1 >
2 >    export
3 >           
4 >           const 
5 >                 z
6 >                   = 30
7 >                       ;
1 >Emitted(12, 5) Source(1, 1) + SourceIndex(4)
2 >Emitted(12, 11) Source(1, 7) + SourceIndex(4)
3 >Emitted(12, 12) Source(1, 8) + SourceIndex(4)
4 >Emitted(12, 18) Source(1, 14) + SourceIndex(4)
5 >Emitted(12, 19) Source(1, 15) + SourceIndex(4)
6 >Emitted(12, 24) Source(1, 20) + SourceIndex(4)
7 >Emitted(12, 25) Source(1, 21) + SourceIndex(4)
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
7 >                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >
3 >        const 
4 >              myVar
5 >                    = 30
6 >                        ;
1 >Emitted(14, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(14, 9) Source(1, 1) + SourceIndex(5)
3 >Emitted(14, 15) Source(1, 7) + SourceIndex(5)
4 >Emitted(14, 20) Source(1, 12) + SourceIndex(5)
5 >Emitted(14, 25) Source(1, 17) + SourceIndex(5)
6 >Emitted(14, 26) Source(1, 18) + SourceIndex(5)
---
>>>declare function appfile4Spread(...b: number[]): void;
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
3 >                 appfile4Spread
4 >                               (
5 >                                ...
6 >                                   b: 
7 >                                      number
8 >                                            []
9 >                                              ) { }
1->Emitted(15, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(15, 18) Source(2, 10) + SourceIndex(5)
3 >Emitted(15, 32) Source(2, 24) + SourceIndex(5)
4 >Emitted(15, 33) Source(2, 25) + SourceIndex(5)
5 >Emitted(15, 36) Source(2, 28) + SourceIndex(5)
6 >Emitted(15, 39) Source(2, 31) + SourceIndex(5)
7 >Emitted(15, 45) Source(2, 37) + SourceIndex(5)
8 >Emitted(15, 47) Source(2, 39) + SourceIndex(5)
9 >Emitted(15, 55) Source(2, 44) + SourceIndex(5)
---
>>>declare const appfile4_ar: number[];
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
4 >              appfile4_ar
5 >                          = [20, 30]
6 >                                   ;
1 >Emitted(16, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(16, 9) Source(3, 1) + SourceIndex(5)
3 >Emitted(16, 15) Source(3, 7) + SourceIndex(5)
4 >Emitted(16, 26) Source(3, 18) + SourceIndex(5)
5 >Emitted(16, 36) Source(3, 29) + SourceIndex(5)
6 >Emitted(16, 37) Source(3, 30) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.js]
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
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
    function forappfile3Rest() {
        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
    }
});
var myVar = 30;
function appfile4Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var appfile4_ar = [20, 30];
appfile4Spread.apply(void 0, __spreadArray([10], __read(appfile4_ar), false));
//# sourceMappingURL=module.js.map

//// [/src/app/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe;QAC5C,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;;;;;;ICFY,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICAV,QAAA,CAAC,GAAG,EAAE,CAAC;IACM,SAAS,eAAe;QAClD,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;;ACHD,IAAM,KAAK,GAAG,EAAE,CAAC;AACjB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE"}

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
7 >                ^^^^^^^^^^^^->
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
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
11>                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
emittedFile:/src/app/module.js
sourceFile:../lib/file1.ts
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
7 >                   ^^^^^^^^^^^^^^->
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
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(59, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(59, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(59, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(59, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(59, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(59, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(61, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(61, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(61, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(61, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(61, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(61, 22) Source(1, 24) + SourceIndex(3)
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
7 >                   ^^^^^^^^^^^^^^->
1->export const 
2 >    
3 >            z
4 >              = 
5 >                30
6 >                  ;
1->Emitted(66, 5) Source(1, 14) + SourceIndex(4)
2 >Emitted(66, 13) Source(1, 14) + SourceIndex(4)
3 >Emitted(66, 14) Source(1, 15) + SourceIndex(4)
4 >Emitted(66, 17) Source(1, 18) + SourceIndex(4)
5 >Emitted(66, 19) Source(1, 20) + SourceIndex(4)
6 >Emitted(66, 20) Source(1, 21) + SourceIndex(4)
---
>>>    function forappfile3Rest() {
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^^^^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >import { x } from "file1";
2 >    function 
3 >             forappfile3Rest
1->Emitted(67, 5) Source(2, 27) + SourceIndex(4)
2 >Emitted(67, 14) Source(2, 36) + SourceIndex(4)
3 >Emitted(67, 29) Source(2, 51) + SourceIndex(4)
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
1->Emitted(68, 9) Source(3, 1) + SourceIndex(4)
2 >Emitted(68, 13) Source(3, 7) + SourceIndex(4)
3 >Emitted(68, 18) Source(3, 24) + SourceIndex(4)
4 >Emitted(68, 20) Source(3, 26) + SourceIndex(4)
5 >Emitted(68, 21) Source(3, 27) + SourceIndex(4)
6 >Emitted(68, 23) Source(3, 29) + SourceIndex(4)
7 >Emitted(68, 25) Source(3, 31) + SourceIndex(4)
8 >Emitted(68, 27) Source(3, 33) + SourceIndex(4)
9 >Emitted(68, 28) Source(3, 34) + SourceIndex(4)
10>Emitted(68, 30) Source(3, 36) + SourceIndex(4)
11>Emitted(68, 32) Source(3, 38) + SourceIndex(4)
12>Emitted(68, 34) Source(3, 40) + SourceIndex(4)
13>Emitted(68, 36) Source(3, 42) + SourceIndex(4)
14>Emitted(68, 38) Source(3, 44) + SourceIndex(4)
15>Emitted(68, 40) Source(3, 46) + SourceIndex(4)
16>Emitted(68, 42) Source(3, 48) + SourceIndex(4)
17>Emitted(68, 44) Source(3, 9) + SourceIndex(4)
18>Emitted(68, 45) Source(3, 10) + SourceIndex(4)
19>Emitted(68, 52) Source(3, 10) + SourceIndex(4)
20>Emitted(68, 54) Source(3, 15) + SourceIndex(4)
21>Emitted(68, 58) Source(3, 19) + SourceIndex(4)
22>Emitted(68, 72) Source(3, 7) + SourceIndex(4)
23>Emitted(68, 77) Source(3, 21) + SourceIndex(4)
24>Emitted(68, 78) Source(3, 48) + SourceIndex(4)
25>Emitted(68, 79) Source(3, 49) + SourceIndex(4)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >
2 >    }
1 >Emitted(69, 5) Source(4, 1) + SourceIndex(4)
2 >Emitted(69, 6) Source(4, 2) + SourceIndex(4)
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
7 >               ^^^^^^^^^^^^^->
1 >
2 >const 
3 >    myVar
4 >          = 
5 >            30
6 >              ;
1 >Emitted(71, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(71, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(71, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(71, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(71, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(71, 16) Source(1, 18) + SourceIndex(5)
---
>>>function appfile4Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         appfile4Spread
1->Emitted(72, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(72, 10) Source(2, 10) + SourceIndex(5)
3 >Emitted(72, 24) Source(2, 24) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(73, 5) Source(2, 25) + SourceIndex(5)
2 >Emitted(73, 16) Source(2, 39) + SourceIndex(5)
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
1->Emitted(74, 10) Source(2, 25) + SourceIndex(5)
2 >Emitted(74, 20) Source(2, 39) + SourceIndex(5)
3 >Emitted(74, 22) Source(2, 25) + SourceIndex(5)
4 >Emitted(74, 43) Source(2, 39) + SourceIndex(5)
5 >Emitted(74, 45) Source(2, 25) + SourceIndex(5)
6 >Emitted(74, 49) Source(2, 39) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(75, 9) Source(2, 25) + SourceIndex(5)
2 >Emitted(75, 31) Source(2, 39) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(77, 1) Source(2, 43) + SourceIndex(5)
2 >Emitted(77, 2) Source(2, 44) + SourceIndex(5)
---
>>>var appfile4_ar = [20, 30];
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
11>                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    appfile4_ar
4 >                = 
5 >                  [
6 >                   20
7 >                     , 
8 >                       30
9 >                         ]
10>                          ;
1->Emitted(78, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(78, 5) Source(3, 7) + SourceIndex(5)
3 >Emitted(78, 16) Source(3, 18) + SourceIndex(5)
4 >Emitted(78, 19) Source(3, 21) + SourceIndex(5)
5 >Emitted(78, 20) Source(3, 22) + SourceIndex(5)
6 >Emitted(78, 22) Source(3, 24) + SourceIndex(5)
7 >Emitted(78, 24) Source(3, 26) + SourceIndex(5)
8 >Emitted(78, 26) Source(3, 28) + SourceIndex(5)
9 >Emitted(78, 27) Source(3, 29) + SourceIndex(5)
10>Emitted(78, 28) Source(3, 30) + SourceIndex(5)
---
>>>appfile4Spread.apply(void 0, __spreadArray([10], __read(appfile4_ar), false));
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                            ^^
5 >                                              ^^^^^^^^^^
6 >                                                        ^^^^^^^^^^^
7 >                                                                   ^^^^^^^^^^^
1->
  >
2 >appfile4Spread
3 >              (
4 >                                            10
5 >                                              , ...
6 >                                                        appfile4_ar
7 >                                                                   );
1->Emitted(79, 1) Source(4, 1) + SourceIndex(5)
2 >Emitted(79, 15) Source(4, 15) + SourceIndex(5)
3 >Emitted(79, 45) Source(4, 16) + SourceIndex(5)
4 >Emitted(79, 47) Source(4, 18) + SourceIndex(5)
5 >Emitted(79, 57) Source(4, 23) + SourceIndex(5)
6 >Emitted(79, 68) Source(4, 34) + SourceIndex(5)
7 >Emitted(79, 79) Source(4, 36) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/app/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file3.ts","./file4.ts"],"js":{"sections":[{"pos":0,"end":504,"kind":"emitHelpers","data":"typescript:read"},{"pos":506,"end":894,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":896,"end":1396,"kind":"emitHelpers","data":"typescript:rest"},{"pos":1398,"end":2228,"kind":"prepend","data":"../lib/module.js","texts":[{"pos":1398,"end":2228,"kind":"text"}]},{"pos":2228,"end":2825,"kind":"text"}],"sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]}},"dts":{"sections":[{"pos":0,"end":265,"kind":"prepend","data":"../lib/module.d.ts","texts":[{"pos":0,"end":265,"kind":"text"}]},{"pos":265,"end":441,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/app/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/app/module.js
----------------------------------------------------------------------
emitHelpers: (0-504):: typescript:read
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
emitHelpers: (506-894):: typescript:spreadArray
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
emitHelpers: (896-1396):: typescript:rest
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
prepend: (1398-2228):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (1398-2228)
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

----------------------------------------------------------------------
text: (2228-2825)
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = void 0;
    exports.z = 30;
    function forappfile3Rest() {
        var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
    }
});
var myVar = 30;
function appfile4Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var appfile4_ar = [20, 30];
appfile4Spread.apply(void 0, __spreadArray([10], __read(appfile4_ar), false));

======================================================================
======================================================================
File:: /src/app/module.d.ts
----------------------------------------------------------------------
prepend: (0-265):: ../lib/module.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-265)
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

----------------------------------------------------------------------
text: (265-441)
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;
declare function appfile4Spread(...b: number[]): void;
declare const appfile4_ar: number[];

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
          "pos": 0,
          "end": 504,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 506,
          "end": 894,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 896,
          "end": 1396,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 1398,
          "end": 2228,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 1398,
              "end": 2228,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2228,
          "end": 2825,
          "kind": "text"
        }
      ],
      "sources": {
        "helpers": [
          "typescript:rest",
          "typescript:read",
          "typescript:spreadArray"
        ]
      }
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 265,
          "kind": "prepend",
          "data": "../lib/module.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 265,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 265,
          "end": 441,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 743
}

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
7 >                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
7 >                ^^^^^^^^^^^^->
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
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
11>                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
7 >                   ^^^^^^^^^^^^^^->
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
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"js":{"sections":[{"pos":0,"end":504,"kind":"emitHelpers","data":"typescript:read"},{"pos":506,"end":894,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":896,"end":1396,"kind":"emitHelpers","data":"typescript:rest"},{"pos":1398,"end":2228,"kind":"text"}],"sources":{"helpers":["typescript:read","typescript:spreadArray","typescript:rest"]}},"dts":{"sections":[{"pos":0,"end":265,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
emitHelpers: (0-504):: typescript:read
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
emitHelpers: (506-894):: typescript:spreadArray
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
emitHelpers: (896-1396):: typescript:rest
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
text: (1398-2228)
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
text: (0-265)
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
          "end": 504,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 506,
          "end": 894,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 896,
          "end": 1396,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 1398,
          "end": 2228,
          "kind": "text"
        }
      ],
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
          "end": 265,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 544
}

