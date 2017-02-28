/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code,
            //Diagnostics.Variable_0_implicitly_has_an_1_type.code,
            Diagnostics.Parameter_0_implicitly_has_an_1_type.code,
            Diagnostics.Member_0_implicitly_has_an_1_type.code,
            //Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type.code,
            Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code,

            // Diagnostics.Binding_element_0_implicitly_has_an_1_type.code,
            // Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code,
            // Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code,
            // Diagnostics.new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type.code,
            // Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code,
            // Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type.code,
            // Diagnostics.Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type.code,
            // Diagnostics.Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number.code,
            // Diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature.code,
            // Diagnostics.Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type.code,
            // Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code,
        ],
        getCodeActions: getActionsForAddExplicitTypeAnnotation
    });

    function getActionsForAddExplicitTypeAnnotation(context: CodeFixContext): CodeAction[] | undefined {
        const { sourceFile, program, span: { start }, cancellationToken } = context;
        const token = getTokenAtPosition(sourceFile, start);

        if (!isIdentifier(token)) {
            return undefined;
        }

        const checker = program.getTypeChecker();

        return getCodeAction();

        function getCodeAction() {
            switch (context.errorCode) {
                case Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code:
                case Diagnostics.Variable_0_implicitly_has_an_1_type.code:
                case Diagnostics.Member_0_implicitly_has_an_1_type.code:
                    return getCodeActionForVariable();
                case Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
                case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
                    //return getCodeActionForParameter();
                    getCodeActionForParameter;
                    return getCodeActionForParameters();
            }
        }

        function getCodeActionForVariable() {
            const type = inferTypeForVariableFromUsage(<Identifier>token);
            const typeString = checker.typeToString(type || checker.getAnyType(), token);
            if (isInJavaScriptFile(sourceFile)) {
                const declaration = getAncestor(token, SyntaxKind.VariableStatement);
                if (!declaration.jsDoc) {
                    const newText = `/** @type {${typeString}} */${context.newLineCharacter}`;
                    return createCodeActions(declaration.getStart(), newText);
                }
            }
            else {
                 return createCodeActions(token.getEnd(), `: ${typeString}`);
            }
        }

        function getCodeActionForParameter() {
            const type = inferTypeForParameterFromUsage(<Identifier>token) ||
                inferTypeForVariableFromUsage(<Identifier>token);
            const typeString = checker.typeToString(type || checker.getAnyType(), token);
            if (isInJavaScriptFile(sourceFile)) {
                const declaration = getContainingFunction(token);
                if (!declaration.jsDoc) {
                    const newText = `/** @param {${typeString}} ${token.getText()} */${context.newLineCharacter}`;
                    return createCodeActions(declaration.getStart(), newText);
                }
            }
            else {
                return createCodeActions(token.getEnd(), `: ${typeString}`);
            }
        }

        function coalesceSignatures(declaration: FunctionLikeDeclaration, signatures: Signature[]): Signature {
            const parameters = [];
            let minArgumentCount = 0;;
            for (let i = 0; i < declaration.parameters.length; i++) {
                const parameterDeclaration = declaration.parameters[i];
                const paramterTypes = [];
                let seenInAllSignatures = true;
                for (const signature of signatures) {
                    if (i < signature.parameters.length) {
                        const type = (<TransientSymbol>signature.parameters[i]).type;
                        if (isValidInference(type)) {
                            paramterTypes.push(checker.getBaseTypeOfLiteralType(type));
                        }
                    }
                    else {
                        seenInAllSignatures = false;
                    }
                }
                if (seenInAllSignatures) {
                    minArgumentCount++;
                }
                const symbol = <TransientSymbol>checker.createSymbol(SymbolFlags.FunctionScopedVariable, parameterDeclaration.name.getText());
                symbol.type = paramterTypes.length ? checker.getUnionType(paramterTypes) : checker.getAnyType();
                parameters.push(symbol);
            }
            return checker.createSignature(declaration, /*typeParameters*/ undefined, /*thisParameter*/ undefined, parameters, checker.getAnyType(), /*typePredicate*/ undefined, minArgumentCount, /*hasRestParameter*/ false, /*hasLiteralTypes*/ false);
        }

        function getCodeActionForParameters() {

            const containingFunction = getContainingFunction(token);
            if (!containingFunction.name) {
                return undefined;
            }
            //const parameterIndex = getParameterIndexInList(token, containingFunction.parameters);
            //const types = [];
            let signatures: Signature[] = [];
            for (const reference of getReferences(containingFunction.name)) {
                const token = getTokenAtPosition(program.getSourceFile(reference.fileName), reference.textSpan.start);
                const type = getTypeFromContext(<Identifier>token, program.getTypeChecker());
                if (!isValidInference(type)) {
                    continue;
                }

                signatures = concatenate(signatures, containingFunction.kind === SyntaxKind.Constructor ? type.getConstructSignatures() : type.getCallSignatures());
            }
            const unifiedSignature: Signature = coalesceSignatures(containingFunction, signatures);

            if (isInJavaScriptFile(sourceFile)) {
                const declaration = getContainingFunction(token);
                if (!declaration.jsDoc) {
                    let newText = `/**${context.newLineCharacter}`;
                    for (let i = 0; i < unifiedSignature.parameters.length; i++) {
                        const paramter = unifiedSignature.parameters[i];
                        const typeString = checker.typeToString((<TransientSymbol>paramter).type, token);
                        newText += ` * @param {${typeString}${i + 1 > unifiedSignature.minArgumentCount ? "=" : ""}} ${paramter.name}${context.newLineCharacter}`
                    }
                    newText += ` */${context.newLineCharacter}`
                    return createCodeActions(declaration.getStart(), newText);
                }
            }
            else {
                return undefined;
            }
        }

        function createCodeActions(startPos: number, typeString: string) {
            return [{
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Infer_type_of_0), [token.getText()]),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: [{
                        span: { start: startPos, length: 0 },
                        newText: typeString
                    }]
                }]
            }];
        }

        function getReferences(token: PropertyName) {
            const references = FindAllReferences.findReferencedSymbols(
                checker,
                cancellationToken,
                program.getSourceFiles(),
                token.getSourceFile(),
                token.getStart(),
                /*findInStrings*/ false, /*findInComments*/ false, /*isForRename*/ false);

            Debug.assert(!!references, "Found no references!");
            Debug.assert(references.length === 1, "Found more references than expected");

            return references[0].references;
        }

        function inferTypeForVariableFromUsage(token: Identifier) {
            const types = [];
            for (const reference of getReferences(token)) {
                const token = getTokenAtPosition(context.program.getSourceFile(reference.fileName), reference.textSpan.start);
                const type = getTypeFromContext(<Identifier>token, context.program.getTypeChecker());
                if (!isValidInference(type)) {
                    continue;
                }
                types.push(checker.getBaseTypeOfLiteralType(type));
            }
            return types.length ? checker.getUnionType(types) : undefined;
        }

        function inferTypeForParameterFromUsage(token: Identifier) {
            const containingFunction = getContainingFunction(token);
            if (containingFunction.name) {
                const parameterIndex = getParameterIndexInList(token, containingFunction.parameters);
                const types = [];
                for (const reference of getReferences(containingFunction.name)) {
                    const token = getTokenAtPosition(program.getSourceFile(reference.fileName), reference.textSpan.start);
                    const type = getTypeFromContext(<Identifier>token, program.getTypeChecker());
                    if (!isValidInference(type)) {
                        continue;
                    }
                    const signatures = type.getCallSignatures();
                    for (const signature of signatures) {
                        const parameterType = signature.parameters.length > parameterIndex ? (<TransientSymbol>signature.parameters[parameterIndex]).type : undefined;
                        types.push(parameterType ? checker.getBaseTypeOfLiteralType(parameterType) : checker.getUndefinedType());
                    }
                }
                return types.length ? checker.getUnionType(types) : undefined;
            }
        }
    }

    function getTypeFromContext(node: Expression, checker: TypeChecker): Type {
        while (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
            node = <Expression>node.parent;
        }

        let contextualType = isPartOfExpression(node) && checker.getContextualType(node);
        if (contextualType && isValidInference(contextualType)) {
            return contextualType;
        }

        switch (node.parent.kind) {
            case SyntaxKind.PostfixUnaryExpression:
                return checker.getNumberType();
            case SyntaxKind.PrefixUnaryExpression:
                return getTypeFromPrefixUnaryExpressionContext(<PrefixUnaryExpression>node.parent, checker);
            case SyntaxKind.BinaryExpression:
                return getTypeFromBinaryExpressionContext(node, <BinaryExpression>node.parent, checker);
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                return getTypeFromSwitchStatementLabelContext(<CaseOrDefaultClause>node.parent, checker);
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                return getTypeFromCallExpressionContext(<CallExpression | NewExpression>node.parent, checker);
        }
    }

    function getTypeFromPrefixUnaryExpressionContext(node: PrefixUnaryExpression, checker: TypeChecker): Type {
        switch (node.operator) {
            case SyntaxKind.PlusPlusToken:
            case SyntaxKind.MinusMinusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
                return checker.getNumberType();

            case SyntaxKind.PlusToken:
                return checker.getUnionType([checker.getStringType(), checker.getNumberType()]);

            case SyntaxKind.ExclamationToken:
                // no inferences here;
                return undefined;
        }
    }

    function getTypeFromBinaryExpressionContext(node: Expression, parent: BinaryExpression, checker: TypeChecker): Type {
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
                return checker.getNumberType();

            case SyntaxKind.PlusEqualsToken:
            case SyntaxKind.PlusToken:
                const otherOperandType = checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left);
                if (isValidInference(otherOperandType) && (otherOperandType.flags & (TypeFlags.NumberLike | TypeFlags.StringLike))) {
                    return otherOperandType;
                }
                return checker.getUnionType([checker.getStringType(), checker.getNumberType()]);

            //  AssignmentOperators
            case SyntaxKind.EqualsEqualsToken:
            case SyntaxKind.EqualsEqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsToken:
                return checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left);

            case SyntaxKind.InKeyword:
                if (node === parent.left) {
                    return checker.getStringType();
                }
                break;

            // LogicalOperator
            case SyntaxKind.BarBarToken:
                if (node === parent.left &&
                    (node.parent.parent.kind === SyntaxKind.VariableDeclaration || isAssignmentExpression(node.parent.parent, /*excludeCompoundAssignment*/ true))) {
                    // var x = x || {};
                    // TODO: use getFalsyflagsOfType
                    return checker.getUnionType([checker.getTypeAtLocation(parent.right), checker.getNullType(), checker.getUndefinedType()]);
                }
                break;

            case SyntaxKind.AmpersandAmpersandToken:
            case SyntaxKind.CommaToken:
            case SyntaxKind.InstanceOfKeyword:
                // nothing to infer here
                break;
        }
    }

    function getTypeFromSwitchStatementLabelContext(parent: CaseOrDefaultClause, checker: TypeChecker): Type {
        return checker.getTypeAtLocation((<SwitchStatement>parent.parent.parent).expression);
    }

    function getTypeFromCallExpressionContext(parent: CallExpression | NewExpression, checker: TypeChecker): Type {
        const isCallExpression = parent.kind === SyntaxKind.CallExpression;
        const parameters: Symbol[] = [];

        for (let i = 0; i < parent.arguments.length; i++) {
            const type = checker.getTypeAtLocation(parent.arguments[i]);
            const symbol = checker.createSymbol(SymbolFlags.FunctionScopedVariable, `p${i}`);
            symbol.type = type;
            parameters.push(symbol);
        }

        const returnType = checker.getBaseTypeOfLiteralType(getTypeFromContext(parent, checker) || checker.getAnyType());
        const signature = checker.createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, parameters, returnType, /*typePredicate*/ undefined, parent.arguments.length, /*hasRestParameter*/ false, /*hasLiteralTypes*/ false);
        return checker.createAnonymousType(/*symbol*/ undefined, /*members*/ createMap<Symbol>(), isCallExpression ? [signature] : [], isCallExpression ? [] : [signature], /*stringIndexInfo*/undefined, /*numberIndexInfo*/ undefined);
    }

    function isValidInference(type: Type) {
        return type && !(type.flags & TypeFlags.Any) && !(type.flags & TypeFlags.Never);
    }

    function getParameterIndexInList(parameter: Identifier, list: NodeArray<ParameterDeclaration>) {
        var paramDeclaration = <ParameterDeclaration>getAncestor(parameter, SyntaxKind.Parameter);
        for (let i = 0; i < list.length; i++) {
            if (paramDeclaration === list[i]) return i;
        }
    }
}