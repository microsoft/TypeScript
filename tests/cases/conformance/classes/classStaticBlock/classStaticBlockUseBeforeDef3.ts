// @noEmit: true
// @strict: true

class A {
    static {
        A.doSomething(); // should not error
    }

    static doSomething() {
       console.log("gotcha!");
    }
}


class Baz {
    static {
        console.log(FOO);   // should error
    }
}

const FOO = "FOO";
class Bar {
    static {
        console.log(FOO); // should not error
    }
}

let u = "FOO" as "FOO" | "BAR";

class CFA {
    static {
        u = "BAR";
        u;  // should be "BAR"
    }

    static t = 1;

    static doSomething() {}

    static {
        u;  // should be "BAR"
    }
}

u; // should be "BAR"
