// === mapCode ===

// === ORIGINAL ===
class MyClass {[||]
    x = 1;
    foo() {
        return 1;
    }
    bar() {
        return 2;
    }
    baz() {
        return 3;
    }
}

// === INCOMING CHANGES ===

quux() {
    return 4;
}

// === MAPPED ===
class MyClass {
    x = 1;
    foo() {
        return 1;
    }
    bar() {
        return 2;
    }
    baz() {
        return 3;
    }
    quux() {
        return 4;
    }
}
