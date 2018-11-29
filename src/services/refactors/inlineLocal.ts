/* @internal */
namespace ts.refactor.inlineLocal {
    const refactorName = "Inline local";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_local);

    const inlineHereActionName = "Inline here";
    const inlineAllActionName = "Inline all";

    const inlineHereActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_here);
    const inlineAllActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_all);


    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    interface Info {
        readonly declaration: VariableDeclaration;
        readonly usages: ReadonlyArray<Identifier>;
        readonly selectedUsage: Identifier | undefined;
    }

    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, program, startPosition } = context;
        const info = getLocalInfo(file, program, startPosition);
        if (!info) return emptyArray;
        const { selectedUsage } = info;
        const refactorInfo = {
            name: refactorName,
            description: refactorDescription,
            actions: [{
                name: inlineAllActionName,
                description: inlineAllActionDescription
            }]
        };
        if (selectedUsage) {
            refactorInfo.actions.push({
                name: inlineHereActionName,
                description: inlineHereActionDescription
            });
        }
        return [refactorInfo];
    }

    function getLocalInfo(file: SourceFile, program: Program, startPosition: number): Info | undefined {
        const token = getTokenAtPosition(file, startPosition);
        const maybeDeclaration = token.parent;
        const checker = program.getTypeChecker();
        if (isLocalVariable(maybeDeclaration)) {
            return createInfo(checker, maybeDeclaration);
        }
        if (isIdentifier(token)) {
            const symbol = checker.getSymbolAtLocation(token);
            if (!symbol) return undefined;
            const declaration = symbol.valueDeclaration;
            if (!isLocalVariable(declaration)) return undefined;
            return createInfo(checker, declaration, token);
        }
        return undefined;
    }

    function isLocalVariable(parent: Node): parent is VariableDeclaration {
        return isVariableDeclaration(parent) && isVariableDeclarationInVariableStatement(parent);
    }

    function createInfo(checker: TypeChecker, declaration: VariableDeclaration, token?: Identifier): Info | undefined {
        const name = declaration.name;
        const usages = getReferencesInScope(getEnclosingBlockScopeContainer(name), name, checker, /* withDeclaration */ false);
        return canInline(declaration, usages) ? {
            declaration,
            usages,
            selectedUsage: token ? token : undefined
        } : undefined;
    }

    function canInline(declaration: VariableDeclaration, usages: ReadonlyArray<Identifier>): boolean {
        let hasErrors = false;
        if (!declaration.initializer) hasErrors = true;
        if (containsProhibitedModifiers(declaration.parent.parent.modifiers)) hasErrors = true;
        forEach(usages, usage => {
            if (isAssigned(usage)) hasErrors = true;
        });
        return !hasErrors;
    }

    export function isAssigned(usage: Identifier): boolean {
        type AssignExpr = AssignmentExpression<AssignmentOperatorToken>;
        const assignment: AssignExpr = findAncestor(
            usage,
            ancestor => isAssignmentExpression(ancestor)) as AssignExpr;
        return assignment && assignment.left === usage;
    }

    function containsProhibitedModifiers(modifiers?: NodeArray<Modifier>): boolean {
        return !!modifiers && !!modifiers.find(mod => mod.kind === SyntaxKind.ExportKeyword);
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, program, startPosition } = context;
        const info = getLocalInfo(file, program, startPosition);
        if (!info) return undefined;
        const { declaration, usages, selectedUsage } = info;
        switch (actionName) {
            case inlineAllActionName:
                return { edits: getInlineAllEdits(context, declaration, usages) };
            case inlineHereActionName:
                return { edits: getInlineHereEdits(context, declaration, usages, selectedUsage!) };
            default:
                return Debug.fail("invalid action");
        }
    }

    function getInlineAllEdits(
        context: RefactorContext,
        declaration: VariableDeclaration,
        usages: ReadonlyArray<Identifier>): FileTextChanges[] {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            forEach(usages, oldNode => {
                const { initializer } = declaration;
                makeIdUnique(initializer!); // since there is no node-copying function
                const expression = parenthesizeIfNecessary(oldNode, initializer!);
                t.replaceNode(file, oldNode, expression);
            });
            t.delete(file, declaration);
        });
    }

    function getInlineHereEdits(context: RefactorContext,
        declaration: VariableDeclaration,
        usages: ReadonlyArray<Identifier>,
        selectedUsage: Identifier): FileTextChanges[] {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            const { initializer } = declaration;
            const expression = parenthesizeIfNecessary(selectedUsage, initializer!);
            t.replaceNode(file, selectedUsage, expression);
            if (usages.length === 1) t.delete(file, declaration);
        });
    }

    function makeIdUnique(node: Node): void {
        node.id = undefined;
        getNodeId(node);
    }

    export function parenthesizeIfNecessary(target: Node, expression: Expression): Expression {
        const parent = target.parent;
        if (isBinaryExpression(parent)) {
            return parenthesizeBinaryOperand(
                parent.operatorToken.kind,
                expression,
                target === parent.left,
                parent.left);
        }
        if (isExpression(parent)) {
            const parentPrecedence = getExpressionPrecedence(parent);
            const expressionPrecedence = getExpressionPrecedence(expression);
            if (parentPrecedence > expressionPrecedence) return createParen(expression);
            else return expression;
        }
        return expression;
    }

    function getReferencesInScope(scope: Node, target: Node, checker: TypeChecker, withDeclaration: boolean): ReadonlyArray<Identifier> {
        const symbol = checker.getSymbolAtLocation(target);
        return findDescendants(scope, n =>
            checker.getSymbolAtLocation(n) === symbol &&
            (withDeclaration || !isDeclaration(n.parent))) as Identifier[];
    }

    export function findDescendants(node: Node, predicate: (n: Node) => boolean) {
        const nodes: Node[] = [];
        visitDescendants(node);

        function visitDescendants(node: Node) {
            forEachChild(node, n => {
                if (predicate(n)) nodes.push(n);
                visitDescendants(n);
            });
        }
        return nodes;
    }
}
