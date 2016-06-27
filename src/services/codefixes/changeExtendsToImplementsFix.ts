/* @internal */
namespace ts.codeFix {
    registerCodeFix({
        name: "Change Extends to Implements",
        errorCodes: ["TS2689"],
        getTextChanges: (sourceFile: SourceFile, start: number, end: number) => {
            const token = getTokenAtPosition(sourceFile, start);
            if(token.kind === SyntaxKind.Identifier && token.parent.parent.kind === SyntaxKind.HeritageClause) {
                let children = (<HeritageClause>token.parent.parent).getChildren();
                for(const child of children) {
                    if(child.kind === SyntaxKind.ExtendsKeyword) {
                        return [{ newText: "implements", span: { start: child.pos, length: child.end - child.pos}}];
                    }
                }
            }
            Debug.fail("No Quick fix found.");
        }
    });
}
