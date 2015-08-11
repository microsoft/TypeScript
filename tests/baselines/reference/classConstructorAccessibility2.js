//// [classConstructorAccessibility2.ts]
class A {
	private constructor(a: string) // only private access
	private constructor() { 
		
	}
	
	static method() {
		var t1 = new A("test"); // private is accessible in static method
	}
	
	method() {
		var t1 = new A("1"); // private is accessible in own class
	}
}

class A_ext extends A { // Cannot extend private class A
	method() {
		var t1 = new A(""); // error - A is private and only accessible in it's own class
	}
}

class B {
	protected constructor() {
	}
	
	method() {
		var t1 = new B(); // protected is accessible in own class
	}
}

class B_ext extends B {
	method() {
		var t1 = new B(); // protected is accessible in sub-class
	}
}

class C {
	public constructor(){
		
	}
	methodA() { 
		var t1 = new C(); // public is accessible anywhere
	}
}

// check global scope
var t1 = new A(""); // error - A is private
var t2 = new B(); // error - B is protected 
var t3 = new C();

//// [classConstructorAccessibility2.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    A.method = function () {
        var t1 = new A("test"); // private is accessible in static method
    };
    A.prototype.method = function () {
        var t1 = new A("1"); // private is accessible in own class
    };
    return A;
})();
var A_ext = (function (_super) {
    __extends(A_ext, _super);
    function A_ext() {
        _super.apply(this, arguments);
    }
    A_ext.prototype.method = function () {
        var t1 = new A(""); // error - A is private and only accessible in it's own class
    };
    return A_ext;
})(A);
var B = (function () {
    function B() {
    }
    B.prototype.method = function () {
        var t1 = new B(); // protected is accessible in own class
    };
    return B;
})();
var B_ext = (function (_super) {
    __extends(B_ext, _super);
    function B_ext() {
        _super.apply(this, arguments);
    }
    B_ext.prototype.method = function () {
        var t1 = new B(); // protected is accessible in sub-class
    };
    return B_ext;
})(B);
var C = (function () {
    function C() {
    }
    C.prototype.methodA = function () {
        var t1 = new C(); // public is accessible anywhere
    };
    return C;
})();
// check global scope
var t1 = new A(""); // error - A is private
var t2 = new B(); // error - B is protected 
var t3 = new C();
