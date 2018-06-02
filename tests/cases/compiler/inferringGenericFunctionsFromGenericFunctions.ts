// @strict: true
export {}


// example from https://github.com/Microsoft/TypeScript/issues/9366

function flip<a, b, c>(f: (a: a, b: b) => c): (b: b, a: a) => c {
    return (b: b, a: a) => f(a, b);
}
function zip<T, U>(x: T, y: U): [T, U] {
    return [x, y];
}

const flipped = flip(zip);
var expected: <T, U>(y: U, x: T) => [T, U] = flipped;

const actualCallResult = flipped("test", 1234)
const expectedResult: [number, string] = actualCallResult;




// from https://github.com/Microsoft/TypeScript/issues/16414

declare function compose<A, B, C>(f: (x: A) => B, g: (y: B) => C): (x: A) => C;
declare function box<T>(x: T): { value: T };
declare function list<U>(x: U): U[];

const composed = compose(list, box);
const expectedComposed: <U>(u: U) => { value: U[] } = composed;


const callComposed = composed("test");
const expectedCallComposed: { value: string[] } = callComposed;