"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareNumbers(a, b) {
    if (a === b)
        return 0;
    if (a === undefined)
        return -1;
    if (b === undefined)
        return +1;
    return a < b ? -1 : +1;
}
exports.compareNumbers = compareNumbers;
function compareStrings(a, b, ignoreCase) {
    return ignoreCase
        ? compareStringsCaseInsensitive(a, b)
        : compareStringsCaseSensitive(a, b);
}
exports.compareStrings = compareStrings;
// NOTE: This is a duplicate of `compareNumbers` above, but is intended to be used only with
//       strings to reduce polymorphism.
function compareStringsCaseSensitive(a, b) {
    if (a === b)
        return 0;
    if (a === undefined)
        return -1;
    if (b === undefined)
        return +1;
    return a < b ? -1 : +1;
}
exports.compareStringsCaseSensitive = compareStringsCaseSensitive;
function compareStringsCaseInsensitive(a, b) {
    if (a === b)
        return 0;
    if (a === undefined)
        return -1;
    if (b === undefined)
        return +1;
    a = a.toUpperCase();
    b = b.toUpperCase();
    return a < b ? -1 : a > b ? +1 : 0;
}
exports.compareStringsCaseInsensitive = compareStringsCaseInsensitive;
function equateStringsCaseSensitive(a, b) {
    return a === b;
}
exports.equateStringsCaseSensitive = equateStringsCaseSensitive;
function equateStringsCaseInsensitive(a, b) {
    return a === b
        || a !== undefined
            && b !== undefined
            && a.toUpperCase() === b.toUpperCase();
}
exports.equateStringsCaseInsensitive = equateStringsCaseInsensitive;

//# sourceMappingURL=comparers.js.map
