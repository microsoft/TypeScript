/* @internal */
namespace ts.codeFix {
    registerCodeFix({
        name: "Change Extends to Implements",
        errorCodes: ["TS2689"],
        getTextChanges: (context: CodeActionContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);

            if (token.kind === SyntaxKind.Identifier && token.parent.parent.kind === SyntaxKind.HeritageClause) {
                const children = (<HeritageClause>token.parent.parent).getChildren();
                for (const child of children) {
                    if (child.kind === SyntaxKind.ExtendsKeyword) {
                        return [{
                            fileName: sourceFile.fileName,
                            textChanges: [{ newText: "implements", span: { start: child.pos, length: child.end - child.pos } }]
                        }];
                    }
                }
            }
            Debug.fail("Failed to construct a fix.");
        }
    });
}
