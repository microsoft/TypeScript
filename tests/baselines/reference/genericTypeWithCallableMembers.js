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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var C = (function () {
    function C(data, data2) {
        this.data = data;
        this.data2 = data2;
    }
    C.prototype.create = function () {
        var x = new this.data(); // no error
        var x2 = new this.data2(); // was error, shouldn't be
    };
    __names(C.prototype, ["create"]);
    return C;
}());
