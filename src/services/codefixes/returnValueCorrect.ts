import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    append,
    ArrowFunction,
    CodeFixContext,
    copyComments,
    createSymbolTable,
    Debug,
    Diagnostics,
    Expression,
    factory,
    findAncestor,
    first,
    FunctionLikeDeclaration,
    getTokenAtPosition,
    hasSyntacticModifier,
    Identifier,
    isArrowFunction,
    isBlock,
    isCallExpression,
    isDeclarationName,
    isExpressionStatement,
    isFunctionLikeDeclaration,
    isJsxAttribute,
    isJsxExpression,
    isLabeledStatement,
    isVariableLike,
    length,
    ModifierFlags,
    needsParentheses,
    Node,
    probablyUsesSemicolons,
    rangeContainsRange,
    SourceFile,
    Statement,
    suppressLeadingAndTrailingTrivia,
    SymbolFlags,
    SyntaxKind,
    textChanges,
    Type,
    TypeChecker,
    VariableLikeDeclaration,
} from "../_namespaces/ts.js";

const fixId = "returnValueCorrect";
const fixIdAddReturnStatement = "fixAddReturnStatement";
const fixRemoveBracesFromArrowFunctionBody = "fixRemoveBracesFromArrowFunctionBody";
const fixIdWrapTheBlockWithParen = "fixWrapTheBlockWithParen";
const errorCodes = [
    Diagnostics.A_function_whose_declared_type_is_neither_undefined_void_nor_any_must_return_a_value.code,
    Diagnostics.Type_0_is_not_assignable_to_type_1.code,
    Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code,
];

enum ProblemKind {
    MissingReturnStatement,
    MissingParentheses,
}

interface MissingReturnInfo {
    kind: ProblemKind.MissingReturnStatement;
    declaration: FunctionLikeDeclaration;
    expression: Expression;
    statement: Statement;
    commentSource: Node;
}

interface MissingParenInfo {
    kind: ProblemKind.MissingParentheses;
    declaration: ArrowFunction;
    expression: Expression;
    statement: Statement;
    commentSource: Node;
}

type Info = MissingReturnInfo | MissingParenInfo;

registerCodeFix({
    errorCodes,
    fixIds: [fixIdAddReturnStatement, fixRemoveBracesFromArrowFunctionBody, fixIdWrapTheBlockWithParen],
    getCodeActions: function getCodeActionsToCorrectReturnValue(context) {
        const { program, sourceFile, span: { start }, errorCode } = context;
        const info = getInfo(program.getTypeChecker(), sourceFile, start, errorCode);
        if (!info) return undefined;

        if (info.kind === ProblemKind.MissingReturnStatement) {
            return append(
                [getActionForfixAddReturnStatement(context, info.expression, info.statement)],
                isArrowFunction(info.declaration) ? getActionForFixRemoveBracesFromArrowFunctionBody(context, info.declaration, info.expression, info.commentSource) : undefined,
            );
        }
        else {
            return [getActionForfixWrapTheBlockWithParen(context, info.declaration, info.expression)];
        }
    },
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(context.program.getTypeChecker(), diag.file, diag.start, diag.code);
            if (!info) return undefined;

            switch (context.fixId) {
                case fixIdAddReturnStatement:
                    addReturnStatement(changes, diag.file, info.expression, info.statement);
                    break;
                case fixRemoveBracesFromArrowFunctionBody:
                    if (!isArrowFunction(info.declaration)) return undefined;
                    removeBlockBodyBrace(changes, diag.file, info.declaration, info.expression, info.commentSource, /*withParen*/ false);
                    break;
                case fixIdWrapTheBlockWithParen:
                    if (!isArrowFunction(info.declaration)) return undefined;
                    wrapBlockWithParen(changes, diag.file, info.declaration, info.expression);
                    break;
                default:
                    Debug.fail(JSON.stringify(context.fixId));
            }
        }),
});

function createObjectTypeFromLabeledExpression(checker: TypeChecker, label: Identifier, expression: Expression) {
    const member = checker.createSymbol(SymbolFlags.Property, label.escapedText);
    member.links.type = checker.getTypeAtLocation(expression);
    const members = createSymbolTable([member]);
    return checker.createAnonymousType(/*symbol*/ undefined, members, [], [], []);
}

