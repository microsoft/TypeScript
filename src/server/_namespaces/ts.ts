/* Generated file to emulate the ts namespace. */

export * from "../../compiler/_namespaces/ts";
export * from "../../jsTyping/_namespaces/ts";
export * from "../../services/_namespaces/ts";
// Pull this in here so that plugins loaded by the server see compat wrappers.
export * from "../../deprecatedCompat/_namespaces/ts";
import * as server from "./ts.server";
export { server };
