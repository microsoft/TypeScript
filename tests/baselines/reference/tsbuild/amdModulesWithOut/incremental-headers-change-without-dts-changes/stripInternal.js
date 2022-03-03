Input::
//// [/src/lib/file1.ts]
/*@internal*/ export const x = 10;
export class normalC {
    /*@internal*/ constructor() { }
    /*@internal*/ prop: string;
    /*@internal*/ method() { }
    /*@internal*/ get c() { return 10; }
    /*@internal*/ set c(val: number) { }
}
export namespace normalN {
    /*@internal*/ export class C { }
    /*@internal*/ export function foo() {}
    /*@internal*/ export namespace someNamespace { export class C {} }
    /*@internal*/ export namespace someOther.something { export class someClass {} }
    /*@internal*/ export import someImport = someNamespace.C;
    /*@internal*/ export type internalType = internalC;
    /*@internal*/ export const internalConst = 10;
    /*@internal*/ export enum internalEnum { a, b, c }
}
/*@internal*/ export class internalC {}
/*@internal*/ export function internalfoo() {}
/*@internal*/ export namespace internalNamespace { export class someClass {} }
/*@internal*/ export namespace internalOther.something { export class someClass {} }
/*@internal*/ export import internalImport = internalNamespace.someClass;
/*@internal*/ export type internalType = internalC;
/*@internal*/ export const internalConst = 10;
/*@internal*/ export enum internalEnum { a, b, c }



