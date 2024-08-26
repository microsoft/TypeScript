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
}

// === INCOMING CHANGES ===

x = 3;
bar() {
    return 'hello';
}
baz() {
    return 3;
}
y = 2;

// === MAPPED ===
class MyClass {
    x = 3;
    bar() {
        return "hello";
    }
    baz() {
        return 3;
    }
    y = 2;
}
