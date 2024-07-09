import {
    createCodeFixActionWithoutFixAll,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Diagnostics,
    emptyArray,
    factory,
    getFixableErrorSpanExpression,
    getSourceFileOfNode,
    Identifier,
    isBinaryExpression,
    isCallExpression,
    isExpression,
    isFunctionLikeKind,
    isIdentifier,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertySignature,
    isShorthandPropertyAssignment,
    isVariableDeclaration,
    Node,
    PropertyAccessExpression,
    SignatureDeclaration,
    SourceFile,
    Symbol,
    SyntaxKind,
    textChanges,
    TextSpan,
    TypeChecker,
    UnionTypeNode,
} from "../_namespaces/ts.js";

const addOptionalPropertyUndefined = "addOptionalPropertyUndefined";

const errorCodes = [
    Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target.code,
    Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
    Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const typeChecker = context.program.getTypeChecker();
        const toAdd = getPropertiesToAdd(context.sourceFile, context.span, typeChecker);
        if (!toAdd.length) {
            return undefined;
        }
        const changes = textChanges.ChangeTracker.with(context, t => addUndefinedToOptionalProperty(t, toAdd));
        return [createCodeFixActionWithoutFixAll(addOptionalPropertyUndefined, changes, Diagnostics.Add_undefined_to_optional_property_type)];
    },
    fixIds: [addOptionalPropertyUndefined],
});

function getPropertiesToAdd(file: SourceFile, span: TextSpan, checker: TypeChecker): Symbol[] {
    const sourceTarget = getSourceTarget(getFixableErrorSpanExpression(file, span), checker);
    if (!sourceTarget) {
        return emptyArray;
    }
    const { source: sourceNode, target: targetNode } = sourceTarget;
    const target = shouldUseParentTypeOfProperty(sourceNode, targetNode, checker)
        ? checker.getTypeAtLocation(targetNode.expression)
        : checker.getTypeAtLocation(targetNode);
    if (target.symbol?.declarations?.some(d => getSourceFileOfNode(d).fileName.match(/\.d\.ts$/))) {
        return emptyArray;
    }
    return checker.getExactOptionalProperties(target);
}

function shouldUseParentTypeOfProperty(sourceNode: Node, targetNode: Node, checker: TypeChecker): targetNode is PropertyAccessExpression {
    return isPropertyAccessExpression(targetNode)
        && !!checker.getExactOptionalProperties(checker.getTypeAtLocation(targetNode.expression)).length
        && checker.getTypeAtLocation(sourceNode) === checker.getUndefinedType();
}

/**
 * Find the source and target of the incorrect assignment.
 * The call is recursive for property assignments.
 */
function getSourceTarget(errorNode: Node | undefined, checker: TypeChecker): { source: Node; target: Node; } | undefined {
    if (!errorNode) {
        return undefined;
    }
    else if (isBinaryExpression(errorNode.parent) && errorNode.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
        return { source: errorNode.parent.right, target: errorNode.parent.left };
    }
    else if (isVariableDeclaration(errorNode.parent) && errorNode.parent.initializer) {
        return { source: errorNode.parent.initializer, target: errorNode.parent.name };
    }
    else if (isCallExpression(errorNode.parent)) {
        const n = checker.getSymbolAtLocation(errorNode.parent.expression);
        if (!n?.valueDeclaration || !isFunctionLikeKind(n.valueDeclaration.kind)) return undefined;
        if (!isExpression(errorNode)) return undefined;
        const i = errorNode.parent.arguments.indexOf(errorNode);
        if (i === -1) return undefined;
        const name = (n.valueDeclaration as any as SignatureDeclaration).parameters[i].name;
        if (isIdentifier(name)) return { source: errorNode, target: name };
    }
    else if (
        isPropertyAssignment(errorNode.parent) && isIdentifier(errorNode.parent.name) ||
        isShorthandPropertyAssignment(errorNode.parent)
    ) {
        const parentTarget = getSourceTarget(errorNode.parent.parent, checker);
        if (!parentTarget) return undefined;
        const prop = checker.getPropertyOfType(checker.getTypeAtLocation(parentTarget.target), (errorNode.parent.name as Identifier).text);
        const declaration = prop?.declarations?.[0];
        if (!declaration) return undefined;
        return {
            source: isPropertyAssignment(errorNode.parent) ? errorNode.parent.initializer : errorNode.parent.name,
            target: declaration,
        };
    }
    return undefined;
}

function addUndefinedToOptionalProperty(changes: textChanges.ChangeTracker, toAdd: Symbol[]) {
    for (const add of toAdd) {
        const d = add.valueDeclaration;
        if (d && (isPropertySignature(d) || isPropertyDeclaration(d)) && d.type) {
            const t = factory.createUnionTypeNode([
                ...d.type.kind === SyntaxKind.UnionType ? (d.type as UnionTypeNode).types : [d.type],
                factory.createTypeReferenceNode("undefined"),
            ]);
            changes.replaceNode(d.getSourceFile(), d.type, t);
        }
    }
}
