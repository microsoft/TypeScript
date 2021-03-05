// @strictNullChecks: true

declare function isFoo(): boolean;
declare const isUndefinedFoo: (() => boolean) | undefined;

if (isFoo) {
    // error
}

if (!isFoo) {
    // error
}

if (!isUndefinedFoo) {
    // no error
}
