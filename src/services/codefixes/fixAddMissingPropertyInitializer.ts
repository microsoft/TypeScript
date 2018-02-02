/* @internal */
namespace ts.codefix {
    const fixId = "addMissingPropertyInitializer";
    const errorCodes = [Diagnostics.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const info = getInfo(context.sourceFile, context.span.start);
            if (!info) return undefined;
            const { token, propertyDeclaration } = info;
            return getActionsForAddMissingInitializer(context, token, propertyDeclaration);
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const seenNames = createMap<true>();
            const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);

            return codeFixAll(context, errorCodes, (changes, diag) => {
                const info = getInfo(diag.file!, diag.start!);
                if (!info) return undefined;

                const { token, propertyDeclaration } = info;
                if (!addToSeen(seenNames, token.text)) {
                    return;
                }

                const checker = context.program.getTypeChecker();
                const initializer = getInitializer(checker, propertyDeclaration);
                if (!initializer) {
                    return undefined;
                }

                addInitializer(changes, diag.file, propertyDeclaration, initializer, newLineCharacter);
            });
        },
    });

    interface Info { token: Identifier; propertyDeclaration: PropertyDeclaration; }
    function getInfo (sourceFile: SourceFile, pos: number): Info | undefined {
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        if (!isIdentifier(token)) {
            return undefined;
        }

        const propertyDeclaration = token.parent;
        if (!isPropertyDeclaration(propertyDeclaration)) {
            return undefined;
        }

        return { token, propertyDeclaration };
    }

    function getActionsForAddMissingInitializer (context: CodeFixContext, token: Identifier, propertyDeclaration: PropertyDeclaration): CodeFixAction[] | undefined {
        const checker = context.program.getTypeChecker();
        const initializer = getInitializer(checker, propertyDeclaration);
        if (!initializer) {
            return undefined;
        }

        const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);
        const description = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Declare_property_0), [token.text]);
        const changes = textChanges.ChangeTracker.with(context, t => addInitializer(t, context.sourceFile, propertyDeclaration, initializer, newLineCharacter));
        const action = { description, changes, fixId };
        return [ action ];
    }

    function addInitializer (changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration, initializer: Expression, newLineCharacter: string): void {
        const newNode = clone(propertyDeclaration);
        newNode.initializer = initializer;
        changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, newNode, { suffix: newLineCharacter });
    }

    function getInitializer(checker: TypeChecker, propertyDeclaration: PropertyDeclaration): Expression | undefined {
        return getDefaultValueFromType(checker, checker.getTypeFromTypeNode(propertyDeclaration.type));
    }

    function getDefaultValueFromType (checker: TypeChecker, type: Type): Expression | undefined {
        if (type.getFlags() & TypeFlags.String) {
            return createLiteral("");
        }
        else if (type.getFlags() & TypeFlags.Number) {
            return createNumericLiteral("0");
        }
        else if (type.getFlags() & TypeFlags.Boolean) {
            return createFalse();
        }
        else if (type.getFlags() & TypeFlags.Literal) {
            return createLiteral((<LiteralType>type).value);
        }
        else if (type.getFlags() & TypeFlags.Union) {
            for (const t of (<UnionType>type).types) {
                const initializer = getDefaultValueFromType(checker, t);
                if (initializer) {
                    return initializer;
                }
            }
        }
        else if (type.getFlags() & TypeFlags.Object) {
            const objectType = <ObjectType>type;
            if (getObjectFlags(objectType) & ObjectFlags.Class) {
                const classDeclaration = <ClassLikeDeclaration>getClassLikeDeclarationOfSymbol(objectType.symbol);
                const constructorDeclaration = find<ClassElement, ConstructorDeclaration>(classDeclaration.members, (m): m is ConstructorDeclaration => isConstructorDeclaration(m) && !!m.body)!;
                if (constructorDeclaration &&
                    (!constructorDeclaration.parameters || !constructorDeclaration.parameters.length) &&
                    (!constructorDeclaration.typeParameters || !constructorDeclaration.typeParameters.length)) {
                    return createNew(createIdentifier(objectType.symbol.name), /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
                }
            }
        }
        return undefined;
    }
}
