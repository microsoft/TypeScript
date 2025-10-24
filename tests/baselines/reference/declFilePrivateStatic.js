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
    static a() { }
    static b() { }
    static get c() { return 1; }
    static get d() { return 1; }
    static set e(v) { }
    static set f(v) { }
}
C.x = 1;
C.y = 1;


//// [declFilePrivateStatic.d.ts]
declare class C {
    private static x;
    static y: number;
    private static a;
    static b(): void;
    private static get c();
    static get d(): number;
    private static set e(value);
    static set f(v: any);
}
