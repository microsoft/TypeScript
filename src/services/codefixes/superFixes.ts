/* @internal */
namespace ts.codeFix {
    function getOpenBraceEnd(constructor: ConstructorDeclaration, sourceFile: SourceFile) {
        // First token is the open curly, this is where we want to put the 'super' call.
        return constructor.body.getFirstToken(sourceFile).getEnd();
    }

    registerCodeFix({
        name: "AddMissingSuperCallFix",
        errorCodes: ["TS2377"],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const token = getTokenAtPosition(sourceFile, context.span.start);
            Debug.assert(token.kind === SyntaxKind.ConstructorKeyword, "Failed to find the constructor.");

            const newPosition = getOpenBraceEnd(<ConstructorDeclaration>token.parent, sourceFile);

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Add_missing_super_call),
                changes: [{ fileName: sourceFile.fileName, textChanges: [{ newText: "super();", span: { start: newPosition, length: 0 } }] }]
            }];
        }
    });

    registerCodeFix({
        name: "MakeSuperCallTheFirstStatementInTheConstructor",
        errorCodes: ["TS17009"],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;

            const token = getTokenAtPosition(sourceFile, context.span.start);
            const constructor = getContainingFunction(token);
            Debug.assert(constructor.kind === SyntaxKind.Constructor, "Failed to find the constructor.");

            const superCall = findSuperCall((<ConstructorDeclaration>constructor).body);
            Debug.assert(!!superCall, "Failed to find super call.");

            const newPosition = getOpenBraceEnd(<ConstructorDeclaration>constructor, sourceFile);
            const changes =  [{
                fileName: sourceFile.fileName, textChanges: [{
                    newText: superCall.getText(sourceFile),
                    span: { start: newPosition, length: 0 }
                },
                {
                    newText: "",
                    span: { start: superCall.getStart(sourceFile), length: superCall.getWidth(sourceFile) }
                }]
            }];

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Make_super_call_the_first_statement_in_the_constructor),
                changes
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