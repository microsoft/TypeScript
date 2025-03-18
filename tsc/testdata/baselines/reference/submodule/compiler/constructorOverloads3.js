//// [tests/cases/compiler/constructorOverloads3.ts] ////

//// [constructorOverloads3.ts]
declare class FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(x: any);
}


 class Foo extends FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(a: any);
    constructor(x: any, y?: any) { }
    bar1() { /*WScript.Echo("Yo");*/}
}

var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1,f2,f3]);

f1.bar1();


//// [constructorOverloads3.js]
class Foo extends FooBase {
    constructor(x, y) { }
    bar1() { }
}
var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1, f2, f3]);
f1.bar1();
