/* @internal */
namespace ts.quickFix {

    registerQuickFix({
        name: `Add missing 'super()' call.`,
        errorCodes: ["TS2377"],
        getFix: (sourceFile: SourceFile, start: number, end: number) => {
            const token = getTokenAtPosition(sourceFile, start);
            if (token.kind !== SyntaxKind.ConstructorKeyword) {
                // wait why are we not a on a constructor?
                throw new Error("Failed to find the constructor.");
            }

            const openCurly = (<ConstructorDeclaration>token.parent).body.getChildren(sourceFile)[0]; // assume this is the open curly
            const position = openCurly.getEnd();   // want to position directly after open curly, we'll format using the formatting service in the host

            return [{ newText: "super();", span: { start: position, length: 0 } }];
        }
    });

    registerQuickFix({
        name: `Make super call the first statement in the constructor.`,
        errorCodes: ["TS17009"],
        getFix: (sourceFile: SourceFile, start: number, end: number): TextChange[] => {
            const token = getTokenAtPosition(sourceFile, start);
            const constructor = getContainingFunction(token);

            if (constructor.kind !== SyntaxKind.Constructor) {
                // wait why are we not a on a constructor?
                throw new Error("Failed to find the constructor.");
            }
            const superCall = findSuperCall((<ConstructorDeclaration>constructor).body);

            const children = (<ConstructorDeclaration>constructor).body.getChildren(sourceFile);

            // first child is the open curly, this is where we want to put the 'super' call.
            const newPosition = children[0].getEnd();

            if (!superCall) {
                throw new Error(`Failed to find super call.`);
            }

            return [{
                newText: superCall.getText(sourceFile),
                span: { start: newPosition, length: 0 }
            },
            {
                newText: "",
                span: { start: superCall.getStart(sourceFile), length: superCall.getFullWidth() }
            }]

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

    registerQuickFix({
        name: `Add Type to static member access.`,
        errorCodes: ["TS2662"],
        getFix: (sourceFile: SourceFile, start: number, end: number): TextChange[] => {

            throw new Error("Not implemented");
        }
    });
}