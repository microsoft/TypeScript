// @target: es5
// @noemit: true

// Shadowed captured this and super
class Base { }
class C extends Base {
    constructor() {
        super();
    }

    foo() {
        let _this = this;

        () => {
            _this;
        };
    }

    bar() {
        let _super = this;
    }
}


/// shadowed arguments
function f1(arguments, ...a) {
}

class C2 extends Base {
    constructor() {
        super();
        var _newTarget = "";
        var t = new.target;
        var y = _newTarget;
    }
}


// Shadowed Promise
var Promise = null;
async function f4() {
    return 0;
}


// shadowed require
var require = 0;

// shadowed exports
var exports = 0;


export { };