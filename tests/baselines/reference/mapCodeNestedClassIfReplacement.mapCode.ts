// === mapCode ===

// === ORIGINAL ===
class MyClass {
    x = 1;
    foo() {
        return 1;
    }
    bar() {
        if (true) [||]{
            return 2;
        }
    }
    baz() {
        return 3;
    }
}

// === INCOMING CHANGES ===

if (true) {
    return "hello";
}

// === MAPPED ===
class MyClass {
    x = 1;
    foo() {
        return 1;
    }
    bar() {
        if (true) {
            return "hello";
        }
    }
    baz() {
        return 3;
    }
}
