// @target: ES5
// @declaration: true

class c {
    private p: string;
}

var x: (() => c)[] = [() => new c()];
var y = [() => new c()];

var k: (() => c) | string = (() => new c()) || "";
var l = (() => new c()) || "";