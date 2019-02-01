/* @internal */
namespace ts.refactor.convertToNamedParameters {
    const refactorName = "Convert to named parameters";
    const refactorDescription = "Convert to named parameters";
    const actionNameNamedParameters = "Convert to named parameters";
    const actionDescriptionNamedParameters = "Convert to named parameters";
    const minimumParameterLength = 1;
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });


    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, startPosition } = context;
        const func = getFunctionDeclarationAtPosition(file, startPosition, context.program.getTypeChecker());
        if (!func) return emptyArray;

        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [{
                name: actionNameNamedParameters,
                description: actionDescriptionNamedParameters
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        Debug.assert(actionName === actionNameNamedParameters);
        const { file, startPosition, program, cancellationToken, host } = context;
        const func = getFunctionDeclarationAtPosition(file, startPosition, program.getTypeChecker());
        if (!func || !cancellationToken) return undefined;

        const edits = textChanges.ChangeTracker.with(context, t => doChange(file, program, cancellationToken, host, t, func));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function doChange(sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken, host: LanguageServiceHost, changes: textChanges.ChangeTracker, functionDeclaration: ValidFunctionDeclaration): void {
        const newParamDeclaration = createObjectParameter(functionDeclaration, program, host);
        const newFunctionDeclaration = getSynthesizedDeepClone(updateDeclarationParameters(functionDeclaration, createNodeArray(newParamDeclaration)), /*includeTrivia*/ false);
        changes.replaceNode(sourceFile, functionDeclaration, newFunctionDeclaration);

        const nameNodes = getFunctionDeclarationNames(functionDeclaration);
        const functionRefs = flatMap(nameNodes, name => FindAllReferences.getReferenceEntriesForNode(-1, name, program, program.getSourceFiles(), cancellationToken));
        const functionCalls = getDirectFunctionCalls(functionRefs);

        forEach(functionCalls, call => {
            if (call.arguments && call.arguments.length) {
                const newArguments = getSynthesizedDeepClone(createArgumentObject(functionDeclaration, call));
                changes.replaceNodeRange(getSourceFileOfNode(call), first(call.arguments), last(call.arguments), newArguments);
            }});
    }

    function updateDeclarationParameters(declaration: SignatureDeclaration, parameters: NodeArray<ParameterDeclaration>): SignatureDeclaration {
        const newDeclaration = getSynthesizedClone(declaration);
        newDeclaration.parameters = parameters;
        return updateNode(newDeclaration, declaration);
    }

    function createArgumentObject(func: ValidFunctionDeclaration, funcCall: CallExpression | NewExpression): ObjectLiteralExpression {
        const parameters = getRefactorableParameters(func.parameters);
        const properties = map(funcCall.arguments, (arg, i) => createPropertyAssignment(getParameterName(parameters[i]), arg));
        return createObjectLiteral(properties, /*multiLine*/ false);
    }

    function getDirectFunctionCalls(referenceEntries: ReadonlyArray<FindAllReferences.Entry> | undefined): ReadonlyArray<CallExpression | NewExpression> {
        return mapDefined(referenceEntries, (entry) => {
            if (entry.kind !== FindAllReferences.EntryKind.Span && entry.node.parent) {
                const functionRef = entry.node;
                const parent = functionRef.parent;
                switch (parent.kind) {
                    // Function call (foo(...))
                    case SyntaxKind.CallExpression:
                        const callExpression = tryCast(parent, isCallExpression);
                        if (callExpression && callExpression.expression === functionRef) {
                            return callExpression;
                        }
                        break;
                    // Constructor call (new Foo(...))
                    case SyntaxKind.NewExpression:
                        const newExpression = tryCast(parent, isNewExpression);
                        if (newExpression && newExpression.expression === functionRef) {
                            return newExpression;
                        }
                        break;
                    // Method call (x.foo(...))
                    case SyntaxKind.PropertyAccessExpression:
                        const propertyAccessExpression = tryCast(parent, isPropertyAccessExpression);
                        if (propertyAccessExpression && propertyAccessExpression.parent && propertyAccessExpression.name === functionRef) {
                            const callExpression = tryCast(propertyAccessExpression.parent, isCallExpression);
                            if (callExpression && callExpression.expression === propertyAccessExpression) {
                                return callExpression;
                            }
                        }
                        break;
                    // Method call (x['foo'](...))
                    case SyntaxKind.ElementAccessExpression:
                        const elementAccessExpression = tryCast(parent, isElementAccessExpression);
                        if (elementAccessExpression && elementAccessExpression.parent && elementAccessExpression.argumentExpression === functionRef) {
                            const callExpression = tryCast(elementAccessExpression.parent, isCallExpression);
                            if (callExpression && callExpression.expression === elementAccessExpression) {
                                return callExpression;
                            }
                        }
                        break;
                }
            }
            return undefined;
        });
    }

    function getFunctionDeclarationAtPosition(file: SourceFile, startPosition: number, checker: TypeChecker): ValidFunctionDeclaration | undefined {
        const node = getTokenAtPosition(file, startPosition);
        const func = getContainingFunction(node);
        if (!func || !isValidFunctionDeclaration(func, checker) || !rangeContainsRange(func, node) || (func.body && rangeContainsRange(func.body, node))) return undefined;
        return func;
    }

    function isValidFunctionDeclaration(func: SignatureDeclaration, checker: TypeChecker): func is ValidFunctionDeclaration {
        switch (func.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return !!func.name && isPropertyName(func.name) && isValidParameterNodeArray(func.parameters) && !!func.body && !checker.isImplementationOfOverload(func);
            case SyntaxKind.Constructor:
                if (isClassDeclaration(func.parent)) {
                    return !!func.parent.name && isValidParameterNodeArray(func.parameters) && !!func.body && !checker.isImplementationOfOverload(func);
                }
                else {
                    return isVariableDeclaration(func.parent.parent) && !func.parent.parent.type && isVarConst(func.parent.parent) && isValidParameterNodeArray(func.parameters) && !!func.body && !checker.isImplementationOfOverload(func);
                }
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return isVariableDeclaration(func.parent) && !func.parent.type && isVarConst(func.parent) && isValidParameterNodeArray(func.parameters);
        }
        return false;
    }

    function isValidParameterNodeArray(parameters: NodeArray<ParameterDeclaration>): boolean {
        return parameters && getRefactorableParametersLength(parameters) > minimumParameterLength && every(parameters, isValidParameterDeclaration);
    }

    function isValidParameterDeclaration(paramDecl: ParameterDeclaration): paramDecl is ValidParameterDeclaration {
        return !paramDecl.modifiers && !paramDecl.dotDotDotToken && isIdentifier(paramDecl.name);
    }

    function hasThisParameter(parameters: NodeArray<ParameterDeclaration>): boolean {
        return isThis(parameters[0].name);
    }

    function getRefactorableParametersLength(parameters: NodeArray<ParameterDeclaration>): number {
        if (hasThisParameter(parameters)) {
            return parameters.length - 1;
        }
        return parameters.length;
    }

    function getRefactorableParameters(parameters: NodeArray<ValidParameterDeclaration>): NodeArray<ValidParameterDeclaration> {
        if (hasThisParameter(parameters)) {
            parameters = createNodeArray(parameters.slice(1), parameters.hasTrailingComma);
        }
        return parameters;
    }

    function createObjectParameter(functionDeclaration: ValidFunctionDeclaration, program: Program, host: LanguageServiceHost): NodeArray<ParameterDeclaration> {
        const refactorableParameters = getRefactorableParameters(functionDeclaration.parameters);
        const bindingElements = map(
            refactorableParameters,
            paramDecl => {
                return createBindingElement(
                    /*dotDotDotToken*/ undefined,
                    /*propertyName*/ undefined,
                    getParameterName(paramDecl),
                    paramDecl.initializer); });
        const paramName = createObjectBindingPattern(bindingElements);
        const paramType = createParamTypeNode(refactorableParameters);

        let objectInitializer: Expression | undefined;
        if (every(refactorableParameters, param => !!param.initializer || !!param.questionToken)) {
            objectInitializer = createObjectLiteral();
        }

        const newParameter = createParameter(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            /*dotDotDotToken*/ undefined,
            paramName,
            /*questionToken*/ undefined,
            paramType,
            objectInitializer);

        if (hasThisParameter(functionDeclaration.parameters)) {
            return createNodeArray([functionDeclaration.parameters[0], newParameter]);
        }
        return createNodeArray([newParameter]);

        function createParamTypeNode(parameters: NodeArray<ValidParameterDeclaration>): TypeLiteralNode {
            const members = map(parameters, createPropertySignatureFromParameterDeclaration);
            const typeNode = addEmitFlags(createTypeLiteralNode(members), EmitFlags.SingleLine);
            return typeNode;
        }

        function createPropertySignatureFromParameterDeclaration(paramDeclaration: ValidParameterDeclaration): PropertySignature {
            let paramType = paramDeclaration.type;
            if (paramDeclaration.initializer && !paramType) {
                const checker = program.getTypeChecker();
                const type = checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(paramDeclaration.initializer));
                paramType = getTypeNodeIfAccessible(type, paramDeclaration, program, host);
            }
            return createPropertySignature(
                /*modifiers*/ undefined,
                paramDeclaration.name,
                paramDeclaration.initializer ? createToken(SyntaxKind.QuestionToken) : paramDeclaration.questionToken,
                paramType,
                /*initializer*/ undefined);
        }
    }

    function getParameterName(paramDecl: ValidParameterDeclaration): string {
        return getTextOfIdentifierOrLiteral(paramDecl.name);
    }

    function getFunctionDeclarationNames(functionDeclaration: ValidFunctionDeclaration): Node[] {
        switch (functionDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return [functionDeclaration.name];
            case SyntaxKind.Constructor:
                switch (functionDeclaration.parent.kind) {
                    case SyntaxKind.ClassDeclaration:
                        return [functionDeclaration, functionDeclaration.parent.name];
                    case SyntaxKind.ClassExpression:
                        return [functionDeclaration.parent.parent.name];
                    default: return Debug.assertNever(functionDeclaration.parent);
                }
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return [functionDeclaration.parent.name];
        }
    }

    type ValidVariableDeclaration = VariableDeclaration & { type: undefined };

    interface ValidConstructor extends ConstructorDeclaration {
        parent: (ClassDeclaration & { name: Identifier }) | (ClassExpression & { parent: ValidVariableDeclaration });
        parameters: NodeArray<ValidParameterDeclaration>;
        body: FunctionBody;
    }

    interface ValidFunction extends FunctionDeclaration {
        name: Identifier;
        parameters: NodeArray<ValidParameterDeclaration>;
        body: FunctionBody;
    }

    interface ValidMethod extends MethodDeclaration {
        parameters: NodeArray<ValidParameterDeclaration>;
        body: FunctionBody;
    }

    interface ValidFunctionExpression extends FunctionExpression {
        parent: ValidVariableDeclaration;
        parameters: NodeArray<ValidParameterDeclaration>;
    }

    interface ValidArrowFunction extends ArrowFunction {
        parent: ValidVariableDeclaration;
        parameters: NodeArray<ValidParameterDeclaration>;
    }

    type ValidFunctionDeclaration = ValidConstructor | ValidFunction | ValidMethod | ValidArrowFunction | ValidFunctionExpression;

    interface ValidParameterDeclaration extends ParameterDeclaration {
        name: Identifier;
        dotDotDotToken: undefined;
        modifiers: undefined;
    }
}