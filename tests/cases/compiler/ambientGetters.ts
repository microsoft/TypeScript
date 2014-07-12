// bug 751241: ambient getters

declare class A {
    get length() : number;
}

declare class B {
    get length() { return 0; }
}