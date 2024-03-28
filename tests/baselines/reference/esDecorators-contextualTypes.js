//// [tests/cases/conformance/esDecorators/esDecorators-contextualTypes.ts] ////

//// [esDecorators-contextualTypes.ts]
@((t, c) => { })
class C {
    @((t, c) => { })
    static f() {}

    @((t, c) => { })
    static #f() {}

    @((t, c) => { })
    static get x() { return 1; }

    @((t, c) => { })
    static set x(value) { }

    @((t, c) => { })
    static get #x() { return 1; }

    @((t, c) => { })
    static set #x(value) { }

    @((t, c) => { })
    static accessor y = 1;

    @((t, c) => { })
    static accessor #y = 1;

    @((t, c) => { })
    static z = 1;

    @((t, c) => { })
    static #z = 1;

    @((t, c) => { })
    g() {}

    @((t, c) => { })
    #g() {}

    @((t, c) => { })
    get a() { return 1; }

    @((t, c) => { })
    set a(value) { }

    @((t, c) => { })
    get #a() { return 1; }

    @((t, c) => { })
    set #a(value) { }

    @((t, c) => { })
    accessor b = 1;

    @((t, c) => { })
    accessor #b = 1;

    @((t, c) => { })
    c = 1;

    @((t, c) => { })
    #c = 1;
}

//// [esDecorators-contextualTypes.js]
@((t, c) => { })
class C {
    @((t, c) => { })
    static f() { }
    @((t, c) => { })
    static #f() { }
    @((t, c) => { })
    static get x() { return 1; }
    @((t, c) => { })
    static set x(value) { }
    @((t, c) => { })
    static get #x() { return 1; }
    @((t, c) => { })
    static set #x(value) { }
    @((t, c) => { })
    static accessor y = 1;
    @((t, c) => { })
    static accessor #y = 1;
    @((t, c) => { })
    static z = 1;
    @((t, c) => { })
    static #z = 1;
    @((t, c) => { })
    g() { }
    @((t, c) => { })
    #g() { }
    @((t, c) => { })
    get a() { return 1; }
    @((t, c) => { })
    set a(value) { }
    @((t, c) => { })
    get #a() { return 1; }
    @((t, c) => { })
    set #a(value) { }
    @((t, c) => { })
    accessor b = 1;
    @((t, c) => { })
    accessor #b = 1;
    @((t, c) => { })
    c = 1;
    @((t, c) => { })
    #c = 1;
}
