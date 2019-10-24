/*@internal*/
namespace ts {
    /**
     * Transforms accessor declarations in class bodies into roughly equivalent property declarations
     */
    export function transformAccessorsToPropertyDeclarations(context: TransformationContext) {
        return chainBundle(transformSourceFile);

        function transformSourceFile(file: SourceFile) {
            return visitEachChild(file, transformNode, context);
        }

        function transformNode(node: Node): Node {
            if (isClassLike(node)) {
                if (some(node.members, isAccessor)) {
                    return visitEachChild(transformClass(node), transformNode, context);
                }
            }
            return visitEachChild(node, transformNode, context);
        }

        function transformClass(cls: ClassLikeDeclaration): ClassLikeDeclaration {
            const members: ClassElement[] = [];
            for (const member of cls.members) {
                if (!isAccessor(member)) {
                    members.push(member);
                    continue;
                }
                const { firstAccessor, setAccessor } = getAllAccessorDeclarations(cls.members, member);
                if (firstAccessor === member) {
                    members.push(setTextRange(setOriginalNode(createProperty(
                        member.decorators,
                        !setAccessor ? createModifiersFromModifierFlags(getModifierFlags(member) | ModifierFlags.Readonly) : member.modifiers,
                        member.name,
                        member.questionToken,
                        isSetAccessor(member) ? getSetAccessorTypeAnnotationNode(member) : getEffectiveReturnTypeNode(member),
                        /*initializer*/ undefined
                    ), member), member));
                }
            }

            if (isClassDeclaration(cls)) {
                return updateClassDeclaration(
                    cls,
                    cls.decorators,
                    cls.modifiers,
                    cls.name,
                    cls.typeParameters,
                    cls.heritageClauses,
                    members
                );
            }
            else {
                return updateClassExpression(
                    cls,
                    cls.modifiers,
                    cls.name,
                    cls.typeParameters,
                    cls.heritageClauses,
                    members
                );
            }
        }
    }
}