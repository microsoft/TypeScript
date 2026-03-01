// @target: es2015
class Foo<T> {
    t: T;
}

class Bar extends Foo<any> { } // Valid