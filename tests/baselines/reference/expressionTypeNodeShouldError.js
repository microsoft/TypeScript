//// [tests/cases/compiler/expressionTypeNodeShouldError.ts] ////

//// [base.d.ts]
declare const x: "foo".charCodeAt(0);

//// [string.ts]
interface String {
    typeof<T>(x: T): T;
}

class C {
    foo() {
        const x: "".typeof(this.foo);
    }
}

const nodes = document.getElementsByTagName("li");
type ItemType = "".typeof(nodes.item(0));

//// [number.ts]
interface Number {
    typeof<T>(x: T): T;
}

class C2 {
    foo() {
        const x: 3.141592.typeof(this.foo);
    }
}

const nodes2 = document.getElementsByTagName("li");
type ItemType2 = 4..typeof(nodes.item(0));

//// [boolean.ts]
interface Boolean {
    typeof<T>(x: T): T;
}

class C3 {
    foo() {
        const x: false.typeof(this.foo);
    }
}

const nodes3 = document.getElementsByTagName("li");
type ItemType3 = true.typeof(nodes.item(0));



//// [string.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var x;
        typeof (this.foo);
    };
    return C;
}());
var nodes = document.getElementsByTagName("li");
typeof (nodes.item(0));
//// [number.js]
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo = function () {
        var x;
        typeof (this.foo);
    };
    return C2;
}());
var nodes2 = document.getElementsByTagName("li");
typeof (nodes.item(0));
//// [boolean.js]
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.prototype.foo = function () {
        var x;
        typeof (this.foo);
    };
    return C3;
}());
var nodes3 = document.getElementsByTagName("li");
typeof (nodes.item(0));
