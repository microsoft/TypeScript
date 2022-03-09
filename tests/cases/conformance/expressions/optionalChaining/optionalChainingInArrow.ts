// @target: es5
// @noTypesAndSymbols: true
// https://github.com/microsoft/TypeScript/issues/41814
const test = (names: string[]) =>
    // single-line comment
    names?.filter(x => x);
