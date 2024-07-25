// @target: esnext
// @experimentalDecorators: true

@((t) => { })
class C {
    constructor(@((t, k, i) => {}) p: any) {}

    @((t, k, d) => { })
    static f() {}

    @((t, k, d) => { })
    static get x() { return 1; }
    static set x(value) { }

    @((t, k, d) => { })
    static accessor y = 1;

    @((t, k) => { })
    static z = 1;

    @((t, k, d) => { })
    g() {}

    @((t, k, d) => { })
    get a() { return 1; }
    set a(value) { }

    @((t, k, d) => { })
    accessor b = 1;

    @((t, k) => { })
    c = 1;

    static h(@((t, k, i) => {}) p: any) {}
    h(@((t, k, i) => {}) p: any) {}
}