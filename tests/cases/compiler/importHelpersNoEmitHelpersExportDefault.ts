// @target: es5
// @module: commonjs
// @importHelpers: true
// @noEmitHelpers: true
// @esModuleInterop: true
// @noTypesAndSymbols: true

// @filename: main.ts
// https://github.com/microsoft/TypeScript/issues/40328
export { default as A } from "./other";

// @filename: main2.ts
export { default } from "./other";

// @filename: other.ts
export default {};

// @filename: tslib.d.ts
declare module "tslib" {
    function __importDefault(m: any): void;
}