import * as ts from "../_namespaces/ts";

// DEPRECATION: Renamed node tests
// DEPRECATION PLAN:
//     - soft: 4.0
//     - warn: 4.1
//     - error: TBD
/** @deprecated Use `isTypeAssertionExpression` instead. */
export const isTypeAssertion = ts.Debug.deprecate(function isTypeAssertion(node: ts.Node): node is ts.TypeAssertion {
    return node.kind === ts.SyntaxKind.TypeAssertionExpression;
}, {
    since: "4.0",
    warnAfter: "4.1",
    message: "Use `isTypeAssertionExpression` instead."
});