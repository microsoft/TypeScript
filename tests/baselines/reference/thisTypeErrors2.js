//// [thisTypeErrors2.ts]
class Base {
    constructor(a: this) {
    }
}
class Generic<T> {
}
class Derived {
    n: number;
    constructor(public host: Generic<this>) {
        let self: this = this;
        this.n = 12;
    }
}


//// [thisTypeErrors2.js]
var Base = /** @class */ (function () {
    function Base(a) {
    }
    return Base;
}());
var Generic = /** @class */ (function () {
    function Generic() {
    }
    return Generic;
}());
var Derived = /** @class */ (function () {
    function Derived(host) {
        this.host = host;
        var self = this;
        this.n = 12;
    }
    return Derived;
}());
