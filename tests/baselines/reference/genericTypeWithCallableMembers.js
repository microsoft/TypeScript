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
var C = (function () {
    function C(data, data2) {
        this.data = data;
        this.data2 = data2;
    }
    var proto_1 = C.prototype;
    proto_1.create = function () {
        var x = new this.data(); // no error
        var x2 = new this.data2(); // was error, shouldn't be
    };
    return C;
}());
