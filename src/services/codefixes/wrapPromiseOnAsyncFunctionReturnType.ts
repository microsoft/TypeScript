/* @internal */
namespace ts.codefix {
    const fixID = "wrapPromiseOnAsyncFunctionReturnType";
    const errorCodes = [
        Diagnostics.Type_0_is_not_a_valid_async_function_return_type_in_ES5_SlashES3_because_it_does_not_refer_to_a_Promise_compatible_constructor_value.code,
        Diagnostics.The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { sourceFile, span } = context;
            const node = getTokenAtPosition(sourceFile, span.start);
            if (!shouldFix(node)) return undefined;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, node));
            return [createCodeFixAction(fixID, changes, Diagnostics.Wrap_the_return_type_with_Promise, fixID, Diagnostics.Wrap_all_the_return_type_with_Promise)];
        },
        fixIds: [fixID],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const node = getTokenAtPosition(context.sourceFile, diag.start);
            if (!shouldFix(node)) return;
            doChange(changes, context.sourceFile, node);
        }),
    });

    function doChange(changeTracker: textChanges.ChangeTracker, sf: SourceFile, node: TypeNode) {
        changeTracker.replaceNode(sf, node, createTypeReferenceNode("Promise", [node]));
    }

    function shouldFix(node: Node): node is TypeNode {
        if (!isTypeNode(node)) return false;
        const parent = node.parent;
        if (!isAsyncFunction(parent)) return false;
        if (parent.type !== node) return false;
        return true;
    }
}
