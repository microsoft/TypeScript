/* @internal */
namespace ts.codefix {
    interface ParameterPropertyToPropertyInfo {
        parameter: ParameterPropertyDeclaration
        ctor: ConstructorDeclaration
    }

    export function getConvertParameterPropertyToPropertyInfo(file: SourceFile, start: number, end?: number) {
        const current = getTokenAtPosition(file, start);
        const range = end && createTextRangeFromSpan(createTextSpan(start, end));

        let maybeVariableName: Identifier | undefined;
        let parameter = findAncestor(current, node => {
            if (range && !rangeContainsSkipTrivia(range, node, file) || isFunctionLikeDeclaration(node)) {
                return "quit";
            }

            if (isIdentifier(node)) {
                maybeVariableName = node;
                return false;
            }

            if (isVariableLike(node)) {
                if (isParameterDeclaration(node) && isParameterPropertyDeclaration(node, node.parent)) {
                    return true;
                }
                return "quit";
            }

            return false;
        });

        if (!parameter && maybeVariableName && isParameter(maybeVariableName.parent) && isParameterPropertyDeclaration(maybeVariableName.parent, maybeVariableName.parent.parent)) {
            parameter = maybeVariableName.parent;
        }

        if (!parameter) {
            return undefined;
        }

        Debug.assert(isParameterPropertyDeclaration(parameter, parameter.parent));
        return {
            parameter,
            ctor: parameter.parent
        };
    }

    export function getConvertParameterPropertyToPropertyChanges(changeTracker: textChanges.ChangeTracker, file: SourceFile, info: ParameterPropertyToPropertyInfo, extraModifierFlags: ModifierFlags = ModifierFlags.None) {
        const { parameter, ctor } = info;
        const container = ctor.parent;

        const newParameter = factory.createParameterDeclaration(
            parameter.decorators,
            /*modifiers*/ undefined,
            parameter.dotDotDotToken,
            parameter.name,
            parameter.questionToken,
            parameter.type,
            parameter.initializer
        );
        changeTracker.replaceNode(file, parameter, newParameter);

        const newPropertyDeclaration = factory.createPropertyDeclaration(
            /*decorators*/ undefined,
            createModifiers(modifiersToFlags(parameter.modifiers) | extraModifierFlags),
            factory.createIdentifier(parameter.name.text),
            factory.cloneNode(parameter.questionToken),
            factory.cloneNode(parameter.type),
            /*initializer*/ undefined
        );
        changeTracker.insertNodeAtClassStart(file, container, newPropertyDeclaration);

        const assignment = factory.createAssignment(
            factory.createPropertyAccessExpression(
                factory.createThis(),
                factory.createIdentifier(parameter.name.text)
            ),
            factory.createIdentifier(parameter.name.text)
        );
        changeTracker.insertNodeAtConstructorStartAfterSuperCall(file, ctor, factory.createExpressionStatement(assignment));
    }
}