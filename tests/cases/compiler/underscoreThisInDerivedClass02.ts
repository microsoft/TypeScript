// @target es5

// Original test intent:
// Errors on '_this' should be reported in derived constructors,
// even if 'super()' is not called.

class C {
    constructor() {
        return {};
    }
}

class D extends C {
    constructor() {
        super();
        var _this = "uh-oh?";
    }
}