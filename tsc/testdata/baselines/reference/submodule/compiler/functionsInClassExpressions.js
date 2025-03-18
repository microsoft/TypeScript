//// [tests/cases/compiler/functionsInClassExpressions.ts] ////

//// [functionsInClassExpressions.ts]
let Foo = class {
    constructor() {
        this.bar++;
    }
    bar = 0;
    inc = () => {
        this.bar++;
    }
    m() { return this.bar; }
}

//// [functionsInClassExpressions.js]
let Foo = class {
    constructor() {
        this.bar++;
    }
    bar = 0;
    inc = () => {
        this.bar++;
    };
    m() { return this.bar; }
};
