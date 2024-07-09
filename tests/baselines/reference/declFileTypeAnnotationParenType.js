//// [tests/cases/compiler/declFileTypeAnnotationParenType.ts] ////

//// [declFileTypeAnnotationParenType.ts]
class c {
    private p: string;
}

var x: (() => c)[] = [() => new c()];
var y = [() => new c()];

var k: (() => c) | string = (() => new c()) || "";
var l = (() => new c()) || "";

//// [declFileTypeAnnotationParenType.js]
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
var x = [function () { return new c(); }];
var y = [function () { return new c(); }];
var k = (function () { return new c(); }) || "";
var l = (function () { return new c(); }) || "";


//// [declFileTypeAnnotationParenType.d.ts]
declare class c {
    private p;
}
declare var x: (() => c)[];
declare var y: (() => c)[];
declare var k: (() => c) | string;
declare var l: string | (() => c);
