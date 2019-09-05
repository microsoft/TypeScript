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

        // Function expressions and declarations
        Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code,
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
            case Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code:
                return Diagnostics.Infer_this_type_of_0_from_usage;
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

            // Function 'this'
            case Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code:
                if (textChanges.isThisTypeAnnotatable(containingFunction) && markSeen(containingFunction)) {
                    annotateThis(changes, sourceFile, containingFunction, program, host, cancellationToken);
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

        const parameterInferences = inferTypeForParametersFromUsage(containingFunction, sourceFile, program, cancellationToken);
        Debug.assert(containingFunction.parameters.length === parameterInferences.length, "Parameter count and inference count should match");

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

    function annotateThis(changes: textChanges.ChangeTracker, sourceFile: SourceFile, containingFunction: textChanges.ThisTypeAnnotatable, program: Program, host: LanguageServiceHost, cancellationToken: CancellationToken) {
        const references = getFunctionReferences(containingFunction, sourceFile, program, cancellationToken);
        if (!references || !references.length) {
            return;
        }
        const thisInference = inferTypeFromReferences(program, references, cancellationToken).thisParameter();
        const typeNode = getTypeNodeIfAccessible(thisInference, containingFunction, program, host);
        if (!typeNode) {
            return;
        }

        if (isInJSFile(containingFunction)) {
            annotateJSDocThis(changes, sourceFile, containingFunction, typeNode);
        }
        else {
            changes.tryInsertThisTypeAnnotation(sourceFile, containingFunction, typeNode);
        }
    }

    function annotateJSDocThis(changes: textChanges.ChangeTracker, sourceFile: SourceFile, containingFunction: FunctionLike, typeNode: TypeNode) {
        addJSDocTags(changes, sourceFile, containingFunction, [
            createJSDocThisTag(createJSDocTypeExpression(typeNode)),
        ]);
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
        const jsDocNode = parent.kind === SyntaxKind.ArrowFunction ? getJsDocNodeForArrowFunction(parent) : parent;
        jsDocNode.jsDoc = parent.jsDoc;
        jsDocNode.jsDocCache = parent.jsDocCache;
        changes.insertJsdocCommentBefore(sourceFile, jsDocNode, tag);
    }

    function getJsDocNodeForArrowFunction(signature: ArrowFunction): HasJSDoc {
        if (signature.parent.kind === SyntaxKind.PropertyDeclaration) {
            return <HasJSDoc>signature.parent;
        }
        return <HasJSDoc>signature.parent.parent;
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

    function getReferences(token: PropertyName | Token<SyntaxKind.ConstructorKeyword>, program: Program, cancellationToken: CancellationToken): ReadonlyArray<Identifier> {
        // Position shouldn't matter since token is not a SourceFile.
        return mapDefined(FindAllReferences.getReferenceEntriesForNode(-1, token, program, program.getSourceFiles(), cancellationToken), entry =>
            entry.kind !== FindAllReferences.EntryKind.Span ? tryCast(entry.node, isIdentifier) : undefined);
    }

    function inferTypeForVariableFromUsage(token: Identifier, program: Program, cancellationToken: CancellationToken): Type {
        const references = getReferences(token, program, cancellationToken);
        return inferTypeFromReferences(program, references, cancellationToken).single();
    }

    function inferTypeForParametersFromUsage(func: SignatureDeclaration, sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken) {
        const references = getFunctionReferences(func, sourceFile, program, cancellationToken);
        return references && inferTypeFromReferences(program, references, cancellationToken).parameters(func) ||
            func.parameters.map<ParameterInference>(p => ({
                declaration: p,
                type: isIdentifier(p.name) ? inferTypeForVariableFromUsage(p.name, program, cancellationToken) : program.getTypeChecker().getAnyType()
            }));
    }

    function getFunctionReferences(containingFunction: FunctionLike, sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken): ReadonlyArray<Identifier> | undefined {
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

        if (!searchToken) {
            return undefined;
        }

        return getReferences(searchToken, program, cancellationToken);
    }

    interface ParameterInference {
        readonly declaration: ParameterDeclaration;
        readonly type: Type;
        readonly isOptional?: boolean;
    }

    function inferTypeFromReferences(program: Program, references: ReadonlyArray<Identifier>, cancellationToken: CancellationToken) {
        const checker = program.getTypeChecker();
        const builtinConstructors: { [s: string]: (t: Type) => Type } = {
            string: () => checker.getStringType(),
            number: () => checker.getNumberType(),
            Array: t => checker.createArrayType(t),
            Promise: t => checker.createPromiseType(t),
        };
        const builtins = [
            checker.getStringType(),
            checker.getNumberType(),
            checker.createArrayType(checker.getAnyType()),
            checker.createPromiseType(checker.getAnyType()),
        ];

        return {
            single,
            parameters,
            thisParameter,
        };

        interface CallUsage {
            argumentTypes: Type[];
            return_: Usage;
        }

        interface Usage {
            isNumber: boolean | undefined;
            isString: boolean | undefined;
            /** Used ambiguously, eg x + ___ or object[___]; results in string | number if no other evidence exists */
            isNumberOrString: boolean | undefined;

            candidateTypes: Type[] | undefined;
            properties: UnderscoreEscapedMap<Usage> | undefined;
            calls: CallUsage[] | undefined;
            constructs: CallUsage[] | undefined;
            numberIndex: Usage | undefined;
            stringIndex: Usage | undefined;
            candidateThisTypes: Type[] | undefined;
            inferredTypes: Type[] | undefined;
        }

        function single(): Type {
            return unifyTypes(inferTypesFromReferencesSingle(references));
        }

        function parameters(declaration: FunctionLike): ParameterInference[] | undefined {
            if (references.length === 0 || !declaration.parameters) {
                return undefined;
            }

            const usage = createEmptyUsage();
            for (const reference of references) {
                cancellationToken.throwIfCancellationRequested();
                calculateUsageOfNode(reference, usage);
            }
            const calls = [...usage.constructs || [], ...usage.calls || []];
            return declaration.parameters.map((parameter, parameterIndex): ParameterInference => {
                const types = [];
                const isRest = isRestParameter(parameter);
                let isOptional = false;
                for (const call of calls) {
                    if (call.argumentTypes.length <= parameterIndex) {
                        isOptional = isInJSFile(declaration);
                        types.push(checker.getUndefinedType());
                    }
                    else if (isRest) {
                        for (let i = parameterIndex; i < call.argumentTypes.length; i++) {
                            types.push(checker.getBaseTypeOfLiteralType(call.argumentTypes[i]));
                        }
                    }
                    else {
                        types.push(checker.getBaseTypeOfLiteralType(call.argumentTypes[parameterIndex]));
                    }
                }
                if (isIdentifier(parameter.name)) {
                    const inferred = inferTypesFromReferencesSingle(getReferences(parameter.name, program, cancellationToken));
                    types.push(...(isRest ? mapDefined(inferred, checker.getElementTypeOfArrayType) : inferred));
                }
                const type = unifyTypes(types);
                return {
                    type: isRest ? checker.createArrayType(type) : type,
                    isOptional: isOptional && !isRest,
                    declaration: parameter
                };
            });
        }

        function thisParameter() {
            const usage = createEmptyUsage();
            for (const reference of references) {
                cancellationToken.throwIfCancellationRequested();
                calculateUsageOfNode(reference, usage);
            }

            return unifyTypes(usage.candidateThisTypes || emptyArray);
        }

        function inferTypesFromReferencesSingle(references: readonly Identifier[]): Type[] {
            const usage: Usage = createEmptyUsage();
            for (const reference of references) {
                cancellationToken.throwIfCancellationRequested();
                calculateUsageOfNode(reference, usage);
            }
            return inferFromUsage(usage);
        }

        function calculateUsageOfNode(node: Expression, usage: Usage): void {
            while (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
                node = <Expression>node.parent;
            }

            switch (node.parent.kind) {
                case SyntaxKind.ExpressionStatement:
                    addCandidateType(usage, checker.getVoidType());
                    break;
                case SyntaxKind.PostfixUnaryExpression:
                    usage.isNumber = true;
                    break;
                case SyntaxKind.PrefixUnaryExpression:
                    inferTypeFromPrefixUnaryExpression(<PrefixUnaryExpression>node.parent, usage);
                    break;
                case SyntaxKind.BinaryExpression:
                    inferTypeFromBinaryExpression(node, <BinaryExpression>node.parent, usage);
                    break;
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    inferTypeFromSwitchStatementLabel(<CaseOrDefaultClause>node.parent, usage);
                    break;
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    if ((<CallExpression | NewExpression>node.parent).expression === node) {
                        inferTypeFromCallExpression(<CallExpression | NewExpression>node.parent, usage);
                    }
                    else {
                        inferTypeFromContextualType(node, usage);
                    }
                    break;
                case SyntaxKind.PropertyAccessExpression:
                    inferTypeFromPropertyAccessExpression(<PropertyAccessExpression>node.parent, usage);
                    break;
                case SyntaxKind.ElementAccessExpression:
                    inferTypeFromPropertyElementExpression(<ElementAccessExpression>node.parent, node, usage);
                    break;
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.ShorthandPropertyAssignment:
                    inferTypeFromPropertyAssignment(<PropertyAssignment | ShorthandPropertyAssignment>node.parent, usage);
                    break;
                case SyntaxKind.PropertyDeclaration:
                    inferTypeFromPropertyDeclaration(<PropertyDeclaration>node.parent, usage);
                    break;
                case SyntaxKind.VariableDeclaration: {
                    const { name, initializer } = node.parent as VariableDeclaration;
                    if (node === name) {
                        if (initializer) { // This can happen for `let x = null;` which still has an implicit-any error.
                            addCandidateType(usage, checker.getTypeAtLocation(initializer));
                        }
                        break;
                    }
                }
                    // falls through
                default:
                    return inferTypeFromContextualType(node, usage);
            }
        }

        function inferTypeFromContextualType(node: Expression, usage: Usage): void {
            if (isExpressionNode(node)) {
                addCandidateType(usage, checker.getContextualType(node));
            }
        }

        function inferTypeFromPrefixUnaryExpression(node: PrefixUnaryExpression, usage: Usage): void {
            switch (node.operator) {
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                    usage.isNumber = true;
                    break;

                case SyntaxKind.PlusToken:
                    usage.isNumberOrString = true;
                    break;

                // case SyntaxKind.ExclamationToken:
                // no inferences here;
            }
        }

        function inferTypeFromBinaryExpression(node: Expression, parent: BinaryExpression, usage: Usage): void {
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
                        addCandidateType(usage, operandType);
                    }
                    else {
                        usage.isNumber = true;
                    }
                    break;

                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.PlusToken:
                    const otherOperandType = checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left);
                    if (otherOperandType.flags & TypeFlags.EnumLike) {
                        addCandidateType(usage, otherOperandType);
                    }
                    else if (otherOperandType.flags & TypeFlags.NumberLike) {
                        usage.isNumber = true;
                    }
                    else if (otherOperandType.flags & TypeFlags.StringLike) {
                        usage.isString = true;
                    }
                    else if (otherOperandType.flags & TypeFlags.Any) {
                        // do nothing, maybe we'll learn something elsewhere
                    }
                    else {
                        usage.isNumberOrString = true;
                    }
                    break;

                //  AssignmentOperators
                case SyntaxKind.EqualsToken:
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                    addCandidateType(usage, checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left));
                    break;

                case SyntaxKind.InKeyword:
                    if (node === parent.left) {
                        usage.isString = true;
                    }
                    break;

                // LogicalOperator
                case SyntaxKind.BarBarToken:
                    if (node === parent.left &&
                        (node.parent.parent.kind === SyntaxKind.VariableDeclaration || isAssignmentExpression(node.parent.parent, /*excludeCompoundAssignment*/ true))) {
                        // var x = x || {};
                        // TODO: use getFalsyflagsOfType
                        addCandidateType(usage, checker.getTypeAtLocation(parent.right));
                    }
                    break;

                case SyntaxKind.AmpersandAmpersandToken:
                case SyntaxKind.CommaToken:
                case SyntaxKind.InstanceOfKeyword:
                    // nothing to infer here
                    break;
            }
        }

        function inferTypeFromSwitchStatementLabel(parent: CaseOrDefaultClause, usage: Usage): void {
            addCandidateType(usage, checker.getTypeAtLocation(parent.parent.parent.expression));
        }

        function inferTypeFromCallExpression(parent: CallExpression | NewExpression, usage: Usage): void {
            const call: CallUsage = {
                argumentTypes: [],
                return_: createEmptyUsage()
            };

            if (parent.arguments) {
                for (const argument of parent.arguments) {
                    // TODO: should recursively infer a usage here, right?
                    call.argumentTypes.push(checker.getTypeAtLocation(argument));
                }
            }

            calculateUsageOfNode(parent, call.return_);
            if (parent.kind === SyntaxKind.CallExpression) {
                (usage.calls || (usage.calls = [])).push(call);
            }
            else {
                (usage.constructs || (usage.constructs = [])).push(call);
            }
        }

        function inferTypeFromPropertyAccessExpression(parent: PropertyAccessExpression, usage: Usage): void {
            const name = escapeLeadingUnderscores(parent.name.text);
            if (!usage.properties) {
                usage.properties = createUnderscoreEscapedMap<Usage>();
            }
            const propertyUsage = usage.properties.get(name) || createEmptyUsage();
            calculateUsageOfNode(parent, propertyUsage);
            usage.properties.set(name, propertyUsage);
        }

        function inferTypeFromPropertyElementExpression(parent: ElementAccessExpression, node: Expression, usage: Usage): void {
            if (node === parent.argumentExpression) {
                usage.isNumberOrString = true;
                return;
            }
            else {
                const indexType = checker.getTypeAtLocation(parent.argumentExpression);
                const indexUsage = createEmptyUsage();
                calculateUsageOfNode(parent, indexUsage);
                if (indexType.flags & TypeFlags.NumberLike) {
                    usage.numberIndex = indexUsage;
                }
                else {
                    usage.stringIndex = indexUsage;
                }
            }
        }

        function inferTypeFromPropertyAssignment(assignment: PropertyAssignment | ShorthandPropertyAssignment, usage: Usage) {
            const nodeWithRealType = isVariableDeclaration(assignment.parent.parent) ?
                assignment.parent.parent :
                assignment.parent;
            addCandidateThisType(usage, checker.getTypeAtLocation(nodeWithRealType));
        }

        function inferTypeFromPropertyDeclaration(declaration: PropertyDeclaration, usage: Usage) {
            addCandidateThisType(usage, checker.getTypeAtLocation(declaration.parent));
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
                        Debug.assert(!low(i), "Priority can't have both low and high");
                        toRemove.push(low);
                    }
                }
            }
            return inferences.filter(i => toRemove.every(f => !f(i)));
        }

        function unifyTypes(inferences: ReadonlyArray<Type>, fallback = checker.getAnyType()): Type {
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
                good.push(unifyAnonymousTypes(anons));
            }
            return checker.getWidenedType(checker.getUnionType(good.map(checker.getBaseTypeOfLiteralType), UnionReduction.Subtype));
        }

        function unifyAnonymousTypes(anons: AnonymousType[]) {
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

        function inferFromUsage(usage: Usage) {
            const types = [];

            if (usage.isNumber) {
                types.push(checker.getNumberType());
            }
            if (usage.isString) {
                types.push(checker.getStringType());
            }
            if (usage.isNumberOrString) {
                types.push(checker.getUnionType([checker.getStringType(), checker.getNumberType()]));
            }

            types.push(...(usage.candidateTypes || []).map(t => checker.getBaseTypeOfLiteralType(t)));
            types.push(...findBuiltinTypes(usage));

            if (usage.numberIndex) {
                types.push(checker.createArrayType(recur(usage.numberIndex)));
            }
            else if (usage.properties && usage.properties.size
                     || usage.calls && usage.calls.length
                     || usage.constructs && usage.constructs.length
                     || usage.stringIndex) {
                const members = createUnderscoreEscapedMap<Symbol>();
                const callSignatures: Signature[] = [];
                const constructSignatures: Signature[] = [];
                let stringIndexInfo: IndexInfo | undefined;

                if (usage.properties) {
                    usage.properties.forEach((u, name) => {
                        const symbol = checker.createSymbol(SymbolFlags.Property, name);
                        symbol.type = recur(u);
                        members.set(name, symbol);
                    });
                }

                if (usage.calls) {
                    callSignatures.push(getSignatureFromCalls(usage.calls, checker.getAnyType()));
                }

                if (usage.constructs) {
                    constructSignatures.push(getSignatureFromCalls(usage.constructs, checker.getAnyType()));
                }

                if (usage.stringIndex) {
                    stringIndexInfo = checker.createIndexInfo(recur(usage.stringIndex), /*isReadonly*/ false);
                }

                types.push(checker.createAnonymousType(/*symbol*/ undefined!, members, callSignatures, constructSignatures, stringIndexInfo, /*numberIndexInfo*/ undefined)); // TODO: GH#18217
            }
            return types; // TODO: Should cache this since I HOPE it doesn't change

            function recur(innerUsage: Usage): Type {
                return unifyTypes(inferFromUsage(innerUsage));
            }
        }

        function createEmptyUsage(): Usage {
            return {
                isNumber: undefined,
                isString: undefined,
                isNumberOrString: undefined,
                candidateTypes: undefined,
                properties: undefined,
                calls: undefined,
                constructs: undefined,
                numberIndex: undefined,
                stringIndex: undefined,
                candidateThisTypes: undefined,
                inferredTypes: undefined,
            }
        }

        function combineUsages(usages: Usage[]): Usage {
            const combinedProperties = createUnderscoreEscapedMap<Usage[]>()
            for (const u of usages) {
                if (u.properties) {
                    u.properties.forEach((p,name) => {
                        if (!combinedProperties.has(name)) {
                            combinedProperties.set(name, []);
                        }
                        combinedProperties.get(name)!.push(p);
                    });
                }
            }
            const properties = createUnderscoreEscapedMap<Usage>()
            combinedProperties.forEach((ps,name) => {
                properties.set(name, combineUsages(ps));
            });
            return {
                isNumber: usages.some(u => u.isNumber),
                isString: usages.some(u => u.isString),
                isNumberOrString: usages.some(u => u.isNumberOrString),
                candidateTypes: flatMap(usages, u => u.candidateTypes) as Type[],
                properties,
                calls: flatMap(usages, u => u.calls) as CallUsage[],
                constructs: flatMap(usages, u => u.constructs) as CallUsage[],
                numberIndex: forEach(usages, u => u.numberIndex),
                stringIndex: forEach(usages, u => u.stringIndex),
                candidateThisTypes: flatMap(usages, u => u.candidateThisTypes) as Type[],
                inferredTypes: undefined, // clear type cache
            }
        }

        function findBuiltinTypes(usage: Usage): Type[] {
            if (!usage.properties || !usage.properties.size) return [];
            const matches = builtins.filter(t => matchesAllPropertiesOf(t, usage));
            if (0 < matches.length && matches.length < 3) {
                return matches.map(m => inferTypeParameterFromUsage(m, usage));
            }
            return [];
        }

        function matchesAllPropertiesOf(type: Type, usage: Usage) {
            if (!usage.properties) return false;
            let result = true;
            usage.properties.forEach((propUsage, name) => {
                const source = checker.getTypeOfPropertyOfType(type, name as string);
                if (!source) {
                    result = false;
                    return;
                }
                if (propUsage.calls) {
                    const sigs = checker.getSignaturesOfType(source, ts.SignatureKind.Call);
                    result = result && !!sigs.length && checker.isTypeAssignableTo(source, getFunctionFromCalls(propUsage.calls));
                }
                else {
                    result = result && checker.isTypeAssignableTo(source, unifyTypes(inferFromUsage(propUsage)));
                }
            });
            return result;
        }

        // inference is limited to
        // 1. generic types with a single parameter
        // 2. inference to/from calls with a single signature
        function inferTypeParameterFromUsage(type: Type, usage: Usage) {
            if (!usage.properties || !(getObjectFlags(type) & ObjectFlags.Reference)) return type;
            const generic = (type as TypeReference).target;
            const singleTypeParameter = singleOrUndefined(generic.typeParameters);
            if (!singleTypeParameter) return type;

            const types: Type[] = [];
            usage.properties.forEach((propUsage, name) => {
                const source = checker.getTypeOfPropertyOfType(generic, name as string);
                if (!source) {
                    return Debug.fail("generic should have all the properties of its reference.");
                }
                if (!propUsage.calls) return;

                types.push(...infer(source, getFunctionFromCalls(propUsage.calls), singleTypeParameter));
            });
            return builtinConstructors[type.symbol.escapedName as string](unifyTypes(types));
        }

        // TODO: Source and target are bad names. Should be builtinType and usageType...or something
        // and search is a bad name
        function infer(source: Type, target: Type, search: Type): readonly Type[] {
            if (source === search) {
                return [target];
            }
            else if (source.flags & TypeFlags.UnionOrIntersection) {
                return flatMap((source as UnionOrIntersectionType).types, t => infer(t, target, search));
            }
            else if (getObjectFlags(source) & ObjectFlags.Reference && getObjectFlags(target) & ObjectFlags.Reference) {
                // this is wrong because we need a reference to the targetType to, so we can check that it's also a reference
                const sourceArgs = (source as TypeReference).typeArguments;
                const targetArgs = (target as TypeReference).typeArguments;
                const types = [];
                if (sourceArgs && targetArgs) {
                    for (let i = 0; i < sourceArgs.length; i++) {
                        if (targetArgs[i]) {
                            types.push(...infer(sourceArgs[i], targetArgs[i], search));
                        }
                    }
                }
                return types;
            }
            const sourceSigs = checker.getSignaturesOfType(source, SignatureKind.Call);
            const targetSigs = checker.getSignaturesOfType(target, SignatureKind.Call);
            if (sourceSigs.length === 1 && targetSigs.length === 1) {
                return inferFromSignatures(sourceSigs[0], targetSigs[0], search);
            }
            return [];
        }

        function inferFromSignatures(sourceSig: Signature, targetSig: Signature, search: Type) {
            const types = [];
            for (let i = 0; i < sourceSig.parameters.length; i++) {
                const sourceParam = sourceSig.parameters[i];
                const targetParam = targetSig.parameters[i];
                const isRest = sourceSig.declaration && isRestParameter(sourceSig.declaration.parameters[i]);
                if (!targetParam) {
                    break;
                }
                let sourceType = checker.getTypeOfSymbolAtLocation(sourceParam, sourceParam.valueDeclaration);
                let elementType = isRest && checker.getElementTypeOfArrayType(sourceType);
                if (elementType) {
                    sourceType = elementType;
                }
                const targetType = (targetParam as SymbolLinks).type || checker.getTypeOfSymbolAtLocation(targetParam, targetParam.valueDeclaration);
                types.push(...infer(sourceType, targetType, search));
            }
            const sourceReturn = checker.getReturnTypeOfSignature(sourceSig);
            const targetReturn = checker.getReturnTypeOfSignature(targetSig);
            types.push(...infer(sourceReturn, targetReturn, search));
            return types;
        }

        function getFunctionFromCalls(calls: CallUsage[]) {
            return checker.createAnonymousType(undefined!, createSymbolTable(), [getSignatureFromCalls(calls, checker.getAnyType())], emptyArray, undefined, undefined);
        }

        function getSignatureFromCalls(calls: CallUsage[], fallbackReturn: Type): Signature {
            const parameters: Symbol[] = [];
            const length = Math.max(...calls.map(c => c.argumentTypes.length));
            for (let i = 0; i < length; i++) {
                const symbol = checker.createSymbol(SymbolFlags.FunctionScopedVariable, escapeLeadingUnderscores(`arg${i}`));
                symbol.type = unifyTypes(calls.map(call => call.argumentTypes[i] || checker.getUndefinedType()));
                if (calls.some(call => call.argumentTypes[i] === undefined)) {
                    symbol.flags |= SymbolFlags.Optional;
                }
                parameters.push(symbol);
            }
            const returnType = unifyTypes(inferFromUsage(combineUsages(calls.map(call => call.return_))), fallbackReturn);
            // TODO: GH#18217
            return checker.createSignature(/*declaration*/ undefined!, /*typeParameters*/ undefined, /*thisParameter*/ undefined, parameters, returnType, /*typePredicate*/ undefined, length, /*hasRestParameter*/ false, /*hasLiteralTypes*/ false);
        }

        function addCandidateType(usage: Usage, type: Type | undefined) {
            if (type && !(type.flags & TypeFlags.Any) && !(type.flags & TypeFlags.Never)) {
                (usage.candidateTypes || (usage.candidateTypes = [])).push(type);
            }
        }

        function addCandidateThisType(usage: Usage, type: Type | undefined) {
            if (type && !(type.flags & TypeFlags.Any) && !(type.flags & TypeFlags.Never)) {
                (usage.candidateThisTypes || (usage.candidateThisTypes = [])).push(type);
            }
        }
    }
}
