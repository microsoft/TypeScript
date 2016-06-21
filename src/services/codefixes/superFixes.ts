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
            if (token.kind !== SyntaxKind.ConstructorKeyword) {
                // wait why are we not a on a constructor?
                throw new Error("Failed to find the constructor.");
            }

            const newPosition = getOpenBraceEnd(<ConstructorDeclaration>token.parent, sourceFile);

            return [{ newText: "super();", span: { start: newPosition, length: 0 } }];
        }
    });

    registerCodeFix({
        name: `Make super call the first statement in the constructor.`,
        errorCodes: ["TS17009"],
        getTextChanges: (sourceFile: SourceFile, start: number, end: number): TextChange[] => {
            const token = getTokenAtPosition(sourceFile, start);
            const constructor = getContainingFunction(token);

            if (constructor.kind !== SyntaxKind.Constructor) {
                // Wait why are we not a on a constructor?
                throw new Error("Failed to find the constructor.");
            }
            const superCall = findSuperCall((<ConstructorDeclaration>constructor).body);

            if (!superCall) {
                throw new Error("Failed to find super call.");
            }

            const newPosition = getOpenBraceEnd(<ConstructorDeclaration>constructor, sourceFile);

            return [{
                newText: superCall.getText(sourceFile),
                span: { start: newPosition, length: 0 }
            },
            {
                newText: "",
                span: { start: superCall.getStart(sourceFile), length: superCall.getFullWidth() }
            }];

            function findSuperCall(n: Node): Node {
                if (isSuperCallExpression(n)) {
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