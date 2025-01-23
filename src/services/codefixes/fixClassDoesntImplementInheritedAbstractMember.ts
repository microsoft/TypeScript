import {
    codeFixAll,
    createCodeFixAction,
    createImportAdder,
    createMissingMemberNodes,
    registerCodeFix,
    TypeConstructionContext,
} from "../_namespaces/ts.codefix.js";
import {
    addToSeen,
    cast,
    ClassElement,
    ClassLikeDeclaration,
    Diagnostics,
    first,
    getEffectiveBaseTypeNode,
    getNodeId,
    getSyntacticModifierFlags,
    getTokenAtPosition,
    isClassLike,
    ModifierFlags,
    SourceFile,
    Symbol,
    textChanges,
    UserPreferences,
} from "../_namespaces/ts.js";

const errorCodes = [
    Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2.code,
    Diagnostics.Non_abstract_class_0_is_missing_implementations_for_the_following_members_of_1_Colon_2.code,
    Diagnostics.Non_abstract_class_0_is_missing_implementations_for_the_following_members_of_1_Colon_2_and_3_more.code,
    Diagnostics.Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1.code,
    Diagnostics.Non_abstract_class_expression_is_missing_implementations_for_the_following_members_of_0_Colon_1.code,
    Diagnostics.Non_abstract_class_expression_is_missing_implementations_for_the_following_members_of_0_Colon_1_and_2_more.code,
];

const fixId = "fixClassDoesntImplementInheritedAbstractMember";
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixClassNotImplementingInheritedMembers(context) {
        const { sourceFile, span } = context;
        const changes = textChanges.ChangeTracker.with(context, t => addMissingMembers(getClass(sourceFile, span.start), sourceFile, context, t, context.preferences));
        return changes.length === 0 ? undefined : [createCodeFixAction(fixId, changes, Diagnostics.Implement_inherited_abstract_class, fixId, Diagnostics.Implement_all_inherited_abstract_classes)];
    },
    fixIds: [fixId],
    getAllCodeActions: function getAllCodeActionsToFixClassDoesntImplementInheritedAbstractMember(context) {
        const seenClassDeclarations = new Set<number>();
        return codeFixAll(context, errorCodes, (changes, diag) => {
            const classDeclaration = getClass(diag.file, diag.start);
            if (addToSeen(seenClassDeclarations, getNodeId(classDeclaration))) {
                addMissingMembers(classDeclaration, context.sourceFile, context, changes, context.preferences);
            }
        });
    },
});

function getClass(sourceFile: SourceFile, pos: number): ClassLikeDeclaration {
    // Token is the identifier in the case of a class declaration
    // or the class keyword token in the case of a class expression.
    const token = getTokenAtPosition(sourceFile, pos);
    return cast(token.parent, isClassLike);
}

function addMissingMembers(classDeclaration: ClassLikeDeclaration, sourceFile: SourceFile, context: TypeConstructionContext, changeTracker: textChanges.ChangeTracker, preferences: UserPreferences): void {
    const extendsNode = getEffectiveBaseTypeNode(classDeclaration)!;
    const checker = context.program.getTypeChecker();
    const instantiatedExtendsType = checker.getTypeAtLocation(extendsNode);

    // Note that this is ultimately derived from a map indexed by symbol names,
    // so duplicates cannot occur.
    const abstractAndNonPrivateExtendsSymbols = checker.getPropertiesOfType(instantiatedExtendsType).filter(symbolPointsToNonPrivateAndAbstractMember);

    const importAdder = createImportAdder(sourceFile, context.program, preferences, context.host);
    createMissingMemberNodes(classDeclaration, abstractAndNonPrivateExtendsSymbols, sourceFile, context, preferences, importAdder, member => changeTracker.insertMemberAtStart(sourceFile, classDeclaration, member as ClassElement));
    importAdder.writeFixes(changeTracker);
}

function symbolPointsToNonPrivateAndAbstractMember(symbol: Symbol): boolean {
    // See `codeFixClassExtendAbstractProtectedProperty.ts` in https://github.com/Microsoft/TypeScript/pull/11547/files
    // (now named `codeFixClassExtendAbstractPrivateProperty.ts`)
    const flags = getSyntacticModifierFlags(first(symbol.getDeclarations()!));
    return !(flags & ModifierFlags.Private) && !!(flags & ModifierFlags.Abstract);
}
