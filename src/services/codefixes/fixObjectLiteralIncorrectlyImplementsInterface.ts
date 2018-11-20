/* @internal */
namespace ts.codefix {
    const fixId = "fixObjectLiteralIncorrectlyImplementsInterface";

    registerCodeFix({
        errorCodes: [Diagnostics.Type_0_is_not_assignable_to_type_1.code],
        getCodeActions: getActionsForVariableDeclaration
    });

    registerCodeFix({
        errorCodes: [Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code],
        getCodeActions: getActionsForFunctionArgument
    });

    function getActionsForVariableDeclaration(context: CodeFixContext): CodeFixAction[] | undefined {
        const { sourceFile, span } = context;

        const token = getTokenAtPosition(sourceFile, span.start);
        const parent = token.parent;

        if (!isVariableDeclaration(parent) || !parent.type || !parent.initializer || !isObjectLiteralExpression(parent.initializer)) return undefined;

        return getCodeActions(context, parent, parent.initializer);
    }

    function getActionsForFunctionArgument(context: CodeFixContext): CodeFixAction[] | undefined {
        const { program, sourceFile, span } = context;
        const checker = program.getTypeChecker();

        const token = getTokenAtPosition(sourceFile, span.start);
        const objectLiteral = token.parent;
        const callExpression = objectLiteral.parent;

        if (!isObjectLiteralExpression(objectLiteral) || !isCallExpression(callExpression)) return undefined;

        const functionSymbol = checker.getSymbolAtLocation(callExpression.expression)!;
        const argumentPosition = callExpression.arguments.findIndex(a => a === objectLiteral);
        const functionDeclaration = functionSymbol.declarations[0];

        if (!isFunctionLikeDeclaration(functionDeclaration)) return undefined;
        const parameter = functionDeclaration.parameters[argumentPosition];

        return getCodeActions(context, parameter, objectLiteral);
    }

    function getCodeActions(context: CodeFixContext, node: Node, objectLiteral: ObjectLiteralExpression): CodeFixAction[] {
        const { program, sourceFile } = context;
        const checker = program.getTypeChecker();

        const interfaceType = checker.getTypeAtLocation(node);
        const interfaceProperties: Symbol[] = checker.getPropertiesOfType(interfaceType);
        const interfaceName = checker.typeToString(interfaceType);

        const existingMembers = objectLiteral.symbol.members;
        const existingProperties: SymbolTable = existingMembers ? existingMembers : createSymbolTable();

        const requiredProperties = interfaceProperties.filter(and(p => !existingProperties.has(p.escapedName), symbolPointsToNonNullable));
        const newProperties: ObjectLiteralElementLike[] = getNewMembers(requiredProperties, checker, objectLiteral);

        const changes = textChanges.ChangeTracker.with(context, tracker => {
            newProperties.forEach(propertyAssignment => tracker.insertNodeAtObjectStart(sourceFile, objectLiteral, propertyAssignment));
        });

        return [createCodeFixActionNoFixId(fixId, changes, [Diagnostics.Implement_interface_0, interfaceName])];
    }

