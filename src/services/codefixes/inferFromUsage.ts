/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            // Variable declarations
            Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code,

            // Variable uses
            Diagnostics.Variable_0_implicitly_has_an_1_type.code,

            // Parameter declarations
            Diagnostics.Parameter_0_implicitly_has_an_1_type.code,
            Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code,

            // Get Accessor declarations
            Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code,
            Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code,

            // Set Accessor declarations
            Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code,

            // Property declarations
            Diagnostics.Member_0_implicitly_has_an_1_type.code,
        ],
        getCodeActions: getActionsForAddExplicitTypeAnnotation
    });

    function getActionsForAddExplicitTypeAnnotation({ sourceFile, program, span: { start }, errorCode, cancellationToken }: CodeFixContext): CodeAction[] | undefined {
        const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
        let writer: StringSymbolWriter;

        if (isInJavaScriptFile(token)) {
            return undefined;
        }

        switch (token.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.DotDotDotToken:
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.ReadonlyKeyword:
                // Allowed
                break;
            default:
                return undefined;
        }

        const containingFunction = getContainingFunction(token);
        const checker = program.getTypeChecker();

        switch (errorCode) {
            // Variable and Property declarations
            case Diagnostics.Member_0_implicitly_has_an_1_type.code:
            case Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code:
                return getCodeActionForVariableDeclaration(<PropertyDeclaration | PropertySignature | VariableDeclaration>token.parent);
            case Diagnostics.Variable_0_implicitly_has_an_1_type.code:
                return getCodeActionForVariableUsage(<Identifier>token);

            // Parameter declarations
            case Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
                if (isSetAccessor(containingFunction)) {
                    return getCodeActionForSetAccessor(containingFunction);
                }
            // falls through
            case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
                return getCodeActionForParameters(<ParameterDeclaration>token.parent);

            // Get Accessor declarations
            case Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code:
            case Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code:
                return isGetAccessor(containingFunction) ? getCodeActionForGetAccessor(containingFunction) : undefined;

            // Set Accessor declarations
            case Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code:
                return isSetAccessor(containingFunction) ? getCodeActionForSetAccessor(containingFunction) : undefined;
        }

        return undefined;

        function getCodeActionForVariableDeclaration(declaration: VariableDeclaration | PropertyDeclaration | PropertySignature) {
            if (!isIdentifier(declaration.name)) {
                return undefined;
            }

            const type = inferTypeForVariableFromUsage(declaration.name);
            const typeString = type && typeToString(type, declaration);

            if (!typeString) {
                return undefined;
            }

            return createCodeActions(declaration.name.getText(), declaration.name.getEnd(), `: ${typeString}`);
        }

        function getCodeActionForVariableUsage(token: Identifier) {
            const symbol = checker.getSymbolAtLocation(token);
            return symbol && symbol.valueDeclaration && getCodeActionForVariableDeclaration(<VariableDeclaration>symbol.valueDeclaration);
        }

        function isApplicableFunctionForInference(declaration: FunctionLike): declaration is MethodDeclaration | FunctionDeclaration | ConstructorDeclaration {
            switch (declaration.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.Constructor:
                    return true;
                case SyntaxKind.FunctionExpression:
                    return !!(declaration as FunctionExpression).name;
            }
            return false;
        }

        function getCodeActionForParameters(parameterDeclaration: ParameterDeclaration): CodeAction[] {
            if (!isIdentifier(parameterDeclaration.name) || !isApplicableFunctionForInference(containingFunction)) {
                return undefined;
            }

            const types = inferTypeForParametersFromUsage(containingFunction) ||
                map(containingFunction.parameters, p => isIdentifier(p.name) && inferTypeForVariableFromUsage(p.name));

            if (!types) {
                return undefined;
            }

            const textChanges: TextChange[] = zipWith(containingFunction.parameters, types, (parameter, type) => {
                if (type && !parameter.type && !parameter.initializer) {
                    const typeString = typeToString(type, containingFunction);
                    return typeString ? {
                        span: { start: parameter.end, length: 0 },
                        newText: `: ${typeString}`
                    } : undefined;
                }
            }).filter(c => !!c);

            return textChanges.length ? [{
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Infer_parameter_types_from_usage), [parameterDeclaration.name.getText()]),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges
                }]
            }] : undefined;
        }

        function getCodeActionForSetAccessor(setAccessorDeclaration: SetAccessorDeclaration) {
            const setAccessorParameter = setAccessorDeclaration.parameters[0];
            if (!setAccessorParameter || !isIdentifier(setAccessorDeclaration.name) || !isIdentifier(setAccessorParameter.name)) {
                return undefined;
            }

            const type = inferTypeForVariableFromUsage(setAccessorDeclaration.name) ||
                inferTypeForVariableFromUsage(setAccessorParameter.name);
            const typeString = type && typeToString(type, containingFunction);
            if (!typeString) {
                return undefined;
            }

            return createCodeActions(setAccessorDeclaration.name.getText(), setAccessorParameter.name.getEnd(), `: ${typeString}`);
        }

        function getCodeActionForGetAccessor(getAccessorDeclaration: GetAccessorDeclaration) {
            if (!isIdentifier(getAccessorDeclaration.name)) {
                return undefined;
            }

            const type = inferTypeForVariableFromUsage(getAccessorDeclaration.name);
            const typeString = type && typeToString(type, containingFunction);
            if (!typeString) {
                return undefined;
            }

            const closeParenToken = getFirstChildOfKind(getAccessorDeclaration, sourceFile, SyntaxKind.CloseParenToken);
            return createCodeActions(getAccessorDeclaration.name.getText(), closeParenToken.getEnd(), `: ${typeString}`);
        }

        function createCodeActions(name: string, start: number, typeString: string) {
            return [{
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Infer_type_of_0_from_usage), [name]),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: [{
                        span: { start, length: 0 },
                        newText: typeString
                    }]
                }]
            }];
        }

        function getReferences(token: PropertyName | Token<SyntaxKind.ConstructorKeyword>) {
            const references = FindAllReferences.findReferencedSymbols(
                program,
                cancellationToken,
                program.getSourceFiles(),
                token.getSourceFile(),
                token.getStart());

            Debug.assert(!!references, "Found no references!");
            Debug.assert(references.length === 1, "Found more references than expected");

            return map(references[0].references, r => <Identifier>getTokenAtPosition(program.getSourceFile(r.fileName), r.textSpan.start, /*includeJsDocComment*/ false));
        }

        function inferTypeForVariableFromUsage(token: Identifier) {
            return InferFromReference.inferTypeFromReferences(getReferences(token), checker, cancellationToken);
        }

        function inferTypeForParametersFromUsage(containingFunction: FunctionLikeDeclaration) {
            switch (containingFunction.kind) {
                case SyntaxKind.Constructor:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                    const isConstructor = containingFunction.kind === SyntaxKind.Constructor;
                    const searchToken = isConstructor ?
                        <Token<SyntaxKind.ConstructorKeyword>>getFirstChildOfKind(containingFunction, sourceFile, SyntaxKind.ConstructorKeyword) :
                        containingFunction.name;
                    if (searchToken) {
                        return InferFromReference.inferTypeForParametersFromReferences(getReferences(searchToken), containingFunction, checker, cancellationToken);
                    }
            }
        }

        function getTypeAccessiblityWriter() {
            if (!writer) {
                let str = "";
                let typeIsAccessible = true;

                const writeText: (text: string) => void = text => str += text;
                writer = {
                    string: () => typeIsAccessible ? str : undefined,
                    writeKeyword: writeText,
                    writeOperator: writeText,
                    writePunctuation: writeText,
                    writeSpace: writeText,
                    writeStringLiteral: writeText,
                    writeParameter: writeText,
                    writeProperty: writeText,
                    writeSymbol: writeText,
                    writeLine: () => str += " ",
                    increaseIndent: noop,
                    decreaseIndent: noop,
                    clear: () => { str = ""; typeIsAccessible = true; },
                    trackSymbol: (symbol, declaration, meaning) => {
                        if (checker.isSymbolAccessible(symbol, declaration, meaning, /*shouldComputeAliasToMarkVisible*/ false).accessibility !== SymbolAccessibility.Accessible) {
                            typeIsAccessible = false;
                        }
                    },
                    reportInaccessibleThisError: () => { typeIsAccessible = false; },
                    reportPrivateInBaseOfClassExpression: () => { typeIsAccessible = false; },
                };
            }
            writer.clear();
            return writer;
        }

        function typeToString(type: Type, enclosingDeclaration: Declaration) {
            const writer = getTypeAccessiblityWriter();
            checker.getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration);
            return writer.string();
        }

        function getFirstChildOfKind(node: Node, sourcefile: SourceFile, kind: SyntaxKind) {
            for (const child of node.getChildren(sourcefile)) {
                if (child.kind === kind) return child;
            }
            return undefined;
        }
    }

    namespace InferFromReference {
        interface CallContext {
            argumentTypes: Type[];
            returnType: UsageContext;
        }

        interface UsageContext {
            isNumber?: boolean;
            isString?: boolean;
            isNumberOrString?: boolean;
            candidateTypes?: Type[];
            properties?: UnderscoreEscapedMap<UsageContext>;
            callContexts?: CallContext[];
            constructContexts?: CallContext[];
            numberIndexContext?: UsageContext;
            stringIndexContext?: UsageContext;
        }

        export function inferTypeFromReferences(references: Identifier[], checker: TypeChecker, cancellationToken: CancellationToken): Type | undefined {
            const usageContext: UsageContext = {};
            for (const reference of references) {
                cancellationToken.throwIfCancellationRequested();
                inferTypeFromContext(reference, checker, usageContext);
            }
            return getTypeFromUsageContext(usageContext, checker);
        }

        export function inferTypeForParametersFromReferences(references: Identifier[], declaration: FunctionLikeDeclaration, checker: TypeChecker, cancellationToken: CancellationToken): (Type | undefined)[] | undefined {
            if (declaration.parameters) {
                const usageContext: UsageContext = {};
                for (const reference of references) {
                    cancellationToken.throwIfCancellationRequested();
                    inferTypeFromContext(reference, checker, usageContext);
                }
                const isConstructor = declaration.kind === SyntaxKind.Constructor;
                const callContexts = isConstructor ? usageContext.constructContexts : usageContext.callContexts;
                if (callContexts) {
                    const paramTypes: Type[] = [];
                    for (let parameterIndex = 0; parameterIndex < declaration.parameters.length; parameterIndex++) {
                        let types: Type[] = [];
                        const isRestParameter = ts.isRestParameter(declaration.parameters[parameterIndex]);
                        for (const callContext of callContexts) {
                            if (callContext.argumentTypes.length > parameterIndex) {
                                if (isRestParameter) {
                                    types = concatenate(types, map(callContext.argumentTypes.slice(parameterIndex), a => checker.getBaseTypeOfLiteralType(a)));
                                }
                                else {
                                    types.push(checker.getBaseTypeOfLiteralType(callContext.argumentTypes[parameterIndex]));
                                }
                            }
                        }
                        if (types.length) {
                            const type = checker.getWidenedType(checker.getUnionType(types, /*subtypeReduction*/ true));
                            paramTypes[parameterIndex] = isRestParameter ? checker.createArrayType(type) : type;
                        }
                    }
                    return paramTypes;
                }
            }
            return undefined;
        }

        function inferTypeFromContext(node: Expression, checker: TypeChecker, usageContext: UsageContext): void {
            while (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
                node = <Expression>node.parent;
            }

            switch (node.parent.kind) {
                case SyntaxKind.PostfixUnaryExpression:
                    usageContext.isNumber = true;
                    break;
                case SyntaxKind.PrefixUnaryExpression:
                    inferTypeFromPrefixUnaryExpressionContext(<PrefixUnaryExpression>node.parent, usageContext);
                    break;
                case SyntaxKind.BinaryExpression:
                    inferTypeFromBinaryExpressionContext(node, <BinaryExpression>node.parent, checker, usageContext);
                    break;
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    inferTypeFromSwitchStatementLabelContext(<CaseOrDefaultClause>node.parent, checker, usageContext);
                    break;
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    if ((<CallExpression | NewExpression>node.parent).expression === node) {
                        inferTypeFromCallExpressionContext(<CallExpression | NewExpression>node.parent, checker, usageContext);
                    }
                    else {
                        inferTypeFromContextualType(node, checker, usageContext);
                    }
                    break;
                case SyntaxKind.PropertyAccessExpression:
                    inferTypeFromPropertyAccessExpressionContext(<PropertyAccessExpression>node.parent, checker, usageContext);
                    break;
                case SyntaxKind.ElementAccessExpression:
                    inferTypeFromPropertyElementExpressionContext(<ElementAccessExpression>node.parent, node, checker, usageContext);
                    break;
                default:
                    return inferTypeFromContextualType(node, checker, usageContext);
            }
        }

        function inferTypeFromContextualType(node: Expression, checker: TypeChecker, usageContext: UsageContext): void {
            if (isPartOfExpression(node)) {
                addCandidateType(usageContext, checker.getContextualType(node));
            }
        }

        function inferTypeFromPrefixUnaryExpressionContext(node: PrefixUnaryExpression, usageContext: UsageContext): void {
            switch (node.operator) {
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                    usageContext.isNumber = true;
                    break;

                case SyntaxKind.PlusToken:
                    usageContext.isNumberOrString = true;
                    break;

                // case SyntaxKind.ExclamationToken:
                // no inferences here;
            }
        }

        function inferTypeFromBinaryExpressionContext(node: Expression, parent: BinaryExpression, checker: TypeChecker, usageContext: UsageContext): void {
            switch (parent.operatorToken.kind) {
                // ExponentiationOperator
                case SyntaxKind.AsteriskAsteriskToken:

                // MultiplicativeOperator
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.PercentToken:

                // ShiftOperator
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:

                // BitwiseOperator
                case SyntaxKind.AmpersandToken:
                case SyntaxKind.BarToken:
                case SyntaxKind.CaretToken:

                // CompoundAssignmentOperator
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskAsteriskEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:

                // AdditiveOperator
                case SyntaxKind.MinusToken:

                // RelationalOperator
                case SyntaxKind.LessThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.GreaterThanEqualsToken:
                    const operandType = checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left);
                    if (operandType.flags & TypeFlags.EnumLike) {
                        addCandidateType(usageContext, operandType);
                    }
                    else {
                        usageContext.isNumber = true;
                    }
                    break;

                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.PlusToken:
                    const otherOperandType = checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left);
                    if (otherOperandType.flags & TypeFlags.EnumLike) {
                        addCandidateType(usageContext, otherOperandType);
                    }
                    else if (otherOperandType.flags & TypeFlags.NumberLike) {
                        usageContext.isNumber = true;
                    }
                    else if (otherOperandType.flags & TypeFlags.StringLike) {
                        usageContext.isString = true;
                    }
                    else {
                        usageContext.isNumberOrString = true;
                    }
                    break;

                //  AssignmentOperators
                case SyntaxKind.EqualsToken:
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                    addCandidateType(usageContext, checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left));
                    break;

                case SyntaxKind.InKeyword:
                    if (node === parent.left) {
                        usageContext.isString = true;
                    }
                    break;

                // LogicalOperator
                case SyntaxKind.BarBarToken:
                    if (node === parent.left &&
                        (node.parent.parent.kind === SyntaxKind.VariableDeclaration || isAssignmentExpression(node.parent.parent, /*excludeCompoundAssignment*/ true))) {
                        // var x = x || {};
                        // TODO: use getFalsyflagsOfType
                        addCandidateType(usageContext, checker.getTypeAtLocation(parent.right));
                    }
                    break;

                case SyntaxKind.AmpersandAmpersandToken:
                case SyntaxKind.CommaToken:
                case SyntaxKind.InstanceOfKeyword:
                    // nothing to infer here
                    break;
            }
        }

        function inferTypeFromSwitchStatementLabelContext(parent: CaseOrDefaultClause, checker: TypeChecker, usageContext: UsageContext): void {
            addCandidateType(usageContext, checker.getTypeAtLocation((<SwitchStatement>parent.parent.parent).expression));
        }

        function inferTypeFromCallExpressionContext(parent: CallExpression | NewExpression, checker: TypeChecker, usageContext: UsageContext): void {
            const callContext: CallContext = {
                argumentTypes: [],
                returnType: {}
            };

            if (parent.arguments) {
                for (const argument of parent.arguments) {
                    callContext.argumentTypes.push(checker.getTypeAtLocation(argument));
                }
            }

            inferTypeFromContext(parent, checker, callContext.returnType);
            if (parent.kind === SyntaxKind.CallExpression) {
                (usageContext.callContexts || (usageContext.callContexts = [])).push(callContext);
            }
            else {
                (usageContext.constructContexts || (usageContext.constructContexts = [])).push(callContext);
            }
        }

        function inferTypeFromPropertyAccessExpressionContext(parent: PropertyAccessExpression, checker: TypeChecker, usageContext: UsageContext): void {
            const name = escapeLeadingUnderscores(parent.name.text);
            if (!usageContext.properties) {
                usageContext.properties = createUnderscoreEscapedMap<UsageContext>();
            }
            const propertyUsageContext = usageContext.properties.get(name) || { };
            inferTypeFromContext(parent, checker, propertyUsageContext);
            usageContext.properties.set(name, propertyUsageContext);
        }

        function inferTypeFromPropertyElementExpressionContext(parent: ElementAccessExpression, node: Expression, checker: TypeChecker, usageContext: UsageContext): void {
            if (node === parent.argumentExpression) {
                usageContext.isNumberOrString = true;
                return;
            }
            else {
                const indexType = checker.getTypeAtLocation(parent);
                const indexUsageContext = {};
                inferTypeFromContext(parent, checker, indexUsageContext);
                if (indexType.flags & TypeFlags.NumberLike) {
                    usageContext.numberIndexContext = indexUsageContext;
                }
                else {
                    usageContext.stringIndexContext = indexUsageContext;
                }
            }
        }

        function getTypeFromUsageContext(usageContext: UsageContext, checker: TypeChecker): Type | undefined {
            if (usageContext.isNumberOrString && !usageContext.isNumber && !usageContext.isString) {
                return checker.getUnionType([checker.getNumberType(), checker.getStringType()]);
            }
            else if (usageContext.isNumber) {
                return checker.getNumberType();
            }
            else if (usageContext.isString) {
                return checker.getStringType();
            }
            else if (usageContext.candidateTypes) {
                return checker.getWidenedType(checker.getUnionType(map(usageContext.candidateTypes, t => checker.getBaseTypeOfLiteralType(t)), /*subtypeReduction*/ true));
            }
            else if (usageContext.properties && hasCallContext(usageContext.properties.get("then" as __String))) {
                const paramType = getParameterTypeFromCallContexts(0, usageContext.properties.get("then" as __String).callContexts, /*isRestParameter*/ false, checker);
                const types = paramType.getCallSignatures().map(c => c.getReturnType());
                return checker.createPromiseType(types.length ? checker.getUnionType(types, /*subtypeReduction*/ true) : checker.getAnyType());
            }
            else if (usageContext.properties && hasCallContext(usageContext.properties.get("push" as __String))) {
                return checker.createArrayType(getParameterTypeFromCallContexts(0, usageContext.properties.get("push" as __String).callContexts, /*isRestParameter*/ false, checker));
            }
            else if (usageContext.properties || usageContext.callContexts || usageContext.constructContexts || usageContext.numberIndexContext || usageContext.stringIndexContext) {
                const members = createUnderscoreEscapedMap<Symbol>();
                const callSignatures: Signature[] = [];
                const constructSignatures: Signature[] = [];
                let stringIndexInfo: IndexInfo;
                let numberIndexInfo: IndexInfo;

                if (usageContext.properties) {
                    usageContext.properties.forEach((context, name) => {
                        const symbol = checker.createSymbol(SymbolFlags.Property, name);
                        symbol.type = getTypeFromUsageContext(context, checker) || checker.getAnyType();
                        members.set(name, symbol);
                    });
                }

                if (usageContext.callContexts) {
                    for (const callContext of usageContext.callContexts) {
                        callSignatures.push(getSignatureFromCallContext(callContext, checker));
                    }
                }

                if (usageContext.constructContexts) {
                    for (const constructContext of usageContext.constructContexts) {
                        constructSignatures.push(getSignatureFromCallContext(constructContext, checker));
                    }
                }

                if (usageContext.numberIndexContext) {
                    numberIndexInfo = checker.createIndexInfo(getTypeFromUsageContext(usageContext.numberIndexContext, checker), /*isReadonly*/ false);
                }

                if (usageContext.stringIndexContext) {
                    stringIndexInfo = checker.createIndexInfo(getTypeFromUsageContext(usageContext.stringIndexContext, checker), /*isReadonly*/ false);
                }

                return checker.createAnonymousType(/*symbol*/ undefined, members, callSignatures, constructSignatures, stringIndexInfo, numberIndexInfo);
            }
            else {
                return undefined;
            }
        }

        function getParameterTypeFromCallContexts(parameterIndex: number, callContexts: CallContext[], isRestParameter: boolean, checker: TypeChecker) {
            let types: Type[] = [];
            if (callContexts) {
                for (const callContext of callContexts) {
                    if (callContext.argumentTypes.length > parameterIndex) {
                        if (isRestParameter) {
                            types = concatenate(types, map(callContext.argumentTypes.slice(parameterIndex), a => checker.getBaseTypeOfLiteralType(a)));
                        }
                        else {
                            types.push(checker.getBaseTypeOfLiteralType(callContext.argumentTypes[parameterIndex]));
                        }
                    }
                }
            }

            if (types.length) {
                const type = checker.getWidenedType(checker.getUnionType(types, /*subtypeReduction*/ true));
                return isRestParameter ? checker.createArrayType(type) : type;
            }
            return undefined;
        }

        function getSignatureFromCallContext(callContext: CallContext, checker: TypeChecker): Signature {
            const parameters: Symbol[] = [];
            for (let i = 0; i < callContext.argumentTypes.length; i++) {
                const symbol = checker.createSymbol(SymbolFlags.FunctionScopedVariable, escapeLeadingUnderscores(`arg${i}`));
                symbol.type = checker.getWidenedType(checker.getBaseTypeOfLiteralType(callContext.argumentTypes[i]));
                parameters.push(symbol);
            }
            const returnType = getTypeFromUsageContext(callContext.returnType, checker) || checker.getVoidType();
            return checker.createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, parameters, returnType, /*typePredicate*/ undefined, callContext.argumentTypes.length, /*hasRestParameter*/ false, /*hasLiteralTypes*/ false);
        }

        function addCandidateType(context: UsageContext, type: Type) {
            if (type && !(type.flags & TypeFlags.Any) && !(type.flags & TypeFlags.Never)) {
                (context.candidateTypes || (context.candidateTypes = [])).push(type);
            }
        }

        function hasCallContext(usageContext: UsageContext) {
            return usageContext && usageContext.callContexts;
        }
    }
}
