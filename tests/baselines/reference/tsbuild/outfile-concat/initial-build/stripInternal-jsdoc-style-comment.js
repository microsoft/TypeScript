//// [/lib/initial-buildOutput.txt]
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
    constructor();
    prop: string;
    method(): void;
    get c(): number;
    set c(val: number);
}
declare namespace normalN {
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
}
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
declare class C {
    doSomething(): void;
}
//# sourceMappingURL=second-output.d.ts.map

//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AAED,cAAM,OAAO;;IAEM,IAAI,EAAE,MAAM,CAAC;IACb,MAAM;IACN,IAAI,CAAC,IACM,MAAM,CADK;IACtB,IAAI,CAAC,CAAC,KAAK,MAAM,EAAK;CACxC;AACD,kBAAU,OAAO,CAAC;IACC,MAAa,CAAC;KAAI;IAClB,SAAgB,GAAG,SAAK;IACxB,UAAiB,aAAa,CAAC;QAAE,MAAa,CAAC;SAAG;KAAE;IACpD,UAAiB,SAAS,CAAC,SAAS,CAAC;QAAE,MAAa,SAAS;SAAG;KAAE;IAClE,MAAM,QAAQ,UAAU,GAAG,aAAa,CAAC,CAAC,CAAC;IAC3C,KAAY,YAAY,GAAG,SAAS,CAAC;IAC9B,MAAM,aAAa,KAAK,CAAC;IAChC,KAAY,YAAY;QAAG,CAAC,IAAA;QAAE,CAAC,IAAA;QAAE,CAAC,IAAA;KAAE;CACtD;AACc,cAAM,SAAS;CAAG;AAClB,iBAAS,WAAW,SAAK;AACzB,kBAAU,iBAAiB,CAAC;IAAE,MAAa,SAAS;KAAG;CAAE;AACzD,kBAAU,aAAa,CAAC,SAAS,CAAC;IAAE,MAAa,SAAS;KAAG;CAAE;AAC/D,OAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;AACpD,aAAK,YAAY,GAAG,SAAS,CAAC;AAC9B,QAAA,MAAM,aAAa,KAAK,CAAC;AACzB,aAAK,YAAY;IAAG,CAAC,IAAA;IAAE,CAAC,IAAA;IAAE,CAAC,IAAA;CAAE;ACpC5C,cAAM,CAAC;IACH,WAAW;CAGd"}

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
1->
  >
  >
