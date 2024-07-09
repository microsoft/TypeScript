// @strict: true

// Literal enum type
enum E1 {
    a = 1,
    b = 2,
}

// Numeric enum type
enum E2 {
    a = 1 << 0,
    b = 1 << 1
}

function f1(v: E1) {
    if (v !== 0) {  // Error
        v;
    }
    if (v !== 1) {
        v;
    }
    if (v !== 2) {
        v;
    }
    if (v !== 3) {  // Error
        v;
    }
}

function f2(v: E2) {
    if (v !== 0) {
        v;
    }
    if (v !== 1) {
        v;
    }
    if (v !== 2) {
        v;
    }
    if (v !== 3) {
        v;
    }
}
