import {
    Node,
    ParameterDeclaration,
    SyntaxKind,
} from "../_namespaces/ts.js";
import { deprecate } from "../deprecate.js";

// DEPRECATION: Renamed node tests
// DEPRECATION PLAN:
//     - soft: 5.6
//     - warn: 5.7
//     - error: TBD
/** @deprecated Use `isParameterDeclaration` instead. */
export const isParameter: (node: Node) => node is ParameterDeclaration = deprecate(function isParameter(node: Node): node is ParameterDeclaration {
    return node.kind === SyntaxKind.Parameter;
}, {
    since: "5.6",
    warnAfter: "5.7",
    message: "Use `isParameterDeclaration` instead.",
});
