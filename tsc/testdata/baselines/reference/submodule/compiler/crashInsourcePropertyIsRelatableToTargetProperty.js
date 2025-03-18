//// [tests/cases/compiler/crashInsourcePropertyIsRelatableToTargetProperty.ts] ////

//// [crashInsourcePropertyIsRelatableToTargetProperty.ts]
class C {
    private x = 1;
}
class D extends C { }
function foo(x: "hi", items: string[]): typeof foo;
function foo(x: string, items: string[]): typeof foo {
    return null;
}
var a: D = foo("hi", []);


//// [crashInsourcePropertyIsRelatableToTargetProperty.js]
class C {
    x = 1;
}
class D extends C {
}
function foo(x, items) {
    return null;
}
var a = foo("hi", []);
