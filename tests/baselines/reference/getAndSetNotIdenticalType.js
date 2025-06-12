//// [tests/cases/compiler/getAndSetNotIdenticalType.ts] ////

//// [getAndSetNotIdenticalType.ts]
class C {
    get x(): number {
        return 1;
    }
    set x(v: string) { }
}

//// [getAndSetNotIdenticalType.js]
class C {
    get x() {
        return 1;
    }
    set x(v) { }
}
