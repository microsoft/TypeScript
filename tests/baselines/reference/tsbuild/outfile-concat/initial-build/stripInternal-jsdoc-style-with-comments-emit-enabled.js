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

//// [/src/first/first_PART1.ts]
/**@internal*/ interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);


//// [/src/first/first_part2.ts]
console.log(f());


//// [/src/first/first_part3.ts]
function f() {
    return "JS does hoists";
}

//// [/src/first/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": false,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "outFile": "./bin/first-output.js",
    "skipDefaultLibCheck": true,
  },
  "files": [
    "first_PART1.ts",
    "first_part2.ts",
    "first_part3.ts"
  ],
  "references": [
  ]
}


//// [/src/second/second_part1.ts]
namespace N {
    // Comment text
}

namespace N {
    function f() {
        console.log('testing');
    }

    f();
}

class normalC {
    /**@internal*/ constructor() { }
    /**@internal*/ prop: string;
    /**@internal*/ method() { }
    /**@internal*/ get c() { return 10; }
    /**@internal*/ set c(val: number) { }
}
namespace normalN {
    /**@internal*/ export class C { }
    /**@internal*/ export function foo() {}
    /**@internal*/ export namespace someNamespace { export class C {} }
    /**@internal*/ export namespace someOther.something { export class someClass {} }
    /**@internal*/ export import someImport = someNamespace.C;
    /**@internal*/ export type internalType = internalC;
    /**@internal*/ export const internalConst = 10;
    /**@internal*/ export enum internalEnum { a, b, c }
}
/**@internal*/ class internalC {}
/**@internal*/ function internalfoo() {}
/**@internal*/ namespace internalNamespace { export class someClass {} }
/**@internal*/ namespace internalOther.something { export class someClass {} }
/**@internal*/ import internalImport = internalNamespace.someClass;
/**@internal*/ type internalType = internalC;
/**@internal*/ const internalConst = 10;
/**@internal*/ enum internalEnum { a, b, c }

//// [/src/second/second_part2.ts]
class C {
    doSomething() {
        console.log("something got done");
    }
}


//// [/src/second/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": false,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "outFile": "../2/second-output.js",
    "skipDefaultLibCheck": true
  },
  "references": [
  ]
}


//// [/src/third/third_part1.ts]
var c = new C();
c.doSomething();


//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": false,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "stripInternal": true,
    "outFile": "./thirdjs/output/third-output.js",
    "skipDefaultLibCheck": true,
  },
  "files": [
    "third_part1.ts"
  ],
  "references": [
    { "path": "../first", "prepend": true },
    { "path": "../second", "prepend": true },
  ]
}




