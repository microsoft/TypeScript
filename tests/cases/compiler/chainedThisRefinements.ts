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
