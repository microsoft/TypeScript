//// [setterBeforeGetter.ts]
class Foo {

    private _bar: { a: string; };
    // should not be an error to order them this way
    set bar(thing: { a: string; }) {
        this._bar = thing;
    }
    get bar(): { a: string; } {
        return this._bar;
    }
}


//// [setterBeforeGetter.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Object.defineProperty(Foo.prototype, "bar", {
        get: function () {
            return this._bar;
        },
        // should not be an error to order them this way
        set: function (thing) {
            this._bar = thing;
        },
        enumerable: false,
        configurable: true
    });
    return Foo;
}());
