//// [superInLambdas.ts]
class User {
    name: string = "Bob";
    sayHello(): void {
        //console.log("Hello, " + this.name);
    }
}

class RegisteredUser extends User {
    name: string = "Frank";
    constructor() {
        super();

        // super call in a constructor
        super.sayHello();

        // super call in a lambda in a constructor 
        var x = () => super.sayHello();
    }
    sayHello(): void {
        // super call in a method
        super.sayHello();

        // super call in a lambda in a method
       var x = () => super.sayHello();
    }
}
class RegisteredUser2 extends User {
    name: string = "Joe";
    constructor() {
        super();

        // super call in a nested lambda in a constructor 
        var x = () => () => () => super.sayHello();
    }
    sayHello(): void {
        // super call in a nested lambda in a method
        var x = () => () => () => super.sayHello();
    }
}

class RegisteredUser3 extends User {
    name: string = "Sam";
    constructor() {
        super();

        // super property in a nested lambda in a constructor 
        var superName = () => () => () => super.name;
    }
    sayHello(): void {
        // super property in a nested lambda in a method
        var superName = () => () => () => super.name;
    }
}

class RegisteredUser4 extends User {
    name: string = "Mark";
    constructor() {
        super();

        // super in a nested lambda in a constructor 
        var x = () => () => super;
    }
    sayHello(): void {
        // super in a nested lambda in a method
        var x = () => () => super;
    }
}

//// [superInLambdas.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User() {
        this.name = "Bob";
    }
    User.prototype.sayHello = function () {
        //console.log("Hello, " + this.name);
    };
    return User;
}());
var RegisteredUser = /** @class */ (function (_super) {
    __extends(RegisteredUser, _super);
    function RegisteredUser() {
        var _this = _super.call(this) || this;
        _this.name = "Frank";
        // super call in a constructor
        _super.prototype.sayHello.call(_this);
        // super call in a lambda in a constructor 
        var x = function () { return _super.prototype.sayHello.call(_this); };
        return _this;
    }
    RegisteredUser.prototype.sayHello = function () {
        var _this = this;
        // super call in a method
        _super.prototype.sayHello.call(this);
        // super call in a lambda in a method
        var x = function () { return _super.prototype.sayHello.call(_this); };
    };
    return RegisteredUser;
}(User));
var RegisteredUser2 = /** @class */ (function (_super) {
    __extends(RegisteredUser2, _super);
    function RegisteredUser2() {
        var _this = _super.call(this) || this;
        _this.name = "Joe";
        // super call in a nested lambda in a constructor 
        var x = function () { return function () { return function () { return _super.prototype.sayHello.call(_this); }; }; };
        return _this;
    }
    RegisteredUser2.prototype.sayHello = function () {
        var _this = this;
        // super call in a nested lambda in a method
        var x = function () { return function () { return function () { return _super.prototype.sayHello.call(_this); }; }; };
    };
    return RegisteredUser2;
}(User));
var RegisteredUser3 = /** @class */ (function (_super) {
    __extends(RegisteredUser3, _super);
    function RegisteredUser3() {
        var _this = _super.call(this) || this;
        _this.name = "Sam";
        // super property in a nested lambda in a constructor 
        var superName = function () { return function () { return function () { return _super.prototype.name; }; }; };
        return _this;
    }
    RegisteredUser3.prototype.sayHello = function () {
        // super property in a nested lambda in a method
        var superName = function () { return function () { return function () { return _super.prototype.name; }; }; };
    };
    return RegisteredUser3;
}(User));
var RegisteredUser4 = /** @class */ (function (_super) {
    __extends(RegisteredUser4, _super);
    function RegisteredUser4() {
        var _this = _super.call(this) || this;
        _this.name = "Mark";
        // super in a nested lambda in a constructor 
        var x = function () { return function () { return _super.prototype.; }; };
        return _this;
    }
    RegisteredUser4.prototype.sayHello = function () {
        // super in a nested lambda in a method
        var x = function () { return function () { return _super.prototype.; }; };
    };
    return RegisteredUser4;
}(User));
