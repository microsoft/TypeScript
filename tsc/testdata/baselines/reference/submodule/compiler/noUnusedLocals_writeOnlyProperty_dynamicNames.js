//// [tests/cases/compiler/noUnusedLocals_writeOnlyProperty_dynamicNames.ts] ////

//// [noUnusedLocals_writeOnlyProperty_dynamicNames.ts]
const x = Symbol("x");
const y = Symbol("y");
class C {
    private [x]: number;
    private [y]: number;
    m() {
        this[x] = 0; // write-only
        this[y];
    }
}


//// [noUnusedLocals_writeOnlyProperty_dynamicNames.js]
const x = Symbol("x");
const y = Symbol("y");
class C {
    [x];
    [y];
    m() {
        this[x] = 0; // write-only
        this[y];
    }
}
