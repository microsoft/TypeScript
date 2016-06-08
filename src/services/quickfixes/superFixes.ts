

/* @internal */
namespace ts.quickFix {

    registerQuickFix({
        name: `Add missing 'super()' call.`,
        errorCode: "TS2377",
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
        errorCode: "TS17009",
        getFix: (SourceFile: SourceFile, start: number, end: number): [{ newText: string; span: { start: number, length: number } }] => {

            throw new Error("Not implemented");
        }
    });

    registerQuickFix({
        name: `Add Type to static member access.`,
        errorCode: "TS2662",
        getFix: (SourceFile: SourceFile, start: number, end: number): [{ newText: string; span: { start: number, length: number } }] => {

            throw new Error("Not implemented");
        }
    });
}