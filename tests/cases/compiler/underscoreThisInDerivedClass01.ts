// @target es5

// Original test intent:
// When arrow functions capture 'this', the lexical 'this' owner
// currently captures 'this' using a variable named '_this'.
// That means that '_this' becomes a reserved identifier in certain places.
//
// Constructors have adopted the same identifier name ('_this')
// for capturing any potential return values from super calls,
// so we expect the same behavior.

class C {
    constructor() {
        return {};
    }
}

class D extends C {
    constructor() {
        var _this = "uh-oh?";
        super();
    }
}