/* @internal */
namespace ts.codefix {
    const fixId = "requireInTs";
    const errorCodes = [Diagnostics.require_call_may_be_converted_to_an_import.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start, context.program));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_require_to_import, fixId, Diagnostics.Convert_all_require_to_import)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, diag.start, context.program)),
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number, program: Program) {
        const { statement, name, required } = getInfo(sourceFile, pos);
        changes.replaceNode(sourceFile, statement, getAllowSyntheticDefaultImports(program.getCompilerOptions())
            ? createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createImportClause(name, /*namedBindings*/ undefined), required)
            : createImportEqualsDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, name, createExternalModuleReference(required)));
    }

    interface Info { readonly statement: VariableStatement; readonly name: Identifier; readonly required: StringLiteralLike; }
    function getInfo(sourceFile: SourceFile, pos: number): Info {
        const { parent } = getTokenAtPosition(sourceFile, pos);
        if (!isRequireCall(parent, /*checkArgumentIsStringLiteralLike*/ true)) throw Debug.failBadSyntaxKind(parent);
        const decl = cast(parent.parent, isVariableDeclaration);
        return { statement: cast(decl.parent.parent, isVariableStatement), name: cast(decl.name, isIdentifier), required: parent.arguments[0] };
    }
}
