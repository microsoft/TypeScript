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
var x = function (a) {
    return '';
};
/**
 * function doc comment
 */
function b() {
    return 0;
}
module.exports = { x: x, b: b };


//// [index1.d.ts]
/**
 * const doc comment
 */
export function x(a: any): string;
/**
 * function doc comment
 */
export function b(): number;
