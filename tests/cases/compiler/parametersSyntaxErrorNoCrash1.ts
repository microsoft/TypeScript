// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59422

function identity<T>(arg: T: T {
    return arg;
}