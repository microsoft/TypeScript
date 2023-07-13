//// [tests/cases/compiler/divergentAccessorsTypes5.ts] ////

//// [divergentAccessorsTypes5.ts]
// Not really different from divergentAccessorsTypes4.ts,
// but goes through the deferred type code

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

class Three {
  get prop1(): "hello" { return "hello"; }
  set prop1(s: "hello" | boolean) { }

  get prop2(): string { return ""; }
  set prop2(s: string | number | boolean) { }
}

declare const i: One & Two & Three;

// "hello"
i.prop1 = 42; // error
i.prop1 = "hello";

// 42
i.prop2 = 42;
i.prop2 = "hello"; // error


//// [divergentAccessorsTypes5.js]
// Not really different from divergentAccessorsTypes4.ts,
// but goes through the deferred type code
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
var Three = /** @class */ (function () {
    function Three() {
    }
    Object.defineProperty(Three.prototype, "prop1", {
        get: function () { return "hello"; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Three.prototype, "prop2", {
        get: function () { return ""; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    return Three;
}());
// "hello"
i.prop1 = 42; // error
i.prop1 = "hello";
// 42
i.prop2 = 42;
i.prop2 = "hello"; // error
