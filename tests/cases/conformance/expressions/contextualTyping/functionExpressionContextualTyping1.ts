enum E { red, blue }

var g0: (n: number, s:string) => number;
var g: ((s: string, w: boolean) => void) | ((n: number) => number);
var g1: ((s: string, w: boolean) => void) | ((s: string, w: number) => string);

g1 = (j, m) => { } // Per spec, no contextual signature can be extracted in this case.
g = (k, h=true) => { k.toLowerCase() };
g = (k) => { k.toLowerCase() };
g = (i) => {
    i.toExponential();
    return i;
};  // Per spec, no contextual signature can be extracted in this case.

var h: ((s: string, w: boolean) => void) | ((s: string, w: boolean) => string);
h = (k, h) => { };

var i: typeof g0 | ((n: number, s: string) => string);
i = (foo, bar) => { return foo + 1; }
i = (foo, bar) => { return "hello"; }
var j: (name: string, num: number, boo: boolean) => void;
j = (name, number) => { };

var k: (n: E) => string = (number = 1) => { return "hello"; };
var k1: (n: {}) => string = (number = 1) => { return "hello"; };
class C<T, U> {
    constructor() {
        var k: ((j: T, k: U) => (T|U)[]) | ((j: number,k :U) => number[]) = (j, k) => {
            return [j, k];
        }   // Per spec, no contextual signature can be extracted in this case.
    }
}