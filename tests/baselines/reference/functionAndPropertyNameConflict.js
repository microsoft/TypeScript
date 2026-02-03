//// [tests/cases/compiler/functionAndPropertyNameConflict.ts] ////

//// [functionAndPropertyNameConflict.ts]
class C65 {
    public aaaaa() { }
    public get aaaaa() {
        return 1;
    }
}

//// [functionAndPropertyNameConflict.js]
class C65 {
    aaaaa() { }
    get aaaaa() {
        return 1;
    }
}
