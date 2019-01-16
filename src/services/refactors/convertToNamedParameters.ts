/* @internal */
namespace ts.refactor.convertToNamedParameters {
    const refactorName = "Convert to named parameters";
    const refactorDescription = "Convert to named parameters";
    const actionNameNamedParameters = "Convert to named parameters";
    const actionDescriptionNamedParameters = "Convert to named parameters";
    const minimumParameterLength = 3;
    const paramTypeNamePostfix = "Param";
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });


    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, startPosition } = context;
        const func = getFunctionDeclarationAtPosition(file, startPosition);
        if (!func) return emptyArray;

        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [{
                name: actionNameNamedParameters,
                description: actionDescriptionNamedParameters
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        Debug.assert(actionName === actionNameNamedParameters);
        const { file, startPosition } = context;
        const func = getFunctionDeclarationAtPosition(file, startPosition);
        if (!func) return undefined;

        const paramTypeDeclaration = createParamTypeDeclaration(func);
        return undefined;
    }

    function getFunctionDeclarationAtPosition(file: SourceFile, startPosition: number): ValidFunctionDeclaration | undefined {
        const node = getTokenAtPosition(file, startPosition);
        const func = getContainingFunction(node);
        if (!func || !isValidFunctionDeclaration(func)) return undefined;
        return func;
    }

    function isValidFunctionDeclaration(func: SignatureDeclaration): func is ValidFunctionDeclaration {
        switch (func.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                if (func.name && func.parameters && func.parameters.length > minimumParameterLength) {
                    return true;
                }
                break;
            default:
        }
        return false;
    }

    function createParamTypeDeclaration(func: ValidFunctionDeclaration): InterfaceDeclaration {
        const paramTypeName = getFunctionName(func);
        const paramTypeMembers =
            ts.map(func.parameters,
                (paramDecl, _i) => createPropertySignatureFromParameterDeclaration(paramDecl));
        return createInterfaceDeclaration(
            /* decorators */ undefined,
            /* modifiers */ undefined,
            createIdentifier(paramTypeName),
            /* type parameters */ undefined,
            /* heritage clauses */ undefined,
            createNodeArray(paramTypeMembers));
    }

    function getFunctionName(func: ValidFunctionDeclaration): string {
        return entityNameToString(func.name) + paramTypeNamePostfix;
    }

    function createPropertySignatureFromParameterDeclaration(paramDeclaration: ValidParameterDeclaration): PropertySignature {
        return createPropertySignature(
            /*modifiers*/ undefined,
            paramDeclaration.name,
            paramDeclaration.questionToken,
            paramDeclaration.type,
            paramDeclaration.initializer);
    }

    interface ValidFunctionDeclaration extends FunctionDeclaration {
        name: Identifier;
        body?: FunctionBody;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        parameters: NodeArray<ValidParameterDeclaration>;
    }

    interface ValidParameterDeclaration extends ParameterDeclaration {
        name: Identifier;
    }
}