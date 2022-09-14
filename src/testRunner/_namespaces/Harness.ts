/* Generated file to emulate the Harness namespace. */

export * from "../../harness/_namespaces/Harness.js";
export * from "../../loggedIO/_namespaces/Harness.js";

import * as Parallel from "./Harness.Parallel.js";
export { Parallel };

export * from "../fourslashRunner.js";
export * from "../compilerRunner.js";
export * from "../externalCompileRunner.js";
export * from "../test262Runner.js";
export * from "../runner.js";


// Must be after runner.
// NOTE: if emitting CJS, comment this out, and uncomment the one in runner.ts.
import "./tests";
