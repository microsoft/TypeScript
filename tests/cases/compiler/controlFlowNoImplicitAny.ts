// @strictNullChecks: true
// @noImplicitAny: true

declare let cond: boolean;

// CFA for 'let' with no type annotation and initializer
function f1() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
}

// CFA for 'let' with no type annotation and 'undefined' initializer
function f2() {
    let x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
}

// CFA for 'let' with no type annotation and 'null' initializer
function f3() {
    let x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | null
}

// No CFA for 'let' with with type annotation
function f4() {
    let x: any;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // any
}

// CFA for 'var' with no type annotation and initializer
function f5() {
    var x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
}

// CFA for 'var' with no type annotation and 'undefined' initializer
function f6() {
    var x = undefined;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
}

// CFA for 'var' with no type annotation and 'null' initializer
function f7() {
    var x = null;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | null
}

// No CFA for 'var' with with type annotation
function f8() {
    var x: any;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // any
}

// No CFA for captured outer variables
function f9() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
    function f() {
        const z = x;  // any
    }
}

// No CFA for captured outer variables
function f10() {
    let x;
    if (cond) {
        x = 1;
    }
    if (cond) {
        x = "hello";
    }
    const y = x;  // string | number | undefined
    const f = () => {
        const z = x;  // any
    };
}