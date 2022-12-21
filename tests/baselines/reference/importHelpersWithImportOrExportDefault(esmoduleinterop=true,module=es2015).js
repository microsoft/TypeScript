//// [tests/cases/compiler/importHelpersWithImportOrExportDefault.ts] ////

//// [a.ts]
export default class { }

//// [b.ts]
export { default } from "./a";
export { default as a } from "./a";
import { default as b } from "./a";
void b;

//// [tslib.d.ts]
declare module "tslib" {
    function __importDefault(m: any): void;
}

//// [a.js]
export default class {
}
//// [b.js]
export { default } from "./a";
export { default as a } from "./a";
import { default as b } from "./a";
void b;
