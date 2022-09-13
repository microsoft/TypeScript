/* Generated file to emulate the Harness namespace. */

export * from "../../harness/_namespaces/Harness";
export * from "../../loggedIO/_namespaces/Harness";

import * as Parallel from "./Harness.Parallel";
export { Parallel };

export * from "../fourslashRunner";
export * from "../compilerRunner";
export * from "../externalCompileRunner";
export * from "../test262Runner";
export * from "../runner";


// Must be after runner.
// NOTE: if emitting CJS, comment this out, and uncomment the one in runner.ts.
import "./tests";
