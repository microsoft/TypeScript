/* Generated file to emulate the ts namespace. */

export * from "../../compiler/_namespaces/ts.js";
export * from "../../jsTyping/_namespaces/ts.js";
export * from "../../services/_namespaces/ts.js";
// Pull this in here so that plugins loaded by the server see compat wrappers.
export * from "../../deprecatedCompat/_namespaces/ts.js";
import * as server from "./ts.server.js";
export { server };
