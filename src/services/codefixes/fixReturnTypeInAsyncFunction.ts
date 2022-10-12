/* @internal */
namespace ts.codefix {
const fixId = "fixReturnTypeInAsyncFunction";
const errorCodes = [
    ts.Diagnostics.The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_Did_you_mean_to_write_Promise_0.code,
];

interface Info {
    readonly returnTypeNode: ts.TypeNode;
    readonly returnType: ts.Type;
    readonly promisedTypeNode: ts.TypeNode;
    readonly promisedType: ts.Type;
}

ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions: function getCodeActionsToFixReturnTypeInAsyncFunction(context) {
        const { sourceFile, program, span } = context;
        const checker = program.getTypeChecker();
        const info = getInfo(sourceFile, program.getTypeChecker(), span.start);
        if (!info) {
            return undefined;
        }
        const { returnTypeNode, returnType, promisedTypeNode, promisedType } = info;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, returnTypeNode, promisedTypeNode));
        return [ts.codefix.createCodeFixAction(
            fixId, changes,
            [ts.Diagnostics.Replace_0_with_Promise_1,
             checker.typeToString(returnType), checker.typeToString(promisedType)],
            fixId, ts.Diagnostics.Fix_all_incorrect_return_type_of_an_async_functions)];
    },
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, context.program.getTypeChecker(), diag.start);
        if (info) {
            doChange(changes, diag.file, info.returnTypeNode, info.promisedTypeNode);
        }
    })
});

function getInfo(sourceFile: ts.SourceFile, checker: ts.TypeChecker, pos: number): Info | undefined {
    if (ts.isInJSFile(sourceFile)) {
        return undefined;
    }

    const token = ts.getTokenAtPosition(sourceFile, pos);
    const func = ts.findAncestor(token, ts.isFunctionLikeDeclaration);
    const returnTypeNode = func?.type;
    if (!returnTypeNode) {
        return undefined;
    }

    const returnType = checker.getTypeFromTypeNode(returnTypeNode);
    const promisedType = checker.getAwaitedType(returnType) || checker.getVoidType();
    const promisedTypeNode = checker.typeToTypeNode(promisedType, /*enclosingDeclaration*/ returnTypeNode, /*flags*/ undefined);
    if (promisedTypeNode) {
        return { returnTypeNode, returnType, promisedTypeNode, promisedType };
    }
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, returnTypeNode: ts.TypeNode, promisedTypeNode: ts.TypeNode): void {
    changes.replaceNode(sourceFile, returnTypeNode, ts.factory.createTypeReferenceNode("Promise", [promisedTypeNode]));
}
}
