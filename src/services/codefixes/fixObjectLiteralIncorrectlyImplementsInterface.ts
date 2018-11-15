/* @internal */
namespace ts.codefix {
    const errorCodes = [Diagnostics.Type_0_is_not_assignable_to_type_1.code];
    const fixId = "fixObjectLiteralIncorrectlyImplementsInterface";
    let str = ""

    registerCodeFix({
        errorCodes,
        getCodeActions,
        fixIds: [fixId],
        getAllCodeActions
    });

    function getCodeActions(context: CodeFixContext): CodeFixAction[] | undefined {
        let a: FileTextChanges[] = [];

        const { program, sourceFile, span } = context;
        const checker = program.getTypeChecker();

        const token = getTokenAtPosition(sourceFile, span.start);

        const parent = token.parent;
        if (!isVariableDeclaration(parent) || !parent.type || !parent.initializer || !isObjectLiteralExpression(parent.initializer)) return undefined;
        const objLiteral: ObjectLiteralExpression = parent.initializer;

        const implementedType = checker.getTypeAtLocation(parent);
        const props: Symbol[] = checker.getPropertiesOfType(implementedType);

        const existingMem = objLiteral.symbol.members;
        const symbolTableExistingProps: SymbolTable = existingMem ? existingMem : createSymbolTable();

        const nonExistingProps = props.filter(and(and(p => !symbolTableExistingProps.has(p.escapedName), symbolPointsToNonPrivateMember), symbolPointsToNonNullable));
        str = nonExistingProps.map(p => p.name).reduce((acc, val) => acc + " " + val);

        const newProps: ObjectLiteralElementLike[] = getNewMembers(nonExistingProps, checker, objLiteral);

        a = textChanges.ChangeTracker.with(context, t => {
            newProps.forEach(pa => t.insertNodeAtObjectStart(context.sourceFile, objLiteral, pa!));
        });

        return [createCodeFixAction(fixId, a, [Diagnostics.Implement_interface_0, str], fixId, Diagnostics.Implement_all_unimplemented_interfaces)];
    }

    function getNewMembers(symbols: Symbol[], checker: TypeChecker, objLiteral: ObjectLiteralExpression): ObjectLiteralElementLike[] {
        return symbols.map(symbol => {
            const type = checker.getTypeOfSymbolAtLocation(symbol, objLiteral);
            const typeNode = checker.typeToTypeNode(type, objLiteral)!;

            let kind = typeNode.kind;

            if (isUnionTypeNode(typeNode)) {
                kind = typeNode.types[0].kind;
            }

            if (kind === SyntaxKind.TypeReference) {
                const tInterface = checker.getTypeAtLocation(symbol.declarations[0]);
                if (tInterface.isClassOrInterface() && !tInterface.isClass()) {
                    kind = SyntaxKind.TypeLiteral;
                }
            }

            switch (kind) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                    return createPropertyAssignment(symbol.name, createStringLiteral(""));

                case SyntaxKind.NumberKeyword:
                    return createPropertyAssignment(symbol.name, createNumericLiteral("0"));

                case SyntaxKind.BigIntKeyword:
                    return createPropertyAssignment(symbol.name, createBigIntLiteral("0"));

                case SyntaxKind.BooleanKeyword:
                    return createPropertyAssignment(symbol.name, createFalse());

                case SyntaxKind.ArrayType:
                    return createPropertyAssignment(symbol.name, createArrayLiteral());

                case SyntaxKind.NullKeyword:
                    return createPropertyAssignment(symbol.name, createNull());

                case SyntaxKind.FunctionType:
                    const decli = symbol.declarations[0] as MethodDeclaration;

                    return createMethod(
                        decli.decorators,
                        decli.modifiers,
                        decli.asteriskToken,
                        decli.name,
                        decli.questionToken,
                        decli.typeParameters,
                        decli.parameters,
                        decli.type,
                        createStubbedMethodBody()
                    );

                case SyntaxKind.TypeReference:

                    const de = symbol.declarations[0] as PropertySignature;
                    const newObj = createNew(createIdentifier(de.type!.getText()), [], []);
                    return createPropertyAssignment(symbol.name, newObj);

                case SyntaxKind.TypeLiteral:
                    const te = checker.getTypeAtLocation(symbol.declarations[0]);
                    const neuvoP: Symbol[] = checker.getPropertiesOfType(te);

                    const neuvoStubbed = getNewMembers(neuvoP, checker, objLiteral);
                    const subObjLiteral = createObjectLiteral(neuvoStubbed, /* multiline */ true);

                    return createPropertyAssignment(symbol.name, subObjLiteral);

                case SyntaxKind.IntersectionType:
                    let intersectedTypes: Type[]

                    if (symbol.declarations.length === 1){
                        const intersectedTyped = checker.getTypeAtLocation(symbol.declarations[0]) as IntersectionType
                        intersectedTypes = intersectedTyped.types;
                    }
                    else
                    {
                        intersectedTypes = symbol.declarations.map(d => checker.getTypeAtLocation(d))
                    }
                    const intersectedProps = intersectedTypes.map(t => checker.getPropertiesOfType(t)).reduce((arr, ele) => arr.concat(ele));
                    const intersectStubs = getNewMembers(intersectedProps, checker, objLiteral);
                    
                    const interObjLiteral = createObjectLiteral(intersectStubs, /* multiline */ true);
                    return createPropertyAssignment(symbol.name, interObjLiteral);
                default:
                    return undefined;
            }
        }).filter(pa => pa !== undefined).map(p => p!);
    }

    function getAllCodeActions(context: CodeFixAllContext): CombinedCodeActions {
        return codeFixAll(context, errorCodes, () => {
            //
        });
    }

    function symbolPointsToNonPrivateMember (symbol: Symbol) {
        return symbol.declarations.map(d => !(getModifierFlags(d) & ModifierFlags.Private)).reduce((r,l) => r && l);
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
