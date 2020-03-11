function foo<T>() { }
foo<>();

// https://github.com/microsoft/TypeScript/issues/33041
function noParams() {}
noParams<>();