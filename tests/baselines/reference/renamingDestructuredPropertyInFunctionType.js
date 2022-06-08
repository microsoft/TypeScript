//// [renamingDestructuredPropertyInFunctionType.ts]
// GH#37454, GH#41044

type O = { a: string; b: number; c: number; };
type F1 = (arg: number) => any; // OK
type F2 = ({ a: string }: O) => any; // Error
type F3 = ({ a: string, b, c }: O) => any; // Error
type F4 = ({ a: string }: O) => any; // Error
type F5 = ({ a: string, b, c }: O) => any; // Error
type F6 = ({ a: string }) => typeof string; // OK
type F7 = ({ a: string, b: number }) => typeof number; // Error
type F8 = ({ a, b: number }) => typeof number; // OK
type F9 = ([a, b, c]) => void; // Error

type G1 = (arg: number) => any; // OK
type G2 = ({ a: string }: O) => any; // Error
type G3 = ({ a: string, b, c }: O) => any; // Error
type G4 = ({ a: string }: O) => any; // Error
type G5 = ({ a: string, b, c }: O) => any; // Error
type G6 = ({ a: string }) => typeof string; // OK
type G7 = ({ a: string, b: number }) => typeof number; // Error
type G8 = ({ a, b: number }) => typeof number; // OK
type G9 = ([a, b, c]) => void; // Error

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

// In below case `string` should be kept because it is used
function f6({ a: string }: O): typeof string { return "a"; }

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
// In below case `string` should be kept because it is used
function f6({ a: string }) { return "a"; }


//// [renamingDestructuredPropertyInFunctionType.d.ts]
declare type O = {
    a: string;
    b: number;
    c: number;
};
declare type F1 = (arg: number) => any;
declare type F2 = ({ a }: O) => any;
declare type F3 = ({ a, b, c }: O) => any;
declare type F4 = ({ a }: O) => any;
declare type F5 = ({ a, b, c }: O) => any;
declare type F6 = ({ a: string }: {
    a: any;
}) => typeof string;
declare type F7 = ({ a, b: number }: {
    a: any;
    b: any;
}) => typeof number;
declare type F8 = ({ a, b: number }: {
    a: any;
    b: any;
}) => typeof number;
declare type F9 = ([a, b, c]: [any, any, any]) => void;
declare type G1 = (arg: number) => any;
declare type G2 = ({ a }: O) => any;
declare type G3 = ({ a, b, c }: O) => any;
declare type G4 = ({ a }: O) => any;
declare type G5 = ({ a, b, c }: O) => any;
declare type G6 = ({ a: string }: {
    a: any;
}) => typeof string;
declare type G7 = ({ a, b: number }: {
    a: any;
    b: any;
}) => typeof number;
declare type G8 = ({ a, b: number }: {
    a: any;
    b: any;
}) => typeof number;
declare type G9 = ([a, b, c]: [any, any, any]) => void;
interface I {
    method1(arg: number): any;
    method2({ a }: {
        a: any;
    }): any;
    (arg: number): any;
    ({ a }: {
        a: any;
    }): any;
    new (arg: number): any;
    new ({ a }: {
        a: any;
    }): any;
}
declare function f1({ a }: O): void;
declare const f2: ({ a: string }: O) => void;
declare const f3: ({ a: string, b, c }: O) => void;
declare const f4: ({ a: string }: O) => string;
declare const f5: ({ a: string, b, c }: O) => string;
declare const obj1: {
    method({ a: string }: O): void;
};
declare const obj2: {
    method({ a: string }: O): string;
};
declare function f6({ a: string }: O): typeof string;
