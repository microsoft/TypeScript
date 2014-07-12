//// [superPropertyAccess.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyBase = (function () {
    function MyBase() {
        this.m2 = function () {
        };
        this.d1 = 42;
        this.d2 = 42;
    }
    MyBase.prototype.m1 = function (a) {
        return a;
    };
    MyBase.prototype.p1 = function () {
    };

    Object.defineProperty(MyBase.prototype, "value", {
        get: function () {
            return 0;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return MyBase;
})();

var MyDerived = (function (_super) {
    __extends(MyDerived, _super);
    function MyDerived() {
        _super.apply(this, arguments);
    }
    MyDerived.prototype.foo = function () {
        _super.prototype.m1.call(this, "hi"); // Should be allowed, method on base prototype

        var l2 = _super.prototype.m1.bind(this);

        var x = _super.prototype.m1;

        _super.prototype.m2.bind(this); // Should error, instance property, not a public instance member function

        _super.prototype.p1.call(this); // Should error, private not public instance member function

        var l1 = _super.prototype.d1;

        var l1 = _super.prototype.d2;

        _super.prototype.m1 = function (a) {
            return "";
        }; // Should be allowed, we will not restrict assignment

        _super.prototype.value = 0; // Should error, instance data property not a public instance member function

        var z = _super.prototype.value;
    };
    return MyDerived;
})(MyBase);
