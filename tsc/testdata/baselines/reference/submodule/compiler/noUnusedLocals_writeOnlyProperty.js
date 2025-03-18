//// [tests/cases/compiler/noUnusedLocals_writeOnlyProperty.ts] ////

//// [noUnusedLocals_writeOnlyProperty.ts]
class C {
    private x;
    m() {
        this.x = 0;
    }
}


//// [noUnusedLocals_writeOnlyProperty.js]
class C {
    x;
    m() {
        this.x = 0;
    }
}
