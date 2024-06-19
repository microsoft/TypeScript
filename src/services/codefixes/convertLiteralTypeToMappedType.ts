import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    cast,
    Diagnostics,
    factory,
    getTokenAtPosition,
    isIdentifier,
    isPropertySignature,
    isTypeLiteralNode,
    SourceFile,
    textChanges,
    TypeLiteralNode,
    TypeNode,
} from "../_namespaces/ts.js";

const fixId = "convertLiteralTypeToMappedType";
const errorCodes = [Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0.code];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertLiteralTypeToMappedType(context) {
        const { sourceFile, span } = context;
        const info = getInfo(sourceFile, span.start);
        if (!info) {
            return undefined;
        }
        const { name, constraint } = info;
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Convert_0_to_1_in_0, constraint, name], fixId, Diagnostics.Convert_all_type_literals_to_mapped_type)];
    },
    fixIds: [fixId],
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, diag.start);
            if (info) {
                doChange(changes, diag.file, info);
            }
        }),
});

interface Info {
    container: TypeLiteralNode;
    typeNode: TypeNode | undefined;
    constraint: string;
    name: string;
}

function getInfo(sourceFile: SourceFile, pos: number): Info | undefined {
    const token = getTokenAtPosition(sourceFile, pos);
    if (isIdentifier(token)) {
        const propertySignature = cast(token.parent.parent, isPropertySignature);
        const propertyName = token.getText(sourceFile);
        return {
            container: cast(propertySignature.parent, isTypeLiteralNode),
            typeNode: propertySignature.type,
            constraint: propertyName,
            name: propertyName === "K" ? "P" : "K",
        };
    }
    return undefined;
}

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { container, typeNode, constraint, name }: Info): void {
    changes.replaceNode(
        sourceFile,
        container,
        factory.createMappedTypeNode(
            /*readonlyToken*/ undefined,
            factory.createTypeParameterDeclaration(/*modifiers*/ undefined, name, factory.createTypeReferenceNode(constraint)),
            /*nameType*/ undefined,
            /*questionToken*/ undefined,
            typeNode,
            /*members*/ undefined,
        ),
    );
}
