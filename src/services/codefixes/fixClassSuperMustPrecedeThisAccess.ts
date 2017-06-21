/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;

            const token = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false);
            if (token.kind !== SyntaxKind.ThisKeyword) {
                return undefined;
            }

            const constructor = getContainingFunction(token);
            const superCall = findSuperCall((<ConstructorDeclaration>constructor).body);
            if (!superCall) {
                return undefined;
            }

            // figure out if the `this` access is actually inside the supercall
            // i.e. super(this.a), since in that case we won't suggest a fix
            if (superCall.expression && superCall.expression.kind === SyntaxKind.CallExpression) {
                const expressionArguments = (<CallExpression>superCall.expression).arguments;
                for (let i = 0; i < expressionArguments.length; i++) {
                    if ((<PropertyAccessExpression>expressionArguments[i]).expression === token) {
                        return undefined;
                    }
                }
            }
            const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
            changeTracker.insertNodeAfter(sourceFile, getOpenBrace(<ConstructorDeclaration>constructor, sourceFile), superCall, { suffix: context.newLineCharacter });
            changeTracker.deleteNode(sourceFile, superCall);

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Make_super_call_the_first_statement_in_the_constructor),
                changes: changeTracker.getChanges()
            }];

            function findSuperCall(n: Node): ExpressionStatement {
                if (n.kind === SyntaxKind.ExpressionStatement && isSuperCall((<ExpressionStatement>n).expression)) {
                    return <ExpressionStatement>n;
                }
                if (isFunctionLike(n)) {
                    return undefined;
                }
                return forEachChild(n, findSuperCall);
            }
        }
    });
}
