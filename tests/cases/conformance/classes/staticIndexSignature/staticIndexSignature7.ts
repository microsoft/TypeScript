// @strict: true
class X {
    static [index: string]: string;
    static x = 12; // Should error, incompatible with index signature
}
class Y {
    static [index: string]: string;
    static foo() {} // should error, incompatible with index signature
}
