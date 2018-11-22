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

        const requiredProperties = interfaceProperties.filter(and(p => !existingProperties.has(p.escapedName), isSymbolNonNullable));
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
                createStubbedFunctionBody()
            );
        }

        let expression: Expression;

        if (isBasicKind(kind)) {
            expression = getDefaultValue(kind);
        }
        else if (kind === SyntaxKind.TupleType) {
            if (!isPropertySignature(declaration) || !declaration.type || !isTupleTypeNode(declaration.type)) return undefined;
            const elements = declaration.type.elementTypes;
            const stubbedElements = elements.map(typeNode => typeNodeToStubbedExpression(checker, typeNode, objectLiteralExpression));
            expression = createArrayLiteral(stubbedElements);
        }
        else if (kind === SyntaxKind.TypeReference) {
            if (!isPropertySignature(declaration)) return undefined;
            expression = expression = getDefaultClass(checker, declaration);
        }
        else if (kind === SyntaxKind.TypeLiteral) {
            expression = getDefaultObjectLiteral(checker, type, objectLiteralExpression);
        }
        else if (kind === SyntaxKind.IntersectionType) {
            let typesFromIntersection: Type[];
            const declarations = symbol.declarations;

            if (declarations.length === 1) {
                const intersectionType = type as IntersectionType;
                typesFromIntersection = intersectionType.types;
            }
            else {
                typesFromIntersection = declarations.map(d => checker.getTypeAtLocation(d));
            }

            expression = getDefaultIntersection(checker, typesFromIntersection, objectLiteralExpression);
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

    const mergeSymbolArray = (accumulator: Symbol[], newArray: Symbol[]) => {
        const updatedArray = newArray.filter(newOne => !accumulator.some(existingOne => existingOne.escapedName === newOne.escapedName));
        return accumulator.concat(updatedArray);
    };

    function getDefaultIntersection(checker: TypeChecker, typesFromIntersection: Type[], objectLiteralExpression: ObjectLiteralExpression): Expression {
        const properties = typesFromIntersection.map(t => checker.getPropertiesOfType(t))
                                                   .reduce(mergeSymbolArray);
        return createStubbedObjectLiteral(properties, checker, objectLiteralExpression);
    }

    function getDefaultObjectLiteral(checker: TypeChecker, type: Type, objectLiteralExpression: ObjectLiteralExpression): Expression {
        const properties: Symbol[] = checker.getPropertiesOfType(type);
        return createStubbedObjectLiteral(properties, checker, objectLiteralExpression);
    }

    function createStubbedObjectLiteral(properties: Symbol[], checker: TypeChecker, objectLiteralExpression: ObjectLiteralExpression): Expression {
        const stubbedProperties = getNewMembers(properties, checker, objectLiteralExpression);
        return createObjectLiteral(stubbedProperties, /*multiline*/ true);
    }

    function getDefaultClass(checker: TypeChecker, declaration: PropertySignature): Expression {
        const typeOfProperty = checker.getTypeAtLocation(declaration);

        if (typeOfProperty.isClassOrInterface()) {
            const identifierName = checker.typeToString(typeOfProperty);
            const newObject = createNew(createIdentifier(identifierName), /*typeArguments*/ undefined, /*argumentsArray*/ []);
            return newObject;
        }
        else {
            const enumDeclaration = typeOfProperty.symbol.declarations[0] as EnumDeclaration;
            const enumMemberAccess = createMemberAccessForPropertyName(enumDeclaration.name, enumDeclaration.members[0].name);
            return enumMemberAccess;
        }
    }

    function typeNodeToStubbedExpression(checker: TypeChecker, typeNode: TypeNode, objectLiteralExpression: ObjectLiteralExpression): Expression {

        const type = checker.getTypeAtLocation(typeNode);
        let kind = typeNode.kind;

        kind = pickFirstTypeFromUnion(typeNode);
        kind = redirectInterfaceToObjectLiteral(kind, type);

        if (isBasicKind(kind)) {
            return getDefaultValue(kind);
        }
        else if (type.isIntersection() || kind === SyntaxKind.IntersectionType) {
            let typesFromIntersection: Type[];

            if (kind !== SyntaxKind.IntersectionType) {
                // if multiple declaration
                typesFromIntersection = [type];
            }
            else {
                const intersectedTyped = type as IntersectionType;
                // if one declaration
                typesFromIntersection = intersectedTyped.types;
            }

            return getDefaultIntersection(checker, typesFromIntersection, objectLiteralExpression);
        }
        else if (kind === SyntaxKind.TypeLiteral || kind === SyntaxKind.TypeReference) {
            const declaration = type.symbol.declarations[0];

            kind = redirectPrimitivObjectForTuple(declaration, kind);

            if (kind === SyntaxKind.TypeReference) {
                return getDefaultClass(checker, declaration as PropertySignature);
            }

            if (kind === SyntaxKind.TypeLiteral) {
                return getDefaultObjectLiteral(checker, type, objectLiteralExpression);
            }
        }
        else if (kind === SyntaxKind.TupleType) {
            const typeNodes = (typeNode as TupleTypeNode).elementTypes;
            const stubbedElements = typeNodes.map(t => typeNodeToStubbedExpression(checker, t, objectLiteralExpression));
            return createArrayLiteral(stubbedElements);
        }
        else if (kind === SyntaxKind.FunctionType && isFunctionTypeNode(typeNode)) {
            return createArrowFunction(
                typeNode.modifiers,
                typeNode.typeParameters,
                typeNode.parameters,
                typeNode.type,
                createToken(SyntaxKind.EqualsGreaterThanToken),
                createStubbedFunctionBody());
        }

        return createStringLiteral("FAILLLLLLLL");

    }

    function getDefaultValue(kind: SyntaxKind): Expression {
            switch (kind) {
                case SyntaxKind.AnyKeyword:
                    return createStringLiteral("any");

                case SyntaxKind.ObjectKeyword:
                    return createNew(createIdentifier("Object"), /*typeArguments*/ undefined, []);

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
                    return Debug.fail("Default value is not implemented for " + kind.toString());
            }
    }

    function isSymbolNonNullable(symbol: Symbol): boolean {
        const declaration = symbol.declarations[0];
        if (!isPropertySignature(declaration) || !declaration.questionToken) return true;
        return false;
    }

    function createStubbedFunctionBody(): Block {
        return createBlock(
            [createThrow(
                createNew(
                    createIdentifier("Error"),
                    /*typeArguments*/ undefined,
                    [createStringLiteral("Function not implemented.")]))],
            /*multiline*/ true);
    }

}
