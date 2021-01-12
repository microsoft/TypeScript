Input::
//// [/src/first/first_PART1.ts]
/**@internal*/ interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);
console.log(s);



Output::
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
var normalC = (function () {
    function normalC() {}
    normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        get: function () { return 10; },
        set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    var C = (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    function foo() { }
    normalN.foo = foo;
    var someNamespace;
    (function (someNamespace) {var C = (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    var someOther;
    (function (someOther) {var something;
        (function (something) {var someClass = (function () {
                function someClass() {}
                return someClass;
            }());
            something.someClass = someClass;
        })(something = someOther.something || (someOther.something = {}));
    })(someOther = normalN.someOther || (normalN.someOther = {}));
    normalN.someImport = someNamespace.C;
    normalN.internalConst = 10;
    var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
var internalC = (function () {
    function internalC() {}
    return internalC;
}());
function internalfoo() { }
var internalNamespace;
(function (internalNamespace) {var someClass = (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
var internalOther;
(function (internalOther) {var something;
    (function (something) {var someClass = (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
var internalImport = internalNamespace.someClass;

var internalConst = 10;
var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../first/first_PART1.ts","../first/first_part2.ts","../first/first_part3.ts","../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACmB,oBAAgB,CAAC;IAEjB,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;aAAL,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;aACtB,UAAM,GAAW,IAAI,CAAC;;;OADA;IAEzC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACE;QAAA,cAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAClB,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACxB,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa,GAAG;YAAA,cAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IACpD,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS,GAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS,GAAG;gBAAA,sBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IACpD,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;IAE9B,qBAAa,GAAG,EAAE,CAAC;IAChC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACvD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACc;IAAA,sBAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAClB,SAAS,WAAW,KAAI,CAAC;AACzB,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB,GAAG;QAAA,sBAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACzD,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa,GAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS,GAAG;YAAA,sBAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC/D,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;;AAEpD,IAAM,aAAa,GAAG,EAAE,CAAC;AACzB,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAA;IAAE,yCAAC,CAAA;IAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC5C;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

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
>>>
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 >/**@internal*/ interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(2, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(2, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(2, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(2, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(2, 24) Source(5, 26) + SourceIndex(0)
---
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
1 >Emitted(4, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(5, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(5, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(5, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(5, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(5, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(5, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(5, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(5, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(6, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(6, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(6, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(6, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(6, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(6, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(6, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(6, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(6, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(7, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(7, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(7, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(8, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(8, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(8, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(8, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(9, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(9, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(10, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(10, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(10, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(10, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(11, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(11, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(11, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(12, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(12, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(12, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(13, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(13, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(13, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(13, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(13, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(13, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(13, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(13, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >    
2 >    }
1 >Emitted(14, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(14, 6) Source(8, 6) + SourceIndex(3)
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
1 >Emitted(16, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(16, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(16, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(16, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^->
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
1->Emitted(17, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(17, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(17, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(17, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(17, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(17, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(17, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(18, 1) Source(13, 1) + SourceIndex(3)
---
>>>    function normalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^
3 >                        ^
4 >                         ^^^^^^^^^^^^^^^^^^^^^^^->
1->class normalC {
  >    /**@internal*/ 
2 >    constructor() { 
3 >                        }
1->Emitted(19, 5) Source(14, 20) + SourceIndex(3)
2 >Emitted(19, 25) Source(14, 36) + SourceIndex(3)
3 >Emitted(19, 26) Source(14, 37) + SourceIndex(3)
---
>>>    normalC.prototype.method = function () { };
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^
3 >                            ^^^
4 >                               ^^^^^^^^^^^^^^
5 >                                             ^
6 >                                              ^^^^^^->
1->
  >    /**@internal*/ prop: string;
  >    /**@internal*/ 
2 >    method
3 >                            
4 >                               method() { 
5 >                                             }
1->Emitted(20, 5) Source(16, 20) + SourceIndex(3)
2 >Emitted(20, 29) Source(16, 26) + SourceIndex(3)
3 >Emitted(20, 32) Source(16, 20) + SourceIndex(3)
4 >Emitted(20, 46) Source(16, 31) + SourceIndex(3)
5 >Emitted(20, 47) Source(16, 32) + SourceIndex(3)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
1->
  >    /**@internal*/ 
2 >    get 
3 >                          c
1->Emitted(21, 5) Source(17, 20) + SourceIndex(3)
2 >Emitted(21, 27) Source(17, 24) + SourceIndex(3)
3 >Emitted(21, 49) Source(17, 25) + SourceIndex(3)
---
>>>        get: function () { return 10; },
1 >^^^^^^^^^^^^^
2 >             ^^^^^^^^^^^^^^
3 >                           ^^^^^^^
4 >                                  ^^
5 >                                    ^
6 >                                     ^
7 >                                      ^
1 >
2 >             get c() { 
3 >                           return 
4 >                                  10
5 >                                    ;
6 >                                      
7 >                                      }
1 >Emitted(22, 14) Source(17, 20) + SourceIndex(3)
2 >Emitted(22, 28) Source(17, 30) + SourceIndex(3)
3 >Emitted(22, 35) Source(17, 37) + SourceIndex(3)
4 >Emitted(22, 37) Source(17, 39) + SourceIndex(3)
5 >Emitted(22, 38) Source(17, 40) + SourceIndex(3)
6 >Emitted(22, 39) Source(17, 41) + SourceIndex(3)
7 >Emitted(22, 40) Source(17, 42) + SourceIndex(3)
---
>>>        set: function (val) { },
1 >^^^^^^^^^^^^^
2 >             ^^^^^^^^^^
3 >                       ^^^
4 >                          ^^^^
5 >                              ^
1 >
  >    /**@internal*/ 
2 >             set c(
3 >                       val: number
4 >                          ) { 
5 >                              }
1 >Emitted(23, 14) Source(18, 20) + SourceIndex(3)
2 >Emitted(23, 24) Source(18, 26) + SourceIndex(3)
3 >Emitted(23, 27) Source(18, 37) + SourceIndex(3)
4 >Emitted(23, 31) Source(18, 41) + SourceIndex(3)
5 >Emitted(23, 32) Source(18, 42) + SourceIndex(3)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(26, 8) Source(17, 42) + SourceIndex(3)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /**@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(27, 5) Source(19, 1) + SourceIndex(3)
2 >Emitted(27, 19) Source(19, 2) + SourceIndex(3)
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
  >     /**@internal*/ constructor() { }
  >     /**@internal*/ prop: string;
  >     /**@internal*/ method() { }
  >     /**@internal*/ get c() { return 10; }
  >     /**@internal*/ set c(val: number) { }
  > }
1 >Emitted(28, 1) Source(19, 1) + SourceIndex(3)
2 >Emitted(28, 2) Source(19, 2) + SourceIndex(3)
3 >Emitted(28, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(28, 6) Source(19, 2) + SourceIndex(3)
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
  >               /**@internal*/ export class C { }
  >               /**@internal*/ export function foo() {}
  >               /**@internal*/ export namespace someNamespace { export class C {} }
  >               /**@internal*/ export namespace someOther.something { export class someClass {} }
  >               /**@internal*/ export import someImport = someNamespace.C;
  >               /**@internal*/ export type internalType = internalC;
  >               /**@internal*/ export const internalConst = 10;
  >               /**@internal*/ export enum internalEnum { a, b, c }
  >           }
1->Emitted(29, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(29, 5) Source(20, 11) + SourceIndex(3)
3 >Emitted(29, 12) Source(20, 18) + SourceIndex(3)
4 >Emitted(29, 13) Source(29, 2) + SourceIndex(3)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(30, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(30, 12) Source(20, 11) + SourceIndex(3)
3 >Emitted(30, 19) Source(20, 18) + SourceIndex(3)
---
>>>    var C = (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^->
1-> {
  >    /**@internal*/ 
1->Emitted(31, 5) Source(21, 20) + SourceIndex(3)
---
>>>        function C() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^
1->
2 >        export class C { 
3 >                      }
1->Emitted(32, 9) Source(21, 20) + SourceIndex(3)
2 >Emitted(32, 23) Source(21, 37) + SourceIndex(3)
3 >Emitted(32, 24) Source(21, 38) + SourceIndex(3)
---
>>>        return C;
1 >^^^^^^^^
2 >        ^^^^^^^^
1 >
2 >        }
1 >Emitted(33, 9) Source(21, 37) + SourceIndex(3)
2 >Emitted(33, 17) Source(21, 38) + SourceIndex(3)
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
1 >Emitted(34, 5) Source(21, 37) + SourceIndex(3)
2 >Emitted(34, 6) Source(21, 38) + SourceIndex(3)
3 >Emitted(34, 6) Source(21, 20) + SourceIndex(3)
4 >Emitted(34, 10) Source(21, 38) + SourceIndex(3)
---
>>>    normalN.C = C;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^
4 >                 ^
5 >                  ^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(35, 5) Source(21, 33) + SourceIndex(3)
2 >Emitted(35, 14) Source(21, 34) + SourceIndex(3)
3 >Emitted(35, 18) Source(21, 38) + SourceIndex(3)
4 >Emitted(35, 19) Source(21, 38) + SourceIndex(3)
---
>>>    function foo() { }
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^
4 >                ^^^^^
5 >                     ^
6 >                      ^->
1->
  >    /**@internal*/ 
2 >    export function 
3 >             foo
4 >                () {
5 >                     }
1->Emitted(36, 5) Source(22, 20) + SourceIndex(3)
2 >Emitted(36, 14) Source(22, 36) + SourceIndex(3)
3 >Emitted(36, 17) Source(22, 39) + SourceIndex(3)
4 >Emitted(36, 22) Source(22, 43) + SourceIndex(3)
5 >Emitted(36, 23) Source(22, 44) + SourceIndex(3)
---
>>>    normalN.foo = foo;
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^
5 >                      ^->
1->
2 >    foo
3 >               () {}
4 >                     
1->Emitted(37, 5) Source(22, 36) + SourceIndex(3)
2 >Emitted(37, 16) Source(22, 39) + SourceIndex(3)
3 >Emitted(37, 22) Source(22, 44) + SourceIndex(3)
4 >Emitted(37, 23) Source(22, 44) + SourceIndex(3)
---
>>>    var someNamespace;
1->^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >    /**@internal*/ 
2 >    export namespace 
3 >        someNamespace
4 >                      { export class C {} }
1->Emitted(38, 5) Source(23, 20) + SourceIndex(3)
2 >Emitted(38, 9) Source(23, 37) + SourceIndex(3)
3 >Emitted(38, 22) Source(23, 50) + SourceIndex(3)
4 >Emitted(38, 23) Source(23, 72) + SourceIndex(3)
---
>>>    (function (someNamespace) {var C = (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
4 >                            ^^^
1->
2 >    export namespace 
3 >               someNamespace
4 >                             { 
1->Emitted(39, 5) Source(23, 20) + SourceIndex(3)
2 >Emitted(39, 16) Source(23, 37) + SourceIndex(3)
3 >Emitted(39, 29) Source(23, 50) + SourceIndex(3)
4 >Emitted(39, 32) Source(23, 53) + SourceIndex(3)
---
>>>            function C() {}
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^
3 >                          ^
1 >
2 >            export class C {
3 >                          }
1 >Emitted(40, 13) Source(23, 53) + SourceIndex(3)
2 >Emitted(40, 27) Source(23, 69) + SourceIndex(3)
3 >Emitted(40, 28) Source(23, 70) + SourceIndex(3)
---
>>>            return C;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^
1 >
2 >            }
1 >Emitted(41, 13) Source(23, 69) + SourceIndex(3)
2 >Emitted(41, 21) Source(23, 70) + SourceIndex(3)
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
1 >Emitted(42, 9) Source(23, 69) + SourceIndex(3)
2 >Emitted(42, 10) Source(23, 70) + SourceIndex(3)
3 >Emitted(42, 10) Source(23, 53) + SourceIndex(3)
4 >Emitted(42, 14) Source(23, 70) + SourceIndex(3)
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
1->Emitted(43, 9) Source(23, 66) + SourceIndex(3)
2 >Emitted(43, 24) Source(23, 67) + SourceIndex(3)
3 >Emitted(43, 28) Source(23, 70) + SourceIndex(3)
4 >Emitted(43, 29) Source(23, 70) + SourceIndex(3)
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
1->Emitted(44, 5) Source(23, 71) + SourceIndex(3)
2 >Emitted(44, 6) Source(23, 72) + SourceIndex(3)
3 >Emitted(44, 8) Source(23, 37) + SourceIndex(3)
4 >Emitted(44, 21) Source(23, 50) + SourceIndex(3)
5 >Emitted(44, 24) Source(23, 37) + SourceIndex(3)
6 >Emitted(44, 45) Source(23, 50) + SourceIndex(3)
7 >Emitted(44, 50) Source(23, 37) + SourceIndex(3)
8 >Emitted(44, 71) Source(23, 50) + SourceIndex(3)
9 >Emitted(44, 79) Source(23, 72) + SourceIndex(3)
---
>>>    var someOther;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >    /**@internal*/ 
2 >    export namespace 
3 >        someOther
4 >                 .something { export class someClass {} }
1 >Emitted(45, 5) Source(24, 20) + SourceIndex(3)
2 >Emitted(45, 9) Source(24, 37) + SourceIndex(3)
3 >Emitted(45, 18) Source(24, 46) + SourceIndex(3)
4 >Emitted(45, 19) Source(24, 86) + SourceIndex(3)
---
>>>    (function (someOther) {var something;
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^
6 >                               ^^^^^^^^^
7 >                                        ^
8 >                                         ^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export namespace 
3 >               someOther
4 >                        .
5 >                           
6 >                               something
7 >                                         { export class someClass {} }
1->Emitted(46, 5) Source(24, 20) + SourceIndex(3)
2 >Emitted(46, 16) Source(24, 37) + SourceIndex(3)
3 >Emitted(46, 25) Source(24, 46) + SourceIndex(3)
4 >Emitted(46, 28) Source(24, 47) + SourceIndex(3)
5 >Emitted(46, 32) Source(24, 47) + SourceIndex(3)
6 >Emitted(46, 41) Source(24, 56) + SourceIndex(3)
7 >Emitted(46, 42) Source(24, 86) + SourceIndex(3)
---
>>>        (function (something) {var someClass = (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^
5 >                               ^^^^^^^^^->
1->
2 >        
3 >                   something
4 >                             { 
1->Emitted(47, 9) Source(24, 47) + SourceIndex(3)
2 >Emitted(47, 20) Source(24, 47) + SourceIndex(3)
3 >Emitted(47, 29) Source(24, 56) + SourceIndex(3)
4 >Emitted(47, 32) Source(24, 59) + SourceIndex(3)
---
>>>                function someClass() {}
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^
1->
2 >                export class someClass {
3 >                                      }
1->Emitted(48, 17) Source(24, 59) + SourceIndex(3)
2 >Emitted(48, 39) Source(24, 83) + SourceIndex(3)
3 >Emitted(48, 40) Source(24, 84) + SourceIndex(3)
---
>>>                return someClass;
1 >^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1 >
2 >                }
1 >Emitted(49, 17) Source(24, 83) + SourceIndex(3)
2 >Emitted(49, 33) Source(24, 84) + SourceIndex(3)
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
1 >Emitted(50, 13) Source(24, 83) + SourceIndex(3)
2 >Emitted(50, 14) Source(24, 84) + SourceIndex(3)
3 >Emitted(50, 14) Source(24, 59) + SourceIndex(3)
4 >Emitted(50, 18) Source(24, 84) + SourceIndex(3)
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
1->Emitted(51, 13) Source(24, 72) + SourceIndex(3)
2 >Emitted(51, 32) Source(24, 81) + SourceIndex(3)
3 >Emitted(51, 44) Source(24, 84) + SourceIndex(3)
4 >Emitted(51, 45) Source(24, 84) + SourceIndex(3)
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
1->Emitted(52, 9) Source(24, 85) + SourceIndex(3)
2 >Emitted(52, 10) Source(24, 86) + SourceIndex(3)
3 >Emitted(52, 12) Source(24, 47) + SourceIndex(3)
4 >Emitted(52, 21) Source(24, 56) + SourceIndex(3)
5 >Emitted(52, 24) Source(24, 47) + SourceIndex(3)
6 >Emitted(52, 43) Source(24, 56) + SourceIndex(3)
7 >Emitted(52, 48) Source(24, 47) + SourceIndex(3)
8 >Emitted(52, 67) Source(24, 56) + SourceIndex(3)
9 >Emitted(52, 75) Source(24, 86) + SourceIndex(3)
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
1 >Emitted(53, 5) Source(24, 85) + SourceIndex(3)
2 >Emitted(53, 6) Source(24, 86) + SourceIndex(3)
3 >Emitted(53, 8) Source(24, 37) + SourceIndex(3)
4 >Emitted(53, 17) Source(24, 46) + SourceIndex(3)
5 >Emitted(53, 20) Source(24, 37) + SourceIndex(3)
6 >Emitted(53, 37) Source(24, 46) + SourceIndex(3)
7 >Emitted(53, 42) Source(24, 37) + SourceIndex(3)
8 >Emitted(53, 59) Source(24, 46) + SourceIndex(3)
9 >Emitted(53, 67) Source(24, 86) + SourceIndex(3)
---
>>>    normalN.someImport = someNamespace.C;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^
3 >                      ^^^
4 >                         ^^^^^^^^^^^^^
5 >                                      ^
6 >                                       ^
7 >                                        ^
1 >
  >    /**@internal*/ export import 
2 >    someImport
3 >                       = 
4 >                         someNamespace
5 >                                      .
6 >                                       C
7 >                                        ;
1 >Emitted(54, 5) Source(25, 34) + SourceIndex(3)
2 >Emitted(54, 23) Source(25, 44) + SourceIndex(3)
3 >Emitted(54, 26) Source(25, 47) + SourceIndex(3)
4 >Emitted(54, 39) Source(25, 60) + SourceIndex(3)
5 >Emitted(54, 40) Source(25, 61) + SourceIndex(3)
6 >Emitted(54, 41) Source(25, 62) + SourceIndex(3)
7 >Emitted(54, 42) Source(25, 63) + SourceIndex(3)
---
>>>    normalN.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^
3 >                         ^^^
4 >                            ^^
5 >                              ^
1 >
  >    /**@internal*/ export type internalType = internalC;
  >    /**@internal*/ export const 
2 >    internalConst
3 >                          = 
4 >                            10
5 >                              ;
1 >Emitted(55, 5) Source(27, 33) + SourceIndex(3)
2 >Emitted(55, 26) Source(27, 46) + SourceIndex(3)
3 >Emitted(55, 29) Source(27, 49) + SourceIndex(3)
4 >Emitted(55, 31) Source(27, 51) + SourceIndex(3)
5 >Emitted(55, 32) Source(27, 52) + SourceIndex(3)
---
>>>    var internalEnum;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^
4 >                    ^^^^^^^^^^^->
1 >
  >    /**@internal*/ 
2 >    export enum 
3 >        internalEnum { a, b, c }
1 >Emitted(56, 5) Source(28, 20) + SourceIndex(3)
2 >Emitted(56, 9) Source(28, 32) + SourceIndex(3)
3 >Emitted(56, 21) Source(28, 56) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export enum 
3 >               internalEnum
1->Emitted(57, 5) Source(28, 20) + SourceIndex(3)
2 >Emitted(57, 16) Source(28, 32) + SourceIndex(3)
3 >Emitted(57, 28) Source(28, 44) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(58, 9) Source(28, 47) + SourceIndex(3)
2 >Emitted(58, 50) Source(28, 48) + SourceIndex(3)
3 >Emitted(58, 51) Source(28, 48) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(59, 9) Source(28, 50) + SourceIndex(3)
2 >Emitted(59, 50) Source(28, 51) + SourceIndex(3)
3 >Emitted(59, 51) Source(28, 51) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(60, 9) Source(28, 53) + SourceIndex(3)
2 >Emitted(60, 50) Source(28, 54) + SourceIndex(3)
3 >Emitted(60, 51) Source(28, 54) + SourceIndex(3)
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
1->Emitted(61, 5) Source(28, 55) + SourceIndex(3)
2 >Emitted(61, 6) Source(28, 56) + SourceIndex(3)
3 >Emitted(61, 8) Source(28, 32) + SourceIndex(3)
4 >Emitted(61, 20) Source(28, 44) + SourceIndex(3)
5 >Emitted(61, 23) Source(28, 32) + SourceIndex(3)
6 >Emitted(61, 43) Source(28, 44) + SourceIndex(3)
7 >Emitted(61, 48) Source(28, 32) + SourceIndex(3)
8 >Emitted(61, 68) Source(28, 44) + SourceIndex(3)
9 >Emitted(61, 76) Source(28, 56) + SourceIndex(3)
---
>>>})(normalN || (normalN = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^
5 >          ^^^^^
6 >               ^^^^^^^
7 >                      ^^^^^^^^
8 >                              ^->
1 >
  >
2 >}
3 > 
4 >   normalN
5 >          
6 >               normalN
7 >                       {
  >                          /**@internal*/ export class C { }
  >                          /**@internal*/ export function foo() {}
  >                          /**@internal*/ export namespace someNamespace { export class C {} }
  >                          /**@internal*/ export namespace someOther.something { export class someClass {} }
  >                          /**@internal*/ export import someImport = someNamespace.C;
  >                          /**@internal*/ export type internalType = internalC;
  >                          /**@internal*/ export const internalConst = 10;
  >                          /**@internal*/ export enum internalEnum { a, b, c }
  >                      }
1 >Emitted(62, 1) Source(29, 1) + SourceIndex(3)
2 >Emitted(62, 2) Source(29, 2) + SourceIndex(3)
3 >Emitted(62, 4) Source(20, 11) + SourceIndex(3)
4 >Emitted(62, 11) Source(20, 18) + SourceIndex(3)
5 >Emitted(62, 16) Source(20, 11) + SourceIndex(3)
6 >Emitted(62, 23) Source(20, 18) + SourceIndex(3)
7 >Emitted(62, 31) Source(29, 2) + SourceIndex(3)
---
>>>var internalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >/**@internal*/ 
1->Emitted(63, 1) Source(30, 16) + SourceIndex(3)
---
>>>    function internalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^
1->
2 >    class internalC {
3 >                          }
1->Emitted(64, 5) Source(30, 16) + SourceIndex(3)
2 >Emitted(64, 27) Source(30, 33) + SourceIndex(3)
3 >Emitted(64, 28) Source(30, 34) + SourceIndex(3)
---
>>>    return internalC;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
1 >
2 >    }
1 >Emitted(65, 5) Source(30, 33) + SourceIndex(3)
2 >Emitted(65, 21) Source(30, 34) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class internalC {}
1 >Emitted(66, 1) Source(30, 33) + SourceIndex(3)
2 >Emitted(66, 2) Source(30, 34) + SourceIndex(3)
3 >Emitted(66, 2) Source(30, 16) + SourceIndex(3)
4 >Emitted(66, 6) Source(30, 34) + SourceIndex(3)
---
>>>function internalfoo() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^
4 >                    ^^^^^
5 >                         ^
1->
  >/**@internal*/ 
2 >function 
3 >         internalfoo
4 >                    () {
5 >                         }
1->Emitted(67, 1) Source(31, 16) + SourceIndex(3)
2 >Emitted(67, 10) Source(31, 25) + SourceIndex(3)
3 >Emitted(67, 21) Source(31, 36) + SourceIndex(3)
4 >Emitted(67, 26) Source(31, 40) + SourceIndex(3)
5 >Emitted(67, 27) Source(31, 41) + SourceIndex(3)
---
>>>var internalNamespace;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >/**@internal*/ 
2 >namespace 
3 >    internalNamespace
4 >                      { export class someClass {} }
1 >Emitted(68, 1) Source(32, 16) + SourceIndex(3)
2 >Emitted(68, 5) Source(32, 26) + SourceIndex(3)
3 >Emitted(68, 22) Source(32, 43) + SourceIndex(3)
4 >Emitted(68, 23) Source(32, 73) + SourceIndex(3)
---
>>>(function (internalNamespace) {var someClass = (function () {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^^^^^
4 >                            ^^^
5 >                               ^->
1->
2 >namespace 
3 >           internalNamespace
4 >                             { 
1->Emitted(69, 1) Source(32, 16) + SourceIndex(3)
2 >Emitted(69, 12) Source(32, 26) + SourceIndex(3)
3 >Emitted(69, 29) Source(32, 43) + SourceIndex(3)
4 >Emitted(69, 32) Source(32, 46) + SourceIndex(3)
---
>>>        function someClass() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^
1->
2 >        export class someClass {
3 >                              }
1->Emitted(70, 9) Source(32, 46) + SourceIndex(3)
2 >Emitted(70, 31) Source(32, 70) + SourceIndex(3)
3 >Emitted(70, 32) Source(32, 71) + SourceIndex(3)
---
>>>        return someClass;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1 >
2 >        }
1 >Emitted(71, 9) Source(32, 70) + SourceIndex(3)
2 >Emitted(71, 25) Source(32, 71) + SourceIndex(3)
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
1 >Emitted(72, 5) Source(32, 70) + SourceIndex(3)
2 >Emitted(72, 6) Source(32, 71) + SourceIndex(3)
3 >Emitted(72, 6) Source(32, 46) + SourceIndex(3)
4 >Emitted(72, 10) Source(32, 71) + SourceIndex(3)
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
1->Emitted(73, 5) Source(32, 59) + SourceIndex(3)
2 >Emitted(73, 32) Source(32, 68) + SourceIndex(3)
3 >Emitted(73, 44) Source(32, 71) + SourceIndex(3)
4 >Emitted(73, 45) Source(32, 71) + SourceIndex(3)
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
1->Emitted(74, 1) Source(32, 72) + SourceIndex(3)
2 >Emitted(74, 2) Source(32, 73) + SourceIndex(3)
3 >Emitted(74, 4) Source(32, 26) + SourceIndex(3)
4 >Emitted(74, 21) Source(32, 43) + SourceIndex(3)
5 >Emitted(74, 26) Source(32, 26) + SourceIndex(3)
6 >Emitted(74, 43) Source(32, 43) + SourceIndex(3)
7 >Emitted(74, 51) Source(32, 73) + SourceIndex(3)
---
>>>var internalOther;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >/**@internal*/ 
2 >namespace 
3 >    internalOther
4 >                 .something { export class someClass {} }
1 >Emitted(75, 1) Source(33, 16) + SourceIndex(3)
2 >Emitted(75, 5) Source(33, 26) + SourceIndex(3)
3 >Emitted(75, 18) Source(33, 39) + SourceIndex(3)
4 >Emitted(75, 19) Source(33, 79) + SourceIndex(3)
---
>>>(function (internalOther) {var something;
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^
6 >                               ^^^^^^^^^
7 >                                        ^
8 >                                         ^^^^^^^^^^^^^^^^^->
1->
2 >namespace 
3 >           internalOther
4 >                        .
5 >                           
6 >                               something
7 >                                         { export class someClass {} }
1->Emitted(76, 1) Source(33, 16) + SourceIndex(3)
2 >Emitted(76, 12) Source(33, 26) + SourceIndex(3)
3 >Emitted(76, 25) Source(33, 39) + SourceIndex(3)
4 >Emitted(76, 28) Source(33, 40) + SourceIndex(3)
5 >Emitted(76, 32) Source(33, 40) + SourceIndex(3)
6 >Emitted(76, 41) Source(33, 49) + SourceIndex(3)
7 >Emitted(76, 42) Source(33, 79) + SourceIndex(3)
---
>>>    (function (something) {var someClass = (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^^^^^^->
1->
2 >    
3 >               something
4 >                         { 
1->Emitted(77, 5) Source(33, 40) + SourceIndex(3)
2 >Emitted(77, 16) Source(33, 40) + SourceIndex(3)
3 >Emitted(77, 25) Source(33, 49) + SourceIndex(3)
4 >Emitted(77, 28) Source(33, 52) + SourceIndex(3)
---
>>>            function someClass() {}
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^
1->
2 >            export class someClass {
3 >                                  }
1->Emitted(78, 13) Source(33, 52) + SourceIndex(3)
2 >Emitted(78, 35) Source(33, 76) + SourceIndex(3)
3 >Emitted(78, 36) Source(33, 77) + SourceIndex(3)
---
>>>            return someClass;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1 >
2 >            }
1 >Emitted(79, 13) Source(33, 76) + SourceIndex(3)
2 >Emitted(79, 29) Source(33, 77) + SourceIndex(3)
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
1 >Emitted(80, 9) Source(33, 76) + SourceIndex(3)
2 >Emitted(80, 10) Source(33, 77) + SourceIndex(3)
3 >Emitted(80, 10) Source(33, 52) + SourceIndex(3)
4 >Emitted(80, 14) Source(33, 77) + SourceIndex(3)
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
1->Emitted(81, 9) Source(33, 65) + SourceIndex(3)
2 >Emitted(81, 28) Source(33, 74) + SourceIndex(3)
3 >Emitted(81, 40) Source(33, 77) + SourceIndex(3)
4 >Emitted(81, 41) Source(33, 77) + SourceIndex(3)
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
1->Emitted(82, 5) Source(33, 78) + SourceIndex(3)
2 >Emitted(82, 6) Source(33, 79) + SourceIndex(3)
3 >Emitted(82, 8) Source(33, 40) + SourceIndex(3)
4 >Emitted(82, 17) Source(33, 49) + SourceIndex(3)
5 >Emitted(82, 20) Source(33, 40) + SourceIndex(3)
6 >Emitted(82, 43) Source(33, 49) + SourceIndex(3)
7 >Emitted(82, 48) Source(33, 40) + SourceIndex(3)
8 >Emitted(82, 71) Source(33, 49) + SourceIndex(3)
9 >Emitted(82, 79) Source(33, 79) + SourceIndex(3)
---
>>>})(internalOther || (internalOther = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^
5 >                ^^^^^
6 >                     ^^^^^^^^^^^^^
7 >                                  ^^^^^^^^
8 >                                          ^^^^^^^^->
1 >
2 >}
3 > 
4 >   internalOther
5 >                
6 >                     internalOther
7 >                                  .something { export class someClass {} }
1 >Emitted(83, 1) Source(33, 78) + SourceIndex(3)
2 >Emitted(83, 2) Source(33, 79) + SourceIndex(3)
3 >Emitted(83, 4) Source(33, 26) + SourceIndex(3)
4 >Emitted(83, 17) Source(33, 39) + SourceIndex(3)
5 >Emitted(83, 22) Source(33, 26) + SourceIndex(3)
6 >Emitted(83, 35) Source(33, 39) + SourceIndex(3)
7 >Emitted(83, 43) Source(33, 79) + SourceIndex(3)
---
>>>var internalImport = internalNamespace.someClass;
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^
4 >                  ^^^
5 >                     ^^^^^^^^^^^^^^^^^
6 >                                      ^
7 >                                       ^^^^^^^^^
8 >                                                ^
1->
  >/**@internal*/ 
2 >import 
3 >    internalImport
4 >                   = 
5 >                     internalNamespace
6 >                                      .
7 >                                       someClass
8 >                                                ;
1->Emitted(84, 1) Source(34, 16) + SourceIndex(3)
2 >Emitted(84, 5) Source(34, 23) + SourceIndex(3)
3 >Emitted(84, 19) Source(34, 37) + SourceIndex(3)
4 >Emitted(84, 22) Source(34, 40) + SourceIndex(3)
5 >Emitted(84, 39) Source(34, 57) + SourceIndex(3)
6 >Emitted(84, 40) Source(34, 58) + SourceIndex(3)
7 >Emitted(84, 49) Source(34, 67) + SourceIndex(3)
8 >Emitted(84, 50) Source(34, 68) + SourceIndex(3)
---
>>>
>>>var internalConst = 10;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^
4 >                 ^^^
5 >                    ^^
6 >                      ^
1 >
  >/**@internal*/ type internalType = internalC;
  >/**@internal*/ 
2 >const 
3 >    internalConst
4 >                  = 
5 >                    10
6 >                      ;
1 >Emitted(86, 1) Source(36, 16) + SourceIndex(3)
2 >Emitted(86, 5) Source(36, 22) + SourceIndex(3)
3 >Emitted(86, 18) Source(36, 35) + SourceIndex(3)
4 >Emitted(86, 21) Source(36, 38) + SourceIndex(3)
5 >Emitted(86, 23) Source(36, 40) + SourceIndex(3)
6 >Emitted(86, 24) Source(36, 41) + SourceIndex(3)
---
>>>var internalEnum;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^
4 >                ^^^^^^^^^^^->
1 >
  >/**@internal*/ 
2 >enum 
3 >    internalEnum { a, b, c }
1 >Emitted(87, 1) Source(37, 16) + SourceIndex(3)
2 >Emitted(87, 5) Source(37, 21) + SourceIndex(3)
3 >Emitted(87, 17) Source(37, 45) + SourceIndex(3)
---
>>>(function (internalEnum) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >enum 
3 >           internalEnum
1->Emitted(88, 1) Source(37, 16) + SourceIndex(3)
2 >Emitted(88, 12) Source(37, 21) + SourceIndex(3)
3 >Emitted(88, 24) Source(37, 33) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1-> { 
2 >    a
3 >                                             
1->Emitted(89, 5) Source(37, 36) + SourceIndex(3)
2 >Emitted(89, 46) Source(37, 37) + SourceIndex(3)
3 >Emitted(89, 47) Source(37, 37) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1->, 
2 >    b
3 >                                             
1->Emitted(90, 5) Source(37, 39) + SourceIndex(3)
2 >Emitted(90, 46) Source(37, 40) + SourceIndex(3)
3 >Emitted(90, 47) Source(37, 40) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
1->, 
2 >    c
3 >                                             
1->Emitted(91, 5) Source(37, 42) + SourceIndex(3)
2 >Emitted(91, 46) Source(37, 43) + SourceIndex(3)
3 >Emitted(91, 47) Source(37, 43) + SourceIndex(3)
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
1 >Emitted(92, 1) Source(37, 44) + SourceIndex(3)
2 >Emitted(92, 2) Source(37, 45) + SourceIndex(3)
3 >Emitted(92, 4) Source(37, 21) + SourceIndex(3)
4 >Emitted(92, 16) Source(37, 33) + SourceIndex(3)
5 >Emitted(92, 21) Source(37, 21) + SourceIndex(3)
6 >Emitted(92, 33) Source(37, 33) + SourceIndex(3)
7 >Emitted(92, 41) Source(37, 45) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(93, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(94, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(95, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(95, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(96, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(96, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(96, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(97, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(97, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(97, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(97, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(97, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(97, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(97, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(97, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(98, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(98, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(99, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(99, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(100, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(100, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(100, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(100, 6) Source(5, 2) + SourceIndex(4)
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
          "end": 131,
          "kind": "prepend",
          "data": "../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 131,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 131,
          "end": 3054,
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
prepend: (0-131):: ../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-131)

var s = "Hello, world";

console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
text: (131-3054)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }

    f();
})(N || (N = {}));
var normalC = (function () {
    function normalC() {}
    normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        get: function () { return 10; },
        set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    var C = (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    function foo() { }
    normalN.foo = foo;
    var someNamespace;
    (function (someNamespace) {var C = (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    var someOther;
    (function (someOther) {var something;
        (function (something) {var someClass = (function () {
                function someClass() {}
                return someClass;
            }());
            something.someClass = someClass;
        })(something = someOther.something || (someOther.something = {}));
    })(someOther = normalN.someOther || (normalN.someOther = {}));
    normalN.someImport = someNamespace.C;
    normalN.internalConst = 10;
    var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
var internalC = (function () {
    function internalC() {}
    return internalC;
}());
function internalfoo() { }
var internalNamespace;
(function (internalNamespace) {var someClass = (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
var internalOther;
(function (internalOther) {var something;
    (function (something) {var someClass = (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
var internalImport = internalNamespace.someClass;

var internalConst = 10;
var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
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

var s = "Hello, world";

console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
>>>
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 >/**@internal*/ interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(2, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(2, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(2, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(2, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(2, 24) Source(5, 26) + SourceIndex(0)
---
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
1 >Emitted(4, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(5, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(5, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(5, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(5, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(5, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(5, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(5, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(5, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(6, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(6, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(6, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(6, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(6, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(6, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(6, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(6, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(6, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(7, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(7, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(7, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(8, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(8, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(8, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(8, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(9, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(9, 2) Source(3, 2) + SourceIndex(2)
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
          "end": 131,
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
text: (0-131)

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

//// [/src/third/thirdjs/output/third-output.js]

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
var normalC = (function () {
    function normalC() {}
    normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        get: function () { return 10; },
        set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    var C = (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    function foo() { }
    normalN.foo = foo;
    var someNamespace;
    (function (someNamespace) {var C = (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    var someOther;
    (function (someOther) {var something;
        (function (something) {var someClass = (function () {
                function someClass() {}
                return someClass;
            }());
            something.someClass = someClass;
        })(something = someOther.something || (someOther.something = {}));
    })(someOther = normalN.someOther || (normalN.someOther = {}));
    normalN.someImport = someNamespace.C;
    normalN.internalConst = 10;
    var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
var internalC = (function () {
    function internalC() {}
    return internalC;
}());
function internalfoo() { }
var internalNamespace;
(function (internalNamespace) {var someClass = (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
var internalOther;
(function (internalOther) {var something;
    (function (something) {var someClass = (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
var internalImport = internalNamespace.someClass;

var internalConst = 10;
var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACmB,oBAAgB,CAAC;IAEjB,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;aAAL,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;aACtB,UAAM,GAAW,IAAI,CAAC;;;OADA;IAEzC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACE;QAAA,cAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAClB,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACxB,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa,GAAG;YAAA,cAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IACpD,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS,GAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS,GAAG;gBAAA,sBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IACpD,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;IAE9B,qBAAa,GAAG,EAAE,CAAC;IAChC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACvD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACc;IAAA,sBAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAClB,SAAS,WAAW,KAAI,CAAC;AACzB,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB,GAAG;QAAA,sBAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACzD,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa,GAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS,GAAG;YAAA,sBAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC/D,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;;AAEpD,IAAM,aAAa,GAAG,EAAE,CAAC;AACzB,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAA;IAAE,yCAAC,CAAA;IAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC5C;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
>>>
>>>var s = "Hello, world";
1 >
2 >^^^^
3 >    ^
4 >     ^^^
5 >        ^^^^^^^^^^^^^^
6 >                      ^
1 >/**@internal*/ interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >const 
3 >    s
4 >      = 
5 >        "Hello, world"
6 >                      ;
1 >Emitted(2, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(2, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(2, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(2, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(2, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(2, 24) Source(5, 26) + SourceIndex(0)
---
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
1 >Emitted(4, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(5, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(5, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(5, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(5, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(5, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(5, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(5, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(5, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(6, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(6, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(6, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(6, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(6, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(6, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(6, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(6, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(6, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(7, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(7, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(7, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(8, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(8, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(8, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(8, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(9, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(9, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(10, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(10, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(10, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(10, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(11, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(11, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(11, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(12, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(12, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(12, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(13, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(13, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(13, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(13, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(13, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(13, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(13, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(13, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >    
2 >    }
1 >Emitted(14, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(14, 6) Source(8, 6) + SourceIndex(3)
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
1 >Emitted(16, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(16, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(16, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(16, 9) Source(10, 9) + SourceIndex(3)
---
>>>})(N || (N = {}));
1->
2 >^
3 > ^^
4 >   ^
5 >    ^^^^^
6 >         ^
7 >          ^^^^^^^^
8 >                  ^^^^^^^^^^^->
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
1->Emitted(17, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(17, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(17, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(17, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(17, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(17, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(17, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(18, 1) Source(13, 1) + SourceIndex(3)
---
>>>    function normalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^
3 >                        ^
4 >                         ^^^^^^^^^^^^^^^^^^^^^^^->
1->class normalC {
  >    /**@internal*/ 
2 >    constructor() { 
3 >                        }
1->Emitted(19, 5) Source(14, 20) + SourceIndex(3)
2 >Emitted(19, 25) Source(14, 36) + SourceIndex(3)
3 >Emitted(19, 26) Source(14, 37) + SourceIndex(3)
---
>>>    normalC.prototype.method = function () { };
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^
3 >                            ^^^
4 >                               ^^^^^^^^^^^^^^
5 >                                             ^
6 >                                              ^^^^^^->
1->
  >    /**@internal*/ prop: string;
  >    /**@internal*/ 
2 >    method
3 >                            
4 >                               method() { 
5 >                                             }
1->Emitted(20, 5) Source(16, 20) + SourceIndex(3)
2 >Emitted(20, 29) Source(16, 26) + SourceIndex(3)
3 >Emitted(20, 32) Source(16, 20) + SourceIndex(3)
4 >Emitted(20, 46) Source(16, 31) + SourceIndex(3)
5 >Emitted(20, 47) Source(16, 32) + SourceIndex(3)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
1->
  >    /**@internal*/ 
2 >    get 
3 >                          c
1->Emitted(21, 5) Source(17, 20) + SourceIndex(3)
2 >Emitted(21, 27) Source(17, 24) + SourceIndex(3)
3 >Emitted(21, 49) Source(17, 25) + SourceIndex(3)
---
>>>        get: function () { return 10; },
1 >^^^^^^^^^^^^^
2 >             ^^^^^^^^^^^^^^
3 >                           ^^^^^^^
4 >                                  ^^
5 >                                    ^
6 >                                     ^
7 >                                      ^
1 >
2 >             get c() { 
3 >                           return 
4 >                                  10
5 >                                    ;
6 >                                      
7 >                                      }
1 >Emitted(22, 14) Source(17, 20) + SourceIndex(3)
2 >Emitted(22, 28) Source(17, 30) + SourceIndex(3)
3 >Emitted(22, 35) Source(17, 37) + SourceIndex(3)
4 >Emitted(22, 37) Source(17, 39) + SourceIndex(3)
5 >Emitted(22, 38) Source(17, 40) + SourceIndex(3)
6 >Emitted(22, 39) Source(17, 41) + SourceIndex(3)
7 >Emitted(22, 40) Source(17, 42) + SourceIndex(3)
---
>>>        set: function (val) { },
1 >^^^^^^^^^^^^^
2 >             ^^^^^^^^^^
3 >                       ^^^
4 >                          ^^^^
5 >                              ^
1 >
  >    /**@internal*/ 
2 >             set c(
3 >                       val: number
4 >                          ) { 
5 >                              }
1 >Emitted(23, 14) Source(18, 20) + SourceIndex(3)
2 >Emitted(23, 24) Source(18, 26) + SourceIndex(3)
3 >Emitted(23, 27) Source(18, 37) + SourceIndex(3)
4 >Emitted(23, 31) Source(18, 41) + SourceIndex(3)
5 >Emitted(23, 32) Source(18, 42) + SourceIndex(3)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(26, 8) Source(17, 42) + SourceIndex(3)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /**@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(27, 5) Source(19, 1) + SourceIndex(3)
2 >Emitted(27, 19) Source(19, 2) + SourceIndex(3)
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
  >     /**@internal*/ constructor() { }
  >     /**@internal*/ prop: string;
  >     /**@internal*/ method() { }
  >     /**@internal*/ get c() { return 10; }
  >     /**@internal*/ set c(val: number) { }
  > }
1 >Emitted(28, 1) Source(19, 1) + SourceIndex(3)
2 >Emitted(28, 2) Source(19, 2) + SourceIndex(3)
3 >Emitted(28, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(28, 6) Source(19, 2) + SourceIndex(3)
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
  >               /**@internal*/ export class C { }
  >               /**@internal*/ export function foo() {}
  >               /**@internal*/ export namespace someNamespace { export class C {} }
  >               /**@internal*/ export namespace someOther.something { export class someClass {} }
  >               /**@internal*/ export import someImport = someNamespace.C;
  >               /**@internal*/ export type internalType = internalC;
  >               /**@internal*/ export const internalConst = 10;
  >               /**@internal*/ export enum internalEnum { a, b, c }
  >           }
1->Emitted(29, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(29, 5) Source(20, 11) + SourceIndex(3)
3 >Emitted(29, 12) Source(20, 18) + SourceIndex(3)
4 >Emitted(29, 13) Source(29, 2) + SourceIndex(3)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(30, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(30, 12) Source(20, 11) + SourceIndex(3)
3 >Emitted(30, 19) Source(20, 18) + SourceIndex(3)
---
>>>    var C = (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^->
1-> {
  >    /**@internal*/ 
1->Emitted(31, 5) Source(21, 20) + SourceIndex(3)
---
>>>        function C() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^
1->
2 >        export class C { 
3 >                      }
1->Emitted(32, 9) Source(21, 20) + SourceIndex(3)
2 >Emitted(32, 23) Source(21, 37) + SourceIndex(3)
3 >Emitted(32, 24) Source(21, 38) + SourceIndex(3)
---
>>>        return C;
1 >^^^^^^^^
2 >        ^^^^^^^^
1 >
2 >        }
1 >Emitted(33, 9) Source(21, 37) + SourceIndex(3)
2 >Emitted(33, 17) Source(21, 38) + SourceIndex(3)
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
1 >Emitted(34, 5) Source(21, 37) + SourceIndex(3)
2 >Emitted(34, 6) Source(21, 38) + SourceIndex(3)
3 >Emitted(34, 6) Source(21, 20) + SourceIndex(3)
4 >Emitted(34, 10) Source(21, 38) + SourceIndex(3)
---
>>>    normalN.C = C;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^
4 >                 ^
5 >                  ^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(35, 5) Source(21, 33) + SourceIndex(3)
2 >Emitted(35, 14) Source(21, 34) + SourceIndex(3)
3 >Emitted(35, 18) Source(21, 38) + SourceIndex(3)
4 >Emitted(35, 19) Source(21, 38) + SourceIndex(3)
---
>>>    function foo() { }
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^
4 >                ^^^^^
5 >                     ^
6 >                      ^->
1->
  >    /**@internal*/ 
2 >    export function 
3 >             foo
4 >                () {
5 >                     }
1->Emitted(36, 5) Source(22, 20) + SourceIndex(3)
2 >Emitted(36, 14) Source(22, 36) + SourceIndex(3)
3 >Emitted(36, 17) Source(22, 39) + SourceIndex(3)
4 >Emitted(36, 22) Source(22, 43) + SourceIndex(3)
5 >Emitted(36, 23) Source(22, 44) + SourceIndex(3)
---
>>>    normalN.foo = foo;
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^
5 >                      ^->
1->
2 >    foo
3 >               () {}
4 >                     
1->Emitted(37, 5) Source(22, 36) + SourceIndex(3)
2 >Emitted(37, 16) Source(22, 39) + SourceIndex(3)
3 >Emitted(37, 22) Source(22, 44) + SourceIndex(3)
4 >Emitted(37, 23) Source(22, 44) + SourceIndex(3)
---
>>>    var someNamespace;
1->^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >    /**@internal*/ 
2 >    export namespace 
3 >        someNamespace
4 >                      { export class C {} }
1->Emitted(38, 5) Source(23, 20) + SourceIndex(3)
2 >Emitted(38, 9) Source(23, 37) + SourceIndex(3)
3 >Emitted(38, 22) Source(23, 50) + SourceIndex(3)
4 >Emitted(38, 23) Source(23, 72) + SourceIndex(3)
---
>>>    (function (someNamespace) {var C = (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
4 >                            ^^^
1->
2 >    export namespace 
3 >               someNamespace
4 >                             { 
1->Emitted(39, 5) Source(23, 20) + SourceIndex(3)
2 >Emitted(39, 16) Source(23, 37) + SourceIndex(3)
3 >Emitted(39, 29) Source(23, 50) + SourceIndex(3)
4 >Emitted(39, 32) Source(23, 53) + SourceIndex(3)
---
>>>            function C() {}
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^
3 >                          ^
1 >
2 >            export class C {
3 >                          }
1 >Emitted(40, 13) Source(23, 53) + SourceIndex(3)
2 >Emitted(40, 27) Source(23, 69) + SourceIndex(3)
3 >Emitted(40, 28) Source(23, 70) + SourceIndex(3)
---
>>>            return C;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^
1 >
2 >            }
1 >Emitted(41, 13) Source(23, 69) + SourceIndex(3)
2 >Emitted(41, 21) Source(23, 70) + SourceIndex(3)
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
1 >Emitted(42, 9) Source(23, 69) + SourceIndex(3)
2 >Emitted(42, 10) Source(23, 70) + SourceIndex(3)
3 >Emitted(42, 10) Source(23, 53) + SourceIndex(3)
4 >Emitted(42, 14) Source(23, 70) + SourceIndex(3)
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
1->Emitted(43, 9) Source(23, 66) + SourceIndex(3)
2 >Emitted(43, 24) Source(23, 67) + SourceIndex(3)
3 >Emitted(43, 28) Source(23, 70) + SourceIndex(3)
4 >Emitted(43, 29) Source(23, 70) + SourceIndex(3)
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
1->Emitted(44, 5) Source(23, 71) + SourceIndex(3)
2 >Emitted(44, 6) Source(23, 72) + SourceIndex(3)
3 >Emitted(44, 8) Source(23, 37) + SourceIndex(3)
4 >Emitted(44, 21) Source(23, 50) + SourceIndex(3)
5 >Emitted(44, 24) Source(23, 37) + SourceIndex(3)
6 >Emitted(44, 45) Source(23, 50) + SourceIndex(3)
7 >Emitted(44, 50) Source(23, 37) + SourceIndex(3)
8 >Emitted(44, 71) Source(23, 50) + SourceIndex(3)
9 >Emitted(44, 79) Source(23, 72) + SourceIndex(3)
---
>>>    var someOther;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >    /**@internal*/ 
2 >    export namespace 
3 >        someOther
4 >                 .something { export class someClass {} }
1 >Emitted(45, 5) Source(24, 20) + SourceIndex(3)
2 >Emitted(45, 9) Source(24, 37) + SourceIndex(3)
3 >Emitted(45, 18) Source(24, 46) + SourceIndex(3)
4 >Emitted(45, 19) Source(24, 86) + SourceIndex(3)
---
>>>    (function (someOther) {var something;
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^
6 >                               ^^^^^^^^^
7 >                                        ^
8 >                                         ^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export namespace 
3 >               someOther
4 >                        .
5 >                           
6 >                               something
7 >                                         { export class someClass {} }
1->Emitted(46, 5) Source(24, 20) + SourceIndex(3)
2 >Emitted(46, 16) Source(24, 37) + SourceIndex(3)
3 >Emitted(46, 25) Source(24, 46) + SourceIndex(3)
4 >Emitted(46, 28) Source(24, 47) + SourceIndex(3)
5 >Emitted(46, 32) Source(24, 47) + SourceIndex(3)
6 >Emitted(46, 41) Source(24, 56) + SourceIndex(3)
7 >Emitted(46, 42) Source(24, 86) + SourceIndex(3)
---
>>>        (function (something) {var someClass = (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^
5 >                               ^^^^^^^^^->
1->
2 >        
3 >                   something
4 >                             { 
1->Emitted(47, 9) Source(24, 47) + SourceIndex(3)
2 >Emitted(47, 20) Source(24, 47) + SourceIndex(3)
3 >Emitted(47, 29) Source(24, 56) + SourceIndex(3)
4 >Emitted(47, 32) Source(24, 59) + SourceIndex(3)
---
>>>                function someClass() {}
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^
1->
2 >                export class someClass {
3 >                                      }
1->Emitted(48, 17) Source(24, 59) + SourceIndex(3)
2 >Emitted(48, 39) Source(24, 83) + SourceIndex(3)
3 >Emitted(48, 40) Source(24, 84) + SourceIndex(3)
---
>>>                return someClass;
1 >^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1 >
2 >                }
1 >Emitted(49, 17) Source(24, 83) + SourceIndex(3)
2 >Emitted(49, 33) Source(24, 84) + SourceIndex(3)
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
1 >Emitted(50, 13) Source(24, 83) + SourceIndex(3)
2 >Emitted(50, 14) Source(24, 84) + SourceIndex(3)
3 >Emitted(50, 14) Source(24, 59) + SourceIndex(3)
4 >Emitted(50, 18) Source(24, 84) + SourceIndex(3)
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
1->Emitted(51, 13) Source(24, 72) + SourceIndex(3)
2 >Emitted(51, 32) Source(24, 81) + SourceIndex(3)
3 >Emitted(51, 44) Source(24, 84) + SourceIndex(3)
4 >Emitted(51, 45) Source(24, 84) + SourceIndex(3)
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
1->Emitted(52, 9) Source(24, 85) + SourceIndex(3)
2 >Emitted(52, 10) Source(24, 86) + SourceIndex(3)
3 >Emitted(52, 12) Source(24, 47) + SourceIndex(3)
4 >Emitted(52, 21) Source(24, 56) + SourceIndex(3)
5 >Emitted(52, 24) Source(24, 47) + SourceIndex(3)
6 >Emitted(52, 43) Source(24, 56) + SourceIndex(3)
7 >Emitted(52, 48) Source(24, 47) + SourceIndex(3)
8 >Emitted(52, 67) Source(24, 56) + SourceIndex(3)
9 >Emitted(52, 75) Source(24, 86) + SourceIndex(3)
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
1 >Emitted(53, 5) Source(24, 85) + SourceIndex(3)
2 >Emitted(53, 6) Source(24, 86) + SourceIndex(3)
3 >Emitted(53, 8) Source(24, 37) + SourceIndex(3)
4 >Emitted(53, 17) Source(24, 46) + SourceIndex(3)
5 >Emitted(53, 20) Source(24, 37) + SourceIndex(3)
6 >Emitted(53, 37) Source(24, 46) + SourceIndex(3)
7 >Emitted(53, 42) Source(24, 37) + SourceIndex(3)
8 >Emitted(53, 59) Source(24, 46) + SourceIndex(3)
9 >Emitted(53, 67) Source(24, 86) + SourceIndex(3)
---
>>>    normalN.someImport = someNamespace.C;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^
3 >                      ^^^
4 >                         ^^^^^^^^^^^^^
5 >                                      ^
6 >                                       ^
7 >                                        ^
1 >
  >    /**@internal*/ export import 
2 >    someImport
3 >                       = 
4 >                         someNamespace
5 >                                      .
6 >                                       C
7 >                                        ;
1 >Emitted(54, 5) Source(25, 34) + SourceIndex(3)
2 >Emitted(54, 23) Source(25, 44) + SourceIndex(3)
3 >Emitted(54, 26) Source(25, 47) + SourceIndex(3)
4 >Emitted(54, 39) Source(25, 60) + SourceIndex(3)
5 >Emitted(54, 40) Source(25, 61) + SourceIndex(3)
6 >Emitted(54, 41) Source(25, 62) + SourceIndex(3)
7 >Emitted(54, 42) Source(25, 63) + SourceIndex(3)
---
>>>    normalN.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^
3 >                         ^^^
4 >                            ^^
5 >                              ^
1 >
  >    /**@internal*/ export type internalType = internalC;
  >    /**@internal*/ export const 
2 >    internalConst
3 >                          = 
4 >                            10
5 >                              ;
1 >Emitted(55, 5) Source(27, 33) + SourceIndex(3)
2 >Emitted(55, 26) Source(27, 46) + SourceIndex(3)
3 >Emitted(55, 29) Source(27, 49) + SourceIndex(3)
4 >Emitted(55, 31) Source(27, 51) + SourceIndex(3)
5 >Emitted(55, 32) Source(27, 52) + SourceIndex(3)
---
>>>    var internalEnum;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^^^^
4 >                    ^^^^^^^^^^^->
1 >
  >    /**@internal*/ 
2 >    export enum 
3 >        internalEnum { a, b, c }
1 >Emitted(56, 5) Source(28, 20) + SourceIndex(3)
2 >Emitted(56, 9) Source(28, 32) + SourceIndex(3)
3 >Emitted(56, 21) Source(28, 56) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export enum 
3 >               internalEnum
1->Emitted(57, 5) Source(28, 20) + SourceIndex(3)
2 >Emitted(57, 16) Source(28, 32) + SourceIndex(3)
3 >Emitted(57, 28) Source(28, 44) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(58, 9) Source(28, 47) + SourceIndex(3)
2 >Emitted(58, 50) Source(28, 48) + SourceIndex(3)
3 >Emitted(58, 51) Source(28, 48) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(59, 9) Source(28, 50) + SourceIndex(3)
2 >Emitted(59, 50) Source(28, 51) + SourceIndex(3)
3 >Emitted(59, 51) Source(28, 51) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(60, 9) Source(28, 53) + SourceIndex(3)
2 >Emitted(60, 50) Source(28, 54) + SourceIndex(3)
3 >Emitted(60, 51) Source(28, 54) + SourceIndex(3)
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
1->Emitted(61, 5) Source(28, 55) + SourceIndex(3)
2 >Emitted(61, 6) Source(28, 56) + SourceIndex(3)
3 >Emitted(61, 8) Source(28, 32) + SourceIndex(3)
4 >Emitted(61, 20) Source(28, 44) + SourceIndex(3)
5 >Emitted(61, 23) Source(28, 32) + SourceIndex(3)
6 >Emitted(61, 43) Source(28, 44) + SourceIndex(3)
7 >Emitted(61, 48) Source(28, 32) + SourceIndex(3)
8 >Emitted(61, 68) Source(28, 44) + SourceIndex(3)
9 >Emitted(61, 76) Source(28, 56) + SourceIndex(3)
---
>>>})(normalN || (normalN = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^
5 >          ^^^^^
6 >               ^^^^^^^
7 >                      ^^^^^^^^
8 >                              ^->
1 >
  >
2 >}
3 > 
4 >   normalN
5 >          
6 >               normalN
7 >                       {
  >                          /**@internal*/ export class C { }
  >                          /**@internal*/ export function foo() {}
  >                          /**@internal*/ export namespace someNamespace { export class C {} }
  >                          /**@internal*/ export namespace someOther.something { export class someClass {} }
  >                          /**@internal*/ export import someImport = someNamespace.C;
  >                          /**@internal*/ export type internalType = internalC;
  >                          /**@internal*/ export const internalConst = 10;
  >                          /**@internal*/ export enum internalEnum { a, b, c }
  >                      }
1 >Emitted(62, 1) Source(29, 1) + SourceIndex(3)
2 >Emitted(62, 2) Source(29, 2) + SourceIndex(3)
3 >Emitted(62, 4) Source(20, 11) + SourceIndex(3)
4 >Emitted(62, 11) Source(20, 18) + SourceIndex(3)
5 >Emitted(62, 16) Source(20, 11) + SourceIndex(3)
6 >Emitted(62, 23) Source(20, 18) + SourceIndex(3)
7 >Emitted(62, 31) Source(29, 2) + SourceIndex(3)
---
>>>var internalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >/**@internal*/ 
1->Emitted(63, 1) Source(30, 16) + SourceIndex(3)
---
>>>    function internalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^
1->
2 >    class internalC {
3 >                          }
1->Emitted(64, 5) Source(30, 16) + SourceIndex(3)
2 >Emitted(64, 27) Source(30, 33) + SourceIndex(3)
3 >Emitted(64, 28) Source(30, 34) + SourceIndex(3)
---
>>>    return internalC;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
1 >
2 >    }
1 >Emitted(65, 5) Source(30, 33) + SourceIndex(3)
2 >Emitted(65, 21) Source(30, 34) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class internalC {}
1 >Emitted(66, 1) Source(30, 33) + SourceIndex(3)
2 >Emitted(66, 2) Source(30, 34) + SourceIndex(3)
3 >Emitted(66, 2) Source(30, 16) + SourceIndex(3)
4 >Emitted(66, 6) Source(30, 34) + SourceIndex(3)
---
>>>function internalfoo() { }
1->
2 >^^^^^^^^^
3 >         ^^^^^^^^^^^
4 >                    ^^^^^
5 >                         ^
1->
  >/**@internal*/ 
2 >function 
3 >         internalfoo
4 >                    () {
5 >                         }
1->Emitted(67, 1) Source(31, 16) + SourceIndex(3)
2 >Emitted(67, 10) Source(31, 25) + SourceIndex(3)
3 >Emitted(67, 21) Source(31, 36) + SourceIndex(3)
4 >Emitted(67, 26) Source(31, 40) + SourceIndex(3)
5 >Emitted(67, 27) Source(31, 41) + SourceIndex(3)
---
>>>var internalNamespace;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >/**@internal*/ 
2 >namespace 
3 >    internalNamespace
4 >                      { export class someClass {} }
1 >Emitted(68, 1) Source(32, 16) + SourceIndex(3)
2 >Emitted(68, 5) Source(32, 26) + SourceIndex(3)
3 >Emitted(68, 22) Source(32, 43) + SourceIndex(3)
4 >Emitted(68, 23) Source(32, 73) + SourceIndex(3)
---
>>>(function (internalNamespace) {var someClass = (function () {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^^^^^
4 >                            ^^^
5 >                               ^->
1->
2 >namespace 
3 >           internalNamespace
4 >                             { 
1->Emitted(69, 1) Source(32, 16) + SourceIndex(3)
2 >Emitted(69, 12) Source(32, 26) + SourceIndex(3)
3 >Emitted(69, 29) Source(32, 43) + SourceIndex(3)
4 >Emitted(69, 32) Source(32, 46) + SourceIndex(3)
---
>>>        function someClass() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^
1->
2 >        export class someClass {
3 >                              }
1->Emitted(70, 9) Source(32, 46) + SourceIndex(3)
2 >Emitted(70, 31) Source(32, 70) + SourceIndex(3)
3 >Emitted(70, 32) Source(32, 71) + SourceIndex(3)
---
>>>        return someClass;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1 >
2 >        }
1 >Emitted(71, 9) Source(32, 70) + SourceIndex(3)
2 >Emitted(71, 25) Source(32, 71) + SourceIndex(3)
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
1 >Emitted(72, 5) Source(32, 70) + SourceIndex(3)
2 >Emitted(72, 6) Source(32, 71) + SourceIndex(3)
3 >Emitted(72, 6) Source(32, 46) + SourceIndex(3)
4 >Emitted(72, 10) Source(32, 71) + SourceIndex(3)
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
1->Emitted(73, 5) Source(32, 59) + SourceIndex(3)
2 >Emitted(73, 32) Source(32, 68) + SourceIndex(3)
3 >Emitted(73, 44) Source(32, 71) + SourceIndex(3)
4 >Emitted(73, 45) Source(32, 71) + SourceIndex(3)
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
1->Emitted(74, 1) Source(32, 72) + SourceIndex(3)
2 >Emitted(74, 2) Source(32, 73) + SourceIndex(3)
3 >Emitted(74, 4) Source(32, 26) + SourceIndex(3)
4 >Emitted(74, 21) Source(32, 43) + SourceIndex(3)
5 >Emitted(74, 26) Source(32, 26) + SourceIndex(3)
6 >Emitted(74, 43) Source(32, 43) + SourceIndex(3)
7 >Emitted(74, 51) Source(32, 73) + SourceIndex(3)
---
>>>var internalOther;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >/**@internal*/ 
2 >namespace 
3 >    internalOther
4 >                 .something { export class someClass {} }
1 >Emitted(75, 1) Source(33, 16) + SourceIndex(3)
2 >Emitted(75, 5) Source(33, 26) + SourceIndex(3)
3 >Emitted(75, 18) Source(33, 39) + SourceIndex(3)
4 >Emitted(75, 19) Source(33, 79) + SourceIndex(3)
---
>>>(function (internalOther) {var something;
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^
6 >                               ^^^^^^^^^
7 >                                        ^
8 >                                         ^^^^^^^^^^^^^^^^^->
1->
2 >namespace 
3 >           internalOther
4 >                        .
5 >                           
6 >                               something
7 >                                         { export class someClass {} }
1->Emitted(76, 1) Source(33, 16) + SourceIndex(3)
2 >Emitted(76, 12) Source(33, 26) + SourceIndex(3)
3 >Emitted(76, 25) Source(33, 39) + SourceIndex(3)
4 >Emitted(76, 28) Source(33, 40) + SourceIndex(3)
5 >Emitted(76, 32) Source(33, 40) + SourceIndex(3)
6 >Emitted(76, 41) Source(33, 49) + SourceIndex(3)
7 >Emitted(76, 42) Source(33, 79) + SourceIndex(3)
---
>>>    (function (something) {var someClass = (function () {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^
5 >                           ^^^^^^^^^->
1->
2 >    
3 >               something
4 >                         { 
1->Emitted(77, 5) Source(33, 40) + SourceIndex(3)
2 >Emitted(77, 16) Source(33, 40) + SourceIndex(3)
3 >Emitted(77, 25) Source(33, 49) + SourceIndex(3)
4 >Emitted(77, 28) Source(33, 52) + SourceIndex(3)
---
>>>            function someClass() {}
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^
1->
2 >            export class someClass {
3 >                                  }
1->Emitted(78, 13) Source(33, 52) + SourceIndex(3)
2 >Emitted(78, 35) Source(33, 76) + SourceIndex(3)
3 >Emitted(78, 36) Source(33, 77) + SourceIndex(3)
---
>>>            return someClass;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1 >
2 >            }
1 >Emitted(79, 13) Source(33, 76) + SourceIndex(3)
2 >Emitted(79, 29) Source(33, 77) + SourceIndex(3)
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
1 >Emitted(80, 9) Source(33, 76) + SourceIndex(3)
2 >Emitted(80, 10) Source(33, 77) + SourceIndex(3)
3 >Emitted(80, 10) Source(33, 52) + SourceIndex(3)
4 >Emitted(80, 14) Source(33, 77) + SourceIndex(3)
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
1->Emitted(81, 9) Source(33, 65) + SourceIndex(3)
2 >Emitted(81, 28) Source(33, 74) + SourceIndex(3)
3 >Emitted(81, 40) Source(33, 77) + SourceIndex(3)
4 >Emitted(81, 41) Source(33, 77) + SourceIndex(3)
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
1->Emitted(82, 5) Source(33, 78) + SourceIndex(3)
2 >Emitted(82, 6) Source(33, 79) + SourceIndex(3)
3 >Emitted(82, 8) Source(33, 40) + SourceIndex(3)
4 >Emitted(82, 17) Source(33, 49) + SourceIndex(3)
5 >Emitted(82, 20) Source(33, 40) + SourceIndex(3)
6 >Emitted(82, 43) Source(33, 49) + SourceIndex(3)
7 >Emitted(82, 48) Source(33, 40) + SourceIndex(3)
8 >Emitted(82, 71) Source(33, 49) + SourceIndex(3)
9 >Emitted(82, 79) Source(33, 79) + SourceIndex(3)
---
>>>})(internalOther || (internalOther = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^
5 >                ^^^^^
6 >                     ^^^^^^^^^^^^^
7 >                                  ^^^^^^^^
8 >                                          ^^^^^^^^->
1 >
2 >}
3 > 
4 >   internalOther
5 >                
6 >                     internalOther
7 >                                  .something { export class someClass {} }
1 >Emitted(83, 1) Source(33, 78) + SourceIndex(3)
2 >Emitted(83, 2) Source(33, 79) + SourceIndex(3)
3 >Emitted(83, 4) Source(33, 26) + SourceIndex(3)
4 >Emitted(83, 17) Source(33, 39) + SourceIndex(3)
5 >Emitted(83, 22) Source(33, 26) + SourceIndex(3)
6 >Emitted(83, 35) Source(33, 39) + SourceIndex(3)
7 >Emitted(83, 43) Source(33, 79) + SourceIndex(3)
---
>>>var internalImport = internalNamespace.someClass;
1->
2 >^^^^
3 >    ^^^^^^^^^^^^^^
4 >                  ^^^
5 >                     ^^^^^^^^^^^^^^^^^
6 >                                      ^
7 >                                       ^^^^^^^^^
8 >                                                ^
1->
  >/**@internal*/ 
2 >import 
3 >    internalImport
4 >                   = 
5 >                     internalNamespace
6 >                                      .
7 >                                       someClass
8 >                                                ;
1->Emitted(84, 1) Source(34, 16) + SourceIndex(3)
2 >Emitted(84, 5) Source(34, 23) + SourceIndex(3)
3 >Emitted(84, 19) Source(34, 37) + SourceIndex(3)
4 >Emitted(84, 22) Source(34, 40) + SourceIndex(3)
5 >Emitted(84, 39) Source(34, 57) + SourceIndex(3)
6 >Emitted(84, 40) Source(34, 58) + SourceIndex(3)
7 >Emitted(84, 49) Source(34, 67) + SourceIndex(3)
8 >Emitted(84, 50) Source(34, 68) + SourceIndex(3)
---
>>>
>>>var internalConst = 10;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^
4 >                 ^^^
5 >                    ^^
6 >                      ^
1 >
  >/**@internal*/ type internalType = internalC;
  >/**@internal*/ 
2 >const 
3 >    internalConst
4 >                  = 
5 >                    10
6 >                      ;
1 >Emitted(86, 1) Source(36, 16) + SourceIndex(3)
2 >Emitted(86, 5) Source(36, 22) + SourceIndex(3)
3 >Emitted(86, 18) Source(36, 35) + SourceIndex(3)
4 >Emitted(86, 21) Source(36, 38) + SourceIndex(3)
5 >Emitted(86, 23) Source(36, 40) + SourceIndex(3)
6 >Emitted(86, 24) Source(36, 41) + SourceIndex(3)
---
>>>var internalEnum;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^
4 >                ^^^^^^^^^^^->
1 >
  >/**@internal*/ 
2 >enum 
3 >    internalEnum { a, b, c }
1 >Emitted(87, 1) Source(37, 16) + SourceIndex(3)
2 >Emitted(87, 5) Source(37, 21) + SourceIndex(3)
3 >Emitted(87, 17) Source(37, 45) + SourceIndex(3)
---
>>>(function (internalEnum) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >enum 
3 >           internalEnum
1->Emitted(88, 1) Source(37, 16) + SourceIndex(3)
2 >Emitted(88, 12) Source(37, 21) + SourceIndex(3)
3 >Emitted(88, 24) Source(37, 33) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1-> { 
2 >    a
3 >                                             
1->Emitted(89, 5) Source(37, 36) + SourceIndex(3)
2 >Emitted(89, 46) Source(37, 37) + SourceIndex(3)
3 >Emitted(89, 47) Source(37, 37) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1->, 
2 >    b
3 >                                             
1->Emitted(90, 5) Source(37, 39) + SourceIndex(3)
2 >Emitted(90, 46) Source(37, 40) + SourceIndex(3)
3 >Emitted(90, 47) Source(37, 40) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
1->, 
2 >    c
3 >                                             
1->Emitted(91, 5) Source(37, 42) + SourceIndex(3)
2 >Emitted(91, 46) Source(37, 43) + SourceIndex(3)
3 >Emitted(91, 47) Source(37, 43) + SourceIndex(3)
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
1 >Emitted(92, 1) Source(37, 44) + SourceIndex(3)
2 >Emitted(92, 2) Source(37, 45) + SourceIndex(3)
3 >Emitted(92, 4) Source(37, 21) + SourceIndex(3)
4 >Emitted(92, 16) Source(37, 33) + SourceIndex(3)
5 >Emitted(92, 21) Source(37, 21) + SourceIndex(3)
6 >Emitted(92, 33) Source(37, 33) + SourceIndex(3)
7 >Emitted(92, 41) Source(37, 45) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(93, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(94, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(95, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(95, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(96, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(96, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(96, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(97, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(97, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(97, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(97, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(97, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(97, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(97, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(97, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(98, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(98, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(99, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(99, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(100, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(100, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(100, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(100, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(101, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(101, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(101, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(101, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(101, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(101, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(101, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(101, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(102, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(102, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(102, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(102, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(102, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(102, 17) Source(2, 17) + SourceIndex(5)
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
          "end": 3054,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 3054,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 3054,
          "end": 3090,
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
prepend: (0-3054):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-3054)

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
var normalC = (function () {
    function normalC() {}
    normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        get: function () { return 10; },
        set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    var C = (function () {
        function C() {}
        return C;
    }());
    normalN.C = C;
    function foo() { }
    normalN.foo = foo;
    var someNamespace;
    (function (someNamespace) {var C = (function () {
            function C() {}
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    var someOther;
    (function (someOther) {var something;
        (function (something) {var someClass = (function () {
                function someClass() {}
                return someClass;
            }());
            something.someClass = someClass;
        })(something = someOther.something || (someOther.something = {}));
    })(someOther = normalN.someOther || (normalN.someOther = {}));
    normalN.someImport = someNamespace.C;
    normalN.internalConst = 10;
    var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
var internalC = (function () {
    function internalC() {}
    return internalC;
}());
function internalfoo() { }
var internalNamespace;
(function (internalNamespace) {var someClass = (function () {
        function someClass() {}
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
var internalOther;
(function (internalOther) {var something;
    (function (something) {var someClass = (function () {
            function someClass() {}
            return someClass;
        }());
        something.someClass = someClass;
    })(something = internalOther.something || (internalOther.something = {}));
})(internalOther || (internalOther = {}));
var internalImport = internalNamespace.someClass;

var internalConst = 10;
var internalEnum;
(function (internalEnum) {
    internalEnum[internalEnum["a"] = 0] = "a";
    internalEnum[internalEnum["b"] = 1] = "b";
    internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
    function C() {
    }
    C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (3054-3090)
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

