import { Diagnostics, SourceFile, Program, getAllowSyntheticDefaultImports, createImportDeclaration, createImportClause, createImportEqualsDeclaration, createExternalModuleReference, VariableStatement, Identifier, StringLiteralLike, getTokenAtPosition, isRequireCall, Debug, cast, isVariableDeclaration, isVariableStatement, isIdentifier } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "requireInTs";
/* @internal */
const errorCodes = [Diagnostics.require_call_may_be_converted_to_an_import.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const changes = ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start, context.program));
        return [createCodeFixAction(fixId, changes, Diagnostics.Convert_require_to_import, fixId, Diagnostics.Convert_all_require_to_import)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, diag.start, context.program)),
});
/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, pos: number, program: Program) {
    const { statement, name, required } = getInfo(sourceFile, pos);
    changes.replaceNode(sourceFile, statement, getAllowSyntheticDefaultImports(program.getCompilerOptions())
        ? createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createImportClause(name, /*namedBindings*/ undefined), required)
        : createImportEqualsDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, name, createExternalModuleReference(required)));
}
/* @internal */
interface Info {
    readonly statement: VariableStatement;
    readonly name: Identifier;
    readonly required: StringLiteralLike;
}
/* @internal */
function getInfo(sourceFile: SourceFile, pos: number): Info {
    const { parent } = getTokenAtPosition(sourceFile, pos);
    if (!isRequireCall(parent, /*checkArgumentIsStringLiteralLike*/ true))
        throw Debug.failBadSyntaxKind(parent);
    const decl = cast(parent.parent, isVariableDeclaration);
    return { statement: cast(decl.parent.parent, isVariableStatement), name: cast(decl.name, isIdentifier), required: parent.arguments[0] };
}
