//// [tests/cases/compiler/renamingDestructuredPropertyInFunctionType.ts] ////

//// [renamingDestructuredPropertyInFunctionType.ts]
// GH#37454, GH#41044

type O = { a?: string; b: number; c: number; };
type F1 = (arg: number) => any; // OK
type F2 = ({ a: string }: O) => any; // Error
type F3 = ({ a: string, b, c }: O) => any; // Error
type F4 = ({ a: string }: O) => any; // Error
type F5 = ({ a: string, b, c }: O) => any; // Error
type F6 = ({ a: string }) => typeof string; // OK
type F7 = ({ a: string, b: number }) => typeof number; // Error
type F8 = ({ a, b: number }) => typeof number; // OK
type F9 = ([a, b, c]) => void; // OK

type G1 = new (arg: number) => any; // OK
type G2 = new ({ a: string }: O) => any; // Error
type G3 = new ({ a: string, b, c }: O) => any; // Error
type G4 = new ({ a: string }: O) => any; // Error
type G5 = new ({ a: string, b, c }: O) => any; // Error
type G6 = new ({ a: string }) => typeof string; // OK
type G7 = new ({ a: string, b: number }) => typeof number; // Error
type G8 = new ({ a, b: number }) => typeof number; // OK
type G9 = new ([a, b, c]) => void; // OK

// Below are Error but renaming is retained in declaration emit,
// since elinding it would leave invalid syntax.
type F10 = ({ "a": string }) => void; // Error
type F11 = ({ 2: string }) => void; // Error
type F12 = ({ ["a"]: string }: O) => void; // Error
type F13 = ({ [2]: string }) => void; // Error
type G10 = new ({ "a": string }) => void; // Error
type G11 = new ({ 2: string }) => void; // Error
type G12 = new ({ ["a"]: string }: O) => void; // Error
type G13 = new ({ [2]: string }) => void; // Error

interface I {
  method1(arg: number): any; // OK
  method2({ a: string }): any; // Error

  (arg: number): any; // OK
  ({ a: string }): any; // Error

  new (arg: number): any; // OK
  new ({ a: string }): any; // Error
}

// Below are OK but renaming should be removed from declaration emit
function f1({ a: string }: O) { }
const f2 = function({ a: string }: O) { };
const f3 = ({ a: string, b, c }: O) => { };
const f4 = function({ a: string }: O): typeof string { return string; };
const f5 = ({ a: string, b, c }: O): typeof string => '';
const obj1 = {
  method({ a: string }: O) { }
};
const obj2 = {
  method({ a: string }: O): typeof string { return string; }
};
function f6({ a: string = "" }: O) { }
const f7 = ({ a: string = "", b, c }: O) => { };
const f8 = ({ "a": string }: O) => { };
function f9 ({ 2: string }) { };
function f10 ({ ["a"]: string }: O) { };
const f11 =  ({ [2]: string }) => { };

// In below case `string` should be kept because it is used
function f12({ a: string = "" }: O): typeof string { return "a"; }

/// [Declarations] ////



