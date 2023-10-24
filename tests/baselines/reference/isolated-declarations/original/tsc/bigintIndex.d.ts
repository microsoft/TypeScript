//// [tests/cases/compiler/bigintIndex.ts] ////

//// [a.ts]
interface BigIntIndex<E> {
    [index: bigint]: E; // should error
}

const arr: number[] = [1, 2, 3];
let num: number = arr[1];
num = arr["1"];
num = arr[1n]; // should error

let key: keyof any; // should be type "string | number | symbol"
key = 123;
key = "abc";
key = Symbol();
key = 123n; // should error

// Show correct usage of bigint index: explicitly convert to string
const bigNum: bigint = 0n;
const typedArray = new Uint8Array(3);
typedArray[bigNum] = 0xAA; // should error
typedArray[String(bigNum)] = 0xAA;
typedArray["1"] = 0xBB;
typedArray[2] = 0xCC;

// {1n: 123} is a syntax error; must go in separate file so BigIntIndex error is shown
//// [b.ts]
// BigInt cannot be used as an object literal property
const a = {1n: 123};
const b = {[1n]: 456};
const c = {[bigNum]: 789};


/// [Declarations] ////



//// [/.src/a.d.ts]
interface BigIntIndex<E> {
    [index: bigint]: E;
}
declare const arr: number[];
declare let num: number;
declare let key: keyof any;
declare const bigNum: bigint;
declare const typedArray: invalid;

//// [/.src/b.d.ts]
declare const a: {};
declare const b: {
    [1n]: number;
};
declare const c: invalid;
/// [Errors] ////

a.ts(2,6): error TS1268: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.
a.ts(8,11): error TS2538: Type '1n' cannot be used as an index type.
a.ts(14,1): error TS2322: Type 'bigint' is not assignable to type 'string | number | symbol'.
a.ts(18,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
a.ts(19,12): error TS2538: Type 'bigint' cannot be used as an index type.
b.ts(2,12): error TS1136: Property assignment expected.
b.ts(2,14): error TS1005: ';' expected.
b.ts(2,19): error TS1128: Declaration or statement expected.
b.ts(3,12): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
b.ts(4,12): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
b.ts(4,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== a.ts (5 errors) ====
    interface BigIntIndex<E> {
        [index: bigint]: E; // should error
         ~~~~~
!!! error TS1268: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.
    }
    
    const arr: number[] = [1, 2, 3];
    let num: number = arr[1];
    num = arr["1"];
    num = arr[1n]; // should error
              ~~
!!! error TS2538: Type '1n' cannot be used as an index type.
    
    let key: keyof any; // should be type "string | number | symbol"
    key = 123;
    key = "abc";
    key = Symbol();
    key = 123n; // should error
    ~~~
!!! error TS2322: Type 'bigint' is not assignable to type 'string | number | symbol'.
    
    // Show correct usage of bigint index: explicitly convert to string
    const bigNum: bigint = 0n;
    const typedArray = new Uint8Array(3);
                       ~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    typedArray[bigNum] = 0xAA; // should error
               ~~~~~~
!!! error TS2538: Type 'bigint' cannot be used as an index type.
    typedArray[String(bigNum)] = 0xAA;
    typedArray["1"] = 0xBB;
    typedArray[2] = 0xCC;
    
    // {1n: 123} is a syntax error; must go in separate file so BigIntIndex error is shown
==== b.ts (6 errors) ====
    // BigInt cannot be used as an object literal property
    const a = {1n: 123};
               ~~
!!! error TS1136: Property assignment expected.
                 ~
!!! error TS1005: ';' expected.
                      ~
!!! error TS1128: Declaration or statement expected.
    const b = {[1n]: 456};
               ~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
    const c = {[bigNum]: 789};
               ~~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
               ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    