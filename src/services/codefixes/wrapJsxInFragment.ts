import * as ts from "../_namespaces/ts";

const fixID = "wrapJsxInFragment";
const errorCodes = [ts.Diagnostics.JSX_expressions_must_have_one_parent_element.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToWrapJsxInFragment(context) {
        const { sourceFile, span } = context;
        const node = findNodeToFix(sourceFile, span.start);
        if (!node) return undefined;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, node));
        return [ts.codefix.createCodeFixAction(fixID, changes, ts.Diagnostics.Wrap_in_JSX_fragment, fixID, ts.Diagnostics.Wrap_all_unparented_JSX_in_JSX_fragment)];
    },
    fixIds: [fixID],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const node = findNodeToFix(context.sourceFile, diag.start);
        if (!node) return undefined;
        doChange(changes, context.sourceFile, node);
    }),
});

function findNodeToFix(sourceFile: ts.SourceFile, pos: number): ts.BinaryExpression | undefined {
    // The error always at 1st token that is "<" in "<a /><a />"
    const lessThanToken = ts.getTokenAtPosition(sourceFile, pos);
    const firstJsxElementOrOpenElement = lessThanToken.parent;
    let binaryExpr = firstJsxElementOrOpenElement.parent;
    if (!ts.isBinaryExpression(binaryExpr)) {
        // In case the start element is a JsxSelfClosingElement, it the end.
        // For JsxOpenElement, find one more parent
        binaryExpr = binaryExpr.parent;
        if (!ts.isBinaryExpression(binaryExpr)) return undefined;
    }
    if (!ts.nodeIsMissing(binaryExpr.operatorToken)) return undefined;
    return binaryExpr;
}

function doChange(changeTracker: ts.textChanges.ChangeTracker, sf: ts.SourceFile, node: ts.Node) {
    const jsx = flattenInvalidBinaryExpr(node);
    if (jsx) changeTracker.replaceNode(sf, node, ts.factory.createJsxFragment(ts.factory.createJsxOpeningFragment(), jsx, ts.factory.createJsxJsxClosingFragment()));
}
// The invalid syntax is constructed as
// InvalidJsxTree :: One of
//     JsxElement CommaToken InvalidJsxTree
//     JsxElement CommaToken JsxElement
function flattenInvalidBinaryExpr(node: ts.Node): ts.JsxChild[] | undefined {
    const children: ts.JsxChild[] = [];
    let current = node;
    while (true) {
        if (ts.isBinaryExpression(current) && ts.nodeIsMissing(current.operatorToken) && current.operatorToken.kind === ts.SyntaxKind.CommaToken) {
            children.push(current.left as ts.JsxChild);
            if (ts.isJsxChild(current.right)) {
                children.push(current.right);
                // Indicates the tree has go to the bottom
                return children;
            }
            else if (ts.isBinaryExpression(current.right)) {
                current = current.right;
                continue;
            }
            // Unreachable case
            else return undefined;
        }
        // Unreachable case
        else return undefined;
    }
}
