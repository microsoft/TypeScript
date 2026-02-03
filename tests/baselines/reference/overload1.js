//// [tests/cases/compiler/overload1.ts] ////

//// [overload1.ts]
module O {
    export class A {
        
    }

    export class B extends A {
    }

    export class C extends B {
        
    }

    export interface I {
        f(s:string):number;
        f(n:number):string;
        g(n1:number,n2:number):number;
        g(n:number):string;
        g(a:A):C;
        g(c:C):string;
        h(s1:string,s2:number):string;
        h(s1:number,s2:string):number;
    }
}

declare var x:O.I;

var e:string=x.g(new O.A()); // matches overload but bad assignment
var y:string=x.f(3); // good
y=x.f("nope"); // can't assign number to string
var z:string=x.g(x.g(3,3)); // good
z=x.g(2,2,2); // no match
z=x.g(); // no match
z=x.g(new O.B()); // ambiguous (up and down conversion)
z=x.h(2,2); // no match
z=x.h("hello",0); // good

var v=x.g;



//// [overload1.js]
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
var O;
(function (O) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    O.A = A;
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(A));
    O.B = B;
    var C = /** @class */ (function (_super) {
        __extends(C, _super);
        function C() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return C;
    }(B));
    O.C = C;
})(O || (O = {}));
var e = x.g(new O.A()); // matches overload but bad assignment
var y = x.f(3); // good
y = x.f("nope"); // can't assign number to string
var z = x.g(x.g(3, 3)); // good
z = x.g(2, 2, 2); // no match
z = x.g(); // no match
z = x.g(new O.B()); // ambiguous (up and down conversion)
z = x.h(2, 2); // no match
z = x.h("hello", 0); // good
var v = x.g;
