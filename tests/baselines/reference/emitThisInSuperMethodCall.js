//// [emitThisInSuperMethodCall.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var User = (function () {
    function User() {
    }
    User.prototype.sayHello = function () {
    };
    return User;
})();

var RegisteredUser = (function (_super) {
    __extends(RegisteredUser, _super);
    function RegisteredUser() {
        _super.apply(this, arguments);
    }
    RegisteredUser.prototype.f = function () {
        (function () {
            function inner() {
                _super.prototype.sayHello.call(this);
            }
        });
    };
    RegisteredUser.prototype.g = function () {
        function inner() {
            var _this = this;
            (function () {
                _super.prototype.sayHello.call(_this);
            });
        }
    };
    RegisteredUser.prototype.h = function () {
        function inner() {
            _super.prototype.sayHello.call(this);
        }
    };
    return RegisteredUser;
})(User);
