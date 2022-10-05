/* @internal */
namespace ts.codefix {
const errorCodes = [
    ts.Diagnostics.Class_0_incorrectly_implements_interface_1.code,
    ts.Diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass.code
];
const fixId = "fixClassIncorrectlyImplementsInterface"; // TODO: share a group with fixClassDoesntImplementInheritedAbstractMember?
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const classDeclaration = getClass(sourceFile, span.start);
        return ts.mapDefined<ts.ExpressionWithTypeArguments, ts.CodeFixAction>(ts.getEffectiveImplementsTypeNodes(classDeclaration), implementedTypeNode => {
            const changes = ts.textChanges.ChangeTracker.with(context, t => addMissingDeclarations(context, implementedTypeNode, sourceFile, classDeclaration, t, context.preferences));
            return changes.length === 0 ? undefined : ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Implement_interface_0, implementedTypeNode.getText(sourceFile)], fixId, ts.Diagnostics.Implement_all_unimplemented_interfaces);
        });
    },
    fixIds: [fixId],
    getAllCodeActions(context) {
        const seenClassDeclarations = new ts.Map<number, true>();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const classDeclaration = getClass(diag.file, diag.start);
            if (ts.addToSeen(seenClassDeclarations, ts.getNodeId(classDeclaration))) {
                for (const implementedTypeNode of ts.getEffectiveImplementsTypeNodes(classDeclaration)!) {
                    addMissingDeclarations(context, implementedTypeNode, diag.file, classDeclaration, changes, context.preferences);
                }
            }
        });
    },
});

function getClass(sourceFile: ts.SourceFile, pos: number): ts.ClassLikeDeclaration {
    return ts.Debug.checkDefined(ts.getContainingClass(ts.getTokenAtPosition(sourceFile, pos)), "There should be a containing class");
}

function symbolPointsToNonPrivateMember(symbol: ts.Symbol) {
    return !symbol.valueDeclaration || !(ts.getEffectiveModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Private);
}

function addMissingDeclarations(
    context: ts.codefix.TypeConstructionContext,
    implementedTypeNode: ts.ExpressionWithTypeArguments,
    sourceFile: ts.SourceFile,
    classDeclaration: ts.ClassLikeDeclaration,
    changeTracker: ts.textChanges.ChangeTracker,
    preferences: ts.UserPreferences,
): void {
    const checker = context.program.getTypeChecker();
    const maybeHeritageClauseSymbol = getHeritageClauseSymbolTable(classDeclaration, checker);
    // Note that this is ultimately derived from a map indexed by symbol names,
    // so duplicates cannot occur.
    const implementedType = checker.getTypeAtLocation(implementedTypeNode) as ts.InterfaceType;
    const implementedTypeSymbols = checker.getPropertiesOfType(implementedType);
    const nonPrivateAndNotExistedInHeritageClauseMembers = implementedTypeSymbols.filter(ts.and(symbolPointsToNonPrivateMember, symbol => !maybeHeritageClauseSymbol.has(symbol.escapedName)));

    const classType = checker.getTypeAtLocation(classDeclaration);
    const constructor = ts.find(classDeclaration.members, m => ts.isConstructorDeclaration(m));

    if (!classType.getNumberIndexType()) {
        createMissingIndexSignatureDeclaration(implementedType, ts.IndexKind.Number);
    }
    if (!classType.getStringIndexType()) {
        createMissingIndexSignatureDeclaration(implementedType, ts.IndexKind.String);
    }

    const importAdder = ts.codefix.createImportAdder(sourceFile, context.program, preferences, context.host);
    ts.codefix.createMissingMemberNodes(classDeclaration, nonPrivateAndNotExistedInHeritageClauseMembers, sourceFile, context, preferences, importAdder, member => insertInterfaceMemberNode(sourceFile, classDeclaration, member as ts.ClassElement));
    importAdder.writeFixes(changeTracker);

    function createMissingIndexSignatureDeclaration(type: ts.InterfaceType, kind: ts.IndexKind): void {
        const indexInfoOfKind = checker.getIndexInfoOfType(type, kind);
        if (indexInfoOfKind) {
            insertInterfaceMemberNode(sourceFile, classDeclaration, checker.indexInfoToIndexSignatureDeclaration(indexInfoOfKind, classDeclaration, /*flags*/ undefined, ts.codefix.getNoopSymbolTrackerWithResolver(context))!);
        }
    }

    // Either adds the node at the top of the class, or if there's a constructor right after that
    function insertInterfaceMemberNode(sourceFile: ts.SourceFile, cls: ts.ClassLikeDeclaration | ts.InterfaceDeclaration, newElement: ts.ClassElement): void {
        if (constructor) {
            changeTracker.insertNodeAfter(sourceFile, constructor, newElement);
        }
        else {
            changeTracker.insertMemberAtStart(sourceFile, cls, newElement);
        }
    }
}

function getHeritageClauseSymbolTable(classDeclaration: ts.ClassLikeDeclaration, checker: ts.TypeChecker): ts.SymbolTable {
    const heritageClauseNode = ts.getEffectiveBaseTypeNode(classDeclaration);
    if (!heritageClauseNode) return ts.createSymbolTable();
    const heritageClauseType = checker.getTypeAtLocation(heritageClauseNode) as ts.InterfaceType;
    const heritageClauseTypeSymbols = checker.getPropertiesOfType(heritageClauseType);
    return ts.createSymbolTable(heritageClauseTypeSymbols.filter(symbolPointsToNonPrivateMember));
}
}
