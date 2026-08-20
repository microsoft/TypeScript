// @target: es5, es2015

declare class A {
    get length() : number;
}

declare class B {
    get length() { return 0; }
}