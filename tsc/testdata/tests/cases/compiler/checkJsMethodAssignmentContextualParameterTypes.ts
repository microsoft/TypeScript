// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @target: esnext

// @filename: checkJsMethodAssignmentContextualParameterTypes.js
// Regression for #65086: contextual typing of lambda parameters when assigning
// to object/class methods must work at top level, not only inside a function body.

let lookup = (/** @type {number} */ id) => "name";
lookup = (id) => {
    id.toFixed();
    return "John Doe";
};

let businessLogic = {
    getEmployee(/** @type {number} */ id) {
        return "name";
    }
};
businessLogic.getEmployee = (id) => {
    id.toFixed();
    return "John Doe";
};
// Prove id is number (not any): assigning to string must error.
businessLogic.getEmployee = (id) => {
    /** @type {string} */
    const s = id;
    return s;
};

(() => {
    businessLogic.getEmployee = (id) => {
        id.toFixed();
        return "John Doe";
    };
})();

class BusinessLogic {
    getEmployee(/** @type {number} */ id) {
        return "name";
    }
}

let bl = new BusinessLogic();
bl.getEmployee = (id) => {
    id.toFixed();
    return "John Doe";
};
bl.getEmployee = (id) => {
    /** @type {string} */
    const s = id;
    return s;
};

(() => {
    bl.getEmployee = (id) => {
        id.toFixed();
        return "John Doe";
    };
})();
