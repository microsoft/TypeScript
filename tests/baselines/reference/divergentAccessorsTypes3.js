//// [tests/cases/compiler/divergentAccessorsTypes3.ts] ////

//// [divergentAccessorsTypes3.ts]
class One {
  get prop1(): string { return ""; }
  set prop1(s: string | number) { }

  get prop2(): string { return ""; }
  set prop2(s: string | number) { }

  prop3: number;

  get prop4(): string { return ""; }
  set prop4(s: string | number) { }
}

class Two {
  get prop1(): string { return ""; }
  set prop1(s: string | number) { }

  get prop2(): string { return ""; }
  set prop2(s: string) { }

  get prop3(): string { return ""; }
  set prop3(s: string | boolean) { }

  get prop4(): string { return ""; }
  set prop4(s: string | boolean) { }
}

declare const u1: One|Two;

u1.prop1 = 42;
u1.prop1 = "hello";

u1.prop2 = 42;
u1.prop2 = "hello";

u1.prop3 = 42;
u1.prop3 = "hello";
u1.prop3 = true;

u1.prop4 = 42;
u1.prop4 = "hello";
u1.prop4 = true;


//// [divergentAccessorsTypes3.js]
var One = /** @class */ (function () {
    function One() {
    }
    Object.defineProperty(One.prototype, "prop1", {
        get: function () { return ""; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(One.prototype, "prop2", {
        get: function () { return ""; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(One.prototype, "prop4", {
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
        get: function () { return ""; },
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
    Object.defineProperty(Two.prototype, "prop3", {
        get: function () { return ""; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Two.prototype, "prop4", {
        get: function () { return ""; },
        set: function (s) { },
        enumerable: false,
        configurable: true
    });
    return Two;
}());
u1.prop1 = 42;
u1.prop1 = "hello";
u1.prop2 = 42;
u1.prop2 = "hello";
u1.prop3 = 42;
u1.prop3 = "hello";
u1.prop3 = true;
u1.prop4 = 42;
u1.prop4 = "hello";
u1.prop4 = true;
