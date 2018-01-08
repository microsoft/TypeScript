/* @internal */
namespace ts.codefix {
    const fixId = "fixAwaitInSyncFunction";
    const errorCodes = [
        Diagnostics.await_expression_is_only_allowed_within_an_async_function.code,
        Diagnostics.A_for_await_of_statement_is_only_allowed_within_an_async_function_or_async_generator.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const node = getNode(sourceFile, span.start);
            if (!node) return undefined;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, node));
            return [{ description: getLocaleSpecificMessage(Diagnostics.Convert_to_async), changes, fixId }];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) =>
            doChange(changes, context.sourceFile, getNode(diag.file, diag.start!))),
    });

    function getNode(sourceFile: SourceFile, pos: number): FunctionLikeDeclaration {
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        const containingFunction = getContainingFunction(token);
        if (!isFunctionLikeDeclaration(containingFunction) ||
            isConstructorDeclaration(containingFunction) ||
            isGetAccessorDeclaration(containingFunction) ||
            isSetAccessorDeclaration(containingFunction)) return;
        return containingFunction;
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, decl: FunctionLikeDeclaration) {
        const asyncToken = createToken(SyntaxKind.AsyncKeyword);
        const modifiers = decl.modifiers ? decl.modifiers.concat(asyncToken) : createNodeArray([asyncToken]);
        let changed;
        switch (decl.kind) {
            case SyntaxKind.MethodDeclaration:
                changed = createMethod(decl.decorators, modifiers, decl.asteriskToken, decl.name, decl.questionToken, decl.typeParameters, decl.parameters, decl.type, decl.body);
                break;
            case SyntaxKind.FunctionExpression:
                changed = createFunctionExpression(modifiers, decl.asteriskToken, decl.name, decl.typeParameters, decl.parameters, decl.type, decl.body);
                break;
            case SyntaxKind.FunctionDeclaration:
                changed = createFunctionDeclaration(decl.decorators, modifiers, decl.asteriskToken, decl.name, decl.typeParameters, decl.parameters, decl.type, decl.body);
                break;
            case SyntaxKind.ArrowFunction:
                changed = createArrowFunction(modifiers, decl.typeParameters, decl.parameters, decl.type, decl.equalsGreaterThanToken, decl.body);
                break;
        }
        changes.replaceNode(sourceFile, decl, changed);
    }
}
