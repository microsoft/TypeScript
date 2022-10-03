//// [instanceOfAssignability.ts]
interface Base {
	foo: string|number;
	optional?: number;
}

// Derived1 is assignable to, but not a subtype of, Base
class Derived1 implements Base {
	foo: string;
}
// Derived2 is a subtype of Base that is not assignable to Derived1
class Derived2 implements Base {
	foo: number;
	optional: number;
}

class Animal {
	move;
}
class Mammal extends Animal { milk; }
class Giraffe extends Mammal { neck; }

function fn1(x: Array<number>|Array<string>|boolean) {
	if(x instanceof Array) {
		// 1.5: y: Array<number>|Array<string>
		// Want: y: Array<number>|Array<string>
		let y = x;
	}
}

function fn2(x: Base) {
	if(x instanceof Derived1) {
		// 1.5: y: Base
		// Want: y: Derived1
		let y = x;
	}
}

function fn3(x: Base|Derived1) {
	if(x instanceof Derived2) {
		// 1.5: y: Derived2
		// Want: Derived2
		let y = x;
	}
}

function fn4(x: Base|Derived2) {
	if(x instanceof Derived1) {
		// 1.5: y: {}
		// Want: Derived1
		let y = x;
	}
}

function fn5(x: Derived1) {
	if(x instanceof Derived2) {
		// 1.5: y: Derived1
		// Want: ???
		let y = x;
	}
}

function fn6(x: Animal|Mammal) {
	if(x instanceof Giraffe) {
		// 1.5: y: Derived1
		// Want: ???
		let y = x;
	}
}

function fn7(x: Array<number>|Array<string>) {
	if(x instanceof Array) {
		// 1.5: y: Array<number>|Array<string>
		// Want: y: Array<number>|Array<string>
		let y = x;
	}
}

interface Alpha { a }
interface Beta { b }
interface Gamma { c }
class ABC { a; b; c; }
function fn8(x: Alpha|Beta|Gamma) {
	if(x instanceof ABC) {
		let y = x;
	}
}




//// [instanceOfAssignability.js]
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
// Derived1 is assignable to, but not a subtype of, Base
var Derived1 = /** @class */ (function () {
    function Derived1() {
    }
    return Derived1;
}());
// Derived2 is a subtype of Base that is not assignable to Derived1
var Derived2 = /** @class */ (function () {
    function Derived2() {
    }
    return Derived2;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Mammal = /** @class */ (function (_super) {
    __extends(Mammal, _super);
    function Mammal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Mammal;
}(Animal));
var Giraffe = /** @class */ (function (_super) {
    __extends(Giraffe, _super);
    function Giraffe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Giraffe;
}(Mammal));
function fn1(x) {
    if (x instanceof Array) {
        // 1.5: y: Array<number>|Array<string>
        // Want: y: Array<number>|Array<string>
        var y = x;
    }
}
function fn2(x) {
    if (x instanceof Derived1) {
        // 1.5: y: Base
        // Want: y: Derived1
        var y = x;
    }
}
function fn3(x) {
    if (x instanceof Derived2) {
        // 1.5: y: Derived2
        // Want: Derived2
        var y = x;
    }
}
function fn4(x) {
    if (x instanceof Derived1) {
        // 1.5: y: {}
        // Want: Derived1
        var y = x;
    }
}
function fn5(x) {
    if (x instanceof Derived2) {
        // 1.5: y: Derived1
        // Want: ???
        var y = x;
    }
}
function fn6(x) {
    if (x instanceof Giraffe) {
        // 1.5: y: Derived1
        // Want: ???
        var y = x;
    }
}
function fn7(x) {
    if (x instanceof Array) {
        // 1.5: y: Array<number>|Array<string>
        // Want: y: Array<number>|Array<string>
        var y = x;
    }
}
var ABC = /** @class */ (function () {
    function ABC() {
    }
    return ABC;
}());
function fn8(x) {
    if (x instanceof ABC) {
        var y = x;
    }
}
