// === mapCode ===

// === ORIGINAL ===
class MyClass {
    x = 1;
    foo() {
        return 1;
    }
    bar() {[||]
        return 2;
    }
    baz() {
        return 3;
    }
}

// === INCOMING CHANGES ===

bar() {
    return 'hello';
}

// === MAPPED ===
class MyClass {
    x = 1;
    foo() {
        return 1;
    }
    bar() {
        return "hello";
    }
    baz() {
        return 3;
    }
}
