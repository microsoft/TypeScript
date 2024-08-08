//// [tests/cases/conformance/jsdoc/specializeTag2.ts] ////

//// [specializeTag2.js]
/**
 * @template T
 * @param {TemplateStringsArray} strings 
 * @param  {...T} values 
 * @returns {Record<string, T>}
 */
function parse(strings, ...values) {
    /** @type {Record<string, T>} */
    const result = {};
    strings.forEach((key, i) => {
        if (i < values.length) {
            result[key] = values[i];
        }
    })
    return result;
}

const query1 = /** @specialize {string} */(
    parse`a=${1}b=${2}`
)

/** @specialize {string} */
const query2 = parse`a=${1}b=${2}`; // Type error

/** @specialize <`${number}`> */
const query3 = parse`a=${"1"}b=${"2"}`;


//// [specializeTag2.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/**
 * @template T
 * @param {TemplateStringsArray} strings
 * @param  {...T} values
 * @returns {Record<string, T>}
 */
function parse(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    /** @type {Record<string, T>} */
    var result = {};
    strings.forEach(function (key, i) {
        if (i < values.length) {
            result[key] = values[i];
        }
    });
    return result;
}
var query1 = /** @specialize {string} */ (parse(__makeTemplateObject(["a=", "b=", ""], ["a=", "b=", ""]), 1, 2));
/** @specialize {string} */
var query2 = parse(__makeTemplateObject(["a=", "b=", ""], ["a=", "b=", ""]), 1, 2); // Type error
/** @specialize <`${number}`> */
var query3 = parse(__makeTemplateObject(["a=", "b=", ""], ["a=", "b=", ""]), "1", "2");


//// [specializeTag2.d.ts]
/**
 * @template T
 * @param {TemplateStringsArray} strings
 * @param  {...T} values
 * @returns {Record<string, T>}
 */
declare function parse<T>(strings: TemplateStringsArray, ...values: T[]): Record<string, T>;
declare const query1: Record<string, string>;
/** @specialize {string} */
declare const query2: Record<string, string>;
/** @specialize <`${number}`> */
declare const query3: Record<string, `${number}`>;
