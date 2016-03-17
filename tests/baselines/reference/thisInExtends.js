//// [thisInExtends.ts]
interface Constructed {
    getThis(): this;
}

interface Constructor {
    new(): Constructed;
}

declare function getConstructor(v: number): Constructor;
class C extends getConstructor(42) {
    f() {}
}

new C().getThis().f();

//// [thisInExtends.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    C.prototype.f = function () { };
    return C;
}(getConstructor(42)));
new C().getThis().f();
