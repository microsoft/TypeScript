/* @internal */
namespace ts.codefix {
const errorCodes = [
    ts.Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2.code,
    ts.Diagnostics.Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1.code,
];
const fixId = "fixClassDoesntImplementInheritedAbstractMember";
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixClassNotImplementingInheritedMembers(context) {
        const { sourceFile, span } = context;
        const changes = ts.textChanges.ChangeTracker.with(context, t =>
            addMissingMembers(getClass(sourceFile, span.start), sourceFile, context, t, context.preferences));
        return changes.length === 0 ? undefined : [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Implement_inherited_abstract_class, fixId, ts.Diagnostics.Implement_all_inherited_abstract_classes)];
    },
    fixIds: [fixId],
    getAllCodeActions: function getAllCodeActionsToFixClassDoesntImplementInheritedAbstractMember(context) {
        const seenClassDeclarations = new ts.Map<number, true>();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const classDeclaration = getClass(diag.file, diag.start);
            if (ts.addToSeen(seenClassDeclarations, ts.getNodeId(classDeclaration))) {
                addMissingMembers(classDeclaration, context.sourceFile, context, changes, context.preferences);
            }
        });
    },
});

function getClass(sourceFile: ts.SourceFile, pos: number): ts.ClassLikeDeclaration {
    // Token is the identifier in the case of a class declaration
    // or the class keyword token in the case of a class expression.
    const token = ts.getTokenAtPosition(sourceFile, pos);
    return ts.cast(token.parent, ts.isClassLike);
}

function addMissingMembers(classDeclaration: ts.ClassLikeDeclaration, sourceFile: ts.SourceFile, context: ts.codefix.TypeConstructionContext, changeTracker: ts.textChanges.ChangeTracker, preferences: ts.UserPreferences): void {
    const extendsNode = ts.getEffectiveBaseTypeNode(classDeclaration)!;
    const checker = context.program.getTypeChecker();
    const instantiatedExtendsType = checker.getTypeAtLocation(extendsNode);

    // Note that this is ultimately derived from a map indexed by symbol names,
    // so duplicates cannot occur.
    const abstractAndNonPrivateExtendsSymbols = checker.getPropertiesOfType(instantiatedExtendsType).filter(symbolPointsToNonPrivateAndAbstractMember);

    const importAdder = ts.codefix.createImportAdder(sourceFile, context.program, preferences, context.host);
    ts.codefix.createMissingMemberNodes(classDeclaration, abstractAndNonPrivateExtendsSymbols, sourceFile, context, preferences, importAdder, member => changeTracker.insertMemberAtStart(sourceFile, classDeclaration, member as ts.ClassElement));
    importAdder.writeFixes(changeTracker);
}

function symbolPointsToNonPrivateAndAbstractMember(symbol: ts.Symbol): boolean {
    // See `codeFixClassExtendAbstractProtectedProperty.ts` in https://github.com/Microsoft/TypeScript/pull/11547/files
    // (now named `codeFixClassExtendAbstractPrivateProperty.ts`)
    const flags = ts.getSyntacticModifierFlags(ts.first(symbol.getDeclarations()!));
    return !(flags & ts.ModifierFlags.Private) && !!(flags & ts.ModifierFlags.Abstract);
}
}
