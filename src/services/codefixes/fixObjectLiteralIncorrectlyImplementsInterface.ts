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


    function convertSymbolToMember(symbol: Symbol, checker: TypeChecker, objectLiteralExpression: ObjectLiteralExpression): ObjectLiteralElementLike | undefined {
        const type = checker.getTypeOfSymbolAtLocation(symbol, objectLiteralExpression);
        const typeNode = checker.typeToTypeNode(type, objectLiteralExpression)!;
        const declaration = symbol.declarations[0];

        let kind = typeNode.kind;

        kind = pickFirstTypeFromUnion(typeNode);
        kind = redirectInterfaceToObjectLiteral(kind, type);
        kind = redirectPrimitivObjectToTypeReference(declaration, kind);

        if (kind === SyntaxKind.FunctionType) {
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
        }

        let expression: Expression;

        if (isBasicKind(kind)) {
            expression = getDefaultValue(kind);
        }
        else if (kind === SyntaxKind.TupleType) {
            const tupDecl = declaration as PropertySignature;
            const tupTypNode = tupDecl.type as TupleTypeNode;
            const elements = tupTypNode.elementTypes;
            expression = getDefaultTuple(checker, elements, objectLiteralExpression);
        }
        else if (kind === SyntaxKind.TypeReference) {
            expression = expression = getDefaultClassValue(checker, declaration);
        }
        else if (kind === SyntaxKind.TypeLiteral) {
            expression = getDefaultObjectLiteral(checker, type, objectLiteralExpression);
        }
        else if (kind === SyntaxKind.IntersectionType) {
            let intersectedTypes: Type[];
            const declarations = symbol.declarations;

            if (declarations.length === 1) {
                const intersectedTyped = checker.getTypeAtLocation(declarations[0]) as IntersectionType;
                intersectedTypes = intersectedTyped.types;
            }
            else {
                intersectedTypes = declarations.map(d => checker.getTypeAtLocation(d));
            }

            expression = getDefaultIntersectionValue(checker, intersectedTypes, objectLiteralExpression);
        }
        else {
            return undefined;
        }

        return createPropertyAssignment(symbol.name, expression);


    }

    function isBasicKind(kind: SyntaxKind): boolean {
        const validKinds = [
            SyntaxKind.AnyKeyword,
            SyntaxKind.ObjectKeyword,
            SyntaxKind.StringKeyword,
            SyntaxKind.NumberKeyword,
            SyntaxKind.BigIntKeyword,
            SyntaxKind.BooleanKeyword,
            SyntaxKind.ArrayType,
            SyntaxKind.NullKeyword
        ];

        return validKinds.some(k => k === kind);
    }

    function getNewMembers(symbols: Symbol[], checker: TypeChecker, objectLiteralExpression: ObjectLiteralExpression): ObjectLiteralElementLike[] {
        return symbols.map(symbol => convertSymbolToMember(symbol, checker, objectLiteralExpression))
                      .filter(pa => pa !== undefined)
                      .map(p => p!);
    }

    function pickFirstTypeFromUnion(typeNode: TypeNode): SyntaxKind {
        let kind = typeNode.kind;
        if (isUnionTypeNode(typeNode)) {
            kind = typeNode.types[0].kind;
        }
        return kind;
    }
    function redirectInterfaceToObjectLiteral(kind: SyntaxKind, type: Type): SyntaxKind {
        if (kind === SyntaxKind.TypeReference && type.isClassOrInterface() && !type.isClass()) {
            kind = SyntaxKind.TypeLiteral;
        }
        return kind;
    }
    function redirectPrimitivObjectToTypeReference(declaration: Declaration, kind: SyntaxKind): SyntaxKind {
        if (kind === SyntaxKind.TypeLiteral && isPropertySignature(declaration)) {
            if (declaration.type!.kind === SyntaxKind.TypeReference) {
                kind = SyntaxKind.TypeReference;
            }
        }

        return kind;
    }

    function redirectPrimitivObjectForTuple(declaration: Declaration, kind: SyntaxKind): SyntaxKind {
        if (kind === SyntaxKind.TypeLiteral && isInterfaceDeclaration(declaration)) {
                kind = SyntaxKind.TypeReference;
        }

        return kind;
    }

    function getDefaultIntersectionValue(checker: TypeChecker, intersectedTypes: Type[], objectLiteralExpression: ObjectLiteralExpression): Expression {

        const intersectedProps = intersectedTypes.map(t => checker.getPropertiesOfType(t))
        .reduce((arr, ele) => {
            const newEle = ele.filter(e => !arr.some(i => i.escapedName === e.escapedName));
            return arr.concat(newEle);
        });
        const intersectStubs = getNewMembers(intersectedProps, checker, objectLiteralExpression);

        return createObjectLiteral(intersectStubs, /* multiline */ true);
    }

    function getDefaultObjectLiteral(checker: TypeChecker, type: Type, objectLiteralExpression: ObjectLiteralExpression): Expression {
        const propertiesOfObjectLiteral: Symbol[] = checker.getPropertiesOfType(type);

        const stubbedProperties = getNewMembers(propertiesOfObjectLiteral, checker, objectLiteralExpression);
        return createObjectLiteral(stubbedProperties, /* multiline */ true);
    }

    function getDefaultClassValue(checker: TypeChecker, declaration: Declaration): Expression {
        const propertySignature = declaration as PropertySignature;
        const typeOfProperty = checker.getTypeAtLocation(propertySignature);
        if (typeOfProperty.isClassOrInterface()) {
            const identifierName = checker.typeToString(typeOfProperty);
            const newObject = createNew(createIdentifier(identifierName), /* typeArguments */ undefined, /* argumentsArray */ []);
            return newObject;
        }
        else {
            const enumDeclaration = typeOfProperty.symbol.declarations[0] as EnumDeclaration;
            const enumMemberAccess = createMemberAccessForPropertyName(enumDeclaration.name, enumDeclaration.members[0].name);
            return enumMemberAccess;
        }
    }

    function getDefaultTuple(checker: TypeChecker, elementTypes: NodeArray<TypeNode>, objectLiteralExpression: ObjectLiteralExpression): Expression {

        const elements = elementTypes.map(typeNode => {
            const type = checker.getTypeAtLocation(typeNode);
            let kind = typeNode.kind;

            kind = pickFirstTypeFromUnion(typeNode);
            kind = redirectInterfaceToObjectLiteral(kind, type);

            if (isBasicKind(kind)) {
                return getDefaultValue(kind);
            }
            else {

                if (type.isIntersection() || kind === SyntaxKind.IntersectionType) {
                    let intersectedTypes: Type[];

                    if (kind !== SyntaxKind.IntersectionType) {
                        // if multiple declaration
                        intersectedTypes = [type];
                    }
                    else {
                        const intersectedTyped = type as IntersectionType;
                        // if one declaration
                        intersectedTypes = intersectedTyped.types;
                    }

                    return getDefaultIntersectionValue(checker, intersectedTypes, objectLiteralExpression);
                }

                if (kind === SyntaxKind.TypeLiteral || kind === SyntaxKind.TypeReference) {
                    const declaration = type.symbol.declarations[0];

                    kind = redirectPrimitivObjectForTuple(declaration, kind);

                    if (kind === SyntaxKind.TypeReference) {    // OK
                        return getDefaultClassValue(checker, declaration);
                    }

                    if (kind === SyntaxKind.TypeLiteral) {     // Ok
                        return getDefaultObjectLiteral(checker, type, objectLiteralExpression);
                    }
                }

                if (kind === SyntaxKind.TupleType) {
                    return getDefaultTuple(checker, (typeNode as TupleTypeNode).elementTypes, objectLiteralExpression);
                }

                if (kind === SyntaxKind.FunctionType && isFunctionTypeNode(typeNode)) {
                    return createArrowFunction(
                        typeNode.modifiers,
                        typeNode.typeParameters,
                        typeNode.parameters,
                        typeNode.type,
                        createToken(SyntaxKind.EqualsGreaterThanToken),
                        createStubbedMethodBody());
                }

                return createStringLiteral("FAILLLLLLLL");
            }
        });

        return createArrayLiteral(elements);
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
