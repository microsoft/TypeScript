//// [tests/cases/compiler/unusedGetterInClass.ts] ////

//// [unusedGetterInClass.ts]
class Employee {
    private _fullName: string;

    private get fullName(): string {
        return this._fullName;
    }
    // Will not also error on the setter
    private set fullName(_: string) {}
}

//// [unusedGetterInClass.js]
class Employee {
    get fullName() {
        return this._fullName;
    }
    // Will not also error on the setter
    set fullName(_) { }
}
