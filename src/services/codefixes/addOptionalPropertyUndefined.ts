import * as ts from "../_namespaces/ts";

const addOptionalPropertyUndefined = "addOptionalPropertyUndefined";

const errorCodes = [
    ts.Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target.code,
    ts.Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
    ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const typeChecker = context.program.getTypeChecker();
        const toAdd = getPropertiesToAdd(context.sourceFile, context.span, typeChecker);
        if (!toAdd.length) {
            return undefined;
        }
        const changes = ts.textChanges.ChangeTracker.with(context, t => addUndefinedToOptionalProperty(t, toAdd));
        return [ts.codefix.createCodeFixActionWithoutFixAll(addOptionalPropertyUndefined, changes, ts.Diagnostics.Add_undefined_to_optional_property_type)];
    },
    fixIds: [addOptionalPropertyUndefined],
});

function getPropertiesToAdd(file: ts.SourceFile, span: ts.TextSpan, checker: ts.TypeChecker): ts.Symbol[] {
    const sourceTarget = getSourceTarget(ts.getFixableErrorSpanExpression(file, span), checker);
    if (!sourceTarget) {
        return ts.emptyArray;
    }
    const { source: sourceNode, target: targetNode } = sourceTarget;
    const target = shouldUseParentTypeOfProperty(sourceNode, targetNode, checker)
        ? checker.getTypeAtLocation(targetNode.expression)
        : checker.getTypeAtLocation(targetNode);
    if (target.symbol?.declarations?.some(d => ts.getSourceFileOfNode(d).fileName.match(/\.d\.ts$/))) {
        return ts.emptyArray;
    }
    return checker.getExactOptionalProperties(target);
}

function shouldUseParentTypeOfProperty(sourceNode: ts.Node, targetNode: ts.Node, checker: ts.TypeChecker): targetNode is ts.PropertyAccessExpression {
    return ts.isPropertyAccessExpression(targetNode)
        && !!checker.getExactOptionalProperties(checker.getTypeAtLocation(targetNode.expression)).length
        && checker.getTypeAtLocation(sourceNode) === checker.getUndefinedType();
}

/**
 * Find the source and target of the incorrect assignment.
 * The call is recursive for property assignments.
 */
function getSourceTarget(errorNode: ts.Node | undefined, checker: ts.TypeChecker): { source: ts.Node, target: ts.Node } | undefined {
    if (!errorNode) {
        return undefined;
    }
    else if (ts.isBinaryExpression(errorNode.parent) && errorNode.parent.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
        return { source: errorNode.parent.right, target: errorNode.parent.left };
    }
    else if (ts.isVariableDeclaration(errorNode.parent) && errorNode.parent.initializer) {
        return { source: errorNode.parent.initializer, target: errorNode.parent.name };
    }
    else if (ts.isCallExpression(errorNode.parent)) {
        const n = checker.getSymbolAtLocation(errorNode.parent.expression);
        if (!n?.valueDeclaration || !ts.isFunctionLikeKind(n.valueDeclaration.kind)) return undefined;
        if (!ts.isExpression(errorNode)) return undefined;
        const i = errorNode.parent.arguments.indexOf(errorNode);
        if (i === -1) return undefined;
        const name = (n.valueDeclaration as any as ts.SignatureDeclaration).parameters[i].name;
        if (ts.isIdentifier(name)) return { source: errorNode, target: name };
    }
    else if (ts.isPropertyAssignment(errorNode.parent) && ts.isIdentifier(errorNode.parent.name) ||
        ts.isShorthandPropertyAssignment(errorNode.parent)) {
        const parentTarget = getSourceTarget(errorNode.parent.parent, checker);
        if (!parentTarget) return undefined;
        const prop = checker.getPropertyOfType(checker.getTypeAtLocation(parentTarget.target), (errorNode.parent.name as ts.Identifier).text);
        const declaration = prop?.declarations?.[0];
        if (!declaration) return undefined;
        return {
            source: ts.isPropertyAssignment(errorNode.parent) ? errorNode.parent.initializer : errorNode.parent.name,
            target: declaration
        };
    }
    return undefined;
}

function addUndefinedToOptionalProperty(changes: ts.textChanges.ChangeTracker, toAdd: ts.Symbol[]) {
    for (const add of toAdd) {
        const d = add.valueDeclaration;
        if (d && (ts.isPropertySignature(d) || ts.isPropertyDeclaration(d)) && d.type) {
            const t = ts.factory.createUnionTypeNode([
                ...d.type.kind === ts.SyntaxKind.UnionType ? (d.type as ts.UnionTypeNode).types : [d.type],
                ts.factory.createTypeReferenceNode("undefined")
            ]);
            changes.replaceNode(d.getSourceFile(), d.type, t);
        }
    }
}
