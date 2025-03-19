//// [tests/cases/compiler/assignmentCompatOnNew.ts] ////

//// [assignmentCompatOnNew.ts]
class Foo{};

function bar(x: {new(): Foo;}){}

bar(Foo); // Error, but should be allowed


//// [assignmentCompatOnNew.js]
class Foo {
}
;
function bar(x) { }
bar(Foo); // Error, but should be allowed
