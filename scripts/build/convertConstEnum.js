// @ts-check
const replace = require("./replace");

module.exports = exports = convertConstEnum;

/**
 * This regexp exists to capture our const enums and replace them with normal enums in our public API
 *   - this is fine since we compile with preserveConstEnums, and ensures our consumers are not locked
 *     to the TS version they compile with.
 */
const constEnumCaptureRegexp = /^(\s*)(export )?const enum (\S+) {(\s*)$/gm;
const constEnumReplacement = "$1$2enum $3 {$4";
 
/**
 * Converts `const enum` declarations in a .d.ts file into non-const `enum` declarations.
 */
function convertConstEnum() {
    return replace(constEnumCaptureRegexp, constEnumReplacement);
}