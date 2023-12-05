//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsOptionalTypeLiteralProps1.ts] ////

//// [foo.js]
/**
 * foo
 *
 * @public
 * @param {object} opts
 * @param {number} opts.a
 * @param {number} [opts.b]
 * @param {number} [opts.c]
 * @returns {number}
 */
function foo({ a, b, c }) {
    return a + b + c;
}


//// [foo.js]
/**
 * foo
 *
 * @public
 * @param {object} opts
 * @param {number} opts.a
 * @param {number} [opts.b]
 * @param {number} [opts.c]
 * @returns {number}
 */
function foo({ a, b, c }) {
    return a + b + c;
}


//// [foo.d.ts]
/**
 * foo
 *
 * @public
 * @param {object} opts
 * @param {number} opts.a
 * @param {number} [opts.b]
 * @param {number} [opts.c]
 * @returns {number}
 */
declare function foo({ a, b, c }: {
    a: number;
    b?: number;
    c?: number;
}): number;
