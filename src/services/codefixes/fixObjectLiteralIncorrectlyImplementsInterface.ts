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
        const stubbedProperties = requiredProperties.map(symbol => convertSymbolToMember(symbol, checker, objectLiteral));

        const changes = textChanges.ChangeTracker.with(context, tracker => {
            stubbedProperties.forEach(propertyAssignment => tracker.insertNodeAtObjectStart(sourceFile, objectLiteral, propertyAssignment));
        });

        return [createCodeFixActionNoFixId(fixId, changes, [Diagnostics.Implement_interface_0, interfaceName])];
    }

    interface TypeInfo {
        readonly type: Type;
        readonly kind: SyntaxKind;
        readonly typeNode: TypeNode;
        readonly wasRedirectedForIntersection: boolean;
    }

    function getTypeInfo(checker: TypeChecker, objectLiteralExpression: ObjectLiteralExpression, symbol: Symbol | undefined, oldTypeNode: TypeNode | undefined): TypeInfo {
        let type = symbol ? checker.getTypeOfSymbolAtLocation(symbol, objectLiteralExpression) : checker.getTypeAtLocation(oldTypeNode!);
        const typeNode = symbol ? checker.typeToTypeNode(type, objectLiteralExpression)! : oldTypeNode!;

        let kind = typeNode.kind;
        let wasRedirectedForIntersection = false;

        [kind, type] = pickFirstTypeFromUnion(kind, type);
        kind = redirectInterface(kind, type);
        kind = redirectAnonymousObject(kind, type);

        if (type.isIntersection()) {
            kind = SyntaxKind.IntersectionType;
            wasRedirectedForIntersection = true;
        }

        return { type, typeNode, kind, wasRedirectedForIntersection };
    }

    function convertSymbolToMember(symbol: Symbol, checker: TypeChecker, objectLiteralExpression: ObjectLiteralExpression): PropertyAssignment {
        const { kind, typeNode, type, wasRedirectedForIntersection } = getTypeInfo(checker, objectLiteralExpression, symbol, /* typeNode */ undefined);
        const declaration = symbol.declarations[0];

        if (isBasicKind(kind)) {
            return createPropertyAssignment(symbol.name, getDefaultValue(kind));
        }

        let expression: Expression;

        switch (kind) {
            case SyntaxKind.FunctionType:
                expression = getExpressionForFunctionType(checker, declaration);
                break;

            case SyntaxKind.TupleType:
                expression = getExpressionForTupleType(checker, declaration, typeNode, objectLiteralExpression);
                break;

            case SyntaxKind.TypeReference:
                expression = getDefaultClassOrEnum(checker, declaration as PropertySignature, typeNode as TypeReferenceNode);
                break;

            case SyntaxKind.TypeLiteral:
                expression = getDefaultObjectLiteral(checker, type, objectLiteralExpression);
                break;

            case SyntaxKind.IntersectionType:
                const declarations = symbol.declarations;
                const typesFromIntersection = wasRedirectedForIntersection ? [type] : declarations.map(d => checker.getTypeAtLocation(d));
                expression = getDefaultIntersection(checker, typesFromIntersection, objectLiteralExpression);
                break;

            default:
                return Debug.fail("Expression is not implemented for kind " + kind.toString());
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

    function pickFirstTypeFromUnion(kind: SyntaxKind, type: Type): [SyntaxKind, Type] {
        const checker = type.checker;
        if (kind !== SyntaxKind.BooleanKeyword && type.isUnion() && !isEnumType(type.types[0])) {
            type = type.types[0];
            const typeNode = checker.typeToTypeNode(type);
            kind = typeNode!.kind;
        }
        return [kind, type];
    }

    function redirectInterface(kind: SyntaxKind, type: Type): SyntaxKind {
        if (isInterface(type)) {
            const areAllDeclarationsInterface = type.symbol.declarations.every(d => d.kind === SyntaxKind.InterfaceDeclaration);
            if (areAllDeclarationsInterface) {
                kind = SyntaxKind.TypeLiteral;
            }
        }
        return kind;
    }

    function redirectAnonymousObject(kind: SyntaxKind, type: Type): SyntaxKind {
        if (kind !== SyntaxKind.FunctionType && isAnonymousObject(type)) {
            kind = isFunctionBehindTypeAlias(type) ? SyntaxKind.FunctionType : SyntaxKind.TypeLiteral;
        }
        return kind;
    }

    function getExpressionForFunctionType(checker: TypeChecker, declaration: Declaration): Expression{
        if (isMethodSignature(declaration)) {
            return getDefaultArrowFunction(declaration);
        }
        else {
            const propertySignature = declaration as PropertySignature;
            const typeNodeOfProperty = propertySignature.type!;
            const typeOfProperty = checker.getTypeAtLocation(typeNodeOfProperty);
            const functionTypeNode = isTypeReferenceNode(typeNodeOfProperty) ? typeOfProperty.symbol.declarations[0] : typeNodeOfProperty;

           return getDefaultArrowFunction(functionTypeNode as FunctionTypeNode);
        }
    }

    function getExpressionForTupleType(checker: TypeChecker, declaration: Declaration, typeNode: TypeNode, objectLiteral: ObjectLiteralExpression): Expression{
        const tupleTypeNode = typeNode as TupleTypeNode;
        const maybeTupleNode = getTupleNodeFromDeclaration(declaration);
        const elementTypes = maybeTupleNode ? maybeTupleNode.elementTypes : tupleTypeNode.elementTypes;
        const stubbedElements = elementTypes.map(typeNode => typeNodeToExpressionForTuple(checker, typeNode, objectLiteral));
        return createArrayLiteral(stubbedElements);
    }

    function mergeSymbolArray (accumulator: Symbol[], newArray: Symbol[]): Symbol[] {
        const updatedArray = newArray.filter(newOne => !accumulator.some(existingOne => existingOne.escapedName === newOne.escapedName));
        return accumulator.concat(updatedArray);
    }

    function getDefaultIntersection(checker: TypeChecker, typesFromIntersection: Type[], objectLiteralExpression: ObjectLiteralExpression): Expression {
        const properties = typesFromIntersection.map(t => checker.getPropertiesOfType(t))
                                                .reduce(mergeSymbolArray);
        return createStubbedObjectLiteral(properties, checker, objectLiteralExpression);
    }

    function getDefaultObjectLiteral(checker: TypeChecker, type: Type, objectLiteralExpression: ObjectLiteralExpression): Expression {
        const properties: Symbol[] = checker.getPropertiesOfType(type);
        return createStubbedObjectLiteral(properties, checker, objectLiteralExpression);
    }

    function createStubbedObjectLiteral(properties: Symbol[], checker: TypeChecker, objectLiteral: ObjectLiteralExpression): Expression {
        const stubbedProperties = properties.map(symbol => convertSymbolToMember(symbol, checker, objectLiteral));
        return createObjectLiteral(stubbedProperties, /*multiline*/ true);
    }

    function getDefaultClassOrEnum(checker: TypeChecker, declaration: PropertySignature, typeNode: TypeReferenceNode): Expression {
        const type = checker.getTypeAtLocation(declaration);

        if (type.isClassOrInterface() || isReferenceType(type)) {
            const identifierName = checker.typeToString(type);
            const nameWithoutAngleBracket = identifierName.replace(/<.*>/, "");
            const newObject = createNew(createIdentifier(nameWithoutAngleBracket), typeNode.typeArguments, /*argumentsArray*/ []);
            return newObject;
        }
        else {
            const enumDeclaration = type.symbol.declarations[0] as EnumDeclaration;
            const enumMemberAccess = createMemberAccessForPropertyName(enumDeclaration.name, enumDeclaration.members[0].name);
            return enumMemberAccess;
        }
    }

    function getDefaultArrowFunction(functionTypeNode: FunctionTypeNode | MethodSignature): Expression {
        return createArrowFunction(
            functionTypeNode.modifiers,
            functionTypeNode.typeParameters,
            functionTypeNode.parameters,
            functionTypeNode.type,
            createToken(SyntaxKind.EqualsGreaterThanToken),
            createStubbedFunctionBody()
        );
    }

    function typeNodeToExpressionForTuple(checker: TypeChecker, typeNode: TypeNode, objectLiteralExpression: ObjectLiteralExpression): Expression {
        const { kind, type, wasRedirectedForIntersection } = getTypeInfo(checker, objectLiteralExpression, /* symbol */ undefined, typeNode);

        if (isBasicKind(kind)) {
            return getDefaultValue(kind);
        }

        switch (kind) {
            case SyntaxKind.IntersectionType:
                const intersectionType = type as IntersectionType;
                const typesFromIntersection = wasRedirectedForIntersection ? [type] : intersectionType.types;
                return getDefaultIntersection(checker, typesFromIntersection, objectLiteralExpression);

            case SyntaxKind.TypeLiteral:
                return getDefaultObjectLiteral(checker, type, objectLiteralExpression);

            case SyntaxKind.TypeReference:
                const declaration = type.symbol.declarations[0];
                return getDefaultClassOrEnum(checker, declaration as PropertySignature, typeNode as TypeReferenceNode);

            case SyntaxKind.TupleType:
                const tupleTypeNode = typeNode as TupleTypeNode;
                const stubbedElements = tupleTypeNode.elementTypes.map(t => typeNodeToExpressionForTuple(checker, t, objectLiteralExpression));
                return createArrayLiteral(stubbedElements);

            case SyntaxKind.FunctionType:
                return getDefaultArrowFunction(typeNode as FunctionTypeNode);

            default:
                return Debug.fail("Expression is not implemented for " + typeNode.getText());
        }

    }

    function getDefaultValue(kind: SyntaxKind): Expression {
            switch (kind) {
                case SyntaxKind.AnyKeyword:
                    return createStringLiteral("any");

                case SyntaxKind.ObjectKeyword:
                    return createNew(createIdentifier("Object"), /*typeArguments*/ undefined, [createStringLiteral("anyObject")]);

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
                    return Debug.fail("Default value is not implemented for kind " + kind.toString());
            }
    }

    function isSymbolNonNullable(symbol: Symbol): boolean {
        const declaration = symbol.declarations[0];
        if (!isPropertySignature(declaration) || !declaration.questionToken) return true;
        return false;
    }

    function isInterface(type: Type): boolean {
        return !!(getObjectFlags(type) & ObjectFlags.Interface);
    }

    function isAnonymousObject(type: Type): boolean {
        return !!(getObjectFlags(type) & ObjectFlags.Anonymous);
    }

    function isReferenceType(type: Type): boolean {
        return !!(getObjectFlags(type) & ObjectFlags.Reference);
    }

    function isEnumType(type: Type): boolean {
        return !!(type.flags & TypeFlags.EnumLike);
    }

    function isFunctionBehindTypeAlias(type: Type): boolean {
        return type.symbol.declarations[0].kind === SyntaxKind.FunctionType;
    }

    function getTupleNodeFromDeclaration(declaration: Declaration): TupleTypeNode | undefined {
        if (!isPropertySignature(declaration) || !declaration.type || !isTupleTypeNode(declaration.type)) return undefined;
        return declaration.type;
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
