//// [tests/cases/compiler/typeConstraintsWithConstructSignatures.ts] ////

//// [typeConstraintsWithConstructSignatures.ts]
interface Constructable {
    new (): any;
}

class C<T extends Constructable> {
    constructor(public data: T, public data2: Constructable) { }
    create() {
        var x = new this.data(); // should not error
        var x2 = new this.data2(); // should not error
    }
}


//// [typeConstraintsWithConstructSignatures.js]
var C = /** @class */ (function () {
    function C(data, data2) {
        this.data = data;
        this.data2 = data2;
    }
    C.prototype.create = function () {
        var x = new this.data(); // should not error
        var x2 = new this.data2(); // should not error
    };
    return C;
}());
