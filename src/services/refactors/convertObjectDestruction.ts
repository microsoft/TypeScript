/* @internal */
namespace ts.refactor {
    const refactorName = "Introduce Destruction";
    const actionNameIntroduceObjectDestruction = "Convert property access to Object destruction";
    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);
        if (isJSFile || !cancellationToken) return emptyArray;

        const info = getInfo(context, file, program.getTypeChecker(), program, cancellationToken, /*resolveUniqueName*/ false);
        if (!info) return emptyArray;

        return [{
            name: refactorName,
            description: actionNameIntroduceObjectDestruction,
            actions: [{
                name: refactorName,
                description: actionNameIntroduceObjectDestruction
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        Debug.assert(actionName === refactorName);
        const { file, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);

        const emptyResult: RefactorEditInfo = { edits: [] };
        if (isJSFile || !cancellationToken) return emptyResult;

        const info = getInfo(context, file, program.getTypeChecker(), program, cancellationToken, /*resolveUniqueName*/ true);
        if (!info) return emptyResult;

        const edits = textChanges.ChangeTracker.with(context, t => doChange(t, file, info));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function doChange(changeTracker: textChanges.ChangeTracker, file: SourceFile, info: Info) {
        const nameMap = new Map<string, string>();
        const bindingElements: BindingElement[] = [];
        info.referencedAccessExpression.forEach(([expr, name]) => {
            if (!nameMap.has(name)) {
                const needAlias = info.namesNeedUniqueName.has(name);
                const uniqueName = needAlias ? getUniqueName(name, file) : name;
                nameMap.set(name, uniqueName);
                bindingElements.push(getUniqueDestructionName(expr, needAlias, uniqueName));
            }

            const newName = nameMap.get(name);
            Debug.assertIsDefined(newName);

            changeTracker.replaceNode(
                file,
                expr,
                factory.createIdentifier(newName)
            );
        });

        const newBinding = factory.createVariableStatement(
            /* modifiers*/ undefined,
            factory.createVariableDeclarationList(
                [
                    factory.createVariableDeclaration(
                        factory.createObjectBindingPattern(bindingElements),
                        /*exclamationToken*/ undefined,
                        /*type*/ undefined,
                        info.replacementExpression
                    )
                ],
                NodeFlags.Const
            ),
        );

        const firstReferencedStatement = findAncestor(info.firstReferenced, isStatement);
        Debug.assertIsDefined(firstReferencedStatement);
        changeTracker.insertNodeBefore(
            file,
            firstReferencedStatement,
            newBinding
        );
    }

    function getUniqueDestructionName(expr: AccessExpression, needAlias: boolean, newName: string) {
        if (isPropertyAccessExpression(expr)) {
            const bindingName = cast(expr.name, isIdentifier);
            return factory.createBindingElement(
                /* dotDotDotToken*/ undefined,
                needAlias ? expr.name : undefined,
                needAlias ? newName : bindingName,
            );
        }
        else {
            const argExpr = cast(expr.argumentExpression, isPropertyName);
            return factory.createBindingElement(
                /* dotDotDotToken*/ undefined,
                argExpr,
                newName,
            );
        }
    }

    interface Info {
        replacementExpression: Expression,
        referencedAccessExpression: [AccessExpression, string][]
        firstReferenced: Expression
        namesNeedUniqueName: Set<string>
    }

    function getInfo(context: RefactorContext, file: SourceFile, checker: TypeChecker, program: Program, cancellationToken: CancellationToken, resolveUniqueName: boolean): Info | undefined {
        const current = getTokenAtPosition(file, context.startPosition);
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));

        const node = findAncestor(current, (node => node.parent && isAccessExpression(node.parent) && !rangeContainsSkipTrivia(range, node.parent, file)));

        if (!node || !isAccessExpression(node.parent) || node.parent.expression !== node) return undefined;
        const symbol = checker.getSymbolAtLocation(node);
        if (!symbol || checker.isUnknownSymbol(symbol) || !symbol.valueDeclaration || !isVariableLike(symbol.valueDeclaration) || isEnumMember(symbol.valueDeclaration)) return undefined;

        // Find only current file
        const references = FindAllReferences.getReferenceEntriesForNode(-1, node, program, [file], cancellationToken);
        let firstReferenced: Expression | undefined;
        const referencedAccessExpression: [AccessExpression, string][] = mapDefined(references, reference => {
            if (reference.kind !== FindAllReferences.EntryKind.Node) {
                return undefined;
            }
            if (node !== symbol.valueDeclaration && isExpression(node) && (!firstReferenced || node.pos < firstReferenced.pos)) {
                firstReferenced = node;
            }

            let lastChild: Node | undefined;
            const topReferencedAccessExpression = findAncestor(reference.node, n => {
                if (isAccessExpression(n) && n.expression === lastChild) {
                    return true;
                }
                lastChild = n;
                return false;
            });
            if (!topReferencedAccessExpression || isAssignmentTarget(topReferencedAccessExpression) || isCallLikeExpression(skipParenthesesUp(topReferencedAccessExpression.parent))) {
                return undefined;
            }

            const accessExpression = cast(topReferencedAccessExpression, isAccessExpression);
            if (isElementAccessExpression(accessExpression)) {
                if (!isStringLiteralLike(accessExpression.argumentExpression)) {
                    return undefined;
                }

                return [accessExpression, accessExpression.argumentExpression.text];
            }

            return [accessExpression, accessExpression.name.text];
        });
        if (!referencedAccessExpression.length || !firstReferenced) return undefined;

        let hasUnconvertableReference = false;
        const namesNeedUniqueName = new Set<string>();
        const type = checker.getTypeOfSymbolAtLocation(symbol, firstReferenced);
        forEach(referencedAccessExpression, ([expr, name]) => {
            const referenceType = checker.getTypeAtLocation(expr);
            if (referenceType !== type) {
                const accessType = checker.getTypeAtLocation(expr);
                const prop = checker.getPropertyOfType(type, name);

                if (!prop || checker.getTypeOfSymbolAtLocation(prop, expr) !== accessType) {
                    hasUnconvertableReference = true;
                    return "quit";
                }
            }

            if (resolveUniqueName) {
                const symbol = checker.resolveName(name, /*location*/ undefined, SymbolFlags.Value, /*excludeGlobals*/ false);
                if (symbol) {
                    namesNeedUniqueName.add(name);
                }
            }
        });

        if (hasUnconvertableReference) return undefined;
        return {
            replacementExpression: node.parent.expression,
            firstReferenced,
            referencedAccessExpression,
            namesNeedUniqueName
        };
    }
}