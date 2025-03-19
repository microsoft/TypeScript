//// [tests/cases/compiler/setterBeforeGetter.ts] ////

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
class Foo {
    _bar;
    // should not be an error to order them this way
    set bar(thing) {
        this._bar = thing;
    }
    get bar() {
        return this._bar;
    }
}
