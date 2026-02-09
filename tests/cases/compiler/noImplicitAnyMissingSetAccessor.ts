// @noImplicitAny: true
// @target: es5, es2015

abstract class Parent
{
    public abstract get message();
}

class Child extends Parent {
    public get message() {
        return "";
    }
}