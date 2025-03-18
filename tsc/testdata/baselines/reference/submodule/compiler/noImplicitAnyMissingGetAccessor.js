//// [tests/cases/compiler/noImplicitAnyMissingGetAccessor.ts] ////

//// [noImplicitAnyMissingGetAccessor.ts]
abstract class Parent
{
    public abstract set message(str);
}

class Child extends Parent {
    _x: any;
    public set message(str) {
        this._x = str;
    }
}

//// [noImplicitAnyMissingGetAccessor.js]
class Parent {
}
class Child extends Parent {
    _x;
    set message(str) {
        this._x = str;
    }
}
