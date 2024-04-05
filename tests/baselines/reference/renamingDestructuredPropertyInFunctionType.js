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

//// [renamingDestructuredPropertyInFunctionType.js]
// GH#37454, GH#41044
// Below are OK but renaming should be removed from declaration emit
function f1({ a: string }) { }
const f2 = function ({ a: string }) { };
const f3 = ({ a: string, b, c }) => { };
const f4 = function ({ a: string }) { return string; };
const f5 = ({ a: string, b, c }) => '';
const obj1 = {
    method({ a: string }) { }
};
const obj2 = {
    method({ a: string }) { return string; }
};
function f6({ a: string = "" }) { }
const f7 = ({ a: string = "", b, c }) => { };
const f8 = ({ "a": string }) => { };
function f9({ 2: string }) { }
;
function f10({ ["a"]: string }) { }
;
const f11 = ({ [2]: string }) => { };
// In below case `string` should be kept because it is used
function f12({ a: string = "" }) { return "a"; }


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
type F6 = ({ a: string }: {
    a: any;
}) => typeof string;
type F7 = ({ a: string, b: number }: {
    a: any;
    b: any;
}) => typeof number;
type F8 = ({ a, b: number }: {
    a: any;
    b: any;
}) => typeof number;
type F9 = ([a, b, c]: [any, any, any]) => void;
type G1 = new (arg: number) => any;
type G2 = new ({ a: string }: O) => any;
type G3 = new ({ a: string, b, c }: O) => any;
type G4 = new ({ a: string }: O) => any;
type G5 = new ({ a: string, b, c }: O) => any;
type G6 = new ({ a: string }: {
    a: any;
}) => typeof string;
type G7 = new ({ a: string, b: number }: {
    a: any;
    b: any;
}) => typeof number;
type G8 = new ({ a, b: number }: {
    a: any;
    b: any;
}) => typeof number;
type G9 = new ([a, b, c]: [any, any, any]) => void;
type F10 = ({ "a": string }: {
    a: any;
}) => void;
type F11 = ({ 2: string }: {
    2: any;
}) => void;
type F12 = ({ ["a"]: string }: O) => void;
type F13 = ({ [2]: string }: {
    2: any;
}) => void;
type G10 = new ({ "a": string }: {
    a: any;
}) => void;
type G11 = new ({ 2: string }: {
    2: any;
}) => void;
type G12 = new ({ ["a"]: string }: O) => void;
type G13 = new ({ [2]: string }: {
    2: any;
}) => void;
interface I {
    method1(arg: number): any;
    method2({ a: string }: {
        a: any;
    }): any;
    (arg: number): any;
    ({ a: string }: {
        a: any;
    }): any;
    new (arg: number): any;
    new ({ a: string }: {
        a: any;
    }): any;
}
declare function f1({ a: string }: O): void;
declare const f2: ({ a: string }: O) => void;
declare const f3: ({ a: string, b, c }: O) => void;
declare const f4: ({ a: string }: O) => typeof string;
declare const f5: ({ a: string, b, c }: O) => typeof string;
declare const obj1: {
    method({ a: string }: O): void;
};
declare const obj2: {
    method({ a: string }: O): typeof string;
};
declare function f6({ a: string }: O): void;
declare const f7: ({ a: string, b, c }: O) => void;
declare const f8: ({ "a": string }: O) => void;
declare function f9({ 2: string }: {
    2: any;
}): void;
declare function f10({ ["a"]: string }: O): void;
declare const f11: ({ [2]: string }: {
    2: any;
}) => void;
declare function f12({ a: string }: O): typeof string;
