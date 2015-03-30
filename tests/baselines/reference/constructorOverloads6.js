//// [constructorOverloads6.ts]
declare class FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(x: any) {

    }
	bar1():void;
}

 declare class Foo extends FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(x: any, y?:any);

    bar1():void;
}

var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1,f2,f3]);

f1.bar1();


//// [constructorOverloads6.js]
var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1, f2, f3]);
f1.bar1();
