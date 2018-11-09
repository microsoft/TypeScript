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
        declaration: VariableDeclaration;
        usages: ReadonlyArray<Identifier>;
        selectedUsage: Identifier | undefined;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const { file, program, startPosition } = context;
        const info = getLocalInfo(file, program, startPosition);
        if (!info) return undefined;
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
            if (isLocalVariable(declaration)) {
                return createInfo(checker, declaration, token);
            }
            return undefined;
        }
        return undefined;
    }

    function isLocalVariable(parent: Node): parent is VariableDeclaration {
        return isVariableDeclaration(parent) && isVariableDeclarationInVariableStatement(parent);
    }

    function createInfo(checker: TypeChecker, declaration: VariableDeclaration, token?: Identifier): Info | undefined {
        const name = declaration.name;
        const usages = getReferencesInScope(ts.getEnclosingBlockScopeContainer(name), name, checker);
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
        ts.forEach(usages, usage => {
            if (isAssigned(usage)) hasErrors = true;
        });
        return !hasErrors;
    }

    function isAssigned(usage: Identifier): boolean {
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
        const edits: FileTextChanges[] = [];
        switch (actionName) {
            case inlineAllActionName:
                edits.push(...getInlineAllEdits(context, declaration, usages));
                break;
            case inlineHereActionName:
                edits.push(...getInlineHereEdits(context, declaration, usages, selectedUsage!));
                break;
            default:
                return Debug.fail("invalid action");
        }
        return { edits };
    }

    function getInlineAllEdits(
        context: RefactorContext,
        declaration: VariableDeclaration,
        usages: ReadonlyArray<Identifier>): ReadonlyArray<FileTextChanges> {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            ts.forEach(usages, oldNode => {
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
        selectedUsage: Identifier): ReadonlyArray<FileTextChanges> {
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

    function parenthesizeIfNecessary(target: Node, expression: Expression): Expression {
        const parent = target.parent;
        if (isUnaryExpression(parent)) return createParen(expression);
        if (isBinaryExpression(parent)) {
            return parenthesizeBinaryOperand(
                parent.operatorToken.kind,
                expression,
                target === parent.left,
                parent.left);
        }
        return expression;
    }

    function getReferencesInScope(scope: Node, target: Node, checker: TypeChecker): ReadonlyArray<Identifier> {
        const nodes: Node[] = [];
        function getNodes(node: Node) {
            ts.forEachChild(node, n => { nodes.push(n); getNodes(n); });
        }
        getNodes(scope);
        const symbol = checker.getSymbolAtLocation(target);
        return nodes.filter(n => checker.getSymbolAtLocation(n) === symbol && n.id !== target.id) as Identifier[];
    }
}
