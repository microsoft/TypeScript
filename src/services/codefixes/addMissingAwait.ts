import {
    codeFixAll,
    createCodeFixAction,
    createCodeFixActionWithoutFixAll,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    CancellationToken,
    CodeFixAllContext,
    CodeFixContext,
    compact,
    contains,
    Diagnostic,
    Diagnostics,
    Expression,
    factory,
    FileTextChanges,
    find,
    FindAllReferences,
    findAncestor,
    findPrecedingToken,
    forEach,
    getAncestor,
    getFixableErrorSpanExpression,
    getSymbolId,
    hasSyntacticModifier,
    Identifier,
    isArrowFunction,
    isBinaryExpression,
    isBlock,
    isCallOrNewExpression,
    isForOfStatement,
    isIdentifier,
    isNumber,
    isPropertyAccessExpression,
    isVariableDeclaration,
    ModifierFlags,
    Node,
    NodeFlags,
    positionIsASICandidate,
    Program,
    some,
    SourceFile,
    Symbol,
    SyntaxKind,
    textChanges,
    TextSpan,
    textSpansEqual,
    tryAddToSet,
    tryCast,
    TypeChecker,
    TypeFlags,
} from "../_namespaces/ts.js";

type ContextualTrackChangesFunction = (cb: (changeTracker: textChanges.ChangeTracker) => void) => FileTextChanges[];
const fixId = "addMissingAwait";
const propertyAccessCode = Diagnostics.Property_0_does_not_exist_on_type_1.code;
const callableConstructableErrorCodes = [
    Diagnostics.This_expression_is_not_callable.code,
    Diagnostics.This_expression_is_not_constructable.code,
];
const errorCodes = [
    Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_bigint_or_an_enum_type.code,
    Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type.code,
    Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type.code,
    Diagnostics.Operator_0_cannot_be_applied_to_type_1.code,
    Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2.code,
    Diagnostics.This_comparison_appears_to_be_unintentional_because_the_types_0_and_1_have_no_overlap.code,
    Diagnostics.This_condition_will_always_return_true_since_this_0_is_always_defined.code,
    Diagnostics.Type_0_is_not_an_array_type.code,
    Diagnostics.Type_0_is_not_an_array_type_or_a_string_type.code,
    Diagnostics.Type_0_can_only_be_iterated_through_when_using_the_downlevelIteration_flag_or_with_a_target_of_es2015_or_higher.code,
    Diagnostics.Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator.code,
    Diagnostics.Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator.code,
    Diagnostics.Type_0_must_have_a_Symbol_iterator_method_that_returns_an_iterator.code,
    Diagnostics.Type_0_must_have_a_Symbol_asyncIterator_method_that_returns_an_async_iterator.code,
    Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code,
    propertyAccessCode,
    ...callableConstructableErrorCodes,
];

registerCodeFix({
    fixIds: [fixId],
    errorCodes,
    getCodeActions: function getCodeActionsToAddMissingAwait(context) {
        const { sourceFile, errorCode, span, cancellationToken, program } = context;
        const expression = getAwaitErrorSpanExpression(sourceFile, errorCode, span, cancellationToken, program);
        if (!expression) {
            return;
        }

        const checker = context.program.getTypeChecker();
        const trackChanges: ContextualTrackChangesFunction = cb => textChanges.ChangeTracker.with(context, cb);
        return compact([
            getDeclarationSiteFix(context, expression, errorCode, checker, trackChanges),
            getUseSiteFix(context, expression, errorCode, checker, trackChanges),
        ]);
    },
    getAllCodeActions: context => {
        const { sourceFile, program, cancellationToken } = context;
        const checker = context.program.getTypeChecker();
        const fixedDeclarations = new Set<number>();
        return codeFixAll(context, errorCodes, (t, diagnostic) => {
            const expression = getAwaitErrorSpanExpression(sourceFile, diagnostic.code, diagnostic, cancellationToken, program);
            if (!expression) {
                return;
            }
            const trackChanges: ContextualTrackChangesFunction = cb => (cb(t), []);
            return getDeclarationSiteFix(context, expression, diagnostic.code, checker, trackChanges, fixedDeclarations)
                || getUseSiteFix(context, expression, diagnostic.code, checker, trackChanges, fixedDeclarations);
        });
    },
});

