/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.JSDoc_types_can_only_be_used_inside_documentation_comments.code],
        getCodeActions: getActionsForJSDocTypes
    });

    function getActionsForJSDocTypes(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;

        const node = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false);
        if (node.kind !== SyntaxKind.VariableDeclaration) return;

        const type = (node as VariableDeclaration).type;
        if (containsJSDocType(type)) {
            const tsType = getTypeFromJSDocType(type);
            return [{
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Change_0_to_1), [getTextOfNode(type), tsType]),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: [{
                        span: { start: type.getStart(), length: type.getWidth() },
                        newText: tsType
                    }],
                }],
            }];
        }
    }

    function containsJSDocType(type: TypeNode): boolean {
        switch (type.kind) {
            case SyntaxKind.JSDocUnknownType:
            case SyntaxKind.JSDocAllType:
            case SyntaxKind.JSDocVariadicType:
                return true;
            // TODO: Of course you can put JSDoc types inside normal types, like number?[] and so on
        }
    }

    function getTypeFromJSDocType(type: TypeNode): string {
        switch (type.kind) {
            case SyntaxKind.JSDocUnknownType:
            case SyntaxKind.JSDocAllType:
                return "any";
            case SyntaxKind.JSDocVariadicType:
                // this will surely work!
                return getTypeFromJSDocType((type as JSDocVariadicType).type) + "[]";
            // TODO: Of course you can put JSDoc types inside normal types, like number?[] and so on
        }
        return getTextOfNode(type);
    }
}
