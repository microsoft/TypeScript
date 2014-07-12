class C1 {
    // ERROR
    foo1(n: number);
    foo1(s: string);
    static foo1(a) { }
}
class C2 {
    // ERROR
    static foo2(n: number);
    static foo2(s: string);
    foo2(a) { }
}
class C3 {
    // ERROR
    foo3(n: number);
    static foo3(s: string);
    foo3(a) { }
}
class C4 {
    // ERROR
    static foo4(n: number);
    foo4(s: string);
    static foo4(a) { }
}
class C5 {
    // OK
    foo5(n: number);
    foo5(s: string);
    foo5(a) { }

    // OK
    static foo5(n: number);
    static foo5(s: string);
    static foo5(a) { }
}