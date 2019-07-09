/* @internal */
namespace ts.codefix {
    const fixId = "addMissingAwait";
    const errorCodes = [
        Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_bigint_or_an_enum_type.code,
        Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type.code,
        Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type.code,
        Diagnostics.Operator_0_cannot_be_applied_to_type_1.code,
        Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2.code,
        Diagnostics.This_condition_will_always_return_0_since_the_types_1_and_2_have_no_overlap.code,
        Diagnostics.Type_0_must_have_a_Symbol_iterator_method_that_returns_an_iterator.code,
        Diagnostics.Type_0_must_have_a_Symbol_asyncIterator_method_that_returns_an_async_iterator.code,
        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code,
        Diagnostics.This_expression_is_not_callable.code,
        Diagnostics.This_expression_is_not_constructable.code,
    ];

    registerCodeFix({
        fixIds: [fixId],
        errorCodes,
        getCodeActions: context => {
            const { sourceFile, span, program } = context;
            const expression = getAwaitableExpression(sourceFile, span);
            if (!expression || !isMissingAwaitError(context)) {
                return;
            }

            const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, sourceFile, expression));
            const fixes = [createCodeFixAction(fixId, changes, Diagnostics.Add_await, fixId, Diagnostics.Fix_all_expressions_possibly_missing_await)];
            const awaitableInitializer = findAwaitableInitializer(expression, sourceFile, program);
            if (awaitableInitializer) {
                const initializerChanges = textChanges.ChangeTracker.with(context, t => makeChange(t, sourceFile, awaitableInitializer));
                fixes.push(createCodeFixActionNoFixId(
                    "addMissingAwaitToInitializer",
                    initializerChanges,
                    [Diagnostics.Add_await_to_initializer_for_0, expression.getText(sourceFile)]));
            }

            return fixes;
        },
    });

    function isMissingAwaitError({ sourceFile, cancellationToken, program, errorCode, span }: CodeFixContext) {
        const checker = program.getDiagnosticsProducingTypeChecker();
        const diagnostics = checker.getDiagnostics(sourceFile, cancellationToken);
        return some(diagnostics, ({ start, length, relatedInformation, code }) =>
            isNumber(start) && isNumber(length) && textSpansEqual({ start, length }, span) &&
            code === errorCode &&
            !!relatedInformation &&
            some(relatedInformation, related => related.code === Diagnostics.Did_you_forget_to_use_await.code));
    }

    function getAwaitableExpression(sourceFile: SourceFile, span: TextSpan) {
        const token = getTokenAtPosition(sourceFile, span.start);
        return findAncestor(token, node => {
            if (node.getStart(sourceFile) < span.start || node.getEnd() > textSpanEnd(span)) {
                return "quit";
            }
            return textSpansEqual(span, createTextSpanFromNode(node, sourceFile)) && isExpressionNode(node);
        });
    }

    function findAwaitableInitializer(expression: Node, sourceFile: SourceFile, program: Program): Node | undefined {
        if (!isIdentifier(expression)) {
            return;
        }

        const checker = program.getTypeChecker();
        const symbol = checker.getSymbolAtLocation(expression);
        if (!symbol) {
            return;
        }

        const declaration = tryCast(symbol.valueDeclaration, isVariableDeclaration);
        const variableName = tryCast(declaration && declaration.name, isIdentifier);
        const variableStatement = getAncestor(declaration, SyntaxKind.VariableStatement);
        if (!declaration || !variableStatement ||
            declaration.type ||
            !declaration.initializer ||
            variableStatement.getSourceFile() !== sourceFile ||
            hasModifier(variableStatement, ModifierFlags.Export) ||
            !variableName) {
            return;
        }

        const isUsedElsewhere = FindAllReferences.Core.eachSymbolReferenceInFile(variableName, checker, sourceFile, identifier => {
            return identifier !== expression;
        });

        if (isUsedElsewhere) {
            return;
        }

        return declaration.initializer;
    }

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, insertionSite: Node) {
        changeTracker.insertModifierBefore(sourceFile, SyntaxKind.AwaitKeyword, insertionSite);
    }
}
