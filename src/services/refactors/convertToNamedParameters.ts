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
        const edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, func, paramTypeDeclaration));
        // return undefined;
        return { renameFilename: undefined, renameLocation: undefined, edits };
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
            case SyntaxKind.Constructor:
                return !!(func.name && isValidParameterNodeArray(func.parameters));
            default:
        }
        return false;
    }

    function isValidParameterNodeArray(parameters: NodeArray<ParameterDeclaration>): boolean {
        return parameters && parameters.length > minimumParameterLength && ts.every(parameters, isValidParameterDeclaration);
    }

    function isValidParameterDeclaration(paramDecl: ParameterDeclaration): paramDecl is ValidParameterDeclaration {
        return !paramDecl.modifiers && !paramDecl.dotDotDotToken && isIdentifier(paramDecl.name) && !paramDecl.initializer;
    }

    function createParamTypeDeclaration(func: ValidFunctionDeclaration): InterfaceDeclaration {
        const paramTypeName = getFunctionName(func);
        const paramTypeMembers = ts.map(func.parameters, createPropertySignatureFromParameterDeclaration);

        return createInterfaceDeclaration(
            /* decorators */ undefined,
            /* modifiers */ undefined,
            createIdentifier(paramTypeName),
            func.typeParameters,
            /* heritageClauses */ undefined,
            createNodeArray(paramTypeMembers));
    }

    function getFunctionName(func: ValidFunctionDeclaration): string {
        return declarationNameToString(func.name) + paramTypeNamePostfix;
    }

    function createPropertySignatureFromParameterDeclaration(paramDeclaration: ValidParameterDeclaration): PropertySignature {
        return createPropertySignature(
            /*modifiers*/ undefined,
            paramDeclaration.name,
            paramDeclaration.questionToken,
            paramDeclaration.type,
            paramDeclaration.initializer);
    }

    function createParameterObjectBindingPattern(parameters: NodeArray<ValidParameterDeclaration>, paramType: TypeNode): ParameterDeclaration {
        const bindingElements = ts.map(parameters, param => createBindingElement(/* dotDotDotToken */ undefined, /* propertyName */ undefined, param.name));
        const paramName = createObjectBindingPattern(bindingElements);

        return createParameter(
            /* decorators */ undefined,
            /* modifiers */ undefined,
            /* dotDotDotToken */ undefined,
            paramName,
            /* questionToken */ undefined,
            paramType);
    }

    interface ValidFunctionDeclaration extends MethodDeclaration {
        name: PropertyName;
        body?: FunctionBody;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        parameters: NodeArray<ValidParameterDeclaration>;
    }

    interface ValidParameterDeclaration extends ParameterDeclaration {
        name: Identifier;
        type: TypeNode;
        dotDotDotToken: undefined;
        modifiers: undefined;
        initializer: undefined;
    }
}