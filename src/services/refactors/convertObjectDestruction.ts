/* @internal */
namespace ts.refactor {
    const refactorName = "Introduce Destruction";
    const actionNameIntroduceObjectDestruction = "Convert property access to Object destruction";
    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);
        if (isJSFile || !cancellationToken) return emptyArray;

        const info = getInfo(file, startPosition, program.getTypeChecker(), program, cancellationToken);
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
        const { file, startPosition, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);

        const emptyResult: RefactorEditInfo  = { edits: [] };
        if (isJSFile || !cancellationToken) return emptyResult;

        const info = getInfo(file, startPosition, program.getTypeChecker(), program, cancellationToken);
        if (!info) return emptyResult;

        const edits = textChanges.ChangeTracker.with(context, t => doChange(t, file, info));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function doChange(changeTracker: textChanges.ChangeTracker, file: SourceFile, info: Info) {
        const nameMap = new Map<string, string>();
        const bindingElements: BindingElement[] = [];
        info.referencedAccessExpression.forEach(([expr, name]) => {
            if (!nameMap.has(name)) {
                const temp = factory.createUniqueName(name, GeneratedIdentifierFlags.Optimistic);
                nameMap.set(name, temp.text);
                bindingElements.push(getUniqueDestructionName(expr, name, temp.text));
            }
            const newName = nameMap.get(name)!;

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

    function getUniqueDestructionName(expr: AccessExpression, name: string, newName: string) {
        const needRename = name !== newName;
        if (isPropertyAccessExpression(expr)) {
            const bindingName = cast(expr.name, isIdentifier);
            return factory.createBindingElement(
                /* dotDotDotToken*/ undefined,
                needRename ? expr.name : undefined,
                needRename ? newName : bindingName,
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
    }

    function getInfo(file: SourceFile, startPosition: number, checker: TypeChecker, program: Program, cancellationToken: CancellationToken): Info | undefined {
        const node = getTouchingToken(file, startPosition);
        if (!isAccessExpression(node.parent) || node.parent.expression !== node) return undefined;
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
            if (!isAccessExpression(reference.node.parent) || reference.node.parent.expression !== reference.node) {
                return undefined;
            }

            if (isElementAccessExpression(reference.node.parent)) {
                if (!isStringLiteralLike(reference.node.parent.argumentExpression)) {
                    return undefined;
                }

                return [reference.node.parent, reference.node.parent.argumentExpression.text];
            }

            return [reference.node.parent, reference.node.parent.name.text];
        });
        if (!referencedAccessExpression.length || !firstReferenced) return undefined;

        const type = checker.getTypeOfSymbolAtLocation(symbol, firstReferenced);
        let hasUnconvertableReference = false;
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
        });

        if (hasUnconvertableReference) return undefined;

        return {
            replacementExpression: node.parent.expression,
            firstReferenced,
            referencedAccessExpression,
        };
    }
}