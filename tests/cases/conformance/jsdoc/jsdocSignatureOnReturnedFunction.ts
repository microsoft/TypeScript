// @allowJs: true
// @checkJs: true
// @target: esnext
// @noImplicitAny: true
// @declaration: true
// @outDir: out
// @Filename: jsdocSignatureOnReturnedFunction.js

function f1() {
    /**
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    return (a, b) => {
        return a + b;
    }
}

function f2() {
    /**
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    return function (a, b){
        return a + b;
    }
}

function f3() {
    /** @type {(a: number, b: number) => number} */
    return (a, b) => {
        return a + b;
    }
}

function f4() {
    /** @type {(a: number, b: number) => number} */
    return function (a, b){
        return a + b;
    }
}
