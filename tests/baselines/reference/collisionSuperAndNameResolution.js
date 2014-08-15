//// [collisionSuperAndNameResolution.ts]
var console: {
    log(message: any);
}
var _super = 10; // No error
class base {
}
class Foo extends base {
    x() {
        console.log(_super); // Error as this doesnt not resolve to user defined _super
    }
}

//// [collisionSuperAndNameResolution.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var console;
var _super = 10; // No error
var base = (function () {
    function base() {
    }
    return base;
})();
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        _super.apply(this, arguments);
    }
    Foo.prototype.x = function () {
        console.log(_super);
    };
    return Foo;
})(base);
