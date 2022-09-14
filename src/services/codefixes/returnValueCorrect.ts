import * as ts from "../_namespaces/ts";

const fixId = "returnValueCorrect";
const fixIdAddReturnStatement = "fixAddReturnStatement";
const fixRemoveBracesFromArrowFunctionBody = "fixRemoveBracesFromArrowFunctionBody";
const fixIdWrapTheBlockWithParen = "fixWrapTheBlockWithParen";
const errorCodes = [
    ts.Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value.code,
    ts.Diagnostics.Type_0_is_not_assignable_to_type_1.code,
    ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code
];

enum ProblemKind {
    MissingReturnStatement,
    MissingParentheses
}

interface MissingReturnInfo {
    kind: ProblemKind.MissingReturnStatement;
    declaration: ts.FunctionLikeDeclaration;
    expression: ts.Expression;
    statement: ts.Statement;
    commentSource: ts.Node;
}

interface MissingParenInfo {
    kind: ProblemKind.MissingParentheses;
    declaration: ts.ArrowFunction;
    expression: ts.Expression;
    statement: ts.Statement;
    commentSource: ts.Node;
}

type Info = MissingReturnInfo | MissingParenInfo;

ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixIdAddReturnStatement, fixRemoveBracesFromArrowFunctionBody, fixIdWrapTheBlockWithParen],
    getCodeActions: function getCodeActionsToCorrectReturnValue(context) {
        const { program, sourceFile, span: { start }, errorCode } = context;
        const info = getInfo(program.getTypeChecker(), sourceFile, start, errorCode);
        if (!info) return undefined;

        if (info.kind === ProblemKind.MissingReturnStatement) {
            return ts.append(
                [getActionForfixAddReturnStatement(context, info.expression, info.statement)],
                ts.isArrowFunction(info.declaration) ? getActionForFixRemoveBracesFromArrowFunctionBody(context, info.declaration, info.expression, info.commentSource): undefined);
        }
        else {
            return [getActionForfixWrapTheBlockWithParen(context, info.declaration, info.expression)];
        }
    },
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(context.program.getTypeChecker(), diag.file, diag.start, diag.code);
        if (!info) return undefined;

        switch (context.fixId) {
            case fixIdAddReturnStatement:
                addReturnStatement(changes, diag.file, info.expression, info.statement);
                break;
            case fixRemoveBracesFromArrowFunctionBody:
                if (!ts.isArrowFunction(info.declaration)) return undefined;
                removeBlockBodyBrace(changes, diag.file, info.declaration, info.expression, info.commentSource, /* withParen */ false);
                break;
            case fixIdWrapTheBlockWithParen:
                if (!ts.isArrowFunction(info.declaration)) return undefined;
                wrapBlockWithParen(changes, diag.file, info.declaration, info.expression);
                break;
            default:
                ts.Debug.fail(JSON.stringify(context.fixId));
        }
    }),
});

function createObjectTypeFromLabeledExpression(checker: ts.TypeChecker, label: ts.Identifier, expression: ts.Expression) {
    const member = checker.createSymbol(ts.SymbolFlags.Property, label.escapedText);
    member.type = checker.getTypeAtLocation(expression);
    const members = ts.createSymbolTable([member]);
    return checker.createAnonymousType(/*symbol*/ undefined, members, [], [], []);
}

function getFixInfo(checker: ts.TypeChecker, declaration: ts.FunctionLikeDeclaration, expectType: ts.Type, isFunctionType: boolean): Info | undefined {
    if (!declaration.body || !ts.isBlock(declaration.body) || ts.length(declaration.body.statements) !== 1) return undefined;

    const firstStatement = ts.first(declaration.body.statements);
    if (ts.isExpressionStatement(firstStatement) && checkFixedAssignableTo(checker, declaration, checker.getTypeAtLocation(firstStatement.expression), expectType, isFunctionType)) {
        return {
            declaration,
            kind: ProblemKind.MissingReturnStatement,
            expression: firstStatement.expression,
            statement: firstStatement,
            commentSource: firstStatement.expression
        };
    }
    else if (ts.isLabeledStatement(firstStatement) && ts.isExpressionStatement(firstStatement.statement)) {
        const node = ts.factory.createObjectLiteralExpression([ts.factory.createPropertyAssignment(firstStatement.label, firstStatement.statement.expression)]);
        const nodeType = createObjectTypeFromLabeledExpression(checker, firstStatement.label, firstStatement.statement.expression);
        if (checkFixedAssignableTo(checker, declaration, nodeType, expectType, isFunctionType)) {
            return ts.isArrowFunction(declaration) ? {
                declaration,
                kind: ProblemKind.MissingParentheses,
                expression: node,
                statement: firstStatement,
                commentSource: firstStatement.statement.expression
            } : {
                    declaration,
                    kind: ProblemKind.MissingReturnStatement,
                    expression: node,
                    statement: firstStatement,
                    commentSource: firstStatement.statement.expression
                };
        }
    }
    else if (ts.isBlock(firstStatement) && ts.length(firstStatement.statements) === 1) {
        const firstBlockStatement = ts.first(firstStatement.statements);
        if (ts.isLabeledStatement(firstBlockStatement) && ts.isExpressionStatement(firstBlockStatement.statement)) {
            const node = ts.factory.createObjectLiteralExpression([ts.factory.createPropertyAssignment(firstBlockStatement.label, firstBlockStatement.statement.expression)]);
            const nodeType = createObjectTypeFromLabeledExpression(checker, firstBlockStatement.label, firstBlockStatement.statement.expression);
            if (checkFixedAssignableTo(checker, declaration, nodeType, expectType, isFunctionType)) {
                return {
                    declaration,
                    kind: ProblemKind.MissingReturnStatement,
                    expression: node,
                    statement: firstStatement,
                    commentSource: firstBlockStatement
                };
            }
        }
    }

    return undefined;
}

