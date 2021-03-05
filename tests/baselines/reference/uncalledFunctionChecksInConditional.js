//// [uncalledFunctionChecksInConditional.ts]
declare function isFoo(): boolean;
declare function isBar(): boolean;

if (isFoo) {
    // error
}

if (isFoo || isBar) {
    // error
}

if (isFoo || isFoo()) {
    // error
}

if (isFoo && isFoo()) {
    // no error
}


//// [uncalledFunctionChecksInConditional.js]
if (isFoo) {
    // error
}
if (isFoo || isBar) {
    // error
}
if (isFoo || isFoo()) {
    // error
}
if (isFoo && isFoo()) {
    // no error
}
