// @declaration: true
// @target: es5

class C {
    private static x = 1;
    static y = 1;

    private static a() { }
    static b() { }

    private static get c() { return 1; }
    static get d() { return 1; }

    private static set e(v) { }
    static set f(v) { }
}