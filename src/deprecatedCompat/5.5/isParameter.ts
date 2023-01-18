import {
    Node,
    ParameterDeclaration,
    SyntaxKind,
} from "../_namespaces/ts";
import {
    deprecate,
} from "../deprecate";

// DEPRECATION: Renamed node tests
// DEPRECATION PLAN:
//     - soft: 5.5
//     - warn: 5.6
//     - error: TBD
/** @deprecated Use `isParameterDeclaration` instead. */
export const isParameter = deprecate(function isParameter(node: Node): node is ParameterDeclaration {
    return node.kind === SyntaxKind.ParameterDeclaration;
}, {
    since: "5.5",
    warnAfter: "5.6",
    message: "Use `isParameterDeclaration` instead.",
});
