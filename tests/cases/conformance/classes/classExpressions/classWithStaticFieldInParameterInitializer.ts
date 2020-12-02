// @target: esnext,es2015,es5
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/36295
((b = class { static x = 1 }) => {})();