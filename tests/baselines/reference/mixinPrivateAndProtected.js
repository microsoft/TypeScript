//// [tests/cases/compiler/mixinPrivateAndProtected.ts] ////

//// [mixinPrivateAndProtected.ts]
// Repro from #13830

type Constructor<T> = new(...args: any[]) => T;

class A {
    public pb: number = 2;
    protected ptd: number = 1;
    private pvt: number = 0;
}

function mixB<T extends Constructor<{}>>(Cls: T) {
    return class extends Cls {
        protected ptd: number = 10;
        private pvt: number = 0;
    };
}

function mixB2<T extends Constructor<A>>(Cls: T) {
    return class extends Cls {
        protected ptd: number = 10;
    };
}

const
    AB = mixB(A),
    AB2 = mixB2(A);

function mixC<T extends Constructor<{}>>(Cls: T) {
    return class extends Cls {
        protected ptd: number = 100;
        private pvt: number = 0;
    };
}

const
    AB2C = mixC(AB2),
    ABC = mixC(AB);

const
    a = new A(),
    ab = new AB(),
    abc = new ABC(),
    ab2c = new AB2C();

a.pb.toFixed();
a.ptd.toFixed();    // Error
a.pvt.toFixed();    // Error

ab.pb.toFixed();
ab.ptd.toFixed();   // Error
ab.pvt.toFixed();   // Error

abc.pb.toFixed();
abc.ptd.toFixed();  // Error
abc.pvt.toFixed();  // Error

ab2c.pb.toFixed();
ab2c.ptd.toFixed(); // Error
ab2c.pvt.toFixed(); // Error

// Repro from #13924

class Person {
	constructor(public name: string) {}

	protected myProtectedFunction() {
		// do something
	}
}

function PersonMixin<T extends Constructor<Person>>(Base: T) {
	return class extends Base {
		constructor(...args: any[]) {
			super(...args);
		}

		myProtectedFunction() {
			super.myProtectedFunction();
			// do more things
		}
	};
}

class Customer extends PersonMixin(Person) {
	accountBalance: number;
    f() {
    }
}


//// [mixinPrivateAndProtected.js]
// Repro from #13830
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
var A = /** @class */ (function () {
    function A() {
        this.pb = 2;
        this.ptd = 1;
        this.pvt = 0;
    }
    return A;
}());
function mixB(Cls) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ptd = 10;
            _this.pvt = 0;
            return _this;
        }
        return class_1;
    }(Cls));
}
function mixB2(Cls) {
    return /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ptd = 10;
            return _this;
        }
        return class_2;
    }(Cls));
}
var AB = mixB(A), AB2 = mixB2(A);
function mixC(Cls) {
    return /** @class */ (function (_super) {
        __extends(class_3, _super);
        function class_3() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ptd = 100;
            _this.pvt = 0;
            return _this;
        }
        return class_3;
    }(Cls));
}
var AB2C = mixC(AB2), ABC = mixC(AB);
var a = new A(), ab = new AB(), abc = new ABC(), ab2c = new AB2C();
a.pb.toFixed();
a.ptd.toFixed(); // Error
a.pvt.toFixed(); // Error
ab.pb.toFixed();
ab.ptd.toFixed(); // Error
ab.pvt.toFixed(); // Error
abc.pb.toFixed();
abc.ptd.toFixed(); // Error
abc.pvt.toFixed(); // Error
ab2c.pb.toFixed();
ab2c.ptd.toFixed(); // Error
ab2c.pvt.toFixed(); // Error
// Repro from #13924
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.myProtectedFunction = function () {
        // do something
    };
    return Person;
}());
function PersonMixin(Base) {
    return /** @class */ (function (_super) {
        __extends(class_4, _super);
        function class_4() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.apply(this, args) || this;
        }
        class_4.prototype.myProtectedFunction = function () {
            _super.prototype.myProtectedFunction.call(this);
            // do more things
        };
        return class_4;
    }(Base));
}
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Customer.prototype.f = function () {
    };
    return Customer;
}(PersonMixin(Person)));
