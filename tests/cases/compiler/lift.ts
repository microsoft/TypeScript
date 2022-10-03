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
