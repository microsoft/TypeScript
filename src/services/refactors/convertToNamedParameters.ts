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
        const functionDeclaration = getFunctionDeclarationAtPosition(file, startPosition, context.program.getTypeChecker());
        if (!functionDeclaration) return emptyArray;

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

        const functionNames = getFunctionDeclarationNames(functionDeclaration);
        const groupedReferences = getGroupedReferences(functionNames, program, cancellationToken);
        if (checkReferences(functionNames, groupedReferences)) {
            const edits = textChanges.ChangeTracker.with(context, t => doChange(file, program, host, t, functionDeclaration, groupedReferences));
            return { renameFilename: undefined, renameLocation: undefined, edits };
        }

        return { edits: [] };
    }


    function doChange(sourceFile: SourceFile, program: Program, host: LanguageServiceHost, changes: textChanges.ChangeTracker, functionDeclaration: ValidFunctionDeclaration, groupedReferences: GroupedReferences): void {
        const newParamDeclaration = map(createNewParameters(functionDeclaration, program, host), param => getSynthesizedDeepClone(param));
        changes.replaceNodeRangeWithNodes(
            sourceFile,
            first(functionDeclaration.parameters),
            last(functionDeclaration.parameters),
            newParamDeclaration,
            {   joiner: ", ",
                // indentation is set to 0 because otherwise the object parameter will be indented if there is a `this` parameter
                indentation: 0,
                startPosition: textChanges.LeadingTriviaOption.IncludeAll,
                endPosition: textChanges.TrailingTriviaOption.Include
            });


        const functionCalls = groupedReferences.calls;
        forEach(functionCalls, call => {
            if (call.arguments && call.arguments.length) {
                const newArgument = getSynthesizedDeepClone(createNewArgument(functionDeclaration, call.arguments), /*includeTrivia*/ true);
                changes.replaceNodeRange(
                    getSourceFileOfNode(call),
                    first(call.arguments),
                    last(call.arguments),
                    newArgument,
                    { startPosition: textChanges.LeadingTriviaOption.IncludeAll, endPosition: textChanges.TrailingTriviaOption.Include });
            }});
    }

    function getGroupedReferences(functionNames: Node[], program: Program, cancellationToken: CancellationToken): GroupedReferences {
        const functionRefs = flatMap(functionNames, name => FindAllReferences.getReferenceEntriesForNode(-1, name, program, program.getSourceFiles(), cancellationToken));
        const groupedReferences = groupReferences(functionRefs);
        return groupedReferences;

        function groupReferences(referenceEntries: ReadonlyArray<FindAllReferences.Entry> | undefined): GroupedReferences {
            const references: GroupedReferences = { calls: [], declarations: [], unhandled: [] };
            forEach(referenceEntries, (entry) => {
                const decl = entryToDeclarationName(entry);
                if (decl) {
                    references.declarations.push(decl);
                    return;
                }
                const call = entryToFunctionCall(entry);
                if (call) {
                    references.calls.push(call);
                    return;
                }
                const node = entryToNode(entry);
                if (node) {
                    references.unhandled.push(node);
                }
            });
            return references;

            function entryToFunctionCall(entry: FindAllReferences.Entry): CallExpression | NewExpression | undefined {
                if (entry.kind !== FindAllReferences.EntryKind.Span && entry.node && entry.node.parent) {
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
            }

            function entryToDeclarationName(entry: FindAllReferences.Entry): Node | undefined {
                if (entry.kind !== FindAllReferences.EntryKind.Span && entry.node && contains(functionNames, entry.node)) {
                    return entry.node;
                }
                return undefined;
            }

            function entryToNode(entry: FindAllReferences.Entry): Node | undefined {
                if (entry.kind !== FindAllReferences.EntryKind.Span && entry.node) {
                    return entry.node;
                }
                return undefined;
            }
        }
    }

    function checkReferences(functionNames: Node[], groupedReferences: GroupedReferences): boolean {
        if (groupedReferences.unhandled.length > 0) {
            return false;
        }
        if (groupedReferences.declarations.length > functionNames.length) {
            return false;
        }
        return true;
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
                    return isValidParameterNodeArray(functionDeclaration.parameters) && !!functionDeclaration.body && !checker.isImplementationOfOverload(functionDeclaration);
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
            return !paramDeclaration.modifiers && !paramDeclaration.decorators && isIdentifier(paramDeclaration.name);
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

    function createNewArgument(functionDeclaration: ValidFunctionDeclaration, args: NodeArray<Expression>): ObjectLiteralExpression {
        const parameters = getRefactorableParameters(functionDeclaration.parameters);
        const hasRestParameter = isRestParameter(last(parameters));
        const nonRestArguments = hasRestParameter ? args.slice(0, parameters.length - 1) : args;
        const properties = map(nonRestArguments, (arg, i) => {
            const property = createPropertyAssignment(getParameterName(parameters[i]), arg);
            suppressLeadingAndTrailingTrivia(property.initializer);
            copyComments(arg, property);
            return property;
        });

        if (hasRestParameter && args.length >= parameters.length) {
            const restArguments = args.slice(parameters.length - 1);
            const restProperty = createPropertyAssignment(getParameterName(last(parameters)), createArrayLiteral(restArguments));
            properties.push(restProperty);
        }

        const objectLiteral = createObjectLiteral(properties, /*multiLine*/ false);
        return objectLiteral;
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

                suppressLeadingAndTrailingTrivia(element);
                if (paramDecl.initializer && element.initializer) {
                    copyComments(paramDecl.initializer, element.initializer);
                }

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
            const thisParam = functionDeclaration.parameters[0];
            const newThis = createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                thisParam.name,
                /*questionToken*/ undefined,
                thisParam.type);

            suppressLeadingAndTrailingTrivia(newThis.name);
            copyComments(thisParam.name, newThis.name);
            if (thisParam.type && newThis.type) {
                suppressLeadingAndTrailingTrivia(newThis.type);
                copyComments(thisParam.type, newThis.type);
            }

            return createNodeArray([newThis, newParameter]);
        }
        return createNodeArray([newParameter]);

        function createParamTypeNode(parameters: NodeArray<ValidParameterDeclaration>): TypeLiteralNode {
            const members = map(parameters, createPropertySignatureFromParameterDeclaration);
            const typeNode = addEmitFlags(createTypeLiteralNode(members), EmitFlags.SingleLine); // TODO: add single line option to createTypeLiteralNode
            return typeNode;
        }

        function createPropertySignatureFromParameterDeclaration(paramDeclaration: ValidParameterDeclaration): PropertySignature {
            let paramType = paramDeclaration.type;
            if (!paramType && (paramDeclaration.initializer || isRestParameter(paramDeclaration))) {
                paramType = getTypeNode(paramDeclaration);
            }

            const propertySignature = createPropertySignature(
                /*modifiers*/ undefined,
                getParameterName(paramDeclaration),
                paramDeclaration.initializer || isRestParameter(paramDeclaration) ? createToken(SyntaxKind.QuestionToken) : paramDeclaration.questionToken,
                paramType,
                /*initializer*/ undefined);

            suppressLeadingAndTrailingTrivia(propertySignature);
            copyComments(paramDeclaration.name, propertySignature.name);
            if (paramDeclaration.type && propertySignature.type) {
                copyComments(paramDeclaration.type, propertySignature.type);
            }

            return propertySignature;
        }

        function getTypeNode(node: Node): TypeNode | undefined {
            const checker = program.getTypeChecker();
            const type = checker.getTypeAtLocation(node);
            return getTypeNodeIfAccessible(type, node, program, host);
        }
    }

    function copyComments(sourceNode: Node, targetNode: Node) {
        const sourceFile = sourceNode.getSourceFile();
        const text = sourceFile.text;
        if (hasLeadingLineBreak(sourceNode, text)) {
            copyLeadingComments(sourceNode, targetNode, sourceFile);
        }
        else {
            copyTrailingAsLeadingComments(sourceNode, targetNode, sourceFile);
        }
        copyTrailingComments(sourceNode, targetNode, sourceFile);

        function hasLeadingLineBreak(node: Node, text: string) {
            const start = node.getFullStart();
            const end = node.getStart();
            for (let i = start; i < end; i++) {
                if (text.charCodeAt(i) === CharacterCodes.lineFeed) return true;
            }
            return false;
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
                        return [ctrKeyword!];
                    case SyntaxKind.ClassExpression:
                        name = functionDeclaration.parent.parent.name;
                        if (ctrKeyword) return [ctrKeyword, name];
                        return [name];
                    default: return Debug.assertNever(functionDeclaration.parent);
                }
            case SyntaxKind.ArrowFunction:
                return [functionDeclaration.parent.name];
            case SyntaxKind.FunctionExpression:
                if (functionDeclaration.name) return [functionDeclaration.name, functionDeclaration.parent.name];
                return [functionDeclaration.parent.name];
        }
    }

    type ValidParameterNodeArray = NodeArray<ValidParameterDeclaration>;

    type ValidVariableDeclaration = VariableDeclaration & { type: undefined };

    interface ValidConstructor extends ConstructorDeclaration {
        parent: ClassDeclaration | (ClassExpression & { parent: ValidVariableDeclaration });
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
        decorators: undefined;
    }

    interface GroupedReferences {
        calls: (CallExpression | NewExpression)[];
        declarations: Node[];
        unhandled: Node[];
    }
}