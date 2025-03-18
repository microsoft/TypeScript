//// [tests/cases/compiler/unusedSetterInClass.ts] ////

//// [unusedSetterInClass.ts]
class Employee {
    private _fullName: string;

    private set fullName(newName: string) {
        this._fullName = newName;
    }
}

//// [unusedSetterInClass.js]
class Employee {
    _fullName;
    set fullName(newName) {
        this._fullName = newName;
    }
}
