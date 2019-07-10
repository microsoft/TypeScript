/* @internal */
namespace ts.codefix {
    type ContextualTrackChangesFunction = (cb: (changeTracker: textChanges.ChangeTracker) => void) => FileTextChanges[];
    const awaitPrecedence = getOperatorPrecedence(SyntaxKind.AwaitExpression, undefined!);
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
        getCodeActions: getAllPossibleFixesForError,
        getAllCodeActions: context => {
            const { sourceFile, program, cancellationToken } = context;
            const checker = context.program.getTypeChecker();
            return codeFixAll(context, errorCodes, (t, diagnostic) => {
                const expression = getAwaitableExpression(sourceFile, diagnostic.code, diagnostic, cancellationToken, program);
                if (!expression) {
                    return;
                }
                const trackChanges: ContextualTrackChangesFunction = cb => (cb(t), []);
                return getDeclarationSiteFix(context, expression, checker, trackChanges)
                    || getUseSiteFix(context, expression, checker, trackChanges);
            });
        },
    });

    function getAllPossibleFixesForError(context: CodeFixContext) {
        const { sourceFile, errorCode, span, cancellationToken, program } = context;
        const expression = getAwaitableExpression(sourceFile, errorCode, span, cancellationToken, program);
        if (!expression) {
            return;
        }

        const checker = context.program.getTypeChecker();
        const trackChanges: ContextualTrackChangesFunction = cb => textChanges.ChangeTracker.with(context, cb);
        return compact([
            getDeclarationSiteFix(context, expression, checker, trackChanges),
            getUseSiteFix(context, expression, checker, trackChanges)]);
    }

    function getDeclarationSiteFix(context: CodeFixContext | CodeFixAllContext, expression: Expression, checker: TypeChecker, trackChanges: ContextualTrackChangesFunction) {
        const { sourceFile } = context;
        const awaitableInitializer = findAwaitableInitializer(expression, sourceFile, checker);
        if (awaitableInitializer) {
            const initializerChanges = trackChanges(t => makeChange(t, sourceFile, checker, awaitableInitializer));
            return createCodeFixActionNoFixId(
                "addMissingAwaitToInitializer",
                initializerChanges,
                [Diagnostics.Add_await_to_initializer_for_0, expression.getText(sourceFile)]);
        }
    }

    function getUseSiteFix(context: CodeFixContext | CodeFixAllContext, expression: Expression, checker: TypeChecker, trackChanges: ContextualTrackChangesFunction) {
        const changes = trackChanges(t => makeChange(t, context.sourceFile, checker, expression));
        return createCodeFixAction(fixId, changes, Diagnostics.Add_await, fixId, Diagnostics.Fix_all_expressions_possibly_missing_await);
    }

    function isMissingAwaitError(sourceFile: SourceFile, errorCode: number, span: TextSpan, cancellationToken: CancellationToken, program: Program) {
        const checker = program.getDiagnosticsProducingTypeChecker();
        const diagnostics = checker.getDiagnostics(sourceFile, cancellationToken);
        return some(diagnostics, ({ start, length, relatedInformation, code }) =>
            isNumber(start) && isNumber(length) && textSpansEqual({ start, length }, span) &&
            code === errorCode &&
            !!relatedInformation &&
            some(relatedInformation, related => related.code === Diagnostics.Did_you_forget_to_use_await.code));
    }

    function getAwaitableExpression(sourceFile: SourceFile, errorCode: number, span: TextSpan, cancellationToken: CancellationToken, program: Program): Expression | undefined {
        const token = getTokenAtPosition(sourceFile, span.start);
        const expression = findAncestor(token, node => {
            if (node.getStart(sourceFile) < span.start || node.getEnd() > textSpanEnd(span)) {
                return "quit";
            }
            return isExpression(node) && textSpansEqual(span, createTextSpanFromNode(node, sourceFile));
        }) as Expression | undefined;

        return isMissingAwaitError(sourceFile, errorCode, span, cancellationToken, program) ? expression : undefined;
    }

    function findAwaitableInitializer(expression: Node, sourceFile: SourceFile, checker: TypeChecker): Expression | undefined {
        if (!isIdentifier(expression)) {
            return;
        }

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

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, checker: TypeChecker, insertionSite: Expression) {
        if (isBinaryExpression(insertionSite)) {
            const { left, right } = insertionSite;
            const leftType = checker.getTypeAtLocation(left);
            const rightType = checker.getTypeAtLocation(right);
            const newLeft = checker.getPromisedTypeOfPromise(leftType) ? createAwait(left) : left;
            const newRight = checker.getPromisedTypeOfPromise(rightType) ? createAwait(right) : right;
            changeTracker.replaceNode(sourceFile, left, newLeft);
            changeTracker.replaceNode(sourceFile, right, newRight);
            return;
        }

        const parentExpression = tryCast(insertionSite.parent, isExpression);
        const awaitExpression = createAwait(insertionSite);
        changeTracker.replaceRange(
            sourceFile,
            rangeOfNode(insertionSite),
            parentExpression && getExpressionPrecedence(parentExpression) > awaitPrecedence
                ? createParen(awaitExpression)
                : awaitExpression);
    }
}
