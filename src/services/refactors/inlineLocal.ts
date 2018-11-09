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
        // inline all is always be available
        const refactorInfo = {
            name: refactorName,
            description: refactorDescription,
            actions: [{
                name: inlineAllActionName,
                description: inlineAllActionDescription
            }]
        };
        // inline here is only available if usage is selected
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
        const parent = token.parent;
        const checker = program.getTypeChecker();
        if (isLocalVariable(parent)) {
            return createInfo(checker, parent);
        }
        else if (isVariableDeclarationList(parent) && parent.declarations.length === 1 && isVariableStatement(parent.parent)) {
            return undefined;
        }
        else if (isIdentifier(token)) {
            const symbol = checker.getSymbolAtLocation(token);
            if (!symbol) return undefined;
            const declaration = symbol.valueDeclaration;
            if (isLocalVariable(declaration)) {
                return createInfo(checker, declaration, token);
            }
            else return undefined;
        }
        else return undefined;
    }

    function isLocalVariable(parent: Node): parent is VariableDeclaration {
        return isVariableDeclaration(parent) && isVariableDeclarationInVariableStatement(parent);
    }

    function createInfo(checker: TypeChecker, declaration: VariableDeclaration, token?: Identifier): Info | undefined {
        const identifier = declaration.name;
        let hasErrors = false;
        const usages = getReferencesInScope(ts.getEnclosingBlockScopeContainer(identifier), identifier, checker);
        if (!declaration.initializer) hasErrors = true;
        if (containsProhibitedModifiers(declaration.parent.parent.modifiers)) hasErrors = true;
        ts.forEach(usages, usage => {
            if (isAssigned(usage)) hasErrors = true;
        });
        return !hasErrors ? {
            declaration,
            usages,
            selectedUsage: token ? token : undefined
        } : undefined;
    }

    function isAssigned(usage: Identifier) {
        type AssignExpr = AssignmentExpression<AssignmentOperatorToken>;
        const assignment: AssignExpr = findAncestor(usage, ancestor => isAssignmentExpression(ancestor)) as AssignExpr;
        if (assignment && assignment.left === usage) return true;
        else return false;
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
                return undefined;
        }

        return { edits };
    }

    function getInlineAllEdits(context: RefactorContext, declaration: VariableDeclaration, usages: ReadonlyArray<Identifier>): ReadonlyArray<FileTextChanges> {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            ts.forEach(usages, oldNode => {
                const { initializer } = declaration;
                const expression = parenthesize(oldNode, initializer!);
                t.replaceNode(file, oldNode, expression);
            });
            t.delete(file, declaration);
        });
    }

    function getInlineHereEdits(context: RefactorContext, declaration: VariableDeclaration, usages: ReadonlyArray<Identifier>, selectedUsage: Identifier): ReadonlyArray<FileTextChanges> {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            const { initializer } = declaration;
            makeIdUnique(initializer!);
            const node = selectedUsage;
            const expression = parenthesize(node, initializer!);
            t.replaceNode(file, node, expression);
            if (usages.length === 1) t.delete(file, declaration);
        });
    }

    function makeIdUnique(node: Node) {
        node.id = undefined;
        getNodeId(node);
    }

    function parenthesize(node: Identifier, expression: Expression) {
        const parent = node.parent;
        if (isUnaryExpression(parent)) return createParen(expression);
        if (isBinaryExpression(parent)) {
            const isLeft = node === parent.left;
            return parenthesizeBinaryOperand(parent.operatorToken.kind, expression, isLeft, parent.left);
        }
        return expression;
    }

    function getReferencesInScope(scope: Node, node: Node, checker: TypeChecker): ReadonlyArray<Identifier> {
        const nodes: Node[] = [];
        function getNodes(node: Node) {
            ts.forEachChild(node, n => { nodes.push(n); getNodes(n); });
        }
        getNodes(scope);
        const symbol = checker.getSymbolAtLocation(node);
        return nodes.filter(n => isIdentifier(n) && n.id !== node.id && checker.getSymbolAtLocation(n) === symbol) as Identifier[];
    }
}
