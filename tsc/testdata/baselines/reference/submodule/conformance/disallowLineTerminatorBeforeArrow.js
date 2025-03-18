//// [tests/cases/conformance/es6/arrowFunction/disallowLineTerminatorBeforeArrow.ts] ////

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
var f1 = () => { };
var f2 = (x, y) => { };
var f3 = (x, y, ...rest) => { };
var f4 = (x, y, ...rest) => { };
var f5 = (...rest) => { };
var f6 = (...rest) => { };
var f7 = (x, y, z = 10) => { };
var f8 = (x, y, z = 10) => { };
var f9 = (a) => a;
var f10 = (a) => a;
var f11 = (a) => a;
var f12 = (a) => a;
var f11 = (a) => a;
var f12 = (a) => a;
var f13 = (a) => a;
var f14 = () => { };
var f15 = (a) => a;
var f16 = (a, b = 10) => a + b;
function foo(func) { }
foo(() => true);
foo(() => { return false; });
var m;
(function (m) {
    class City {
        constructor(x, thing = () => 100) {
        }
        m = () => 2 * 2 * 2;
    }
    let Enum;
    (function (Enum) {
        Enum["claw"] = (() => 10)();
        if (typeof Enum.claw !== "string") Enum[Enum.claw] = "claw";
    })(Enum = m.Enum || (m.Enum = {}));
    m.v = x => new City(Enum.claw);
})(m || (m = {}));
