/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const textChanges: TextChange[] = [];

            if (token.kind === SyntaxKind.Identifier && token.parent.parent.kind === SyntaxKind.HeritageClause) {
                const children = (<HeritageClause>token.parent.parent).getChildren();
                ts.forEach(children, child => {
                    if (child.kind === SyntaxKind.ExtendsKeyword) {
                        textChanges.push({ newText: " implements", span: { start: child.pos, length: child.end - child.pos } });
                    }
                });
            }

            if (textChanges.length > 0) {
                return [{
                    description: getLocaleSpecificMessage(Diagnostics.Change_extends_to_implements),
                    changes: [{
                        fileName: sourceFile.fileName,
                        textChanges: textChanges
                    }]
                }];
            }

            return undefined;
        }
    });
}
