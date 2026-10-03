// @strict: true
// @target: es2022

// === Basic narrowing: Uppercase<string> === literal ===

function testUppercaseNarrowing(x: Uppercase<string>) {
    if (x === "BE") {
        const r: "BE" = x; // ok — narrowed to "BE"
    }
    if (x === "be") {
        const r: "be" = x; // error — "be" is never Uppercase<string>
    }
}

// === Basic narrowing: Lowercase<string> === literal ===

function testLowercaseNarrowing(x: Lowercase<string>) {
    if (x === "be") {
        const r: "be" = x; // ok — narrowed to "be"
    }
    if (x === "BE") {
        const r: "BE" = x; // error — "BE" is never Lowercase<string>
    }
}

// === Union narrowing and assignment (original issue) ===

function testUnionAssignment() {
    let countryCode: "BE" | "LU" | "NL";
    const prefix = "be".toUpperCase() as Uppercase<string>;
    if (prefix === "BE" || prefix === "LU" || prefix === "NL") {
        countryCode = prefix; // ok — narrowed to "BE" | "LU" | "NL"
    }
}

// === Narrowing in else branch ===

function testUppercaseElseBranch(x: Uppercase<string>) {
    if (x === "BE") {
        x; // type is "BE"
    } else {
        x; // type is Uppercase<string>
    }
}

// === Switch statement narrowing ===

function testUppercaseSwitch(x: Uppercase<string>): string {
    switch (x) {
        case "BE": return "Belgium";
        case "LU": return "Luxembourg";
        case "NL": return "Netherlands";
        default: return "Unknown";
    }
}

// === Capitalize<string> narrowing ===

function testCapitalizeNarrowing(x: Capitalize<string>) {
    if (x === "Hello") {
        const r: "Hello" = x; // ok
    }
    if (x === "hello") {
        const r: "hello" = x; // error
    }
}

// === Uncapitalize<string> narrowing ===

function testUncapitalizeNarrowing(x: Uncapitalize<string>) {
    if (x === "hello") {
        const r: "hello" = x; // ok
    }
    if (x === "Hello") {
        const r: "Hello" = x; // error
    }
}

// === Always-false comparisons (comparability) ===

function testAlwaysFalseUppercase(foo: Uppercase<string>) {
    if (foo === "ba") {} // error — "ba" is not Uppercase<string>
    if (foo === "BA") {} // ok
}

function testAlwaysFalseLowercase(foo: Lowercase<string>) {
    if (foo === "BA") {} // error — "BA" is not Lowercase<string>
    if (foo === "ba") {} // ok
}

// === Narrowing does not broaden the type ===

function testNoFalseNarrowing(x: Uppercase<string>) {
    if (x === "BE") {
        const r1: Uppercase<string> = x; // ok
        const r2: string = x;            // ok
    }
}

// === Multiple literal union narrowing ===

function testUppercaseUnionAssign2(x: Uppercase<string>) {
    if (x === "FOO" || x === "BAR") {
        const r: "FOO" | "BAR" = x; // ok
    }
}
