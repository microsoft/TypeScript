// @allowUnreachableCode: false
// @preserveConstEnums: true

while (true);
var x = 1;

module A {
    while (true);
    let x;
}

module A1 {
    do {} while(true);
    module A {
        interface F {}
    }
}

module A2 {
    while (true);
    module A {
        var x = 1;
    }
}

module A3 {
    while (true);
    type T = string;
}

module A4 {
    while (true);
    module A {
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

module B {
    for (; ;);
    module C {
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

