struct C {
    static foo = this; // error, 'this' cannot be referenced in a static property initializer.
}

/* struct C2<T> {
    static foo = this; // error
} */