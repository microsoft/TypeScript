// @noImplicitAny : true
// @target: es5

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