function getFixInfo(checker: TypeChecker, declaration: FunctionLikeDeclaration, expectType: Type, isFunctionType: boolean): Info | undefined {
    if (!declaration.body || !isBlock(declaration.body) || length(declaration.body.statements) !== 1) return undefined;

    const firstStatement = first(declaration.body.statements);
    if (isExpressionStatement(firstStatement) && checkFixedAssignableTo(checker, declaration, checker.getTypeAtLocation(firstStatement.expression), expectType, isFunctionType)) {
        return {
            declaration,
            kind: ProblemKind.MissingReturnStatement,
            expression: firstStatement.expression,
            statement: firstStatement,
            commentSource: firstStatement.expression,
        };
    }
    else if (isLabeledStatement(firstStatement) && isExpressionStatement(firstStatement.statement)) {
        const node = factory.createObjectLiteralExpression([factory.createPropertyAssignment(firstStatement.label, firstStatement.statement.expression)]);
        const nodeType = createObjectTypeFromLabeledExpression(checker, firstStatement.label, firstStatement.statement.expression);
        if (checkFixedAssignableTo(checker, declaration, nodeType, expectType, isFunctionType)) {
            return isArrowFunction(declaration) ? {
                declaration,
                kind: ProblemKind.MissingParentheses,
                expression: node,
                statement: firstStatement,
                commentSource: firstStatement.statement.expression,
            } : {
                declaration,
                kind: ProblemKind.MissingReturnStatement,
                expression: node,
                statement: firstStatement,
                commentSource: firstStatement.statement.expression,
            };
        }
    }
    else if (isBlock(firstStatement) && length(firstStatement.statements) === 1) {
        const firstBlockStatement = first(firstStatement.statements);
        if (isLabeledStatement(firstBlockStatement) && isExpressionStatement(firstBlockStatement.statement)) {
            const node = factory.createObjectLiteralExpression([factory.createPropertyAssignment(firstBlockStatement.label, firstBlockStatement.statement.expression)]);
            const nodeType = createObjectTypeFromLabeledExpression(checker, firstBlockStatement.label, firstBlockStatement.statement.expression);
            if (checkFixedAssignableTo(checker, declaration, nodeType, expectType, isFunctionType)) {
                return {
                    declaration,
                    kind: ProblemKind.MissingReturnStatement,
                    expression: node,
                    statement: firstStatement,
                    commentSource: firstBlockStatement,
                };
            }
        }
    }

    return undefined;
}

function checkFixedAssignableTo(checker: TypeChecker, declaration: FunctionLikeDeclaration, exprType: Type, type: Type, isFunctionType: boolean) {
    if (isFunctionType) {
        const sig = checker.getSignatureFromDeclaration(declaration);
        if (sig) {
            if (hasSyntacticModifier(declaration, ModifierFlags.Async)) {
                exprType = checker.createPromiseType(exprType);
            }
            const newSig = checker.createSignature(
                declaration,
                sig.typeParameters,
                sig.thisParameter,
                sig.parameters,
                exprType,
                /*typePredicate*/ undefined,
                sig.minArgumentCount,
                sig.flags,
            );
            exprType = checker.createAnonymousType(
                /*symbol*/ undefined,
                createSymbolTable(),
                [newSig],
                [],
                [],
            );
        }
        else {
            exprType = checker.getAnyType();
        }
    }
    return checker.isTypeAssignableTo(exprType, type);
}

