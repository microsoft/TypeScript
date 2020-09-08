// @importHelpers: true
// @target: es2017
// @module: commonjs,system,amd,es2015,es2020
// @esModuleInterop: true,false
// @filename: a.ts
export default class { }

// @filename: b.ts
export { default } from "./a";
export { default as a } from "./a";
import { default as b } from "./a";
void b;

// @filename: tslib.d.ts
declare module "tslib" {
    function __importDefault(m: any): void;
}