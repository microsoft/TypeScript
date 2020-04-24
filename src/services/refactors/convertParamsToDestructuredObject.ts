/* @internal */
namespace ts.refactor.convertParamsToDestructuredObject {
    const refactorName = "Convert parameters to destructured object";
    const minimumParameterLength = 2;
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });


    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition } = context;
        const isJSFile = isSourceFileJS(file);
        if (isJSFile) return emptyArray; // TODO: GH#30113
        const functionDeclaration = getFunctionDeclarationAtPosition(file, startPosition, context.program.getTypeChecker());
        if (!functionDeclaration) return emptyArray;

        const description = getLocaleSpecificMessage(Diagnostics.Convert_parameters_to_destructured_object);
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
        Debug.assert(actionName === refactorName, "Unexpected action name");
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

        if (!every(groupedReferences.declarations, /*callback*/ decl => contains(names, decl))) {
            groupedReferences.valid = false;
        }

        return groupedReferences;

        function groupReferences(referenceEntries: readonly FindAllReferences.Entry[]): GroupedReferences {
            const classReferences: ClassReferences = { accessExpressions: [], typeUsages: [] };
            const groupedReferences: GroupedReferences = { functionCalls: [], declarations: [], classReferences, valid: true };
            const functionSymbols = map(functionNames, getSymbolTargetAtLocation);
            const classSymbols = map(classNames, getSymbolTargetAtLocation);
            const isConstructor = isConstructorDeclaration(functionDeclaration);

            for (const entry of referenceEntries) {
                if (entry.kind !== FindAllReferences.EntryKind.Node) {
                    groupedReferences.valid = false;
                    continue;
                }

                /* We compare symbols because in some cases find all references wil return a reference that may or may not be to the refactored function.
                Example from the refactorConvertParamsToDestructuredObject_methodCallUnion.ts test:
                    class A { foo(a: number, b: number) { return a + b; } }
                    class B { foo(c: number, d: number) { return c + d; } }
                    declare const ab: A | B;
                    ab.foo(1, 2);
                Find all references will return `ab.foo(1, 2)` as a reference to A's `foo` but we could be calling B's `foo`.
                When looking for constructor calls, however, the symbol on the constructor call reference is going to be the corresponding class symbol.
                So we need to add a special case for this because when calling a constructor of a class through one of its subclasses,
                the symbols are going to be different.
                */
                if (contains(functionSymbols, getSymbolTargetAtLocation(entry.node)) || isNewExpressionTarget(entry.node)) {
                    const importOrExportReference = entryToImportOrExport(entry);
                    if (importOrExportReference) {
                        continue;
                    }
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
                if (isConstructor && contains(classSymbols, getSymbolTargetAtLocation(entry.node))) {
                    const importOrExportReference = entryToImportOrExport(entry);
                    if (importOrExportReference) {
                        continue;
                    }

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

        function getSymbolTargetAtLocation(node: Node) {
            const symbol = checker.getSymbolAtLocation(node);
            return symbol && getSymbolTarget(symbol, checker);
        }
    }

    function entryToImportOrExport(entry: FindAllReferences.NodeEntry): Node | undefined {
        const node = entry.node;

        if (isImportSpecifier(node.parent)
            || isImportClause(node.parent)
            || isImportEqualsDeclaration(node.parent)
            || isNamespaceImport(node.parent)) {
            return node;
        }

        if (isExportSpecifier(node.parent) || isExportAssignment(node.parent)) {
            return node;
        }
        return undefined;
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
                // foo(...) or super(...) or new Foo(...)
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    const callOrNewExpression = tryCast(parent, isCallOrNewExpression);
                    if (callOrNewExpression && callOrNewExpression.expression === functionReference) {
                        return callOrNewExpression;
                    }
                    break;
                // x.foo(...)
                case SyntaxKind.PropertyAccessExpression:
                    const propertyAccessExpression = tryCast(parent, isPropertyAccessExpression);
                    if (propertyAccessExpression && propertyAccessExpression.parent && propertyAccessExpression.name === functionReference) {
                        const callOrNewExpression = tryCast(propertyAccessExpression.parent, isCallOrNewExpression);
                        if (callOrNewExpression && callOrNewExpression.expression === propertyAccessExpression) {
                            return callOrNewExpression;
                        }
                    }
                    break;
                // x["foo"](...)
                case SyntaxKind.ElementAccessExpression:
                    const elementAccessExpression = tryCast(parent, isElementAccessExpression);
                    if (elementAccessExpression && elementAccessExpression.parent && elementAccessExpression.argumentExpression === functionReference) {
                        const callOrNewExpression = tryCast(elementAccessExpression.parent, isCallOrNewExpression);
                        if (callOrNewExpression && callOrNewExpression.expression === elementAccessExpression) {
                            return callOrNewExpression;
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
        const functionDeclaration = getContainingFunctionDeclaration(node);

        // don't offer refactor on top-level JSDoc
        if (isTopLevelJSDoc(node)) return undefined;

        if (functionDeclaration
            && isValidFunctionDeclaration(functionDeclaration, checker)
            && rangeContainsRange(functionDeclaration, node)
            && !(functionDeclaration.body && rangeContainsRange(functionDeclaration.body, node))) return functionDeclaration;

        return undefined;
    }

    function isTopLevelJSDoc(node: Node): boolean {
        const containingJSDoc = findAncestor(node, isJSDocNode);
        if (containingJSDoc) {
            const containingNonJSDoc = findAncestor(containingJSDoc, n => !isJSDocNode(n));
            return !!containingNonJSDoc && isFunctionLikeDeclaration(containingNonJSDoc);
        }
        return false;
    }

    function isValidFunctionDeclaration(
        functionDeclaration: FunctionLikeDeclaration,
        checker: TypeChecker): functionDeclaration is ValidFunctionDeclaration {
        if (!isValidParameterNodeArray(functionDeclaration.parameters, checker)) return false;
        switch (functionDeclaration.kind) {
            case SyntaxKind.FunctionDeclaration:
                return hasNameOrDefault(functionDeclaration) && isSingleImplementation(functionDeclaration, checker);
            case SyntaxKind.MethodDeclaration:
                return isSingleImplementation(functionDeclaration, checker);
            case SyntaxKind.Constructor:
                if (isClassDeclaration(functionDeclaration.parent)) {
                    return hasNameOrDefault(functionDeclaration.parent) && isSingleImplementation(functionDeclaration, checker);
                }
                else {
                    return isValidVariableDeclaration(functionDeclaration.parent.parent)
                        && isSingleImplementation(functionDeclaration, checker);
                }
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return isValidVariableDeclaration(functionDeclaration.parent);
        }
        return false;
    }

    function isSingleImplementation(functionDeclaration: FunctionLikeDeclaration, checker: TypeChecker): boolean {
        return !!functionDeclaration.body && !checker.isImplementationOfOverload(functionDeclaration);
    }

    function hasNameOrDefault(functionOrClassDeclaration: FunctionDeclaration | ClassDeclaration): boolean {
        if (!functionOrClassDeclaration.name) {
            const defaultKeyword = findModifier(functionOrClassDeclaration, SyntaxKind.DefaultKeyword);
            return !!defaultKeyword;
        }
        return true;
    }

    function isValidParameterNodeArray(
        parameters: NodeArray<ParameterDeclaration>,
        checker: TypeChecker): parameters is ValidParameterNodeArray {
        return getRefactorableParametersLength(parameters) >= minimumParameterLength
            && every(parameters, /*callback*/ paramDecl => isValidParameterDeclaration(paramDecl, checker));
    }

    function isValidParameterDeclaration(
        parameterDeclaration: ParameterDeclaration,
        checker: TypeChecker): parameterDeclaration is ValidParameterDeclaration {
        if (isRestParameter(parameterDeclaration)) {
            const type = checker.getTypeAtLocation(parameterDeclaration);
            if (!checker.isArrayType(type) && !checker.isTupleType(type)) return false;
        }
        return !parameterDeclaration.modifiers && !parameterDeclaration.decorators && isIdentifier(parameterDeclaration.name);
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

    function createPropertyOrShorthandAssignment(name: string, initializer: Expression): PropertyAssignment | ShorthandPropertyAssignment {
        if (isIdentifier(initializer) && getTextOfIdentifierOrLiteral(initializer) === name) {
            return createShorthandPropertyAssignment(name);
        }
        return createPropertyAssignment(name, initializer);
    }

    function createNewArgument(functionDeclaration: ValidFunctionDeclaration, functionArguments: NodeArray<Expression>): ObjectLiteralExpression {
        const parameters = getRefactorableParameters(functionDeclaration.parameters);
        const hasRestParameter = isRestParameter(last(parameters));
        const nonRestArguments = hasRestParameter ? functionArguments.slice(0, parameters.length - 1) : functionArguments;
        const properties = map(nonRestArguments, (arg, i) => {
            const parameterName = getParameterName(parameters[i]);
            const property = createPropertyOrShorthandAssignment(parameterName, arg);

            suppressLeadingAndTrailingTrivia(property.name);
            if (isPropertyAssignment(property)) suppressLeadingAndTrailingTrivia(property.initializer);
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
        const checker = program.getTypeChecker();
        const refactorableParameters = getRefactorableParameters(functionDeclaration.parameters);
        const bindingElements = map(refactorableParameters, createBindingElementFromParameterDeclaration);
        const objectParameterName = createObjectBindingPattern(bindingElements);
        const objectParameterType = createParameterTypeNode(refactorableParameters);

        let objectInitializer: Expression | undefined;
        // If every parameter in the original function was optional, add an empty object initializer to the new object parameter
        if (every(refactorableParameters, isOptionalParameter)) {
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

        function createBindingElementFromParameterDeclaration(parameterDeclaration: ValidParameterDeclaration): BindingElement {
            const element = createBindingElement(
                /*dotDotDotToken*/ undefined,
                /*propertyName*/ undefined,
                getParameterName(parameterDeclaration),
                isRestParameter(parameterDeclaration) && isOptionalParameter(parameterDeclaration) ? createArrayLiteral() : parameterDeclaration.initializer);

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
                isOptionalParameter(parameterDeclaration) ? createToken(SyntaxKind.QuestionToken) : parameterDeclaration.questionToken,
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
            const type = checker.getTypeAtLocation(node);
            return getTypeNodeIfAccessible(type, node, program, host);
        }

        function isOptionalParameter(parameterDeclaration: ValidParameterDeclaration): boolean {
            if (isRestParameter(parameterDeclaration)) {
                const type = checker.getTypeAtLocation(parameterDeclaration);
                return !checker.isTupleType(type);
            }
            return checker.isOptionalParameter(parameterDeclaration);
        }
    }

    function getParameterName(paramDeclaration: ValidParameterDeclaration) {
        return getTextOfIdentifierOrLiteral(paramDeclaration.name);
    }

    function getClassNames(constructorDeclaration: ValidConstructor): (Identifier | Modifier)[] {
        switch (constructorDeclaration.parent.kind) {
            case SyntaxKind.ClassDeclaration:
                const classDeclaration = constructorDeclaration.parent;
                if (classDeclaration.name) return [classDeclaration.name];
                // If the class declaration doesn't have a name, it should have a default modifier.
                // We validated this in `isValidFunctionDeclaration` through `hasNameOrDefault`
                const defaultModifier = Debug.checkDefined(
                    findModifier(classDeclaration, SyntaxKind.DefaultKeyword),
                    "Nameless class declaration should be a default export");
                return [defaultModifier];
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
                if (functionDeclaration.name) return [functionDeclaration.name];
                // If the function declaration doesn't have a name, it should have a default modifier.
                // We validated this in `isValidFunctionDeclaration` through `hasNameOrDefault`
                const defaultModifier = Debug.checkDefined(
                    findModifier(functionDeclaration, SyntaxKind.DefaultKeyword),
                    "Nameless function declaration should be a default export");
                return [defaultModifier];
            case SyntaxKind.MethodDeclaration:
                return [functionDeclaration.name];
            case SyntaxKind.Constructor:
                const ctrKeyword = Debug.checkDefined(
                    findChildOfKind(functionDeclaration, SyntaxKind.ConstructorKeyword, functionDeclaration.getSourceFile()),
                    "Constructor declaration should have constructor keyword");
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
                return Debug.assertNever(functionDeclaration, `Unexpected function declaration kind ${(functionDeclaration as ValidFunctionDeclaration).kind}`);
        }
    }

    type ValidParameterNodeArray = NodeArray<ValidParameterDeclaration>;

    interface ValidVariableDeclaration extends VariableDeclaration {
        name: Identifier;
        type: undefined;
    }

    interface ValidConstructor extends ConstructorDeclaration {
        parent: ClassDeclaration | (ClassExpression & { parent: ValidVariableDeclaration });
        parameters: NodeArray<ValidParameterDeclaration>;
        body: FunctionBody;
    }

    interface ValidFunction extends FunctionDeclaration {
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
