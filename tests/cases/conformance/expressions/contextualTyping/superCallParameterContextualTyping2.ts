
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class C extends A<number, string> {
    // Ensure 'value' is not of type 'any' by invoking it with type arguments.
    constructor() { super(value => String(value<string>())); }
}