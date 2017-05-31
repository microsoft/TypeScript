//// [disallowLineTerminatorBeforeArrow.ts]
var f1 = ()
    => { }
var f2 = (x: string, y: string) /*
  */  => { }
var f3 = (x: string, y: number, ...rest)
    => { }
var f4 = (x: string, y: number, ...rest) /*
  */  => { }
var f5 = (...rest)
    => { }
var f6 = (...rest) /*
  */  => { }
var f7 = (x: string, y: number, z = 10)
    => { }
var f8 = (x: string, y: number, z = 10) /*
  */  => { }
var f9 = (a: number): number
    => a;
var f10 = (a: number) :
  number
    => a
var f11 = (a: number): number /*
    */ => a;
var f12 = (a: number) :
  number /*
    */ => a

// Should be valid.
var f11 = (a: number
    ) => a;

// Should be valid.
var f12 = (a: number)
    : number => a;

// Should be valid.
var f13 = (a: number):
    number => a;

// Should be valid.
var f14 = () /* */ => {}

// Should be valid.
var f15 = (a: number): number /* */ => a

// Should be valid.
var f16 = (a: number, b = 10):
  number /* */ => a + b;

function foo(func: () => boolean) { }
foo(()
    => true);
foo(()
    => { return false; });

module m {
    class City {
        constructor(x: number, thing = ()
            => 100) {
        }

        public m = ()
            => 2 * 2 * 2
    }

    export enum Enum {
        claw = (()
            => 10)()
    }

    export var v = x
        => new City(Enum.claw);
}


//// [disallowLineTerminatorBeforeArrow.js]
var f1 = function f1() { };
var f2 = function f2(x, y) { };
var f3 = function f3(x, y) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
};
var f4 = function f4(x, y) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
};
var f5 = function f5() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
};
var f6 = function f6() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
};
var f7 = function f7(x, y, z) {
    if (z === void 0) { z = 10; }
};
var f8 = function f8(x, y, z) {
    if (z === void 0) { z = 10; }
};
var f9 = function f9(a) { return a; };
var f10 = function f10(a) { return a; };
var f11 = function f11(a) { return a; };
var f12 = function f12(a) { return a; };
// Should be valid.
var f11 = function f11(a) { return a; };
// Should be valid.
var f12 = function f12(a) { return a; };
// Should be valid.
var f13 = function f13(a) { return a; };
// Should be valid.
var f14 = function f14() { };
// Should be valid.
var f15 = function f15(a) { return a; };
// Should be valid.
var f16 = function f16(a, b) {
    if (b === void 0) { b = 10; }
    return a + b;
};
function foo(func) { }
foo(function () { return true; });
foo(function () { return false; });
var m;
(function (m) {
    var City = (function () {
        function City(x, thing) {
            if (thing === void 0) { thing = function () { return 100; }; }
            this.m = function () { return 2 * 2 * 2; };
        }
        return City;
    }());
    var Enum;
    (function (Enum) {
        Enum[Enum["claw"] = (function () { return 10; })()] = "claw";
    })(Enum = m.Enum || (m.Enum = {}));
    m.v = function (x) { return new City(Enum.claw); };
})(m || (m = {}));
