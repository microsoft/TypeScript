//// [tests/cases/conformance/es6/newTarget/newTarget.es5.ts] ////

//// [newTarget.es5.ts]
class A {
    constructor() {
        const a = new.target;
        const b = () => new.target;
    }
    static c = function () { return new.target; }
    d = function () { return new.target; }
}

class B extends A {
    constructor() {
        super();
        const e = new.target;
        const f = () => new.target;
    }
}

function f1() {
    const g = new.target;
    const h = () => new.target;
}

const f2 = function () {
    const i = new.target;
    const j = () => new.target;
}

const O = {
    k: function () { return new.target; }
};



//// [newTarget.es5.js]
let A = (() => {
    class A {
        constructor() {
            this.d = function () { return new.target; };
            const a = new.target;
            const b = () => new.target;
        }
    }
    A.c = function () { return new.target; };
    return A;
})();
class B extends A {
    constructor() {
        super();
        const e = new.target;
        const f = () => new.target;
    }
}
function f1() {
    const g = new.target;
    const h = () => new.target;
}
const f2 = function () {
    const i = new.target;
    const j = () => new.target;
};
const O = {
    k: function () { return new.target; }
};