Output::
/lib/tsc --b /src/third --verbose
[[90m12:01:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:01:00 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/2/second-output.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/second/tsconfig.json'...

[[90m12:01:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output file 'src/third/thirdjs/output/third-output.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/2/second-output.d.ts]
declare namespace N {
}
declare namespace N {
}
declare class normalC {
    /**@internal*/ constructor();
    /**@internal*/ prop: string;
    /**@internal*/ method(): void;
    /**@internal*/ get c(): number;
    /**@internal*/ set c(val: number);
}
declare namespace normalN {
    /**@internal*/ class C {
    }
    /**@internal*/ function foo(): void;
    /**@internal*/ namespace someNamespace {
        class C {
        }
    }
    /**@internal*/ namespace someOther.something {
        class someClass {
        }
    }
    /**@internal*/ export import someImport = someNamespace.C;
    /**@internal*/ type internalType = internalC;
    /**@internal*/ const internalConst = 10;
    /**@internal*/ enum internalEnum {
        a = 0,
        b = 1,
        c = 2
    }
}
/**@internal*/ declare class internalC {
}
/**@internal*/ declare function internalfoo(): void;
/**@internal*/ declare namespace internalNamespace {
    class someClass {
    }
}
/**@internal*/ declare namespace internalOther.something {
    class someClass {
    }
}
/**@internal*/ import internalImport = internalNamespace.someClass;
/**@internal*/ declare type internalType = internalC;
/**@internal*/ declare const internalConst = 10;
/**@internal*/ declare enum internalEnum {
    a = 0,
    b = 1,
    c = 2
}
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AAED,cAAM,OAAO;IACT,cAAc;IACd,cAAc,CAAC,IAAI,EAAE,MAAM,CAAC;IAC5B,cAAc,CAAC,MAAM;IACrB,cAAc,CAAC,IAAI,CAAC,IACM,MAAM,CADK;IACrC,cAAc,CAAC,IAAI,CAAC,CAAC,KAAK,MAAM,EAAK;CACxC;AACD,kBAAU,OAAO,CAAC;IACd,cAAc,CAAC,MAAa,CAAC;KAAI;IACjC,cAAc,CAAC,SAAgB,GAAG,SAAK;IACvC,cAAc,CAAC,UAAiB,aAAa,CAAC;QAAE,MAAa,CAAC;SAAG;KAAE;IACnE,cAAc,CAAC,UAAiB,SAAS,CAAC,SAAS,CAAC;QAAE,MAAa,SAAS;SAAG;KAAE;IACjF,cAAc,CAAC,MAAM,QAAQ,UAAU,GAAG,aAAa,CAAC,CAAC,CAAC;IAC1D,cAAc,CAAC,KAAY,YAAY,GAAG,SAAS,CAAC;IACpD,cAAc,CAAQ,MAAM,aAAa,KAAK,CAAC;IAC/C,cAAc,CAAC,KAAY,YAAY;QAAG,CAAC,IAAA;QAAE,CAAC,IAAA;QAAE,CAAC,IAAA;KAAE;CACtD;AACD,cAAc,CAAC,cAAM,SAAS;CAAG;AACjC,cAAc,CAAC,iBAAS,WAAW,SAAK;AACxC,cAAc,CAAC,kBAAU,iBAAiB,CAAC;IAAE,MAAa,SAAS;KAAG;CAAE;AACxE,cAAc,CAAC,kBAAU,aAAa,CAAC,SAAS,CAAC;IAAE,MAAa,SAAS;KAAG;CAAE;AAC9E,cAAc,CAAC,OAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;AACnE,cAAc,CAAC,aAAK,YAAY,GAAG,SAAS,CAAC;AAC7C,cAAc,CAAC,QAAA,MAAM,aAAa,KAAK,CAAC;AACxC,cAAc,CAAC,aAAK,YAAY;IAAG,CAAC,IAAA;IAAE,CAAC,IAAA;IAAE,CAAC,IAAA;CAAE;ACpC5C,cAAM,CAAC;IACH,WAAW;CAGd"}

//// [/src/2/second-output.d.ts.map.baseline.txt]
===================================================================
JsFile: second-output.d.ts
mapUrl: second-output.d.ts.map
sourceRoot: 
sources: ../second/second_part1.ts,../second/second_part2.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/2/second-output.d.ts
sourceFile:../second/second_part1.ts
-------------------------------------------------------------------
>>>declare namespace N {
1 >
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1 >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 19) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 20) Source(1, 12) + SourceIndex(0)
4 >Emitted(1, 21) Source(1, 13) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(2, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare namespace N {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1->
  >
  >
2 >namespace 
3 >                  N
4 >                    
1->Emitted(3, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(3, 19) Source(5, 11) + SourceIndex(0)
3 >Emitted(3, 20) Source(5, 12) + SourceIndex(0)
4 >Emitted(3, 21) Source(5, 13) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(4, 2) Source(11, 2) + SourceIndex(0)
---
>>>declare class normalC {
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^
4 >                     ^^^^^^^^^^^^^->
1->
  >
  >
2 >class 
3 >              normalC
1->Emitted(5, 1) Source(13, 1) + SourceIndex(0)
2 >Emitted(5, 15) Source(13, 7) + SourceIndex(0)
3 >Emitted(5, 22) Source(13, 14) + SourceIndex(0)
---
>>>    /**@internal*/ constructor();
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^^^^^^^^^^^^^^^->
1-> {
  >    
2 >    /**@internal*/
1->Emitted(6, 5) Source(14, 5) + SourceIndex(0)
2 >Emitted(6, 19) Source(14, 19) + SourceIndex(0)
---
>>>    /**@internal*/ prop: string;
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^^
6 >                         ^^^^^^
7 >                               ^
8 >                                ^^^->
1-> constructor() { }
  >    
2 >    /**@internal*/
3 >                   
4 >                   prop
5 >                       : 
6 >                         string
7 >                               ;
1->Emitted(7, 5) Source(15, 5) + SourceIndex(0)
2 >Emitted(7, 19) Source(15, 19) + SourceIndex(0)
3 >Emitted(7, 20) Source(15, 20) + SourceIndex(0)
4 >Emitted(7, 24) Source(15, 24) + SourceIndex(0)
5 >Emitted(7, 26) Source(15, 26) + SourceIndex(0)
6 >Emitted(7, 32) Source(15, 32) + SourceIndex(0)
7 >Emitted(7, 33) Source(15, 33) + SourceIndex(0)
---
>>>    /**@internal*/ method(): void;
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^
5 >                         ^^^^^^^^^^^->
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   method
1->Emitted(8, 5) Source(16, 5) + SourceIndex(0)
2 >Emitted(8, 19) Source(16, 19) + SourceIndex(0)
3 >Emitted(8, 20) Source(16, 20) + SourceIndex(0)
4 >Emitted(8, 26) Source(16, 26) + SourceIndex(0)
---
>>>    /**@internal*/ get c(): number;
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^
6 >                        ^^^^
7 >                            ^^^^^^
8 >                                  ^
9 >                                   ^^^^->
1->() { }
  >    
2 >    /**@internal*/
3 >                   
4 >                   get 
5 >                       c
6 >                        () { return 10; }
  >                            /**@internal*/ set c(val: 
7 >                            number
8 >                                  
1->Emitted(9, 5) Source(17, 5) + SourceIndex(0)
2 >Emitted(9, 19) Source(17, 19) + SourceIndex(0)
3 >Emitted(9, 20) Source(17, 20) + SourceIndex(0)
4 >Emitted(9, 24) Source(17, 24) + SourceIndex(0)
5 >Emitted(9, 25) Source(17, 25) + SourceIndex(0)
6 >Emitted(9, 29) Source(18, 31) + SourceIndex(0)
7 >Emitted(9, 35) Source(18, 37) + SourceIndex(0)
8 >Emitted(9, 36) Source(17, 42) + SourceIndex(0)
---
>>>    /**@internal*/ set c(val: number);
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^
6 >                        ^
7 >                         ^^^^^
8 >                              ^^^^^^
9 >                                    ^^
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   set 
5 >                       c
6 >                        (
7 >                         val: 
8 >                              number
9 >                                    ) { }
1->Emitted(10, 5) Source(18, 5) + SourceIndex(0)
2 >Emitted(10, 19) Source(18, 19) + SourceIndex(0)
3 >Emitted(10, 20) Source(18, 20) + SourceIndex(0)
4 >Emitted(10, 24) Source(18, 24) + SourceIndex(0)
5 >Emitted(10, 25) Source(18, 25) + SourceIndex(0)
6 >Emitted(10, 26) Source(18, 26) + SourceIndex(0)
7 >Emitted(10, 31) Source(18, 31) + SourceIndex(0)
8 >Emitted(10, 37) Source(18, 37) + SourceIndex(0)
9 >Emitted(10, 39) Source(18, 42) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(11, 2) Source(19, 2) + SourceIndex(0)
---
>>>declare namespace normalN {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^^^^^^
4 >                         ^
5 >                          ^^^->
1->
  >
2 >namespace 
3 >                  normalN
4 >                          
1->Emitted(12, 1) Source(20, 1) + SourceIndex(0)
2 >Emitted(12, 19) Source(20, 11) + SourceIndex(0)
3 >Emitted(12, 26) Source(20, 18) + SourceIndex(0)
4 >Emitted(12, 27) Source(20, 19) + SourceIndex(0)
---
>>>    /**@internal*/ class C {
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^
5 >                         ^
1->{
  >    
2 >    /**@internal*/
3 >                   
4 >                   export class 
5 >                         C
1->Emitted(13, 5) Source(21, 5) + SourceIndex(0)
2 >Emitted(13, 19) Source(21, 19) + SourceIndex(0)
3 >Emitted(13, 20) Source(21, 20) + SourceIndex(0)
4 >Emitted(13, 26) Source(21, 33) + SourceIndex(0)
5 >Emitted(13, 27) Source(21, 34) + SourceIndex(0)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > { }
1 >Emitted(14, 6) Source(21, 38) + SourceIndex(0)
---
>>>    /**@internal*/ function foo(): void;
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^
5 >                            ^^^
6 >                               ^^^^^^^^^
7 >                                        ^^^^^->
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   export function 
5 >                            foo
6 >                               () {}
1->Emitted(15, 5) Source(22, 5) + SourceIndex(0)
2 >Emitted(15, 19) Source(22, 19) + SourceIndex(0)
3 >Emitted(15, 20) Source(22, 20) + SourceIndex(0)
4 >Emitted(15, 29) Source(22, 36) + SourceIndex(0)
5 >Emitted(15, 32) Source(22, 39) + SourceIndex(0)
6 >Emitted(15, 41) Source(22, 44) + SourceIndex(0)
---
>>>    /**@internal*/ namespace someNamespace {
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^^
5 >                             ^^^^^^^^^^^^^
6 >                                          ^
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   export namespace 
5 >                             someNamespace
6 >                                           
1->Emitted(16, 5) Source(23, 5) + SourceIndex(0)
2 >Emitted(16, 19) Source(23, 19) + SourceIndex(0)
3 >Emitted(16, 20) Source(23, 20) + SourceIndex(0)
4 >Emitted(16, 30) Source(23, 37) + SourceIndex(0)
5 >Emitted(16, 43) Source(23, 50) + SourceIndex(0)
6 >Emitted(16, 44) Source(23, 51) + SourceIndex(0)
---
>>>        class C {
1 >^^^^^^^^
2 >        ^^^^^^
3 >              ^
1 >{ 
2 >        export class 
3 >              C
1 >Emitted(17, 9) Source(23, 53) + SourceIndex(0)
2 >Emitted(17, 15) Source(23, 66) + SourceIndex(0)
3 >Emitted(17, 16) Source(23, 67) + SourceIndex(0)
---
>>>        }
1 >^^^^^^^^^
1 > {}
1 >Emitted(18, 10) Source(23, 70) + SourceIndex(0)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(19, 6) Source(23, 72) + SourceIndex(0)
---
>>>    /**@internal*/ namespace someOther.something {
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^^
5 >                             ^^^^^^^^^
6 >                                      ^
7 >                                       ^^^^^^^^^
8 >                                                ^
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   export namespace 
5 >                             someOther
6 >                                      .
7 >                                       something
8 >                                                 
1->Emitted(20, 5) Source(24, 5) + SourceIndex(0)
2 >Emitted(20, 19) Source(24, 19) + SourceIndex(0)
3 >Emitted(20, 20) Source(24, 20) + SourceIndex(0)
4 >Emitted(20, 30) Source(24, 37) + SourceIndex(0)
5 >Emitted(20, 39) Source(24, 46) + SourceIndex(0)
6 >Emitted(20, 40) Source(24, 47) + SourceIndex(0)
7 >Emitted(20, 49) Source(24, 56) + SourceIndex(0)
8 >Emitted(20, 50) Source(24, 57) + SourceIndex(0)
---
>>>        class someClass {
1 >^^^^^^^^
2 >        ^^^^^^
3 >              ^^^^^^^^^
1 >{ 
2 >        export class 
3 >              someClass
1 >Emitted(21, 9) Source(24, 59) + SourceIndex(0)
2 >Emitted(21, 15) Source(24, 72) + SourceIndex(0)
3 >Emitted(21, 24) Source(24, 81) + SourceIndex(0)
---
>>>        }
1 >^^^^^^^^^
1 > {}
1 >Emitted(22, 10) Source(24, 84) + SourceIndex(0)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(23, 6) Source(24, 86) + SourceIndex(0)
---
>>>    /**@internal*/ export import someImport = someNamespace.C;
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^
5 >                         ^^^^^^^^
6 >                                 ^^^^^^^^^^
7 >                                           ^^^
8 >                                              ^^^^^^^^^^^^^
9 >                                                           ^
10>                                                            ^
11>                                                             ^
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   export
5 >                          import 
6 >                                 someImport
7 >                                            = 
8 >                                              someNamespace
9 >                                                           .
10>                                                            C
11>                                                             ;
1->Emitted(24, 5) Source(25, 5) + SourceIndex(0)
2 >Emitted(24, 19) Source(25, 19) + SourceIndex(0)
3 >Emitted(24, 20) Source(25, 20) + SourceIndex(0)
4 >Emitted(24, 26) Source(25, 26) + SourceIndex(0)
5 >Emitted(24, 34) Source(25, 34) + SourceIndex(0)
6 >Emitted(24, 44) Source(25, 44) + SourceIndex(0)
7 >Emitted(24, 47) Source(25, 47) + SourceIndex(0)
8 >Emitted(24, 60) Source(25, 60) + SourceIndex(0)
9 >Emitted(24, 61) Source(25, 61) + SourceIndex(0)
10>Emitted(24, 62) Source(25, 62) + SourceIndex(0)
11>Emitted(24, 63) Source(25, 63) + SourceIndex(0)
---
>>>    /**@internal*/ type internalType = internalC;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^
5 >                        ^^^^^^^^^^^^
6 >                                    ^^^
7 >                                       ^^^^^^^^^
8 >                                                ^
1 >
  >    
2 >    /**@internal*/
3 >                   
4 >                   export type 
5 >                        internalType
6 >                                     = 
7 >                                       internalC
8 >                                                ;
1 >Emitted(25, 5) Source(26, 5) + SourceIndex(0)
2 >Emitted(25, 19) Source(26, 19) + SourceIndex(0)
3 >Emitted(25, 20) Source(26, 20) + SourceIndex(0)
4 >Emitted(25, 25) Source(26, 32) + SourceIndex(0)
5 >Emitted(25, 37) Source(26, 44) + SourceIndex(0)
6 >Emitted(25, 40) Source(26, 47) + SourceIndex(0)
7 >Emitted(25, 49) Source(26, 56) + SourceIndex(0)
8 >Emitted(25, 50) Source(26, 57) + SourceIndex(0)
---
>>>    /**@internal*/ const internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^
5 >                         ^^^^^^^^^^^^^
6 >                                      ^^^^^
7 >                                           ^
1 >
  >    
2 >    /**@internal*/
3 >                   export 
4 >                   const 
5 >                         internalConst
6 >                                       = 10
7 >                                           ;
1 >Emitted(26, 5) Source(27, 5) + SourceIndex(0)
2 >Emitted(26, 19) Source(27, 19) + SourceIndex(0)
3 >Emitted(26, 20) Source(27, 27) + SourceIndex(0)
4 >Emitted(26, 26) Source(27, 33) + SourceIndex(0)
5 >Emitted(26, 39) Source(27, 46) + SourceIndex(0)
6 >Emitted(26, 44) Source(27, 51) + SourceIndex(0)
7 >Emitted(26, 45) Source(27, 52) + SourceIndex(0)
---
>>>    /**@internal*/ enum internalEnum {
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^
5 >                        ^^^^^^^^^^^^
1 >
  >    
2 >    /**@internal*/
3 >                   
4 >                   export enum 
5 >                        internalEnum
1 >Emitted(27, 5) Source(28, 5) + SourceIndex(0)
2 >Emitted(27, 19) Source(28, 19) + SourceIndex(0)
3 >Emitted(27, 20) Source(28, 20) + SourceIndex(0)
4 >Emitted(27, 25) Source(28, 32) + SourceIndex(0)
5 >Emitted(27, 37) Source(28, 44) + SourceIndex(0)
---
>>>        a = 0,
1 >^^^^^^^^
2 >        ^
3 >         ^^^^
4 >             ^^->
1 > { 
2 >        a
3 >         
1 >Emitted(28, 9) Source(28, 47) + SourceIndex(0)
2 >Emitted(28, 10) Source(28, 48) + SourceIndex(0)
3 >Emitted(28, 14) Source(28, 48) + SourceIndex(0)
---
>>>        b = 1,
1->^^^^^^^^
2 >        ^
3 >         ^^^^
4 >             ^->
1->, 
2 >        b
3 >         
1->Emitted(29, 9) Source(28, 50) + SourceIndex(0)
2 >Emitted(29, 10) Source(28, 51) + SourceIndex(0)
3 >Emitted(29, 14) Source(28, 51) + SourceIndex(0)
---
>>>        c = 2
1->^^^^^^^^
2 >        ^
3 >         ^^^^
1->, 
2 >        c
3 >         
1->Emitted(30, 9) Source(28, 53) + SourceIndex(0)
2 >Emitted(30, 10) Source(28, 54) + SourceIndex(0)
3 >Emitted(30, 14) Source(28, 54) + SourceIndex(0)
---
>>>    }
1 >^^^^^
1 > }
1 >Emitted(31, 6) Source(28, 56) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(32, 2) Source(29, 2) + SourceIndex(0)
---
>>>/**@internal*/ declare class internalC {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^^^^^
5 >                             ^^^^^^^^^
1->
  >
2 >/**@internal*/
3 >               
4 >               class 
5 >                             internalC
1->Emitted(33, 1) Source(30, 1) + SourceIndex(0)
2 >Emitted(33, 15) Source(30, 15) + SourceIndex(0)
3 >Emitted(33, 16) Source(30, 16) + SourceIndex(0)
4 >Emitted(33, 30) Source(30, 22) + SourceIndex(0)
5 >Emitted(33, 39) Source(30, 31) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > {}
1 >Emitted(34, 2) Source(30, 34) + SourceIndex(0)
---
>>>/**@internal*/ declare function internalfoo(): void;
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^^^^^^^^
5 >                                ^^^^^^^^^^^
6 >                                           ^^^^^^^^^
7 >                                                    ^->
1->
  >
2 >/**@internal*/
3 >               
4 >               function 
5 >                                internalfoo
6 >                                           () {}
1->Emitted(35, 1) Source(31, 1) + SourceIndex(0)
2 >Emitted(35, 15) Source(31, 15) + SourceIndex(0)
3 >Emitted(35, 16) Source(31, 16) + SourceIndex(0)
4 >Emitted(35, 33) Source(31, 25) + SourceIndex(0)
5 >Emitted(35, 44) Source(31, 36) + SourceIndex(0)
6 >Emitted(35, 53) Source(31, 41) + SourceIndex(0)
---
>>>/**@internal*/ declare namespace internalNamespace {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^^^^^^^^^
5 >                                 ^^^^^^^^^^^^^^^^^
6 >                                                  ^
1->
  >
2 >/**@internal*/
3 >               
4 >               namespace 
5 >                                 internalNamespace
6 >                                                   
1->Emitted(36, 1) Source(32, 1) + SourceIndex(0)
2 >Emitted(36, 15) Source(32, 15) + SourceIndex(0)
3 >Emitted(36, 16) Source(32, 16) + SourceIndex(0)
4 >Emitted(36, 34) Source(32, 26) + SourceIndex(0)
5 >Emitted(36, 51) Source(32, 43) + SourceIndex(0)
6 >Emitted(36, 52) Source(32, 44) + SourceIndex(0)
---
>>>    class someClass {
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^
1 >{ 
2 >    export class 
3 >          someClass
1 >Emitted(37, 5) Source(32, 46) + SourceIndex(0)
2 >Emitted(37, 11) Source(32, 59) + SourceIndex(0)
3 >Emitted(37, 20) Source(32, 68) + SourceIndex(0)
---
>>>    }
1 >^^^^^
1 > {}
1 >Emitted(38, 6) Source(32, 71) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(39, 2) Source(32, 73) + SourceIndex(0)
---
>>>/**@internal*/ declare namespace internalOther.something {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^^^^^^^^^
5 >                                 ^^^^^^^^^^^^^
6 >                                              ^
7 >                                               ^^^^^^^^^
8 >                                                        ^
1->
  >
2 >/**@internal*/
3 >               
4 >               namespace 
5 >                                 internalOther
6 >                                              .
7 >                                               something
8 >                                                         
1->Emitted(40, 1) Source(33, 1) + SourceIndex(0)
2 >Emitted(40, 15) Source(33, 15) + SourceIndex(0)
3 >Emitted(40, 16) Source(33, 16) + SourceIndex(0)
4 >Emitted(40, 34) Source(33, 26) + SourceIndex(0)
5 >Emitted(40, 47) Source(33, 39) + SourceIndex(0)
6 >Emitted(40, 48) Source(33, 40) + SourceIndex(0)
7 >Emitted(40, 57) Source(33, 49) + SourceIndex(0)
8 >Emitted(40, 58) Source(33, 50) + SourceIndex(0)
---
>>>    class someClass {
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^
1 >{ 
2 >    export class 
3 >          someClass
1 >Emitted(41, 5) Source(33, 52) + SourceIndex(0)
2 >Emitted(41, 11) Source(33, 65) + SourceIndex(0)
3 >Emitted(41, 20) Source(33, 74) + SourceIndex(0)
---
>>>    }
1 >^^^^^
1 > {}
1 >Emitted(42, 6) Source(33, 77) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(43, 2) Source(33, 79) + SourceIndex(0)
---
>>>/**@internal*/ import internalImport = internalNamespace.someClass;
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^
5 >                      ^^^^^^^^^^^^^^
6 >                                    ^^^
7 >                                       ^^^^^^^^^^^^^^^^^
8 >                                                        ^
9 >                                                         ^^^^^^^^^
10>                                                                  ^
1->
  >
2 >/**@internal*/
3 >               
4 >               import 
5 >                      internalImport
6 >                                     = 
7 >                                       internalNamespace
8 >                                                        .
9 >                                                         someClass
10>                                                                  ;
1->Emitted(44, 1) Source(34, 1) + SourceIndex(0)
2 >Emitted(44, 15) Source(34, 15) + SourceIndex(0)
3 >Emitted(44, 16) Source(34, 16) + SourceIndex(0)
4 >Emitted(44, 23) Source(34, 23) + SourceIndex(0)
5 >Emitted(44, 37) Source(34, 37) + SourceIndex(0)
6 >Emitted(44, 40) Source(34, 40) + SourceIndex(0)
7 >Emitted(44, 57) Source(34, 57) + SourceIndex(0)
8 >Emitted(44, 58) Source(34, 58) + SourceIndex(0)
9 >Emitted(44, 67) Source(34, 67) + SourceIndex(0)
10>Emitted(44, 68) Source(34, 68) + SourceIndex(0)
---
>>>/**@internal*/ declare type internalType = internalC;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^^^^
5 >                            ^^^^^^^^^^^^
6 >                                        ^^^
7 >                                           ^^^^^^^^^
8 >                                                    ^
1 >
  >
2 >/**@internal*/
3 >               
4 >               type 
5 >                            internalType
6 >                                         = 
7 >                                           internalC
8 >                                                    ;
1 >Emitted(45, 1) Source(35, 1) + SourceIndex(0)
2 >Emitted(45, 15) Source(35, 15) + SourceIndex(0)
3 >Emitted(45, 16) Source(35, 16) + SourceIndex(0)
4 >Emitted(45, 29) Source(35, 21) + SourceIndex(0)
5 >Emitted(45, 41) Source(35, 33) + SourceIndex(0)
6 >Emitted(45, 44) Source(35, 36) + SourceIndex(0)
7 >Emitted(45, 53) Source(35, 45) + SourceIndex(0)
8 >Emitted(45, 54) Source(35, 46) + SourceIndex(0)
---
>>>/**@internal*/ declare const internalConst = 10;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^
5 >                       ^^^^^^
6 >                             ^^^^^^^^^^^^^
7 >                                          ^^^^^
8 >                                               ^
1 >
  >
2 >/**@internal*/
3 >               
4 >               
5 >                       const 
6 >                             internalConst
7 >                                           = 10
8 >                                               ;
1 >Emitted(46, 1) Source(36, 1) + SourceIndex(0)
2 >Emitted(46, 15) Source(36, 15) + SourceIndex(0)
3 >Emitted(46, 16) Source(36, 16) + SourceIndex(0)
4 >Emitted(46, 24) Source(36, 16) + SourceIndex(0)
5 >Emitted(46, 30) Source(36, 22) + SourceIndex(0)
6 >Emitted(46, 43) Source(36, 35) + SourceIndex(0)
7 >Emitted(46, 48) Source(36, 40) + SourceIndex(0)
8 >Emitted(46, 49) Source(36, 41) + SourceIndex(0)
---
>>>/**@internal*/ declare enum internalEnum {
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^^^^
5 >                            ^^^^^^^^^^^^
1 >
  >
2 >/**@internal*/
3 >               
4 >               enum 
5 >                            internalEnum
1 >Emitted(47, 1) Source(37, 1) + SourceIndex(0)
2 >Emitted(47, 15) Source(37, 15) + SourceIndex(0)
3 >Emitted(47, 16) Source(37, 16) + SourceIndex(0)
4 >Emitted(47, 29) Source(37, 21) + SourceIndex(0)
5 >Emitted(47, 41) Source(37, 33) + SourceIndex(0)
---
>>>    a = 0,
1 >^^^^
2 >    ^
3 >     ^^^^
4 >         ^^->
1 > { 
2 >    a
3 >     
1 >Emitted(48, 5) Source(37, 36) + SourceIndex(0)
2 >Emitted(48, 6) Source(37, 37) + SourceIndex(0)
3 >Emitted(48, 10) Source(37, 37) + SourceIndex(0)
---
>>>    b = 1,
1->^^^^
2 >    ^
3 >     ^^^^
4 >         ^->
1->, 
2 >    b
3 >     
1->Emitted(49, 5) Source(37, 39) + SourceIndex(0)
2 >Emitted(49, 6) Source(37, 40) + SourceIndex(0)
3 >Emitted(49, 10) Source(37, 40) + SourceIndex(0)
---
>>>    c = 2
1->^^^^
2 >    ^
3 >     ^^^^
1->, 
2 >    c
3 >     
1->Emitted(50, 5) Source(37, 42) + SourceIndex(0)
2 >Emitted(50, 6) Source(37, 43) + SourceIndex(0)
3 >Emitted(50, 10) Source(37, 43) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(51, 2) Source(37, 45) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.d.ts
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^->
1->
2 >class 
3 >              C
1->Emitted(52, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(52, 15) Source(1, 7) + SourceIndex(1)
3 >Emitted(52, 16) Source(1, 8) + SourceIndex(1)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(53, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(53, 16) Source(2, 16) + SourceIndex(1)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(54, 2) Source(5, 2) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.js]
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var normalC = /** @class */ (function () {
    /**@internal*/ function normalC() {
    }
    /**@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /**@internal*/ get: function () { return 10; },
        /**@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /**@internal*/ var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    normalN.C = C;
    /**@internal*/ function foo() { }
    normalN.foo = foo;
    /**@internal*/ var someNamespace;
    (function (someNamespace) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /**@internal*/ var someOther;
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
    /**@internal*/ normalN.someImport = someNamespace.C;
    /**@internal*/ normalN.internalConst = 10;
    /**@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
/**@internal*/ var internalC = /** @class */ (function () {
    function internalC() {
    }
    return internalC;
}());
/**@internal*/ function internalfoo() { }
/**@internal*/ var internalNamespace;
(function (internalNamespace) {
    var someClass = /** @class */ (function () {
        function someClass() {
        }
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/**@internal*/ var internalOther;
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
})(internalOther || (internalOther = {}));
/**@internal*/ var internalImport = internalNamespace.someClass;
/**@internal*/ var internalConst = 10;
/**@internal*/ var internalEnum;
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
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACI,cAAc,CAAC;IAAgB,CAAC;IAEhC,cAAc,CAAC,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;QAApB,cAAc,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;QACrC,cAAc,MAAC,UAAM,GAAW,IAAI,CAAC;;;OADA;IAEzC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACb,cAAc,CAAC;QAAA;QAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IACjC,cAAc,CAAC,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACvC,cAAc,CAAC,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa;QAAG;YAAA;YAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IACnE,cAAc,CAAC,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS;YAAG;gBAAA;gBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IACjF,cAAc,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;IAE1D,cAAc,CAAc,qBAAa,GAAG,EAAE,CAAC;IAC/C,cAAc,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACvD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACD,cAAc,CAAC;IAAA;IAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AACjC,cAAc,CAAC,SAAS,WAAW,KAAI,CAAC;AACxC,cAAc,CAAC,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB;IAAG;QAAA;QAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACxE,cAAc,CAAC,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS;QAAG;YAAA;YAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC9E,cAAc,CAAC,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;AAEnE,cAAc,CAAC,IAAM,aAAa,GAAG,EAAE,CAAC;AACxC,cAAc,CAAC,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAA;IAAE,yCAAC,CAAA;IAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC5C;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

//// [/src/2/second-output.js.map.baseline.txt]
===================================================================
JsFile: second-output.js
mapUrl: second-output.js.map
sourceRoot: 
sources: ../second/second_part1.ts,../second/second_part2.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part1.ts
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
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(5, 11) + SourceIndex(0)
3 >Emitted(1, 6) Source(5, 12) + SourceIndex(0)
4 >Emitted(1, 7) Source(11, 2) + SourceIndex(0)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(2, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(2, 12) Source(5, 11) + SourceIndex(0)
3 >Emitted(2, 13) Source(5, 12) + SourceIndex(0)
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
1->Emitted(3, 5) Source(6, 5) + SourceIndex(0)
2 >Emitted(3, 14) Source(6, 14) + SourceIndex(0)
3 >Emitted(3, 15) Source(6, 15) + SourceIndex(0)
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
1->Emitted(4, 9) Source(7, 9) + SourceIndex(0)
2 >Emitted(4, 16) Source(7, 16) + SourceIndex(0)
3 >Emitted(4, 17) Source(7, 17) + SourceIndex(0)
4 >Emitted(4, 20) Source(7, 20) + SourceIndex(0)
5 >Emitted(4, 21) Source(7, 21) + SourceIndex(0)
6 >Emitted(4, 30) Source(7, 30) + SourceIndex(0)
7 >Emitted(4, 31) Source(7, 31) + SourceIndex(0)
8 >Emitted(4, 32) Source(7, 32) + SourceIndex(0)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(5, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(5, 6) Source(8, 6) + SourceIndex(0)
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
1->Emitted(6, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(6, 6) Source(10, 6) + SourceIndex(0)
3 >Emitted(6, 8) Source(10, 8) + SourceIndex(0)
4 >Emitted(6, 9) Source(10, 9) + SourceIndex(0)
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
1->Emitted(7, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(7, 2) Source(11, 2) + SourceIndex(0)
3 >Emitted(7, 4) Source(5, 11) + SourceIndex(0)
4 >Emitted(7, 5) Source(5, 12) + SourceIndex(0)
5 >Emitted(7, 10) Source(5, 11) + SourceIndex(0)
6 >Emitted(7, 11) Source(5, 12) + SourceIndex(0)
7 >Emitted(7, 19) Source(11, 2) + SourceIndex(0)
---
>>>var normalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(8, 1) Source(13, 1) + SourceIndex(0)
---
>>>    /**@internal*/ function normalC() {
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
1->class normalC {
  >    
2 >    /**@internal*/
3 >                   
1->Emitted(9, 5) Source(14, 5) + SourceIndex(0)
2 >Emitted(9, 19) Source(14, 19) + SourceIndex(0)
3 >Emitted(9, 20) Source(14, 20) + SourceIndex(0)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >constructor() { 
2 >    }
1 >Emitted(10, 5) Source(14, 36) + SourceIndex(0)
2 >Emitted(10, 6) Source(14, 37) + SourceIndex(0)
---
>>>    /**@internal*/ normalC.prototype.method = function () { };
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                           ^^^
6 >                                              ^^^^^^^^^^^^^^
7 >                                                            ^
1->
  >    /**@internal*/ prop: string;
  >    
2 >    /**@internal*/
3 >                   
4 >                   method
5 >                                           
6 >                                              method() { 
7 >                                                            }
1->Emitted(11, 5) Source(16, 5) + SourceIndex(0)
2 >Emitted(11, 19) Source(16, 19) + SourceIndex(0)
3 >Emitted(11, 20) Source(16, 20) + SourceIndex(0)
4 >Emitted(11, 44) Source(16, 26) + SourceIndex(0)
5 >Emitted(11, 47) Source(16, 20) + SourceIndex(0)
6 >Emitted(11, 61) Source(16, 31) + SourceIndex(0)
7 >Emitted(11, 62) Source(16, 32) + SourceIndex(0)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
4 >                                                ^^^^^^^^->
1 >
  >    /**@internal*/ 
2 >    get 
3 >                          c
1 >Emitted(12, 5) Source(17, 20) + SourceIndex(0)
2 >Emitted(12, 27) Source(17, 24) + SourceIndex(0)
3 >Emitted(12, 49) Source(17, 25) + SourceIndex(0)
---
>>>        /**@internal*/ get: function () { return 10; },
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^^^^^^
4 >                            ^^^^^^^^^^^^^^
5 >                                          ^^^^^^^
6 >                                                 ^^
7 >                                                   ^
8 >                                                    ^
9 >                                                     ^
1->
2 >        /**@internal*/
3 >                       
4 >                            get c() { 
5 >                                          return 
6 >                                                 10
7 >                                                   ;
8 >                                                     
9 >                                                     }
1->Emitted(13, 9) Source(17, 5) + SourceIndex(0)
2 >Emitted(13, 23) Source(17, 19) + SourceIndex(0)
3 >Emitted(13, 29) Source(17, 20) + SourceIndex(0)
4 >Emitted(13, 43) Source(17, 30) + SourceIndex(0)
5 >Emitted(13, 50) Source(17, 37) + SourceIndex(0)
6 >Emitted(13, 52) Source(17, 39) + SourceIndex(0)
7 >Emitted(13, 53) Source(17, 40) + SourceIndex(0)
8 >Emitted(13, 54) Source(17, 41) + SourceIndex(0)
9 >Emitted(13, 55) Source(17, 42) + SourceIndex(0)
---
>>>        /**@internal*/ set: function (val) { },
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^^^^^^
4 >                            ^^^^^^^^^^
5 >                                      ^^^
6 >                                         ^^^^
7 >                                             ^
1 >
  >    
2 >        /**@internal*/
3 >                       
4 >                            set c(
5 >                                      val: number
6 >                                         ) { 
7 >                                             }
1 >Emitted(14, 9) Source(18, 5) + SourceIndex(0)
2 >Emitted(14, 23) Source(18, 19) + SourceIndex(0)
3 >Emitted(14, 29) Source(18, 20) + SourceIndex(0)
4 >Emitted(14, 39) Source(18, 26) + SourceIndex(0)
5 >Emitted(14, 42) Source(18, 37) + SourceIndex(0)
6 >Emitted(14, 46) Source(18, 41) + SourceIndex(0)
7 >Emitted(14, 47) Source(18, 42) + SourceIndex(0)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(17, 8) Source(17, 42) + SourceIndex(0)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /**@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(18, 5) Source(19, 1) + SourceIndex(0)
2 >Emitted(18, 19) Source(19, 2) + SourceIndex(0)
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
1 >Emitted(19, 1) Source(19, 1) + SourceIndex(0)
2 >Emitted(19, 2) Source(19, 2) + SourceIndex(0)
3 >Emitted(19, 2) Source(13, 1) + SourceIndex(0)
4 >Emitted(19, 6) Source(19, 2) + SourceIndex(0)
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
1->Emitted(20, 1) Source(20, 1) + SourceIndex(0)
2 >Emitted(20, 5) Source(20, 11) + SourceIndex(0)
3 >Emitted(20, 12) Source(20, 18) + SourceIndex(0)
4 >Emitted(20, 13) Source(29, 2) + SourceIndex(0)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(21, 1) Source(20, 1) + SourceIndex(0)
2 >Emitted(21, 12) Source(20, 11) + SourceIndex(0)
3 >Emitted(21, 19) Source(20, 18) + SourceIndex(0)
---
>>>    /**@internal*/ var C = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^->
1-> {
  >    
2 >    /**@internal*/
3 >                   
1->Emitted(22, 5) Source(21, 5) + SourceIndex(0)
2 >Emitted(22, 19) Source(21, 19) + SourceIndex(0)
3 >Emitted(22, 20) Source(21, 20) + SourceIndex(0)
---
>>>        function C() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(23, 9) Source(21, 20) + SourceIndex(0)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^->
1->export class C { 
2 >        }
1->Emitted(24, 9) Source(21, 37) + SourceIndex(0)
2 >Emitted(24, 10) Source(21, 38) + SourceIndex(0)
---
>>>        return C;
1->^^^^^^^^
2 >        ^^^^^^^^
1->
2 >        }
1->Emitted(25, 9) Source(21, 37) + SourceIndex(0)
2 >Emitted(25, 17) Source(21, 38) + SourceIndex(0)
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
1 >Emitted(26, 5) Source(21, 37) + SourceIndex(0)
2 >Emitted(26, 6) Source(21, 38) + SourceIndex(0)
3 >Emitted(26, 6) Source(21, 20) + SourceIndex(0)
4 >Emitted(26, 10) Source(21, 38) + SourceIndex(0)
---
>>>    normalN.C = C;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(27, 5) Source(21, 33) + SourceIndex(0)
2 >Emitted(27, 14) Source(21, 34) + SourceIndex(0)
3 >Emitted(27, 18) Source(21, 38) + SourceIndex(0)
4 >Emitted(27, 19) Source(21, 38) + SourceIndex(0)
---
>>>    /**@internal*/ function foo() { }
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^
5 >                            ^^^
6 >                               ^^^^^
7 >                                    ^
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   export function 
5 >                            foo
6 >                               () {
7 >                                    }
1->Emitted(28, 5) Source(22, 5) + SourceIndex(0)
2 >Emitted(28, 19) Source(22, 19) + SourceIndex(0)
3 >Emitted(28, 20) Source(22, 20) + SourceIndex(0)
4 >Emitted(28, 29) Source(22, 36) + SourceIndex(0)
5 >Emitted(28, 32) Source(22, 39) + SourceIndex(0)
6 >Emitted(28, 37) Source(22, 43) + SourceIndex(0)
7 >Emitted(28, 38) Source(22, 44) + SourceIndex(0)
---
>>>    normalN.foo = foo;
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^->
1 >
2 >    foo
3 >               () {}
4 >                     
1 >Emitted(29, 5) Source(22, 36) + SourceIndex(0)
2 >Emitted(29, 16) Source(22, 39) + SourceIndex(0)
3 >Emitted(29, 22) Source(22, 44) + SourceIndex(0)
4 >Emitted(29, 23) Source(22, 44) + SourceIndex(0)
---
>>>    /**@internal*/ var someNamespace;
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^^^^^^^^^^^^^
6 >                                    ^
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   export namespace 
5 >                       someNamespace
6 >                                     { export class C {} }
1->Emitted(30, 5) Source(23, 5) + SourceIndex(0)
2 >Emitted(30, 19) Source(23, 19) + SourceIndex(0)
3 >Emitted(30, 20) Source(23, 20) + SourceIndex(0)
4 >Emitted(30, 24) Source(23, 37) + SourceIndex(0)
5 >Emitted(30, 37) Source(23, 50) + SourceIndex(0)
6 >Emitted(30, 38) Source(23, 72) + SourceIndex(0)
---
>>>    (function (someNamespace) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^->
1 >
2 >    export namespace 
3 >               someNamespace
1 >Emitted(31, 5) Source(23, 20) + SourceIndex(0)
2 >Emitted(31, 16) Source(23, 37) + SourceIndex(0)
3 >Emitted(31, 29) Source(23, 50) + SourceIndex(0)
---
>>>        var C = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(32, 9) Source(23, 53) + SourceIndex(0)
---
>>>            function C() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(33, 13) Source(23, 53) + SourceIndex(0)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^->
1->export class C {
2 >            }
1->Emitted(34, 13) Source(23, 69) + SourceIndex(0)
2 >Emitted(34, 14) Source(23, 70) + SourceIndex(0)
---
>>>            return C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^
1->
2 >            }
1->Emitted(35, 13) Source(23, 69) + SourceIndex(0)
2 >Emitted(35, 21) Source(23, 70) + SourceIndex(0)
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
1 >Emitted(36, 9) Source(23, 69) + SourceIndex(0)
2 >Emitted(36, 10) Source(23, 70) + SourceIndex(0)
3 >Emitted(36, 10) Source(23, 53) + SourceIndex(0)
4 >Emitted(36, 14) Source(23, 70) + SourceIndex(0)
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
1->Emitted(37, 9) Source(23, 66) + SourceIndex(0)
2 >Emitted(37, 24) Source(23, 67) + SourceIndex(0)
3 >Emitted(37, 28) Source(23, 70) + SourceIndex(0)
4 >Emitted(37, 29) Source(23, 70) + SourceIndex(0)
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
1->Emitted(38, 5) Source(23, 71) + SourceIndex(0)
2 >Emitted(38, 6) Source(23, 72) + SourceIndex(0)
3 >Emitted(38, 8) Source(23, 37) + SourceIndex(0)
4 >Emitted(38, 21) Source(23, 50) + SourceIndex(0)
5 >Emitted(38, 24) Source(23, 37) + SourceIndex(0)
6 >Emitted(38, 45) Source(23, 50) + SourceIndex(0)
7 >Emitted(38, 50) Source(23, 37) + SourceIndex(0)
8 >Emitted(38, 71) Source(23, 50) + SourceIndex(0)
9 >Emitted(38, 79) Source(23, 72) + SourceIndex(0)
---
>>>    /**@internal*/ var someOther;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^^^^^^^^^
6 >                                ^
1 >
  >    
2 >    /**@internal*/
3 >                   
4 >                   export namespace 
5 >                       someOther
6 >                                .something { export class someClass {} }
1 >Emitted(39, 5) Source(24, 5) + SourceIndex(0)
2 >Emitted(39, 19) Source(24, 19) + SourceIndex(0)
3 >Emitted(39, 20) Source(24, 20) + SourceIndex(0)
4 >Emitted(39, 24) Source(24, 37) + SourceIndex(0)
5 >Emitted(39, 33) Source(24, 46) + SourceIndex(0)
6 >Emitted(39, 34) Source(24, 86) + SourceIndex(0)
---
>>>    (function (someOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1 >
2 >    export namespace 
3 >               someOther
1 >Emitted(40, 5) Source(24, 20) + SourceIndex(0)
2 >Emitted(40, 16) Source(24, 37) + SourceIndex(0)
3 >Emitted(40, 25) Source(24, 46) + SourceIndex(0)
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
1 >Emitted(41, 9) Source(24, 47) + SourceIndex(0)
2 >Emitted(41, 13) Source(24, 47) + SourceIndex(0)
3 >Emitted(41, 22) Source(24, 56) + SourceIndex(0)
4 >Emitted(41, 23) Source(24, 86) + SourceIndex(0)
---
>>>        (function (something) {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        
3 >                   something
1->Emitted(42, 9) Source(24, 47) + SourceIndex(0)
2 >Emitted(42, 20) Source(24, 47) + SourceIndex(0)
3 >Emitted(42, 29) Source(24, 56) + SourceIndex(0)
---
>>>            var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(43, 13) Source(24, 59) + SourceIndex(0)
---
>>>                function someClass() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(44, 17) Source(24, 59) + SourceIndex(0)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                }
1->Emitted(45, 17) Source(24, 83) + SourceIndex(0)
2 >Emitted(45, 18) Source(24, 84) + SourceIndex(0)
---
>>>                return someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1->
2 >                }
1->Emitted(46, 17) Source(24, 83) + SourceIndex(0)
2 >Emitted(46, 33) Source(24, 84) + SourceIndex(0)
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
1 >Emitted(47, 13) Source(24, 83) + SourceIndex(0)
2 >Emitted(47, 14) Source(24, 84) + SourceIndex(0)
3 >Emitted(47, 14) Source(24, 59) + SourceIndex(0)
4 >Emitted(47, 18) Source(24, 84) + SourceIndex(0)
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
1->Emitted(48, 13) Source(24, 72) + SourceIndex(0)
2 >Emitted(48, 32) Source(24, 81) + SourceIndex(0)
3 >Emitted(48, 44) Source(24, 84) + SourceIndex(0)
4 >Emitted(48, 45) Source(24, 84) + SourceIndex(0)
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
1->Emitted(49, 9) Source(24, 85) + SourceIndex(0)
2 >Emitted(49, 10) Source(24, 86) + SourceIndex(0)
3 >Emitted(49, 12) Source(24, 47) + SourceIndex(0)
4 >Emitted(49, 21) Source(24, 56) + SourceIndex(0)
5 >Emitted(49, 24) Source(24, 47) + SourceIndex(0)
6 >Emitted(49, 43) Source(24, 56) + SourceIndex(0)
7 >Emitted(49, 48) Source(24, 47) + SourceIndex(0)
8 >Emitted(49, 67) Source(24, 56) + SourceIndex(0)
9 >Emitted(49, 75) Source(24, 86) + SourceIndex(0)
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
1 >Emitted(50, 5) Source(24, 85) + SourceIndex(0)
2 >Emitted(50, 6) Source(24, 86) + SourceIndex(0)
3 >Emitted(50, 8) Source(24, 37) + SourceIndex(0)
4 >Emitted(50, 17) Source(24, 46) + SourceIndex(0)
5 >Emitted(50, 20) Source(24, 37) + SourceIndex(0)
6 >Emitted(50, 37) Source(24, 46) + SourceIndex(0)
7 >Emitted(50, 42) Source(24, 37) + SourceIndex(0)
8 >Emitted(50, 59) Source(24, 46) + SourceIndex(0)
9 >Emitted(50, 67) Source(24, 86) + SourceIndex(0)
---
>>>    /**@internal*/ normalN.someImport = someNamespace.C;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^^^^^^^^^^
5 >                                     ^^^
6 >                                        ^^^^^^^^^^^^^
7 >                                                     ^
8 >                                                      ^
9 >                                                       ^
1 >
  >    
2 >    /**@internal*/
3 >                   export import 
4 >                   someImport
5 >                                      = 
6 >                                        someNamespace
7 >                                                     .
8 >                                                      C
9 >                                                       ;
1 >Emitted(51, 5) Source(25, 5) + SourceIndex(0)
2 >Emitted(51, 19) Source(25, 19) + SourceIndex(0)
3 >Emitted(51, 20) Source(25, 34) + SourceIndex(0)
4 >Emitted(51, 38) Source(25, 44) + SourceIndex(0)
5 >Emitted(51, 41) Source(25, 47) + SourceIndex(0)
6 >Emitted(51, 54) Source(25, 60) + SourceIndex(0)
7 >Emitted(51, 55) Source(25, 61) + SourceIndex(0)
8 >Emitted(51, 56) Source(25, 62) + SourceIndex(0)
9 >Emitted(51, 57) Source(25, 63) + SourceIndex(0)
---
>>>    /**@internal*/ normalN.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^^^^^^^^^^^^^
5 >                                        ^^^
6 >                                           ^^
7 >                                             ^
1 >
  >    /**@internal*/ export type internalType = internalC;
  >    
2 >    /**@internal*/
3 >                   export const 
4 >                   internalConst
5 >                                         = 
6 >                                           10
7 >                                             ;
1 >Emitted(52, 5) Source(27, 5) + SourceIndex(0)
2 >Emitted(52, 19) Source(27, 19) + SourceIndex(0)
3 >Emitted(52, 20) Source(27, 33) + SourceIndex(0)
4 >Emitted(52, 41) Source(27, 46) + SourceIndex(0)
5 >Emitted(52, 44) Source(27, 49) + SourceIndex(0)
6 >Emitted(52, 46) Source(27, 51) + SourceIndex(0)
7 >Emitted(52, 47) Source(27, 52) + SourceIndex(0)
---
>>>    /**@internal*/ var internalEnum;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^^^^^^^^^^^^
1 >
  >    
2 >    /**@internal*/
3 >                   
4 >                   export enum 
5 >                       internalEnum { a, b, c }
1 >Emitted(53, 5) Source(28, 5) + SourceIndex(0)
2 >Emitted(53, 19) Source(28, 19) + SourceIndex(0)
3 >Emitted(53, 20) Source(28, 20) + SourceIndex(0)
4 >Emitted(53, 24) Source(28, 32) + SourceIndex(0)
5 >Emitted(53, 36) Source(28, 56) + SourceIndex(0)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(54, 5) Source(28, 20) + SourceIndex(0)
2 >Emitted(54, 16) Source(28, 32) + SourceIndex(0)
3 >Emitted(54, 28) Source(28, 44) + SourceIndex(0)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(55, 9) Source(28, 47) + SourceIndex(0)
2 >Emitted(55, 50) Source(28, 48) + SourceIndex(0)
3 >Emitted(55, 51) Source(28, 48) + SourceIndex(0)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(56, 9) Source(28, 50) + SourceIndex(0)
2 >Emitted(56, 50) Source(28, 51) + SourceIndex(0)
3 >Emitted(56, 51) Source(28, 51) + SourceIndex(0)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(57, 9) Source(28, 53) + SourceIndex(0)
2 >Emitted(57, 50) Source(28, 54) + SourceIndex(0)
3 >Emitted(57, 51) Source(28, 54) + SourceIndex(0)
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
1->Emitted(58, 5) Source(28, 55) + SourceIndex(0)
2 >Emitted(58, 6) Source(28, 56) + SourceIndex(0)
3 >Emitted(58, 8) Source(28, 32) + SourceIndex(0)
4 >Emitted(58, 20) Source(28, 44) + SourceIndex(0)
5 >Emitted(58, 23) Source(28, 32) + SourceIndex(0)
6 >Emitted(58, 43) Source(28, 44) + SourceIndex(0)
7 >Emitted(58, 48) Source(28, 32) + SourceIndex(0)
8 >Emitted(58, 68) Source(28, 44) + SourceIndex(0)
9 >Emitted(58, 76) Source(28, 56) + SourceIndex(0)
---
>>>})(normalN || (normalN = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^
5 >          ^^^^^
6 >               ^^^^^^^
7 >                      ^^^^^^^^
8 >                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(59, 1) Source(29, 1) + SourceIndex(0)
2 >Emitted(59, 2) Source(29, 2) + SourceIndex(0)
3 >Emitted(59, 4) Source(20, 11) + SourceIndex(0)
4 >Emitted(59, 11) Source(20, 18) + SourceIndex(0)
5 >Emitted(59, 16) Source(20, 11) + SourceIndex(0)
6 >Emitted(59, 23) Source(20, 18) + SourceIndex(0)
7 >Emitted(59, 31) Source(29, 2) + SourceIndex(0)
---
>>>/**@internal*/ var internalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^^^->
1->
  >
2 >/**@internal*/
3 >               
1->Emitted(60, 1) Source(30, 1) + SourceIndex(0)
2 >Emitted(60, 15) Source(30, 15) + SourceIndex(0)
3 >Emitted(60, 16) Source(30, 16) + SourceIndex(0)
---
>>>    function internalC() {
1->^^^^
2 >    ^^->
1->
1->Emitted(61, 5) Source(30, 16) + SourceIndex(0)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^->
1->class internalC {
2 >    }
1->Emitted(62, 5) Source(30, 33) + SourceIndex(0)
2 >Emitted(62, 6) Source(30, 34) + SourceIndex(0)
---
>>>    return internalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(63, 5) Source(30, 33) + SourceIndex(0)
2 >Emitted(63, 21) Source(30, 34) + SourceIndex(0)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class internalC {}
1 >Emitted(64, 1) Source(30, 33) + SourceIndex(0)
2 >Emitted(64, 2) Source(30, 34) + SourceIndex(0)
3 >Emitted(64, 2) Source(30, 16) + SourceIndex(0)
4 >Emitted(64, 6) Source(30, 34) + SourceIndex(0)
---
>>>/**@internal*/ function internalfoo() { }
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^
5 >                        ^^^^^^^^^^^
6 >                                   ^^^^^
7 >                                        ^
1->
  >
2 >/**@internal*/
3 >               
4 >               function 
5 >                        internalfoo
6 >                                   () {
7 >                                        }
1->Emitted(65, 1) Source(31, 1) + SourceIndex(0)
2 >Emitted(65, 15) Source(31, 15) + SourceIndex(0)
3 >Emitted(65, 16) Source(31, 16) + SourceIndex(0)
4 >Emitted(65, 25) Source(31, 25) + SourceIndex(0)
5 >Emitted(65, 36) Source(31, 36) + SourceIndex(0)
6 >Emitted(65, 41) Source(31, 40) + SourceIndex(0)
7 >Emitted(65, 42) Source(31, 41) + SourceIndex(0)
---
>>>/**@internal*/ var internalNamespace;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^^^^^^
6 >                                    ^
1 >
  >
2 >/**@internal*/
3 >               
4 >               namespace 
5 >                   internalNamespace
6 >                                     { export class someClass {} }
1 >Emitted(66, 1) Source(32, 1) + SourceIndex(0)
2 >Emitted(66, 15) Source(32, 15) + SourceIndex(0)
3 >Emitted(66, 16) Source(32, 16) + SourceIndex(0)
4 >Emitted(66, 20) Source(32, 26) + SourceIndex(0)
5 >Emitted(66, 37) Source(32, 43) + SourceIndex(0)
6 >Emitted(66, 38) Source(32, 73) + SourceIndex(0)
---
>>>(function (internalNamespace) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >namespace 
3 >           internalNamespace
1 >Emitted(67, 1) Source(32, 16) + SourceIndex(0)
2 >Emitted(67, 12) Source(32, 26) + SourceIndex(0)
3 >Emitted(67, 29) Source(32, 43) + SourceIndex(0)
---
>>>    var someClass = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(68, 5) Source(32, 46) + SourceIndex(0)
---
>>>        function someClass() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(69, 9) Source(32, 46) + SourceIndex(0)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >        }
1->Emitted(70, 9) Source(32, 70) + SourceIndex(0)
2 >Emitted(70, 10) Source(32, 71) + SourceIndex(0)
---
>>>        return someClass;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1->
2 >        }
1->Emitted(71, 9) Source(32, 70) + SourceIndex(0)
2 >Emitted(71, 25) Source(32, 71) + SourceIndex(0)
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
1 >Emitted(72, 5) Source(32, 70) + SourceIndex(0)
2 >Emitted(72, 6) Source(32, 71) + SourceIndex(0)
3 >Emitted(72, 6) Source(32, 46) + SourceIndex(0)
4 >Emitted(72, 10) Source(32, 71) + SourceIndex(0)
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
1->Emitted(73, 5) Source(32, 59) + SourceIndex(0)
2 >Emitted(73, 32) Source(32, 68) + SourceIndex(0)
3 >Emitted(73, 44) Source(32, 71) + SourceIndex(0)
4 >Emitted(73, 45) Source(32, 71) + SourceIndex(0)
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
1->Emitted(74, 1) Source(32, 72) + SourceIndex(0)
2 >Emitted(74, 2) Source(32, 73) + SourceIndex(0)
3 >Emitted(74, 4) Source(32, 26) + SourceIndex(0)
4 >Emitted(74, 21) Source(32, 43) + SourceIndex(0)
5 >Emitted(74, 26) Source(32, 26) + SourceIndex(0)
6 >Emitted(74, 43) Source(32, 43) + SourceIndex(0)
7 >Emitted(74, 51) Source(32, 73) + SourceIndex(0)
---
>>>/**@internal*/ var internalOther;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^^
6 >                                ^
1 >
  >
2 >/**@internal*/
3 >               
4 >               namespace 
5 >                   internalOther
6 >                                .something { export class someClass {} }
1 >Emitted(75, 1) Source(33, 1) + SourceIndex(0)
2 >Emitted(75, 15) Source(33, 15) + SourceIndex(0)
3 >Emitted(75, 16) Source(33, 16) + SourceIndex(0)
4 >Emitted(75, 20) Source(33, 26) + SourceIndex(0)
5 >Emitted(75, 33) Source(33, 39) + SourceIndex(0)
6 >Emitted(75, 34) Source(33, 79) + SourceIndex(0)
---
>>>(function (internalOther) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1 >
2 >namespace 
3 >           internalOther
1 >Emitted(76, 1) Source(33, 16) + SourceIndex(0)
2 >Emitted(76, 12) Source(33, 26) + SourceIndex(0)
3 >Emitted(76, 25) Source(33, 39) + SourceIndex(0)
---
>>>    var something;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^->
1 >.
2 >    
3 >        something
4 >                  { export class someClass {} }
1 >Emitted(77, 5) Source(33, 40) + SourceIndex(0)
2 >Emitted(77, 9) Source(33, 40) + SourceIndex(0)
3 >Emitted(77, 18) Source(33, 49) + SourceIndex(0)
4 >Emitted(77, 19) Source(33, 79) + SourceIndex(0)
---
>>>    (function (something) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    
3 >               something
1->Emitted(78, 5) Source(33, 40) + SourceIndex(0)
2 >Emitted(78, 16) Source(33, 40) + SourceIndex(0)
3 >Emitted(78, 25) Source(33, 49) + SourceIndex(0)
---
>>>        var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(79, 9) Source(33, 52) + SourceIndex(0)
---
>>>            function someClass() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(80, 13) Source(33, 52) + SourceIndex(0)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >            }
1->Emitted(81, 13) Source(33, 76) + SourceIndex(0)
2 >Emitted(81, 14) Source(33, 77) + SourceIndex(0)
---
>>>            return someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1->
2 >            }
1->Emitted(82, 13) Source(33, 76) + SourceIndex(0)
2 >Emitted(82, 29) Source(33, 77) + SourceIndex(0)
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
1 >Emitted(83, 9) Source(33, 76) + SourceIndex(0)
2 >Emitted(83, 10) Source(33, 77) + SourceIndex(0)
3 >Emitted(83, 10) Source(33, 52) + SourceIndex(0)
4 >Emitted(83, 14) Source(33, 77) + SourceIndex(0)
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
1->Emitted(84, 9) Source(33, 65) + SourceIndex(0)
2 >Emitted(84, 28) Source(33, 74) + SourceIndex(0)
3 >Emitted(84, 40) Source(33, 77) + SourceIndex(0)
4 >Emitted(84, 41) Source(33, 77) + SourceIndex(0)
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
1->Emitted(85, 5) Source(33, 78) + SourceIndex(0)
2 >Emitted(85, 6) Source(33, 79) + SourceIndex(0)
3 >Emitted(85, 8) Source(33, 40) + SourceIndex(0)
4 >Emitted(85, 17) Source(33, 49) + SourceIndex(0)
5 >Emitted(85, 20) Source(33, 40) + SourceIndex(0)
6 >Emitted(85, 43) Source(33, 49) + SourceIndex(0)
7 >Emitted(85, 48) Source(33, 40) + SourceIndex(0)
8 >Emitted(85, 71) Source(33, 49) + SourceIndex(0)
9 >Emitted(85, 79) Source(33, 79) + SourceIndex(0)
---
>>>})(internalOther || (internalOther = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^
5 >                ^^^^^
6 >                     ^^^^^^^^^^^^^
7 >                                  ^^^^^^^^
8 >                                          ^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 >   internalOther
5 >                
6 >                     internalOther
7 >                                  .something { export class someClass {} }
1 >Emitted(86, 1) Source(33, 78) + SourceIndex(0)
2 >Emitted(86, 2) Source(33, 79) + SourceIndex(0)
3 >Emitted(86, 4) Source(33, 26) + SourceIndex(0)
4 >Emitted(86, 17) Source(33, 39) + SourceIndex(0)
5 >Emitted(86, 22) Source(33, 26) + SourceIndex(0)
6 >Emitted(86, 35) Source(33, 39) + SourceIndex(0)
7 >Emitted(86, 43) Source(33, 79) + SourceIndex(0)
---
>>>/**@internal*/ var internalImport = internalNamespace.someClass;
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^^^
6 >                                 ^^^
7 >                                    ^^^^^^^^^^^^^^^^^
8 >                                                     ^
9 >                                                      ^^^^^^^^^
10>                                                               ^
1->
  >
2 >/**@internal*/
3 >               
4 >               import 
5 >                   internalImport
6 >                                  = 
7 >                                    internalNamespace
8 >                                                     .
9 >                                                      someClass
10>                                                               ;
1->Emitted(87, 1) Source(34, 1) + SourceIndex(0)
2 >Emitted(87, 15) Source(34, 15) + SourceIndex(0)
3 >Emitted(87, 16) Source(34, 16) + SourceIndex(0)
4 >Emitted(87, 20) Source(34, 23) + SourceIndex(0)
5 >Emitted(87, 34) Source(34, 37) + SourceIndex(0)
6 >Emitted(87, 37) Source(34, 40) + SourceIndex(0)
7 >Emitted(87, 54) Source(34, 57) + SourceIndex(0)
8 >Emitted(87, 55) Source(34, 58) + SourceIndex(0)
9 >Emitted(87, 64) Source(34, 67) + SourceIndex(0)
10>Emitted(87, 65) Source(34, 68) + SourceIndex(0)
---
>>>/**@internal*/ var internalConst = 10;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^^
6 >                                ^^^
7 >                                   ^^
8 >                                     ^
1 >
  >/**@internal*/ type internalType = internalC;
  >
2 >/**@internal*/
3 >               
4 >               const 
5 >                   internalConst
6 >                                 = 
7 >                                   10
8 >                                     ;
1 >Emitted(88, 1) Source(36, 1) + SourceIndex(0)
2 >Emitted(88, 15) Source(36, 15) + SourceIndex(0)
3 >Emitted(88, 16) Source(36, 16) + SourceIndex(0)
4 >Emitted(88, 20) Source(36, 22) + SourceIndex(0)
5 >Emitted(88, 33) Source(36, 35) + SourceIndex(0)
6 >Emitted(88, 36) Source(36, 38) + SourceIndex(0)
7 >Emitted(88, 38) Source(36, 40) + SourceIndex(0)
8 >Emitted(88, 39) Source(36, 41) + SourceIndex(0)
---
>>>/**@internal*/ var internalEnum;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^
1 >
  >
2 >/**@internal*/
3 >               
4 >               enum 
5 >                   internalEnum { a, b, c }
1 >Emitted(89, 1) Source(37, 1) + SourceIndex(0)
2 >Emitted(89, 15) Source(37, 15) + SourceIndex(0)
3 >Emitted(89, 16) Source(37, 16) + SourceIndex(0)
4 >Emitted(89, 20) Source(37, 21) + SourceIndex(0)
5 >Emitted(89, 32) Source(37, 45) + SourceIndex(0)
---
>>>(function (internalEnum) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >enum 
3 >           internalEnum
1 >Emitted(90, 1) Source(37, 16) + SourceIndex(0)
2 >Emitted(90, 12) Source(37, 21) + SourceIndex(0)
3 >Emitted(90, 24) Source(37, 33) + SourceIndex(0)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1-> { 
2 >    a
3 >                                             
1->Emitted(91, 5) Source(37, 36) + SourceIndex(0)
2 >Emitted(91, 46) Source(37, 37) + SourceIndex(0)
3 >Emitted(91, 47) Source(37, 37) + SourceIndex(0)
---
>>>    internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1->, 
2 >    b
3 >                                             
1->Emitted(92, 5) Source(37, 39) + SourceIndex(0)
2 >Emitted(92, 46) Source(37, 40) + SourceIndex(0)
3 >Emitted(92, 47) Source(37, 40) + SourceIndex(0)
---
>>>    internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
1->, 
2 >    c
3 >                                             
1->Emitted(93, 5) Source(37, 42) + SourceIndex(0)
2 >Emitted(93, 46) Source(37, 43) + SourceIndex(0)
3 >Emitted(93, 47) Source(37, 43) + SourceIndex(0)
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
1 >Emitted(94, 1) Source(37, 44) + SourceIndex(0)
2 >Emitted(94, 2) Source(37, 45) + SourceIndex(0)
3 >Emitted(94, 4) Source(37, 21) + SourceIndex(0)
4 >Emitted(94, 16) Source(37, 33) + SourceIndex(0)
5 >Emitted(94, 21) Source(37, 21) + SourceIndex(0)
6 >Emitted(94, 33) Source(37, 33) + SourceIndex(0)
7 >Emitted(94, 41) Source(37, 45) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = /** @class */ (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(95, 1) Source(1, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(96, 5) Source(1, 1) + SourceIndex(1)
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
1->Emitted(97, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(97, 6) Source(5, 2) + SourceIndex(1)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(98, 5) Source(2, 5) + SourceIndex(1)
2 >Emitted(98, 28) Source(2, 16) + SourceIndex(1)
3 >Emitted(98, 31) Source(2, 5) + SourceIndex(1)
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
1->Emitted(99, 9) Source(3, 9) + SourceIndex(1)
2 >Emitted(99, 16) Source(3, 16) + SourceIndex(1)
3 >Emitted(99, 17) Source(3, 17) + SourceIndex(1)
4 >Emitted(99, 20) Source(3, 20) + SourceIndex(1)
5 >Emitted(99, 21) Source(3, 21) + SourceIndex(1)
6 >Emitted(99, 41) Source(3, 41) + SourceIndex(1)
7 >Emitted(99, 42) Source(3, 42) + SourceIndex(1)
8 >Emitted(99, 43) Source(3, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(100, 5) Source(4, 5) + SourceIndex(1)
2 >Emitted(100, 6) Source(4, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(101, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(101, 13) Source(5, 2) + SourceIndex(1)
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
1 >Emitted(102, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(102, 2) Source(5, 2) + SourceIndex(1)
3 >Emitted(102, 2) Source(1, 1) + SourceIndex(1)
4 >Emitted(102, 6) Source(5, 2) + SourceIndex(1)
---
>>>//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../second","sourceFiles":["../second/second_part1.ts","../second/second_part2.ts"],"js":{"sections":[{"pos":0,"end":3435,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":77,"kind":"text"},{"pos":77,"end":257,"kind":"internal"},{"pos":259,"end":291,"kind":"text"},{"pos":291,"end":803,"kind":"internal"},{"pos":805,"end":808,"kind":"text"},{"pos":808,"end":1341,"kind":"internal"},{"pos":1343,"end":1391,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/2/second-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/2/second-output.js
----------------------------------------------------------------------
text: (0-3435)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var normalC = /** @class */ (function () {
    /**@internal*/ function normalC() {
    }
    /**@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /**@internal*/ get: function () { return 10; },
        /**@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /**@internal*/ var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    normalN.C = C;
    /**@internal*/ function foo() { }
    normalN.foo = foo;
    /**@internal*/ var someNamespace;
    (function (someNamespace) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /**@internal*/ var someOther;
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
    /**@internal*/ normalN.someImport = someNamespace.C;
    /**@internal*/ normalN.internalConst = 10;
    /**@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
/**@internal*/ var internalC = /** @class */ (function () {
    function internalC() {
    }
    return internalC;
}());
/**@internal*/ function internalfoo() { }
/**@internal*/ var internalNamespace;
(function (internalNamespace) {
    var someClass = /** @class */ (function () {
        function someClass() {
        }
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/**@internal*/ var internalOther;
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
})(internalOther || (internalOther = {}));
/**@internal*/ var internalImport = internalNamespace.someClass;
/**@internal*/ var internalConst = 10;
/**@internal*/ var internalEnum;
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
text: (0-77)
declare namespace N {
}
declare namespace N {
}
declare class normalC {

----------------------------------------------------------------------
internal: (77-257)
    /**@internal*/ constructor();
    /**@internal*/ prop: string;
    /**@internal*/ method(): void;
    /**@internal*/ get c(): number;
    /**@internal*/ set c(val: number);
----------------------------------------------------------------------
text: (259-291)
}
declare namespace normalN {

----------------------------------------------------------------------
internal: (291-803)
    /**@internal*/ class C {
    }
    /**@internal*/ function foo(): void;
    /**@internal*/ namespace someNamespace {
        class C {
        }
    }
    /**@internal*/ namespace someOther.something {
        class someClass {
        }
    }
    /**@internal*/ export import someImport = someNamespace.C;
    /**@internal*/ type internalType = internalC;
    /**@internal*/ const internalConst = 10;
    /**@internal*/ enum internalEnum {
        a = 0,
        b = 1,
        c = 2
    }
----------------------------------------------------------------------
text: (805-808)
}

----------------------------------------------------------------------
internal: (808-1341)
/**@internal*/ declare class internalC {
}
/**@internal*/ declare function internalfoo(): void;
/**@internal*/ declare namespace internalNamespace {
    class someClass {
    }
}
/**@internal*/ declare namespace internalOther.something {
    class someClass {
    }
}
/**@internal*/ import internalImport = internalNamespace.someClass;
/**@internal*/ declare type internalType = internalC;
/**@internal*/ declare const internalConst = 10;
/**@internal*/ declare enum internalEnum {
    a = 0,
    b = 1,
    c = 2
}
----------------------------------------------------------------------
text: (1343-1391)
declare class C {
    doSomething(): void;
}

======================================================================

//// [/src/2/second-output.tsbuildinfo.readable.baseline.txt]
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
          "end": 3435,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 77,
          "kind": "text"
        },
        {
          "pos": 77,
          "end": 257,
          "kind": "internal"
        },
        {
          "pos": 259,
          "end": 291,
          "kind": "text"
        },
        {
          "pos": 291,
          "end": 803,
          "kind": "internal"
        },
        {
          "pos": 805,
          "end": 808,
          "kind": "text"
        },
        {
          "pos": 808,
          "end": 1341,
          "kind": "internal"
        },
        {
          "pos": 1343,
          "end": 1391,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 485
}

//// [/src/first/bin/first-output.d.ts]
/**@internal*/ interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,cAAc,CAAC,UAAU,QAAQ;IAC7B,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET"}

//// [/src/first/bin/first-output.d.ts.map.baseline.txt]
===================================================================
JsFile: first-output.d.ts
mapUrl: first-output.d.ts.map
sourceRoot: 
sources: ../first_PART1.ts,../first_part2.ts,../first_part3.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.d.ts
sourceFile:../first_PART1.ts
-------------------------------------------------------------------
>>>/**@internal*/ interface TheFirst {
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^
5 >                         ^^^^^^^^
1 >
2 >/**@internal*/
3 >               
4 >               interface 
5 >                         TheFirst
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 15) Source(1, 15) + SourceIndex(0)
3 >Emitted(1, 16) Source(1, 16) + SourceIndex(0)
4 >Emitted(1, 26) Source(1, 26) + SourceIndex(0)
5 >Emitted(1, 34) Source(1, 34) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(2, 5) Source(2, 5) + SourceIndex(0)
2 >Emitted(2, 9) Source(2, 9) + SourceIndex(0)
3 >Emitted(2, 11) Source(2, 11) + SourceIndex(0)
4 >Emitted(2, 14) Source(2, 14) + SourceIndex(0)
5 >Emitted(2, 15) Source(2, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(3, 2) Source(3, 2) + SourceIndex(0)
---
>>>declare const s = "Hello, world";
1->
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^^
6 >                                ^
1->
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hello, world"
6 >                                ;
1->Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(4, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(4, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(4, 33) Source(5, 25) + SourceIndex(0)
6 >Emitted(4, 34) Source(5, 26) + SourceIndex(0)
---
>>>interface NoJsForHereEither {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^^^^^^^^^^
1 >
  >
  >
2 >interface 
3 >          NoJsForHereEither
1 >Emitted(5, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(5, 11) Source(7, 11) + SourceIndex(0)
3 >Emitted(5, 28) Source(7, 28) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(6, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(6, 9) Source(8, 9) + SourceIndex(0)
3 >Emitted(6, 11) Source(8, 11) + SourceIndex(0)
4 >Emitted(6, 14) Source(8, 14) + SourceIndex(0)
5 >Emitted(6, 15) Source(8, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(7, 2) Source(9, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/first/bin/first-output.d.ts
sourceFile:../first_part3.ts
-------------------------------------------------------------------
>>>declare function f(): string;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^
5 >                             ^^^^^^^^^^^^->
1->
2 >function 
3 >                 f
4 >                  () {
  >                      return "JS does hoists";
  >                  }
1->Emitted(8, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(8, 18) Source(1, 10) + SourceIndex(2)
3 >Emitted(8, 19) Source(1, 11) + SourceIndex(2)
4 >Emitted(8, 30) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.js]
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}
//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.js.map]
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(1, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(1, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(1, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(1, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^->
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
1 >Emitted(2, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(3, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(3, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(3, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(3, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(3, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(3, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(4, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(4, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(4, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(5, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(5, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(5, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(5, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(6, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(6, 2) Source(3, 2) + SourceIndex(2)
---
>>>//# sourceMappingURL=first-output.js.map

//// [/src/first/bin/first-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"..","sourceFiles":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"js":{"sections":[{"pos":0,"end":110,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":54,"kind":"internal"},{"pos":56,"end":172,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/first/bin/first-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/first/bin/first-output.js
----------------------------------------------------------------------
text: (0-110)
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

======================================================================
======================================================================
File:: /src/first/bin/first-output.d.ts
----------------------------------------------------------------------
internal: (0-54)
/**@internal*/ interface TheFirst {
    none: any;
}
----------------------------------------------------------------------
text: (56-172)
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

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
          "end": 110,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 54,
          "kind": "internal"
        },
        {
          "pos": 56,
          "end": 172,
          "kind": "text"
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 290
}

//// [/src/third/thirdjs/output/third-output.d.ts]
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
declare var c: C;
//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.d.ts.map]
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAIA,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AAED,cAAM,OAAO;CAMZ;AACD,kBAAU,OAAO,CAAC;CASjB;AC5BD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC"}

//// [/src/third/thirdjs/output/third-output.d.ts.map.baseline.txt]
===================================================================
JsFile: third-output.d.ts
mapUrl: third-output.d.ts.map
sourceRoot: 
sources: ../../../first/first_PART1.ts,../../../first/first_part3.ts,../../../second/second_part1.ts,../../../second/second_part2.ts,../../third_part1.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../first/first_PART1.ts
-------------------------------------------------------------------
>>>declare const s = "Hello, world";
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^
5 >               ^^^^^^^^^^^^^^^^^
6 >                                ^
1 >/**@internal*/ interface TheFirst {
  >    none: any;
  >}
  >
  >
2 >
3 >        const 
4 >              s
5 >                = "Hello, world"
6 >                                ;
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 9) Source(5, 1) + SourceIndex(0)
3 >Emitted(1, 15) Source(5, 7) + SourceIndex(0)
4 >Emitted(1, 16) Source(5, 8) + SourceIndex(0)
5 >Emitted(1, 33) Source(5, 25) + SourceIndex(0)
6 >Emitted(1, 34) Source(5, 26) + SourceIndex(0)
---
>>>interface NoJsForHereEither {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^^^^^^^^^^
1 >
  >
  >
2 >interface 
3 >          NoJsForHereEither
1 >Emitted(2, 1) Source(7, 1) + SourceIndex(0)
2 >Emitted(2, 11) Source(7, 11) + SourceIndex(0)
3 >Emitted(2, 28) Source(7, 28) + SourceIndex(0)
---
>>>    none: any;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^
5 >             ^
1 > {
  >    
2 >    none
3 >        : 
4 >          any
5 >             ;
1 >Emitted(3, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(3, 9) Source(8, 9) + SourceIndex(0)
3 >Emitted(3, 11) Source(8, 11) + SourceIndex(0)
4 >Emitted(3, 14) Source(8, 14) + SourceIndex(0)
5 >Emitted(3, 15) Source(8, 15) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(4, 2) Source(9, 2) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../first/first_part3.ts
-------------------------------------------------------------------
>>>declare function f(): string;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^
4 >                  ^^^^^^^^^^^
1->
2 >function 
3 >                 f
4 >                  () {
  >                      return "JS does hoists";
  >                  }
1->Emitted(5, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(5, 18) Source(1, 10) + SourceIndex(1)
3 >Emitted(5, 19) Source(1, 11) + SourceIndex(1)
4 >Emitted(5, 30) Source(3, 2) + SourceIndex(1)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part1.ts
-------------------------------------------------------------------
>>>declare namespace N {
1 >
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1 >
2 >namespace 
3 >                  N
4 >                    
1 >Emitted(6, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(6, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(6, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(6, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(7, 2) Source(3, 2) + SourceIndex(2)
---
>>>declare namespace N {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^
1->
  >
  >
2 >namespace 
3 >                  N
4 >                    
1->Emitted(8, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(8, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(8, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(8, 21) Source(5, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    function f() {
  >        console.log('testing');
  >    }
  >
  >    f();
  >}
1 >Emitted(9, 2) Source(11, 2) + SourceIndex(2)
---
>>>declare class normalC {
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^
1->
  >
  >
2 >class 
3 >              normalC
1->Emitted(10, 1) Source(13, 1) + SourceIndex(2)
2 >Emitted(10, 15) Source(13, 7) + SourceIndex(2)
3 >Emitted(10, 22) Source(13, 14) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > {
  >    /**@internal*/ constructor() { }
  >    /**@internal*/ prop: string;
  >    /**@internal*/ method() { }
  >    /**@internal*/ get c() { return 10; }
  >    /**@internal*/ set c(val: number) { }
  >}
1 >Emitted(11, 2) Source(19, 2) + SourceIndex(2)
---
>>>declare namespace normalN {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^^^^^^
4 >                         ^
1->
  >
2 >namespace 
3 >                  normalN
4 >                          
1->Emitted(12, 1) Source(20, 1) + SourceIndex(2)
2 >Emitted(12, 19) Source(20, 11) + SourceIndex(2)
3 >Emitted(12, 26) Source(20, 18) + SourceIndex(2)
4 >Emitted(12, 27) Source(20, 19) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >{
  >    /**@internal*/ export class C { }
  >    /**@internal*/ export function foo() {}
  >    /**@internal*/ export namespace someNamespace { export class C {} }
  >    /**@internal*/ export namespace someOther.something { export class someClass {} }
  >    /**@internal*/ export import someImport = someNamespace.C;
  >    /**@internal*/ export type internalType = internalC;
  >    /**@internal*/ export const internalConst = 10;
  >    /**@internal*/ export enum internalEnum { a, b, c }
  >}
1 >Emitted(13, 2) Source(29, 2) + SourceIndex(2)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>declare class C {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^->
1->
2 >class 
3 >              C
1->Emitted(14, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(14, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(14, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(15, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(15, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(16, 2) Source(5, 2) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.d.ts
sourceFile:../../third_part1.ts
-------------------------------------------------------------------
>>>declare var c: C;
1->
2 >^^^^^^^^
3 >        ^^^^
4 >            ^
5 >             ^^^
6 >                ^
7 >                 ^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >
3 >        var 
4 >            c
5 >              = new C()
6 >                ;
1->Emitted(17, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(17, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(17, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(17, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(17, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(17, 18) Source(1, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

//// [/src/third/thirdjs/output/third-output.js]
var s = "Hello, world";
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
    /**@internal*/ function normalC() {
    }
    /**@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /**@internal*/ get: function () { return 10; },
        /**@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /**@internal*/ var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    normalN.C = C;
    /**@internal*/ function foo() { }
    normalN.foo = foo;
    /**@internal*/ var someNamespace;
    (function (someNamespace) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /**@internal*/ var someOther;
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
    /**@internal*/ normalN.someImport = someNamespace.C;
    /**@internal*/ normalN.internalConst = 10;
    /**@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
/**@internal*/ var internalC = /** @class */ (function () {
    function internalC() {
    }
    return internalC;
}());
/**@internal*/ function internalfoo() { }
/**@internal*/ var internalNamespace;
(function (internalNamespace) {
    var someClass = /** @class */ (function () {
        function someClass() {
        }
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/**@internal*/ var internalOther;
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
})(internalOther || (internalOther = {}));
/**@internal*/ var internalImport = internalNamespace.someClass;
/**@internal*/ var internalConst = 10;
/**@internal*/ var internalEnum;
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACI,cAAc,CAAC;IAAgB,CAAC;IAEhC,cAAc,CAAC,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;QAApB,cAAc,MAAC,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;QACrC,cAAc,MAAC,UAAM,GAAW,IAAI,CAAC;;;OADA;IAEzC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACb,cAAc,CAAC;QAAA;QAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IACjC,cAAc,CAAC,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACvC,cAAc,CAAC,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa;QAAG;YAAA;YAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IACnE,cAAc,CAAC,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS;YAAG;gBAAA;gBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IACjF,cAAc,CAAe,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;IAE1D,cAAc,CAAc,qBAAa,GAAG,EAAE,CAAC;IAC/C,cAAc,CAAC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAA;QAAE,yCAAC,CAAA;QAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACvD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACD,cAAc,CAAC;IAAA;IAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AACjC,cAAc,CAAC,SAAS,WAAW,KAAI,CAAC;AACxC,cAAc,CAAC,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB;IAAG;QAAA;QAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACxE,cAAc,CAAC,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS;QAAG;YAAA;YAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC9E,cAAc,CAAC,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;AAEnE,cAAc,CAAC,IAAM,aAAa,GAAG,EAAE,CAAC;AACxC,cAAc,CAAC,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAA;IAAE,yCAAC,CAAA;IAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC5C;IAAA;IAIA,CAAC;IAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
1 >Emitted(1, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(1, 5) Source(5, 7) + SourceIndex(0)
3 >Emitted(1, 6) Source(5, 8) + SourceIndex(0)
4 >Emitted(1, 9) Source(5, 11) + SourceIndex(0)
5 >Emitted(1, 23) Source(5, 25) + SourceIndex(0)
6 >Emitted(1, 24) Source(5, 26) + SourceIndex(0)
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
9 >               ^^^->
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
1 >Emitted(2, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(2, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(2, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(2, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(2, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(2, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(2, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(2, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(3, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(3, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(3, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(3, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(3, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(3, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(3, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(3, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(3, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(4, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(4, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(4, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(5, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(5, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(5, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(5, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(6, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(6, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(7, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(7, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(7, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(7, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(8, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(8, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(8, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(9, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(9, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(9, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(10, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(10, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(10, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(10, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(10, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(10, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(10, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(10, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^->
1 >
  >    
2 >    }
1 >Emitted(11, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(11, 6) Source(8, 6) + SourceIndex(3)
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
1->Emitted(12, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(12, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(12, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(12, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(13, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(13, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(13, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(13, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(13, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(13, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(13, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(14, 1) Source(13, 1) + SourceIndex(3)
---
>>>    /**@internal*/ function normalC() {
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
1->class normalC {
  >    
2 >    /**@internal*/
3 >                   
1->Emitted(15, 5) Source(14, 5) + SourceIndex(3)
2 >Emitted(15, 19) Source(14, 19) + SourceIndex(3)
3 >Emitted(15, 20) Source(14, 20) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >constructor() { 
2 >    }
1 >Emitted(16, 5) Source(14, 36) + SourceIndex(3)
2 >Emitted(16, 6) Source(14, 37) + SourceIndex(3)
---
>>>    /**@internal*/ normalC.prototype.method = function () { };
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^^^^^^^^^^^^^^^^
5 >                                           ^^^
6 >                                              ^^^^^^^^^^^^^^
7 >                                                            ^
1->
  >    /**@internal*/ prop: string;
  >    
2 >    /**@internal*/
3 >                   
4 >                   method
5 >                                           
6 >                                              method() { 
7 >                                                            }
1->Emitted(17, 5) Source(16, 5) + SourceIndex(3)
2 >Emitted(17, 19) Source(16, 19) + SourceIndex(3)
3 >Emitted(17, 20) Source(16, 20) + SourceIndex(3)
4 >Emitted(17, 44) Source(16, 26) + SourceIndex(3)
5 >Emitted(17, 47) Source(16, 20) + SourceIndex(3)
6 >Emitted(17, 61) Source(16, 31) + SourceIndex(3)
7 >Emitted(17, 62) Source(16, 32) + SourceIndex(3)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
4 >                                                ^^^^^^^^->
1 >
  >    /**@internal*/ 
2 >    get 
3 >                          c
1 >Emitted(18, 5) Source(17, 20) + SourceIndex(3)
2 >Emitted(18, 27) Source(17, 24) + SourceIndex(3)
3 >Emitted(18, 49) Source(17, 25) + SourceIndex(3)
---
>>>        /**@internal*/ get: function () { return 10; },
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^^^^^^
4 >                            ^^^^^^^^^^^^^^
5 >                                          ^^^^^^^
6 >                                                 ^^
7 >                                                   ^
8 >                                                    ^
9 >                                                     ^
1->
2 >        /**@internal*/
3 >                       
4 >                            get c() { 
5 >                                          return 
6 >                                                 10
7 >                                                   ;
8 >                                                     
9 >                                                     }
1->Emitted(19, 9) Source(17, 5) + SourceIndex(3)
2 >Emitted(19, 23) Source(17, 19) + SourceIndex(3)
3 >Emitted(19, 29) Source(17, 20) + SourceIndex(3)
4 >Emitted(19, 43) Source(17, 30) + SourceIndex(3)
5 >Emitted(19, 50) Source(17, 37) + SourceIndex(3)
6 >Emitted(19, 52) Source(17, 39) + SourceIndex(3)
7 >Emitted(19, 53) Source(17, 40) + SourceIndex(3)
8 >Emitted(19, 54) Source(17, 41) + SourceIndex(3)
9 >Emitted(19, 55) Source(17, 42) + SourceIndex(3)
---
>>>        /**@internal*/ set: function (val) { },
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^^^^^^
4 >                            ^^^^^^^^^^
5 >                                      ^^^
6 >                                         ^^^^
7 >                                             ^
1 >
  >    
2 >        /**@internal*/
3 >                       
4 >                            set c(
5 >                                      val: number
6 >                                         ) { 
7 >                                             }
1 >Emitted(20, 9) Source(18, 5) + SourceIndex(3)
2 >Emitted(20, 23) Source(18, 19) + SourceIndex(3)
3 >Emitted(20, 29) Source(18, 20) + SourceIndex(3)
4 >Emitted(20, 39) Source(18, 26) + SourceIndex(3)
5 >Emitted(20, 42) Source(18, 37) + SourceIndex(3)
6 >Emitted(20, 46) Source(18, 41) + SourceIndex(3)
7 >Emitted(20, 47) Source(18, 42) + SourceIndex(3)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(23, 8) Source(17, 42) + SourceIndex(3)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /**@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(24, 5) Source(19, 1) + SourceIndex(3)
2 >Emitted(24, 19) Source(19, 2) + SourceIndex(3)
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
1 >Emitted(25, 1) Source(19, 1) + SourceIndex(3)
2 >Emitted(25, 2) Source(19, 2) + SourceIndex(3)
3 >Emitted(25, 2) Source(13, 1) + SourceIndex(3)
4 >Emitted(25, 6) Source(19, 2) + SourceIndex(3)
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
1->Emitted(26, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(26, 5) Source(20, 11) + SourceIndex(3)
3 >Emitted(26, 12) Source(20, 18) + SourceIndex(3)
4 >Emitted(26, 13) Source(29, 2) + SourceIndex(3)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(27, 1) Source(20, 1) + SourceIndex(3)
2 >Emitted(27, 12) Source(20, 11) + SourceIndex(3)
3 >Emitted(27, 19) Source(20, 18) + SourceIndex(3)
---
>>>    /**@internal*/ var C = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^->
1-> {
  >    
2 >    /**@internal*/
3 >                   
1->Emitted(28, 5) Source(21, 5) + SourceIndex(3)
2 >Emitted(28, 19) Source(21, 19) + SourceIndex(3)
3 >Emitted(28, 20) Source(21, 20) + SourceIndex(3)
---
>>>        function C() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(29, 9) Source(21, 20) + SourceIndex(3)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^->
1->export class C { 
2 >        }
1->Emitted(30, 9) Source(21, 37) + SourceIndex(3)
2 >Emitted(30, 10) Source(21, 38) + SourceIndex(3)
---
>>>        return C;
1->^^^^^^^^
2 >        ^^^^^^^^
1->
2 >        }
1->Emitted(31, 9) Source(21, 37) + SourceIndex(3)
2 >Emitted(31, 17) Source(21, 38) + SourceIndex(3)
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
1 >Emitted(32, 5) Source(21, 37) + SourceIndex(3)
2 >Emitted(32, 6) Source(21, 38) + SourceIndex(3)
3 >Emitted(32, 6) Source(21, 20) + SourceIndex(3)
4 >Emitted(32, 10) Source(21, 38) + SourceIndex(3)
---
>>>    normalN.C = C;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(33, 5) Source(21, 33) + SourceIndex(3)
2 >Emitted(33, 14) Source(21, 34) + SourceIndex(3)
3 >Emitted(33, 18) Source(21, 38) + SourceIndex(3)
4 >Emitted(33, 19) Source(21, 38) + SourceIndex(3)
---
>>>    /**@internal*/ function foo() { }
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^
5 >                            ^^^
6 >                               ^^^^^
7 >                                    ^
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   export function 
5 >                            foo
6 >                               () {
7 >                                    }
1->Emitted(34, 5) Source(22, 5) + SourceIndex(3)
2 >Emitted(34, 19) Source(22, 19) + SourceIndex(3)
3 >Emitted(34, 20) Source(22, 20) + SourceIndex(3)
4 >Emitted(34, 29) Source(22, 36) + SourceIndex(3)
5 >Emitted(34, 32) Source(22, 39) + SourceIndex(3)
6 >Emitted(34, 37) Source(22, 43) + SourceIndex(3)
7 >Emitted(34, 38) Source(22, 44) + SourceIndex(3)
---
>>>    normalN.foo = foo;
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^->
1 >
2 >    foo
3 >               () {}
4 >                     
1 >Emitted(35, 5) Source(22, 36) + SourceIndex(3)
2 >Emitted(35, 16) Source(22, 39) + SourceIndex(3)
3 >Emitted(35, 22) Source(22, 44) + SourceIndex(3)
4 >Emitted(35, 23) Source(22, 44) + SourceIndex(3)
---
>>>    /**@internal*/ var someNamespace;
1->^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^^^^^^^^^^^^^
6 >                                    ^
1->
  >    
2 >    /**@internal*/
3 >                   
4 >                   export namespace 
5 >                       someNamespace
6 >                                     { export class C {} }
1->Emitted(36, 5) Source(23, 5) + SourceIndex(3)
2 >Emitted(36, 19) Source(23, 19) + SourceIndex(3)
3 >Emitted(36, 20) Source(23, 20) + SourceIndex(3)
4 >Emitted(36, 24) Source(23, 37) + SourceIndex(3)
5 >Emitted(36, 37) Source(23, 50) + SourceIndex(3)
6 >Emitted(36, 38) Source(23, 72) + SourceIndex(3)
---
>>>    (function (someNamespace) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^->
1 >
2 >    export namespace 
3 >               someNamespace
1 >Emitted(37, 5) Source(23, 20) + SourceIndex(3)
2 >Emitted(37, 16) Source(23, 37) + SourceIndex(3)
3 >Emitted(37, 29) Source(23, 50) + SourceIndex(3)
---
>>>        var C = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(38, 9) Source(23, 53) + SourceIndex(3)
---
>>>            function C() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(39, 13) Source(23, 53) + SourceIndex(3)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^->
1->export class C {
2 >            }
1->Emitted(40, 13) Source(23, 69) + SourceIndex(3)
2 >Emitted(40, 14) Source(23, 70) + SourceIndex(3)
---
>>>            return C;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^
1->
2 >            }
1->Emitted(41, 13) Source(23, 69) + SourceIndex(3)
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
>>>    /**@internal*/ var someOther;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^^^^^^^^^
6 >                                ^
1 >
  >    
2 >    /**@internal*/
3 >                   
4 >                   export namespace 
5 >                       someOther
6 >                                .something { export class someClass {} }
1 >Emitted(45, 5) Source(24, 5) + SourceIndex(3)
2 >Emitted(45, 19) Source(24, 19) + SourceIndex(3)
3 >Emitted(45, 20) Source(24, 20) + SourceIndex(3)
4 >Emitted(45, 24) Source(24, 37) + SourceIndex(3)
5 >Emitted(45, 33) Source(24, 46) + SourceIndex(3)
6 >Emitted(45, 34) Source(24, 86) + SourceIndex(3)
---
>>>    (function (someOther) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1 >
2 >    export namespace 
3 >               someOther
1 >Emitted(46, 5) Source(24, 20) + SourceIndex(3)
2 >Emitted(46, 16) Source(24, 37) + SourceIndex(3)
3 >Emitted(46, 25) Source(24, 46) + SourceIndex(3)
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
1 >Emitted(47, 9) Source(24, 47) + SourceIndex(3)
2 >Emitted(47, 13) Source(24, 47) + SourceIndex(3)
3 >Emitted(47, 22) Source(24, 56) + SourceIndex(3)
4 >Emitted(47, 23) Source(24, 86) + SourceIndex(3)
---
>>>        (function (something) {
1->^^^^^^^^
2 >        ^^^^^^^^^^^
3 >                   ^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >        
3 >                   something
1->Emitted(48, 9) Source(24, 47) + SourceIndex(3)
2 >Emitted(48, 20) Source(24, 47) + SourceIndex(3)
3 >Emitted(48, 29) Source(24, 56) + SourceIndex(3)
---
>>>            var someClass = /** @class */ (function () {
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(49, 13) Source(24, 59) + SourceIndex(3)
---
>>>                function someClass() {
1->^^^^^^^^^^^^^^^^
2 >                ^^->
1->
1->Emitted(50, 17) Source(24, 59) + SourceIndex(3)
---
>>>                }
1->^^^^^^^^^^^^^^^^
2 >                ^
3 >                 ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >                }
1->Emitted(51, 17) Source(24, 83) + SourceIndex(3)
2 >Emitted(51, 18) Source(24, 84) + SourceIndex(3)
---
>>>                return someClass;
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1->
2 >                }
1->Emitted(52, 17) Source(24, 83) + SourceIndex(3)
2 >Emitted(52, 33) Source(24, 84) + SourceIndex(3)
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
1 >Emitted(53, 13) Source(24, 83) + SourceIndex(3)
2 >Emitted(53, 14) Source(24, 84) + SourceIndex(3)
3 >Emitted(53, 14) Source(24, 59) + SourceIndex(3)
4 >Emitted(53, 18) Source(24, 84) + SourceIndex(3)
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
1->Emitted(54, 13) Source(24, 72) + SourceIndex(3)
2 >Emitted(54, 32) Source(24, 81) + SourceIndex(3)
3 >Emitted(54, 44) Source(24, 84) + SourceIndex(3)
4 >Emitted(54, 45) Source(24, 84) + SourceIndex(3)
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
1->Emitted(55, 9) Source(24, 85) + SourceIndex(3)
2 >Emitted(55, 10) Source(24, 86) + SourceIndex(3)
3 >Emitted(55, 12) Source(24, 47) + SourceIndex(3)
4 >Emitted(55, 21) Source(24, 56) + SourceIndex(3)
5 >Emitted(55, 24) Source(24, 47) + SourceIndex(3)
6 >Emitted(55, 43) Source(24, 56) + SourceIndex(3)
7 >Emitted(55, 48) Source(24, 47) + SourceIndex(3)
8 >Emitted(55, 67) Source(24, 56) + SourceIndex(3)
9 >Emitted(55, 75) Source(24, 86) + SourceIndex(3)
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
1 >Emitted(56, 5) Source(24, 85) + SourceIndex(3)
2 >Emitted(56, 6) Source(24, 86) + SourceIndex(3)
3 >Emitted(56, 8) Source(24, 37) + SourceIndex(3)
4 >Emitted(56, 17) Source(24, 46) + SourceIndex(3)
5 >Emitted(56, 20) Source(24, 37) + SourceIndex(3)
6 >Emitted(56, 37) Source(24, 46) + SourceIndex(3)
7 >Emitted(56, 42) Source(24, 37) + SourceIndex(3)
8 >Emitted(56, 59) Source(24, 46) + SourceIndex(3)
9 >Emitted(56, 67) Source(24, 86) + SourceIndex(3)
---
>>>    /**@internal*/ normalN.someImport = someNamespace.C;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^^^^^^^^^^
5 >                                     ^^^
6 >                                        ^^^^^^^^^^^^^
7 >                                                     ^
8 >                                                      ^
9 >                                                       ^
1 >
  >    
2 >    /**@internal*/
3 >                   export import 
4 >                   someImport
5 >                                      = 
6 >                                        someNamespace
7 >                                                     .
8 >                                                      C
9 >                                                       ;
1 >Emitted(57, 5) Source(25, 5) + SourceIndex(3)
2 >Emitted(57, 19) Source(25, 19) + SourceIndex(3)
3 >Emitted(57, 20) Source(25, 34) + SourceIndex(3)
4 >Emitted(57, 38) Source(25, 44) + SourceIndex(3)
5 >Emitted(57, 41) Source(25, 47) + SourceIndex(3)
6 >Emitted(57, 54) Source(25, 60) + SourceIndex(3)
7 >Emitted(57, 55) Source(25, 61) + SourceIndex(3)
8 >Emitted(57, 56) Source(25, 62) + SourceIndex(3)
9 >Emitted(57, 57) Source(25, 63) + SourceIndex(3)
---
>>>    /**@internal*/ normalN.internalConst = 10;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^^^^^^^^^^^^^^^^^^
5 >                                        ^^^
6 >                                           ^^
7 >                                             ^
1 >
  >    /**@internal*/ export type internalType = internalC;
  >    
2 >    /**@internal*/
3 >                   export const 
4 >                   internalConst
5 >                                         = 
6 >                                           10
7 >                                             ;
1 >Emitted(58, 5) Source(27, 5) + SourceIndex(3)
2 >Emitted(58, 19) Source(27, 19) + SourceIndex(3)
3 >Emitted(58, 20) Source(27, 33) + SourceIndex(3)
4 >Emitted(58, 41) Source(27, 46) + SourceIndex(3)
5 >Emitted(58, 44) Source(27, 49) + SourceIndex(3)
6 >Emitted(58, 46) Source(27, 51) + SourceIndex(3)
7 >Emitted(58, 47) Source(27, 52) + SourceIndex(3)
---
>>>    /**@internal*/ var internalEnum;
1 >^^^^
2 >    ^^^^^^^^^^^^^^
3 >                  ^
4 >                   ^^^^
5 >                       ^^^^^^^^^^^^
1 >
  >    
2 >    /**@internal*/
3 >                   
4 >                   export enum 
5 >                       internalEnum { a, b, c }
1 >Emitted(59, 5) Source(28, 5) + SourceIndex(3)
2 >Emitted(59, 19) Source(28, 19) + SourceIndex(3)
3 >Emitted(59, 20) Source(28, 20) + SourceIndex(3)
4 >Emitted(59, 24) Source(28, 32) + SourceIndex(3)
5 >Emitted(59, 36) Source(28, 56) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1 >^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >    export enum 
3 >               internalEnum
1 >Emitted(60, 5) Source(28, 20) + SourceIndex(3)
2 >Emitted(60, 16) Source(28, 32) + SourceIndex(3)
3 >Emitted(60, 28) Source(28, 44) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1-> { 
2 >        a
3 >                                                 
1->Emitted(61, 9) Source(28, 47) + SourceIndex(3)
2 >Emitted(61, 50) Source(28, 48) + SourceIndex(3)
3 >Emitted(61, 51) Source(28, 48) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^->
1->, 
2 >        b
3 >                                                 
1->Emitted(62, 9) Source(28, 50) + SourceIndex(3)
2 >Emitted(62, 50) Source(28, 51) + SourceIndex(3)
3 >Emitted(62, 51) Source(28, 51) + SourceIndex(3)
---
>>>        internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                                 ^
4 >                                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->, 
2 >        c
3 >                                                 
1->Emitted(63, 9) Source(28, 53) + SourceIndex(3)
2 >Emitted(63, 50) Source(28, 54) + SourceIndex(3)
3 >Emitted(63, 51) Source(28, 54) + SourceIndex(3)
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
1->Emitted(64, 5) Source(28, 55) + SourceIndex(3)
2 >Emitted(64, 6) Source(28, 56) + SourceIndex(3)
3 >Emitted(64, 8) Source(28, 32) + SourceIndex(3)
4 >Emitted(64, 20) Source(28, 44) + SourceIndex(3)
5 >Emitted(64, 23) Source(28, 32) + SourceIndex(3)
6 >Emitted(64, 43) Source(28, 44) + SourceIndex(3)
7 >Emitted(64, 48) Source(28, 32) + SourceIndex(3)
8 >Emitted(64, 68) Source(28, 44) + SourceIndex(3)
9 >Emitted(64, 76) Source(28, 56) + SourceIndex(3)
---
>>>})(normalN || (normalN = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^
5 >          ^^^^^
6 >               ^^^^^^^
7 >                      ^^^^^^^^
8 >                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
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
1 >Emitted(65, 1) Source(29, 1) + SourceIndex(3)
2 >Emitted(65, 2) Source(29, 2) + SourceIndex(3)
3 >Emitted(65, 4) Source(20, 11) + SourceIndex(3)
4 >Emitted(65, 11) Source(20, 18) + SourceIndex(3)
5 >Emitted(65, 16) Source(20, 11) + SourceIndex(3)
6 >Emitted(65, 23) Source(20, 18) + SourceIndex(3)
7 >Emitted(65, 31) Source(29, 2) + SourceIndex(3)
---
>>>/**@internal*/ var internalC = /** @class */ (function () {
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^^^^->
1->
  >
2 >/**@internal*/
3 >               
1->Emitted(66, 1) Source(30, 1) + SourceIndex(3)
2 >Emitted(66, 15) Source(30, 15) + SourceIndex(3)
3 >Emitted(66, 16) Source(30, 16) + SourceIndex(3)
---
>>>    function internalC() {
1->^^^^
2 >    ^^->
1->
1->Emitted(67, 5) Source(30, 16) + SourceIndex(3)
---
>>>    }
1->^^^^
2 >    ^
3 >     ^^^^^^^^^^^^^^^^^->
1->class internalC {
2 >    }
1->Emitted(68, 5) Source(30, 33) + SourceIndex(3)
2 >Emitted(68, 6) Source(30, 34) + SourceIndex(3)
---
>>>    return internalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^^^
1->
2 >    }
1->Emitted(69, 5) Source(30, 33) + SourceIndex(3)
2 >Emitted(69, 21) Source(30, 34) + SourceIndex(3)
---
>>>}());
1 >
2 >^
3 > 
4 > ^^^^
5 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 > class internalC {}
1 >Emitted(70, 1) Source(30, 33) + SourceIndex(3)
2 >Emitted(70, 2) Source(30, 34) + SourceIndex(3)
3 >Emitted(70, 2) Source(30, 16) + SourceIndex(3)
4 >Emitted(70, 6) Source(30, 34) + SourceIndex(3)
---
>>>/**@internal*/ function internalfoo() { }
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^^^^^^
5 >                        ^^^^^^^^^^^
6 >                                   ^^^^^
7 >                                        ^
1->
  >
2 >/**@internal*/
3 >               
4 >               function 
5 >                        internalfoo
6 >                                   () {
7 >                                        }
1->Emitted(71, 1) Source(31, 1) + SourceIndex(3)
2 >Emitted(71, 15) Source(31, 15) + SourceIndex(3)
3 >Emitted(71, 16) Source(31, 16) + SourceIndex(3)
4 >Emitted(71, 25) Source(31, 25) + SourceIndex(3)
5 >Emitted(71, 36) Source(31, 36) + SourceIndex(3)
6 >Emitted(71, 41) Source(31, 40) + SourceIndex(3)
7 >Emitted(71, 42) Source(31, 41) + SourceIndex(3)
---
>>>/**@internal*/ var internalNamespace;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^^^^^^
6 >                                    ^
1 >
  >
2 >/**@internal*/
3 >               
4 >               namespace 
5 >                   internalNamespace
6 >                                     { export class someClass {} }
1 >Emitted(72, 1) Source(32, 1) + SourceIndex(3)
2 >Emitted(72, 15) Source(32, 15) + SourceIndex(3)
3 >Emitted(72, 16) Source(32, 16) + SourceIndex(3)
4 >Emitted(72, 20) Source(32, 26) + SourceIndex(3)
5 >Emitted(72, 37) Source(32, 43) + SourceIndex(3)
6 >Emitted(72, 38) Source(32, 73) + SourceIndex(3)
---
>>>(function (internalNamespace) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^^^^^
4 >                            ^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >namespace 
3 >           internalNamespace
1 >Emitted(73, 1) Source(32, 16) + SourceIndex(3)
2 >Emitted(73, 12) Source(32, 26) + SourceIndex(3)
3 >Emitted(73, 29) Source(32, 43) + SourceIndex(3)
---
>>>    var someClass = /** @class */ (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(74, 5) Source(32, 46) + SourceIndex(3)
---
>>>        function someClass() {
1->^^^^^^^^
2 >        ^^->
1->
1->Emitted(75, 9) Source(32, 46) + SourceIndex(3)
---
>>>        }
1->^^^^^^^^
2 >        ^
3 >         ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >        }
1->Emitted(76, 9) Source(32, 70) + SourceIndex(3)
2 >Emitted(76, 10) Source(32, 71) + SourceIndex(3)
---
>>>        return someClass;
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1->
2 >        }
1->Emitted(77, 9) Source(32, 70) + SourceIndex(3)
2 >Emitted(77, 25) Source(32, 71) + SourceIndex(3)
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
1 >Emitted(78, 5) Source(32, 70) + SourceIndex(3)
2 >Emitted(78, 6) Source(32, 71) + SourceIndex(3)
3 >Emitted(78, 6) Source(32, 46) + SourceIndex(3)
4 >Emitted(78, 10) Source(32, 71) + SourceIndex(3)
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
1->Emitted(79, 5) Source(32, 59) + SourceIndex(3)
2 >Emitted(79, 32) Source(32, 68) + SourceIndex(3)
3 >Emitted(79, 44) Source(32, 71) + SourceIndex(3)
4 >Emitted(79, 45) Source(32, 71) + SourceIndex(3)
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
1->Emitted(80, 1) Source(32, 72) + SourceIndex(3)
2 >Emitted(80, 2) Source(32, 73) + SourceIndex(3)
3 >Emitted(80, 4) Source(32, 26) + SourceIndex(3)
4 >Emitted(80, 21) Source(32, 43) + SourceIndex(3)
5 >Emitted(80, 26) Source(32, 26) + SourceIndex(3)
6 >Emitted(80, 43) Source(32, 43) + SourceIndex(3)
7 >Emitted(80, 51) Source(32, 73) + SourceIndex(3)
---
>>>/**@internal*/ var internalOther;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^^
6 >                                ^
1 >
  >
2 >/**@internal*/
3 >               
4 >               namespace 
5 >                   internalOther
6 >                                .something { export class someClass {} }
1 >Emitted(81, 1) Source(33, 1) + SourceIndex(3)
2 >Emitted(81, 15) Source(33, 15) + SourceIndex(3)
3 >Emitted(81, 16) Source(33, 16) + SourceIndex(3)
4 >Emitted(81, 20) Source(33, 26) + SourceIndex(3)
5 >Emitted(81, 33) Source(33, 39) + SourceIndex(3)
6 >Emitted(81, 34) Source(33, 79) + SourceIndex(3)
---
>>>(function (internalOther) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1 >
2 >namespace 
3 >           internalOther
1 >Emitted(82, 1) Source(33, 16) + SourceIndex(3)
2 >Emitted(82, 12) Source(33, 26) + SourceIndex(3)
3 >Emitted(82, 25) Source(33, 39) + SourceIndex(3)
---
>>>    var something;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^->
1 >.
2 >    
3 >        something
4 >                  { export class someClass {} }
1 >Emitted(83, 5) Source(33, 40) + SourceIndex(3)
2 >Emitted(83, 9) Source(33, 40) + SourceIndex(3)
3 >Emitted(83, 18) Source(33, 49) + SourceIndex(3)
4 >Emitted(83, 19) Source(33, 79) + SourceIndex(3)
---
>>>    (function (something) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
4 >                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    
3 >               something
1->Emitted(84, 5) Source(33, 40) + SourceIndex(3)
2 >Emitted(84, 16) Source(33, 40) + SourceIndex(3)
3 >Emitted(84, 25) Source(33, 49) + SourceIndex(3)
---
>>>        var someClass = /** @class */ (function () {
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1-> { 
1->Emitted(85, 9) Source(33, 52) + SourceIndex(3)
---
>>>            function someClass() {
1->^^^^^^^^^^^^
2 >            ^^->
1->
1->Emitted(86, 13) Source(33, 52) + SourceIndex(3)
---
>>>            }
1->^^^^^^^^^^^^
2 >            ^
3 >             ^^^^^^^^^^^^^^^^^->
1->export class someClass {
2 >            }
1->Emitted(87, 13) Source(33, 76) + SourceIndex(3)
2 >Emitted(87, 14) Source(33, 77) + SourceIndex(3)
---
>>>            return someClass;
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1->
2 >            }
1->Emitted(88, 13) Source(33, 76) + SourceIndex(3)
2 >Emitted(88, 29) Source(33, 77) + SourceIndex(3)
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
1 >Emitted(89, 9) Source(33, 76) + SourceIndex(3)
2 >Emitted(89, 10) Source(33, 77) + SourceIndex(3)
3 >Emitted(89, 10) Source(33, 52) + SourceIndex(3)
4 >Emitted(89, 14) Source(33, 77) + SourceIndex(3)
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
1->Emitted(90, 9) Source(33, 65) + SourceIndex(3)
2 >Emitted(90, 28) Source(33, 74) + SourceIndex(3)
3 >Emitted(90, 40) Source(33, 77) + SourceIndex(3)
4 >Emitted(90, 41) Source(33, 77) + SourceIndex(3)
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
1->Emitted(91, 5) Source(33, 78) + SourceIndex(3)
2 >Emitted(91, 6) Source(33, 79) + SourceIndex(3)
3 >Emitted(91, 8) Source(33, 40) + SourceIndex(3)
4 >Emitted(91, 17) Source(33, 49) + SourceIndex(3)
5 >Emitted(91, 20) Source(33, 40) + SourceIndex(3)
6 >Emitted(91, 43) Source(33, 49) + SourceIndex(3)
7 >Emitted(91, 48) Source(33, 40) + SourceIndex(3)
8 >Emitted(91, 71) Source(33, 49) + SourceIndex(3)
9 >Emitted(91, 79) Source(33, 79) + SourceIndex(3)
---
>>>})(internalOther || (internalOther = {}));
1 >
2 >^
3 > ^^
4 >   ^^^^^^^^^^^^^
5 >                ^^^^^
6 >                     ^^^^^^^^^^^^^
7 >                                  ^^^^^^^^
8 >                                          ^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >}
3 > 
4 >   internalOther
5 >                
6 >                     internalOther
7 >                                  .something { export class someClass {} }
1 >Emitted(92, 1) Source(33, 78) + SourceIndex(3)
2 >Emitted(92, 2) Source(33, 79) + SourceIndex(3)
3 >Emitted(92, 4) Source(33, 26) + SourceIndex(3)
4 >Emitted(92, 17) Source(33, 39) + SourceIndex(3)
5 >Emitted(92, 22) Source(33, 26) + SourceIndex(3)
6 >Emitted(92, 35) Source(33, 39) + SourceIndex(3)
7 >Emitted(92, 43) Source(33, 79) + SourceIndex(3)
---
>>>/**@internal*/ var internalImport = internalNamespace.someClass;
1->
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^^^
6 >                                 ^^^
7 >                                    ^^^^^^^^^^^^^^^^^
8 >                                                     ^
9 >                                                      ^^^^^^^^^
10>                                                               ^
1->
  >
2 >/**@internal*/
3 >               
4 >               import 
5 >                   internalImport
6 >                                  = 
7 >                                    internalNamespace
8 >                                                     .
9 >                                                      someClass
10>                                                               ;
1->Emitted(93, 1) Source(34, 1) + SourceIndex(3)
2 >Emitted(93, 15) Source(34, 15) + SourceIndex(3)
3 >Emitted(93, 16) Source(34, 16) + SourceIndex(3)
4 >Emitted(93, 20) Source(34, 23) + SourceIndex(3)
5 >Emitted(93, 34) Source(34, 37) + SourceIndex(3)
6 >Emitted(93, 37) Source(34, 40) + SourceIndex(3)
7 >Emitted(93, 54) Source(34, 57) + SourceIndex(3)
8 >Emitted(93, 55) Source(34, 58) + SourceIndex(3)
9 >Emitted(93, 64) Source(34, 67) + SourceIndex(3)
10>Emitted(93, 65) Source(34, 68) + SourceIndex(3)
---
>>>/**@internal*/ var internalConst = 10;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^^
6 >                                ^^^
7 >                                   ^^
8 >                                     ^
1 >
  >/**@internal*/ type internalType = internalC;
  >
2 >/**@internal*/
3 >               
4 >               const 
5 >                   internalConst
6 >                                 = 
7 >                                   10
8 >                                     ;
1 >Emitted(94, 1) Source(36, 1) + SourceIndex(3)
2 >Emitted(94, 15) Source(36, 15) + SourceIndex(3)
3 >Emitted(94, 16) Source(36, 16) + SourceIndex(3)
4 >Emitted(94, 20) Source(36, 22) + SourceIndex(3)
5 >Emitted(94, 33) Source(36, 35) + SourceIndex(3)
6 >Emitted(94, 36) Source(36, 38) + SourceIndex(3)
7 >Emitted(94, 38) Source(36, 40) + SourceIndex(3)
8 >Emitted(94, 39) Source(36, 41) + SourceIndex(3)
---
>>>/**@internal*/ var internalEnum;
1 >
2 >^^^^^^^^^^^^^^
3 >              ^
4 >               ^^^^
5 >                   ^^^^^^^^^^^^
1 >
  >
2 >/**@internal*/
3 >               
4 >               enum 
5 >                   internalEnum { a, b, c }
1 >Emitted(95, 1) Source(37, 1) + SourceIndex(3)
2 >Emitted(95, 15) Source(37, 15) + SourceIndex(3)
3 >Emitted(95, 16) Source(37, 16) + SourceIndex(3)
4 >Emitted(95, 20) Source(37, 21) + SourceIndex(3)
5 >Emitted(95, 32) Source(37, 45) + SourceIndex(3)
---
>>>(function (internalEnum) {
1 >
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >enum 
3 >           internalEnum
1 >Emitted(96, 1) Source(37, 16) + SourceIndex(3)
2 >Emitted(96, 12) Source(37, 21) + SourceIndex(3)
3 >Emitted(96, 24) Source(37, 33) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["a"] = 0] = "a";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1-> { 
2 >    a
3 >                                             
1->Emitted(97, 5) Source(37, 36) + SourceIndex(3)
2 >Emitted(97, 46) Source(37, 37) + SourceIndex(3)
3 >Emitted(97, 47) Source(37, 37) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["b"] = 1] = "b";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
4 >                                              ^->
1->, 
2 >    b
3 >                                             
1->Emitted(98, 5) Source(37, 39) + SourceIndex(3)
2 >Emitted(98, 46) Source(37, 40) + SourceIndex(3)
3 >Emitted(98, 47) Source(37, 40) + SourceIndex(3)
---
>>>    internalEnum[internalEnum["c"] = 2] = "c";
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3 >                                             ^
1->, 
2 >    c
3 >                                             
1->Emitted(99, 5) Source(37, 42) + SourceIndex(3)
2 >Emitted(99, 46) Source(37, 43) + SourceIndex(3)
3 >Emitted(99, 47) Source(37, 43) + SourceIndex(3)
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
1 >Emitted(100, 1) Source(37, 44) + SourceIndex(3)
2 >Emitted(100, 2) Source(37, 45) + SourceIndex(3)
3 >Emitted(100, 4) Source(37, 21) + SourceIndex(3)
4 >Emitted(100, 16) Source(37, 33) + SourceIndex(3)
5 >Emitted(100, 21) Source(37, 21) + SourceIndex(3)
6 >Emitted(100, 33) Source(37, 33) + SourceIndex(3)
7 >Emitted(100, 41) Source(37, 45) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = /** @class */ (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(101, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^->
1->
1->Emitted(102, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(103, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(103, 6) Source(5, 2) + SourceIndex(4)
---
>>>    C.prototype.doSomething = function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^
3 >                           ^^^
4 >                              ^^^^^^^^^^^^^->
1->
2 >    doSomething
3 >                           
1->Emitted(104, 5) Source(2, 5) + SourceIndex(4)
2 >Emitted(104, 28) Source(2, 16) + SourceIndex(4)
3 >Emitted(104, 31) Source(2, 5) + SourceIndex(4)
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
1->Emitted(105, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(105, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(105, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(105, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(105, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(105, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(105, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(105, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(106, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(106, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(107, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(107, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(108, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(108, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(108, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(108, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(109, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(109, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(109, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(109, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(109, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(109, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(109, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(109, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(110, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(110, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(110, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(110, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(110, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(110, 17) Source(2, 17) + SourceIndex(5)
---
>>>//# sourceMappingURL=third-output.js.map

//// [/src/third/thirdjs/output/third-output.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../..","sourceFiles":["../../third_part1.ts"],"js":{"sections":[{"pos":0,"end":110,"kind":"prepend","data":"../../../first/bin/first-output.js","texts":[{"pos":0,"end":110,"kind":"text"}]},{"pos":110,"end":3545,"kind":"prepend","data":"../../../2/second-output.js","texts":[{"pos":110,"end":3545,"kind":"text"}]},{"pos":3545,"end":3581,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":116,"kind":"prepend","data":"../../../first/bin/first-output.d.ts","texts":[{"pos":0,"end":116,"kind":"text"}]},{"pos":116,"end":276,"kind":"prepend","data":"../../../2/second-output.d.ts","texts":[{"pos":116,"end":276,"kind":"text"}]},{"pos":276,"end":295,"kind":"text"}]}},"version":"FakeTSVersion"}

//// [/src/third/thirdjs/output/third-output.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/third/thirdjs/output/third-output.js
----------------------------------------------------------------------
prepend: (0-110):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-110)
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (110-3545):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (110-3545)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
var normalC = /** @class */ (function () {
    /**@internal*/ function normalC() {
    }
    /**@internal*/ normalC.prototype.method = function () { };
    Object.defineProperty(normalC.prototype, "c", {
        /**@internal*/ get: function () { return 10; },
        /**@internal*/ set: function (val) { },
        enumerable: false,
        configurable: true
    });
    return normalC;
}());
var normalN;
(function (normalN) {
    /**@internal*/ var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    normalN.C = C;
    /**@internal*/ function foo() { }
    normalN.foo = foo;
    /**@internal*/ var someNamespace;
    (function (someNamespace) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        someNamespace.C = C;
    })(someNamespace = normalN.someNamespace || (normalN.someNamespace = {}));
    /**@internal*/ var someOther;
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
    /**@internal*/ normalN.someImport = someNamespace.C;
    /**@internal*/ normalN.internalConst = 10;
    /**@internal*/ var internalEnum;
    (function (internalEnum) {
        internalEnum[internalEnum["a"] = 0] = "a";
        internalEnum[internalEnum["b"] = 1] = "b";
        internalEnum[internalEnum["c"] = 2] = "c";
    })(internalEnum = normalN.internalEnum || (normalN.internalEnum = {}));
})(normalN || (normalN = {}));
/**@internal*/ var internalC = /** @class */ (function () {
    function internalC() {
    }
    return internalC;
}());
/**@internal*/ function internalfoo() { }
/**@internal*/ var internalNamespace;
(function (internalNamespace) {
    var someClass = /** @class */ (function () {
        function someClass() {
        }
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
/**@internal*/ var internalOther;
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
})(internalOther || (internalOther = {}));
/**@internal*/ var internalImport = internalNamespace.someClass;
/**@internal*/ var internalConst = 10;
/**@internal*/ var internalEnum;
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
text: (3545-3581)
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
          "end": 110,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 110,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 110,
          "end": 3545,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 110,
              "end": 3545,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 3545,
          "end": 3581,
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
  "version": "FakeTSVersion",
  "size": 724
}