function getAwaitErrorSpanExpression(sourceFile: SourceFile, errorCode: number, span: TextSpan, cancellationToken: CancellationToken, program: Program) {
    const expression = getFixableErrorSpanExpression(sourceFile, span);
    return expression
            && isMissingAwaitError(sourceFile, errorCode, span, cancellationToken, program)
            && isInsideAwaitableBody(expression) ? expression : undefined;
}

function getDeclarationSiteFix(context: CodeFixContext | CodeFixAllContext, expression: Expression, errorCode: number, checker: TypeChecker, trackChanges: ContextualTrackChangesFunction, fixedDeclarations?: Set<number>) {
    const { sourceFile, program, cancellationToken } = context;
    const awaitableInitializers = findAwaitableInitializers(expression, sourceFile, cancellationToken, program, checker);
    if (awaitableInitializers) {
        const initializerChanges = trackChanges(t => {
            forEach(awaitableInitializers.initializers, ({ expression }) => makeChange(t, errorCode, sourceFile, checker, expression, fixedDeclarations));
            if (fixedDeclarations && awaitableInitializers.needsSecondPassForFixAll) {
                makeChange(t, errorCode, sourceFile, checker, expression, fixedDeclarations);
            }
        });
        // No fix-all because it will already be included once with the use site fix,
        // and for simplicity the fix-all doesn't let the user choose between use-site and declaration-site fixes.
        return createCodeFixActionWithoutFixAll(
            "addMissingAwaitToInitializer",
            initializerChanges,
            awaitableInitializers.initializers.length === 1
                ? [Diagnostics.Add_await_to_initializer_for_0, awaitableInitializers.initializers[0].declarationSymbol.name]
                : Diagnostics.Add_await_to_initializers,
        );
    }
}

function getUseSiteFix(context: CodeFixContext | CodeFixAllContext, expression: Expression, errorCode: number, checker: TypeChecker, trackChanges: ContextualTrackChangesFunction, fixedDeclarations?: Set<number>) {
    const changes = trackChanges(t => makeChange(t, errorCode, context.sourceFile, checker, expression, fixedDeclarations));
    return createCodeFixAction(fixId, changes, Diagnostics.Add_await, fixId, Diagnostics.Fix_all_expressions_possibly_missing_await);
}

function isMissingAwaitError(sourceFile: SourceFile, errorCode: number, span: TextSpan, cancellationToken: CancellationToken, program: Program) {
    const checker = program.getTypeChecker();
    const diagnostics = checker.getDiagnostics(sourceFile, cancellationToken);
    return some(diagnostics, ({ start, length, relatedInformation, code }) =>
        isNumber(start) && isNumber(length) && textSpansEqual({ start, length }, span) &&
        code === errorCode &&
        !!relatedInformation &&
        some(relatedInformation, related => related.code === Diagnostics.Did_you_forget_to_use_await.code));
}

interface AwaitableInitializer {
    expression: Expression;
    declarationSymbol: Symbol;
}

interface AwaitableInitializers {
    initializers: readonly AwaitableInitializer[];
    needsSecondPassForFixAll: boolean;
}

