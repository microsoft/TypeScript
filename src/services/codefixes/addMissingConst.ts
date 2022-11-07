/* @internal */
namespace ts.codefix {
const fixId = "addMissingConst";
const errorCodes = [
    ts.Diagnostics.Cannot_find_name_0.code,
    ts.Diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer.code
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddMissingConst(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start, context.program));
        if (changes.length > 0) {
            return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_const_to_unresolved_variable, fixId, ts.Diagnostics.Add_const_to_all_unresolved_variables)];
        }
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        const fixedNodes = new ts.Set<ts.Node>();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start, context.program, fixedNodes));
    },
});

function makeChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, pos: number, program: ts.Program, fixedNodes?: ts.Set<ts.Node>) {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    const forInitializer = ts.findAncestor(token, node =>
        ts.isForInOrOfStatement(node.parent) ? node.parent.initializer === node :
        isPossiblyPartOfDestructuring(node) ? false : "quit"
    );
    if (forInitializer) return applyChange(changeTracker, forInitializer, sourceFile, fixedNodes);

    const parent = token.parent;
    if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isExpressionStatement(parent.parent)) {
        return applyChange(changeTracker, token, sourceFile, fixedNodes);
    }

    if (ts.isArrayLiteralExpression(parent)) {
        const checker = program.getTypeChecker();
        if (!ts.every(parent.elements, element => arrayElementCouldBeVariableDeclaration(element, checker))) {
            return;
        }

        return applyChange(changeTracker, parent, sourceFile, fixedNodes);
    }

    const commaExpression = ts.findAncestor(token, node =>
        ts.isExpressionStatement(node.parent) ? true :
        isPossiblyPartOfCommaSeperatedInitializer(node) ? false : "quit"
    );
    if (commaExpression) {
        const checker = program.getTypeChecker();
        if (!expressionCouldBeVariableDeclaration(commaExpression, checker)) {
            return;
        }

        return applyChange(changeTracker, commaExpression, sourceFile, fixedNodes);
    }
}

function applyChange(changeTracker: ts.textChanges.ChangeTracker, initializer: ts.Node, sourceFile: ts.SourceFile, fixedNodes?: ts.Set<ts.Node>) {
    if (!fixedNodes || ts.tryAddToSet(fixedNodes, initializer)) {
        changeTracker.insertModifierBefore(sourceFile, ts.SyntaxKind.ConstKeyword, initializer);
    }
}

function isPossiblyPartOfDestructuring(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            return true;
        default:
            return false;
    }
}

function arrayElementCouldBeVariableDeclaration(expression: ts.Expression, checker: ts.TypeChecker): boolean {
    const identifier =
        ts.isIdentifier(expression) ? expression :
        ts.isAssignmentExpression(expression, /*excludeCompoundAssignment*/ true) && ts.isIdentifier(expression.left) ? expression.left :
        undefined;
    return !!identifier && !checker.getSymbolAtLocation(identifier);
}

function isPossiblyPartOfCommaSeperatedInitializer(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.BinaryExpression:
        case ts.SyntaxKind.CommaToken:
            return true;
        default:
            return false;
    }
}

function expressionCouldBeVariableDeclaration(expression: ts.Node, checker: ts.TypeChecker): boolean {
    if (!ts.isBinaryExpression(expression)) {
        return false;
    }

    if (expression.operatorToken.kind === ts.SyntaxKind.CommaToken) {
        return ts.every([expression.left, expression.right], expression => expressionCouldBeVariableDeclaration(expression, checker));
    }

    return expression.operatorToken.kind === ts.SyntaxKind.EqualsToken
        && ts.isIdentifier(expression.left)
        && !checker.getSymbolAtLocation(expression.left);
}
}
