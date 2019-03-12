//// [/src/app/module.js]
/*@internal*/ var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = 10;
    var normalC = /** @class */ (function () {
        /*@internal*/ function normalC() {
        }
        /*@internal*/ normalC.prototype.method = function () { };
        Object.defineProperty(normalC.prototype, "c", {
            /*@internal*/ get: function () { return 10; },
            /*@internal*/ set: function (val) { },
            enumerable: true,
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
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = 20;
});
var globalConst = 10;
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = 30;
});
var myVar = 30;
//# sourceMappingURL=module.js.map

//// [/src/app/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["../lib/file0.ts","../lib/file1.ts","../lib/file2.ts","../lib/global.ts","file3.ts","file4.ts"],"names":[],"mappings":"AAAA,aAAa,CAAC,IAAM,MAAM,GAAG,EAAE,CAAC;;;;ICAnB,QAAA,CAAC,GAAG,EAAE,CAAC;IACpB;QACI,aAAa,CAAC;QAAgB,CAAC;QAE/B,aAAa,CAAC,wBAAM,GAAN,cAAW,CAAC;QACZ,sBAAI,sBAAC;YAAnB,aAAa,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;YACpC,aAAa,MAAC,UAAM,GAAW,IAAI,CAAC;;;WADA;QAExC,cAAC;IAAD,CAAC,AAND,IAMC;IANY,0BAAO;IAOpB,IAAiB,OAAO,CASvB;IATD,WAAiB,OAAO;QACpB,aAAa,CAAC;YAAA;YAAiB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAlB,IAAkB;QAAL,SAAC,IAAI,CAAA;QAChC,aAAa,CAAC,SAAgB,GAAG,KAAI,CAAC;QAAR,WAAG,MAAK,CAAA;QACtC,aAAa,CAAC,IAAiB,aAAa,CAAsB;QAApD,WAAiB,aAAa;YAAG;gBAAA;gBAAgB,CAAC;gBAAD,QAAC;YAAD,CAAC,AAAjB,IAAiB;YAAJ,eAAC,IAAG,CAAA;QAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;QAClE,aAAa,CAAC,IAAiB,SAAS,CAAwC;QAAlE,WAAiB,SAAS;YAAC,IAAA,SAAS,CAA8B;YAAvC,WAAA,SAAS;gBAAG;oBAAA;oBAAwB,CAAC;oBAAD,gBAAC;gBAAD,CAAC,AAAzB,IAAyB;gBAAZ,mBAAS,YAAG,CAAA;YAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;QAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;QAChF,aAAa,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;QAEzD,aAAa,CAAc,qBAAa,GAAG,EAAE,CAAC;QAC9C,aAAa,CAAC,IAAY,YAAwB;QAApC,WAAY,YAAY;YAAG,yCAAC,CAAA;YAAE,yCAAC,CAAA;YAAE,yCAAC,CAAA;QAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;IACtD,CAAC,EATgB,OAAO,GAAP,eAAO,KAAP,eAAO,QASvB;IACD,aAAa,CAAC;QAAA;QAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,8BAAS;IACpC,aAAa,CAAC,SAAgB,WAAW,KAAI,CAAC;IAAhC,kCAAgC;IAC9C,aAAa,CAAC,IAAiB,iBAAiB,CAA8B;IAAhE,WAAiB,iBAAiB;QAAG;YAAA;YAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,2BAAS,YAAG,CAAA;IAAC,CAAC,EAA/C,iBAAiB,GAAjB,yBAAiB,KAAjB,yBAAiB,QAA8B;IAC9E,aAAa,CAAC,IAAiB,aAAa,CAAwC;IAAtE,WAAiB,aAAa;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS;YAAG;gBAAA;gBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;IAAD,CAAC,EAArD,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAwC;IACpF,aAAa,CAAe,QAAA,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;IAEzE,aAAa,CAAc,QAAA,aAAa,GAAG,EAAE,CAAC;IAC9C,aAAa,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;ICzBpD,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC;;;;ICAV,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,KAAK,GAAG,EAAE,CAAC"}

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
>>>    exports.x = 10;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
7 >                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(5, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(5, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(5, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(5, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(5, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(5, 20) Source(1, 21) + SourceIndex(1)
---
>>>    var normalC = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(6, 5) Source(2, 1) + SourceIndex(1)
---
>>>        /*@internal*/ function normalC() {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
1->export class normalC {
  >    
2 >        /*@internal*/
3 >                      
1->Emitted(7, 9) Source(3, 5) + SourceIndex(1)
2 >Emitted(7, 22) Source(3, 18) + SourceIndex(1)
3 >Emitted(7, 23) Source(3, 19) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >constructor() { 
2 >        }
1 >Emitted(8, 9) Source(3, 35) + SourceIndex(1)
2 >Emitted(8, 10) Source(3, 36) + SourceIndex(1)
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
1->Emitted(9, 9) Source(5, 5) + SourceIndex(1)
2 >Emitted(9, 22) Source(5, 18) + SourceIndex(1)
3 >Emitted(9, 23) Source(5, 19) + SourceIndex(1)
4 >Emitted(9, 47) Source(5, 25) + SourceIndex(1)
5 >Emitted(9, 50) Source(5, 19) + SourceIndex(1)
6 >Emitted(9, 64) Source(5, 30) + SourceIndex(1)
7 >Emitted(9, 65) Source(5, 31) + SourceIndex(1)
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
1 >Emitted(10, 9) Source(6, 19) + SourceIndex(1)
2 >Emitted(10, 31) Source(6, 23) + SourceIndex(1)
3 >Emitted(10, 53) Source(6, 24) + SourceIndex(1)
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
1->Emitted(11, 13) Source(6, 5) + SourceIndex(1)
2 >Emitted(11, 26) Source(6, 18) + SourceIndex(1)
3 >Emitted(11, 32) Source(6, 19) + SourceIndex(1)
4 >Emitted(11, 46) Source(6, 29) + SourceIndex(1)
5 >Emitted(11, 53) Source(6, 36) + SourceIndex(1)
6 >Emitted(11, 55) Source(6, 38) + SourceIndex(1)
7 >Emitted(11, 56) Source(6, 39) + SourceIndex(1)
8 >Emitted(11, 57) Source(6, 40) + SourceIndex(1)
9 >Emitted(11, 58) Source(6, 41) + SourceIndex(1)
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
1 >Emitted(12, 13) Source(7, 5) + SourceIndex(1)
2 >Emitted(12, 26) Source(7, 18) + SourceIndex(1)
3 >Emitted(12, 32) Source(7, 19) + SourceIndex(1)
4 >Emitted(12, 42) Source(7, 25) + SourceIndex(1)
5 >Emitted(12, 45) Source(7, 36) + SourceIndex(1)
6 >Emitted(12, 49) Source(7, 40) + SourceIndex(1)
7 >Emitted(12, 50) Source(7, 41) + SourceIndex(1)
---
>>>            enumerable: true,
>>>            configurable: true
>>>        });
1 >^^^^^^^^^^^
2 >           ^^^^^^^^^^^^^->
1 >
1 >Emitted(15, 12) Source(6, 41) + SourceIndex(1)
---
>>>        return normalC;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >        }
1->Emitted(16, 9) Source(8, 1) + SourceIndex(1)
2 >Emitted(16, 23) Source(8, 2) + SourceIndex(1)
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
1 >Emitted(17, 5) Source(8, 1) + SourceIndex(1)
2 >Emitted(17, 6) Source(8, 2) + SourceIndex(1)
3 >Emitted(17, 6) Source(2, 1) + SourceIndex(1)
4 >Emitted(17, 10) Source(8, 2) + SourceIndex(1)
---
>>>    exports.normalC = normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^
1->
2 >    normalC
1->Emitted(18, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(18, 31) Source(2, 21) + SourceIndex(1)
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
1 >Emitted(19, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(19, 9) Source(9, 18) + SourceIndex(1)
3 >Emitted(19, 16) Source(9, 25) + SourceIndex(1)
4 >Emitted(19, 17) Source(18, 2) + SourceIndex(1)
---
>>>    (function (normalN) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^
4 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export namespace 
3 >               normalN
1->Emitted(20, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(20, 16) Source(9, 18) + SourceIndex(1)
3 >Emitted(20, 23) Source(9, 25) + SourceIndex(1)
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
1->Emitted(21, 9) Source(10, 5) + SourceIndex(1)
2 >Emitted(21, 22) Source(10, 18) + SourceIndex(1)
3 >Emitted(21, 23) Source(10, 19) + SourceIndex(1)
---
>>>            function C() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(22, 13) Source(10, 19) + SourceIndex(1)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^->
1->export class C { 
2 >            }
1->Emitted(23, 13) Source(10, 36) + SourceIndex(1)
2 >Emitted(23, 14) Source(10, 37) + SourceIndex(1)
---
>>>            return C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^
1->
2 >            }
1->Emitted(24, 13) Source(10, 36) + SourceIndex(1)
2 >Emitted(24, 21) Source(10, 37) + SourceIndex(1)
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
1 >Emitted(25, 9) Source(10, 36) + SourceIndex(1)
2 >Emitted(25, 10) Source(10, 37) + SourceIndex(1)
3 >Emitted(25, 10) Source(10, 19) + SourceIndex(1)
4 >Emitted(25, 14) Source(10, 37) + SourceIndex(1)
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
1->Emitted(26, 9) Source(10, 32) + SourceIndex(1)
2 >Emitted(26, 18) Source(10, 33) + SourceIndex(1)
3 >Emitted(26, 22) Source(10, 37) + SourceIndex(1)
4 >Emitted(26, 23) Source(10, 37) + SourceIndex(1)
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
1->Emitted(27, 9) Source(11, 5) + SourceIndex(1)
2 >Emitted(27, 22) Source(11, 18) + SourceIndex(1)
3 >Emitted(27, 23) Source(11, 19) + SourceIndex(1)
4 >Emitted(27, 32) Source(11, 35) + SourceIndex(1)
5 >Emitted(27, 35) Source(11, 38) + SourceIndex(1)
6 >Emitted(27, 40) Source(11, 42) + SourceIndex(1)
7 >Emitted(27, 41) Source(11, 43) + SourceIndex(1)
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
1 >Emitted(28, 9) Source(11, 35) + SourceIndex(1)
2 >Emitted(28, 20) Source(11, 38) + SourceIndex(1)
3 >Emitted(28, 26) Source(11, 43) + SourceIndex(1)
4 >Emitted(28, 27) Source(11, 43) + SourceIndex(1)
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
1->Emitted(29, 9) Source(12, 5) + SourceIndex(1)
2 >Emitted(29, 22) Source(12, 18) + SourceIndex(1)
3 >Emitted(29, 23) Source(12, 19) + SourceIndex(1)
4 >Emitted(29, 27) Source(12, 36) + SourceIndex(1)
5 >Emitted(29, 40) Source(12, 49) + SourceIndex(1)
6 >Emitted(29, 41) Source(12, 71) + SourceIndex(1)
---
>>>        (function (someNamespace) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^->
1 >
2 >        export namespace 
3 >                   someNamespace
1 >Emitted(30, 9) Source(12, 19) + SourceIndex(1)
2 >Emitted(30, 20) Source(12, 36) + SourceIndex(1)
3 >Emitted(30, 33) Source(12, 49) + SourceIndex(1)
---
>>>            var C = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(31, 13) Source(12, 52) + SourceIndex(1)
---
>>>                function C() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(32, 17) Source(12, 52) + SourceIndex(1)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^->
1->export class C {
2 >                }
1->Emitted(33, 17) Source(12, 68) + SourceIndex(1)
2 >Emitted(33, 18) Source(12, 69) + SourceIndex(1)
---
>>>                return C;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^
1->
2 >                }
1->Emitted(34, 17) Source(12, 68) + SourceIndex(1)
2 >Emitted(34, 25) Source(12, 69) + SourceIndex(1)
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
1 >Emitted(35, 13) Source(12, 68) + SourceIndex(1)
2 >Emitted(35, 14) Source(12, 69) + SourceIndex(1)
3 >Emitted(35, 14) Source(12, 52) + SourceIndex(1)
4 >Emitted(35, 18) Source(12, 69) + SourceIndex(1)
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
1->Emitted(36, 13) Source(12, 65) + SourceIndex(1)
2 >Emitted(36, 28) Source(12, 66) + SourceIndex(1)
3 >Emitted(36, 32) Source(12, 69) + SourceIndex(1)
4 >Emitted(36, 33) Source(12, 69) + SourceIndex(1)
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
1->Emitted(37, 9) Source(12, 70) + SourceIndex(1)
2 >Emitted(37, 10) Source(12, 71) + SourceIndex(1)
3 >Emitted(37, 12) Source(12, 36) + SourceIndex(1)
4 >Emitted(37, 25) Source(12, 49) + SourceIndex(1)
5 >Emitted(37, 28) Source(12, 36) + SourceIndex(1)
6 >Emitted(37, 49) Source(12, 49) + SourceIndex(1)
7 >Emitted(37, 54) Source(12, 36) + SourceIndex(1)
8 >Emitted(37, 75) Source(12, 49) + SourceIndex(1)
9 >Emitted(37, 83) Source(12, 71) + SourceIndex(1)
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
1 >Emitted(38, 9) Source(13, 5) + SourceIndex(1)
2 >Emitted(38, 22) Source(13, 18) + SourceIndex(1)
3 >Emitted(38, 23) Source(13, 19) + SourceIndex(1)
4 >Emitted(38, 27) Source(13, 36) + SourceIndex(1)
5 >Emitted(38, 36) Source(13, 45) + SourceIndex(1)
6 >Emitted(38, 37) Source(13, 85) + SourceIndex(1)
---
>>>        (function (someOther) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
1 >
2 >        export namespace 
3 >                   someOther
1 >Emitted(39, 9) Source(13, 19) + SourceIndex(1)
2 >Emitted(39, 20) Source(13, 36) + SourceIndex(1)
3 >Emitted(39, 29) Source(13, 45) + SourceIndex(1)
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
1 >Emitted(40, 13) Source(13, 46) + SourceIndex(1)
2 >Emitted(40, 17) Source(13, 46) + SourceIndex(1)
3 >Emitted(40, 26) Source(13, 55) + SourceIndex(1)
4 >Emitted(40, 27) Source(13, 85) + SourceIndex(1)
---
>>>            (function (something) {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^
3 >                       ^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            
3 >                       something
1->Emitted(41, 13) Source(13, 46) + SourceIndex(1)
2 >Emitted(41, 24) Source(13, 46) + SourceIndex(1)
3 >Emitted(41, 33) Source(13, 55) + SourceIndex(1)
---
>>>                var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(42, 17) Source(13, 58) + SourceIndex(1)
---
>>>                    function someClass() {
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^^->
1->
1->Emitted(43, 21) Source(13, 58) + SourceIndex(1)
---
>>>                    }
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^
3 >                     ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                    }
1->Emitted(44, 21) Source(13, 82) + SourceIndex(1)
2 >Emitted(44, 22) Source(13, 83) + SourceIndex(1)
---
>>>                    return someClass;
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^^^^^^^^^^^^^^^^
1->
2 >                    }
1->Emitted(45, 21) Source(13, 82) + SourceIndex(1)
2 >Emitted(45, 37) Source(13, 83) + SourceIndex(1)
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
1 >Emitted(46, 17) Source(13, 82) + SourceIndex(1)
2 >Emitted(46, 18) Source(13, 83) + SourceIndex(1)
3 >Emitted(46, 18) Source(13, 58) + SourceIndex(1)
4 >Emitted(46, 22) Source(13, 83) + SourceIndex(1)
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
1->Emitted(47, 17) Source(13, 71) + SourceIndex(1)
2 >Emitted(47, 36) Source(13, 80) + SourceIndex(1)
3 >Emitted(47, 48) Source(13, 83) + SourceIndex(1)
4 >Emitted(47, 49) Source(13, 83) + SourceIndex(1)
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
1->Emitted(48, 13) Source(13, 84) + SourceIndex(1)
2 >Emitted(48, 14) Source(13, 85) + SourceIndex(1)
3 >Emitted(48, 16) Source(13, 46) + SourceIndex(1)
4 >Emitted(48, 25) Source(13, 55) + SourceIndex(1)
5 >Emitted(48, 28) Source(13, 46) + SourceIndex(1)
6 >Emitted(48, 47) Source(13, 55) + SourceIndex(1)
7 >Emitted(48, 52) Source(13, 46) + SourceIndex(1)
8 >Emitted(48, 71) Source(13, 55) + SourceIndex(1)
9 >Emitted(48, 79) Source(13, 85) + SourceIndex(1)
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
1 >Emitted(49, 9) Source(13, 84) + SourceIndex(1)
2 >Emitted(49, 10) Source(13, 85) + SourceIndex(1)
3 >Emitted(49, 12) Source(13, 36) + SourceIndex(1)
4 >Emitted(49, 21) Source(13, 45) + SourceIndex(1)
5 >Emitted(49, 24) Source(13, 36) + SourceIndex(1)
6 >Emitted(49, 41) Source(13, 45) + SourceIndex(1)
7 >Emitted(49, 46) Source(13, 36) + SourceIndex(1)
8 >Emitted(49, 63) Source(13, 45) + SourceIndex(1)
9 >Emitted(49, 71) Source(13, 85) + SourceIndex(1)
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
1 >Emitted(50, 9) Source(14, 5) + SourceIndex(1)
2 >Emitted(50, 22) Source(14, 18) + SourceIndex(1)
3 >Emitted(50, 23) Source(14, 33) + SourceIndex(1)
4 >Emitted(50, 41) Source(14, 43) + SourceIndex(1)
5 >Emitted(50, 44) Source(14, 46) + SourceIndex(1)
6 >Emitted(50, 57) Source(14, 59) + SourceIndex(1)
7 >Emitted(50, 58) Source(14, 60) + SourceIndex(1)
8 >Emitted(50, 59) Source(14, 61) + SourceIndex(1)
9 >Emitted(50, 60) Source(14, 62) + SourceIndex(1)
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
1 >Emitted(51, 9) Source(16, 5) + SourceIndex(1)
2 >Emitted(51, 22) Source(16, 18) + SourceIndex(1)
3 >Emitted(51, 23) Source(16, 32) + SourceIndex(1)
4 >Emitted(51, 44) Source(16, 45) + SourceIndex(1)
5 >Emitted(51, 47) Source(16, 48) + SourceIndex(1)
6 >Emitted(51, 49) Source(16, 50) + SourceIndex(1)
7 >Emitted(51, 50) Source(16, 51) + SourceIndex(1)
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
1 >Emitted(52, 9) Source(17, 5) + SourceIndex(1)
2 >Emitted(52, 22) Source(17, 18) + SourceIndex(1)
3 >Emitted(52, 23) Source(17, 19) + SourceIndex(1)
4 >Emitted(52, 27) Source(17, 31) + SourceIndex(1)
5 >Emitted(52, 39) Source(17, 55) + SourceIndex(1)
---
>>>        (function (internalEnum) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^^^^
4 >                               ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        export enum 
3 >                   internalEnum
1 >Emitted(53, 9) Source(17, 19) + SourceIndex(1)
2 >Emitted(53, 20) Source(17, 31) + SourceIndex(1)
3 >Emitted(53, 32) Source(17, 43) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^->
1-> { 
2 >            a
3 >                                                     
1->Emitted(54, 13) Source(17, 46) + SourceIndex(1)
2 >Emitted(54, 54) Source(17, 47) + SourceIndex(1)
3 >Emitted(54, 55) Source(17, 47) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^->
1->, 
2 >            b
3 >                                                     
1->Emitted(55, 13) Source(17, 49) + SourceIndex(1)
2 >Emitted(55, 54) Source(17, 50) + SourceIndex(1)
3 >Emitted(55, 55) Source(17, 50) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >            c
3 >                                                     
1->Emitted(56, 13) Source(17, 52) + SourceIndex(1)
2 >Emitted(56, 54) Source(17, 53) + SourceIndex(1)
3 >Emitted(56, 55) Source(17, 53) + SourceIndex(1)
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
1->Emitted(57, 9) Source(17, 54) + SourceIndex(1)
2 >Emitted(57, 10) Source(17, 55) + SourceIndex(1)
3 >Emitted(57, 12) Source(17, 31) + SourceIndex(1)
4 >Emitted(57, 24) Source(17, 43) + SourceIndex(1)
5 >Emitted(57, 27) Source(17, 31) + SourceIndex(1)
6 >Emitted(57, 47) Source(17, 43) + SourceIndex(1)
7 >Emitted(57, 52) Source(17, 31) + SourceIndex(1)
8 >Emitted(57, 72) Source(17, 43) + SourceIndex(1)
9 >Emitted(57, 80) Source(17, 55) + SourceIndex(1)
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
1 >Emitted(58, 5) Source(18, 1) + SourceIndex(1)
2 >Emitted(58, 6) Source(18, 2) + SourceIndex(1)
3 >Emitted(58, 8) Source(9, 18) + SourceIndex(1)
4 >Emitted(58, 15) Source(9, 25) + SourceIndex(1)
5 >Emitted(58, 18) Source(9, 18) + SourceIndex(1)
6 >Emitted(58, 33) Source(9, 25) + SourceIndex(1)
7 >Emitted(58, 38) Source(9, 18) + SourceIndex(1)
8 >Emitted(58, 53) Source(9, 25) + SourceIndex(1)
9 >Emitted(58, 61) Source(18, 2) + SourceIndex(1)
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
1->Emitted(59, 5) Source(19, 1) + SourceIndex(1)
2 >Emitted(59, 18) Source(19, 14) + SourceIndex(1)
3 >Emitted(59, 19) Source(19, 15) + SourceIndex(1)
---
>>>        function internalC() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(60, 9) Source(19, 15) + SourceIndex(1)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^->
1->export class internalC {
2 >        }
1->Emitted(61, 9) Source(19, 39) + SourceIndex(1)
2 >Emitted(61, 10) Source(19, 40) + SourceIndex(1)
---
>>>        return internalC;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1->
2 >        }
1->Emitted(62, 9) Source(19, 39) + SourceIndex(1)
2 >Emitted(62, 25) Source(19, 40) + SourceIndex(1)
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
1 >Emitted(63, 5) Source(19, 39) + SourceIndex(1)
2 >Emitted(63, 6) Source(19, 40) + SourceIndex(1)
3 >Emitted(63, 6) Source(19, 15) + SourceIndex(1)
4 >Emitted(63, 10) Source(19, 40) + SourceIndex(1)
---
>>>    exports.internalC = internalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^^^^^^^^^^^->
1->
2 >    internalC
1->Emitted(64, 5) Source(19, 28) + SourceIndex(1)
2 >Emitted(64, 35) Source(19, 37) + SourceIndex(1)
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
1->Emitted(65, 5) Source(20, 1) + SourceIndex(1)
2 >Emitted(65, 18) Source(20, 14) + SourceIndex(1)
3 >Emitted(65, 19) Source(20, 15) + SourceIndex(1)
4 >Emitted(65, 28) Source(20, 31) + SourceIndex(1)
5 >Emitted(65, 39) Source(20, 42) + SourceIndex(1)
6 >Emitted(65, 44) Source(20, 46) + SourceIndex(1)
7 >Emitted(65, 45) Source(20, 47) + SourceIndex(1)
---
>>>    exports.internalfoo = internalfoo;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^^^->
1 >
2 >    export function internalfoo() {}
1 >Emitted(66, 5) Source(20, 15) + SourceIndex(1)
2 >Emitted(66, 39) Source(20, 47) + SourceIndex(1)
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
1->Emitted(67, 5) Source(21, 1) + SourceIndex(1)
2 >Emitted(67, 18) Source(21, 14) + SourceIndex(1)
3 >Emitted(67, 19) Source(21, 15) + SourceIndex(1)
4 >Emitted(67, 23) Source(21, 32) + SourceIndex(1)
5 >Emitted(67, 40) Source(21, 49) + SourceIndex(1)
6 >Emitted(67, 41) Source(21, 79) + SourceIndex(1)
---
>>>    (function (internalNamespace) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export namespace 
3 >               internalNamespace
1 >Emitted(68, 5) Source(21, 15) + SourceIndex(1)
2 >Emitted(68, 16) Source(21, 32) + SourceIndex(1)
3 >Emitted(68, 33) Source(21, 49) + SourceIndex(1)
---
>>>        var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(69, 9) Source(21, 52) + SourceIndex(1)
---
>>>            function someClass() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(70, 13) Source(21, 52) + SourceIndex(1)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >            }
1->Emitted(71, 13) Source(21, 76) + SourceIndex(1)
2 >Emitted(71, 14) Source(21, 77) + SourceIndex(1)
---
>>>            return someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1->
2 >            }
1->Emitted(72, 13) Source(21, 76) + SourceIndex(1)
2 >Emitted(72, 29) Source(21, 77) + SourceIndex(1)
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
1 >Emitted(73, 9) Source(21, 76) + SourceIndex(1)
2 >Emitted(73, 10) Source(21, 77) + SourceIndex(1)
3 >Emitted(73, 10) Source(21, 52) + SourceIndex(1)
4 >Emitted(73, 14) Source(21, 77) + SourceIndex(1)
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
1->Emitted(74, 9) Source(21, 65) + SourceIndex(1)
2 >Emitted(74, 36) Source(21, 74) + SourceIndex(1)
3 >Emitted(74, 48) Source(21, 77) + SourceIndex(1)
4 >Emitted(74, 49) Source(21, 77) + SourceIndex(1)
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
1->Emitted(75, 5) Source(21, 78) + SourceIndex(1)
2 >Emitted(75, 6) Source(21, 79) + SourceIndex(1)
3 >Emitted(75, 8) Source(21, 32) + SourceIndex(1)
4 >Emitted(75, 25) Source(21, 49) + SourceIndex(1)
5 >Emitted(75, 28) Source(21, 32) + SourceIndex(1)
6 >Emitted(75, 53) Source(21, 49) + SourceIndex(1)
7 >Emitted(75, 58) Source(21, 32) + SourceIndex(1)
8 >Emitted(75, 83) Source(21, 49) + SourceIndex(1)
9 >Emitted(75, 91) Source(21, 79) + SourceIndex(1)
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
1 >Emitted(76, 5) Source(22, 1) + SourceIndex(1)
2 >Emitted(76, 18) Source(22, 14) + SourceIndex(1)
3 >Emitted(76, 19) Source(22, 15) + SourceIndex(1)
4 >Emitted(76, 23) Source(22, 32) + SourceIndex(1)
5 >Emitted(76, 36) Source(22, 45) + SourceIndex(1)
6 >Emitted(76, 37) Source(22, 85) + SourceIndex(1)
---
>>>    (function (internalOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
1 >
2 >    export namespace 
3 >               internalOther
1 >Emitted(77, 5) Source(22, 15) + SourceIndex(1)
2 >Emitted(77, 16) Source(22, 32) + SourceIndex(1)
3 >Emitted(77, 29) Source(22, 45) + SourceIndex(1)
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
1 >Emitted(78, 9) Source(22, 46) + SourceIndex(1)
2 >Emitted(78, 13) Source(22, 46) + SourceIndex(1)
3 >Emitted(78, 22) Source(22, 55) + SourceIndex(1)
4 >Emitted(78, 23) Source(22, 85) + SourceIndex(1)
---
>>>        (function (something) {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        
3 >                   something
1->Emitted(79, 9) Source(22, 46) + SourceIndex(1)
2 >Emitted(79, 20) Source(22, 46) + SourceIndex(1)
3 >Emitted(79, 29) Source(22, 55) + SourceIndex(1)
---
>>>            var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(80, 13) Source(22, 58) + SourceIndex(1)
---
>>>                function someClass() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(81, 17) Source(22, 58) + SourceIndex(1)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                }
1->Emitted(82, 17) Source(22, 82) + SourceIndex(1)
2 >Emitted(82, 18) Source(22, 83) + SourceIndex(1)
---
>>>                return someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1->
2 >                }
1->Emitted(83, 17) Source(22, 82) + SourceIndex(1)
2 >Emitted(83, 33) Source(22, 83) + SourceIndex(1)
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
1 >Emitted(84, 13) Source(22, 82) + SourceIndex(1)
2 >Emitted(84, 14) Source(22, 83) + SourceIndex(1)
3 >Emitted(84, 14) Source(22, 58) + SourceIndex(1)
4 >Emitted(84, 18) Source(22, 83) + SourceIndex(1)
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
1->Emitted(85, 13) Source(22, 71) + SourceIndex(1)
2 >Emitted(85, 32) Source(22, 80) + SourceIndex(1)
3 >Emitted(85, 44) Source(22, 83) + SourceIndex(1)
4 >Emitted(85, 45) Source(22, 83) + SourceIndex(1)
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
1->Emitted(86, 9) Source(22, 84) + SourceIndex(1)
2 >Emitted(86, 10) Source(22, 85) + SourceIndex(1)
3 >Emitted(86, 12) Source(22, 46) + SourceIndex(1)
4 >Emitted(86, 21) Source(22, 55) + SourceIndex(1)
5 >Emitted(86, 24) Source(22, 46) + SourceIndex(1)
6 >Emitted(86, 47) Source(22, 55) + SourceIndex(1)
7 >Emitted(86, 52) Source(22, 46) + SourceIndex(1)
8 >Emitted(86, 75) Source(22, 55) + SourceIndex(1)
9 >Emitted(86, 83) Source(22, 85) + SourceIndex(1)
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
1 >Emitted(87, 5) Source(22, 84) + SourceIndex(1)
2 >Emitted(87, 6) Source(22, 85) + SourceIndex(1)
3 >Emitted(87, 8) Source(22, 32) + SourceIndex(1)
4 >Emitted(87, 21) Source(22, 45) + SourceIndex(1)
5 >Emitted(87, 24) Source(22, 32) + SourceIndex(1)
6 >Emitted(87, 45) Source(22, 45) + SourceIndex(1)
7 >Emitted(87, 50) Source(22, 32) + SourceIndex(1)
8 >Emitted(87, 71) Source(22, 45) + SourceIndex(1)
9 >Emitted(87, 79) Source(22, 85) + SourceIndex(1)
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
1 >Emitted(88, 5) Source(23, 1) + SourceIndex(1)
2 >Emitted(88, 18) Source(23, 14) + SourceIndex(1)
3 >Emitted(88, 19) Source(23, 29) + SourceIndex(1)
4 >Emitted(88, 27) Source(23, 29) + SourceIndex(1)
5 >Emitted(88, 41) Source(23, 43) + SourceIndex(1)
6 >Emitted(88, 44) Source(23, 46) + SourceIndex(1)
7 >Emitted(88, 61) Source(23, 63) + SourceIndex(1)
8 >Emitted(88, 62) Source(23, 64) + SourceIndex(1)
9 >Emitted(88, 71) Source(23, 73) + SourceIndex(1)
10>Emitted(88, 72) Source(23, 74) + SourceIndex(1)
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
1 >Emitted(89, 5) Source(25, 1) + SourceIndex(1)
2 >Emitted(89, 18) Source(25, 14) + SourceIndex(1)
3 >Emitted(89, 19) Source(25, 28) + SourceIndex(1)
4 >Emitted(89, 27) Source(25, 28) + SourceIndex(1)
5 >Emitted(89, 40) Source(25, 41) + SourceIndex(1)
6 >Emitted(89, 43) Source(25, 44) + SourceIndex(1)
7 >Emitted(89, 45) Source(25, 46) + SourceIndex(1)
8 >Emitted(89, 46) Source(25, 47) + SourceIndex(1)
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
1 >Emitted(90, 5) Source(26, 1) + SourceIndex(1)
2 >Emitted(90, 18) Source(26, 14) + SourceIndex(1)
3 >Emitted(90, 19) Source(26, 15) + SourceIndex(1)
4 >Emitted(90, 23) Source(26, 27) + SourceIndex(1)
5 >Emitted(90, 35) Source(26, 51) + SourceIndex(1)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(91, 5) Source(26, 15) + SourceIndex(1)
2 >Emitted(91, 16) Source(26, 27) + SourceIndex(1)
3 >Emitted(91, 28) Source(26, 39) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(92, 9) Source(26, 42) + SourceIndex(1)
2 >Emitted(92, 50) Source(26, 43) + SourceIndex(1)
3 >Emitted(92, 51) Source(26, 43) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(93, 9) Source(26, 45) + SourceIndex(1)
2 >Emitted(93, 50) Source(26, 46) + SourceIndex(1)
3 >Emitted(93, 51) Source(26, 46) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(94, 9) Source(26, 48) + SourceIndex(1)
2 >Emitted(94, 50) Source(26, 49) + SourceIndex(1)
3 >Emitted(94, 51) Source(26, 49) + SourceIndex(1)
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
1->Emitted(95, 5) Source(26, 50) + SourceIndex(1)
2 >Emitted(95, 6) Source(26, 51) + SourceIndex(1)
3 >Emitted(95, 8) Source(26, 27) + SourceIndex(1)
4 >Emitted(95, 20) Source(26, 39) + SourceIndex(1)
5 >Emitted(95, 23) Source(26, 27) + SourceIndex(1)
6 >Emitted(95, 43) Source(26, 39) + SourceIndex(1)
7 >Emitted(95, 48) Source(26, 27) + SourceIndex(1)
8 >Emitted(95, 68) Source(26, 39) + SourceIndex(1)
9 >Emitted(95, 76) Source(26, 51) + SourceIndex(1)
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
1 >Emitted(96, 5) Source(26, 51) + SourceIndex(1)
2 >Emitted(96, 12) Source(26, 58) + SourceIndex(1)
3 >Emitted(96, 13) Source(26, 59) + SourceIndex(1)
4 >Emitted(96, 16) Source(26, 62) + SourceIndex(1)
5 >Emitted(96, 17) Source(26, 63) + SourceIndex(1)
6 >Emitted(96, 26) Source(26, 64) + SourceIndex(1)
7 >Emitted(96, 27) Source(26, 65) + SourceIndex(1)
8 >Emitted(96, 28) Source(26, 66) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:../lib/file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
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
1 >Emitted(101, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(101, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(101, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(101, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(101, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(101, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(103, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(103, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(103, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(103, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(103, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(103, 22) Source(1, 24) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/app/module.js
sourceFile:file3.ts
-------------------------------------------------------------------
>>>define("file3", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
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
1->Emitted(107, 5) Source(1, 14) + SourceIndex(4)
2 >Emitted(107, 13) Source(1, 14) + SourceIndex(4)
3 >Emitted(107, 14) Source(1, 15) + SourceIndex(4)
4 >Emitted(107, 17) Source(1, 18) + SourceIndex(4)
5 >Emitted(107, 19) Source(1, 20) + SourceIndex(4)
6 >Emitted(107, 20) Source(1, 21) + SourceIndex(4)
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
1 >Emitted(109, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(109, 5) Source(1, 7) + SourceIndex(5)
3 >Emitted(109, 10) Source(1, 12) + SourceIndex(5)
4 >Emitted(109, 13) Source(1, 15) + SourceIndex(5)
5 >Emitted(109, 15) Source(1, 17) + SourceIndex(5)
6 >Emitted(109, 16) Source(1, 18) + SourceIndex(5)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/app/module.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "/src/app/",
    "sourceFiles": [
      "/src/app/file3.ts",
      "/src/app/file4.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 4158,
          "kind": "prepend",
          "data": "/src/lib/module.js",
          "texts": [
            {
              "pos": 0,
              "end": 4158,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 4158,
          "end": 4359,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 217,
          "kind": "prepend",
          "data": "/src/lib/module.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 217,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 217,
          "end": 299,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/app/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/app/module.js
----------------------------------------------------------------------
prepend: (0-4158):: /src/lib/module.js texts:: 1
>>--------------------------------------------------------------------
text: (0-4158)
/*@internal*/ var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = 10;
    var normalC = /** @class */ (function () {
        /*@internal*/ function normalC() {
        }
        /*@internal*/ normalC.prototype.method = function () { };
        Object.defineProperty(normalC.prototype, "c", {
            /*@internal*/ get: function () { return 10; },
            /*@internal*/ set: function (val) { },
            enumerable: true,
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
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = 20;
});
var globalConst = 10;

----------------------------------------------------------------------
text: (4158-4359)
define("file3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = 30;
});
var myVar = 30;

======================================================================
======================================================================
File:: /src/app/module.d.ts
----------------------------------------------------------------------
prepend: (0-217):: /src/lib/module.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-217)
declare module "file1" {
    export const x = 10;
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
text: (217-299)
declare module "file3" {
    export const z = 30;
}
declare const myVar = 30;

======================================================================

//// [/src/lib/file1.ts]
export const x = 10;
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
/*@internal*/ export enum internalEnum { a, b, c }console.log(x);

//// [/src/lib/module.js]
/*@internal*/ var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = 10;
    var normalC = /** @class */ (function () {
        /*@internal*/ function normalC() {
        }
        /*@internal*/ normalC.prototype.method = function () { };
        Object.defineProperty(normalC.prototype, "c", {
            /*@internal*/ get: function () { return 10; },
            /*@internal*/ set: function (val) { },
            enumerable: true,
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
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.y = 20;
});
var globalConst = 10;
//# sourceMappingURL=module.js.map

//// [/src/lib/module.js.map]
{"version":3,"file":"module.js","sourceRoot":"","sources":["file0.ts","file1.ts","file2.ts","global.ts"],"names":[],"mappings":"AAAA,aAAa,CAAC,IAAM,MAAM,GAAG,EAAE,CAAC;;;;ICAnB,QAAA,CAAC,GAAG,EAAE,CAAC;IACpB;QACI,aAAa,CAAC;QAAgB,CAAC;QAE/B,aAAa,CAAC,wBAAM,GAAN,cAAW,CAAC;QACZ,sBAAI,sBAAC;YAAnB,aAAa,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;YACpC,aAAa,MAAC,UAAM,GAAW,IAAI,CAAC;;;WADA;QAExC,cAAC;IAAD,CAAC,AAND,IAMC;IANY,0BAAO;IAOpB,IAAiB,OAAO,CASvB;IATD,WAAiB,OAAO;QACpB,aAAa,CAAC;YAAA;YAAiB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAlB,IAAkB;QAAL,SAAC,IAAI,CAAA;QAChC,aAAa,CAAC,SAAgB,GAAG,KAAI,CAAC;QAAR,WAAG,MAAK,CAAA;QACtC,aAAa,CAAC,IAAiB,aAAa,CAAsB;QAApD,WAAiB,aAAa;YAAG;gBAAA;gBAAgB,CAAC;gBAAD,QAAC;YAAD,CAAC,AAAjB,IAAiB;YAAJ,eAAC,IAAG,CAAA;QAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;QAClE,aAAa,CAAC,IAAiB,SAAS,CAAwC;QAAlE,WAAiB,SAAS;YAAC,IAAA,SAAS,CAA8B;YAAvC,WAAA,SAAS;gBAAG;oBAAA;oBAAwB,CAAC;oBAAD,gBAAC;gBAAD,CAAC,AAAzB,IAAyB;gBAAZ,mBAAS,YAAG,CAAA;YAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;QAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;QAChF,aAAa,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;QAEzD,aAAa,CAAc,qBAAa,GAAG,EAAE,CAAC;QAC9C,aAAa,CAAC,IAAY,YAAwB;QAApC,WAAY,YAAY;YAAG,yCAAC,CAAA;YAAE,yCAAC,CAAA;YAAE,yCAAC,CAAA;QAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;IACtD,CAAC,EATgB,OAAO,GAAP,eAAO,KAAP,eAAO,QASvB;IACD,aAAa,CAAC;QAAA;QAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,8BAAS;IACpC,aAAa,CAAC,SAAgB,WAAW,KAAI,CAAC;IAAhC,kCAAgC;IAC9C,aAAa,CAAC,IAAiB,iBAAiB,CAA8B;IAAhE,WAAiB,iBAAiB;QAAG;YAAA;YAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,2BAAS,YAAG,CAAA;IAAC,CAAC,EAA/C,iBAAiB,GAAjB,yBAAiB,KAAjB,yBAAiB,QAA8B;IAC9E,aAAa,CAAC,IAAiB,aAAa,CAAwC;IAAtE,WAAiB,aAAa;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS;YAAG;gBAAA;gBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;IAAD,CAAC,EAArD,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAwC;IACpF,aAAa,CAAe,QAAA,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;IAEzE,aAAa,CAAc,QAAA,aAAa,GAAG,EAAE,CAAC;IAC9C,aAAa,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;IAAA,OAAO,CAAC,GAAG,CAAC,SAAC,CAAC,CAAC;;;;;ICzBpD,QAAA,CAAC,GAAG,EAAE,CAAC;;ACApB,IAAM,WAAW,GAAG,EAAE,CAAC"}

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
>>>    exports.x = 10;
1->^^^^
2 >    ^^^^^^^^
3 >            ^
4 >             ^^^
5 >                ^^
6 >                  ^
7 >                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->export const 
2 >    
3 >            x
4 >              = 
5 >                10
6 >                  ;
1->Emitted(5, 5) Source(1, 14) + SourceIndex(1)
2 >Emitted(5, 13) Source(1, 14) + SourceIndex(1)
3 >Emitted(5, 14) Source(1, 15) + SourceIndex(1)
4 >Emitted(5, 17) Source(1, 18) + SourceIndex(1)
5 >Emitted(5, 19) Source(1, 20) + SourceIndex(1)
6 >Emitted(5, 20) Source(1, 21) + SourceIndex(1)
---
>>>    var normalC = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
1->Emitted(6, 5) Source(2, 1) + SourceIndex(1)
---
>>>        /*@internal*/ function normalC() {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^
1->export class normalC {
  >    
2 >        /*@internal*/
3 >                      
1->Emitted(7, 9) Source(3, 5) + SourceIndex(1)
2 >Emitted(7, 22) Source(3, 18) + SourceIndex(1)
3 >Emitted(7, 23) Source(3, 19) + SourceIndex(1)
---
>>>        }
1 >^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >constructor() { 
2 >        }
1 >Emitted(8, 9) Source(3, 35) + SourceIndex(1)
2 >Emitted(8, 10) Source(3, 36) + SourceIndex(1)
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
1->Emitted(9, 9) Source(5, 5) + SourceIndex(1)
2 >Emitted(9, 22) Source(5, 18) + SourceIndex(1)
3 >Emitted(9, 23) Source(5, 19) + SourceIndex(1)
4 >Emitted(9, 47) Source(5, 25) + SourceIndex(1)
5 >Emitted(9, 50) Source(5, 19) + SourceIndex(1)
6 >Emitted(9, 64) Source(5, 30) + SourceIndex(1)
7 >Emitted(9, 65) Source(5, 31) + SourceIndex(1)
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
1 >Emitted(10, 9) Source(6, 19) + SourceIndex(1)
2 >Emitted(10, 31) Source(6, 23) + SourceIndex(1)
3 >Emitted(10, 53) Source(6, 24) + SourceIndex(1)
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
1->Emitted(11, 13) Source(6, 5) + SourceIndex(1)
2 >Emitted(11, 26) Source(6, 18) + SourceIndex(1)
3 >Emitted(11, 32) Source(6, 19) + SourceIndex(1)
4 >Emitted(11, 46) Source(6, 29) + SourceIndex(1)
5 >Emitted(11, 53) Source(6, 36) + SourceIndex(1)
6 >Emitted(11, 55) Source(6, 38) + SourceIndex(1)
7 >Emitted(11, 56) Source(6, 39) + SourceIndex(1)
8 >Emitted(11, 57) Source(6, 40) + SourceIndex(1)
9 >Emitted(11, 58) Source(6, 41) + SourceIndex(1)
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
1 >Emitted(12, 13) Source(7, 5) + SourceIndex(1)
2 >Emitted(12, 26) Source(7, 18) + SourceIndex(1)
3 >Emitted(12, 32) Source(7, 19) + SourceIndex(1)
4 >Emitted(12, 42) Source(7, 25) + SourceIndex(1)
5 >Emitted(12, 45) Source(7, 36) + SourceIndex(1)
6 >Emitted(12, 49) Source(7, 40) + SourceIndex(1)
7 >Emitted(12, 50) Source(7, 41) + SourceIndex(1)
---
>>>            enumerable: true,
>>>            configurable: true
>>>        });
1 >^^^^^^^^^^^
2 >           ^^^^^^^^^^^^^->
1 >
1 >Emitted(15, 12) Source(6, 41) + SourceIndex(1)
---
>>>        return normalC;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >        }
1->Emitted(16, 9) Source(8, 1) + SourceIndex(1)
2 >Emitted(16, 23) Source(8, 2) + SourceIndex(1)
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
1 >Emitted(17, 5) Source(8, 1) + SourceIndex(1)
2 >Emitted(17, 6) Source(8, 2) + SourceIndex(1)
3 >Emitted(17, 6) Source(2, 1) + SourceIndex(1)
4 >Emitted(17, 10) Source(8, 2) + SourceIndex(1)
---
>>>    exports.normalC = normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^
1->
2 >    normalC
1->Emitted(18, 5) Source(2, 14) + SourceIndex(1)
2 >Emitted(18, 31) Source(2, 21) + SourceIndex(1)
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
1 >Emitted(19, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(19, 9) Source(9, 18) + SourceIndex(1)
3 >Emitted(19, 16) Source(9, 25) + SourceIndex(1)
4 >Emitted(19, 17) Source(18, 2) + SourceIndex(1)
---
>>>    (function (normalN) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^
4 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export namespace 
3 >               normalN
1->Emitted(20, 5) Source(9, 1) + SourceIndex(1)
2 >Emitted(20, 16) Source(9, 18) + SourceIndex(1)
3 >Emitted(20, 23) Source(9, 25) + SourceIndex(1)
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
1->Emitted(21, 9) Source(10, 5) + SourceIndex(1)
2 >Emitted(21, 22) Source(10, 18) + SourceIndex(1)
3 >Emitted(21, 23) Source(10, 19) + SourceIndex(1)
---
>>>            function C() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(22, 13) Source(10, 19) + SourceIndex(1)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^->
1->export class C { 
2 >            }
1->Emitted(23, 13) Source(10, 36) + SourceIndex(1)
2 >Emitted(23, 14) Source(10, 37) + SourceIndex(1)
---
>>>            return C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^
1->
2 >            }
1->Emitted(24, 13) Source(10, 36) + SourceIndex(1)
2 >Emitted(24, 21) Source(10, 37) + SourceIndex(1)
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
1 >Emitted(25, 9) Source(10, 36) + SourceIndex(1)
2 >Emitted(25, 10) Source(10, 37) + SourceIndex(1)
3 >Emitted(25, 10) Source(10, 19) + SourceIndex(1)
4 >Emitted(25, 14) Source(10, 37) + SourceIndex(1)
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
1->Emitted(26, 9) Source(10, 32) + SourceIndex(1)
2 >Emitted(26, 18) Source(10, 33) + SourceIndex(1)
3 >Emitted(26, 22) Source(10, 37) + SourceIndex(1)
4 >Emitted(26, 23) Source(10, 37) + SourceIndex(1)
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
1->Emitted(27, 9) Source(11, 5) + SourceIndex(1)
2 >Emitted(27, 22) Source(11, 18) + SourceIndex(1)
3 >Emitted(27, 23) Source(11, 19) + SourceIndex(1)
4 >Emitted(27, 32) Source(11, 35) + SourceIndex(1)
5 >Emitted(27, 35) Source(11, 38) + SourceIndex(1)
6 >Emitted(27, 40) Source(11, 42) + SourceIndex(1)
7 >Emitted(27, 41) Source(11, 43) + SourceIndex(1)
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
1 >Emitted(28, 9) Source(11, 35) + SourceIndex(1)
2 >Emitted(28, 20) Source(11, 38) + SourceIndex(1)
3 >Emitted(28, 26) Source(11, 43) + SourceIndex(1)
4 >Emitted(28, 27) Source(11, 43) + SourceIndex(1)
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
1->Emitted(29, 9) Source(12, 5) + SourceIndex(1)
2 >Emitted(29, 22) Source(12, 18) + SourceIndex(1)
3 >Emitted(29, 23) Source(12, 19) + SourceIndex(1)
4 >Emitted(29, 27) Source(12, 36) + SourceIndex(1)
5 >Emitted(29, 40) Source(12, 49) + SourceIndex(1)
6 >Emitted(29, 41) Source(12, 71) + SourceIndex(1)
---
>>>        (function (someNamespace) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^->
1 >
2 >        export namespace 
3 >                   someNamespace
1 >Emitted(30, 9) Source(12, 19) + SourceIndex(1)
2 >Emitted(30, 20) Source(12, 36) + SourceIndex(1)
3 >Emitted(30, 33) Source(12, 49) + SourceIndex(1)
---
>>>            var C = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(31, 13) Source(12, 52) + SourceIndex(1)
---
>>>                function C() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(32, 17) Source(12, 52) + SourceIndex(1)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^->
1->export class C {
2 >                }
1->Emitted(33, 17) Source(12, 68) + SourceIndex(1)
2 >Emitted(33, 18) Source(12, 69) + SourceIndex(1)
---
>>>                return C;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^
1->
2 >                }
1->Emitted(34, 17) Source(12, 68) + SourceIndex(1)
2 >Emitted(34, 25) Source(12, 69) + SourceIndex(1)
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
1 >Emitted(35, 13) Source(12, 68) + SourceIndex(1)
2 >Emitted(35, 14) Source(12, 69) + SourceIndex(1)
3 >Emitted(35, 14) Source(12, 52) + SourceIndex(1)
4 >Emitted(35, 18) Source(12, 69) + SourceIndex(1)
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
1->Emitted(36, 13) Source(12, 65) + SourceIndex(1)
2 >Emitted(36, 28) Source(12, 66) + SourceIndex(1)
3 >Emitted(36, 32) Source(12, 69) + SourceIndex(1)
4 >Emitted(36, 33) Source(12, 69) + SourceIndex(1)
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
1->Emitted(37, 9) Source(12, 70) + SourceIndex(1)
2 >Emitted(37, 10) Source(12, 71) + SourceIndex(1)
3 >Emitted(37, 12) Source(12, 36) + SourceIndex(1)
4 >Emitted(37, 25) Source(12, 49) + SourceIndex(1)
5 >Emitted(37, 28) Source(12, 36) + SourceIndex(1)
6 >Emitted(37, 49) Source(12, 49) + SourceIndex(1)
7 >Emitted(37, 54) Source(12, 36) + SourceIndex(1)
8 >Emitted(37, 75) Source(12, 49) + SourceIndex(1)
9 >Emitted(37, 83) Source(12, 71) + SourceIndex(1)
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
1 >Emitted(38, 9) Source(13, 5) + SourceIndex(1)
2 >Emitted(38, 22) Source(13, 18) + SourceIndex(1)
3 >Emitted(38, 23) Source(13, 19) + SourceIndex(1)
4 >Emitted(38, 27) Source(13, 36) + SourceIndex(1)
5 >Emitted(38, 36) Source(13, 45) + SourceIndex(1)
6 >Emitted(38, 37) Source(13, 85) + SourceIndex(1)
---
>>>        (function (someOther) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
1 >
2 >        export namespace 
3 >                   someOther
1 >Emitted(39, 9) Source(13, 19) + SourceIndex(1)
2 >Emitted(39, 20) Source(13, 36) + SourceIndex(1)
3 >Emitted(39, 29) Source(13, 45) + SourceIndex(1)
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
1 >Emitted(40, 13) Source(13, 46) + SourceIndex(1)
2 >Emitted(40, 17) Source(13, 46) + SourceIndex(1)
3 >Emitted(40, 26) Source(13, 55) + SourceIndex(1)
4 >Emitted(40, 27) Source(13, 85) + SourceIndex(1)
---
>>>            (function (something) {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^
3 >                       ^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            
3 >                       something
1->Emitted(41, 13) Source(13, 46) + SourceIndex(1)
2 >Emitted(41, 24) Source(13, 46) + SourceIndex(1)
3 >Emitted(41, 33) Source(13, 55) + SourceIndex(1)
---
>>>                var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(42, 17) Source(13, 58) + SourceIndex(1)
---
>>>                    function someClass() {
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^^->
1->
1->Emitted(43, 21) Source(13, 58) + SourceIndex(1)
---
>>>                    }
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^
3 >                     ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                    }
1->Emitted(44, 21) Source(13, 82) + SourceIndex(1)
2 >Emitted(44, 22) Source(13, 83) + SourceIndex(1)
---
>>>                    return someClass;
1->^^^^^^^^^^^^^^^^^^^^
2 >                    ^^^^^^^^^^^^^^^^
1->
2 >                    }
1->Emitted(45, 21) Source(13, 82) + SourceIndex(1)
2 >Emitted(45, 37) Source(13, 83) + SourceIndex(1)
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
1 >Emitted(46, 17) Source(13, 82) + SourceIndex(1)
2 >Emitted(46, 18) Source(13, 83) + SourceIndex(1)
3 >Emitted(46, 18) Source(13, 58) + SourceIndex(1)
4 >Emitted(46, 22) Source(13, 83) + SourceIndex(1)
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
1->Emitted(47, 17) Source(13, 71) + SourceIndex(1)
2 >Emitted(47, 36) Source(13, 80) + SourceIndex(1)
3 >Emitted(47, 48) Source(13, 83) + SourceIndex(1)
4 >Emitted(47, 49) Source(13, 83) + SourceIndex(1)
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
1->Emitted(48, 13) Source(13, 84) + SourceIndex(1)
2 >Emitted(48, 14) Source(13, 85) + SourceIndex(1)
3 >Emitted(48, 16) Source(13, 46) + SourceIndex(1)
4 >Emitted(48, 25) Source(13, 55) + SourceIndex(1)
5 >Emitted(48, 28) Source(13, 46) + SourceIndex(1)
6 >Emitted(48, 47) Source(13, 55) + SourceIndex(1)
7 >Emitted(48, 52) Source(13, 46) + SourceIndex(1)
8 >Emitted(48, 71) Source(13, 55) + SourceIndex(1)
9 >Emitted(48, 79) Source(13, 85) + SourceIndex(1)
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
1 >Emitted(49, 9) Source(13, 84) + SourceIndex(1)
2 >Emitted(49, 10) Source(13, 85) + SourceIndex(1)
3 >Emitted(49, 12) Source(13, 36) + SourceIndex(1)
4 >Emitted(49, 21) Source(13, 45) + SourceIndex(1)
5 >Emitted(49, 24) Source(13, 36) + SourceIndex(1)
6 >Emitted(49, 41) Source(13, 45) + SourceIndex(1)
7 >Emitted(49, 46) Source(13, 36) + SourceIndex(1)
8 >Emitted(49, 63) Source(13, 45) + SourceIndex(1)
9 >Emitted(49, 71) Source(13, 85) + SourceIndex(1)
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
1 >Emitted(50, 9) Source(14, 5) + SourceIndex(1)
2 >Emitted(50, 22) Source(14, 18) + SourceIndex(1)
3 >Emitted(50, 23) Source(14, 33) + SourceIndex(1)
4 >Emitted(50, 41) Source(14, 43) + SourceIndex(1)
5 >Emitted(50, 44) Source(14, 46) + SourceIndex(1)
6 >Emitted(50, 57) Source(14, 59) + SourceIndex(1)
7 >Emitted(50, 58) Source(14, 60) + SourceIndex(1)
8 >Emitted(50, 59) Source(14, 61) + SourceIndex(1)
9 >Emitted(50, 60) Source(14, 62) + SourceIndex(1)
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
1 >Emitted(51, 9) Source(16, 5) + SourceIndex(1)
2 >Emitted(51, 22) Source(16, 18) + SourceIndex(1)
3 >Emitted(51, 23) Source(16, 32) + SourceIndex(1)
4 >Emitted(51, 44) Source(16, 45) + SourceIndex(1)
5 >Emitted(51, 47) Source(16, 48) + SourceIndex(1)
6 >Emitted(51, 49) Source(16, 50) + SourceIndex(1)
7 >Emitted(51, 50) Source(16, 51) + SourceIndex(1)
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
1 >Emitted(52, 9) Source(17, 5) + SourceIndex(1)
2 >Emitted(52, 22) Source(17, 18) + SourceIndex(1)
3 >Emitted(52, 23) Source(17, 19) + SourceIndex(1)
4 >Emitted(52, 27) Source(17, 31) + SourceIndex(1)
5 >Emitted(52, 39) Source(17, 55) + SourceIndex(1)
---
>>>        (function (internalEnum) {
1 >^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^^^^
4 >                               ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        export enum 
3 >                   internalEnum
1 >Emitted(53, 9) Source(17, 19) + SourceIndex(1)
2 >Emitted(53, 20) Source(17, 31) + SourceIndex(1)
3 >Emitted(53, 32) Source(17, 43) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^->
1-> { 
2 >            a
3 >                                                     
1->Emitted(54, 13) Source(17, 46) + SourceIndex(1)
2 >Emitted(54, 54) Source(17, 47) + SourceIndex(1)
3 >Emitted(54, 55) Source(17, 47) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^->
1->, 
2 >            b
3 >                                                     
1->Emitted(55, 13) Source(17, 49) + SourceIndex(1)
2 >Emitted(55, 54) Source(17, 50) + SourceIndex(1)
3 >Emitted(55, 55) Source(17, 50) + SourceIndex(1)
---
>>>            internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                     ^
4 >                                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >            c
3 >                                                     
1->Emitted(56, 13) Source(17, 52) + SourceIndex(1)
2 >Emitted(56, 54) Source(17, 53) + SourceIndex(1)
3 >Emitted(56, 55) Source(17, 53) + SourceIndex(1)
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
1->Emitted(57, 9) Source(17, 54) + SourceIndex(1)
2 >Emitted(57, 10) Source(17, 55) + SourceIndex(1)
3 >Emitted(57, 12) Source(17, 31) + SourceIndex(1)
4 >Emitted(57, 24) Source(17, 43) + SourceIndex(1)
5 >Emitted(57, 27) Source(17, 31) + SourceIndex(1)
6 >Emitted(57, 47) Source(17, 43) + SourceIndex(1)
7 >Emitted(57, 52) Source(17, 31) + SourceIndex(1)
8 >Emitted(57, 72) Source(17, 43) + SourceIndex(1)
9 >Emitted(57, 80) Source(17, 55) + SourceIndex(1)
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
1 >Emitted(58, 5) Source(18, 1) + SourceIndex(1)
2 >Emitted(58, 6) Source(18, 2) + SourceIndex(1)
3 >Emitted(58, 8) Source(9, 18) + SourceIndex(1)
4 >Emitted(58, 15) Source(9, 25) + SourceIndex(1)
5 >Emitted(58, 18) Source(9, 18) + SourceIndex(1)
6 >Emitted(58, 33) Source(9, 25) + SourceIndex(1)
7 >Emitted(58, 38) Source(9, 18) + SourceIndex(1)
8 >Emitted(58, 53) Source(9, 25) + SourceIndex(1)
9 >Emitted(58, 61) Source(18, 2) + SourceIndex(1)
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
1->Emitted(59, 5) Source(19, 1) + SourceIndex(1)
2 >Emitted(59, 18) Source(19, 14) + SourceIndex(1)
3 >Emitted(59, 19) Source(19, 15) + SourceIndex(1)
---
>>>        function internalC() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(60, 9) Source(19, 15) + SourceIndex(1)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^->
1->export class internalC {
2 >        }
1->Emitted(61, 9) Source(19, 39) + SourceIndex(1)
2 >Emitted(61, 10) Source(19, 40) + SourceIndex(1)
---
>>>        return internalC;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1->
2 >        }
1->Emitted(62, 9) Source(19, 39) + SourceIndex(1)
2 >Emitted(62, 25) Source(19, 40) + SourceIndex(1)
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
1 >Emitted(63, 5) Source(19, 39) + SourceIndex(1)
2 >Emitted(63, 6) Source(19, 40) + SourceIndex(1)
3 >Emitted(63, 6) Source(19, 15) + SourceIndex(1)
4 >Emitted(63, 10) Source(19, 40) + SourceIndex(1)
---
>>>    exports.internalC = internalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^^^^^^^^^^^->
1->
2 >    internalC
1->Emitted(64, 5) Source(19, 28) + SourceIndex(1)
2 >Emitted(64, 35) Source(19, 37) + SourceIndex(1)
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
1->Emitted(65, 5) Source(20, 1) + SourceIndex(1)
2 >Emitted(65, 18) Source(20, 14) + SourceIndex(1)
3 >Emitted(65, 19) Source(20, 15) + SourceIndex(1)
4 >Emitted(65, 28) Source(20, 31) + SourceIndex(1)
5 >Emitted(65, 39) Source(20, 42) + SourceIndex(1)
6 >Emitted(65, 44) Source(20, 46) + SourceIndex(1)
7 >Emitted(65, 45) Source(20, 47) + SourceIndex(1)
---
>>>    exports.internalfoo = internalfoo;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^^^->
1 >
2 >    export function internalfoo() {}
1 >Emitted(66, 5) Source(20, 15) + SourceIndex(1)
2 >Emitted(66, 39) Source(20, 47) + SourceIndex(1)
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
1->Emitted(67, 5) Source(21, 1) + SourceIndex(1)
2 >Emitted(67, 18) Source(21, 14) + SourceIndex(1)
3 >Emitted(67, 19) Source(21, 15) + SourceIndex(1)
4 >Emitted(67, 23) Source(21, 32) + SourceIndex(1)
5 >Emitted(67, 40) Source(21, 49) + SourceIndex(1)
6 >Emitted(67, 41) Source(21, 79) + SourceIndex(1)
---
>>>    (function (internalNamespace) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^^^^^
4 >                                ^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export namespace 
3 >               internalNamespace
1 >Emitted(68, 5) Source(21, 15) + SourceIndex(1)
2 >Emitted(68, 16) Source(21, 32) + SourceIndex(1)
3 >Emitted(68, 33) Source(21, 49) + SourceIndex(1)
---
>>>        var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(69, 9) Source(21, 52) + SourceIndex(1)
---
>>>            function someClass() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(70, 13) Source(21, 52) + SourceIndex(1)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >            }
1->Emitted(71, 13) Source(21, 76) + SourceIndex(1)
2 >Emitted(71, 14) Source(21, 77) + SourceIndex(1)
---
>>>            return someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1->
2 >            }
1->Emitted(72, 13) Source(21, 76) + SourceIndex(1)
2 >Emitted(72, 29) Source(21, 77) + SourceIndex(1)
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
1 >Emitted(73, 9) Source(21, 76) + SourceIndex(1)
2 >Emitted(73, 10) Source(21, 77) + SourceIndex(1)
3 >Emitted(73, 10) Source(21, 52) + SourceIndex(1)
4 >Emitted(73, 14) Source(21, 77) + SourceIndex(1)
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
1->Emitted(74, 9) Source(21, 65) + SourceIndex(1)
2 >Emitted(74, 36) Source(21, 74) + SourceIndex(1)
3 >Emitted(74, 48) Source(21, 77) + SourceIndex(1)
4 >Emitted(74, 49) Source(21, 77) + SourceIndex(1)
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
1->Emitted(75, 5) Source(21, 78) + SourceIndex(1)
2 >Emitted(75, 6) Source(21, 79) + SourceIndex(1)
3 >Emitted(75, 8) Source(21, 32) + SourceIndex(1)
4 >Emitted(75, 25) Source(21, 49) + SourceIndex(1)
5 >Emitted(75, 28) Source(21, 32) + SourceIndex(1)
6 >Emitted(75, 53) Source(21, 49) + SourceIndex(1)
7 >Emitted(75, 58) Source(21, 32) + SourceIndex(1)
8 >Emitted(75, 83) Source(21, 49) + SourceIndex(1)
9 >Emitted(75, 91) Source(21, 79) + SourceIndex(1)
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
1 >Emitted(76, 5) Source(22, 1) + SourceIndex(1)
2 >Emitted(76, 18) Source(22, 14) + SourceIndex(1)
3 >Emitted(76, 19) Source(22, 15) + SourceIndex(1)
4 >Emitted(76, 23) Source(22, 32) + SourceIndex(1)
5 >Emitted(76, 36) Source(22, 45) + SourceIndex(1)
6 >Emitted(76, 37) Source(22, 85) + SourceIndex(1)
---
>>>    (function (internalOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
1 >
2 >    export namespace 
3 >               internalOther
1 >Emitted(77, 5) Source(22, 15) + SourceIndex(1)
2 >Emitted(77, 16) Source(22, 32) + SourceIndex(1)
3 >Emitted(77, 29) Source(22, 45) + SourceIndex(1)
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
1 >Emitted(78, 9) Source(22, 46) + SourceIndex(1)
2 >Emitted(78, 13) Source(22, 46) + SourceIndex(1)
3 >Emitted(78, 22) Source(22, 55) + SourceIndex(1)
4 >Emitted(78, 23) Source(22, 85) + SourceIndex(1)
---
>>>        (function (something) {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        
3 >                   something
1->Emitted(79, 9) Source(22, 46) + SourceIndex(1)
2 >Emitted(79, 20) Source(22, 46) + SourceIndex(1)
3 >Emitted(79, 29) Source(22, 55) + SourceIndex(1)
---
>>>            var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(80, 13) Source(22, 58) + SourceIndex(1)
---
>>>                function someClass() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(81, 17) Source(22, 58) + SourceIndex(1)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                }
1->Emitted(82, 17) Source(22, 82) + SourceIndex(1)
2 >Emitted(82, 18) Source(22, 83) + SourceIndex(1)
---
>>>                return someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1->
2 >                }
1->Emitted(83, 17) Source(22, 82) + SourceIndex(1)
2 >Emitted(83, 33) Source(22, 83) + SourceIndex(1)
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
1 >Emitted(84, 13) Source(22, 82) + SourceIndex(1)
2 >Emitted(84, 14) Source(22, 83) + SourceIndex(1)
3 >Emitted(84, 14) Source(22, 58) + SourceIndex(1)
4 >Emitted(84, 18) Source(22, 83) + SourceIndex(1)
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
1->Emitted(85, 13) Source(22, 71) + SourceIndex(1)
2 >Emitted(85, 32) Source(22, 80) + SourceIndex(1)
3 >Emitted(85, 44) Source(22, 83) + SourceIndex(1)
4 >Emitted(85, 45) Source(22, 83) + SourceIndex(1)
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
1->Emitted(86, 9) Source(22, 84) + SourceIndex(1)
2 >Emitted(86, 10) Source(22, 85) + SourceIndex(1)
3 >Emitted(86, 12) Source(22, 46) + SourceIndex(1)
4 >Emitted(86, 21) Source(22, 55) + SourceIndex(1)
5 >Emitted(86, 24) Source(22, 46) + SourceIndex(1)
6 >Emitted(86, 47) Source(22, 55) + SourceIndex(1)
7 >Emitted(86, 52) Source(22, 46) + SourceIndex(1)
8 >Emitted(86, 75) Source(22, 55) + SourceIndex(1)
9 >Emitted(86, 83) Source(22, 85) + SourceIndex(1)
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
1 >Emitted(87, 5) Source(22, 84) + SourceIndex(1)
2 >Emitted(87, 6) Source(22, 85) + SourceIndex(1)
3 >Emitted(87, 8) Source(22, 32) + SourceIndex(1)
4 >Emitted(87, 21) Source(22, 45) + SourceIndex(1)
5 >Emitted(87, 24) Source(22, 32) + SourceIndex(1)
6 >Emitted(87, 45) Source(22, 45) + SourceIndex(1)
7 >Emitted(87, 50) Source(22, 32) + SourceIndex(1)
8 >Emitted(87, 71) Source(22, 45) + SourceIndex(1)
9 >Emitted(87, 79) Source(22, 85) + SourceIndex(1)
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
1 >Emitted(88, 5) Source(23, 1) + SourceIndex(1)
2 >Emitted(88, 18) Source(23, 14) + SourceIndex(1)
3 >Emitted(88, 19) Source(23, 29) + SourceIndex(1)
4 >Emitted(88, 27) Source(23, 29) + SourceIndex(1)
5 >Emitted(88, 41) Source(23, 43) + SourceIndex(1)
6 >Emitted(88, 44) Source(23, 46) + SourceIndex(1)
7 >Emitted(88, 61) Source(23, 63) + SourceIndex(1)
8 >Emitted(88, 62) Source(23, 64) + SourceIndex(1)
9 >Emitted(88, 71) Source(23, 73) + SourceIndex(1)
10>Emitted(88, 72) Source(23, 74) + SourceIndex(1)
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
1 >Emitted(89, 5) Source(25, 1) + SourceIndex(1)
2 >Emitted(89, 18) Source(25, 14) + SourceIndex(1)
3 >Emitted(89, 19) Source(25, 28) + SourceIndex(1)
4 >Emitted(89, 27) Source(25, 28) + SourceIndex(1)
5 >Emitted(89, 40) Source(25, 41) + SourceIndex(1)
6 >Emitted(89, 43) Source(25, 44) + SourceIndex(1)
7 >Emitted(89, 45) Source(25, 46) + SourceIndex(1)
8 >Emitted(89, 46) Source(25, 47) + SourceIndex(1)
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
1 >Emitted(90, 5) Source(26, 1) + SourceIndex(1)
2 >Emitted(90, 18) Source(26, 14) + SourceIndex(1)
3 >Emitted(90, 19) Source(26, 15) + SourceIndex(1)
4 >Emitted(90, 23) Source(26, 27) + SourceIndex(1)
5 >Emitted(90, 35) Source(26, 51) + SourceIndex(1)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(91, 5) Source(26, 15) + SourceIndex(1)
2 >Emitted(91, 16) Source(26, 27) + SourceIndex(1)
3 >Emitted(91, 28) Source(26, 39) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(92, 9) Source(26, 42) + SourceIndex(1)
2 >Emitted(92, 50) Source(26, 43) + SourceIndex(1)
3 >Emitted(92, 51) Source(26, 43) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(93, 9) Source(26, 45) + SourceIndex(1)
2 >Emitted(93, 50) Source(26, 46) + SourceIndex(1)
3 >Emitted(93, 51) Source(26, 46) + SourceIndex(1)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(94, 9) Source(26, 48) + SourceIndex(1)
2 >Emitted(94, 50) Source(26, 49) + SourceIndex(1)
3 >Emitted(94, 51) Source(26, 49) + SourceIndex(1)
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
1->Emitted(95, 5) Source(26, 50) + SourceIndex(1)
2 >Emitted(95, 6) Source(26, 51) + SourceIndex(1)
3 >Emitted(95, 8) Source(26, 27) + SourceIndex(1)
4 >Emitted(95, 20) Source(26, 39) + SourceIndex(1)
5 >Emitted(95, 23) Source(26, 27) + SourceIndex(1)
6 >Emitted(95, 43) Source(26, 39) + SourceIndex(1)
7 >Emitted(95, 48) Source(26, 27) + SourceIndex(1)
8 >Emitted(95, 68) Source(26, 39) + SourceIndex(1)
9 >Emitted(95, 76) Source(26, 51) + SourceIndex(1)
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
1 >Emitted(96, 5) Source(26, 51) + SourceIndex(1)
2 >Emitted(96, 12) Source(26, 58) + SourceIndex(1)
3 >Emitted(96, 13) Source(26, 59) + SourceIndex(1)
4 >Emitted(96, 16) Source(26, 62) + SourceIndex(1)
5 >Emitted(96, 17) Source(26, 63) + SourceIndex(1)
6 >Emitted(96, 26) Source(26, 64) + SourceIndex(1)
7 >Emitted(96, 27) Source(26, 65) + SourceIndex(1)
8 >Emitted(96, 28) Source(26, 66) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/lib/module.js
sourceFile:file2.ts
-------------------------------------------------------------------
>>>});
>>>define("file2", ["require", "exports"], function (require, exports) {
>>>    "use strict";
>>>    Object.defineProperty(exports, "__esModule", { value: true });
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
1 >Emitted(101, 5) Source(1, 14) + SourceIndex(2)
2 >Emitted(101, 13) Source(1, 14) + SourceIndex(2)
3 >Emitted(101, 14) Source(1, 15) + SourceIndex(2)
4 >Emitted(101, 17) Source(1, 18) + SourceIndex(2)
5 >Emitted(101, 19) Source(1, 20) + SourceIndex(2)
6 >Emitted(101, 20) Source(1, 21) + SourceIndex(2)
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
1 >Emitted(103, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(103, 5) Source(1, 7) + SourceIndex(3)
3 >Emitted(103, 16) Source(1, 18) + SourceIndex(3)
4 >Emitted(103, 19) Source(1, 21) + SourceIndex(3)
5 >Emitted(103, 21) Source(1, 23) + SourceIndex(3)
6 >Emitted(103, 22) Source(1, 24) + SourceIndex(3)
---
>>>//# sourceMappingURL=module.js.map

//// [/src/lib/module.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "/src/lib/",
    "sourceFiles": [
      "/src/lib/file0.ts",
      "/src/lib/file1.ts",
      "/src/lib/file2.ts",
      "/src/lib/global.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 4158,
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
          "end": 108,
          "kind": "text"
        },
        {
          "pos": 108,
          "end": 212,
          "kind": "internal"
        },
        {
          "pos": 214,
          "end": 253,
          "kind": "text"
        },
        {
          "pos": 253,
          "end": 721,
          "kind": "internal"
        },
        {
          "pos": 723,
          "end": 730,
          "kind": "text"
        },
        {
          "pos": 730,
          "end": 1219,
          "kind": "internal"
        },
        {
          "pos": 1221,
          "end": 1312,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/lib/module.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/lib/module.js
----------------------------------------------------------------------
text: (0-4158)
/*@internal*/ var myGlob = 20;
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = 10;
    var normalC = /** @class */ (function () {
        /*@internal*/ function normalC() {
        }
        /*@internal*/ normalC.prototype.method = function () { };
        Object.defineProperty(normalC.prototype, "c", {
            /*@internal*/ get: function () { return 10; },
            /*@internal*/ set: function (val) { },
            enumerable: true,
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
    console.log(exports.x);
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
text: (28-108)
declare module "file1" {
    export const x = 10;
    export class normalC {

----------------------------------------------------------------------
internal: (108-212)
        constructor();
        prop: string;
        method(): void;
        /*@internal*/ c: number;
----------------------------------------------------------------------
text: (214-253)
    }
    export namespace normalN {

----------------------------------------------------------------------
internal: (253-721)
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
text: (723-730)
    }

----------------------------------------------------------------------
internal: (730-1219)
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
text: (1221-1312)
}
declare module "file2" {
    export const y = 20;
}
declare const globalConst = 10;

======================================================================

