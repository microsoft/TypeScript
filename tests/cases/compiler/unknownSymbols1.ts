var x = asdf;
var y: asdf;

function foo(x: asdf, y: number): asdf { }
function foo2() {
    return asdf;
}

var z = <asdf>x; // should be an error

class C<T> {
    foo: asdf;
    bar: C<asdf>;
}

class C2 implements asdf { }
interface I extends adsf { }

class C3 { constructor(x: any) { } }
class C4 extends C3 {
    constructor() {
        super(asdf);
    }
}

var x2 = this.asdf; // no error, this is any

class C5 {
    constructor() {
        this.asdf = asdf;
    }
}