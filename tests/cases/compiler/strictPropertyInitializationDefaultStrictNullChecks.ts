// @strictNullChecks: false
// @noEmit: true

// When strict is not specified, it defaults to true in TS 6.0.
// strictPropertyInitialization is effectively true via the strict default.
// Specifying strictNullChecks: false should produce an error because
// strictPropertyInitialization requires strictNullChecks.

class C {
    x: number;
    constructor() {}
}
