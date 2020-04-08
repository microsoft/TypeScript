//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
/lib/tsc --b /src/third --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because oldest output 'src/first/bin/first-output.js' is older than newest input 'src/first/first_PART1.ts'

[[90m12:04:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:04:00 AM[0m] Project 'src/second/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:04:00 AM[0m] Updating output of project '/src/second/tsconfig.json'...

[[90m12:04:00 AM[0m] Updating unchanged output timestamps of project '/src/second/tsconfig.json'...

[[90m12:04:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/second' has changed

[[90m12:04:00 AM[0m] Updating output of project '/src/third/tsconfig.json'...

[[90m12:04:00 AM[0m] Updating unchanged output timestamps of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/2/second-output.js]
/*@internal*/ 

var s = "Hello, world";


console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
var N;
(function (N) {
    function f() {
        console.log('testing');
    }

    f();
})(N || (N = {}));
var normalC = /** @class */ (function () {
    /*@internal*/ function normalC() {}

    /*@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /*@internal*/ get: function () { return 10; },
        /*@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /*@internal*/ var C = /** @class */ (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    /*@internal*/ function foo() { }
    normalN.foo = foo;
    /*@internal*/ var someNamespace;
    (function (someNamespace) {var C = /** @class */ (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /*@internal*/ var someOther;
    (function (someOther) {
        var something;
        (function (something) {var someClass = /** @class */ (function () {
                function someClass() {}
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
})(normalN || (normalN = {}));
/*@internal*/ var internalC = /** @class */ (function () {
    function internalC() {}
    return internalC;
}());
/*@internal*/ function internalfoo() { }
/*@internal*/ var internalNamespace;
(function (internalNamespace) {var someClass = /** @class */ (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/*@internal*/ var internalOther;
(function (internalOther) {
    var something;
    (function (something) {var someClass = /** @class */ (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
/*@internal*/ var internalImport = internalNamespace.someClass;

/*@internal*/ var internalConst = 10;
/*@internal*/ var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../first/first_PART1.ts","../first/first_part2.ts","../first/first_part3.ts","../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,aAAa;;AAIb,IAAM,CAAC,GAAG,cAAc,CAAC;;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACI,aAAa,CAAC,oBAAgB,CAAC;;IAE/B,aAAa,CAAC,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;QAAnB,aAAa,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;QACpC,aAAa,MAAC,UAAM,GAAW,IAAI,CAAC;;;OADA;IAExC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACb,aAAa,CAAC;QAAA,cAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAChC,aAAa,CAAC,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACtC,aAAa,CAAC,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa,GAAG;YAAA,cAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IAClE,aAAa,CAAC,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS,GAAG;gBAAA,sBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IAChF,aAAa,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;;IAEzD,aAAa,CAAc,qBAAa,GAAG,EAAE,CAAC;IAC9C,aAAa,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACtD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACD,aAAa,CAAC;IAAA,sBAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAChC,aAAa,CAAC,SAAS,WAAW,KAAI,CAAC;AACvC,aAAa,CAAC,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB,GAAG;QAAA,sBAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACvE,aAAa,CAAC,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS,GAAG;YAAA,sBAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC7E,aAAa,CAAC,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;;AAElE,aAAa,CAAC,IAAM,aAAa,GAAG,EAAE,CAAC;AACvC,aAAa,CAAC,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAA;IAAE,yCAAC,CAAA;IAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC3C;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

//// [/src/2/second-output.js.map.baseline.txt]
===================================================================
JsFile: second-output.js
mapUrl: second-output.js.map
sourceRoot: 
sources: ../first/first_PART1.ts,../first/first_part2.ts,../first/first_part3.ts,../second/second_part1.ts,../second/second_part2.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../first/first_PART1.ts
-------------------------------------------------------------------
>>>/*@internal*/ 
1 >
2 >^^^^^^^^^^^^^
1 >
2 >/*@internal*/
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 14) Source(1, 14) + SourceIndex(0)
---
>>>
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 > interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(3, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(3, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(3, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(3, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(3, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(3, 24) Source(5, 26) + SourceIndex(0)
---
>>>
>>>
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
1 >Emitted(6, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(7, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(7, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(7, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(7, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(7, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(7, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(7, 16) Source(12, 16) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../first/first_part2.ts
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
1->Emitted(8, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(8, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(8, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(8, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(8, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(8, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(8, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(8, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(8, 18) Source(1, 18) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../first/first_part3.ts
-------------------------------------------------------------------
>>>function f() {
1 >
2 >^^^^^^^^^
3 >         ^
4 >          ^^^^^^^^^^^^^^^^^^^->
1 >
2 >function 
3 >         f
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(9, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(9, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(10, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(10, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(10, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(10, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(11, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(11, 2) Source(3, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part1.ts
-------------------------------------------------------------------
>>>var N;
1->
2 >^^^^
3 >    ^
4 >     ^
5 >      ^^^^^^^^^^->
1->namespace N {
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
1->Emitted(12, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(12, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(12, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(12, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(13, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(13, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(13, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(14, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(14, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(14, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(15, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(15, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(15, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(15, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(15, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(15, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(15, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(15, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >    
2 >    }
1 >Emitted(16, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(16, 6) Source(8, 6) + SourceIndex(3)
---
>>>
>>>    f();
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^
5 >        ^^^^^^^^^^^->
1 >
  >
  >    
2 >    f
3 >     ()
4 >       ;
1 >Emitted(18, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(18, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(18, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(18, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(19, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(19, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(19, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(19, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(19, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(19, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(19, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(20, 1) Source(13, 1) + SourceIndex(3)
---
>>>    /*@internal*/ function normalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^
5 >                                      ^
1->class normalC {
  >    
2 >    /*@internal*/
3 >                  
4 >                  constructor() { 
5 >                                      }
1->Emitted(21, 5) Source(14, 5) + SourceIndex(3)
2 >Emitted(21, 18) Source(14, 18) + SourceIndex(3)
3 >Emitted(21, 19) Source(14, 19) + SourceIndex(3)
4 >Emitted(21, 39) Source(14, 35) + SourceIndex(3)
5 >Emitted(21, 40) Source(14, 36) + SourceIndex(3)
---
>>>
>>>    /*@internal*/ normalC.prototype.method = function () { };
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^^
6 >                                             ^^^^^^^^^^^^^^
7 >                                                           ^
1 >
  >    /*@internal*/ prop: string;
  >    
2 >    /*@internal*/
3 >                  
4 >                  method
5 >                                          
6 >                                             method() { 
7 >                                                           }
1 >Emitted(23, 5) Source(16, 5) + SourceIndex(3)
2 >Emitted(23, 18) Source(16, 18) + SourceIndex(3)
3 >Emitted(23, 19) Source(16, 19) + SourceIndex(3)
4 >Emitted(23, 43) Source(16, 25) + SourceIndex(3)
5 >Emitted(23, 46) Source(16, 19) + SourceIndex(3)
6 >Emitted(23, 60) Source(16, 30) + SourceIndex(3)
7 >Emitted(23, 61) Source(16, 31) + SourceIndex(3)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
4 >                                                ^^^^^^^->
1 >
  >    /*@internal*/ 
2 >    get 
3 >                          c
1 >Emitted(24, 5) Source(17, 19) + SourceIndex(3)
2 >Emitted(24, 27) Source(17, 23) + SourceIndex(3)
3 >Emitted(24, 49) Source(17, 24) + SourceIndex(3)
---
>>>        /*@internal*/ get: function () { return 10; },
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^^^^^^
4 >                           ^^^^^^^^^^^^^^
5 >                                         ^^^^^^^
6 >                                                ^^
7 >                                                  ^
8 >                                                   ^
9 >                                                    ^
1->
2 >        /*@internal*/
3 >                      
4 >                           get c() { 
5 >                                         return 
6 >                                                10
7 >                                                  ;
8 >                                                    
9 >                                                    }
1->Emitted(25, 9) Source(17, 5) + SourceIndex(3)
2 >Emitted(25, 22) Source(17, 18) + SourceIndex(3)
3 >Emitted(25, 28) Source(17, 19) + SourceIndex(3)
4 >Emitted(25, 42) Source(17, 29) + SourceIndex(3)
5 >Emitted(25, 49) Source(17, 36) + SourceIndex(3)
6 >Emitted(25, 51) Source(17, 38) + SourceIndex(3)
7 >Emitted(25, 52) Source(17, 39) + SourceIndex(3)
8 >Emitted(25, 53) Source(17, 40) + SourceIndex(3)
9 >Emitted(25, 54) Source(17, 41) + SourceIndex(3)
---
>>>        /*@internal*/ set: function (val) { },
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^^^^^^
4 >                           ^^^^^^^^^^
5 >                                     ^^^
6 >                                        ^^^^
7 >                                            ^
1 >
  >    
2 >        /*@internal*/
3 >                      
4 >                           set c(
5 >                                     val: number
6 >                                        ) { 
7 >                                            }
1 >Emitted(26, 9) Source(18, 5) + SourceIndex(3)
2 >Emitted(26, 22) Source(18, 18) + SourceIndex(3)
3 >Emitted(26, 28) Source(18, 19) + SourceIndex(3)
4 >Emitted(26, 38) Source(18, 25) + SourceIndex(3)
5 >Emitted(26, 41) Source(18, 36) + SourceIndex(3)
6 >Emitted(26, 45) Source(18, 40) + SourceIndex(3)
7 >Emitted(26, 46) Source(18, 41) + SourceIndex(3)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(29, 8) Source(17, 41) + SourceIndex(3)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(30, 5) Source(19, 1) + SourceIndex(3)
2 >Emitted(30, 19) Source(19, 2) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^->
1 >
2 >}
3 > 
4 > class normalC {
  >     /*@internal*/ constructor() { }
  >     /*@internal*/ prop: string;
  >     /*@internal*/ method() { }
  >     /*@internal*/ get c() { return 10; }
  >     /*@internal*/ set c(val: number) { }
  > }
1 >Emitted(31, 1) Source(19, 1) + SourceIndex(3)
2 >Emitted(31, 2) Source(19, 2) + SourceIndex(3)
3 >Emitted(31, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(31, 6) Source(19, 2) + SourceIndex(3)
---
>>>var normalN;
1->
2 >^^^^
3 >    ^^^^^^^
4 >           ^
5 >            ^^^^^^^^^^->
1->
  >
2 >namespace 
3 >    normalN
4 >            {
  >               /*@internal*/ export class C { }
  >               /*@internal*/ export function foo() {}
  >               /*@internal*/ export namespace someNamespace { export class C {} }
  >               /*@internal*/ export namespace someOther.something { export class someClass {} }
  >               /*@internal*/ export import someImport = someNamespace.C;
  >               /*@internal*/ export type internalType = internalC;
  >               /*@internal*/ export const internalConst = 10;
  >               /*@internal*/ export enum internalEnum { a, b, c }
  >           }
1->Emitted(32, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(32, 5) Source(20, 11) + SourceIndex(3)
3 >Emitted(32, 12) Source(20, 18) + SourceIndex(3)
4 >Emitted(32, 13) Source(29, 2) + SourceIndex(3)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(33, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(33, 12) Source(20, 11) + SourceIndex(3)
3 >Emitted(33, 19) Source(20, 18) + SourceIndex(3)
---
>>>    /*@internal*/ var C = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^->
1-> {
  >    
2 >    /*@internal*/
3 >                  
1->Emitted(34, 5) Source(21, 5) + SourceIndex(3)
2 >Emitted(34, 18) Source(21, 18) + SourceIndex(3)
3 >Emitted(34, 19) Source(21, 19) + SourceIndex(3)
---
>>>        function C() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^
1->
2 >        export class C { 
3 >                      }
1->Emitted(35, 9) Source(21, 19) + SourceIndex(3)
2 >Emitted(35, 23) Source(21, 36) + SourceIndex(3)
3 >Emitted(35, 24) Source(21, 37) + SourceIndex(3)
---
>>>        return C;
1 >^^^^^^^^
2 >        ^^^^^^^^
1 >
2 >        }
1 >Emitted(36, 9) Source(21, 36) + SourceIndex(3)
2 >Emitted(36, 17) Source(21, 37) + SourceIndex(3)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class C { }
1 >Emitted(37, 5) Source(21, 36) + SourceIndex(3)
2 >Emitted(37, 6) Source(21, 37) + SourceIndex(3)
3 >Emitted(37, 6) Source(21, 19) + SourceIndex(3)
4 >Emitted(37, 10) Source(21, 37) + SourceIndex(3)
---
>>>    normalN.C = C;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(38, 5) Source(21, 32) + SourceIndex(3)
2 >Emitted(38, 14) Source(21, 33) + SourceIndex(3)
3 >Emitted(38, 18) Source(21, 37) + SourceIndex(3)
4 >Emitted(38, 19) Source(21, 37) + SourceIndex(3)
---
>>>    /*@internal*/ function foo() { }
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^
5 >                           ^^^
6 >                              ^^^^^
7 >                                   ^
1->
  >    
2 >    /*@internal*/
3 >                  
4 >                  export function 
5 >                           foo
6 >                              () {
7 >                                   }
1->Emitted(39, 5) Source(22, 5) + SourceIndex(3)
2 >Emitted(39, 18) Source(22, 18) + SourceIndex(3)
3 >Emitted(39, 19) Source(22, 19) + SourceIndex(3)
4 >Emitted(39, 28) Source(22, 35) + SourceIndex(3)
5 >Emitted(39, 31) Source(22, 38) + SourceIndex(3)
6 >Emitted(39, 36) Source(22, 42) + SourceIndex(3)
7 >Emitted(39, 37) Source(22, 43) + SourceIndex(3)
---
>>>    normalN.foo = foo;
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^->
1 >
2 >    foo
3 >               () {}
4 >                     
1 >Emitted(40, 5) Source(22, 35) + SourceIndex(3)
2 >Emitted(40, 16) Source(22, 38) + SourceIndex(3)
3 >Emitted(40, 22) Source(22, 43) + SourceIndex(3)
4 >Emitted(40, 23) Source(22, 43) + SourceIndex(3)
---
>>>    /*@internal*/ var someNamespace;
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^^
6 >                                   ^
7 >                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >    
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      someNamespace
6 >                                    { export class C {} }
1->Emitted(41, 5) Source(23, 5) + SourceIndex(3)
2 >Emitted(41, 18) Source(23, 18) + SourceIndex(3)
3 >Emitted(41, 19) Source(23, 19) + SourceIndex(3)
4 >Emitted(41, 23) Source(23, 36) + SourceIndex(3)
5 >Emitted(41, 36) Source(23, 49) + SourceIndex(3)
6 >Emitted(41, 37) Source(23, 71) + SourceIndex(3)
---
>>>    (function (someNamespace) {var C = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
4 >                            ^^^
1->
2 >    export namespace 
3 >               someNamespace
4 >                             { 
1->Emitted(42, 5) Source(23, 19) + SourceIndex(3)
2 >Emitted(42, 16) Source(23, 36) + SourceIndex(3)
3 >Emitted(42, 29) Source(23, 49) + SourceIndex(3)
4 >Emitted(42, 32) Source(23, 52) + SourceIndex(3)
---
>>>            function C() {}
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^
3 >                          ^
1 >
2 >            export class C {
3 >                          }
1 >Emitted(43, 13) Source(23, 52) + SourceIndex(3)
2 >Emitted(43, 27) Source(23, 68) + SourceIndex(3)
3 >Emitted(43, 28) Source(23, 69) + SourceIndex(3)
---
>>>            return C;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^
1 >
2 >            }
1 >Emitted(44, 13) Source(23, 68) + SourceIndex(3)
2 >Emitted(44, 21) Source(23, 69) + SourceIndex(3)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class C {}
1 >Emitted(45, 9) Source(23, 68) + SourceIndex(3)
2 >Emitted(45, 10) Source(23, 69) + SourceIndex(3)
3 >Emitted(45, 10) Source(23, 52) + SourceIndex(3)
4 >Emitted(45, 14) Source(23, 69) + SourceIndex(3)
---
>>>        someNamespace.C = C;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^
3 >                       ^^^^
4 >                           ^
5 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        C
3 >                        {}
4 >                           
1->Emitted(46, 9) Source(23, 65) + SourceIndex(3)
2 >Emitted(46, 24) Source(23, 66) + SourceIndex(3)
3 >Emitted(46, 28) Source(23, 69) + SourceIndex(3)
4 >Emitted(46, 29) Source(23, 69) + SourceIndex(3)
---
>>>    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^^^
7 >                                            ^^^^^
8 >                                                 ^^^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       someNamespace
5 >                    
6 >                       someNamespace
7 >                                            
8 >                                                 someNamespace
9 >                                                                       { export class C {} }
1->Emitted(47, 5) Source(23, 70) + SourceIndex(3)
2 >Emitted(47, 6) Source(23, 71) + SourceIndex(3)
3 >Emitted(47, 8) Source(23, 36) + SourceIndex(3)
4 >Emitted(47, 21) Source(23, 49) + SourceIndex(3)
5 >Emitted(47, 24) Source(23, 36) + SourceIndex(3)
6 >Emitted(47, 45) Source(23, 49) + SourceIndex(3)
7 >Emitted(47, 50) Source(23, 36) + SourceIndex(3)
8 >Emitted(47, 71) Source(23, 49) + SourceIndex(3)
9 >Emitted(47, 79) Source(23, 71) + SourceIndex(3)
---
>>>    /*@internal*/ var someOther;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^
6 >                               ^
1 >
  >    
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      someOther
6 >                               .something { export class someClass {} }
1 >Emitted(48, 5) Source(24, 5) + SourceIndex(3)
2 >Emitted(48, 18) Source(24, 18) + SourceIndex(3)
3 >Emitted(48, 19) Source(24, 19) + SourceIndex(3)
4 >Emitted(48, 23) Source(24, 36) + SourceIndex(3)
5 >Emitted(48, 32) Source(24, 45) + SourceIndex(3)
6 >Emitted(48, 33) Source(24, 85) + SourceIndex(3)
---
>>>    (function (someOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1 >
2 >    export namespace 
3 >               someOther
1 >Emitted(49, 5) Source(24, 19) + SourceIndex(3)
2 >Emitted(49, 16) Source(24, 36) + SourceIndex(3)
3 >Emitted(49, 25) Source(24, 45) + SourceIndex(3)
---
>>>        var something;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >        
3 >            something
4 >                      { export class someClass {} }
1 >Emitted(50, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(50, 13) Source(24, 46) + SourceIndex(3)
3 >Emitted(50, 22) Source(24, 55) + SourceIndex(3)
4 >Emitted(50, 23) Source(24, 85) + SourceIndex(3)
---
>>>        (function (something) {var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^
5 >                               ^^^^^^^^^->
1->
2 >        
3 >                   something
4 >                             { 
1->Emitted(51, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(51, 20) Source(24, 46) + SourceIndex(3)
3 >Emitted(51, 29) Source(24, 55) + SourceIndex(3)
4 >Emitted(51, 32) Source(24, 58) + SourceIndex(3)
---
>>>                function someClass() {}
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^
1->
2 >                export class someClass {
3 >                                      }
1->Emitted(52, 17) Source(24, 58) + SourceIndex(3)
2 >Emitted(52, 39) Source(24, 82) + SourceIndex(3)
3 >Emitted(52, 40) Source(24, 83) + SourceIndex(3)
---
>>>                return someClass;
1 >^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1 >
2 >                }
1 >Emitted(53, 17) Source(24, 82) + SourceIndex(3)
2 >Emitted(53, 33) Source(24, 83) + SourceIndex(3)
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
1 >Emitted(54, 13) Source(24, 82) + SourceIndex(3)
2 >Emitted(54, 14) Source(24, 83) + SourceIndex(3)
3 >Emitted(54, 14) Source(24, 58) + SourceIndex(3)
4 >Emitted(54, 18) Source(24, 83) + SourceIndex(3)
---
>>>            something.someClass = someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^
3 >                               ^^^^^^^^^^^^
4 >                                           ^
5 >                                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            someClass
3 >                                {}
4 >                                           
1->Emitted(55, 13) Source(24, 71) + SourceIndex(3)
2 >Emitted(55, 32) Source(24, 80) + SourceIndex(3)
3 >Emitted(55, 44) Source(24, 83) + SourceIndex(3)
4 >Emitted(55, 45) Source(24, 83) + SourceIndex(3)
---
>>>        })(something = someOther.something || (someOther.something = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^
9 >                                                                  ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           something
5 >                    
6 >                       something
7 >                                          
8 >                                               something
9 >                                                                   { export class someClass {} }
1->Emitted(56, 9) Source(24, 84) + SourceIndex(3)
2 >Emitted(56, 10) Source(24, 85) + SourceIndex(3)
3 >Emitted(56, 12) Source(24, 46) + SourceIndex(3)
4 >Emitted(56, 21) Source(24, 55) + SourceIndex(3)
5 >Emitted(56, 24) Source(24, 46) + SourceIndex(3)
6 >Emitted(56, 43) Source(24, 55) + SourceIndex(3)
7 >Emitted(56, 48) Source(24, 46) + SourceIndex(3)
8 >Emitted(56, 67) Source(24, 55) + SourceIndex(3)
9 >Emitted(56, 75) Source(24, 85) + SourceIndex(3)
---
>>>    })(someOther = normalN.someOther || (normalN.someOther = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^
5 >                ^^^
6 >                   ^^^^^^^^^^^^^^^^^
7 >                                    ^^^^^
8 >                                         ^^^^^^^^^^^^^^^^^
9 >                                                          ^^^^^^^^
1 >
2 >    }
3 >     
4 >       someOther
5 >                
6 >                   someOther
7 >                                    
8 >                                         someOther
9 >                                                          .something { export class someClass {} }
1 >Emitted(57, 5) Source(24, 84) + SourceIndex(3)
2 >Emitted(57, 6) Source(24, 85) + SourceIndex(3)
3 >Emitted(57, 8) Source(24, 36) + SourceIndex(3)
4 >Emitted(57, 17) Source(24, 45) + SourceIndex(3)
5 >Emitted(57, 20) Source(24, 36) + SourceIndex(3)
6 >Emitted(57, 37) Source(24, 45) + SourceIndex(3)
7 >Emitted(57, 42) Source(24, 36) + SourceIndex(3)
8 >Emitted(57, 59) Source(24, 45) + SourceIndex(3)
9 >Emitted(57, 67) Source(24, 85) + SourceIndex(3)
---
>>>    /*@internal*/ normalN.someImport = someNamespace.C;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^
5 >                                    ^^^
6 >                                       ^^^^^^^^^^^^^
7 >                                                    ^
8 >                                                     ^
9 >                                                      ^
1 >
  >    
2 >    /*@internal*/
3 >                  export import 
4 >                  someImport
5 >                                     = 
6 >                                       someNamespace
7 >                                                    .
8 >                                                     C
9 >                                                      ;
1 >Emitted(58, 5) Source(25, 5) + SourceIndex(3)
2 >Emitted(58, 18) Source(25, 18) + SourceIndex(3)
3 >Emitted(58, 19) Source(25, 33) + SourceIndex(3)
4 >Emitted(58, 37) Source(25, 43) + SourceIndex(3)
5 >Emitted(58, 40) Source(25, 46) + SourceIndex(3)
6 >Emitted(58, 53) Source(25, 59) + SourceIndex(3)
7 >Emitted(58, 54) Source(25, 60) + SourceIndex(3)
8 >Emitted(58, 55) Source(25, 61) + SourceIndex(3)
9 >Emitted(58, 56) Source(25, 62) + SourceIndex(3)
---
>>>
>>>    /*@internal*/ normalN.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^^
5 >                                       ^^^
6 >                                          ^^
7 >                                            ^
1 >
  >    /*@internal*/ export type internalType = internalC;
  >    
2 >    /*@internal*/
3 >                  export const 
4 >                  internalConst
5 >                                        = 
6 >                                          10
7 >                                            ;
1 >Emitted(60, 5) Source(27, 5) + SourceIndex(3)
2 >Emitted(60, 18) Source(27, 18) + SourceIndex(3)
3 >Emitted(60, 19) Source(27, 32) + SourceIndex(3)
4 >Emitted(60, 40) Source(27, 45) + SourceIndex(3)
5 >Emitted(60, 43) Source(27, 48) + SourceIndex(3)
6 >Emitted(60, 45) Source(27, 50) + SourceIndex(3)
7 >Emitted(60, 46) Source(27, 51) + SourceIndex(3)
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
1 >Emitted(61, 5) Source(28, 5) + SourceIndex(3)
2 >Emitted(61, 18) Source(28, 18) + SourceIndex(3)
3 >Emitted(61, 19) Source(28, 19) + SourceIndex(3)
4 >Emitted(61, 23) Source(28, 31) + SourceIndex(3)
5 >Emitted(61, 35) Source(28, 55) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(62, 5) Source(28, 19) + SourceIndex(3)
2 >Emitted(62, 16) Source(28, 31) + SourceIndex(3)
3 >Emitted(62, 28) Source(28, 43) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(63, 9) Source(28, 46) + SourceIndex(3)
2 >Emitted(63, 50) Source(28, 47) + SourceIndex(3)
3 >Emitted(63, 51) Source(28, 47) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(64, 9) Source(28, 49) + SourceIndex(3)
2 >Emitted(64, 50) Source(28, 50) + SourceIndex(3)
3 >Emitted(64, 51) Source(28, 50) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(65, 9) Source(28, 52) + SourceIndex(3)
2 >Emitted(65, 50) Source(28, 53) + SourceIndex(3)
3 >Emitted(65, 51) Source(28, 53) + SourceIndex(3)
---
>>>    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
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
1->Emitted(66, 5) Source(28, 54) + SourceIndex(3)
2 >Emitted(66, 6) Source(28, 55) + SourceIndex(3)
3 >Emitted(66, 8) Source(28, 31) + SourceIndex(3)
4 >Emitted(66, 20) Source(28, 43) + SourceIndex(3)
5 >Emitted(66, 23) Source(28, 31) + SourceIndex(3)
6 >Emitted(66, 43) Source(28, 43) + SourceIndex(3)
7 >Emitted(66, 48) Source(28, 31) + SourceIndex(3)
8 >Emitted(66, 68) Source(28, 43) + SourceIndex(3)
9 >Emitted(66, 76) Source(28, 55) + SourceIndex(3)
---
>>>})(normalN || (normalN = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^
5 >          ^^^^^
6 >               ^^^^^^^
7 >                      ^^^^^^^^
8 >                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
3 > 
4 >   normalN
5 >          
6 >               normalN
7 >                       {
  >                          /*@internal*/ export class C { }
  >                          /*@internal*/ export function foo() {}
  >                          /*@internal*/ export namespace someNamespace { export class C {} }
  >                          /*@internal*/ export namespace someOther.something { export class someClass {} }
  >                          /*@internal*/ export import someImport = someNamespace.C;
  >                          /*@internal*/ export type internalType = internalC;
  >                          /*@internal*/ export const internalConst = 10;
  >                          /*@internal*/ export enum internalEnum { a, b, c }
  >                      }
1 >Emitted(67, 1) Source(29, 1) + SourceIndex(3)
2 >Emitted(67, 2) Source(29, 2) + SourceIndex(3)
3 >Emitted(67, 4) Source(20, 11) + SourceIndex(3)
4 >Emitted(67, 11) Source(20, 18) + SourceIndex(3)
5 >Emitted(67, 16) Source(20, 11) + SourceIndex(3)
6 >Emitted(67, 23) Source(20, 18) + SourceIndex(3)
7 >Emitted(67, 31) Source(29, 2) + SourceIndex(3)
---
>>>/*@internal*/ var internalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^^^^^->
1->
  >
2 >/*@internal*/
3 >              
1->Emitted(68, 1) Source(30, 1) + SourceIndex(3)
2 >Emitted(68, 14) Source(30, 14) + SourceIndex(3)
3 >Emitted(68, 15) Source(30, 15) + SourceIndex(3)
---
>>>    function internalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^
1->
2 >    class internalC {
3 >                          }
1->Emitted(69, 5) Source(30, 15) + SourceIndex(3)
2 >Emitted(69, 27) Source(30, 32) + SourceIndex(3)
3 >Emitted(69, 28) Source(30, 33) + SourceIndex(3)
---
>>>    return internalC;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
1 >
2 >    }
1 >Emitted(70, 5) Source(30, 32) + SourceIndex(3)
2 >Emitted(70, 21) Source(30, 33) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class internalC {}
1 >Emitted(71, 1) Source(30, 32) + SourceIndex(3)
2 >Emitted(71, 2) Source(30, 33) + SourceIndex(3)
3 >Emitted(71, 2) Source(30, 15) + SourceIndex(3)
4 >Emitted(71, 6) Source(30, 33) + SourceIndex(3)
---
>>>/*@internal*/ function internalfoo() { }
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^
5 >                       ^^^^^^^^^^^
6 >                                  ^^^^^
7 >                                       ^
1->
  >
2 >/*@internal*/
3 >              
4 >              function 
5 >                       internalfoo
6 >                                  () {
7 >                                       }
1->Emitted(72, 1) Source(31, 1) + SourceIndex(3)
2 >Emitted(72, 14) Source(31, 14) + SourceIndex(3)
3 >Emitted(72, 15) Source(31, 15) + SourceIndex(3)
4 >Emitted(72, 24) Source(31, 24) + SourceIndex(3)
5 >Emitted(72, 35) Source(31, 35) + SourceIndex(3)
6 >Emitted(72, 40) Source(31, 39) + SourceIndex(3)
7 >Emitted(72, 41) Source(31, 40) + SourceIndex(3)
---
>>>/*@internal*/ var internalNamespace;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^^^^^
6 >                                   ^
7 >                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >/*@internal*/
3 >              
4 >              namespace 
5 >                  internalNamespace
6 >                                    { export class someClass {} }
1 >Emitted(73, 1) Source(32, 1) + SourceIndex(3)
2 >Emitted(73, 14) Source(32, 14) + SourceIndex(3)
3 >Emitted(73, 15) Source(32, 15) + SourceIndex(3)
4 >Emitted(73, 19) Source(32, 25) + SourceIndex(3)
5 >Emitted(73, 36) Source(32, 42) + SourceIndex(3)
6 >Emitted(73, 37) Source(32, 72) + SourceIndex(3)
---
>>>(function (internalNamespace) {var someClass = /** @class */ (function () {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^^^^^
4 >                            ^^^
5 >                               ^->
1->
2 >namespace 
3 >           internalNamespace
4 >                             { 
1->Emitted(74, 1) Source(32, 15) + SourceIndex(3)
2 >Emitted(74, 12) Source(32, 25) + SourceIndex(3)
3 >Emitted(74, 29) Source(32, 42) + SourceIndex(3)
4 >Emitted(74, 32) Source(32, 45) + SourceIndex(3)
---
>>>        function someClass() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^
1->
2 >        export class someClass {
3 >                              }
1->Emitted(75, 9) Source(32, 45) + SourceIndex(3)
2 >Emitted(75, 31) Source(32, 69) + SourceIndex(3)
3 >Emitted(75, 32) Source(32, 70) + SourceIndex(3)
---
>>>        return someClass;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1 >
2 >        }
1 >Emitted(76, 9) Source(32, 69) + SourceIndex(3)
2 >Emitted(76, 25) Source(32, 70) + SourceIndex(3)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class someClass {}
1 >Emitted(77, 5) Source(32, 69) + SourceIndex(3)
2 >Emitted(77, 6) Source(32, 70) + SourceIndex(3)
3 >Emitted(77, 6) Source(32, 45) + SourceIndex(3)
4 >Emitted(77, 10) Source(32, 70) + SourceIndex(3)
---
>>>    internalNamespace.someClass = someClass;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                               ^^^^^^^^^^^^
4 >                                           ^
5 >                                            ^^^^^^^->
1->
2 >    someClass
3 >                                {}
4 >                                           
1->Emitted(78, 5) Source(32, 58) + SourceIndex(3)
2 >Emitted(78, 32) Source(32, 67) + SourceIndex(3)
3 >Emitted(78, 44) Source(32, 70) + SourceIndex(3)
4 >Emitted(78, 45) Source(32, 70) + SourceIndex(3)
---
>>>})(internalNamespace || (internalNamespace = {}));
1->
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^^^^^
5 >                    ^^^^^
6 >                         ^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^^^^
1-> 
2 >}
3 > 
4 >   internalNamespace
5 >                    
6 >                         internalNamespace
7 >                                           { export class someClass {} }
1->Emitted(79, 1) Source(32, 71) + SourceIndex(3)
2 >Emitted(79, 2) Source(32, 72) + SourceIndex(3)
3 >Emitted(79, 4) Source(32, 25) + SourceIndex(3)
4 >Emitted(79, 21) Source(32, 42) + SourceIndex(3)
5 >Emitted(79, 26) Source(32, 25) + SourceIndex(3)
6 >Emitted(79, 43) Source(32, 42) + SourceIndex(3)
7 >Emitted(79, 51) Source(32, 72) + SourceIndex(3)
---
>>>/*@internal*/ var internalOther;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^
6 >                               ^
1 >
  >
2 >/*@internal*/
3 >              
4 >              namespace 
5 >                  internalOther
6 >                               .something { export class someClass {} }
1 >Emitted(80, 1) Source(33, 1) + SourceIndex(3)
2 >Emitted(80, 14) Source(33, 14) + SourceIndex(3)
3 >Emitted(80, 15) Source(33, 15) + SourceIndex(3)
4 >Emitted(80, 19) Source(33, 25) + SourceIndex(3)
5 >Emitted(80, 32) Source(33, 38) + SourceIndex(3)
6 >Emitted(80, 33) Source(33, 78) + SourceIndex(3)
---
>>>(function (internalOther) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1 >
2 >namespace 
3 >           internalOther
1 >Emitted(81, 1) Source(33, 15) + SourceIndex(3)
2 >Emitted(81, 12) Source(33, 25) + SourceIndex(3)
3 >Emitted(81, 25) Source(33, 38) + SourceIndex(3)
---
>>>    var something;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >    
3 >        something
4 >                  { export class someClass {} }
1 >Emitted(82, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(82, 9) Source(33, 39) + SourceIndex(3)
3 >Emitted(82, 18) Source(33, 48) + SourceIndex(3)
4 >Emitted(82, 19) Source(33, 78) + SourceIndex(3)
---
>>>    (function (something) {var someClass = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^^^^^^->
1->
2 >    
3 >               something
4 >                         { 
1->Emitted(83, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(83, 16) Source(33, 39) + SourceIndex(3)
3 >Emitted(83, 25) Source(33, 48) + SourceIndex(3)
4 >Emitted(83, 28) Source(33, 51) + SourceIndex(3)
---
>>>            function someClass() {}
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^
1->
2 >            export class someClass {
3 >                                  }
1->Emitted(84, 13) Source(33, 51) + SourceIndex(3)
2 >Emitted(84, 35) Source(33, 75) + SourceIndex(3)
3 >Emitted(84, 36) Source(33, 76) + SourceIndex(3)
---
>>>            return someClass;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1 >
2 >            }
1 >Emitted(85, 13) Source(33, 75) + SourceIndex(3)
2 >Emitted(85, 29) Source(33, 76) + SourceIndex(3)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class someClass {}
1 >Emitted(86, 9) Source(33, 75) + SourceIndex(3)
2 >Emitted(86, 10) Source(33, 76) + SourceIndex(3)
3 >Emitted(86, 10) Source(33, 51) + SourceIndex(3)
4 >Emitted(86, 14) Source(33, 76) + SourceIndex(3)
---
>>>        something.someClass = someClass;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^
3 >                           ^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        someClass
3 >                            {}
4 >                                       
1->Emitted(87, 9) Source(33, 64) + SourceIndex(3)
2 >Emitted(87, 28) Source(33, 73) + SourceIndex(3)
3 >Emitted(87, 40) Source(33, 76) + SourceIndex(3)
4 >Emitted(87, 41) Source(33, 76) + SourceIndex(3)
---
>>>    })(something = internalOther.something || (internalOther.something = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^
5 >                ^^^
6 >                   ^^^^^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       something
5 >                
6 >                   something
7 >                                          
8 >                                               something
9 >                                                                       { export class someClass {} }
1->Emitted(88, 5) Source(33, 77) + SourceIndex(3)
2 >Emitted(88, 6) Source(33, 78) + SourceIndex(3)
3 >Emitted(88, 8) Source(33, 39) + SourceIndex(3)
4 >Emitted(88, 17) Source(33, 48) + SourceIndex(3)
5 >Emitted(88, 20) Source(33, 39) + SourceIndex(3)
6 >Emitted(88, 43) Source(33, 48) + SourceIndex(3)
7 >Emitted(88, 48) Source(33, 39) + SourceIndex(3)
8 >Emitted(88, 71) Source(33, 48) + SourceIndex(3)
9 >Emitted(88, 79) Source(33, 78) + SourceIndex(3)
---
>>>})(internalOther || (internalOther = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^
5 >                ^^^^^
6 >                     ^^^^^^^^^^^^^
7 >                                  ^^^^^^^^
8 >                                          ^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 >   internalOther
5 >                
6 >                     internalOther
7 >                                  .something { export class someClass {} }
1 >Emitted(89, 1) Source(33, 77) + SourceIndex(3)
2 >Emitted(89, 2) Source(33, 78) + SourceIndex(3)
3 >Emitted(89, 4) Source(33, 25) + SourceIndex(3)
4 >Emitted(89, 17) Source(33, 38) + SourceIndex(3)
5 >Emitted(89, 22) Source(33, 25) + SourceIndex(3)
6 >Emitted(89, 35) Source(33, 38) + SourceIndex(3)
7 >Emitted(89, 43) Source(33, 78) + SourceIndex(3)
---
>>>/*@internal*/ var internalImport = internalNamespace.someClass;
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^^
6 >                                ^^^
7 >                                   ^^^^^^^^^^^^^^^^^
8 >                                                    ^
9 >                                                     ^^^^^^^^^
10>                                                              ^
1->
  >
2 >/*@internal*/
3 >              
4 >              import 
5 >                  internalImport
6 >                                 = 
7 >                                   internalNamespace
8 >                                                    .
9 >                                                     someClass
10>                                                              ;
1->Emitted(90, 1) Source(34, 1) + SourceIndex(3)
2 >Emitted(90, 14) Source(34, 14) + SourceIndex(3)
3 >Emitted(90, 15) Source(34, 15) + SourceIndex(3)
4 >Emitted(90, 19) Source(34, 22) + SourceIndex(3)
5 >Emitted(90, 33) Source(34, 36) + SourceIndex(3)
6 >Emitted(90, 36) Source(34, 39) + SourceIndex(3)
7 >Emitted(90, 53) Source(34, 56) + SourceIndex(3)
8 >Emitted(90, 54) Source(34, 57) + SourceIndex(3)
9 >Emitted(90, 63) Source(34, 66) + SourceIndex(3)
10>Emitted(90, 64) Source(34, 67) + SourceIndex(3)
---
>>>
>>>/*@internal*/ var internalConst = 10;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^
6 >                               ^^^
7 >                                  ^^
8 >                                    ^
1 >
  >/*@internal*/ type internalType = internalC;
  >
2 >/*@internal*/
3 >              
4 >              const 
5 >                  internalConst
6 >                                = 
7 >                                  10
8 >                                    ;
1 >Emitted(92, 1) Source(36, 1) + SourceIndex(3)
2 >Emitted(92, 14) Source(36, 14) + SourceIndex(3)
3 >Emitted(92, 15) Source(36, 15) + SourceIndex(3)
4 >Emitted(92, 19) Source(36, 21) + SourceIndex(3)
5 >Emitted(92, 32) Source(36, 34) + SourceIndex(3)
6 >Emitted(92, 35) Source(36, 37) + SourceIndex(3)
7 >Emitted(92, 37) Source(36, 39) + SourceIndex(3)
8 >Emitted(92, 38) Source(36, 40) + SourceIndex(3)
---
>>>/*@internal*/ var internalEnum;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^
1 >
  >
2 >/*@internal*/
3 >              
4 >              enum 
5 >                  internalEnum { a, b, c }
1 >Emitted(93, 1) Source(37, 1) + SourceIndex(3)
2 >Emitted(93, 14) Source(37, 14) + SourceIndex(3)
3 >Emitted(93, 15) Source(37, 15) + SourceIndex(3)
4 >Emitted(93, 19) Source(37, 20) + SourceIndex(3)
5 >Emitted(93, 31) Source(37, 44) + SourceIndex(3)
---
>>>(function (internalEnum) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >enum 
3 >           internalEnum
1 >Emitted(94, 1) Source(37, 15) + SourceIndex(3)
2 >Emitted(94, 12) Source(37, 20) + SourceIndex(3)
3 >Emitted(94, 24) Source(37, 32) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1-> { 
2 >    a
3 >                                             
1->Emitted(95, 5) Source(37, 35) + SourceIndex(3)
2 >Emitted(95, 46) Source(37, 36) + SourceIndex(3)
3 >Emitted(95, 47) Source(37, 36) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1->, 
2 >    b
3 >                                             
1->Emitted(96, 5) Source(37, 38) + SourceIndex(3)
2 >Emitted(96, 46) Source(37, 39) + SourceIndex(3)
3 >Emitted(96, 47) Source(37, 39) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
1->, 
2 >    c
3 >                                             
1->Emitted(97, 5) Source(37, 41) + SourceIndex(3)
2 >Emitted(97, 46) Source(37, 42) + SourceIndex(3)
3 >Emitted(97, 47) Source(37, 42) + SourceIndex(3)
---
>>>})(internalEnum || (internalEnum = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^
5 >               ^^^^^
6 >                    ^^^^^^^^^^^^
7 >                                ^^^^^^^^
1 > 
2 >}
3 > 
4 >   internalEnum
5 >               
6 >                    internalEnum
7 >                                 { a, b, c }
1 >Emitted(98, 1) Source(37, 43) + SourceIndex(3)
2 >Emitted(98, 2) Source(37, 44) + SourceIndex(3)
3 >Emitted(98, 4) Source(37, 20) + SourceIndex(3)
4 >Emitted(98, 16) Source(37, 32) + SourceIndex(3)
5 >Emitted(98, 21) Source(37, 20) + SourceIndex(3)
6 >Emitted(98, 33) Source(37, 32) + SourceIndex(3)
7 >Emitted(98, 41) Source(37, 44) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = /** @class */ (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(99, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(100, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(101, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(101, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(102, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(102, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(102, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(103, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(103, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(103, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(103, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(103, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(103, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(103, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(103, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(104, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(104, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(105, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(105, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(106, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(106, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(106, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(106, 6) Source(5, 2) + SourceIndex(4)
---
>>>//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.tsbuildinfo]
{
  "bundle": {
    "commonSourceDirectory": "../second",
    "sourceFiles": [
      "../second/second_part1.ts",
      "../second/second_part2.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 149,
          "kind": "prepend",
          "data": "../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 149,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 149,
          "end": 3456,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 157,
          "kind": "prepend",
          "data": "../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 39,
              "kind": "internal"
            },
            {
              "pos": 41,
              "end": 157,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 157,
          "end": 234,
          "kind": "text"
        },
        {
          "pos": 234,
          "end": 339,
          "kind": "internal"
        },
        {
          "pos": 341,
          "end": 373,
          "kind": "text"
        },
        {
          "pos": 373,
          "end": 765,
          "kind": "internal"
        },
        {
          "pos": 767,
          "end": 770,
          "kind": "text"
        },
        {
          "pos": 770,
          "end": 1183,
          "kind": "internal"
        },
        {
          "pos": 1185,
          "end": 1233,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/2/second-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/2/second-output.js
----------------------------------------------------------------------
prepend: (0-149):: ../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-149)
/*@internal*/ 

var s = "Hello, world";


console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
text: (149-3456)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }

    f();
})(N || (N = {}));
var normalC = /** @class */ (function () {
    /*@internal*/ function normalC() {}

    /*@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /*@internal*/ get: function () { return 10; },
        /*@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /*@internal*/ var C = /** @class */ (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    /*@internal*/ function foo() { }
    normalN.foo = foo;
    /*@internal*/ var someNamespace;
    (function (someNamespace) {var C = /** @class */ (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /*@internal*/ var someOther;
    (function (someOther) {
        var something;
        (function (something) {var someClass = /** @class */ (function () {
                function someClass() {}
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
})(normalN || (normalN = {}));
/*@internal*/ var internalC = /** @class */ (function () {
    function internalC() {}
    return internalC;
}());
/*@internal*/ function internalfoo() { }
/*@internal*/ var internalNamespace;
(function (internalNamespace) {var someClass = /** @class */ (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/*@internal*/ var internalOther;
(function (internalOther) {
    var something;
    (function (something) {var someClass = /** @class */ (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
/*@internal*/ var internalImport = internalNamespace.someClass;

/*@internal*/ var internalConst = 10;
/*@internal*/ var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

======================================================================
======================================================================
File:: /src/2/second-output.d.ts
----------------------------------------------------------------------
prepend: (0-157):: ../first/bin/first-output.d.ts texts:: 2
>>--------------------------------------------------------------------
internal: (0-39)
interface TheFirst {
    none: any;
}
>>--------------------------------------------------------------------
text: (41-157)
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
text: (157-234)
declare namespace N {
}
declare namespace N {
}
declare class normalC {

----------------------------------------------------------------------
internal: (234-339)
    constructor();
    prop: string;
    method(): void;
    get c(): number;
    set c(val: number);
----------------------------------------------------------------------
text: (341-373)
}
declare namespace normalN {

----------------------------------------------------------------------
internal: (373-765)
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
text: (767-770)
}

----------------------------------------------------------------------
internal: (770-1183)
declare class internalC {
}
declare function internalfoo(): void;
declare namespace internalNamespace {
    class someClass {
    }
}
declare namespace internalOther.something {
    class someClass {
    }
}
import internalImport = internalNamespace.someClass;
declare type internalType = internalC;
declare const internalConst = 10;
declare enum internalEnum {
    a = 0,
    b = 1,
    c = 2
}
----------------------------------------------------------------------
text: (1185-1233)
declare class C {
    doSomething(): void;
}

======================================================================

//// [/src/first/bin/first-output.d.ts] file written with same contents
//// [/src/first/bin/first-output.d.ts.map] file written with same contents
//// [/src/first/bin/first-output.d.ts.map.baseline.txt] file written with same contents
//// [/src/first/bin/first-output.js]
/*@internal*/ 

var s = "Hello, world";


console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,aAAa;;AAIb,IAAM,CAAC,GAAG,cAAc,CAAC;;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>/*@internal*/ 
1 >
2 >^^^^^^^^^^^^^
1 >
2 >/*@internal*/
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 14) Source(1, 14) + SourceIndex(0)
---
>>>
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 > interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(3, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(3, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(3, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(3, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(3, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(3, 24) Source(5, 26) + SourceIndex(0)
---
>>>
>>>
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
1 >Emitted(6, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(7, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(7, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(7, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(7, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(7, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(7, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(7, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(8, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(8, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(8, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(8, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(8, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(8, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(8, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(8, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(8, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(9, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(9, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(10, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(10, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(10, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(10, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(11, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(11, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
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
          "end": 149,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 39,
          "kind": "internal"
        },
        {
          "pos": 41,
          "end": 157,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-149)
/*@internal*/ 

var s = "Hello, world";


console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
internal: (0-39)
interface TheFirst {
    none: any;
}
----------------------------------------------------------------------
text: (41-157)
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

======================================================================

//// [/src/first/first_PART1.ts]
/*@internal*/ interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
console.log(s);

//// [/src/third/thirdjs/output/third-output.js]
/*@internal*/ 

var s = "Hello, world";


console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
var N;
(function (N) {
    function f() {
        console.log('testing');
    }

    f();
})(N || (N = {}));
var normalC = /** @class */ (function () {
    /*@internal*/ function normalC() {}

    /*@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /*@internal*/ get: function () { return 10; },
        /*@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /*@internal*/ var C = /** @class */ (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    /*@internal*/ function foo() { }
    normalN.foo = foo;
    /*@internal*/ var someNamespace;
    (function (someNamespace) {var C = /** @class */ (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /*@internal*/ var someOther;
    (function (someOther) {
        var something;
        (function (something) {var someClass = /** @class */ (function () {
                function someClass() {}
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
})(normalN || (normalN = {}));
/*@internal*/ var internalC = /** @class */ (function () {
    function internalC() {}
    return internalC;
}());
/*@internal*/ function internalfoo() { }
/*@internal*/ var internalNamespace;
(function (internalNamespace) {var someClass = /** @class */ (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/*@internal*/ var internalOther;
(function (internalOther) {
    var something;
    (function (something) {var someClass = /** @class */ (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
/*@internal*/ var internalImport = internalNamespace.someClass;

/*@internal*/ var internalConst = 10;
/*@internal*/ var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
var c = new C();
c.doSomething();
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,aAAa;;AAIb,IAAM,CAAC,GAAG,cAAc,CAAC;;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACI,aAAa,CAAC,oBAAgB,CAAC;;IAE/B,aAAa,CAAC,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;QAAnB,aAAa,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;QACpC,aAAa,MAAC,UAAM,GAAW,IAAI,CAAC;;;OADA;IAExC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACb,aAAa,CAAC;QAAA,cAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAChC,aAAa,CAAC,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACtC,aAAa,CAAC,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa,GAAG;YAAA,cAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IAClE,aAAa,CAAC,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS,GAAG;gBAAA,sBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IAChF,aAAa,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;;IAEzD,aAAa,CAAc,qBAAa,GAAG,EAAE,CAAC;IAC9C,aAAa,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACtD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACD,aAAa,CAAC;IAAA,sBAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAChC,aAAa,CAAC,SAAS,WAAW,KAAI,CAAC;AACvC,aAAa,CAAC,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB,GAAG;QAAA,sBAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACvE,aAAa,CAAC,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS,GAAG;YAAA,sBAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC7E,aAAa,CAAC,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;;AAElE,aAAa,CAAC,IAAM,aAAa,GAAG,EAAE,CAAC;AACvC,aAAa,CAAC,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAA;IAAE,yCAAC,CAAA;IAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC3C;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
>>>/*@internal*/ 
1 >
2 >^^^^^^^^^^^^^
1 >
2 >/*@internal*/
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 14) Source(1, 14) + SourceIndex(0)
---
>>>
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 > interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(3, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(3, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(3, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(3, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(3, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(3, 24) Source(5, 26) + SourceIndex(0)
---
>>>
>>>
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
1 >Emitted(6, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(7, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(7, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(7, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(7, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(7, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(7, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(7, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(8, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(8, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(8, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(8, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(8, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(8, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(8, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(8, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(8, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(9, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(9, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(10, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(10, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(10, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(10, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(11, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(11, 2) Source(3, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>var N;
1->
2 >^^^^
3 >    ^
4 >     ^
5 >      ^^^^^^^^^^->
1->namespace N {
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
1->Emitted(12, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(12, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(12, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(12, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(13, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(13, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(13, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(14, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(14, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(14, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(15, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(15, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(15, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(15, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(15, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(15, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(15, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(15, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >    
2 >    }
1 >Emitted(16, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(16, 6) Source(8, 6) + SourceIndex(3)
---
>>>
>>>    f();
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^
5 >        ^^^^^^^^^^^->
1 >
  >
  >    
2 >    f
3 >     ()
4 >       ;
1 >Emitted(18, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(18, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(18, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(18, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1->Emitted(19, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(19, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(19, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(19, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(19, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(19, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(19, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(20, 1) Source(13, 1) + SourceIndex(3)
---
>>>    /*@internal*/ function normalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^
5 >                                      ^
1->class normalC {
  >    
2 >    /*@internal*/
3 >                  
4 >                  constructor() { 
5 >                                      }
1->Emitted(21, 5) Source(14, 5) + SourceIndex(3)
2 >Emitted(21, 18) Source(14, 18) + SourceIndex(3)
3 >Emitted(21, 19) Source(14, 19) + SourceIndex(3)
4 >Emitted(21, 39) Source(14, 35) + SourceIndex(3)
5 >Emitted(21, 40) Source(14, 36) + SourceIndex(3)
---
>>>
>>>    /*@internal*/ normalC.prototype.method = function () { };
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                          ^^^
6 >                                             ^^^^^^^^^^^^^^
7 >                                                           ^
1 >
  >    /*@internal*/ prop: string;
  >    
2 >    /*@internal*/
3 >                  
4 >                  method
5 >                                          
6 >                                             method() { 
7 >                                                           }
1 >Emitted(23, 5) Source(16, 5) + SourceIndex(3)
2 >Emitted(23, 18) Source(16, 18) + SourceIndex(3)
3 >Emitted(23, 19) Source(16, 19) + SourceIndex(3)
4 >Emitted(23, 43) Source(16, 25) + SourceIndex(3)
5 >Emitted(23, 46) Source(16, 19) + SourceIndex(3)
6 >Emitted(23, 60) Source(16, 30) + SourceIndex(3)
7 >Emitted(23, 61) Source(16, 31) + SourceIndex(3)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
4 >                                                ^^^^^^^->
1 >
  >    /*@internal*/ 
2 >    get 
3 >                          c
1 >Emitted(24, 5) Source(17, 19) + SourceIndex(3)
2 >Emitted(24, 27) Source(17, 23) + SourceIndex(3)
3 >Emitted(24, 49) Source(17, 24) + SourceIndex(3)
---
>>>        /*@internal*/ get: function () { return 10; },
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^^^^^^
4 >                           ^^^^^^^^^^^^^^
5 >                                         ^^^^^^^
6 >                                                ^^
7 >                                                  ^
8 >                                                   ^
9 >                                                    ^
1->
2 >        /*@internal*/
3 >                      
4 >                           get c() { 
5 >                                         return 
6 >                                                10
7 >                                                  ;
8 >                                                    
9 >                                                    }
1->Emitted(25, 9) Source(17, 5) + SourceIndex(3)
2 >Emitted(25, 22) Source(17, 18) + SourceIndex(3)
3 >Emitted(25, 28) Source(17, 19) + SourceIndex(3)
4 >Emitted(25, 42) Source(17, 29) + SourceIndex(3)
5 >Emitted(25, 49) Source(17, 36) + SourceIndex(3)
6 >Emitted(25, 51) Source(17, 38) + SourceIndex(3)
7 >Emitted(25, 52) Source(17, 39) + SourceIndex(3)
8 >Emitted(25, 53) Source(17, 40) + SourceIndex(3)
9 >Emitted(25, 54) Source(17, 41) + SourceIndex(3)
---
>>>        /*@internal*/ set: function (val) { },
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^
3 >                     ^^^^^^
4 >                           ^^^^^^^^^^
5 >                                     ^^^
6 >                                        ^^^^
7 >                                            ^
1 >
  >    
2 >        /*@internal*/
3 >                      
4 >                           set c(
5 >                                     val: number
6 >                                        ) { 
7 >                                            }
1 >Emitted(26, 9) Source(18, 5) + SourceIndex(3)
2 >Emitted(26, 22) Source(18, 18) + SourceIndex(3)
3 >Emitted(26, 28) Source(18, 19) + SourceIndex(3)
4 >Emitted(26, 38) Source(18, 25) + SourceIndex(3)
5 >Emitted(26, 41) Source(18, 36) + SourceIndex(3)
6 >Emitted(26, 45) Source(18, 40) + SourceIndex(3)
7 >Emitted(26, 46) Source(18, 41) + SourceIndex(3)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(29, 8) Source(17, 41) + SourceIndex(3)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(30, 5) Source(19, 1) + SourceIndex(3)
2 >Emitted(30, 19) Source(19, 2) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^->
1 >
2 >}
3 > 
4 > class normalC {
  >     /*@internal*/ constructor() { }
  >     /*@internal*/ prop: string;
  >     /*@internal*/ method() { }
  >     /*@internal*/ get c() { return 10; }
  >     /*@internal*/ set c(val: number) { }
  > }
1 >Emitted(31, 1) Source(19, 1) + SourceIndex(3)
2 >Emitted(31, 2) Source(19, 2) + SourceIndex(3)
3 >Emitted(31, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(31, 6) Source(19, 2) + SourceIndex(3)
---
>>>var normalN;
1->
2 >^^^^
3 >    ^^^^^^^
4 >           ^
5 >            ^^^^^^^^^^->
1->
  >
2 >namespace 
3 >    normalN
4 >            {
  >               /*@internal*/ export class C { }
  >               /*@internal*/ export function foo() {}
  >               /*@internal*/ export namespace someNamespace { export class C {} }
  >               /*@internal*/ export namespace someOther.something { export class someClass {} }
  >               /*@internal*/ export import someImport = someNamespace.C;
  >               /*@internal*/ export type internalType = internalC;
  >               /*@internal*/ export const internalConst = 10;
  >               /*@internal*/ export enum internalEnum { a, b, c }
  >           }
1->Emitted(32, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(32, 5) Source(20, 11) + SourceIndex(3)
3 >Emitted(32, 12) Source(20, 18) + SourceIndex(3)
4 >Emitted(32, 13) Source(29, 2) + SourceIndex(3)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(33, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(33, 12) Source(20, 11) + SourceIndex(3)
3 >Emitted(33, 19) Source(20, 18) + SourceIndex(3)
---
>>>    /*@internal*/ var C = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^->
1-> {
  >    
2 >    /*@internal*/
3 >                  
1->Emitted(34, 5) Source(21, 5) + SourceIndex(3)
2 >Emitted(34, 18) Source(21, 18) + SourceIndex(3)
3 >Emitted(34, 19) Source(21, 19) + SourceIndex(3)
---
>>>        function C() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^
1->
2 >        export class C { 
3 >                      }
1->Emitted(35, 9) Source(21, 19) + SourceIndex(3)
2 >Emitted(35, 23) Source(21, 36) + SourceIndex(3)
3 >Emitted(35, 24) Source(21, 37) + SourceIndex(3)
---
>>>        return C;
1 >^^^^^^^^
2 >        ^^^^^^^^
1 >
2 >        }
1 >Emitted(36, 9) Source(21, 36) + SourceIndex(3)
2 >Emitted(36, 17) Source(21, 37) + SourceIndex(3)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class C { }
1 >Emitted(37, 5) Source(21, 36) + SourceIndex(3)
2 >Emitted(37, 6) Source(21, 37) + SourceIndex(3)
3 >Emitted(37, 6) Source(21, 19) + SourceIndex(3)
4 >Emitted(37, 10) Source(21, 37) + SourceIndex(3)
---
>>>    normalN.C = C;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(38, 5) Source(21, 32) + SourceIndex(3)
2 >Emitted(38, 14) Source(21, 33) + SourceIndex(3)
3 >Emitted(38, 18) Source(21, 37) + SourceIndex(3)
4 >Emitted(38, 19) Source(21, 37) + SourceIndex(3)
---
>>>    /*@internal*/ function foo() { }
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^
5 >                           ^^^
6 >                              ^^^^^
7 >                                   ^
1->
  >    
2 >    /*@internal*/
3 >                  
4 >                  export function 
5 >                           foo
6 >                              () {
7 >                                   }
1->Emitted(39, 5) Source(22, 5) + SourceIndex(3)
2 >Emitted(39, 18) Source(22, 18) + SourceIndex(3)
3 >Emitted(39, 19) Source(22, 19) + SourceIndex(3)
4 >Emitted(39, 28) Source(22, 35) + SourceIndex(3)
5 >Emitted(39, 31) Source(22, 38) + SourceIndex(3)
6 >Emitted(39, 36) Source(22, 42) + SourceIndex(3)
7 >Emitted(39, 37) Source(22, 43) + SourceIndex(3)
---
>>>    normalN.foo = foo;
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^->
1 >
2 >    foo
3 >               () {}
4 >                     
1 >Emitted(40, 5) Source(22, 35) + SourceIndex(3)
2 >Emitted(40, 16) Source(22, 38) + SourceIndex(3)
3 >Emitted(40, 22) Source(22, 43) + SourceIndex(3)
4 >Emitted(40, 23) Source(22, 43) + SourceIndex(3)
---
>>>    /*@internal*/ var someNamespace;
1->^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^^^^^
6 >                                   ^
7 >                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >    
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      someNamespace
6 >                                    { export class C {} }
1->Emitted(41, 5) Source(23, 5) + SourceIndex(3)
2 >Emitted(41, 18) Source(23, 18) + SourceIndex(3)
3 >Emitted(41, 19) Source(23, 19) + SourceIndex(3)
4 >Emitted(41, 23) Source(23, 36) + SourceIndex(3)
5 >Emitted(41, 36) Source(23, 49) + SourceIndex(3)
6 >Emitted(41, 37) Source(23, 71) + SourceIndex(3)
---
>>>    (function (someNamespace) {var C = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
4 >                            ^^^
1->
2 >    export namespace 
3 >               someNamespace
4 >                             { 
1->Emitted(42, 5) Source(23, 19) + SourceIndex(3)
2 >Emitted(42, 16) Source(23, 36) + SourceIndex(3)
3 >Emitted(42, 29) Source(23, 49) + SourceIndex(3)
4 >Emitted(42, 32) Source(23, 52) + SourceIndex(3)
---
>>>            function C() {}
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^
3 >                          ^
1 >
2 >            export class C {
3 >                          }
1 >Emitted(43, 13) Source(23, 52) + SourceIndex(3)
2 >Emitted(43, 27) Source(23, 68) + SourceIndex(3)
3 >Emitted(43, 28) Source(23, 69) + SourceIndex(3)
---
>>>            return C;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^
1 >
2 >            }
1 >Emitted(44, 13) Source(23, 68) + SourceIndex(3)
2 >Emitted(44, 21) Source(23, 69) + SourceIndex(3)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class C {}
1 >Emitted(45, 9) Source(23, 68) + SourceIndex(3)
2 >Emitted(45, 10) Source(23, 69) + SourceIndex(3)
3 >Emitted(45, 10) Source(23, 52) + SourceIndex(3)
4 >Emitted(45, 14) Source(23, 69) + SourceIndex(3)
---
>>>        someNamespace.C = C;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^
3 >                       ^^^^
4 >                           ^
5 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        C
3 >                        {}
4 >                           
1->Emitted(46, 9) Source(23, 65) + SourceIndex(3)
2 >Emitted(46, 24) Source(23, 66) + SourceIndex(3)
3 >Emitted(46, 28) Source(23, 69) + SourceIndex(3)
4 >Emitted(46, 29) Source(23, 69) + SourceIndex(3)
---
>>>    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^^^
7 >                                            ^^^^^
8 >                                                 ^^^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       someNamespace
5 >                    
6 >                       someNamespace
7 >                                            
8 >                                                 someNamespace
9 >                                                                       { export class C {} }
1->Emitted(47, 5) Source(23, 70) + SourceIndex(3)
2 >Emitted(47, 6) Source(23, 71) + SourceIndex(3)
3 >Emitted(47, 8) Source(23, 36) + SourceIndex(3)
4 >Emitted(47, 21) Source(23, 49) + SourceIndex(3)
5 >Emitted(47, 24) Source(23, 36) + SourceIndex(3)
6 >Emitted(47, 45) Source(23, 49) + SourceIndex(3)
7 >Emitted(47, 50) Source(23, 36) + SourceIndex(3)
8 >Emitted(47, 71) Source(23, 49) + SourceIndex(3)
9 >Emitted(47, 79) Source(23, 71) + SourceIndex(3)
---
>>>    /*@internal*/ var someOther;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^
5 >                      ^^^^^^^^^
6 >                               ^
1 >
  >    
2 >    /*@internal*/
3 >                  
4 >                  export namespace 
5 >                      someOther
6 >                               .something { export class someClass {} }
1 >Emitted(48, 5) Source(24, 5) + SourceIndex(3)
2 >Emitted(48, 18) Source(24, 18) + SourceIndex(3)
3 >Emitted(48, 19) Source(24, 19) + SourceIndex(3)
4 >Emitted(48, 23) Source(24, 36) + SourceIndex(3)
5 >Emitted(48, 32) Source(24, 45) + SourceIndex(3)
6 >Emitted(48, 33) Source(24, 85) + SourceIndex(3)
---
>>>    (function (someOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1 >
2 >    export namespace 
3 >               someOther
1 >Emitted(49, 5) Source(24, 19) + SourceIndex(3)
2 >Emitted(49, 16) Source(24, 36) + SourceIndex(3)
3 >Emitted(49, 25) Source(24, 45) + SourceIndex(3)
---
>>>        var something;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >        
3 >            something
4 >                      { export class someClass {} }
1 >Emitted(50, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(50, 13) Source(24, 46) + SourceIndex(3)
3 >Emitted(50, 22) Source(24, 55) + SourceIndex(3)
4 >Emitted(50, 23) Source(24, 85) + SourceIndex(3)
---
>>>        (function (something) {var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^
5 >                               ^^^^^^^^^->
1->
2 >        
3 >                   something
4 >                             { 
1->Emitted(51, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(51, 20) Source(24, 46) + SourceIndex(3)
3 >Emitted(51, 29) Source(24, 55) + SourceIndex(3)
4 >Emitted(51, 32) Source(24, 58) + SourceIndex(3)
---
>>>                function someClass() {}
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^
1->
2 >                export class someClass {
3 >                                      }
1->Emitted(52, 17) Source(24, 58) + SourceIndex(3)
2 >Emitted(52, 39) Source(24, 82) + SourceIndex(3)
3 >Emitted(52, 40) Source(24, 83) + SourceIndex(3)
---
>>>                return someClass;
1 >^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1 >
2 >                }
1 >Emitted(53, 17) Source(24, 82) + SourceIndex(3)
2 >Emitted(53, 33) Source(24, 83) + SourceIndex(3)
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
1 >Emitted(54, 13) Source(24, 82) + SourceIndex(3)
2 >Emitted(54, 14) Source(24, 83) + SourceIndex(3)
3 >Emitted(54, 14) Source(24, 58) + SourceIndex(3)
4 >Emitted(54, 18) Source(24, 83) + SourceIndex(3)
---
>>>            something.someClass = someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^
3 >                               ^^^^^^^^^^^^
4 >                                           ^
5 >                                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >            someClass
3 >                                {}
4 >                                           
1->Emitted(55, 13) Source(24, 71) + SourceIndex(3)
2 >Emitted(55, 32) Source(24, 80) + SourceIndex(3)
3 >Emitted(55, 44) Source(24, 83) + SourceIndex(3)
4 >Emitted(55, 45) Source(24, 83) + SourceIndex(3)
---
>>>        })(something = someOther.something || (someOther.something = {}));
1->^^^^^^^^
2 >        ^
3 >         ^^
4 >           ^^^^^^^^^
5 >                    ^^^
6 >                       ^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^
9 >                                                                  ^^^^^^^^
1-> 
2 >        }
3 >         
4 >           something
5 >                    
6 >                       something
7 >                                          
8 >                                               something
9 >                                                                   { export class someClass {} }
1->Emitted(56, 9) Source(24, 84) + SourceIndex(3)
2 >Emitted(56, 10) Source(24, 85) + SourceIndex(3)
3 >Emitted(56, 12) Source(24, 46) + SourceIndex(3)
4 >Emitted(56, 21) Source(24, 55) + SourceIndex(3)
5 >Emitted(56, 24) Source(24, 46) + SourceIndex(3)
6 >Emitted(56, 43) Source(24, 55) + SourceIndex(3)
7 >Emitted(56, 48) Source(24, 46) + SourceIndex(3)
8 >Emitted(56, 67) Source(24, 55) + SourceIndex(3)
9 >Emitted(56, 75) Source(24, 85) + SourceIndex(3)
---
>>>    })(someOther = normalN.someOther || (normalN.someOther = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^
5 >                ^^^
6 >                   ^^^^^^^^^^^^^^^^^
7 >                                    ^^^^^
8 >                                         ^^^^^^^^^^^^^^^^^
9 >                                                          ^^^^^^^^
1 >
2 >    }
3 >     
4 >       someOther
5 >                
6 >                   someOther
7 >                                    
8 >                                         someOther
9 >                                                          .something { export class someClass {} }
1 >Emitted(57, 5) Source(24, 84) + SourceIndex(3)
2 >Emitted(57, 6) Source(24, 85) + SourceIndex(3)
3 >Emitted(57, 8) Source(24, 36) + SourceIndex(3)
4 >Emitted(57, 17) Source(24, 45) + SourceIndex(3)
5 >Emitted(57, 20) Source(24, 36) + SourceIndex(3)
6 >Emitted(57, 37) Source(24, 45) + SourceIndex(3)
7 >Emitted(57, 42) Source(24, 36) + SourceIndex(3)
8 >Emitted(57, 59) Source(24, 45) + SourceIndex(3)
9 >Emitted(57, 67) Source(24, 85) + SourceIndex(3)
---
>>>    /*@internal*/ normalN.someImport = someNamespace.C;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^
5 >                                    ^^^
6 >                                       ^^^^^^^^^^^^^
7 >                                                    ^
8 >                                                     ^
9 >                                                      ^
1 >
  >    
2 >    /*@internal*/
3 >                  export import 
4 >                  someImport
5 >                                     = 
6 >                                       someNamespace
7 >                                                    .
8 >                                                     C
9 >                                                      ;
1 >Emitted(58, 5) Source(25, 5) + SourceIndex(3)
2 >Emitted(58, 18) Source(25, 18) + SourceIndex(3)
3 >Emitted(58, 19) Source(25, 33) + SourceIndex(3)
4 >Emitted(58, 37) Source(25, 43) + SourceIndex(3)
5 >Emitted(58, 40) Source(25, 46) + SourceIndex(3)
6 >Emitted(58, 53) Source(25, 59) + SourceIndex(3)
7 >Emitted(58, 54) Source(25, 60) + SourceIndex(3)
8 >Emitted(58, 55) Source(25, 61) + SourceIndex(3)
9 >Emitted(58, 56) Source(25, 62) + SourceIndex(3)
---
>>>
>>>    /*@internal*/ normalN.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^^^^^^^^^^^
5 >                                       ^^^
6 >                                          ^^
7 >                                            ^
1 >
  >    /*@internal*/ export type internalType = internalC;
  >    
2 >    /*@internal*/
3 >                  export const 
4 >                  internalConst
5 >                                        = 
6 >                                          10
7 >                                            ;
1 >Emitted(60, 5) Source(27, 5) + SourceIndex(3)
2 >Emitted(60, 18) Source(27, 18) + SourceIndex(3)
3 >Emitted(60, 19) Source(27, 32) + SourceIndex(3)
4 >Emitted(60, 40) Source(27, 45) + SourceIndex(3)
5 >Emitted(60, 43) Source(27, 48) + SourceIndex(3)
6 >Emitted(60, 45) Source(27, 50) + SourceIndex(3)
7 >Emitted(60, 46) Source(27, 51) + SourceIndex(3)
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
1 >Emitted(61, 5) Source(28, 5) + SourceIndex(3)
2 >Emitted(61, 18) Source(28, 18) + SourceIndex(3)
3 >Emitted(61, 19) Source(28, 19) + SourceIndex(3)
4 >Emitted(61, 23) Source(28, 31) + SourceIndex(3)
5 >Emitted(61, 35) Source(28, 55) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(62, 5) Source(28, 19) + SourceIndex(3)
2 >Emitted(62, 16) Source(28, 31) + SourceIndex(3)
3 >Emitted(62, 28) Source(28, 43) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(63, 9) Source(28, 46) + SourceIndex(3)
2 >Emitted(63, 50) Source(28, 47) + SourceIndex(3)
3 >Emitted(63, 51) Source(28, 47) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(64, 9) Source(28, 49) + SourceIndex(3)
2 >Emitted(64, 50) Source(28, 50) + SourceIndex(3)
3 >Emitted(64, 51) Source(28, 50) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(65, 9) Source(28, 52) + SourceIndex(3)
2 >Emitted(65, 50) Source(28, 53) + SourceIndex(3)
3 >Emitted(65, 51) Source(28, 53) + SourceIndex(3)
---
>>>    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
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
1->Emitted(66, 5) Source(28, 54) + SourceIndex(3)
2 >Emitted(66, 6) Source(28, 55) + SourceIndex(3)
3 >Emitted(66, 8) Source(28, 31) + SourceIndex(3)
4 >Emitted(66, 20) Source(28, 43) + SourceIndex(3)
5 >Emitted(66, 23) Source(28, 31) + SourceIndex(3)
6 >Emitted(66, 43) Source(28, 43) + SourceIndex(3)
7 >Emitted(66, 48) Source(28, 31) + SourceIndex(3)
8 >Emitted(66, 68) Source(28, 43) + SourceIndex(3)
9 >Emitted(66, 76) Source(28, 55) + SourceIndex(3)
---
>>>})(normalN || (normalN = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^
5 >          ^^^^^
6 >               ^^^^^^^
7 >                      ^^^^^^^^
8 >                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
3 > 
4 >   normalN
5 >          
6 >               normalN
7 >                       {
  >                          /*@internal*/ export class C { }
  >                          /*@internal*/ export function foo() {}
  >                          /*@internal*/ export namespace someNamespace { export class C {} }
  >                          /*@internal*/ export namespace someOther.something { export class someClass {} }
  >                          /*@internal*/ export import someImport = someNamespace.C;
  >                          /*@internal*/ export type internalType = internalC;
  >                          /*@internal*/ export const internalConst = 10;
  >                          /*@internal*/ export enum internalEnum { a, b, c }
  >                      }
1 >Emitted(67, 1) Source(29, 1) + SourceIndex(3)
2 >Emitted(67, 2) Source(29, 2) + SourceIndex(3)
3 >Emitted(67, 4) Source(20, 11) + SourceIndex(3)
4 >Emitted(67, 11) Source(20, 18) + SourceIndex(3)
5 >Emitted(67, 16) Source(20, 11) + SourceIndex(3)
6 >Emitted(67, 23) Source(20, 18) + SourceIndex(3)
7 >Emitted(67, 31) Source(29, 2) + SourceIndex(3)
---
>>>/*@internal*/ var internalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^^^^^^->
1->
  >
2 >/*@internal*/
3 >              
1->Emitted(68, 1) Source(30, 1) + SourceIndex(3)
2 >Emitted(68, 14) Source(30, 14) + SourceIndex(3)
3 >Emitted(68, 15) Source(30, 15) + SourceIndex(3)
---
>>>    function internalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^
1->
2 >    class internalC {
3 >                          }
1->Emitted(69, 5) Source(30, 15) + SourceIndex(3)
2 >Emitted(69, 27) Source(30, 32) + SourceIndex(3)
3 >Emitted(69, 28) Source(30, 33) + SourceIndex(3)
---
>>>    return internalC;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
1 >
2 >    }
1 >Emitted(70, 5) Source(30, 32) + SourceIndex(3)
2 >Emitted(70, 21) Source(30, 33) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class internalC {}
1 >Emitted(71, 1) Source(30, 32) + SourceIndex(3)
2 >Emitted(71, 2) Source(30, 33) + SourceIndex(3)
3 >Emitted(71, 2) Source(30, 15) + SourceIndex(3)
4 >Emitted(71, 6) Source(30, 33) + SourceIndex(3)
---
>>>/*@internal*/ function internalfoo() { }
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^^^^^^
5 >                       ^^^^^^^^^^^
6 >                                  ^^^^^
7 >                                       ^
1->
  >
2 >/*@internal*/
3 >              
4 >              function 
5 >                       internalfoo
6 >                                  () {
7 >                                       }
1->Emitted(72, 1) Source(31, 1) + SourceIndex(3)
2 >Emitted(72, 14) Source(31, 14) + SourceIndex(3)
3 >Emitted(72, 15) Source(31, 15) + SourceIndex(3)
4 >Emitted(72, 24) Source(31, 24) + SourceIndex(3)
5 >Emitted(72, 35) Source(31, 35) + SourceIndex(3)
6 >Emitted(72, 40) Source(31, 39) + SourceIndex(3)
7 >Emitted(72, 41) Source(31, 40) + SourceIndex(3)
---
>>>/*@internal*/ var internalNamespace;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^^^^^
6 >                                   ^
7 >                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >/*@internal*/
3 >              
4 >              namespace 
5 >                  internalNamespace
6 >                                    { export class someClass {} }
1 >Emitted(73, 1) Source(32, 1) + SourceIndex(3)
2 >Emitted(73, 14) Source(32, 14) + SourceIndex(3)
3 >Emitted(73, 15) Source(32, 15) + SourceIndex(3)
4 >Emitted(73, 19) Source(32, 25) + SourceIndex(3)
5 >Emitted(73, 36) Source(32, 42) + SourceIndex(3)
6 >Emitted(73, 37) Source(32, 72) + SourceIndex(3)
---
>>>(function (internalNamespace) {var someClass = /** @class */ (function () {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^^^^^
4 >                            ^^^
5 >                               ^->
1->
2 >namespace 
3 >           internalNamespace
4 >                             { 
1->Emitted(74, 1) Source(32, 15) + SourceIndex(3)
2 >Emitted(74, 12) Source(32, 25) + SourceIndex(3)
3 >Emitted(74, 29) Source(32, 42) + SourceIndex(3)
4 >Emitted(74, 32) Source(32, 45) + SourceIndex(3)
---
>>>        function someClass() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^
1->
2 >        export class someClass {
3 >                              }
1->Emitted(75, 9) Source(32, 45) + SourceIndex(3)
2 >Emitted(75, 31) Source(32, 69) + SourceIndex(3)
3 >Emitted(75, 32) Source(32, 70) + SourceIndex(3)
---
>>>        return someClass;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1 >
2 >        }
1 >Emitted(76, 9) Source(32, 69) + SourceIndex(3)
2 >Emitted(76, 25) Source(32, 70) + SourceIndex(3)
---
>>>    }());
1 >^^^^
2 >    ^
3 >     
4 >     ^^^^
5 >         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    }
3 >     
4 >     export class someClass {}
1 >Emitted(77, 5) Source(32, 69) + SourceIndex(3)
2 >Emitted(77, 6) Source(32, 70) + SourceIndex(3)
3 >Emitted(77, 6) Source(32, 45) + SourceIndex(3)
4 >Emitted(77, 10) Source(32, 70) + SourceIndex(3)
---
>>>    internalNamespace.someClass = someClass;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                               ^^^^^^^^^^^^
4 >                                           ^
5 >                                            ^^^^^^^->
1->
2 >    someClass
3 >                                {}
4 >                                           
1->Emitted(78, 5) Source(32, 58) + SourceIndex(3)
2 >Emitted(78, 32) Source(32, 67) + SourceIndex(3)
3 >Emitted(78, 44) Source(32, 70) + SourceIndex(3)
4 >Emitted(78, 45) Source(32, 70) + SourceIndex(3)
---
>>>})(internalNamespace || (internalNamespace = {}));
1->
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^^^^^
5 >                    ^^^^^
6 >                         ^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^^^^
1-> 
2 >}
3 > 
4 >   internalNamespace
5 >                    
6 >                         internalNamespace
7 >                                           { export class someClass {} }
1->Emitted(79, 1) Source(32, 71) + SourceIndex(3)
2 >Emitted(79, 2) Source(32, 72) + SourceIndex(3)
3 >Emitted(79, 4) Source(32, 25) + SourceIndex(3)
4 >Emitted(79, 21) Source(32, 42) + SourceIndex(3)
5 >Emitted(79, 26) Source(32, 25) + SourceIndex(3)
6 >Emitted(79, 43) Source(32, 42) + SourceIndex(3)
7 >Emitted(79, 51) Source(32, 72) + SourceIndex(3)
---
>>>/*@internal*/ var internalOther;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^
6 >                               ^
1 >
  >
2 >/*@internal*/
3 >              
4 >              namespace 
5 >                  internalOther
6 >                               .something { export class someClass {} }
1 >Emitted(80, 1) Source(33, 1) + SourceIndex(3)
2 >Emitted(80, 14) Source(33, 14) + SourceIndex(3)
3 >Emitted(80, 15) Source(33, 15) + SourceIndex(3)
4 >Emitted(80, 19) Source(33, 25) + SourceIndex(3)
5 >Emitted(80, 32) Source(33, 38) + SourceIndex(3)
6 >Emitted(80, 33) Source(33, 78) + SourceIndex(3)
---
>>>(function (internalOther) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1 >
2 >namespace 
3 >           internalOther
1 >Emitted(81, 1) Source(33, 15) + SourceIndex(3)
2 >Emitted(81, 12) Source(33, 25) + SourceIndex(3)
3 >Emitted(81, 25) Source(33, 38) + SourceIndex(3)
---
>>>    var something;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >    
3 >        something
4 >                  { export class someClass {} }
1 >Emitted(82, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(82, 9) Source(33, 39) + SourceIndex(3)
3 >Emitted(82, 18) Source(33, 48) + SourceIndex(3)
4 >Emitted(82, 19) Source(33, 78) + SourceIndex(3)
---
>>>    (function (something) {var someClass = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^^^^^^->
1->
2 >    
3 >               something
4 >                         { 
1->Emitted(83, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(83, 16) Source(33, 39) + SourceIndex(3)
3 >Emitted(83, 25) Source(33, 48) + SourceIndex(3)
4 >Emitted(83, 28) Source(33, 51) + SourceIndex(3)
---
>>>            function someClass() {}
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^
1->
2 >            export class someClass {
3 >                                  }
1->Emitted(84, 13) Source(33, 51) + SourceIndex(3)
2 >Emitted(84, 35) Source(33, 75) + SourceIndex(3)
3 >Emitted(84, 36) Source(33, 76) + SourceIndex(3)
---
>>>            return someClass;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1 >
2 >            }
1 >Emitted(85, 13) Source(33, 75) + SourceIndex(3)
2 >Emitted(85, 29) Source(33, 76) + SourceIndex(3)
---
>>>        }());
1 >^^^^^^^^
2 >        ^
3 >         
4 >         ^^^^
5 >             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >        }
3 >         
4 >         export class someClass {}
1 >Emitted(86, 9) Source(33, 75) + SourceIndex(3)
2 >Emitted(86, 10) Source(33, 76) + SourceIndex(3)
3 >Emitted(86, 10) Source(33, 51) + SourceIndex(3)
4 >Emitted(86, 14) Source(33, 76) + SourceIndex(3)
---
>>>        something.someClass = someClass;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^
3 >                           ^^^^^^^^^^^^
4 >                                       ^
5 >                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        someClass
3 >                            {}
4 >                                       
1->Emitted(87, 9) Source(33, 64) + SourceIndex(3)
2 >Emitted(87, 28) Source(33, 73) + SourceIndex(3)
3 >Emitted(87, 40) Source(33, 76) + SourceIndex(3)
4 >Emitted(87, 41) Source(33, 76) + SourceIndex(3)
---
>>>    })(something = internalOther.something || (internalOther.something = {}));
1->^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^
5 >                ^^^
6 >                   ^^^^^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^^^^^
9 >                                                                      ^^^^^^^^
1-> 
2 >    }
3 >     
4 >       something
5 >                
6 >                   something
7 >                                          
8 >                                               something
9 >                                                                       { export class someClass {} }
1->Emitted(88, 5) Source(33, 77) + SourceIndex(3)
2 >Emitted(88, 6) Source(33, 78) + SourceIndex(3)
3 >Emitted(88, 8) Source(33, 39) + SourceIndex(3)
4 >Emitted(88, 17) Source(33, 48) + SourceIndex(3)
5 >Emitted(88, 20) Source(33, 39) + SourceIndex(3)
6 >Emitted(88, 43) Source(33, 48) + SourceIndex(3)
7 >Emitted(88, 48) Source(33, 39) + SourceIndex(3)
8 >Emitted(88, 71) Source(33, 48) + SourceIndex(3)
9 >Emitted(88, 79) Source(33, 78) + SourceIndex(3)
---
>>>})(internalOther || (internalOther = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^
5 >                ^^^^^
6 >                     ^^^^^^^^^^^^^
7 >                                  ^^^^^^^^
8 >                                          ^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 >   internalOther
5 >                
6 >                     internalOther
7 >                                  .something { export class someClass {} }
1 >Emitted(89, 1) Source(33, 77) + SourceIndex(3)
2 >Emitted(89, 2) Source(33, 78) + SourceIndex(3)
3 >Emitted(89, 4) Source(33, 25) + SourceIndex(3)
4 >Emitted(89, 17) Source(33, 38) + SourceIndex(3)
5 >Emitted(89, 22) Source(33, 25) + SourceIndex(3)
6 >Emitted(89, 35) Source(33, 38) + SourceIndex(3)
7 >Emitted(89, 43) Source(33, 78) + SourceIndex(3)
---
>>>/*@internal*/ var internalImport = internalNamespace.someClass;
1->
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^^
6 >                                ^^^
7 >                                   ^^^^^^^^^^^^^^^^^
8 >                                                    ^
9 >                                                     ^^^^^^^^^
10>                                                              ^
1->
  >
2 >/*@internal*/
3 >              
4 >              import 
5 >                  internalImport
6 >                                 = 
7 >                                   internalNamespace
8 >                                                    .
9 >                                                     someClass
10>                                                              ;
1->Emitted(90, 1) Source(34, 1) + SourceIndex(3)
2 >Emitted(90, 14) Source(34, 14) + SourceIndex(3)
3 >Emitted(90, 15) Source(34, 15) + SourceIndex(3)
4 >Emitted(90, 19) Source(34, 22) + SourceIndex(3)
5 >Emitted(90, 33) Source(34, 36) + SourceIndex(3)
6 >Emitted(90, 36) Source(34, 39) + SourceIndex(3)
7 >Emitted(90, 53) Source(34, 56) + SourceIndex(3)
8 >Emitted(90, 54) Source(34, 57) + SourceIndex(3)
9 >Emitted(90, 63) Source(34, 66) + SourceIndex(3)
10>Emitted(90, 64) Source(34, 67) + SourceIndex(3)
---
>>>
>>>/*@internal*/ var internalConst = 10;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^^
6 >                               ^^^
7 >                                  ^^
8 >                                    ^
1 >
  >/*@internal*/ type internalType = internalC;
  >
2 >/*@internal*/
3 >              
4 >              const 
5 >                  internalConst
6 >                                = 
7 >                                  10
8 >                                    ;
1 >Emitted(92, 1) Source(36, 1) + SourceIndex(3)
2 >Emitted(92, 14) Source(36, 14) + SourceIndex(3)
3 >Emitted(92, 15) Source(36, 15) + SourceIndex(3)
4 >Emitted(92, 19) Source(36, 21) + SourceIndex(3)
5 >Emitted(92, 32) Source(36, 34) + SourceIndex(3)
6 >Emitted(92, 35) Source(36, 37) + SourceIndex(3)
7 >Emitted(92, 37) Source(36, 39) + SourceIndex(3)
8 >Emitted(92, 38) Source(36, 40) + SourceIndex(3)
---
>>>/*@internal*/ var internalEnum;
1 >
2 >^^^^^^^^^^^^^
3 >             ^
4 >              ^^^^
5 >                  ^^^^^^^^^^^^
1 >
  >
2 >/*@internal*/
3 >              
4 >              enum 
5 >                  internalEnum { a, b, c }
1 >Emitted(93, 1) Source(37, 1) + SourceIndex(3)
2 >Emitted(93, 14) Source(37, 14) + SourceIndex(3)
3 >Emitted(93, 15) Source(37, 15) + SourceIndex(3)
4 >Emitted(93, 19) Source(37, 20) + SourceIndex(3)
5 >Emitted(93, 31) Source(37, 44) + SourceIndex(3)
---
>>>(function (internalEnum) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >enum 
3 >           internalEnum
1 >Emitted(94, 1) Source(37, 15) + SourceIndex(3)
2 >Emitted(94, 12) Source(37, 20) + SourceIndex(3)
3 >Emitted(94, 24) Source(37, 32) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1-> { 
2 >    a
3 >                                             
1->Emitted(95, 5) Source(37, 35) + SourceIndex(3)
2 >Emitted(95, 46) Source(37, 36) + SourceIndex(3)
3 >Emitted(95, 47) Source(37, 36) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1->, 
2 >    b
3 >                                             
1->Emitted(96, 5) Source(37, 38) + SourceIndex(3)
2 >Emitted(96, 46) Source(37, 39) + SourceIndex(3)
3 >Emitted(96, 47) Source(37, 39) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
1->, 
2 >    c
3 >                                             
1->Emitted(97, 5) Source(37, 41) + SourceIndex(3)
2 >Emitted(97, 46) Source(37, 42) + SourceIndex(3)
3 >Emitted(97, 47) Source(37, 42) + SourceIndex(3)
---
>>>})(internalEnum || (internalEnum = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^
5 >               ^^^^^
6 >                    ^^^^^^^^^^^^
7 >                                ^^^^^^^^
1 > 
2 >}
3 > 
4 >   internalEnum
5 >               
6 >                    internalEnum
7 >                                 { a, b, c }
1 >Emitted(98, 1) Source(37, 43) + SourceIndex(3)
2 >Emitted(98, 2) Source(37, 44) + SourceIndex(3)
3 >Emitted(98, 4) Source(37, 20) + SourceIndex(3)
4 >Emitted(98, 16) Source(37, 32) + SourceIndex(3)
5 >Emitted(98, 21) Source(37, 20) + SourceIndex(3)
6 >Emitted(98, 33) Source(37, 32) + SourceIndex(3)
7 >Emitted(98, 41) Source(37, 44) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = /** @class */ (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(99, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(100, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(101, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(101, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(102, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(102, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(102, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(103, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(103, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(103, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(103, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(103, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(103, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(103, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(103, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(104, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(104, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(105, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(105, 13) Source(5, 2) + SourceIndex(4)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class C {
  >     doSomething() {
  >         console.log("something got done");
  >     }
  > }
1 >Emitted(106, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(106, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(106, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(106, 6) Source(5, 2) + SourceIndex(4)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
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
1->
2 >var 
3 >    c
4 >      = 
5 >        new 
6 >            C
7 >             ()
8 >               ;
1->Emitted(107, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(107, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(107, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(107, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(107, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(107, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(107, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(107, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(108, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(108, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(108, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(108, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(108, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(108, 17) Source(2, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
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
          "end": 3456,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 3456,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 3456,
          "end": 3492,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 276,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 276,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 276,
          "end": 295,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prepend: (0-3456):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-3456)
/*@internal*/ 

var s = "Hello, world";


console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
var N;
(function (N) {
    function f() {
        console.log('testing');
    }

    f();
})(N || (N = {}));
var normalC = /** @class */ (function () {
    /*@internal*/ function normalC() {}

    /*@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /*@internal*/ get: function () { return 10; },
        /*@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /*@internal*/ var C = /** @class */ (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    /*@internal*/ function foo() { }
    normalN.foo = foo;
    /*@internal*/ var someNamespace;
    (function (someNamespace) {var C = /** @class */ (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /*@internal*/ var someOther;
    (function (someOther) {
        var something;
        (function (something) {var someClass = /** @class */ (function () {
                function someClass() {}
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
})(normalN || (normalN = {}));
/*@internal*/ var internalC = /** @class */ (function () {
    function internalC() {}
    return internalC;
}());
/*@internal*/ function internalfoo() { }
/*@internal*/ var internalNamespace;
(function (internalNamespace) {var someClass = /** @class */ (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/*@internal*/ var internalOther;
(function (internalOther) {
    var something;
    (function (something) {var someClass = /** @class */ (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
/*@internal*/ var internalImport = internalNamespace.someClass;

/*@internal*/ var internalConst = 10;
/*@internal*/ var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (3456-3492)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-276):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-276)
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;
declare namespace N {
}
declare namespace N {
}
declare class normalC {
}
declare namespace normalN {
}
declare class C {
    doSomething(): void;
}

----------------------------------------------------------------------
text: (276-295)
declare var c: C;

======================================================================

