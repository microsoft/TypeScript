class C {
    constructor(public x?) { }
}

// x should be an optional property
var v: C = {}; // Should succeed
var v2: { x? }
v = v2; // Should succeed
var v3: { x } = new C; // Should fail