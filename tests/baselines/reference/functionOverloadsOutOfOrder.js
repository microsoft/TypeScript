//// [tests/cases/compiler/functionOverloadsOutOfOrder.ts] ////

//// [functionOverloadsOutOfOrder.ts]
class d {
    private foo(n: number): string;
    private foo(ns: any) {
        return ns.toString();
    }
    private foo(s: string): string;
}

class e {
    private foo(ns: any) {
        return ns.toString();
    }
    private foo(s: string): string;
    private foo(n: number): string;
}

//// [functionOverloadsOutOfOrder.js]
class d {
    foo(ns) {
        return ns.toString();
    }
}
class e {
    foo(ns) {
        return ns.toString();
    }
}