//// [renamingDestructuredPropertyInFunctionType.d.ts]
type O = {
    a?: string;
    b: number;
    c: number;
};
type F1 = (arg: number) => any;
type F2 = ({ a: string }: O) => any;
type F3 = ({ a: string, b, c }: O) => any;
type F4 = ({ a: string }: O) => any;
type F5 = ({ a: string, b, c }: O) => any;
type F6 = ({ a: string }: invalid) => typeof string;
type F7 = ({ a: string, b: number }: invalid) => typeof number;
type F8 = ({ a, b: number }: invalid) => typeof number;
type F9 = ([a, b, c]: invalid) => void;
type G1 = new (arg: number) => any;
type G2 = new ({ a: string }: O) => any;
type G3 = new ({ a: string, b, c }: O) => any;
type G4 = new ({ a: string }: O) => any;
type G5 = new ({ a: string, b, c }: O) => any;
type G6 = new ({ a: string }: invalid) => typeof string;
type G7 = new ({ a: string, b: number }: invalid) => typeof number;
type G8 = new ({ a, b: number }: invalid) => typeof number;
type G9 = new ([a, b, c]: invalid) => void;
type F10 = ({ "a": string }: invalid) => void;
type F11 = ({ 2: string }: invalid) => void;
type F12 = ({ ["a"]: string }: O) => void;
type F13 = ({ [2]: string }: invalid) => void;
type G10 = new ({ "a": string }: invalid) => void;
type G11 = new ({ 2: string }: invalid) => void;
type G12 = new ({ ["a"]: string }: O) => void;
type G13 = new ({ [2]: string }: invalid) => void;
interface I {
    method1(arg: number): any;
    method2({ a: string }: invalid): any;
    (arg: number): any;
    ({ a: string }: invalid): any;
    new (arg: number): any;
    new ({ a: string }: invalid): any;
}
declare function f1({ a: string }: O): invalid;
declare const f2: ({ a: string }: O) => invalid;
declare const f3: ({ a: string, b, c }: O) => invalid;
declare const f4: ({ a: string }: O) => typeof string;
declare const f5: ({ a: string, b, c }: O) => typeof string;
declare const obj1: invalid;
declare const obj2: {
    method({ a: string }: O): typeof string;
};
declare function f6({ a: string }: O): invalid;
declare const f7: ({ a: string, b, c }: O) => invalid;
declare const f8: ({ "a": string }: O) => invalid;
declare function f9({ 2: string }: invalid): invalid;
declare function f10({ ["a"]: string }: O): invalid;
declare const f11: ({ [2]: string }: invalid) => invalid;
declare function f12({ a: string }: O): typeof string;

/// [Errors] ////

