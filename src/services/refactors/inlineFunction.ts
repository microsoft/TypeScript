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
        readonly usages: ReadonlyArray<CallExpression>;
        readonly selectedUsage: CallExpression | undefined;
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
        if (isIdentifier(token)) {
            if (isNameOfFunctionDeclaration(token)) {
                const inlineableFunction = <InlineableFunction>token.parent;
                if (!inlineableFunction.body) return undefined;
                return createInfo(checker, inlineableFunction);
            }

            const call = findAncestor(token, isCallExpression);
            if (!call) return undefined;
            const symbol = checker.getSymbolAtLocation(token);
            if (!symbol) return undefined;
            const declaration = symbol.valueDeclaration;
            if (!isInlineableFunction(declaration) || !declaration.body) return undefined;
            return createInfo(checker, declaration, call);
        }
        return undefined;
    }

    function createInfo(checker: TypeChecker, declaration: InlineableFunction, call?: CallExpression): Info | undefined {
        const usages = getReferencesInScope(
            getEnclosingBlockScopeContainer(declaration),
            declaration.name!,
            checker);
        return canInline(declaration, /* usages */) ? {
            declaration,
            usages,
            selectedUsage: call ? call : undefined
        } : undefined;
    }

    function getReferencesInScope(scope: Node, target: Node, checker: TypeChecker): ReadonlyArray<CallExpression> {
        const symbol = checker.getSymbolAtLocation(target);
        return <CallExpression[]>inlineLocal.findDescendants(scope, n =>
            isCallExpression(n) &&
            checker.getSymbolAtLocation(n.expression) === symbol);
    }

    function canInline(declaration: InlineableFunction, /* usages: ReadonlyArray<CallExpression> */): boolean {
        let hasErrors = false;
        if (!declaration.body) hasErrors = true;
        if (containsProhibitedModifiers(declaration.modifiers)) hasErrors = true;
        return !hasErrors;
    }

    function containsProhibitedModifiers(modifiers?: NodeArray<Modifier>): boolean {
        return !!modifiers && !!modifiers.find(mod =>
            mod.kind === SyntaxKind.ExportKeyword ||
            mod.kind === SyntaxKind.PrivateKeyword);
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, program, startPosition } = context;
        const info = getInfo(program, file, startPosition);
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
            declaration: InlineableFunction,
            usages: ReadonlyArray<CallExpression>): FileTextChanges[] {
        const { file, program } = context;
        return textChanges.ChangeTracker.with(context, t => {
            forEach(usages, oldNode => {
                inlineAt(file, program.getTypeChecker(), t, oldNode, declaration);
            });
            t.delete(file, declaration);
        });
    }

    function getInlineHereEdits(context: RefactorContext,
            declaration: InlineableFunction,
            usages: ReadonlyArray<CallExpression>,
            selectedUsage: CallExpression): FileTextChanges[] {
        const { file, program } = context;
        return textChanges.ChangeTracker.with(context, t => {
            inlineAt(file, program.getTypeChecker(), t, selectedUsage, declaration);
            if (usages.length === 1) t.delete(file, declaration);
        });
    }

    function inlineAt(
            file: SourceFile,
            checker: TypeChecker,
            t: textChanges.ChangeTracker,
            targetNode: CallExpression,
            declaration: InlineableFunction) {
        const { parameters } = declaration;
        let body = declaration.body!;
        const statement = findAncestor(targetNode, isStatement)!;
        const renameMap = createMap<Identifier>();
        const symbols = checker.getSymbolsInScope(targetNode, SymbolFlags.All);
        forEach(parameters, (p, i) => {
            // let name = `arg${i}`; // if parameter is object or array literal
            const oldName = p.name;
            if (isIdentifier(oldName)) {
                const symbol = checker.getSymbolAtLocation(oldName)!;
                checker.isSymbolAccessible(symbol, targetNode, 0, /* shouldComputeAliasesToMakeVisible */ false);
                const flags = NodeFlags.Const;
                const value = targetNode.arguments[i];
                const type: TypeNode | undefined = undefined;
                const name = getSafeName(oldName);
                const variableStatement = createVariable(name, type, flags, value);
                t.insertNodeBefore(file, statement, variableStatement);
            }
        });

        const returnType = checker.getTypeAtLocation(declaration);
        const isVoid = returnType.flags === TypeFlags.VoidLike;
        const returns = <ReturnStatement[]>inlineLocal.findDescendants(body, isReturnStatement);
        const nofReturns = returns.length;
        const returnVariableName = getUniqueName("returnValue", file);
        if (nofReturns > 1 && !isVoid) {
            const typeNode = getEffectiveReturnTypeNode(declaration);
            t.insertNodeBefore(
                file,
                statement,
                createVariable(
                    createIdentifier(returnVariableName),
                    typeNode,
                    NodeFlags.Let,
                    /* initializer */ undefined
            ));
        }
        collectConflictingNames(declaration);
        body = getSynthesizedDeepCloneWithRenames(body, /* includeTrivia */ true, renameMap, checker);
        body = visitEachChild(body, visitor, nullTransformationContext);
        forEach(body.statements, st => {
            if (!isReturnStatement(st)) {
                t.insertNodeBefore(file, statement, st);
            }
        });
        if (nofReturns === 1) {
            const returnExpression = forEachReturnStatement<Expression | undefined>(body, r => r.expression);
            if (returnExpression) {
                const expression = inlineLocal.parenthesizeIfNecessary(targetNode, returnExpression);
                t.replaceNode(file, targetNode, expression);
            }
        }
        else if (nofReturns > 1) {
            t.replaceNode(file, targetNode, createIdentifier(returnVariableName));
        }

        function collectConflictingNames(node: Node) {
            const sourceSymbols = checker.getSymbolsInScope(node, SymbolFlags.All);
            const localSymbols = filter(sourceSymbols, s => s.valueDeclaration && getEnclosingBlockScopeContainer(s.valueDeclaration) === node);
            forEach(localSymbols, s => {
                const declaration = s.valueDeclaration;
                if (!isNamedDeclaration(declaration)) return;
                if (!isIdentifier(declaration.name)) return;
                getSafeName(declaration.name);
            });
        }

        function visitor(node: Node): VisitResult<Node> {
            if (isMethodDeclaration(declaration) && isThisProperty(node)) {
                const expr = targetNode.expression;
                if (isPropertyAccessExpression(expr)) {
                    const propertyAccess = <PropertyAccessExpression>node;
                    // propertyAccess.expression = expr.expression;
                    return createPropertyAccess(expr.expression, propertyAccess.name);
                    // return node;
                }
                // const symbol = checker.getSymbolAtLocation(node);
                // if (symbol) {}
            }
            if (isReturnStatement(node) && nofReturns > 1) {
                if (node.expression) {
                    const assignment = createAssignment(createIdentifier(returnVariableName), node.expression);
                    return createExpressionStatement(assignment);
                }
            }
            return visitEachChild(node, visitor, nullTransformationContext);
        }

        function getSafeName(name: Identifier) {
            const symbol = checker.getSymbolAtLocation(name)!;
            if (nameIsTaken(symbols, name.text, symbol)) {
                const safeName = createIdentifier(getUniqueName(name.text, file));
                renameMap.set(String(getSymbolId(symbol)), safeName);
                return safeName;
            }
            return name;
        }
    }

    type InlineableFunction = FunctionDeclaration | MethodDeclaration;

    function createVariable(name: Identifier, type?: TypeNode | undefined, flags?: NodeFlags, initializer?: Expression) {
        const decl = createVariableDeclaration(name, type, initializer);
        const declList = createVariableDeclarationList([decl], flags);
        const variableStatement = createVariableStatement(/* modifiers */ undefined, declList);
        return variableStatement;
    }

    function nameIsTaken(symbols: Symbol[], name: string, symbol: Symbol) {
        return forEach(symbols, s => s.name === name && s !== symbol ? s : undefined);
    }

    function isInlineableFunction(node: Node): node is InlineableFunction {
        return node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.MethodDeclaration;
    }
}