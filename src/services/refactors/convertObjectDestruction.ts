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

        changeTracker.insertNodeBefore(
            file,
            info.firstReferencedStatement,
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
                needAlias ? factory.cloneNode(argExpr) : undefined,
                newName,
            );
        }
    }

    interface Info {
        replacementExpression: Expression,
        referencedAccessExpression: [AccessExpression, string][]
        firstReferenced: Expression
        firstReferencedStatement: Statement
        namesNeedUniqueName: Set<string>
    }

    function getInfo(context: RefactorContext, file: SourceFile, checker: TypeChecker, program: Program, cancellationToken: CancellationToken, resolveUniqueName: boolean): Info | undefined {
        const current = getTokenAtPosition(file, context.startPosition);
        const compilerOptions = context.program.getCompilerOptions();
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));

        const node = findAncestor(current, (node => node.parent && isAccessExpression(node.parent) && !rangeContainsSkipTrivia(range, node.parent, file)));

        if (!node || !isAccessExpression(node.parent) || node.parent.expression !== node) return undefined;
        const symbol = checker.getSymbolAtLocation(node);
        if (!symbol || checker.isUnknownSymbol(symbol) || !symbol.valueDeclaration || !isVariableLike(symbol.valueDeclaration) || isEnumMember(symbol.valueDeclaration)) return undefined;

        // Find only current file
        const references = FindAllReferences.getReferenceEntriesForNode(-1, node, program, [file], cancellationToken);
        let firstReferenced: Expression | undefined;
        let firstReferencedStatement: Statement | undefined;
        const referencedAccessExpression: [AccessExpression, string][] = [];
        const allReferencedAcccessExpression: AccessExpression[] = [];
        const container = isParameter(symbol.valueDeclaration) ?
            symbol.valueDeclaration :
            findAncestor(symbol.valueDeclaration, or(isStatement, isSourceFile));
        Debug.assertIsDefined(container);

        forEach(references, reference => {
            if (reference.kind !== FindAllReferences.EntryKind.Node) {
                return undefined;
            }

            let lastChild = reference.node;
            const topReferencedAccessExpression = findAncestor(reference.node.parent, n => {
                if (isParenthesizedExpression(n)) {
                    lastChild = n;
                    return false;
                }
                else if (isAccessExpression(n)) {
                    if (n.expression === lastChild) {
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

            if (reference.node.pos < symbol.valueDeclaration.pos) {
                return;
            }
            if (isFunctionLikeDeclaration(container.parent) && container.parent.body && !rangeContainsRange(container.parent.body, reference.node)) {
                return;
            }

            if (accessExpression !== symbol.valueDeclaration && isExpression(accessExpression)) {
                if (!firstReferenced || accessExpression.pos < firstReferenced.pos) {
                    firstReferenced = accessExpression;
                }
                const referencedStatement = findAncestor(accessExpression, n => {
                    const parent = n.parent && isBlock(n.parent) && isFunctionLikeDeclaration(n.parent.parent) ? n.parent.parent : n.parent;
                    return isStatement(n) && parent === container.parent;
                });
                if (referencedStatement && (!firstReferencedStatement || referencedStatement.pos < firstReferencedStatement.pos)) {
                    firstReferencedStatement = cast(referencedStatement, isStatement);
                }
            }

            if (isElementAccessExpression(accessExpression)) {
                if (!isStringLiteralLike(accessExpression.argumentExpression)) {
                    return;
                }
                if (!isIdentifierText(accessExpression.argumentExpression.text, compilerOptions.target, compilerOptions.jsx ? LanguageVariant.JSX : LanguageVariant.Standard)) {
                    return;
                }

                referencedAccessExpression.push([accessExpression, accessExpression.argumentExpression.text]);
                return;
            }
            if (!isIdentifierText(accessExpression.name.text, compilerOptions.target, compilerOptions.jsx ? LanguageVariant.JSX : LanguageVariant.Standard)) {
                return;
            }

            referencedAccessExpression.push([accessExpression, accessExpression.name.text]);
        });
        if (!firstReferenced || !firstReferencedStatement || !referencedAccessExpression.length || !some(referencedAccessExpression, ([r]) => rangeContainsRange(r, current))) return undefined;

        let hasUnconvertableReference = false;
        const namesNeedUniqueName = new Set<string>();
        const type = checker.getTypeOfSymbolAtLocation(symbol, firstReferenced);
        forEach(allReferencedAcccessExpression, expr => {
            const referenceType = checker.getTypeAtLocation(expr);
            if (referenceType !== type) {
                const propName = isElementAccessExpression(expr) ?
                    cast(expr.argumentExpression, isStringLiteralLike).text :
                    checker.getSymbolAtLocation(expr)?.name;

                const accessType = checker.getTypeAtLocation(expr);
                const prop = propName && checker.getPropertyOfType(type, propName);

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
            firstReferencedStatement,
            referencedAccessExpression,
            namesNeedUniqueName
        };
    }
}