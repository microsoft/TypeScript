//// [renamingDestructuredPropertyInFunctionType.ts]
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

//// [renamingDestructuredPropertyInFunctionType.js]


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
declare type F6 = ({ a }: {
    a: any;
}) => typeof string;
declare type F7 = ({ a, b }: {
    a: any;
    b: any;
}) => typeof number;
declare type F8 = ({ a, b }: {
    a: any;
    b: any;
}) => typeof number;
declare type F9 = ([a, b, c]: [any, any, any]) => void;
declare type G1 = (arg: number) => any;
declare type G2 = ({ a }: O) => any;
declare type G3 = ({ a, b, c }: O) => any;
declare type G4 = ({ a }: O) => any;
declare type G5 = ({ a, b, c }: O) => any;
declare type G6 = ({ a }: {
    a: any;
}) => typeof string;
declare type G7 = ({ a, b }: {
    a: any;
    b: any;
}) => typeof number;
declare type G8 = ({ a, b }: {
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
