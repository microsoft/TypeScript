// @noImplicitAny: true
interface A {
    p: string;
    r: string;
    s: string;
}
interface B {
    p: number;
    r: boolean;
    s: string;
}
class C {
    r: number;
}
class Multiple extends C implements A, B {
    p = undefined; // ok, Multiple.p: string & number
    r = null;     // OK, r: string & boolean & number
    s = null;     // OK, s: string
}
