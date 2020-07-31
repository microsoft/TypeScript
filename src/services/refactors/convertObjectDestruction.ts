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
        const referencedAccessExpression: [AccessExpression, string][] = [];
        const allReferencedAcccessExpression: AccessExpression[] = [];
        forEach(references, reference => {
            if (reference.kind !== FindAllReferences.EntryKind.Node) {
                return undefined;
            }

            let lastChild = reference.node;
            const topReferencedAccessExpression = findAncestor(reference.node.parent, n => {
                if (isAccessExpression(n) || isParenthesizedExpression(n)) {
                    if (isAccessExpression(n) && n.expression === lastChild) {
                        return true;
                    }
                    lastChild = n;
                    return false;
                }
                return "quit";
            });
            if (!topReferencedAccessExpression) {
                return;
            }

            const accessExpression = cast(topReferencedAccessExpression, isAccessExpression);
            allReferencedAcccessExpression.push(accessExpression);

            if (isAssignmentTarget(accessExpression)) {
                return;
            }

            const referencedParentMaybeCall = skipParenthesesUp(accessExpression.parent);
            if (isCallOrNewExpression(referencedParentMaybeCall) && !(referencedParentMaybeCall.arguments && rangeContainsRange(referencedParentMaybeCall.arguments, topReferencedAccessExpression))) {
                return;
            }

            if (accessExpression !== symbol.valueDeclaration && isExpression(accessExpression) && (!firstReferenced || reference.node.pos < firstReferenced.pos)) {
                firstReferenced = accessExpression;
            }

            if (isElementAccessExpression(accessExpression)) {
                if (!isStringLiteralLike(accessExpression.argumentExpression)) {
                    return;
                }

                referencedAccessExpression.push([accessExpression, accessExpression.argumentExpression.text]);
                return;
            }

            referencedAccessExpression.push([accessExpression, accessExpression.name.text]);
        });
        if (!firstReferenced || !referencedAccessExpression.length || !some(referencedAccessExpression, ([r]) => rangeContainsRange(r, current))) return undefined;

        let hasUnconvertableReference = false;
        const namesNeedUniqueName = new Set<string>();
        const type = checker.getTypeOfSymbolAtLocation(symbol, firstReferenced);
        forEach(allReferencedAcccessExpression, expr => {
            const referenceType = checker.getTypeAtLocation(expr);
            if (referenceType !== type) {
                const accessSymbol = checker.getSymbolAtLocation(expr);
                const accessType = checker.getTypeAtLocation(expr);
                const prop = accessSymbol?.name && checker.getPropertyOfType(type, accessSymbol.name);

                if (!prop || checker.getTypeOfSymbolAtLocation(prop, expr) !== accessType) {
                    hasUnconvertableReference = true;
                    return "quit";
                }
            }
        });

        if (resolveUniqueName) {
            forEach(referencedAccessExpression, ([, name]) => {
                const symbol = checker.resolveName(name, /*location*/ undefined, SymbolFlags.Value, /*excludeGlobals*/ false);
                if (symbol) {
                    namesNeedUniqueName.add(name);
                }
            });
        }

        if (hasUnconvertableReference) return undefined;
        return {
            replacementExpression: node.parent.expression,
            firstReferenced,
            referencedAccessExpression,
            namesNeedUniqueName
        };
    }
}