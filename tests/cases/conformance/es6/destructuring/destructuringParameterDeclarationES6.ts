//@target: es6
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
