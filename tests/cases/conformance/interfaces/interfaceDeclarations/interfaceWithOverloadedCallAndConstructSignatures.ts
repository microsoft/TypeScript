interface Foo {
    (): number;
    (x: string): number;

    new (): any;
    new (x: string): Object;
}

var f: Foo;
var r1 = f();
var r2 = f('');
var r3 = new f();
var r4 = new f('');