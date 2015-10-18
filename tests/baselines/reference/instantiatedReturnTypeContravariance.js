//// [instantiatedReturnTypeContravariance.ts]
interface B<T> {

name: string;

x(): T;

}
 
class c {

foo(): B<void> {

return null;

}

}
 
class d extends c {

foo(): B<number> {

return null;

}

}

 


//// [instantiatedReturnTypeContravariance.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var c = (function () {
    function c() {
    }
    c.prototype.foo = function () {
        return null;
    };
    return c;
})();
var d = (function (_super) {
    __extends(d, _super);
    function d() {
        _super.apply(this, arguments);
    }
    d.prototype.foo = function () {
        return null;
    };
    return d;
})(c);
