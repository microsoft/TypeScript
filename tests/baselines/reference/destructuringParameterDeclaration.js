//// [destructuringParameterDeclaration.ts]
enum Foo { a }
function a({x, a}: { x: number, a: number }) { }
function a1({z: {x, y: {j}}}) { }
function a2({z: {x, y: {j}}} = { z: { x: "hi", y: { j: 1 } } }) { }
function a3({z} = {z:10}) { }
function a4({z=10}) { }
function a6({b}: { b: number|string|boolean } = { b: "hello" }) { }
a2();
a2({ z: { x: "hello" , y: { j: Foo.a } }});
a3();
a3({ z: Foo.a });
a4({});
a6({ b: 10 });
a6({ b: true });

// error
a4();
a3({});
function a5([z], z: number) { }


//// [destructuringParameterDeclaration.js]
var Foo;
(function (Foo) {
    Foo[Foo["a"] = 0] = "a";
})(Foo || (Foo = {}));
function a(_a) {
    var x = _a.x, a = _a.a;
}
function a1(_a) {
    var _b = _a.z, x = _b.x, j = _b.y.j;
}
function a2(_a) {
    var _b = (_a === void 0 ? { z: { x: "hi", y: { j: 1 } } } : _a).z, x = _b.x, j = _b.y.j;
}
function a3(_a) {
    var z = (_a === void 0 ? { z: 10 } : _a).z;
}
function a4(_a) {
    var _b = _a.z, z = _b === void 0 ? 10 : _b;
}
function a6(_a) {
    var b = (_a === void 0 ? { b: "hello" } : _a).b;
}
a2();
a2({ z: { x: "hello", y: { j: Foo.a } } });
a3();
a3({ z: Foo.a });
a4({});
a6({ b: 10 });
a6({ b: true });
// error
a4();
a3({});
function a5(_a, z) {
    var z = _a[0];
}
