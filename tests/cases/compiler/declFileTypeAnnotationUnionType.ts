// @target: ES5
// @declaration: true

class c {
    private p: string;
}
module m {
    export class c {
        private q: string;
    }
    export class g<T> {
        private r: string;
    }
}
class g<T> {
    private s: string;
}

// Just the name
var k: c | m.c = new c() || new m.c();
var l = new c() || new m.c();

var x: g<string> | m.g<number> |  (() => c) = new g<string>() ||  new m.g<number>() || (() => new c());
var y = new g<string>() || new m.g<number>() || (() => new c());