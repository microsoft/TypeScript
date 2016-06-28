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
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var User = (function () {
    function User() {
    }
    User.prototype.sayHello = function () {
    };
    return User;
}());
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
}(User));
