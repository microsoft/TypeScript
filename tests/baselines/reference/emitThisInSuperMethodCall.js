//// [emitThisInSuperMethodCall.ts]
class User {
    sayHello() {
    }
}

class RegisteredUser extends User {
    f() {
        () => {
            function inner() {
                super.sayHello();
            }
        };
    }
    g() {
        function inner() {
            () => {
                super.sayHello();
            }
        }
    }
    h() {
        function inner() {
            super.sayHello();
        }
    }
}


//// [emitThisInSuperMethodCall.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
                _super.sayHello.call(this);
            }
        });
    };
    RegisteredUser.prototype.g = function () {
        function inner() {
            (function () {
                _super.sayHello.call(this);
            });
        }
    };
    RegisteredUser.prototype.h = function () {
        function inner() {
            _super.sayHello.call(this);
        }
    };
    return RegisteredUser;
})(User);
