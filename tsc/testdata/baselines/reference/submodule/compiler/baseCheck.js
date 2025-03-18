//// [tests/cases/compiler/baseCheck.ts] ////

//// [baseCheck.ts]
class C { constructor(x: number, y: number) { } }
class ELoc extends C {
    constructor(x: number) {
        super(0, x);
    }
}
class ELocVar extends C {  
    constructor(x: number) {
        super(0, loc);
    }

    m() {
        var loc=10;
    }
}

class D extends C { constructor(public z: number) { super(this.z) }  } // too few params
class E extends C { constructor(public z: number) { super(0, this.z) } }
class F extends C { constructor(public z: number) { super("hello", this.z) } } // first param type

function f() {
    if (x<10) {
      x=11;
    }
    else {
        x=12;
    }
}


//// [baseCheck.js]
class C {
    constructor(x, y) { }
}
class ELoc extends C {
    constructor(x) {
        super(0, x);
    }
}
class ELocVar extends C {
    constructor(x) {
        super(0, loc);
    }
    m() {
        var loc = 10;
    }
}
class D extends C {
    z;
    constructor(z) {
        this.z = z;
        super(this.z);
    }
}
class E extends C {
    z;
    constructor(z) {
        this.z = z;
        super(0, this.z);
    }
}
class F extends C {
    z;
    constructor(z) {
        this.z = z;
        super("hello", this.z);
    }
}
function f() {
    if (x < 10) {
        x = 11;
    }
    else {
        x = 12;
    }
}
