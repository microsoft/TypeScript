/* @internal */
namespace ts.refactor.inlineLocal {
    const refactorName = "Inline local";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_local);
    
    // const inlineLocalActionName = "Inline local";
    const inlineHereActionName = "Inline here";
    const inlineAllActionName = "Inline all";

    const inlineHereActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_here);
    // const inlineAllActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_all);


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
        const {declaration, selectedUsage} = info;
        const refactorInfo = {
            name: refactorName,
            description: refactorDescription,
            actions: [{
                name: inlineAllActionName,
                description: `${declaration.initializer}`
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
        let isUsageSelected = false;
        let declaration: VariableDeclaration;
        const checker = program.getTypeChecker();
        if (isVariableDeclaration(parent) && isVariableDeclarationInVariableStatement(parent)) {
            declaration = parent;
        }
        else if (isVariableDeclarationList(parent) && parent.declarations.length === 1 && isVariableStatement(parent.parent)) {
            return undefined;
        }
        else if (isIdentifier(token)) {
            const symbol = checker.getSymbolAtLocation(token);
            if (!symbol) return undefined;
            const decl = symbol.valueDeclaration;
            if(isVariableDeclaration(decl) && isVariableDeclarationInVariableStatement(decl)) {
                declaration = decl;
                isUsageSelected = true;
            }
            else return undefined;
        }
        else return undefined;
        
        return {
            declaration: declaration,
            usages: getReferencesInEnclosingScope(declaration.name, checker),
            selectedUsage: isUsageSelected ? token as Identifier : undefined
        }
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, program, startPosition } = context; actionName;
        const info = getLocalInfo(file, program, startPosition);
        if (!info) return undefined;
        const {declaration, usages/* , selectedUsage */} = info;
        const edits: FileTextChanges[] = [];
        switch (actionName) {
            case inlineAllActionName:
                edits.push(...getInlineAllEdits(context, declaration, usages));
                break;
            case inlineHereActionName:
                // getInlineHereEdits(declaration, usages, selectedUsage!);
                break;
            default: 
                return undefined;
        }

        return { edits };
    }

    function getInlineAllEdits(context: RefactorContext, declaration: VariableDeclaration, usages: ReadonlyArray<Identifier>): FileTextChanges[] {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            ts.forEach(usages, oldNode => {
                const expression = { ...declaration.initializer! };
                const newNode = createParen(expression);
                t.replaceNode(file, oldNode, newNode);
            })
            t.delete(file, declaration);
        })
    }

    // function getInlineHereEdits(declaration: VariableDeclaration, usages: ReadonlyArray<Identifier>, selectedUsage: Identifier): FileTextChanges[] {
        
    // }

    function getReferencesInEnclosingScope(node: Node, checker: TypeChecker): ReadonlyArray<Identifier> {
        const nodes: Node[] = [];
        function getNodes(node: Node){
            ts.forEachChild(node, n => { nodes.push(n); getNodes(n); })
        }
        const scope = ts.getEnclosingBlockScopeContainer(node);
        getNodes(scope);
        const symbol = checker.getSymbolAtLocation(node);
        return nodes.filter(n => isIdentifier(n) && n.id !== node.id && checker.getSymbolAtLocation(n) === symbol) as Identifier[] /*TODO don't use as*/;
    };

}