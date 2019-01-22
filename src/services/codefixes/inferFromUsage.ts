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

        //// Suggestions
        // Variable declarations
        Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_but_a_better_type_may_be_inferred_from_usage.code,

        // Variable uses
        Diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code,

        // Parameter declarations
        Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code,
        Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage.code,

        // Get Accessor declarations
        Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_get_accessor_may_be_inferred_from_usage.code,
        Diagnostics._0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage.code,

        // Set Accessor declarations
        Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_set_accessor_may_be_inferred_from_usage.code,

        // Property declarations
        Diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, program, span: { start }, errorCode, cancellationToken, host } = context;

            const token = getTokenAtPosition(sourceFile, start);
            let declaration!: Declaration | undefined;
            const changes = textChanges.ChangeTracker.with(context, changes => { declaration = doChange(changes, sourceFile, token, errorCode, program, cancellationToken, /*markSeen*/ returnTrue, host); });
            const name = declaration && getNameOfDeclaration(declaration);
            return !name || changes.length === 0 ? undefined
                : [createCodeFixAction(fixId, changes, [getDiagnostic(errorCode, token), name.getText(sourceFile)], fixId, Diagnostics.Infer_all_types_from_usage)];
        },
        fixIds: [fixId],
        getAllCodeActions(context) {
            const { sourceFile, program, cancellationToken, host } = context;
            const markSeen = nodeSeenTracker();
            return codeFixAll(context, errorCodes, (changes, err) => {
                doChange(changes, sourceFile, getTokenAtPosition(err.file, err.start), err.code, program, cancellationToken, markSeen, host);
            });
        },
    });

    function getDiagnostic(errorCode: number, token: Node): DiagnosticMessage {
        switch (errorCode) {
            case Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
            case Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
                return isSetAccessorDeclaration(getContainingFunction(token)!) ? Diagnostics.Infer_type_of_0_from_usage : Diagnostics.Infer_parameter_types_from_usage; // TODO: GH#18217
            case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
            case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage.code:
                return Diagnostics.Infer_parameter_types_from_usage;
            default:
                return Diagnostics.Infer_type_of_0_from_usage;
        }
    }

    /** Map suggestion code to error code */
    function mapSuggestionDiagnostic(errorCode: number) {
        switch (errorCode) {
            case Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_but_a_better_type_may_be_inferred_from_usage.code:
                return Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code;
            case Diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
                return Diagnostics.Variable_0_implicitly_has_an_1_type.code;
            case Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
                return Diagnostics.Parameter_0_implicitly_has_an_1_type.code;
            case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage.code:
                return Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code;
            case Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_get_accessor_may_be_inferred_from_usage.code:
                return Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code;
            case Diagnostics._0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage.code:
                return Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code;
            case Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_set_accessor_may_be_inferred_from_usage.code:
                return Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code;
            case Diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
                return Diagnostics.Member_0_implicitly_has_an_1_type.code;
        }
        return errorCode;
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Node, errorCode: number, program: Program, cancellationToken: CancellationToken, markSeen: NodeSeenTracker, host: LanguageServiceHost): Declaration | undefined {
        if (!isParameterPropertyModifier(token.kind) && token.kind !== SyntaxKind.Identifier && token.kind !== SyntaxKind.DotDotDotToken && token.kind !== SyntaxKind.ThisKeyword) {
            return undefined;
        }

        const { parent } = token;
        errorCode = mapSuggestionDiagnostic(errorCode);
        switch (errorCode) {
            // Variable and Property declarations
            case Diagnostics.Member_0_implicitly_has_an_1_type.code:
            case Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code:
                if ((isVariableDeclaration(parent) && markSeen(parent)) || isPropertyDeclaration(parent) || isPropertySignature(parent)) { // handle bad location
                    annotateVariableDeclaration(changes, sourceFile, parent, program, host, cancellationToken);
                    return parent;
                }
                if (isPropertyAccessExpression(parent)) {
                    const type = inferTypeForVariableFromUsage(parent.name, program, cancellationToken);
                    const typeNode = getTypeNodeIfAccessible(type, parent, program, host);
                    if (typeNode) {
                        // Note that the codefix will never fire with an existing `@type` tag, so there is no need to merge tags
                        const typeTag = createJSDocTypeTag(createJSDocTypeExpression(typeNode), /*comment*/ "");
                        addJSDocTags(changes, sourceFile, cast(parent.parent.parent, isExpressionStatement), [typeTag]);
                    }
                    return parent;
                }
                return undefined;

            case Diagnostics.Variable_0_implicitly_has_an_1_type.code: {
                const symbol = program.getTypeChecker().getSymbolAtLocation(token);
                if (symbol && symbol.valueDeclaration && isVariableDeclaration(symbol.valueDeclaration) && markSeen(symbol.valueDeclaration)) {
                    annotateVariableDeclaration(changes, sourceFile, symbol.valueDeclaration, program, host, cancellationToken);
                    return symbol.valueDeclaration;
                }
                return undefined;
            }
        }

        const containingFunction = getContainingFunction(token);
        if (containingFunction === undefined) {
            return undefined;
        }

        switch (errorCode) {
            // Parameter declarations
            case Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
                if (isSetAccessorDeclaration(containingFunction)) {
                    annotateSetAccessor(changes, sourceFile, containingFunction, program, host, cancellationToken);
                    return containingFunction;
                }
                // falls through
            case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
                if (markSeen(containingFunction)) {
                    const param = cast(parent, isParameter);
                    annotateParameters(changes, sourceFile, param, containingFunction, program, host, cancellationToken);
                    return param;
                }
                return undefined;

            // Get Accessor declarations
            case Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code:
            case Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code:
                if (isGetAccessorDeclaration(containingFunction) && isIdentifier(containingFunction.name)) {
                    annotate(changes, sourceFile, containingFunction, inferTypeForVariableFromUsage(containingFunction.name, program, cancellationToken), program, host);
                    return containingFunction;
                }
                return undefined;

            // Set Accessor declarations
            case Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code:
                if (isSetAccessorDeclaration(containingFunction)) {
                    annotateSetAccessor(changes, sourceFile, containingFunction, program, host, cancellationToken);
                    return containingFunction;
                }
                return undefined;

            default:
                return Debug.fail(String(errorCode));
        }
    }

    function annotateVariableDeclaration(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: VariableDeclaration | PropertyDeclaration | PropertySignature, program: Program, host: LanguageServiceHost, cancellationToken: CancellationToken): void {
        if (isIdentifier(declaration.name)) {
            annotate(changes, sourceFile, declaration, inferTypeForVariableFromUsage(declaration.name, program, cancellationToken), program, host);
        }
    }

    function annotateParameters(changes: textChanges.ChangeTracker, sourceFile: SourceFile, parameterDeclaration: ParameterDeclaration, containingFunction: FunctionLike, program: Program, host: LanguageServiceHost, cancellationToken: CancellationToken): void {
        if (!isIdentifier(parameterDeclaration.name)) {
            return;
        }
        const parameterInferences = inferTypeForParametersFromUsage(containingFunction, sourceFile, program, cancellationToken) ||
            containingFunction.parameters.map<ParameterInference>(p => ({
                declaration: p,
                type: isIdentifier(p.name) ? inferTypeForVariableFromUsage(p.name, program, cancellationToken) : program.getTypeChecker().getAnyType()
            }));
        Debug.assert(containingFunction.parameters.length === parameterInferences.length);

        if (isInJSFile(containingFunction)) {
            annotateJSDocParameters(changes, sourceFile, parameterInferences, program, host);
        }
        else {
            const needParens = isArrowFunction(containingFunction) && !findChildOfKind(containingFunction, SyntaxKind.OpenParenToken, sourceFile);
            if (needParens) changes.insertNodeBefore(sourceFile, first(containingFunction.parameters), createToken(SyntaxKind.OpenParenToken));
            for (const { declaration, type } of parameterInferences) {
                if (declaration && !declaration.type && !declaration.initializer) {
                    annotate(changes, sourceFile, declaration, type, program, host);
                }
            }
            if (needParens) changes.insertNodeAfter(sourceFile, last(containingFunction.parameters), createToken(SyntaxKind.CloseParenToken));
        }
    }

    function annotateSetAccessor(changes: textChanges.ChangeTracker, sourceFile: SourceFile, setAccessorDeclaration: SetAccessorDeclaration, program: Program, host: LanguageServiceHost, cancellationToken: CancellationToken): void {
        const param = firstOrUndefined(setAccessorDeclaration.parameters);
        if (param && isIdentifier(setAccessorDeclaration.name) && isIdentifier(param.name)) {
            let type = inferTypeForVariableFromUsage(setAccessorDeclaration.name, program, cancellationToken);
            if (type === program.getTypeChecker().getAnyType()) {
                type = inferTypeForVariableFromUsage(param.name, program, cancellationToken);
            }
            if (isInJSFile(setAccessorDeclaration)) {
                annotateJSDocParameters(changes, sourceFile, [{ declaration: param, type }], program, host);
            }
            else {
                annotate(changes, sourceFile, param, type, program, host);
            }
        }
    }

    function annotate(changes: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: textChanges.TypeAnnotatable, type: Type, program: Program, host: LanguageServiceHost): void {
        const typeNode = getTypeNodeIfAccessible(type, declaration, program, host);
        if (typeNode) {
            if (isInJSFile(sourceFile) && declaration.kind !== SyntaxKind.PropertySignature) {
                const parent = isVariableDeclaration(declaration) ? tryCast(declaration.parent.parent, isVariableStatement) : declaration;
                if (!parent) {
                    return;
                }
                const typeExpression = createJSDocTypeExpression(typeNode);
                const typeTag = isGetAccessorDeclaration(declaration) ? createJSDocReturnTag(typeExpression, "") : createJSDocTypeTag(typeExpression, "");
                addJSDocTags(changes, sourceFile, parent, [typeTag]);
            }
            else {
                changes.tryInsertTypeAnnotation(sourceFile, declaration, typeNode);
            }
        }
    }

    function annotateJSDocParameters(changes: textChanges.ChangeTracker, sourceFile: SourceFile, parameterInferences: ReadonlyArray<ParameterInference>, program: Program, host: LanguageServiceHost): void {
        const signature = parameterInferences.length && parameterInferences[0].declaration.parent;
        if (!signature) {
            return;
        }
        const paramTags = mapDefined(parameterInferences, inference => {
            const param = inference.declaration;
            // only infer parameters that have (1) no type and (2) an accessible inferred type
            if (param.initializer || getJSDocType(param) || !isIdentifier(param.name)) return;

            const typeNode = inference.type && getTypeNodeIfAccessible(inference.type, param, program, host);
            const name = getSynthesizedClone(param.name);
            setEmitFlags(name, EmitFlags.NoComments | EmitFlags.NoNestedComments);
            return typeNode && createJSDocParamTag(name, !!inference.isOptional, createJSDocTypeExpression(typeNode), "");
        });
        addJSDocTags(changes, sourceFile, signature, paramTags);
    }

    function addJSDocTags(changes: textChanges.ChangeTracker, sourceFile: SourceFile, parent: HasJSDoc, newTags: ReadonlyArray<JSDocTag>): void {
        const comments = mapDefined(parent.jsDoc, j => j.comment);
        const oldTags = flatMapToMutable(parent.jsDoc, j => j.tags);
        const unmergedNewTags = newTags.filter(newTag => !oldTags || !oldTags.some((tag, i) => {
            const merged = tryMergeJsdocTags(tag, newTag);
            if (merged) oldTags[i] = merged;
            return !!merged;
        }));
        const tag = createJSDocComment(comments.join("\n"), createNodeArray([...(oldTags || emptyArray), ...unmergedNewTags]));
        changes.insertJsdocCommentBefore(sourceFile, parent, tag);
    }

    function tryMergeJsdocTags(oldTag: JSDocTag, newTag: JSDocTag): JSDocTag | undefined {
        if (oldTag.kind !== newTag.kind) {
            return undefined;
        }
        switch (oldTag.kind) {
            case SyntaxKind.JSDocParameterTag: {
                const oldParam = oldTag as JSDocParameterTag;
                const newParam = newTag as JSDocParameterTag;
                return isIdentifier(oldParam.name) && isIdentifier(newParam.name) && oldParam.name.escapedText === newParam.name.escapedText
                    ? createJSDocParamTag(newParam.name, newParam.isBracketed, newParam.typeExpression, oldParam.comment)
                    : undefined;
            }
            case SyntaxKind.JSDocReturnTag:
                return createJSDocReturnTag((newTag as JSDocReturnTag).typeExpression, oldTag.comment);
        }
    }

    function getTypeNodeIfAccessible(type: Type, enclosingScope: Node, program: Program, host: LanguageServiceHost): TypeNode | undefined {
        const checker = program.getTypeChecker();
        let typeIsAccessible = true;
        const notAccessible = () => { typeIsAccessible = false; };
        const res = checker.typeToTypeNode(type, enclosingScope, /*flags*/ undefined, {
            trackSymbol: (symbol, declaration, meaning) => {
                // TODO: GH#18217
                typeIsAccessible = typeIsAccessible && checker.isSymbolAccessible(symbol, declaration, meaning!, /*shouldComputeAliasToMarkVisible*/ false).accessibility === SymbolAccessibility.Accessible;
            },
            reportInaccessibleThisError: notAccessible,
            reportPrivateInBaseOfClassExpression: notAccessible,
            reportInaccessibleUniqueSymbolError: notAccessible,
            moduleResolverHost: {
                readFile: host.readFile,
                fileExists: host.fileExists,
                directoryExists: host.directoryExists,
                getSourceFiles: program.getSourceFiles,
                getCurrentDirectory: program.getCurrentDirectory,
                getCommonSourceDirectory: program.getCommonSourceDirectory,
            }
        });
        return typeIsAccessible ? res : undefined;
    }

    function getReferences(token: PropertyName | Token<SyntaxKind.ConstructorKeyword>, program: Program, cancellationToken: CancellationToken): ReadonlyArray<Identifier> {
        // Position shouldn't matter since token is not a SourceFile.
        return mapDefined(FindAllReferences.getReferenceEntriesForNode(-1, token, program, program.getSourceFiles(), cancellationToken), entry =>
            entry.kind !== FindAllReferences.EntryKind.Span ? tryCast(entry.node, isIdentifier) : undefined);
    }

    function inferTypeForVariableFromUsage(token: Identifier, program: Program, cancellationToken: CancellationToken): Type {
        const references = getReferences(token, program, cancellationToken);
        const checker = program.getTypeChecker();
        const types = InferFromReference.inferTypesFromReferences(references, checker, cancellationToken);
        return InferFromReference.unifyFromContext(types, checker);
    }

    function inferTypeForParametersFromUsage(containingFunction: FunctionLike, sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken): ParameterInference[] | undefined {
        let searchToken;
        switch (containingFunction.kind) {
            case SyntaxKind.Constructor:
                searchToken = findChildOfKind<Token<SyntaxKind.ConstructorKeyword>>(containingFunction, SyntaxKind.ConstructorKeyword, sourceFile);
                break;
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                const parent = containingFunction.parent;
                searchToken = isVariableDeclaration(parent) && isIdentifier(parent.name) ?
                    parent.name :
                    containingFunction.name;
                break;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                searchToken = containingFunction.name;
                break;
        }
        if (searchToken) {
            return InferFromReference.inferTypeForParametersFromReferences(getReferences(searchToken, program, cancellationToken), containingFunction, program, cancellationToken);
        }
    }

    interface ParameterInference {
        readonly declaration: ParameterDeclaration;
        readonly type: Type;
        readonly isOptional?: boolean;
    }

    namespace InferFromReference {
        interface CallContext {
            argumentTypes: Type[];
            returnType: UsageContext;
        }

        interface UsageContext {
            isNumber?: boolean;
            isString?: boolean;
            /** Used ambiguously, eg x + ___ or object[___]; results in string | number if no other evidence exists */
            isNumberOrString?: boolean;

            candidateTypes?: Type[];
            properties?: UnderscoreEscapedMap<UsageContext>;
            callContexts?: CallContext[];
            constructContexts?: CallContext[];
            numberIndexContext?: UsageContext;
            stringIndexContext?: UsageContext;
        }

        export function inferTypesFromReferences(references: ReadonlyArray<Identifier>, checker: TypeChecker, cancellationToken: CancellationToken): Type[] {
            const usageContext: UsageContext = {};
            for (const reference of references) {
                cancellationToken.throwIfCancellationRequested();
                inferTypeFromContext(reference, checker, usageContext);
            }
            return inferFromContext(usageContext, checker);
        }

        export function inferTypeForParametersFromReferences(references: ReadonlyArray<Identifier>, declaration: FunctionLike, program: Program, cancellationToken: CancellationToken): ParameterInference[] | undefined {
            const checker = program.getTypeChecker();
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
            const callContexts = [...usageContext.constructContexts || [], ...usageContext.callContexts || []];
            return declaration.parameters.map((parameter, parameterIndex): ParameterInference => {
                const types = [];
                const isRest = isRestParameter(parameter);
                let isOptional = false;
                for (const callContext of callContexts) {
                    if (callContext.argumentTypes.length <= parameterIndex) {
                        isOptional = isInJSFile(declaration);
                        types.push(checker.getUndefinedType());
                    }
                    else if (isRest) {
                        for (let i = parameterIndex; i < callContext.argumentTypes.length; i++) {
                            types.push(checker.getBaseTypeOfLiteralType(callContext.argumentTypes[i]));
                        }
                    }
                    else {
                        types.push(checker.getBaseTypeOfLiteralType(callContext.argumentTypes[parameterIndex]));
                    }
                }
                if (isIdentifier(parameter.name)) {
                    const inferred = inferTypesFromReferences(getReferences(parameter.name, program, cancellationToken), checker, cancellationToken);
                    types.push(...(isRest ? mapDefined(inferred, checker.getElementTypeOfArrayType) : inferred));
                }
                const type = unifyFromContext(types, checker);
                return {
                    type: isRest ? checker.createArrayType(type) : type,
                    isOptional: isOptional && !isRest,
                    declaration: parameter
                };
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
                case SyntaxKind.VariableDeclaration: {
                    const { name, initializer } = node.parent as VariableDeclaration;
                    if (node === name) {
                        if (initializer) { // This can happen for `let x = null;` which still has an implicit-any error.
                            addCandidateType(usageContext, checker.getTypeAtLocation(initializer));
                        }
                        break;
                    }
                }
                    // falls through
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
                const indexType = checker.getTypeAtLocation(parent.argumentExpression);
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

        interface Priority {
            high: (t: Type) => boolean;
            low: (t: Type) => boolean;
        }

        function removeLowPriorityInferences(inferences: ReadonlyArray<Type>, priorities: Priority[]): Type[] {
            const toRemove: ((t: Type) => boolean)[] = [];
            for (const i of inferences) {
                for (const { high, low } of priorities) {
                    if (high(i)) {
                        Debug.assert(!low(i));
                        toRemove.push(low);
                    }
                }
            }
            return inferences.filter(i => toRemove.every(f => !f(i)));
        }

        export function unifyFromContext(inferences: ReadonlyArray<Type>, checker: TypeChecker, fallback = checker.getAnyType()): Type {
            if (!inferences.length) return fallback;

            // 1. string or number individually override string | number
            // 2. non-any, non-void overrides any or void
            // 3. non-nullable, non-any, non-void, non-anonymous overrides anonymous types
            const stringNumber = checker.getUnionType([checker.getStringType(), checker.getNumberType()]);
            const priorities: Priority[] = [
                {
                    high: t => t === checker.getStringType() || t === checker.getNumberType(),
                    low: t => t === stringNumber
                },
                {
                    high: t => !(t.flags & (TypeFlags.Any | TypeFlags.Void)),
                    low: t => !!(t.flags & (TypeFlags.Any | TypeFlags.Void))
                },
                {
                    high: t => !(t.flags & (TypeFlags.Nullable | TypeFlags.Any | TypeFlags.Void)) && !(checker.getObjectFlags(t) & ObjectFlags.Anonymous),
                    low: t => !!(checker.getObjectFlags(t) & ObjectFlags.Anonymous)
                }];
            let good = removeLowPriorityInferences(inferences, priorities);
            const anons = good.filter(i => checker.getObjectFlags(i) & ObjectFlags.Anonymous) as AnonymousType[];
            if (anons.length) {
                good = good.filter(i => !(checker.getObjectFlags(i) & ObjectFlags.Anonymous));
                good.push(unifyAnonymousTypes(anons, checker));
            }
            return checker.getWidenedType(checker.getUnionType(good));
        }

        function unifyAnonymousTypes(anons: AnonymousType[], checker: TypeChecker) {
            if (anons.length === 1) {
                return anons[0];
            }
            const calls = [];
            const constructs = [];
            const stringIndices = [];
            const numberIndices = [];
            let stringIndexReadonly = false;
            let numberIndexReadonly = false;
            const props = createMultiMap<Type>();
            for (const anon of anons) {
                for (const p of checker.getPropertiesOfType(anon)) {
                    props.add(p.name, checker.getTypeOfSymbolAtLocation(p, p.valueDeclaration));
                }
                calls.push(...checker.getSignaturesOfType(anon, SignatureKind.Call));
                constructs.push(...checker.getSignaturesOfType(anon, SignatureKind.Construct));
                if (anon.stringIndexInfo) {
                    stringIndices.push(anon.stringIndexInfo.type);
                    stringIndexReadonly = stringIndexReadonly || anon.stringIndexInfo.isReadonly;
                }
                if (anon.numberIndexInfo) {
                    numberIndices.push(anon.numberIndexInfo.type);
                    numberIndexReadonly = numberIndexReadonly || anon.numberIndexInfo.isReadonly;
                }
            }
            const members = mapEntries(props, (name, types) => {
                const isOptional = types.length < anons.length ? SymbolFlags.Optional : 0;
                const s = checker.createSymbol(SymbolFlags.Property | isOptional, name as __String);
                s.type = checker.getUnionType(types);
                return [name, s];
            });
            return checker.createAnonymousType(
                anons[0].symbol,
                members as UnderscoreEscapedMap<TransientSymbol>,
                calls,
                constructs,
                stringIndices.length ? checker.createIndexInfo(checker.getUnionType(stringIndices), stringIndexReadonly) : undefined,
                numberIndices.length ? checker.createIndexInfo(checker.getUnionType(numberIndices), numberIndexReadonly) : undefined);
        }

        function inferFromContext(usageContext: UsageContext, checker: TypeChecker) {
            const types = [];

            if (usageContext.isNumber) {
                types.push(checker.getNumberType());
            }
            if (usageContext.isString) {
                types.push(checker.getStringType());
            }
            if (usageContext.isNumberOrString) {
                types.push(checker.getUnionType([checker.getStringType(), checker.getNumberType()]));
            }

            types.push(...(usageContext.candidateTypes || []).map(t => checker.getBaseTypeOfLiteralType(t)));

            if (usageContext.properties && hasCallContext(usageContext.properties.get("then" as __String))) {
                const paramType = getParameterTypeFromCallContexts(0, usageContext.properties.get("then" as __String)!.callContexts!, /*isRestParameter*/ false, checker)!; // TODO: GH#18217
                const types = paramType.getCallSignatures().map(c => c.getReturnType());
                types.push(checker.createPromiseType(types.length ? checker.getUnionType(types, UnionReduction.Subtype) : checker.getAnyType()));
            }
            else if (usageContext.properties && hasCallContext(usageContext.properties.get("push" as __String))) {
                types.push(checker.createArrayType(getParameterTypeFromCallContexts(0, usageContext.properties.get("push" as __String)!.callContexts!, /*isRestParameter*/ false, checker)!));
            }

            if (usageContext.numberIndexContext) {
                types.push(checker.createArrayType(recur(usageContext.numberIndexContext)));
            }
            else if (usageContext.properties || usageContext.callContexts || usageContext.constructContexts || usageContext.stringIndexContext) {
                const members = createUnderscoreEscapedMap<Symbol>();
                const callSignatures: Signature[] = [];
                const constructSignatures: Signature[] = [];
                let stringIndexInfo: IndexInfo | undefined;

                if (usageContext.properties) {
                    usageContext.properties.forEach((context, name) => {
                        const symbol = checker.createSymbol(SymbolFlags.Property, name);
                        symbol.type = recur(context);
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

                if (usageContext.stringIndexContext) {
                    stringIndexInfo = checker.createIndexInfo(recur(usageContext.stringIndexContext), /*isReadonly*/ false);
                }

                types.push(checker.createAnonymousType(/*symbol*/ undefined!, members, callSignatures, constructSignatures, stringIndexInfo, /*numberIndexInfo*/ undefined)); // TODO: GH#18217
            }
            return types;

            function recur(innerContext: UsageContext): Type {
                return unifyFromContext(inferFromContext(innerContext, checker), checker);
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
            const returnType = unifyFromContext(inferFromContext(callContext.returnType, checker), checker, checker.getVoidType());
            // TODO: GH#18217
            return checker.createSignature(/*declaration*/ undefined!, /*typeParameters*/ undefined, /*thisParameter*/ undefined, parameters, returnType, /*typePredicate*/ undefined, callContext.argumentTypes.length, /*hasRestParameter*/ false, /*hasLiteralTypes*/ false);
        }

        function addCandidateType(context: UsageContext, type: Type | undefined) {
            if (type && !(type.flags & TypeFlags.Any) && !(type.flags & TypeFlags.Never)) {
                (context.candidateTypes || (context.candidateTypes = [])).push(type);
            }
        }

        function hasCallContext(usageContext: UsageContext | undefined): boolean {
            return !!usageContext && !!usageContext.callContexts;
        }
    }
}
