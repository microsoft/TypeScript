/* @internal */
namespace ts.refactor.convertToNamedParameters {
    const refactorName = "Convert to named parameters";
    const refactorDescription = "Convert to named parameters";
    const actionNameNamedParameters = "Convert to named parameters";
    const actionDescriptionNamedParameters = "Convert to named parameters";
    const minimumParameterLength = 1;
    let refactorSucceeded = true;
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
        const functionDeclaration = getFunctionDeclarationAtPosition(file, startPosition, program.getTypeChecker());
        if (!functionDeclaration || !cancellationToken) return undefined;

        const edits = textChanges.ChangeTracker.with(context, t => doChange(file, program, cancellationToken, host, t, functionDeclaration));
        return refactorSucceeded ? { renameFilename: undefined, renameLocation: undefined, edits } : undefined;
    }

    function doChange(sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken, host: LanguageServiceHost, changes: textChanges.ChangeTracker, functionDeclaration: ValidFunctionDeclaration): void {
        const newParamDeclaration = map(createNewParameters(functionDeclaration, program, host), param => getSynthesizedDeepClone(param, /*includeTrivia*/ true));
        const newFunctionDeclaration = updateDeclarationParameters(functionDeclaration, createNodeArray(newParamDeclaration));
        suppressLeadingAndTrailingTrivia(newFunctionDeclaration, /*recursive*/ false);
        changes.replaceNode(sourceFile, functionDeclaration, newFunctionDeclaration);

        const nameNodes = getFunctionDeclarationNames(functionDeclaration);
        const functionRefs = flatMap(nameNodes, name => FindAllReferences.getReferenceEntriesForNode(-1, name, program, program.getSourceFiles(), cancellationToken));
        const functionCalls = deduplicate(getDirectFunctionCalls(functionRefs), (a, b) => a === b);
        refactorSucceeded = true; // TODO: check if a bad reference was found

        forEach(functionCalls, call => {
            if (call.arguments && call.arguments.length) {
                const newArguments = getSynthesizedDeepClone(createNewArguments(functionDeclaration, call.arguments), /*includeTrivia*/ true);
                changes.replaceNodeRange(getSourceFileOfNode(call), first(call.arguments), last(call.arguments), newArguments);
            }});
    }

    function updateDeclarationParameters(declaration: SignatureDeclaration, parameters: NodeArray<ParameterDeclaration>): SignatureDeclaration {
        const newDeclaration = getSynthesizedClone(declaration);
        newDeclaration.parameters = parameters;
        return updateNode(newDeclaration, declaration);
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
        const functionDeclaration = getContainingFunction(node);
        if (!functionDeclaration || !isValidFunctionDeclaration(functionDeclaration, checker) || !rangeContainsRange(functionDeclaration, node) || (functionDeclaration.body && rangeContainsRange(functionDeclaration.body, node))) return undefined;
        return functionDeclaration;
    }

    function isValidFunctionDeclaration(functionDeclaration: SignatureDeclaration, checker: TypeChecker): functionDeclaration is ValidFunctionDeclaration {
        switch (functionDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return !!functionDeclaration.name && isPropertyName(functionDeclaration.name) && isValidParameterNodeArray(functionDeclaration.parameters) && !!functionDeclaration.body && !checker.isImplementationOfOverload(functionDeclaration);
            case SyntaxKind.Constructor:
                if (isClassDeclaration(functionDeclaration.parent)) {
                    return !!functionDeclaration.parent.name && isValidParameterNodeArray(functionDeclaration.parameters) && !!functionDeclaration.body && !checker.isImplementationOfOverload(functionDeclaration);
                }
                else {
                    return isVariableDeclaration(functionDeclaration.parent.parent) && !functionDeclaration.parent.parent.type && isVarConst(functionDeclaration.parent.parent) && isValidParameterNodeArray(functionDeclaration.parameters) && !!functionDeclaration.body && !checker.isImplementationOfOverload(functionDeclaration);
                }
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return isVariableDeclaration(functionDeclaration.parent) && !functionDeclaration.parent.type && isVarConst(functionDeclaration.parent) && isValidParameterNodeArray(functionDeclaration.parameters);
        }
        return false;

        function isValidParameterNodeArray(parameters: NodeArray<ParameterDeclaration>): parameters is ValidParameterNodeArray {
            return parameters && getRefactorableParametersLength(parameters) > minimumParameterLength && every(parameters, isValidParameterDeclaration);
        }

        function isValidParameterDeclaration(paramDeclaration: ParameterDeclaration): paramDeclaration is ValidParameterDeclaration {
            return !paramDeclaration.modifiers && isIdentifier(paramDeclaration.name);
        }
    }

    function hasThisParameter(parameters: NodeArray<ParameterDeclaration>): boolean {
        return parameters.length > 0 && isThis(parameters[0].name);
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

    function createNewArguments(functionDeclaration: ValidFunctionDeclaration, args: NodeArray<Expression>): ObjectLiteralExpression {
        const parameters = getRefactorableParameters(functionDeclaration.parameters);
        const hasRestParameter = isRestParameter(last(parameters));
        const nonRestArguments = hasRestParameter ? args.slice(0, parameters.length - 1) : args;
        const properties = map(nonRestArguments, (arg, i) => createPropertyAssignment(getParameterName(parameters[i]), arg));

        if (hasRestParameter && args.length >= parameters.length) {
            const restArguments = args.slice(parameters.length - 1);
            const restProperty = createPropertyAssignment(getParameterName(last(parameters)), createArrayLiteral(restArguments));
            properties.push(restProperty);
        }

        return createObjectLiteral(properties, /*multiLine*/ false);
    }

    function createNewParameters(functionDeclaration: ValidFunctionDeclaration, program: Program, host: LanguageServiceHost): NodeArray<ParameterDeclaration> {
        const refactorableParameters = getRefactorableParameters(functionDeclaration.parameters);
        const bindingElements = map(
            refactorableParameters,
            paramDecl => {
                const element = createBindingElement(
                    /*dotDotDotToken*/ undefined,
                    /*propertyName*/ undefined,
                    getParameterName(paramDecl),
                    isRestParameter(paramDecl) ? createArrayLiteral() : paramDecl.initializer);
                return element; });
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
            if (!paramType && (paramDeclaration.initializer || isRestParameter(paramDeclaration))) {
                paramType = getTypeNode(paramDeclaration);
            }

            return createPropertySignature(
                /*modifiers*/ undefined,
                getParameterName(paramDeclaration),
                paramDeclaration.initializer || isRestParameter(paramDeclaration) ? createToken(SyntaxKind.QuestionToken) : paramDeclaration.questionToken,
                paramType,
                /*initializer*/ undefined);
        }

        function getTypeNode(node: Node): TypeNode | undefined {
            const checker = program.getTypeChecker();
            const type = checker.getTypeAtLocation(node);
            return getTypeNodeIfAccessible(type, node, program, host);
        }
    }

    function getParameterName(paramDeclaration: ValidParameterDeclaration) {
        return getTextOfIdentifierOrLiteral(paramDeclaration.name);
    }

    function getFunctionDeclarationNames(functionDeclaration: ValidFunctionDeclaration): Node[] {
        switch (functionDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return [functionDeclaration.name];
            case SyntaxKind.Constructor:
                const ctrKeyword = findChildOfKind(functionDeclaration, SyntaxKind.ConstructorKeyword, functionDeclaration.getSourceFile());
                let name: Node;
                switch (functionDeclaration.parent.kind) {
                    case SyntaxKind.ClassDeclaration:
                        name = functionDeclaration.parent.name;
                        break;
                    case SyntaxKind.ClassExpression:
                        name = functionDeclaration.parent.parent.name;
                        break;
                    default: return Debug.assertNever(functionDeclaration.parent);
                }
                if (ctrKeyword) return [ctrKeyword, name];
                return [name];
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return [functionDeclaration.parent.name];
        }
    }

    type ValidParameterNodeArray = NodeArray<ValidParameterDeclaration>;

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
        modifiers: undefined;
    }
}