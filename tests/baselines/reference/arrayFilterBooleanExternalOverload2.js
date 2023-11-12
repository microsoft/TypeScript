//// [tests/cases/compiler/arrayFilterBooleanExternalOverload2.ts] ////

//// [arrayFilterBooleanExternalOverload2.ts]
// #56013

const symbool = Symbol("MyBooleanSymbol");
declare const MyBoolean: typeof Boolean & { prototype: typeof symbool };
interface Array<T> {
    filter(predicate: typeof MyBoolean): (T extends (0 | 0n | "" | false | null | undefined) ? never : T)[];
}

declare const maybe: boolean;
{
    const id = <T>() => (t: T) => !!t;

    const result1 = (maybe ? ['foo', 'bar', undefined] : [1] ).filter(id()); // error before and after fix (so ignore type)
    // Errors before and after fix are different.
    // The error in the #56013 fixed case is:
    //                                                                ~~~~
    // error TS2345: Argument of type '(t: unknown) => boolean' is not assignable to parameter of type 'BooleanConstructor & { prototype: unique symbol; }'.
    // error TS2345:   Type '(t: unknown) => boolean' is not assignable to type 'BooleanConstructor'.
    // error TS2345:     Type '(t: unknown) => boolean' provides no match for the signature 'new (value?: any): Boolean'.


    result1;

    const result2 = ['foo', 'bar', undefined].filter(id()); // want id() = (t: string) => boolean

    result2;
}


//// [arrayFilterBooleanExternalOverload2.js]
"use strict";
// #56013
const symbool = Symbol("MyBooleanSymbol");
{
    const id = () => (t) => !!t;
    const result1 = (maybe ? ['foo', 'bar', undefined] : [1]).filter(id()); // error before and after fix (so ignore type)
    // Errors before and after fix are different.
    // The error in the #56013 fixed case is:
    //                                                                ~~~~
    // error TS2345: Argument of type '(t: unknown) => boolean' is not assignable to parameter of type 'BooleanConstructor & { prototype: unique symbol; }'.
    // error TS2345:   Type '(t: unknown) => boolean' is not assignable to type 'BooleanConstructor'.
    // error TS2345:     Type '(t: unknown) => boolean' provides no match for the signature 'new (value?: any): Boolean'.
    result1;
    const result2 = ['foo', 'bar', undefined].filter(id()); // want id() = (t: string) => boolean
    result2;
}


//// [arrayFilterBooleanExternalOverload2.d.ts]
declare const symbool: unique symbol;
declare const MyBoolean: typeof Boolean & {
    prototype: typeof symbool;
};
interface Array<T> {
    filter(predicate: typeof MyBoolean): (T extends (0 | 0n | "" | false | null | undefined) ? never : T)[];
}
declare const maybe: boolean;
