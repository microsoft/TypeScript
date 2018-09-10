//// [abstractPropertyInConstructor.ts]
abstract class AbstractClass {
    constructor(str: string, other: AbstractClass) {
        this.method(parseInt(str));
        let val = this.prop.toLowerCase();

        if (!str) {
            this.prop = "Hello World";
        }
        this.cb(str);

        // OK, reference is inside function
        const innerFunction = () => {
            return this.prop;
        }

        // OK, references are to another instance
        other.cb(other.prop);
    }

    abstract prop: string;
    abstract cb: (s: string) => void;

    abstract method(num: number): void;

    other = this.prop;
    fn = () => this.prop;

    method2() {
        this.prop = this.prop + "!";
    }
}

class User {
    constructor(a: AbstractClass) {
        a.prop;
        a.cb("hi");
        a.method(12);
        a.method2();
    }
}


//// [abstractPropertyInConstructor.js]
var AbstractClass = /** @class */ (function () {
    function AbstractClass(str, other) {
        var _this = this;
        this.other = this.prop;
        this.fn = function () { return _this.prop; };
        this.method(parseInt(str));
        var val = this.prop.toLowerCase();
        if (!str) {
            this.prop = "Hello World";
        }
        this.cb(str);
        // OK, reference is inside function
        var innerFunction = function () {
            return _this.prop;
        };
        // OK, references are to another instance
        other.cb(other.prop);
    }
    AbstractClass.prototype.method2 = function () {
        this.prop = this.prop + "!";
    };
    return AbstractClass;
}());
var User = /** @class */ (function () {
    function User(a) {
        a.prop;
        a.cb("hi");
        a.method(12);
        a.method2();
    }
    return User;
}());
