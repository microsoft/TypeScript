import * as ts from "../_namespaces/ts";

const fixId = "fixExpectedComma";
const expectedErrorCode = ts.Diagnostics._0_expected.code;
const errorCodes = [expectedErrorCode];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const info = getInfo(sourceFile, context.span.start, context.errorCode);
        if (!info) return undefined;

        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));

        return [ts.codefix.createCodeFixAction(
            fixId,
            changes,
            [ts.Diagnostics.Change_0_to_1, ";", ","],
            fixId,
            [ts.Diagnostics.Change_0_to_1, ";", ","]
        )];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, diag.start, diag.code);
        if (info) doChange(changes, context.sourceFile, info);
    }),
});

interface Info { readonly node: ts.Node; }

function getInfo(sourceFile: ts.SourceFile, pos: number, _: number): Info | undefined {
    const node = ts.getTokenAtPosition(sourceFile, pos);

    return (node.kind === ts.SyntaxKind.SemicolonToken &&
            node.parent &&
            (ts.isObjectLiteralExpression(node.parent) ||
             ts.isArrayLiteralExpression(node.parent))) ? { node } : undefined;
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, { node }: Info): void {
    const newNode = ts.factory.createToken(ts.SyntaxKind.CommaToken);
    changes.replaceNode(sourceFile, node, newNode);
}
