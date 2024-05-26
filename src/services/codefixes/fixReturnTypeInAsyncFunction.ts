import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Diagnostics,
    factory,
    findAncestor,
    getTokenAtPosition,
    isFunctionLikeDeclaration,
    isInJSFile,
    SourceFile,
    textChanges,
    Type,
    TypeChecker,
    TypeNode,
} from "../_namespaces/ts.js";

const fixId = "fixReturnTypeInAsyncFunction";
const errorCodes = [
    Diagnostics.The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_Did_you_mean_to_write_Promise_0.code,
];

interface Info {
    readonly returnTypeNode: TypeNode;
    readonly returnType: Type;
    readonly promisedTypeNode: TypeNode;
    readonly promisedType: Type;
}

registerCodeFix({
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
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, returnTypeNode, promisedTypeNode));
        return [createCodeFixAction(
            fixId,
            changes,
            [Diagnostics.Replace_0_with_Promise_1, checker.typeToString(returnType), checker.typeToString(promisedType)],
            fixId,
            Diagnostics.Fix_all_incorrect_return_type_of_an_async_functions,
        )];
    },
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, context.program.getTypeChecker(), diag.start);
            if (info) {
                doChange(changes, diag.file, info.returnTypeNode, info.promisedTypeNode);
            }
        }),
});

function getInfo(sourceFile: SourceFile, checker: TypeChecker, pos: number): Info | undefined {
    if (isInJSFile(sourceFile)) {
        return undefined;
    }

    const token = getTokenAtPosition(sourceFile, pos);
    const func = findAncestor(token, isFunctionLikeDeclaration);
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

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, returnTypeNode: TypeNode, promisedTypeNode: TypeNode): void {
    changes.replaceNode(sourceFile, returnTypeNode, factory.createTypeReferenceNode("Promise", [promisedTypeNode]));
}
