//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsDocCommentsOnConsts.ts] ////

//// [index1.js]
/**
 * const doc comment
 */
const x = (a) => {
    return '';
};

/**
 * function doc comment
 */
function b() {
    return 0;
}

module.exports = {x, b}

//// [index1.js]
/**
 * const doc comment
 */
const x = (a) => {
    return '';
};
/**
 * function doc comment
 */
function b() {
    return 0;
}
module.exports = { x, b };


//// [index1.d.ts]
/**
 * function doc comment
 */
declare function b(): number;
declare const _default: {
    x: (a: any) => string;
    b: typeof b;
};
export = _default;