function getInfo(checker: TypeChecker, sourceFile: SourceFile, position: number, errorCode: number): Info | undefined {
    const node = getTokenAtPosition(sourceFile, position);
    if (!node.parent) return undefined;

    const declaration = findAncestor(node.parent, isFunctionLikeDeclaration);
    switch (errorCode) {
        case Diagnostics.A_function_whose_declared_type_is_neither_undefined_void_nor_any_must_return_a_value.code:
            if (!declaration || !declaration.body || !declaration.type || !rangeContainsRange(declaration.type, node)) return undefined;
            return getFixInfo(checker, declaration, checker.getTypeFromTypeNode(declaration.type), /*isFunctionType*/ false);
        case Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code:
            if (!declaration || !isCallExpression(declaration.parent) || !declaration.body) return undefined;
            const pos = declaration.parent.arguments.indexOf(declaration as Expression);
            if (pos === -1) return undefined;
            const type = checker.getContextualTypeForArgumentAtIndex(declaration.parent, pos);
            if (!type) return undefined;
            return getFixInfo(checker, declaration, type, /*isFunctionType*/ true);
        case Diagnostics.Type_0_is_not_assignable_to_type_1.code:
            if (!isDeclarationName(node) || !isVariableLike(node.parent) && !isJsxAttribute(node.parent)) return undefined;
            const initializer = getVariableLikeInitializer(node.parent);
            if (!initializer || !isFunctionLikeDeclaration(initializer) || !initializer.body) return undefined;
            return getFixInfo(checker, initializer, checker.getTypeAtLocation(node.parent), /*isFunctionType*/ true);
    }
    return undefined;
}

function getVariableLikeInitializer(declaration: VariableLikeDeclaration): Expression | undefined {
    switch (declaration.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertyAssignment:
            return declaration.initializer;
        case SyntaxKind.JsxAttribute:
            return declaration.initializer && (isJsxExpression(declaration.initializer) ? declaration.initializer.expression : undefined);
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.EnumMember:
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocParameterTag:
            return undefined;
    }
}

function addReturnStatement(changes: textChanges.ChangeTracker, sourceFile: SourceFile, expression: Expression, statement: Statement) {
    suppressLeadingAndTrailingTrivia(expression);
    const probablyNeedSemi = probablyUsesSemicolons(sourceFile);
    changes.replaceNode(sourceFile, statement, factory.createReturnStatement(expression), {
        leadingTriviaOption: textChanges.LeadingTriviaOption.Exclude,
        trailingTriviaOption: textChanges.TrailingTriviaOption.Exclude,
        suffix: probablyNeedSemi ? ";" : undefined,
    });
}

function removeBlockBodyBrace(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: ArrowFunction, expression: Expression, commentSource: Node, withParen: boolean) {
    const newBody = (withParen || needsParentheses(expression)) ? factory.createParenthesizedExpression(expression) : expression;
    suppressLeadingAndTrailingTrivia(commentSource);
    copyComments(commentSource, newBody);

    changes.replaceNode(sourceFile, declaration.body, newBody);
}

function wrapBlockWithParen(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: ArrowFunction, expression: Expression) {
    changes.replaceNode(sourceFile, declaration.body, factory.createParenthesizedExpression(expression));
}

function getActionForfixAddReturnStatement(context: CodeFixContext, expression: Expression, statement: Statement) {
    const changes = textChanges.ChangeTracker.with(context, t => addReturnStatement(t, context.sourceFile, expression, statement));
    return createCodeFixAction(fixId, changes, Diagnostics.Add_a_return_statement, fixIdAddReturnStatement, Diagnostics.Add_all_missing_return_statement);
}

function getActionForFixRemoveBracesFromArrowFunctionBody(context: CodeFixContext, declaration: ArrowFunction, expression: Expression, commentSource: Node) {
    const changes = textChanges.ChangeTracker.with(context, t => removeBlockBodyBrace(t, context.sourceFile, declaration, expression, commentSource, /*withParen*/ false));
    return createCodeFixAction(fixId, changes, Diagnostics.Remove_braces_from_arrow_function_body, fixRemoveBracesFromArrowFunctionBody, Diagnostics.Remove_braces_from_all_arrow_function_bodies_with_relevant_issues);
}

function getActionForfixWrapTheBlockWithParen(context: CodeFixContext, declaration: ArrowFunction, expression: Expression) {
    const changes = textChanges.ChangeTracker.with(context, t => wrapBlockWithParen(t, context.sourceFile, declaration, expression));
    return createCodeFixAction(fixId, changes, Diagnostics.Wrap_the_following_body_with_parentheses_which_should_be_an_object_literal, fixIdWrapTheBlockWithParen, Diagnostics.Wrap_all_object_literal_with_parentheses);
}
