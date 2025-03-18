//// [tests/cases/compiler/genericBaseClassLiteralProperty.ts] ////

//// [genericBaseClassLiteralProperty.ts]
class BaseClass<T> {
    public _getValue1: { (): T; };
    public _getValue2: () => T;
}

class SubClass extends BaseClass<number> {
    public Error(): void {

        var x : number = this._getValue1();
        var y : number = this._getValue2();
    }
}

//// [genericBaseClassLiteralProperty.js]
class BaseClass {
    _getValue1;
    _getValue2;
}
class SubClass extends BaseClass {
    Error() {
        var x = this._getValue1();
        var y = this._getValue2();
    }
}
