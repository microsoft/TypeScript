/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const classDeclNode = getAncestor(token, SyntaxKind.ClassDeclaration) as ClassDeclaration;
            if (!(token.kind === SyntaxKind.Identifier && classDeclNode && classDeclNode.kind === SyntaxKind.ClassDeclaration)) {
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

            const result = [{
                description: getLocaleSpecificMessage(Diagnostics.Change_extends_to_implements),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: [{ newText: " implements", span: { start: extendsToken.pos, length: extendsToken.end - extendsToken.pos } }]
                }]
            }];

            // We check if the implements keyword is present and replace it with a comma if so.
            for (let i = 1; i < heritageClauses.length; i++) {
                const keywordToken = heritageClauses[i].getFirstToken();
                if (keywordToken) {
                    result[0].changes[0].textChanges.push({ newText: ",", span: { start: keywordToken.pos, length: keywordToken.end - keywordToken.pos } });
                }
            }

            return result;
        }
    });
}
