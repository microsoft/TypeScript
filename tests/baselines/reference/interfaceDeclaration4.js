//// [interfaceDeclaration4.ts]
// Import this module when test harness supports external modules. Also remove the internal module below.
// import Foo = require("interfaceDeclaration5")
module Foo {
    export interface I1 { item: string; }
    export class C1 { }
}

class C1 implements Foo.I1 {
	public item:string;
}

// Allowed
interface I2 extends Foo.I1 {
	item:string;
}

// Negative Case
interface I3 extends Foo.I1 {
    item:number;
}

interface I4 extends Foo.I1 {
    token:string;
}

// Err - not implemented item
class C2 implements I4 {
    public token: string;
}

interface I5 extends Foo { }

// Negative case
interface I6 extends Foo.C1 { }

class C3 implements Foo.I1 { }

// Negative case 
interface Foo.I1 { }


//// [interfaceDeclaration4.js]
// Import this module when test harness supports external modules. Also remove the internal module below.
// import Foo = require("interfaceDeclaration5")
var Foo;
(function (Foo) {
    var C1 = /** @class */ (function () {
        function C1() {
        }
        return C1;
    }());
    Foo.C1 = C1;
})(Foo || (Foo = {}));
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
// Err - not implemented item
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
I1;
{ }
