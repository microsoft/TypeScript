// @target: esnext,es2015,es5
// @module: commonjs,system,esnext
// @lib: esnext
// @experimentalDecorators: false
// @noTypesAndSymbols: true
// @noEmitHelpers: true
export {};

declare var dec: any;

using before = null;

@dec
export default class {
}
