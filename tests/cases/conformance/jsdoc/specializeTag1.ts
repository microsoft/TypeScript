// @checkJs: true
// @outDir: dist/
// @declaration: true
// @filename: specializeTag1.js

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
