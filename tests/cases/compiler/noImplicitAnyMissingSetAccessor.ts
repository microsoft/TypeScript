// @noImplicitAny: true
// @target: es5

abstract class Parent
{
    public abstract get message();
}

class Child extends Parent {
    public get message() {
        return "";
    }
}