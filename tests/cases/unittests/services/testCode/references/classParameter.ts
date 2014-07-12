// Reference to a class parameter

var p = 2;

class p { }

class foo {
    constructor (public p: any) {
    }

    public f(p) {
        this.^^[|p|] = p;
    }
    
}

var n = new foo(undefined);
n.^^[|p|] = null;