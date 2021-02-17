// @strictNullChecks: true

declare function isFoo(): boolean;
declare function isBar(): boolean;
declare const isUndefinedFoo: () => boolean | undefined;

if (isFoo) {
    // error
}

if (isUndefinedFoo) {
    // no error
}

if (!isFoo) {
    // error
}

if (!isUndefinedFoo) {
    // no error
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

if (!isFoo || isFoo()) {
    // error
}

if (!isUndefinedFoo || isFoo()) {
    // no error
}
