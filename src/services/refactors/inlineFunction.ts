/* @internal */
namespace ts.refactor.inlineFunction {
    const refactorName = "Inline function";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_function);

    const inlineHereActionName = "Inline here";
    const inlineAllActionName = "Inline all";

    const inlineHereActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_here);
    const inlineAllActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_all);


    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    type InlineableFunction = FunctionDeclaration | MethodDeclaration;

    interface Info {
        readonly declaration: InlineableFunction;
        readonly usages: ReadonlyArray<CallExpression>;
        readonly selectedUsage: CallExpression | undefined;
        readonly allAvailable: boolean;
        readonly selectedAvailable: boolean;
    }

    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { program, file, startPosition } = context;
        const info = getInfo(program, file, startPosition);
        if (!info) return emptyArray;
        const { allAvailable, selectedAvailable } = info;
        const refactorInfo: ApplicableRefactorInfo = {
            name: refactorName,
            description: refactorDescription,
            actions: []
        };
        if (allAvailable) {
            refactorInfo.actions.push({
                name: inlineAllActionName,
                description: inlineAllActionDescription
            });
        }
        if (selectedAvailable) {
            refactorInfo.actions.push({
                name: inlineHereActionName,
                description: inlineHereActionDescription
            });
        }
        return [refactorInfo];
    }

    function areSymbolsAccessible(checker: TypeChecker, symbols: ReadonlyArray<Symbol>, target: Node) {
        return every(symbols, symbol => {
            const symbolAccessibility = checker.isSymbolAccessible(
                symbol,
                target,
                SymbolFlags.All,
                /* shouldComputeAliasesToMakeVisible */ false).accessibility;
            return symbolAccessibility === SymbolAccessibility.Accessible;
        });
    }

    function getExternalSymbolsReferencedInScope(declaration: InlineableFunction, checker: TypeChecker) {
        const ids = findDescendants(declaration, isIdentifier);
        const visited = createMap<Symbol>();
        forEach(ids, id => {
            const symbol = checker.getSymbolAtLocation(id);
            if (!symbol) return;
            const symbolId = String(getSymbolId(symbol));
            if (!visited.has(symbolId)) visited.set(symbolId, symbol);
        });
        const symbols = arrayFrom(visited.values());
        return filter(symbols, s => {
            if (s.valueDeclaration) {
                const symbolScope = getEnclosingBlockScopeContainer(s.valueDeclaration);
                return !(declaration === symbolScope || isAncestor(symbolScope, declaration));
            }
            return false;
        });
    }

    function getInfo(program: Program, file: SourceFile, startPosition: number): Info | undefined {
        const token = getTokenAtPosition(file, startPosition);
        const checker = program.getTypeChecker();
        if (isNameOfFunctionDeclaration(token)) {
            return createInfo(checker, <InlineableFunction>token.parent);
        }

        const call = findAncestor(token, isCallExpression);
        if (!call) return undefined;
        const symbol = checker.getSymbolAtLocation(call.expression);
        if (!symbol) return undefined;
        const declaration = symbol.valueDeclaration;
        if (!isInlineableFunction(declaration)) return undefined;
        return createInfo(checker, declaration, call);
    }

    function createInfo(
        checker: TypeChecker,
        declaration: InlineableFunction,
        call?: CallExpression
    ): Info | undefined {
        const usages = getCallsInScope(
            declaration.getSourceFile(),
            declaration,
            checker);
        const { allAvailable, selectedAvailable } = canInline(checker, declaration, usages, call);
        return {
            declaration,
            usages,
            selectedUsage: call ? call : undefined,
            allAvailable,
            selectedAvailable
        };
    }

    function getCallsInScope(
        scope: Node,
        target: InlineableFunction,
        checker: TypeChecker
    ): ReadonlyArray<CallExpression> {
        const targetSymbol = checker.getSymbolAtLocation(target.name!)!;
        const calls = findDescendants(scope, isCallExpression);
        if (isMethodDeclaration(target)) {
            return calls.filter(c => {
                const property = <PropertyAccessExpression>c.expression;
                if (isThisProperty(property)) {
                    return checker.getSymbolAtLocation(property) === targetSymbol;
                }
                const obj = property.expression;
                const type = obj.contextualType || checker.getTypeAtLocation(obj);
                const members = type.symbol.members;
                return members && members.get(targetSymbol.escapedName);
            });
        }
        return calls.filter(n => checker.getSymbolAtLocation(n.expression) === targetSymbol);
    }

    function canInline(
        checker: TypeChecker,
        declaration: InlineableFunction,
        usages: ReadonlyArray<CallExpression>,
        call?: CallExpression
    ) {
        let anyHaveErrors = false;
        let selectedHasErrors = false;
        const body = declaration.body;
        if (!body || body.statements.length === 0) {
            anyHaveErrors = true;
            selectedHasErrors = true;
        }
        if (containsProhibitedModifiers(declaration.modifiers)) {
            anyHaveErrors = true;
            selectedHasErrors = true;
        }
        const symbols = getExternalSymbolsReferencedInScope(declaration, checker);
        if (!every(usages, u => areSymbolsAccessible(checker, symbols, u))) anyHaveErrors = true;
        if (!call || !areSymbolsAccessible(checker, symbols, call)) selectedHasErrors = true;
        return { allAvailable: !anyHaveErrors, selectedAvailable: !selectedHasErrors };
    }

    function containsProhibitedModifiers(modifiers?: NodeArray<Modifier>): boolean {
        return !!modifiers && !!modifiers.find(mod =>
            mod.kind === SyntaxKind.ExportKeyword);
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
                return { edits: getInlineHereEdits(context, declaration, selectedUsage!) };
            default:
                return Debug.fail("invalid action");
        }
    }

    function getInlineAllEdits(
        context: RefactorContext,
        declaration: InlineableFunction,
        usages: ReadonlyArray<CallExpression>
    ): FileTextChanges[] {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            forEach(usages, oldNode => {
                inlineAt(context, t, oldNode, declaration);
            });
            t.delete(file, declaration);
        });
    }

    function getInlineHereEdits(
        context: RefactorContext,
        declaration: InlineableFunction,
        selectedUsage: CallExpression
    ): FileTextChanges[] {
        return textChanges.ChangeTracker.with(context, t => {
            inlineAt(context, t, selectedUsage, declaration);
        });
    }

    function inlineAt(
        context: RefactorContext,
        t: textChanges.ChangeTracker,
        targetNode: CallExpression,
        declaration: InlineableFunction
    ) {
        const { file } = context;
        const statement = findAncestor(targetNode, isStatement)!;
        const { statements, returnExpression } = getInlineInfo(context, declaration, targetNode);

        forEach(statements, st => { t.insertNodeBefore(file, statement, st); });

        if (returnExpression) {
            t.replaceNode(file, targetNode, returnExpression);
        }
        else {
            /* deleteNode does not work here, because it deletes from fullStart to end,
             * but replaceNode only replaces from start. This creates a runtime error of
             * overlapping edits because of the inserts made before.
            */
            t.deleteRange(file, { pos: statement.getStart(), end: statement.getEnd() });
        }
    }

    function getInlineInfo(context: RefactorContext, declaration: InlineableFunction, targetNode: CallExpression) {
        const { file, program } = context;
        const { parameters, body } = declaration;
        const checker = program.getTypeChecker();
        const renameMap = getConflictingNames(checker, declaration, targetNode);
        const isVoid = returnTypeIsVoidLike(checker, declaration);
        const returns = findDescendants(body!, n => isReturnStatement(n) && getEnclosingBlockScopeContainer(n) === declaration);
        const nofReturns = returns.length;
        const transformedBody = visitEachChild(body!, transformVisitor, nullTransformationContext);

        const statements = [] as Statement[];
        statements.push(...getVariableDeclarationsFromParameters(parameters, targetNode, transformVisitor));
        const returnVariableStatement = getVariableDeclarationFromReturn(file, declaration, nofReturns, isVoid);
        if (returnVariableStatement) statements.push(returnVariableStatement);
        statements.push(...filter(transformedBody.statements, s => !isReturnStatement(s)));
        const returnExpression = getReturnExpression(file, targetNode, transformedBody, isVoid, nofReturns);
        return { statements, returnExpression };

        function transformVisitor(node: Node): VisitResult<Node> {
            if (isIdentifier(node)) {
                const symbol = checker.getSymbolAtLocation(node);
                if (symbol) return getSafeName(renameMap, node, symbol);
            }
            if (isObjectBindingElementWithoutPropertyName(node)) {
                const name = node.name;
                const symbol = checker.getSymbolAtLocation(name);
                if (symbol) {
                    const safeName = getSafeName(renameMap, name, symbol);
                    if (safeName !== name) {
                        return createBindingElement(node.dotDotDotToken, name, safeName, node.initializer);
                    }
                }
            }
            if (isMethodDeclaration(declaration) && isThisProperty(node)) {
                const expr = targetNode.expression;
                if (isPropertyAccessExpression(expr)) {
                    const propertyAccess = <PropertyAccessExpression>node;
                    return createPropertyAccess(expr.expression, propertyAccess.name);
                }
            }
            if (isReturnStatement(node) && nofReturns > 1) {
                const expression = node.expression;
                if (expression) {
                    const safeExpression = visitNode(expression, transformVisitor);
                    const assignment = createAssignment(createReturnVariableName(file), safeExpression);
                    return createExpressionStatement(assignment);
                }
            }
            return visitEachChild(node, transformVisitor, nullTransformationContext);
        }
    }

    function getSafeName(renameMap: Map<string>, name: Identifier, { id }: Symbol): Identifier {
        if (renameMap.has(String(id))) {
            return createIdentifier(renameMap.get(String(id))!);
        }
        return name;
    }

    function getReturnExpression(
        file: SourceFile,
        targetNode: Node,
        transformedBody: Block,
        isVoid: boolean,
        nofReturns: number
    ) {
        if (nofReturns === 1 && !isVoid) {
            const returnExpression = forEachReturnStatement(transformedBody, r => r.expression)!;
            return inlineLocal.parenthesizeIfNecessary(targetNode, returnExpression);
        }
        else if (nofReturns > 1 && !isVoid) {
            return createReturnVariableName(file);
        }
        return undefined;
    }

    function createReturnVariableName(file: SourceFile) {
        return createIdentifier(getUniqueName("returnValue", file));
    }

    function getVariableDeclarationsFromParameters(
        parameters: NodeArray<ParameterDeclaration>,
        targetNode: CallExpression,
        transformVisitor: (node: Node) => VisitResult<Node>
    ) {
        return map(parameters, (p, i) => {
            const oldName = p.name;
            const typeArguments = targetNode.typeArguments;
            const typeNode = typeArguments && typeArguments[i];
            const argument = targetNode.arguments[i];
            const initializer = argument ? argument : p.initializer;
            const name = visitNode(oldName, transformVisitor);
            return createVariable(name, typeNode, NodeFlags.Const, initializer);
        });
    }

    function getVariableDeclarationFromReturn(
        file: SourceFile,
        declaration: InlineableFunction,
        nofReturns: number,
        isVoid: boolean
    ) {
        if (nofReturns > 1 && !isVoid) {
            const typeNode = getEffectiveReturnTypeNode(declaration);
            return createVariable(
                createReturnVariableName(file),
                typeNode,
                NodeFlags.Let,
                /* initializer */ undefined);
        }
        return undefined;
    }

    function returnTypeIsVoidLike(checker: TypeChecker, declaration: InlineableFunction) {
        const signature = checker.getSignatureFromDeclaration(declaration)!;
        const returnType = checker.getReturnTypeOfSignature(signature);
        const isVoid = !!(returnType.flags & TypeFlags.VoidLike);
        return isVoid;
    }

    function getConflictingNames(checker: TypeChecker, scope: Node, targetNode: Node) {
        const renameMap = createMap<string>();
        const sourceSymbols = checker.getSymbolsInScope(scope, SymbolFlags.All);
        const localSymbols = filter(sourceSymbols, s => {
            if (s.valueDeclaration) {
                const declScope = getEnclosingBlockScopeContainer(s.valueDeclaration);
                return scope === declScope || isAncestor(declScope, scope);
            }
            return false;
        });
        const symbols = checker.getSymbolsInScope(targetNode, SymbolFlags.All);
        forEach(localSymbols, s => {
            const declaration = s.valueDeclaration;
            if (!isNamedDeclaration(declaration)) return;
            const name = declaration.name;
            if (!isIdentifier(name)) return;
            if (nameIsTaken(symbols, s)) {
                const safeName = getUniqueName(name.text, targetNode.getSourceFile());
                renameMap.set(String(getSymbolId(s)), safeName);
            }
        });
        return renameMap;
    }

    function isAncestor(node: Node, ancestor: Node) {
        return !!findAncestor(node, n => n === ancestor);
    }

    function createVariable(
        name: BindingName,
        type?: TypeNode | undefined,
        flags?: NodeFlags,
        initializer?: Expression
    ) {
        const declaration = createVariableDeclaration(name, type, initializer);
        const declarationList = createVariableDeclarationList([declaration], flags);
        const variableStatement = createVariableStatement(/* modifiers */ undefined, declarationList);
        return variableStatement;
    }

    function nameIsTaken(symbols: Symbol[], symbol: Symbol) {
        return some(symbols, s => s.name === symbol.name && s !== symbol);
    }

    function isInlineableFunction(node: Node): node is InlineableFunction {
        return isFunctionDeclaration(node) || isMethodDeclaration(node);
    }
}
