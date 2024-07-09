// technically not allowed by JavaScript but we don't have a 'not-primitive' constraint
// functionally only possible when your class is otherwise devoid of members so of little consequence in practice

class A {
    constructor() {
        return 1;
    }
}

var a = new A();

class B<T> {
    constructor() {
        var x: T;
        return x;
    }
}

var b = new B<number>();