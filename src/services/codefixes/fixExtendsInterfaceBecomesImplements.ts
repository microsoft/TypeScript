/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);

            if (!(token.kind === SyntaxKind.Identifier && token.parent.parent.parent.kind === SyntaxKind.ClassDeclaration)) {
                return undefined;
            }

            const extendsNode = (token.parent.parent as HeritageClause).getChildren()[0];

            const result = [{
                description: getLocaleSpecificMessage(Diagnostics.Change_extends_to_implements),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: [{ newText: " implements", span: { start: extendsNode.pos, length: extendsNode.end - extendsNode.pos } }]
                }]
            }];

            // We check if the implements keyword is present and replace it with a comma if so.
            const classDeclNode = getAncestor(token, SyntaxKind.ClassDeclaration);
            if (!classDeclNode) {
                return result;
            }
            const classDeclChildren = classDeclNode.getChildren();
            if (classDeclChildren.length < 3) {
                return result;
            }

            let classSyntaxListChildren: Node[];
            if (classDeclChildren[2].kind !== SyntaxKind.SyntaxList || (classSyntaxListChildren = classDeclChildren[2].getChildren()).length < 2) {
                return result;
            }

            let implementsTokenChildren: Node[];
            if ((classSyntaxListChildren[1] as HeritageClause).token !== SyntaxKind.ImplementsKeyword || (implementsTokenChildren = classSyntaxListChildren[1].getChildren()).length === 0) {
                return result;
            }

            const implementsNode = implementsTokenChildren[0];
            result[0].changes[0].textChanges.push({ newText: ",", span: { start: implementsNode.pos, length: implementsNode.end - implementsNode.pos } });

            return result;
        }
    });
}
