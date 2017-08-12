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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = (function () {
    function User() {
    }
    User.prototype.sayHello = function () {
    };
    __names(User.prototype, ["sayHello"]);
    return User;
}());
var RegisteredUser = (function (_super) {
    __extends(RegisteredUser, _super);
    function RegisteredUser() {
        return _super !== null && _super.apply(this, arguments) || this;
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
            var _this = this;
            (function () {
                _super.sayHello.call(_this);
            });
        }
    };
    RegisteredUser.prototype.h = function () {
        function inner() {
            _super.sayHello.call(this);
        }
    };
    __names(RegisteredUser.prototype, ["f", "g", "h"]);
    return RegisteredUser;
}(User));
