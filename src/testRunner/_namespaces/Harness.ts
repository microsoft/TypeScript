/* Generated file to emulate the Harness namespace. */

export * from "../../harness/_namespaces/Harness.js";

import * as Parallel from "./Harness.Parallel.js";
export { Parallel };

export * from "../fourslashRunner.js";
export * from "../compilerRunner.js";
export * from "../transpileRunner.js";
export * from "../runner.js";

// If running as emitted CJS, don't start executing the tests here; instead start in runner.ts.
// If running bundled, we want this to be here so that esbuild places the tests after runner.ts.
if (!__filename.endsWith("Harness.js")) {
    require("../tests.js");
}
