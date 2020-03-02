import { Diagnostics, createMap, addToSeen, getNodeId, SourceFile, ClassLikeDeclaration, getTokenAtPosition, cast, isClassLike, UserPreferences, getEffectiveBaseTypeNode, Symbol, getModifierFlags, first, ModifierFlags } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll, TypeConstructionContext, createImportAdder, createMissingMemberNodes } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const errorCodes = [
    Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2.code,
    Diagnostics.Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1.code,
];
/* @internal */
const fixId = "fixClassDoesntImplementInheritedAbstractMember";
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const changes = ChangeTracker.with(context, t => addMissingMembers(getClass(sourceFile, span.start), sourceFile, context, t, context.preferences));
        return changes.length === 0 ? undefined : [createCodeFixAction(fixId, changes, Diagnostics.Implement_inherited_abstract_class, fixId, Diagnostics.Implement_all_inherited_abstract_classes)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        const seenClassDeclarations = createMap<true>();
        return codeFixAll(context, errorCodes, (changes, diag) => {
            const classDeclaration = getClass(diag.file, diag.start);
            if (addToSeen(seenClassDeclarations, getNodeId(classDeclaration))) {
                addMissingMembers(classDeclaration, context.sourceFile, context, changes, context.preferences);
            }
        });
    },
});
/* @internal */
function getClass(sourceFile: SourceFile, pos: number): ClassLikeDeclaration {
    // Token is the identifier in the case of a class declaration
    // or the class keyword token in the case of a class expression.
    const token = getTokenAtPosition(sourceFile, pos);
    return cast(token.parent, isClassLike);
}
/* @internal */
function addMissingMembers(classDeclaration: ClassLikeDeclaration, sourceFile: SourceFile, context: TypeConstructionContext, changeTracker: ChangeTracker, preferences: UserPreferences): void {
    const extendsNode = (getEffectiveBaseTypeNode(classDeclaration)!);
    const checker = context.program.getTypeChecker();
    const instantiatedExtendsType = checker.getTypeAtLocation(extendsNode);
    // Note that this is ultimately derived from a map indexed by symbol names,
    // so duplicates cannot occur.
    const abstractAndNonPrivateExtendsSymbols = checker.getPropertiesOfType(instantiatedExtendsType).filter(symbolPointsToNonPrivateAndAbstractMember);
    const importAdder = createImportAdder(sourceFile, context.program, preferences, context.host);
    createMissingMemberNodes(classDeclaration, abstractAndNonPrivateExtendsSymbols, context, preferences, importAdder, member => changeTracker.insertNodeAtClassStart(sourceFile, classDeclaration, member));
    importAdder.writeFixes(changeTracker);
}
/* @internal */
function symbolPointsToNonPrivateAndAbstractMember(symbol: Symbol): boolean {
    // See `codeFixClassExtendAbstractProtectedProperty.ts` in https://github.com/Microsoft/TypeScript/pull/11547/files
    // (now named `codeFixClassExtendAbstractPrivateProperty.ts`)
    const flags = getModifierFlags(first((symbol.getDeclarations()!)));
    return !(flags & ModifierFlags.Private) && !!(flags & ModifierFlags.Abstract);
}
