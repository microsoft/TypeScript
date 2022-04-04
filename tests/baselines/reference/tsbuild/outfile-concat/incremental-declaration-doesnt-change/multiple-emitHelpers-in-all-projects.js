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
function forfirstfirst_PART1Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}console.log(s);



Output::
/lib/tsc --b /src/third --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because oldest output 'src/first/bin/first-output.js' is older than newest input 'src/first/first_PART1.ts'

[[90m12:04:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:04:00 AM[0m] Project 'src/second/tsconfig.json' is up to date because newest input 'src/second/second_part1.ts' is older than oldest output 'src/2/second-output.js'

[[90m12:04:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:04:00 AM[0m] Updating output of project '/src/third/tsconfig.json'...

[[90m12:04:00 AM[0m] Updating unchanged output timestamps of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/first/bin/first-output.d.ts] file written with same contents
//// [/src/first/bin/first-output.d.ts.map] file written with same contents
//// [/src/first/bin/first-output.d.ts.map.baseline.txt] file written with same contents
//// [/src/first/bin/first-output.js]
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
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
function firstfirst_part3Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE"}

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
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(37, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(37, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(37, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(37, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(38, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(38, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(38, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(38, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(38, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(38, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(38, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(38, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
1->Emitted(39, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(39, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(39, 33) Source(12, 33) + SourceIndex(0)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^
4 >             ^^
5 >               ^
6 >                ^^
7 >                  ^^
8 >                    ^^
9 >                      ^
10>                       ^^
11>                         ^^
12>                           ^^
13>                             ^^
14>                               ^^
15>                                 ^^
16>                                   ^^
17>                                     ^^
18>                                       ^
19>                                        ^^^^^^^
20>                                               ^^
21>                                                 ^^^^
22>                                                     ^^^^^^^^^^^^^^
23>                                                                   ^^^^^
24>                                                                        ^
25>                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = 
4 >             { 
5 >               a
6 >                : 
7 >                  10
8 >                    , 
9 >                      b
10>                       : 
11>                         30
12>                           , 
13>                             yy
14>                               : 
15>                                 30
16>                                    }
17>                                     
18>                                       b
19>                                        
20>                                               , ...
21>                                                 rest
22>                                                     
23>                                                                   { b, ...rest }
24>                                                                         = { a: 10, b: 30, yy: 30 }
25>                                                                         ;
1->Emitted(40, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(40, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(40, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(40, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(40, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(40, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(40, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(40, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(40, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(40, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(40, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(40, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(40, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(40, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(40, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(40, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(40, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(40, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(40, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(40, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(40, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(40, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(40, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(40, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(40, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(41, 2) Source(14, 2) + SourceIndex(0)
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
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(42, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(42, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(42, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(42, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(42, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(42, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(42, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(42, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(43, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(43, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(43, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(43, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(43, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(43, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(43, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(43, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(43, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(44, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(44, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(44, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(45, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(45, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(45, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(45, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(46, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(46, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(47, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(47, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(47, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(48, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(48, 16) Source(4, 47) + SourceIndex(2)
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
1->Emitted(49, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(49, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(49, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(49, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(49, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(49, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(50, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(50, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(52, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(52, 2) Source(4, 52) + SourceIndex(2)
---
>>>var firstfirst_part3_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    firstfirst_part3_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(53, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(53, 5) Source(5, 7) + SourceIndex(2)
3 >Emitted(53, 24) Source(5, 26) + SourceIndex(2)
4 >Emitted(53, 27) Source(5, 29) + SourceIndex(2)
5 >Emitted(53, 28) Source(5, 30) + SourceIndex(2)
6 >Emitted(53, 30) Source(5, 32) + SourceIndex(2)
7 >Emitted(53, 32) Source(5, 34) + SourceIndex(2)
8 >Emitted(53, 34) Source(5, 36) + SourceIndex(2)
9 >Emitted(53, 35) Source(5, 37) + SourceIndex(2)
10>Emitted(53, 36) Source(5, 38) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                firstfirst_part3_ar
7 >                                                                                   );
1->Emitted(54, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(54, 23) Source(6, 23) + SourceIndex(2)
3 >Emitted(54, 53) Source(6, 24) + SourceIndex(2)
4 >Emitted(54, 55) Source(6, 26) + SourceIndex(2)
5 >Emitted(54, 65) Source(6, 31) + SourceIndex(2)
6 >Emitted(54, 84) Source(6, 50) + SourceIndex(2)
7 >Emitted(54, 95) Source(6, 52) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":500,"kind":"emitHelpers","data":"typescript:rest"},{"pos":502,"end":1006,"kind":"emitHelpers","data":"typescript:read"},{"pos":1008,"end":1396,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":1398,"end":1924,"kind":"text"}],"sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]}},"dts":{"sections":[{"pos":0,"end":318,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
emitHelpers: (0-500):: typescript:rest
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
emitHelpers: (502-1006):: typescript:read
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
emitHelpers: (1008-1396):: typescript:spreadArray
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
text: (1398-1924)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
function firstfirst_part3Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
text: (0-318)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;
declare function firstfirst_part3Spread(...b: number[]): void;
declare const firstfirst_part3_ar: number[];

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
          "end": 500,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 502,
          "end": 1006,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 1008,
          "end": 1396,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 1398,
          "end": 1924,
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
          "end": 318,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 553
}

//// [/src/third/thirdjs/output/third-output.js]
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
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
function firstfirst_part3Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
function forsecondsecond_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
function secondsecond_part2Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
function thirdthird_part1Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AAAA,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACbhB,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE;ACDnD,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AACD,SAAS,yBAAyB;IAClC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;ACbD;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;AAED,SAAS,wBAAwB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACrD,IAAM,qBAAqB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACvC,wBAAwB,8BAAC,EAAE,UAAK,qBAAqB,WAAE;ACRvD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC;AAChB,SAAS,uBAAuB;IAChC,IAAM,KAAiB,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAE,EAAvC,CAAC,OAAA,EAAK,IAAI,cAAZ,KAAc,CAA2B,CAAC;AAChD,CAAC;AACD,SAAS,sBAAsB;IAAC,WAAc;SAAd,UAAc,EAAd,qBAAc,EAAd,IAAc;QAAd,sBAAc;;AAAI,CAAC;AACnD,IAAM,mBAAmB,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AACrC,sBAAsB,8BAAC,EAAE,UAAK,mBAAmB,WAAE"}

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
1 >Emitted(37, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(37, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(37, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(37, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(37, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(37, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(38, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(38, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(38, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(38, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(38, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(38, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(38, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(38, 16) Source(11, 16) + SourceIndex(0)
---
>>>function forfirstfirst_PART1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forfirstfirst_PART1Rest
1->Emitted(39, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(39, 10) Source(12, 10) + SourceIndex(0)
3 >Emitted(39, 33) Source(12, 33) + SourceIndex(0)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^
4 >             ^^
5 >               ^
6 >                ^^
7 >                  ^^
8 >                    ^^
9 >                      ^
10>                       ^^
11>                         ^^
12>                           ^^
13>                             ^^
14>                               ^^
15>                                 ^^
16>                                   ^^
17>                                     ^^
18>                                       ^
19>                                        ^^^^^^^
20>                                               ^^
21>                                                 ^^^^
22>                                                     ^^^^^^^^^^^^^^
23>                                                                   ^^^^^
24>                                                                        ^
25>                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = 
4 >             { 
5 >               a
6 >                : 
7 >                  10
8 >                    , 
9 >                      b
10>                       : 
11>                         30
12>                           , 
13>                             yy
14>                               : 
15>                                 30
16>                                    }
17>                                     
18>                                       b
19>                                        
20>                                               , ...
21>                                                 rest
22>                                                     
23>                                                                   { b, ...rest }
24>                                                                         = { a: 10, b: 30, yy: 30 }
25>                                                                         ;
1->Emitted(40, 5) Source(13, 1) + SourceIndex(0)
2 >Emitted(40, 9) Source(13, 7) + SourceIndex(0)
3 >Emitted(40, 14) Source(13, 24) + SourceIndex(0)
4 >Emitted(40, 16) Source(13, 26) + SourceIndex(0)
5 >Emitted(40, 17) Source(13, 27) + SourceIndex(0)
6 >Emitted(40, 19) Source(13, 29) + SourceIndex(0)
7 >Emitted(40, 21) Source(13, 31) + SourceIndex(0)
8 >Emitted(40, 23) Source(13, 33) + SourceIndex(0)
9 >Emitted(40, 24) Source(13, 34) + SourceIndex(0)
10>Emitted(40, 26) Source(13, 36) + SourceIndex(0)
11>Emitted(40, 28) Source(13, 38) + SourceIndex(0)
12>Emitted(40, 30) Source(13, 40) + SourceIndex(0)
13>Emitted(40, 32) Source(13, 42) + SourceIndex(0)
14>Emitted(40, 34) Source(13, 44) + SourceIndex(0)
15>Emitted(40, 36) Source(13, 46) + SourceIndex(0)
16>Emitted(40, 38) Source(13, 48) + SourceIndex(0)
17>Emitted(40, 40) Source(13, 9) + SourceIndex(0)
18>Emitted(40, 41) Source(13, 10) + SourceIndex(0)
19>Emitted(40, 48) Source(13, 10) + SourceIndex(0)
20>Emitted(40, 50) Source(13, 15) + SourceIndex(0)
21>Emitted(40, 54) Source(13, 19) + SourceIndex(0)
22>Emitted(40, 68) Source(13, 7) + SourceIndex(0)
23>Emitted(40, 73) Source(13, 21) + SourceIndex(0)
24>Emitted(40, 74) Source(13, 48) + SourceIndex(0)
25>Emitted(40, 75) Source(13, 49) + SourceIndex(0)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(41, 1) Source(14, 1) + SourceIndex(0)
2 >Emitted(41, 2) Source(14, 2) + SourceIndex(0)
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
2 >console
3 >       .
4 >        log
5 >           (
6 >            s
7 >             )
8 >              ;
1->Emitted(42, 1) Source(14, 2) + SourceIndex(0)
2 >Emitted(42, 8) Source(14, 9) + SourceIndex(0)
3 >Emitted(42, 9) Source(14, 10) + SourceIndex(0)
4 >Emitted(42, 12) Source(14, 13) + SourceIndex(0)
5 >Emitted(42, 13) Source(14, 14) + SourceIndex(0)
6 >Emitted(42, 14) Source(14, 15) + SourceIndex(0)
7 >Emitted(42, 15) Source(14, 16) + SourceIndex(0)
8 >Emitted(42, 16) Source(14, 17) + SourceIndex(0)
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
1->Emitted(43, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(43, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(43, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(43, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(43, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(43, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(43, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(43, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(43, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(44, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(44, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(44, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(45, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(45, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(45, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(45, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(46, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(46, 2) Source(3, 2) + SourceIndex(2)
---
>>>function firstfirst_part3Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         firstfirst_part3Spread
1->Emitted(47, 1) Source(4, 1) + SourceIndex(2)
2 >Emitted(47, 10) Source(4, 10) + SourceIndex(2)
3 >Emitted(47, 32) Source(4, 32) + SourceIndex(2)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(48, 5) Source(4, 33) + SourceIndex(2)
2 >Emitted(48, 16) Source(4, 47) + SourceIndex(2)
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
1->Emitted(49, 10) Source(4, 33) + SourceIndex(2)
2 >Emitted(49, 20) Source(4, 47) + SourceIndex(2)
3 >Emitted(49, 22) Source(4, 33) + SourceIndex(2)
4 >Emitted(49, 43) Source(4, 47) + SourceIndex(2)
5 >Emitted(49, 45) Source(4, 33) + SourceIndex(2)
6 >Emitted(49, 49) Source(4, 47) + SourceIndex(2)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(50, 9) Source(4, 33) + SourceIndex(2)
2 >Emitted(50, 31) Source(4, 47) + SourceIndex(2)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(52, 1) Source(4, 51) + SourceIndex(2)
2 >Emitted(52, 2) Source(4, 52) + SourceIndex(2)
---
>>>var firstfirst_part3_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    firstfirst_part3_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(53, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(53, 5) Source(5, 7) + SourceIndex(2)
3 >Emitted(53, 24) Source(5, 26) + SourceIndex(2)
4 >Emitted(53, 27) Source(5, 29) + SourceIndex(2)
5 >Emitted(53, 28) Source(5, 30) + SourceIndex(2)
6 >Emitted(53, 30) Source(5, 32) + SourceIndex(2)
7 >Emitted(53, 32) Source(5, 34) + SourceIndex(2)
8 >Emitted(53, 34) Source(5, 36) + SourceIndex(2)
9 >Emitted(53, 35) Source(5, 37) + SourceIndex(2)
10>Emitted(53, 36) Source(5, 38) + SourceIndex(2)
---
>>>firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >firstfirst_part3Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                firstfirst_part3_ar
7 >                                                                                   );
1->Emitted(54, 1) Source(6, 1) + SourceIndex(2)
2 >Emitted(54, 23) Source(6, 23) + SourceIndex(2)
3 >Emitted(54, 53) Source(6, 24) + SourceIndex(2)
4 >Emitted(54, 55) Source(6, 26) + SourceIndex(2)
5 >Emitted(54, 65) Source(6, 31) + SourceIndex(2)
6 >Emitted(54, 84) Source(6, 50) + SourceIndex(2)
7 >Emitted(54, 95) Source(6, 52) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part1.ts
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
1 >Emitted(55, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(55, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(55, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(55, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(56, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(56, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(56, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(57, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(57, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(57, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(58, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(58, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(58, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(58, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(58, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(58, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(58, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(58, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(59, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(59, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(60, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(60, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(60, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(60, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(61, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(61, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(61, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(61, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(61, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(61, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(61, 19) Source(11, 2) + SourceIndex(3)
---
>>>function forsecondsecond_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forsecondsecond_part1Rest
1->Emitted(62, 1) Source(12, 1) + SourceIndex(3)
2 >Emitted(62, 10) Source(12, 10) + SourceIndex(3)
3 >Emitted(62, 35) Source(12, 35) + SourceIndex(3)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^
4 >             ^^
5 >               ^
6 >                ^^
7 >                  ^^
8 >                    ^^
9 >                      ^
10>                       ^^
11>                         ^^
12>                           ^^
13>                             ^^
14>                               ^^
15>                                 ^^
16>                                   ^^
17>                                     ^^
18>                                       ^
19>                                        ^^^^^^^
20>                                               ^^
21>                                                 ^^^^
22>                                                     ^^^^^^^^^^^^^^
23>                                                                   ^^^^^
24>                                                                        ^
25>                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = 
4 >             { 
5 >               a
6 >                : 
7 >                  10
8 >                    , 
9 >                      b
10>                       : 
11>                         30
12>                           , 
13>                             yy
14>                               : 
15>                                 30
16>                                    }
17>                                     
18>                                       b
19>                                        
20>                                               , ...
21>                                                 rest
22>                                                     
23>                                                                   { b, ...rest }
24>                                                                         = { a: 10, b: 30, yy: 30 }
25>                                                                         ;
1->Emitted(63, 5) Source(13, 1) + SourceIndex(3)
2 >Emitted(63, 9) Source(13, 7) + SourceIndex(3)
3 >Emitted(63, 14) Source(13, 24) + SourceIndex(3)
4 >Emitted(63, 16) Source(13, 26) + SourceIndex(3)
5 >Emitted(63, 17) Source(13, 27) + SourceIndex(3)
6 >Emitted(63, 19) Source(13, 29) + SourceIndex(3)
7 >Emitted(63, 21) Source(13, 31) + SourceIndex(3)
8 >Emitted(63, 23) Source(13, 33) + SourceIndex(3)
9 >Emitted(63, 24) Source(13, 34) + SourceIndex(3)
10>Emitted(63, 26) Source(13, 36) + SourceIndex(3)
11>Emitted(63, 28) Source(13, 38) + SourceIndex(3)
12>Emitted(63, 30) Source(13, 40) + SourceIndex(3)
13>Emitted(63, 32) Source(13, 42) + SourceIndex(3)
14>Emitted(63, 34) Source(13, 44) + SourceIndex(3)
15>Emitted(63, 36) Source(13, 46) + SourceIndex(3)
16>Emitted(63, 38) Source(13, 48) + SourceIndex(3)
17>Emitted(63, 40) Source(13, 9) + SourceIndex(3)
18>Emitted(63, 41) Source(13, 10) + SourceIndex(3)
19>Emitted(63, 48) Source(13, 10) + SourceIndex(3)
20>Emitted(63, 50) Source(13, 15) + SourceIndex(3)
21>Emitted(63, 54) Source(13, 19) + SourceIndex(3)
22>Emitted(63, 68) Source(13, 7) + SourceIndex(3)
23>Emitted(63, 73) Source(13, 21) + SourceIndex(3)
24>Emitted(63, 74) Source(13, 48) + SourceIndex(3)
25>Emitted(63, 75) Source(13, 49) + SourceIndex(3)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(64, 1) Source(14, 1) + SourceIndex(3)
2 >Emitted(64, 2) Source(14, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(65, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(66, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(67, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(67, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(68, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(68, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(68, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(69, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(69, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(69, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(69, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(69, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(69, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(69, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(69, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(70, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(70, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(71, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(71, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(72, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(72, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(72, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(72, 6) Source(5, 2) + SourceIndex(4)
---
>>>function secondsecond_part2Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^
1->
  >
  >
2 >function 
3 >         secondsecond_part2Spread
1->Emitted(73, 1) Source(7, 1) + SourceIndex(4)
2 >Emitted(73, 10) Source(7, 10) + SourceIndex(4)
3 >Emitted(73, 34) Source(7, 34) + SourceIndex(4)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(74, 5) Source(7, 35) + SourceIndex(4)
2 >Emitted(74, 16) Source(7, 49) + SourceIndex(4)
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
1->Emitted(75, 10) Source(7, 35) + SourceIndex(4)
2 >Emitted(75, 20) Source(7, 49) + SourceIndex(4)
3 >Emitted(75, 22) Source(7, 35) + SourceIndex(4)
4 >Emitted(75, 43) Source(7, 49) + SourceIndex(4)
5 >Emitted(75, 45) Source(7, 35) + SourceIndex(4)
6 >Emitted(75, 49) Source(7, 49) + SourceIndex(4)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(76, 9) Source(7, 35) + SourceIndex(4)
2 >Emitted(76, 31) Source(7, 49) + SourceIndex(4)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(78, 1) Source(7, 53) + SourceIndex(4)
2 >Emitted(78, 2) Source(7, 54) + SourceIndex(4)
---
>>>var secondsecond_part2_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^^^
4 >                         ^^^
5 >                            ^
6 >                             ^^
7 >                               ^^
8 >                                 ^^
9 >                                   ^
10>                                    ^
11>                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    secondsecond_part2_ar
4 >                          = 
5 >                            [
6 >                             20
7 >                               , 
8 >                                 30
9 >                                   ]
10>                                    ;
1->Emitted(79, 1) Source(8, 1) + SourceIndex(4)
2 >Emitted(79, 5) Source(8, 7) + SourceIndex(4)
3 >Emitted(79, 26) Source(8, 28) + SourceIndex(4)
4 >Emitted(79, 29) Source(8, 31) + SourceIndex(4)
5 >Emitted(79, 30) Source(8, 32) + SourceIndex(4)
6 >Emitted(79, 32) Source(8, 34) + SourceIndex(4)
7 >Emitted(79, 34) Source(8, 36) + SourceIndex(4)
8 >Emitted(79, 36) Source(8, 38) + SourceIndex(4)
9 >Emitted(79, 37) Source(8, 39) + SourceIndex(4)
10>Emitted(79, 38) Source(8, 40) + SourceIndex(4)
---
>>>secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                      ^^
5 >                                                        ^^^^^^^^^^
6 >                                                                  ^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                       ^^^^^^^^^^^
1->
  >
2 >secondsecond_part2Spread
3 >                        (
4 >                                                      10
5 >                                                        , ...
6 >                                                                  secondsecond_part2_ar
7 >                                                                                       );
1->Emitted(80, 1) Source(9, 1) + SourceIndex(4)
2 >Emitted(80, 25) Source(9, 25) + SourceIndex(4)
3 >Emitted(80, 55) Source(9, 26) + SourceIndex(4)
4 >Emitted(80, 57) Source(9, 28) + SourceIndex(4)
5 >Emitted(80, 67) Source(9, 33) + SourceIndex(4)
6 >Emitted(80, 88) Source(9, 54) + SourceIndex(4)
7 >Emitted(80, 99) Source(9, 56) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>var c = new C();
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^
6 >            ^
7 >             ^^
8 >               ^
9 >                ^->
1 >
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1 >Emitted(81, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(81, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(81, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(81, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(81, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(81, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(81, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(81, 17) Source(1, 17) + SourceIndex(5)
---
>>>c.doSomething();
1->
2 >^
3 > ^
4 >  ^^^^^^^^^^^
5 >             ^^
6 >               ^
7 >                ^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >c
3 > .
4 >  doSomething
5 >             ()
6 >               ;
1->Emitted(82, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(82, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(82, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(82, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(82, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(82, 17) Source(2, 17) + SourceIndex(5)
---
>>>function forthirdthird_part1Rest() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >function 
3 >         forthirdthird_part1Rest
1->Emitted(83, 1) Source(3, 1) + SourceIndex(5)
2 >Emitted(83, 10) Source(3, 10) + SourceIndex(5)
3 >Emitted(83, 33) Source(3, 33) + SourceIndex(5)
---
>>>    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
1->^^^^
2 >    ^^^^
3 >        ^^^^^
4 >             ^^
5 >               ^
6 >                ^^
7 >                  ^^
8 >                    ^^
9 >                      ^
10>                       ^^
11>                         ^^
12>                           ^^
13>                             ^^
14>                               ^^
15>                                 ^^
16>                                   ^^
17>                                     ^^
18>                                       ^
19>                                        ^^^^^^^
20>                                               ^^
21>                                                 ^^^^
22>                                                     ^^^^^^^^^^^^^^
23>                                                                   ^^^^^
24>                                                                        ^
25>                                                                         ^
1->() {
  >
2 >    const 
3 >        { b, ...rest } = 
4 >             { 
5 >               a
6 >                : 
7 >                  10
8 >                    , 
9 >                      b
10>                       : 
11>                         30
12>                           , 
13>                             yy
14>                               : 
15>                                 30
16>                                    }
17>                                     
18>                                       b
19>                                        
20>                                               , ...
21>                                                 rest
22>                                                     
23>                                                                   { b, ...rest }
24>                                                                         = { a: 10, b: 30, yy: 30 }
25>                                                                         ;
1->Emitted(84, 5) Source(4, 1) + SourceIndex(5)
2 >Emitted(84, 9) Source(4, 7) + SourceIndex(5)
3 >Emitted(84, 14) Source(4, 24) + SourceIndex(5)
4 >Emitted(84, 16) Source(4, 26) + SourceIndex(5)
5 >Emitted(84, 17) Source(4, 27) + SourceIndex(5)
6 >Emitted(84, 19) Source(4, 29) + SourceIndex(5)
7 >Emitted(84, 21) Source(4, 31) + SourceIndex(5)
8 >Emitted(84, 23) Source(4, 33) + SourceIndex(5)
9 >Emitted(84, 24) Source(4, 34) + SourceIndex(5)
10>Emitted(84, 26) Source(4, 36) + SourceIndex(5)
11>Emitted(84, 28) Source(4, 38) + SourceIndex(5)
12>Emitted(84, 30) Source(4, 40) + SourceIndex(5)
13>Emitted(84, 32) Source(4, 42) + SourceIndex(5)
14>Emitted(84, 34) Source(4, 44) + SourceIndex(5)
15>Emitted(84, 36) Source(4, 46) + SourceIndex(5)
16>Emitted(84, 38) Source(4, 48) + SourceIndex(5)
17>Emitted(84, 40) Source(4, 9) + SourceIndex(5)
18>Emitted(84, 41) Source(4, 10) + SourceIndex(5)
19>Emitted(84, 48) Source(4, 10) + SourceIndex(5)
20>Emitted(84, 50) Source(4, 15) + SourceIndex(5)
21>Emitted(84, 54) Source(4, 19) + SourceIndex(5)
22>Emitted(84, 68) Source(4, 7) + SourceIndex(5)
23>Emitted(84, 73) Source(4, 21) + SourceIndex(5)
24>Emitted(84, 74) Source(4, 48) + SourceIndex(5)
25>Emitted(84, 75) Source(4, 49) + SourceIndex(5)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(85, 1) Source(5, 1) + SourceIndex(5)
2 >Emitted(85, 2) Source(5, 2) + SourceIndex(5)
---
>>>function thirdthird_part1Spread() {
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^^^^^^^^^^^^
1->
  >
2 >function 
3 >         thirdthird_part1Spread
1->Emitted(86, 1) Source(6, 1) + SourceIndex(5)
2 >Emitted(86, 10) Source(6, 10) + SourceIndex(5)
3 >Emitted(86, 32) Source(6, 32) + SourceIndex(5)
---
>>>    var b = [];
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >(
2 >    ...b: number[]
1 >Emitted(87, 5) Source(6, 33) + SourceIndex(5)
2 >Emitted(87, 16) Source(6, 47) + SourceIndex(5)
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
1->Emitted(88, 10) Source(6, 33) + SourceIndex(5)
2 >Emitted(88, 20) Source(6, 47) + SourceIndex(5)
3 >Emitted(88, 22) Source(6, 33) + SourceIndex(5)
4 >Emitted(88, 43) Source(6, 47) + SourceIndex(5)
5 >Emitted(88, 45) Source(6, 33) + SourceIndex(5)
6 >Emitted(88, 49) Source(6, 47) + SourceIndex(5)
---
>>>        b[_i] = arguments[_i];
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
1 >
2 >        ...b: number[]
1 >Emitted(89, 9) Source(6, 33) + SourceIndex(5)
2 >Emitted(89, 31) Source(6, 47) + SourceIndex(5)
---
>>>    }
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >) { 
2 >}
1 >Emitted(91, 1) Source(6, 51) + SourceIndex(5)
2 >Emitted(91, 2) Source(6, 52) + SourceIndex(5)
---
>>>var thirdthird_part1_ar = [20, 30];
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^^^
4 >                       ^^^
5 >                          ^
6 >                           ^^
7 >                             ^^
8 >                               ^^
9 >                                 ^
10>                                  ^
11>                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
2 >const 
3 >    thirdthird_part1_ar
4 >                        = 
5 >                          [
6 >                           20
7 >                             , 
8 >                               30
9 >                                 ]
10>                                  ;
1->Emitted(92, 1) Source(7, 1) + SourceIndex(5)
2 >Emitted(92, 5) Source(7, 7) + SourceIndex(5)
3 >Emitted(92, 24) Source(7, 26) + SourceIndex(5)
4 >Emitted(92, 27) Source(7, 29) + SourceIndex(5)
5 >Emitted(92, 28) Source(7, 30) + SourceIndex(5)
6 >Emitted(92, 30) Source(7, 32) + SourceIndex(5)
7 >Emitted(92, 32) Source(7, 34) + SourceIndex(5)
8 >Emitted(92, 34) Source(7, 36) + SourceIndex(5)
9 >Emitted(92, 35) Source(7, 37) + SourceIndex(5)
10>Emitted(92, 36) Source(7, 38) + SourceIndex(5)
---
>>>thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));
1->
2 >^^^^^^^^^^^^^^^^^^^^^^
3 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^
5 >                                                      ^^^^^^^^^^
6 >                                                                ^^^^^^^^^^^^^^^^^^^
7 >                                                                                   ^^^^^^^^^^^
1->
  >
2 >thirdthird_part1Spread
3 >                      (
4 >                                                    10
5 >                                                      , ...
6 >                                                                thirdthird_part1_ar
7 >                                                                                   );
1->Emitted(93, 1) Source(8, 1) + SourceIndex(5)
2 >Emitted(93, 23) Source(8, 23) + SourceIndex(5)
3 >Emitted(93, 53) Source(8, 24) + SourceIndex(5)
4 >Emitted(93, 55) Source(8, 26) + SourceIndex(5)
5 >Emitted(93, 65) Source(8, 31) + SourceIndex(5)
6 >Emitted(93, 84) Source(8, 50) + SourceIndex(5)
7 >Emitted(93, 95) Source(8, 52) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":500,"kind":"emitHelpers","data":"typescript:rest"},{"pos":502,"end":1006,"kind":"emitHelpers","data":"typescript:read"},{"pos":1008,"end":1396,"kind":"emitHelpers","data":"typescript:spreadArray"},{"pos":1398,"end":1924,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":1398,"end":1924,"kind":"text"}]},{"pos":1924,"end":2618,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":1924,"end":2618,"kind":"text"}]},{"pos":2618,"end":3053,"kind":"text"}],"sources":{"helpers":["typescript:rest","typescript:read","typescript:spreadArray"]}},"dts":{"sections":[{"pos":0,"end":318,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":318,"kind":"text"}]},{"pos":318,"end":585,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":318,"end":585,"kind":"text"}]},{"pos":585,"end":765,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
emitHelpers: (0-500):: typescript:rest
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
emitHelpers: (502-1006):: typescript:read
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
emitHelpers: (1008-1396):: typescript:spreadArray
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
prepend: (1398-1924):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1398-1924)
var s = "Hello, world";
console.log(s);
function forfirstfirst_PART1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
function firstfirst_part3Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var firstfirst_part3_ar = [20, 30];
firstfirst_part3Spread.apply(void 0, __spreadArray([10], __read(firstfirst_part3_ar), false));

----------------------------------------------------------------------
prepend: (1924-2618):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (1924-2618)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
function forsecondsecond_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
function secondsecond_part2Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var secondsecond_part2_ar = [20, 30];
secondsecond_part2Spread.apply(void 0, __spreadArray([10], __read(secondsecond_part2_ar), false));

----------------------------------------------------------------------
text: (2618-3053)
var c = new C();
c.doSomething();
function forthirdthird_part1Rest() {
    var _a = { a: 10, b: 30, yy: 30 }, b = _a.b, rest = __rest(_a, ["b"]);
}
function thirdthird_part1Spread() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
var thirdthird_part1_ar = [20, 30];
thirdthird_part1Spread.apply(void 0, __spreadArray([10], __read(thirdthird_part1_ar), false));

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-318):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-318)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function forfirstfirst_PART1Rest(): void;
declare function f(): string;
declare function firstfirst_part3Spread(...b: number[]): void;
declare const firstfirst_part3_ar: number[];

----------------------------------------------------------------------
prepend: (318-585):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (318-585)
declare namespace N {
}
declare namespace N {
}
declare function forsecondsecond_part1Rest(): void;
declare class C {
    doSomething(): void;
}
declare function secondsecond_part2Spread(...b: number[]): void;
declare const secondsecond_part2_ar: number[];

----------------------------------------------------------------------
text: (585-765)
declare var c: C;
declare function forthirdthird_part1Rest(): void;
declare function thirdthird_part1Spread(...b: number[]): void;
declare const thirdthird_part1_ar: number[];

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
          "end": 500,
          "kind": "emitHelpers",
          "data": "typescript:rest"
        },
        {
          "pos": 502,
          "end": 1006,
          "kind": "emitHelpers",
          "data": "typescript:read"
        },
        {
          "pos": 1008,
          "end": 1396,
          "kind": "emitHelpers",
          "data": "typescript:spreadArray"
        },
        {
          "pos": 1398,
          "end": 1924,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 1398,
              "end": 1924,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 1924,
          "end": 2618,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 1924,
              "end": 2618,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 2618,
          "end": 3053,
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
          "end": 318,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 318,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 318,
          "end": 585,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 318,
              "end": 585,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 585,
          "end": 765,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1031
}

