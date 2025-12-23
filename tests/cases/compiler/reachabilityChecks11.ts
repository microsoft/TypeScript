// @allowUnreachableCode: false
// @preserveConstEnums: true

// while (true);
var x = 1;

namespace A {
    while (true);
    let x;
}

namespace A1 {
    do {} while(true);
    namespace A {
        interface F {}
    }
}

namespace A2 {
    while (true);
    namespace A {
        var x = 1;
    }
}

namespace A3 {
    while (true);
    type T = string;
}

namespace A4 {
    while (true);
    namespace A {
        const enum E { X }
    }
}

function f1(x) {
    if (x) {
        return;
    }
    else {
        throw new Error("123");
    }
    var x;
}

function f2() {
    return;
    class A {
    }
}

namespace B {
    for (; ;);
    namespace C {
    }
}

function f3() {
    do {
    } while (true);
    enum E {
        X = 1
    }
}

function f4() {
    if (true) {
        throw new Error();
    }
    const enum E {
        X = 1
    }
}

