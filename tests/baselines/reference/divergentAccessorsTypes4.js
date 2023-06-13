//// [tests/cases/compiler/divergentAccessorsTypes4.ts] ////

//// [divergentAccessorsTypes4.ts]
class One {
  get prop1(): string { return ""; }
  set prop1(s: string | number) { }

  prop2: number;
}

class Two {
  get prop1(): "hello" { return "hello"; }
  set prop1(s: "hello" | number) { }

  get prop2(): string { return ""; }
  set prop2(s: string | 42) { }

}

declare const i: One & Two;

// "hello"
i.prop1;
// number | "hello"
i.prop1 = 42;
i.prop1 = "hello";

// never
i.prop2;
// 42
i.prop2 = 42;
i.prop2 = "hello"; // error


//// [divergentAccessorsTypes4.js]
var One = /** @class */ (function () {
    function One() {
    }
    Object.defineProperty(One.prototype, "prop1", {
        get: function () { return ""; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    return One;
}());
var Two = /** @class */ (function () {
    function Two() {
    }
    Object.defineProperty(Two.prototype, "prop1", {
        get: function () { return "hello"; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Two.prototype, "prop2", {
        get: function () { return ""; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    return Two;
}());
// "hello"
i.prop1;
// number | "hello"
i.prop1 = 42;
i.prop1 = "hello";
// never
i.prop2;
// 42
i.prop2 = 42;
i.prop2 = "hello"; // error
