/* @internal */
namespace ts.codeFix {
    function getOpenBraceEnd(constructor: ConstructorDeclaration, sourceFile: SourceFile) {
        // First token is the open curly, this is where we want to put the 'super' call.
        return constructor.body.getFirstToken(sourceFile).getEnd();
    }

    registerCodeFix({
        name: getLocaleSpecificMessage(Diagnostics.Add_missing_super_call),
        errorCodes: ["TS2377"],
        getTextChanges: (sourceFile: SourceFile, start: number, end: number) => {
            const token = getTokenAtPosition(sourceFile, start);
            Debug.assert(token.kind === SyntaxKind.ConstructorKeyword, "Failed to find the constructor.");

            const newPosition = getOpenBraceEnd(<ConstructorDeclaration>token.parent, sourceFile);

            return [{ fileName: sourceFile.fileName, textChanges: [{ newText: "super();", span: { start: newPosition, length: 0 } }] }];
        }
    });

    registerCodeFix({
        name: getLocaleSpecificMessage(Diagnostics.Make_super_call_the_first_statement_in_the_constructor),
        errorCodes: ["TS17009"],
        getTextChanges: (sourceFile: SourceFile, start: number, end: number) => {
            const token = getTokenAtPosition(sourceFile, start);
            const constructor = getContainingFunction(token);
            Debug.assert(constructor.kind === SyntaxKind.Constructor, "Failed to find the constructor.");

            const superCall = findSuperCall((<ConstructorDeclaration>constructor).body);
            Debug.assert(!!superCall, "Failed to find super call.");

            const newPosition = getOpenBraceEnd(<ConstructorDeclaration>constructor, sourceFile);
            return [{
                fileName: sourceFile.fileName, textChanges: [{
                    newText: superCall.getText(sourceFile),
                    span: { start: newPosition, length: 0 }
                },
                {
                    newText: "",
                    span: { start: superCall.getStart(sourceFile), length: superCall.getWidth(sourceFile) }
                }]
            }];

            function findSuperCall(n: Node): Node {
                if (n.kind === SyntaxKind.ExpressionStatement && isSuperCallExpression((<ExpressionStatement>n).expression)) {
                    return n;
                }
                if (isFunctionLike(n)) {
                    return undefined;
                }
                return forEachChild(n, findSuperCall);
            }
        }
    });
}