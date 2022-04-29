//// [objectTypeHidingMembersOfExtendedObject.ts]
class A {
    foo: string;
}

class B extends A {
    bar: string;
}

interface Object {
    data: A;
    [x: string]: Object;
}

class C {
    valueOf() { }
    data: B;
    [x: string]: any;
}

var c: C;
var r1: void = c.valueOf();
var r1b: B = c.data;
var r1c = r1b['hm']; // should be 'Object'
var r1d = c['hm']; // should be 'any'

interface I {
    valueOf(): void;
    data: B;
    [x: string]: any;
}

var i: I;
var r2: void = i.valueOf();
var r2b: B = i.data;
var r2c = r2b['hm']; // should be 'Object'
var r2d = i['hm']; // should be 'any'

var a = {
    valueOf: () => { },
    data: new B()
}

var r3: void = a.valueOf();
var r3b: B = a.data;
var r3c = r3b['hm']; // should be 'Object'
var r3d = i['hm'];

var b: {
    valueOf(): void;
    data: B;
    [x: string]: any;
}

var r4: void = b.valueOf();

//// [objectTypeHidingMembersOfExtendedObject.js]
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
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.valueOf = function () { };
    return C;
}());
var c;
var r1 = c.valueOf();
var r1b = c.data;
var r1c = r1b['hm']; // should be 'Object'
var r1d = c['hm']; // should be 'any'
var i;
var r2 = i.valueOf();
var r2b = i.data;
var r2c = r2b['hm']; // should be 'Object'
var r2d = i['hm']; // should be 'any'
var a = {
    valueOf: function () { },
    data: new B()
};
var r3 = a.valueOf();
var r3b = a.data;
var r3c = r3b['hm']; // should be 'Object'
var r3d = i['hm'];
var b;
var r4 = b.valueOf();
