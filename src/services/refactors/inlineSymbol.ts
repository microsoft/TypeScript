/* @internal */
namespace ts.refactor.inlineSymbol {
  const inlineHereActionName = "Inline here";
  const inlineAllActionName = "Inline all";

  const inlineHereActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_here);
  const inlineAllActionDescription = getLocaleSpecificMessage(Diagnostics.Inline_all);

  namespace inlineLocal {
    export const refactorName = "Inline local";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_local);

    interface Info {
        readonly declaration: VariableDeclaration;
        readonly usages: ReadonlyArray<Identifier>;
        readonly selectedUsage: Identifier | undefined;
    }

    export function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
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
    }

    function isLocalVariable(node: Node): node is VariableDeclaration {
        return node && isVariableDeclaration(node) && isVariableDeclarationInVariableStatement(node);
    }

    function createInfo(
        checker: TypeChecker,
        declaration: VariableDeclaration,
        selectedUsage?: Identifier
    ): Info | undefined {
        const name = declaration.name;
        const usages = getUsagesInScope(getEnclosingBlockScopeContainer(name), name, checker);
        return canInline(declaration, usages) ? {
            declaration,
            usages,
            selectedUsage
        } : undefined;
    }

    function canInline(declaration: VariableDeclaration, usages: ReadonlyArray<Identifier>) {
        let hasErrors = false;
        if (!declaration.initializer) hasErrors = true;
        if (containsProhibitedModifiers(declaration.parent.parent.modifiers)) hasErrors = true;
        forEach(usages, usage => {
            if (isAssigned(usage)) hasErrors = true;
        });
        return !hasErrors;
    }

    function isAssigned(usage: Identifier) {
        const assignment = findAncestor(usage, isAssignmentExpression)!;
        return assignment && assignment.left === usage;
    }

    function containsProhibitedModifiers(modifiers?: NodeArray<Modifier>) {
        return !!modifiers && !!find(modifiers, mod => mod.kind === SyntaxKind.ExportKeyword);
    }

    export function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, program, startPosition } = context;
        const info = getLocalInfo(file, program, startPosition);
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
        declaration: VariableDeclaration,
        usages: ReadonlyArray<Identifier>): FileTextChanges[] {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            forEach(usages, oldNode => {
                const { initializer } = declaration;
                const clone = getSynthesizedDeepClone(initializer!);
                const expression = parenthesizeIfNecessary(oldNode, clone);
                t.replaceNode(file, oldNode, expression);
            });
            t.delete(file, declaration);
        });
    }

    function getInlineHereEdits(
        context: RefactorContext,
        declaration: VariableDeclaration,
        selectedUsage: Identifier): FileTextChanges[] {
        const { file } = context;
        return textChanges.ChangeTracker.with(context, t => {
            const { initializer } = declaration;
            const clone = getSynthesizedDeepClone(initializer!);
            const expression = parenthesizeIfNecessary(selectedUsage, clone);
            t.replaceNode(file, selectedUsage, expression);
        });
    }

    function getUsagesInScope(scope: Node, target: Node, checker: TypeChecker): ReadonlyArray<Identifier> {
        const symbol = checker.getSymbolAtLocation(target);
        return findDescendants(scope, n =>
            checker.getSymbolAtLocation(n) === symbol &&
            !isDeclaration(n.parent)) as Identifier[];
    }
  }

  namespace inlineFunction {
    export const refactorName = "Inline function";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_function);

    type InlineableFunction = FunctionDeclaration | MethodDeclaration;

    interface Info {
        readonly declaration: InlineableFunction;
        readonly usages: ReadonlyArray<CallExpression>;
        readonly selectedUsage: CallExpression | undefined;
        readonly allAvailable: boolean;
        readonly selectedAvailable: boolean;
    }

    export function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
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
        const usages = getCallsInFile(
            declaration.getSourceFile(),
            declaration,
            checker);
        const { allAvailable, selectedAvailable } = canInline(checker, declaration, usages, call);
        return {
            declaration,
            usages,
            selectedUsage: call,
            allAvailable,
            selectedAvailable
        };
    }

    function getCallsInFile(
        file: SourceFile,
        target: InlineableFunction,
        checker: TypeChecker
    ): ReadonlyArray<CallExpression> {
        const calls: CallExpression[] = [];
        FindAllReferences.Core.eachSignatureCall(target, [file], checker, c => { calls.push(c); });
        return calls;
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
        if (containsExportKeyword(declaration.modifiers)) {
            anyHaveErrors = true;
        }
        const symbols = getExternalSymbolsReferencedInScope(declaration, checker);
        if (!every(usages, u => areSymbolsAccessible(checker, symbols, u))) anyHaveErrors = true;
        if (!call || !areSymbolsAccessible(checker, symbols, call)) selectedHasErrors = true;
        return { allAvailable: !anyHaveErrors, selectedAvailable: !selectedHasErrors };
    }

    function containsExportKeyword(modifiers?: NodeArray<Modifier>): boolean {
        return !!modifiers && !!find(modifiers, mod => mod.kind === SyntaxKind.ExportKeyword);
    }

    export function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
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
            return parenthesizeIfNecessary(targetNode, returnExpression);
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

  registerRefactor(inlineLocal.refactorName, { getEditsForAction: inlineLocal.getEditsForAction, getAvailableActions: inlineLocal.getAvailableActions });
  registerRefactor(inlineFunction.refactorName, { getEditsForAction: inlineFunction.getEditsForAction, getAvailableActions: inlineFunction.getAvailableActions });

  function parenthesizeIfNecessary(target: Node, expression: Expression): Expression {
    const parent = target.parent;
    if (isBinaryExpression(parent)) {
        const parentOperatorKind = parent.operatorToken.kind;
        if (parentOperatorKind === SyntaxKind.AsteriskAsteriskToken && isUnaryExpression(expression)) {
            return createParen(expression);
        }
        return parenthesizeBinaryOperand(
            parentOperatorKind,
            expression,
            target === parent.left,
            parent.left);
    }
    if (isExpression(parent)) {
        const parentPrecedence = getExpressionPrecedence(parent);
        const expressionPrecedence = getExpressionPrecedence(expression);
        if (parentPrecedence > expressionPrecedence) {
            return createParen(expression);
        }
        else {
            return expression;
        }
    }
    return expression;
  }
}