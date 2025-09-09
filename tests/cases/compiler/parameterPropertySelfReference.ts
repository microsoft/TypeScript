// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true
// @noImplicitAny: false

// These should all produce "Parameter 'x' cannot reference itself" error (TS2372)

class TestParameterProperty {
    // Parameter property with self-reference - currently NOT detected (BUG)
    constructor(private f: number = f) {} // Should error: Parameter 'f' cannot reference itself
}

class TestParameterPropertyWithTypeof {
    // Parameter property with typeof self-reference - from issue #62414
    constructor(private f: typeof f = f) {} // Should error: Parameter 'f' cannot reference itself
}

class TestParameterPropertyPublic {
    // Public parameter property
    constructor(public g: string = g) {} // Should error: Parameter 'g' cannot reference itself
}

class TestParameterPropertyReadonly {
    // Readonly parameter property
    constructor(readonly h: boolean = h) {} // Should error: Parameter 'h' cannot reference itself
}

// These should work correctly (already implemented)
class TestRegularParameter {
    constructor(x: number = x) {} // Should error: Parameter 'x' cannot reference itself (already works)
}

function regularFunction(param = param) {} // Should error: Parameter 'param' cannot reference itself (already works)

const arrowFunction = (param = param) => {}; // Should error: Parameter 'param' cannot reference itself (already works)
