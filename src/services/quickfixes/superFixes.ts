///<reference path='..\services.ts' />
///<reference path='quickFixProvider.ts' />

/* @internal */
namespace ts.quickFix {
    export const MissingSuperFix: QuickFix = {
        name: `Add missing 'super()' call.`,
        errorCode: "TS2377",
        getFix: (sourceFile: SourceFile, start: number, end: number) => {
            const token = getTokenAtPosition(sourceFile, start);
            if (token.kind !== SyntaxKind.ConstructorKeyword) {
                // wait why are we not a on a constructor?
                return [];
            }

            const openCurly = (<ConstructorDeclaration>token.parent).body.getChildren(sourceFile)[0]; // assume this is the open curly
            const position = openCurly.getEnd();   // want to position directly after open curly, we'll format using the formatting service in the host

            return [{ newText: "super();", span: { start: position, length: 0 } }];
        }
    }

    export const SuperOrderFix: QuickFix = {
        name: `Make super call the first statement in the constructor.`,
        errorCode: "TS17009",
        getFix: (SourceFile: SourceFile, start: number, end: number): [{ newText: string; span: { start: number, length: number } }] => {

            throw new Error("Not implemented");
        }
    }
}