import * as ts from "../_namespaces/ts";

const fixId = "fixConvertToMappedObjectType";
const errorCodes = [ts.Diagnostics.An_index_signature_parameter_type_cannot_be_a_literal_type_or_generic_type_Consider_using_a_mapped_object_type_instead.code];

type FixableDeclaration = ts.InterfaceDeclaration | ts.TypeAliasDeclaration;

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertToMappedTypeObject(context) {
        const { sourceFile, span } = context;
        const info = getInfo(sourceFile, span.start);
        if (!info) return undefined;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));
        const name = ts.idText(info.container.name);
        return [ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Convert_0_to_mapped_object_type, name], fixId, [ts.Diagnostics.Convert_0_to_mapped_object_type, name])];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, diag.start);
        if (info) doChange(changes, diag.file, info);
    })
});

interface Info { readonly indexSignature: ts.IndexSignatureDeclaration; readonly container: FixableDeclaration; }
function getInfo(sourceFile: ts.SourceFile, pos: number): Info | undefined {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    const indexSignature = ts.tryCast(token.parent.parent, ts.isIndexSignatureDeclaration);
    if (!indexSignature) return undefined;

    const container = ts.isInterfaceDeclaration(indexSignature.parent) ? indexSignature.parent : ts.tryCast(indexSignature.parent.parent, ts.isTypeAliasDeclaration);
    if (!container) return undefined;

    return { indexSignature, container };
}

function createTypeAliasFromInterface(declaration: FixableDeclaration, type: ts.TypeNode): ts.TypeAliasDeclaration {
    return ts.factory.createTypeAliasDeclaration(declaration.modifiers, declaration.name, declaration.typeParameters, type);
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, { indexSignature, container }: Info): void {
    const members = ts.isInterfaceDeclaration(container) ? container.members : (container.type as ts.TypeLiteralNode).members;
    const otherMembers = members.filter(member => !ts.isIndexSignatureDeclaration(member));
    const parameter = ts.first(indexSignature.parameters);
    const mappedTypeParameter = ts.factory.createTypeParameterDeclaration(/*modifiers*/ undefined, ts.cast(parameter.name, ts.isIdentifier), parameter.type);
    const mappedIntersectionType = ts.factory.createMappedTypeNode(
        ts.hasEffectiveReadonlyModifier(indexSignature) ? ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword) : undefined,
        mappedTypeParameter,
        /*nameType*/ undefined,
        indexSignature.questionToken,
        indexSignature.type,
        /*members*/ undefined);
    const intersectionType = ts.factory.createIntersectionTypeNode([
        ...ts.getAllSuperTypeNodes(container),
        mappedIntersectionType,
        ...(otherMembers.length ? [ts.factory.createTypeLiteralNode(otherMembers)] : ts.emptyArray),
    ]);
    changes.replaceNode(sourceFile, container, createTypeAliasFromInterface(container, intersectionType));
}
