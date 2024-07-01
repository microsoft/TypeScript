/* Generated file to emulate the ts namespace. */

export * from "../../compiler/_namespaces/ts.js";
export * from "../../jsTyping/_namespaces/ts.js";
export * from "../../services/_namespaces/ts.js";
export * from "../../server/_namespaces/ts.js";
import * as server from "./ts.server.js";

import * as ts from "./ts.js";
ts.setTypeScriptNamespace("typescript", ts);

export { server };