function findAwaitableInitializers(
    expression: Node,
    sourceFile: SourceFile,
    cancellationToken: CancellationToken,
    program: Program,
    checker: TypeChecker,
): AwaitableInitializers | undefined {
    const identifiers = getIdentifiersFromErrorSpanExpression(expression, checker);
    if (!identifiers) {
        return;
    }

    let isCompleteFix = identifiers.isCompleteFix;
    let initializers: AwaitableInitializer[] | undefined;
    for (const identifier of identifiers.identifiers) {
        const symbol = checker.getSymbolAtLocation(identifier);
        if (!symbol) {
            continue;
        }

        const declaration = tryCast(symbol.valueDeclaration, isVariableDeclaration);
        const variableName = declaration && tryCast(declaration.name, isIdentifier);
        const variableStatement = getAncestor(declaration, SyntaxKind.VariableStatement);
        if (
            !declaration || !variableStatement ||
            declaration.type ||
            !declaration.initializer ||
            variableStatement.getSourceFile() !== sourceFile ||
            hasSyntacticModifier(variableStatement, ModifierFlags.Export) ||
            !variableName ||
            !isInsideAwaitableBody(declaration.initializer)
        ) {
            isCompleteFix = false;
            continue;
        }

        const diagnostics = program.getSemanticDiagnostics(sourceFile, cancellationToken);
        const isUsedElsewhere = FindAllReferences.Core.eachSymbolReferenceInFile(variableName, checker, sourceFile, reference => {
            return identifier !== reference && !symbolReferenceIsAlsoMissingAwait(reference, diagnostics, sourceFile, checker);
        });

        if (isUsedElsewhere) {
            isCompleteFix = false;
            continue;
        }

        (initializers || (initializers = [])).push({
            expression: declaration.initializer,
            declarationSymbol: symbol,
        });
    }
    return initializers && {
        initializers,
        needsSecondPassForFixAll: !isCompleteFix,
    };
}

interface Identifiers {
    identifiers: readonly Identifier[];
    isCompleteFix: boolean;
}

function getIdentifiersFromErrorSpanExpression(expression: Node, checker: TypeChecker): Identifiers | undefined {
    if (isPropertyAccessExpression(expression.parent) && isIdentifier(expression.parent.expression)) {
        return { identifiers: [expression.parent.expression], isCompleteFix: true };
    }
    if (isIdentifier(expression)) {
        return { identifiers: [expression], isCompleteFix: true };
    }
    if (isBinaryExpression(expression)) {
        let sides: Identifier[] | undefined;
        let isCompleteFix = true;
        for (const side of [expression.left, expression.right]) {
            const type = checker.getTypeAtLocation(side);
            if (checker.getPromisedTypeOfPromise(type)) {
                if (!isIdentifier(side)) {
                    isCompleteFix = false;
                    continue;
                }
                (sides || (sides = [])).push(side);
            }
        }
        return sides && { identifiers: sides, isCompleteFix };
    }
}

function symbolReferenceIsAlsoMissingAwait(reference: Identifier, diagnostics: readonly Diagnostic[], sourceFile: SourceFile, checker: TypeChecker) {
    const errorNode = isPropertyAccessExpression(reference.parent) ? reference.parent.name :
        isBinaryExpression(reference.parent) ? reference.parent :
        reference;
    const diagnostic = find(diagnostics, diagnostic =>
        diagnostic.start === errorNode.getStart(sourceFile) &&
        (diagnostic.start + diagnostic.length!) === errorNode.getEnd());

    return diagnostic && contains(errorCodes, diagnostic.code) ||
        // A Promise is usually not correct in a binary expression (it's not valid
        // in an arithmetic expression and an equality comparison seems unusual),
        // but if the other side of the binary expression has an error, the side
        // is typed `any` which will squash the error that would identify this
        // Promise as an invalid operand. So if the whole binary expression is
        // typed `any` as a result, there is a strong likelihood that this Promise
        // is accidentally missing `await`.
        checker.getTypeAtLocation(errorNode).flags & TypeFlags.Any;
}

function isInsideAwaitableBody(node: Node) {
    return node.flags & NodeFlags.AwaitContext || !!findAncestor(node, ancestor =>
        ancestor.parent && isArrowFunction(ancestor.parent) && ancestor.parent.body === ancestor ||
        isBlock(ancestor) && (
                ancestor.parent.kind === SyntaxKind.FunctionDeclaration ||
                ancestor.parent.kind === SyntaxKind.FunctionExpression ||
                ancestor.parent.kind === SyntaxKind.ArrowFunction ||
                ancestor.parent.kind === SyntaxKind.MethodDeclaration
            ));
}