renamingDestructuredPropertyInFunctionType.ts(5,17): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(6,17): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(7,17): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(8,17): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(9,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(10,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(10,17): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(11,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(12,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(15,21): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(16,21): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(17,21): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(18,21): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(19,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(20,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(20,21): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(21,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(22,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(26,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(26,20): error TS2842: 'string' is an unused renaming of '"a"'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(27,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(27,18): error TS2842: 'string' is an unused renaming of '2'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(28,22): error TS2842: 'string' is an unused renaming of '["a"]'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(29,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(29,20): error TS2842: 'string' is an unused renaming of '[2]'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(30,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(30,24): error TS2842: 'string' is an unused renaming of '"a"'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(31,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(31,22): error TS2842: 'string' is an unused renaming of '2'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(32,26): error TS2842: 'string' is an unused renaming of '["a"]'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(33,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(33,24): error TS2842: 'string' is an unused renaming of '[2]'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(37,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(37,16): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(40,4): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(40,9): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(43,8): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(43,13): error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
renamingDestructuredPropertyInFunctionType.ts(47,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(48,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(49,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(50,47): error TS4025: Exported variable 'f4' has or is using private name 'string'.
renamingDestructuredPropertyInFunctionType.ts(51,45): error TS4025: Exported variable 'f5' has or is using private name 'string'.
renamingDestructuredPropertyInFunctionType.ts(53,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(56,36): error TS4025: Exported variable 'obj2' has or is using private name 'string'.
renamingDestructuredPropertyInFunctionType.ts(58,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(59,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(60,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(61,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(61,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(62,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(63,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
renamingDestructuredPropertyInFunctionType.ts(63,15): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== renamingDestructuredPropertyInFunctionType.ts (53 errors) ====
    // GH#37454, GH#41044
    
    type O = { a?: string; b: number; c: number; };
    type F1 = (arg: number) => any; // OK
    type F2 = ({ a: string }: O) => any; // Error
                    ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
    type F3 = ({ a: string, b, c }: O) => any; // Error
                    ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
    type F4 = ({ a: string }: O) => any; // Error
                    ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
    type F5 = ({ a: string, b, c }: O) => any; // Error
                    ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
    type F6 = ({ a: string }) => typeof string; // OK
               ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    type F7 = ({ a: string, b: number }) => typeof number; // Error
               ~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:10:36: We can only write a type for 'a' by adding a type for the entire parameter here.
    type F8 = ({ a, b: number }) => typeof number; // OK
               ~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    type F9 = ([a, b, c]) => void; // OK
               ~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    type G1 = new (arg: number) => any; // OK
    type G2 = new ({ a: string }: O) => any; // Error
                        ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
    type G3 = new ({ a: string, b, c }: O) => any; // Error
                        ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
    type G4 = new ({ a: string }: O) => any; // Error
                        ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
    type G5 = new ({ a: string, b, c }: O) => any; // Error
                        ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
    type G6 = new ({ a: string }) => typeof string; // OK
                   ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    type G7 = new ({ a: string, b: number }) => typeof number; // Error
                   ~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:20:40: We can only write a type for 'a' by adding a type for the entire parameter here.
    type G8 = new ({ a, b: number }) => typeof number; // OK
                   ~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    type G9 = new ([a, b, c]) => void; // OK
                   ~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    // Below are Error but renaming is retained in declaration emit,
    // since elinding it would leave invalid syntax.
    type F10 = ({ "a": string }) => void; // Error
                ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                       ~~~~~~
!!! error TS2842: 'string' is an unused renaming of '"a"'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:26:28: We can only write a type for '"a"' by adding a type for the entire parameter here.
    type F11 = ({ 2: string }) => void; // Error
                ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                     ~~~~~~
!!! error TS2842: 'string' is an unused renaming of '2'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:27:26: We can only write a type for '2' by adding a type for the entire parameter here.
    type F12 = ({ ["a"]: string }: O) => void; // Error
                         ~~~~~~
!!! error TS2842: 'string' is an unused renaming of '["a"]'. Did you intend to use it as a type annotation?
    type F13 = ({ [2]: string }) => void; // Error
                ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                       ~~~~~~
!!! error TS2842: 'string' is an unused renaming of '[2]'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:29:28: We can only write a type for '[2]' by adding a type for the entire parameter here.
    type G10 = new ({ "a": string }) => void; // Error
                    ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                           ~~~~~~
!!! error TS2842: 'string' is an unused renaming of '"a"'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:30:32: We can only write a type for '"a"' by adding a type for the entire parameter here.
    type G11 = new ({ 2: string }) => void; // Error
                    ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~~~~~~
!!! error TS2842: 'string' is an unused renaming of '2'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:31:30: We can only write a type for '2' by adding a type for the entire parameter here.
    type G12 = new ({ ["a"]: string }: O) => void; // Error
                             ~~~~~~
!!! error TS2842: 'string' is an unused renaming of '["a"]'. Did you intend to use it as a type annotation?
    type G13 = new ({ [2]: string }) => void; // Error
                    ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                           ~~~~~~
!!! error TS2842: 'string' is an unused renaming of '[2]'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:33:32: We can only write a type for '[2]' by adding a type for the entire parameter here.
    
    interface I {
      method1(arg: number): any; // OK
      method2({ a: string }): any; // Error
              ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                   ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:37:24: We can only write a type for 'a' by adding a type for the entire parameter here.
    
      (arg: number): any; // OK
      ({ a: string }): any; // Error
       ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:40:17: We can only write a type for 'a' by adding a type for the entire parameter here.
    
      new (arg: number): any; // OK
      new ({ a: string }): any; // Error
           ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~~~~
!!! error TS2842: 'string' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
!!! related TS2843 renamingDestructuredPropertyInFunctionType.ts:43:21: We can only write a type for 'a' by adding a type for the entire parameter here.
    }
    
    // Below are OK but renaming should be removed from declaration emit
    function f1({ a: string }: O) { }
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const f2 = function({ a: string }: O) { };
               ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const f3 = ({ a: string, b, c }: O) => { };
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const f4 = function({ a: string }: O): typeof string { return string; };
                                                  ~~~~~~
!!! error TS4025: Exported variable 'f4' has or is using private name 'string'.
    const f5 = ({ a: string, b, c }: O): typeof string => '';
                                                ~~~~~~
!!! error TS4025: Exported variable 'f5' has or is using private name 'string'.
    const obj1 = {
      method({ a: string }: O) { }
      ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    };
    const obj2 = {
      method({ a: string }: O): typeof string { return string; }
                                       ~~~~~~
!!! error TS4025: Exported variable 'obj2' has or is using private name 'string'.
    };
    function f6({ a: string = "" }: O) { }
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const f7 = ({ a: string = "", b, c }: O) => { };
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const f8 = ({ "a": string }: O) => { };
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    function f9 ({ 2: string }) { };
             ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                 ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    function f10 ({ ["a"]: string }: O) { };
             ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const f11 =  ({ [2]: string }) => { };
                 ~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                  ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    // In below case `string` should be kept because it is used
    function f12({ a: string = "" }: O): typeof string { return "a"; }