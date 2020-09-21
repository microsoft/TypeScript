/* @internal */
namespace ts.codefix {
    const fixId = "removeTsSpecificConstructs";
    const errorCodes = [
        Diagnostics.Type_annotations_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_aliases_can_only_be_used_in_TypeScript_files.code,
        Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files.code,
        // Diagnostics.import_can_only_be_used_in_TypeScript_files.code,
        // Diagnostics.export_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_parameter_declarations_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.implements_clauses_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_aliases_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_arguments_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Parameter_modifiers_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Non_null_assertions_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_assertion_expressions_can_only_be_used_in_TypeScript_files.code,
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const info = getTypeContainer(context, context.span);
            if (!info) {
                return undefined;
            }

            const edits = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, info));
            if (edits.length > 0) {
                return [createCodeFixAction(fixId, edits, Diagnostics.Remove_unnecessary_await, fixId, Diagnostics.Remove_all_unnecessary_uses_of_await)];
            }
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const info = getTypeContainer(context, diag);
                if (!info) {
                    return undefined;
                }
                makeChange(changes, context.sourceFile, info);
            });
        },
    });

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, info: Info) {
        switch (info.kind) {
            case TypeContainerKind.Modifier:
                return makeModifiersChange(changeTracker, sourceFile, info.modifier, info.container);
            case TypeContainerKind.Type:
                return makeTypeAnnotationChange(changeTracker, sourceFile, info.container);
            case TypeContainerKind.Declaration:
                return makeTypeDeclarationChange(changeTracker, sourceFile, info.declaration);
            case TypeContainerKind.TypeParameter:
                return makeTypeParametersChange(changeTracker, sourceFile, info.container);
        }
    }

    function makeTypeAnnotationChange (changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, container: DefinitelyHasType) {
        changeTracker.deleteTypeNode(sourceFile, container.type);
    }

    function makeModifiersChange (changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, modifier: Modifier, container: DefinitelyHasModifiers, deleteContainer?: boolean) {
        if (!deleteContainer || !(getEffectiveModifierFlags(container) & ModifierFlags.Ambient)) {
            changeTracker.deleteModifier(sourceFile, modifier);
        }
        else if (modifier.kind === SyntaxKind.DeclareKeyword) {
            changeTracker.delete(sourceFile, container)
        }
    }

    function makeTypeDeclarationChange (changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, declaration: TypeDeclarations) {
        changeTracker.delete(sourceFile, declaration)
    }

    function makeTypeParametersChange (changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, container: DefinitelyHasTypeParameters) {
        changeTracker.delete(sourceFile, container.typeParameters)
    }

    type DefinitelyHasType = HasType & { type: TypeNode }
    type DefinitelyHasModifiers = HasModifiers & { modifiers: ModifiersArray }

    type DefinitelyHasTypeParameters = DeclarationWithTypeParameterChildren & { typeParameters: NodeArray<TypeParameterDeclaration> }

    const enum TypeContainerKind {
        Type,
        Modifier,
        Declaration,
        TypeParameter,
    }

    interface TypeAnnotationInfo {
        kind: TypeContainerKind.Type
        container: DefinitelyHasType
    }

    interface ModifierInfo {
        kind: TypeContainerKind.Modifier
        container: DefinitelyHasModifiers
        modifier: Modifier
    }

    type TypeDeclarations = TypeAliasDeclaration | InterfaceDeclaration | ModuleDeclaration

    interface TypeDeclarationInfo {
        kind: TypeContainerKind.Declaration
        declaration: TypeDeclarations
    }

    interface TypeParameterDeclarationInfo {
        kind: TypeContainerKind.TypeParameter
        container: DefinitelyHasTypeParameters
    }

    type Info = TypeAnnotationInfo | ModifierInfo | TypeDeclarationInfo | TypeParameterDeclarationInfo

    function getTypeContainer (context: CodeFixContext | CodeFixAllContext, span: TextSpan): Info | undefined {
        const { sourceFile } = context;

        const currentNode = getTokenAtPosition(sourceFile, span.start);
        if (isTypeNode(currentNode) && hasType(currentNode.parent) && currentNode.parent.type === currentNode) {
            return {
                kind: TypeContainerKind.Type,
                container: currentNode.parent as DefinitelyHasType
            };
        }
        if (isModifier(currentNode) && hasModifier(currentNode.parent) && rangeContainsRange(currentNode.parent.modifiers, currentNode)) {
            return {
                kind: TypeContainerKind.Modifier,
                container: currentNode.parent,
                modifier: currentNode
            }
        }
        if (isTypeDeclaration(currentNode, currentNode.parent) && currentNode.parent.name === currentNode) {
            return {
                kind: TypeContainerKind.Declaration,
                declaration: currentNode.parent
            }
        }
        if (isDeclarationWithTypeParameterChildren(currentNode.parent) && currentNode.parent.typeParameters && rangeContainsRange(currentNode.parent.typeParameters, currentNode)) {
            return {
                kind: TypeContainerKind.TypeParameter,
                container: currentNode.parent as DefinitelyHasTypeParameters
            }
        }
        return undefined;
    }

    function hasModifier(node: Node): node is DefinitelyHasModifiers {
        return !!(node as HasModifiers).modifiers;
    }

    function isTypeDeclaration(currentNode: Node, container: Node): container is TypeDeclarations {
        switch (container.kind) {
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                return true;
            case SyntaxKind.ModuleDeclaration:
                return (<ModuleDeclaration>container).name === currentNode && !!(getEffectiveModifierFlags(container) & ModifierFlags.Ambient);
            default:
                return false;
        }
    }
}














