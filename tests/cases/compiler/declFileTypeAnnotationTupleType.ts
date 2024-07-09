// @target: ES5
// @declaration: true

class c {
}
module m {
    export class c {
    }
    export class g<T> {
    }
}
class g<T> {
}

// Just the name
var k: [c, m.c] = [new c(), new m.c()];
var l = k;

var x: [g<string>, m.g<number>, () => c] = [new g<string>(), new m.g<number>(), () => new c()];
var y = x;