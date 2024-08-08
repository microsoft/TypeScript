// @checkJs: true
// @outDir: dist/
// @declaration: true
// @filename: specializeTag3.js

/**
 * @template T
 */
class JsonSchemaValidator {
    /**
     * @param {object} jsonSchema
     */
    constructor(jsonSchema) {
        /** @type {object} */
        this.jsonSchema = jsonSchema;
    }

    /**
     * @param {unknown} _value 
     * @returns {_value is T}
     */
    isValid(_value) {
        return true;
    }
}

const number = /** @specialize {number} */(
    new JsonSchemaValidator({ type: 'number' })
);

/** @specialize {number[]} */
const arrayOfNumbers = new JsonSchemaValidator({
    type: 'array',
    items: { type: 'number' },
});
