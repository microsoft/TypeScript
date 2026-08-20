// @target: es2015
// @module: commonjs
// @declaration: true
// @emitDeclarationOnly: true
export const object = {
    foo: <T extends Set<T> | []>(): void => { },
};