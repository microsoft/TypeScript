/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
            const classDeclNode = getContainingClass(token);
            if (!(token.kind === SyntaxKind.Identifier && isClassLike(classDeclNode))) {
                return undefined;
            }

            const heritageClauses = classDeclNode.heritageClauses;
            if (!(heritageClauses && heritageClauses.length > 0)) {
                return undefined;
            }

            const extendsToken = heritageClauses[0].getFirstToken();
            if (!(extendsToken && extendsToken.kind === SyntaxKind.ExtendsKeyword)) {
                return undefined;
            }

            const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
            changeTracker.replaceNode(sourceFile, extendsToken, createToken(SyntaxKind.ImplementsKeyword));

            // We replace existing keywords with commas.
            for (let i = 1; i < heritageClauses.length; i++) {
                const keywordToken = heritageClauses[i].getFirstToken();
                if (keywordToken) {
                    changeTracker.replaceNode(sourceFile, keywordToken, createToken(SyntaxKind.CommaToken));
                }
            }

            const result = [{
                description: getLocaleSpecificMessage(Diagnostics.Change_extends_to_implements),
                changes: changeTracker.getChanges()
            }];

            return result;
        }
    });
}
