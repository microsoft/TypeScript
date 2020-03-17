/* @internal */
namespace ts.codefix {
    const fixId = "fixExpectedComma";
    const expectedErrorCode = Diagnostics._0_expected.code;
    const errorCodes = [expectedErrorCode];

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const info = getInfo(sourceFile, context.span.start, context.errorCode);
            if (!info) { return undefined; }

            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));

            return [createCodeFixAction(
                fixId,
                changes,
                [Diagnostics.Change_0_to_1, ";", ","],
                fixId,
                [Diagnostics.Change_0_to_1, ";", ","]
            )];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, diag.start, diag.code);
            if (info) doChange(changes, context.sourceFile, info);
        }),
    });

    interface Info { readonly node: Node; }

    function getInfo(sourceFile: SourceFile, pos: number, _: number): Info | undefined {
        const node = getTokenAtPosition(sourceFile, pos);

        return (node.kind === SyntaxKind.SemicolonToken &&
                node.parent &&
                (isObjectLiteralExpression(node.parent) ||
                 isArrayLiteralExpression(node.parent))) ? { node } : undefined;
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { node }: Info): void {
        const newNode = createNode(SyntaxKind.CommaToken);
        changes.replaceNode(sourceFile, node, newNode);
    }
}
