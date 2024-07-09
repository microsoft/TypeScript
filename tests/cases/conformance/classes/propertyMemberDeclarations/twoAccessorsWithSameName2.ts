class C {
    static get x() { return 1; }
    static get x() { return 1; } // error
}

class D {
    static set x(v) {  }
    static set x(v) {  } // error
}

class E {
    static get x() {
        return 1;
    }
    static set x(v) { }
}