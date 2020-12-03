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




Output::
/lib/tsc --b /src/third --verbose
[[90m12:08:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:08:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because oldest output 'src/first/bin/first-output.js' is older than newest input 'src/first/first_PART1.ts'

[[90m12:08:00 AM[0m] Building project '/src/first/tsconfig.json'...

[[90m12:08:00 AM[0m] Project 'src/second/tsconfig.json' is out of date because output of its dependency 'src/first' has changed

[[90m12:08:00 AM[0m] Updating output of project '/src/second/tsconfig.json'...

[[90m12:08:00 AM[0m] Updating unchanged output timestamps of project '/src/second/tsconfig.json'...

[[90m12:08:00 AM[0m] Project 'src/third/tsconfig.json' is out of date because output of its dependency 'src/second' has changed

[[90m12:08:00 AM[0m] Updating output of project '/src/third/tsconfig.json'...

[[90m12:08:00 AM[0m] Updating unchanged output timestamps of project '/src/third/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/2/second-output.d.ts.map]
{"version":3,"file":"second-output.d.ts","sourceRoot":"","sources":["../first/first_PART1.ts","../first/first_part3.ts","../second/second_part1.ts","../second/second_part2.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AAED,cAAM,OAAO;;IAEK,IAAI,EAAE,MAAM,CAAC;IACb,MAAM;IACN,IAAI,CAAC,IACM,MAAM,CADK;IACtB,IAAI,CAAC,CAAC,KAAK,MAAM,EAAK;CACvC;AACD,kBAAU,OAAO,CAAC;IACA,MAAa,CAAC;KAAI;IAClB,SAAgB,GAAG,SAAK;IACxB,UAAiB,aAAa,CAAC;QAAE,MAAa,CAAC;SAAG;KAAE;IACpD,UAAiB,SAAS,CAAC,SAAS,CAAC;QAAE,MAAa,SAAS;SAAG;KAAE;IAClE,MAAM,QAAQ,UAAU,GAAG,aAAa,CAAC,CAAC,CAAC;IAC3C,KAAY,YAAY,GAAG,SAAS,CAAC;IAC9B,MAAM,aAAa,KAAK,CAAC;IAChC,KAAY,YAAY;QAAG,CAAC,IAAA;QAAE,CAAC,IAAA;QAAE,CAAC,IAAA;KAAE;CACrD;AACa,cAAM,SAAS;CAAG;AAClB,iBAAS,WAAW,SAAK;AACzB,kBAAU,iBAAiB,CAAC;IAAE,MAAa,SAAS;KAAG;CAAE;AACzD,kBAAU,aAAa,CAAC,SAAS,CAAC;IAAE,MAAa,SAAS;KAAG;CAAE;AAC/D,OAAO,cAAc,GAAG,iBAAiB,CAAC,SAAS,CAAC;AACpD,aAAK,YAAY,GAAG,SAAS,CAAC;AAC9B,QAAA,MAAM,aAAa,KAAK,CAAC;AACzB,aAAK,YAAY;IAAG,CAAC,IAAA;IAAE,CAAC,IAAA;IAAE,CAAC,IAAA;CAAE;ACpC3C,cAAM,CAAC;IACH,WAAW;CAGd"}

//// [/src/2/second-output.d.ts.map.baseline.txt]
===================================================================
JsFile: second-output.d.ts
mapUrl: second-output.d.ts.map
sourceRoot: 
sources: ../first/first_PART1.ts,../first/first_part3.ts,../second/second_part1.ts,../second/second_part2.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/2/second-output.d.ts
sourceFile:../first/first_PART1.ts
-------------------------------------------------------------------
>>>interface TheFirst {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1 >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 19) + SourceIndex(0)
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
emittedFile:/src/2/second-output.d.ts
sourceFile:../first/first_part3.ts
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
1->Emitted(8, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(8, 18) Source(1, 10) + SourceIndex(1)
3 >Emitted(8, 19) Source(1, 11) + SourceIndex(1)
4 >Emitted(8, 30) Source(3, 2) + SourceIndex(1)
---
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
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(9, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(9, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(9, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(10, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(11, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(11, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(11, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(11, 21) Source(5, 13) + SourceIndex(2)
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
1 >Emitted(12, 2) Source(11, 2) + SourceIndex(2)
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
1->Emitted(13, 1) Source(13, 1) + SourceIndex(2)
2 >Emitted(13, 15) Source(13, 7) + SourceIndex(2)
3 >Emitted(13, 22) Source(13, 14) + SourceIndex(2)
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
  >    /*@internal*/ constructor() { }
  >    /*@internal*/ 
2 >    prop
3 >        : 
4 >          string
5 >                ;
1 >Emitted(15, 5) Source(15, 19) + SourceIndex(2)
2 >Emitted(15, 9) Source(15, 23) + SourceIndex(2)
3 >Emitted(15, 11) Source(15, 25) + SourceIndex(2)
4 >Emitted(15, 17) Source(15, 31) + SourceIndex(2)
5 >Emitted(15, 18) Source(15, 32) + SourceIndex(2)
---
>>>    method(): void;
1->^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^^->
1->
  >    /*@internal*/ 
2 >    method
1->Emitted(16, 5) Source(16, 19) + SourceIndex(2)
2 >Emitted(16, 11) Source(16, 25) + SourceIndex(2)
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
  >    /*@internal*/ 
2 >    get 
3 >        c
4 >         () { return 10; }
  >             /*@internal*/ set c(val: 
5 >             number
6 >                   
1->Emitted(17, 5) Source(17, 19) + SourceIndex(2)
2 >Emitted(17, 9) Source(17, 23) + SourceIndex(2)
3 >Emitted(17, 10) Source(17, 24) + SourceIndex(2)
4 >Emitted(17, 14) Source(18, 30) + SourceIndex(2)
5 >Emitted(17, 20) Source(18, 36) + SourceIndex(2)
6 >Emitted(17, 21) Source(17, 41) + SourceIndex(2)
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
  >    /*@internal*/ 
2 >    set 
3 >        c
4 >         (
5 >          val: 
6 >               number
7 >                     ) { }
1->Emitted(18, 5) Source(18, 19) + SourceIndex(2)
2 >Emitted(18, 9) Source(18, 23) + SourceIndex(2)
3 >Emitted(18, 10) Source(18, 24) + SourceIndex(2)
4 >Emitted(18, 11) Source(18, 25) + SourceIndex(2)
5 >Emitted(18, 16) Source(18, 30) + SourceIndex(2)
6 >Emitted(18, 22) Source(18, 36) + SourceIndex(2)
7 >Emitted(18, 24) Source(18, 41) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(19, 2) Source(19, 2) + SourceIndex(2)
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
1->Emitted(20, 1) Source(20, 1) + SourceIndex(2)
2 >Emitted(20, 19) Source(20, 11) + SourceIndex(2)
3 >Emitted(20, 26) Source(20, 18) + SourceIndex(2)
4 >Emitted(20, 27) Source(20, 19) + SourceIndex(2)
---
>>>    class C {
1 >^^^^
2 >    ^^^^^^
3 >          ^
1 >{
  >    /*@internal*/ 
2 >    export class 
3 >          C
1 >Emitted(21, 5) Source(21, 19) + SourceIndex(2)
2 >Emitted(21, 11) Source(21, 32) + SourceIndex(2)
3 >Emitted(21, 12) Source(21, 33) + SourceIndex(2)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^->
1 > { }
1 >Emitted(22, 6) Source(21, 37) + SourceIndex(2)
---
>>>    function foo(): void;
1->^^^^
2 >    ^^^^^^^^^
3 >             ^^^
4 >                ^^^^^^^^^
5 >                         ^^^^^->
1->
  >    /*@internal*/ 
2 >    export function 
3 >             foo
4 >                () {}
1->Emitted(23, 5) Source(22, 19) + SourceIndex(2)
2 >Emitted(23, 14) Source(22, 35) + SourceIndex(2)
3 >Emitted(23, 17) Source(22, 38) + SourceIndex(2)
4 >Emitted(23, 26) Source(22, 43) + SourceIndex(2)
---
>>>    namespace someNamespace {
1->^^^^
2 >    ^^^^^^^^^^
3 >              ^^^^^^^^^^^^^
4 >                           ^
1->
  >    /*@internal*/ 
2 >    export namespace 
3 >              someNamespace
4 >                            
1->Emitted(24, 5) Source(23, 19) + SourceIndex(2)
2 >Emitted(24, 15) Source(23, 36) + SourceIndex(2)
3 >Emitted(24, 28) Source(23, 49) + SourceIndex(2)
4 >Emitted(24, 29) Source(23, 50) + SourceIndex(2)
---
>>>        class C {
1 >^^^^^^^^
2 >        ^^^^^^
3 >              ^
1 >{ 
2 >        export class 
3 >              C
1 >Emitted(25, 9) Source(23, 52) + SourceIndex(2)
2 >Emitted(25, 15) Source(23, 65) + SourceIndex(2)
3 >Emitted(25, 16) Source(23, 66) + SourceIndex(2)
---
>>>        }
1 >^^^^^^^^^
1 > {}
1 >Emitted(26, 10) Source(23, 69) + SourceIndex(2)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(27, 6) Source(23, 71) + SourceIndex(2)
---
>>>    namespace someOther.something {
1->^^^^
2 >    ^^^^^^^^^^
3 >              ^^^^^^^^^
4 >                       ^
5 >                        ^^^^^^^^^
6 >                                 ^
1->
  >    /*@internal*/ 
2 >    export namespace 
3 >              someOther
4 >                       .
5 >                        something
6 >                                  
1->Emitted(28, 5) Source(24, 19) + SourceIndex(2)
2 >Emitted(28, 15) Source(24, 36) + SourceIndex(2)
3 >Emitted(28, 24) Source(24, 45) + SourceIndex(2)
4 >Emitted(28, 25) Source(24, 46) + SourceIndex(2)
5 >Emitted(28, 34) Source(24, 55) + SourceIndex(2)
6 >Emitted(28, 35) Source(24, 56) + SourceIndex(2)
---
>>>        class someClass {
1 >^^^^^^^^
2 >        ^^^^^^
3 >              ^^^^^^^^^
1 >{ 
2 >        export class 
3 >              someClass
1 >Emitted(29, 9) Source(24, 58) + SourceIndex(2)
2 >Emitted(29, 15) Source(24, 71) + SourceIndex(2)
3 >Emitted(29, 24) Source(24, 80) + SourceIndex(2)
---
>>>        }
1 >^^^^^^^^^
1 > {}
1 >Emitted(30, 10) Source(24, 83) + SourceIndex(2)
---
>>>    }
1 >^^^^^
2 >     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(31, 6) Source(24, 85) + SourceIndex(2)
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
  >    /*@internal*/ 
2 >    export
3 >           import 
4 >                  someImport
5 >                             = 
6 >                               someNamespace
7 >                                            .
8 >                                             C
9 >                                              ;
1->Emitted(32, 5) Source(25, 19) + SourceIndex(2)
2 >Emitted(32, 11) Source(25, 25) + SourceIndex(2)
3 >Emitted(32, 19) Source(25, 33) + SourceIndex(2)
4 >Emitted(32, 29) Source(25, 43) + SourceIndex(2)
5 >Emitted(32, 32) Source(25, 46) + SourceIndex(2)
6 >Emitted(32, 45) Source(25, 59) + SourceIndex(2)
7 >Emitted(32, 46) Source(25, 60) + SourceIndex(2)
8 >Emitted(32, 47) Source(25, 61) + SourceIndex(2)
9 >Emitted(32, 48) Source(25, 62) + SourceIndex(2)
---
>>>    type internalType = internalC;
1 >^^^^
2 >    ^^^^^
3 >         ^^^^^^^^^^^^
4 >                     ^^^
5 >                        ^^^^^^^^^
6 >                                 ^
1 >
  >    /*@internal*/ 
2 >    export type 
3 >         internalType
4 >                      = 
5 >                        internalC
6 >                                 ;
1 >Emitted(33, 5) Source(26, 19) + SourceIndex(2)
2 >Emitted(33, 10) Source(26, 31) + SourceIndex(2)
3 >Emitted(33, 22) Source(26, 43) + SourceIndex(2)
4 >Emitted(33, 25) Source(26, 46) + SourceIndex(2)
5 >Emitted(33, 34) Source(26, 55) + SourceIndex(2)
6 >Emitted(33, 35) Source(26, 56) + SourceIndex(2)
---
>>>    const internalConst = 10;
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^^^^^
4 >                       ^^^^^
5 >                            ^
1 >
  >    /*@internal*/ export 
2 >    const 
3 >          internalConst
4 >                        = 10
5 >                            ;
1 >Emitted(34, 5) Source(27, 26) + SourceIndex(2)
2 >Emitted(34, 11) Source(27, 32) + SourceIndex(2)
3 >Emitted(34, 24) Source(27, 45) + SourceIndex(2)
4 >Emitted(34, 29) Source(27, 50) + SourceIndex(2)
5 >Emitted(34, 30) Source(27, 51) + SourceIndex(2)
---
>>>    enum internalEnum {
1 >^^^^
2 >    ^^^^^
3 >         ^^^^^^^^^^^^
1 >
  >    /*@internal*/ 
2 >    export enum 
3 >         internalEnum
1 >Emitted(35, 5) Source(28, 19) + SourceIndex(2)
2 >Emitted(35, 10) Source(28, 31) + SourceIndex(2)
3 >Emitted(35, 22) Source(28, 43) + SourceIndex(2)
---
>>>        a = 0,
1 >^^^^^^^^
2 >        ^
3 >         ^^^^
4 >             ^^->
1 > { 
2 >        a
3 >         
1 >Emitted(36, 9) Source(28, 46) + SourceIndex(2)
2 >Emitted(36, 10) Source(28, 47) + SourceIndex(2)
3 >Emitted(36, 14) Source(28, 47) + SourceIndex(2)
---
>>>        b = 1,
1->^^^^^^^^
2 >        ^
3 >         ^^^^
4 >             ^->
1->, 
2 >        b
3 >         
1->Emitted(37, 9) Source(28, 49) + SourceIndex(2)
2 >Emitted(37, 10) Source(28, 50) + SourceIndex(2)
3 >Emitted(37, 14) Source(28, 50) + SourceIndex(2)
---
>>>        c = 2
1->^^^^^^^^
2 >        ^
3 >         ^^^^
1->, 
2 >        c
3 >         
1->Emitted(38, 9) Source(28, 52) + SourceIndex(2)
2 >Emitted(38, 10) Source(28, 53) + SourceIndex(2)
3 >Emitted(38, 14) Source(28, 53) + SourceIndex(2)
---
>>>    }
1 >^^^^^
1 > }
1 >Emitted(39, 6) Source(28, 55) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >
  >}
1 >Emitted(40, 2) Source(29, 2) + SourceIndex(2)
---
>>>declare class internalC {
1->
2 >^^^^^^^^^^^^^^
3 >              ^^^^^^^^^
1->
  >/*@internal*/ 
2 >class 
3 >              internalC
1->Emitted(41, 1) Source(30, 15) + SourceIndex(2)
2 >Emitted(41, 15) Source(30, 21) + SourceIndex(2)
3 >Emitted(41, 24) Source(30, 30) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > {}
1 >Emitted(42, 2) Source(30, 33) + SourceIndex(2)
---
>>>declare function internalfoo(): void;
1->
2 >^^^^^^^^^^^^^^^^^
3 >                 ^^^^^^^^^^^
4 >                            ^^^^^^^^^
5 >                                     ^->
1->
  >/*@internal*/ 
2 >function 
3 >                 internalfoo
4 >                            () {}
1->Emitted(43, 1) Source(31, 15) + SourceIndex(2)
2 >Emitted(43, 18) Source(31, 24) + SourceIndex(2)
3 >Emitted(43, 29) Source(31, 35) + SourceIndex(2)
4 >Emitted(43, 38) Source(31, 40) + SourceIndex(2)
---
>>>declare namespace internalNamespace {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^^^^^^^^^^^^^^^^
4 >                                   ^
1->
  >/*@internal*/ 
2 >namespace 
3 >                  internalNamespace
4 >                                    
1->Emitted(44, 1) Source(32, 15) + SourceIndex(2)
2 >Emitted(44, 19) Source(32, 25) + SourceIndex(2)
3 >Emitted(44, 36) Source(32, 42) + SourceIndex(2)
4 >Emitted(44, 37) Source(32, 43) + SourceIndex(2)
---
>>>    class someClass {
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^
1 >{ 
2 >    export class 
3 >          someClass
1 >Emitted(45, 5) Source(32, 45) + SourceIndex(2)
2 >Emitted(45, 11) Source(32, 58) + SourceIndex(2)
3 >Emitted(45, 20) Source(32, 67) + SourceIndex(2)
---
>>>    }
1 >^^^^^
1 > {}
1 >Emitted(46, 6) Source(32, 70) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(47, 2) Source(32, 72) + SourceIndex(2)
---
>>>declare namespace internalOther.something {
1->
2 >^^^^^^^^^^^^^^^^^^
3 >                  ^^^^^^^^^^^^^
4 >                               ^
5 >                                ^^^^^^^^^
6 >                                         ^
1->
  >/*@internal*/ 
2 >namespace 
3 >                  internalOther
4 >                               .
5 >                                something
6 >                                          
1->Emitted(48, 1) Source(33, 15) + SourceIndex(2)
2 >Emitted(48, 19) Source(33, 25) + SourceIndex(2)
3 >Emitted(48, 32) Source(33, 38) + SourceIndex(2)
4 >Emitted(48, 33) Source(33, 39) + SourceIndex(2)
5 >Emitted(48, 42) Source(33, 48) + SourceIndex(2)
6 >Emitted(48, 43) Source(33, 49) + SourceIndex(2)
---
>>>    class someClass {
1 >^^^^
2 >    ^^^^^^
3 >          ^^^^^^^^^
1 >{ 
2 >    export class 
3 >          someClass
1 >Emitted(49, 5) Source(33, 51) + SourceIndex(2)
2 >Emitted(49, 11) Source(33, 64) + SourceIndex(2)
3 >Emitted(49, 20) Source(33, 73) + SourceIndex(2)
---
>>>    }
1 >^^^^^
1 > {}
1 >Emitted(50, 6) Source(33, 76) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(51, 2) Source(33, 78) + SourceIndex(2)
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
  >/*@internal*/ 
2 >import 
3 >       internalImport
4 >                      = 
5 >                        internalNamespace
6 >                                         .
7 >                                          someClass
8 >                                                   ;
1->Emitted(52, 1) Source(34, 15) + SourceIndex(2)
2 >Emitted(52, 8) Source(34, 22) + SourceIndex(2)
3 >Emitted(52, 22) Source(34, 36) + SourceIndex(2)
4 >Emitted(52, 25) Source(34, 39) + SourceIndex(2)
5 >Emitted(52, 42) Source(34, 56) + SourceIndex(2)
6 >Emitted(52, 43) Source(34, 57) + SourceIndex(2)
7 >Emitted(52, 52) Source(34, 66) + SourceIndex(2)
8 >Emitted(52, 53) Source(34, 67) + SourceIndex(2)
---
>>>declare type internalType = internalC;
1 >
2 >^^^^^^^^^^^^^
3 >             ^^^^^^^^^^^^
4 >                         ^^^
5 >                            ^^^^^^^^^
6 >                                     ^
1 >
  >/*@internal*/ 
2 >type 
3 >             internalType
4 >                          = 
5 >                            internalC
6 >                                     ;
1 >Emitted(53, 1) Source(35, 15) + SourceIndex(2)
2 >Emitted(53, 14) Source(35, 20) + SourceIndex(2)
3 >Emitted(53, 26) Source(35, 32) + SourceIndex(2)
4 >Emitted(53, 29) Source(35, 35) + SourceIndex(2)
5 >Emitted(53, 38) Source(35, 44) + SourceIndex(2)
6 >Emitted(53, 39) Source(35, 45) + SourceIndex(2)
---
>>>declare const internalConst = 10;
1 >
2 >^^^^^^^^
3 >        ^^^^^^
4 >              ^^^^^^^^^^^^^
5 >                           ^^^^^
6 >                                ^
1 >
  >/*@internal*/ 
2 >
3 >        const 
4 >              internalConst
5 >                            = 10
6 >                                ;
1 >Emitted(54, 1) Source(36, 15) + SourceIndex(2)
2 >Emitted(54, 9) Source(36, 15) + SourceIndex(2)
3 >Emitted(54, 15) Source(36, 21) + SourceIndex(2)
4 >Emitted(54, 28) Source(36, 34) + SourceIndex(2)
5 >Emitted(54, 33) Source(36, 39) + SourceIndex(2)
6 >Emitted(54, 34) Source(36, 40) + SourceIndex(2)
---
>>>declare enum internalEnum {
1 >
2 >^^^^^^^^^^^^^
3 >             ^^^^^^^^^^^^
1 >
  >/*@internal*/ 
2 >enum 
3 >             internalEnum
1 >Emitted(55, 1) Source(37, 15) + SourceIndex(2)
2 >Emitted(55, 14) Source(37, 20) + SourceIndex(2)
3 >Emitted(55, 26) Source(37, 32) + SourceIndex(2)
---
>>>    a = 0,
1 >^^^^
2 >    ^
3 >     ^^^^
4 >         ^^->
1 > { 
2 >    a
3 >     
1 >Emitted(56, 5) Source(37, 35) + SourceIndex(2)
2 >Emitted(56, 6) Source(37, 36) + SourceIndex(2)
3 >Emitted(56, 10) Source(37, 36) + SourceIndex(2)
---
>>>    b = 1,
1->^^^^
2 >    ^
3 >     ^^^^
4 >         ^->
1->, 
2 >    b
3 >     
1->Emitted(57, 5) Source(37, 38) + SourceIndex(2)
2 >Emitted(57, 6) Source(37, 39) + SourceIndex(2)
3 >Emitted(57, 10) Source(37, 39) + SourceIndex(2)
---
>>>    c = 2
1->^^^^
2 >    ^
3 >     ^^^^
1->, 
2 >    c
3 >     
1->Emitted(58, 5) Source(37, 41) + SourceIndex(2)
2 >Emitted(58, 6) Source(37, 42) + SourceIndex(2)
3 >Emitted(58, 10) Source(37, 42) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 > }
1 >Emitted(59, 2) Source(37, 44) + SourceIndex(2)
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
1->Emitted(60, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(60, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(60, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(61, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(61, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(62, 2) Source(5, 2) + SourceIndex(3)
---
>>>//# sourceMappingURL=second-output.d.ts.map

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
          "end": 110,
          "kind": "prepend",
          "data": "../first/bin/first-output.js",
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
          "end": 3527,
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
prepend: (0-110):: ../first/bin/first-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-110)
var s = "Hello, world";
console.log(s);
console.log(f());
function f() {
    return "JS does hoists";
}

----------------------------------------------------------------------
text: (110-3527)
var N;
(function (N) {
    function f() {
        console.log('testing');
    }
    f();
})(N || (N = {}));
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
})(normalN || (normalN = {}));
/*@internal*/ var internalC = /** @class */ (function () {
    function internalC() {
    }
    return internalC;
}());
/*@internal*/ function internalfoo() { }
/*@internal*/ var internalNamespace;
(function (internalNamespace) {
    var someClass = /** @class */ (function () {
        function someClass() {
        }
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
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
prepend: (0-157):: ../first/bin/first-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-157)
interface TheFirst {
    none: any;
}
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
//// [/src/first/bin/first-output.d.ts.map]
{"version":3,"file":"first-output.d.ts","sourceRoot":"","sources":["../first_PART1.ts","../first_part2.ts","../first_part3.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;AERD,iBAAS,CAAC,WAET"}

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
1 >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 19) + SourceIndex(0)
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

//// [/src/first/bin/first-output.js] file written with same contents
//// [/src/first/bin/first-output.js.map] file written with same contents
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
text: (0-157)
interface TheFirst {
    none: any;
}
declare const s = "Hello, world";
interface NoJsForHereEither {
    none: any;
}
declare function f(): string;

======================================================================

//// [/src/third/thirdjs/output/third-output.d.ts]
interface TheFirst {
    none: any;
}
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
{"version":3,"file":"third-output.d.ts","sourceRoot":"","sources":["../../../first/first_PART1.ts","../../../first/first_part3.ts","../../../second/second_part1.ts","../../../second/second_part2.ts","../../third_part1.ts"],"names":[],"mappings":"AAAA,UAAU,QAAQ;IACd,IAAI,EAAE,GAAG,CAAC;CACb;AAED,QAAA,MAAM,CAAC,iBAAiB,CAAC;AAEzB,UAAU,iBAAiB;IACvB,IAAI,EAAE,GAAG,CAAC;CACb;ACRD,iBAAS,CAAC,WAET;ACFD,kBAAU,CAAC,CAAC;CAEX;AAED,kBAAU,CAAC,CAAC;CAMX;AAED,cAAM,OAAO;CAMZ;AACD,kBAAU,OAAO,CAAC;CASjB;AC5BD,cAAM,CAAC;IACH,WAAW;CAGd;ACJD,QAAA,IAAI,CAAC,GAAU,CAAC"}

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
>>>interface TheFirst {
1 >
2 >^^^^^^^^^^
3 >          ^^^^^^^^
1 >
2 >interface 
3 >          TheFirst
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 11) Source(1, 11) + SourceIndex(0)
3 >Emitted(1, 19) Source(1, 19) + SourceIndex(0)
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
1->Emitted(8, 1) Source(1, 1) + SourceIndex(1)
2 >Emitted(8, 18) Source(1, 10) + SourceIndex(1)
3 >Emitted(8, 19) Source(1, 11) + SourceIndex(1)
4 >Emitted(8, 30) Source(3, 2) + SourceIndex(1)
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
1 >Emitted(9, 1) Source(1, 1) + SourceIndex(2)
2 >Emitted(9, 19) Source(1, 11) + SourceIndex(2)
3 >Emitted(9, 20) Source(1, 12) + SourceIndex(2)
4 >Emitted(9, 21) Source(1, 13) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^->
1 >{
  >    // Comment text
  >}
1 >Emitted(10, 2) Source(3, 2) + SourceIndex(2)
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
1->Emitted(11, 1) Source(5, 1) + SourceIndex(2)
2 >Emitted(11, 19) Source(5, 11) + SourceIndex(2)
3 >Emitted(11, 20) Source(5, 12) + SourceIndex(2)
4 >Emitted(11, 21) Source(5, 13) + SourceIndex(2)
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
1 >Emitted(12, 2) Source(11, 2) + SourceIndex(2)
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
1->Emitted(13, 1) Source(13, 1) + SourceIndex(2)
2 >Emitted(13, 15) Source(13, 7) + SourceIndex(2)
3 >Emitted(13, 22) Source(13, 14) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > {
  >    /*@internal*/ constructor() { }
  >    /*@internal*/ prop: string;
  >    /*@internal*/ method() { }
  >    /*@internal*/ get c() { return 10; }
  >    /*@internal*/ set c(val: number) { }
  >}
1 >Emitted(14, 2) Source(19, 2) + SourceIndex(2)
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
1->Emitted(15, 1) Source(20, 1) + SourceIndex(2)
2 >Emitted(15, 19) Source(20, 11) + SourceIndex(2)
3 >Emitted(15, 26) Source(20, 18) + SourceIndex(2)
4 >Emitted(15, 27) Source(20, 19) + SourceIndex(2)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
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
1 >Emitted(16, 2) Source(29, 2) + SourceIndex(2)
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
1->Emitted(17, 1) Source(1, 1) + SourceIndex(3)
2 >Emitted(17, 15) Source(1, 7) + SourceIndex(3)
3 >Emitted(17, 16) Source(1, 8) + SourceIndex(3)
---
>>>    doSomething(): void;
1->^^^^
2 >    ^^^^^^^^^^^
1-> {
  >    
2 >    doSomething
1->Emitted(18, 5) Source(2, 5) + SourceIndex(3)
2 >Emitted(18, 16) Source(2, 16) + SourceIndex(3)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^->
1 >() {
  >        console.log("something got done");
  >    }
  >}
1 >Emitted(19, 2) Source(5, 2) + SourceIndex(3)
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
1->Emitted(20, 1) Source(1, 1) + SourceIndex(4)
2 >Emitted(20, 9) Source(1, 1) + SourceIndex(4)
3 >Emitted(20, 13) Source(1, 5) + SourceIndex(4)
4 >Emitted(20, 14) Source(1, 6) + SourceIndex(4)
5 >Emitted(20, 17) Source(1, 16) + SourceIndex(4)
6 >Emitted(20, 18) Source(1, 17) + SourceIndex(4)
---
>>>//# sourceMappingURL=third-output.d.ts.map

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
          "end": 3527,
          "kind": "prepend",
          "data": "../../../2/second-output.js",
          "texts": [
            {
              "pos": 0,
              "end": 3527,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 3527,
          "end": 3563,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 317,
          "kind": "prepend",
          "data": "../../../2/second-output.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 317,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 317,
          "end": 336,
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
prepend: (0-3527):: ../../../2/second-output.js texts:: 1
>>--------------------------------------------------------------------
text: (0-3527)
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
})(normalN || (normalN = {}));
/*@internal*/ var internalC = /** @class */ (function () {
    function internalC() {
    }
    return internalC;
}());
/*@internal*/ function internalfoo() { }
/*@internal*/ var internalNamespace;
(function (internalNamespace) {
    var someClass = /** @class */ (function () {
        function someClass() {
        }
        return someClass;
    }());
    internalNamespace.someClass = someClass;
})(internalNamespace || (internalNamespace = {}));
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
text: (3527-3563)
var c = new C();
c.doSomething();

======================================================================
======================================================================
File:: /src/third/thirdjs/output/third-output.d.ts
----------------------------------------------------------------------
prepend: (0-317):: ../../../2/second-output.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-317)
interface TheFirst {
    none: any;
}
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
text: (317-336)
declare var c: C;

======================================================================

