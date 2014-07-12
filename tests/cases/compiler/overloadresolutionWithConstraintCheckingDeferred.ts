interface A { x }
interface B { x; y }
interface C { z }
interface D { q }

class G<T extends A> {
    constructor(x: T) { }
}

declare function foo(arg: (x: D) => number): string;
declare function foo(arg: (x: C) => any): string;
declare function foo(arg: (x: B) => any): number;

var result: number = foo(x => new G(x)); // No error, returns number

var result2: number = foo(x => new G<typeof x>(x)); // No error, returns number

var result3: string = foo(x => { // returns string because the C overload is picked
    var y: G<typeof x>; // error that C does not satisfy constraint
    return y;
});
