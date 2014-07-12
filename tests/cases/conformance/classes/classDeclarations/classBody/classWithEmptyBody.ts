class C {
}

var c: C;
var o: {} = c;
c = 1;
c = { foo: '' }
c = () => { }

class D {
    constructor() {
        return 1;
    }
}

var d: D;
var o: {} = d;
d = 1;
d = { foo: '' }
d = () => { }