/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Class_0_incorrectly_implements_interface_1.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const checker = context.program.getTypeChecker();

            if (!(token.kind === SyntaxKind.Identifier && isClassLike(token.parent))) {
                return undefined;
            }
            const classDecl = <ClassDeclaration>token.parent;
            const startPos: number = classDecl.members.pos;

            const implementedTypeNodes = getClassImplementsHeritageClauseElements(classDecl);
            const implementedTypes = implementedTypeNodes.map(checker.getTypeFromTypeReference);
            const resolvedImplementedTypes = implementedTypes.map(checker.resolveStructuredTypeMembers);

            let result: CodeAction[] | undefined = undefined;

            for (const resolvedType of resolvedImplementedTypes) {
                const insertion = getMissingMembersInsertion(classDecl, resolvedType, checker, context.newLineCharacter);
                result = pushAction(insertion, getLocaleSpecificMessage(Diagnostics.Implement_interface_on_class), result);
            }

            // TODO: (arozga) Get this working and figure out how to test it reliably.
            /*
            // If there are multiple objects, we additionally try to generate a combined fix that simultaneously implements all types.
            const intersectionType = checker.getIntersectionType(implementedTypes);
            if(intersectionType.flags & TypeFlags.Intersection) {
                const resolvedIntersectionType = checker.resolveStructuredTypeMembers(<IntersectionType>intersectionType)
                const insertion = getMissingMembersInsertion(classDecl, resolvedIntersectionType, checker, context.newLineCharacter);
                result = pushAction(insertion, "stubbed locale message", result)
            }
            */

            return result;

            function pushAction(insertion: string, description: string, result?: CodeAction[]): CodeAction[] {
                if (insertion && insertion.length) {
                    const newAction: CodeAction = {
                        description: description,
                        changes: [{
                            fileName: sourceFile.fileName,
                            textChanges: [{
                                span: { start: startPos, length: 0 },
                                newText: insertion
                            }]
                        }]
                    };
                    if (result) {
                        result.push(newAction);
                    }
                    else {
                        result = [newAction];
                    }
                }
                return result;
            }
        }
    });
}