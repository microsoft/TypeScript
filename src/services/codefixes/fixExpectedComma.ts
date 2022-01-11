import { Diagnostics, Node, SourceFile, getTokenAtPosition, SyntaxKind, isObjectLiteralExpression, isArrayLiteralExpression, factory } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "fixExpectedComma";
/* @internal */
const expectedErrorCode = Diagnostics._0_expected.code;
/* @internal */
const errorCodes = [expectedErrorCode];

/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const info = getInfo(sourceFile, context.span.start, context.errorCode);
        if (!info)
            return undefined;
        const changes = ChangeTracker.with(context, t => doChange(t, sourceFile, info));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Change_0_to_1, ";", ","], fixId, [Diagnostics.Change_0_to_1, ";", ","])];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, diag.start, diag.code);
        if (info)
            doChange(changes, context.sourceFile, info);
    }),
});

/* @internal */
interface Info {
    readonly node: Node;
}
/* @internal */

function getInfo(sourceFile: SourceFile, pos: number, _: number): Info | undefined {
    const node = getTokenAtPosition(sourceFile, pos);

    return (node.kind === SyntaxKind.SemicolonToken &&
            node.parent &&
            (isObjectLiteralExpression(node.parent) ||
             isArrayLiteralExpression(node.parent))) ? { node } : undefined;
}

/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, { node }: Info): void {
    const newNode = factory.createToken(SyntaxKind.CommaToken);
    changes.replaceNode(sourceFile, node, newNode);
}
