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
