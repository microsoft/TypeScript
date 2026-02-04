//// [tests/cases/compiler/getAndSetNotIdenticalType.ts] ////

//// [getAndSetNotIdenticalType.ts]
class C {
    get x(): number {
        return 1;
    }
    set x(v: string) { }
}

//// [getAndSetNotIdenticalType.js]
"use strict";
class C {
    get x() {
        return 1;
    }
    set x(v) { }
}
