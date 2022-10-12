/* @internal */
namespace ts.codefix {
const fixId = "convertLiteralTypeToMappedType";
const errorCodes = [ts.Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0.code];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertLiteralTypeToMappedType(context) {
        const { sourceFile, span } = context;
        const info = getInfo(sourceFile, span.start);
        if (!info) {
            return undefined;
        }
        const { name, constraint } = info;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));
        return [ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Convert_0_to_1_in_0, constraint, name], fixId, ts.Diagnostics.Convert_all_type_literals_to_mapped_type)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, diag.start);
        if (info) {
            doChange(changes, diag.file, info);
        }
    })
});

interface Info {
    container: ts.TypeLiteralNode,
    typeNode: ts.TypeNode | undefined;
    constraint: string;
    name: string;
}

function getInfo(sourceFile: ts.SourceFile, pos: number): Info | undefined {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    if (ts.isIdentifier(token)) {
        const propertySignature = ts.cast(token.parent.parent, ts.isPropertySignature);
        const propertyName = token.getText(sourceFile);
        return {
            container: ts.cast(propertySignature.parent, ts.isTypeLiteralNode),
            typeNode: propertySignature.type,
            constraint: propertyName,
            name: propertyName === "K" ? "P" : "K",
        };
    }
    return undefined;
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, { container, typeNode, constraint, name }: Info): void {
    changes.replaceNode(sourceFile, container, ts.factory.createMappedTypeNode(
        /*readonlyToken*/ undefined,
        ts.factory.createTypeParameterDeclaration(/*modifiers*/ undefined, name, ts.factory.createTypeReferenceNode(constraint)),
        /*nameType*/ undefined,
        /*questionToken*/ undefined,
        typeNode,
        /*members*/ undefined));
}
}
