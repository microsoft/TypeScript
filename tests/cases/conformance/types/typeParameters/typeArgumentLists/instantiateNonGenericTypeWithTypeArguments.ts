// it is an error to provide type arguments to a non-generic call
// all of these are errors

class C {
    x: string;
}

var c = new C<number>();

function Foo(): void { }
var r = new Foo<number>();

var f: { (): void };
var r2 = new f<number>();

var a: any;
// BUG 790977
var r2 = new a<number>();