function makeChange(changeTracker: textChanges.ChangeTracker, errorCode: number, sourceFile: SourceFile, checker: TypeChecker, insertionSite: Expression, fixedDeclarations?: Set<number>) {
    if (isForOfStatement(insertionSite.parent) && !insertionSite.parent.awaitModifier) {
        const exprType = checker.getTypeAtLocation(insertionSite);
        const asyncIter = checker.getAnyAsyncIterableType();
        if (asyncIter && checker.isTypeAssignableTo(exprType, asyncIter)) {
            const forOf = insertionSite.parent;
            changeTracker.replaceNode(sourceFile, forOf, factory.updateForOfStatement(forOf, factory.createToken(SyntaxKind.AwaitKeyword), forOf.initializer, forOf.expression, forOf.statement));
            return;
        }
    }
    if (isBinaryExpression(insertionSite)) {
        for (const side of [insertionSite.left, insertionSite.right]) {
            if (fixedDeclarations && isIdentifier(side)) {
                const symbol = checker.getSymbolAtLocation(side);
                if (symbol && fixedDeclarations.has(getSymbolId(symbol))) {
                    continue;
                }
            }
            const type = checker.getTypeAtLocation(side);
            const newNode = checker.getPromisedTypeOfPromise(type) ? factory.createAwaitExpression(side) : side;
            changeTracker.replaceNode(sourceFile, side, newNode);
        }
    }
    else if (errorCode === propertyAccessCode && isPropertyAccessExpression(insertionSite.parent)) {
        if (fixedDeclarations && isIdentifier(insertionSite.parent.expression)) {
            const symbol = checker.getSymbolAtLocation(insertionSite.parent.expression);
            if (symbol && fixedDeclarations.has(getSymbolId(symbol))) {
                return;
            }
        }
        changeTracker.replaceNode(
            sourceFile,
            insertionSite.parent.expression,
            factory.createParenthesizedExpression(factory.createAwaitExpression(insertionSite.parent.expression)),
        );
        insertLeadingSemicolonIfNeeded(changeTracker, insertionSite.parent.expression, sourceFile);
    }
    else if (contains(callableConstructableErrorCodes, errorCode) && isCallOrNewExpression(insertionSite.parent)) {
        if (fixedDeclarations && isIdentifier(insertionSite)) {
            const symbol = checker.getSymbolAtLocation(insertionSite);
            if (symbol && fixedDeclarations.has(getSymbolId(symbol))) {
                return;
            }
        }
        changeTracker.replaceNode(sourceFile, insertionSite, factory.createParenthesizedExpression(factory.createAwaitExpression(insertionSite)));
        insertLeadingSemicolonIfNeeded(changeTracker, insertionSite, sourceFile);
    }
    else {
        if (fixedDeclarations && isVariableDeclaration(insertionSite.parent) && isIdentifier(insertionSite.parent.name)) {
            const symbol = checker.getSymbolAtLocation(insertionSite.parent.name);
            if (symbol && !tryAddToSet(fixedDeclarations, getSymbolId(symbol))) {
                return;
            }
        }
        changeTracker.replaceNode(sourceFile, insertionSite, factory.createAwaitExpression(insertionSite));
    }
}

function insertLeadingSemicolonIfNeeded(changeTracker: textChanges.ChangeTracker, beforeNode: Node, sourceFile: SourceFile) {
    const precedingToken = findPrecedingToken(beforeNode.pos, sourceFile);
    if (precedingToken && positionIsASICandidate(precedingToken.end, precedingToken.parent, sourceFile)) {
        changeTracker.insertText(sourceFile, beforeNode.getStart(sourceFile), ";");
    }
}
