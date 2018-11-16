/* @internal */
namespace ts.refactor.inlineFunction {
    const refactorName = "Inline function";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_function);

    const inlineHereActionName = "Inline here";
    const inlineAllActionName = "Inline all";

    const inlineHereActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_here);
    const inlineAllActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_all);


    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    interface Info {
        readonly declaration: InlineableFunction;
        readonly usages: ReadonlyArray<Identifier>;
        readonly selectedUsage: Identifier | undefined;
    }

    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { program, file, startPosition } = context;
        const info = getInfo(program, file, startPosition);
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

    function getInfo(program: Program, file: SourceFile, startPosition: number): Info | undefined {
        const token = getTokenAtPosition(file, startPosition);
        const checker = program.getTypeChecker();
        const maybeFunc = getContainingFunction(token);
        isCallExpression(token);
        if (isIdentifier(token)) {
            if (isNameOfFunctionDeclaration(token)) {
                return createInfo(checker, <InlineableFunction>token.parent);
            }
            const symbol = checker.getSymbolAtLocation(token);
            if (!symbol) return undefined;
            const declaration = symbol.valueDeclaration;
            if (!isInlineableFunction(declaration)) return undefined;
            return createInfo(checker, declaration, token);
        }
        return undefined;
    }

    function createInfo(checker: TypeChecker, declaration: InlineableFunction, token?: Identifier): Info | undefined {
        const usages = inlineLocal.getReferencesInScope(
            getEnclosingBlockScopeContainer(declaration),
            declaration.name!,
            checker,
            /* withDeclaration */ false);
        return canInline(declaration, usages) ? {
            declaration,
            usages,
            selectedUsage: token ? token : undefined
        } : undefined;
    }

    function canInline(declaration: InlineableFunction, usages: ReadonlyArray<Identifier>): boolean {
        let hasErrors = false;
        if (containsProhibitedModifiers(declaration.parent.parent.modifiers)) hasErrors = true;
        return !hasErrors;
    }

    function containsProhibitedModifiers(modifiers?: NodeArray<Modifier>): boolean {
        return !!modifiers && !!modifiers.find(mod => mod.kind === SyntaxKind.ExportKeyword || mod.kind === SyntaxKind.PrivateKeyword);
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        return undefined;
    }

    type InlineableFunction = FunctionDeclaration | MethodDeclaration;

    function isInlineableFunction(node: Node): node is InlineableFunction {
        return node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.MethodDeclaration;
    }
}