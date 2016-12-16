//// [unusedParameterProperty2.ts]

class A {
    constructor(private used) {
        let foge = used;
        foge += "";
    }
}


//// [unusedParameterProperty2.js]
var A = (function () {
    function A(used) {
        this.used = used;
        var foge = used;
        foge += "";
    }
    return A;
}());
