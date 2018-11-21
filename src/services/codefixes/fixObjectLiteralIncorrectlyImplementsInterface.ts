/* @internal */
namespace ts.codefix {
    const fixId = "fixObjectLiteralIncorrectlyImplementsInterface";
    let str = ""; str;

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

        kind = redirectKind(kind, declaration, typeNode, type);

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

        switch (kind) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BigIntKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.ArrayType:
            case SyntaxKind.NullKeyword:
                expression = getDefaultValue(kind);
                break;

            case SyntaxKind.TupleType:
                expression = getDefaultTuple(checker, declaration);
                break;

            case SyntaxKind.TypeReference:
                expression = getDefaultClassValue(checker, declaration);
                break;

            case SyntaxKind.TypeLiteral:
                expression = getDefaultObjectLiteral(checker, type, objectLiteralExpression);
                break;

            case SyntaxKind.IntersectionType:
                expression = getDefaultIntersectionValue(checker, symbol.declarations, objectLiteralExpression);
                break;

            default:
                return undefined;
        }

        return createPropertyAssignment(symbol.name, expression);


    }

    function getNewMembers(symbols: Symbol[], checker: TypeChecker, objectLiteralExpression: ObjectLiteralExpression): ObjectLiteralElementLike[] {
        return symbols.map(symbol => convertSymbolToMember(symbol, checker, objectLiteralExpression))
                      .filter(pa => pa !== undefined)
                      .map(p => p!);
    }

    function redirectKind(kind: SyntaxKind, declaration: Declaration, typeNode: TypeNode, type: Type): SyntaxKind {
        let newKind = kind;
        if (isUnionTypeNode(typeNode)) {
            newKind = typeNode.types[0].kind;
        }

        if (isTypeReferenceNode(typeNode)) {
            if (type.isClassOrInterface() && !type.isClass()) {
                newKind = SyntaxKind.TypeLiteral;
            }
        }

        if (newKind === SyntaxKind.TypeLiteral) {
            const propertySignature = declaration as PropertySignature;

            if (propertySignature.type!.kind === SyntaxKind.TypeReference) {
                newKind = SyntaxKind.TypeReference;
            }
        }

        return newKind;
    }

    function getDefaultIntersectionValue(checker: TypeChecker, declarations: Declaration[], objectLiteralExpression: ObjectLiteralExpression): Expression {
        let intersectedTypes: Type[];

        if (declarations.length === 1) {
            const intersectedTyped = checker.getTypeAtLocation(declarations[0]) as IntersectionType;
            intersectedTypes = intersectedTyped.types;
        }
        else {
            intersectedTypes = declarations.map(d => checker.getTypeAtLocation(d));
        }
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
        // TODO replace with type
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

    function getDefaultTuple(checker: TypeChecker, declaration: Declaration): Expression {
        const tupDecl = declaration as PropertySignature;
        const tupTypNode = tupDecl.type as TupleTypeNode;
        tupTypNode;

        const tt = checker.getTypeAtLocation(tupTypNode.elementTypes[0]);
        str = tt.symbol.name;

        str = tupTypNode.elementTypes.map(e => e.kind.toString()).reduce((acc, val) => acc + " " + val);

        const a = getDefaultClassValue(checker, tt.symbol.declarations[0]);

        // const elementKinds = tupTypNode.elementTypes.map(e => e.kind);
        // const defaultExpressions = elementKinds.map(getDefaultValue);

        return createArrayLiteral([a]);
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
