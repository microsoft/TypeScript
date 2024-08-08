//// [tests/cases/conformance/jsdoc/specializeTag3.ts] ////

//// [specializeTag3.js]
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


//// [specializeTag3.js]
/**
 * @template T
 */
var JsonSchemaValidator = /** @class */ (function () {
    /**
     * @param {object} jsonSchema
     */
    function JsonSchemaValidator(jsonSchema) {
        /** @type {object} */
        this.jsonSchema = jsonSchema;
    }
    /**
     * @param {unknown} _value
     * @returns {_value is T}
     */
    JsonSchemaValidator.prototype.isValid = function (_value) {
        return true;
    };
    return JsonSchemaValidator;
}());
var number = /** @specialize {number} */ (new JsonSchemaValidator({ type: 'number' }));
/** @specialize {number[]} */
var arrayOfNumbers = new JsonSchemaValidator({
    type: 'array',
    items: { type: 'number' },
});


//// [specializeTag3.d.ts]
/**
 * @template T
 */
declare class JsonSchemaValidator<T> {
    /**
     * @param {object} jsonSchema
     */
    constructor(jsonSchema: object);
    /** @type {object} */
    jsonSchema: object;
    /**
     * @param {unknown} _value
     * @returns {_value is T}
     */
    isValid(_value: unknown): _value is T;
}
declare const number: JsonSchemaValidator<number>;
/** @specialize {number[]} */
declare const arrayOfNumbers: JsonSchemaValidator<number[]>;
