//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserErrantSemicolonInClass1.ts] ////

//// [parserErrantSemicolonInClass1.ts]
class a {
    //constructor ();
    constructor (n: number);
    constructor (s: string);
    constructor (ns: any) {

    }

    public pgF() { };

    public pv;
    public get d() {
        return 30;
    }
    public set d() {
    }

    public static get p2() {
        return { x: 30, y: 40 };
    }

    private static d2() {
    }
    private static get p3() {
        return "string";
    }
    private pv3;

    private foo(n: number): string;
    private foo(s: string): string;
    private foo(ns: any) {
        return ns.toString();
    }
}


//// [parserErrantSemicolonInClass1.js]
class a {
    constructor(ns) {
    }
    pgF() { }
    ;
    pv;
    get d() {
        return 30;
    }
    set d() {
    }
    static get p2() {
        return { x: 30, y: 40 };
    }
    static d2() {
    }
    static get p3() {
        return "string";
    }
    pv3;
    foo(ns) {
        return ns.toString();
    }
}
