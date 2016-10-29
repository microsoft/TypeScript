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

            const textChanges: TextChange[] = [];

            const heritageNodes = (<HeritageClause>token.parent.parent).getChildren();

            // This should never fail
            Debug.assert(heritageNodes.length > 0);
            const extendsIndex = 0;
            const extendsNode = heritageNodes[0];

            Debug.assert(extendsIndex === 0);
            
            // We change the extends keyword to implements.
            textChanges.push({ newText: " implements", span: { start: extendsNode.pos, length: extendsNode.end - extendsNode.pos } });

            try {
                // If the implements keyword exists, we replace it with a comma.
                const implementsToken = <HeritageClause>token.parent.parent.parent.getChildren()[2].getChildren()[1];
                Debug.assert(implementsToken.token === SyntaxKind.ImplementsKeyword);
                const implementsNode = implementsToken.getChildren()[0];
                textChanges.push({ newText: ",", span: { start: implementsNode.pos, length: implementsNode.end - implementsToken.pos } });
            }
            catch (e) {}

            return [{
                // TODO: (arozga) Move the locale-specific conversion further up the stack, since all
                // the codefixes will need to call this?
                description: getLocaleSpecificMessage(Diagnostics.Change_extends_to_implements),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: textChanges
                }]
            }];
        }
    });
}
