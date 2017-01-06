/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
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

            let changeStart = extendsToken.getStart(sourceFile);
            let changeEnd = extendsToken.getEnd();
            const textChanges: TextChange[] = [{ newText: " implements", span: { start: changeStart, length: changeEnd - changeStart } }];

            // We replace existing keywords with commas.
            for (let i = 1; i < heritageClauses.length; i++) {
                const keywordToken = heritageClauses[i].getFirstToken();
                if (keywordToken) {
                    changeStart = keywordToken.getStart(sourceFile);
                    changeEnd = keywordToken.getEnd();
                    textChanges.push({ newText: ",", span: { start: changeStart, length: changeEnd - changeStart } });
                }
            }

            const result = [{
                description: getLocaleSpecificMessage(Diagnostics.Change_extends_to_implements),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: textChanges
                }]
            }];

            return result;
        }
    });
}
