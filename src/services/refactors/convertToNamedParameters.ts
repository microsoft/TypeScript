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
        const isJSFile = isSourceFileJS(file);
        if (isJSFile) return emptyArray;
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

        const groupedReferences = getGroupedReferences(functionDeclaration, program, cancellationToken);
        if (groupedReferences.valid) {
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
                leadingTriviaOption: textChanges.LeadingTriviaOption.IncludeAll,
                trailingTriviaOption: textChanges.TrailingTriviaOption.Include
            });


        const functionCalls = deduplicate(groupedReferences.functionCalls, (a, b) => a === b);
        forEach(functionCalls, call => {
            if (call.arguments && call.arguments.length) {
                const newArgument = getSynthesizedDeepClone(createNewArgument(functionDeclaration, call.arguments), /*includeTrivia*/ true);
                changes.replaceNodeRange(
                    getSourceFileOfNode(call),
                    first(call.arguments),
                    last(call.arguments),
                    newArgument,
                    { leadingTriviaOption: textChanges.LeadingTriviaOption.IncludeAll, trailingTriviaOption: textChanges.TrailingTriviaOption.Include });
            }});
    }

    function getGroupedReferences(functionDeclaration: ValidFunctionDeclaration, program: Program, cancellationToken: CancellationToken): GroupedReferences {
        const names = getDeclarationNames(functionDeclaration);
        const references = flatMap(names, name => FindAllReferences.getReferenceEntriesForNode(-1, name, program, program.getSourceFiles(), cancellationToken));
        let groupedReferences = groupReferences(references);

        // if the refactored function is a constructor, we must also go through the references to its class
        if (isConstructorDeclaration(functionDeclaration)) {
            const className = getClassName(functionDeclaration);
            groupedReferences = groupClassReferences(groupedReferences, className);
        }

        validateReferences(groupedReferences);
        return groupedReferences;

        function getClassName(constructorDeclaration: ValidConstructor): Identifier {
            switch (constructorDeclaration.parent.kind) {
                case SyntaxKind.ClassDeclaration:
                    return constructorDeclaration.parent.name;
                case SyntaxKind.ClassExpression:
                    return constructorDeclaration.parent.parent.name;
            }
        }

        function groupReferences(referenceEntries: ReadonlyArray<FindAllReferences.Entry> | undefined): GroupedReferences {
            const groupedReferences: GroupedReferences = { functionCalls: [], declarations: [], unhandled: [], valid: true };

            forEach(referenceEntries, (entry) => {
                const decl = entryToDeclaration(entry);
                if (decl) {
                    groupedReferences.declarations.push(decl);
                    return;
                }

                const call = entryToFunctionCall(entry);
                if (call) {
                    groupedReferences.functionCalls.push(call);
                    return;
                }

                groupedReferences.unhandled.push(entry);
            });
            return groupedReferences;
        }

        function groupClassReferences(groupedReferences: GroupedReferences, className: Identifier): GroupedReferences {
            const classReferences: ClassReferences = { accessExpressions: [], typeUsages: [] };
            const unhandledEntries = groupedReferences.unhandled;
            const newUnhandledEntries: FindAllReferences.Entry[] = [];

            forEach(unhandledEntries, (entry) => {
                if (entry.kind === FindAllReferences.EntryKind.Node && entry.node.symbol === className.symbol) {
                    const accessExpression = entryToAccessExpression(entry);
                    if (accessExpression) {
                        classReferences.accessExpressions.push(accessExpression);
                        return;
                    }

                    // Only class declarations are allowed to be used as a type (in a heritage clause),
                    // otherwise `findAllReferences` might not be able to track constructor calls.
                    if (isClassDeclaration(functionDeclaration.parent)) {
                        const type = entryToType(entry);
                        if (type) {
                            classReferences.typeUsages.push(type);
                            return;
                        }
                    }
                }
                newUnhandledEntries.push(entry);
            });

            return { ...groupedReferences, classReferences, unhandled: newUnhandledEntries };
        }

        function validateReferences(groupedReferences: GroupedReferences): void {
            if (groupedReferences.unhandled.length > 0) {
                groupedReferences.valid = false;
            }
            if (!every(groupedReferences.declarations, decl => contains(names, decl))) {
                groupedReferences.valid = false;
            }
        }

        function entryToFunctionCall(entry: FindAllReferences.Entry): CallExpression | NewExpression | undefined {
            if (entry.kind === FindAllReferences.EntryKind.Node && entry.node.parent) {
                const functionReference = entry.node;
                const parent = functionReference.parent;
                switch (parent.kind) {
                    // Function call (foo(...) or super(...))
                    case SyntaxKind.CallExpression:
                        const callExpression = tryCast(parent, isCallExpression);
                        if (callExpression && callExpression.expression === functionReference) {
                            return callExpression;
                        }
                        break;
                    // Constructor call (new Foo(...))
                    case SyntaxKind.NewExpression:
                        const newExpression = tryCast(parent, isNewExpression);
                        if (newExpression && newExpression.expression === functionReference) {
                            return newExpression;
                        }
                        break;
                    // Method call (x.foo(...))
                    case SyntaxKind.PropertyAccessExpression:
                        const propertyAccessExpression = tryCast(parent, isPropertyAccessExpression);
                        if (propertyAccessExpression && propertyAccessExpression.parent && propertyAccessExpression.name === functionReference) {
                            const callExpression = tryCast(propertyAccessExpression.parent, isCallExpression);
                            if (callExpression && callExpression.expression === propertyAccessExpression) {
                                return callExpression;
                            }
                        }
                        break;
                    // Method call (x["foo"](...))
                    case SyntaxKind.ElementAccessExpression:
                        const elementAccessExpression = tryCast(parent, isElementAccessExpression);
                        if (elementAccessExpression && elementAccessExpression.parent && elementAccessExpression.argumentExpression === functionReference) {
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

        function entryToDeclaration(entry: FindAllReferences.Entry): Node | undefined {
            if (entry.kind === FindAllReferences.EntryKind.Node && contains(names, entry.node)) {
                return entry.node;
            }
            return undefined;
        }

        function entryToAccessExpression(entry: FindAllReferences.Entry): ElementAccessExpression | PropertyAccessExpression | undefined {
            if (entry.kind === FindAllReferences.EntryKind.Node && entry.node.parent) {
                const reference = entry.node;
                const parent = reference.parent;
                switch (parent.kind) {
                    // `C.foo`
                    case SyntaxKind.PropertyAccessExpression:
                        const propertyAccessExpression = tryCast(parent, isPropertyAccessExpression);
                        if (propertyAccessExpression && propertyAccessExpression.expression === reference) {
                            return propertyAccessExpression;
                        }
                        break;
                    // `C["foo"]`
                    case SyntaxKind.ElementAccessExpression:
                        const elementAccessExpression = tryCast(parent, isElementAccessExpression);
                        if (elementAccessExpression && elementAccessExpression.expression === reference) {
                            return elementAccessExpression;
                        }
                        break;
                }
            }
            return undefined;
        }

        function entryToType(entry: FindAllReferences.Entry): Node | undefined {
            if (entry.kind === FindAllReferences.EntryKind.Node) {
                const reference = entry.node;
                if (getMeaningFromLocation(reference) === SemanticMeaning.Type || isExpressionWithTypeArgumentsInClassExtendsClause(reference.parent)) {
                    return reference;
                }
            }
            return undefined;
        }
    }

    function getFunctionDeclarationAtPosition(file: SourceFile, startPosition: number, checker: TypeChecker): ValidFunctionDeclaration | undefined {
        const node = getTokenAtPosition(file, startPosition);
        const functionDeclaration = getContainingFunction(node);
        if (!functionDeclaration || !isValidFunctionDeclaration(functionDeclaration, checker) || !rangeContainsRange(functionDeclaration, node) || (functionDeclaration.body && rangeContainsRange(functionDeclaration.body, node))) return undefined;
        return functionDeclaration;
    }

    function isValidFunctionDeclaration(functionDeclaration: SignatureDeclaration, checker: TypeChecker): functionDeclaration is ValidFunctionDeclaration {
        if (!isValidParameterNodeArray(functionDeclaration.parameters)) return false;
        switch (functionDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return !!functionDeclaration.name && !!functionDeclaration.body && !checker.isImplementationOfOverload(functionDeclaration);
            case SyntaxKind.Constructor:
                if (isClassDeclaration(functionDeclaration.parent)) {
                    return !!functionDeclaration.body && !!functionDeclaration.parent.name && !checker.isImplementationOfOverload(functionDeclaration);
                }
                else {
                    return isValidVariableDeclaration(functionDeclaration.parent.parent) && !!functionDeclaration.body && !checker.isImplementationOfOverload(functionDeclaration);
                }
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return isValidVariableDeclaration(functionDeclaration.parent);
        }
        return false;

        function isValidParameterNodeArray(parameters: NodeArray<ParameterDeclaration>): parameters is ValidParameterNodeArray {
            return getRefactorableParametersLength(parameters) > minimumParameterLength && every(parameters, isValidParameterDeclaration);
        }

        function isValidParameterDeclaration(paramDeclaration: ParameterDeclaration): paramDeclaration is ValidParameterDeclaration {
            return !paramDeclaration.modifiers && !paramDeclaration.decorators && isIdentifier(paramDeclaration.name);
        }

        function isValidVariableDeclaration(node: Node): node is ValidVariableDeclaration {
            return isVariableDeclaration(node) && isVarConst(node) && isIdentifier(node.name) && !node.type;
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

    function createNewArgument(functionDeclaration: ValidFunctionDeclaration, functionArguments: NodeArray<Expression>): ObjectLiteralExpression {
        const parameters = getRefactorableParameters(functionDeclaration.parameters);
        const hasRestParameter = isRestParameter(last(parameters));
        const nonRestArguments = hasRestParameter ? functionArguments.slice(0, parameters.length - 1) : functionArguments;
        const properties = map(nonRestArguments, (arg, i) => {
            const property = createPropertyAssignment(getParameterName(parameters[i]), arg);
            suppressLeadingAndTrailingTrivia(property.initializer);
            copyComments(arg, property);
            return property;
        });

        if (hasRestParameter && functionArguments.length >= parameters.length) {
            const restArguments = functionArguments.slice(parameters.length - 1);
            const restProperty = createPropertyAssignment(getParameterName(last(parameters)), createArrayLiteral(restArguments));
            properties.push(restProperty);
        }

        const objectLiteral = createObjectLiteral(properties, /*multiLine*/ false);
        return objectLiteral;
    }

    function createNewParameters(functionDeclaration: ValidFunctionDeclaration, program: Program, host: LanguageServiceHost): NodeArray<ParameterDeclaration> {
        const refactorableParameters = getRefactorableParameters(functionDeclaration.parameters);
        const bindingElements = map(refactorableParameters, createBindingElementFromParameterDeclaration);
        const objectParameterName = createObjectBindingPattern(bindingElements);
        const objectParameterType = createParameterTypeNode(refactorableParameters);

        let objectInitializer: Expression | undefined;
        // If every parameter in the original function was optional, add an empty object initializer to the new object parameter
        if (every(refactorableParameters, param => !!param.initializer || !!param.questionToken)) {
            objectInitializer = createObjectLiteral();
        }

        const objectParameter = createParameter(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            /*dotDotDotToken*/ undefined,
            objectParameterName,
            /*questionToken*/ undefined,
            objectParameterType,
            objectInitializer);

        if (hasThisParameter(functionDeclaration.parameters)) {
            const thisParameter = functionDeclaration.parameters[0];
            const newThisParameter = createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                thisParameter.name,
                /*questionToken*/ undefined,
                thisParameter.type);

            suppressLeadingAndTrailingTrivia(newThisParameter.name);
            copyComments(thisParameter.name, newThisParameter.name);
            if (thisParameter.type && newThisParameter.type) {
                suppressLeadingAndTrailingTrivia(newThisParameter.type);
                copyComments(thisParameter.type, newThisParameter.type);
            }

            return createNodeArray([newThisParameter, objectParameter]);
        }
        return createNodeArray([objectParameter]);

        function createBindingElementFromParameterDeclaration(parameterDeclaration: ValidParameterDeclaration): BindingElement {
            const element = createBindingElement(
                /*dotDotDotToken*/ undefined,
                /*propertyName*/ undefined,
                getParameterName(parameterDeclaration),
                isRestParameter(parameterDeclaration) ? createArrayLiteral() : parameterDeclaration.initializer);

            suppressLeadingAndTrailingTrivia(element);
            if (parameterDeclaration.initializer && element.initializer) {
                copyComments(parameterDeclaration.initializer, element.initializer);
            }
            return element;
        }

        function createParameterTypeNode(parameters: NodeArray<ValidParameterDeclaration>): TypeLiteralNode {
            const members = map(parameters, createPropertySignatureFromParameterDeclaration);
            const typeNode = addEmitFlags(createTypeLiteralNode(members), EmitFlags.SingleLine);
            return typeNode;
        }

        function createPropertySignatureFromParameterDeclaration(parameterDeclaration: ValidParameterDeclaration): PropertySignature {
            let parameterType = parameterDeclaration.type;
            if (!parameterType && (parameterDeclaration.initializer || isRestParameter(parameterDeclaration))) {
                parameterType = getTypeNode(parameterDeclaration);
            }

            const propertySignature = createPropertySignature(
                /*modifiers*/ undefined,
                getParameterName(parameterDeclaration),
                parameterDeclaration.initializer || isRestParameter(parameterDeclaration) ? createToken(SyntaxKind.QuestionToken) : parameterDeclaration.questionToken,
                parameterType,
                /*initializer*/ undefined);

            suppressLeadingAndTrailingTrivia(propertySignature);
            copyComments(parameterDeclaration.name, propertySignature.name);
            if (parameterDeclaration.type && propertySignature.type) {
                copyComments(parameterDeclaration.type, propertySignature.type);
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

    function getDeclarationNames(functionDeclaration: ValidFunctionDeclaration): Node[] {
        switch (functionDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return [functionDeclaration.name];
            case SyntaxKind.Constructor:
                const ctrKeyword = findChildOfKind(functionDeclaration, SyntaxKind.ConstructorKeyword, functionDeclaration.getSourceFile())!;
                switch (functionDeclaration.parent.kind) {
                    case SyntaxKind.ClassDeclaration:
                        const classDeclaration = functionDeclaration.parent;
                        return [classDeclaration.name, ctrKeyword];
                    case SyntaxKind.ClassExpression:
                        const classExpression = functionDeclaration.parent;
                        const variableDeclaration = functionDeclaration.parent.parent;
                        const className = classExpression.name;
                        if (className) return [className, ctrKeyword, variableDeclaration.name];
                        return [ctrKeyword, variableDeclaration.name];
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

    type ValidVariableDeclaration = VariableDeclaration & { name: Identifier, type: undefined };

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
        decorators: undefined;
    }

    interface GroupedReferences {
        functionCalls: (CallExpression | NewExpression)[];
        declarations: Node[];
        classReferences?: ClassReferences;
        unhandled: FindAllReferences.Entry[];
        valid: boolean;
    }
    interface ClassReferences {
        accessExpressions: Node[];
        typeUsages: Node[];
    }
}