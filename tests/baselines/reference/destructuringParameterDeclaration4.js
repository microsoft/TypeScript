//// [destructuringParameterDeclaration4.ts]
interface F { }
class C implements F{
}
function foo<T>(...a: T[]) { }
function foo1<T extends String>(...a: T[]) { }
function bar<T extends C>({x} = { x: new C() }) { }
function baz<T extends F>({x}: { x: F }) { }
function baz1<T extends C>({x}: { x: C }) { }
function baz2<T extends C>({x}: { x: C }) { }

var obj = new C();
baz1({ x: obj });
baz({ x: new C() });
baz({ x: {} });
foo("hello", 1, 2);
foo<number|string>("hello", 1, 2);
foo("hello", "world");



//// [destructuringParameterDeclaration4.js]
var C = (function () {
    function C() {
    }
    return C;
})();
function foo() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
function foo1() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
function bar(_a) {
    var x = (_a === void 0 ? { x: new C() } : _a).x;
}
function baz(_a) {
    var x = _a.x;
}
function baz1(_a) {
    var x = _a.x;
}
function baz2(_a) {
    var x = _a.x;
}
var obj = new C();
baz1({ x: obj });
baz({ x: new C() });
baz({ x: {} });
foo("hello", 1, 2);
foo("hello", 1, 2);
foo("hello", "world");
