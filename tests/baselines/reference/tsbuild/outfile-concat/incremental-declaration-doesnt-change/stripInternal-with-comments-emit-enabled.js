//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,aAAa;;AAIb,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
1 >Emitted(5, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(5, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(5, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(5, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(5, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(5, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(5, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(5, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(6, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(7, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(7, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(7, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(7, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(7, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(7, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(7, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(7, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(8, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(8, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(8, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(9, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(9, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(9, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(9, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(10, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(10, 2) Source(3, 2) + SourceIndex(2)
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
          "end": 147,
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
text: (0-147)
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
        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
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
    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = /** @class */ (function () {
    function C() {
    }C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
var c = new C();
c.doSomething();
//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.js.map]
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,aAAa;;AAIb,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACf,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACXf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACI,aAAa,CAAC,oBAAgB,CAAC;;IAE/B,aAAa,CAAC,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;QAAnB,aAAa,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;QACpC,aAAa,MAAC,UAAM,GAAW,IAAI,CAAC;;;OADA;IAExC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACb,aAAa,CAAC;QAAA,cAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAChC,aAAa,CAAC,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACtC,aAAa,CAAC,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa,GAAG;YAAA,cAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IAClE,aAAa,CAAC,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS,GAAG;gBAAA,sBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IAChF,aAAa,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;;IAEzD,aAAa,CAAc,qBAAa,GAAG,EAAE,CAAC;IAC9C,aAAa,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAE,yCAAC,CAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACtD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACD,aAAa,CAAC;IAAA,sBAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAChC,aAAa,CAAC,SAAS,WAAW,KAAI,CAAC;AACvC,aAAa,CAAC,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB,GAAG;QAAA,sBAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACvE,aAAa,CAAC,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS,GAAG;YAAA,sBAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC7E,aAAa,CAAC,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;;AAElE,aAAa,CAAC,IAAM,aAAa,GAAG,EAAE,CAAC;AACvC,aAAa,CAAC,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAE,yCAAC,CAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC3C;IAAA;IAIA,CAAC,AAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
1 >Emitted(5, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(5, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(5, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(5, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(5, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(5, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(5, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(5, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(6, 1) Source(12, 1) + SourceIndex(0)
2 >Emitted(6, 8) Source(12, 8) + SourceIndex(0)
3 >Emitted(6, 9) Source(12, 9) + SourceIndex(0)
4 >Emitted(6, 12) Source(12, 12) + SourceIndex(0)
5 >Emitted(6, 13) Source(12, 13) + SourceIndex(0)
6 >Emitted(6, 14) Source(12, 14) + SourceIndex(0)
7 >Emitted(6, 15) Source(12, 15) + SourceIndex(0)
8 >Emitted(6, 16) Source(12, 16) + SourceIndex(0)
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
1->Emitted(7, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(7, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(7, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(7, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(7, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(7, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(7, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(7, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(7, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(8, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(8, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(8, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(9, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(9, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(9, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(9, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(10, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(10, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(11, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(11, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(11, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(11, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(12, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(12, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(12, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(13, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(13, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(13, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(14, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(14, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(14, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(14, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(14, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(14, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(14, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(14, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >    
2 >    }
1 >Emitted(15, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(15, 6) Source(8, 6) + SourceIndex(3)
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
1 >Emitted(17, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(17, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(17, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(17, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(18, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(18, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(18, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(18, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(18, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(18, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(18, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(19, 1) Source(13, 1) + SourceIndex(3)
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
1->Emitted(20, 5) Source(14, 5) + SourceIndex(3)
2 >Emitted(20, 18) Source(14, 18) + SourceIndex(3)
3 >Emitted(20, 19) Source(14, 19) + SourceIndex(3)
4 >Emitted(20, 39) Source(14, 35) + SourceIndex(3)
5 >Emitted(20, 40) Source(14, 36) + SourceIndex(3)
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
1 >Emitted(22, 5) Source(16, 5) + SourceIndex(3)
2 >Emitted(22, 18) Source(16, 18) + SourceIndex(3)
3 >Emitted(22, 19) Source(16, 19) + SourceIndex(3)
4 >Emitted(22, 43) Source(16, 25) + SourceIndex(3)
5 >Emitted(22, 46) Source(16, 19) + SourceIndex(3)
6 >Emitted(22, 60) Source(16, 30) + SourceIndex(3)
7 >Emitted(22, 61) Source(16, 31) + SourceIndex(3)
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
1 >Emitted(23, 5) Source(17, 19) + SourceIndex(3)
2 >Emitted(23, 27) Source(17, 23) + SourceIndex(3)
3 >Emitted(23, 49) Source(17, 24) + SourceIndex(3)
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
1->Emitted(24, 9) Source(17, 5) + SourceIndex(3)
2 >Emitted(24, 22) Source(17, 18) + SourceIndex(3)
3 >Emitted(24, 28) Source(17, 19) + SourceIndex(3)
4 >Emitted(24, 42) Source(17, 29) + SourceIndex(3)
5 >Emitted(24, 49) Source(17, 36) + SourceIndex(3)
6 >Emitted(24, 51) Source(17, 38) + SourceIndex(3)
7 >Emitted(24, 52) Source(17, 39) + SourceIndex(3)
8 >Emitted(24, 53) Source(17, 40) + SourceIndex(3)
9 >Emitted(24, 54) Source(17, 41) + SourceIndex(3)
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
1 >Emitted(25, 9) Source(18, 5) + SourceIndex(3)
2 >Emitted(25, 22) Source(18, 18) + SourceIndex(3)
3 >Emitted(25, 28) Source(18, 19) + SourceIndex(3)
4 >Emitted(25, 38) Source(18, 25) + SourceIndex(3)
5 >Emitted(25, 41) Source(18, 36) + SourceIndex(3)
6 >Emitted(25, 45) Source(18, 40) + SourceIndex(3)
7 >Emitted(25, 46) Source(18, 41) + SourceIndex(3)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(28, 8) Source(17, 41) + SourceIndex(3)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /*@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(29, 5) Source(19, 1) + SourceIndex(3)
2 >Emitted(29, 19) Source(19, 2) + SourceIndex(3)
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
1 >Emitted(30, 1) Source(19, 1) + SourceIndex(3)
2 >Emitted(30, 2) Source(19, 2) + SourceIndex(3)
3 >Emitted(30, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(30, 6) Source(19, 2) + SourceIndex(3)
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
1->Emitted(31, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(31, 5) Source(20, 11) + SourceIndex(3)
3 >Emitted(31, 12) Source(20, 18) + SourceIndex(3)
4 >Emitted(31, 13) Source(29, 2) + SourceIndex(3)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(32, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(32, 12) Source(20, 11) + SourceIndex(3)
3 >Emitted(32, 19) Source(20, 18) + SourceIndex(3)
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
1->Emitted(33, 5) Source(21, 5) + SourceIndex(3)
2 >Emitted(33, 18) Source(21, 18) + SourceIndex(3)
3 >Emitted(33, 19) Source(21, 19) + SourceIndex(3)
---
>>>        function C() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^
1->
2 >        export class C { 
3 >                      }
1->Emitted(34, 9) Source(21, 19) + SourceIndex(3)
2 >Emitted(34, 23) Source(21, 36) + SourceIndex(3)
3 >Emitted(34, 24) Source(21, 37) + SourceIndex(3)
---
>>>        return C;
1 >^^^^^^^^
2 >        ^^^^^^^^
1 >
2 >        }
1 >Emitted(35, 9) Source(21, 36) + SourceIndex(3)
2 >Emitted(35, 17) Source(21, 37) + SourceIndex(3)
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
1 >Emitted(36, 5) Source(21, 36) + SourceIndex(3)
2 >Emitted(36, 6) Source(21, 37) + SourceIndex(3)
3 >Emitted(36, 6) Source(21, 19) + SourceIndex(3)
4 >Emitted(36, 10) Source(21, 37) + SourceIndex(3)
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
1->Emitted(37, 5) Source(21, 32) + SourceIndex(3)
2 >Emitted(37, 14) Source(21, 33) + SourceIndex(3)
3 >Emitted(37, 18) Source(21, 37) + SourceIndex(3)
4 >Emitted(37, 19) Source(21, 37) + SourceIndex(3)
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
1->Emitted(38, 5) Source(22, 5) + SourceIndex(3)
2 >Emitted(38, 18) Source(22, 18) + SourceIndex(3)
3 >Emitted(38, 19) Source(22, 19) + SourceIndex(3)
4 >Emitted(38, 28) Source(22, 35) + SourceIndex(3)
5 >Emitted(38, 31) Source(22, 38) + SourceIndex(3)
6 >Emitted(38, 36) Source(22, 42) + SourceIndex(3)
7 >Emitted(38, 37) Source(22, 43) + SourceIndex(3)
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
1 >Emitted(39, 5) Source(22, 35) + SourceIndex(3)
2 >Emitted(39, 16) Source(22, 38) + SourceIndex(3)
3 >Emitted(39, 22) Source(22, 43) + SourceIndex(3)
4 >Emitted(39, 23) Source(22, 43) + SourceIndex(3)
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
1->Emitted(40, 5) Source(23, 5) + SourceIndex(3)
2 >Emitted(40, 18) Source(23, 18) + SourceIndex(3)
3 >Emitted(40, 19) Source(23, 19) + SourceIndex(3)
4 >Emitted(40, 23) Source(23, 36) + SourceIndex(3)
5 >Emitted(40, 36) Source(23, 49) + SourceIndex(3)
6 >Emitted(40, 37) Source(23, 71) + SourceIndex(3)
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
1->Emitted(41, 5) Source(23, 19) + SourceIndex(3)
2 >Emitted(41, 16) Source(23, 36) + SourceIndex(3)
3 >Emitted(41, 29) Source(23, 49) + SourceIndex(3)
4 >Emitted(41, 32) Source(23, 52) + SourceIndex(3)
---
>>>            function C() {}
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^
3 >                          ^
1 >
2 >            export class C {
3 >                          }
1 >Emitted(42, 13) Source(23, 52) + SourceIndex(3)
2 >Emitted(42, 27) Source(23, 68) + SourceIndex(3)
3 >Emitted(42, 28) Source(23, 69) + SourceIndex(3)
---
>>>            return C;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^
1 >
2 >            }
1 >Emitted(43, 13) Source(23, 68) + SourceIndex(3)
2 >Emitted(43, 21) Source(23, 69) + SourceIndex(3)
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
1 >Emitted(44, 9) Source(23, 68) + SourceIndex(3)
2 >Emitted(44, 10) Source(23, 69) + SourceIndex(3)
3 >Emitted(44, 10) Source(23, 52) + SourceIndex(3)
4 >Emitted(44, 14) Source(23, 69) + SourceIndex(3)
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
1->Emitted(45, 9) Source(23, 65) + SourceIndex(3)
2 >Emitted(45, 24) Source(23, 66) + SourceIndex(3)
3 >Emitted(45, 28) Source(23, 69) + SourceIndex(3)
4 >Emitted(45, 29) Source(23, 69) + SourceIndex(3)
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
1->Emitted(46, 5) Source(23, 70) + SourceIndex(3)
2 >Emitted(46, 6) Source(23, 71) + SourceIndex(3)
3 >Emitted(46, 8) Source(23, 36) + SourceIndex(3)
4 >Emitted(46, 21) Source(23, 49) + SourceIndex(3)
5 >Emitted(46, 24) Source(23, 36) + SourceIndex(3)
6 >Emitted(46, 45) Source(23, 49) + SourceIndex(3)
7 >Emitted(46, 50) Source(23, 36) + SourceIndex(3)
8 >Emitted(46, 71) Source(23, 49) + SourceIndex(3)
9 >Emitted(46, 79) Source(23, 71) + SourceIndex(3)
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
1 >Emitted(47, 5) Source(24, 5) + SourceIndex(3)
2 >Emitted(47, 18) Source(24, 18) + SourceIndex(3)
3 >Emitted(47, 19) Source(24, 19) + SourceIndex(3)
4 >Emitted(47, 23) Source(24, 36) + SourceIndex(3)
5 >Emitted(47, 32) Source(24, 45) + SourceIndex(3)
6 >Emitted(47, 33) Source(24, 85) + SourceIndex(3)
---
>>>    (function (someOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1 >
2 >    export namespace 
3 >               someOther
1 >Emitted(48, 5) Source(24, 19) + SourceIndex(3)
2 >Emitted(48, 16) Source(24, 36) + SourceIndex(3)
3 >Emitted(48, 25) Source(24, 45) + SourceIndex(3)
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
1 >Emitted(49, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(49, 13) Source(24, 46) + SourceIndex(3)
3 >Emitted(49, 22) Source(24, 55) + SourceIndex(3)
4 >Emitted(49, 23) Source(24, 85) + SourceIndex(3)
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
1->Emitted(50, 9) Source(24, 46) + SourceIndex(3)
2 >Emitted(50, 20) Source(24, 46) + SourceIndex(3)
3 >Emitted(50, 29) Source(24, 55) + SourceIndex(3)
4 >Emitted(50, 32) Source(24, 58) + SourceIndex(3)
---
>>>                function someClass() {}
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^
1->
2 >                export class someClass {
3 >                                      }
1->Emitted(51, 17) Source(24, 58) + SourceIndex(3)
2 >Emitted(51, 39) Source(24, 82) + SourceIndex(3)
3 >Emitted(51, 40) Source(24, 83) + SourceIndex(3)
---
>>>                return someClass;
1 >^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1 >
2 >                }
1 >Emitted(52, 17) Source(24, 82) + SourceIndex(3)
2 >Emitted(52, 33) Source(24, 83) + SourceIndex(3)
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
1 >Emitted(53, 13) Source(24, 82) + SourceIndex(3)
2 >Emitted(53, 14) Source(24, 83) + SourceIndex(3)
3 >Emitted(53, 14) Source(24, 58) + SourceIndex(3)
4 >Emitted(53, 18) Source(24, 83) + SourceIndex(3)
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
1->Emitted(54, 13) Source(24, 71) + SourceIndex(3)
2 >Emitted(54, 32) Source(24, 80) + SourceIndex(3)
3 >Emitted(54, 44) Source(24, 83) + SourceIndex(3)
4 >Emitted(54, 45) Source(24, 83) + SourceIndex(3)
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
1->Emitted(55, 9) Source(24, 84) + SourceIndex(3)
2 >Emitted(55, 10) Source(24, 85) + SourceIndex(3)
3 >Emitted(55, 12) Source(24, 46) + SourceIndex(3)
4 >Emitted(55, 21) Source(24, 55) + SourceIndex(3)
5 >Emitted(55, 24) Source(24, 46) + SourceIndex(3)
6 >Emitted(55, 43) Source(24, 55) + SourceIndex(3)
7 >Emitted(55, 48) Source(24, 46) + SourceIndex(3)
8 >Emitted(55, 67) Source(24, 55) + SourceIndex(3)
9 >Emitted(55, 75) Source(24, 85) + SourceIndex(3)
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
1 >Emitted(56, 5) Source(24, 84) + SourceIndex(3)
2 >Emitted(56, 6) Source(24, 85) + SourceIndex(3)
3 >Emitted(56, 8) Source(24, 36) + SourceIndex(3)
4 >Emitted(56, 17) Source(24, 45) + SourceIndex(3)
5 >Emitted(56, 20) Source(24, 36) + SourceIndex(3)
6 >Emitted(56, 37) Source(24, 45) + SourceIndex(3)
7 >Emitted(56, 42) Source(24, 36) + SourceIndex(3)
8 >Emitted(56, 59) Source(24, 45) + SourceIndex(3)
9 >Emitted(56, 67) Source(24, 85) + SourceIndex(3)
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
1 >Emitted(57, 5) Source(25, 5) + SourceIndex(3)
2 >Emitted(57, 18) Source(25, 18) + SourceIndex(3)
3 >Emitted(57, 19) Source(25, 33) + SourceIndex(3)
4 >Emitted(57, 37) Source(25, 43) + SourceIndex(3)
5 >Emitted(57, 40) Source(25, 46) + SourceIndex(3)
6 >Emitted(57, 53) Source(25, 59) + SourceIndex(3)
7 >Emitted(57, 54) Source(25, 60) + SourceIndex(3)
8 >Emitted(57, 55) Source(25, 61) + SourceIndex(3)
9 >Emitted(57, 56) Source(25, 62) + SourceIndex(3)
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
1 >Emitted(59, 5) Source(27, 5) + SourceIndex(3)
2 >Emitted(59, 18) Source(27, 18) + SourceIndex(3)
3 >Emitted(59, 19) Source(27, 32) + SourceIndex(3)
4 >Emitted(59, 40) Source(27, 45) + SourceIndex(3)
5 >Emitted(59, 43) Source(27, 48) + SourceIndex(3)
6 >Emitted(59, 45) Source(27, 50) + SourceIndex(3)
7 >Emitted(59, 46) Source(27, 51) + SourceIndex(3)
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
1 >Emitted(60, 5) Source(28, 5) + SourceIndex(3)
2 >Emitted(60, 18) Source(28, 18) + SourceIndex(3)
3 >Emitted(60, 19) Source(28, 19) + SourceIndex(3)
4 >Emitted(60, 23) Source(28, 31) + SourceIndex(3)
5 >Emitted(60, 35) Source(28, 55) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(61, 5) Source(28, 19) + SourceIndex(3)
2 >Emitted(61, 16) Source(28, 31) + SourceIndex(3)
3 >Emitted(61, 28) Source(28, 43) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                                                                           ^
6 >                                                                                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                                                                     ^
1-> { 
2 >        a
3 >                                                 , 
4 >                                                  b
5 >                                                                                           , 
6 >                                                                                            c
7 >                                                                                                                                     
1->Emitted(62, 9) Source(28, 46) + SourceIndex(3)
2 >Emitted(62, 50) Source(28, 47) + SourceIndex(3)
3 >Emitted(62, 51) Source(28, 49) + SourceIndex(3)
4 >Emitted(62, 92) Source(28, 50) + SourceIndex(3)
5 >Emitted(62, 93) Source(28, 52) + SourceIndex(3)
6 >Emitted(62, 134) Source(28, 53) + SourceIndex(3)
7 >Emitted(62, 135) Source(28, 53) + SourceIndex(3)
---
>>>    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
1 >^^^^
2 >    ^
3 >     ^^
4 >       ^^^^^^^^^^^^
5 >                   ^^^
6 >                      ^^^^^^^^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^^^^^^^^^^^^^^^^^^^^
9 >                                                                   ^^^^^^^^
1 > 
2 >    }
3 >     
4 >       internalEnum
5 >                   
6 >                      internalEnum
7 >                                          
8 >                                               internalEnum
9 >                                                                    { a, b, c }
1 >Emitted(63, 5) Source(28, 54) + SourceIndex(3)
2 >Emitted(63, 6) Source(28, 55) + SourceIndex(3)
3 >Emitted(63, 8) Source(28, 31) + SourceIndex(3)
4 >Emitted(63, 20) Source(28, 43) + SourceIndex(3)
5 >Emitted(63, 23) Source(28, 31) + SourceIndex(3)
6 >Emitted(63, 43) Source(28, 43) + SourceIndex(3)
7 >Emitted(63, 48) Source(28, 31) + SourceIndex(3)
8 >Emitted(63, 68) Source(28, 43) + SourceIndex(3)
9 >Emitted(63, 76) Source(28, 55) + SourceIndex(3)
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
1 >Emitted(64, 1) Source(29, 1) + SourceIndex(3)
2 >Emitted(64, 2) Source(29, 2) + SourceIndex(3)
3 >Emitted(64, 4) Source(20, 11) + SourceIndex(3)
4 >Emitted(64, 11) Source(20, 18) + SourceIndex(3)
5 >Emitted(64, 16) Source(20, 11) + SourceIndex(3)
6 >Emitted(64, 23) Source(20, 18) + SourceIndex(3)
7 >Emitted(64, 31) Source(29, 2) + SourceIndex(3)
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
1->Emitted(65, 1) Source(30, 1) + SourceIndex(3)
2 >Emitted(65, 14) Source(30, 14) + SourceIndex(3)
3 >Emitted(65, 15) Source(30, 15) + SourceIndex(3)
---
>>>    function internalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^
1->
2 >    class internalC {
3 >                          }
1->Emitted(66, 5) Source(30, 15) + SourceIndex(3)
2 >Emitted(66, 27) Source(30, 32) + SourceIndex(3)
3 >Emitted(66, 28) Source(30, 33) + SourceIndex(3)
---
>>>    return internalC;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
1 >
2 >    }
1 >Emitted(67, 5) Source(30, 32) + SourceIndex(3)
2 >Emitted(67, 21) Source(30, 33) + SourceIndex(3)
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
1 >Emitted(68, 1) Source(30, 32) + SourceIndex(3)
2 >Emitted(68, 2) Source(30, 33) + SourceIndex(3)
3 >Emitted(68, 2) Source(30, 15) + SourceIndex(3)
4 >Emitted(68, 6) Source(30, 33) + SourceIndex(3)
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
1->Emitted(69, 1) Source(31, 1) + SourceIndex(3)
2 >Emitted(69, 14) Source(31, 14) + SourceIndex(3)
3 >Emitted(69, 15) Source(31, 15) + SourceIndex(3)
4 >Emitted(69, 24) Source(31, 24) + SourceIndex(3)
5 >Emitted(69, 35) Source(31, 35) + SourceIndex(3)
6 >Emitted(69, 40) Source(31, 39) + SourceIndex(3)
7 >Emitted(69, 41) Source(31, 40) + SourceIndex(3)
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
1 >Emitted(70, 1) Source(32, 1) + SourceIndex(3)
2 >Emitted(70, 14) Source(32, 14) + SourceIndex(3)
3 >Emitted(70, 15) Source(32, 15) + SourceIndex(3)
4 >Emitted(70, 19) Source(32, 25) + SourceIndex(3)
5 >Emitted(70, 36) Source(32, 42) + SourceIndex(3)
6 >Emitted(70, 37) Source(32, 72) + SourceIndex(3)
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
1->Emitted(71, 1) Source(32, 15) + SourceIndex(3)
2 >Emitted(71, 12) Source(32, 25) + SourceIndex(3)
3 >Emitted(71, 29) Source(32, 42) + SourceIndex(3)
4 >Emitted(71, 32) Source(32, 45) + SourceIndex(3)
---
>>>        function someClass() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^
1->
2 >        export class someClass {
3 >                              }
1->Emitted(72, 9) Source(32, 45) + SourceIndex(3)
2 >Emitted(72, 31) Source(32, 69) + SourceIndex(3)
3 >Emitted(72, 32) Source(32, 70) + SourceIndex(3)
---
>>>        return someClass;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1 >
2 >        }
1 >Emitted(73, 9) Source(32, 69) + SourceIndex(3)
2 >Emitted(73, 25) Source(32, 70) + SourceIndex(3)
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
1 >Emitted(74, 5) Source(32, 69) + SourceIndex(3)
2 >Emitted(74, 6) Source(32, 70) + SourceIndex(3)
3 >Emitted(74, 6) Source(32, 45) + SourceIndex(3)
4 >Emitted(74, 10) Source(32, 70) + SourceIndex(3)
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
1->Emitted(75, 5) Source(32, 58) + SourceIndex(3)
2 >Emitted(75, 32) Source(32, 67) + SourceIndex(3)
3 >Emitted(75, 44) Source(32, 70) + SourceIndex(3)
4 >Emitted(75, 45) Source(32, 70) + SourceIndex(3)
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
1->Emitted(76, 1) Source(32, 71) + SourceIndex(3)
2 >Emitted(76, 2) Source(32, 72) + SourceIndex(3)
3 >Emitted(76, 4) Source(32, 25) + SourceIndex(3)
4 >Emitted(76, 21) Source(32, 42) + SourceIndex(3)
5 >Emitted(76, 26) Source(32, 25) + SourceIndex(3)
6 >Emitted(76, 43) Source(32, 42) + SourceIndex(3)
7 >Emitted(76, 51) Source(32, 72) + SourceIndex(3)
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
1 >Emitted(77, 1) Source(33, 1) + SourceIndex(3)
2 >Emitted(77, 14) Source(33, 14) + SourceIndex(3)
3 >Emitted(77, 15) Source(33, 15) + SourceIndex(3)
4 >Emitted(77, 19) Source(33, 25) + SourceIndex(3)
5 >Emitted(77, 32) Source(33, 38) + SourceIndex(3)
6 >Emitted(77, 33) Source(33, 78) + SourceIndex(3)
---
>>>(function (internalOther) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1 >
2 >namespace 
3 >           internalOther
1 >Emitted(78, 1) Source(33, 15) + SourceIndex(3)
2 >Emitted(78, 12) Source(33, 25) + SourceIndex(3)
3 >Emitted(78, 25) Source(33, 38) + SourceIndex(3)
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
1 >Emitted(79, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(79, 9) Source(33, 39) + SourceIndex(3)
3 >Emitted(79, 18) Source(33, 48) + SourceIndex(3)
4 >Emitted(79, 19) Source(33, 78) + SourceIndex(3)
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
1->Emitted(80, 5) Source(33, 39) + SourceIndex(3)
2 >Emitted(80, 16) Source(33, 39) + SourceIndex(3)
3 >Emitted(80, 25) Source(33, 48) + SourceIndex(3)
4 >Emitted(80, 28) Source(33, 51) + SourceIndex(3)
---
>>>            function someClass() {}
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^
1->
2 >            export class someClass {
3 >                                  }
1->Emitted(81, 13) Source(33, 51) + SourceIndex(3)
2 >Emitted(81, 35) Source(33, 75) + SourceIndex(3)
3 >Emitted(81, 36) Source(33, 76) + SourceIndex(3)
---
>>>            return someClass;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1 >
2 >            }
1 >Emitted(82, 13) Source(33, 75) + SourceIndex(3)
2 >Emitted(82, 29) Source(33, 76) + SourceIndex(3)
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
1 >Emitted(83, 9) Source(33, 75) + SourceIndex(3)
2 >Emitted(83, 10) Source(33, 76) + SourceIndex(3)
3 >Emitted(83, 10) Source(33, 51) + SourceIndex(3)
4 >Emitted(83, 14) Source(33, 76) + SourceIndex(3)
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
1->Emitted(84, 9) Source(33, 64) + SourceIndex(3)
2 >Emitted(84, 28) Source(33, 73) + SourceIndex(3)
3 >Emitted(84, 40) Source(33, 76) + SourceIndex(3)
4 >Emitted(84, 41) Source(33, 76) + SourceIndex(3)
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
1->Emitted(85, 5) Source(33, 77) + SourceIndex(3)
2 >Emitted(85, 6) Source(33, 78) + SourceIndex(3)
3 >Emitted(85, 8) Source(33, 39) + SourceIndex(3)
4 >Emitted(85, 17) Source(33, 48) + SourceIndex(3)
5 >Emitted(85, 20) Source(33, 39) + SourceIndex(3)
6 >Emitted(85, 43) Source(33, 48) + SourceIndex(3)
7 >Emitted(85, 48) Source(33, 39) + SourceIndex(3)
8 >Emitted(85, 71) Source(33, 48) + SourceIndex(3)
9 >Emitted(85, 79) Source(33, 78) + SourceIndex(3)
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
1 >Emitted(86, 1) Source(33, 77) + SourceIndex(3)
2 >Emitted(86, 2) Source(33, 78) + SourceIndex(3)
3 >Emitted(86, 4) Source(33, 25) + SourceIndex(3)
4 >Emitted(86, 17) Source(33, 38) + SourceIndex(3)
5 >Emitted(86, 22) Source(33, 25) + SourceIndex(3)
6 >Emitted(86, 35) Source(33, 38) + SourceIndex(3)
7 >Emitted(86, 43) Source(33, 78) + SourceIndex(3)
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
1->Emitted(87, 1) Source(34, 1) + SourceIndex(3)
2 >Emitted(87, 14) Source(34, 14) + SourceIndex(3)
3 >Emitted(87, 15) Source(34, 15) + SourceIndex(3)
4 >Emitted(87, 19) Source(34, 22) + SourceIndex(3)
5 >Emitted(87, 33) Source(34, 36) + SourceIndex(3)
6 >Emitted(87, 36) Source(34, 39) + SourceIndex(3)
7 >Emitted(87, 53) Source(34, 56) + SourceIndex(3)
8 >Emitted(87, 54) Source(34, 57) + SourceIndex(3)
9 >Emitted(87, 63) Source(34, 66) + SourceIndex(3)
10>Emitted(87, 64) Source(34, 67) + SourceIndex(3)
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
1 >Emitted(89, 1) Source(36, 1) + SourceIndex(3)
2 >Emitted(89, 14) Source(36, 14) + SourceIndex(3)
3 >Emitted(89, 15) Source(36, 15) + SourceIndex(3)
4 >Emitted(89, 19) Source(36, 21) + SourceIndex(3)
5 >Emitted(89, 32) Source(36, 34) + SourceIndex(3)
6 >Emitted(89, 35) Source(36, 37) + SourceIndex(3)
7 >Emitted(89, 37) Source(36, 39) + SourceIndex(3)
8 >Emitted(89, 38) Source(36, 40) + SourceIndex(3)
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
1 >Emitted(90, 1) Source(37, 1) + SourceIndex(3)
2 >Emitted(90, 14) Source(37, 14) + SourceIndex(3)
3 >Emitted(90, 15) Source(37, 15) + SourceIndex(3)
4 >Emitted(90, 19) Source(37, 20) + SourceIndex(3)
5 >Emitted(90, 31) Source(37, 44) + SourceIndex(3)
---
>>>(function (internalEnum) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >enum 
3 >           internalEnum
1 >Emitted(91, 1) Source(37, 15) + SourceIndex(3)
2 >Emitted(91, 12) Source(37, 20) + SourceIndex(3)
3 >Emitted(91, 24) Source(37, 32) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                                                                       ^
6 >                                                                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
7 >                                                                                                                                 ^
1-> { 
2 >    a
3 >                                             , 
4 >                                              b
5 >                                                                                       , 
6 >                                                                                        c
7 >                                                                                                                                 
1->Emitted(92, 5) Source(37, 35) + SourceIndex(3)
2 >Emitted(92, 46) Source(37, 36) + SourceIndex(3)
3 >Emitted(92, 47) Source(37, 38) + SourceIndex(3)
4 >Emitted(92, 88) Source(37, 39) + SourceIndex(3)
5 >Emitted(92, 89) Source(37, 41) + SourceIndex(3)
6 >Emitted(92, 130) Source(37, 42) + SourceIndex(3)
7 >Emitted(92, 131) Source(37, 42) + SourceIndex(3)
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
1 >Emitted(93, 1) Source(37, 43) + SourceIndex(3)
2 >Emitted(93, 2) Source(37, 44) + SourceIndex(3)
3 >Emitted(93, 4) Source(37, 20) + SourceIndex(3)
4 >Emitted(93, 16) Source(37, 32) + SourceIndex(3)
5 >Emitted(93, 21) Source(37, 20) + SourceIndex(3)
6 >Emitted(93, 33) Source(37, 32) + SourceIndex(3)
7 >Emitted(93, 41) Source(37, 44) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = /** @class */ (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(94, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(95, 5) Source(1, 1) + SourceIndex(4)
---
>>>    }C.prototype.doSomething = function () {
1->^^^^
2 >    ^
3 >     
4 >     ^^^^^^^^^^^^^^^^^^^^^^^
5 >                            ^^^
6 >                               ^^^^^^^^^^^^->
1->class C {
  >    doSomething() {
  >        console.log("something got done");
  >    }
  >
2 >    }
3 >     
4 >     doSomething
5 >                            
1->Emitted(96, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(96, 6) Source(5, 2) + SourceIndex(4)
3 >Emitted(96, 6) Source(2, 5) + SourceIndex(4)
4 >Emitted(96, 29) Source(2, 16) + SourceIndex(4)
5 >Emitted(96, 32) Source(2, 5) + SourceIndex(4)
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
          "end": 147,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 147,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 147,
          "end": 3416,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 147,
              "end": 3416,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 3416,
          "end": 3452,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 116,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 116,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 116,
          "end": 276,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 116,
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
prepend: (0-147):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-147)
/*@internal*/ 

var s = "Hello, world";

console.log(s);
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (147-3416):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (147-3416)
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
        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
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
    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = /** @class */ (function () {
    function C() {
    }C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (3416-3452)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-116):: ../../../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-116)
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

----------------------------------------------------------------------
prepend: (116-276):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (116-276)
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

