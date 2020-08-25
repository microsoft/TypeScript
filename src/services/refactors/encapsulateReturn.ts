/* @internal */
namespace ts.refactor.encapsulateReturn {
    const refactorName = "Encapsulate return value";
    const actionNameWrapReturnIntoObject = "Wrap return value into object";

    const defaultPropertyName = "value";
    registerRefactor(refactorName, {
        getAvailableActions(context): readonly ApplicableRefactorInfo[] {
            const info = getInfo(context);
            if (!info) return emptyArray;

            return [{
                name: refactorName,
                description: actionNameWrapReturnIntoObject,
                actions: [{
                    name: actionNameWrapReturnIntoObject,
                    description: actionNameWrapReturnIntoObject
                }]
            }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === actionNameWrapReturnIntoObject);

            const cancellationToken = context.cancellationToken;
            const info = getInfo(context, /*findReference*/ true, cancellationToken);
            if (!info || !cancellationToken) {
                return { edits: [] };
            }
            const edits = textChanges.ChangeTracker.with(context, t => doChange(t, info, context.file));
            const renameFilename = context.file.fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, defaultPropertyName, /*preferLastLocation*/ false);

            return { edits, renameFilename, renameLocation };
        },
    });


    interface Info {
        func: FunctionDeclaration | ArrowFunction | MethodDeclaration | FunctionExpression;
        funcName: DeclarationName;
        returnStatements: (ReturnStatement | Expression)[]
        callExpressions: CallExpression[]
        shouldConvertReturnType: boolean
    }

    function getInfo(context: RefactorContext, findReference?: boolean, cancellationToken?: CancellationToken): Info | undefined {
        const { file, startPosition, program } = context
        const node = getTokenAtPosition(file, startPosition);
        const func = getContainingFunction(node);

        if (!func || (!isFunctionDeclaration(func) && !isArrowFunction(func) && !isMethodDeclaration(func) && !isFunctionExpression(func)) || !func.body) {
            return undefined;
        }
        const funcName = getNameOfDeclaration(func);
        if (!funcName) {
            return;
        }

        const returnStatements: (ReturnStatement | Expression)[] = [];
        if (isBlock(func.body)) {
            forEachReturnStatement(func.body, stmt => {
                returnStatements.push(stmt)
            })
        }
        else {
            returnStatements.push(func.body);
        }
        if (!returnStatements.length) {
            return undefined;
        }

        let shouldConvertReturnType = true
        if (func.type) {
            const checker = program.getTypeChecker();
            const type = checker.getTypeAtLocation(func.type);
            if (type === checker.getVoidType() || type === checker.getNeverType()) {
                shouldConvertReturnType = false
            }
        }

        const callExpressions: CallExpression[] = [];
        if (findReference) {
            Debug.assertIsDefined(cancellationToken);

            const references = FindAllReferences.getReferenceEntriesForNode(-1, funcName, program, program.getSourceFiles(), cancellationToken);
            forEach(references, reference => {
                if (reference.kind !== FindAllReferences.EntryKind.Node) {
                    return;
                }

                const parent = skipParenthesesUp(reference.node.parent);
                if (isCallExpression(parent)) {
                    callExpressions.push(parent);
                }
            });
        }

        return {
            func,
            funcName,
            returnStatements,
            callExpressions,
            shouldConvertReturnType
        };
    }

    function doChange(changeTracker: textChanges.ChangeTracker, info: Info, file: SourceFile) {
        forEach(info.returnStatements, returnStmtOrExpr => {
            const returnExpression = isReturnStatement(returnStmtOrExpr) ? 
                returnStmtOrExpr.expression ?? factory.createIdentifier("undefined") :
                returnStmtOrExpr;

            const newReturnObject = factory.createObjectLiteralExpression([
                factory.createPropertyAssignment(
                    defaultPropertyName,
                    returnExpression
                )
            ]);

            if (isReturnStatement(returnStmtOrExpr)) {
                if (!returnStmtOrExpr.expression) {
                    changeTracker.replaceNode(file, returnStmtOrExpr, factory.createReturnStatement(newReturnObject));
                }
                else {
                    changeTracker.replaceNode(file, returnStmtOrExpr.expression, newReturnObject)
                }
            }
            else {
                const newReturnExpression = !isParenthesizedExpression(returnStmtOrExpr.parent) ?
                    factory.createParenthesizedExpression(newReturnObject) :
                    newReturnObject;
                changeTracker.replaceNode(file, returnStmtOrExpr, newReturnExpression);
            }
        });

        forEach(info.callExpressions, call => {
            const newCall = factory.createPropertyAccessExpression(
                call,
                defaultPropertyName
            );
            changeTracker.replaceNode(file, call, newCall);
        });

        if (info.func.type && info.shouldConvertReturnType) {
            const newType = factory.createTypeLiteralNode([
                factory.createPropertySignature(
                    /*modifiers*/ undefined,
                    defaultPropertyName,
                    /*questionToken*/ undefined,
                    info.func.type
                )
            ]);
            changeTracker.replaceNode(file, info.func.type, newType);
        }
    }
}