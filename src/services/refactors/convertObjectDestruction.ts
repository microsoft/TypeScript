/* @internal */
namespace ts.refactor {
    const refactorName = "Introduce Destruction";
    const actionNameIntroduceObjectDestruction = "Convert property access to Object destruction";
    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);
        if (isJSFile || !cancellationToken) return emptyArray;

        const info = getInfo(file, startPosition, program.getTypeChecker(), program, cancellationToken)
        if (!info) return emptyArray;

        const description = getLocaleSpecificMessage(Diagnostics.Convert_parameters_to_destructured_object);
        return [{
            name: refactorName,
            description,
            actions: [{
                name: refactorName,
                description
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined { 
        if (context && actionName && actionNameIntroduceObjectDestruction) {

        }
        return undefined;
    }

    interface Info {
        valueDeclaration: Exclude<VariableLikeDeclaration, EnumMember>
        referencedExpression: Expression[]
    }

    function getInfo(file: SourceFile, startPosition: number, checker: TypeChecker, program: Program, cancellationToken: CancellationToken): Info | undefined {
        const node = getTouchingToken(file, startPosition);
        if (!isAccessExpression(node.parent) || node.parent.expression !== node) return undefined
        const symbol = checker.getSymbolAtLocation(node);
        if (!symbol || !symbol.valueDeclaration || !isVariableLike(symbol.valueDeclaration) || isEnumMember(symbol.valueDeclaration)) return undefined;

        // Find only current file
        const references = FindAllReferences.getReferenceEntriesForNode(-1, node, program, [file], cancellationToken);
        const accessExprReferences = mapDefined(references, reference => {
            if (reference.kind !== FindAllReferences.EntryKind.Node) {
                return undefined;
            }

            if (!isAccessExpression(reference.node.parent) || reference.node.parent.expression !== reference.node) {
                return undefined;
            }

            return reference.node;
        })
        const referencedExpression = map(accessExprReferences, x => cast(x, isExpression));
        if (!accessExprReferences || !accessExprReferences.length) return undefined;

        return {
            referencedExpression,
            valueDeclaration: symbol.valueDeclaration,
        }
    }
}
