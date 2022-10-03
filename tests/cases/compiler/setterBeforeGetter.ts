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
