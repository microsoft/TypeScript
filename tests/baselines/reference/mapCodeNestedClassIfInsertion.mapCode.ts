// === mapCode ===

// === ORIGINAL ===
class MyClass {
    x = 1;
    foo() {
        return 1;
    }
    bar() {
        if (true)[||] {
            return 2;
        }
    }
    baz() {
        return 3;
    }
}

// === INCOMING CHANGES ===

if (false) {
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
            return 2;
            if (false) {
                return "hello";
            }
        }
    }
    baz() {
        return 3;
    }
}
