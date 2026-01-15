class C {
    foo();
    static foo(); // error
}

class D {
    static foo();
    foo(); // error    
}

class E<T> {
    foo(x: T);
    static foo(x: number); // error
}

class F<T> {
    static foo(x: number);
    foo(x: T); // error    
}