    function getNewMembers(symbols: Symbol[], checker: TypeChecker, objectLiteralExpression: ObjectLiteralExpression): ObjectLiteralElementLike[] {
        return symbols.map(symbol => {
            const type = checker.getTypeOfSymbolAtLocation(symbol, objectLiteralExpression);
            const typeNode = checker.typeToTypeNode(type, objectLiteralExpression)!;
            const declaration = symbol.declarations[0];

            let kind = typeNode.kind;

            if (isUnionTypeNode(typeNode)) {
                kind = typeNode.types[0].kind;
            }

            if (kind === SyntaxKind.TypeReference) {
                if (type.isClassOrInterface() && !type.isClass()) {
                    kind = SyntaxKind.TypeLiteral;
                }
            }

            switch (kind) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.ObjectKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BigIntKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.ArrayType:
                case SyntaxKind.NullKeyword:
                    return createPropertyAssignment(symbol.name, getDefaultValue(kind));

                case SyntaxKind.FunctionType:
                    const methodSignature = declaration as MethodSignature;
                    return createMethod(
                        methodSignature.decorators,
                        methodSignature.modifiers,
                        /* asteriskToken */ undefined,
                        methodSignature.name,
                        methodSignature.questionToken,
                        methodSignature.typeParameters,
                        methodSignature.parameters,
                        methodSignature.type,
                        createStubbedMethodBody()
                    );

                case SyntaxKind.TypeReference:
                    const propertySignature = declaration as PropertySignature;
                    const typeOfProperty = checker.getTypeAtLocation(propertySignature);
                    if (typeOfProperty.isClass()) {
                        const identifierName = checker.typeToString(typeOfProperty);
                        const newObject = createNew(createIdentifier(identifierName), /* typeArguments */ undefined, /* argumentsArray */ []);
                        return createPropertyAssignment(symbol.name, newObject);
                    }
                    else {
                        const enumDeclaration = typeOfProperty.symbol.declarations[0] as EnumDeclaration;
                        const enumMemberAccess = createMemberAccessForPropertyName(enumDeclaration.name, enumDeclaration.members[0].name);
                        return createPropertyAssignment(symbol.name, enumMemberAccess);
                    }

                case SyntaxKind.TypeLiteral:
                    const propertySignatureTL = declaration as PropertySignature;
                    const typeOfPropertyTL = checker.getTypeAtLocation(propertySignatureTL);

                    if (propertySignatureTL.type!.kind === SyntaxKind.TypeReference) {
                        const primitiveName = checker.typeToString(typeOfPropertyTL);
                        const newObject = createNew(createIdentifier(primitiveName), /* typeArguments */ undefined, /* argumentsArray */ []);
                        return createPropertyAssignment(symbol.name, newObject);
                    }

                    const propertiesOfObjectLiteral: Symbol[] = checker.getPropertiesOfType(type);

                    const stubbedProperties = getNewMembers(propertiesOfObjectLiteral, checker, objectLiteralExpression);
                    const subObjectLiteral = createObjectLiteral(stubbedProperties, /* multiline */ true);

                    return createPropertyAssignment(symbol.name, subObjectLiteral);

                case SyntaxKind.IntersectionType:
                    let intersectedTypes: Type[];

                    if (symbol.declarations.length === 1) {
                        const intersectedTyped = checker.getTypeAtLocation(symbol.declarations[0]) as IntersectionType;
                        intersectedTypes = intersectedTyped.types;
                    }
                    else {
                        intersectedTypes = symbol.declarations.map(d => checker.getTypeAtLocation(d));
                    }
                    const intersectedProps = intersectedTypes.map(t => checker.getPropertiesOfType(t))
                    .reduce((arr, ele) => {
                        const newEle = ele.filter(e => !arr.some(i => i.escapedName === e.escapedName));
                        return arr.concat(newEle);
                    });
                    const intersectStubs = getNewMembers(intersectedProps, checker, objectLiteralExpression);

                    const interObjLiteral = createObjectLiteral(intersectStubs, /* multiline */ true);
                    return createPropertyAssignment(symbol.name, interObjLiteral);
                default:
                    return undefined;
            }
        }).filter(pa => pa !== undefined).map(p => p!);
    }

    function getDefaultValue(kind: SyntaxKind): Expression {
            switch (kind) {
                case SyntaxKind.AnyKeyword:
                    return createStringLiteral("any");

                case SyntaxKind.ObjectKeyword:
                    return createNew(createIdentifier("Object"), /* */ undefined, []);

                case SyntaxKind.StringKeyword:
                    return createStringLiteral("");

                case SyntaxKind.NumberKeyword:
                    return createNumericLiteral("0");

                case SyntaxKind.BigIntKeyword:
                    return createBigIntLiteral("0");

                case SyntaxKind.BooleanKeyword:
                    return createFalse();

                case SyntaxKind.ArrayType:
                    return createArrayLiteral();

                case SyntaxKind.NullKeyword:
                    return createNull();

                default:
                    return Debug.fail("Default value not implemented");
            }
    }

    function symbolPointsToNonNullable(symbol: Symbol): boolean {
        const declaration = symbol.declarations[0];
        if (!isPropertySignature(declaration) || !declaration.questionToken) return true;
        return false;
    }

    function createStubbedMethodBody(): Block {
        return createBlock(
            [createThrow(
                createNew(
                    createIdentifier("Error"),
                    /*typeArguments*/ undefined,
                    [createStringLiteral("Method not implemented.")]))],
            /*multiline*/ true);
    }

}
