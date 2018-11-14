/* @internal */
namespace ts.codefix {
    const errorCodes = [Diagnostics.Type_0_is_not_assignable_to_type_1.code];
    const fixId = "fixObjectLiteralIncorrectlyImplementsInterface";

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

        // const interfaceName = parent.type;
        const implementedType = checker.getTypeAtLocation(parent) as InterfaceType;
        const props: Symbol[] = checker.getPropertiesOfType(implementedType);

        // let str = "";

        /// show props of interface
        // for (const p of props) {
        //    str += p.name.toString();
        // }

        const existingProps = objLiteral.properties.filter(p => p.name && isIdentifier(p)).map(p => p.name!.getText());
        const setProps = new Set(existingProps);
        // const symbolTableExistingProps = objLiteral.symbol.members!;

        const nonExistingProps = props.filter(and(p => !setProps.has(p.name), symbolPointsToNonPrivateMember));
        let str = nonExistingProps.map(a => a.name).reduce((acc, val) => acc + val);



        const newProps: PropertyAssignment[] = nonExistingProps.map(symbol => {
            const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, objLiteral));
            const typeNode = checker.typeToTypeNode(type, objLiteral);

            // TODO better way to solve than via typeNode
            // TODO initialize other Objects
            // TODO complete literals
            // TODO stub functions

            switch (typeNode!.kind) {
                case SyntaxKind.StringKeyword:
                    return createPropertyAssignment(symbol.name, createStringLiteral(""));
                case SyntaxKind.NumberKeyword:
                    return createPropertyAssignment(symbol.name, createNumericLiteral("0"));
                case SyntaxKind.BigIntKeyword:
                    return createPropertyAssignment(symbol.name, createBigIntLiteral("0"));
                case SyntaxKind.BooleanKeyword:
                    return createPropertyAssignment(symbol.name, createFalse());
                default:
                    return undefined;
            }
        }).filter(pa => pa !== undefined).map(p => p!);

        a = textChanges.ChangeTracker.with(context, t => {
            newProps.forEach(pa => t.insertNodeAtObjectStart(context.sourceFile, objLiteral, pa!));
        });

        return [createCodeFixAction(fixId, a, [Diagnostics.Implement_interface_0, str], fixId, Diagnostics.Implement_all_unimplemented_interfaces)];
    }

    function getAllCodeActions(context: CodeFixAllContext): CombinedCodeActions {
        return codeFixAll(context, errorCodes, () => {
            //
        });
    }

    function symbolPointsToNonPrivateMember (symbol: Symbol) {
        return !(getModifierFlags(symbol.valueDeclaration) & ModifierFlags.Private);
    }

}
