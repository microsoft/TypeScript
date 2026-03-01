// === mapCode ===

// === ORIGINAL ===
class MyClass {[||]
}

// === INCOMING CHANGES ===

if (false) {
    return "hello";
}

// === MAPPED ===
class MyClass {
}

if (false) {
    return "hello";
}
