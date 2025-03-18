//// [tests/cases/compiler/declFilePrivateStatic.ts] ////

//// [declFilePrivateStatic.ts]
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

//// [declFilePrivateStatic.js]
class C {
    static x = 1;
    static y = 1;
    static a() { }
    static b() { }
    static get c() { return 1; }
    static get d() { return 1; }
    static set e(v) { }
    static set f(v) { }
}
