class C extends C { } // error

class D<T> extends D<T> { } // error

class E<T> extends E<string> { } // error