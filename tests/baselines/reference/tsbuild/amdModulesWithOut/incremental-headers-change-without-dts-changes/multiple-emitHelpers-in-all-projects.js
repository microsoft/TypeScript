Input::
//// [/src/lib/file1.ts]
export const x = 10;function forlibfile1Rest() { }



Output::
/lib/tsc --b /src/app --verbose
[[90m12:08:00 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:08:00 AM[0m] Project 'src/lib/tsconfig.json' is out of date because oldest output 'src/lib/module.js' is older than newest input 'src/lib/file1.ts'

[[90m12:08:00 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:08:00 AM[0m] Project 'src/app/tsconfig.json' is out of date because output of its dependency 'src/lib' has changed

[[90m12:08:00 AM[0m] Updating output of project '/src/app/tsconfig.json'...

[[90m12:08:00 AM[0m] Updating unchanged output timestamps of project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


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
    function forlibfile1Rest() { }
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe,KAAK,CAAC;;;;;;ICArC,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICAV,QAAA,CAAC,GAAG,EAAE,CAAC;IACM,SAAS,eAAe;QAClD,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;IAChD,CAAC;;ACHD,IAAM,KAAK,GAAG,EAAE,CAAC;AACjB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE"}

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
7 >                   ^^^^^^^^^^^^^^^^->
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
1->Emitted(51, 5) Source(1, 21) + SourceIndex(1)
2 >Emitted(51, 14) Source(1, 30) + SourceIndex(1)
3 >Emitted(51, 29) Source(1, 45) + SourceIndex(1)
4 >Emitted(51, 34) Source(1, 50) + SourceIndex(1)
5 >Emitted(51, 35) Source(1, 51) + SourceIndex(1)
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
1 >Emitted(57, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(57, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(57, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(57, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(57, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(57, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(59, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(59, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(59, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(59, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(59, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(59, 22) Source(1, 24) + SourceIndex(3)
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
1->Emitted(64, 5) Source(1, 14) + SourceIndex(4)
2 >Emitted(64, 13) Source(1, 14) + SourceIndex(4)
3 >Emitted(64, 14) Source(1, 15) + SourceIndex(4)
4 >Emitted(64, 17) Source(1, 18) + SourceIndex(4)
5 >Emitted(64, 19) Source(1, 20) + SourceIndex(4)
6 >Emitted(64, 20) Source(1, 21) + SourceIndex(4)
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
1->Emitted(65, 5) Source(2, 27) + SourceIndex(4)
2 >Emitted(65, 14) Source(2, 36) + SourceIndex(4)
3 >Emitted(65, 29) Source(2, 51) + SourceIndex(4)
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
1->Emitted(66, 9) Source(3, 1) + SourceIndex(4)
2 >Emitted(66, 13) Source(3, 7) + SourceIndex(4)
3 >Emitted(66, 18) Source(3, 24) + SourceIndex(4)
4 >Emitted(66, 20) Source(3, 26) + SourceIndex(4)
5 >Emitted(66, 21) Source(3, 27) + SourceIndex(4)
6 >Emitted(66, 23) Source(3, 29) + SourceIndex(4)
7 >Emitted(66, 25) Source(3, 31) + SourceIndex(4)
8 >Emitted(66, 27) Source(3, 33) + SourceIndex(4)
9 >Emitted(66, 28) Source(3, 34) + SourceIndex(4)
10>Emitted(66, 30) Source(3, 36) + SourceIndex(4)
11>Emitted(66, 32) Source(3, 38) + SourceIndex(4)
12>Emitted(66, 34) Source(3, 40) + SourceIndex(4)
13>Emitted(66, 36) Source(3, 42) + SourceIndex(4)
14>Emitted(66, 38) Source(3, 44) + SourceIndex(4)
15>Emitted(66, 40) Source(3, 46) + SourceIndex(4)
16>Emitted(66, 42) Source(3, 48) + SourceIndex(4)
17>Emitted(66, 44) Source(3, 9) + SourceIndex(4)
18>Emitted(66, 45) Source(3, 10) + SourceIndex(4)
19>Emitted(66, 52) Source(3, 10) + SourceIndex(4)
20>Emitted(66, 54) Source(3, 15) + SourceIndex(4)
21>Emitted(66, 58) Source(3, 19) + SourceIndex(4)
22>Emitted(66, 72) Source(3, 7) + SourceIndex(4)
23>Emitted(66, 77) Source(3, 21) + SourceIndex(4)
24>Emitted(66, 78) Source(3, 48) + SourceIndex(4)
25>Emitted(66, 79) Source(3, 49) + SourceIndex(4)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >
2 >    }
1 >Emitted(67, 5) Source(4, 1) + SourceIndex(4)
2 >Emitted(67, 6) Source(4, 2) + SourceIndex(4)
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
1 >Emitted(69, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(69, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(69, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(69, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(69, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(69, 16) Source(1, 18) + SourceIndex(5)
---
>>>function appfile4Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         appfile4Spread
1->Emitted(70, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(70, 10) Source(2, 10) + SourceIndex(5)
3 >Emitted(70, 24) Source(2, 24) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(71, 5) Source(2, 25) + SourceIndex(5)
2 >Emitted(71, 16) Source(2, 39) + SourceIndex(5)
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
1->Emitted(72, 10) Source(2, 25) + SourceIndex(5)
2 >Emitted(72, 20) Source(2, 39) + SourceIndex(5)
3 >Emitted(72, 22) Source(2, 25) + SourceIndex(5)
4 >Emitted(72, 43) Source(2, 39) + SourceIndex(5)
5 >Emitted(72, 45) Source(2, 25) + SourceIndex(5)
6 >Emitted(72, 49) Source(2, 39) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(73, 9) Source(2, 25) + SourceIndex(5)
2 >Emitted(73, 31) Source(2, 39) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(75, 1) Source(2, 43) + SourceIndex(5)
2 >Emitted(75, 2) Source(2, 44) + SourceIndex(5)
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
1->Emitted(76, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(76, 5) Source(3, 7) + SourceIndex(5)
3 >Emitted(76, 16) Source(3, 18) + SourceIndex(5)
4 >Emitted(76, 19) Source(3, 21) + SourceIndex(5)
5 >Emitted(76, 20) Source(3, 22) + SourceIndex(5)
6 >Emitted(76, 22) Source(3, 24) + SourceIndex(5)
7 >Emitted(76, 24) Source(3, 26) + SourceIndex(5)
8 >Emitted(76, 26) Source(3, 28) + SourceIndex(5)
9 >Emitted(76, 27) Source(3, 29) + SourceIndex(5)
10>Emitted(76, 28) Source(3, 30) + SourceIndex(5)
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
1->Emitted(77, 1) Source(4, 1) + SourceIndex(5)
2 >Emitted(77, 15) Source(4, 15) + SourceIndex(5)
3 >Emitted(77, 45) Source(4, 16) + SourceIndex(5)
4 >Emitted(77, 47) Source(4, 18) + SourceIndex(5)
5 >Emitted(77, 57) Source(4, 23) + SourceIndex(5)
6 >Emitted(77, 68) Source(4, 34) + SourceIndex(5)
7 >Emitted(77, 79) Source(4, 36) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/app/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file3.ts","./file4.ts"],"js":{"sections":[{"pos":0,"end":504,"kind":"emitHelpers","data":"typescript:read"},{"pos":506,"end":894,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":896,"end":1396,"kind":"emitHelpers","data":"typescript:rest"},{"pos":1398,"end":2143,"kind":"prepend","data":"../lib/module.js","texts":[{"pos":1398,"end":2143,"kind":"text"}]},{"pos":2143,"end":2740,"kind":"text"}],"sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]}},"dts":{"sections":[{"pos":0,"end":265,"kind":"prepend","data":"../lib/module.d.ts","texts":[{"pos":0,"end":265,"kind":"text"}]},{"pos":265,"end":441,"kind":"text"}]}},"version":"FakeTSVersion"}

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
prepend: (1398-2143):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (1398-2143)
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
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (2143-2740)
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
          "end": 2143,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 1398,
              "end": 2143,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2143,
          "end": 2740,
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

//// [/src/lib/module.d.ts] file written with same contents
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC;AAClB,SAAS,cAAc;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AAC3C,IAAM,WAAW,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC7B,cAAc,8BAAC,EAAE,UAAK,WAAW,WAAE;;;;;ICHtB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,SAAS,eAAe,KAAK,CAAC;;;;;;ICArC,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

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
7 >                ^^^^^^^^^^^^->
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
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
7 >                   ^^^^^^^^^^^^^^^^->
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
1 >Emitted(46, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(46, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(46, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(46, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(46, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(46, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(48, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(48, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(48, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(48, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(48, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(48, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"js":{"sections":[{"pos":0,"end":504,"kind":"emitHelpers","data":"typescript:read"},{"pos":506,"end":894,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":896,"end":1641,"kind":"text"}],"sources":{"helpers":["typescript:read","typescript:spreadArray"]}},"dts":{"sections":[{"pos":0,"end":265,"kind":"text"}]}},"version":"FakeTSVersion"}

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
text: (896-1641)
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
          "end": 1641,
          "kind": "text"
        }
      ],
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
          "end": 265,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 456
}

