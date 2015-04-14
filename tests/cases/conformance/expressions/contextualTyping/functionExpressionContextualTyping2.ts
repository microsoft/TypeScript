var g0: (n: number, s: string) => number
var i: typeof g0 | ((n: number, s: string) => string);
i = (foo, bar) => { return true; }

class C<T> { }

var j: (c: C<Number>) => number = (j) => { return 1; }
class C<T, U> {
    constructor() {
        var k: (j: T, k: U) => (T|U)[] = (j = 1, k = 0) => {
            return [j, k];
        }
    }
}