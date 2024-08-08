//// [tests/cases/conformance/jsdoc/specializeTag1.ts] ////

//// [specializeTag1.js]
/**
 * @template T
 * @param {object} _jsonSchema
 * @returns {(x: unknown) => x is T}
 */
function createValidator(_jsonSchema) {
    /**
     * @param {unknown} _x
     * @returns {_x is T}
     */
    return (_x) => true;
}

/** @specialize <number> */
const isNumber = createValidator({ type: 'number' });

const isString = /** @specialize <string> */(createValidator({ type: 'string' }));


//// [specializeTag1.js]
/**
 * @template T
 * @param {object} _jsonSchema
 * @returns {(x: unknown) => x is T}
 */
function createValidator(_jsonSchema) {
    /**
     * @param {unknown} _x
     * @returns {_x is T}
     */
    return function (_x) { return true; };
}
/** @specialize <number> */
var isNumber = createValidator({ type: 'number' });
var isString = /** @specialize <string> */ (createValidator({ type: 'string' }));


//// [specializeTag1.d.ts]
/**
 * @template T
 * @param {object} _jsonSchema
 * @returns {(x: unknown) => x is T}
 */
declare function createValidator<T>(_jsonSchema: object): (x: unknown) => x is T;
/** @specialize <number> */
declare const isNumber: (x: unknown) => x is number;
declare const isString: (x: unknown) => x is string;
