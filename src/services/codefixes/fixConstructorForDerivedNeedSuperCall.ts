import { Diagnostics, SourceFile, ConstructorDeclaration, getTokenAtPosition, Debug, isConstructorDeclaration, createStatement, createCall, createSuper, emptyArray } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "constructorForDerivedNeedSuperCall";
/* @internal */
const errorCodes = [Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const ctr = getNode(sourceFile, span.start);
        const changes = ChangeTracker.with(context, t => doChange(t, sourceFile, ctr));
        return [createCodeFixAction(fixId, changes, Diagnostics.Add_missing_super_call, fixId, Diagnostics.Add_all_missing_super_calls)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, context.sourceFile, getNode(diag.file, diag.start))),
});
/* @internal */
function getNode(sourceFile: SourceFile, pos: number): ConstructorDeclaration {
    const token = getTokenAtPosition(sourceFile, pos);
    Debug.assert(isConstructorDeclaration(token.parent), "token should be at the constructor declaration");
    return token.parent;
}
/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, ctr: ConstructorDeclaration) {
    const superCall = createStatement(createCall(createSuper(), /*typeArguments*/ undefined, emptyArray));
    changes.insertNodeAtConstructorStart(sourceFile, ctr, superCall);
}
