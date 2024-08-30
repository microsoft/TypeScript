// @checkJs: true
// @outDir: dist/
// @declaration: true
// @filename: specializeTag2.js

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
