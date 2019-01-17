//// [chainedThisRefinements.ts]
class Builder {
    private _class: undefined;
    withFoo<T>() {
        return this as this & { foo: T }
    }
    withBar<T>() {
        return this as this & { bar: T }
    }
    withFooBar<T>() {
        return this.withFoo<T>().withBar<T>();
    }
}

declare var f: {foo: number};
f = new Builder().withFooBar<number>(); // should work


//// [chainedThisRefinements.js]
var Builder = /** @class */ (function () {
    function Builder() {
    }
    Builder.prototype.withFoo = function () {
        return this;
    };
    Builder.prototype.withBar = function () {
        return this;
    };
    Builder.prototype.withFooBar = function () {
        return this.withFoo().withBar();
    };
    return Builder;
}());
f = new Builder().withFooBar(); // should work
