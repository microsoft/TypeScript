//// [tests/cases/compiler/genericTypeWithCallableMembers.ts] ////

//// [genericTypeWithCallableMembers.ts]
interface Constructable {
    new (): Constructable;
}
 
class C<T extends Constructable> {
    constructor(public data: T, public data2: Constructable) { }
    create() {
        var x = new this.data(); // no error
        var x2 = new this.data2(); // was error, shouldn't be
    }
}


//// [genericTypeWithCallableMembers.js]
var C = /** @class */ (function () {
    function C(data, data2) {
        this.data = data;
        this.data2 = data2;
    }
    C.prototype.create = function () {
        var x = new this.data(); // no error
        var x2 = new this.data2(); // was error, shouldn't be
    };
    return C;
}());