Output::
/lib/tsc --b /src/app --verbose
[[90m12:08:00 AM[0m] Projects in this build: 
    * src/lib/tsconfig.json
    * src/app/tsconfig.json

[[90m12:08:00 AM[0m] Project 'src/lib/tsconfig.json' is out of date because oldest output 'src/lib/module.js' is older than newest input 'src/lib/file1.ts'

[[90m12:08:00 AM[0m] Building project '/src/lib/tsconfig.json'...

[[90m12:08:00 AM[0m] Project 'src/app/tsconfig.json' is out of date because output of its dependency 'src/lib' has changed

[[90m12:08:00 AM[0m] Updating output of project '/src/app/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/app/module.d.ts]
declare module "file1" {
    export class normalC {
    }
    export namespace normalN {
    }
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
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":";IACA,MAAM,OAAO,OAAO;KAMnB;IACD,MAAM,WAAW,OAAO,CAAC;KASxB;;;ICjBD,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC;;ICAvB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,KAAK,KAAK,CAAC"}

//// [/src/app/module.d.ts.map.baseline.txt]
===================================================================
JsFile: module.d.ts
mapUrl: module.d.ts.map
sourceRoot: 
sources: ../lib/file1.ts,../lib/file2.ts,../lib/global.ts,file3.ts,file4.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/app/module.d.ts
sourceFile:../lib/file1.ts
-------------------------------------------------------------------
>>>declare module "file1" {
>>>    export class normalC {
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^^
4 >                 ^^^^^^^
1 >/*@internal*/ export const x = 10;
  >
2 >    export
3 >           class 
4 >                 normalC
1 >Emitted(2, 5) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 11) Source(2, 7) + SourceIndex(0)
3 >Emitted(2, 18) Source(2, 14) + SourceIndex(0)
4 >Emitted(2, 25) Source(2, 21) + SourceIndex(0)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > {
  >    /*@internal*/ constructor() { }
  >    /*@internal*/ prop: string;
  >    /*@internal*/ method() { }
  >    /*@internal*/ get c() { return 10; }
  >    /*@internal*/ set c(val: number) { }
  >}
1 >Emitted(3, 6) Source(8, 2) + SourceIndex(0)
---
>>>    export namespace normalN {
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^^
4 >                     ^^^^^^^
5 >                            ^
1->
  >
2 >    export
3 >           namespace 
4 >                     normalN
5 >                             
1->Emitted(4, 5) Source(9, 1) + SourceIndex(0)
2 >Emitted(4, 11) Source(9, 7) + SourceIndex(0)
3 >Emitted(4, 22) Source(9, 18) + SourceIndex(0)
4 >Emitted(4, 29) Source(9, 25) + SourceIndex(0)
5 >Emitted(4, 30) Source(9, 26) + SourceIndex(0)
---
>>>    }
1 >^^^^^
1 >{
  >    /*@internal*/ export class C { }
  >    /*@internal*/ export function foo() {}
  >    /*@internal*/ export namespace someNamespace { export class C {} }
  >    /*@internal*/ export namespace someOther.something { export class someClass {} }
  >    /*@internal*/ export import someImport = someNamespace.C;
  >    /*@internal*/ export type internalType = internalC;
  >    /*@internal*/ export const internalConst = 10;
  >    /*@internal*/ export enum internalEnum { a, b, c }
  >}
1 >Emitted(5, 6) Source(18, 2) + SourceIndex(0)
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
1 >Emitted(8, 5) Source(1, 1) + SourceIndex(1)
2 >Emitted(8, 11) Source(1, 7) + SourceIndex(1)
3 >Emitted(8, 12) Source(1, 8) + SourceIndex(1)
4 >Emitted(8, 18) Source(1, 14) + SourceIndex(1)
5 >Emitted(8, 19) Source(1, 15) + SourceIndex(1)
6 >Emitted(8, 24) Source(1, 20) + SourceIndex(1)
7 >Emitted(8, 25) Source(1, 21) + SourceIndex(1)
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
1 >Emitted(10, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(10, 9) Source(1, 1) + SourceIndex(2)
3 >Emitted(10, 15) Source(1, 7) + SourceIndex(2)
4 >Emitted(10, 26) Source(1, 18) + SourceIndex(2)
5 >Emitted(10, 31) Source(1, 23) + SourceIndex(2)
6 >Emitted(10, 32) Source(1, 24) + SourceIndex(2)
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
1 >Emitted(12, 5) Source(1, 1) + SourceIndex(3)
2 >Emitted(12, 11) Source(1, 7) + SourceIndex(3)
3 >Emitted(12, 12) Source(1, 8) + SourceIndex(3)
4 >Emitted(12, 18) Source(1, 14) + SourceIndex(3)
5 >Emitted(12, 19) Source(1, 15) + SourceIndex(3)
6 >Emitted(12, 24) Source(1, 20) + SourceIndex(3)
7 >Emitted(12, 25) Source(1, 21) + SourceIndex(3)
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
1 >Emitted(14, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(14, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(14, 15) Source(1, 7) + SourceIndex(4)
4 >Emitted(14, 20) Source(1, 12) + SourceIndex(4)
5 >Emitted(14, 25) Source(1, 17) + SourceIndex(4)
6 >Emitted(14, 26) Source(1, 18) + SourceIndex(4)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/app/module.js]
/*@internal*/ var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.internalEnum = exports.internalConst = exports.internalImport = exports.internalOther = exports.internalNamespace = exports.internalfoo = exports.internalC = exports.normalN = exports.normalC = exports.x = void 0;
    /*@internal*/ exports.x = 10;
    var normalC = /** @class */ (function () {
        /*@internal*/ function normalC() {
        }
        /*@internal*/ normalC.prototype.method = function () { };
        Object.defineProperty(normalC.prototype, "c", {
            /*@internal*/ get: function () { return 10; },
            /*@internal*/ set: function (val) { },
            enumerable: false,
            configurable: true
        });
        return normalC;
    }());
    exports.normalC = normalC;
    var normalN;
    (function (normalN) {
        /*@internal*/ var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        normalN.C = C;
        /*@internal*/ function foo() { }
        normalN.foo = foo;
        /*@internal*/ var someNamespace;
        (function (someNamespace) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            someNamespace.C = C;
        })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
        /*@internal*/ var someOther;
        (function (someOther) {
            var something;
            (function (something) {
                var someClass = /** @class */ (function () {
                    function someClass() {
                    }
                    return someClass;
                }());
                something.someClass = someClass;
            })(something = someOther.something || (someOther.something = {}));
        })(someOther = normalN.someOther || (normalN.someOther = {}));
        /*@internal*/ normalN.someImport = someNamespace.C;
        /*@internal*/ normalN.internalConst = 10;
        /*@internal*/ var internalEnum;
        (function (internalEnum) {
            internalEnum[internalEnum["a"] = 0] = "a";
            internalEnum[internalEnum["b"] = 1] = "b";
            internalEnum[internalEnum["c"] = 2] = "c";
        })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
    })(normalN = exports.normalN || (exports.normalN = {}));
    /*@internal*/ var internalC = /** @class */ (function () {
        function internalC() {
        }
        return internalC;
    }());
    exports.internalC = internalC;
    /*@internal*/ function internalfoo() { }
    exports.internalfoo = internalfoo;
    /*@internal*/ var internalNamespace;
    (function (internalNamespace) {
        var someClass = /** @class */ (function () {
            function someClass() {
            }
            return someClass;
        }());
        internalNamespace.someClass = someClass;
    })(internalNamespace = exports.internalNamespace || (exports.internalNamespace = {}));
    /*@internal*/ var internalOther;
    (function (internalOther) {
        var something;
        (function (something) {
            var someClass = /** @class */ (function () {
                function someClass() {
                }
                return someClass;
            }());
            something.someClass = someClass;
        })(something = internalOther.something || (internalOther.something = {}));
    })(internalOther = exports.internalOther || (exports.internalOther = {}));
    /*@internal*/ exports.internalImport = internalNamespace.someClass;
    /*@internal*/ exports.internalConst = 10;
    /*@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = exports.internalEnum || (exports.internalEnum = {}));
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":"AAAA,aAAa,CAAC,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAhC,aAAa,CAAc,QAAA,CAAC,GAAG,EAAE,CAAC;IAClC;QACI,aAAa,CAAC;QAAgB,CAAC;QAE/B,aAAa,CAAC,wBAAM,GAAN,cAAW,CAAC;QACZ,sBAAI,sBAAC;YAAnB,aAAa,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;YACpC,aAAa,MAAC,UAAM,GAAW,IAAI,CAAC;;;WADA;QAExC,cAAC;IAAD,CAAC,AAND,IAMC;IANY,0BAAO;IAOpB,IAAiB,OAAO,CASvB;IATD,WAAiB,OAAO;QACpB,aAAa,CAAC;YAAA;YAAiB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAlB,IAAkB;QAAL,SAAC,IAAI,CAAA;QAChC,aAAa,CAAC,SAAgB,GAAG,KAAI,CAAC;QAAR,WAAG,MAAK,CAAA;QACtC,aAAa,CAAC,IAAiB,aAAa,CAAsB;QAApD,WAAiB,aAAa;YAAG;gBAAA;gBAAgB,CAAC;gBAAD,QAAC;YAAD,CAAC,AAAjB,IAAiB;YAAJ,eAAC,IAAG,CAAA;QAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;QAClE,aAAa,CAAC,IAAiB,SAAS,CAAwC;QAAlE,WAAiB,SAAS;YAAC,IAAA,SAAS,CAA8B;YAAvC,WAAA,SAAS;gBAAG;oBAAA;oBAAwB,CAAC;oBAAD,gBAAC;gBAAD,CAAC,AAAzB,IAAyB;gBAAZ,mBAAS,YAAG,CAAA;YAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;QAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;QAChF,aAAa,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;QAEzD,aAAa,CAAc,qBAAa,GAAG,EAAE,CAAC;QAC9C,aAAa,CAAC,IAAY,YAAwB;QAApC,WAAY,YAAY;YAAG,yCAAC,CAAA;YAAE,yCAAC,CAAA;YAAE,yCAAC,CAAA;QAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;IACtD,CAAC,EATgB,OAAO,GAAP,eAAO,KAAP,eAAO,QASvB;IACD,aAAa,CAAC;QAAA;QAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,8BAAS;IACpC,aAAa,CAAC,SAAgB,WAAW,KAAI,CAAC;IAAhC,kCAAgC;IAC9C,aAAa,CAAC,IAAiB,iBAAiB,CAA8B;IAAhE,WAAiB,iBAAiB;QAAG;YAAA;YAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,2BAAS,YAAG,CAAA;IAAC,CAAC,EAA/C,iBAAiB,GAAjB,yBAAiB,KAAjB,yBAAiB,QAA8B;IAC9E,aAAa,CAAC,IAAiB,aAAa,CAAwC;IAAtE,WAAiB,aAAa;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS;YAAG;gBAAA;gBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;IAAD,CAAC,EAArD,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAwC;IACpF,aAAa,CAAe,QAAA,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;IAEzE,aAAa,CAAc,QAAA,aAAa,GAAG,EAAE,CAAC;IAC9C,aAAa,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;;;;;;ICzBrC,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;;ICAV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,KAAK,GAAG,EAAE,CAAC"}

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
>>>/*@internal*/ var myGlob = 20;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^
6 >                        ^^^
7 >                           ^^
8 >                             ^
9 >                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >/*@internal*/
3 >              
4 >              const 
5 >                  myGlob
6 >                         = 
7 >                           20
8 >                             ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 14) Source(1, 14) + SourceIndex(0)
3 >Emitted(1, 15) Source(1, 15) + SourceIndex(0)
4 >Emitted(1, 19) Source(1, 21) + SourceIndex(0)
5 >Emitted(1, 25) Source(1, 27) + SourceIndex(0)
6 >Emitted(1, 28) Source(1, 30) + SourceIndex(0)
7 >Emitted(1, 30) Source(1, 32) + SourceIndex(0)
8 >Emitted(1, 31) Source(1, 33) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file1.ts
-------------------------------------------------------------------
>>>define("file1", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.internalEnum = exports.internalConst = exports.internalImport = exports.internalOther = exports.internalNamespace = exports.internalfoo = exports.internalC = exports.normalN = exports.normalC = exports.x = void 0;
>>>    /*@internal*/ exports.x = 10;
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^
5 >                          ^
6 >                           ^^^
7 >                              ^^
8 >                                ^
9 >                                 ^^^^^^^^^^^^^^->
1->
2 >    /*@internal*/
3 >                  export const 
4 >                  
5 >                          x
6 >                            = 
7 >                              10
8 >                                ;
1->Emitted(6, 5) Source(1, 1) + SourceIndex(1)
2 >Emitted(6, 18) Source(1, 14) + SourceIndex(1)
3 >Emitted(6, 19) Source(1, 28) + SourceIndex(1)
4 >Emitted(6, 27) Source(1, 28) + SourceIndex(1)
5 >Emitted(6, 28) Source(1, 29) + SourceIndex(1)
6 >Emitted(6, 31) Source(1, 32) + SourceIndex(1)
7 >Emitted(6, 33) Source(1, 34) + SourceIndex(1)
8 >Emitted(6, 34) Source(1, 35) + SourceIndex(1)
---
>>>    var normalC = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(7, 5) Source(2, 1) + SourceIndex(1)
---
>>>        /*@internal*/ function normalC() {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
1->export class normalC {
  >    
2 >        /*@internal*/
3 >                      
1->Emitted(8, 9) Source(3, 5) + SourceIndex(1)
2 >Emitted(8, 22) Source(3, 18) + SourceIndex(1)
3 >Emitted(8, 23) Source(3, 19) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >constructor() { 
2 >        }
1 >Emitted(9, 9) Source(3, 35) + SourceIndex(1)
2 >Emitted(9, 10) Source(3, 36) + SourceIndex(1)
---
>>>        /*@internal*/ normalC.prototype.method = function () { };
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                              ^^^
6 >                                                 ^^^^^^^^^^^^^^
7 >                                                               ^
1->
  >    /*@internal*/ prop: string;
  >    
2 >        /*@internal*/
3 >                      
4 >                      method
5 >                                              
6 >                                                 method() { 
7 >                                                               }
1->Emitted(10, 9) Source(5, 5) + SourceIndex(1)
2 >Emitted(10, 22) Source(5, 18) + SourceIndex(1)
3 >Emitted(10, 23) Source(5, 19) + SourceIndex(1)
4 >Emitted(10, 47) Source(5, 25) + SourceIndex(1)
5 >Emitted(10, 50) Source(5, 19) + SourceIndex(1)
6 >Emitted(10, 64) Source(5, 30) + SourceIndex(1)
7 >Emitted(10, 65) Source(5, 31) + SourceIndex(1)
---
>>>        Object.defineProperty(normalC.prototype, "c", {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^^^^^^->
1 >
  >    /*@internal*/ 
2 >        get 
3 >                              c
1 >Emitted(11, 9) Source(6, 19) + SourceIndex(1)
2 >Emitted(11, 31) Source(6, 23) + SourceIndex(1)
3 >Emitted(11, 53) Source(6, 24) + SourceIndex(1)
---
>>>            /*@internal*/ get: function () { return 10; },
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^
3 >                         ^^^^^^
4 >                               ^^^^^^^^^^^^^^
5 >                                             ^^^^^^^
6 >                                                    ^^
7 >                                                      ^
8 >                                                       ^
9 >                                                        ^
1->
2 >            /*@internal*/
3 >                          
4 >                               get c() { 
5 >                                             return 
6 >                                                    10
7 >                                                      ;
8 >                                                        
9 >                                                        }
1->Emitted(12, 13) Source(6, 5) + SourceIndex(1)
2 >Emitted(12, 26) Source(6, 18) + SourceIndex(1)
3 >Emitted(12, 32) Source(6, 19) + SourceIndex(1)
4 >Emitted(12, 46) Source(6, 29) + SourceIndex(1)
5 >Emitted(12, 53) Source(6, 36) + SourceIndex(1)
6 >Emitted(12, 55) Source(6, 38) + SourceIndex(1)
7 >Emitted(12, 56) Source(6, 39) + SourceIndex(1)
8 >Emitted(12, 57) Source(6, 40) + SourceIndex(1)
9 >Emitted(12, 58) Source(6, 41) + SourceIndex(1)
---
>>>            /*@internal*/ set: function (val) { },
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^
3 >                         ^^^^^^
4 >                               ^^^^^^^^^^
5 >                                         ^^^
6 >                                            ^^^^
7 >                                                ^
1 >
  >    
2 >            /*@internal*/
3 >                          
4 >                               set c(
5 >                                         val: number
6 >                                            ) { 
7 >                                                }
1 >Emitted(13, 13) Source(7, 5) + SourceIndex(1)
2 >Emitted(13, 26) Source(7, 18) + SourceIndex(1)
3 >Emitted(13, 32) Source(7, 19) + SourceIndex(1)
4 >Emitted(13, 42) Source(7, 25) + SourceIndex(1)
5 >Emitted(13, 45) Source(7, 36) + SourceIndex(1)
6 >Emitted(13, 49) Source(7, 40) + SourceIndex(1)
7 >Emitted(13, 50) Source(7, 41) + SourceIndex(1)
---
>>>            enumerable: false,
>>>            configurable: true
>>>        });
1 >^^^^^^^^^^^
2 >           ^^^^^^^^^^^^^->
1 >
1 >Emitted(16, 12) Source(6, 41) + SourceIndex(1)
---
>>>        return normalC;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >        }
1->Emitted(17, 9) Source(8, 1) + SourceIndex(1)
2 >Emitted(17, 23) Source(8, 2) + SourceIndex(1)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class normalC {
  >         /*@internal*/ constructor() { }
  >         /*@internal*/ prop: string;
  >         /*@internal*/ method() { }
  >         /*@internal*/ get c() { return 10; }
  >         /*@internal*/ set c(val: number) { }
  >     }
1 >Emitted(18, 5) Source(8, 1) + SourceIndex(1)
2 >Emitted(18, 6) Source(8, 2) + SourceIndex(1)
3 >Emitted(18, 6) Source(2, 1) + SourceIndex(1)
4 >Emitted(18, 10) Source(8, 2) + SourceIndex(1)
---
>>>    exports.normalC = normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^
1->
2 >    normalC
1->Emitted(19, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(19, 31) Source(2, 21) + SourceIndex(1)
---
>>>    var normalN;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^
4 >               ^
5 >                ^^^^^^^^^^->
1 > {
  >    /*@internal*/ constructor() { }
  >    /*@internal*/ prop: string;
  >    /*@internal*/ method() { }
  >    /*@internal*/ get c() { return 10; }
  >    /*@internal*/ set c(val: number) { }
  >}
  >
2 >    export namespace 
3 >        normalN
4 >                {
  >                   /*@internal*/ export class C { }
  >                   /*@internal*/ export function foo() {}
  >                   /*@internal*/ export namespace someNamespace { export class C {} }
  >                   /*@internal*/ export namespace someOther.something { export class someClass {} }
  >                   /*@internal*/ export import someImport = someNamespace.C;
  >                   /*@internal*/ export type internalType = internalC;
  >                   /*@internal*/ export const internalConst = 10;
  >                   /*@internal*/ export enum internalEnum { a, b, c }
  >               }
1 >Emitted(20, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(20, 9) Source(9, 18) + SourceIndex(1)
3 >Emitted(20, 16) Source(9, 25) + SourceIndex(1)
4 >Emitted(20, 17) Source(18, 2) + SourceIndex(1)
---
>>>    (function (normalN) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^
4 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export namespace 
3 >               normalN
1->Emitted(21, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(21, 16) Source(9, 18) + SourceIndex(1)
3 >Emitted(21, 23) Source(9, 25) + SourceIndex(1)
---
>>>        /*@internal*/ var C = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^->
1-> {
  >    
2 >        /*@internal*/
3 >                      
1->Emitted(22, 9) Source(10, 5) + SourceIndex(1)
2 >Emitted(22, 22) Source(10, 18) + SourceIndex(1)
3 >Emitted(22, 23) Source(10, 19) + SourceIndex(1)
---
>>>            function C() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(23, 13) Source(10, 19) + SourceIndex(1)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^->
1->export class C { 
2 >            }
1->Emitted(24, 13) Source(10, 36) + SourceIndex(1)
2 >Emitted(24, 14) Source(10, 37) + SourceIndex(1)
---
>>>            return C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^
1->
2 >            }
1->Emitted(25, 13) Source(10, 36) + SourceIndex(1)
2 >Emitted(25, 21) Source(10, 37) + SourceIndex(1)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class C { }
1 >Emitted(26, 9) Source(10, 36) + SourceIndex(1)
2 >Emitted(26, 10) Source(10, 37) + SourceIndex(1)
3 >Emitted(26, 10) Source(10, 19) + SourceIndex(1)
4 >Emitted(26, 14) Source(10, 37) + SourceIndex(1)
---
>>>        normalN.C = C;
1->^^^^^^^^
2 >        ^^^^^^^^^
3 >                 ^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^->
1->
2 >        C
3 >                  { }
4 >                     
1->Emitted(27, 9) Source(10, 32) + SourceIndex(1)
2 >Emitted(27, 18) Source(10, 33) + SourceIndex(1)
3 >Emitted(27, 22) Source(10, 37) + SourceIndex(1)
4 >Emitted(27, 23) Source(10, 37) + SourceIndex(1)
---
>>>        /*@internal*/ function foo() { }
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^^^^^
5 >                               ^^^
6 >                                  ^^^^^
7 >                                       ^
1->
  >    
2 >        /*@internal*/
3 >                      
4 >                      export function 
5 >                               foo
6 >                                  () {
7 >                                       }
1->Emitted(28, 9) Source(11, 5) + SourceIndex(1)
2 >Emitted(28, 22) Source(11, 18) + SourceIndex(1)
3 >Emitted(28, 23) Source(11, 19) + SourceIndex(1)
4 >Emitted(28, 32) Source(11, 35) + SourceIndex(1)
5 >Emitted(28, 35) Source(11, 38) + SourceIndex(1)
6 >Emitted(28, 40) Source(11, 42) + SourceIndex(1)
7 >Emitted(28, 41) Source(11, 43) + SourceIndex(1)
---
>>>        normalN.foo = foo;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^
4 >                         ^
5 >                          ^^^^^^^^^^^^^^^->
1 >
2 >        foo
3 >                   () {}
4 >                         
1 >Emitted(29, 9) Source(11, 35) + SourceIndex(1)
2 >Emitted(29, 20) Source(11, 38) + SourceIndex(1)
3 >Emitted(29, 26) Source(11, 43) + SourceIndex(1)
4 >Emitted(29, 27) Source(11, 43) + SourceIndex(1)
---
>>>        /*@internal*/ var someNamespace;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^
5 >                          ^^^^^^^^^^^^^
6 >                                       ^
1->
  >    
2 >        /*@internal*/
3 >                      
4 >                      export namespace 
5 >                          someNamespace
6 >                                        { export class C {} }
1->Emitted(30, 9) Source(12, 5) + SourceIndex(1)
2 >Emitted(30, 22) Source(12, 18) + SourceIndex(1)
3 >Emitted(30, 23) Source(12, 19) + SourceIndex(1)
4 >Emitted(30, 27) Source(12, 36) + SourceIndex(1)
5 >Emitted(30, 40) Source(12, 49) + SourceIndex(1)
6 >Emitted(30, 41) Source(12, 71) + SourceIndex(1)
---
>>>        (function (someNamespace) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^->
1 >
2 >        export namespace 
3 >                   someNamespace
1 >Emitted(31, 9) Source(12, 19) + SourceIndex(1)
2 >Emitted(31, 20) Source(12, 36) + SourceIndex(1)
3 >Emitted(31, 33) Source(12, 49) + SourceIndex(1)
---
>>>            var C = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(32, 13) Source(12, 52) + SourceIndex(1)
---
>>>                function C() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(33, 17) Source(12, 52) + SourceIndex(1)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^->
1->export class C {
2 >                }
1->Emitted(34, 17) Source(12, 68) + SourceIndex(1)
2 >Emitted(34, 18) Source(12, 69) + SourceIndex(1)
---
>>>                return C;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^
1->
2 >                }
1->Emitted(35, 17) Source(12, 68) + SourceIndex(1)
2 >Emitted(35, 25) Source(12, 69) + SourceIndex(1)
---
>>>            }());
1 >^^^^^^^^^^^^
2 >            ^
3 >             
4 >             ^^^^
5 >                 ^^^^^^^^^^^^^^^^->
1 >
2 >            }
3 >             
4 >             export class C {}
1 >Emitted(36, 13) Source(12, 68) + SourceIndex(1)
2 >Emitted(36, 14) Source(12, 69) + SourceIndex(1)
3 >Emitted(36, 14) Source(12, 52) + SourceIndex(1)
4 >Emitted(36, 18) Source(12, 69) + SourceIndex(1)
---
>>>            someNamespace.C = C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^
3 >                           ^^^^
4 >                               ^
5 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            C
3 >                            {}
4 >                               
1->Emitted(37, 13) Source(12, 65) + SourceIndex(1)
2 >Emitted(37, 28) Source(12, 66) + SourceIndex(1)
3 >Emitted(37, 32) Source(12, 69) + SourceIndex(1)
4 >Emitted(37, 33) Source(12, 69) + SourceIndex(1)
---
>>>        })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^^^^^
5 >                        ^^^
6 >                           ^^^^^^^^^^^^^^^^^^^^^
7 >                                                ^^^^^
8 >                                                     ^^^^^^^^^^^^^^^^^^^^^
9 >                                                                          ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           someNamespace
5 >                        
6 >                           someNamespace
7 >                                                
8 >                                                     someNamespace
9 >                                                                           { export class C {} }
1->Emitted(38, 9) Source(12, 70) + SourceIndex(1)
2 >Emitted(38, 10) Source(12, 71) + SourceIndex(1)
3 >Emitted(38, 12) Source(12, 36) + SourceIndex(1)
4 >Emitted(38, 25) Source(12, 49) + SourceIndex(1)
5 >Emitted(38, 28) Source(12, 36) + SourceIndex(1)
6 >Emitted(38, 49) Source(12, 49) + SourceIndex(1)
7 >Emitted(38, 54) Source(12, 36) + SourceIndex(1)
8 >Emitted(38, 75) Source(12, 49) + SourceIndex(1)
9 >Emitted(38, 83) Source(12, 71) + SourceIndex(1)
---
>>>        /*@internal*/ var someOther;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^
5 >                          ^^^^^^^^^
6 >                                   ^
1 >
  >    
2 >        /*@internal*/
3 >                      
4 >                      export namespace 
5 >                          someOther
6 >                                   .something { export class someClass {} }
1 >Emitted(39, 9) Source(13, 5) + SourceIndex(1)
2 >Emitted(39, 22) Source(13, 18) + SourceIndex(1)
3 >Emitted(39, 23) Source(13, 19) + SourceIndex(1)
4 >Emitted(39, 27) Source(13, 36) + SourceIndex(1)
5 >Emitted(39, 36) Source(13, 45) + SourceIndex(1)
6 >Emitted(39, 37) Source(13, 85) + SourceIndex(1)
---
>>>        (function (someOther) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
1 >
2 >        export namespace 
3 >                   someOther
1 >Emitted(40, 9) Source(13, 19) + SourceIndex(1)
2 >Emitted(40, 20) Source(13, 36) + SourceIndex(1)
3 >Emitted(40, 29) Source(13, 45) + SourceIndex(1)
---
>>>            var something;
1 >^^^^^^^^^^^^
2 >            ^^^^
3 >                ^^^^^^^^^
4 >                         ^
5 >                          ^^^^^^^^^^->
1 >.
2 >            
3 >                something
4 >                          { export class someClass {} }
1 >Emitted(41, 13) Source(13, 46) + SourceIndex(1)
2 >Emitted(41, 17) Source(13, 46) + SourceIndex(1)
3 >Emitted(41, 26) Source(13, 55) + SourceIndex(1)
4 >Emitted(41, 27) Source(13, 85) + SourceIndex(1)
---
>>>            (function (something) {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^
3 >                       ^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            
3 >                       something
1->Emitted(42, 13) Source(13, 46) + SourceIndex(1)
2 >Emitted(42, 24) Source(13, 46) + SourceIndex(1)
3 >Emitted(42, 33) Source(13, 55) + SourceIndex(1)
---
>>>                var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(43, 17) Source(13, 58) + SourceIndex(1)
---
>>>                    function someClass() {
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^^->
1->
1->Emitted(44, 21) Source(13, 58) + SourceIndex(1)
---
>>>                    }
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^
3 >                     ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                    }
1->Emitted(45, 21) Source(13, 82) + SourceIndex(1)
2 >Emitted(45, 22) Source(13, 83) + SourceIndex(1)
---
>>>                    return someClass;
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^^^^^^^^^^^^^^^^
1->
2 >                    }
1->Emitted(46, 21) Source(13, 82) + SourceIndex(1)
2 >Emitted(46, 37) Source(13, 83) + SourceIndex(1)
---
>>>                }());
1 >^^^^^^^^^^^^^^^^
2 >                ^
3 >                 
4 >                 ^^^^
5 >                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >                }
3 >                 
4 >                 export class someClass {}
1 >Emitted(47, 17) Source(13, 82) + SourceIndex(1)
2 >Emitted(47, 18) Source(13, 83) + SourceIndex(1)
3 >Emitted(47, 18) Source(13, 58) + SourceIndex(1)
4 >Emitted(47, 22) Source(13, 83) + SourceIndex(1)
---
>>>                something.someClass = someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^
3 >                                   ^^^^^^^^^^^^
4 >                                               ^
5 >                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >                someClass
3 >                                    {}
4 >                                               
1->Emitted(48, 17) Source(13, 71) + SourceIndex(1)
2 >Emitted(48, 36) Source(13, 80) + SourceIndex(1)
3 >Emitted(48, 48) Source(13, 83) + SourceIndex(1)
4 >Emitted(48, 49) Source(13, 83) + SourceIndex(1)
---
>>>            })(something = someOther.something || (someOther.something = {}));
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^
4 >               ^^^^^^^^^
5 >                        ^^^
6 >                           ^^^^^^^^^^^^^^^^^^^
7 >                                              ^^^^^
8 >                                                   ^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1-> 
2 >            }
3 >             
4 >               something
5 >                        
6 >                           something
7 >                                              
8 >                                                   something
9 >                                                                       { export class someClass {} }
1->Emitted(49, 13) Source(13, 84) + SourceIndex(1)
2 >Emitted(49, 14) Source(13, 85) + SourceIndex(1)
3 >Emitted(49, 16) Source(13, 46) + SourceIndex(1)
4 >Emitted(49, 25) Source(13, 55) + SourceIndex(1)
5 >Emitted(49, 28) Source(13, 46) + SourceIndex(1)
6 >Emitted(49, 47) Source(13, 55) + SourceIndex(1)
7 >Emitted(49, 52) Source(13, 46) + SourceIndex(1)
8 >Emitted(49, 71) Source(13, 55) + SourceIndex(1)
9 >Emitted(49, 79) Source(13, 85) + SourceIndex(1)
---
>>>        })(someOther = normalN.someOther || (normalN.someOther = {}));
1 >^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^
7 >                                        ^^^^^
8 >                                             ^^^^^^^^^^^^^^^^^
9 >                                                              ^^^^^^^^
1 >
2 >        }
3 >         
4 >           someOther
5 >                    
6 >                       someOther
7 >                                        
8 >                                             someOther
9 >                                                              .something { export class someClass {} }
1 >Emitted(50, 9) Source(13, 84) + SourceIndex(1)
2 >Emitted(50, 10) Source(13, 85) + SourceIndex(1)
3 >Emitted(50, 12) Source(13, 36) + SourceIndex(1)
4 >Emitted(50, 21) Source(13, 45) + SourceIndex(1)
5 >Emitted(50, 24) Source(13, 36) + SourceIndex(1)
6 >Emitted(50, 41) Source(13, 45) + SourceIndex(1)
7 >Emitted(50, 46) Source(13, 36) + SourceIndex(1)
8 >Emitted(50, 63) Source(13, 45) + SourceIndex(1)
9 >Emitted(50, 71) Source(13, 85) + SourceIndex(1)
---
>>>        /*@internal*/ normalN.someImport = someNamespace.C;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^^^^^^^^^^^^^^
5 >                                        ^^^
6 >                                           ^^^^^^^^^^^^^
7 >                                                        ^
8 >                                                         ^
9 >                                                          ^
1 >
  >    
2 >        /*@internal*/
3 >                      export import 
4 >                      someImport
5 >                                         = 
6 >                                           someNamespace
7 >                                                        .
8 >                                                         C
9 >                                                          ;
1 >Emitted(51, 9) Source(14, 5) + SourceIndex(1)
2 >Emitted(51, 22) Source(14, 18) + SourceIndex(1)
3 >Emitted(51, 23) Source(14, 33) + SourceIndex(1)
4 >Emitted(51, 41) Source(14, 43) + SourceIndex(1)
5 >Emitted(51, 44) Source(14, 46) + SourceIndex(1)
6 >Emitted(51, 57) Source(14, 59) + SourceIndex(1)
7 >Emitted(51, 58) Source(14, 60) + SourceIndex(1)
8 >Emitted(51, 59) Source(14, 61) + SourceIndex(1)
9 >Emitted(51, 60) Source(14, 62) + SourceIndex(1)
---
>>>        /*@internal*/ normalN.internalConst = 10;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^^^^^^^^^^^^^^^^^
5 >                                           ^^^
6 >                                              ^^
7 >                                                ^
1 >
  >    /*@internal*/ export type internalType = internalC;
  >    
2 >        /*@internal*/
3 >                      export const 
4 >                      internalConst
5 >                                            = 
6 >                                              10
7 >                                                ;
1 >Emitted(52, 9) Source(16, 5) + SourceIndex(1)
2 >Emitted(52, 22) Source(16, 18) + SourceIndex(1)
3 >Emitted(52, 23) Source(16, 32) + SourceIndex(1)
4 >Emitted(52, 44) Source(16, 45) + SourceIndex(1)
5 >Emitted(52, 47) Source(16, 48) + SourceIndex(1)
6 >Emitted(52, 49) Source(16, 50) + SourceIndex(1)
7 >Emitted(52, 50) Source(16, 51) + SourceIndex(1)
---
>>>        /*@internal*/ var internalEnum;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^
5 >                          ^^^^^^^^^^^^
1 >
  >    
2 >        /*@internal*/
3 >                      
4 >                      export enum 
5 >                          internalEnum { a, b, c }
1 >Emitted(53, 9) Source(17, 5) + SourceIndex(1)
2 >Emitted(53, 22) Source(17, 18) + SourceIndex(1)
3 >Emitted(53, 23) Source(17, 19) + SourceIndex(1)
4 >Emitted(53, 27) Source(17, 31) + SourceIndex(1)
5 >Emitted(53, 39) Source(17, 55) + SourceIndex(1)
---
>>>        (function (internalEnum) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^^^^
4 >                               ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        export enum 
3 >                   internalEnum
1 >Emitted(54, 9) Source(17, 19) + SourceIndex(1)
2 >Emitted(54, 20) Source(17, 31) + SourceIndex(1)
3 >Emitted(54, 32) Source(17, 43) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^->
1-> { 
2 >            a
3 >                                                     
1->Emitted(55, 13) Source(17, 46) + SourceIndex(1)
2 >Emitted(55, 54) Source(17, 47) + SourceIndex(1)
3 >Emitted(55, 55) Source(17, 47) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^->
1->, 
2 >            b
3 >                                                     
1->Emitted(56, 13) Source(17, 49) + SourceIndex(1)
2 >Emitted(56, 54) Source(17, 50) + SourceIndex(1)
3 >Emitted(56, 55) Source(17, 50) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >            c
3 >                                                     
1->Emitted(57, 13) Source(17, 52) + SourceIndex(1)
2 >Emitted(57, 54) Source(17, 53) + SourceIndex(1)
3 >Emitted(57, 55) Source(17, 53) + SourceIndex(1)
---
>>>        })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^^^^
5 >                       ^^^
6 >                          ^^^^^^^^^^^^^^^^^^^^
7 >                                              ^^^^^
8 >                                                   ^^^^^^^^^^^^^^^^^^^^
9 >                                                                       ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           internalEnum
5 >                       
6 >                          internalEnum
7 >                                              
8 >                                                   internalEnum
9 >                                                                        { a, b, c }
1->Emitted(58, 9) Source(17, 54) + SourceIndex(1)
2 >Emitted(58, 10) Source(17, 55) + SourceIndex(1)
3 >Emitted(58, 12) Source(17, 31) + SourceIndex(1)
4 >Emitted(58, 24) Source(17, 43) + SourceIndex(1)
5 >Emitted(58, 27) Source(17, 31) + SourceIndex(1)
6 >Emitted(58, 47) Source(17, 43) + SourceIndex(1)
7 >Emitted(58, 52) Source(17, 31) + SourceIndex(1)
8 >Emitted(58, 72) Source(17, 43) + SourceIndex(1)
9 >Emitted(58, 80) Source(17, 55) + SourceIndex(1)
---
>>>    })(normalN = exports.normalN || (exports.normalN = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^
5 >              ^^^
6 >                 ^^^^^^^^^^^^^^^
7 >                                ^^^^^
8 >                                     ^^^^^^^^^^^^^^^
9 >                                                    ^^^^^^^^
10>                                                            ^^^->
1 >
  >
2 >    }
3 >     
4 >       normalN
5 >              
6 >                 normalN
7 >                                
8 >                                     normalN
9 >                                                     {
  >                                                        /*@internal*/ export class C { }
  >                                                        /*@internal*/ export function foo() {}
  >                                                        /*@internal*/ export namespace someNamespace { export class C {} }
  >                                                        /*@internal*/ export namespace someOther.something { export class someClass {} }
  >                                                        /*@internal*/ export import someImport = someNamespace.C;
  >                                                        /*@internal*/ export type internalType = internalC;
  >                                                        /*@internal*/ export const internalConst = 10;
  >                                                        /*@internal*/ export enum internalEnum { a, b, c }
  >                                                    }
1 >Emitted(59, 5) Source(18, 1) + SourceIndex(1)
2 >Emitted(59, 6) Source(18, 2) + SourceIndex(1)
3 >Emitted(59, 8) Source(9, 18) + SourceIndex(1)
4 >Emitted(59, 15) Source(9, 25) + SourceIndex(1)
5 >Emitted(59, 18) Source(9, 18) + SourceIndex(1)
6 >Emitted(59, 33) Source(9, 25) + SourceIndex(1)
7 >Emitted(59, 38) Source(9, 18) + SourceIndex(1)
8 >Emitted(59, 53) Source(9, 25) + SourceIndex(1)
9 >Emitted(59, 61) Source(18, 2) + SourceIndex(1)
---
>>>    /*@internal*/ var internalC = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^->
1->
  >
2 >    /*@internal*/
3 >                  
1->Emitted(60, 5) Source(19, 1) + SourceIndex(1)
2 >Emitted(60, 18) Source(19, 14) + SourceIndex(1)
3 >Emitted(60, 19) Source(19, 15) + SourceIndex(1)
---
>>>        function internalC() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(61, 9) Source(19, 15) + SourceIndex(1)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^->
1->export class internalC {
2 >        }
1->Emitted(62, 9) Source(19, 39) + SourceIndex(1)
2 >Emitted(62, 10) Source(19, 40) + SourceIndex(1)
---
>>>        return internalC;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1->
2 >        }
1->Emitted(63, 9) Source(19, 39) + SourceIndex(1)
2 >Emitted(63, 25) Source(19, 40) + SourceIndex(1)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class internalC {}
1 >Emitted(64, 5) Source(19, 39) + SourceIndex(1)
2 >Emitted(64, 6) Source(19, 40) + SourceIndex(1)
3 >Emitted(64, 6) Source(19, 15) + SourceIndex(1)
4 >Emitted(64, 10) Source(19, 40) + SourceIndex(1)
---
>>>    exports.internalC = internalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^^^^^^^^^^^->
1->
2 >    internalC
1->Emitted(65, 5) Source(19, 28) + SourceIndex(1)
2 >Emitted(65, 35) Source(19, 37) + SourceIndex(1)
---
>>>    /*@internal*/ function internalfoo() { }
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^
5 >                           ^^^^^^^^^^^
6 >                                      ^^^^^
7 >                                           ^
1-> {}
  >
2 >    /*@internal*/
3 >                  
4 >                  export function 
5 >                           internalfoo
6 >                                      () {
7 >                                           }
1->Emitted(66, 5) Source(20, 1) + SourceIndex(1)
2 >Emitted(66, 18) Source(20, 14) + SourceIndex(1)
3 >Emitted(66, 19) Source(20, 15) + SourceIndex(1)
4 >Emitted(66, 28) Source(20, 31) + SourceIndex(1)
5 >Emitted(66, 39) Source(20, 42) + SourceIndex(1)
6 >Emitted(66, 44) Source(20, 46) + SourceIndex(1)
7 >Emitted(66, 45) Source(20, 47) + SourceIndex(1)
---
>>>    exports.internalfoo = internalfoo;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^^^->
1 >
2 >    export function internalfoo() {}
1 >Emitted(67, 5) Source(20, 15) + SourceIndex(1)
2 >Emitted(67, 39) Source(20, 47) + SourceIndex(1)
---
>>>    /*@internal*/ var internalNamespace;
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^^^^^^
6 >                                       ^
1->
  >
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      internalNamespace
6 >                                        { export class someClass {} }
1->Emitted(68, 5) Source(21, 1) + SourceIndex(1)
2 >Emitted(68, 18) Source(21, 14) + SourceIndex(1)
3 >Emitted(68, 19) Source(21, 15) + SourceIndex(1)
4 >Emitted(68, 23) Source(21, 32) + SourceIndex(1)
5 >Emitted(68, 40) Source(21, 49) + SourceIndex(1)
6 >Emitted(68, 41) Source(21, 79) + SourceIndex(1)
---
>>>    (function (internalNamespace) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export namespace 
3 >               internalNamespace
1 >Emitted(69, 5) Source(21, 15) + SourceIndex(1)
2 >Emitted(69, 16) Source(21, 32) + SourceIndex(1)
3 >Emitted(69, 33) Source(21, 49) + SourceIndex(1)
---
>>>        var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(70, 9) Source(21, 52) + SourceIndex(1)
---
>>>            function someClass() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(71, 13) Source(21, 52) + SourceIndex(1)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >            }
1->Emitted(72, 13) Source(21, 76) + SourceIndex(1)
2 >Emitted(72, 14) Source(21, 77) + SourceIndex(1)
---
>>>            return someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1->
2 >            }
1->Emitted(73, 13) Source(21, 76) + SourceIndex(1)
2 >Emitted(73, 29) Source(21, 77) + SourceIndex(1)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class someClass {}
1 >Emitted(74, 9) Source(21, 76) + SourceIndex(1)
2 >Emitted(74, 10) Source(21, 77) + SourceIndex(1)
3 >Emitted(74, 10) Source(21, 52) + SourceIndex(1)
4 >Emitted(74, 14) Source(21, 77) + SourceIndex(1)
---
>>>        internalNamespace.someClass = someClass;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                   ^^^^^^^^^^^^
4 >                                               ^
5 >                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        someClass
3 >                                    {}
4 >                                               
1->Emitted(75, 9) Source(21, 65) + SourceIndex(1)
2 >Emitted(75, 36) Source(21, 74) + SourceIndex(1)
3 >Emitted(75, 48) Source(21, 77) + SourceIndex(1)
4 >Emitted(75, 49) Source(21, 77) + SourceIndex(1)
---
>>>    })(internalNamespace = exports.internalNamespace || (exports.internalNamespace = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^^^^^^
5 >                        ^^^
6 >                           ^^^^^^^^^^^^^^^^^^^^^^^^^
7 >                                                    ^^^^^
8 >                                                         ^^^^^^^^^^^^^^^^^^^^^^^^^
9 >                                                                                  ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       internalNamespace
5 >                        
6 >                           internalNamespace
7 >                                                    
8 >                                                         internalNamespace
9 >                                                                                   { export class someClass {} }
1->Emitted(76, 5) Source(21, 78) + SourceIndex(1)
2 >Emitted(76, 6) Source(21, 79) + SourceIndex(1)
3 >Emitted(76, 8) Source(21, 32) + SourceIndex(1)
4 >Emitted(76, 25) Source(21, 49) + SourceIndex(1)
5 >Emitted(76, 28) Source(21, 32) + SourceIndex(1)
6 >Emitted(76, 53) Source(21, 49) + SourceIndex(1)
7 >Emitted(76, 58) Source(21, 32) + SourceIndex(1)
8 >Emitted(76, 83) Source(21, 49) + SourceIndex(1)
9 >Emitted(76, 91) Source(21, 79) + SourceIndex(1)
---
>>>    /*@internal*/ var internalOther;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^^
6 >                                   ^
1 >
  >
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      internalOther
6 >                                   .something { export class someClass {} }
1 >Emitted(77, 5) Source(22, 1) + SourceIndex(1)
2 >Emitted(77, 18) Source(22, 14) + SourceIndex(1)
3 >Emitted(77, 19) Source(22, 15) + SourceIndex(1)
4 >Emitted(77, 23) Source(22, 32) + SourceIndex(1)
5 >Emitted(77, 36) Source(22, 45) + SourceIndex(1)
6 >Emitted(77, 37) Source(22, 85) + SourceIndex(1)
---
>>>    (function (internalOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
1 >
2 >    export namespace 
3 >               internalOther
1 >Emitted(78, 5) Source(22, 15) + SourceIndex(1)
2 >Emitted(78, 16) Source(22, 32) + SourceIndex(1)
3 >Emitted(78, 29) Source(22, 45) + SourceIndex(1)
---
>>>        var something;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^->
1 >.
2 >        
3 >            something
4 >                      { export class someClass {} }
1 >Emitted(79, 9) Source(22, 46) + SourceIndex(1)
2 >Emitted(79, 13) Source(22, 46) + SourceIndex(1)
3 >Emitted(79, 22) Source(22, 55) + SourceIndex(1)
4 >Emitted(79, 23) Source(22, 85) + SourceIndex(1)
---
>>>        (function (something) {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        
3 >                   something
1->Emitted(80, 9) Source(22, 46) + SourceIndex(1)
2 >Emitted(80, 20) Source(22, 46) + SourceIndex(1)
3 >Emitted(80, 29) Source(22, 55) + SourceIndex(1)
---
>>>            var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(81, 13) Source(22, 58) + SourceIndex(1)
---
>>>                function someClass() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(82, 17) Source(22, 58) + SourceIndex(1)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                }
1->Emitted(83, 17) Source(22, 82) + SourceIndex(1)
2 >Emitted(83, 18) Source(22, 83) + SourceIndex(1)
---
>>>                return someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1->
2 >                }
1->Emitted(84, 17) Source(22, 82) + SourceIndex(1)
2 >Emitted(84, 33) Source(22, 83) + SourceIndex(1)
---
>>>            }());
1 >^^^^^^^^^^^^
2 >            ^
3 >             
4 >             ^^^^
5 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >            }
3 >             
4 >             export class someClass {}
1 >Emitted(85, 13) Source(22, 82) + SourceIndex(1)
2 >Emitted(85, 14) Source(22, 83) + SourceIndex(1)
3 >Emitted(85, 14) Source(22, 58) + SourceIndex(1)
4 >Emitted(85, 18) Source(22, 83) + SourceIndex(1)
---
>>>            something.someClass = someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^
3 >                               ^^^^^^^^^^^^
4 >                                           ^
5 >                                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            someClass
3 >                                {}
4 >                                           
1->Emitted(86, 13) Source(22, 71) + SourceIndex(1)
2 >Emitted(86, 32) Source(22, 80) + SourceIndex(1)
3 >Emitted(86, 44) Source(22, 83) + SourceIndex(1)
4 >Emitted(86, 45) Source(22, 83) + SourceIndex(1)
---
>>>        })(something = internalOther.something || (internalOther.something = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^^^^^
7 >                                              ^^^^^
8 >                                                   ^^^^^^^^^^^^^^^^^^^^^^^
9 >                                                                          ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           something
5 >                    
6 >                       something
7 >                                              
8 >                                                   something
9 >                                                                           { export class someClass {} }
1->Emitted(87, 9) Source(22, 84) + SourceIndex(1)
2 >Emitted(87, 10) Source(22, 85) + SourceIndex(1)
3 >Emitted(87, 12) Source(22, 46) + SourceIndex(1)
4 >Emitted(87, 21) Source(22, 55) + SourceIndex(1)
5 >Emitted(87, 24) Source(22, 46) + SourceIndex(1)
6 >Emitted(87, 47) Source(22, 55) + SourceIndex(1)
7 >Emitted(87, 52) Source(22, 46) + SourceIndex(1)
8 >Emitted(87, 75) Source(22, 55) + SourceIndex(1)
9 >Emitted(87, 83) Source(22, 85) + SourceIndex(1)
---
>>>    })(internalOther = exports.internalOther || (exports.internalOther = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^^^
7 >                                            ^^^^^
8 >                                                 ^^^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1 >
2 >    }
3 >     
4 >       internalOther
5 >                    
6 >                       internalOther
7 >                                            
8 >                                                 internalOther
9 >                                                                      .something { export class someClass {} }
1 >Emitted(88, 5) Source(22, 84) + SourceIndex(1)
2 >Emitted(88, 6) Source(22, 85) + SourceIndex(1)
3 >Emitted(88, 8) Source(22, 32) + SourceIndex(1)
4 >Emitted(88, 21) Source(22, 45) + SourceIndex(1)
5 >Emitted(88, 24) Source(22, 32) + SourceIndex(1)
6 >Emitted(88, 45) Source(22, 45) + SourceIndex(1)
7 >Emitted(88, 50) Source(22, 32) + SourceIndex(1)
8 >Emitted(88, 71) Source(22, 45) + SourceIndex(1)
9 >Emitted(88, 79) Source(22, 85) + SourceIndex(1)
---
>>>    /*@internal*/ exports.internalImport = internalNamespace.someClass;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^
5 >                          ^^^^^^^^^^^^^^
6 >                                        ^^^
7 >                                           ^^^^^^^^^^^^^^^^^
8 >                                                            ^
9 >                                                             ^^^^^^^^^
10>                                                                      ^
1 >
  >
2 >    /*@internal*/
3 >                  export import 
4 >                  
5 >                          internalImport
6 >                                         = 
7 >                                           internalNamespace
8 >                                                            .
9 >                                                             someClass
10>                                                                      ;
1 >Emitted(89, 5) Source(23, 1) + SourceIndex(1)
2 >Emitted(89, 18) Source(23, 14) + SourceIndex(1)
3 >Emitted(89, 19) Source(23, 29) + SourceIndex(1)
4 >Emitted(89, 27) Source(23, 29) + SourceIndex(1)
5 >Emitted(89, 41) Source(23, 43) + SourceIndex(1)
6 >Emitted(89, 44) Source(23, 46) + SourceIndex(1)
7 >Emitted(89, 61) Source(23, 63) + SourceIndex(1)
8 >Emitted(89, 62) Source(23, 64) + SourceIndex(1)
9 >Emitted(89, 71) Source(23, 73) + SourceIndex(1)
10>Emitted(89, 72) Source(23, 74) + SourceIndex(1)
---
>>>    /*@internal*/ exports.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^
5 >                          ^^^^^^^^^^^^^
6 >                                       ^^^
7 >                                          ^^
8 >                                            ^
1 >
  >/*@internal*/ export type internalType = internalC;
  >
2 >    /*@internal*/
3 >                  export const 
4 >                  
5 >                          internalConst
6 >                                        = 
7 >                                          10
8 >                                            ;
1 >Emitted(90, 5) Source(25, 1) + SourceIndex(1)
2 >Emitted(90, 18) Source(25, 14) + SourceIndex(1)
3 >Emitted(90, 19) Source(25, 28) + SourceIndex(1)
4 >Emitted(90, 27) Source(25, 28) + SourceIndex(1)
5 >Emitted(90, 40) Source(25, 41) + SourceIndex(1)
6 >Emitted(90, 43) Source(25, 44) + SourceIndex(1)
7 >Emitted(90, 45) Source(25, 46) + SourceIndex(1)
8 >Emitted(90, 46) Source(25, 47) + SourceIndex(1)
---
>>>    /*@internal*/ var internalEnum;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^
1 >
  >
2 >    /*@internal*/
3 >                  
4 >                  export enum 
5 >                      internalEnum { a, b, c }
1 >Emitted(91, 5) Source(26, 1) + SourceIndex(1)
2 >Emitted(91, 18) Source(26, 14) + SourceIndex(1)
3 >Emitted(91, 19) Source(26, 15) + SourceIndex(1)
4 >Emitted(91, 23) Source(26, 27) + SourceIndex(1)
5 >Emitted(91, 35) Source(26, 51) + SourceIndex(1)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(92, 5) Source(26, 15) + SourceIndex(1)
2 >Emitted(92, 16) Source(26, 27) + SourceIndex(1)
3 >Emitted(92, 28) Source(26, 39) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(93, 9) Source(26, 42) + SourceIndex(1)
2 >Emitted(93, 50) Source(26, 43) + SourceIndex(1)
3 >Emitted(93, 51) Source(26, 43) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(94, 9) Source(26, 45) + SourceIndex(1)
2 >Emitted(94, 50) Source(26, 46) + SourceIndex(1)
3 >Emitted(94, 51) Source(26, 46) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(95, 9) Source(26, 48) + SourceIndex(1)
2 >Emitted(95, 50) Source(26, 49) + SourceIndex(1)
3 >Emitted(95, 51) Source(26, 49) + SourceIndex(1)
---
>>>    })(internalEnum = exports.internalEnum || (exports.internalEnum = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^
5 >                   ^^^
6 >                      ^^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^^
9 >                                                                   ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       internalEnum
5 >                   
6 >                      internalEnum
7 >                                          
8 >                                               internalEnum
9 >                                                                    { a, b, c }
1->Emitted(96, 5) Source(26, 50) + SourceIndex(1)
2 >Emitted(96, 6) Source(26, 51) + SourceIndex(1)
3 >Emitted(96, 8) Source(26, 27) + SourceIndex(1)
4 >Emitted(96, 20) Source(26, 39) + SourceIndex(1)
5 >Emitted(96, 23) Source(26, 27) + SourceIndex(1)
6 >Emitted(96, 43) Source(26, 39) + SourceIndex(1)
7 >Emitted(96, 48) Source(26, 27) + SourceIndex(1)
8 >Emitted(96, 68) Source(26, 39) + SourceIndex(1)
9 >Emitted(96, 76) Source(26, 51) + SourceIndex(1)
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
1 >Emitted(102, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(102, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(102, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(102, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(102, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(102, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(104, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(104, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(104, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(104, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(104, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(104, 22) Source(1, 24) + SourceIndex(3)
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
1->export const 
2 >    
3 >            z
4 >              = 
5 >                30
6 >                  ;
1->Emitted(109, 5) Source(1, 14) + SourceIndex(4)
2 >Emitted(109, 13) Source(1, 14) + SourceIndex(4)
3 >Emitted(109, 14) Source(1, 15) + SourceIndex(4)
4 >Emitted(109, 17) Source(1, 18) + SourceIndex(4)
5 >Emitted(109, 19) Source(1, 20) + SourceIndex(4)
6 >Emitted(109, 20) Source(1, 21) + SourceIndex(4)
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
1 >Emitted(111, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(111, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(111, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(111, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(111, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(111, 16) Source(1, 18) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/app/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file3.ts","./file4.ts"],"js":{"sections":[{"pos":0,"end":4396,"kind":"prepend","data":"../lib/module.js","texts":[{"pos":0,"end":4396,"kind":"text"}]},{"pos":4396,"end":4622,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":191,"kind":"prepend","data":"../lib/module.d.ts","texts":[{"pos":0,"end":191,"kind":"text"}]},{"pos":191,"end":273,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/app/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/app/module.js
----------------------------------------------------------------------
prepend: (0-4396):: ../lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (0-4396)
/*@internal*/ var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.internalEnum = exports.internalConst = exports.internalImport = exports.internalOther = exports.internalNamespace = exports.internalfoo = exports.internalC = exports.normalN = exports.normalC = exports.x = void 0;
    /*@internal*/ exports.x = 10;
    var normalC = /** @class */ (function () {
        /*@internal*/ function normalC() {
        }
        /*@internal*/ normalC.prototype.method = function () { };
        Object.defineProperty(normalC.prototype, "c", {
            /*@internal*/ get: function () { return 10; },
            /*@internal*/ set: function (val) { },
            enumerable: false,
            configurable: true
        });
        return normalC;
    }());
    exports.normalC = normalC;
    var normalN;
    (function (normalN) {
        /*@internal*/ var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        normalN.C = C;
        /*@internal*/ function foo() { }
        normalN.foo = foo;
        /*@internal*/ var someNamespace;
        (function (someNamespace) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            someNamespace.C = C;
        })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
        /*@internal*/ var someOther;
        (function (someOther) {
            var something;
            (function (something) {
                var someClass = /** @class */ (function () {
                    function someClass() {
                    }
                    return someClass;
                }());
                something.someClass = someClass;
            })(something = someOther.something || (someOther.something = {}));
        })(someOther = normalN.someOther || (normalN.someOther = {}));
        /*@internal*/ normalN.someImport = someNamespace.C;
        /*@internal*/ normalN.internalConst = 10;
        /*@internal*/ var internalEnum;
        (function (internalEnum) {
            internalEnum[internalEnum["a"] = 0] = "a";
            internalEnum[internalEnum["b"] = 1] = "b";
            internalEnum[internalEnum["c"] = 2] = "c";
        })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
    })(normalN = exports.normalN || (exports.normalN = {}));
    /*@internal*/ var internalC = /** @class */ (function () {
        function internalC() {
        }
        return internalC;
    }());
    exports.internalC = internalC;
    /*@internal*/ function internalfoo() { }
    exports.internalfoo = internalfoo;
    /*@internal*/ var internalNamespace;
    (function (internalNamespace) {
        var someClass = /** @class */ (function () {
            function someClass() {
            }
            return someClass;
        }());
        internalNamespace.someClass = someClass;
    })(internalNamespace = exports.internalNamespace || (exports.internalNamespace = {}));
    /*@internal*/ var internalOther;
    (function (internalOther) {
        var something;
        (function (something) {
            var someClass = /** @class */ (function () {
                function someClass() {
                }
                return someClass;
            }());
            something.someClass = someClass;
        })(something = internalOther.something || (internalOther.something = {}));
    })(internalOther = exports.internalOther || (exports.internalOther = {}));
    /*@internal*/ exports.internalImport = internalNamespace.someClass;
    /*@internal*/ exports.internalConst = 10;
    /*@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = exports.internalEnum || (exports.internalEnum = {}));
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = void 0;
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (4396-4622)
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
prepend: (0-191):: ../lib/module.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-191)
declare module "file1" {
    export class normalC {
    }
    export namespace normalN {
    }
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

----------------------------------------------------------------------
text: (191-273)
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
          "pos": 0,
          "end": 4396,
          "kind": "prepend",
          "data": "../lib/module.js",
          "texts": [
            {
              "pos": 0,
              "end": 4396,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 4396,
          "end": 4622,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 191,
          "kind": "prepend",
          "data": "../lib/module.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 191,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 191,
          "end": 273,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 442
}

//// [/src/lib/module.d.ts] file written with same contents
//// [/src/lib/module.d.ts.map]
{"version":3,"file":"module.d.ts","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":"AAAc,QAAA,MAAM,MAAM,KAAK,CAAC;;ICAlB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;IAClC,MAAM,OAAO,OAAO;;QAEF,IAAI,EAAE,MAAM,CAAC;QACb,MAAM;QACN,IAAI,CAAC,IACM,MAAM,CADK;QACtB,IAAI,CAAC,CAAC,KAAK,MAAM,EAAK;KACvC;IACD,MAAM,WAAW,OAAO,CAAC;QACP,MAAa,CAAC;SAAI;QAClB,SAAgB,GAAG,SAAK;QACxB,UAAiB,aAAa,CAAC;YAAE,MAAa,CAAC;aAAG;SAAE;QACpD,UAAiB,SAAS,CAAC,SAAS,CAAC;YAAE,MAAa,SAAS;aAAG;SAAE;QAClE,MAAM,QAAQ,UAAU,GAAG,aAAa,CAAC,CAAC,CAAC;QAC3C,KAAY,YAAY,GAAG,SAAS,CAAC;QAC9B,MAAM,aAAa,KAAK,CAAC;QAChC,KAAY,YAAY;YAAG,CAAC,IAAA;YAAE,CAAC,IAAA;YAAE,CAAC,IAAA;SAAE;KACrD;IACa,MAAM,OAAO,SAAS;KAAG;IACzB,MAAM,UAAU,WAAW,SAAK;IAChC,MAAM,WAAW,iBAAiB,CAAC;QAAE,MAAa,SAAS;SAAG;KAAE;IAChE,MAAM,WAAW,aAAa,CAAC,SAAS,CAAC;QAAE,MAAa,SAAS;SAAG;KAAE;IACtE,MAAM,QAAQ,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;IAC3D,MAAM,MAAM,YAAY,GAAG,SAAS,CAAC;IACrC,MAAM,CAAC,MAAM,aAAa,KAAK,CAAC;IAChC,MAAM,MAAM,YAAY;QAAG,CAAC,IAAA;QAAE,CAAC,IAAA;QAAE,CAAC,IAAA;KAAE;;;ICzBlD,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;ACApB,QAAA,MAAM,WAAW,KAAK,CAAC"}

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
1 >/*@internal*/ 
2 >
3 >        const 
4 >              myGlob
5 >                     = 20
6 >                         ;
1 >Emitted(1, 1) Source(1, 15) + SourceIndex(0)
2 >Emitted(1, 9) Source(1, 15) + SourceIndex(0)
3 >Emitted(1, 15) Source(1, 21) + SourceIndex(0)
4 >Emitted(1, 21) Source(1, 27) + SourceIndex(0)
5 >Emitted(1, 26) Source(1, 32) + SourceIndex(0)
6 >Emitted(1, 27) Source(1, 33) + SourceIndex(0)
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
8 >                        ^^^->
1 >/*@internal*/ 
2 >    export
3 >           
4 >           const 
5 >                 x
6 >                   = 10
7 >                       ;
1 >Emitted(3, 5) Source(1, 15) + SourceIndex(1)
2 >Emitted(3, 11) Source(1, 21) + SourceIndex(1)
3 >Emitted(3, 12) Source(1, 22) + SourceIndex(1)
4 >Emitted(3, 18) Source(1, 28) + SourceIndex(1)
5 >Emitted(3, 19) Source(1, 29) + SourceIndex(1)
6 >Emitted(3, 24) Source(1, 34) + SourceIndex(1)
7 >Emitted(3, 25) Source(1, 35) + SourceIndex(1)
---
>>>    export class normalC {
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^
4 >                 ^^^^^^^
1->
  >
2 >    export
3 >           class 
4 >                 normalC
1->Emitted(4, 5) Source(2, 1) + SourceIndex(1)
2 >Emitted(4, 11) Source(2, 7) + SourceIndex(1)
3 >Emitted(4, 18) Source(2, 14) + SourceIndex(1)
4 >Emitted(4, 25) Source(2, 21) + SourceIndex(1)
---
>>>        constructor();
>>>        prop: string;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^
4 >              ^^^^^^
5 >                    ^
6 >                     ^^^->
1 > {
  >    /*@internal*/ constructor() { }
  >    /*@internal*/ 
2 >        prop
3 >            : 
4 >              string
5 >                    ;
1 >Emitted(6, 9) Source(4, 19) + SourceIndex(1)
2 >Emitted(6, 13) Source(4, 23) + SourceIndex(1)
3 >Emitted(6, 15) Source(4, 25) + SourceIndex(1)
4 >Emitted(6, 21) Source(4, 31) + SourceIndex(1)
5 >Emitted(6, 22) Source(4, 32) + SourceIndex(1)
---
>>>        method(): void;
1->^^^^^^^^
2 >        ^^^^^^
3 >              ^^^^^^^^^^^->
1->
  >    /*@internal*/ 
2 >        method
1->Emitted(7, 9) Source(5, 19) + SourceIndex(1)
2 >Emitted(7, 15) Source(5, 25) + SourceIndex(1)
---
>>>        get c(): number;
1->^^^^^^^^
2 >        ^^^^
3 >            ^
4 >             ^^^^
5 >                 ^^^^^^
6 >                       ^
7 >                        ^^^^->
1->() { }
  >    /*@internal*/ 
2 >        get 
3 >            c
4 >             () { return 10; }
  >                 /*@internal*/ set c(val: 
5 >                 number
6 >                       
1->Emitted(8, 9) Source(6, 19) + SourceIndex(1)
2 >Emitted(8, 13) Source(6, 23) + SourceIndex(1)
3 >Emitted(8, 14) Source(6, 24) + SourceIndex(1)
4 >Emitted(8, 18) Source(7, 30) + SourceIndex(1)
5 >Emitted(8, 24) Source(7, 36) + SourceIndex(1)
6 >Emitted(8, 25) Source(6, 41) + SourceIndex(1)
---
>>>        set c(val: number);
1->^^^^^^^^
2 >        ^^^^
3 >            ^
4 >             ^
5 >              ^^^^^
6 >                   ^^^^^^
7 >                         ^^
1->
  >    /*@internal*/ 
2 >        set 
3 >            c
4 >             (
5 >              val: 
6 >                   number
7 >                         ) { }
1->Emitted(9, 9) Source(7, 19) + SourceIndex(1)
2 >Emitted(9, 13) Source(7, 23) + SourceIndex(1)
3 >Emitted(9, 14) Source(7, 24) + SourceIndex(1)
4 >Emitted(9, 15) Source(7, 25) + SourceIndex(1)
5 >Emitted(9, 20) Source(7, 30) + SourceIndex(1)
6 >Emitted(9, 26) Source(7, 36) + SourceIndex(1)
7 >Emitted(9, 28) Source(7, 41) + SourceIndex(1)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(10, 6) Source(8, 2) + SourceIndex(1)
---
>>>    export namespace normalN {
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^^
4 >                     ^^^^^^^
5 >                            ^
1->
  >
2 >    export
3 >           namespace 
4 >                     normalN
5 >                             
1->Emitted(11, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(11, 11) Source(9, 7) + SourceIndex(1)
3 >Emitted(11, 22) Source(9, 18) + SourceIndex(1)
4 >Emitted(11, 29) Source(9, 25) + SourceIndex(1)
5 >Emitted(11, 30) Source(9, 26) + SourceIndex(1)
---
>>>        class C {
1 >^^^^^^^^
2 >        ^^^^^^
3 >              ^
1 >{
  >    /*@internal*/ 
2 >        export class 
3 >              C
1 >Emitted(12, 9) Source(10, 19) + SourceIndex(1)
2 >Emitted(12, 15) Source(10, 32) + SourceIndex(1)
3 >Emitted(12, 16) Source(10, 33) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^^
2 >         ^^^^^^^^^^^^^^^^^^^^^->
1 > { }
1 >Emitted(13, 10) Source(10, 37) + SourceIndex(1)
---
>>>        function foo(): void;
1->^^^^^^^^
2 >        ^^^^^^^^^
3 >                 ^^^
4 >                    ^^^^^^^^^
5 >                             ^^^^^->
1->
  >    /*@internal*/ 
2 >        export function 
3 >                 foo
4 >                    () {}
1->Emitted(14, 9) Source(11, 19) + SourceIndex(1)
2 >Emitted(14, 18) Source(11, 35) + SourceIndex(1)
3 >Emitted(14, 21) Source(11, 38) + SourceIndex(1)
4 >Emitted(14, 30) Source(11, 43) + SourceIndex(1)
---
>>>        namespace someNamespace {
1->^^^^^^^^
2 >        ^^^^^^^^^^
3 >                  ^^^^^^^^^^^^^
4 >                               ^
1->
  >    /*@internal*/ 
2 >        export namespace 
3 >                  someNamespace
4 >                                
1->Emitted(15, 9) Source(12, 19) + SourceIndex(1)
2 >Emitted(15, 19) Source(12, 36) + SourceIndex(1)
3 >Emitted(15, 32) Source(12, 49) + SourceIndex(1)
4 >Emitted(15, 33) Source(12, 50) + SourceIndex(1)
---
>>>            class C {
1 >^^^^^^^^^^^^
2 >            ^^^^^^
3 >                  ^
1 >{ 
2 >            export class 
3 >                  C
1 >Emitted(16, 13) Source(12, 52) + SourceIndex(1)
2 >Emitted(16, 19) Source(12, 65) + SourceIndex(1)
3 >Emitted(16, 20) Source(12, 66) + SourceIndex(1)
---
>>>            }
1 >^^^^^^^^^^^^^
1 > {}
1 >Emitted(17, 14) Source(12, 69) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^^
2 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(18, 10) Source(12, 71) + SourceIndex(1)
---
>>>        namespace someOther.something {
1->^^^^^^^^
2 >        ^^^^^^^^^^
3 >                  ^^^^^^^^^
4 >                           ^
5 >                            ^^^^^^^^^
6 >                                     ^
1->
  >    /*@internal*/ 
2 >        export namespace 
3 >                  someOther
4 >                           .
5 >                            something
6 >                                      
1->Emitted(19, 9) Source(13, 19) + SourceIndex(1)
2 >Emitted(19, 19) Source(13, 36) + SourceIndex(1)
3 >Emitted(19, 28) Source(13, 45) + SourceIndex(1)
4 >Emitted(19, 29) Source(13, 46) + SourceIndex(1)
5 >Emitted(19, 38) Source(13, 55) + SourceIndex(1)
6 >Emitted(19, 39) Source(13, 56) + SourceIndex(1)
---
>>>            class someClass {
1 >^^^^^^^^^^^^
2 >            ^^^^^^
3 >                  ^^^^^^^^^
1 >{ 
2 >            export class 
3 >                  someClass
1 >Emitted(20, 13) Source(13, 58) + SourceIndex(1)
2 >Emitted(20, 19) Source(13, 71) + SourceIndex(1)
3 >Emitted(20, 28) Source(13, 80) + SourceIndex(1)
---
>>>            }
1 >^^^^^^^^^^^^^
1 > {}
1 >Emitted(21, 14) Source(13, 83) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^^
2 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(22, 10) Source(13, 85) + SourceIndex(1)
---
>>>        export import someImport = someNamespace.C;
1->^^^^^^^^
2 >        ^^^^^^
3 >              ^^^^^^^^
4 >                      ^^^^^^^^^^
5 >                                ^^^
6 >                                   ^^^^^^^^^^^^^
7 >                                                ^
8 >                                                 ^
9 >                                                  ^
1->
  >    /*@internal*/ 
2 >        export
3 >               import 
4 >                      someImport
5 >                                 = 
6 >                                   someNamespace
7 >                                                .
8 >                                                 C
9 >                                                  ;
1->Emitted(23, 9) Source(14, 19) + SourceIndex(1)
2 >Emitted(23, 15) Source(14, 25) + SourceIndex(1)
3 >Emitted(23, 23) Source(14, 33) + SourceIndex(1)
4 >Emitted(23, 33) Source(14, 43) + SourceIndex(1)
5 >Emitted(23, 36) Source(14, 46) + SourceIndex(1)
6 >Emitted(23, 49) Source(14, 59) + SourceIndex(1)
7 >Emitted(23, 50) Source(14, 60) + SourceIndex(1)
8 >Emitted(23, 51) Source(14, 61) + SourceIndex(1)
9 >Emitted(23, 52) Source(14, 62) + SourceIndex(1)
---
>>>        type internalType = internalC;
1 >^^^^^^^^
2 >        ^^^^^
3 >             ^^^^^^^^^^^^
4 >                         ^^^
5 >                            ^^^^^^^^^
6 >                                     ^
1 >
  >    /*@internal*/ 
2 >        export type 
3 >             internalType
4 >                          = 
5 >                            internalC
6 >                                     ;
1 >Emitted(24, 9) Source(15, 19) + SourceIndex(1)
2 >Emitted(24, 14) Source(15, 31) + SourceIndex(1)
3 >Emitted(24, 26) Source(15, 43) + SourceIndex(1)
4 >Emitted(24, 29) Source(15, 46) + SourceIndex(1)
5 >Emitted(24, 38) Source(15, 55) + SourceIndex(1)
6 >Emitted(24, 39) Source(15, 56) + SourceIndex(1)
---
>>>        const internalConst = 10;
1 >^^^^^^^^
2 >        ^^^^^^
3 >              ^^^^^^^^^^^^^
4 >                           ^^^^^
5 >                                ^
1 >
  >    /*@internal*/ export 
2 >        const 
3 >              internalConst
4 >                            = 10
5 >                                ;
1 >Emitted(25, 9) Source(16, 26) + SourceIndex(1)
2 >Emitted(25, 15) Source(16, 32) + SourceIndex(1)
3 >Emitted(25, 28) Source(16, 45) + SourceIndex(1)
4 >Emitted(25, 33) Source(16, 50) + SourceIndex(1)
5 >Emitted(25, 34) Source(16, 51) + SourceIndex(1)
---
>>>        enum internalEnum {
1 >^^^^^^^^
2 >        ^^^^^
3 >             ^^^^^^^^^^^^
1 >
  >    /*@internal*/ 
2 >        export enum 
3 >             internalEnum
1 >Emitted(26, 9) Source(17, 19) + SourceIndex(1)
2 >Emitted(26, 14) Source(17, 31) + SourceIndex(1)
3 >Emitted(26, 26) Source(17, 43) + SourceIndex(1)
---
>>>            a = 0,
1 >^^^^^^^^^^^^
2 >            ^
3 >             ^^^^
4 >                 ^^->
1 > { 
2 >            a
3 >             
1 >Emitted(27, 13) Source(17, 46) + SourceIndex(1)
2 >Emitted(27, 14) Source(17, 47) + SourceIndex(1)
3 >Emitted(27, 18) Source(17, 47) + SourceIndex(1)
---
>>>            b = 1,
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^
4 >                 ^->
1->, 
2 >            b
3 >             
1->Emitted(28, 13) Source(17, 49) + SourceIndex(1)
2 >Emitted(28, 14) Source(17, 50) + SourceIndex(1)
3 >Emitted(28, 18) Source(17, 50) + SourceIndex(1)
---
>>>            c = 2
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^
1->, 
2 >            c
3 >             
1->Emitted(29, 13) Source(17, 52) + SourceIndex(1)
2 >Emitted(29, 14) Source(17, 53) + SourceIndex(1)
3 >Emitted(29, 18) Source(17, 53) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^^
1 > }
1 >Emitted(30, 10) Source(17, 55) + SourceIndex(1)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(31, 6) Source(18, 2) + SourceIndex(1)
---
>>>    export class internalC {
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^
4 >                 ^^^^^^^^^
1->
  >/*@internal*/ 
2 >    export
3 >           class 
4 >                 internalC
1->Emitted(32, 5) Source(19, 15) + SourceIndex(1)
2 >Emitted(32, 11) Source(19, 21) + SourceIndex(1)
3 >Emitted(32, 18) Source(19, 28) + SourceIndex(1)
4 >Emitted(32, 27) Source(19, 37) + SourceIndex(1)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > {}
1 >Emitted(33, 6) Source(19, 40) + SourceIndex(1)
---
>>>    export function internalfoo(): void;
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^
4 >                    ^^^^^^^^^^^
5 >                               ^^^^^^^^^
6 >                                        ^->
1->
  >/*@internal*/ 
2 >    export
3 >           function 
4 >                    internalfoo
5 >                               () {}
1->Emitted(34, 5) Source(20, 15) + SourceIndex(1)
2 >Emitted(34, 11) Source(20, 21) + SourceIndex(1)
3 >Emitted(34, 21) Source(20, 31) + SourceIndex(1)
4 >Emitted(34, 32) Source(20, 42) + SourceIndex(1)
5 >Emitted(34, 41) Source(20, 47) + SourceIndex(1)
---
>>>    export namespace internalNamespace {
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^^
4 >                     ^^^^^^^^^^^^^^^^^
5 >                                      ^
1->
  >/*@internal*/ 
2 >    export
3 >           namespace 
4 >                     internalNamespace
5 >                                       
1->Emitted(35, 5) Source(21, 15) + SourceIndex(1)
2 >Emitted(35, 11) Source(21, 21) + SourceIndex(1)
3 >Emitted(35, 22) Source(21, 32) + SourceIndex(1)
4 >Emitted(35, 39) Source(21, 49) + SourceIndex(1)
5 >Emitted(35, 40) Source(21, 50) + SourceIndex(1)
---
>>>        class someClass {
1 >^^^^^^^^
2 >        ^^^^^^
3 >              ^^^^^^^^^
1 >{ 
2 >        export class 
3 >              someClass
1 >Emitted(36, 9) Source(21, 52) + SourceIndex(1)
2 >Emitted(36, 15) Source(21, 65) + SourceIndex(1)
3 >Emitted(36, 24) Source(21, 74) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^^
1 > {}
1 >Emitted(37, 10) Source(21, 77) + SourceIndex(1)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(38, 6) Source(21, 79) + SourceIndex(1)
---
>>>    export namespace internalOther.something {
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^^
4 >                     ^^^^^^^^^^^^^
5 >                                  ^
6 >                                   ^^^^^^^^^
7 >                                            ^
1->
  >/*@internal*/ 
2 >    export
3 >           namespace 
4 >                     internalOther
5 >                                  .
6 >                                   something
7 >                                             
1->Emitted(39, 5) Source(22, 15) + SourceIndex(1)
2 >Emitted(39, 11) Source(22, 21) + SourceIndex(1)
3 >Emitted(39, 22) Source(22, 32) + SourceIndex(1)
4 >Emitted(39, 35) Source(22, 45) + SourceIndex(1)
5 >Emitted(39, 36) Source(22, 46) + SourceIndex(1)
6 >Emitted(39, 45) Source(22, 55) + SourceIndex(1)
7 >Emitted(39, 46) Source(22, 56) + SourceIndex(1)
---
>>>        class someClass {
1 >^^^^^^^^
2 >        ^^^^^^
3 >              ^^^^^^^^^
1 >{ 
2 >        export class 
3 >              someClass
1 >Emitted(40, 9) Source(22, 58) + SourceIndex(1)
2 >Emitted(40, 15) Source(22, 71) + SourceIndex(1)
3 >Emitted(40, 24) Source(22, 80) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^^
1 > {}
1 >Emitted(41, 10) Source(22, 83) + SourceIndex(1)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(42, 6) Source(22, 85) + SourceIndex(1)
---
>>>    export import internalImport = internalNamespace.someClass;
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^
4 >                  ^^^^^^^^^^^^^^
5 >                                ^^^
6 >                                   ^^^^^^^^^^^^^^^^^
7 >                                                    ^
8 >                                                     ^^^^^^^^^
9 >                                                              ^
1->
  >/*@internal*/ 
2 >    export
3 >           import 
4 >                  internalImport
5 >                                 = 
6 >                                   internalNamespace
7 >                                                    .
8 >                                                     someClass
9 >                                                              ;
1->Emitted(43, 5) Source(23, 15) + SourceIndex(1)
2 >Emitted(43, 11) Source(23, 21) + SourceIndex(1)
3 >Emitted(43, 19) Source(23, 29) + SourceIndex(1)
4 >Emitted(43, 33) Source(23, 43) + SourceIndex(1)
5 >Emitted(43, 36) Source(23, 46) + SourceIndex(1)
6 >Emitted(43, 53) Source(23, 63) + SourceIndex(1)
7 >Emitted(43, 54) Source(23, 64) + SourceIndex(1)
8 >Emitted(43, 63) Source(23, 73) + SourceIndex(1)
9 >Emitted(43, 64) Source(23, 74) + SourceIndex(1)
---
>>>    export type internalType = internalC;
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^
4 >                ^^^^^^^^^^^^
5 >                            ^^^
6 >                               ^^^^^^^^^
7 >                                        ^
1 >
  >/*@internal*/ 
2 >    export
3 >           type 
4 >                internalType
5 >                             = 
6 >                               internalC
7 >                                        ;
1 >Emitted(44, 5) Source(24, 15) + SourceIndex(1)
2 >Emitted(44, 11) Source(24, 21) + SourceIndex(1)
3 >Emitted(44, 17) Source(24, 27) + SourceIndex(1)
4 >Emitted(44, 29) Source(24, 39) + SourceIndex(1)
5 >Emitted(44, 32) Source(24, 42) + SourceIndex(1)
6 >Emitted(44, 41) Source(24, 51) + SourceIndex(1)
7 >Emitted(44, 42) Source(24, 52) + SourceIndex(1)
---
>>>    export const internalConst = 10;
1 >^^^^
2 >    ^^^^^^
3 >          ^
4 >           ^^^^^^
5 >                 ^^^^^^^^^^^^^
6 >                              ^^^^^
7 >                                   ^
1 >
  >/*@internal*/ 
2 >    export
3 >           
4 >           const 
5 >                 internalConst
6 >                               = 10
7 >                                   ;
1 >Emitted(45, 5) Source(25, 15) + SourceIndex(1)
2 >Emitted(45, 11) Source(25, 21) + SourceIndex(1)
3 >Emitted(45, 12) Source(25, 22) + SourceIndex(1)
4 >Emitted(45, 18) Source(25, 28) + SourceIndex(1)
5 >Emitted(45, 31) Source(25, 41) + SourceIndex(1)
6 >Emitted(45, 36) Source(25, 46) + SourceIndex(1)
7 >Emitted(45, 37) Source(25, 47) + SourceIndex(1)
---
>>>    export enum internalEnum {
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^
4 >                ^^^^^^^^^^^^
1 >
  >/*@internal*/ 
2 >    export
3 >           enum 
4 >                internalEnum
1 >Emitted(46, 5) Source(26, 15) + SourceIndex(1)
2 >Emitted(46, 11) Source(26, 21) + SourceIndex(1)
3 >Emitted(46, 17) Source(26, 27) + SourceIndex(1)
4 >Emitted(46, 29) Source(26, 39) + SourceIndex(1)
---
>>>        a = 0,
1 >^^^^^^^^
2 >        ^
3 >         ^^^^
4 >             ^^->
1 > { 
2 >        a
3 >         
1 >Emitted(47, 9) Source(26, 42) + SourceIndex(1)
2 >Emitted(47, 10) Source(26, 43) + SourceIndex(1)
3 >Emitted(47, 14) Source(26, 43) + SourceIndex(1)
---
>>>        b = 1,
1->^^^^^^^^
2 >        ^
3 >         ^^^^
4 >             ^->
1->, 
2 >        b
3 >         
1->Emitted(48, 9) Source(26, 45) + SourceIndex(1)
2 >Emitted(48, 10) Source(26, 46) + SourceIndex(1)
3 >Emitted(48, 14) Source(26, 46) + SourceIndex(1)
---
>>>        c = 2
1->^^^^^^^^
2 >        ^
3 >         ^^^^
1->, 
2 >        c
3 >         
1->Emitted(49, 9) Source(26, 48) + SourceIndex(1)
2 >Emitted(49, 10) Source(26, 49) + SourceIndex(1)
3 >Emitted(49, 14) Source(26, 49) + SourceIndex(1)
---
>>>    }
1 >^^^^^
1 > }
1 >Emitted(50, 6) Source(26, 51) + SourceIndex(1)
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
1 >Emitted(53, 5) Source(1, 1) + SourceIndex(2)
2 >Emitted(53, 11) Source(1, 7) + SourceIndex(2)
3 >Emitted(53, 12) Source(1, 8) + SourceIndex(2)
4 >Emitted(53, 18) Source(1, 14) + SourceIndex(2)
5 >Emitted(53, 19) Source(1, 15) + SourceIndex(2)
6 >Emitted(53, 24) Source(1, 20) + SourceIndex(2)
7 >Emitted(53, 25) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(55, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(55, 9) Source(1, 1) + SourceIndex(3)
3 >Emitted(55, 15) Source(1, 7) + SourceIndex(3)
4 >Emitted(55, 26) Source(1, 18) + SourceIndex(3)
5 >Emitted(55, 31) Source(1, 23) + SourceIndex(3)
6 >Emitted(55, 32) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.d.ts.map

//// [/src/lib/module.js]
/*@internal*/ var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.internalEnum = exports.internalConst = exports.internalImport = exports.internalOther = exports.internalNamespace = exports.internalfoo = exports.internalC = exports.normalN = exports.normalC = exports.x = void 0;
    /*@internal*/ exports.x = 10;
    var normalC = /** @class */ (function () {
        /*@internal*/ function normalC() {
        }
        /*@internal*/ normalC.prototype.method = function () { };
        Object.defineProperty(normalC.prototype, "c", {
            /*@internal*/ get: function () { return 10; },
            /*@internal*/ set: function (val) { },
            enumerable: false,
            configurable: true
        });
        return normalC;
    }());
    exports.normalC = normalC;
    var normalN;
    (function (normalN) {
        /*@internal*/ var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        normalN.C = C;
        /*@internal*/ function foo() { }
        normalN.foo = foo;
        /*@internal*/ var someNamespace;
        (function (someNamespace) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            someNamespace.C = C;
        })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
        /*@internal*/ var someOther;
        (function (someOther) {
            var something;
            (function (something) {
                var someClass = /** @class */ (function () {
                    function someClass() {
                    }
                    return someClass;
                }());
                something.someClass = someClass;
            })(something = someOther.something || (someOther.something = {}));
        })(someOther = normalN.someOther || (normalN.someOther = {}));
        /*@internal*/ normalN.someImport = someNamespace.C;
        /*@internal*/ normalN.internalConst = 10;
        /*@internal*/ var internalEnum;
        (function (internalEnum) {
            internalEnum[internalEnum["a"] = 0] = "a";
            internalEnum[internalEnum["b"] = 1] = "b";
            internalEnum[internalEnum["c"] = 2] = "c";
        })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
    })(normalN = exports.normalN || (exports.normalN = {}));
    /*@internal*/ var internalC = /** @class */ (function () {
        function internalC() {
        }
        return internalC;
    }());
    exports.internalC = internalC;
    /*@internal*/ function internalfoo() { }
    exports.internalfoo = internalfoo;
    /*@internal*/ var internalNamespace;
    (function (internalNamespace) {
        var someClass = /** @class */ (function () {
            function someClass() {
            }
            return someClass;
        }());
        internalNamespace.someClass = someClass;
    })(internalNamespace = exports.internalNamespace || (exports.internalNamespace = {}));
    /*@internal*/ var internalOther;
    (function (internalOther) {
        var something;
        (function (something) {
            var someClass = /** @class */ (function () {
                function someClass() {
                }
                return someClass;
            }());
            something.someClass = someClass;
        })(something = internalOther.something || (internalOther.something = {}));
    })(internalOther = exports.internalOther || (exports.internalOther = {}));
    /*@internal*/ exports.internalImport = internalNamespace.someClass;
    /*@internal*/ exports.internalConst = 10;
    /*@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = exports.internalEnum || (exports.internalEnum = {}));
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
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":"AAAA,aAAa,CAAC,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;ICAhC,aAAa,CAAc,QAAA,CAAC,GAAG,EAAE,CAAC;IAClC;QACI,aAAa,CAAC;QAAgB,CAAC;QAE/B,aAAa,CAAC,wBAAM,GAAN,cAAW,CAAC;QACZ,sBAAI,sBAAC;YAAnB,aAAa,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;YACpC,aAAa,MAAC,UAAM,GAAW,IAAI,CAAC;;;WADA;QAExC,cAAC;IAAD,CAAC,AAND,IAMC;IANY,0BAAO;IAOpB,IAAiB,OAAO,CASvB;IATD,WAAiB,OAAO;QACpB,aAAa,CAAC;YAAA;YAAiB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAlB,IAAkB;QAAL,SAAC,IAAI,CAAA;QAChC,aAAa,CAAC,SAAgB,GAAG,KAAI,CAAC;QAAR,WAAG,MAAK,CAAA;QACtC,aAAa,CAAC,IAAiB,aAAa,CAAsB;QAApD,WAAiB,aAAa;YAAG;gBAAA;gBAAgB,CAAC;gBAAD,QAAC;YAAD,CAAC,AAAjB,IAAiB;YAAJ,eAAC,IAAG,CAAA;QAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;QAClE,aAAa,CAAC,IAAiB,SAAS,CAAwC;QAAlE,WAAiB,SAAS;YAAC,IAAA,SAAS,CAA8B;YAAvC,WAAA,SAAS;gBAAG;oBAAA;oBAAwB,CAAC;oBAAD,gBAAC;gBAAD,CAAC,AAAzB,IAAyB;gBAAZ,mBAAS,YAAG,CAAA;YAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;QAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;QAChF,aAAa,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;QAEzD,aAAa,CAAc,qBAAa,GAAG,EAAE,CAAC;QAC9C,aAAa,CAAC,IAAY,YAAwB;QAApC,WAAY,YAAY;YAAG,yCAAC,CAAA;YAAE,yCAAC,CAAA;YAAE,yCAAC,CAAA;QAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;IACtD,CAAC,EATgB,OAAO,GAAP,eAAO,KAAP,eAAO,QASvB;IACD,aAAa,CAAC;QAAA;QAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,8BAAS;IACpC,aAAa,CAAC,SAAgB,WAAW,KAAI,CAAC;IAAhC,kCAAgC;IAC9C,aAAa,CAAC,IAAiB,iBAAiB,CAA8B;IAAhE,WAAiB,iBAAiB;QAAG;YAAA;YAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,2BAAS,YAAG,CAAA;IAAC,CAAC,EAA/C,iBAAiB,GAAjB,yBAAiB,KAAjB,yBAAiB,QAA8B;IAC9E,aAAa,CAAC,IAAiB,aAAa,CAAwC;IAAtE,WAAiB,aAAa;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS;YAAG;gBAAA;gBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;IAAD,CAAC,EAArD,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAwC;IACpF,aAAa,CAAe,QAAA,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;IAEzE,aAAa,CAAc,QAAA,aAAa,GAAG,EAAE,CAAC;IAC9C,aAAa,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;;;;;;ICzBrC,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

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
>>>/*@internal*/ var myGlob = 20;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^
6 >                        ^^^
7 >                           ^^
8 >                             ^
9 >                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >/*@internal*/
3 >              
4 >              const 
5 >                  myGlob
6 >                         = 
7 >                           20
8 >                             ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 14) Source(1, 14) + SourceIndex(0)
3 >Emitted(1, 15) Source(1, 15) + SourceIndex(0)
4 >Emitted(1, 19) Source(1, 21) + SourceIndex(0)
5 >Emitted(1, 25) Source(1, 27) + SourceIndex(0)
6 >Emitted(1, 28) Source(1, 30) + SourceIndex(0)
7 >Emitted(1, 30) Source(1, 32) + SourceIndex(0)
8 >Emitted(1, 31) Source(1, 33) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file1.ts
-------------------------------------------------------------------
>>>define("file1", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
>>>    exports.internalEnum = exports.internalConst = exports.internalImport = exports.internalOther = exports.internalNamespace = exports.internalfoo = exports.internalC = exports.normalN = exports.normalC = exports.x = void 0;
>>>    /*@internal*/ exports.x = 10;
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^
5 >                          ^
6 >                           ^^^
7 >                              ^^
8 >                                ^
9 >                                 ^^^^^^^^^^^^^^->
1->
2 >    /*@internal*/
3 >                  export const 
4 >                  
5 >                          x
6 >                            = 
7 >                              10
8 >                                ;
1->Emitted(6, 5) Source(1, 1) + SourceIndex(1)
2 >Emitted(6, 18) Source(1, 14) + SourceIndex(1)
3 >Emitted(6, 19) Source(1, 28) + SourceIndex(1)
4 >Emitted(6, 27) Source(1, 28) + SourceIndex(1)
5 >Emitted(6, 28) Source(1, 29) + SourceIndex(1)
6 >Emitted(6, 31) Source(1, 32) + SourceIndex(1)
7 >Emitted(6, 33) Source(1, 34) + SourceIndex(1)
8 >Emitted(6, 34) Source(1, 35) + SourceIndex(1)
---
>>>    var normalC = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(7, 5) Source(2, 1) + SourceIndex(1)
---
>>>        /*@internal*/ function normalC() {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
1->export class normalC {
  >    
2 >        /*@internal*/
3 >                      
1->Emitted(8, 9) Source(3, 5) + SourceIndex(1)
2 >Emitted(8, 22) Source(3, 18) + SourceIndex(1)
3 >Emitted(8, 23) Source(3, 19) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >constructor() { 
2 >        }
1 >Emitted(9, 9) Source(3, 35) + SourceIndex(1)
2 >Emitted(9, 10) Source(3, 36) + SourceIndex(1)
---
>>>        /*@internal*/ normalC.prototype.method = function () { };
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                              ^^^
6 >                                                 ^^^^^^^^^^^^^^
7 >                                                               ^
1->
  >    /*@internal*/ prop: string;
  >    
2 >        /*@internal*/
3 >                      
4 >                      method
5 >                                              
6 >                                                 method() { 
7 >                                                               }
1->Emitted(10, 9) Source(5, 5) + SourceIndex(1)
2 >Emitted(10, 22) Source(5, 18) + SourceIndex(1)
3 >Emitted(10, 23) Source(5, 19) + SourceIndex(1)
4 >Emitted(10, 47) Source(5, 25) + SourceIndex(1)
5 >Emitted(10, 50) Source(5, 19) + SourceIndex(1)
6 >Emitted(10, 64) Source(5, 30) + SourceIndex(1)
7 >Emitted(10, 65) Source(5, 31) + SourceIndex(1)
---
>>>        Object.defineProperty(normalC.prototype, "c", {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^^^^^^^^^^^^^^^^^^^^^^
4 >                                                    ^^^^^^^->
1 >
  >    /*@internal*/ 
2 >        get 
3 >                              c
1 >Emitted(11, 9) Source(6, 19) + SourceIndex(1)
2 >Emitted(11, 31) Source(6, 23) + SourceIndex(1)
3 >Emitted(11, 53) Source(6, 24) + SourceIndex(1)
---
>>>            /*@internal*/ get: function () { return 10; },
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^
3 >                         ^^^^^^
4 >                               ^^^^^^^^^^^^^^
5 >                                             ^^^^^^^
6 >                                                    ^^
7 >                                                      ^
8 >                                                       ^
9 >                                                        ^
1->
2 >            /*@internal*/
3 >                          
4 >                               get c() { 
5 >                                             return 
6 >                                                    10
7 >                                                      ;
8 >                                                        
9 >                                                        }
1->Emitted(12, 13) Source(6, 5) + SourceIndex(1)
2 >Emitted(12, 26) Source(6, 18) + SourceIndex(1)
3 >Emitted(12, 32) Source(6, 19) + SourceIndex(1)
4 >Emitted(12, 46) Source(6, 29) + SourceIndex(1)
5 >Emitted(12, 53) Source(6, 36) + SourceIndex(1)
6 >Emitted(12, 55) Source(6, 38) + SourceIndex(1)
7 >Emitted(12, 56) Source(6, 39) + SourceIndex(1)
8 >Emitted(12, 57) Source(6, 40) + SourceIndex(1)
9 >Emitted(12, 58) Source(6, 41) + SourceIndex(1)
---
>>>            /*@internal*/ set: function (val) { },
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^
3 >                         ^^^^^^
4 >                               ^^^^^^^^^^
5 >                                         ^^^
6 >                                            ^^^^
7 >                                                ^
1 >
  >    
2 >            /*@internal*/
3 >                          
4 >                               set c(
5 >                                         val: number
6 >                                            ) { 
7 >                                                }
1 >Emitted(13, 13) Source(7, 5) + SourceIndex(1)
2 >Emitted(13, 26) Source(7, 18) + SourceIndex(1)
3 >Emitted(13, 32) Source(7, 19) + SourceIndex(1)
4 >Emitted(13, 42) Source(7, 25) + SourceIndex(1)
5 >Emitted(13, 45) Source(7, 36) + SourceIndex(1)
6 >Emitted(13, 49) Source(7, 40) + SourceIndex(1)
7 >Emitted(13, 50) Source(7, 41) + SourceIndex(1)
---
>>>            enumerable: false,
>>>            configurable: true
>>>        });
1 >^^^^^^^^^^^
2 >           ^^^^^^^^^^^^^->
1 >
1 >Emitted(16, 12) Source(6, 41) + SourceIndex(1)
---
>>>        return normalC;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >        }
1->Emitted(17, 9) Source(8, 1) + SourceIndex(1)
2 >Emitted(17, 23) Source(8, 2) + SourceIndex(1)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class normalC {
  >         /*@internal*/ constructor() { }
  >         /*@internal*/ prop: string;
  >         /*@internal*/ method() { }
  >         /*@internal*/ get c() { return 10; }
  >         /*@internal*/ set c(val: number) { }
  >     }
1 >Emitted(18, 5) Source(8, 1) + SourceIndex(1)
2 >Emitted(18, 6) Source(8, 2) + SourceIndex(1)
3 >Emitted(18, 6) Source(2, 1) + SourceIndex(1)
4 >Emitted(18, 10) Source(8, 2) + SourceIndex(1)
---
>>>    exports.normalC = normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^
1->
2 >    normalC
1->Emitted(19, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(19, 31) Source(2, 21) + SourceIndex(1)
---
>>>    var normalN;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^
4 >               ^
5 >                ^^^^^^^^^^->
1 > {
  >    /*@internal*/ constructor() { }
  >    /*@internal*/ prop: string;
  >    /*@internal*/ method() { }
  >    /*@internal*/ get c() { return 10; }
  >    /*@internal*/ set c(val: number) { }
  >}
  >
2 >    export namespace 
3 >        normalN
4 >                {
  >                   /*@internal*/ export class C { }
  >                   /*@internal*/ export function foo() {}
  >                   /*@internal*/ export namespace someNamespace { export class C {} }
  >                   /*@internal*/ export namespace someOther.something { export class someClass {} }
  >                   /*@internal*/ export import someImport = someNamespace.C;
  >                   /*@internal*/ export type internalType = internalC;
  >                   /*@internal*/ export const internalConst = 10;
  >                   /*@internal*/ export enum internalEnum { a, b, c }
  >               }
1 >Emitted(20, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(20, 9) Source(9, 18) + SourceIndex(1)
3 >Emitted(20, 16) Source(9, 25) + SourceIndex(1)
4 >Emitted(20, 17) Source(18, 2) + SourceIndex(1)
---
>>>    (function (normalN) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^
4 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export namespace 
3 >               normalN
1->Emitted(21, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(21, 16) Source(9, 18) + SourceIndex(1)
3 >Emitted(21, 23) Source(9, 25) + SourceIndex(1)
---
>>>        /*@internal*/ var C = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^->
1-> {
  >    
2 >        /*@internal*/
3 >                      
1->Emitted(22, 9) Source(10, 5) + SourceIndex(1)
2 >Emitted(22, 22) Source(10, 18) + SourceIndex(1)
3 >Emitted(22, 23) Source(10, 19) + SourceIndex(1)
---
>>>            function C() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(23, 13) Source(10, 19) + SourceIndex(1)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^->
1->export class C { 
2 >            }
1->Emitted(24, 13) Source(10, 36) + SourceIndex(1)
2 >Emitted(24, 14) Source(10, 37) + SourceIndex(1)
---
>>>            return C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^
1->
2 >            }
1->Emitted(25, 13) Source(10, 36) + SourceIndex(1)
2 >Emitted(25, 21) Source(10, 37) + SourceIndex(1)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class C { }
1 >Emitted(26, 9) Source(10, 36) + SourceIndex(1)
2 >Emitted(26, 10) Source(10, 37) + SourceIndex(1)
3 >Emitted(26, 10) Source(10, 19) + SourceIndex(1)
4 >Emitted(26, 14) Source(10, 37) + SourceIndex(1)
---
>>>        normalN.C = C;
1->^^^^^^^^
2 >        ^^^^^^^^^
3 >                 ^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^->
1->
2 >        C
3 >                  { }
4 >                     
1->Emitted(27, 9) Source(10, 32) + SourceIndex(1)
2 >Emitted(27, 18) Source(10, 33) + SourceIndex(1)
3 >Emitted(27, 22) Source(10, 37) + SourceIndex(1)
4 >Emitted(27, 23) Source(10, 37) + SourceIndex(1)
---
>>>        /*@internal*/ function foo() { }
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^^^^^
5 >                               ^^^
6 >                                  ^^^^^
7 >                                       ^
1->
  >    
2 >        /*@internal*/
3 >                      
4 >                      export function 
5 >                               foo
6 >                                  () {
7 >                                       }
1->Emitted(28, 9) Source(11, 5) + SourceIndex(1)
2 >Emitted(28, 22) Source(11, 18) + SourceIndex(1)
3 >Emitted(28, 23) Source(11, 19) + SourceIndex(1)
4 >Emitted(28, 32) Source(11, 35) + SourceIndex(1)
5 >Emitted(28, 35) Source(11, 38) + SourceIndex(1)
6 >Emitted(28, 40) Source(11, 42) + SourceIndex(1)
7 >Emitted(28, 41) Source(11, 43) + SourceIndex(1)
---
>>>        normalN.foo = foo;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^
4 >                         ^
5 >                          ^^^^^^^^^^^^^^^->
1 >
2 >        foo
3 >                   () {}
4 >                         
1 >Emitted(29, 9) Source(11, 35) + SourceIndex(1)
2 >Emitted(29, 20) Source(11, 38) + SourceIndex(1)
3 >Emitted(29, 26) Source(11, 43) + SourceIndex(1)
4 >Emitted(29, 27) Source(11, 43) + SourceIndex(1)
---
>>>        /*@internal*/ var someNamespace;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^
5 >                          ^^^^^^^^^^^^^
6 >                                       ^
1->
  >    
2 >        /*@internal*/
3 >                      
4 >                      export namespace 
5 >                          someNamespace
6 >                                        { export class C {} }
1->Emitted(30, 9) Source(12, 5) + SourceIndex(1)
2 >Emitted(30, 22) Source(12, 18) + SourceIndex(1)
3 >Emitted(30, 23) Source(12, 19) + SourceIndex(1)
4 >Emitted(30, 27) Source(12, 36) + SourceIndex(1)
5 >Emitted(30, 40) Source(12, 49) + SourceIndex(1)
6 >Emitted(30, 41) Source(12, 71) + SourceIndex(1)
---
>>>        (function (someNamespace) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^->
1 >
2 >        export namespace 
3 >                   someNamespace
1 >Emitted(31, 9) Source(12, 19) + SourceIndex(1)
2 >Emitted(31, 20) Source(12, 36) + SourceIndex(1)
3 >Emitted(31, 33) Source(12, 49) + SourceIndex(1)
---
>>>            var C = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(32, 13) Source(12, 52) + SourceIndex(1)
---
>>>                function C() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(33, 17) Source(12, 52) + SourceIndex(1)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^->
1->export class C {
2 >                }
1->Emitted(34, 17) Source(12, 68) + SourceIndex(1)
2 >Emitted(34, 18) Source(12, 69) + SourceIndex(1)
---
>>>                return C;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^
1->
2 >                }
1->Emitted(35, 17) Source(12, 68) + SourceIndex(1)
2 >Emitted(35, 25) Source(12, 69) + SourceIndex(1)
---
>>>            }());
1 >^^^^^^^^^^^^
2 >            ^
3 >             
4 >             ^^^^
5 >                 ^^^^^^^^^^^^^^^^->
1 >
2 >            }
3 >             
4 >             export class C {}
1 >Emitted(36, 13) Source(12, 68) + SourceIndex(1)
2 >Emitted(36, 14) Source(12, 69) + SourceIndex(1)
3 >Emitted(36, 14) Source(12, 52) + SourceIndex(1)
4 >Emitted(36, 18) Source(12, 69) + SourceIndex(1)
---
>>>            someNamespace.C = C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^
3 >                           ^^^^
4 >                               ^
5 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            C
3 >                            {}
4 >                               
1->Emitted(37, 13) Source(12, 65) + SourceIndex(1)
2 >Emitted(37, 28) Source(12, 66) + SourceIndex(1)
3 >Emitted(37, 32) Source(12, 69) + SourceIndex(1)
4 >Emitted(37, 33) Source(12, 69) + SourceIndex(1)
---
>>>        })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^^^^^
5 >                        ^^^
6 >                           ^^^^^^^^^^^^^^^^^^^^^
7 >                                                ^^^^^
8 >                                                     ^^^^^^^^^^^^^^^^^^^^^
9 >                                                                          ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           someNamespace
5 >                        
6 >                           someNamespace
7 >                                                
8 >                                                     someNamespace
9 >                                                                           { export class C {} }
1->Emitted(38, 9) Source(12, 70) + SourceIndex(1)
2 >Emitted(38, 10) Source(12, 71) + SourceIndex(1)
3 >Emitted(38, 12) Source(12, 36) + SourceIndex(1)
4 >Emitted(38, 25) Source(12, 49) + SourceIndex(1)
5 >Emitted(38, 28) Source(12, 36) + SourceIndex(1)
6 >Emitted(38, 49) Source(12, 49) + SourceIndex(1)
7 >Emitted(38, 54) Source(12, 36) + SourceIndex(1)
8 >Emitted(38, 75) Source(12, 49) + SourceIndex(1)
9 >Emitted(38, 83) Source(12, 71) + SourceIndex(1)
---
>>>        /*@internal*/ var someOther;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^
5 >                          ^^^^^^^^^
6 >                                   ^
1 >
  >    
2 >        /*@internal*/
3 >                      
4 >                      export namespace 
5 >                          someOther
6 >                                   .something { export class someClass {} }
1 >Emitted(39, 9) Source(13, 5) + SourceIndex(1)
2 >Emitted(39, 22) Source(13, 18) + SourceIndex(1)
3 >Emitted(39, 23) Source(13, 19) + SourceIndex(1)
4 >Emitted(39, 27) Source(13, 36) + SourceIndex(1)
5 >Emitted(39, 36) Source(13, 45) + SourceIndex(1)
6 >Emitted(39, 37) Source(13, 85) + SourceIndex(1)
---
>>>        (function (someOther) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
1 >
2 >        export namespace 
3 >                   someOther
1 >Emitted(40, 9) Source(13, 19) + SourceIndex(1)
2 >Emitted(40, 20) Source(13, 36) + SourceIndex(1)
3 >Emitted(40, 29) Source(13, 45) + SourceIndex(1)
---
>>>            var something;
1 >^^^^^^^^^^^^
2 >            ^^^^
3 >                ^^^^^^^^^
4 >                         ^
5 >                          ^^^^^^^^^^->
1 >.
2 >            
3 >                something
4 >                          { export class someClass {} }
1 >Emitted(41, 13) Source(13, 46) + SourceIndex(1)
2 >Emitted(41, 17) Source(13, 46) + SourceIndex(1)
3 >Emitted(41, 26) Source(13, 55) + SourceIndex(1)
4 >Emitted(41, 27) Source(13, 85) + SourceIndex(1)
---
>>>            (function (something) {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^
3 >                       ^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            
3 >                       something
1->Emitted(42, 13) Source(13, 46) + SourceIndex(1)
2 >Emitted(42, 24) Source(13, 46) + SourceIndex(1)
3 >Emitted(42, 33) Source(13, 55) + SourceIndex(1)
---
>>>                var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(43, 17) Source(13, 58) + SourceIndex(1)
---
>>>                    function someClass() {
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^^->
1->
1->Emitted(44, 21) Source(13, 58) + SourceIndex(1)
---
>>>                    }
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^
3 >                     ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                    }
1->Emitted(45, 21) Source(13, 82) + SourceIndex(1)
2 >Emitted(45, 22) Source(13, 83) + SourceIndex(1)
---
>>>                    return someClass;
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^^^^^^^^^^^^^^^^
1->
2 >                    }
1->Emitted(46, 21) Source(13, 82) + SourceIndex(1)
2 >Emitted(46, 37) Source(13, 83) + SourceIndex(1)
---
>>>                }());
1 >^^^^^^^^^^^^^^^^
2 >                ^
3 >                 
4 >                 ^^^^
5 >                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >                }
3 >                 
4 >                 export class someClass {}
1 >Emitted(47, 17) Source(13, 82) + SourceIndex(1)
2 >Emitted(47, 18) Source(13, 83) + SourceIndex(1)
3 >Emitted(47, 18) Source(13, 58) + SourceIndex(1)
4 >Emitted(47, 22) Source(13, 83) + SourceIndex(1)
---
>>>                something.someClass = someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^
3 >                                   ^^^^^^^^^^^^
4 >                                               ^
5 >                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >                someClass
3 >                                    {}
4 >                                               
1->Emitted(48, 17) Source(13, 71) + SourceIndex(1)
2 >Emitted(48, 36) Source(13, 80) + SourceIndex(1)
3 >Emitted(48, 48) Source(13, 83) + SourceIndex(1)
4 >Emitted(48, 49) Source(13, 83) + SourceIndex(1)
---
>>>            })(something = someOther.something || (someOther.something = {}));
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^
4 >               ^^^^^^^^^
5 >                        ^^^
6 >                           ^^^^^^^^^^^^^^^^^^^
7 >                                              ^^^^^
8 >                                                   ^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1-> 
2 >            }
3 >             
4 >               something
5 >                        
6 >                           something
7 >                                              
8 >                                                   something
9 >                                                                       { export class someClass {} }
1->Emitted(49, 13) Source(13, 84) + SourceIndex(1)
2 >Emitted(49, 14) Source(13, 85) + SourceIndex(1)
3 >Emitted(49, 16) Source(13, 46) + SourceIndex(1)
4 >Emitted(49, 25) Source(13, 55) + SourceIndex(1)
5 >Emitted(49, 28) Source(13, 46) + SourceIndex(1)
6 >Emitted(49, 47) Source(13, 55) + SourceIndex(1)
7 >Emitted(49, 52) Source(13, 46) + SourceIndex(1)
8 >Emitted(49, 71) Source(13, 55) + SourceIndex(1)
9 >Emitted(49, 79) Source(13, 85) + SourceIndex(1)
---
>>>        })(someOther = normalN.someOther || (normalN.someOther = {}));
1 >^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^
7 >                                        ^^^^^
8 >                                             ^^^^^^^^^^^^^^^^^
9 >                                                              ^^^^^^^^
1 >
2 >        }
3 >         
4 >           someOther
5 >                    
6 >                       someOther
7 >                                        
8 >                                             someOther
9 >                                                              .something { export class someClass {} }
1 >Emitted(50, 9) Source(13, 84) + SourceIndex(1)
2 >Emitted(50, 10) Source(13, 85) + SourceIndex(1)
3 >Emitted(50, 12) Source(13, 36) + SourceIndex(1)
4 >Emitted(50, 21) Source(13, 45) + SourceIndex(1)
5 >Emitted(50, 24) Source(13, 36) + SourceIndex(1)
6 >Emitted(50, 41) Source(13, 45) + SourceIndex(1)
7 >Emitted(50, 46) Source(13, 36) + SourceIndex(1)
8 >Emitted(50, 63) Source(13, 45) + SourceIndex(1)
9 >Emitted(50, 71) Source(13, 85) + SourceIndex(1)
---
>>>        /*@internal*/ normalN.someImport = someNamespace.C;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^^^^^^^^^^^^^^
5 >                                        ^^^
6 >                                           ^^^^^^^^^^^^^
7 >                                                        ^
8 >                                                         ^
9 >                                                          ^
1 >
  >    
2 >        /*@internal*/
3 >                      export import 
4 >                      someImport
5 >                                         = 
6 >                                           someNamespace
7 >                                                        .
8 >                                                         C
9 >                                                          ;
1 >Emitted(51, 9) Source(14, 5) + SourceIndex(1)
2 >Emitted(51, 22) Source(14, 18) + SourceIndex(1)
3 >Emitted(51, 23) Source(14, 33) + SourceIndex(1)
4 >Emitted(51, 41) Source(14, 43) + SourceIndex(1)
5 >Emitted(51, 44) Source(14, 46) + SourceIndex(1)
6 >Emitted(51, 57) Source(14, 59) + SourceIndex(1)
7 >Emitted(51, 58) Source(14, 60) + SourceIndex(1)
8 >Emitted(51, 59) Source(14, 61) + SourceIndex(1)
9 >Emitted(51, 60) Source(14, 62) + SourceIndex(1)
---
>>>        /*@internal*/ normalN.internalConst = 10;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^^^^^^^^^^^^^^^^^^
5 >                                           ^^^
6 >                                              ^^
7 >                                                ^
1 >
  >    /*@internal*/ export type internalType = internalC;
  >    
2 >        /*@internal*/
3 >                      export const 
4 >                      internalConst
5 >                                            = 
6 >                                              10
7 >                                                ;
1 >Emitted(52, 9) Source(16, 5) + SourceIndex(1)
2 >Emitted(52, 22) Source(16, 18) + SourceIndex(1)
3 >Emitted(52, 23) Source(16, 32) + SourceIndex(1)
4 >Emitted(52, 44) Source(16, 45) + SourceIndex(1)
5 >Emitted(52, 47) Source(16, 48) + SourceIndex(1)
6 >Emitted(52, 49) Source(16, 50) + SourceIndex(1)
7 >Emitted(52, 50) Source(16, 51) + SourceIndex(1)
---
>>>        /*@internal*/ var internalEnum;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
4 >                      ^^^^
5 >                          ^^^^^^^^^^^^
1 >
  >    
2 >        /*@internal*/
3 >                      
4 >                      export enum 
5 >                          internalEnum { a, b, c }
1 >Emitted(53, 9) Source(17, 5) + SourceIndex(1)
2 >Emitted(53, 22) Source(17, 18) + SourceIndex(1)
3 >Emitted(53, 23) Source(17, 19) + SourceIndex(1)
4 >Emitted(53, 27) Source(17, 31) + SourceIndex(1)
5 >Emitted(53, 39) Source(17, 55) + SourceIndex(1)
---
>>>        (function (internalEnum) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^^^^
4 >                               ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        export enum 
3 >                   internalEnum
1 >Emitted(54, 9) Source(17, 19) + SourceIndex(1)
2 >Emitted(54, 20) Source(17, 31) + SourceIndex(1)
3 >Emitted(54, 32) Source(17, 43) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^->
1-> { 
2 >            a
3 >                                                     
1->Emitted(55, 13) Source(17, 46) + SourceIndex(1)
2 >Emitted(55, 54) Source(17, 47) + SourceIndex(1)
3 >Emitted(55, 55) Source(17, 47) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^->
1->, 
2 >            b
3 >                                                     
1->Emitted(56, 13) Source(17, 49) + SourceIndex(1)
2 >Emitted(56, 54) Source(17, 50) + SourceIndex(1)
3 >Emitted(56, 55) Source(17, 50) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >            c
3 >                                                     
1->Emitted(57, 13) Source(17, 52) + SourceIndex(1)
2 >Emitted(57, 54) Source(17, 53) + SourceIndex(1)
3 >Emitted(57, 55) Source(17, 53) + SourceIndex(1)
---
>>>        })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^^^^
5 >                       ^^^
6 >                          ^^^^^^^^^^^^^^^^^^^^
7 >                                              ^^^^^
8 >                                                   ^^^^^^^^^^^^^^^^^^^^
9 >                                                                       ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           internalEnum
5 >                       
6 >                          internalEnum
7 >                                              
8 >                                                   internalEnum
9 >                                                                        { a, b, c }
1->Emitted(58, 9) Source(17, 54) + SourceIndex(1)
2 >Emitted(58, 10) Source(17, 55) + SourceIndex(1)
3 >Emitted(58, 12) Source(17, 31) + SourceIndex(1)
4 >Emitted(58, 24) Source(17, 43) + SourceIndex(1)
5 >Emitted(58, 27) Source(17, 31) + SourceIndex(1)
6 >Emitted(58, 47) Source(17, 43) + SourceIndex(1)
7 >Emitted(58, 52) Source(17, 31) + SourceIndex(1)
8 >Emitted(58, 72) Source(17, 43) + SourceIndex(1)
9 >Emitted(58, 80) Source(17, 55) + SourceIndex(1)
---
>>>    })(normalN = exports.normalN || (exports.normalN = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^
5 >              ^^^
6 >                 ^^^^^^^^^^^^^^^
7 >                                ^^^^^
8 >                                     ^^^^^^^^^^^^^^^
9 >                                                    ^^^^^^^^
10>                                                            ^^^->
1 >
  >
2 >    }
3 >     
4 >       normalN
5 >              
6 >                 normalN
7 >                                
8 >                                     normalN
9 >                                                     {
  >                                                        /*@internal*/ export class C { }
  >                                                        /*@internal*/ export function foo() {}
  >                                                        /*@internal*/ export namespace someNamespace { export class C {} }
  >                                                        /*@internal*/ export namespace someOther.something { export class someClass {} }
  >                                                        /*@internal*/ export import someImport = someNamespace.C;
  >                                                        /*@internal*/ export type internalType = internalC;
  >                                                        /*@internal*/ export const internalConst = 10;
  >                                                        /*@internal*/ export enum internalEnum { a, b, c }
  >                                                    }
1 >Emitted(59, 5) Source(18, 1) + SourceIndex(1)
2 >Emitted(59, 6) Source(18, 2) + SourceIndex(1)
3 >Emitted(59, 8) Source(9, 18) + SourceIndex(1)
4 >Emitted(59, 15) Source(9, 25) + SourceIndex(1)
5 >Emitted(59, 18) Source(9, 18) + SourceIndex(1)
6 >Emitted(59, 33) Source(9, 25) + SourceIndex(1)
7 >Emitted(59, 38) Source(9, 18) + SourceIndex(1)
8 >Emitted(59, 53) Source(9, 25) + SourceIndex(1)
9 >Emitted(59, 61) Source(18, 2) + SourceIndex(1)
---
>>>    /*@internal*/ var internalC = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^->
1->
  >
2 >    /*@internal*/
3 >                  
1->Emitted(60, 5) Source(19, 1) + SourceIndex(1)
2 >Emitted(60, 18) Source(19, 14) + SourceIndex(1)
3 >Emitted(60, 19) Source(19, 15) + SourceIndex(1)
---
>>>        function internalC() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(61, 9) Source(19, 15) + SourceIndex(1)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^->
1->export class internalC {
2 >        }
1->Emitted(62, 9) Source(19, 39) + SourceIndex(1)
2 >Emitted(62, 10) Source(19, 40) + SourceIndex(1)
---
>>>        return internalC;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1->
2 >        }
1->Emitted(63, 9) Source(19, 39) + SourceIndex(1)
2 >Emitted(63, 25) Source(19, 40) + SourceIndex(1)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class internalC {}
1 >Emitted(64, 5) Source(19, 39) + SourceIndex(1)
2 >Emitted(64, 6) Source(19, 40) + SourceIndex(1)
3 >Emitted(64, 6) Source(19, 15) + SourceIndex(1)
4 >Emitted(64, 10) Source(19, 40) + SourceIndex(1)
---
>>>    exports.internalC = internalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^^^^^^^^^^^->
1->
2 >    internalC
1->Emitted(65, 5) Source(19, 28) + SourceIndex(1)
2 >Emitted(65, 35) Source(19, 37) + SourceIndex(1)
---
>>>    /*@internal*/ function internalfoo() { }
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^
5 >                           ^^^^^^^^^^^
6 >                                      ^^^^^
7 >                                           ^
1-> {}
  >
2 >    /*@internal*/
3 >                  
4 >                  export function 
5 >                           internalfoo
6 >                                      () {
7 >                                           }
1->Emitted(66, 5) Source(20, 1) + SourceIndex(1)
2 >Emitted(66, 18) Source(20, 14) + SourceIndex(1)
3 >Emitted(66, 19) Source(20, 15) + SourceIndex(1)
4 >Emitted(66, 28) Source(20, 31) + SourceIndex(1)
5 >Emitted(66, 39) Source(20, 42) + SourceIndex(1)
6 >Emitted(66, 44) Source(20, 46) + SourceIndex(1)
7 >Emitted(66, 45) Source(20, 47) + SourceIndex(1)
---
>>>    exports.internalfoo = internalfoo;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^^^->
1 >
2 >    export function internalfoo() {}
1 >Emitted(67, 5) Source(20, 15) + SourceIndex(1)
2 >Emitted(67, 39) Source(20, 47) + SourceIndex(1)
---
>>>    /*@internal*/ var internalNamespace;
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^^^^^^
6 >                                       ^
1->
  >
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      internalNamespace
6 >                                        { export class someClass {} }
1->Emitted(68, 5) Source(21, 1) + SourceIndex(1)
2 >Emitted(68, 18) Source(21, 14) + SourceIndex(1)
3 >Emitted(68, 19) Source(21, 15) + SourceIndex(1)
4 >Emitted(68, 23) Source(21, 32) + SourceIndex(1)
5 >Emitted(68, 40) Source(21, 49) + SourceIndex(1)
6 >Emitted(68, 41) Source(21, 79) + SourceIndex(1)
---
>>>    (function (internalNamespace) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export namespace 
3 >               internalNamespace
1 >Emitted(69, 5) Source(21, 15) + SourceIndex(1)
2 >Emitted(69, 16) Source(21, 32) + SourceIndex(1)
3 >Emitted(69, 33) Source(21, 49) + SourceIndex(1)
---
>>>        var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(70, 9) Source(21, 52) + SourceIndex(1)
---
>>>            function someClass() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(71, 13) Source(21, 52) + SourceIndex(1)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >            }
1->Emitted(72, 13) Source(21, 76) + SourceIndex(1)
2 >Emitted(72, 14) Source(21, 77) + SourceIndex(1)
---
>>>            return someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1->
2 >            }
1->Emitted(73, 13) Source(21, 76) + SourceIndex(1)
2 >Emitted(73, 29) Source(21, 77) + SourceIndex(1)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class someClass {}
1 >Emitted(74, 9) Source(21, 76) + SourceIndex(1)
2 >Emitted(74, 10) Source(21, 77) + SourceIndex(1)
3 >Emitted(74, 10) Source(21, 52) + SourceIndex(1)
4 >Emitted(74, 14) Source(21, 77) + SourceIndex(1)
---
>>>        internalNamespace.someClass = someClass;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                   ^^^^^^^^^^^^
4 >                                               ^
5 >                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        someClass
3 >                                    {}
4 >                                               
1->Emitted(75, 9) Source(21, 65) + SourceIndex(1)
2 >Emitted(75, 36) Source(21, 74) + SourceIndex(1)
3 >Emitted(75, 48) Source(21, 77) + SourceIndex(1)
4 >Emitted(75, 49) Source(21, 77) + SourceIndex(1)
---
>>>    })(internalNamespace = exports.internalNamespace || (exports.internalNamespace = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^^^^^^
5 >                        ^^^
6 >                           ^^^^^^^^^^^^^^^^^^^^^^^^^
7 >                                                    ^^^^^
8 >                                                         ^^^^^^^^^^^^^^^^^^^^^^^^^
9 >                                                                                  ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       internalNamespace
5 >                        
6 >                           internalNamespace
7 >                                                    
8 >                                                         internalNamespace
9 >                                                                                   { export class someClass {} }
1->Emitted(76, 5) Source(21, 78) + SourceIndex(1)
2 >Emitted(76, 6) Source(21, 79) + SourceIndex(1)
3 >Emitted(76, 8) Source(21, 32) + SourceIndex(1)
4 >Emitted(76, 25) Source(21, 49) + SourceIndex(1)
5 >Emitted(76, 28) Source(21, 32) + SourceIndex(1)
6 >Emitted(76, 53) Source(21, 49) + SourceIndex(1)
7 >Emitted(76, 58) Source(21, 32) + SourceIndex(1)
8 >Emitted(76, 83) Source(21, 49) + SourceIndex(1)
9 >Emitted(76, 91) Source(21, 79) + SourceIndex(1)
---
>>>    /*@internal*/ var internalOther;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^^
6 >                                   ^
1 >
  >
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      internalOther
6 >                                   .something { export class someClass {} }
1 >Emitted(77, 5) Source(22, 1) + SourceIndex(1)
2 >Emitted(77, 18) Source(22, 14) + SourceIndex(1)
3 >Emitted(77, 19) Source(22, 15) + SourceIndex(1)
4 >Emitted(77, 23) Source(22, 32) + SourceIndex(1)
5 >Emitted(77, 36) Source(22, 45) + SourceIndex(1)
6 >Emitted(77, 37) Source(22, 85) + SourceIndex(1)
---
>>>    (function (internalOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
1 >
2 >    export namespace 
3 >               internalOther
1 >Emitted(78, 5) Source(22, 15) + SourceIndex(1)
2 >Emitted(78, 16) Source(22, 32) + SourceIndex(1)
3 >Emitted(78, 29) Source(22, 45) + SourceIndex(1)
---
>>>        var something;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^->
1 >.
2 >        
3 >            something
4 >                      { export class someClass {} }
1 >Emitted(79, 9) Source(22, 46) + SourceIndex(1)
2 >Emitted(79, 13) Source(22, 46) + SourceIndex(1)
3 >Emitted(79, 22) Source(22, 55) + SourceIndex(1)
4 >Emitted(79, 23) Source(22, 85) + SourceIndex(1)
---
>>>        (function (something) {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        
3 >                   something
1->Emitted(80, 9) Source(22, 46) + SourceIndex(1)
2 >Emitted(80, 20) Source(22, 46) + SourceIndex(1)
3 >Emitted(80, 29) Source(22, 55) + SourceIndex(1)
---
>>>            var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(81, 13) Source(22, 58) + SourceIndex(1)
---
>>>                function someClass() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(82, 17) Source(22, 58) + SourceIndex(1)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                }
1->Emitted(83, 17) Source(22, 82) + SourceIndex(1)
2 >Emitted(83, 18) Source(22, 83) + SourceIndex(1)
---
>>>                return someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1->
2 >                }
1->Emitted(84, 17) Source(22, 82) + SourceIndex(1)
2 >Emitted(84, 33) Source(22, 83) + SourceIndex(1)
---
>>>            }());
1 >^^^^^^^^^^^^
2 >            ^
3 >             
4 >             ^^^^
5 >                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >            }
3 >             
4 >             export class someClass {}
1 >Emitted(85, 13) Source(22, 82) + SourceIndex(1)
2 >Emitted(85, 14) Source(22, 83) + SourceIndex(1)
3 >Emitted(85, 14) Source(22, 58) + SourceIndex(1)
4 >Emitted(85, 18) Source(22, 83) + SourceIndex(1)
---
>>>            something.someClass = someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^
3 >                               ^^^^^^^^^^^^
4 >                                           ^
5 >                                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            someClass
3 >                                {}
4 >                                           
1->Emitted(86, 13) Source(22, 71) + SourceIndex(1)
2 >Emitted(86, 32) Source(22, 80) + SourceIndex(1)
3 >Emitted(86, 44) Source(22, 83) + SourceIndex(1)
4 >Emitted(86, 45) Source(22, 83) + SourceIndex(1)
---
>>>        })(something = internalOther.something || (internalOther.something = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^^^^^
7 >                                              ^^^^^
8 >                                                   ^^^^^^^^^^^^^^^^^^^^^^^
9 >                                                                          ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           something
5 >                    
6 >                       something
7 >                                              
8 >                                                   something
9 >                                                                           { export class someClass {} }
1->Emitted(87, 9) Source(22, 84) + SourceIndex(1)
2 >Emitted(87, 10) Source(22, 85) + SourceIndex(1)
3 >Emitted(87, 12) Source(22, 46) + SourceIndex(1)
4 >Emitted(87, 21) Source(22, 55) + SourceIndex(1)
5 >Emitted(87, 24) Source(22, 46) + SourceIndex(1)
6 >Emitted(87, 47) Source(22, 55) + SourceIndex(1)
7 >Emitted(87, 52) Source(22, 46) + SourceIndex(1)
8 >Emitted(87, 75) Source(22, 55) + SourceIndex(1)
9 >Emitted(87, 83) Source(22, 85) + SourceIndex(1)
---
>>>    })(internalOther = exports.internalOther || (exports.internalOther = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^^^
7 >                                            ^^^^^
8 >                                                 ^^^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1 >
2 >    }
3 >     
4 >       internalOther
5 >                    
6 >                       internalOther
7 >                                            
8 >                                                 internalOther
9 >                                                                      .something { export class someClass {} }
1 >Emitted(88, 5) Source(22, 84) + SourceIndex(1)
2 >Emitted(88, 6) Source(22, 85) + SourceIndex(1)
3 >Emitted(88, 8) Source(22, 32) + SourceIndex(1)
4 >Emitted(88, 21) Source(22, 45) + SourceIndex(1)
5 >Emitted(88, 24) Source(22, 32) + SourceIndex(1)
6 >Emitted(88, 45) Source(22, 45) + SourceIndex(1)
7 >Emitted(88, 50) Source(22, 32) + SourceIndex(1)
8 >Emitted(88, 71) Source(22, 45) + SourceIndex(1)
9 >Emitted(88, 79) Source(22, 85) + SourceIndex(1)
---
>>>    /*@internal*/ exports.internalImport = internalNamespace.someClass;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^
5 >                          ^^^^^^^^^^^^^^
6 >                                        ^^^
7 >                                           ^^^^^^^^^^^^^^^^^
8 >                                                            ^
9 >                                                             ^^^^^^^^^
10>                                                                      ^
1 >
  >
2 >    /*@internal*/
3 >                  export import 
4 >                  
5 >                          internalImport
6 >                                         = 
7 >                                           internalNamespace
8 >                                                            .
9 >                                                             someClass
10>                                                                      ;
1 >Emitted(89, 5) Source(23, 1) + SourceIndex(1)
2 >Emitted(89, 18) Source(23, 14) + SourceIndex(1)
3 >Emitted(89, 19) Source(23, 29) + SourceIndex(1)
4 >Emitted(89, 27) Source(23, 29) + SourceIndex(1)
5 >Emitted(89, 41) Source(23, 43) + SourceIndex(1)
6 >Emitted(89, 44) Source(23, 46) + SourceIndex(1)
7 >Emitted(89, 61) Source(23, 63) + SourceIndex(1)
8 >Emitted(89, 62) Source(23, 64) + SourceIndex(1)
9 >Emitted(89, 71) Source(23, 73) + SourceIndex(1)
10>Emitted(89, 72) Source(23, 74) + SourceIndex(1)
---
>>>    /*@internal*/ exports.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^
5 >                          ^^^^^^^^^^^^^
6 >                                       ^^^
7 >                                          ^^
8 >                                            ^
1 >
  >/*@internal*/ export type internalType = internalC;
  >
2 >    /*@internal*/
3 >                  export const 
4 >                  
5 >                          internalConst
6 >                                        = 
7 >                                          10
8 >                                            ;
1 >Emitted(90, 5) Source(25, 1) + SourceIndex(1)
2 >Emitted(90, 18) Source(25, 14) + SourceIndex(1)
3 >Emitted(90, 19) Source(25, 28) + SourceIndex(1)
4 >Emitted(90, 27) Source(25, 28) + SourceIndex(1)
5 >Emitted(90, 40) Source(25, 41) + SourceIndex(1)
6 >Emitted(90, 43) Source(25, 44) + SourceIndex(1)
7 >Emitted(90, 45) Source(25, 46) + SourceIndex(1)
8 >Emitted(90, 46) Source(25, 47) + SourceIndex(1)
---
>>>    /*@internal*/ var internalEnum;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^
1 >
  >
2 >    /*@internal*/
3 >                  
4 >                  export enum 
5 >                      internalEnum { a, b, c }
1 >Emitted(91, 5) Source(26, 1) + SourceIndex(1)
2 >Emitted(91, 18) Source(26, 14) + SourceIndex(1)
3 >Emitted(91, 19) Source(26, 15) + SourceIndex(1)
4 >Emitted(91, 23) Source(26, 27) + SourceIndex(1)
5 >Emitted(91, 35) Source(26, 51) + SourceIndex(1)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(92, 5) Source(26, 15) + SourceIndex(1)
2 >Emitted(92, 16) Source(26, 27) + SourceIndex(1)
3 >Emitted(92, 28) Source(26, 39) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(93, 9) Source(26, 42) + SourceIndex(1)
2 >Emitted(93, 50) Source(26, 43) + SourceIndex(1)
3 >Emitted(93, 51) Source(26, 43) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(94, 9) Source(26, 45) + SourceIndex(1)
2 >Emitted(94, 50) Source(26, 46) + SourceIndex(1)
3 >Emitted(94, 51) Source(26, 46) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(95, 9) Source(26, 48) + SourceIndex(1)
2 >Emitted(95, 50) Source(26, 49) + SourceIndex(1)
3 >Emitted(95, 51) Source(26, 49) + SourceIndex(1)
---
>>>    })(internalEnum = exports.internalEnum || (exports.internalEnum = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^
5 >                   ^^^
6 >                      ^^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^^
9 >                                                                   ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       internalEnum
5 >                   
6 >                      internalEnum
7 >                                          
8 >                                               internalEnum
9 >                                                                    { a, b, c }
1->Emitted(96, 5) Source(26, 50) + SourceIndex(1)
2 >Emitted(96, 6) Source(26, 51) + SourceIndex(1)
3 >Emitted(96, 8) Source(26, 27) + SourceIndex(1)
4 >Emitted(96, 20) Source(26, 39) + SourceIndex(1)
5 >Emitted(96, 23) Source(26, 27) + SourceIndex(1)
6 >Emitted(96, 43) Source(26, 39) + SourceIndex(1)
7 >Emitted(96, 48) Source(26, 27) + SourceIndex(1)
8 >Emitted(96, 68) Source(26, 39) + SourceIndex(1)
9 >Emitted(96, 76) Source(26, 51) + SourceIndex(1)
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
1 >Emitted(102, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(102, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(102, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(102, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(102, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(102, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(104, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(104, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(104, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(104, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(104, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(104, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./file0.ts","./file1.ts","./file2.ts","./global.ts"],"js":{"sections":[{"pos":0,"end":4396,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":26,"kind":"internal"},{"pos":28,"end":54,"kind":"text"},{"pos":54,"end":78,"kind":"internal"},{"pos":80,"end":108,"kind":"text"},{"pos":108,"end":233,"kind":"internal"},{"pos":235,"end":274,"kind":"text"},{"pos":274,"end":742,"kind":"internal"},{"pos":744,"end":751,"kind":"text"},{"pos":751,"end":1240,"kind":"internal"},{"pos":1242,"end":1333,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
text: (0-4396)
/*@internal*/ var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.internalEnum = exports.internalConst = exports.internalImport = exports.internalOther = exports.internalNamespace = exports.internalfoo = exports.internalC = exports.normalN = exports.normalC = exports.x = void 0;
    /*@internal*/ exports.x = 10;
    var normalC = /** @class */ (function () {
        /*@internal*/ function normalC() {
        }
        /*@internal*/ normalC.prototype.method = function () { };
        Object.defineProperty(normalC.prototype, "c", {
            /*@internal*/ get: function () { return 10; },
            /*@internal*/ set: function (val) { },
            enumerable: false,
            configurable: true
        });
        return normalC;
    }());
    exports.normalC = normalC;
    var normalN;
    (function (normalN) {
        /*@internal*/ var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        normalN.C = C;
        /*@internal*/ function foo() { }
        normalN.foo = foo;
        /*@internal*/ var someNamespace;
        (function (someNamespace) {
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            someNamespace.C = C;
        })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
        /*@internal*/ var someOther;
        (function (someOther) {
            var something;
            (function (something) {
                var someClass = /** @class */ (function () {
                    function someClass() {
                    }
                    return someClass;
                }());
                something.someClass = someClass;
            })(something = someOther.something || (someOther.something = {}));
        })(someOther = normalN.someOther || (normalN.someOther = {}));
        /*@internal*/ normalN.someImport = someNamespace.C;
        /*@internal*/ normalN.internalConst = 10;
        /*@internal*/ var internalEnum;
        (function (internalEnum) {
            internalEnum[internalEnum["a"] = 0] = "a";
            internalEnum[internalEnum["b"] = 1] = "b";
            internalEnum[internalEnum["c"] = 2] = "c";
        })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
    })(normalN = exports.normalN || (exports.normalN = {}));
    /*@internal*/ var internalC = /** @class */ (function () {
        function internalC() {
        }
        return internalC;
    }());
    exports.internalC = internalC;
    /*@internal*/ function internalfoo() { }
    exports.internalfoo = internalfoo;
    /*@internal*/ var internalNamespace;
    (function (internalNamespace) {
        var someClass = /** @class */ (function () {
            function someClass() {
            }
            return someClass;
        }());
        internalNamespace.someClass = someClass;
    })(internalNamespace = exports.internalNamespace || (exports.internalNamespace = {}));
    /*@internal*/ var internalOther;
    (function (internalOther) {
        var something;
        (function (something) {
            var someClass = /** @class */ (function () {
                function someClass() {
                }
                return someClass;
            }());
            something.someClass = someClass;
        })(something = internalOther.something || (internalOther.something = {}));
    })(internalOther = exports.internalOther || (exports.internalOther = {}));
    /*@internal*/ exports.internalImport = internalNamespace.someClass;
    /*@internal*/ exports.internalConst = 10;
    /*@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = exports.internalEnum || (exports.internalEnum = {}));
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
internal: (0-26)
declare const myGlob = 20;
----------------------------------------------------------------------
text: (28-54)
declare module "file1" {

----------------------------------------------------------------------
internal: (54-78)
    export const x = 10;
----------------------------------------------------------------------
text: (80-108)
    export class normalC {

----------------------------------------------------------------------
internal: (108-233)
        constructor();
        prop: string;
        method(): void;
        get c(): number;
        set c(val: number);
----------------------------------------------------------------------
text: (235-274)
    }
    export namespace normalN {

----------------------------------------------------------------------
internal: (274-742)
        class C {
        }
        function foo(): void;
        namespace someNamespace {
            class C {
            }
        }
        namespace someOther.something {
            class someClass {
            }
        }
        export import someImport = someNamespace.C;
        type internalType = internalC;
        const internalConst = 10;
        enum internalEnum {
            a = 0,
            b = 1,
            c = 2
        }
----------------------------------------------------------------------
text: (744-751)
    }

----------------------------------------------------------------------
internal: (751-1240)
    export class internalC {
    }
    export function internalfoo(): void;
    export namespace internalNamespace {
        class someClass {
        }
    }
    export namespace internalOther.something {
        class someClass {
        }
    }
    export import internalImport = internalNamespace.someClass;
    export type internalType = internalC;
    export const internalConst = 10;
    export enum internalEnum {
        a = 0,
        b = 1,
        c = 2
    }
----------------------------------------------------------------------
text: (1242-1333)
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
          "end": 4396,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 26,
          "kind": "internal"
        },
        {
          "pos": 28,
          "end": 54,
          "kind": "text"
        },
        {
          "pos": 54,
          "end": 78,
          "kind": "internal"
        },
        {
          "pos": 80,
          "end": 108,
          "kind": "text"
        },
        {
          "pos": 108,
          "end": 233,
          "kind": "internal"
        },
        {
          "pos": 235,
          "end": 274,
          "kind": "text"
        },
        {
          "pos": 274,
          "end": 742,
          "kind": "internal"
        },
        {
          "pos": 744,
          "end": 751,
          "kind": "text"
        },
        {
          "pos": 751,
          "end": 1240,
          "kind": "internal"
        },
        {
          "pos": 1242,
          "end": 1333,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 587
}

