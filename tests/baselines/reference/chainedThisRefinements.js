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
        this.withFoo<T>().withBar<T>().foo;
        this.withFoo<T>().withBar<T>().bar;
        return this.withFoo<T>().withBar<T>();
    }
}

declare var f: {foo: number};
new Builder().withFoo<number>().withBar<number>().foo;
new Builder().withFoo<number>().withBar<number>().bar;
f = new Builder().withFoo<number>().withBar<number>();
new Builder().withFooBar<number>().foo;
new Builder().withFooBar<number>().bar;
f = new Builder().withFooBar<number>();


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
        this.withFoo().withBar().foo;
        this.withFoo().withBar().bar;
        return this.withFoo().withBar();
    };
    return Builder;
}());
new Builder().withFoo().withBar().foo;
new Builder().withFoo().withBar().bar;
f = new Builder().withFoo().withBar();
new Builder().withFooBar().foo;
new Builder().withFooBar().bar;
f = new Builder().withFooBar();
