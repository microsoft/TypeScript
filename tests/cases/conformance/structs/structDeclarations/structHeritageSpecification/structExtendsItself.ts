struct C extends C { } // error

// struct D<T> extends D<T> { } //  error

// struct E<T> extends E<string> { } // error