// @strict: true
// @target: es2020
// @noEmit: true

// Example: different error code altogether

interface ThroughStream {
    a: string;
}
interface ReadStream {
    f: string;
    g: number;
    h: boolean;
    i: BigInt;
    j: symbol;
}
function foo(): ReadStream {
    return undefined as any as ThroughStream;
}
function bar(): ReadStream {
    return undefined as any as ThroughStream;
}

// Example: different elaboration

type Wrap = {
    someProp: Bar<number>;
}
type OtherWrap = {
    someProp: Foo<string>;
}
type Foo<T> = {
    foo: { what: T };
}
type Bar<T> = {
    foo: { what: T };
} | boolean;

function fun(param: Wrap): void {}

declare let fooStr: Foo<string>;
declare let otherWrap: OtherWrap;

let a: Bar<number> = fooStr;

fun(otherWrap);