2 >class 
3 >              normalC
1->Emitted(5, 1) Source(13, 1) + SourceIndex(0)
2 >Emitted(5, 15) Source(13, 7) + SourceIndex(0)
3 >Emitted(5, 22) Source(13, 14) + SourceIndex(0)
---
>>>    constructor();
>>>    prop: string;
1 >^^^^
2 >    ^^^^
3 >        ^^
4 >          ^^^^^^
5 >                ^
6 >                 ^^^->
1 > {
  >    /**@internal*/ constructor() { }
  >    /**@internal*/ 
2 >    prop
3 >        : 
4 >          string
5 >                ;
1 >Emitted(7, 5) Source(15, 20) + SourceIndex(0)
2 >Emitted(7, 9) Source(15, 24) + SourceIndex(0)
3 >Emitted(7, 11) Source(15, 26) + SourceIndex(0)
4 >Emitted(7, 17) Source(15, 32) + SourceIndex(0)
5 >Emitted(7, 18) Source(15, 33) + SourceIndex(0)
---
>>>    method(): void;
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^^->
1->
  >    /**@internal*/ 
2 >    method
1->Emitted(8, 5) Source(16, 20) + SourceIndex(0)
2 >Emitted(8, 11) Source(16, 26) + SourceIndex(0)
---
>>>    get c(): number;
1->^^^^
2 >    ^^^^
3 >        ^
4 >         ^^^^
5 >             ^^^^^^
6 >                   ^
7 >                    ^^^^->
1->() { }
  >    /**@internal*/ 
2 >    get 
3 >        c
4 >         () { return 10; }
  >             /**@internal*/ set c(val: 
5 >             number
6 >                   
1->Emitted(9, 5) Source(17, 20) + SourceIndex(0)
2 >Emitted(9, 9) Source(17, 24) + SourceIndex(0)
3 >Emitted(9, 10) Source(17, 25) + SourceIndex(0)
4 >Emitted(9, 14) Source(18, 31) + SourceIndex(0)
5 >Emitted(9, 20) Source(18, 37) + SourceIndex(0)
6 >Emitted(9, 21) Source(17, 42) + SourceIndex(0)
---
>>>    set c(val: number);
1->^^^^
2 >    ^^^^
3 >        ^
4 >         ^
5 >          ^^^^^
6 >               ^^^^^^
7 >                     ^^
1->
  >    /**@internal*/ 
2 >    set 
3 >        c
4 >         (
5 >          val: 
6 >               number
7 >                     ) { }
1->Emitted(10, 5) Source(18, 20) + SourceIndex(0)
2 >Emitted(10, 9) Source(18, 24) + SourceIndex(0)
3 >Emitted(10, 10) Source(18, 25) + SourceIndex(0)
4 >Emitted(10, 11) Source(18, 26) + SourceIndex(0)
5 >Emitted(10, 16) Source(18, 31) + SourceIndex(0)
6 >Emitted(10, 22) Source(18, 37) + SourceIndex(0)
7 >Emitted(10, 24) Source(18, 42) + SourceIndex(0)
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
>>>    class C {
1 >^^^^
2 >    ^^^^^^
3 >          ^
1 >{
  >    /**@internal*/ 
2 >    export class 
3 >          C
1 >Emitted(13, 5) Source(21, 20) + SourceIndex(0)
2 >Emitted(13, 11) Source(21, 33) + SourceIndex(0)
3 >Emitted(13, 12) Source(21, 34) + SourceIndex(0)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^->
1 > { }
1 >Emitted(14, 6) Source(21, 38) + SourceIndex(0)
---
>>>    function foo(): void;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^
4 >                ^^^^^^^^^
5 >                         ^^^^^->
1->
  >    /**@internal*/ 
2 >    export function 
3 >             foo
4 >                () {}
1->Emitted(15, 5) Source(22, 20) + SourceIndex(0)
2 >Emitted(15, 14) Source(22, 36) + SourceIndex(0)
3 >Emitted(15, 17) Source(22, 39) + SourceIndex(0)
4 >Emitted(15, 26) Source(22, 44) + SourceIndex(0)
---
>>>    namespace someNamespace {
1->^^^^
2 >    ^^^^^^^^^^
3 >              ^^^^^^^^^^^^^
4 >                           ^
1->
  >    /**@internal*/ 
2 >    export namespace 
3 >              someNamespace
4 >                            
1->Emitted(16, 5) Source(23, 20) + SourceIndex(0)
2 >Emitted(16, 15) Source(23, 37) + SourceIndex(0)
3 >Emitted(16, 28) Source(23, 50) + SourceIndex(0)
4 >Emitted(16, 29) Source(23, 51) + SourceIndex(0)
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
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(19, 6) Source(23, 72) + SourceIndex(0)
---
>>>    namespace someOther.something {
1->^^^^
2 >    ^^^^^^^^^^
3 >              ^^^^^^^^^
4 >                       ^
5 >                        ^^^^^^^^^
6 >                                 ^
1->
  >    /**@internal*/ 
2 >    export namespace 
3 >              someOther
4 >                       .
5 >                        something
6 >                                  
1->Emitted(20, 5) Source(24, 20) + SourceIndex(0)
2 >Emitted(20, 15) Source(24, 37) + SourceIndex(0)
3 >Emitted(20, 24) Source(24, 46) + SourceIndex(0)
4 >Emitted(20, 25) Source(24, 47) + SourceIndex(0)
5 >Emitted(20, 34) Source(24, 56) + SourceIndex(0)
6 >Emitted(20, 35) Source(24, 57) + SourceIndex(0)
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
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(23, 6) Source(24, 86) + SourceIndex(0)
---
>>>    export import someImport = someNamespace.C;
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^
4 >                  ^^^^^^^^^^
5 >                            ^^^
6 >                               ^^^^^^^^^^^^^
7 >                                            ^
8 >                                             ^
9 >                                              ^
1->
  >    /**@internal*/ 
2 >    export
3 >           import 
4 >                  someImport
5 >                             = 
6 >                               someNamespace
7 >                                            .
8 >                                             C
9 >                                              ;
1->Emitted(24, 5) Source(25, 20) + SourceIndex(0)
2 >Emitted(24, 11) Source(25, 26) + SourceIndex(0)
3 >Emitted(24, 19) Source(25, 34) + SourceIndex(0)
4 >Emitted(24, 29) Source(25, 44) + SourceIndex(0)
5 >Emitted(24, 32) Source(25, 47) + SourceIndex(0)
6 >Emitted(24, 45) Source(25, 60) + SourceIndex(0)
7 >Emitted(24, 46) Source(25, 61) + SourceIndex(0)
8 >Emitted(24, 47) Source(25, 62) + SourceIndex(0)
9 >Emitted(24, 48) Source(25, 63) + SourceIndex(0)
---
>>>    type internalType = internalC;
1 >^^^^
2 >    ^^^^^
3 >         ^^^^^^^^^^^^
4 >                     ^^^
5 >                        ^^^^^^^^^
6 >                                 ^
1 >
  >    /**@internal*/ 
2 >    export type 
3 >         internalType
4 >                      = 
5 >                        internalC
6 >                                 ;
1 >Emitted(25, 5) Source(26, 20) + SourceIndex(0)
2 >Emitted(25, 10) Source(26, 32) + SourceIndex(0)
3 >Emitted(25, 22) Source(26, 44) + SourceIndex(0)
4 >Emitted(25, 25) Source(26, 47) + SourceIndex(0)
5 >Emitted(25, 34) Source(26, 56) + SourceIndex(0)
6 >Emitted(25, 35) Source(26, 57) + SourceIndex(0)
---
>>>    const internalConst = 10;
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^^^^
4 >                       ^^^^^
5 >                            ^
1 >
  >    /**@internal*/ export 
2 >    const 
3 >          internalConst
4 >                        = 10
5 >                            ;
1 >Emitted(26, 5) Source(27, 27) + SourceIndex(0)
2 >Emitted(26, 11) Source(27, 33) + SourceIndex(0)
3 >Emitted(26, 24) Source(27, 46) + SourceIndex(0)
4 >Emitted(26, 29) Source(27, 51) + SourceIndex(0)
5 >Emitted(26, 30) Source(27, 52) + SourceIndex(0)
---
>>>    enum internalEnum {
1 >^^^^
2 >    ^^^^^
3 >         ^^^^^^^^^^^^
1 >
  >    /**@internal*/ 
2 >    export enum 
3 >         internalEnum
1 >Emitted(27, 5) Source(28, 20) + SourceIndex(0)
2 >Emitted(27, 10) Source(28, 32) + SourceIndex(0)
3 >Emitted(27, 22) Source(28, 44) + SourceIndex(0)
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(32, 2) Source(29, 2) + SourceIndex(0)
---
>>>declare class internalC {
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^
1->
  >/**@internal*/ 
2 >class 
3 >              internalC
1->Emitted(33, 1) Source(30, 16) + SourceIndex(0)
2 >Emitted(33, 15) Source(30, 22) + SourceIndex(0)
3 >Emitted(33, 24) Source(30, 31) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > {}
1 >Emitted(34, 2) Source(30, 34) + SourceIndex(0)
---
>>>declare function internalfoo(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^
4 >                            ^^^^^^^^^
5 >                                     ^->
1->
  >/**@internal*/ 
2 >function 
3 >                 internalfoo
4 >                            () {}
1->Emitted(35, 1) Source(31, 16) + SourceIndex(0)
2 >Emitted(35, 18) Source(31, 25) + SourceIndex(0)
3 >Emitted(35, 29) Source(31, 36) + SourceIndex(0)
4 >Emitted(35, 38) Source(31, 41) + SourceIndex(0)
---
>>>declare namespace internalNamespace {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^^^^^^^^^^^^^^^^
4 >                                   ^
1->
  >/**@internal*/ 
2 >namespace 
3 >                  internalNamespace
4 >                                    
1->Emitted(36, 1) Source(32, 16) + SourceIndex(0)
2 >Emitted(36, 19) Source(32, 26) + SourceIndex(0)
3 >Emitted(36, 36) Source(32, 43) + SourceIndex(0)
4 >Emitted(36, 37) Source(32, 44) + SourceIndex(0)
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(39, 2) Source(32, 73) + SourceIndex(0)
---
>>>declare namespace internalOther.something {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^^^^^^^^^^^^
4 >                               ^
5 >                                ^^^^^^^^^
6 >                                         ^
1->
  >/**@internal*/ 
2 >namespace 
3 >                  internalOther
4 >                               .
5 >                                something
6 >                                          
1->Emitted(40, 1) Source(33, 16) + SourceIndex(0)
2 >Emitted(40, 19) Source(33, 26) + SourceIndex(0)
3 >Emitted(40, 32) Source(33, 39) + SourceIndex(0)
4 >Emitted(40, 33) Source(33, 40) + SourceIndex(0)
5 >Emitted(40, 42) Source(33, 49) + SourceIndex(0)
6 >Emitted(40, 43) Source(33, 50) + SourceIndex(0)
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
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(43, 2) Source(33, 79) + SourceIndex(0)
---
>>>import internalImport = internalNamespace.someClass;
1->
2 >^^^^^^^
3 >       ^^^^^^^^^^^^^^
4 >                     ^^^
5 >                        ^^^^^^^^^^^^^^^^^
6 >                                         ^
7 >                                          ^^^^^^^^^
8 >                                                   ^
1->
  >/**@internal*/ 
2 >import 
3 >       internalImport
4 >                      = 
5 >                        internalNamespace
6 >                                         .
7 >                                          someClass
8 >                                                   ;
1->Emitted(44, 1) Source(34, 16) + SourceIndex(0)
2 >Emitted(44, 8) Source(34, 23) + SourceIndex(0)
3 >Emitted(44, 22) Source(34, 37) + SourceIndex(0)
4 >Emitted(44, 25) Source(34, 40) + SourceIndex(0)
5 >Emitted(44, 42) Source(34, 57) + SourceIndex(0)
6 >Emitted(44, 43) Source(34, 58) + SourceIndex(0)
7 >Emitted(44, 52) Source(34, 67) + SourceIndex(0)
8 >Emitted(44, 53) Source(34, 68) + SourceIndex(0)
---
>>>declare type internalType = internalC;
1 >
2 >^^^^^^^^^^^^^
3 >             ^^^^^^^^^^^^
4 >                         ^^^
5 >                            ^^^^^^^^^
6 >                                     ^
1 >
  >/**@internal*/ 
2 >type 
3 >             internalType
4 >                          = 
5 >                            internalC
6 >                                     ;
1 >Emitted(45, 1) Source(35, 16) + SourceIndex(0)
2 >Emitted(45, 14) Source(35, 21) + SourceIndex(0)
3 >Emitted(45, 26) Source(35, 33) + SourceIndex(0)
4 >Emitted(45, 29) Source(35, 36) + SourceIndex(0)
5 >Emitted(45, 38) Source(35, 45) + SourceIndex(0)
6 >Emitted(45, 39) Source(35, 46) + SourceIndex(0)
---
>>>declare const internalConst = 10;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^
5 >                           ^^^^^
6 >                                ^
1 >
  >/**@internal*/ 
2 >
3 >        const 
4 >              internalConst
5 >                            = 10
6 >                                ;
1 >Emitted(46, 1) Source(36, 16) + SourceIndex(0)
2 >Emitted(46, 9) Source(36, 16) + SourceIndex(0)
3 >Emitted(46, 15) Source(36, 22) + SourceIndex(0)
4 >Emitted(46, 28) Source(36, 35) + SourceIndex(0)
5 >Emitted(46, 33) Source(36, 40) + SourceIndex(0)
6 >Emitted(46, 34) Source(36, 41) + SourceIndex(0)
---
>>>declare enum internalEnum {
1 >
2 >^^^^^^^^^^^^^
3 >             ^^^^^^^^^^^^
1 >
  >/**@internal*/ 
2 >enum 
3 >             internalEnum
1 >Emitted(47, 1) Source(37, 16) + SourceIndex(0)
2 >Emitted(47, 14) Source(37, 21) + SourceIndex(0)
3 >Emitted(47, 26) Source(37, 33) + SourceIndex(0)
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
    (function (someOther) {
        var something;
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
        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
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
(function (internalOther) {
    var something;
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
    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
    function C() {
    }C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());
//# sourceMappingURL=second-output.js.map

//// [/src/2/second-output.js.map]
{"version":3,"file":"second-output.js","sourceRoot":"","sources":["../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAIA,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACmB,oBAAgB,CAAC;;IAEjB,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;aAAL,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;aACtB,UAAM,GAAW,IAAI,CAAC;;;OADA;IAEzC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACE;QAAA,cAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAClB,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACxB,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa,GAAG;YAAA,cAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IACpD,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS,GAAG;gBAAA,sBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IACpD,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;;IAE9B,qBAAa,GAAG,EAAE,CAAC;IAChC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAE,yCAAC,CAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACvD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACc;IAAA,sBAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAClB,SAAS,WAAW,KAAI,CAAC;AACzB,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB,GAAG;QAAA,sBAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACzD,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS,GAAG;YAAA,sBAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC/D,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;;AAEpD,IAAM,aAAa,GAAG,EAAE,CAAC;AACzB,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAE,yCAAC,CAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC5C;IAAA;IAIA,CAAC,AAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC"}

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
1 >
  >    
2 >    }
1 >Emitted(5, 5) Source(8, 5) + SourceIndex(0)
2 >Emitted(5, 6) Source(8, 6) + SourceIndex(0)
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
1 >Emitted(7, 5) Source(10, 5) + SourceIndex(0)
2 >Emitted(7, 6) Source(10, 6) + SourceIndex(0)
3 >Emitted(7, 8) Source(10, 8) + SourceIndex(0)
4 >Emitted(7, 9) Source(10, 9) + SourceIndex(0)
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
1->Emitted(8, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(8, 2) Source(11, 2) + SourceIndex(0)
3 >Emitted(8, 4) Source(5, 11) + SourceIndex(0)
4 >Emitted(8, 5) Source(5, 12) + SourceIndex(0)
5 >Emitted(8, 10) Source(5, 11) + SourceIndex(0)
6 >Emitted(8, 11) Source(5, 12) + SourceIndex(0)
7 >Emitted(8, 19) Source(11, 2) + SourceIndex(0)
---
>>>var normalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(9, 1) Source(13, 1) + SourceIndex(0)
---
>>>    function normalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^
3 >                        ^
1->class normalC {
  >    /**@internal*/ 
2 >    constructor() { 
3 >                        }
1->Emitted(10, 5) Source(14, 20) + SourceIndex(0)
2 >Emitted(10, 25) Source(14, 36) + SourceIndex(0)
3 >Emitted(10, 26) Source(14, 37) + SourceIndex(0)
---
>>>
>>>    normalC.prototype.method = function () { };
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^
3 >                            ^^^
4 >                               ^^^^^^^^^^^^^^
5 >                                             ^
6 >                                              ^^^^^^->
1 >
  >    /**@internal*/ prop: string;
  >    /**@internal*/ 
2 >    method
3 >                            
4 >                               method() { 
5 >                                             }
1 >Emitted(12, 5) Source(16, 20) + SourceIndex(0)
2 >Emitted(12, 29) Source(16, 26) + SourceIndex(0)
3 >Emitted(12, 32) Source(16, 20) + SourceIndex(0)
4 >Emitted(12, 46) Source(16, 31) + SourceIndex(0)
5 >Emitted(12, 47) Source(16, 32) + SourceIndex(0)
---
>>>    Object.defineProperty(normalC.prototype, "c", {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^^^^^^^^^^^^^^^^^^^^^^
1->
  >    /**@internal*/ 
2 >    get 
3 >                          c
1->Emitted(13, 5) Source(17, 20) + SourceIndex(0)
2 >Emitted(13, 27) Source(17, 24) + SourceIndex(0)
3 >Emitted(13, 49) Source(17, 25) + SourceIndex(0)
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
1 >Emitted(14, 14) Source(17, 20) + SourceIndex(0)
2 >Emitted(14, 28) Source(17, 30) + SourceIndex(0)
3 >Emitted(14, 35) Source(17, 37) + SourceIndex(0)
4 >Emitted(14, 37) Source(17, 39) + SourceIndex(0)
5 >Emitted(14, 38) Source(17, 40) + SourceIndex(0)
6 >Emitted(14, 39) Source(17, 41) + SourceIndex(0)
7 >Emitted(14, 40) Source(17, 42) + SourceIndex(0)
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
1 >Emitted(15, 14) Source(18, 20) + SourceIndex(0)
2 >Emitted(15, 24) Source(18, 26) + SourceIndex(0)
3 >Emitted(15, 27) Source(18, 37) + SourceIndex(0)
4 >Emitted(15, 31) Source(18, 41) + SourceIndex(0)
5 >Emitted(15, 32) Source(18, 42) + SourceIndex(0)
---
>>>        enumerable: false,
>>>        configurable: true
>>>    });
1 >^^^^^^^
2 >       ^^^^^^^^^^^^^->
1 >
1 >Emitted(18, 8) Source(17, 42) + SourceIndex(0)
---
>>>    return normalC;
1->^^^^
2 >    ^^^^^^^^^^^^^^
1->
  >    /**@internal*/ set c(val: number) { }
  >
2 >    }
1->Emitted(19, 5) Source(19, 1) + SourceIndex(0)
2 >Emitted(19, 19) Source(19, 2) + SourceIndex(0)
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
1 >Emitted(20, 1) Source(19, 1) + SourceIndex(0)
2 >Emitted(20, 2) Source(19, 2) + SourceIndex(0)
3 >Emitted(20, 2) Source(13, 1) + SourceIndex(0)
4 >Emitted(20, 6) Source(19, 2) + SourceIndex(0)
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
1->Emitted(21, 1) Source(20, 1) + SourceIndex(0)
2 >Emitted(21, 5) Source(20, 11) + SourceIndex(0)
3 >Emitted(21, 12) Source(20, 18) + SourceIndex(0)
4 >Emitted(21, 13) Source(29, 2) + SourceIndex(0)
---
>>>(function (normalN) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^
4 >                  ^^^^^^^^^->
1->
2 >namespace 
3 >           normalN
1->Emitted(22, 1) Source(20, 1) + SourceIndex(0)
2 >Emitted(22, 12) Source(20, 11) + SourceIndex(0)
3 >Emitted(22, 19) Source(20, 18) + SourceIndex(0)
---
>>>    var C = (function () {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^->
1-> {
  >    /**@internal*/ 
1->Emitted(23, 5) Source(21, 20) + SourceIndex(0)
---
>>>        function C() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^
3 >                      ^
1->
2 >        export class C { 
3 >                      }
1->Emitted(24, 9) Source(21, 20) + SourceIndex(0)
2 >Emitted(24, 23) Source(21, 37) + SourceIndex(0)
3 >Emitted(24, 24) Source(21, 38) + SourceIndex(0)
---
>>>        return C;
1 >^^^^^^^^
2 >        ^^^^^^^^
1 >
2 >        }
1 >Emitted(25, 9) Source(21, 37) + SourceIndex(0)
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
5 >                  ^^^^^->
1->
2 >    C
3 >              { }
4 >                 
1->Emitted(27, 5) Source(21, 33) + SourceIndex(0)
2 >Emitted(27, 14) Source(21, 34) + SourceIndex(0)
3 >Emitted(27, 18) Source(21, 38) + SourceIndex(0)
4 >Emitted(27, 19) Source(21, 38) + SourceIndex(0)
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
1->Emitted(28, 5) Source(22, 20) + SourceIndex(0)
2 >Emitted(28, 14) Source(22, 36) + SourceIndex(0)
3 >Emitted(28, 17) Source(22, 39) + SourceIndex(0)
4 >Emitted(28, 22) Source(22, 43) + SourceIndex(0)
5 >Emitted(28, 23) Source(22, 44) + SourceIndex(0)
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
1->Emitted(29, 5) Source(22, 36) + SourceIndex(0)
2 >Emitted(29, 16) Source(22, 39) + SourceIndex(0)
3 >Emitted(29, 22) Source(22, 44) + SourceIndex(0)
4 >Emitted(29, 23) Source(22, 44) + SourceIndex(0)
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
1->Emitted(30, 5) Source(23, 20) + SourceIndex(0)
2 >Emitted(30, 9) Source(23, 37) + SourceIndex(0)
3 >Emitted(30, 22) Source(23, 50) + SourceIndex(0)
4 >Emitted(30, 23) Source(23, 72) + SourceIndex(0)
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
1->Emitted(31, 5) Source(23, 20) + SourceIndex(0)
2 >Emitted(31, 16) Source(23, 37) + SourceIndex(0)
3 >Emitted(31, 29) Source(23, 50) + SourceIndex(0)
4 >Emitted(31, 32) Source(23, 53) + SourceIndex(0)
---
>>>            function C() {}
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^
3 >                          ^
1 >
2 >            export class C {
3 >                          }
1 >Emitted(32, 13) Source(23, 53) + SourceIndex(0)
2 >Emitted(32, 27) Source(23, 69) + SourceIndex(0)
3 >Emitted(32, 28) Source(23, 70) + SourceIndex(0)
---
>>>            return C;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^
1 >
2 >            }
1 >Emitted(33, 13) Source(23, 69) + SourceIndex(0)
2 >Emitted(33, 21) Source(23, 70) + SourceIndex(0)
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
1 >Emitted(34, 9) Source(23, 69) + SourceIndex(0)
2 >Emitted(34, 10) Source(23, 70) + SourceIndex(0)
3 >Emitted(34, 10) Source(23, 53) + SourceIndex(0)
4 >Emitted(34, 14) Source(23, 70) + SourceIndex(0)
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
1->Emitted(35, 9) Source(23, 66) + SourceIndex(0)
2 >Emitted(35, 24) Source(23, 67) + SourceIndex(0)
3 >Emitted(35, 28) Source(23, 70) + SourceIndex(0)
4 >Emitted(35, 29) Source(23, 70) + SourceIndex(0)
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
1->Emitted(36, 5) Source(23, 71) + SourceIndex(0)
2 >Emitted(36, 6) Source(23, 72) + SourceIndex(0)
3 >Emitted(36, 8) Source(23, 37) + SourceIndex(0)
4 >Emitted(36, 21) Source(23, 50) + SourceIndex(0)
5 >Emitted(36, 24) Source(23, 37) + SourceIndex(0)
6 >Emitted(36, 45) Source(23, 50) + SourceIndex(0)
7 >Emitted(36, 50) Source(23, 37) + SourceIndex(0)
8 >Emitted(36, 71) Source(23, 50) + SourceIndex(0)
9 >Emitted(36, 79) Source(23, 72) + SourceIndex(0)
---
>>>    var someOther;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^->
1 >
  >    /**@internal*/ 
2 >    export namespace 
3 >        someOther
4 >                 .something { export class someClass {} }
1 >Emitted(37, 5) Source(24, 20) + SourceIndex(0)
2 >Emitted(37, 9) Source(24, 37) + SourceIndex(0)
3 >Emitted(37, 18) Source(24, 46) + SourceIndex(0)
4 >Emitted(37, 19) Source(24, 86) + SourceIndex(0)
---
>>>    (function (someOther) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1->
2 >    export namespace 
3 >               someOther
1->Emitted(38, 5) Source(24, 20) + SourceIndex(0)
2 >Emitted(38, 16) Source(24, 37) + SourceIndex(0)
3 >Emitted(38, 25) Source(24, 46) + SourceIndex(0)
---
>>>        var something;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >        
3 >            something
4 >                      { export class someClass {} }
1 >Emitted(39, 9) Source(24, 47) + SourceIndex(0)
2 >Emitted(39, 13) Source(24, 47) + SourceIndex(0)
3 >Emitted(39, 22) Source(24, 56) + SourceIndex(0)
4 >Emitted(39, 23) Source(24, 86) + SourceIndex(0)
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
1->Emitted(40, 9) Source(24, 47) + SourceIndex(0)
2 >Emitted(40, 20) Source(24, 47) + SourceIndex(0)
3 >Emitted(40, 29) Source(24, 56) + SourceIndex(0)
4 >Emitted(40, 32) Source(24, 59) + SourceIndex(0)
---
>>>                function someClass() {}
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^
1->
2 >                export class someClass {
3 >                                      }
1->Emitted(41, 17) Source(24, 59) + SourceIndex(0)
2 >Emitted(41, 39) Source(24, 83) + SourceIndex(0)
3 >Emitted(41, 40) Source(24, 84) + SourceIndex(0)
---
>>>                return someClass;
1 >^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1 >
2 >                }
1 >Emitted(42, 17) Source(24, 83) + SourceIndex(0)
2 >Emitted(42, 33) Source(24, 84) + SourceIndex(0)
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
1 >Emitted(43, 13) Source(24, 83) + SourceIndex(0)
2 >Emitted(43, 14) Source(24, 84) + SourceIndex(0)
3 >Emitted(43, 14) Source(24, 59) + SourceIndex(0)
4 >Emitted(43, 18) Source(24, 84) + SourceIndex(0)
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
1->Emitted(44, 13) Source(24, 72) + SourceIndex(0)
2 >Emitted(44, 32) Source(24, 81) + SourceIndex(0)
3 >Emitted(44, 44) Source(24, 84) + SourceIndex(0)
4 >Emitted(44, 45) Source(24, 84) + SourceIndex(0)
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
1->Emitted(45, 9) Source(24, 85) + SourceIndex(0)
2 >Emitted(45, 10) Source(24, 86) + SourceIndex(0)
3 >Emitted(45, 12) Source(24, 47) + SourceIndex(0)
4 >Emitted(45, 21) Source(24, 56) + SourceIndex(0)
5 >Emitted(45, 24) Source(24, 47) + SourceIndex(0)
6 >Emitted(45, 43) Source(24, 56) + SourceIndex(0)
7 >Emitted(45, 48) Source(24, 47) + SourceIndex(0)
8 >Emitted(45, 67) Source(24, 56) + SourceIndex(0)
9 >Emitted(45, 75) Source(24, 86) + SourceIndex(0)
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
1 >Emitted(46, 5) Source(24, 85) + SourceIndex(0)
2 >Emitted(46, 6) Source(24, 86) + SourceIndex(0)
3 >Emitted(46, 8) Source(24, 37) + SourceIndex(0)
4 >Emitted(46, 17) Source(24, 46) + SourceIndex(0)
5 >Emitted(46, 20) Source(24, 37) + SourceIndex(0)
6 >Emitted(46, 37) Source(24, 46) + SourceIndex(0)
7 >Emitted(46, 42) Source(24, 37) + SourceIndex(0)
8 >Emitted(46, 59) Source(24, 46) + SourceIndex(0)
9 >Emitted(46, 67) Source(24, 86) + SourceIndex(0)
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
1 >Emitted(47, 5) Source(25, 34) + SourceIndex(0)
2 >Emitted(47, 23) Source(25, 44) + SourceIndex(0)
3 >Emitted(47, 26) Source(25, 47) + SourceIndex(0)
4 >Emitted(47, 39) Source(25, 60) + SourceIndex(0)
5 >Emitted(47, 40) Source(25, 61) + SourceIndex(0)
6 >Emitted(47, 41) Source(25, 62) + SourceIndex(0)
7 >Emitted(47, 42) Source(25, 63) + SourceIndex(0)
---
>>>
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
1 >Emitted(49, 5) Source(27, 33) + SourceIndex(0)
2 >Emitted(49, 26) Source(27, 46) + SourceIndex(0)
3 >Emitted(49, 29) Source(27, 49) + SourceIndex(0)
4 >Emitted(49, 31) Source(27, 51) + SourceIndex(0)
5 >Emitted(49, 32) Source(27, 52) + SourceIndex(0)
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
1 >Emitted(50, 5) Source(28, 20) + SourceIndex(0)
2 >Emitted(50, 9) Source(28, 32) + SourceIndex(0)
3 >Emitted(50, 21) Source(28, 56) + SourceIndex(0)
---
>>>    (function (internalEnum) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export enum 
3 >               internalEnum
1->Emitted(51, 5) Source(28, 20) + SourceIndex(0)
2 >Emitted(51, 16) Source(28, 32) + SourceIndex(0)
3 >Emitted(51, 28) Source(28, 44) + SourceIndex(0)
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
1->Emitted(52, 9) Source(28, 47) + SourceIndex(0)
2 >Emitted(52, 50) Source(28, 48) + SourceIndex(0)
3 >Emitted(52, 51) Source(28, 50) + SourceIndex(0)
4 >Emitted(52, 92) Source(28, 51) + SourceIndex(0)
5 >Emitted(52, 93) Source(28, 53) + SourceIndex(0)
6 >Emitted(52, 134) Source(28, 54) + SourceIndex(0)
7 >Emitted(52, 135) Source(28, 54) + SourceIndex(0)
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
1 >Emitted(53, 5) Source(28, 55) + SourceIndex(0)
2 >Emitted(53, 6) Source(28, 56) + SourceIndex(0)
3 >Emitted(53, 8) Source(28, 32) + SourceIndex(0)
4 >Emitted(53, 20) Source(28, 44) + SourceIndex(0)
5 >Emitted(53, 23) Source(28, 32) + SourceIndex(0)
6 >Emitted(53, 43) Source(28, 44) + SourceIndex(0)
7 >Emitted(53, 48) Source(28, 32) + SourceIndex(0)
8 >Emitted(53, 68) Source(28, 44) + SourceIndex(0)
9 >Emitted(53, 76) Source(28, 56) + SourceIndex(0)
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
1 >Emitted(54, 1) Source(29, 1) + SourceIndex(0)
2 >Emitted(54, 2) Source(29, 2) + SourceIndex(0)
3 >Emitted(54, 4) Source(20, 11) + SourceIndex(0)
4 >Emitted(54, 11) Source(20, 18) + SourceIndex(0)
5 >Emitted(54, 16) Source(20, 11) + SourceIndex(0)
6 >Emitted(54, 23) Source(20, 18) + SourceIndex(0)
7 >Emitted(54, 31) Source(29, 2) + SourceIndex(0)
---
>>>var internalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >/**@internal*/ 
1->Emitted(55, 1) Source(30, 16) + SourceIndex(0)
---
>>>    function internalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^
3 >                          ^
1->
2 >    class internalC {
3 >                          }
1->Emitted(56, 5) Source(30, 16) + SourceIndex(0)
2 >Emitted(56, 27) Source(30, 33) + SourceIndex(0)
3 >Emitted(56, 28) Source(30, 34) + SourceIndex(0)
---
>>>    return internalC;
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^
1 >
2 >    }
1 >Emitted(57, 5) Source(30, 33) + SourceIndex(0)
2 >Emitted(57, 21) Source(30, 34) + SourceIndex(0)
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
1 >Emitted(58, 1) Source(30, 33) + SourceIndex(0)
2 >Emitted(58, 2) Source(30, 34) + SourceIndex(0)
3 >Emitted(58, 2) Source(30, 16) + SourceIndex(0)
4 >Emitted(58, 6) Source(30, 34) + SourceIndex(0)
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
1->Emitted(59, 1) Source(31, 16) + SourceIndex(0)
2 >Emitted(59, 10) Source(31, 25) + SourceIndex(0)
3 >Emitted(59, 21) Source(31, 36) + SourceIndex(0)
4 >Emitted(59, 26) Source(31, 40) + SourceIndex(0)
5 >Emitted(59, 27) Source(31, 41) + SourceIndex(0)
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
1 >Emitted(60, 1) Source(32, 16) + SourceIndex(0)
2 >Emitted(60, 5) Source(32, 26) + SourceIndex(0)
3 >Emitted(60, 22) Source(32, 43) + SourceIndex(0)
4 >Emitted(60, 23) Source(32, 73) + SourceIndex(0)
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
1->Emitted(61, 1) Source(32, 16) + SourceIndex(0)
2 >Emitted(61, 12) Source(32, 26) + SourceIndex(0)
3 >Emitted(61, 29) Source(32, 43) + SourceIndex(0)
4 >Emitted(61, 32) Source(32, 46) + SourceIndex(0)
---
>>>        function someClass() {}
1->^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^^^^^^^
3 >                              ^
1->
2 >        export class someClass {
3 >                              }
1->Emitted(62, 9) Source(32, 46) + SourceIndex(0)
2 >Emitted(62, 31) Source(32, 70) + SourceIndex(0)
3 >Emitted(62, 32) Source(32, 71) + SourceIndex(0)
---
>>>        return someClass;
1 >^^^^^^^^
2 >        ^^^^^^^^^^^^^^^^
1 >
2 >        }
1 >Emitted(63, 9) Source(32, 70) + SourceIndex(0)
2 >Emitted(63, 25) Source(32, 71) + SourceIndex(0)
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
1 >Emitted(64, 5) Source(32, 70) + SourceIndex(0)
2 >Emitted(64, 6) Source(32, 71) + SourceIndex(0)
3 >Emitted(64, 6) Source(32, 46) + SourceIndex(0)
4 >Emitted(64, 10) Source(32, 71) + SourceIndex(0)
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
1->Emitted(65, 5) Source(32, 59) + SourceIndex(0)
2 >Emitted(65, 32) Source(32, 68) + SourceIndex(0)
3 >Emitted(65, 44) Source(32, 71) + SourceIndex(0)
4 >Emitted(65, 45) Source(32, 71) + SourceIndex(0)
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
1->Emitted(66, 1) Source(32, 72) + SourceIndex(0)
2 >Emitted(66, 2) Source(32, 73) + SourceIndex(0)
3 >Emitted(66, 4) Source(32, 26) + SourceIndex(0)
4 >Emitted(66, 21) Source(32, 43) + SourceIndex(0)
5 >Emitted(66, 26) Source(32, 26) + SourceIndex(0)
6 >Emitted(66, 43) Source(32, 43) + SourceIndex(0)
7 >Emitted(66, 51) Source(32, 73) + SourceIndex(0)
---
>>>var internalOther;
1 >
2 >^^^^
3 >    ^^^^^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^->
1 >
  >/**@internal*/ 
2 >namespace 
3 >    internalOther
4 >                 .something { export class someClass {} }
1 >Emitted(67, 1) Source(33, 16) + SourceIndex(0)
2 >Emitted(67, 5) Source(33, 26) + SourceIndex(0)
3 >Emitted(67, 18) Source(33, 39) + SourceIndex(0)
4 >Emitted(67, 19) Source(33, 79) + SourceIndex(0)
---
>>>(function (internalOther) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1->
2 >namespace 
3 >           internalOther
1->Emitted(68, 1) Source(33, 16) + SourceIndex(0)
2 >Emitted(68, 12) Source(33, 26) + SourceIndex(0)
3 >Emitted(68, 25) Source(33, 39) + SourceIndex(0)
---
>>>    var something;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >    
3 >        something
4 >                  { export class someClass {} }
1 >Emitted(69, 5) Source(33, 40) + SourceIndex(0)
2 >Emitted(69, 9) Source(33, 40) + SourceIndex(0)
3 >Emitted(69, 18) Source(33, 49) + SourceIndex(0)
4 >Emitted(69, 19) Source(33, 79) + SourceIndex(0)
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
1->Emitted(70, 5) Source(33, 40) + SourceIndex(0)
2 >Emitted(70, 16) Source(33, 40) + SourceIndex(0)
3 >Emitted(70, 25) Source(33, 49) + SourceIndex(0)
4 >Emitted(70, 28) Source(33, 52) + SourceIndex(0)
---
>>>            function someClass() {}
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^
1->
2 >            export class someClass {
3 >                                  }
1->Emitted(71, 13) Source(33, 52) + SourceIndex(0)
2 >Emitted(71, 35) Source(33, 76) + SourceIndex(0)
3 >Emitted(71, 36) Source(33, 77) + SourceIndex(0)
---
>>>            return someClass;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1 >
2 >            }
1 >Emitted(72, 13) Source(33, 76) + SourceIndex(0)
2 >Emitted(72, 29) Source(33, 77) + SourceIndex(0)
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
1 >Emitted(73, 9) Source(33, 76) + SourceIndex(0)
2 >Emitted(73, 10) Source(33, 77) + SourceIndex(0)
3 >Emitted(73, 10) Source(33, 52) + SourceIndex(0)
4 >Emitted(73, 14) Source(33, 77) + SourceIndex(0)
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
1->Emitted(74, 9) Source(33, 65) + SourceIndex(0)
2 >Emitted(74, 28) Source(33, 74) + SourceIndex(0)
3 >Emitted(74, 40) Source(33, 77) + SourceIndex(0)
4 >Emitted(74, 41) Source(33, 77) + SourceIndex(0)
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
1->Emitted(75, 5) Source(33, 78) + SourceIndex(0)
2 >Emitted(75, 6) Source(33, 79) + SourceIndex(0)
3 >Emitted(75, 8) Source(33, 40) + SourceIndex(0)
4 >Emitted(75, 17) Source(33, 49) + SourceIndex(0)
5 >Emitted(75, 20) Source(33, 40) + SourceIndex(0)
6 >Emitted(75, 43) Source(33, 49) + SourceIndex(0)
7 >Emitted(75, 48) Source(33, 40) + SourceIndex(0)
8 >Emitted(75, 71) Source(33, 49) + SourceIndex(0)
9 >Emitted(75, 79) Source(33, 79) + SourceIndex(0)
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
1 >Emitted(76, 1) Source(33, 78) + SourceIndex(0)
2 >Emitted(76, 2) Source(33, 79) + SourceIndex(0)
3 >Emitted(76, 4) Source(33, 26) + SourceIndex(0)
4 >Emitted(76, 17) Source(33, 39) + SourceIndex(0)
5 >Emitted(76, 22) Source(33, 26) + SourceIndex(0)
6 >Emitted(76, 35) Source(33, 39) + SourceIndex(0)
7 >Emitted(76, 43) Source(33, 79) + SourceIndex(0)
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
1->Emitted(77, 1) Source(34, 16) + SourceIndex(0)
2 >Emitted(77, 5) Source(34, 23) + SourceIndex(0)
3 >Emitted(77, 19) Source(34, 37) + SourceIndex(0)
4 >Emitted(77, 22) Source(34, 40) + SourceIndex(0)
5 >Emitted(77, 39) Source(34, 57) + SourceIndex(0)
6 >Emitted(77, 40) Source(34, 58) + SourceIndex(0)
7 >Emitted(77, 49) Source(34, 67) + SourceIndex(0)
8 >Emitted(77, 50) Source(34, 68) + SourceIndex(0)
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
1 >Emitted(79, 1) Source(36, 16) + SourceIndex(0)
2 >Emitted(79, 5) Source(36, 22) + SourceIndex(0)
3 >Emitted(79, 18) Source(36, 35) + SourceIndex(0)
4 >Emitted(79, 21) Source(36, 38) + SourceIndex(0)
5 >Emitted(79, 23) Source(36, 40) + SourceIndex(0)
6 >Emitted(79, 24) Source(36, 41) + SourceIndex(0)
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
1 >Emitted(80, 1) Source(37, 16) + SourceIndex(0)
2 >Emitted(80, 5) Source(37, 21) + SourceIndex(0)
3 >Emitted(80, 17) Source(37, 45) + SourceIndex(0)
---
>>>(function (internalEnum) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >enum 
3 >           internalEnum
1->Emitted(81, 1) Source(37, 16) + SourceIndex(0)
2 >Emitted(81, 12) Source(37, 21) + SourceIndex(0)
3 >Emitted(81, 24) Source(37, 33) + SourceIndex(0)
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
1->Emitted(82, 5) Source(37, 36) + SourceIndex(0)
2 >Emitted(82, 46) Source(37, 37) + SourceIndex(0)
3 >Emitted(82, 47) Source(37, 39) + SourceIndex(0)
4 >Emitted(82, 88) Source(37, 40) + SourceIndex(0)
5 >Emitted(82, 89) Source(37, 42) + SourceIndex(0)
6 >Emitted(82, 130) Source(37, 43) + SourceIndex(0)
7 >Emitted(82, 131) Source(37, 43) + SourceIndex(0)
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
1 >Emitted(83, 1) Source(37, 44) + SourceIndex(0)
2 >Emitted(83, 2) Source(37, 45) + SourceIndex(0)
3 >Emitted(83, 4) Source(37, 21) + SourceIndex(0)
4 >Emitted(83, 16) Source(37, 33) + SourceIndex(0)
5 >Emitted(83, 21) Source(37, 21) + SourceIndex(0)
6 >Emitted(83, 33) Source(37, 33) + SourceIndex(0)
7 >Emitted(83, 41) Source(37, 45) + SourceIndex(0)
---
-------------------------------------------------------------------
emittedFile:/src/2/second-output.js
sourceFile:../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(84, 1) Source(1, 1) + SourceIndex(1)
---
>>>    function C() {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(85, 5) Source(1, 1) + SourceIndex(1)
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
1->Emitted(86, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(86, 6) Source(5, 2) + SourceIndex(1)
3 >Emitted(86, 6) Source(2, 5) + SourceIndex(1)
4 >Emitted(86, 29) Source(2, 16) + SourceIndex(1)
5 >Emitted(86, 32) Source(2, 5) + SourceIndex(1)
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
1->Emitted(87, 9) Source(3, 9) + SourceIndex(1)
2 >Emitted(87, 16) Source(3, 16) + SourceIndex(1)
3 >Emitted(87, 17) Source(3, 17) + SourceIndex(1)
4 >Emitted(87, 20) Source(3, 20) + SourceIndex(1)
5 >Emitted(87, 21) Source(3, 21) + SourceIndex(1)
6 >Emitted(87, 41) Source(3, 41) + SourceIndex(1)
7 >Emitted(87, 42) Source(3, 42) + SourceIndex(1)
8 >Emitted(87, 43) Source(3, 43) + SourceIndex(1)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(88, 5) Source(4, 5) + SourceIndex(1)
2 >Emitted(88, 6) Source(4, 6) + SourceIndex(1)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(89, 5) Source(5, 1) + SourceIndex(1)
2 >Emitted(89, 13) Source(5, 2) + SourceIndex(1)
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
1 >Emitted(90, 1) Source(5, 1) + SourceIndex(1)
2 >Emitted(90, 2) Source(5, 2) + SourceIndex(1)
3 >Emitted(90, 2) Source(1, 1) + SourceIndex(1)
4 >Emitted(90, 6) Source(5, 2) + SourceIndex(1)
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
          "end": 2905,
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
          "end": 182,
          "kind": "internal"
        },
        {
          "pos": 184,
          "end": 216,
          "kind": "text"
        },
        {
          "pos": 216,
          "end": 608,
          "kind": "internal"
        },
        {
          "pos": 610,
          "end": 613,
          "kind": "text"
        },
        {
          "pos": 613,
          "end": 1026,
          "kind": "internal"
        },
        {
          "pos": 1028,
          "end": 1076,
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
text: (0-2905)
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
    (function (someOther) {
        var something;
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
        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
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
(function (internalOther) {
    var something;
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
    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
    function C() {
    }C.prototype.doSomething = function () {
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
internal: (77-182)
    constructor();
    prop: string;
    method(): void;
    get c(): number;
    set c(val: number);
----------------------------------------------------------------------
text: (184-216)
}
declare namespace normalN {

----------------------------------------------------------------------
internal: (216-608)
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
text: (610-613)
}

----------------------------------------------------------------------
internal: (613-1026)
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
text: (1028-1076)
declare class C {
    doSomething(): void;
}

======================================================================

//// [/src/first/bin/first-output.d.ts]
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;
//# sourceMappingURL=first-output.d.ts.map

//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAe,UAAU,QAAQ;IAC7B,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET"}

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
>>>interface TheFirst {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1 >/**@internal*/ 
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 16) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 26) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 34) + SourceIndex(0)
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
{"version":3,"file":"first-output.js","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC"}

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
1 >Emitted(4, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(5, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(5, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(5, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(5, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(5, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(5, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(5, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(5, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(5, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(6, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(6, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(6, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(7, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(7, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(7, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(7, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >
2 >}
1 >Emitted(8, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(8, 2) Source(3, 2) + SourceIndex(2)
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
          "end": 114,
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
text: (0-114)

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
/**@internal*/ interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);


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
    (function (someOther) {
        var something;
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
        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
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
(function (internalOther) {
    var something;
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
    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
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
{"version":3,"file":"third-output.js","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part2.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":";AAIA,IAAM,CAAC,GAAG,cAAc,CAAC;;AAMzB,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;ACVf,OAAO,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;ACAjB,SAAS,CAAC;IACN,OAAO,gBAAgB,CAAC;AAC5B,CAAC;ACED,IAAU,CAAC,CAMV;AAND,WAAU,CAAC;IACP,SAAS,CAAC;QACN,OAAO,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3B,CAAC;;IAED,CAAC,EAAE,CAAC;AACR,CAAC,EANS,CAAC,KAAD,CAAC,QAMV;AAED;IACmB,oBAAgB,CAAC;;IAEjB,wBAAM,GAAN,cAAW,CAAC;IACZ,sBAAI,sBAAC;aAAL,cAAU,OAAO,EAAE,CAAC,CAAC,CAAC;aACtB,UAAM,GAAW,IAAI,CAAC;;;OADA;IAEzC,cAAC;AAAD,CAAC,AAND,IAMC;AACD,IAAU,OAAO,CAShB;AATD,WAAU,OAAO;IACE;QAAA,cAAiB,CAAC;QAAD,QAAC;IAAD,CAAC,AAAlB,IAAkB;IAAL,SAAC,IAAI,CAAA;IAClB,SAAgB,GAAG,KAAI,CAAC;IAAR,WAAG,MAAK,CAAA;IACxB,IAAiB,aAAa,CAAsB;IAApD,WAAiB,aAAa,GAAG;YAAA,cAAgB,CAAC;YAAD,QAAC;QAAD,CAAC,AAAjB,IAAiB;QAAJ,eAAC,IAAG,CAAA;IAAC,CAAC,EAAnC,aAAa,GAAb,qBAAa,KAAb,qBAAa,QAAsB;IACpD,IAAiB,SAAS,CAAwC;IAAlE,WAAiB,SAAS;QAAC,IAAA,SAAS,CAA8B;QAAvC,WAAA,SAAS,GAAG;gBAAA,sBAAwB,CAAC;gBAAD,gBAAC;YAAD,CAAC,AAAzB,IAAyB;YAAZ,mBAAS,YAAG,CAAA;QAAC,CAAC,EAAvC,SAAS,GAAT,mBAAS,KAAT,mBAAS,QAA8B;IAAD,CAAC,EAAjD,SAAS,GAAT,iBAAS,KAAT,iBAAS,QAAwC;IACpD,kBAAU,GAAG,aAAa,CAAC,CAAC,CAAC;;IAE9B,qBAAa,GAAG,EAAE,CAAC;IAChC,IAAY,YAAwB;IAApC,WAAY,YAAY;QAAG,yCAAC,CAAE,yCAAC,CAAE,yCAAC,CAAA;IAAC,CAAC,EAAxB,YAAY,GAAZ,oBAAY,KAAZ,oBAAY,QAAY;AACvD,CAAC,EATS,OAAO,KAAP,OAAO,QAShB;AACc;IAAA,sBAAiB,CAAC;IAAD,gBAAC;AAAD,CAAC,AAAlB,IAAkB;AAClB,SAAS,WAAW,KAAI,CAAC;AACzB,IAAU,iBAAiB,CAA8B;AAAzD,WAAU,iBAAiB,GAAG;QAAA,sBAAwB,CAAC;QAAD,gBAAC;IAAD,CAAC,AAAzB,IAAyB;IAAZ,2BAAS,YAAG,CAAA;AAAC,CAAC,EAA/C,iBAAiB,KAAjB,iBAAiB,QAA8B;AACzD,IAAU,aAAa,CAAwC;AAA/D,WAAU,aAAa;IAAC,IAAA,SAAS,CAA8B;IAAvC,WAAA,SAAS,GAAG;YAAA,sBAAwB,CAAC;YAAD,gBAAC;QAAD,CAAC,AAAzB,IAAyB;QAAZ,mBAAS,YAAG,CAAA;IAAC,CAAC,EAAvC,SAAS,GAAT,uBAAS,KAAT,uBAAS,QAA8B;AAAD,CAAC,EAArD,aAAa,KAAb,aAAa,QAAwC;AAC/D,IAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;;AAEpD,IAAM,aAAa,GAAG,EAAE,CAAC;AACzB,IAAK,YAAwB;AAA7B,WAAK,YAAY;IAAG,yCAAC,CAAE,yCAAC,CAAE,yCAAC,CAAA;AAAC,CAAC,EAAxB,YAAY,KAAZ,YAAY,QAAY;ACpC5C;IAAA;IAIA,CAAC,AAHG,uBAAW,GAAX;QACI,OAAO,CAAC,GAAG,CAAC,oBAAoB,CAAC,CAAC;IACtC,CAAC;IACL,QAAC;AAAD,CAAC,AAJD,IAIC;ACJD,IAAI,CAAC,GAAG,IAAI,CAAC,EAAE,CAAC;AAChB,CAAC,CAAC,WAAW,EAAE,CAAC"}

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
1 >Emitted(4, 1) Source(11, 1) + SourceIndex(0)
2 >Emitted(4, 8) Source(11, 8) + SourceIndex(0)
3 >Emitted(4, 9) Source(11, 9) + SourceIndex(0)
4 >Emitted(4, 12) Source(11, 12) + SourceIndex(0)
5 >Emitted(4, 13) Source(11, 13) + SourceIndex(0)
6 >Emitted(4, 14) Source(11, 14) + SourceIndex(0)
7 >Emitted(4, 15) Source(11, 15) + SourceIndex(0)
8 >Emitted(4, 16) Source(11, 16) + SourceIndex(0)
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
1->Emitted(5, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(5, 8) Source(1, 8) + SourceIndex(1)
3 >Emitted(5, 9) Source(1, 9) + SourceIndex(1)
4 >Emitted(5, 12) Source(1, 12) + SourceIndex(1)
5 >Emitted(5, 13) Source(1, 13) + SourceIndex(1)
6 >Emitted(5, 14) Source(1, 14) + SourceIndex(1)
7 >Emitted(5, 16) Source(1, 16) + SourceIndex(1)
8 >Emitted(5, 17) Source(1, 17) + SourceIndex(1)
9 >Emitted(5, 18) Source(1, 18) + SourceIndex(1)
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
1 >Emitted(6, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(6, 10) Source(1, 10) + SourceIndex(2)
3 >Emitted(6, 11) Source(1, 11) + SourceIndex(2)
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
1->Emitted(7, 5) Source(2, 5) + SourceIndex(2)
2 >Emitted(7, 12) Source(2, 12) + SourceIndex(2)
3 >Emitted(7, 28) Source(2, 28) + SourceIndex(2)
4 >Emitted(7, 29) Source(2, 29) + SourceIndex(2)
---
>>>}
1 >
2 >^
3 > ^^^^^^->
1 >
  >
2 >}
1 >Emitted(8, 1) Source(3, 1) + SourceIndex(2)
2 >Emitted(8, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(9, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(9, 5) Source(5, 11) + SourceIndex(3)
3 >Emitted(9, 6) Source(5, 12) + SourceIndex(3)
4 >Emitted(9, 7) Source(11, 2) + SourceIndex(3)
---
>>>(function (N) {
1->
2 >^^^^^^^^^^^
3 >           ^
4 >            ^^^^^^^->
1->
2 >namespace 
3 >           N
1->Emitted(10, 1) Source(5, 1) + SourceIndex(3)
2 >Emitted(10, 12) Source(5, 11) + SourceIndex(3)
3 >Emitted(10, 13) Source(5, 12) + SourceIndex(3)
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
1->Emitted(11, 5) Source(6, 5) + SourceIndex(3)
2 >Emitted(11, 14) Source(6, 14) + SourceIndex(3)
3 >Emitted(11, 15) Source(6, 15) + SourceIndex(3)
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
1->Emitted(12, 9) Source(7, 9) + SourceIndex(3)
2 >Emitted(12, 16) Source(7, 16) + SourceIndex(3)
3 >Emitted(12, 17) Source(7, 17) + SourceIndex(3)
4 >Emitted(12, 20) Source(7, 20) + SourceIndex(3)
5 >Emitted(12, 21) Source(7, 21) + SourceIndex(3)
6 >Emitted(12, 30) Source(7, 30) + SourceIndex(3)
7 >Emitted(12, 31) Source(7, 31) + SourceIndex(3)
8 >Emitted(12, 32) Source(7, 32) + SourceIndex(3)
---
>>>    }
1 >^^^^
2 >    ^
1 >
  >    
2 >    }
1 >Emitted(13, 5) Source(8, 5) + SourceIndex(3)
2 >Emitted(13, 6) Source(8, 6) + SourceIndex(3)
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
1 >Emitted(15, 5) Source(10, 5) + SourceIndex(3)
2 >Emitted(15, 6) Source(10, 6) + SourceIndex(3)
3 >Emitted(15, 8) Source(10, 8) + SourceIndex(3)
4 >Emitted(15, 9) Source(10, 9) + SourceIndex(3)
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
1->Emitted(16, 1) Source(11, 1) + SourceIndex(3)
2 >Emitted(16, 2) Source(11, 2) + SourceIndex(3)
3 >Emitted(16, 4) Source(5, 11) + SourceIndex(3)
4 >Emitted(16, 5) Source(5, 12) + SourceIndex(3)
5 >Emitted(16, 10) Source(5, 11) + SourceIndex(3)
6 >Emitted(16, 11) Source(5, 12) + SourceIndex(3)
7 >Emitted(16, 19) Source(11, 2) + SourceIndex(3)
---
>>>var normalC = (function () {
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
  >
  >
1->Emitted(17, 1) Source(13, 1) + SourceIndex(3)
---
>>>    function normalC() {}
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^
3 >                        ^
1->class normalC {
  >    /**@internal*/ 
2 >    constructor() { 
3 >                        }
1->Emitted(18, 5) Source(14, 20) + SourceIndex(3)
2 >Emitted(18, 25) Source(14, 36) + SourceIndex(3)
3 >Emitted(18, 26) Source(14, 37) + SourceIndex(3)
---
>>>
>>>    normalC.prototype.method = function () { };
1 >^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^
3 >                            ^^^
4 >                               ^^^^^^^^^^^^^^
5 >                                             ^
6 >                                              ^^^^^^->
1 >
  >    /**@internal*/ prop: string;
  >    /**@internal*/ 
2 >    method
3 >                            
4 >                               method() { 
5 >                                             }
1 >Emitted(20, 5) Source(16, 20) + SourceIndex(3)
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
5 >                  ^^^^^^^^^^->
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
>>>    (function (someOther) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^
1->
2 >    export namespace 
3 >               someOther
1->Emitted(46, 5) Source(24, 20) + SourceIndex(3)
2 >Emitted(46, 16) Source(24, 37) + SourceIndex(3)
3 >Emitted(46, 25) Source(24, 46) + SourceIndex(3)
---
>>>        var something;
1 >^^^^^^^^
2 >        ^^^^
3 >            ^^^^^^^^^
4 >                     ^
5 >                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >        
3 >            something
4 >                      { export class someClass {} }
1 >Emitted(47, 9) Source(24, 47) + SourceIndex(3)
2 >Emitted(47, 13) Source(24, 47) + SourceIndex(3)
3 >Emitted(47, 22) Source(24, 56) + SourceIndex(3)
4 >Emitted(47, 23) Source(24, 86) + SourceIndex(3)
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
1->Emitted(48, 9) Source(24, 47) + SourceIndex(3)
2 >Emitted(48, 20) Source(24, 47) + SourceIndex(3)
3 >Emitted(48, 29) Source(24, 56) + SourceIndex(3)
4 >Emitted(48, 32) Source(24, 59) + SourceIndex(3)
---
>>>                function someClass() {}
1->^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^^^^^^^
3 >                                      ^
1->
2 >                export class someClass {
3 >                                      }
1->Emitted(49, 17) Source(24, 59) + SourceIndex(3)
2 >Emitted(49, 39) Source(24, 83) + SourceIndex(3)
3 >Emitted(49, 40) Source(24, 84) + SourceIndex(3)
---
>>>                return someClass;
1 >^^^^^^^^^^^^^^^^
2 >                ^^^^^^^^^^^^^^^^
1 >
2 >                }
1 >Emitted(50, 17) Source(24, 83) + SourceIndex(3)
2 >Emitted(50, 33) Source(24, 84) + SourceIndex(3)
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
1 >Emitted(51, 13) Source(24, 83) + SourceIndex(3)
2 >Emitted(51, 14) Source(24, 84) + SourceIndex(3)
3 >Emitted(51, 14) Source(24, 59) + SourceIndex(3)
4 >Emitted(51, 18) Source(24, 84) + SourceIndex(3)
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
1->Emitted(52, 13) Source(24, 72) + SourceIndex(3)
2 >Emitted(52, 32) Source(24, 81) + SourceIndex(3)
3 >Emitted(52, 44) Source(24, 84) + SourceIndex(3)
4 >Emitted(52, 45) Source(24, 84) + SourceIndex(3)
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
1->Emitted(53, 9) Source(24, 85) + SourceIndex(3)
2 >Emitted(53, 10) Source(24, 86) + SourceIndex(3)
3 >Emitted(53, 12) Source(24, 47) + SourceIndex(3)
4 >Emitted(53, 21) Source(24, 56) + SourceIndex(3)
5 >Emitted(53, 24) Source(24, 47) + SourceIndex(3)
6 >Emitted(53, 43) Source(24, 56) + SourceIndex(3)
7 >Emitted(53, 48) Source(24, 47) + SourceIndex(3)
8 >Emitted(53, 67) Source(24, 56) + SourceIndex(3)
9 >Emitted(53, 75) Source(24, 86) + SourceIndex(3)
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
1 >Emitted(54, 5) Source(24, 85) + SourceIndex(3)
2 >Emitted(54, 6) Source(24, 86) + SourceIndex(3)
3 >Emitted(54, 8) Source(24, 37) + SourceIndex(3)
4 >Emitted(54, 17) Source(24, 46) + SourceIndex(3)
5 >Emitted(54, 20) Source(24, 37) + SourceIndex(3)
6 >Emitted(54, 37) Source(24, 46) + SourceIndex(3)
7 >Emitted(54, 42) Source(24, 37) + SourceIndex(3)
8 >Emitted(54, 59) Source(24, 46) + SourceIndex(3)
9 >Emitted(54, 67) Source(24, 86) + SourceIndex(3)
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
1 >Emitted(55, 5) Source(25, 34) + SourceIndex(3)
2 >Emitted(55, 23) Source(25, 44) + SourceIndex(3)
3 >Emitted(55, 26) Source(25, 47) + SourceIndex(3)
4 >Emitted(55, 39) Source(25, 60) + SourceIndex(3)
5 >Emitted(55, 40) Source(25, 61) + SourceIndex(3)
6 >Emitted(55, 41) Source(25, 62) + SourceIndex(3)
7 >Emitted(55, 42) Source(25, 63) + SourceIndex(3)
---
>>>
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
1 >Emitted(57, 5) Source(27, 33) + SourceIndex(3)
2 >Emitted(57, 26) Source(27, 46) + SourceIndex(3)
3 >Emitted(57, 29) Source(27, 49) + SourceIndex(3)
4 >Emitted(57, 31) Source(27, 51) + SourceIndex(3)
5 >Emitted(57, 32) Source(27, 52) + SourceIndex(3)
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
1 >Emitted(58, 5) Source(28, 20) + SourceIndex(3)
2 >Emitted(58, 9) Source(28, 32) + SourceIndex(3)
3 >Emitted(58, 21) Source(28, 56) + SourceIndex(3)
---
>>>    (function (internalEnum) {
1->^^^^
2 >    ^^^^^^^^^^^
3 >               ^^^^^^^^^^^^
4 >                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >    export enum 
3 >               internalEnum
1->Emitted(59, 5) Source(28, 20) + SourceIndex(3)
2 >Emitted(59, 16) Source(28, 32) + SourceIndex(3)
3 >Emitted(59, 28) Source(28, 44) + SourceIndex(3)
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
1->Emitted(60, 9) Source(28, 47) + SourceIndex(3)
2 >Emitted(60, 50) Source(28, 48) + SourceIndex(3)
3 >Emitted(60, 51) Source(28, 50) + SourceIndex(3)
4 >Emitted(60, 92) Source(28, 51) + SourceIndex(3)
5 >Emitted(60, 93) Source(28, 53) + SourceIndex(3)
6 >Emitted(60, 134) Source(28, 54) + SourceIndex(3)
7 >Emitted(60, 135) Source(28, 54) + SourceIndex(3)
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
1 >Emitted(61, 5) Source(28, 55) + SourceIndex(3)
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
5 >                  ^^^^^^^^^^->
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
>>>(function (internalOther) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^^
1->
2 >namespace 
3 >           internalOther
1->Emitted(76, 1) Source(33, 16) + SourceIndex(3)
2 >Emitted(76, 12) Source(33, 26) + SourceIndex(3)
3 >Emitted(76, 25) Source(33, 39) + SourceIndex(3)
---
>>>    var something;
1 >^^^^
2 >    ^^^^
3 >        ^^^^^^^^^
4 >                 ^
5 >                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >.
2 >    
3 >        something
4 >                  { export class someClass {} }
1 >Emitted(77, 5) Source(33, 40) + SourceIndex(3)
2 >Emitted(77, 9) Source(33, 40) + SourceIndex(3)
3 >Emitted(77, 18) Source(33, 49) + SourceIndex(3)
4 >Emitted(77, 19) Source(33, 79) + SourceIndex(3)
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
1->Emitted(78, 5) Source(33, 40) + SourceIndex(3)
2 >Emitted(78, 16) Source(33, 40) + SourceIndex(3)
3 >Emitted(78, 25) Source(33, 49) + SourceIndex(3)
4 >Emitted(78, 28) Source(33, 52) + SourceIndex(3)
---
>>>            function someClass() {}
1->^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^^^^^^^
3 >                                  ^
1->
2 >            export class someClass {
3 >                                  }
1->Emitted(79, 13) Source(33, 52) + SourceIndex(3)
2 >Emitted(79, 35) Source(33, 76) + SourceIndex(3)
3 >Emitted(79, 36) Source(33, 77) + SourceIndex(3)
---
>>>            return someClass;
1 >^^^^^^^^^^^^
2 >            ^^^^^^^^^^^^^^^^
1 >
2 >            }
1 >Emitted(80, 13) Source(33, 76) + SourceIndex(3)
2 >Emitted(80, 29) Source(33, 77) + SourceIndex(3)
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
1 >Emitted(81, 9) Source(33, 76) + SourceIndex(3)
2 >Emitted(81, 10) Source(33, 77) + SourceIndex(3)
3 >Emitted(81, 10) Source(33, 52) + SourceIndex(3)
4 >Emitted(81, 14) Source(33, 77) + SourceIndex(3)
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
1->Emitted(82, 9) Source(33, 65) + SourceIndex(3)
2 >Emitted(82, 28) Source(33, 74) + SourceIndex(3)
3 >Emitted(82, 40) Source(33, 77) + SourceIndex(3)
4 >Emitted(82, 41) Source(33, 77) + SourceIndex(3)
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
1->Emitted(83, 5) Source(33, 78) + SourceIndex(3)
2 >Emitted(83, 6) Source(33, 79) + SourceIndex(3)
3 >Emitted(83, 8) Source(33, 40) + SourceIndex(3)
4 >Emitted(83, 17) Source(33, 49) + SourceIndex(3)
5 >Emitted(83, 20) Source(33, 40) + SourceIndex(3)
6 >Emitted(83, 43) Source(33, 49) + SourceIndex(3)
7 >Emitted(83, 48) Source(33, 40) + SourceIndex(3)
8 >Emitted(83, 71) Source(33, 49) + SourceIndex(3)
9 >Emitted(83, 79) Source(33, 79) + SourceIndex(3)
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
1 >Emitted(84, 1) Source(33, 78) + SourceIndex(3)
2 >Emitted(84, 2) Source(33, 79) + SourceIndex(3)
3 >Emitted(84, 4) Source(33, 26) + SourceIndex(3)
4 >Emitted(84, 17) Source(33, 39) + SourceIndex(3)
5 >Emitted(84, 22) Source(33, 26) + SourceIndex(3)
6 >Emitted(84, 35) Source(33, 39) + SourceIndex(3)
7 >Emitted(84, 43) Source(33, 79) + SourceIndex(3)
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
1->Emitted(85, 1) Source(34, 16) + SourceIndex(3)
2 >Emitted(85, 5) Source(34, 23) + SourceIndex(3)
3 >Emitted(85, 19) Source(34, 37) + SourceIndex(3)
4 >Emitted(85, 22) Source(34, 40) + SourceIndex(3)
5 >Emitted(85, 39) Source(34, 57) + SourceIndex(3)
6 >Emitted(85, 40) Source(34, 58) + SourceIndex(3)
7 >Emitted(85, 49) Source(34, 67) + SourceIndex(3)
8 >Emitted(85, 50) Source(34, 68) + SourceIndex(3)
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
1 >Emitted(87, 1) Source(36, 16) + SourceIndex(3)
2 >Emitted(87, 5) Source(36, 22) + SourceIndex(3)
3 >Emitted(87, 18) Source(36, 35) + SourceIndex(3)
4 >Emitted(87, 21) Source(36, 38) + SourceIndex(3)
5 >Emitted(87, 23) Source(36, 40) + SourceIndex(3)
6 >Emitted(87, 24) Source(36, 41) + SourceIndex(3)
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
1 >Emitted(88, 1) Source(37, 16) + SourceIndex(3)
2 >Emitted(88, 5) Source(37, 21) + SourceIndex(3)
3 >Emitted(88, 17) Source(37, 45) + SourceIndex(3)
---
>>>(function (internalEnum) {
1->
2 >^^^^^^^^^^^
3 >           ^^^^^^^^^^^^
4 >                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
2 >enum 
3 >           internalEnum
1->Emitted(89, 1) Source(37, 16) + SourceIndex(3)
2 >Emitted(89, 12) Source(37, 21) + SourceIndex(3)
3 >Emitted(89, 24) Source(37, 33) + SourceIndex(3)
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
1->Emitted(90, 5) Source(37, 36) + SourceIndex(3)
2 >Emitted(90, 46) Source(37, 37) + SourceIndex(3)
3 >Emitted(90, 47) Source(37, 39) + SourceIndex(3)
4 >Emitted(90, 88) Source(37, 40) + SourceIndex(3)
5 >Emitted(90, 89) Source(37, 42) + SourceIndex(3)
6 >Emitted(90, 130) Source(37, 43) + SourceIndex(3)
7 >Emitted(90, 131) Source(37, 43) + SourceIndex(3)
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
1 >Emitted(91, 1) Source(37, 44) + SourceIndex(3)
2 >Emitted(91, 2) Source(37, 45) + SourceIndex(3)
3 >Emitted(91, 4) Source(37, 21) + SourceIndex(3)
4 >Emitted(91, 16) Source(37, 33) + SourceIndex(3)
5 >Emitted(91, 21) Source(37, 21) + SourceIndex(3)
6 >Emitted(91, 33) Source(37, 33) + SourceIndex(3)
7 >Emitted(91, 41) Source(37, 45) + SourceIndex(3)
---
-------------------------------------------------------------------
emittedFile:/src/third/thirdjs/output/third-output.js
sourceFile:../../../second/second_part2.ts
-------------------------------------------------------------------
>>>var C = (function () {
1 >
2 >^^^^^^^^^^^^^^^^^^^->
1 >
1 >Emitted(92, 1) Source(1, 1) + SourceIndex(4)
---
>>>    function C() {
1->^^^^
2 >    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1->
1->Emitted(93, 5) Source(1, 1) + SourceIndex(4)
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
1->Emitted(94, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(94, 6) Source(5, 2) + SourceIndex(4)
3 >Emitted(94, 6) Source(2, 5) + SourceIndex(4)
4 >Emitted(94, 29) Source(2, 16) + SourceIndex(4)
5 >Emitted(94, 32) Source(2, 5) + SourceIndex(4)
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
1->Emitted(95, 9) Source(3, 9) + SourceIndex(4)
2 >Emitted(95, 16) Source(3, 16) + SourceIndex(4)
3 >Emitted(95, 17) Source(3, 17) + SourceIndex(4)
4 >Emitted(95, 20) Source(3, 20) + SourceIndex(4)
5 >Emitted(95, 21) Source(3, 21) + SourceIndex(4)
6 >Emitted(95, 41) Source(3, 41) + SourceIndex(4)
7 >Emitted(95, 42) Source(3, 42) + SourceIndex(4)
8 >Emitted(95, 43) Source(3, 43) + SourceIndex(4)
---
>>>    };
1 >^^^^
2 >    ^
3 >     ^^^^^^^^^->
1 >
  >    
2 >    }
1 >Emitted(96, 5) Source(4, 5) + SourceIndex(4)
2 >Emitted(96, 6) Source(4, 6) + SourceIndex(4)
---
>>>    return C;
1->^^^^
2 >    ^^^^^^^^
1->
  >
2 >    }
1->Emitted(97, 5) Source(5, 1) + SourceIndex(4)
2 >Emitted(97, 13) Source(5, 2) + SourceIndex(4)
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
1 >Emitted(98, 1) Source(5, 1) + SourceIndex(4)
2 >Emitted(98, 2) Source(5, 2) + SourceIndex(4)
3 >Emitted(98, 2) Source(1, 1) + SourceIndex(4)
4 >Emitted(98, 6) Source(5, 2) + SourceIndex(4)
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
1->Emitted(99, 1) Source(1, 1) + SourceIndex(5)
2 >Emitted(99, 5) Source(1, 5) + SourceIndex(5)
3 >Emitted(99, 6) Source(1, 6) + SourceIndex(5)
4 >Emitted(99, 9) Source(1, 9) + SourceIndex(5)
5 >Emitted(99, 13) Source(1, 13) + SourceIndex(5)
6 >Emitted(99, 14) Source(1, 14) + SourceIndex(5)
7 >Emitted(99, 16) Source(1, 16) + SourceIndex(5)
8 >Emitted(99, 17) Source(1, 17) + SourceIndex(5)
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
1->Emitted(100, 1) Source(2, 1) + SourceIndex(5)
2 >Emitted(100, 2) Source(2, 2) + SourceIndex(5)
3 >Emitted(100, 3) Source(2, 3) + SourceIndex(5)
4 >Emitted(100, 14) Source(2, 14) + SourceIndex(5)
5 >Emitted(100, 16) Source(2, 16) + SourceIndex(5)
6 >Emitted(100, 17) Source(2, 17) + SourceIndex(5)
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
          "end": 114,
          "kind": "prepend",
          "data": "../../../first/bin/first-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 114,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 114,
          "end": 3019,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 114,
              "end": 3019,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 3019,
          "end": 3055,
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
prepend: (0-114):: ../../../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-114)

var s = "Hello, world";

console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
prepend: (114-3019):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (114-3019)
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
    (function (someOther) {
        var something;
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
        internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
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
(function (internalOther) {
    var something;
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
    internalEnum[internalEnum["a"] = 0] = "a";internalEnum[internalEnum["b"] = 1] = "b";internalEnum[internalEnum["c"] = 2] = "c";
})(internalEnum || (internalEnum = {}));
var C = (function () {
    function C() {
    }C.prototype.doSomething = function () {
        console.log("something got done");
    };
    return C;
}());

----------------------------------------------------------------------
text: (3019-3055)
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

//// [/src/third/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "composite": true,
    "removeComments": true,
    "strict": false,
    "sourceMap": true,
    "declarationMap": true,
    "declaration": true,
    "stripInternal": true,
    "outFile": "./thirdjs/output/third-output.js",
    "skipDefaultLibCheck": true
  },
  "files": [
    "third_part1.ts"
  ],
  "references": [
    { "path": "../first", "prepend": true },
    { "path": "../second", "prepend": true },
  ]
}


