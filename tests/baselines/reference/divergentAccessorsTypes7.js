//// [tests/cases/compiler/divergentAccessorsTypes7.ts] ////

//// [divergentAccessorsTypes7.ts]
class Test<S> {
    constructor() {}

    set value(value: string | ((item: S) => string)) {}

    get value(): string {
        return null!;
    }

    // -- Replacing the getter such that the getter/setter types match, removes the error:
    // get value(): string | ((item: S) => string) {
    //     return null!;
    // }

    // -- Or, replacing the setter such that a concrete type is used, removes the error:
    // set value(value: string | ((item: { property: string }) => string)) {}
}

const a = new Test<{
    property: string
}>();

a.value = (item) => item.property
a['value'] = (item) => item.property


//// [divergentAccessorsTypes7.js]
var Test = /** @class */ (function () {
    function Test() {
    }
    Object.defineProperty(Test.prototype, "value", {
        get: function () {
            return null;
        },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return Test;
}());
var a = new Test();
a.value = function (item) { return item.property; };
a['value'] = function (item) { return item.property; };
