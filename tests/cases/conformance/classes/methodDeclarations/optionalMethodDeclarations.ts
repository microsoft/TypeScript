// @target: esnext,es2016
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/34952#issuecomment-552025027
class C {
    // ? should be removed in emit
    method?() {}
}