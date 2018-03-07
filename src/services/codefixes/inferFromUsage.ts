/* @internal */
namespace ts.codefix {
    const fixId = "inferFromUsage";
    const errorCodes = [
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
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, program, span: { start }, errorCode, cancellationToken } = context;
            if (isSourceFileJavaScript(sourceFile)) {
                return undefined; // TODO: GH#20113
            }

            const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
            let declaration!: Declaration;
            const changes = textChanges.ChangeTracker.with(context, changes => { declaration = doChange(changes, sourceFile, token, errorCode, program, cancellationToken); });
            if (changes.length === 0) return undefined;
            const name = getNameOfDeclaration(declaration).getText();
            const description = formatStringFromArgs(getLocaleSpecificMessage(getDiagnostic(errorCode, token)), [name]);
            return [{ description, changes, fixId }];
        },
        fixIds: [fixId],
        getAllCodeActions(context) {
            const { sourceFile, program, cancellationToken } = context;
            const seenFunctions = createMap<true>();
            return codeFixAll(context, errorCodes, (changes, err) => {
                doChange(changes, sourceFile, getTokenAtPosition(err.file!, err.start!, /*includeJsDocComment*/ false), err.code, program, cancellationToken, seenFunctions);
            });
        },
    });

    function getDiagnostic(errorCode: number, token: Node): DiagnosticMessage {
        switch (errorCode) {
            case Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
                return isSetAccessor(getContainingFunction(token)) ? Diagnostics.Infer_type_of_0_from_usage : Diagnostics.Infer_parameter_types_from_usage;
            case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
                return Diagnostics.Infer_parameter_types_from_usage;
            default:
                return Diagnostics.Infer_type_of_0_from_usage;
        }
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Node, errorCode: number, program: Program, cancellationToken: CancellationToken, seenFunctions?: Map<true>): Declaration | undefined {
        if (!isAllowedTokenKind(token.kind)) {
            return undefined;
        }

        switch (errorCode) {
            // Variable and Property declarations
            case Diagnostics.Member_0_implicitly_has_an_1_type.code:
            case Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code:
                annotateVariableDeclaration(changes, sourceFile, <PropertyDeclaration | PropertySignature | VariableDeclaration>token.parent, program, cancellationToken);
                return token.parent as Declaration;

            case Diagnostics.Variable_0_implicitly_has_an_1_type.code: {
                const symbol = program.getTypeChecker().getSymbolAtLocation(token);
                if (symbol && symbol.valueDeclaration) {
                    annotateVariableDeclaration(changes, sourceFile, <VariableDeclaration>symbol.valueDeclaration, program, cancellationToken);
                    return symbol.valueDeclaration;
                }
            }
        }

        const containingFunction = getContainingFunction(token);
        if (containingFunction === undefined) {
            return undefined;
        }

        switch (errorCode) {
            // Parameter declarations
            case Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
                if (isSetAccessor(containingFunction)) {
                    annotateSetAccessor(changes, sourceFile, containingFunction, program, cancellationToken);
                    return containingFunction;
                }
                // falls through
            case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
                if (!seenFunctions || addToSeen(seenFunctions, getNodeId(containingFunction))) {
                    const param = cast(token.parent, isParameter);
                    annotateParameters(changes, param, containingFunction, sourceFile, program, cancellationToken);
                    return param;
                }
                return undefined;

            // Get Accessor declarations
            case Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code:
            case Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code:
                if (isGetAccessor(containingFunction) && isIdentifier(containingFunction.name)) {
                    annotate(changes, sourceFile, containingFunction, inferTypeForVariableFromUsage(containingFunction.name, program, cancellationToken), program);
                    return containingFunction;
                }
                return undefined;

            // Set Accessor declarations
            case Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code:
                if (isSetAccessor(containingFunction)) {
                    annotateSetAccessor(changes, sourceFile, containingFunction, program, cancellationToken);
                    return containingFunction;
                }
                return undefined;

            default:
                return Debug.fail(String(errorCode));
        }
    }

    function isAllowedTokenKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.DotDotDotToken:
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.ReadonlyKeyword:
                return true;
            default:
                return false;
        }
    }

    function annotateVariableDeclaration(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: VariableDeclaration | PropertyDeclaration | PropertySignature, program: Program, cancellationToken: CancellationToken): void {
        if (isIdentifier(declaration.name)) {
            annotate(changes, sourceFile, declaration, inferTypeForVariableFromUsage(declaration.name, program, cancellationToken), program);
        }
    }

    function isApplicableFunctionForInference(declaration: FunctionLike): declaration is MethodDeclaration | FunctionDeclaration | ConstructorDeclaration {
        switch (declaration.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Constructor:
                return true;
            case SyntaxKind.FunctionExpression:
                return !!declaration.name;
        }
        return false;
    }

    function annotateParameters(changes: textChanges.ChangeTracker, parameterDeclaration: ParameterDeclaration, containingFunction: FunctionLike, sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken): void {
        if (!isIdentifier(parameterDeclaration.name) || !isApplicableFunctionForInference(containingFunction)) {
            return;
        }

        const types = inferTypeForParametersFromUsage(containingFunction, sourceFile, program, cancellationToken) ||
            containingFunction.parameters.map(p => isIdentifier(p.name) ? inferTypeForVariableFromUsage(p.name, program, cancellationToken) : undefined);
        // We didn't actually find a set of type inference positions matching each parameter position
        if (!types || containingFunction.parameters.length !== types.length) {
            return;
        }

        zipWith(containingFunction.parameters, types, (parameter, type) => {
            if (!parameter.type && !parameter.initializer) {
                annotate(changes, sourceFile, parameter, type, program);
            }
        });
    }

    function annotateSetAccessor(changes: textChanges.ChangeTracker, sourceFile: SourceFile, setAccessorDeclaration: SetAccessorDeclaration, program: Program, cancellationToken: CancellationToken): void {
        const param = firstOrUndefined(setAccessorDeclaration.parameters);
        if (param && isIdentifier(setAccessorDeclaration.name) && isIdentifier(param.name)) {
            const type = inferTypeForVariableFromUsage(setAccessorDeclaration.name, program, cancellationToken) ||
                inferTypeForVariableFromUsage(param.name, program, cancellationToken);
            annotate(changes, sourceFile, param, type, program);
        }
    }

    function annotate(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: textChanges.TypeAnnotatable, type: Type | undefined, program: Program): void {
        const typeNode = type && getTypeNodeIfAccessible(type, declaration, program.getTypeChecker());
        if (typeNode) changes.insertTypeAnnotation(sourceFile, declaration, typeNode);
    }

    function getTypeNodeIfAccessible(type: Type, enclosingScope: Node, checker: TypeChecker): TypeNode | undefined {
        let typeIsAccessible = true;
        const notAccessible = () => { typeIsAccessible = false; };
        const res = checker.typeToTypeNode(type, enclosingScope, /*flags*/ undefined, {
            trackSymbol: (symbol, declaration, meaning) => {
                typeIsAccessible = typeIsAccessible && checker.isSymbolAccessible(symbol, declaration, meaning, /*shouldComputeAliasToMarkVisible*/ false).accessibility === SymbolAccessibility.Accessible;
            },
            reportInaccessibleThisError: notAccessible,
            reportPrivateInBaseOfClassExpression: notAccessible,
            reportInaccessibleUniqueSymbolError: notAccessible,
        });
        return typeIsAccessible ? res : undefined;
    }

    function getReferences(token: PropertyName | Token<SyntaxKind.ConstructorKeyword>, program: Program, cancellationToken: CancellationToken): ReadonlyArray<Identifier> {
        // Position shouldn't matter since token is not a SourceFile.
        return mapDefined(FindAllReferences.getReferenceEntriesForNode(-1, token, program, program.getSourceFiles(), cancellationToken), entry =>
            entry.type === "node" ? tryCast(entry.node, isIdentifier) : undefined);
    }

    function inferTypeForVariableFromUsage(token: Identifier, program: Program, cancellationToken: CancellationToken): Type | undefined {
        return InferFromReference.inferTypeFromReferences(getReferences(token, program, cancellationToken), program.getTypeChecker(), cancellationToken);
    }

    function inferTypeForParametersFromUsage(containingFunction: FunctionLikeDeclaration, sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken): (Type | undefined)[] | undefined {
        switch (containingFunction.kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                const isConstructor = containingFunction.kind === SyntaxKind.Constructor;
                const searchToken = isConstructor ?
                    findChildOfKind<Token<SyntaxKind.ConstructorKeyword>>(containingFunction, SyntaxKind.ConstructorKeyword, sourceFile) :
                    containingFunction.name;
                if (searchToken) {
                    return InferFromReference.inferTypeForParametersFromReferences(getReferences(searchToken, program, cancellationToken), containingFunction, program.getTypeChecker(), cancellationToken);
                }
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

        export function inferTypeFromReferences(references: ReadonlyArray<Identifier>, checker: TypeChecker, cancellationToken: CancellationToken): Type | undefined {
            const usageContext: UsageContext = {};
            for (const reference of references) {
                cancellationToken.throwIfCancellationRequested();
                inferTypeFromContext(reference, checker, usageContext);
            }
            return getTypeFromUsageContext(usageContext, checker);
        }

        export function inferTypeForParametersFromReferences(references: ReadonlyArray<Identifier>, declaration: FunctionLikeDeclaration, checker: TypeChecker, cancellationToken: CancellationToken): (Type | undefined)[] | undefined {
            if (references.length === 0) {
                return undefined;
            }

            if (!declaration.parameters) {
                return undefined;
            }

            const usageContext: UsageContext = {};
            for (const reference of references) {
                cancellationToken.throwIfCancellationRequested();
                inferTypeFromContext(reference, checker, usageContext);
            }
            const isConstructor = declaration.kind === SyntaxKind.Constructor;
            const callContexts = isConstructor ? usageContext.constructContexts : usageContext.callContexts;
            return callContexts && declaration.parameters.map((parameter, parameterIndex) => {
                const types: Type[] = [];
                const isRest = isRestParameter(parameter);
                for (const callContext of callContexts) {
                    if (callContext.argumentTypes.length <= parameterIndex) {
                        continue;
                    }

                    if (isRest) {
                        for (let i = parameterIndex; i < callContext.argumentTypes.length; i++) {
                            types.push(checker.getBaseTypeOfLiteralType(callContext.argumentTypes[i]));
                        }
                    }
                    else {
                        types.push(checker.getBaseTypeOfLiteralType(callContext.argumentTypes[parameterIndex]));
                    }
                }
                if (!types.length) {
                    return undefined;
                }
                const type = checker.getWidenedType(checker.getUnionType(types, UnionReduction.Subtype));
                return isRest ? checker.createArrayType(type) : type;
            });
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
            if (isExpressionNode(node)) {
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
            addCandidateType(usageContext, checker.getTypeAtLocation(parent.parent.parent.expression));
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
                return checker.getWidenedType(checker.getUnionType(map(usageContext.candidateTypes, t => checker.getBaseTypeOfLiteralType(t)), UnionReduction.Subtype));
            }
            else if (usageContext.properties && hasCallContext(usageContext.properties.get("then" as __String))) {
                const paramType = getParameterTypeFromCallContexts(0, usageContext.properties.get("then" as __String).callContexts, /*isRestParameter*/ false, checker);
                const types = paramType.getCallSignatures().map(c => c.getReturnType());
                return checker.createPromiseType(types.length ? checker.getUnionType(types, UnionReduction.Subtype) : checker.getAnyType());
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
                const type = checker.getWidenedType(checker.getUnionType(types, UnionReduction.Subtype));
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
