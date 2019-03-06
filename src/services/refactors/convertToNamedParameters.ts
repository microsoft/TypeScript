/* @internal */
namespace ts.refactor.convertToNamedParameters {
    const refactorName = "Convert to named parameters";
    const minimumParameterLength = 2;
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });


    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, startPosition } = context;
        const isJSFile = isSourceFileJS(file);
        if (isJSFile) return emptyArray; // TODO: GH#30113
        const functionDeclaration = getFunctionDeclarationAtPosition(file, startPosition, context.program.getTypeChecker());
        if (!functionDeclaration) return emptyArray;

        const description = getLocaleSpecificMessage(Diagnostics.Convert_to_named_parameters);
        return [{
            name: refactorName,
            description,
            actions: [{
                name: refactorName,
                description
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        Debug.assert(actionName === refactorName);
        const { file, startPosition, program, cancellationToken, host } = context;
        const functionDeclaration = getFunctionDeclarationAtPosition(file, startPosition, program.getTypeChecker());
        if (!functionDeclaration || !cancellationToken) return undefined;

        const groupedReferences = getGroupedReferences(functionDeclaration, program, cancellationToken);
        if (groupedReferences.valid) {
            const edits = textChanges.ChangeTracker.with(context, t => doChange(file, program, host, t, functionDeclaration, groupedReferences));
            return { renameFilename: undefined, renameLocation: undefined, edits };
        }

        return { edits: [] }; // TODO: GH#30113
    }

    function doChange(
        sourceFile: SourceFile,
        program: Program,
        host: LanguageServiceHost,
        changes: textChanges.ChangeTracker,
        functionDeclaration: ValidFunctionDeclaration,
        groupedReferences: GroupedReferences): void {
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

        const functionCalls = sortAndDeduplicate(groupedReferences.functionCalls, /*comparer*/ (a, b) => compareValues(a.pos, b.pos));
        for (const call of functionCalls) {
            if (call.arguments && call.arguments.length) {
                const newArgument = getSynthesizedDeepClone(createNewArgument(functionDeclaration, call.arguments), /*includeTrivia*/ true);
                changes.replaceNodeRange(
                    getSourceFileOfNode(call),
                    first(call.arguments),
                    last(call.arguments),
                    newArgument,
                    { leadingTriviaOption: textChanges.LeadingTriviaOption.IncludeAll, trailingTriviaOption: textChanges.TrailingTriviaOption.Include });
            }
        }
    }

    function getGroupedReferences(functionDeclaration: ValidFunctionDeclaration, program: Program, cancellationToken: CancellationToken): GroupedReferences {
        const functionNames = getFunctionNames(functionDeclaration);
        const classNames = isConstructorDeclaration(functionDeclaration) ? getClassNames(functionDeclaration) : [];
        const names = deduplicate([...functionNames, ...classNames], equateValues);
        const checker = program.getTypeChecker();

        const references = flatMap(names, /*mapfn*/ name => FindAllReferences.getReferenceEntriesForNode(-1, name, program, program.getSourceFiles(), cancellationToken));
        const groupedReferences = groupReferences(references);

        if (!every(groupedReferences.declarations, decl => contains(names, decl))) {
            groupedReferences.valid = false;
        }

        return groupedReferences;

        function groupReferences(referenceEntries: ReadonlyArray<FindAllReferences.Entry>): GroupedReferences {
            const classReferences: ClassReferences = { accessExpressions: [], typeUsages: [] };
            const groupedReferences: GroupedReferences = { functionCalls: [], declarations: [], classReferences, valid: true };
            const functionSymbols = map(functionNames, checker.getSymbolAtLocation);
            const classSymbols = map(classNames, checker.getSymbolAtLocation);
            const isConstructor = isConstructorDeclaration(functionDeclaration);

            for (const entry of referenceEntries) {
                if (entry.kind !== FindAllReferences.EntryKind.Node) {
                    groupedReferences.valid = false;
                    continue;
                }
                if (contains(functionSymbols, checker.getSymbolAtLocation(entry.node), symbolComparer)) {
                    const decl = entryToDeclaration(entry);
                    if (decl) {
                        groupedReferences.declarations.push(decl);
                        continue;
                    }

                    const call = entryToFunctionCall(entry);
                    if (call) {
                        groupedReferences.functionCalls.push(call);
                        continue;
                    }
                }
                // if the refactored function is a constructor, we must also check if the references to its class are valid
                if (isConstructor && contains(classSymbols, checker.getSymbolAtLocation(entry.node), symbolComparer)) {
                    const decl = entryToDeclaration(entry);
                    if (decl) {
                        groupedReferences.declarations.push(decl);
                        continue;
                    }

                    const accessExpression = entryToAccessExpression(entry);
                    if (accessExpression) {
                        classReferences.accessExpressions.push(accessExpression);
                        continue;
                    }

                    // Only class declarations are allowed to be used as a type (in a heritage clause),
                    // otherwise `findAllReferences` might not be able to track constructor calls.
                    if (isClassDeclaration(functionDeclaration.parent)) {
                        const type = entryToType(entry);
                        if (type) {
                            classReferences.typeUsages.push(type);
                            continue;
                        }
                    }
                }
                groupedReferences.valid = false;
            }

            return groupedReferences;
        }
    }

    function symbolComparer(a: Symbol, b: Symbol): boolean {
        return getSymbolTarget(a) === getSymbolTarget(b);
    }

    function entryToDeclaration(entry: FindAllReferences.NodeEntry): Node | undefined {
        if (isDeclaration(entry.node.parent)) {
            return entry.node;
        }
        return undefined;
    }

    function entryToFunctionCall(entry: FindAllReferences.NodeEntry): CallExpression | NewExpression | undefined {
        if (entry.node.parent) {
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

    function entryToAccessExpression(entry: FindAllReferences.NodeEntry): ElementAccessExpression | PropertyAccessExpression | undefined {
        if (entry.node.parent) {
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

    function entryToType(entry: FindAllReferences.NodeEntry): Node | undefined {
        const reference = entry.node;
        if (getMeaningFromLocation(reference) === SemanticMeaning.Type || isExpressionWithTypeArgumentsInClassExtendsClause(reference.parent)) {
            return reference;
        }
        return undefined;
    }

    function getFunctionDeclarationAtPosition(file: SourceFile, startPosition: number, checker: TypeChecker): ValidFunctionDeclaration | undefined {
        const node = getTouchingToken(file, startPosition);
        const functionDeclaration = getContainingFunction(node);
        if (functionDeclaration
            && isValidFunctionDeclaration(functionDeclaration, checker)
            && rangeContainsRange(functionDeclaration, node)
            && !(functionDeclaration.body && rangeContainsRange(functionDeclaration.body, node))) return functionDeclaration;

        return undefined;
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
    }

    function isValidParameterNodeArray(parameters: NodeArray<ParameterDeclaration>): parameters is ValidParameterNodeArray {
        return getRefactorableParametersLength(parameters) >= minimumParameterLength && every(parameters, isValidParameterDeclaration);
    }

    function isValidParameterDeclaration(paramDeclaration: ParameterDeclaration): paramDeclaration is ValidParameterDeclaration {
        return !paramDeclaration.modifiers && !paramDeclaration.decorators && isIdentifier(paramDeclaration.name);
    }

    function isValidVariableDeclaration(node: Node): node is ValidVariableDeclaration {
        return isVariableDeclaration(node) && isVarConst(node) && isIdentifier(node.name) && !node.type; // TODO: GH#30113
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
        const checker = program.getTypeChecker();

        let objectInitializer: Expression | undefined;
        // If every parameter in the original function was optional, add an empty object initializer to the new object parameter
        if (every(refactorableParameters, checker.isOptionalParameter)) {
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
            if (thisParameter.type) {
                suppressLeadingAndTrailingTrivia(newThisParameter.type!);
                copyComments(thisParameter.type, newThisParameter.type!);
            }

            return createNodeArray([newThisParameter, objectParameter]);
        }
        return createNodeArray([objectParameter]);

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
    }

    function hasLeadingLineBreak(node: Node, text: string) {
        const start = node.getFullStart();
        const end = node.getStart();
        for (let i = start; i < end; i++) {
            if (text.charCodeAt(i) === CharacterCodes.lineFeed) return true;
        }
        return false;
    }

    function getParameterName(paramDeclaration: ValidParameterDeclaration) {
        return getTextOfIdentifierOrLiteral(paramDeclaration.name);
    }

    function getClassNames(constructorDeclaration: ValidConstructor): Identifier[] {
        switch (constructorDeclaration.parent.kind) {
            case SyntaxKind.ClassDeclaration:
                const classDeclaration = constructorDeclaration.parent;
                return [classDeclaration.name];
            case SyntaxKind.ClassExpression:
                const classExpression = constructorDeclaration.parent;
                const variableDeclaration = constructorDeclaration.parent.parent;
                const className = classExpression.name;
                if (className) return [className, variableDeclaration.name];
                return [variableDeclaration.name];
        }
    }

    function getFunctionNames(functionDeclaration: ValidFunctionDeclaration): Node[] {
        switch (functionDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return [functionDeclaration.name];
            case SyntaxKind.Constructor:
                const ctrKeyword = findChildOfKind(functionDeclaration, SyntaxKind.ConstructorKeyword, functionDeclaration.getSourceFile())!;
                if (functionDeclaration.parent.kind === SyntaxKind.ClassExpression) {
                    const variableDeclaration = functionDeclaration.parent.parent;
                    return [variableDeclaration.name, ctrKeyword];
                }
                return [ctrKeyword];
            case SyntaxKind.ArrowFunction:
                return [functionDeclaration.parent.name];
            case SyntaxKind.FunctionExpression:
                if (functionDeclaration.name) return [functionDeclaration.name, functionDeclaration.parent.name];
                return [functionDeclaration.parent.name];
            default:
                return Debug.assertNever(functionDeclaration);
        }
    }

    type ValidParameterNodeArray = NodeArray<ValidParameterDeclaration>;

    interface ValidVariableDeclaration extends VariableDeclaration {
        name: Identifier;
        type: undefined;
    }

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
        valid: boolean;
    }
    interface ClassReferences {
        accessExpressions: Node[];
        typeUsages: Node[];
    }
}