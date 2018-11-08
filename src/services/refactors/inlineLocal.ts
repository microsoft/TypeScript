/* @internal */
namespace ts.refactor.inlineLocal {
    const refactorName = "Inline local";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_local);
    
    // const inlineLocalActionName = "Inline local";
    const inlineHereActionName = "Inline here";
    const inlineAllActionName = "Inline all";

    const inlineHereActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_here);
    const inlineAllActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_all);


    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    interface Info{
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
            })
        }
        return [refactorInfo];
    }

    function getLocalInfo(file: SourceFile, program: Program, startPosition: number): Info | undefined {
        const token = getTokenAtPosition(file, startPosition);
        const parent = token.parent;
        const checker = program.getTypeChecker();
        if (isLocalVariable(parent)) {
            return createInfo(checker, parent, undefined);
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

    function createInfo(checker: TypeChecker, declaration: VariableDeclaration, token: Identifier | undefined): Info {
        return {
            declaration: declaration,
            usages: getReferencesInEnclosingScope(declaration.name, checker),
            selectedUsage: token ? token : undefined
        };
    }

    function isLocalVariable(parent: Node): parent is VariableDeclaration {
        return isVariableDeclaration(parent) && isVariableDeclarationInVariableStatement(parent);
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, program, startPosition } = context; actionName;
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
                t.replaceNode(file, oldNode, createParen(initializer!));
            });
            t.delete(file, declaration);
        });
    }

    function getInlineHereEdits(context: RefactorContext, declaration: VariableDeclaration, usages: ReadonlyArray<Identifier>, selectedUsage: Identifier): ReadonlyArray<FileTextChanges> {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            const { initializer } = declaration;
            t.replaceNode(file, selectedUsage, createParen(initializer!));
            if (usages.length === 1) t.delete(file, declaration);
        });
    }

    function getReferencesInEnclosingScope(node: Node, checker: TypeChecker): ReadonlyArray<Identifier> {
        const nodes: Node[] = [];
        function getNodes(node: Node) {
            ts.forEachChild(node, n => { nodes.push(n); getNodes(n); })
        }
        const scope = ts.getEnclosingBlockScopeContainer(node);
        getNodes(scope);
        const symbol = checker.getSymbolAtLocation(node);
        return nodes.filter(n => isIdentifier(n) && n.id !== node.id && checker.getSymbolAtLocation(n) === symbol) as Identifier[];
    };
}
