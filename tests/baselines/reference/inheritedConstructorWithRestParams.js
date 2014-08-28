//// [inheritedConstructorWithRestParams.ts]
class Base {
    constructor(...a: string[]) { }
}

class Derived extends Base { }

// Ok
new Derived("", "");
new Derived("");
new Derived();

// Errors
new Derived("", 3);
new Derived(3);

//// [inheritedConstructorWithRestParams.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);
// Ok
new Derived("", "");
new Derived("");
new Derived();
// Errors
new Derived("", 3);
new Derived(3);
