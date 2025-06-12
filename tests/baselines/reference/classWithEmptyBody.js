//// [tests/cases/conformance/classes/classDeclarations/classBody/classWithEmptyBody.ts] ////

//// [classWithEmptyBody.ts]
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

//// [classWithEmptyBody.js]
class C {
}
var c;
var o = c;
c = 1;
c = { foo: '' };
c = () => { };
class D {
    constructor() {
        return 1;
    }
}
var d;
var o = d;
d = 1;
d = { foo: '' };
d = () => { };
