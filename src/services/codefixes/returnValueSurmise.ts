/* @internal */
namespace ts.codefix {
    const fixId = "returnValueSurmise";
    const errorCodes = [
        Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value.code,
        Diagnostics.Type_0_is_not_assignable_to_type_1.code,
        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { host, sourceFile, span: { start } } = context;
            return packageName === undefined ? []
                : [createCodeFixAction(fixId, /*changes*/ [], [Diagnostics.Install_0, packageName], fixId, Diagnostics.Install_all_missing_types_packages, getCommand(sourceFile.fileName, packageName))];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (_, diag, commands) => {
            const pkg = getTypesPackageNameToInstall(context.host, diag.file, diag.start, diag.code);
            if (pkg) {
                commands.push(getCommand(diag.file.fileName, pkg));
            }
        }),
    });

    interface Info {

    }

    function getInfo (checker: TypeChecker, sourceFile: SourceFile, position: number): Info | undefined {
        const node = getTokenAtPosition(sourceFile, position);
        if (!node.parent) return undefined;

        if (isTypeNode(node) && isFunctionLikeDeclaration(node.parent)) {

        }
        else if (isDeclarationName(node) && isVariableLike(node.parent)) {
            
        }
        else {
            Debug.fail('unknow pattern');
        }


        const functionLikeDeclaration = cast(node.parent, isFunctionLike);
        Debug.assert(functionLikeDeclaration.type === node);

        const returnType = checker.getTypeFromTypeNode(cast(node, isTypeNode));

    }
}
