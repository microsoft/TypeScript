class FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(x: any) {
    }
    bar1() {  /*WScript.Echo("base bar1");*/ }
}

class Foo extends FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(a:any);
    constructor(x: any, y?: any) {
        super(x);
    }
    bar1() {  /*WScript.Echo("bar1");*/ }
}

var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1,f2,f3]);

f1.bar1();
