// doc 4.1
// In an initializer expression for an instance member variable, this is of the struct instance type.
// ok

struct C {
    x = this;
}

/* struct D<T> {
    x = this;
    y: T;
}*/