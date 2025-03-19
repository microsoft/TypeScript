//// [tests/cases/compiler/lift.ts] ////

//// [lift.ts]
class B {
    constructor(public y:number) {
    }
    public ll:number;  // to be shadowed
}

class C extends B {
    constructor(y:number,z:number,w:number) {
        super(y)
        var x=10+w;
        var ll=x*w;
    }

    public liftxyz () { return x+z+this.y; }
    public liftxylocllz () { return x+z+this.y+this.ll; }
}


//// [lift.js]
class B {
    y;
    constructor(y) {
        this.y = y;
    }
    ll; // to be shadowed
}
class C extends B {
    constructor(y, z, w) {
        super(y);
        var x = 10 + w;
        var ll = x * w;
    }
    liftxyz() { return x + z + this.y; }
    liftxylocllz() { return x + z + this.y + this.ll; }
}