function checkFixedAssignableTo(checker: ts.TypeChecker, declaration: ts.FunctionLikeDeclaration, exprType: ts.Type, type: ts.Type, isFunctionType: boolean) {
    if (isFunctionType) {
        const sig = checker.getSignatureFromDeclaration(declaration);
        if (sig) {
            if (ts.hasSyntacticModifier(declaration, ts.ModifierFlags.Async)) {
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
                sig.flags);
            exprType = checker.createAnonymousType(
                /*symbol*/ undefined,
                ts.createSymbolTable(),
                [newSig],
                [],
                []);
        }
        else {
            exprType = checker.getAnyType();
        }
    }
    return checker.isTypeAssignableTo(exprType, type);
}

function getInfo(checker: ts.TypeChecker, sourceFile: ts.SourceFile, position: number, errorCode: number): Info | undefined {
    const node = ts.getTokenAtPosition(sourceFile, position);
    if (!node.parent) return undefined;

    const declaration = ts.findAncestor(node.parent, ts.isFunctionLikeDeclaration);
    switch (errorCode) {
        case ts.Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value.code:
            if (!declaration || !declaration.body || !declaration.type || !ts.rangeContainsRange(declaration.type, node)) return undefined;
            return getFixInfo(checker, declaration, checker.getTypeFromTypeNode(declaration.type), /* isFunctionType */ false);
        case ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code:
            if (!declaration || !ts.isCallExpression(declaration.parent) || !declaration.body) return undefined;
            const pos = declaration.parent.arguments.indexOf(declaration as ts.Expression);
            const type = checker.getContextualTypeForArgumentAtIndex(declaration.parent, pos);
            if (!type) return undefined;
            return getFixInfo(checker, declaration, type, /* isFunctionType */ true);
        case ts.Diagnostics.Type_0_is_not_assignable_to_type_1.code:
            if (!ts.isDeclarationName(node) || !ts.isVariableLike(node.parent) && !ts.isJsxAttribute(node.parent)) return undefined;
            const initializer = getVariableLikeInitializer(node.parent);
            if (!initializer || !ts.isFunctionLikeDeclaration(initializer) || !initializer.body) return undefined;
            return getFixInfo(checker, initializer, checker.getTypeAtLocation(node.parent), /* isFunctionType */ true);
    }
    return undefined;
}

function getVariableLikeInitializer(declaration: ts.VariableLikeDeclaration): ts.Expression | undefined {
    switch (declaration.kind) {
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.BindingElement:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertyAssignment:
            return declaration.initializer;
        case ts.SyntaxKind.JsxAttribute:
            return declaration.initializer && (ts.isJsxExpression(declaration.initializer) ? declaration.initializer.expression : undefined);
        case ts.SyntaxKind.ShorthandPropertyAssignment:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.JSDocPropertyTag:
        case ts.SyntaxKind.JSDocParameterTag:
            return undefined;
    }
}

function addReturnStatement(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, expression: ts.Expression, statement: ts.Statement) {
    ts.suppressLeadingAndTrailingTrivia(expression);
    const probablyNeedSemi = ts.probablyUsesSemicolons(sourceFile);
    changes.replaceNode(sourceFile, statement, ts.factory.createReturnStatement(expression), {
        leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude,
        trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude,
        suffix: probablyNeedSemi ? ";" : undefined
    });
}

function removeBlockBodyBrace(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, declaration: ts.ArrowFunction, expression: ts.Expression, commentSource: ts.Node, withParen: boolean) {
    const newBody = (withParen || ts.needsParentheses(expression)) ? ts.factory.createParenthesizedExpression(expression) : expression;
    ts.suppressLeadingAndTrailingTrivia(commentSource);
    ts.copyComments(commentSource, newBody);

    changes.replaceNode(sourceFile, declaration.body, newBody);
}

function wrapBlockWithParen(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, declaration: ts.ArrowFunction, expression: ts.Expression) {
    changes.replaceNode(sourceFile, declaration.body, ts.factory.createParenthesizedExpression(expression));
}

function getActionForfixAddReturnStatement(context: ts.CodeFixContext, expression: ts.Expression, statement: ts.Statement) {
    const changes = ts.textChanges.ChangeTracker.with(context, t => addReturnStatement(t, context.sourceFile, expression, statement));
    return ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_a_return_statement, fixIdAddReturnStatement, ts.Diagnostics.Add_all_missing_return_statement);
}

function getActionForFixRemoveBracesFromArrowFunctionBody(context: ts.CodeFixContext, declaration: ts.ArrowFunction, expression: ts.Expression, commentSource: ts.Node) {
    const changes = ts.textChanges.ChangeTracker.with(context, t => removeBlockBodyBrace(t, context.sourceFile, declaration, expression, commentSource, /* withParen */ false));
    return ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Remove_braces_from_arrow_function_body, fixRemoveBracesFromArrowFunctionBody, ts.Diagnostics.Remove_braces_from_all_arrow_function_bodies_with_relevant_issues);
}

function getActionForfixWrapTheBlockWithParen(context: ts.CodeFixContext, declaration: ts.ArrowFunction, expression: ts.Expression) {
    const changes = ts.textChanges.ChangeTracker.with(context, t => wrapBlockWithParen(t, context.sourceFile, declaration, expression));
    return ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Wrap_the_following_body_with_parentheses_which_should_be_an_object_literal, fixIdWrapTheBlockWithParen, ts.Diagnostics.Wrap_all_object_literal_with_parentheses);
}
