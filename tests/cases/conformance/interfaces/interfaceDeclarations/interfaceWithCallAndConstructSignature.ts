interface Foo {
    (): number;
    new (): any;
}

var f: Foo;
var r = f();
var r2 = new f();