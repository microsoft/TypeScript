/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics.Type_0_is_not_assignable_to_type_1_1_is_not_an_executable_regular_expression_so_a_cast_must_be_performed.code,
            Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code
        ],
        getCodeActions: getActionsForInvalidLiteralUsage
    });

    function getActionsForInvalidLiteralUsage(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;

        const candidate = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false);
        if (
            isIdentifier(candidate) &&
            (isParameter(candidate.parent) || isVariableDeclaration(candidate.parent)) &&
            candidate.parent.name === candidate) {
            return getCodeFixesForStringlyTypedExpression(context, candidate.parent.initializer, sourceFile);
        }
        else if (isExpressionNode(candidate)) {
            return getCodeFixesForStringlyTypedExpression(context, candidate as Expression, sourceFile);
        }
        // No quick fix for any other kinds
        return [];
    }

    function getCodeFixesForStringlyTypedExpression(context: CodeFixContext, node: Expression, sourceFile: SourceFile) {
        const checker = context.program.getTypeChecker();
        const targetType = checker.getContextualType(node);
        const sourceType = checker.getTypeAtLocation(node);
        const hasPotentiallyFixableError = sourceType.flags & TypeFlags.StringLiteral && targetType.flags & TypeFlags.RegularExpressionValidated && !getRegularExpressionValidatedTypeIsExecutable(targetType as RegularExpressionValidatedLiteralType);
        if (!hasPotentiallyFixableError) {
            // The contextual type won't always be the same type as that which causes the error;
            // in these cases we can't actually find the type which prodced the error to create a cast
            // Or it's just a normal assignability error for types we don't care about.
            return [];
        }
        const opts: [Expression, DiagnosticMessage][] = [
            [createAsExpression(node, checker.typeToTypeNode(targetType)), Diagnostics.Add_as_style_cast],
            [createTypeAssertion(checker.typeToTypeNode(targetType), node), Diagnostics.Add_style_cast]
        ];
        return map(opts, ([replacement, message]) => {
            const changeTracker = textChanges.ChangeTracker.fromContext(context);
            changeTracker.replaceNode(sourceFile, node, replacement);
            const changes = changeTracker.getChanges();
            const action: CodeAction = {
                description: getLocaleSpecificMessage(message),
                changes
            };
            return action;
        });
    }
}