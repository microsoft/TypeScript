/* @internal */
namespace ts.codefix {
    const errorCodes = [Diagnostics.Class_0_incorrectly_implements_interface_1.code,
                        Diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass.code];
    const fixId = "fixClassIncorrectlyImplementsInterface"; // TODO: share a group with fixClassDoesntImplementInheritedAbstractMember?
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const classDeclaration = getClass(sourceFile, span.start);
            return mapDefined<ExpressionWithTypeArguments, CodeFixAction>(getClassImplementsHeritageClauseElements(classDeclaration), implementedTypeNode => {
                const changes = textChanges.ChangeTracker.with(context, t => addMissingDeclarations(context, implementedTypeNode, sourceFile, classDeclaration, t, context.preferences));
                return changes.length === 0 ? undefined : createCodeFixAction(fixId, changes, [Diagnostics.Implement_interface_0, implementedTypeNode.getText(sourceFile)], fixId, Diagnostics.Implement_all_unimplemented_interfaces);
            });
        },
        fixIds: [fixId],
        getAllCodeActions(context) {
            const seenClassDeclarations = createMap<true>();
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const classDeclaration = getClass(diag.file, diag.start);
                if (addToSeen(seenClassDeclarations, getNodeId(classDeclaration))) {
                    for (const implementedTypeNode of getClassImplementsHeritageClauseElements(classDeclaration)!) {
                        addMissingDeclarations(context, implementedTypeNode, diag.file, classDeclaration, changes, context.preferences);
                    }
                }
            });
        },
    });

    function getClass(sourceFile: SourceFile, pos: number): ClassLikeDeclaration {
        return Debug.assertDefined(getContainingClass(getTokenAtPosition(sourceFile, pos)));
    }

    function symbolPointsToNonPrivateMember (symbol: Symbol) {
        return !(getModifierFlags(symbol.valueDeclaration) & ModifierFlags.Private);
    }

    function addMissingDeclarations(
        context: TypeConstructionContext,
        implementedTypeNode: ExpressionWithTypeArguments,
        sourceFile: SourceFile,
        classDeclaration: ClassLikeDeclaration,
        changeTracker: textChanges.ChangeTracker,
        preferences: UserPreferences,
    ): void {
        const checker = context.program.getTypeChecker();
        const maybeHeritageClauseSymbol = getHeritageClauseSymbolTable(classDeclaration, checker);
        // Note that this is ultimately derived from a map indexed by symbol names,
        // so duplicates cannot occur.
        const implementedType = checker.getTypeAtLocation(implementedTypeNode) as InterfaceType;
        const implementedTypeSymbols = checker.getPropertiesOfType(implementedType);
        const nonPrivateAndNotExistedInHeritageClauseMembers = implementedTypeSymbols.filter(and(symbolPointsToNonPrivateMember, symbol => !maybeHeritageClauseSymbol.has(symbol.escapedName)));

        const classType = checker.getTypeAtLocation(classDeclaration);

        if (!classType.getNumberIndexType()) {
            createMissingIndexSignatureDeclaration(implementedType, IndexKind.Number);
        }
        if (!classType.getStringIndexType()) {
            createMissingIndexSignatureDeclaration(implementedType, IndexKind.String);
        }

        createMissingMemberNodes(classDeclaration, nonPrivateAndNotExistedInHeritageClauseMembers, context, preferences, member => changeTracker.insertNodeAtClassStart(sourceFile, classDeclaration, member));

        function createMissingIndexSignatureDeclaration(type: InterfaceType, kind: IndexKind): void {
            const indexInfoOfKind = checker.getIndexInfoOfType(type, kind);
            if (indexInfoOfKind) {
                changeTracker.insertNodeAtClassStart(sourceFile, classDeclaration, checker.indexInfoToIndexSignatureDeclaration(indexInfoOfKind, kind, classDeclaration, /*flags*/ undefined, getNoopSymbolTrackerWithResolver(context))!);
            }
        }
    }

    function getHeritageClauseSymbolTable (classDeclaration: ClassLikeDeclaration, checker: TypeChecker): SymbolTable {
        const heritageClauseNode = getEffectiveBaseTypeNode(classDeclaration);
        if (!heritageClauseNode) return createSymbolTable();
        const heritageClauseType = checker.getTypeAtLocation(heritageClauseNode) as InterfaceType;
        const heritageClauseTypeSymbols = checker.getPropertiesOfType(heritageClauseType);
        return createSymbolTable(heritageClauseTypeSymbols.filter(symbolPointsToNonPrivateMember));
    }
}
