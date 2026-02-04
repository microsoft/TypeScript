//// [tests/cases/compiler/noImplicitAnyMissingSetAccessor.ts] ////

//// [noImplicitAnyMissingSetAccessor.ts]
abstract class Parent
{
    public abstract get message();
}

class Child extends Parent {
    public get message() {
        return "";
    }
}

//// [noImplicitAnyMissingSetAccessor.js]
"use strict";
class Parent {
}
class Child extends Parent {
    get message() {
        return "";
    }
}
